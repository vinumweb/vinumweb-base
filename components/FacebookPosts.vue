<script setup>
const btnLoading = ref(false)
const btnCloseLoading = ref(false)
const offset = ref(0)
const posts = ref([])

async function getPosts(collapse) {
    collapse ? btnCloseLoading.value = true : btnLoading.value = true
    const { data, pending, error, refresh } = await useFetch('/api/facebookPosts', {
        query: { offset: collapse ? 0 : offset }
    })
    if (collapse) {
        posts.value = []
    }
    data.value.posts.forEach(item => {
        posts.value.push(item)
    })
    offset.value = data.value.nextOffset
    btnLoading.value = false
    btnCloseLoading.value = false
}

getPosts()

</script>
<template>
<UBlogList orientation="horizontal" v-auto-animate>
    <UBlogPost
    v-for="(item, index) in posts"
    :key="index"
    :image="{ src: item.full_picture, placeholder, loading: 'lazy' }"
    :title="item.message"
    :description="item.message"
    :date="new Date(item.created_time).toISOString().split('T')[0]"
    :to="'https://facebook.com/' + item.id"
    target="_blank"
    />
</UBlogList>
<div class="flex justify-center gap-2">
    <UButton label="Indlæs flere..." icon="i-tabler-text-caption" loadingIcon="i-tabler-loader-2" :loading="btnLoading" @click="getPosts()" />
    <UButton icon="i-tabler-x" @click="getPosts(true)" loadingIcon="i-tabler-x" :loading="btnCloseLoading" />
</div>
</template>

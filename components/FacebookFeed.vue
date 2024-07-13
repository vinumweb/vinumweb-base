<script setup>
const btnLoading = ref(false)
const btnCloseLoading = ref(false)
const offset = ref(0)
const feed = ref([])

async function getFeed(collapse) {
    collapse ? btnCloseLoading.value = true : btnLoading.value = true
    const { data, pending, error, refresh } = await useFetch('/api/facebookFeed', {
        query: { offset: collapse ? 0 : offset }
    })
    if (collapse) {
        feed.value = []
    }
    data.value.feed.forEach(item => {
        feed.value.push(item)
    })
    offset.value = data.value.nextOffset
    btnLoading.value = false
    btnCloseLoading.value = false
}

getFeed()

</script>
<template>
<UBlogList orientation="horizontal" class="mb-10" v-auto-animate>
    <UBlogPost
    v-for="(item, index) in feed"
    :key="index"
    :image="{ src: item.full_picture, loading: 'lazy' }"
    :title="item.message"
    :description="item.message"
    :date="new Date(item.created_time).toISOString().split('T')[0]"
    :to="item.permalink_url"
    target="_blank"
    />
</UBlogList>
<div class="flex justify-center gap-2">
    <UButton label="Indlæs flere..." icon="i-tabler-text-caption" loadingIcon="i-tabler-loader-2" :loading="btnLoading" @click="getFeed(false)" />
    <UButton v-if="offset > 3" icon="i-tabler-x" @click="getFeed(true)" loadingIcon="i-tabler-x" :loading="btnCloseLoading" />
</div>
</template>

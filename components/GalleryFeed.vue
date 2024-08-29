<script lang="ts" setup>
const items = ref([])
const visibleRef = ref(false)
const indexRef = ref(0)
const categories = ref([
  { 
    key: 'all',
    label: 'Alle kategorier',
    icon: 'i-tabler-layout-grid'
  }
])

const { data, status, error, refresh, clear } = await useFetch('/api/galleryFeed?dir=all')

data.value.forEach(item => {
  categories.value.push({ key: item.dir, label: item.dir })
  item.content.forEach(element => {
    items.value.push({ title: item.dir, img: element, dir: item.dir, src: '/gallery/' + item.dir + '/' + element})
  })
})

async function onChange (index) {
  const element = categories.value[index]
  const { data, status, error, refresh, clear } = await useFetch('/api/galleryFeed?dir=' + element.key)
  
  items.value = []

  setTimeout(() => {
    data.value.forEach(item => {
      item.content.forEach(element => {
        items.value.push({ title: item.dir, img: element, dir: item.dir, src: '/gallery/' + item.dir + '/' + element})
      })
    })
  }, 500)
}

const showImg = (index: number) => {
  indexRef.value = index
  visibleRef.value = true
}
const onHide = () => (visibleRef.value = false)

</script>

<template>
  <div>

    <div class="p-4 md:p-10">
      
      <div id="tabs">
        <UTabs class="hidden sm:block" :ui="{ list: { tab: { base: 'capitalize' } } }" :items="categories" @change="onChange" />
        <UTabs class="sm:hidden" :ui="{ list: { tab: { base: 'capitalize' } } }" orientation="vertical" :items="categories" @change="onChange" />
      </div>

      <TransitionGroup class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-10" name="list" tag="div">
          <div v-for="(item, index) in items" :key="index"  @click="() => showImg(index)" class="cursor-zoom-in w-full aspect-w-16 aspect-h-9 overflow-hidden rounded-xl">
            <NuxtImg :src="item.src" placeholder loading="lazy" fit="cover" class="w-full rounded-xl object-cover" />
          </div>
      </TransitionGroup>

      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="items"
        :index="indexRef"
        @hide="onHide"
      />

    </div>

  </div>
</template>
<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
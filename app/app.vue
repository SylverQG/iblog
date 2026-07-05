<template>
  <div class="min-h-screen flex flex-col">
    <component :is="headerComponent" />
    <main class="flex-1 w-full px-6 py-8">
      <NuxtPage />
    </main>
    <component :is="footerComponent" />
  </div>
</template>

<script setup lang="ts">
const { initFromStorage, getTemplateComponent } = useTemplate()

onMounted(() => {
  initFromStorage()
})

const headerComponent = computed(() => getTemplateComponent('AppHeader'))
const footerComponent = computed(() => getTemplateComponent('Footer'))

useSeoMeta({
  title: 'iBlog',
  description: 'A personal blog powered by GitHub Issues',
})
</script>

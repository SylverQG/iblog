<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
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

const footerComponent = computed(() => getTemplateComponent('Footer'))

useSeoMeta({
  title: 'iBlog',
  description: 'A personal blog powered by GitHub Issues',
})
</script>

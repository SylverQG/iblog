<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <footer class="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      &copy; {{ new Date().getFullYear() }} iBlog. Powered by Nuxt &amp; GitHub Issues.
    </footer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'iBlog',
  description: 'A personal blog powered by GitHub Issues',
})
</script>

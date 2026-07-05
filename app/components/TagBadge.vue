<template>
  <span
    class="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
    @click="navigateTo(`/tags/${tag}`)"
  >
    {{ tag }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ tag: string }>()
</script>

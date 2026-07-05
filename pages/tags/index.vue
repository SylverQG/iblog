<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">标签</h1>

    <div v-if="!tags" class="text-center py-12 text-gray-500">
      加载中...
    </div>

    <div v-else-if="tags.length === 0" class="text-center py-12 text-gray-500">
      暂无标签
    </div>

    <div v-else class="flex flex-wrap gap-3">
      <NuxtLink
        v-for="tag in tags"
        :key="tag.name"
        :to="`/tags/${tag.name}`"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <span class="font-medium">{{ tag.name }}</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">({{ tag.count }})</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch<{ tags: { name: string; count: number }[] }>('/api/tags')
const tags = computed(() => data.value?.tags ?? [])

useSeoMeta({
  title: '标签 - iBlog',
})
</script>

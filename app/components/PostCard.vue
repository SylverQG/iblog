<template>
  <NuxtLink
    :to="`/posts/${post.id}`"
    class="block p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
  >
    <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
    <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">
      {{ formatDate(post.createdAt) }}
    </p>
    <p class="text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
      {{ excerpt }}
    </p>
    <div class="flex flex-wrap gap-2">
      <TagBadge
        v-for="label in post.labels"
        :key="label"
        :tag="label"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/server/types/blog'

const props = defineProps<{ post: BlogPost }>()

const excerpt = computed(() => {
  const text = props.post.body.replace(/[#*`\[\]]/g, '').trim()
  return text.slice(0, 150) + (text.length > 150 ? '...' : '')
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

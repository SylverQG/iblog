<template>
  <article class="max-w-3xl mx-auto">
    <header class="mb-10">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
        {{ post.title }}
      </h1>
      <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-5">
        <time>{{ formatDate(post.createdAt) }}</time>
        <span v-if="post.updatedAt !== post.createdAt">
          更新于 {{ formatDate(post.updatedAt) }}
        </span>
      </div>
      <div class="flex flex-wrap gap-2">
        <TagBadge
          v-for="label in post.labels"
          :key="label"
          :tag="label"
        />
      </div>
    </header>

    <div class="prose" v-html="bodyHtml" />
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/server/types/blog'

const props = defineProps<{ post: BlogPost; bodyHtml?: string }>()

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

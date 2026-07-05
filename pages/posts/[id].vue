<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div v-if="!post" class="text-center py-12 text-gray-500">
      加载中...
    </div>

    <template v-else>
      <article>
        <header class="mb-8">
          <h1 class="text-3xl font-bold mb-3">{{ post.title }}</h1>
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
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

        <div class="prose" v-html="renderedBody" />
      </article>

      <nav class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:underline">
          &larr; 返回首页
        </NuxtLink>
      </nav>
    </template>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import type { BlogPost } from '~/server/types/blog'

const route = useRoute()
const id = Number(route.params.id)

const { data } = await useFetch<BlogPost>(`/api/posts/${id}`)
const post = computed(() => data.value)

const renderedBody = computed(() => {
  if (!post.value?.body) return ''
  return marked(post.value.body, { async: false }) as string
})

useSeoMeta({
  title: post.value?.title ?? 'iBlog',
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

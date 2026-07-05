<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">iBlog</h1>
      <p class="text-gray-500 dark:text-gray-400">
        基于 GitHub Issues 的个人博客
      </p>
    </div>

    <div v-if="!posts" class="text-center py-12 text-gray-500">
      加载中...
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-12 text-gray-500">
      暂无博客文章
    </div>

    <div v-else class="grid gap-4">
      <component
        v-for="post in posts"
        :key="post.id"
        :is="PostCardComponent"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostsResponse } from '~/server/types/blog'

const { getTemplateComponent } = useTemplate()
const PostCardComponent = computed(() => getTemplateComponent('PostCard'))

const { data } = await useFetch<PostsResponse>('/api/posts')
const posts = computed(() => data.value?.posts ?? [])
</script>

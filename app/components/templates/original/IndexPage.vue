<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">iBlog</h1>
      <p class="text-gray-500 dark:text-gray-400">基于 GitHub Issues 的个人博客</p>
    </div>

    <PostList>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </PostList>
  </div>
</template>

<script setup lang="ts">
import type { PostsResponse } from '~/server/types/blog'
import PostList from './PostList.vue'
import PostCard from '~/components/PostCard.vue'

const { data } = await useFetch<PostsResponse>('/api/posts')
const posts = computed(() => data.value?.posts ?? [])
</script>

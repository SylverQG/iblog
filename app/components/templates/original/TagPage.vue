<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        标签：<TagBadge :tag="tagName" class="inline-flex" />
      </h1>
      <p class="text-gray-500 dark:text-gray-400">共 {{ posts.length }} 篇文章</p>
    </div>

    <PostList>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </PostList>

    <nav class="mt-8">
      <NuxtLink to="/tags" class="text-blue-600 dark:text-blue-400 hover:underline">
        &larr; 所有标签
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { PostsResponse } from '~/server/types/blog'
import PostList from './PostList.vue'
import PostCard from '~/components/PostCard.vue'

const route = useRoute()
const tagName = route.params.tag as string

const { data } = await useFetch<PostsResponse>(`/api/posts?tag=${tagName}`)
const posts = computed(() => data.value?.posts ?? [])
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">
        标签：<component :is="TagBadgeComponent" :tag="tagName" class="inline-flex" />
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        共 {{ posts?.length ?? 0 }} 篇文章
      </p>
    </div>

    <div v-if="!posts" class="text-center py-12 text-gray-500">
      加载中...
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-12 text-gray-500">
      该标签下暂无文章
    </div>

    <div v-else class="grid gap-4">
      <component
        v-for="post in posts"
        :key="post.id"
        :is="PostCardComponent"
        :post="post"
      />
    </div>

    <nav class="mt-8">
      <NuxtLink to="/tags" class="text-blue-600 dark:text-blue-400 hover:underline">
        &larr; 所有标签
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { PostsResponse } from '~/server/types/blog'

const { getTemplateComponent } = useTemplate()
const PostCardComponent = computed(() => getTemplateComponent('PostCard'))
const TagBadgeComponent = computed(() => getTemplateComponent('TagBadge'))

const route = useRoute()
const tagName = route.params.tag as string

const { data } = await useFetch<PostsResponse>(`/api/posts?tag=${tagName}`)
const posts = computed(() => data.value?.posts ?? [])

useSeoMeta({
  title: `${tagName} - iBlog`,
})
</script>

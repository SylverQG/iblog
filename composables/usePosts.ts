import type { BlogPost, PostsResponse } from '~/server/types/blog'

export function usePosts() {
  async function fetchPosts(tag?: string) {
    const params = new URLSearchParams()
    if (tag) params.set('tag', tag)
    const { data } = await useFetch<PostsResponse>(`/api/posts?${params}`)
    return data
  }

  async function fetchPost(id: number) {
    const { data } = await useFetch<BlogPost>(`/api/posts/${id}`)
    return data
  }

  async function fetchTags() {
    const { data } = await useFetch<{ tags: { name: string; count: number }[] }>('/api/tags')
    return data
  }

  return { fetchPosts, fetchPost, fetchTags }
}

import { fetchPosts } from '../utils/github'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const tag = query.tag as string | undefined
  const page = Number(query.page) || 1
  const pageSize = Number(query.pageSize) || 20

  const posts = await fetchPosts()

  let filtered = posts
  if (tag) {
    filtered = posts.filter((post) => post.labels.includes(tag))
  }

  const total = filtered.length
  const start = (page - 1) * pageSize
  const paged = filtered.slice(start, start + pageSize)

  return {
    posts: paged,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
})

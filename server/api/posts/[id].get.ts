import { fetchPostById } from '../../utils/github'
import { renderBodyWithCache } from '../../utils/markdown'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id) {
    throw createError({ statusCode: 400, message: 'Invalid post ID' })
  }

  const post = await fetchPostById(id)
  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return {
    ...post,
    bodyHtml: renderBodyWithCache(post.body),
  }
})

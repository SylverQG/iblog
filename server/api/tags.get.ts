import { fetchTags } from '../utils/github'

export default defineEventHandler(async () => {
  const tags = await fetchTags()
  return { tags }
})

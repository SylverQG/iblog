export interface BlogPost {
  id: number
  title: string
  body: string
  bodyHtml?: string
  labels: string[]
  createdAt: string
  updatedAt: string
  state: 'open' | 'closed'
}

export interface BlogTag {
  name: string
  count: number
}

export interface PostsResponse {
  posts: BlogPost[]
  total: number
}

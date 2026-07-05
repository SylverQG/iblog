import { Octokit } from 'octokit'
import type { BlogPost } from '../types/blog'

const owner = process.env.GITHUB_OWNER || 'SylverQG'
const repo = process.env.GITHUB_REPO || 'Blogs'

function getOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN
  if (token) {
    return new Octokit({ auth: token })
  }
  return new Octokit()
}

export async function fetchPosts(): Promise<BlogPost[]> {
  const octokit = getOctokit()
  const { data: issues } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: 'open',
    sort: 'created',
    direction: 'desc',
    per_page: 100,
  })

  return issues
    .filter((issue) => !issue.pull_request)
    .map((issue) => ({
      id: issue.number,
      title: issue.title,
      body: issue.body || '',
      labels: issue.labels.map((label) => (typeof label === 'string' ? label : label.name || '')),
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      state: issue.state as 'open' | 'closed',
    }))
}

export async function fetchPostById(id: number): Promise<BlogPost | null> {
  const octokit = getOctokit()
  try {
    const { data: issue } = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number: id,
    })

    if (issue.pull_request) return null

    let body = issue.body || ''

    const { data: comments } = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: id,
      per_page: 100,
    })

    const ownerComments = comments.filter((c) => c.user?.login === owner)
    if (ownerComments.length > 0) {
      const commentBlocks = ownerComments.map((c) => {
        const date = new Date(c.created_at).toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        return `\n\n---\n\n> *${owner} · ${date}*\n\n${c.body || ''}`
      })
      body += commentBlocks.join('')
    }

    return {
      id: issue.number,
      title: issue.title,
      body,
      labels: issue.labels.map((label) => (typeof label === 'string' ? label : label.name || '')),
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      state: issue.state as 'open' | 'closed',
    }
  } catch {
    return null
  }
}

export async function fetchTags(): Promise<{ name: string; count: number }[]> {
  const posts = await fetchPosts()
  const tagMap = new Map<string, number>()

  for (const post of posts) {
    for (const label of post.labels) {
      tagMap.set(label, (tagMap.get(label) || 0) + 1)
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

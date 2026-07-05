import { marked } from 'marked'
import katex from 'katex'

let renderCache: Record<string, { html: string; time: number }> = {}
const CACHE_TTL = 5 * 60 * 1000

export function renderBodyWithCache(body: string): string {
  const key = body.substring(0, 200) + ':' + body.length
  const cached = renderCache[key]
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.html
  }
  const html = renderMarkdownWithMath(body)
  renderCache[key] = { html, time: Date.now() }
  if (Object.keys(renderCache).length > 100) {
    renderCache = {}
  }
  return html
}

function renderMarkdownWithMath(text: string): string {
  const codeBlocks: string[] = []
  let processed = text.replace(/(```[\s\S]*?```|`[^`]+`)/g, (match) => {
    codeBlocks.push(match)
    return `\x00MATH_CODE_${codeBlocks.length - 1}\x00`
  })

  const katexOptions = { throwOnError: false, strict: false }

  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex.trim(), { ...katexOptions, displayMode: true })
    } catch {
      return `$${tex}$$`
    }
  })

  processed = processed.replace(/(?<!\$)\$(?!\$)(?!\{)((?:[^$\n]|\n(?!\s*\$))*?)\$(?!\$)/g, (_, tex) => {
    const trimmed = tex.trim()
    if (!trimmed) return `$$`
    try {
      return katex.renderToString(trimmed, { ...katexOptions, displayMode: false })
    } catch {
      return `$${tex}$`
    }
  })

  processed = processed.replace(/\x00MATH_CODE_(\d+)\x00/g, (_, idx) => codeBlocks[parseInt(idx)])

  return marked(processed, { async: false }) as string
}

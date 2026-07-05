import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineEventHandler((event) => {
  const name = event.context.params?.name
  if (!name || !['original', 'minimal', 'card', 'terminal'].includes(name)) {
    throw createError({ statusCode: 400, message: 'Invalid template name' })
  }

  const cssPath = name === 'original'
    ? resolve('app/assets/css/original.css')
    : resolve(`templates/iblog-template/templates/${name}/assets/css/main.css`)
  const css = readFileSync(cssPath, 'utf-8')

  setHeader(event, 'Content-Type', 'text/css')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return css
})

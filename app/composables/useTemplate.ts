import type { Component } from 'vue'

export const TEMPLATES = {
  original: { name: 'original', displayName: '原始风格', description: '经典简约，Tailwind 原生样式' },
  minimal: { name: 'minimal', displayName: '简约风', description: '干净留白，阅读优先' },
  card: { name: 'card', displayName: '卡片杂志风', description: '双列网格，侧边栏标签云' },
  terminal: { name: 'terminal', displayName: '极客终端风', description: '深色背景，等宽字体' },
} as const

export type TemplateName = keyof typeof TEMPLATES

const templateComponents: Record<TemplateName, Record<string, () => Promise<{ default: Component }>>> = {
  original: {
    AppHeader: () => import('~/components/AppHeader.vue'),
    Footer: () => import('~/components/Footer.vue'),
    IndexPage: () => import('~/components/templates/original/IndexPage.vue'),
    PostPage: () => import('~/components/templates/original/PostPage.vue'),
    TagPage: () => import('~/components/templates/original/TagPage.vue'),
    TagsIndexPage: () => import('~/components/templates/original/TagsIndexPage.vue'),
  },
  minimal: {
    AppHeader: () => import('../../templates/iblog-template/templates/minimal/components/AppHeader.vue'),
    Footer: () => import('../../templates/iblog-template/templates/minimal/components/Footer.vue'),
    IndexPage: () => import('../../templates/iblog-template/templates/minimal/pages/IndexPage.vue'),
    PostPage: () => import('../../templates/iblog-template/templates/minimal/pages/PostPage.vue'),
    TagPage: () => import('../../templates/iblog-template/templates/minimal/pages/TagPage.vue'),
    TagsIndexPage: () => import('../../templates/iblog-template/templates/minimal/pages/TagsIndexPage.vue'),
  },
  card: {
    AppHeader: () => import('../../templates/iblog-template/templates/card/components/AppHeader.vue'),
    Footer: () => import('../../templates/iblog-template/templates/card/components/Footer.vue'),
    Sidebar: () => import('../../templates/iblog-template/templates/card/components/Sidebar.vue'),
    IndexPage: () => import('../../templates/iblog-template/templates/card/pages/IndexPage.vue'),
    PostPage: () => import('../../templates/iblog-template/templates/card/pages/PostPage.vue'),
    TagPage: () => import('../../templates/iblog-template/templates/card/pages/TagPage.vue'),
    TagsIndexPage: () => import('../../templates/iblog-template/templates/card/pages/TagsIndexPage.vue'),
  },
  terminal: {
    AppHeader: () => import('../../templates/iblog-template/templates/terminal/components/AppHeader.vue'),
    Footer: () => import('../../templates/iblog-template/templates/terminal/components/Footer.vue'),
    IndexPage: () => import('../../templates/iblog-template/templates/terminal/pages/IndexPage.vue'),
    PostPage: () => import('../../templates/iblog-template/templates/terminal/pages/PostPage.vue'),
    TagPage: () => import('../../templates/iblog-template/templates/terminal/pages/TagPage.vue'),
    TagsIndexPage: () => import('../../templates/iblog-template/templates/terminal/pages/TagsIndexPage.vue'),
  },
}

const asyncComponentCache: Record<string, Component> = {}

export function useTemplate() {
  const templateCookie = useCookie<TemplateName>('iblog-template', {
    default: () => 'original',
    maxAge: 60 * 60 * 24 * 365,
  })
  const template = useState<TemplateName>('template-name', () => templateCookie.value)

  // 一次性迁移：旧版 localStorage 模板偏好迁移到 cookie
  if (import.meta.client) {
    const saved = localStorage.getItem('iblog-template') as TemplateName | null
    if (saved && saved in TEMPLATES) {
      templateCookie.value = saved
      template.value = saved
      localStorage.removeItem('iblog-template')
    }
  }

  watch(template, (newVal) => {
    templateCookie.value = newVal
    loadTemplateCss(newVal)
  })

  function initFromStorage() {
    loadTemplateCss(template.value)
  }

  function setTemplate(name: TemplateName) {
    template.value = name
  }

  async function loadTemplateCss(name: TemplateName) {
    if (!import.meta.client) return
    try {
      const t = Date.now()
      const res = await fetch(`/api/template-css/${name}?_=${t}`)
      const css = await res.text()
      const existing = document.getElementById('iblog-template-css')
      if (existing) existing.remove()
      const style = document.createElement('style')
      style.id = 'iblog-template-css'
      style.textContent = css
      document.head.appendChild(style)
    } catch {
      console.warn(`[iBlog] Failed to load template CSS: ${name}`)
    }
  }

  function getTemplateComponent(name: string): Component | null {
    const cacheKey = `${template.value}:${name}`
    if (asyncComponentCache[cacheKey]) {
      return asyncComponentCache[cacheKey]
    }
    const loader = templateComponents[template.value]?.[name]
    if (!loader) return null
    const asyncCmp = defineAsyncComponent(loader)
    asyncComponentCache[cacheKey] = asyncCmp
    return asyncCmp
  }

  return {
    template,
    templates: TEMPLATES,
    setTemplate,
    initFromStorage,
    loadTemplateCss,
    getTemplateComponent,
  }
}

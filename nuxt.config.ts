import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css',
    'katex/dist/katex.min.css',
  ],

  modules: ['@nuxtjs/color-mode'],

  nitro: {
    preset: 'vercel',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
})

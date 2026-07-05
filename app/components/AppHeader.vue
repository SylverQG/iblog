<template>
  <header class="border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        iBlog
      </NuxtLink>
      <nav class="flex items-center gap-6">
        <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          首页
        </NuxtLink>
        <NuxtLink to="/tags" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          标签
        </NuxtLink>
        <NuxtLink to="/about" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          关于
        </NuxtLink>
        <TemplateSelector />
        <button
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          @click="toggleColorMode"
          :title="colorMode === 'dark' ? '切换到亮色模式' : '切换到暗色模式'"
        >
          <span v-if="colorMode === 'dark'">☀️</span>
          <span v-else>🌙</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="relative" v-click-outside="close">
    <button
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
      @click="open = !open"
    >
      <span>主题</span>
      <span class="text-[10px]">▼</span>
    </button>
    <div
      v-if="open"
      class="absolute right-0 top-full mt-1 w-44 py-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
    >
      <button
        v-for="tpl in templates"
        :key="tpl.name"
        class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        :class="template === tpl.name ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'"
        @click="select(tpl.name)"
      >
        <span class="block">{{ tpl.displayName }}</span>
        <span class="block text-xs text-gray-400 dark:text-gray-500 font-normal">{{ tpl.description }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TemplateName } from '~/composables/useTemplate'

const { template, templates, setTemplate } = useTemplate()
const open = ref(false)

function select(name: TemplateName) {
  setTemplate(name)
  open.value = false
}

function close() {
  open.value = false
}

const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el._clickOutside = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el._clickOutside)
  },
}
</script>

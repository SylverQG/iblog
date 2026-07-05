<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">关于</h1>

    <div class="prose">
      <p>
        iBlog 是一个基于 GitHub Issues 构建的个人博客系统。
      </p>

      <h2>如何工作</h2>
      <ul>
        <li>在 <a href="https://github.com/SylverQG/Blogs/issues" target="_blank">SylverQG/Blogs</a> 仓库提 Issue</li>
        <li>Issue 标题 = 博客标题，正文 = 博客内容（Markdown）</li>
        <li>Labels = 分类/标签</li>
        <li>自动同步到博客展示</li>
      </ul>

      <h2>技术栈</h2>
      <ul>
        <li>前端/后端：Nuxt 4 + Vue 3</li>
        <li>样式：Tailwind CSS v4</li>
        <li>数据源：GitHub Issues</li>
        <li>部署：Vercel</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '关于 - iBlog',
})
</script>

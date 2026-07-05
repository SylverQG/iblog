<template>
  <component :is="TagsIndexPageComponent" />
</template>

<script setup lang="ts">
const { getTemplateComponent } = useTemplate()
const TagsIndexPageComponent = computed(() => getTemplateComponent('TagsIndexPage'))
</script>

<template>
  <component :is="TagPageComponent" />
</template>

<script setup lang="ts">
const { getTemplateComponent } = useTemplate()
const TagPageComponent = computed(() => getTemplateComponent('TagPage'))
</script>

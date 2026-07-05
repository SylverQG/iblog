<template>
  <component :is="IndexPageComponent" />
</template>

<script setup lang="ts">
const { getTemplateComponent } = useTemplate()
const IndexPageComponent = computed(() => getTemplateComponent('IndexPage'))
</script>

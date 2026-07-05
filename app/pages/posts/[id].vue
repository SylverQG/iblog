<template>
  <component :is="PostPageComponent" />
</template>

<script setup lang="ts">
const { getTemplateComponent } = useTemplate()
const PostPageComponent = computed(() => getTemplateComponent('PostPage'))
</script>

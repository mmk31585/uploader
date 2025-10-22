<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageProgressBar from '@/components/widgets/page-progressbar/PageProgressBar.vue'
import { registerRouter } from '@/composables'

const route = useRoute()

const layout = computed(() => {
  return route?.meta?.layout ?? 'layout-empty'
})

// Injection for request wrapper working
registerRouter(useRouter())
// Do it for toast too...
</script>

<template>
  <PageProgressBar />

  <component :is="layout">
    <router-view />
  </component>
</template>

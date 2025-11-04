<script setup lang="ts">
import type { GroupButtonProps } from '@/components/base/button/types.ts'
import BaseButton from '@/components/base/button/BaseButton.vue'

const props = withDefaults(defineProps<GroupButtonProps>(), {
  items: undefined,
})
</script>

<template>
  <ButtonGroup>
    <template v-if="props.items && props.items.length">
      <template v-for="(it, idx) in items" :key="idx">
        <component v-if="typeof it !== 'object' || (it && !('component' in it))" :is="it as any" />
        <component
          v-else
          :is="(it as any).component ?? BaseButton"
          v-bind="(it as any).props ?? {}"
        />
      </template>
    </template>

    <template v-else>
      <BaseButton />
      <BaseButton />
      <BaseButton />
    </template>
  </ButtonGroup>
</template>

<style scoped></style>

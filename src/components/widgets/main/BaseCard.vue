<script setup lang="ts">
import Card from 'primevue/card'
import type { CardProps } from './types'
import Image from 'primevue/image'
import Chip from 'primevue/chip'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<CardProps>(), {
  imageAlt: '',
  imagePreview: true,
  chips: () => [],
  typeLabel: 'نوع',
  categoryLabel: 'دسته',
})
// const emit = defineEmits<{ (e: 'card-click'): void }>()
// const onCardClick = () => emit('card-click')
</script>
<template>
  <Card
    :pt="{
      root: 'tw:bg-neutral-gray-01',
    }"
  >
    <template #header>
      <div class="tw:p-3">
        <Image
          :lazy="true"
          :src="imageUrl"
          :preview="imagePreview"
          :pt="{
            root: 'tw:w-full',
            image: 'tw:rounded-xl tw:w-full tw:aspect-auto tw:object-cover',
            previewMask: 'tw:rounded-xl',
          }"
        />
      </div>
      <div v-if="chips?.length" class="tw:px-3 tw:flex tw:gap-2 tw:justify-center">
        <Chip
          v-for="(c, i) in chips"
          :key="i"
          :label="c.label"
          :icon="c.icon"
          :pt="{
            root: 'tw:bg-background tw:text-gray-700 tw:rounded-xl tw:border tw:border-gray-200  tw:h-8',
            label: 'tw:text-sm',
          }"
        />
      </div>
    </template>
    <template #content>
      <div class="tw:p-3 tw:pt-2">
        <div
          class="tw:text-base tw:font-bold tw:text-gray-900 dark:tw:text-slate-100 tw:leading-6 tw:mb-1 tw:line-clamp-2"
        >
          <span class="tw:text-gray-700 dark:tw:text-slate-300">{{ typeLabel }}:</span>
          <span class="tw:mr-1">{{ typeValue }}</span>
        </div>

        <div class="tw:text-base tw:font-medium tw:text-gray-800 tw:leading-6 tw:line-clamp-2">
          <span class="tw:text-gray-700 dark:tw:text-slate-300">{{ categoryLabel }}:</span>
          <span class="tw:mr-1">{{ categoryValue }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>

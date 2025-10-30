<script lang="ts" setup>
import { Search } from '@/components/widgets/search'
</script>

<template>
  <main
    class="tw:grid tw:grid-cols-12 tw:grid-rows-6 tw:gap-4 tw:p-4 tw:bg-base-background tw:w-screen tw:h-screen"
  >
    <section class="tw:col-span-9 tw:row-span-6 tw:bg-foreground tw:w-full tw:h-full"></section>
    <section class="tw:flex tw:flex-col tw:col-span-3 tw:row-span-6 tw:gap-4 tw:w-full tw:h-full">
      <Search class="tw:flex-1"></Search>
      <div class="tw:flex-2 tw:bg-foreground"></div>
    </section>
  </main>
</template>

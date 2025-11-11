<script lang="ts" setup>
import { Category } from '@/components/widgets/categories'
import { Main } from '@/components/widgets/main'
import { Search } from '@/components/widgets/search'
</script>

<template>
  <!-- <div class="tw:p-4">
    <main class="tw:w-screen tw:h-screen tw:flex tw:gap-4">
      <section class="tw:bg-foreground tw:w-full tw:h-full"></section>
      <section class="tw:flex tw:flex-col tw:gap-4 tw:h-full tw:w-96 tw:shrink-0">
        <Search class="tw:flex-1"></Search>
        <div class="tw:flex-2 tw:bg-foreground"></div>
      </section>
    </main>
  </div> -->
  <main
    class="tw:grid tw:grid-cols-12 tw:grid-rows-6 tw:gap-4 tw:p-4 tw:bg-base-background tw:w-screen tw:h-screen"
  >
    <section class="tw:flex tw:flex-col tw:col-span-3 tw:row-span-6 tw:gap-4 tw:w-full tw:h-full">
      <Search class=""></Search>
      <Category class="tw:h-full"></Category>
    </section>
    <section class="tw:col-span-9 tw:row-span-6 tw:flex tw:w-full tw:h-full">
      <Main class="tw:flex-1" />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { Category } from '@/components/widgets/categories'
import { Main } from '@/components/widgets/main'
import { Search } from '@/components/widgets/search'
</script>

<template>
  <!-- <div class="tw:p-4">
    <main class="tw:w-screen tw:h-screen tw:flex tw:gap-4">
      <section class="tw:flex tw:flex-col tw:gap-4 tw:h-full tw:w-96 tw:shrink-0">
        <Search class="tw:flex-1"></Search>
        <Category class="tw:flex-2 "></Category>
      </section>
      <Main class=" tw:w-full tw:h-full"></Main>
    </main>
  </div> -->
  <!-- <main
    class="tw:grid tw:grid-cols-12 tw:grid-rows-6 tw:gap-4 tw:p-4 tw:bg-base-background tw:w-screen tw:h-screen tw:overflow-x-hidden"
  >
    <section class="tw:flex tw:flex-col tw:col-span-3 tw:row-span-6 tw:gap-4 tw:w-full tw:h-full">
      <Search class=""></Search>
      <Category class="tw:h-full"></Category>
    </section>
    <section class="tw:col-span-9 tw:row-span-6 tw:flex tw:w-full tw:h-full">
      <Main class="tw:flex-1" />
    </section>
  </main> -->

  <div class="tw:h-screen tw:w-screen tw:p-4 tw:bg-base-background tw:overflow-x-hidden">
    <main class="tw:flex tw:h-full tw:gap-4">
      <section class="tw:max-lg:hidden tw:w-96 tw:h-full tw:flex tw:flex-col tw:gap-4 tw:shrink-0">
        <Search class="tw:flex-1"></Search>
        <Category class="tw:flex-2 tw:min-h-0"></Category>
      </section>

      <Main class="tw:flex-1 tw:h-full tw:min-w-0"></Main>
    </main>
  </div>
</template>

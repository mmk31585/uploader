<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const homeRoute = computed(() => '/')
</script>

<template>
  <section class="tw:bg-indigo-500 tw:relative tw:z-10 tw:py-[120px] tw:min-h-screen">
    <div class="tw:max-w-7xl tw:mx-auto tw:w-full">
      <div class="tw:flex">
        <div class="tw:w-full tw:px-4">
          <div class="tw:mx-auto tw:max-w-[400px] tw:text-center">
            <h2
              class="tw:mb-2 tw:text-[50px] tw:font-bold tw:leading-none tw:text-white tw:sm:text-[80px] tw:md:text-[100px]"
            >
              ۴۰۴
            </h2>
            <h4 class="tw:mb-3 tw:text-[22px] tw:font-semibold tw:leading-tight tw:text-white">
              صفحه مورد نظر شما پیدا نشد!
            </h4>
            <p class="tw:mb-8 tw:text-lg tw:text-white">لطفا دوباره تلاش نمایید</p>

            <div class="tw:flex tw:gap-3 tw:justify-center tw:items-center">
              <router-link
                v-if="homeRoute"
                :to="homeRoute"
                class="tw:inline-block tw:text-purple-500 tw:rounded-lg tw:border tw:border-white tw:px-8 tw:py-3 tw:text-center tw:text-base tw:font-semibold tw:transition tw:bg-white tw:hover:text-black tw:hover:bg-opacity-80 tw:hover:shadow-xl"
              >
                خانه
              </router-link>
              <button
                class="tw:inline-block tw:rounded-lg tw:border tw:border-white tw:px-8 tw:py-3 tw:text-center tw:text-base tw:font-semibold tw:text-white tw:transition tw:hover:bg-white tw:hover:text-purple-500 tw:hover:shadow-xl"
                @click="router.go(-1)"
              >
                بازگشت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="tw:absolute tw:top-0 tw:left-0 tw:-z-10 tw:flex tw:h-full tw:w-full tw:items-center tw:justify-between tw:space-x-5 tw:md:space-x-8 tw:lg:space-x-14"
    >
      <div
        class="tw:h-full tw:w-1/3 tw:bg-gradient-to-t tw:from-[#FFFFFF14] tw:to-[#C4C4C400]"
      ></div>
      <div class="tw:flex tw:h-full tw:w-1/3">
        <div
          class="tw:h-full tw:w-1/2 tw:bg-gradient-to-b tw:from-[#FFFFFF14] tw:to-[#C4C4C400]"
        ></div>
        <div
          class="tw:h-full tw:w-1/2 tw:bg-gradient-to-t tw:from-[#FFFFFF14] tw:to-[#C4C4C400]"
        ></div>
      </div>
      <div
        class="tw:h-full tw:w-1/3 tw:bg-gradient-to-b tw:from-[#FFFFFF14] tw:to-[#C4C4C400]"
      ></div>
    </div>
  </section>
</template>

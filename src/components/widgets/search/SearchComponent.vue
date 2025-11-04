<!-- DeedSearchPanel.vue -->
<script setup lang="ts">
import { BasePanel } from '@/components/base/panel'
</script>

<template>
  <BasePanel :collapsible="false" :stickyHeader="true">
    <template #header>
      <div class="tw:flex tw:items-center tw:justify-between tw:w-full tw:px-1">
        <div
          class="tw:w-6 tw:h-6 tw:rounded tw:border tw:border-border tw:flex tw:items-center tw:justify-center"
        >
          <div class="tw:w-3 tw:h-3 tw:bg-muted tw:rounded-xs"></div>
        </div>
        <h2 class="tw:text-lg tw:font-bold tw:text-foreground">جستجو اسناد</h2>
      </div>
    </template>

    <template #subheader>
      <div class="tw:pt-3" dir="rtl">
        <div class="tw:text-sm tw:font-semibold tw:text-primary tw:mb-3">ملک</div>

        <!-- <IftaLabel>
    <InputText id="username" v-model="value" variant="filled" />
    <label for="username">Username</label>
</IftaLabel>
<InputText type="text" v-model="value" /> -->
        <div class="tw:grid tw:grid-cols-2 tw:gap-3">
          <label class="tw:flex tw:flex-col tw:gap-1">
            <span class="tw:text-xs tw:text-muted-foreground">کد نوسازی قدیم</span>
            <div
              class="tw:h-11 tw:px-3 tw:flex tw:items-center tw:rounded-xl tw:border tw:border-input tw:bg-background tw:shadow-sm"
            >
              ۰
            </div>
          </label>

          <label class="tw:flex tw:flex-col tw:gap-1">
            <span class="tw:text-xs tw:text-muted-foreground">کد نوسازی</span>
            <div
              class="tw:h-11 tw:px-3 tw:flex tw:items-center tw:rounded-xl tw:border tw:border-input tw:bg-background tw:shadow-sm"
            >
              ۰۳-۰۱-۵۲۲۴-۱۰۰…
            </div>
          </label>

          <button
            type="button"
            class="tw:h-11 tw:rounded-xl tw:border tw:border-input tw:bg-background tw:flex tw:items-center tw:justify-center tw:gap-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              class="tw:opacity-70"
              aria-hidden="true"
            >
              <path
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            برگ جستجو
          </button>

          <div
            class="tw:h-11 tw:px-3 tw:flex tw:items-center tw:justify-between tw:rounded-xl tw:border tw:border-input tw:bg-background"
          >
            <span class="tw:text-muted-foreground">واحد</span>
            <div class="tw:flex tw:items-center tw:gap-2">
              <span>واحد املاک</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="tw:opacity-70"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BasePanel>
</template>

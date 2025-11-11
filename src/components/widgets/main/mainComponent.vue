<script setup lang="ts">
import { BaseButton } from '@/components/base/button'
import { BasePanel } from '@/components/base/panel'
import Divider from 'primevue/divider'
import Toolbar from 'primevue/toolbar'
</script>

<template>
  <BasePanel
    :class-names="{
      header: '',
    }"
  >
    <template #header>
      <div class="tw:flex tw:items-center">
        <h2>بایگانی اسناد الکترونیکی</h2>
        <Divider layout="vertical" />
        <BaseButton
          label="صفحه اصلی"
          icon="pi pi-home"
          class="tw:flex-none"
          variant="outlined"
          :shadow="false"
          severity="secondary"
          :class-name="{
            label: 'tw:text-neutral-gray-11',
          }"
        />
      </div>
    </template>
    <template #subheader>
      <Toolbar :pt="{ root: 'tw:flex-nowrap tw:border-0' }"> </Toolbar>
    </template>
  </BasePanel>
</template>

<style scoped></style>

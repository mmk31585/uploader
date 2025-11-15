<!-- DeedSearchPanel.vue -->
<script setup lang="ts">
import { BasePanel } from '@/components/base/panel'

import { BaseButton } from '@/components/base/button'
import { PanelRight } from 'lucide-vue-next'

import InputNumber from 'primevue/inputnumber'
import { ref } from 'vue'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'

const form = ref({
  code: 0,
  search: '',
})
const unit = ref([
  { name: 'واحد1', code: 'unit1' },
  { name: 'واحد3', code: 'unit2' },
  { name: 'واحد2', code: 'unit3' },
  { name: 'واحد4', code: 'unit4' },
  { name: 'واحد5', code: 'unit5' },
  { name: 'واحد6', code: 'unit6' },
])
</script>

<template>
  <BasePanel :stickyHeader="true">
    <template #header="{ titleClass }">
      <div class="tw:flex tw:items-center tw:justify-between tw:w-full">
        <span :class="titleClass">جستجو اسناد</span>
        <BaseButton
          :label="''"
          :shadow="false"
          :rounded="true"
          variant="text"
          severity="secondary"
          :class-name="{ root: 'tw:text-neutral-gray-08  tw:hover:text-neutral-gray-10' }"
        >
          <template #icon>
            <PanelRight class="tw:size-5" />
          </template>
        </BaseButton>
      </div>
    </template>

    <template #content>
      <div class="tw:text-sm tw:font-bold tw:text-primary">ملک</div>
      <div class="tw:px-3 tw:mt-4">
        <div class="tw:grid tw:grid-cols-2 tw:gap-x-4 tw:gap-y-6">
          <div>
            <FloatLabel variant="on">
              <InputNumber
                inputId="noSazi"
                class="tw:[&>input]:bg-transparent"
                v-model="form.code"
                size="large"
                fluid
              />
              <label for="noSazi" class="tw:bg-background">کدنوسازی</label>
            </FloatLabel>
          </div>
          <div>
            <FloatLabel variant="on">
              <InputNumber
                class="tw:[&>input]:bg-transparent"
                inputId="noSazi"
                v-model="form.code"
                fluid
                size="large"
              />
              <label for="noSazi" class="tw:bg-background">کدنوسازی قدیم</label>
            </FloatLabel>
          </div>
          <div>
            <Select
              :options="unit"
              option-label="name"
              placeholder="واحد"
              size="large"
              class="tw:w-full tw:bg-transparent"
            />
          </div>
          <div>
            <FloatLabel variant="on">
              <IconField>
                <InputText
                  inputId="noSazi"
                  v-model="form.search"
                  fluid
                  size="large"
                  class="tw:bg-transparent"
                />
                <InputIcon class="pi pi-search" />
              </IconField>
              <label for="noSazi">برگ</label>
            </FloatLabel>
          </div>
        </div>
      </div>
    </template>
  </BasePanel>
</template>

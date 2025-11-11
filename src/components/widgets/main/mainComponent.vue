<script setup lang="ts">
import { BaseButton } from '@/components/base/button'
import { BasePanel } from '@/components/base/panel'
import Divider from 'primevue/divider'
import FloatLabel from 'primevue/floatlabel'
import Select from 'primevue/select'
import Toolbar from 'primevue/toolbar'
import { ref } from 'vue'
import { LayoutDashboard, Shuffle, Maximize2 } from 'lucide-vue-next'
import CardComponent from './cardComponent.vue'

const sort = ref([
  { name: 'تاریخ درج (جدیدترین)', code: 'date_desc' },
  { name: 'تاریخ درج (قدیمی‌ترین)', code: 'date_asc' },
  { name: 'عنوان (الف تا ی)', code: 'title_asc' },
  { name: 'عنوان (ی تا الف)', code: 'title_desc' },
  { name: 'قیمت (کم به زیاد)', code: 'price_asc' },
  { name: 'قیمت (زیاد به کم)', code: 'price_desc' },
])
const titles = [
  'پیش‌نویس گزارش قرارداد',
  'فرم استعلام قیمت',
  'صورت‌وضعیت پروژه',
  'صورت‌حساب فروش',
  'گزارش مالی ماهانه',
  'درخواست مرخصی',
  'فرم سفارش کالا',
  'پیشنهاد فنی',
  'قرارداد همکاری',
  'مشخصات فنی محصول',
]
const cats = ['استعلامات', 'اسناد مالی', 'قرارداد', 'اداری', 'فنی']

const docs = ref(
  Array.from({ length: 20 }).map((_, i) => {
    const id = i + 1
    return {
      id,
      title: `${titles[i % titles.length]} ${id}`,
      category: cats[i % cats.length],
      chips: [{ label: `ش. پ: ${20 + (i % 7)}` }, { label: `ش. ص: ${1 + (i % 4)}` }],
      imageUrl: `https://picsum.photos/seed/mini-${id}/400/280`,
    }
  }),
)
type Item = {
  id: number
}
const selectedSort = ref()
function openDoc(item: Item) {
  // اینجا اکشن واقعی‌ت رو بگذار (روتینگ/مودال)
  console.log('open doc', item?.id)
}
</script>

<template>
  <div class="tw:h-full tw:flex tw:flex-col tw:min-h-0">
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
              root: 'tw:bg-neutral-gray-01',
              label: 'tw:text-neutral-gray-11',
            }"
          />
        </div>
      </template>
      <template #subheader>
        <Toolbar
          :pt="{
            root: 'tw:border-0 tw:bg-transparent tw:px-0',
            start: 'tw:w-full',
          }"
        >
          <template #start>
            <div class="tw:flex tw:gap-3 tw:w-full">
              <FloatLabel variant="on">
                <Select
                  v-model="selectedSort"
                  :options="sort"
                  option-label="name"
                  option-value="code"
                  placeholder="تاریخ درج"
                  size="large"
                  class="tw:w-full tw:bg-transparent tw:md:w-64"
                />
                <label class="tw:bg-background">مرتب سازی</label>
              </FloatLabel>
              <BaseButton
                variant="outlined"
                :shadow="false"
                severity="secondary"
                icon="pi pi-sort-numeric-down-alt"
                size="large"
              />
              <BaseButton variant="outlined" :shadow="false" severity="secondary" size="large">
                <template #icon>
                  <LayoutDashboard />
                </template>
              </BaseButton>
              <BaseButton variant="outlined" :shadow="false" severity="secondary" size="large">
                <template #icon>
                  <Shuffle />
                </template>
              </BaseButton>
              <BaseButton variant="outlined" :shadow="false" severity="secondary" size="large">
                <template #icon>
                  <Maximize2 />
                </template>
              </BaseButton>
            </div>
          </template>
        </Toolbar>
      </template>
      <template #content>
        <div class="tw:flex tw:p-1">
          <div class="tw:flex-1 tw:p-2">
            <div
              class="tw:grid tw:gap-3 tw:justify-center tw:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"
            >
              <CardComponent
                v-for="item in docs"
                :key="item.id"
                :image-url="item.imageUrl"
                :image-alt="item.title"
                :chips="item.chips"
                :type-value="item.title"
                :category-value="item.category"
                :clickable="true"
                compact
                @card-click="() => openDoc(item)"
              />
            </div>
          </div>
          <div></div>
        </div>
      </template>
    </BasePanel>
  </div>
</template>

<style scoped></style>

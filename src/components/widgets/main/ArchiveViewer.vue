<script setup lang="ts">
import { BaseButton } from '@/components/base/button'
import { BasePanel } from '@/components/base/panel'
import Divider from 'primevue/divider'
import FloatLabel from 'primevue/floatlabel'
import Select from 'primevue/select'
import Toolbar from 'primevue/toolbar'
import { ref } from 'vue'
import { LayoutDashboard, Shuffle, Maximize2, ClockFading, Trash } from 'lucide-vue-next'
import CardComponent from './BaseCard.vue'
import { useGridZoomPan } from '@/composables/useGridZoomPan'
import Slider from 'primevue/slider'
import ContextMenu from 'primevue/contextmenu'
import { BaseUploader } from '../uploader'
type Item = { id: number }

const visibleUploder = ref(false)
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
  'فرم استعلام استعلام استعلام استعلام استعلام استعلام استعلام قیمت',
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
      chips: [{ label: `ش. ب: ${20 + (i % 7)}` }, { label: `ش. ص: ${1 + (i % 4)}` }],
      imageUrl: `https://picsum.photos/seed/mini-${id}/400/280`,
    }
  }),
)
const selectedSort = ref(sort.value[0]?.code)

const baseMin = 200
const maxScale = 4
const minScale = 1
const scrollerEl = ref<HTMLElement | null>(null)
const gridEl = ref<HTMLElement | null>(null)

const { scaleModel, minScaleProp, maxScaleProp, step } = useGridZoomPan(scrollerEl, gridEl, {
  baseMin,
  maxScale,
  minScale,
})
const panelRef = ref<HTMLElement | null>(null)
const cm = ref()

const cmItems = ref([
  {
    label: 'صفحه اصلی',
    icon: 'pi pi-home',
    items: [
      { label: 'ویرایش', icon: 'pi pi-pencil', command: () => console.log('ویرایش') },
      { label: 'پرینت', icon: 'pi pi-print', command: () => console.log('پرینت') },
      { label: 'دانلود', icon: 'pi pi-download', command: () => console.log('دانلود') },
      { label: 'کپی', icon: 'pi pi-copy', command: () => console.log('کپی') },
      {
        label: 'انتقال',
        icon: 'pi pi-arrow-right-arrow-left',
        command: () => console.log('انتقال'),
      },
      {
        label: 'حذف',
        icon: 'pi pi-times',
        class: 'tw:text-red-500',
        command: () => console.log('حذف'),
      },
      { separator: true },
      {
        label: 'مشخصات',
        icon: 'pi pi-exclamation-triangle',
        command: () => console.log('مشخصات'),
      },
    ],
  },
  { separator: true },
  {
    label: 'پنجره مرورگر',
    icon: 'pi pi-window-maximize',
    items: [
      { label: 'نمایشگر ساده', icon: 'pi pi-table', command: () => console.log('نمایشگر ساده') },
      {
        label: 'نمایشگر پیشرفته',
        icon: 'pi pi-th-large',
        command: () => console.log('نمایشگر پیشرفته'),
      },
      {
        label: 'ویرایشگر پیشرفته',
        icon: 'pi pi-pencil',
        command: () => console.log('ویرایشگر پیشرفته'),
      },
    ],
  },

  { label: 'ویرایش', icon: 'pi pi-pencil', command: () => console.log('ویرایش') },
  { label: 'پرینت', icon: 'pi pi-print', command: () => console.log('پرینت') },
  { label: 'دانلود', icon: 'pi pi-download', command: () => console.log('دانلود') },
  { label: 'کپی', icon: 'pi pi-copy', command: () => console.log('کپی') },
  { label: 'انتقال', icon: 'pi pi-arrow-right-arrow-left', command: () => console.log('انتقال') },
  {
    label: 'حذف',
    icon: 'pi pi-times',
    class: 'tw:text-red-500',
    command: () => console.log('حذف'),
  },
  { separator: true },
  { label: 'مشخصات', icon: 'pi pi-exclamation-triangle', command: () => console.log('مشخصات') },
])
function openDoc(item: Item) {
  console.log('open doc', item?.id)
}
function onPanelRightClick(e: MouseEvent) {
  cm.value?.show(e)
}
</script>

<template>
  <div class="tw:h-full tw:flex tw:flex-col tw:min-h-0" ref="panelRef">
    <BasePanel
      :class-names="{
        root: 'tw:min-h-0 tw:flex tw:flex-col',
        content: 'tw:flex tw:gap-4 tw:min-h-0',
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
            :class-name="{ root: 'tw:bg-neutral-gray-01', label: 'tw:text-neutral-gray-11' }"
          />
          <!-- <Divider layout="vertical" /> -->
          <!-- <div class="tw:text-sm tw:opacity-70">Zoom: {{ Math.round(scale * 100) }}%</div>
          <BaseButton
            class="tw:ml-2"
            label="Reset (Ctrl+0)"
            variant="outlined"
            :shadow="false"
            severity="secondary"
            @click="reset"
          /> -->
        </div>
      </template>

      <template #subheader>
        <Toolbar :pt="{ root: 'tw:border-0 tw:bg-transparent tw:px-0', start: 'tw:w-full' }">
          <template #start>
            <div class="tw:flex tw:gap-3 tw:w-full">
              <FloatLabel variant="on">
                <Select
                  v-model="selectedSort"
                  :options="sort"
                  option-label="name"
                  option-value="code"
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
              <BaseButton variant="outlined" :shadow="false" severity="secondary" size="large"
                ><template #icon><LayoutDashboard /></template
              ></BaseButton>
              <BaseButton variant="outlined" :shadow="false" severity="secondary" size="large"
                ><template #icon><Shuffle /></template
              ></BaseButton>
              <BaseButton variant="outlined" :shadow="false" severity="secondary" size="large"
                ><template #icon><Maximize2 /></template
              ></BaseButton>
            </div>
          </template>
        </Toolbar>
      </template>

      <template #content>
        <div class="tw:flex tw:gap-6 tw:w-full" @contextmenu.prevent="onPanelRightClick">
          <div ref="scrollerEl" class="tw:flex-1 tw:basis-0 tw:min-h-0 tw:overflow-auto tw:p-2">
            <div
              ref="gridEl"
              class="tw:grid tw:gap-3 tw:justify-center"
              :style="`grid-template-columns: repeat(auto-fill, minmax(var(--col-min, ${baseMin}px), 1fr));`"
            >
              <CardComponent
                v-for="item in docs"
                :key="item.id"
                :image-url="item.imageUrl"
                :image-alt="item.title"
                :chips="item.chips"
                :type-value="item.title"
                :category-value="item.category"
                @card-click="() => openDoc(item)"
              />
            </div>
          </div>

          <div class="tw:flex tw:flex-col tw:items-center tw:gap-3">
            <div class="tw:rounded-lg tw:border tw:border-border/60 tw:px-3 tw:py-4">
              <Slider
                v-model="scaleModel"
                orientation="vertical"
                :min="minScaleProp"
                :max="maxScaleProp"
                :step="step"
                :pt="{
                  root: 'tw:m-3 tw:relative tw:block tw:h-46 tw:w-1.5 tw:bg-primary-tint-01',
                  range: ' tw:bg-primary-tint-04 ',

                  handle:
                    'tw:absolute tw:right-1/8 tw:w-7 tw:h-5 tw:before:w-7 tw:before:tw:h-5 tw:rounded-lg tw:bg-primary-tint-04 tw:before:bg-primary-tint-04  tw:focus:ring focus:tw:ring-primary-tint-03',
                }"
              />
            </div>

            <Divider class="tw:w-10" />

            <BaseButton
              size="large"
              icon="pi pi-plus-circle"
              variant="outlined"
              severity="secondary"
              :shadow="false"
              @click="visibleUploder = true"
            />
            <BaseButton
              size="large"
              icon="pi pi-check"
              variant="outlined"
              severity="secondary"
              :shadow="false"
            />
            <BaseButton size="large" variant="outlined" severity="secondary" :shadow="false">
              <template #icon><ClockFading class="tw:size-5" /></template>
            </BaseButton>

            <Divider class="tw:w-10" />

            <BaseButton size="large" variant="outlined" severity="secondary" :shadow="false">
              <template #icon><Trash class="tw:size-5" /></template>
            </BaseButton>
          </div>
          <ContextMenu
            ref="cm"
            :model="cmItems"
            append-to="self"
            :pt="{
              root: 'tw:rounded-xl tw:border tw:border-border/60 tw:bg-white tw:shadow-xl tw:min-w-56 ',
              menu: 'tw:py-2',
              separator: 'tw:my-2 tw:border-t tw:border-border',
              content: 'tw:px-2',
              item: 'tw:mx-1 tw:rounded-xl tw:hover:bg-neutral-100/70',
              action:
                'tw:flex tw:items-center tw:gap-3 tw:px-3 tw:py-2 tw:w-full tw:cursor-pointer',
              icon: 'tw:text-neutral-500',
              label: 'tw:text-neutral-800 tw:text-sm',
              submenuIcon: 'pi pi-angle-left  tw:text-neutral-400',
            }"
          >
            <template #item="{ item, props }">
              <a
                v-bind="props.action"
                class="tw:flex tw:items-center tw:gap-3 tw:px-3 tw:py-2 tw:w-full tw:rounded-xl hover:tw:bg-neutral-100/70"
                :class="item.class"
              >
                <span :class="item.icon" class="tw:text-neutral-500"></span>
                <span class="tw:text-sm tw:text-neutral-800">{{ item.label }}</span>
                <i v-if="item.items" class="pi pi-angle-left tw:ml-auto tw:text-neutral-400"></i>
              </a>
            </template>
          </ContextMenu>
          <BaseUploader v-model:visible="visibleUploder" />
        </div>
      </template>
    </BasePanel>
  </div>
</template>

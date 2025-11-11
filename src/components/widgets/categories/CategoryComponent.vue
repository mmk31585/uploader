<script setup lang="ts">
import { BaseButton } from '@/components/base/button'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import Menu from 'primevue/menu'
import IconField from 'primevue/iconfield'
import Tree from 'primevue/tree'
import { onMounted, ref } from 'vue'
import { Ellipsis, Book, Check } from 'lucide-vue-next'

const nodes = ref([
  {
    key: '0',
    label: 'آرشیو ملک',
    icon: 'pi pi-folder',
    children: [
      {
        key: '0-0',
        label: 'مدارک شناسایی مالک',
        icon: 'pi pi-folder',
        children: [
          { key: '0-0-0', label: 'کارت ملی.png', icon: 'pi pi-file' },
          { key: '0-0-1', label: 'شناسنامه.pdf', icon: 'pi pi-file' },
          { key: '0-0-2', label: 'قبض برق.jpg', icon: 'pi pi-file' },
        ],
      },
      {
        key: '0-1',
        label: 'اسناد ملک',
        icon: 'pi pi-folder',
        children: [
          { key: '0-1-0', label: 'سند تک‌برگ.pdf', icon: 'pi pi-file' },
          { key: '0-1-1', label: 'بنچاق قدیم.pdf', icon: 'pi pi-file' },
        ],
      },
      {
        key: '0-2',
        label: 'نقشه و مستندات',
        icon: 'pi pi-folder',
        children: [
          { key: '0-2-0', label: 'نقشه یو‌تی‌ام.dwg', icon: 'pi pi-file' },
          { key: '0-2-1', label: 'کروکی ملک.png', icon: 'pi pi-file' },
        ],
      },
    ],
  },
  {
    key: '1',
    label: 'آرشیو ملک ۲',
    icon: 'pi pi-folder',
    children: [
      {
        key: '1-0',
        label: 'مدارک شناسایی مالک',
        icon: 'pi pi-folder',
        children: [
          { key: '1-0-0', label: 'کارت ملی مالک.pdf', icon: 'pi pi-file' },
          { key: '1-0-1', label: 'گواهی امضا.jpg', icon: 'pi pi-file' },
        ],
      },
      {
        key: '1-1',
        label: 'مکاتبات',
        icon: 'pi pi-folder',
        children: [
          { key: '1-1-0', label: 'نامه استعلام.docx', icon: 'pi pi-file' },
          { key: '1-1-1', label: 'پاسخ استعلام.pdf', icon: 'pi pi-file' },
        ],
      },
    ],
  },
])

const selectedKey = ref<Record<string, { checked: boolean; partialChecked?: boolean }>>({})
const menu = ref()
const toggle = (event: Event) => menu.value.toggle(event)
const items = [
  { label: 'اپدیت', icon: 'pi pi-refresh' },
  { label: 'حذف', icon: 'pi pi-times' },
  { separator: true },
  { label: 'ویرایش', icon: 'pi pi-power-off' },
]

const form = ref({ code: 0, search: '' })
const expandedKeys = ref<Record<string, boolean>>({})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expandNode = (node: any) => {
  if (node.children?.length) {
    expandedKeys.value[node.key] = true
    for (const child of node.children) expandNode(child)
  }
}
const expandAll = () => {
  for (const node of nodes.value) expandNode(node)
  expandedKeys.value = { ...expandedKeys.value }
}
onMounted(() => expandAll())
</script>

<template>
  <div class="tw:h-full tw:flex tw:flex-col tw:min-h-0">
    <BasePanel
      :class-names="{
        root: 'tw:flex tw:flex-col tw:h-full',
        header: 'tw:shrink-0',
      }"
    >
      <template #header>
        <h2 class="tw:text-lg tw:font-bold tw:text-foreground tw:px-2">دسته بندی</h2>
      </template>

      <template #subheader>
        <Toolbar :pt="{ root: 'tw:flex-nowrap tw:border-0' }">
          <template #start>
            <div class="tw:max-w-42">
              <IconField>
                <InputText
                  inputId="noSazi"
                  v-model="form.search"
                  fluid
                  class="tw:bg-transparent"
                  placeholder="جستجو"
                />
                <InputIcon class="pi pi-search" />
              </IconField>
            </div>
          </template>
          <template #end>
            <div class="tw:flex tw:justify-center tw:md:gap-1 tw:lg:gap-4">
              <BaseButton
                severity="secondary"
                variant="outlined"
                :shadow="false"
                :class-name="{ root: 'tw:size-10' }"
              >
                <template #icon><Check class="tw:size-5" /></template>
              </BaseButton>
              <BaseButton
                severity="secondary"
                variant="outlined"
                :shadow="false"
                :class-name="{ root: 'tw:size-10' }"
              >
                <template #icon><Book class="tw:size-5" /></template>
              </BaseButton>
              <div>
                <BaseButton
                  severity="secondary"
                  variant="outlined"
                  :shadow="false"
                  @click="toggle"
                  :class-name="{ root: 'tw:size-10' }"
                >
                  <template #icon><Ellipsis /></template>
                </BaseButton>
                <Menu ref="menu" :model="items" :popup="true" />
              </div>
            </div>
          </template>
        </Toolbar>
      </template>

      <template #content>
        <Tree
          v-model:expandedKeys="expandedKeys"
          v-model:selection-keys="selectedKey"
          :value="nodes"
          selectionMode="checkbox"
          class="tw:w-full"
          draggableNodes
          droppableNodes
        />
      </template>
    </BasePanel>
  </div>
</template>
<style>
::-webkit-scrollbar {
  width: 3px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--tw-color-background);
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    var(--tw-color-primary-main) 0%,
    var(--tw-color-primary-shade-01) 100%
  );
  border-radius: 10px;
  transition: all 0.35s ease;
  opacity: 0.7;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>

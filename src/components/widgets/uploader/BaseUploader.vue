<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Select from 'primevue/select'
import Tag from 'primevue/tag'
import ProgressBar from 'primevue/progressbar'
import Checkbox from 'primevue/checkbox'
import Divider from 'primevue/divider'
import { BasePanel } from '@/components/base/panel'
import { BaseButton } from '@/components/base/button'
import { v4 as uuidv4 } from 'uuid'
import Panel from 'primevue/panel'

/* ====================== Types & Props ====================== */

interface Props {
  modelValue?: File[] | null
  accept?: string
  multiple?: boolean
  maxFiles?: number
}

type UploadStatus = 'pending' | 'uploading' | 'success' | 'error'

interface RowMeta {
  key: string
  group: string | null
  type: string | null
  page: string | null
  request: string | null
  status: UploadStatus
  progress: number | null
  selected?: boolean
}

interface UploadRowPayload {
  file: File
  meta: RowMeta
}

// v-model:visible از والد
const visible = defineModel<boolean>('visible', { default: false })

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  accept: '',
  multiple: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
  (e: 'files-selected', value: File[]): void
  (e: 'submit', payload: UploadRowPayload[]): void
}>()

/* ====================== State ====================== */

const fileInputRef = ref<HTMLInputElement | null>(null)
const files = ref<File[]>(props.modelValue ? [...props.modelValue] : [])
const rowMeta = ref<Record<string, RowMeta>>({})
const isDragging = ref(false)

const groupOptions = [
  { label: 'گروه ۱', value: 'group-1' },
  { label: 'گروه ۲', value: 'group-2' },
  { label: 'گروه ویژه', value: 'group-special' },
]
const typeOptions = [
  { label: 'نوع ۱', value: 'type-1' },
  { label: 'نوع ۲', value: 'type-2' },
  { label: 'نوع ویژه', value: 'type-special' },
]
const pageOptions = [
  { label: 'ش. برگ', value: 'form' },
  { label: 'ضمایم', value: 'attachments' },
]
const requestOptions = [
  { label: 'ش. درخواست', value: 'request' },
  { label: 'ش. پاسخ', value: 'response' },
]

const statusLabel: Record<UploadStatus, string> = {
  pending: 'در صف',
  uploading: 'در حال آپلود',
  success: 'انجام شد',
  error: 'خطا',
}

const statusSeverity: Record<UploadStatus, 'info' | 'warning' | 'success' | 'danger'> = {
  pending: 'info',
  uploading: 'warning',
  success: 'success',
  error: 'danger',
}

/* ====================== Computed ====================== */

const selectedFiles = computed(() => files.value)
const hasFiles = computed(() => selectedFiles.value.length > 0)

const maxSelected = computed(() => {
  if (!props.multiple) return 1
  return props.maxFiles ?? Number.POSITIVE_INFINITY
})

const isAtLimit = computed(() => props.multiple && selectedFiles.value.length >= maxSelected.value)

const helperText = computed(() => {
  if (isAtLimit.value) return 'حداکثر تعداد فایل‌ مجاز انتخاب شده است.'
  if (props.multiple) {
    if (props.maxFiles) return `حداکثر ${props.maxFiles} فایل می‌توانید اضافه کنید.`
    return 'می‌توانید چندین فایل را همزمان اضافه کنید.'
  }
  return hasFiles.value
    ? 'برای جایگزینی، فایل جدیدی انتخاب کنید.'
    : 'یک فایل برای شروع انتخاب کنید.'
})

const acceptSummary = computed(() =>
  props.accept && props.accept.length ? `فرمت‌های مجاز: ${props.accept}` : 'همه فرمت‌ها مجاز هستند',
)

const dropTitle = computed(() =>
  props.multiple ? 'تصویر یا تصاویر خود را آپلود کنید' : 'تصویر خود را آپلود کنید',
)
const dropActionLabel = computed(() => (props.multiple ? 'آپلود تصاویر' : 'آپلود تصویر'))

const fileKeyMap = new WeakMap<File, string>()

function getFileKey(file: File): string {
  if (!fileKeyMap.has(file)) {
    fileKeyMap.set(file, uuidv4())
  }
  return fileKeyMap.get(file) as string
}

function syncMeta(list: File[]) {
  const nextMeta: Record<string, RowMeta> = {}
  list.forEach((file) => {
    const key = getFileKey(file)
    nextMeta[key] =
      rowMeta.value[key] ??
      ({
        key,
        group: null,
        type: null,
        page: null,
        request: null,
        status: 'pending',
        progress: null,
        selected: false,
      } satisfies RowMeta)
  })
  rowMeta.value = nextMeta
}

const rows = computed(() =>
  files.value.map((file, index) => {
    const key = getFileKey(file)
    const meta = rowMeta.value[key]
    return {
      index: index + 1,
      file,
      key,
      meta,
    }
  }),
)

/* ====================== Watchers ====================== */

watch(
  () => props.modelValue,
  (value) => {
    files.value = value ? [...value] : []
    syncMeta(files.value)
  },
  { immediate: true },
)

/* ====================== File Handling ====================== */

function openFileDialog() {
  if (isAtLimit.value) return
  fileInputRef.value?.click()
}

function updateFiles(list: File[]) {
  files.value = list
  syncMeta(list)
  emit('update:modelValue', list)
  emit('files-selected', list)
}

function handleSelection(list: FileList | null) {
  if (!list) return
  const incoming = Array.from(list)
  if (!incoming.length) return

  if (!props.multiple) {
    updateFiles(incoming.slice(0, 1))
    return
  }

  const remainingSlots = Math.max(maxSelected.value - files.value.length, 0)
  if (remainingSlots <= 0) return

  const merged = [...files.value, ...incoming.slice(0, remainingSlots)]
  updateFiles(merged.slice(0, maxSelected.value))
}

function onFileInput(e: Event) {
  const target = e.target as HTMLInputElement | null
  handleSelection(target?.files ?? null)
  if (target) target.value = ''
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
  handleSelection(e.dataTransfer?.files ?? null)
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  if (isAtLimit.value) return
  isDragging.value = true
}

function onDragLeave(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
}

function removeFileByKey(key: string) {
  const next = files.value.filter((file) => getFileKey(file) !== key)
  updateFiles(next)
}

function clearFiles() {
  updateFiles([])
}

/* ====================== Upload actions ====================== */

const isSubmitting = ref(false)

function submitRows() {
  if (isSubmitting.value) return

  const selected = rows.value.filter((row) => row.meta?.selected)
  const effectiveRows = selected.length ? selected : rows.value
  if (!effectiveRows.length) return

  isSubmitting.value = true

  effectiveRows.forEach((row) => {
    const meta = rowMeta.value[row.key]
    if (!meta) return

    meta.status = 'uploading'
    meta.progress = 0
  })

  const payload: UploadRowPayload[] = effectiveRows.map((row) => {
    const meta = rowMeta.value[row.key]

    if (!meta) {
      throw new Error(`Missing meta for row key: ${row.key}`)
    }

    return {
      file: row.file,
      meta: { ...meta },
    }
  })

  emit('submit', payload)

  isSubmitting.value = false
}

function setRowStatus(key: string, status: UploadStatus, progress?: number | null) {
  const meta = rowMeta.value[key]
  if (!meta) return
  meta.status = status
  if (typeof progress === 'number') meta.progress = progress
  else if (progress === null) meta.progress = null
}

function formatSize(bytes: number) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, exponent)
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[exponent]}`
}

defineExpose({
  setRowStatus,
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '1200px', maxWidth: '96vw' }"
    :breakpoints="{ '960px': '96vw', '640px': '100vw' }"
    :pt="{
      root: { class: 'tw:rounded-3xl tw:overflow-hidden tw:bg-background' },
      header: {
        dir: 'ltr',
        class:
          'tw:flex tw:items-center tw:justify-between tw:px-6 tw:pt-5 tw:pb-4 tw:border-0 tw:bg-transparent',
      },
    }"
  >
    <template #header>
      <div
        class="tw:flex tw:w-full tw:items-center"
        :class="hasFiles ? 'tw:justify-between' : 'tw:justify-end'"
      >
        <div v-if="hasFiles" class="tw:flex tw:items-center tw:gap-2">
          <BaseButton
            icon="pi pi-arrow-up"
            label="ارسال"
            severity="success"
            :shadow="false"
            :disabled="!hasFiles"
            @click="submitRows"
            class="tw:bg-success-tint-02 tw:border-2 tw:border-success-main tw:text-success-main tw:w-40 tw:rounded-xl"
          />
          <Divider layout="vertical" />
          <BaseButton
            icon="pi pi-times"
            label="حذف همه"
            severity="danger"
            variant="outlined"
            :shadow="false"
            :disabled="!hasFiles"
            @click="clearFiles"
            class="tw:bg-error-tint-01 tw:border-2 tw:border-error-main tw:w-40 tw:rounded-xl"
          />
          <BaseButton
            label="آپلود تصویر جدید"
            variant="outlined"
            :shadow="false"
            @click="openFileDialog"
            class="tw:w-40 tw:border-border tw:text-foreground tw:rounded-xl"
          />
        </div>

        <p class="tw:text-base tw:font-semibold tw:text-foreground">آپلود تصاویر</p>
      </div>
    </template>
    <Panel></Panel>
    <Divider class="tw:my-0" />

    <BasePanel :pt="{ root: 'tw:border-0 tw:bg-transparent' }">
      <template #content>
        <input
          ref="fileInputRef"
          class="tw:hidden"
          type="file"
          :multiple="props.multiple"
          :accept="props.accept"
          @change="onFileInput"
        />

        <div v-if="!hasFiles" class="tw:py-10">
          <div
            class="tw:flex tw:flex-col tw:items-center tw:justify-center tw:rounded-3xl tw:border tw:border-dashed tw:border-border/60 tw:bg-muted/10 tw:px-6 tw:py-16 tw:text-center tw:transition-all"
            :class="{ dragging: isDragging, 'tw:cursor-pointer': !isAtLimit }"
            @click="openFileDialog"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
            @dragend="onDragLeave"
            @drop="onDrop"
          >
            <span class="pi pi-upload tw:text-3xl tw:text-muted-foreground"></span>
            <p class="tw:mt-4 tw:text-base tw:text-foreground">
              {{ dropTitle }}
            </p>
            <p class="tw:mt-1 tw:text-xs tw:text-muted-foreground">
              {{ helperText }}
            </p>
            <p class="tw:mt-1 tw:text-xs tw:text-muted-foreground">
              {{ acceptSummary }}
            </p>
            <BaseButton
              class="tw:mt-6"
              :label="dropActionLabel"
              icon="pi pi-arrow-up"
              :shadow="false"
              variant="outlined"
            />
          </div>
        </div>

        <div v-else>
          <DataTable
            :value="rows"
            dataKey="key"
            class="tw-w-full"
            :pt="{
              root: {
                class: 'tw-rounded-xl tw-border tw-border-border/70 tw-bg-surface-0 tw-shadow-sm',
              },
              table: { class: 'tw-w-full tw-text-xs' },
              headerRow: { class: 'tw:bg-muted/40' },
              bodyRow: { class: 'tw:hover:bg-muted/40 tw:transition-colors' },
            }"
          >
            <Column header="ردیف" field="index" style="width: 60px; text-align: center">
              <template #body="{ data }">
                <span class="tw-text-xs tw-text-muted-foreground tw-text-center tw-block">
                  {{ data.index }}
                </span>
              </template>
            </Column>

            <Column header="نام فایل" style="min-width: 200px">
              <template #body="{ data }">
                <div class="tw:flex tw:items-center tw:gap-3">
                  <div
                    class="tw:flex tw:h-11 tw:w-11 tw:items-center tw:justify-center tw:rounded-2xl tw:bg-muted/60"
                  >
                    <span class="pi pi-image tw:text-lg tw:text-muted-foreground"></span>
                  </div>
                  <div class="tw:min-w-0 tw:flex-1">
                    <p class="tw:truncate tw:text-xs tw:font-medium tw:text-foreground">
                      {{ data.file.name }}
                    </p>
                    <p class="tw:text-[10px] tw:text-muted-foreground">
                      {{ formatSize(data.file.size) }}
                    </p>
                  </div>
                </div>
              </template>
            </Column>

            <Column header="گروه" style="min-width: 130px">
              <template #body="{ data }">
                <Select
                  v-model="data.meta.group"
                  :options="groupOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="گروه"
                  class="uploader-select"
                />
              </template>
            </Column>

            <Column header="نوع" style="min-width: 130px">
              <template #body="{ data }">
                <Select
                  v-model="data.meta.type"
                  :options="typeOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="نوع"
                  class="uploader-select"
                />
              </template>
            </Column>

            <Column header="ش. برگ" style="min-width: 130px">
              <template #body="{ data }">
                <Select
                  v-model="data.meta.page"
                  :options="pageOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="ش. برگ"
                  class="uploader-select"
                />
              </template>
            </Column>

            <Column header="ش. درخواست" style="min-width: 130px">
              <template #body="{ data }">
                <Select
                  v-model="data.meta.request"
                  :options="requestOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="ش. درخواست"
                  class="uploader-select"
                />
              </template>
            </Column>

            <Column header="وضعیت" style="min-width: 170px">
              <template #body="{ data }">
                <div class="tw:flex tw:flex-col tw:gap-1 tw:items-start tw:justify-center">
                  <Tag
                    :value="statusLabel[data.meta.status as UploadStatus]"
                    :severity="statusSeverity[data.meta.status as UploadStatus]"
                    class="tw-text-[10px] tw-px-3 tw:py-1 tw-rounded-full"
                  />
                  <ProgressBar
                    v-if="data.meta.status === 'uploading' && data.meta.progress !== null"
                    :value="data.meta.progress"
                    class="tw:h-1 tw:w-24"
                  />
                </div>
              </template>
            </Column>

            <Column header="" style="width: 60px; text-align: center">
              <template #body="{ data }">
                <div class="tw-flex tw-justify-center">
                  <Checkbox v-model="data.meta.selected" binary />
                </div>
              </template>
            </Column>

            <Column header="" style="width: 60px; text-align: center">
              <template #body="{ data }">
                <div class="tw-flex tw-justify-center">
                  <BaseButton
                    icon="pi pi-trash"
                    severity="danger"
                    text
                    rounded
                    :shadow="false"
                    size="small"
                    aria-label="حذف فایل"
                    @click="removeFileByKey(data.key)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </BasePanel>
  </Dialog>
</template>

<style scoped>
.empty-drop.dragging {
  border-color: var(--p-primary-color);
  background-color: color-mix(in srgb, var(--p-primary-color) 10%, transparent);
  transform: translateY(-2px);
}

.uploader-select :deep(.p-select) {
  width: 100%;
  border-radius: 999px;
  min-height: 40px;
  font-size: 0.75rem;
}

.uploader-select :deep(.p-select-label) {
  padding-inline: 0.75rem;
}

.uploader-select :deep(.p-select-trigger) {
  border-inline-start: 1px solid transparent;
  padding-inline: 0.5rem;
}
</style>

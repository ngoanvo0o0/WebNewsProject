<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
              <div class="text-left sm:mb-5 mb-3">
                <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Danh sách bài viết của {{ newsOfMember.name }} trong {{ newsOfMember.month }}</DialogTitle>
              </div>

              <div>
                <ag-grid-vue
                  class="ag-theme-material table-clickable"
                  style="height: calc(100vh - 350px); width: 100%;"
                  :row-data="props.newsDetailOfMember"
                  :columnDefs="columnDefs.value"
                  :defaultColDef="defaultColDef"
                  :enable-browser-tooltips="true"
                  :row-class="'cursor-pointer'"
                  overlay-no-rows-template="Không tìm thấy bài viết"
                  animateRows="true"
                  @suppressRowClickSelection="true"
                  @cell-clicked="handleCellClickedEvent"
                  @first-data-rendered="handleFitColumnsEvent"
                >
                </ag-grid-vue>
              </div>

              <div class="flex mt-5 sm:mt-6 justify-end">
                <button type="button" class="inline-flex w-36 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="emits('onClose')">Đóng</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { reactive, PropType } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { AgGridVue } from "ag-grid-vue3"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { CellClickedEvent } from 'ag-grid-community'
import { NewsDetailsOfMembersDto, NewsOfMemberDto } from '~/models/reports.model'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  newsOfMember: { type: Object as PropType<NewsOfMemberDto>, default: () => ({}) },
  newsDetailOfMember: { type: Array<NewsDetailsOfMembersDto>, default: () => ([]) }
})

const emits = defineEmits([
  'onClose'
])

const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: 'agTextColumnFilter',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always'
}

const columnDefs = reactive({
  value: [
    { headerName: "Tiêu đề", field: "title", minWidth: 510, with: 510, cellClass: ['underline', 'text-blue-500'] },
    { headerName: "Số lượt xem", field: "view", minWidth: 70, with: 70 },
  ]
})

const handleCellClickedEvent = ($event: CellClickedEvent) => {
  if ($event.colDef.field === 'title') {
    window.open(`https://nguoivietplus.com/bai-viet/${$event.data?.slug || ''}`, '_blank')
  }
}

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  // $event.api.sizeColumnsToFit()
}
</script>
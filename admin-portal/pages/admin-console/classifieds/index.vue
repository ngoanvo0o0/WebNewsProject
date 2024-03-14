<template>
  <div class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">Rao vặt</h1>
    <section class="flex justify-between">
      <SearchBox
        v-model="search"
        place-holder="Tìm tiêu đề"
        :search-keyword="search"
        class="w-[300px]"
        @on-searching="searchRaoVats($event)"
      />
      <div>
        <NuxtLink to="/admin-console/classifieds/add">
          <button type="submit" class="btn btn-primary font-semibold gap-2">
            <PlusIcon  class="h-5 w-5" aria-hidden="true" />
            <span>
              Thêm rao vặt
            </span>
          </button>
        </NuxtLink>
      </div>
    </section>
    <section>
      <ag-grid-vue
        class="ag-theme-material table-clickable"
        style="height: calc(100vh - 190px); width: 100%;"
        :columnDefs="columnDefs.value"
        :rowData="raoVats"
        :defaultColDef="defaultColDef"
        :cache-block-size="50"
        :enable-browser-tooltips="true"
        :row-class="'cursor-pointer'"
        :pagination="true"
        :context="contextData"
        pagination-page-size="20"
        overlay-no-rows-template="No rao vat found"
        animateRows="true"
        @cell-clicked="handleCellClickedEvent"
        @suppressRowClickSelection="true"
        @first-data-rendered="handleFitColumnsEvent"
      >
      </ag-grid-vue>
    </section>

    <ConfirmDeleteModal
      :is-open-modal="isConfirmDeleteModal"
      title="Xóa rao vặt"
      content="Bạn có chắc chắn xóa rao vặt? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteRaoVat"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3"
import { ref, onMounted, reactive } from 'vue'
import { navigateTo, useNuxtApp } from '#imports'
import moment from 'moment'
import ConfirmDeleteModal from '~/components/shared/ConfirmDeleteModal.vue'
import { RaoVatDto } from '~/models/raovat.model'
import { PlusIcon } from '@heroicons/vue/20/solid'
import SearchBox from '~/components/shared/SearchBox.vue'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { CellClickedEvent } from "ag-grid-community"

const { $api, $loading, $toast } = useNuxtApp()

const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: 'agTextColumnFilter',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always'
}

const columnDefs = reactive({
  value: [
    { headerName: "Số thứ tự", field: "customId", width: 150, minWidth: 150 },
    { headerName: "Tiêu đề", field: "title", width: 450, minWidth: 450 },
    { headerName: "Lượt xem", field: "view", width: 210, minWidth: 210 },
    { headerName: "Trạng thái", field: "status", width: 200, minWidth: 200, cellRenderer: (params: CellClickedEvent) => params.value === 'draft' ? 'Bản nháp' : 'Công bố'},
    { headerName: "Ngày xuất bản", field: "publishDate", width: 210, minWidth: 210 },
    { headerName: "Thể loại", field: "categoryName", width: 200, minWidth: 200 },
    { headerName: "Ngày tạo", field: "createdAt", width: 200, minWidth: 200 }
  ]
})

const search = ref<string>('')
const raoVats = ref<RaoVatDto[]>([])
const raoVatsTemp = ref<RaoVatDto[]>([])
const rowSelected = ref<RaoVatDto>()

const isConfirmDeleteModal = ref<boolean>(false)

onMounted(() => [
  getRaoVats()
])

const openOrCloseConfirmModal = (dataSelected: RaoVatDto) => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
  rowSelected.value = dataSelected
}

const searchRaoVats = ($event: any) => {
  if (!$event) {
    raoVats.value = raoVatsTemp.value
    return
  }

  raoVats.value = raoVatsTemp.value?.filter((item) => item.title?.toLowerCase().includes($event?.toLowerCase()))
}

const onEditRaoVats = async (dataSelected: RaoVatDto) => {
  await navigateTo(`/admin-console/classifieds/edit/${dataSelected.id}`)
}

const handleCellClickedEvent = ($event: CellClickedEvent) => {
  onEditRaoVats($event.data)
}

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  $event.api.sizeColumnsToFit()
}

const getRaoVats = async () => {
  const loader = $loading.show()

  const { data }: { data: RaoVatDto[] } = await $api.adminConsole.getRaoVats().finally(() => loader.hide())
  .finally(() => {
    loader.hide()
  })
  const dataMapped = data.map((item) => {
    return {
      ...item,
      createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm'),
      publishDate: moment(item.publishDate).format('DD/MM/YYYY HH:mm')
    } as unknown as RaoVatDto
  })
  raoVats.value = dataMapped
  raoVatsTemp.value = dataMapped
}

const deleteRaoVat = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteRaoVat(rowSelected.value?.id)
  .then(() => {
    $toast.success('Delete successful!')
    getRaoVats()
    isConfirmDeleteModal.value = false
  })
  .finally(() => {
    loader.hide()
  })
}

const contextData = ref({
  onEditRaoVats,
  openOrCloseConfirmModal
})
</script>

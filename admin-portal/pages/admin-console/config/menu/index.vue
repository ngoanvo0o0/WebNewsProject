<template>
  <div class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">Menu</h1>
    <section class="flex justify-between">
      <SearchBox
        v-model="search"
        place-holder="Tìm tên menu"
        :search-keyword="search"
        class="w-[300px]"
        @on-searching="searchMenus($event)"
      />
      <div>
        <NuxtLink to="/admin-console/config/menu/add">
          <button type="submit" class="btn btn-primary font-semibold gap-2">
            <PlusIcon  class="h-5 w-5" aria-hidden="true" />
            <span>
              Thêm menu
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
        :rowData="menus"
        :defaultColDef="defaultColDef"
        :cache-block-size="50"
        :enable-browser-tooltips="true"
        :row-class="'cursor-pointer'"
        :pagination="true"
        :context="contextData"
        pagination-page-size="20"
        overlay-no-rows-template="No menus found"
        animateRows="true"
        @cell-clicked="handleCellClickedEvent"
        @suppressRowClickSelection="true"
        @first-data-rendered="handleFitColumnsEvent"
      >
      </ag-grid-vue>
    </section>

    <ConfirmDeleteModal
      :is-open-modal="isConfirmDeleteModal"
      title="Xóa menu"
      content="Bạn có chắc chắn xóa menu? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteMenu"
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
import { MenuDto } from '~/models/menu.model'
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
    { headerName: "Order", field: "order", width: 200, minWidth: 200 },
    { headerName: "Tên menu", field: "name", width: 315, minWidth: 315 },
    { headerName: "Thể loại", field: "categoryName", width: 315, minWidth: 315 },
    { headerName: "Ngày tạo", field: "createdAt", width: 315, minWidth: 315 }
  ]
})

const search = ref<string>('')
const menus = ref<MenuDto[]>([])
const menusTemp = ref<MenuDto[]>([])
const rowSelected = ref<MenuDto>()

const isConfirmDeleteModal = ref<boolean>(false)

onMounted(() => [
  getMenus()
])

const openOrCloseConfirmModal = (dataSelected: MenuDto) => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
  rowSelected.value = dataSelected
}

const searchMenus = ($event: any) => {
  if (!$event) {
    menus.value = menusTemp.value
    return
  }

  menus.value = menusTemp.value?.filter((item) => item.name?.toLowerCase().includes($event?.toLowerCase()))
}

const onEditMenu = async (dataSelected: RaoVatDto) => {
  await navigateTo(`/admin-console/config/menu/edit/${dataSelected.id}`)
}

const handleCellClickedEvent = ($event: CellClickedEvent) => {
  onEditMenu($event.data)
}

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  $event.api.sizeColumnsToFit()
}

const getMenus = async () => {
  const loader = $loading.show()

  const { data }: { data: MenuDto[] } = await $api.adminConsole.getMenus()
  .finally(() => {
    loader.hide()
  })
  const dataMapped = data.map((item) => {
    return {
      ...item,
      createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm')
    } as unknown as MenuDto
  })
  menus.value = dataMapped
  menusTemp.value = dataMapped
}

const deleteMenu = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteMenu(rowSelected.value?.id)
  .then(() => {
    $toast.success('Delete successful!')
    getMenus()
    isConfirmDeleteModal.value = false
  })
  .finally(() => {
    loader.hide()
  })
}

const contextData = ref({
  onEditMenu,
  openOrCloseConfirmModal
})
</script>

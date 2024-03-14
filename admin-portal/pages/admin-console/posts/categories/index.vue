<template>
  <div class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">Quản lý danh mục</h1>
    <section class="flex justify-between">
      <SearchBox
        v-model="search"
        place-holder="Tìm tên danh mục"
        :search-keyword="search"
        class="w-[300px]"
        @on-searching="searchCategories($event)"
      />
      <div>
        <NuxtLink to="/admin-console/posts/categories/add">
          <button type="submit" class="btn btn-primary font-semibold gap-2">
            <PlusIcon  class="h-5 w-5" aria-hidden="true" />
            <span>
              Thêm danh mục
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
        :rowData="categories"
        :defaultColDef="defaultColDef"
        :cache-block-size="50"
        :enable-browser-tooltips="true"
        :row-class="'cursor-pointer'"
        :pagination="true"
        :context="contextData"
        pagination-page-size="20"
        overlay-no-rows-template="No categories found"
        animateRows="true"
        @cell-clicked="handleCellClickedEvent"
        @suppressRowClickSelection="true"
        @first-data-rendered="handleFitColumnsEvent"
      >
      </ag-grid-vue>
    </section>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3"
import { ref, onMounted, reactive } from 'vue'
import { navigateTo, useNuxtApp } from '#imports'
import moment from 'moment'
import { capitalizeString, convertCategory, convertStatus } from '~/utils/functions'
import { PlusIcon } from '@heroicons/vue/20/solid'
import SearchBox from '~/components/shared/SearchBox.vue'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { CellClickedEvent } from "ag-grid-community"

const { $api, $loading } = useNuxtApp()
const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: 'agTextColumnFilter',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always'
}

const columnDefs = reactive({
  value: [
    { headerName: "Tên danh mục", field: "name", width: 220, minWidth: 220 },
    { headerName: "Danh mục cha", field: "parentCategory.name", width: 180, minWidth: 180 },
    { headerName: "Trạng thái", field: "status", width: 180, minWidth: 180 },
    { headerName: "Loại danh mục", field: "type", width: 180, minWidth: 180 },
    { headerName: "Hiển thị loại", field: "styleShow", width: 180, minWidth: 180 },
    { headerName: "Ngày tạo", field: "createdAt", width: 180, minWidth: 180 }
  ]
})

const categories = ref()
const categoriesTemp = ref()
const search = ref('')

onMounted(() => {
  getCategories()
})

const onEditCategory = (dataSelected) => {
  navigateTo(`/admin-console/posts/categories/edit/${dataSelected.id}`)
}

const handleCellClickedEvent = ($event: CellClickedEvent) => {
  onEditCategory($event.data)
}

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  $event.api.sizeColumnsToFit()
}

const deleteItem = async (dataSelected) => {
  const loader = $loading.show()
  await $api.adminConsole.deleteCategory(dataSelected.id).finally(() => loader.hide())
  getCategories()
}

const getCategories = async () => {
  const { data } = await $api.adminConsole.getCategories()
  const result = data.map((category) => ({
    ...category,
    createdAt: moment(category.createdAt).format('DD/MM/YYYY HH:mm'),
    status: convertStatus(category.status),
    type: convertCategory(category.type),
    styleShow: capitalizeString(category.styleShow)
  }))

  categories.value = result
  categoriesTemp.value = result
}
const searchCategories = async ($event: any) => {
  if (!$event) {
    categories.value = categoriesTemp.value
    return
  }

  categories.value = categoriesTemp.value?.filter((item) => item.name?.toLowerCase().includes($event?.toLowerCase()))
}

const contextData = ref({
  onEditCategory,
  deleteItem
})
</script>

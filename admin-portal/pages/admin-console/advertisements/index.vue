<template>
  <div class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">Quản lý quảng cáo</h1>
    <section class="flex justify-between">
      <!-- <SearchBox
        v-model="search"
        place-holder="Tìm tên menu"
        :search-keyword="search"
        class="w-[300px]"
        @on-searching="searchMenus($event)"
      /> -->
      <section />
      <div>
        <NuxtLink to="/admin-console/advertisements/create">
          <button type="submit" class="btn btn-primary font-semibold gap-2">
            <PlusIcon  class="h-5 w-5" aria-hidden="true" />
            <span>
              Thêm quảng cáo
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
        :rowData="advertisements"
        :defaultColDef="defaultColDef"
        :cache-block-size="50"
        :enable-browser-tooltips="true"
        :row-class="'cursor-pointer'"
        :pagination="true"
        :context="contextData"
        pagination-page-size="20"
        overlay-no-rows-template="No advertisements found"
        animateRows="true"
        @cell-clicked="handleCellClickedEvent"
        @suppressRowClickSelection="true"
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
import { AdvertisementDto } from '~/models/advertisement.model'
import { PlusIcon } from '@heroicons/vue/20/solid'
import SearchBox from '~/components/shared/SearchBox.vue'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { CellClickedEvent } from "ag-grid-community"

  const { $api, $loading, $toast } = useNuxtApp();

const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: 'agTextColumnFilter',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always'
}

const columnDefs = reactive({
  value: [
    { headerName: "Ảnh", field: "imageUrl", width: 200, minWidth: 200 },
    { headerName: "Tên", field: "name", width: 200, minWidth: 200 },
    { headerName: "Vị trí", field: "position", width: 200, minWidth: 200 },
    { headerName: "Thứ tự", field: "order", width: 200, minWidth: 200 },
    { headerName: "Ngày chỉnh sửa", field: "updatedAt", width: 200, minWidth: 200, cellRenderer: (params: CellClickedEvent) => moment(params.value).format('DD/MM/YYYY HH:mm') },
    { headerName: "Trạng thái", field: "status", width: 200, minWidth: 200 }
  ]
})

const advertisements = ref()
const search = ref('')

  onMounted(() => {
    getAdvertisements() 
  })

  const onEditAdv = (items: AdvertisementDto) => {
    navigateTo(`/admin-console/advertisements/${items.id}`)
  }

  const handleCellClickedEvent = ($event: CellClickedEvent) => {
    onEditAdv($event.data)
  }

  const getAdvertisements = async () => {
		const loader = $loading.show()

    const data: AdvertisementDto[] = await $api.advertisement.getAdvertisements().finally(() => loader.hide())
    const dataMapped = data.map((item) => {
      return {
        ...item,
        status: item.status === 'active' ? 'Đang hoạt động' : 'Dừng hoạt động',
        createdAt: moment(item.createdAt).local().format('DD/MM/YYYY HH:mm')
      }
    })
    advertisements.value = dataMapped
  }

  const deleteAdvertisement = async (id: string) => {
    const loader = $loading.show()

    try {
      await $api.advertisement.deleteAdvertisement(id)
      $toast.success('Advertisement deleted successfully')
      advertisements.value = advertisements.value.filter((item: AdvertisementDto) => item.id !== id)
    } catch (_) {
      $toast.error('Advertisement deleted failed')
    } finally {
      loader.hide()
    }
  }

  const contextData = ref({
    onEditAdv,
    deleteAdvertisement
  })
</script>

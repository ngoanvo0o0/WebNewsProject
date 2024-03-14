<template>
  <div class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">Lịch sử</h1>
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
        pagination-page-size="20"
        overlay-no-rows-template="No advertisements found"
        animateRows="true"
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
import { useNuxtApp } from '#imports'
import { HistoryDto, HistoryEntityType } from "~/models/history.model";

import moment from 'moment'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { CellClickedEvent } from "ag-grid-community"

  const { $api, $loading } = useNuxtApp();

const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: 'agTextColumnFilter',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always'
}

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  $event.api.sizeColumnsToFit()
}

const columnDefs = reactive({
  value: [
    { headerName: "Người dùng", field: "userName" },
    { headerName: "Hành động", field: "action" },
    { headerName: "Loại", field: "entityType" },
    { headerName: "Đối tượng", field: "entityName" },
    { headerName: "Ngày thực hiện", field: "createdDate", cellRenderer: (params: CellClickedEvent) => moment(params.value).format('DD/MM/YYYY HH:mm') },
  ]
})

const advertisements = ref()

onMounted(() => {
  getHistories() 
})

const actionMap: Record<string, string>  = {
  "login": "Đăng nhập",
  "get": "Xem",
  "create": "Tạo",
  "update": "Chỉnh sửa",
  "delete": "Xoá"
}
const entityMap: Record<HistoryEntityType, string> = {
  [HistoryEntityType.RaoVat]: "Rao vặt",
  [HistoryEntityType.User]: "Người dùng",
  [HistoryEntityType.Team]: "Thành viên",
  [HistoryEntityType.Category]: "Thể loại",
  [HistoryEntityType.News]: "Tin tức",
  [HistoryEntityType.Menu]: "Menu",
  [HistoryEntityType.Configuration]: "Cấu hình",
  [HistoryEntityType.WebsiteContent]: "Nội dung trang web",
  [HistoryEntityType.Advertisement]: "Quảng cáo",
}

const getHistories = async () => {
  const loader = $loading.show()
  try {
    const data: HistoryDto[] = await $api.adminConsole.getHistories()

    advertisements.value = data.map(x => ({
      ...x,
      action: actionMap[x.action],
      entityType: entityMap[x.entityType],
    }));
  } catch(_) {}
  finally {
    loader.hide()
  }
}

</script>

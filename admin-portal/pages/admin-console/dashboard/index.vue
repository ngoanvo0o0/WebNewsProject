<template>
  <div v-if="isAdminRole" class="grid gap-y-5">
    <div class="grid gap-y-5">
      <h1 class="text-2xl font-semibold text-gray-900">Bảng điều khiển</h1>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(item) in dashboardList" :key="item.key" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="truncate text-sm font-medium text-gray-900">{{ item.title }}</h3>
              </div>
              <p class="mt-1 truncate text-2xl text-gray-500">{{ item.numberOfItem }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="grid gap-y-5">
      <h3 class="text-2xl font-semibold text-gray-900">Danh sách thông báo lịch sử</h3>
      <section>
        <ag-grid-vue
          class="ag-theme-material table-clickable"
          style="height: calc(100vh - 350px); width: 100%;"
          :row-data="dashboardResponse.histories"
          :columnDefs="historyColumnDefs.value"
          :defaultColDef="defaultColDef"
          :enable-browser-tooltips="true"
          :row-class="'cursor-pointer'"
          overlay-no-rows-template="Không tìm thấy lịch sử"
          animateRows="true"
          @suppressRowClickSelection="true"
          @first-data-rendered="handleFitColumnsEvent"
        >
        </ag-grid-vue>
      </section>
    </div>
    <div class="grid gap-y-5">
      <h3 class="text-2xl font-semibold text-gray-900">10 bài viết có lượt xem cao nhất</h3>
      <section>
        <ag-grid-vue
          class="ag-theme-material table-clickable"
          style="height: calc(100vh - 350px); width: 100%;"
          :row-data="dashboardResponse.top10OfNews"
          :columnDefs="top10OfNewsColumnDefs.value"
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
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3"
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'
import { onMounted, reactive, ref } from "vue";
import { CellClickedEvent } from "ag-grid-community";
import { useNuxtApp } from "nuxt/app";
import { DashboardDto } from "~/models/dashboard.model";
import moment from "moment";

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { RoleDto } from "~/models/auth.model";
import { onBeforeMount } from "vue";

const { $api, $loading, $toast } = useNuxtApp();

const dashboardList = ref([
  {
    key: 'totalNews',
    title: 'Tổng số bài viết',
    numberOfItem: 0
  },
  {
    key: 'totalUsers',
    title: 'Tổng số người dùng',
    numberOfItem: 0
  },
  {
    key: 'totalNewsActive',
    title: 'Bài biết đã duyệt',
    numberOfItem: 0
  },
  {
    key: 'totalNewsInactive',
    title: 'Bài viết chưa duyệt',
    numberOfItem: 0
  }
])

const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: 'agTextColumnFilter',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always'
}

const historyColumnDefs = reactive({
  value: [
    { headerName: "Người dùng", field: "userName" },
    { headerName: "Hành động", field: "action" },
    { headerName: "Loại", field: "entityType" },
    { headerName: "Đối tượng", field: "entityName" },
    { headerName: "Ngày thực hiện", field: "createdDate", cellRenderer: (params: CellClickedEvent) => moment(params.value).format('DD/MM/YYYY HH:mm') },
  ]
})

const top10OfNewsColumnDefs = reactive({
  value: [
    { headerName: "Tiêu đề", field: "title", minWidth: 350, width: 350, cellClass: ['underline', 'text-blue-500'] },
    { headerName: "Công bố", field: "isPublish", minWidth: 150, width: 150 },
    { headerName: "Hot news", field: "isHotNews", minWidth: 150, width: 150 },
    { headerName: "Lượt xem", field: "view", minWidth: 150, width: 150 },
    { headerName: 'Người tạo', field: 'createdBy', minWidth: 170, width: 170 },
    { headerName: "Ngày tạo", field: "createdAt", cellRenderer: (params: CellClickedEvent) => moment(params.value).format('DD/MM/YYYY HH:mm') },
  ]
})

const dashboardResponse = ref<DashboardDto>({})
const isAdminRole = ref<boolean>(false)

onBeforeMount(() => {
  const roleFromLocalStorage = JSON.parse(localStorage.getItem('role') as string) as RoleDto
  isAdminRole.value = roleFromLocalStorage.name === 'Admin'
})

onMounted(() => {
  getDashboard()
})

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  $event.api.sizeColumnsToFit()
}

const handleCellClickedEvent = ($event: CellClickedEvent) => {
  if ($event.colDef.field === 'title') {
    window.open(`https://nguoivietplus.com/bai-viet/${$event.data?.slug || ''}`, '_blank')
  }
}

const getDashboard = async () => {
  if (!isAdminRole.value) {
    return
  }
  const { data } = await $api.adminConsole.getDashboard()

  dashboardResponse.value = data
  dashboardList.value.forEach((item) => {
    if (data.totalCount.hasOwnProperty(item.key)) {
      item.numberOfItem = data.totalCount[item.key]
    }
  })
}
</script>
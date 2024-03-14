<template>
  <div v-if="isAdminRole" class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">Báo cáo</h1>

    <section class="grid gap-5">
      <h3 class="text-lg font-medium text-gray-900">
        Danh sách tổng bài viết trong tháng
      </h3>
      
      <ag-grid-vue
        class="ag-theme-material table-clickable"
        style="height: calc(100vh - 350px); width: 100%;"
        :row-data="totalNewsOfMonth"
        :columnDefs="columnDefs.value"
        :defaultColDef="defaultColDef"
        :enable-browser-tooltips="true"
        :row-class="'cursor-pointer'"
        overlay-no-rows-template="Không tìm thấy bài viết"
        animateRows="true"
        @suppressRowClickSelection="true"
        @first-data-rendered="handleFitColumnsEvent"
      >
      </ag-grid-vue>
    </section>

    <section class="grid gap-5">
      <h3 class="text-lg font-medium text-gray-900">
        Danh sách bài viết của mỗi thành viên
      </h3>
      
      <ag-grid-vue
        class="ag-theme-material table-clickable"
        style="height: calc(100vh - 350px); width: 100%;"
        :row-data="newsOfMembers"
        :columnDefs="newsOfMembersColumnDefs.value"
        :defaultColDef="defaultColDef"
        :enable-browser-tooltips="true"
        :row-class="'cursor-pointer'"
        overlay-no-rows-template="Không tìm thấy bài viết"
        animateRows="true"
        @suppressRowClickSelection="true"
        @first-data-rendered="handleFitColumnsEvent"
      >
      </ag-grid-vue>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { AgGridVue } from "ag-grid-vue3"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { onBeforeMount, reactive, ref } from "vue";
import { CellClickedEvent } from "ag-grid-community";
import { useNuxtApp } from "nuxt/app";
import { onMounted } from "vue";
import { NewsOfMemberDto, ToTalNewsOfMonthDto } from "~/models/reports.model";
import { RoleDto } from "~/models/auth.model";
import { ReportsViewDetails } from "#components"

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
    { headerName: "Tháng", field: "month" },
    { headerName: "Số bài viết", field: "totalNews" },
  ]
})

const newsOfMembersColumnDefs = reactive({
  value: [
    { headerName: "Tháng", field: "month" },
    { headerName: "Tên thành viên", field: "name" },
    { headerName: "Số bài viết", field: "totalNews" },
    { headerName: "Số lượt xem", field: "totalViews" },
    { headerName: "", field: "viewDetails", cellRenderer: ReportsViewDetails },
  ]
})

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  $event.api.sizeColumnsToFit()
}

const totalNewsOfMonth = ref<ToTalNewsOfMonthDto[]>()
const newsOfMembers = ref<NewsOfMemberDto[]>()
const isAdminRole = ref<boolean>(false)

onBeforeMount(() => {
  const roleFromLocalStorage = JSON.parse(localStorage.getItem('role') as string) as RoleDto
  isAdminRole.value = roleFromLocalStorage.name === 'Admin'
})

onMounted(() => {
  getTotalNewsOfMonth()
  getNewsOfMembers()
})

const getTotalNewsOfMonth = async () => {
  if (!isAdminRole.value) {
    return
  }

  const { data } = await $api.adminConsole.getTotalNewsOfMonth()
  totalNewsOfMonth.value = data
}

const getNewsOfMembers = async () => {
  if (!isAdminRole.value) {
    return
  }

  const { data } = await $api.adminConsole.getNewsOfMembers()
  newsOfMembers.value = data
}
</script>

<template>
  <div class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">Quản lý thành viên</h1>
    <section class="flex justify-between">
      <SearchBox
        v-model="search"
        place-holder="Tìm kiếm họ và tên hoặc email"
        :search-keyword="search"
        class="w-[300px]"
        @on-searching="searchTeam($event)"
      />
      <div>
        <NuxtLink to="/admin-console/team/add">
          <button type="submit" class="btn btn-primary font-semibold gap-2">
            <PlusIcon  class="h-5 w-5" aria-hidden="true" />
            <span>
              Thêm thành viên
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
        :rowData="team"
        :defaultColDef="defaultColDef"
        :cache-block-size="50"
        :enable-browser-tooltips="true"
        :row-class="'cursor-pointer'"
        :pagination="true"
        :context="contextData"
        pagination-page-size="20"
        overlay-no-rows-template="Không tìm thấy thành viên"
        animateRows="true"
        @cell-clicked="handleCellClickedEvent"
        @suppressRowClickSelection="true"
        @first-data-rendered="handleFitColumnsEvent"
      >
      </ag-grid-vue>
    </section>

    <ConfirmDeleteModal
      :is-open-modal="isConfirmDeleteModal"
      title="Xóa thành viên"
      content="Bạn có chắc chắn xóa thành viên này? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3"
import { ref, onMounted, reactive } from 'vue'
import { navigateTo, useNuxtApp } from '#imports'
import moment from 'moment'
import ConfirmDeleteModal from '~/components/shared/ConfirmDeleteModal.vue'
import { GetUsersResponse, UserDto } from '~/models/user.model'
import SearchBox from '~/components/shared/SearchBox.vue'
import { PlusIcon } from '@heroicons/vue/20/solid'

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
    { headerName: "Họ và tên", field: "name", width: 290, minWidth: 290 },
    { headerName: "Email", field: "email", width: 290, minWidth: 290 },
    { headerName: "Trạng thái", field: "status", width: 250, minWidth: 250 },
    { headerName: "Ngày tạo", field: "createdAt", width: 250, minWidth: 250 }
  ]
})

const team = ref<UserDto[]>()
const teamTemp = ref<UserDto[]>()
const search = ref<string>('')
const rowSelected = ref<UserDto>()

const isConfirmDeleteModal = ref<boolean>(false)

onMounted(() => {
  getTeam() 
})

const openOrCloseConfirmModal = (dataSelected: UserDto) => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
  rowSelected.value = dataSelected
}

const searchTeam = ($event: any) => {
  if (!$event) {
    team.value = teamTemp.value
    return
  }

  team.value = teamTemp.value?.filter((item) => item.name?.toLowerCase().includes($event?.toLowerCase()) || item.email?.toLowerCase().includes($event?.toLowerCase()))
}

const onEditTeam = async (dataSelected: UserDto) => {
  await navigateTo(`/admin-console/team/edit/${dataSelected.id}`)
}

const handleCellClickedEvent = ($event: CellClickedEvent) => {
  onEditTeam($event.data)
}

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  $event.api.sizeColumnsToFit()
}

const deleteItem = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteUser(rowSelected.value?.id)
  .then(() => {
    $toast.success('Delete successful!')
    isConfirmDeleteModal.value = false
  })
  .finally(() => {
    loader.hide()
    getTeam()
  })
}

const getTeam = async () => {
  const loader = $loading.show()

  const { data } = await $api.adminConsole.getTeam().finally(() => loader.hide()) as GetUsersResponse
  const dataMapped = data.map((item) => {
    return {
      ...item,
      status: item.status === 'active' ? 'Đang hoạt động' : 'Dừng hoạt động',
      createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm')
    } as unknown as UserDto
  })
  team.value = dataMapped
  teamTemp.value = dataMapped
}

const contextData = ref({
  onEditTeam,
  openOrCloseConfirmModal
})
</script>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3"
import { ref, onMounted, reactive } from 'vue'
import { navigateTo, useNuxtApp } from '#imports'
import moment from 'moment'
import { GetNewsResponse, NewsDto } from '~/models/news.model'
import ConfirmDeleteModal from '~/components/shared/ConfirmDeleteModal.vue'
import SearchBox from '~/components/shared/SearchBox.vue'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { CellClickedEvent } from "ag-grid-community"
import {NewsStatus} from "~/utils/constant";
import { PostsUnpublishButton } from '#components'

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
    { headerName: "Tiêu đề", field: "title", width: 370, minWidth: 370 },
    { headerName: "Lượt xem", field: "view", width: 140, minWidth: 140 },
    { headerName: "Ngày xuất bản", field: "publishDate", width: 170, minWidth: 170 },
    { headerName: "Thể loại", field: "categoryName", width: 130, minWidth: 130 },
    { headerName: "Trạng thái", field: "status", width: 150, minWidth: 130 },
    { headerName: "Ngày tạo", field: "createdAt", width: 180, minWidth: 180 },
    { headerName: "Ngày sửa", field: "updatedAt", width: 180, minWidth: 180 },
    {
      headerName: "",
      field: "",
      width: 180,
      minWidth: 180,
      cellRenderer: PostsUnpublishButton
    }
  ]
})

const search = ref<string>('')
const news = ref<NewsDto[]>([])
const newsTemp = ref<NewsDto[]>([])
const rowSelected = ref<NewsDto>()
const publishNewsSelected = ref<NewsDto>()

const isConfirmDeleteModal = ref<boolean>(false)
const isConfirmPublishNews = ref<boolean>(false)

onMounted(() => [
  getNews()
])

const openOrCloseConfirmModal = (dataSelected: NewsDto) => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
  rowSelected.value = dataSelected
}

const onTriggerUnpublishNewsModal = (dataSelected: NewsDto) => {
  isConfirmPublishNews.value = !isConfirmPublishNews.value
  publishNewsSelected.value = dataSelected
}

const searchNews = ($event: any) => {
  if (!$event) {
    news.value = newsTemp.value
    return
  }

  news.value = newsTemp.value?.filter((item) => item.title?.toLowerCase().includes($event?.toLowerCase()))
}

const onEditNews = async (dataSelected: NewsDto) => {
  await navigateTo(`/admin-console/posts/all-posts/edit/${dataSelected.slug}`)
}

const handleCellClickedEvent = ($event: CellClickedEvent) => {
  onEditNews($event.data)
}

const handleFitColumnsEvent = ($event: CellClickedEvent) => {
  $event.api.sizeColumnsToFit()
}

const getNews = async () => {
  const loader = $loading.show()

  const { items } = await $api.adminConsole.getNews(NewsStatus.Publish)
      .finally(() => {
        loader.hide()
      }) as GetNewsResponse
  const dataMapped = items.map((item) => {
    return {
      ...item,
      status: item.status === 'draft' ? 'Bản nháp' : 'Công bố',
      createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm'),
      updatedAt: moment(item.updatedAt).format('DD/MM/YYYY HH:mm'),
      publishDate: item.publishDate ? moment(item.publishDate).format('DD/MM/YYYY HH:mm') : '-'
    } as unknown as NewsDto
  })
  news.value = dataMapped
  newsTemp.value = dataMapped
}

const deleteNews = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteNews(rowSelected.value?.id)
    .then(() => {
      $toast.success('Xóa thành công!')
      getNews()
      isConfirmDeleteModal.value = false
    })
    .finally(() => {
      loader.hide()
    })
}

const unpublishNews = async () => {
  const loader = $loading.show()
  console.log('published', publishNewsSelected.value?.id)
  await $api.adminConsole.changeStatusNews(publishNewsSelected.value?.id)
    .then(() => {
      $toast.success('Hủy công bố bài viết thành công!')
      getNews()
      isConfirmPublishNews.value = false
    })
    .finally(() => {
      loader.hide()
    })
}

const contextData = ref({
  onEditNews,
  openOrCloseConfirmModal,
  onTriggerUnpublishNewsModal
})
</script>

<template>
  <div class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">Quản lý bài viết công bố</h1>
    <section class="flex justify-between">
      <SearchBox
        v-model="search"
        place-holder="Tìm tiêu đề bài viết"
        :search-keyword="search"
        class="w-[300px]"
        @on-searching="searchNews($event)"
      />
    </section>
    <ag-grid-vue
      class="ag-theme-material table-clickable"
      style="height: calc(100vh - 190px); width: 100%;"
      :columnDefs="columnDefs.value"
      :rowData="news"
      :defaultColDef="defaultColDef"
      :cache-block-size="50"
      :enable-browser-tooltips="true"
      :row-class="'cursor-pointer'"
      :pagination="true"
      :context="contextData"
      pagination-page-size="20"
      overlay-no-rows-template="No news found"
      animateRows="true"
      @cell-clicked="handleCellClickedEvent"
      @suppressRowClickSelection="true"
      @first-data-rendered="handleFitColumnsEvent"
    >
    </ag-grid-vue>
    <section>
    </section>

    <ConfirmDeleteModal
      :is-open-modal="isConfirmDeleteModal"
      title="Xóa bài viết"
      content="Bạn có chắc chắn xóa bài viết? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteNews"
    />

    <!--    Confirm publish news-->
    <ConfirmDeleteModal
      :is-open-modal="isConfirmPublishNews"
      title="Hủy công bố bài viết"
      content="Bạn có chắc chắn hủy công bố bài viết?"
      button-content="Hủy công bố"
      @closeModal="onTriggerUnpublishNewsModal"
      @submit="unpublishNews"
    />
  </div>
</template>

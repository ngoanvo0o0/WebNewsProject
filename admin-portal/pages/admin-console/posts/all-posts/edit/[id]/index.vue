<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Chỉnh sửa bài viết
      </h1>
      <div>
        <p class="font-normal text-sm text-gray-500">
          Ngày sửa: {{ moment(news?.updatedAt).format('DD-MM-YYYY') }}
        </p>
        <p class="font-normal text-sm text-gray-500">
          Người sửa: {{ news?.userNameUpdated || getUserNameFromLocalStorage()?.name }}
        </p>
      </div>
    </div>

    <NewsForm 
      :news="news"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useNuxtApp, useRoute } from 'nuxt/app';
import { onMounted, ref } from 'vue';
import NewsForm from '~/components/posts/NewsForm.vue'
import { NewsDto, NewsResponse } from '~/models/news.model';
import { getUserNameFromLocalStorage } from '~/utils/functions';

const { $loading, $api } = useNuxtApp()
const $route = useRoute()
const newsId = $route.params.id as string
const news = ref<NewsDto>()

onMounted(() => {
  getNewsById()
})

const getNewsById = async () => {
  const loader = $loading.show()
 
 await $api.adminConsole.getNewsById(newsId)
  .then((data: NewsDto ) => {
    news.value = data
  })
  .finally(() => {
    loader.hide()
  }) as NewsDto
}
</script>

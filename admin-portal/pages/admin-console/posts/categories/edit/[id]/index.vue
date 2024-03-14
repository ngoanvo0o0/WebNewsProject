<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Chỉnh sửa danh mục
      </h1>
      <div>
        <p class="font-normal text-sm text-gray-500">
          Ngày sửa: {{ moment(category?.updatedAt).format('DD-MM-YYYY') }}
        </p>
        <p class="font-normal text-sm text-gray-500">
          Người sửa: {{ category?.userNameUpdated || getUserNameFromLocalStorage()?.name }}
        </p>
      </div>
    </div>

    <CategoryForm
      :category="category"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useNuxtApp, useRoute } from 'nuxt/app';
import { onMounted, ref } from 'vue';
import { GetCategoryByIdResponse } from '~/models/category.model';
import CategoryForm from "~/components/categories/CategoryForm.vue";
import { getUserNameFromLocalStorage } from '~/utils/functions';

const { $loading, $api } = useNuxtApp()
const $route = useRoute()
const categoryId = $route.params.id as string
const category = ref()

onMounted(() => {
  getCategoryById()
})

const getCategoryById = async () => {
  const loader = $loading.show()
 
  const { data } = await $api.adminConsole.getCategoryById(categoryId).finally(() => loader.hide()) as GetCategoryByIdResponse
  category.value = data
}
</script>

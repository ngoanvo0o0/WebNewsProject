<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Chỉnh sửa menu
      </h1>
      <div>
        <p class="font-normal text-sm text-gray-500">
          Ngày sửa: {{ moment(menu?.updatedAt).format('DD-MM-YYYY') }}
        </p>
        <p class="font-normal text-sm text-gray-500">
          Người sửa: {{ menu?.userNameUpdated || getUserNameFromLocalStorage()?.name }}
        </p>
      </div>
    </div>

    <MenuForm
      :menu="menu"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useNuxtApp, useRoute } from 'nuxt/app';
import { onMounted, ref } from 'vue';
import MenuForm from '~/components/config/menu/MenuForm.vue'
import { MenuDto, MenuResponse } from '~/models/menu.model';
import { getUserNameFromLocalStorage } from '~/utils/functions';

const { $loading, $api } = useNuxtApp()
const $route = useRoute()
const menuId = $route.params.id as string
const menu = ref<MenuDto>()

onMounted(() => {
  getMenusById()
})

const getMenusById = async () => {
  const loader = $loading.show()
 
 await $api.adminConsole.getMenusById(menuId)
  .then(({ data }: { data: MenuDto }) => {
    menu.value = data
  })
  .finally(() => {
    loader.hide()
  }) as MenuResponse
}
</script>

<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Chỉnh sửa người dùng
      </h1>
      <div>
        <p class="font-normal text-sm text-gray-500">
          Ngày sửa: {{ moment(user?.updatedAt).format('DD-MM-YYYY') }}
        </p>
        <p class="font-normal text-sm text-gray-500">
          Người sửa: {{ user?.userNameUpdated || getUserNameFromLocalStorage()?.name }}
        </p>
      </div>
    </div>

    <UsersForm
      :user="user"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useNuxtApp, useRoute } from 'nuxt/app';
import { onMounted, ref } from 'vue';
import UsersForm from '~/components/users/UsersForm.vue';
import { GetUsersByIdResponse, UserDto } from '~/models/user.model';
import { getUserNameFromLocalStorage } from '~/utils/functions';

const { $loading, $api } = useNuxtApp()
const $route = useRoute()
const userId = $route.params.id as string
const user = ref<UserDto>()

onMounted(() => {
  getUsersById()
})

const getUsersById = async () => {
  const loader = $loading.show()
 
  const { data } = await $api.adminConsole.getUsersById(userId).finally(() => loader.hide()) as GetUsersByIdResponse
  user.value = data
}
</script>

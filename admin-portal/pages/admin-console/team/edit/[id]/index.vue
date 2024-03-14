<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Chỉnh sửa thành viên
      </h1>
      <div>
        <p class="font-normal text-sm text-gray-500">
          Ngày sửa: {{ moment(team?.updatedAt).format('DD-MM-YYYY') }}
        </p>
        <p class="font-normal text-sm text-gray-500">
          Người sửa: {{ team?.userNameUpdated || getUserNameFromLocalStorage()?.name }}
        </p>
      </div>
    </div>

    <TeamForm
      :team="team"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useNuxtApp, useRoute } from 'nuxt/app';
import { onMounted, ref } from 'vue';
import TeamForm from '~/components/team/TeamForm.vue';
import { GetUsersByIdResponse, UserDto } from '~/models/user.model';
import { getUserNameFromLocalStorage } from '~/utils/functions';

const { $loading, $api } = useNuxtApp()
const $route = useRoute()
const userId = $route.params.id as string
const team = ref<UserDto>()

onMounted(() => {
  getTeamById()
})

const getTeamById = async () => {
  const loader = $loading.show()
 
  const { data } = await $api.adminConsole.getTeamById(userId).finally(() => loader.hide()) as GetUsersByIdResponse
  team.value = data
}
</script>

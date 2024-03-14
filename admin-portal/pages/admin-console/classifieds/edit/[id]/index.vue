<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Chỉnh sửa rao vặt
      </h1>
      <div>
        <p class="font-normal text-sm text-gray-500">
          Ngày sửa: {{ moment(raoVats?.updatedAt).format('DD-MM-YYYY') }}
        </p>
        <p class="font-normal text-sm text-gray-500">
          Người sửa: {{ raoVats?.userNameUpdated || getUserNameFromLocalStorage()?.name }}
        </p>
      </div>
    </div>

    <ClassifiedsForm 
      :raoVats="raoVats"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useNuxtApp, useRoute } from 'nuxt/app';
import { onMounted, ref } from 'vue';
import ClassifiedsForm from '~/components/classifieds/ClassifiedsForm.vue'
import { NewsResponse } from '~/models/news.model';
import { RaoVatDto } from '~/models/raovat.model';
import { getUserNameFromLocalStorage } from '~/utils/functions';

const { $loading, $api } = useNuxtApp()
const $route = useRoute()
const raoVatsId = $route.params.id as string
const raoVats = ref<RaoVatDto>()

onMounted(() => {
  getRaoVatsById()
})

const getRaoVatsById = async () => {
  const loader = $loading.show()
 
 await $api.adminConsole.getRaoVatsById(raoVatsId)
  .then(({ data }: { data: RaoVatDto }) => {
    raoVats.value = data
  })
  .finally(() => {
    loader.hide()
  }) as NewsResponse
}
</script>

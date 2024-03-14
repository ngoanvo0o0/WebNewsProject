<template>
  <div>
    <div class="underline text-blue-500 cursor-pointer" @click="onTriggerModal">
      Xem chi tiết
    </div>

    <ReportsModals
      :is-open="isOpen"
      :news-of-member="newsOfMember"
      :news-detail-of-member="newsDetailOfMember"
      @on-close="onTriggerModal"
    />
  </div>
</template>

<script setup lang="ts">
import { CellClickedEvent } from 'ag-grid-community'
import { useNuxtApp } from 'nuxt/app';
import { PropType, ref } from 'vue'
import { NewsDetailsOfMembersDto, NewsOfMemberDto } from '~/models/reports.model';
const { $api, $loading, $toast } = useNuxtApp();

const props = defineProps({
  params: { type: Object as PropType<CellClickedEvent>, default: () => null }
})

const isOpen = ref<boolean>(false)
const newsOfMember = ref<NewsOfMemberDto>(props.params.data)
const newsDetailOfMember = ref<NewsDetailsOfMembersDto[]>([])

const onTriggerModal = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && newsOfMember.value.userId && newsOfMember.value.month) {
    await getNewsDetailsOfMembers(newsOfMember.value.userId, newsOfMember.value.month)
  } else {
    newsDetailOfMember.value = []
  }
}

const getNewsDetailsOfMembers = async (userId: string, month: string) => {
  const loader = $loading.show()
  const { data } = await $api.adminConsole.getNewsDetailsOfMembers(userId, month)
  .finally(() => {
    loader.hide()
  })
  newsDetailOfMember.value = data
}
</script>

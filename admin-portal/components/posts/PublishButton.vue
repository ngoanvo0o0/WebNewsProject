<script setup lang="ts">
import {PropType, ref, onBeforeMount} from "vue";
import {CellClickedEvent} from "ag-grid-community";
import {RoleDto} from "~/models/auth.model";

const props = defineProps({
  params: { type: Object as PropType<CellClickedEvent>, default: () => null }
})

const isAdminRole = ref<boolean>(false)

onBeforeMount(() => {
  const roleFromLocalStorage = JSON.parse(localStorage.getItem('role') as string) as RoleDto
  isAdminRole.value = roleFromLocalStorage.name === 'Admin'
})

const handlePublishNews = () => {
  if (!isAdminRole.value) {
    return
  }
  const { data } = props.params
  if (data) {
    props.params?.context?.onTriggerPublishNewsModal(data)
  }
}
</script>

<template>
  <span v-if="isAdminRole" class="underline text-blue-500" @click.stop="handlePublishNews">
    Công bố bài viết
  </span>
</template>

<style scoped>

</style>
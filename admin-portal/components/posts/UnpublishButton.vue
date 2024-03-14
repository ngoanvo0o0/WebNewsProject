<script setup lang="ts">
import {CellClickedEvent} from "ag-grid-community";
import {PropType, ref, onBeforeMount} from "vue";
import {RoleDto} from "~/models/auth.model";

const props = defineProps({
  params: { type: Object as PropType<CellClickedEvent>, default: () => null }
})

const isAdminRole = ref<boolean>(false)

onBeforeMount(() => {
  const roleFromLocalStorage = JSON.parse(localStorage.getItem('role') as string) as RoleDto
  isAdminRole.value = roleFromLocalStorage.name === 'Admin'
})

const handleUnpublishNews = () => {
  if (!isAdminRole.value) {
    return
  }
  const { data } = props.params
  if (data) {
    props.params?.context?.onTriggerUnpublishNewsModal(data)
  }
}
</script>

<template>
  <span v-if="isAdminRole" class="underline text-blue-500" @click.stop="handleUnpublishNews">
    Hủy công bố bài viết
  </span>
</template>

<style scoped>

</style>
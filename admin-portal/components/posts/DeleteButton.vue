<template>
  <button
    type="button"
    class="inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-w-[90px]"
    @click="onClick"
  >
    Xóa
  </button>
</template>

<script lang="ts" setup>
import { CellClickedEvent } from 'ag-grid-community'
import { PropType } from 'vue'

const props = defineProps({
  params: { type: Object as PropType<CellClickedEvent>, default: () => null }
})

const onClick = () => {
  props.params.context.openOrCloseConfirmModal(props.params.data)
}

</script>
<template>
  <div>
    <div class="flex rounded-md shadow-sm max-w-[400px]">
      <div class="relative flex items-stretch flex-grow focus-within:z-10 h-[38px] form-group">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          v-model="searchValue"
          name="search"
          class="block w-full rounded-md pl-10 sm:text-sm box-border border border-solid border-[#D1D5DB] bg-transparent placeholder:text-[#6B7280] placeholder:font-medium"
          :placeholder="placeHolder"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { ref, watch } from 'vue'

const props = defineProps({
  placeHolder: { type: String, default: 'Search' },
  searchKeyword: { type: String, default: '' }
})
const searchValue = ref<string>(props.searchKeyword)

const debounce = ref<number>(500)
const emits = defineEmits([
  'onSearching'
])

watch(() => searchValue.value, () => {
  onSearching(searchValue.value)
})

const onSearching = (val: string) => {
  const value = val.trim()
  if (debounce.value) {
    window.clearTimeout(debounce.value)
  }
  debounce.value = window.setTimeout(() => {
    emits('onSearching', value)
  }, 500)
}
</script>

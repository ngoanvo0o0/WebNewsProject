<template>
  <SharedSearchBox
    v-model="search"
    place-holder="Tìm tên ảnh"
    :search-keyword="search"
    class="w-[300px] my-4"
    @on-searching="searchImage($event)"
  />
  <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
    <li v-for="file in imageFiltered" :key="file.url" class="relative">
      <label :for="file.url" class="form-group group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <img lazy :src="apiUrl + file.url" alt="" class="pointer-events-none object-cover w-full h-full h-[200px]"  :class="{'opacity-50': selectedImages.includes(file)}"/>
        <input :id="file.url" class="border border-gray-300 rounded-md absolute top-5 left-5" type="checkbox" @change="onToggleSelect($event, file)" :checked="selectedImages.includes(file)" >
      </label>
      <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">Ngày tạo: {{ moment(file.createdAt).format('DD-MM-YYYY')}}</p>
      <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{{ getFileName(file.url)}}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import moment from "moment";
import {useRuntimeConfig} from "#app";


interface IFile {
  url: string,
  createdAt: string | Date
}
const props = defineProps({
  images: { type: Array<IFile>, default: () => ([]) }
})
  watch(() => props.images, (value) => {
    imageFiltered.value = props.images
  })

const config = useRuntimeConfig()
const apiUrl = config.public.apiURL
const emits = defineEmits(['onToggleSelectImage'])
const selectedImages = ref<IFile[]>([])
const imageFiltered = ref<IFile[]>(props.images)
const search = ref<string>('')
const onToggleSelect = (event: Event, file: IFile) => {
  const checked = (event.target as HTMLInputElement).checked
  if (checked) {
    selectedImages.value.push(file)
  } else {
    const index = selectedImages.value.indexOf(file)
    if (index > -1) { 
      selectedImages.value.splice(index, 1);
    }
  }
  emits('onToggleSelectImage', selectedImages.value)
}

const getFileName = (file: string) => {
  const split = file.split('/')
 return split[split.length - 1]
}

const searchImage = (s: string) => {
  imageFiltered.value = props.images.filter(e => e.url.includes(s))
}

</script>
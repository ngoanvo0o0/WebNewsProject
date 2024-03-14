<template>
  <div class="border-b border-gray-200 pb-5">
    <div class="sm:flex sm:items-baseline sm:justify-between">
      <div class="sm:w-0 sm:flex-1">
        <h1 id="message-heading" class="text-base font-semibold leading-6 text-gray-900">Hình ảnh</h1>
      </div>

      <div class="mt-4 flex items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start">
        <span class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">{{selectedImages.length}} ảnh được chọn</span>
        <Menu as="div" class="relative ml-3 inline-block text-left">
          <div>
            <MenuButton class="-my-2 flex items-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <span class="sr-only">Open options</span>
              <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <button type="button" @click="openOrCloseConfirmModal" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'w-full flex justify-between px-4 py-2 text-sm']">
                    <span>Xoá ảnh</span>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <SharedGallary :images="images" @onToggleSelectImage="onToggleSelectImage"/>
  </div>
  <SharedConfirmDeleteModal
      :is-open-modal="isConfirmDeleteModal"
      title="Xóa ảnh"
      content="Bạn có chắc chắn xóa những hình ảnh này? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteImages"
    />
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { PropType, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp, useRuntimeConfig } from 'nuxt/app'
import moment from 'moment'

interface IFile {
  url: string,
  createdAt: string | Date
}

const { $api, $loading, $toast } = useNuxtApp()
const $router = useRouter()
const isConfirmDeleteModal = ref<boolean>(false)
const openOrCloseConfirmModal = () => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
}
onMounted(() => {
  getImages()
})

const images = ref<IFile[]>([])
const selectedImages = ref<IFile[]>([])

const config = useRuntimeConfig()
const getImages = async () => {
  const loader = $loading.show()
  const { categoriesImages, adImages, raoVatImages} = await $api.adminConsole.getImages().finally(() => loader.hide())
  images.value = [...categoriesImages, ...adImages, ...raoVatImages].map((e: IFile) => {
  return {
    url: e.url.split('assets')[1],
    createdAt: moment(e.createdAt).format('DD-MM-YYYY')
  } as IFile
  })
}

const deleteImages = async () => {
  const loader = $loading.show()
  await $api.adminConsole.removeImage(selectedImages.value.map(e => e.url))
  .then(() => {
    isConfirmDeleteModal.value = false
    selectedImages.value = []
    $toast.success('Delete successful!')
    getImages()
  })
  .finally(() => {
    loader.hide()
  })
}

const onToggleSelectImage = (images: IFile[]) => {
  selectedImages.value = images
} 

</script>

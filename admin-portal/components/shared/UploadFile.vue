<template>
  <div
      class="flex max-w-sm p-7 flex-col items-center gap-1 border-2 border-dashed rounded-md"
      :class="{'border-indigo-500': isHover, 'border-gray-300': !isHover}"
      @dragenter.prevent="setActive"
      @dragover.prevent="setActive"
      @dragleave.prevent="setInactive"
      @drop.prevent="onDrop">
    <img src="~/assets/img/add-image.svg" alt="add-image" />

    <div class="flex flex-col items-center gap-1">
      <input
        ref="fileImageRef"
        :multiple="props.multiple"
        name="image"
        type="file"
        class="hidden"
        accept="image/*"
        @change="onSelectedFiles($event)"
      />
      <button type="button" @click="onClick">
        <p class="text-indigo-600 text-sm font-medium cursor-pointer">Upload a file</p>
      </button>
      <p class="text-xs font-medium text-gray-500">PNG, JPG, GIF up to 10MB</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue'

const events = ['dragenter', 'dragover', 'dragleave', 'drop'] as const;
const selectFileEventName = 'onSelectedFile';


const props = defineProps({
    multiple: { type: Boolean, default: () => (false) }
  })

const emits = defineEmits([
  selectFileEventName
])

const fileImageRef = ref()
const isHover = ref(false)

const onClick = () => {
  fileImageRef.value?.click()
}

const onSelectedFiles = ($event: Event) => {
  handleFile(($event?.target as HTMLInputElement)?.files!)
}

function onDrop(e: DragEvent) {
    setInactive() // add this line too
    handleFile(e.dataTransfer?.files!)
  }

  function setActive() {
      isHover.value = true
  }

  function setInactive() {
      isHover.value = false
  }

  onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
  })

  onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
  })

  function preventDefaults(e: Event) {
    e.preventDefault()
  }

  function handleFile(files: FileList) {
    if(files) {
        emits(selectFileEventName, files)
      }
    }

</script>

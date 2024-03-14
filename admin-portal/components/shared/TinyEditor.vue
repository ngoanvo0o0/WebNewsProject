<template>
  <Editor
    v-model="initialValue"
    :api-key="tinyApiKey"
    :height="500"
    :init="initPlugins"
    cloud-channel="6"
    :disabled=false
    @change="onTextChange"
  />
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import { useNuxtApp, useRuntimeConfig } from 'nuxt/app';
import { onMounted, ref, watch } from 'vue';
import { UploadType } from '~/models/common.model';


const props = defineProps({
  contentValue: { type: String, default: () => ('') }
})
const emits = defineEmits(['onTextChange'])
const { $api, $loading } = useNuxtApp()
const config = useRuntimeConfig()
const url = config.public.apiURL
const tinyApiKey = config.public.tinyApiKey

const imageUploadHandler = (blobInfo?: any) => new Promise((resolve, reject) => {
  const loader = $loading.show()
  const formData = new FormData();
  formData.append('image', blobInfo.blob(), blobInfo.filename())
  formData.append('type', UploadType.Categories)
  $api.upload.uploadFile(formData)
    .then((response: string) => {
      const urlImage = `${url}${response}`
      resolve(urlImage);
    })
    .catch((error: any) => {
      console.error("Error:", error)
      reject("Upload failed");
    })
    .finally(() => {
      loader.hide()
    })
});

const initPlugins = ref({
  plugins: [
    'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
    'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
    'table', 'emoticons', 'template', 'help'
  ],
  toolbar: 'undo redo | styles | font | bold italic | alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
    'forecolor backcolor emoticons | help',
    font_family_formats: 'sans-serif=sans-serif; Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
  image_title: true,
  automatic_uploads: true,
  file_picker_types: 'image',
  language: 'vi',
  file_picker_callback: (cb: any) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e: any) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        const id = 'blobid' + (new Date()).getTime();
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader?.result?.split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      });
      reader.readAsDataURL(file);
    });
    input.click();
  },
  images_upload_handler: imageUploadHandler
})
const initialValue = ref()

watch(() => props.contentValue, () => {
  initialValue.value = props.contentValue
  emits('onTextChange', initialValue.value)
})

onMounted(() => {
  initialValue.value = props.contentValue
})          

const onTextChange = () => {
  emits('onTextChange', initialValue.value)
}
</script>

<style>
.tox-tinymce {
  max-height: 600px !important;
  height: 600px !important;
}
</style>
../../tinymce/langs/vi
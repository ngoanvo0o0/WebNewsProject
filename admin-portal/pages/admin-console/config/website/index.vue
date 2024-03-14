<template>
  <div class="grid gap-y-5 max-w-4xl">
    <h1 class="text-2xl font-semibold text-gray-900">Website</h1>
    <Form id="website-form" class="website-form" @submit="submitWebsiteConfig">
      <div class="course-detail-form border-t border-gray-200">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Facebook link
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="facebook-url" v-model="facebookUrl" :rules="{ required: false, max: 255 }" type="text" name="facebook-url" />
                  <ErrorMessage class="error-msg" name="facebook-url" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Twitter link
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="twitter-url" v-model="twitterUrl" :rules="{ required: false, max: 255 }" type="text" name="twitter-url" />
                  <ErrorMessage class="error-msg" name="twitter-url" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Google link
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="google-url" v-model="googleUrl" :rules="{ required: false, max: 255 }" type="text" name="google-url" />
                  <ErrorMessage class="error-msg" name="google-url" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              LinkedIn link
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="linkedin-url" v-model="linkedinUrl" :rules="{ required: false, max: 255 }" type="text" name="linkedin-url" />
                  <ErrorMessage class="error-msg" name="linkedin-url" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Logo
            </dt>
            <dd class="mt-1 grid grid-rows-1 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <UploadFile 
                v-if="!image"
                @onSelectedFile="onSelectedFile"
              />
              <div v-else class="flex flex-row gap-2 h-36 w-72">
                <div>
                  <img :src="image" alt="image" class="h-full w-full object-cover"/>
                </div>
              <PencilSquareIcon class="h-5 w-5 text-gray-400 cursor-pointer" @click="onRemoveImage" />
              </div>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Nội dung footer
            </dt>
            <dd class="mt-1 grid grid-rows-1 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3 h-96 max-w-4xl">
                  <TinyEditor
                    :content-value="initContent"
                    @on-text-change="onChangeContent"
                  />
                </div>
              </section>
            </dd>
          </div>
        </dl>
      </div>
      <div class="submit-button gap-x-4 flex flex-row justify-between">
        <div class="flex gap-x-4">
          <button type="submit" class="btn btn-primary font-semibold" >
            Lưu
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { onMounted } from 'vue'
import { ref } from 'vue'
import UploadFile from '../../../../components/shared/UploadFile.vue'
import TinyEditor from '../../../../components/shared/TinyEditor.vue'
import { PencilSquareIcon } from '@heroicons/vue/20/solid'
import { WebsiteDto, WebsiteRequest } from "~/models/website.model";
import { LoadingOverlayComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes'
import { UploadType } from '~/models/common.model'

const id = ref()
const facebookUrl = ref('')
const twitterUrl = ref('')
const googleUrl = ref('')
const linkedinUrl = ref('')
const content = ref('')
const initContent = ref('')
const image = ref()
const fileToSave = ref()

const { $api, $loading, $toast } = useNuxtApp()

onMounted(() => {
  getWebsite()
})

const onRemoveImage = () => {
  image.value = undefined
  fileToSave.value = undefined
}

const onSelectedFile = (files: File[]) => {
  if (files.length > 0) {
    const reader = new FileReader()
    reader.onload = (event: any) => {
      image.value = event.target?.result
    }

    fileToSave.value = files?.[0]
    reader.readAsDataURL(files?.[0])
  }
}

const onChangeContent = ($event: string) => {
  content.value = $event
}

const getWebsite = async () => {
  const loader = $loading.show()
  const { data }: { data: WebsiteDto } = await $api.adminConsole.getWebsite().finally(() => loader.hide())
  if (data) {
    id.value = data.id
    facebookUrl.value = data.facebookUrl || ''
    googleUrl.value = data.googleUrl || ''
    twitterUrl.value = data.twitterUrl || ''
    linkedinUrl.value = data.linkedinUrl || ''
    initContent.value = data.footerContent || ''
    image.value = data.logo || ''
  }
}

const submitWebsiteConfig = async () => {
  const loader = $loading.show()
  let encoded = ''
  if (fileToSave.value) {
    const formData = new FormData();
    formData.append('image', fileToSave.value)
    formData.append('type', UploadType.WebsiteConfig)
    const [imageUrl] = await Promise.all([
      $api.upload.uploadFile(formData)
    ])
    encoded = encodeURI(imageUrl)
  }

  const request = {
    id: id.value,
    facebookUrl: facebookUrl.value || '',
    googleUrl: googleUrl.value || '',
    linkedinUrl: googleUrl.value || '',
    twitterUrl: twitterUrl.value || '',
    footerContent: content.value || '',
    logo: encoded ? decodeURI(encoded) : image.value,
  } as WebsiteRequest


    await $api.adminConsole.upsertWebsite(request)
      .then(() => {
        $toast.success('Save successful!')
        getWebsite()
      })
      .finally(() => {
        loader.hide()
      })
}
</script>

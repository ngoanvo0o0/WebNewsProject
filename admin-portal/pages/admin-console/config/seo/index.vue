<template>
  <div class="grid gap-y-5">
    <h1 class="text-2xl font-semibold text-gray-900">SEO</h1>
    <Form id="user-form" class="user-form" @submit="submitConfig">
      <div class="py-4 sm:gap-4 sm:py-5">
        <dt class="text-sm font-medium text-gray-500 py-1">
          Google Tracking ID
        </dt>
        <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <section>
            <div class="form-group pb-3">
              <Field id="google-tracking-id" v-model="googleTrackingId" :rules="{ required: false, max: 100 }" type="text" name="google-tracking-id" />
            </div>
          </section>
        </dd>
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
import { useNuxtApp } from 'nuxt/app';
import { Field, Form } from 'vee-validate'
import { onMounted } from 'vue';
import { ref } from 'vue';
import { ConfigDto, ConfigRequest, ConfigResponse } from '~/models/config.model';

const googleTrackingConfig = ref<ConfigDto>()
const googleTrackingId = ref()
const { $api, $loading, $toast } = useNuxtApp()
const googleTrackingKey = 'GOOGLE_TRACKING_KEY'

onMounted(() => {
  getConfig()
})

const getConfig = async () => {
  const loader = $loading.show()
  const { data }: { data: ConfigDto } = await $api.adminConsole.getConfigByKey(googleTrackingKey)
  .finally(() => {
    loader.hide()
  })
  googleTrackingConfig.value = data
  googleTrackingId.value = data.value
}

const submitConfig = async () => {
  const loader = $loading.show()

  const configRequest = {
    id: googleTrackingConfig.value?.id,
    key: googleTrackingConfig.value?.key || googleTrackingKey,
    type: 'google_id',
    value: googleTrackingId.value
  } as ConfigRequest

  await $api.adminConsole.upsertConfig(configRequest)
    .then(() => {
      $toast.success('Save successful!')
    })
    .finally(() => {
      getConfig()
      loader.hide()
    })
}
</script>

<script setup lang="ts">
  import { SaveAdvertisementRequest } from '~/models/advertisement.model';
  import AdvertisementForm from '~/components/advertisements/AdvertisementForm.vue';
  import { ref } from 'vue';
  import { navigateTo, useNuxtApp } from 'nuxt/app';
  import moment from 'moment';
import { getUserNameFromLocalStorage } from '~/utils/functions';

  const advertisement = {} as SaveAdvertisementRequest;
  const disabled = ref(true);
  const { $api, $loading, $toast } = useNuxtApp()


  async function createAdvertisement() {
  if (disabled.value) {
      return;
    }

    const loader = $loading.show()
    try {
      const formData = new FormData();
      for(let key in advertisement) {
        const value =( advertisement as any)[key];
        formData.append(key, value);
      }
      await $api.advertisement.createAdvertisement(formData);
      $toast.success("Advertisement added successfully!")
      goBackAdvertisementList()
    } catch (error) {
      $toast.error("Error while adding advertisement")
    } finally {
      loader.hide()
    }
  }

  function goBackAdvertisementList() {
    navigateTo('/admin-console/advertisements')
  }
</script>

<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Thêm quảng cáo
      </h1>
      <div>
        <p class="font-normal text-sm text-gray-500">
          Ngày tạo: {{ moment().format('DD-MM-YYYY') }}
        </p>
        <p class="font-normal text-sm text-gray-500">
          Người tạo: {{ getUserNameFromLocalStorage()?.name }}
        </p>
      </div>
    </div>

    <AdvertisementForm :ad="advertisement" @validate="disabled = $event" />
  
    <div class="submit-button mt-8 gap-x-4 flex">
      <div>
          <button type="button" class="btn btn-outline" @click="goBackAdvertisementList">
            Cancel
          </button>
        </div>
        <div class="flex gap-x-4">
          <button type="submit" class="btn btn-primary font-semibold disabled:opacity-60" :disabled="disabled" @click="createAdvertisement()">
            Save
          </button>
        </div>
      </div>
  </div>
</template>

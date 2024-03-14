<template>
    <div class="grid gap-4 max-w-4xl">
      <div>
        <h1 class="font-medium text-2xl text-gray-900">
          Chỉnh sửa quảng cáo
        </h1>
        <div>
          <p class="font-normal text-sm text-gray-500">
            Ngày sửa: {{ moment(advertisement?.updatedAt).format('DD-MM-YYYY') }}
          </p>
          <p class="font-normal text-sm text-gray-500">
            Người sửa: {{ advertisement?.userNameUpdated || getUserNameFromLocalStorage()?.name }}
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
            <button type="submit" class="btn btn-primary font-semibold disabled:opacity-60" :disabled="disabled" @click="saveAdvertisement()">
              Save
            </button>
          </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import moment from 'moment'
    import { navigateTo, useNuxtApp, useRoute } from 'nuxt/app';
    import { ref } from 'vue';
    import { onMounted, reactive } from 'vue';
    import AdvertisementForm from '~/components/advertisements/AdvertisementForm.vue';
    import { AdvertisementDto, SaveAdvertisementRequest } from '~/models/advertisement.model';
import { getUserNameFromLocalStorage } from '~/utils/functions';

    const { $loading, $api, $toast } = useNuxtApp()
    const $route = useRoute()
    const advertisementId = $route.params.id as string
    const advertisement = ref<SaveAdvertisementRequest>({} as SaveAdvertisementRequest);
    const disabled = ref(true);
  
    onMounted(() => {
      getAdvertisement()
    })
  
    const getAdvertisement = async () => {
      const loader = $loading.show()
    
      const data  = await $api.advertisement.getAdvertisementById(advertisementId).finally(() => loader.hide()) as AdvertisementDto;
      advertisement.value = {...data, image: data.imageUrl}
    }
  
    async function saveAdvertisement() {
      if (disabled.value) {
        return;
      }
  
      const loader = $loading.show()
      try {
        const data = advertisement.value;
        const formData = new FormData();
        for(let key in data) {
          const value = (data as any)[key];
          if(key === 'image' && typeof value === 'string') continue;
  
          formData.append(key, value);
        }
        for (var pair of formData.entries()) {
          console.log(pair[1]); 
        }
        await $api.advertisement.updateAdvertisement(advertisementId, formData);
        $toast.success("Advertisement updated successfully!")
        goBackAdvertisementList()
      } catch (error) {
        $toast.error("Error while updating advertisement")
      } finally {
        loader.hide()
      }
    }
  
    function goBackAdvertisementList() {
      navigateTo('/admin-console/advertisements')
    }
  </script>
  
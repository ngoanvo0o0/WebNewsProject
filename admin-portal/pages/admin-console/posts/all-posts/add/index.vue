<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Thêm bài viết
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

    <NewsForm />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import NewsForm from '~/components/posts/NewsForm.vue'
import { getUserNameFromLocalStorage } from '~/utils/functions';
</script>

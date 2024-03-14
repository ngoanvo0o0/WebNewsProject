<template>
  <div class="grid gap-4 max-w-4xl">
    <div>
      <h1 class="font-medium text-2xl text-gray-900">
        Thêm danh mục
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

    <CategoryForm />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import CategoryForm from "~/components/categories/CategoryForm.vue";
import { getUserNameFromLocalStorage } from '~/utils/functions';
</script>

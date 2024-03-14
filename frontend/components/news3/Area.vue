<script setup lang="ts">
import { type NewsDto } from "~/models/news.model";

const props = defineProps<{
  label?: string,
  newses: NewsDto[]
}>()
</script>

<template>
  <div class="">
    <SharedNewsHeader :header="label || newses[0].categoryName"/>
    <div class="row">
      <div class="col-md-6 col-12">
        <News3Item :news="newses[0]" :isMain="true"/>
      </div>
      <div class="col-md-6 col-12 w-100">
        <div class="row">
          <div v-for="news in newses.slice(1, 5)" :key="news.id" class="col-12 col-sm-6">
            <News3Item :news="news"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style >
/* .news-3-item-section {
  display: flex;
  gap: 30px;
} */

</style>

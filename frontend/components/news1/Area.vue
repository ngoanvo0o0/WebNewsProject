<script setup lang="ts">
import type { NewsDto } from '~/models/news.model';

interface INews {
  label: string,
  news: NewsDto[]
}
const props = defineProps<{
  newses: INews[]
}>()
</script>

<template>
  <div class="news1-area">
    <div class="row">
      <div v-for="(item, index) in newses" :key="index" class="col-lg-4">
        <SharedNewsHeader :header="item.label"/>
        <div class="row">
          <div v-for="(news, index) in item.news.slice(0, 4)" :key="news.id" class="newses1 col-12">
            <SharedNewsCardMain v-if="index == 0" :news="news" :isShowAuthor="false"/>
            <SharedNewsCardSubItem v-else :news="news" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.line {
  height: 1px;
  width: 100%;
  background-color: #e8e8e8;
}

.news1-area .news-card-main {
  position: relative;
  min-height: 240px !important;
  max-height: 240px !important;
  display: flex;
}

.newses1:last-child .item-shadow-gray,
.newses2:last-child .item-shadow-gray {
  box-shadow: unset !important;
}

@media screen and (max-width:768px) {
  .news1-area .news-card-main {
    min-height: 400px !important;
    max-height: 400px !important;
  }
}

@media screen and (max-width:576px) {
  .news1-area .news-card-main {
    min-height: 250px !important;
    max-height: 250px !important;
  }
}
</style>

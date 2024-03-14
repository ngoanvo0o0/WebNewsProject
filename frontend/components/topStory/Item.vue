<script setup lang="ts">
import type { NewsDto } from "~/models/news.model";

const props = defineProps<{
  news: NewsDto
  isCenter?: boolean
}>()

</script>

<template>
  <NuxtLink :to="`bai-viet/${news.slug}`" class="top-story-item img-overlay-70 mb-4 position-relative d-block">
    <nuxt-img :src="news.imageUrl || ' '" :alt="news.title" format="webp" class="img-fluid w-100 h-100" />
    <div class="top-story-content">
      <div class="box-category">
        <SharedBoxCategory :category="news.categoryName" :slug="news?.categoryName"/>
      </div>
      <div class="mask-content-lg">
        <h1 class="title-medium-light" v-if="news.isOutStanding">
          <a :href="`bai-viet/${news.slug}`">{{news.title}}</a>
        </h1>
        <h3 class="title" :class="[isCenter ? 'title-center' : 'title-side']" v-else>
          <a :href="`bai-viet/${news.slug}`" class="elipsis-3-lines">{{news.title}}</a>
        </h3>
        <div v-if="isCenter" class="post-date-light" style="display: flex; align-items: center;">
          <SharedNewsAuthor
              :author="news.author"
              :publishDate="news.publishDate"
          />
          <div class="news2-view" style="margin-bottom: 12px;margin-left: 10px;">
            <i class="fa fa-eye"></i>
            <p style="margin: 0;">{{ news.view }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.title-medium-light {
  margin-bottom: 10px;
}
.top-story-content {
  padding: 0 30px;
}
.box-category {
  position: absolute;
  top: 0;
}
.news2-view {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  color: #d72924;
  font-weight: 700;
  font-size: 16px;
}

.title a {
  color: #fff;
  -o-transition: all 0.9s ease;
  transition: all 0.9s ease;
  -webkit-transition: all 0.9s ease;
  -moz-transition: all 0.9s ease;
  -ms-transition: all 0.9s ease;
  text-shadow: 1px 1px 3px rgba(0,0,0,.4);
}
.title-center a {
  font-size: 30px;
  font-weight: 500;
  line-height: 1.2em;
}
.title-side a {
  font-size: 16px;
  font-weight: 500;
}
.top-story-item:hover:after {
  opacity: 1;
}
.top-story-item:after {
  background: rgba(0, 0, 0, .2);
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 0;
  bottom: 0;
  left: 0;
  content: "";
  opacity: 0;
  -webkit-transition: all ease 500ms;
  -o-transition: all ease 500ms;
  transition: all ease 500ms;
}
</style>

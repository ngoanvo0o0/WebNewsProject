<script setup lang="ts">
import {useFetch, useRoute, useRuntimeConfig, useSeoMeta} from "nuxt/app";
import type {PagedNewsItemDto, PagedRaoVatItemDto} from "~/models/news.model";
import type {PagedList} from "~/models/pagination.model";
import { computed, ref } from "vue";
const $config = useRuntimeConfig();
const $route = useRoute();
const query = $route.query;
const apiUrl = $config.public.apiURL as string;

const getPostList = async (slug: string, size = 3) => {
  const { data: hotNewses } = await useFetch<PagedList<PagedNewsItemDto>>("/api/news", {
  baseURL: apiUrl,
  params: {
      page: query.page || 1,
      size,
      menuSlug: slug,
    }
  });
  return hotNewses;
}

const [
      lifePostList,
      healthPostList,
      culturalPostList,
      entertainmentPostList,
      travelPostList,
      foodPostList,
      readerPostList,
      immigrantPostList,] = await Promise.all([
  // getPostList('tin-tuc', 5),
  getPostList('doi-song'),
  getPostList('suc-khoe'),
  getPostList('van-hoa'),
  getPostList('giai-tri'),
  getPostList('du-lich'),
  getPostList("am-thuc"),
  getPostList("ban-doc", 6),
  getPostList("di-tru", 6),
]);
const lifeAndHealthPostList = computed(() => (lifePostList.value?.items || []).concat(healthPostList.value?.items || []))
const cultureAndEntertainmentPostList = computed(() => (culturalPostList.value?.items || []).concat(entertainmentPostList.value?.items || []))
const travelAndFoodPostList = computed(() => (travelPostList.value?.items || []).concat(foodPostList.value?.items || []))

const descriptionMetaTag = ref('Nguoivietplus là trang báo điện tử cung cấp bài viết, hình ảnh, video về con người và cộng đồng người Việt trên thế giới và các tin tức quốc tế, phóng sự toàn cầu.')
useSeoMeta({
  keywords: 'Nguoi viet plus',
  description: descriptionMetaTag.value,
  ogDescription: descriptionMetaTag.value
}, {
    mode: 'all'
})
// const { data: ads } = await useFetch<any>("/api/ads", {
//     baseURL: apiUrl
//   }
// })
const { data: ads } = await useFetch<any[]>("/api/ads", {
    baseURL: apiUrl
  })

const adRight = ads.value?.find(e => e.position === 'right')
const adMid = ads.value?.find(e => e.position === 'middle')
const adBot = ads.value?.find(e => e.position === 'bottom')
// const newsGroupByCategory = await useFetch<any[]>("/api/news/grouped-by-category", {
//   baseURL: $config.public.apiURL
// });

// const data = newsGroupByCategory.data.value?.map(e => {
//   return e
// })

// const news1Area = resolveComponent('news1/Area')
// const news2Area = resolveComponent('news2/Area')
// const news3Area = resolveComponent('news3/Area')


// const getNewsComponent = (style: 'news1' | 'news2' | 'news3') => {
//   switch (style) {
//     case 'news1':
//       return news1Area
//     case 'news2':
//       return news2Area
//     case 'news3':
//       return news3Area 
//     default:
//       return news3Area
//   }
// }
</script>

<template>
  <div class="">
    <section class="top-section section-wrapper">
      <!-- <TopStoryHeader v-if="newsList?.items?.length" :newses="newsList?.items" /> -->
      <div class="element-container">
        <TopStoryContent />
      </div>
    </section>
    <!-- <SidebarAd class="mt-30" v-if="adMid" :imageUrl="adMid.imageUrl" :url="adMid.url" /> -->

    <section class="section-wrapper">
      <div class="element-container">
        <div class="row">
          <div class="col-lg-9 col-md-12">
            <News3Area :newses="lifeAndHealthPostList" label="Sức khoẻ - đời sống"/>
            <News2Area :newses="cultureAndEntertainmentPostList" label="Văn hoá - giải trí"/>
          </div>
          <div class="col-lg-3 col-md-12">
            <SidebarRaoVat />
            <SidebarAd class="mt-30" />
          </div>
        </div>
        <News1Area
          :newses="[
            {
              label: 'Du Lịch - Ẩm Thực',
              news: travelAndFoodPostList
            },
            {
              label: 'Di Trú',
              news: immigrantPostList?.items
            },
            {
              label: 'Bạn đọc',
              news: readerPostList?.items
            },
          ]"
        />
      </div>
    </section>

     <!-- <SidebarAd class="mt-30" v-if="adBot" :imageUrl="adBot.imageUrl" :url="adBot.url" /> -->
  </div>
</template>

<style>
.top-section {
  background-image: url('	https://demo.xpeedstudio.com/vinkmag/wp-content/uploads/2018/11/banner-bg.png');
  width: 100%;
}

.section-wrapper {
  padding: 30px 0;
}
</style>

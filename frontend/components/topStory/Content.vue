<script setup lang="ts">
import type {News1Dto, NewsDto} from "~/models/news.model";

// const props = defineProps<{
//   newses: News1Dto[]
// }>()

//   const newsOutStanding: NewsDto = props.newses[0]
/* __placeholder__ */
import type { PagedList } from "~/models/pagination.model";
import { useFetch, useRuntimeConfig } from "nuxt/app";
import type { PagedNewsItemDto } from "~/models/news.model";

const $config = useRuntimeConfig();
const apiURL = $config.public.apiURL as string
const getMostViewNewsList = async () => {
  const { data: data } = await useFetch<PagedList<PagedNewsItemDto>>("/api/news", {
    baseURL: apiURL,
    params: {
      page: 1,
      size: 10,
    }
  });

  return data
}
const mostViewNewsList = await getMostViewNewsList();

</script>

<template>
  <section class="top-story">
    <div class="wrapper">
      <div class="item left">
        <div class="sub-item">
          <TopStoryItem :news="mostViewNewsList?.items[0]" class="h-100"/>
        </div>
        <div class="sub-item">
          <TopStoryItem :news="mostViewNewsList?.items[1]" class="h-100"/>
        </div>
      </div>

      <div class="item center" >
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel1">
          <div class="carousel-inner">
            <div v-for="(item, index) in mostViewNewsList?.items.slice(3)" :key="item.is" class="carousel-item" :class="[index === 0 ? 'active' : '']" style="height: 100%;">
              <TopStoryItem :news="item" :isCenter="true" class="top-story-item-wrapper" />
            </div>
          </div>
          <div class="control">
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <!-- <span class="carousel-control-prev-icon" aria-hidden="true"></span> -->
              <i class="fa fa-angle-left" style="font-size: 25px;"></i>
            </a>
            <div class="line"></div>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span> -->
              <i class="fa fa-angle-right" style="font-size: 25px;"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="item right">
        <div class="sub-item">
          <TopStoryItem :news="mostViewNewsList?.items[2]" class="h-100"/>
        </div>
        <div class="sub-item">
          <TopStoryItem :news="mostViewNewsList?.items[3]" class="h-100"/>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.top-story .bg-body {
  background-color: transparent;
}

.top-story {
  height: 400px;
}

.top-story-item-wrapper {
  height: 100%;
}

.top-story .wrapper {
  display: flex;
  gap: 10px;
  align-items: stretch;
  width: 100%;
  height: 100%;
}

.top-story .wrapper .item {
  height: 100%;
  /* flex: 1; */
  overflow: hidden;
}

.top-story .wrapper .item.center {
  width: 50%;
  flex: 1;
}

.top-story .wrapper .item.left,
.top-story .wrapper .item.right {
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.top-story .wrapper .item .sub-item {
  flex: 1;
  height: calc((100% - 10px) / 2);
}

.top-story .carousel-inner {
  height: 100%;
}

.top-story .carousel-inner {
  height: 100%;
}

.top-story #carouselExampleIndicators,
.top-story .item.center {
  position: relative;
}

.top-story #carouselExampleIndicators {
  height: 100%;
}
.top-story .control {
  background-color: #00386c;
  position: absolute;
  top: 0;
  right: 0;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 5px;
}
.top-story .control .line {
  width: 2px;
  height: 15px;
  flex-grow: 1;
}
.top-story .control .carousel-control-prev,
.top-story .control .carousel-control-next {
  position: unset;
  opacity: 1;
  width: 28px;
  height: 28px;
  flex-grow: 1;
}

@media screen and (max-width:960px) {
  .top-story {
    height: auto;
  }
  .top-story-item-wrapper {
    height: 500px;
  }
  .top-story .wrapper {
    flex-direction: column;
    gap: 30px;
  }
  .top-story .wrapper .item.center,
  .top-story .wrapper .item.left,
  .top-story .wrapper .item.right {
    width: 100%;
    height: 300px;
  }
  .top-story .wrapper .item.left,
  .top-story .wrapper .item.right {
    flex-direction: row;
    gap: 30px;
  }
  .top-story .control {
    top: 10px;
    right: 10px;
  }

  .top-story .wrapper .item .sub-item {
    height: unset
  }
}

@media screen and (max-width:768px) {
  .top-story .wrapper {
    gap: 20px;
  }
  .top-story-item-wrapper {
    height: 400px;
  }
  .top-story .wrapper .item.center,
  .top-story .wrapper .item.left,
  .top-story .wrapper .item.right {
    gap: 20px;
  }
}

@media screen and (max-width:576px) {
  .top-story-item-wrapper {
    height: 350px;
  }
  .top-story .wrapper .item.center,
  .top-story .wrapper .item.left,
  .top-story .wrapper .item.right {
    width: 100%;
    height: auto;
  }
  .top-story .wrapper .item.left,
  .top-story .wrapper .item.right {
    flex-direction: column;
  }
}
</style>

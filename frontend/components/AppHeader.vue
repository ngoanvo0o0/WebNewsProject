<template>
  <header>
    <div class="header">
      <div id="header-layout2" class="header-style5">
        <HeaderTop />
        <div class="" id="sticker">
          <div class="element-container main-menu-area">
            <div class="bg-body" style="box-shadow: 0 2px 2px 0 rgba(0,0,0,.08)">
              <div class="row no-gutters d-flex align-items-center">
                <div class="menu-left position-static min-height-none" style="width: 95%">
                  <div class="ne-main-menu">
                    <nav id="dropdown">
                      <ul>
                        <li>
                          <router-link to="/">Trang chủ</router-link>
                        </li>
                        <li v-if="menuGroupOneSorted.length > 0">
                          <router-link :to="`/${menuGroupOneSorted[0].slug}`" active-class="active" class="menu-item">
                            <span style="margin-right: 5px;">{{ menuGroupOneSorted[0].name }}</span>
                            <span v-if="menuGroupOneSorted.length" style="margin-left: 2px;">
                              <i class="fa fa-chevron-down" aria-hidden="true"></i>
                            </span>
                          </router-link>
                          <ul class="ne-dropdown-menu" v-if="menuGroupOneSorted.length" style="max-height: 300px;overflow: hidden auto">
                            <li v-for="child in menuGroupOneSorted">
                              <router-link :to="`/${child.slug}`" active-class="active">{{
                                child.name }}</router-link>
                            </li>
                          </ul>
                        </li>
                        <li v-for="item in menuGroupTwo">
                          <router-link :to="`/${item.slug}`" active-class="active" class="menu-item">
                            <span style="margin-right: 5px;">{{ item.name }}</span>
                            <span v-if="item.childCategories?.length">
                              <i class="fa fa-chevron-down" aria-hidden="true"></i>
                            </span>
                          </router-link>
                          <ul class="ne-dropdown-menu" v-if="item.childCategories?.length" style="max-height: 300px;overflow: hidden auto">
                            <li v-for="child in item.childCategories">
                              <router-link :to="`/${child.slug}`" active-class="active">{{
                                child.name }}</router-link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <router-link to="/rao-vat" active-class="active">
                            <span style="margin-right: 5px;">Rao vặt</span>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                          </router-link>
                          <ul class="ne-dropdown-menu row" v-if="raoVatCategories?.length" style="width: 500px;right: 0;max-height: 300px;overflow: hidden auto">
                            <li v-for="category in raoVatCategories" class="col-4">
                              <a :href="`/rao-vat?categorySlug=${category.slug}`">{{
                                category.name }}</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class="menu-right text-right position-static min-height-none" style="width: 4%">
                  <div class="header-action-item">
                    <ul class="search-icon">
                      <li>
                        <form id="top-search-form" class="header-search-light">
                          <input v-model="keyword" type="text" id="search-input" class="search-input"
                            placeholder="Tìm kiếm...." required @keyup.enter="searchKeyword()">
                          <button class="search-button">
                            <i class="fa fa-search" aria-hidden="true" style=""></i>
                          </button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useFetch, useRouter, useRuntimeConfig } from "nuxt/app";
import { useUserStore } from "~/stores/user";
import { computed, onMounted } from "vue";
import { ref } from "vue";
import type { CategoryDto } from "~/models/category.model";
import type { GetMenuResponse, MenuDto } from "~/models/menu.model";

const $config = useRuntimeConfig();
const $router = useRouter()
const keyword = ref()
const menuGroupOne = ref<MenuDto[]>([])
const menuGroupTwo = ref<MenuDto[]>([])
const categoriesNeedToMerge = ['suc-khoe', 'doi-song', 'du-lich-1', 'am-thuc']

const menuGroupOneSorted = computed(() => {
  const doiSongIndex = menuGroupOne.value.findIndex(item => item.slug == 'doi-song')
  const updateArray = [...menuGroupOne.value]
  
  if (doiSongIndex !== -1) {
    menuGroupOne.value.splice(doiSongIndex, 1)
    const doiSongItem = updateArray[doiSongIndex]
    
    return [doiSongItem, ...menuGroupOne.value]
  }

  return menuGroupOne.value
})

const checkIsHomePage = computed(() => $router.currentRoute.value.path.slice(1) === '')

const handleSeparateMenu = (menus: MenuDto[]) => {
  menus.forEach((item) => {
    if (item.slug) {
      if (categoriesNeedToMerge.includes(item.slug)) {
      const index = menuGroupOne.value.findIndex((c: any) => c.id == item.id)
      if (index === -1) {
        menuGroupOne.value.push(item)
      }
    } else {
      menuGroupTwo.value.push(item)
    }
    }
  })
}

const searchKeyword = async () => {
  await $router.push({ path: `/tim-kiem/${keyword.value}` })
  keyword.value = ''
}

const getMenus = async () => {
  const { data } = await useFetch<GetMenuResponse>("/api/admin-console/menus", {
    baseURL: $config.public.apiURL as string,
  });

  data.value?.data && handleSeparateMenu(data.value?.data)

  return data
}

const getRaoVatCategories = async () => {
  return await useFetch<CategoryDto[]>("/api/categories", {
    baseURL: $config.public.apiURL as string,
    query: {
      type: 'raovat'
    }
  }).data;
}

const [menus, raoVatCategories] = await Promise.all([getMenus(), getRaoVatCategories()]);


</script>

<style lang="scss">

.wrapper #sticker {
  background-color: #d72924;
}
.wrapper.not-home-page #sticker {
  background-color: rgb(240, 241, 244);;
}

.not-home-page .header {
  .sign-up,
  a:has(+ .ne-dropdown-menu .active),
  .active {
    color: black !important;
    background-color: #d72924
  }

  a:has(+ .ne-dropdown-menu .active):hover,
  .active:hover {
    color: black !important;
    background-color: #d72924
  }

  .main-menu-area .bg-body {
    background-color: white
  }

  .main-menu-area .ne-main-menu nav ul li a:hover {
    color: white;
    background-color: #d72924;
  }
}

.header {
  .header-menu-fixed {
    max-width: 1140px;
    margin: 0 auto;
  }

  /* .main-menu-area {
    padding-right: 15px;
    padding-left: 15px;
  } */

  .main-menu-area .bg-body {
    background-color: #d72924
  }

  .main-menu-area .ne-main-menu nav ul li:hover a {
    color: #d72924;
    background-color: white;
  }

  .main-menu-area .ne-main-menu nav ul li a:hover {
    color: #d72924;
    background-color: black;
  }

  .main-menu-area .ne-main-menu nav ul li a {
    color: black;
    display: block;
    font-family: Roboto, sans-serif !important;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    -webkit-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
    -ms-transition: all .3s ease-out;
    -o-transition: all .3s ease-out;
    transition: all .3s ease-out
  }

  .main-menu-area .ne-main-menu nav ul li .ne-dropdown-menu a {
    color: black;
  }
}

.header-action-item input {
  display: none;
  top: 50%;
  transform: translateY(-50%)
}
.header-action-item ul li .fa-search {
  font-size: 25px !important;
  color: white !important;
}
.not-home-page .header-action-item .search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #d72924 !important;
}
.not-home-page .header-action-item ul li .fa-search {
  font-size: 25px !important;
  color: white !important;
}
.header .menu {
  display: block
}
@media screen and (max-width:992.9px) {
  .header .menu-left {
    display: none;
  }
  /* .header .menu-right {
    display: none;
  } */
  .header .top-bar-bottom {
    display: none;
  }
  /* .header .on-mobile-fixed ul {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center
  } */

  .header-action-item ul li .fa-search {
  font-size: 25px !important;
  color: #232323 !important;
}
}

@media screen and (max-width:576px) {
  .header-action-item .search-icon {
    background-color: transparent !important;
  }
}
</style>

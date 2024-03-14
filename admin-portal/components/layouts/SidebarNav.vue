<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div class="flex pt-3 h-16 shrink-0 items-center gap-2">
                  <img class="h-14 w-auto" src="~/assets/img/logotapnews.png"
                    alt="Nguoi viet plus" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink v-if="!item.subNav" :to="item.href"
                            :class="[$route.path.includes(item.href) ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                          <Disclosure as="div" v-else v-slot="{ open }">
                            <DisclosureButton
                              :class="[$route.path.includes(item.href) ? 'bg-gray-800 text-white' : 'hover:text-white hover:bg-gray-800', 'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-400']">
                              <component :is="item.icon" class="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                              {{ item.name }}
                              <ChevronRightIcon
                                :class="[open ? 'rotate-90 text-gray-500' : 'text-gray-400', 'ml-auto h-5 w-5 shrink-0']"
                                aria-hidden="true" />
                            </DisclosureButton>
                            <DisclosurePanel as="ul" class="mt-1 px-2">
                              <li v-for="subItem in item.subNav" :key="subItem.name">
                                <NuxtLink :to="subItem.href"
                                  :class="[$route.path.includes(subItem.href) ? 'bg-gray-800 text-white' : 'hover:text-white hover:bg-gray-800', 'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-400']">
                                  {{ subItem.name }}
                                </NuxtLink>
                              </li>
                            </DisclosurePanel>
                          </Disclosure>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
        <div class="flex pt-3 h-16 shrink-0 items-center gap-3">
          <img class="h-14 w-auto" src="~/assets/img/logotapnews.png"
            alt="Nguoi viet plus" />
            <!-- <h3 class="font-bold text-xl text-white">Người việt plus</h3> -->
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink v-if="!item.subNav" :to="item.href"
                    :class="[$route.path.includes(item.href) ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                  <Disclosure as="div" v-else v-slot="{ open }">
                    <DisclosureButton
                      :class="['hover:text-white hover:bg-gray-800', 'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-400']">
                      <component :is="item.icon" class="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                      {{ item.name }}
                      <ChevronRightIcon
                        :class="[open ? 'rotate-90 text-gray-500' : 'text-gray-400', 'ml-auto h-5 w-5 shrink-0']"
                        aria-hidden="true" />
                    </DisclosureButton>
                    <DisclosurePanel as="ul" class="mt-1 px-2">
                      <li v-for="subItem in item.subNav" :key="subItem.name">
                        <NuxtLink :to="subItem.href"
                          :class="[$route.path.includes(subItem.href) ? 'bg-gray-800 text-white' : 'hover:text-white hover:bg-gray-800', 'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-400']">
                          {{ subItem.name }}
                        </NuxtLink>
                      </li>
                    </DisclosurePanel>
                  </Disclosure>
                </li>
              </ul>
            </li>
            <li class="-mx-6 mt-auto">
              <Menu as="div" class="relative inline-block text-left w-full">
                <MenuButton class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 w-full">
                  <img class="h-8 w-8 rounded-full bg-gray-800"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="" 
                  />
                  <span class="sr-only">Your profile</span>
                  <span aria-hidden="true">{{ getUserSignedIn()?.name }}</span>
                </MenuButton>

                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute -translate-y-full -top-1 left-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <form @summit.prevent>
                        <MenuItem v-slot="{ active }">
                          <button @click="signOut()" type="button" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign out</button>
                        </MenuItem>
                      </form>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" class="-m-2.5 p-2.5 text-gray-400 lg:hidden" @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-white" />
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
          <img class="h-8 w-8 rounded-full bg-gray-800"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="" 
          />
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute -translate-y-full right-0 top-24 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <form @submit.prevent>
                <MenuItem v-slot="{ active }">
                  <button @click="signOut()" type="button" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign out</button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  UserGroupIcon,
  DocumentIcon,
  DocumentMagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  PhotoIcon,
  AdjustmentsHorizontalIcon,
  ListBulletIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/24/outline'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { navigateTo } from 'nuxt/app';

const navigation = [
  { name: 'Bảng điều khiển', href: '/admin-console/dashboard', icon: HomeIcon },
  { name: 'Quản lý thành viên', href: '/admin-console/team', icon: UsersIcon },
  { name: 'Quản lý người dùng', href: '/admin-console/users', icon: UserGroupIcon },
  {
    name: 'Bài viết',
    icon: DocumentIcon,
    href: '/admin-console/posts',
    subNav: [
      {
        name: 'Danh mục',
        href: '/admin-console/posts/categories',
      },
      {
        name: 'Bài viết nháp',
        href: '/admin-console/posts/all-posts',
      },
      {
        name: 'Bài viết công bố',
        href: '/admin-console/posts/posts-published',
      }
    ]
  },
  { name: 'Rao vặt', href: '/admin-console/classifieds', icon: DocumentMagnifyingGlassIcon },
  { name: 'Quảng cáo', href: '/admin-console/advertisements', icon: ClipboardDocumentListIcon },
  { name: 'Q&A', href: '/admin-console/question-answer', icon: QuestionMarkCircleIcon },
  {
    name: 'Quản lý phương tiện',
    icon: PhotoIcon,
    subNav: [
      {
        name: 'Tài liệu',
        href: '/admin-console/media/documents',
      },
      {
        name: 'Hình ảnh',
        href: '/admin-console/media/images',
      }
    ]
  },
  {
    name: 'Cấu hình',
    icon: AdjustmentsHorizontalIcon,
    subNav: [
      {
        name: 'SEO',
        href: '/admin-console/config/seo',
      },
      {
        name: 'Menu',
        href: '/admin-console/config/menu',
      },
      {
        name: 'Website',
        href: '/admin-console/config/website',
      }
    ]
  },
  { name: 'Báo cáo', href: '/admin-console/reports', icon: ChartPieIcon },
  { name: 'Lịch sử hoạt động thành viên', href: '/admin-console/histories', icon: ListBulletIcon },
]

const sidebarOpen = ref(false)
const open = ref(false)

const getUserSignedIn = () => {
  return JSON.parse(localStorage.getItem('userInfo'))
}

const signOut = () => {
  const { $api } = useNuxtApp();
	$api.auth.revoke();
  localStorage.clear();
  navigateTo('/admin-console/sign-in');
}
</script>

<style scoped lang="scss">
  button,
  [type="button"],
  [type="reset"],
  [type="submit"],
  [role="button"] {
    cursor: pointer;
    @apply text-gray-400;
  }
</style>

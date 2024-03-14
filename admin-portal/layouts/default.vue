<template>
  <div class="h-screen">
    <SidebarNav />
    <div>

      <main class="py-10 lg:pl-72">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarNav from '~/components/layouts/SidebarNav.vue'

</script>

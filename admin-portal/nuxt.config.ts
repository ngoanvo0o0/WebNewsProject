// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: [
    '@/assets/css/main.scss',
    '@/assets/css/tailwind.css',
    '@mdi/font/css/materialdesignicons.min.css',
    'maz-ui/css/main.css',
  ],
  build: {
    transpile: ['@vuepic/vue-datepicker', 'ag-grid-vue3'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  app: {
    head: {
      title: "TAP News",
      htmlAttrs: {
        lang: "vn",
      },
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Sacramento&display=swap",
        },
        { rel: 'icon', type: 'image/png', href: "/favicon.png" },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
  runtimeConfig: {
    public: {
      apiURL: process.env.BACKEND_URL || "http://localhost:8000",
      tinyApiKey: process.env.TINY_API_KEY || ""
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", '@pinia/nuxt'],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~/tailwind.config.ts",
    exposeConfig: true,
    exposeLevel: 2,
    injectPosition: "first",
    viewer: true,
  },
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en-US",
        iso: "en-US",
        name: "English (US)",
        file: "en-US.json",
      },
      {
        code: "vi-VN",
        iso: "vi-VN",
        name: "Vietnamese",
        file: "vi-VN.json",
      },
    ],
    defaultLocale: "en-US",
    vuei18n: {
      fallbackLocale: "en-US",
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true
    }
  }
});

// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from "path";
export default defineNuxtConfig({
  app: {
    head: {
      title: "誰でもカンタンに素早く検索できるアプリ｜QuickCamp〜クイキャン〜",
      htmlAttrs: {
        lang: "ja",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/logo.png",
        },
      ],
    },
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  css: [
    "@/assets/css/tailwind.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  plugins: ["@/plugins/fontawesome.ts"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    "~/Components": resolve(__dirname, "./components"),
    "~/Assets": resolve(__dirname, "./assets"),
  },
  runtimeConfig: {
    private: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      googleGeoCodingApiKey: process.env.GOOGLE_API_GEO_CODING_KEY,
      resasApiKey: process.env.RESAS_API_KEY,
    },
  },
  nitro: {
    preset: "firebase",
    devProxy: {
      "/google/api/": {
        target: "https://maps.googleapis.com/maps/api/",
        changeOrigin: true,
      },
    },
  },
});

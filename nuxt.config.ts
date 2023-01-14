// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from "path";
export default defineNuxtConfig({
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  css: ["@/assets/css/tailwind.css"],
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
    public: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      googleGeoCodingApiKey: process.env.GOOGLE_API_GEO_CODING_KEY,
      resasApiKey: process.env.RESAS_API_KEY,
    },
  },
  nitro: {
    devProxy: {
      "/google/api/": {
        target: "https://maps.googleapis.com/maps/api/",
        changeOrigin: true,
      },
    },
  },
});

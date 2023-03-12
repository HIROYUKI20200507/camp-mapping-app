<script setup lang="ts">
interface Props {
  placesList: {
    id: number;
    name: string;
    score: number;
    types: string[];
    userRatingsTotal: number;
  }[];
}

const props = defineProps<Props>();
</script>

<template>
  <div
    v-for="item in props.placesList"
    :key="item.id"
    class="max-w-sm rounded overflow-hidden shadow-lg"
  >
    <!-- <img class="w-full" :src="" :alt="item.name" /> -->
    <div class="px-6 py-2">
      <div class="font-bold text-xl mb-2">{{ item.name }}</div>
    </div>
    <div class="flex items-center px-6 py-4">
      <svg
        aria-hidden="true"
        class="w-5 h-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Rating star</title>
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        ></path>
      </svg>
      <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">
        {{ item.score }}
      </p>
      <span
        class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"
      ></span>
      <a
        href="#"
        class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
        >{{ item.userRatingsTotal }} reviews</a
      >
    </div>
    <div v-if="item.types" class="px-6 pt-4 pb-2">
      <span
        v-for="type in item.types"
        :key="type"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >{{ type }}</span
      >
    </div>
  </div>
</template>

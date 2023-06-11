<script setup lang="ts">
const showHeader = ref(false);

const handleScroll = () => {
  const scrollPosition = window.scrollY || window.pageYOffset;
  showHeader.value = scrollPosition > 100;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <div class="font-sans text-gray-800">
    <!-- ヘッダー -->
    <transition name="fade">
      <header
        v-show="showHeader"
        class="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full z-10"
      >
        <div class="container mx-auto flex items-center justify-between">
          <div class="text-2xl font-bold">
            <nuxt-link class="text-white flex gap-2 items-end" to="/landing">
              <img
                class="max-w-[42px]"
                src="~/assets/images/logo.png"
                alt="logo"
              />
              QuickCamp <span class="text-base font-light">クイキャン</span>
            </nuxt-link>
          </div>
          <nav>
            <ul class="flex items-center space-x-4">
              <li>
                <nuxt-link class="text-white hover:text-blue-300" to="/landing">
                  Home
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="text-white hover:text-blue-300" to="/app">
                  App
                </nuxt-link>
              </li>
              <!-- <li>
                <nuxt-link class="text-white hover:text-blue-300" to="/about">
                  About
                </nuxt-link>
              </li> -->
            </ul>
          </nav>
        </div>
      </header>
    </transition>
    <!-- ヒーローセクション -->
    <section class="text-center pb-10">
      <div class="relative">
        <div>
          <img
            src="~/assets/images/landings/camp.jpg"
            alt="Camp Map App"
            class="mb-4"
          />
        </div>
        <div
          class="w-full absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <h1 class="text-4xl font-bold mb-4">
            簡単に早くキャンプ場を検索できるアプリ
          </h1>
          <p class="text-xl mb-6">
            <em>
              Find Your Nature Retreat: Simplifying Campsite Search for Your
              Next Adventure
            </em>
          </p>
          <nuxt-link class="bg-blue-600 text-white px-4 py-2 rounded" to="/app"
            >アプリを試す</nuxt-link
          >
        </div>
      </div>
    </section>

    <!-- 特徴セクション -->
    <section class="py-10 m-auto max-w-5xl">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-center">アプリの特徴</h2>
        <span class="inline-block border-b-4 border-cyan-400 w-20"></span>
      </div>

      <div class="flex flex-wrap justify-center text-center">
        <div class="w-full sm:w-1/3 p-4">
          <h3 class="text-2xl font-bold">直感的な地図検索</h3>
          <div class="w-2/3 m-auto">
            <img
              src="~/assets/images/landings/compass.gif"
              alt="地図検索のイメージ"
              class="mb-4"
            />
          </div>
          <p>
            都道府県から市区町村を選択すると付近のキャンプ場が一覧で閲覧することができます。
          </p>
        </div>
        <div class="w-full sm:w-1/3 p-4">
          <h3 class="text-2xl font-bold mb-2">詳細情報</h3>
          <div class="w-2/3 m-auto">
            <img
              src="~/assets/images/landings/mapping_car.gif"
              alt="詳細情報のイメージ"
              class="mb-4"
            />
          </div>
          <p>キャンプ場の詳細情報を確認して、最適な場所を見つけましょう。</p>
        </div>
        <div class="w-full sm:w-1/3 p-4">
          <h3 class="text-2xl font-bold mb-2">レスポンシブデザイン</h3>
          <div class="w-2/3 m-auto">
            <img
              src="~/assets/images/landings/phone_S.gif"
              alt="レスポンシブデザインのイメージ"
              class="mb-4"
            />
          </div>
          <p>デバイスに関係なく、アプリを快適に利用できます。</p>
        </div>
      </div>
    </section>

    <!-- CTAセクション -->
    <section class="bg-blue-100 py-10">
      <div class="m-auto max-w-5xl">
        <h2 class="text-3xl font-bold mb-6 text-center">
          今すぐキャンプ場を検索しましょう！
        </h2>
        <div class="text-center">
          <nuxt-link class="bg-blue-600 text-white px-4 py-2 rounded" to="/app"
            >アプリを試す</nuxt-link
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

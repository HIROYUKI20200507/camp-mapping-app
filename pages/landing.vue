<script setup lang="ts"></script>
<template>
  <div class="font-sans text-gray-800">
    <!-- ヒーローセクション -->
    <section class="text-center py-10">
      <h1 class="text-4xl font-bold mb-4">
        簡単にキャンプ場を検索できるアプリ
      </h1>
      <p class="text-xl mb-6">
        キャンプ場を地図上で探し、詳細情報を手に入れましょう。
      </p>
      <nuxt-link class="bg-blue-600 text-white px-4 py-2 rounded" to="/app"
        >アプリを試す</nuxt-link
      >
    </section>

    <!-- 特徴セクション -->
    <section class="py-10">
      <h2 class="text-3xl font-bold mb-6 text-center">アプリの特徴</h2>
      <div class="flex flex-wrap justify-center">
        <div class="w-full sm:w-1/3 p-4">
          <h3 class="text-2xl font-bold mb-2">直感的な地図検索</h3>
          <p>地図上で簡単にキャンプ場を見つけることができます。</p>
        </div>
        <div class="w-full sm:w-1/3 p-4">
          <h3 class="text-2xl font-bold mb-2">詳細情報</h3>
          <p>キャンプ場の詳細情報を確認して、最適な場所を見つけましょう。</p>
        </div>
        <div class="w-full sm:w-1/3 p-4">
          <h3 class="text-2xl font-bold mb-2">レスポンシブデザイン</h3>
          <p>デバイスに関係なく、アプリを快適に利用できます。</p>
        </div>
      </div>
    </section>

    <!-- CTAセクション -->
    <section class="bg-blue-100 py-10">
      <h2 class="text-3xl font-bold mb-6 text-center">
        今すぐキャンプ場を検索しましょう！
      </h2>
      <div class="text-center">
        <nuxt-link class="bg-blue-600 text-white px-4 py-2 rounded" to="/app"
          >アプリを試す</nuxt-link
        >
      </div>
    </section>
  </div>
</template>

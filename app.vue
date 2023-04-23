<template>
  <NuxtLayout>
    <div class="min-h-full">
      <Header></Header>
      <main>
        <template v-if="$route.path === '/landing'">
          <NuxtPage />
        </template>
        <template v-else>
          <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
              <NuxtPage />
            </div>
          </div>
        </template>
      </main>
      <Footer></Footer>
    </div>
  </NuxtLayout>
</template>

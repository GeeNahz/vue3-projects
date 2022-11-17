<template>
  <div class="container">
    <TheNavbar />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <!-- font-family: Arial, Helvetica, sans-serif; -->
</template>

<script setup></script>

<style lang="scss">
@import './assets/styles/base';

  #__nuxt {
    height: 100%;
  }
  .container {
    @include container;
    height: 100%;
    padding: 0;
  }
</style>

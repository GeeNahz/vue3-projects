<template>
  <div class="boards__container">
    <!-- <the-navbar /> -->
    <div class="boards__layout">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import '../assets/styles/_base.scss';
.boards__container {
  @include container {
    padding: 0;
  }
}
.boards__layout {
  height: 100%;
}
</style>
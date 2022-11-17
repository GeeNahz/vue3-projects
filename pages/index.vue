<template>
  <div class="home">
    <div class="btn">
      <br />
      <nuxt-link :to="{ name: 'boards' }" >Go to boards</nuxt-link>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'ProGrest - Home',
   meta: [
    { name: 'description', content: 'Welcome to the beginning of your restful progress.' }
  ],
  // bodyAttrs: { class: 'test' },
  // script: [ { children: 'console.log(\'Hello world\')' } ]
})
</script>

<style lang="scss" scoped>
.home {
  padding-top: 5rem;
}
</style>
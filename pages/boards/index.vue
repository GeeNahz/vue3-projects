<template>
  <div class="boards__container">
    <transition>
      <modal-board-new v-if="toggleMenu" @close="toggleModal"></modal-board-new>
    </transition>
    <div class="boards__heading">
      <h1 class="boards__title">All Boards</h1>
    </div>
    <div class="board__list">
      <board-items v-if="boards.length !== 0"  v-for="board in boards" :key="board.id" :board="board" />
      <p v-else style="color: #8a8a8a; font-weight: 400; font-decoration: capitalize; font-size: 24px; text-align: center;">Sorry, no boards available at the moment.</p>
    </div>
  </div>
</template>

<script setup>
  import { useBoardStore } from '~/stores/boardStore'
  import { storeToRefs } from 'pinia'

  definePageMeta({
    layout: 'boards',
    title: 'Boards',
    head: {
      titleTemplate: 'board',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Meta description' }
      ]
    }
  })

  const store = useBoardStore()
  const { toggleCreateBoard } = store
  const { boards, tasks, toggleMenu } = storeToRefs(store)

  onMounted(() => {
    if(boards.value.length === 0) {
      getAllDocs('board').then(res => {
        boards.value = res
      }).catch(err => {
        console.log('Error: ', err)
      })
    }
    
    if(tasks.value.length === 0) {
      getAllDocs('task').then(res => {
        tasks.value = res
      })
    }
  })

  useHead({
    title: 'ProGrest - My Projects',
    meta: [
      { name: 'description', content: 'View all your projects in one place.' }
    ]
  })

  /**Keep the next 2 commented lines of code */
  // const taskSnapshot = tasksSnapShot('tasks')
  // tasks.value = taskSnapshot

  const toggleModal = () => {
    toggleCreateBoard()
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/base';
  .boards__container {
    @include container() {
      position: relative;
      padding-top: 5rem;
    }
    @include fade-in-out();
  }
  .boards__title {
    padding: 1rem 0;
    text-align: center;
  }
  .new__btn {
    width: max-content;

    @include transition-ease;
    @include hover-active-states {
      cursor: pointer;
      color: color(text-hover);
    }
  }
  .board__list {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 1rem auto;

    @include responsive(tablet-width) {
      display: flex;
      justify-content: center;
    }
}
</style>

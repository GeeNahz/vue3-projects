<template>
  <div class="board__container">
    <menu-button class="menu__btn" @edit="toggleEditBoard" />
    <div v-if="editBoard">
      <modal-board-edit :data="editedBoardDetails" @close="toggleEditBoard" />
    </div>
    <nuxt-link :to="{ name: 'boards-id', params: { id: board.id} }">
      <div class="board__item" :style="board.imageUrl.downloadUrl ? `background: url(${board.imageUrl.downloadUrl}) center/cover no-repeat` : `background: ${board.color}`">
        <div class="title">
          <h4>{{ board.title }}</h4>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
// import { useBoardStore } from '~/stores/boardStore'
// import { storeToRefs } from 'pinia'

const props = defineProps([ 'board' ])

// const store = useBoardStore()

const editedBoardDetails = ref({
  ...props.board
})

const editBoard = ref(false)
const toggleEditBoard = () => {
  editBoard.value = !editBoard.value
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/base';
  .board__container {
    position: relative;
    background-color: color(secondary);
    box-shadow: 0 2px 10px 4px rgba(0, 0, 0, 0.25);
    width: 16rem;
    height: 10rem;
    border-radius: 0.3rem;

    & .menu__btn {
      height: min-content;
      width: min-content;
      position: absolute;
      right: 1rem;
      top: -4px;
      border-radius: 0.2rem;
      background-color: rgba(#efefef, 0.8);

      @include hover-active-states {
        background-color: rgba(#efefef, 1);
      }
    }

    & .menu__container {
      position: absolute;
      top: 1.4rem;
      right: 1rem;
    }
  }
  a {
    text-decoration: none;
    width: 100%;
    height: 100%;
    border-radius: 0.3rem;
  }
  .board__item {
    position: relative;
    background-color: #353535;
    border-radius: 0.3rem;
    overflow: hidden;
    color: #1f1f1f;
    width: 100%;
    height: 100%;
    @include transition-ease();

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(155deg, rgba(#303030, 0.6), rgba(#303030, 0.2))
    }
    @include hover-active-states {
      transform: rotate(-0.5deg);
    }

    & .title {
      position: absolute;
      top: 1rem;
      left: 1rem;
      color: color('white');
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

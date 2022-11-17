<template>
  <div class="menu__container">
    <div
      @blur="toggleMenuOptions"
      @click="toggleMenuOptions"
      class="menu__btn"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul v-if="showMenuOptions" class="menu__container__menu__list">
      <li @click="emitEdit">Edit</li>
      <li @click="emitDelete">Delete</li>
    </ul>
  </div>
</template>

<script setup>
defineComponent({
  name: 'MenuButton'
})

const emit = defineEmits(['edit', 'delete'])

const showMenuOptions = ref(false)

const toggleMenuOptions = () => {
  showMenuOptions.value = !showMenuOptions.value
}

const emitEdit = () => {
  emit('edit')
  toggleMenuOptions()
}

const emitDelete = () => {
  emit('delete')
  toggleMenuOptions()
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.menu__container {
  position: relative;
  z-index: 1;

  & .menu__btn {
    display: flex;
    gap: 0.2rem;
    background-color: color('text-secondary');
    width: 23px;
    height: min-content;
    padding: 5px 3px;
    border-radius: 0.2rem;

    @include hover-active-states {
      cursor: pointer;
    }

    & span {
      height: 3px;
      width: 3px;
      border-radius: 999px;
      background-color: #8a8a8a;
    }
  }

  #{&}__menu__list {
    position: absolute;
    top: 0;
    left: 1.5rem;
    background-color: rgba(color('text-secondary'), 0.8);
    border-radius: 0.2rem;

    @include unstyled-list();

    & li {
      padding: 0.4rem 0.6rem;

      @include hover-active-states {
        cursor: pointer;
        background-color: #c5c5c5;
      }
    }
  }
}
</style>

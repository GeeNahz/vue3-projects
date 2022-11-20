<template>
  <div class="menu__container">
    <button
      @blur="blurToggle"
      @click="toggleMenuOptions"
    >
      <div class="menu__btn">
        <i class="ellipsis vertical icon"></i>
      </div>
    </button>
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
const blurToggle = () => {
  setTimeout(() => showMenuOptions.value = !showMenuOptions.value, 100)
}

const emitEdit = () => {
  emit('edit')
}

const emitDelete = () => {
  emit('delete')
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.menu__container {
  position: relative;
  z-index: 1;
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  height: fit-content;
  width: fit-content;

  @include transition-ease();
  @include hover-active-states {
    cursor: pointer;
  }

  & button {
    outline: none;
    background: none;
    border: none;

    @include hover-active-states {
      cursor: pointer;
    }

    & .menu__btn {
      width: 1rem;
  
      & .ellipsis {
        width: 100%;
        height: 100%;
      }
    }
  }

  #{&}__menu__list {
    position: absolute;
    top: 0.2rem;
    left: 2rem;
    background-color: rgba(color('text-secondary'), 1);
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

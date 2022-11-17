<template>
  <div @click.self="close" class="modal__bg__blur">
    <div class="modal__container">
      <div class="modal__title">
        <h2>
          <slot name="title">My modal</slot>
        </h2>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineComponent({
  name: 'ModalComponent'
})

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.modal__bg__blur {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(#303030, 0.6);
  z-index: 2;
  
  & .modal__container {
    width: 25rem;
    background-color: color('white');
    border-radius: 0.6rem;
    padding: 1rem;
  
    @include center-self {
      position: fixed;
      z-index: 2;
    }
  }
  & .modal__title {
    margin-bottom: 1rem;
    text-align: center;
  
    & h2 {
      font-weight: font-weight(semibold);
      text-transform: capitalize;
    }
  }
  
  & .modal__body {
    margin-bottom: 1rem;
  }
}
</style>

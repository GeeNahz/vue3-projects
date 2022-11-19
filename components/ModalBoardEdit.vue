<template>
  <div>
    <modal-board
      title="Edit board"
      :data="data"
      :is-new="false"
      @close="$emit('close')"
      @submit="submitHandler"
    />
  </div>
</template>

<script setup>
import { useBoardStore } from '~/stores/boardStore'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const store = useBoardStore()
const { updateBoard } = store
const submitHandler = (newData) => {
  console.log(newData)
  updateBoard(newData)
  emit('close')
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.color__picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & input {
    margin: 0.2rem 0;
    outline: none;
    border: none;
  }
}
.btn {
  width: 100%;

  @include button-fill;
}
</style>

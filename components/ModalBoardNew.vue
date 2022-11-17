<template>
  <modal @close="$emit('close')">
    <template #title>
      create new board
    </template>
    <template #body>
      <form @keyup.enter="submitHandler">
        <input-field
          type="text"
          label="Title"
          v-model="data.title"
          placeholder="Board title"
        />
        <input-field
          type="text"
          label="Description"
          v-model="data.description"
          placeholder="Description"
        />
        <div class="color__picker">
          <input
            id="colour"
            type="color"
            label="Color"
            v-model="data.color"
            placeholder="Board color"
          />
          <label for="colour" style="font-size: small;">Background color</label>
        </div>
      </form>
    </template>
    <input @click="submitHandler" class="btn" type="submit" value="Submit" />
  </modal>
</template>

<script setup>
import { useBoardStore } from '~/stores/boardStore'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

const emit = defineEmits(['close'])

const store = useBoardStore()
const { boards } = storeToRefs(store)
const { createBoard } = store

const data = ref({
  title: '',
  description: '',
  color: '#babdb6',
  // imageUrl: ''
})

const submitHandler = () => {
  let newBoard = {
    id: uuidv4(),
    title: data.value.title,
    description: data.value.description,
    order: JSON.stringify([]),
    color: data.value.color,
    imageUrl: {
      downloadUrl: ''
    }
  }
  // boards.value.push(newBoard)
  createBoard(newBoard)
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

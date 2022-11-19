<template>
  <div>
    <modal-board title="create new board" :data="data" @close="$emit('close')" @submit="submitHandler" />
  </div>
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
  imageUrl: {
    downloadUrl: ''
  }
})

const submitHandler = (newData) => {
  let newBoard = {
    id: uuidv4(),
    title: newData.title,
    description: newData.description,
    order: JSON.stringify([]),
    color: newData.color,
    imageUrl: {
      downloadUrl: newData.imageUrl.downloadUrl
    }
  }
  // boards.value.push(newBoard)
  createBoard(newBoard)
  emit('close')
}
</script>

<style lang="scss" scoped></style>

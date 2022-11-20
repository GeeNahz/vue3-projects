<template>
  <div
    class="list__item"
    :class="{
      'editing': editableContent
    }"
  >
    <p
      class="taskDetails"
      :contenteditable="editableContent"
      :autofocus="editableContent"
      :id="task.id"
    >
      {{ task.title }}
    </p>
    <menu-button
      v-if="!editableContent"
      @edit="toggleEditableContent"
    />
    <i
      v-else
      @click="handleTaskUpdate(task.id)"
      style="z-index: 1; cursor: pointer;"
      class="large save outline icon"
    >
    </i>
  </div>
</template>

<script setup>
import { useBoardStore } from '~/stores/boardStore'
// import { storeToRefs } from 'pinia'

const emit = defineEmits(['updateTask'])

const store = useBoardStore()
const { updateTask } = store

const props = defineProps({
  task: Object
})

// const emit = defineEmits(['updateTask'])

const editableContent = ref(false)

const toggleEditableContent = () => {
  editableContent.value = !editableContent.value
}

const newTaskData = ref(null)

const handleTaskUpdate = (taskId) => {
  const pTags = document.querySelectorAll('.taskDetails')
  
  pTags.forEach(pTag => {
    if(pTag.id == taskId) {
      newTaskData.value = pTag.textContent
    }
  })

  // console.log(newTaskData.value)
  emit('updateTask', taskId, newTaskData.value)
  // updateTask(newTaskData.value)
  
  toggleEditableContent()
  newTaskData.value = null
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.list__item {
  padding: 0.4rem 0.8rem;
  margin: 0.8rem 0;
  border-radius: 0.2rem;
  background-color: color('white');
  color: #1f1f1f;
  max-width: 100%;
  font-size: small;
  height: max-content;
  display: flex;
  gap: 0.7rem;
  justify-content: space-between;

  &.editing {
    background-color: #fafafa;
    outline: color('text-hover') solid 1px;
  }

  & p {
    width: 100%;
    outline: none;
  }
}
</style>
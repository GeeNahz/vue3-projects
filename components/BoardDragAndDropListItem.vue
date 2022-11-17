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
      <menu-button v-if="!editableContent" @edit="toggleEditableContent" />
      <!-- place a tick icon here to indicate being done instead of the p tag -->
      <i
        v-else
        @click="handleTaskUpdate(task.id)"
        style="display: flex; justify-content: center; align-items: center; height: 1.5rem; width: 1.5rem; border-radius: 999px; padding: 0.15rem; background-color: rgba(200, 200, 200, 0.5); z-index: 1; cursor: pointer;"
      >
        <svg width="28px" height="28px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.65263 14.0304C6.29251 13.6703 6.29251 13.0864 6.65263 12.7263C7.01276 12.3662 7.59663 12.3662 7.95676 12.7263L11.6602 16.4297L19.438 8.65183C19.7981 8.29171 20.382 8.29171 20.7421 8.65183C21.1023 9.01195 21.1023 9.59583 20.7421 9.95596L12.3667 18.3314C11.9762 18.7219 11.343 18.7219 10.9525 18.3314L6.65263 14.0304Z" fill="black"/><path clip-rule="evenodd" d="M14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1ZM3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14Z" fill="black" fill-rule="evenodd"/></svg>
      </i>
    </p>
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

  &.editing {
    background-color: #fafafa;
  }

  & p {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    width: 18rem;
    outline: none;
  }
}
</style>
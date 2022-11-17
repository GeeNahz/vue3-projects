<template>
  <div class="newtask__container">
    <h5 v-if="!editableNewTask" @click="toggleEditableNewTask">Add Task</h5>
    <textarea
      v-else
      autofocus
      autocomplete="on"
      type="text"
      rows="5"
      placeholder="Add Task"
      @blur="toggleEditableNewTask"
      @input="handleInput"
      @keyup.enter="handleSubmit"
    ></textarea>
    <p v-if="!editableNewTask" @click="toggleEditableNewTask">+ New</p>
    <p v-else @click="handleSubmit">+ Add</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  }
})

const emit = defineEmits(['createNewTask', 'update:modelValue'])

const editableNewTask = ref(false)
const toggleEditableNewTask = () => {
  editableNewTask.value = !editableNewTask.value
}

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}
const handleSubmit = () => {
  emit('createNewTask')
  toggleEditableNewTask()
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.newtask__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: none;
  border-radius: 0.2rem;
  padding: 0.5rem 0.1rem;

  & h5,
  & textarea {
    color: gray;
    width: 100%;
  }

  & h5 {
    @include hover-active-states {
      cursor: pointer;
    }
  }

  & textarea {
    border: none;
    border-radius: 0.2rem;
    padding: 0.2rem 0.4rem;
    font-weight: font-weight('semibold');
    font-size: font-size('small');

    &:focus {
      outline: none;
    }
  }

  & p {
    @include button-fill {
      font-size: font-size(normal);
      border-radius: 0.2rem;
      padding: 0.2rem 0.6rem;
      white-space: nowrap;
    }
    @include hover-active-states {
      cursor: pointer;
    }
  }
}
</style>

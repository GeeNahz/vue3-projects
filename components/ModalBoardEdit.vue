<template>
  <div>
    <modal @close="$emit('close')">
      <template #title>
        Edit board
      </template>
      <template #body>
        <form @keyup.enter="submitHandler">
          <input-field
            type="text"
            label="title"
            placeholder="Enter your title"
            v-model="data.title"
          />
          <input-field
            type="text"
            label="Description"
            placeholder="Enter your Description"
            v-model="data.description"
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
          <input @click="submitHandler" class="btn" type="submit" value="Submit" />
        </form>
      </template>
    </modal>
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
const submitHandler = () => {
  console.log(props.data)
  updateBoard(props.data)
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

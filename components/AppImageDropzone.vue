<template>
  <div class="file-upload">
    <img v-if="url" class="ui medium rounded image" :src="url" />
    <div v-else class="ui header">
      <p class="sub header">No selected image</p>
    </div>
    <div class="ui basic icon buttons">
      <button class="ui labeled icon primary button">
        <i class="file image outline icon"></i> 
        Select
        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
        />
      </button>
      <button
        @click.prevent="clearImage"
        class="ui right labeled icon button"
        :class="{ 'disabled': !file }"
      >
        <i class="eraser icon"></i>
        Clear
      </button>
    </div>
  </div>
</template>

<script setup>
import { useBase64 } from '@vueuse/core'

const emit = defineEmits(['fileChange', 'setFileName'])

const file = ref(undefined)
const { base64: url } = useBase64(file)

const onFileChange = async (e) => {
  file.value = e.target.files[0] || e.dataTransfer.files[0]
  if (!file.value) return

  emit('setFileName', file.value)
}

const clearImage = () => {
  file.value = undefined
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.file-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #f5f5f5;
  border-radius: 0.2rem;
  padding: 0.2rem;

  & .image {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  & div.basic {
    // background-color: gray;

    & button {
      position: relative;
      
      & input[type=file] {
        position: absolute;  
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
  
        @include hover-active-states {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

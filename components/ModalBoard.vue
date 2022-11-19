<template>
  <div>
    <modal @close="closeHandler">
    <template #title>
      {{ title }}
    </template>
    <template #body>
      <form @keyup.enter="submitHandler">
        <input-field
          type="text"
          label="Title"
          v-model="localData.title"
          placeholder="Title"
        />
        <input-field
          type="text"
          label="Description"
          v-model="localData.description"
          placeholder="Description"
        />
        <div class="color__picker">
          <input
            id="colour"
            type="color"
            label="Color"
            v-model="localData.color"
            placeholder="Project color"
          />
          <label for="colour" style="font-size: small;">Choose a background color</label>
        </div>
        <app-image-dropzone @setFileName="setFileName" />
      </form>
    </template>
    <button
      @click="submitHandler"
      class="btn ui primary button"
      :class="{ 'loading disabled': isLoading }"
      type="submit"
    >
      Submit
    </button>

  </modal>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: 'Board Modal'
  },
  isNew: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'submit'])

const localData = ref({})

onMounted(() => {
  localData.value = {
    ...props.data
  }
})

const imageFile = ref('')
const setFileName = (fileName) => {
  imageFile.value = fileName
}

const closeHandler = () => {
  emit('close')
}

const isLoading = ref(false)
const submitHandler = async () => {
  isLoading.value = true

  if(props.isNew) {
    if(imageFile.value) {
      const { snapshot, downloadUrl, metadata } = await uploadFile(imageFile.value)
      localData.value = {
        ...localData.value,
        imageUrl: {
          downloadUrl: downloadUrl
        }
      }
    }
  } else {
    if(imageFile.value) {
      const { snapshot, downloadUrl, metadata } = await uploadFile(imageFile.value)
      localData.value = {
        ...localData.value,
        imageUrl: {
          downloadUrl: downloadUrl
        }
      }
    } else {
      localData.value = {
        ...localData.value,
        imageUrl: {
          downloadUrl: props.data.imageUrl.downloadUrl
        }
      }
    }
  }
  // if(!imageFile) {
  //   localData.value = {
  //     ...localData.value,
  //     imageUrl: {
  //       downloadUrl: props.data.imageUrl.downloadUrl
  //     }
  //   }
  // } else {
  //   const { snapshot, downloadUrl, metadata } = await uploadFile(imageFile.value)
  //   localData.value = {
  //     ...localData.value,
  //     imageUrl: {
  //       downloadUrl: downloadUrl
  //     }
  //   }
  // }

  // // emit('fileChange', snapshot, downloadUrl, metadata)
  // isLoading.value = false

  emit('submit', localData.value)
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
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
}
</style>

<template>
  <div>
    <button class="ui primary button">
      <i class="upload icon"></i>
      Save
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['fileChange'])

const onFileChange = async (e) => {
  var files = e.target.files || e.dataTransfer.files
  if (!files.length) return

  const { snapshot, downloadUrl, metadata } = await uploadFile(files[0])
  emit('fileChange', snapshot, downloadUrl, metadata)
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';
</style>

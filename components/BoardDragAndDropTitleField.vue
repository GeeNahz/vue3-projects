<template>
  <div class="title__container">
    <input
      class="title"
      type="text"
      :value="modelValue"
      @keyup.enter="toggleDisable"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disable"
    />
    <div class="icon" @click="toggleDisable">
      <i :class="{
          'edit outline icon': disable,
          'save outline icon': !disable
        }"
      ></i>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  }
})

const disable = ref(true)
const toggleDisable = () => {
  disable.value = !disable.value
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.title__container {
  width: 100%;
  margin-right: 0.5rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  & .title {
    width: 100%;
    font-size: 14px;
    font-weight: font-weight(semibold);
    padding: 0.12rem 0.2rem;
    color: color(text-primary);
    text-transform: capitalize;
    
    &:disabled {
      opacity: 1;
      background-color: transparent;
      outline: none;
      border: none;
      padding: 0;
    }
  }

  // & .icon {
  //   background-color: color(secondary);
  //   padding: 0.4rem;
  //   border-radius: 0.2rem;

  //   @include center-items;
  //   @include transition-ease;
  //   @include hover-active-states {
  //     background-color: color(text-primary);
  //   }
  //   & svg {
  //     width: 1rem;
  //     fill: #fff;
  //   }
  // }
}
</style>

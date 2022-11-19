<template>
  <div class="input__container">
    <fieldset class="input__wrapper">
      <legend v-if="label" class="input__label">{{ label }}</legend>
      <input
        :type="fieldType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :aria-invalid="invalidField"
        :invalid="invalidField"
      />
    </fieldset>
  </div>
</template>

<script setup>
defineProps({
  fieldType: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: {
    type: [String],
    required: true,
    default: ''
  }
})

const invalidField = ref(false)
</script>

<style lang="scss" scoped>
.input__container {
  margin: 0.2rem auto;
  width: 100%;

  & .input__wrapper {
    border-radius: 0.3rem;
    border: 0.4px solid #e8e8e8;
    overflow: hidden;
    background-color: #fff;
    width: 100%;

    & legend {
      font-size: small;
      padding: 0 0.2rem;
      // margin-left: 0.2rem;
    }

    & input {
      outline: none;
      border: none;
      // padding: 0 0.3rem 0.5rem 0.3rem;
      width: 100%;
    }
  }
}

input:invalid {
  animation: 2s infinite alternate shake;
}

@keyframes shake {
  25% { transform: translateX(4px) }
  50% { transform: translateX(-4px) }
  75% { transform: translateX(4px) }
}
</style>

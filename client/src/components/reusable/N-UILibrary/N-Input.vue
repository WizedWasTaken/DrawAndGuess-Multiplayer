<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'white'
  },
  color: {
    type: String,
    default: 'black'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium'
  },
  rounded: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  border: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  }
})

const inputValue = ref('')
</script>

<!-- TODO: Fix input component -->
<template>
  <div class="input-container" :class="{ 'is-focused': inputValue.length > 0 || props.animated }">
    <label v-if="props.animated" for="inputField">{{ props.placeholder }}</label>
    <input
      id="inputField"
      :type="props.type"
      v-model="inputValue"
      :class="[
        'n-input',
        `n-input--${props.size}`,
        { 'n-input--rounded': props.rounded },
        { 'n-input--border': props.border },
        { 'n-input--animated': props.animated }
      ]"
      :style="{
        '--input-background-color': props.backgroundColor,
        '--input-color': props.color
      }"
      :disabled="props.disabled"
      :placeholder="props.animated ? '' : props.placeholder"
    />
  </div>
</template>

<style scoped>
.is-focused {
  label {
    transform: translateY(-20px);
    font-size: 12px;
  }
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: var(--input-background-color);
  color: var(--input-color);
}
</style>

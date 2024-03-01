<script setup lang="ts">
import { defineProps } from 'vue'

let props = defineProps({
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
  outline: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
})

console.log(props)
</script>

<template>
  <button
    :class="[
      'n-button',
      `n-button--${props.size}`,
      { 'n-button--rounded': props.rounded },
      { 'n-button--outline': props.outline },
      { 'n-button--border': props.border },
      { 'n-button--animated': props.animated }
    ]"
    :style="{
      backgroundColor: props.backgroundColor,
      color: props.color
    }"
    :disabled="props.disabled"
  >
    <span v-if="props.icon" class="n-button__icon">
      <i :class="props.icon"></i>
    </span>
    <span v-if="props.animated" class="extra-bg">
      <slot></slot>
    </span>
    <span v-else>
      <slot></slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.n-button {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: all 0.3s;
  outline: none;
  border: 0;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;

    &:hover {
      transform: none;
    }
  }

  &--small {
    padding: 8px 16px;
    font-size: 1rem;
  }

  &--large {
    padding: 12px 24px;
    font-size: 1.4rem;
  }

  &--rounded {
    border-radius: 10px;
  }

  &--outline {
    background-color: transparent;
    border: 2px solid currentColor;
  }

  &--border {
    border: 1px solid currentColor;
  }

  &--animated {
    background: radial-gradient(circle at center, #fff, #27272a, #313135);
    background-size: 200% 200%;
    animation: animatedBorder 2s alternate infinite ease-in-out;
  }

  &__icon {
    margin-right: 8px;
  }
}

.extra-bg {
  background-color: black;
  height: 100%;
  width: 100%;
}

@keyframes animatedBorder {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}
</style>

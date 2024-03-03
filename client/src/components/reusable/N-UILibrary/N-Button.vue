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
      '--button-background-color': props.backgroundColor,
      '--button-color': props.color
    }"
    :disabled="props.disabled"
  >
    <span v-if="props.icon" class="n-button__icon">
      <i :class="props.icon"></i>
    </span>
    <slot></slot>
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
  background-color: var(--button-background-color);
  color: var(--button-color);

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

  &--medium {
    padding: 10px 20px;
    font-size: 1.2rem;
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
    position: relative;
    overflow: hidden;
    border: 3px solid transparent;
    // var(--button-background-color) er en CSS variabel sat i inline styling, baseret på props.
    background:
      linear-gradient(var(--button-background-color), var(--button-background-color)) padding-box,
      linear-gradient(
          90deg,
          var(--button-background-color),
          var(--button-color),
          var(--button-background-color)
        )
        border-box;
    background-size:
      100% 100%,
      200% 200%;
    animation: animatedBorder 4s infinite linear;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: var(--button-background-color);
    }
  }
}

@keyframes animatedBorder {
  0% {
    background-position:
      0% 0%,
      0% 0%;
  }
  50% {
    background-position:
      0% 0%,
      100% 100%;
  }
  100% {
    background-position:
      0% 0%,
      0% 0%;
  }
}
</style>

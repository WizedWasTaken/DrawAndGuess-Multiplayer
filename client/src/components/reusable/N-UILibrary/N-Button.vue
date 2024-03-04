<script setup lang="ts">
import { defineProps } from 'vue'

/**
 * @param {String} backgroundColor - The background color of the button
 * @param {String} color - The text color of the button
 * @param {Boolean} disabled - Whether the button is disabled or not
 * @param {String} size - The size of the button
 * @param {Boolean} rounded - Whether the button is rounded or not
 * @param {Boolean} outline - Whether the button is outlined or not
 * @param {Boolean} border - Whether the button has a border or not
 * @param {Boolean} animated - Whether the button has an animated border or not
 * @param {String} icon - The icon of the button
 * @returns {Object} - The props object
 *
 * @description This function defines the props for the NButton component
 * @example <NButton backgroundColor="red" color="white" size="large" rounded outline border animated icon="fas fa-plus">Click Me</NButton> />
 */
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

<!-- HTML for button -->
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
  width: fit-content;
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

  // TODO: Look at SCSS mixin's for animations & transitions, and background colors.
  &--animated {
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
    animation: animatedBorder 5s infinite linear;
    transition: all 0.3s ease-in-out;

    // TODO: Special hover effect?
  }
}
</style>

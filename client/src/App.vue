<script setup lang="ts">
import { RouterView } from 'vue-router'

// Imports
import Waves from './components/WavesComponent.vue' // Import the waves component. (Used at bottom)
import Header from './components/HeaderComponent.vue' // Import the header component.
import '@/util/mouseEffect' // Import the mouseEffect function.
import { isChrome } from '@/util/checkIfChrome' // Check if user is using Chrome.
</script>

<template>
  <div class="cursor"></div>
  <div>
    <div v-if="isChrome">
      <Header />

      <RouterView />
    </div>
    <div class="not-chrome" v-else>
      <h1>Brug Google Chrome din noob! 😉</h1>
    </div>
  </div>
  <Waves />
</template>

<style scoped lang="scss">
/* TODO: Create a better glow, cursor effect. */
.cursor {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: transparent;
  pointer-events: none;
  z-index: -1;
  box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-primary);
}

nav a:first-of-type {
  border: 0;
}

/* Ikke Chrome */
.not-chrome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  color: red;
  text-align: center;
  background-color: hotpink;
  animation: blink 100ms infinite;
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router'

// import '@/util/mouseEffect' // Import the mouseEffect function.
import { isChrome } from '@/util/checkIfChrome' // Check if user is using Chrome.
</script>

<template>
  <div class="wrapper">
    <div>
      <div v-if="isChrome" class="wrapper">
        <Header />

        <div class="router-view">
          <RouterView />
        </div>
      </div>
      <div class="not-chrome" v-else>
        <h1>Brug Google Chrome din noob! 😉</h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
}

.wrapper {
  height: 100vh;
  color: var(--color-foreground);
  display: flex;
  flex-direction: column;
}

.router-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
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
  color: $color-foreground;
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

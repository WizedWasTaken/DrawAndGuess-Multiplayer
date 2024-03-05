<template>
  <header v-if="!isGameStarted">
    <div class="wrapper">
      <nav>
        <router-link to="/" exact>Home</router-link>
        <router-link to="/connect-room">Connect Room</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Imports
import { useIsIngameStore } from '@/stores/useIsIngameStore'
import { computed } from 'vue'

// Checking if user is in a lobby
const isIngameStore = useIsIngameStore()

// Checking if game has started
const isGameStarted = computed(() => isIngameStore.isIngame)
</script>

<style scoped lang="scss">
header {
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;

  .wrapper {
    max-width: 1200px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 2rem;

    nav {
      width: 100%;
      font-size: 12px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        display: inline-block;
        padding: 0 1rem;
        border-left: 1px solid $color-foreground;
        font-size: 20px;
        text-decoration: none;
        font-weight: $font-weight-normal;

        &:first-of-type {
          border: 0;
        }

        &:visited {
          color: $color-foreground;
        }

        &.router-link-exact-active {
          color: $color-primary;
          font-weight: $font-weight-bold;
        }
      }
    }
  }
}
</style>

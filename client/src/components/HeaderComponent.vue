<template>
  <header>
    <div class="wrapper">
      <nav v-if="!isGameStarted">
        <router-link to="/" exact>Home</router-link>
        <router-link to="/connect-room">Connect Room</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useIsIngameStore } from '@/stores/useIsIngameStore'
import { computed } from 'vue'

const isIngameStore = useIsIngameStore()

const isGameStarted = computed(() => isIngameStore.isIngame)
</script>

<style scoped lang="scss">
header {
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;

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
        border-left: 1px solid $color-border;
        font-size: 20px;
        color: white;
        text-decoration: none;

        &:first-of-type {
          border: 0;
        }

        &.router-link-exact-active {
          color: $active-link;
        }
      }
    }
  }
}
</style>

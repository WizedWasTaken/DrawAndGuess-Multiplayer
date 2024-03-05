<template>
  <form>
    <h1>Tilslut dig et rum</h1>
    <input v-model="roomId" :placeholder="'Enter room ID'" />
    <div class="wrapper">
      <N-Button
        :backgroundColor="'#8b000069'"
        :color="'#EDDDD4'"
        :rounded="true"
        :size="'small'"
        @click.prevent="joinRoom"
        >Tilslut spil</N-Button
      >
      <N-Button
        :backgroundColor="'#197278bd'"
        :color="'#EDDDD4'"
        :rounded="true"
        :border="true"
        :animated="true"
        :size="'small'"
        @click.prevent="hostGame"
        >Opret nyt spil</N-Button
      >
    </div>
  </form>
</template>

<script setup lang="ts">
/*
 * Imports
 */
import { ref, onMounted } from 'vue'
import { useWebSocketStore } from '@/stores/useWebSocketStore'
import { useIsIngameStore } from '@/stores/useIsIngameStore'
import router from '@/router'

// Components
import NButton from '@/components/reusable/N-UILibrary/N-Button.vue'

/*
 * Variables
 */
const roomId = ref('')
const webSocketStore = useWebSocketStore()
const isIngameStore = useIsIngameStore()

/**
 * Setup WebSocket
 * @returns {void}
 */
function setupWebSocket(): void {
  try {
    webSocketStore.initializeSocket()
  } catch (error) {
    console.error('Error setting up WebSocket:', error)
  }
}

/**
 * Join a room
 * @returns {Promise<void>}
 */
const joinRoom = async (): Promise<void> => {
  if (await webSocketStore.joinRoom(roomId.value)) {
    redirectToGamepage(isIngameStore.roomId)
  } else {
    console.error('Error hosting game')
  }
}

/**
 * Host a game
 * @returns {Promise<void>}
 */
const hostGame = async (): Promise<void> => {
  if (await webSocketStore.hostRoom()) {
    redirectToGamepage(isIngameStore.roomId)
  } else {
    console.error('Error hosting game')
  }
}

/**
 * Redirect to game page
 * @param id - string
 * @returns {void}
 */
function redirectToGamepage(id: string): void {
  router.push(`/game/${id}`)
}

/**
 * Setup WebSocket
 * @returns {void}
 */
onMounted(() => {
  setupWebSocket()
})
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 300px;
  margin: 0 auto;

  h1 {
    margin-bottom: 1rem;
  }

  button {
    font-weight: $font-weight-bold;

    &:hover {
      background-color: darken($color-primary, 30%);
    }
  }

  input {
    padding: 10px;
    margin-bottom: 1rem;
    width: 100%;
    border: 3px solid;
    border-image: linear-gradient(to bottom right, $color-primary, $color-secondary);
    border-image-slice: 1;
    background-color: transparent;
    color: $color-foreground;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: $color-foreground;
    }
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>

<template>
  <form>
    <h1>Tilslut dig et rum</h1>
    <input v-model="roomId" :placeholder="'Enter room ID'" />
    <div class="wrapper">
      <N-Button
        :backgroundColor="'darkred'"
        :color="'#EDDDD4'"
        :rounded="true"
        @click.prevent="joinRoom"
        >Tilslut spil</N-Button
      >
      <N-Button
        :backgroundColor="'#197278'"
        :color="'#EDDDD4'"
        :rounded="true"
        :border="true"
        :animated="true"
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
import NInput from '@/components/reusable/N-UILibrary/N-Input.vue'

/*
 * Variables
 */
const roomId = ref('')
const webSocketStore = useWebSocketStore()
const isIngameStore = useIsIngameStore()

/*
 * Setup WebSocket
 * @returns void
 */
function setupWebSocket() {
  try {
    webSocketStore.initializeSocket()
  } catch (error) {
    console.error('Error setting up WebSocket:', error)
  }
}

/*
 * Join a room
 * @returns void
 */
const joinRoom = async () => {
  if (await webSocketStore.joinRoom(roomId.value)) {
    redirectToGamepage(isIngameStore.roomId)
  } else {
    console.error('Error hosting game')
  }
}
/*
 * Host a game
 * @returns void
 */
const hostGame = async () => {
  if (await webSocketStore.hostRoom()) {
    redirectToGamepage(isIngameStore.roomId)
  } else {
    console.error('Error hosting game')
  }
}

/*
 * Redirect to game page
 * @param id - string
 * @returns void
 */
function redirectToGamepage(id: string) {
  console.log('Redirect to gamepage: ', id)
  router.push(`/game/${id}`)
}

/*
 * Setup WebSocket
 * @returns void
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
  margin: 0 auto;

  h1 {
    margin-bottom: 1rem;
  }

  input {
    padding: 10px;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 300px;
    border: 2px solid $color-primary;
    border-radius: 5px;
    background-color: $color-background;
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
    justify-content: space-around;
    width: 30%;
  }
}
</style>

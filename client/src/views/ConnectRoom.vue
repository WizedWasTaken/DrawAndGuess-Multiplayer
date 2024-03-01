<template>
  <form>
    <h1>Tilslut dig et rum</h1>
    <input v-model="roomId" placeholder="Enter room ID" />
    <div class="wrapper">
      <button v-show="!isGameStarted" class="host-button" @click.prevent="hostGame">
        Opret nyt spil
      </button>
      <N-Button
        :backgroundColor="'#197278'"
        :color="'#EDDDD4'"
        :rounded="true"
        :border="true"
        @click.prevent="joinRoom"
        >Opret nyt spil</N-Button
      >
    </div>
  </form>
</template>

<script setup lang="ts">
/*
 * Imports
 */
import { ref, computed, onMounted } from 'vue'
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

/*
 * Computed values
 */
const isGameStarted = computed(() => isIngameStore.isIngame)

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
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .connect-button {
    background-color: #4caf50;
    color: white;
    border: none;
  }

  .host-button {
    background-color: #f44336;
    color: white;
    border: none;
  }

  .wrapper {
    display: flex;
    justify-content: space-around;
    width: 30%;
  }
}
</style>

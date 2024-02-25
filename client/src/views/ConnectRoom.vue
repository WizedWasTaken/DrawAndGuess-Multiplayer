<template>
  <form>
    <h1>Tilslut dig et rum</h1>
    <input v-model="roomId" placeholder="Enter room ID" />
    <div class="wrapper">
      <button class="connect-button" @click.prevent="joinRoom">Tilslut et rum</button>
      <button v-show="!isGameStarted" class="host-button" @click.prevent="hostGame">
        Opret nyt spil
      </button>
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
    webSocketStore.socket?.on('room joined', (message) => {
      console.log(message)
    })
  } catch (error) {
    console.error('Error setting up WebSocket:', error)
  }
}

/*
 * Join a room
 * @returns void
 */
const joinRoom = () => {
  if (roomId.value.trim()) {
    try {
      console.log('Joining room', roomId.value)
      webSocketStore.socket?.emit('joinRoom', roomId.value)
      console.log('Attempting to join room', roomId.value)
      webSocketStore.socket?.once('error', (message) => {
        // TODO: Handle error
        console.log('Error joining room:', message)
      })
      webSocketStore.socket?.once('joinedRoom', () => {
        setValues(false, true)
        redirectToGamepage(roomId.value)
      })
    } catch (error) {
      console.error('Error joining room:', error)
    }
  } else {
    alert('Indtast venligst et rum ID')
  }
}

/*
 * Host a game
 * @returns void
 */
const hostGame = () => {
  try {
    webSocketStore.socket?.emit('createRoom')
    webSocketStore.socket?.once('room created', (id) => {
      roomId.value = id
      setValues(true, true)
      redirectToGamepage(id)
    })
  } catch (error) {
    console.error('Error hosting game:', error)
  }
}

/*
 * Set values in the store
 * @param isHost - boolean
 * @param isIngame - boolean
 * @returns void
 */
function setValues(isHost: boolean = false, isIngame: boolean = true) {
  isIngameStore.setIsHost(isHost)
  isIngameStore.setIsIngame(isIngame)
  isIngameStore.setRoomId(roomId.value)
  console.log('RoomID', roomId.value)
  console.log('setValues: ', isIngameStore.isHost, isIngameStore.isIngame, isIngameStore.roomId)
}

/*
 * Redirect to game page
 * @param id - string
 * @returns void
 */
function redirectToGamepage(id: string) {
  console.log('Redirect to gamepage: ', id)
  if (id.trim() === '' || id.trim() === undefined || id.trim() === null) {
    console.log('Id.trim is true')
    return false
  }

  try {
    console.log('Redirect to gamepage: ', id)
    router.push(`/game/${id}`)
  } catch (error) {
    console.error('Error redirecting to game page:', error)
  }
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

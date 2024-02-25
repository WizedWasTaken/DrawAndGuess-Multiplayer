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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useWebSocketStore } from '@/stores/useWebSocketStore'
import { useIsIngameStore } from '@/stores/useIsIngameStore'

const roomId = ref('')
const webSocketStore = useWebSocketStore()
const isIngameStore = useIsIngameStore()

let isGameStarted = computed(() => isIngameStore.isIngame)
console.log(isGameStarted.value)

const joinRoom = () => {
  if (roomId.value.trim()) {
    webSocketStore.socket?.emit('join room', roomId.value)
    isIngameStore.setIsIngame(true)
  }
}

const hostGame = () => {
  console.log('host game')
}

onMounted(() => {
  webSocketStore.initializeSocket()
  webSocketStore.socket?.on('room joined', (message) => {
    console.log(message)
  })
})

onUnmounted(() => {
  webSocketStore.disconnectSocket()
})
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

<template>
  <div>
    <h1>Starting room</h1>
    <ul>
      <li v-for="player in players" :key="player.id">{{ player.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

interface Player {
  id: string
  name: string
}

const players = ref<Player[]>([])
const socket: Ref<Socket | null> = ref(null)
const route = useRoute()

onMounted(() => {
  socket.value = io('http://localhost:3000') // Adjust URL as needed
  socket.value.emit('joinRoom', route.params.roomId)

  socket.value.on('newPlayer', (player: Player) => {
    players.value.push(player)
  })

  // Listen for other events like playerLeft, gameStateUpdated, etc.
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
})
</script>

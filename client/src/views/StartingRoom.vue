<template>
  <div class="chatbox">
    <h1>Din Kode: {{ roomID }}</h1>
    <h2>Chat</h2>
    <div class="chat-messages">
      <!-- Use v-for to render messages -->
      <div v-for="message in messages" :key="message.id">
        <p>{{ message }}</p>
      </div>
    </div>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Skriv en besked til de andre brugere...."
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useWebSocketStore } from '@/stores/useWebSocketStore'
import { useIsIngameStore } from '@/stores/useIsIngameStore'
import router from '@/router'

const webSocket = useWebSocketStore()
const isIngameStore = useIsIngameStore()

const newMessage = ref('')

let roomID = computed(() => isIngameStore.roomId)

webSocket.socket?.on('roomLeft', () => {
  console.log('Room left')
  router.push('/connect-room')
})

onMounted(async () => {
  if (roomID.value) {
    webSocket.joinRoom(roomID.value)
  } else {
    await router.push('/connect-room')
  }
})

onUnmounted(() => {
  webSocket.leaveRoom(isIngameStore.roomId)
  webSocket.disconnectSocket()
})

function sendMessage() {
  console.log('sendMessage')
  if (newMessage.value.trim() !== '') {
    console.log('Sending message:', newMessage.value)
    webSocket.sendMessage(newMessage.value)
    newMessage.value = ''
  }
}

const messages = computed(() => webSocket.messages)
</script>

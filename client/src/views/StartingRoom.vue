<template>
  <div class="chatbox">
    <h2>Chat</h2>
    <div class="chat-messages">
      <!-- Use v-for to render messages -->
      <div v-for="message in messages" :key="message.id">
        <p>{{ message }}</p>
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useWebSocketStore } from '@/stores/useWebSocketStore'

const webSocket = useWebSocketStore()
const newMessage = ref('')

onMounted(() => {
  webSocket.initializeSocket()
})

onUnmounted(() => {
  webSocket.disconnectSocket()
})

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    webSocket.sendMessage(newMessage.value)
    newMessage.value = ''
  }
}

const messages = computed(() => webSocket.messages)
</script>

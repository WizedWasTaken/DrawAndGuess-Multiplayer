<template>
  <div class="container">
    <div class="chatbox">
      <h1>Din Kode: {{ roomID }}</h1>
      <h2>Chat</h2>
      <div class="chat-messages">
        <!-- Use v-for to render messages -->
        <div v-for="message in messages" :key="message.id">
          <div class="inline">
            <span>{{ message.username }}:</span>
            <p>{{ message.message }}</p>
          </div>
        </div>
      </div>
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Skriv en besked til de andre brugere...."
      />
    </div>
    <div class="user-list">
      <h2>Brugere i rummet</h2>
      <div v-for="user in users" :key="user.id">
        <p>{{ user.username }}</p>
      </div>
    </div>
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
  webSocket.messages = []
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
const users = computed(() => webSocket.users)
</script>

<style scoped lang="scss">
.inline {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  span {
    margin-right: 10px;
  }
  p {
    margin: 0;
  }
}
</style>

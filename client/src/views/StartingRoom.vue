<template>
  <div class="container">
    <h1 class="title">Rum: {{ roomID }}</h1>
    <div class="child-container">
      <div class="chatbox">
        <h2 class="subtitle">Chat</h2>
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Skriv en besked til de andre brugere...."
          class="input"
        />
        <div class="chat-messages" ref="chatMessagesContainer">
          <!-- Use v-for to render messages -->
          <div v-for="message in messages" :key="message.id" class="message">
            <div class="inline">
              <span class="username"
                ><b>{{ message.username }}:</b> {{ message.message }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="user-list">
        <h2 class="subtitle">Brugere i rummet {{ users.length }}</h2>
        <div v-for="user in users" :key="user.id" class="user">
          <p v-if="user.username === webSocket.username">{{ user.username }} <b>(Dig)</b></p>
          <p v-else>{{ user.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import { useWebSocketStore } from '@/stores/useWebSocketStore'
import { useIsIngameStore } from '@/stores/useIsIngameStore'
import router from '@/router'

const webSocket = useWebSocketStore()
const isIngameStore = useIsIngameStore()

const newMessage = ref('')
const chatMessagesContainer = ref<HTMLElement | null>(null) // Define the ref

let roomID = computed(() => isIngameStore.roomId)

onMounted(async () => {
  if (roomID.value) {
    return
  } else {
    await router.push('/connect-room')
  }
})

onUnmounted(() => {
  webSocket.leaveRoom(isIngameStore.roomId)
})

let disableInput = false
function sendMessage(this: any) {
  if (disableInput) {
    return
  }

  if (newMessage.value.trim() !== '') {
    webSocket.sendMessage(newMessage.value)
    newMessage.value = ''
    disableInput = true
    setTimeout(() => {
      disableInput = false
    }, 1000)
  }
}

watch(
  () => webSocket.messages,
  () => {
    nextTick(() => {
      if (chatMessagesContainer.value) {
        const element = chatMessagesContainer.value
        element.scrollTop = element.scrollHeight
      }
    })
  },
  { deep: true }
)

const messages = computed(() => webSocket.messages)
const users = computed(() => webSocket.users)
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
}

.child-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  width: 100%;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 26px;
  margin-bottom: 10px;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #9b9b9b;
  color: #fff;
}

.input::placeholder {
  color: #ffffffb1;
}

.chat-messages {
  max-height: 200px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.inline {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
}

.username {
  margin-right: 10px;
}

.user {
  margin-bottom: 5px;
}
</style>

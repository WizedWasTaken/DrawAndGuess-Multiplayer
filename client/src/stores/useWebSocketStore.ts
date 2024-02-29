import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'
import { useIsIngameStore } from '@/stores/useIsIngameStore'
import router from '@/router'

// Alert
import Swal from 'sweetalert2'

const isIngameStore = useIsIngameStore()

export const useWebSocketStore = defineStore('webSocket', {
  state: () => ({
    socket: null as Socket | null,
    isConnected: false,
    username: '',

    // Array til at holde beskeder
    messages: [] as any[],
    // Array til at holde brugere
    users: [] as any[]
  }),
  actions: {
    initializeSocket() {
      if (this.socket) {
        return
      }

      this.socket = io('http://localhost:4000')
      // this.socket = io('http://10.203.128.38:4000')
      this.socket.on('connect', () => {
        if (this.isConnected === true) {
          this.messages = []
          return
        }
        this.isConnected = true
        this.generateUsername()
      })
      this.socket.on('disconnect', () => {
        this.isConnected = false
      })
      this.socket.on('message', (message) => {
        this.handleIncomingMessage(message)
      })
      this.socket.on('joinedRoom', async (id) => {
        isIngameStore.setValues(true, false, id)
      })
      this.socket.on('users', (users) => {
        this.users = users
      })
      this.socket.on('roomLeft', () => {
        this.messages = []
        isIngameStore.setValues(false, false, '')
        router.push('/')
      })
      this.socket.on('error', (error) => {
        console.error(error)
        Swal.fire({
          // Use Swal here
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    },
    sendMessage(message: string) {
      if (this.socket) {
        this.socket.emit('message', this.username, message, isIngameStore.roomId)
      }
    },

    generateUsername() {
      const username = `Bruger ${Math.floor(Math.random() * 1000)}`
      this.username = username
      return username
    },

    handleIncomingMessage(message: string) {
      // TODO: Audio gets a bit buggy when receiving multiple messages at once
      const audio = new Audio('/notifications/notification.mp3')
      audio.play()
      this.messages.push(message)
    },

    async hostRoom() {
      if (this.socket) {
        this.socket?.emit('createRoom', this.username)
        return new Promise<boolean>((resolve) => {
          this.socket?.once('room created', (id) => {
            isIngameStore.setValues(true, true, id)
            resolve(true)
          })
        })
      }

      return false
    },

    async joinRoom(roomId: string) {
      if (this.socket) {
        this.socket.emit('joinRoom', roomId, this.username)

        return new Promise<boolean>((resolve) => {
          this.socket?.once('joinedRoom', () => {
            isIngameStore.setValues(true, false, roomId)
            resolve(true)
          })
        })
      }

      return false
    },

    leaveRoom(roomId: string) {
      if (this.socket) {
        this.messages = []
        this.socket.emit('leaveRoom', roomId, this.username, this.socket.id)
      }
    },

    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect()
        isIngameStore.setValues(false, false, '')
        this.messages = []
      }
    }
  }
})

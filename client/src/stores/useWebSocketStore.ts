import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'
import { useIsIngameStore } from '@/stores/useIsIngameStore'
import router from '@/router'

// Alert
import Swal from 'sweetalert2'

const isIngameStore = useIsIngameStore()

export const useWebSocketStore = defineStore('webSocket', {
  /**
   * @returns {Socket | null} - The socket
   * @returns {boolean} - Whether the user is connected to the server or not
   * @returns {string} - The username of the user
   * @returns {any[]} - The messages
   * @returns {any[]} - The users
   * @description - The initial state of the store
   */
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
    /**
     *
     *
     * @returns {void}
     * @description - This function initializes the socket and sets up the event listeners
     */
    initializeSocket(): void {
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
    /**
     * @param message - The message to be sent
     * @returns {void}
     * @description - This function sends a message to the server
     */
    sendMessage(message: string): void {
      if (this.socket) {
        this.socket.emit('message', this.username, message, isIngameStore.roomId)
      }
    },
    /**
     * @returns {string} - The generated username
     * @description - This function generates a random username
     */
    generateUsername(): string {
      const username = `Bruger ${Math.floor(Math.random() * 1000)}`
      this.username = username
      return username
    },
    /**
     * @param message - The message to be handled
     * @returns {void}
     * @description - This function handles incoming messages
     */
    handleIncomingMessage(message: string): void {
      // TODO: Audio gets a bit buggy when receiving multiple messages at once
      const audio = new Audio('/notifications/notification.mp3')
      audio.play()
      this.messages.push(message)
    },

    /**
     * @returns {Promise<boolean>} - Whether the room was created or not
     * @description - This function creates a room
     * @async
     */
    async hostRoom(): Promise<boolean> {
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

    /**
     *
     * @param roomId - The room ID to join
     * @returns {Promise<boolean>} - Whether the room was joined or not
     * @description - This function joins a room
     */
    async joinRoom(roomId: string): Promise<boolean> {
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

    /**
     * @param roomId - The room ID to leave
     * @returns {void}
     * @description - This function leaves a room
     */
    leaveRoom(roomId: string): void {
      if (this.socket) {
        this.messages = []
        this.socket.emit('leaveRoom', roomId, this.username, this.socket.id)
      }
    },

    /**
     * @returns {void}
     * @description - This function disconnects the socket
     */
    disconnectSocket(): void {
      if (this.socket) {
        this.socket.disconnect()
        isIngameStore.setValues(false, false, '')
        this.messages = []
      }
    }
  }
})

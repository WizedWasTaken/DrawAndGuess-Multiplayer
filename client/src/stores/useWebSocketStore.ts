import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'
import { useIsIngameStore } from '@/stores/useIsIngameStore'

const isIngameStore = useIsIngameStore()

export const useWebSocketStore = defineStore('webSocket', {
  state: () => ({
    socket: null as Socket | null,
    isConnected: false,
    username: '',
    messages: [] as any[] // Consider defining a Message type/interface for better type safety
  }),
  actions: {
    initializeSocket() {
      this.socket = io('http://localhost:4000') // Adjust with your server URL
      this.socket.on('connect', () => {
        this.isConnected = true
        console.log('WebSocket connected:', this.socket?.id)
      })
      this.socket.on('disconnect', () => {
        this.isConnected = false
        console.log('WebSocket disconnected')
      })
      this.socket.on('message', (message) => {
        this.messages.push(message)
      })
      this.socket.on('room created', (id) => {
        this.generateUsername()
        console.log('Room created:', id)
        isIngameStore.setValues(true, true, id)
      })
      this.socket.on('joinedRoom', (id) => {
        this.generateUsername()
        this.sendMessage('Hello from client')
        isIngameStore.setValues(true, false, id)
      })
    },
    /*
     * This method is used to send a message to the server.
     * The server should handle the message and broadcast it to the appropriate room.
     * */
    // TODO: Error on sending messages.
    sendMessage(message: string) {
      if (this.socket) {
        // VI SENDER 2 ARGUMENTER OG FORTÆLLER HVILKEN SOCKET DER SKAL BEHANDLE BESKEDEN
        this.socket.emit('message', message, this.socket)
      }
    },

    generateUsername() {
      const username = `User${Math.floor(Math.random() * 1000)}`
      this.username = username
      console.log('Username:', username)
      return username
    },

    /*
     * This method is used to create a room.
     * It's important to note that this method is not used to join a room.
     * The server should handle the creation of rooms.
     * This method is used to create a room.
     * */
    async hostRoom() {
      if (this.socket) {
        console.log('hostRoom')
        this.socket?.emit('createRoom')
        return new Promise<boolean>((resolve) => {
          this.socket?.once('room created', (id) => {
            console.log('Room created:', id)
            isIngameStore.setValues(true, true, id)
            resolve(true)
          })
        })
      }

      return false
    },

    /*
     * This method is used to join a room.
     * It's important to note that this method is not used to create a room.
     * The server should handle the creation of rooms.
     * This method is used to join an existing room.
     * */
    async joinRoom(roomId: string) {
      // TODO: Implement the server-side logic to handle the joining of specific rooms
      if (this.socket) {
        console.log('joinRoom')
        this.socket.emit('joinRoom', roomId)

        return new Promise<boolean>((resolve) => {
          this.socket?.once('joinedRoom', () => {
            console.log('Room joined:', roomId)
            isIngameStore.setValues(true, false, roomId)
            resolve(true)
          })
        })
      }

      return false
    },

    /*
     * This method is used to leave a room.
     */
    leaveRoom(roomId: string) {
      if (this.socket) {
        // TODO: Implement the server-side logic to handle the leaving of a room
        this.socket.emit('leaveRoom', roomId, this.socket.id, isIngameStore.isHost)
      }
    },

    /*
     * This method is used to disconnect the WebSocket connection.
     */
    disconnectSocket() {
      // TODO: Implement the server-side logic to handle the disconnection of a WebSocket connection
      if (this.socket) {
        this.socket.disconnect()
        isIngameStore.setValues(false, false, '')
      }
    }
  }
})

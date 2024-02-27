import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'
import { useIsIngameStore } from '@/stores/useIsIngameStore'

const isIngameStore = useIsIngameStore()

export const useWebSocketStore = defineStore('webSocket', {
  state: () => ({
    socket: null as Socket | null,
    isConnected: false,
    username: '',
    messages: [] as any[], 
    users: [] as any[]
  }),
  actions: {
    initializeSocket() {
      this.socket = io('http://localhost:4000') 
      this.socket.on('connect', () => {
        this.isConnected = true
        this.generateUsername()
        console.log('WebSocket connected:', this.socket?.id)
      })
      this.socket.on('disconnect', () => {
        this.isConnected = false
        console.log('WebSocket disconnected')
      })
      this.socket.on('message', (message) => {
        this.handleIncomingMessage(message);
      })
      this.socket.on('room created', (id) => {
        console.log('Room created:', id)
        isIngameStore.setValues(true, true, id)
      })
      this.socket.on('joinedRoom', async (id) => {
        isIngameStore.setValues(true, false, id)
      })
      this.socket.on('users', (users) => {
        console.log('Users:', users)
        this.users = users
      })
    },
    /*
     * This method is used to send a message to the server.
     * The server should handle the message and broadcast it to the appropriate room.
     * */
    sendMessage(message: string) {
      if (this.socket) {
        console.log('sendMessage:', message)
        console.log('sendMessage:', this.username)
        // I TRIED TO FIX THIS SHIT FOR HOURS 🤦‍♂️😒😒😒
        this.socket.emit("message", this.username, message, isIngameStore.roomId)
      }
    },

    generateUsername() {
      const username = `Bruger ${Math.floor(Math.random() * 1000)}`
      this.username = username
      console.log('Brugernavn:', username)
      return username
    },

    /*
      * This method is used to handle incoming messages from the server.
      * The server should handle the message and broadcast it to the appropriate room.
      * */
    handleIncomingMessage(message: string) {
      console.log('Incoming message:', message)
      this.messages.push(message)
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
        this.socket?.emit('createRoom', this.username)
        return new Promise<boolean>((resolve) => { // Det virker bare, ik tænk 😉
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
      if (this.socket) {
        console.log('joinRoom')
        this.generateUsername()
        // This works, idk why 🤷‍♂️
        this.socket.emit('joinRoom', roomId, this.username)

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
        this.socket.emit('leaveRoom', roomId, this.socket.id, isIngameStore.isHost, this.username)
      }
    },

    /*
     * This method is used to disconnect the WebSocket connection.
     */
    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect()
        isIngameStore.setValues(false, false, '')
      }
    }
  }
})

import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';

export const useWebSocketStore = defineStore('webSocket', {
  state: () => ({
    socket: null as Socket | null,
    isConnected: false,
    messages: [] as any[], // Consider defining a Message type/interface for better type safety
  }),
  actions: {
    initializeSocket() {
      this.socket = io('http://localhost:4000'); // Adjust with your server URL
      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('WebSocket connected:', this.socket?.id);
      });
      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('WebSocket disconnected');
      });
      this.socket.on('message', (message) => {
        this.messages.push(message);
      });
    },
    sendMessage(message: string) {
      if (this.socket) {
        this.socket.emit('message', message);
      }
    },
    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect();
      }
    },
  },
});

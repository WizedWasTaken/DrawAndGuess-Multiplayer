import { defineStore } from 'pinia'

export const useIsIngameStore = defineStore('isIngame', {
  state: () => ({
    isIngame: false,
    isHost: false,
    roomId: ''
  }),
  actions: {
    setIsIngame(value: boolean) {
      console.log('setIsIngame', value)
      this.isIngame = value
    },
    setIsHost(value: boolean) {
      console.log('setIsHost', value)
      this.isHost = value
    },
    setRoomId(value: string) {
      console.log('setRoomId', value)
      this.roomId = value
    }
  }
})

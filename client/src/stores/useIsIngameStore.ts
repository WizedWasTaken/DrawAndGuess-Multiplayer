import { defineStore } from 'pinia'

export const useIsIngameStore = defineStore('isIngame', {
  state: () => ({
    isIngame: false,
    isHost: false,
    roomId: ''
  }),
  actions: {
    setValues(isIngame: boolean, isHost: boolean, roomId: string) {
      this.isIngame = isIngame
      this.isHost = isHost
      this.roomId = roomId
    }
  }
})

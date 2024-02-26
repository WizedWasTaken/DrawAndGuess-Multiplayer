import { defineStore } from 'pinia'

export const useIsIngameStore = defineStore('isIngame', {
  state: () => ({
    isIngame: false,
    isHost: false,
    roomId: ''
  }),
  actions: {
    setValues(isIngame: boolean, isHost: boolean, roomId: string) {
      console.log('setValues')
      console.log(isIngame, isHost, roomId)
      this.isIngame = isIngame
      this.isHost = isHost
      this.roomId = roomId
    }
  }
})

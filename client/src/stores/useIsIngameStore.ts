import { defineStore } from 'pinia'

export const useIsIngameStore = defineStore('isIngame', {
  state: () => ({
    isIngame: false
  }),
  actions: {
    setIsIngame(value: boolean) {
      console.log('setIsIngame', value)
      this.isIngame = value
    }
  }
})

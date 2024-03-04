import { defineStore } from 'pinia'

export const useIsIngameStore = defineStore('isIngame', {
  /**
   * The initial state of the store
   * @returns {boolean} isIngame - Whether the user is in a game or not
   * @returns {boolean} isHost - Whether the user is the host of the game
   * @returns {string} roomId - The room ID of the game
   */
  state: () => ({
    isIngame: false,
    isHost: false,
    roomId: ''
  }),
  actions: {
    /**
     * Set the values of the store
     * @param {boolean} isIngame - Whether the user is in a game or not
     * @param {boolean} isHost - Whether the user is the host of the game
     * @param {string} roomId - The room ID of the game
     */
    setValues(isIngame: boolean, isHost: boolean, roomId: string) {
      this.isIngame = isIngame
      this.isHost = isHost
      this.roomId = roomId
    }
  }
})

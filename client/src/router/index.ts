import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      /**
       * Home page component
       * @returns {Promise} - The component to be rendered
       */
      component: HomePage
    },
    {
      path: '/connect-room',
      name: 'connect',
      /**
       *
       * @returns {Promise} - The component to be rendered
       * @description - This function returns a promise that resolves to the component to be rendered
       */
      component: () => import('@/views/ConnectRoom.vue')
    },
    {
      path: '/game/:id',
      name: 'game',
      /**
       * Starting room component
       * @returns {Promise} - The component to be rendered
       * @description - This function returns a promise that resolves to the component to be rendered
       */
      component: () => import('@/views/StartingRoom.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/connect-room',
      name: 'connect',
      component: () => import('@/views/ConnectRoom.vue')
    },
    {
      path: '/game/:id',
      name: 'game',
      component: () => import('@/views/StartingRoom.vue')
    },
    {
      path: '/background',
      name: 'background',
      component: () => import('@/components/BackgroundEffect.vue')
    }
  ]
})

export default router

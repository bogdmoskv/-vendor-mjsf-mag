import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompositionAPIComponent from '@/components/CompositionAPIComponent.vue'
import OptionsAPIComponent from '@/components/OptionsAPIComponent.vue'
import TooltipTestingComponent from '@/components/TooltipTestingComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Tooltip',
      component: TooltipTestingComponent
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/composition',
      name: 'Composition',
      component: CompositionAPIComponent
    },
    {
      path: '/options',
      name: 'Options',
      component: OptionsAPIComponent
    },
  ]
})

export default router

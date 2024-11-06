import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/HelloWorld.vue'
import Lab2 from '../components/lab2/Lab2.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/lab2', component: Lab2 }
]

const router = createRouter({ history: createWebHistory(), routes, })

export default router

import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue';
import ProductDetail from '@/components/product/ProductDetail.vue';
import UsersView from '@/views/UsersView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/categories',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/',
            name: 'Products',
            component: ProductsView
        },
        {
            path: '/product/:id',
            component: ProductDetail,
            props: true
        },
        {
            path: '/users',
            name: 'Users',
            component: UsersView
        }

    ]
})

export default router

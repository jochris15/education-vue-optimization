import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ReactivityDemo from '@/views/ReactivityDemo.vue'
import DebounceThrottleDemo from '@/views/DebounceThrottleDemo.vue'
import ReRenderDemo from '@/views/ReRenderDemo.vue'

// lazy loading from router
// only load this component when the route is visited
const LazyLoadingDemo = () => import('@/views/LazyLoadingDemo.vue')

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/reactivity',
        name: 'ReactivityDemo',
        component: ReactivityDemo
    },
    {
        path: '/debounce-throttle',
        name: 'DebounceThrottleDemo',
        component: DebounceThrottleDemo
    },
    {
        path: '/re-render',
        name: 'ReRenderDemo',
        component: ReRenderDemo
    },
    {
        path: '/lazy-loading',
        name: 'LazyLoadingDemo',
        component: LazyLoadingDemo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
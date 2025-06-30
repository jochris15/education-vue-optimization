import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import ReactivityDemo from '@/views/ReactivityDemo.vue'
import DebounceThrottleDemo from '@/views/DebounceThrottleDemo.vue'
import ReRenderDemo from '@/views/ReRenderDemo.vue'
import LazyLoadingDemo from '@/views/LazyLoadingDemo.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
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
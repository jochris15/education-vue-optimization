import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Lazy loaded components
const ReactivityDemo = () => import('./components/ReactivityDemo.vue')
const DebounceThrottleDemo = () => import('./components/DebounceThrottleDemo.vue')
const ReRenderDemo = () => import('./components/ReRenderDemo.vue')
const LazyLoadingDemo = () => import('./components/LazyLoadingDemo.vue')
const Home = () => import('./components/Home.vue')

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/reactivity', component: ReactivityDemo, name: 'Reactivity' },
  { path: '/debounce-throttle', component: DebounceThrottleDemo, name: 'DebounceThrottle' },
  { path: '/re-render', component: ReRenderDemo, name: 'ReRender' },
  { path: '/lazy-loading', component: LazyLoadingDemo, name: 'LazyLoading' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')

import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import HelloWorldVue from '../components/HelloWorld.vue'

// 1. Define route components.
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const HelloWorld = () => import('../components/HelloWorld.vue')
const Environment = () => import('../views/Environment.vue')
const VueUseSample = () => import('../views/VueUseSample.vue')

// 2. Define some routes
const routes = [
  { path: '/', name: "home", component: Home },
  { path: '/about', name: "about", component: About },
  { path: '/hello', name: "hello", component: HelloWorld },
  { path: '/env', name: "environment", component: Environment },
  { path: '/vueuse', name: "vueuse", component: VueUseSample },
]

// 3. Create the router instance and pass the `routes` option
const router = createRouter({
  // createWebHashHistory // (hash路由)
  // createWebHistory // (history路由)
  // createMemoryHistory // (内存路由)
  // 添加baseUrl， createWebHistory({ base: '/base/' })
  history: createWebHistory(),
  routes // short for `routes: routes`
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router

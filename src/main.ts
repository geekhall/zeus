import { createApp } from 'vue'
import Vue from 'vue'
import './style.css'

// 设置路由
import router, { setupRouter } from './router'

// Element Plus



// import App from './App.vue'

import App from './App.vue'
const app = createApp(App)

// 设置路由
setupRouter(app)

router.isReady().then(() => {
  app.mount('#app')
})

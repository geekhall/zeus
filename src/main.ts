import { createApp } from 'vue'
import Vue from 'vue'
import './style.css'

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// import section
// 引入的各种第三方模块，如Element Plus、Vue Router、Vuex等
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// 引入路由
import router, { setupRouter } from './router'

// 全局引入Element Plus（本工程使用按需引入，这里注释掉）
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 引入Vuex
import store from './store'

// import App from './App.vue'


//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// createApp
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

import App from './App.vue'
const app = createApp(App)

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// setting
// 各种第三方模块的设置，如Element Plus、Vue Router、Vuex等
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/


// 设置Vue-router路由
setupRouter(app)

// 设置Element Plus（本工程使用按需引入，这里注释掉）
// app.use(ElementPlus)

// 设置Vuex
app.use(store)

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// mount
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
router.isReady().then(() => {
  app.mount('#app')
})

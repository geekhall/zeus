# Environment

## 0. 软件版本列表
```bash
pnpm: 6.32.6
node: 18.11.18
typescript: 4.9.3
vue: 3.2.45
vite: 4.0.0
vue-router: 4.0.13
element-plus: 2.2.28
vuex: 4.0.2
axios: 1.2.3
```
## 1. 初始化Vite工程

```bash
pnpm create vite
pnpm install
pnpm run dev
```

## 2. 安装及配置Element Plus

### 2.1 安装Element Plus
```bash
pnpm install -D element-plus
# or
yarn add element-plus -D

```


### 2.2 配置完整导入Element Plus

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

Volar支持
如果您使用 `Volar`，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。
```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```
### 2.2 配置按需导入Element Plus(推荐)

安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```bash
pnpm install -D unplugin-vue-components unplugin-auto-import
yarn add unplugin-element-plus -D
# or
pnpm install unplugin-element-plus -D
```

修改`vite.config.ts` 配置文件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})

```

## 3. 安装及配置Vue Router

### 3.1 安装Vue Router

```bash
pnpm install vue-router@next
# or
yarn add vue-router@next
```

### 3.2 配置Vue Router

创建`router`文件夹，并在文件夹中创建`index.ts`文件

```ts
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

// 1. Define route components.
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')

// 2. Define some routes
const routes = [
  { path: '/', name: "home", component: Home },
  { path: '/about', name: "about", component: About }
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

```


在`main.ts`中引入`router`并挂载

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'

const app = createApp(App)

// 设置路由
setupRouter(app)

router.isReady().then(() => {
  app.mount('#app')
})

```

安装`@types/node` 解决`import path from 'path'`模块报错

```bash
pnpm install @types/node -D
```

配置`vite.config.ts`文件

```ts
import { resolve } from 'path'

export default defineConfig({
  // ...
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@c': resolve(__dirname, 'src/components'),
      '@v': resolve(__dirname, 'src/views'),
    }
  }
})

```
## 4. 安装及配置Vuex

### 4.1 安装Vuex

```bash
pnpm install vuex@next
```

### 4.2 配置Vuex

创建`store`文件夹，并在文件夹中创建`index.ts`文件

```ts

import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
```

在`main.ts`中引入`store`并挂载

```ts
// ...
import store from './store'
const app = createApp(App)

app.use(store)

```

在组件或者ts中使用Vuex：
```html
<template>
  <div class="counter">
    <h3>Counter</h3>
    <hr />
    <h2>{{ cnt }}</h2>
    <p>Counter page</p>
    <el-button type="primary" @click="increase">Increase</el-button>
    <el-button type="primary" @click="decrease">Decrease</el-button>
  </div>
</template>
```

```ts
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const cnt = computed(() => store.state.count);
const increase = () => store.commit("increment", { amount: 2 });
const decrease = () => store.commit("decrement", { amount: 2 });

```

## 5. 安装及配置Axios

### 5.1 安装Axios

```bash
pnpm install axios --save
```

### 5.2 配置Axios

创建`utils`文件夹，并在文件夹中创建`request.ts`文件,

```ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

export function request(config: AxiosRequestConfig) {

  // 1. 创建 axios 实例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  // 2. axios 的拦截器
  // 2.1 请求拦截的作用
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );

  // 2.2 响应拦截
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err: any) => {
      if (err?.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误';
            break;
          case 401:
            err.message = '未授权，请登录';
            break;
          case 403:
            err.message = '拒绝访问';
            break;
          case 404:
            err.message = `请求地址出错: ${err.response.config.url}`;
            break;
          case 408:
            err.message = '请求超时';
            break;
          case 500:
            err.message = '服务器内部错误';
            break;
          case 501:
            err.message = '服务未实现';
            break;
          case 502:
            err.message = '网关错误';
            break;
          case 503:
            err.message = '服务不可用';
            break;
          case 504:
            err.message = '网关超时';
            break;
          case 505:
            err.message = 'HTTP版本不受支持';
            break;
          default:
            err.message = '未知错误';
            break;
        }
        return Promise.reject(err);
      } else {
        if (err.message.includes('timeout')) {
          err.message = '请求超时';
        }
        if (err.message.includes('Network Error')) {
          err.message = '网络错误';
        }
        return Promise.reject(err);
      }
      console.log(err);
    }
  )


  return instance(config);
}


```

在`vite.config.ts`中引入`request.ts`并挂载

```ts


```

在组件或者ts中使用Axios：

```ts
```


### 启动环境

```bash
npx vite --port=4000
```

会随VSCode启动，自动打开浏览器

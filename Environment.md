# Environment

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


### 启动环境

```bash
npx vite --port=4000
```

会随VSCode启动，自动打开浏览器

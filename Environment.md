# Environment

## Initialization

```bash
pnpm create vite
pnpm install
pnpm run dev
```
## 配置完整导入Element Plus

安装`element-plus` 和 `vite-plugin-style-import`这两款插件

```bash
pnpm install -D element-plus vite-plugin-style-import
# or
yarn add element-plus vite-plugin-style-import -D

```

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
## 配置按需导入Element Plus(推荐)

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



## 启动环境

```bash
npx vite --port=4000
```

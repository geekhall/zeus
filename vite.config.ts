import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// yarn add unplugin-element-plus
// or
// npm i unplugin-element-plus
// or
// pnpm i unplugin-element-plus
import ElementPlus from 'unplugin-element-plus/vite'

// import styleImport from 'vite-plugin-style-import'

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// const path_resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      // use `unplugin-auto-import` to automatically import components
      // use `unplugin-vue-components` to manually import components

    }),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: 'element-plus',
    //       esModule: true,
    //       ensureStyleFile: true,
    //       resolveStyle: (name) => {
    //         name = name.slice(3)
    //         return `element-plus/packages/theme-chalk/src/${name}.scss`
    //       },
    //       resolveComponent: (name) => {
    //         return `element-plus/lib/${name}`
    //       },
    //     },
    //   ],
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@c': resolve(__dirname, 'src/components'),
      '@v': resolve(__dirname, 'src/views'),
    }
  }
})

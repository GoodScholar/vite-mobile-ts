import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 基本公共路径
  plugins: [vue(), vueJsx()],
  build: {
    // 设置打包后文件的名称
    outDir: 'h5-mobile'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/style/mixins.scss";
        `
      }
    },
    postcss: {
      plugins: [
        tailwindcss,
        postcssPxToViewport({
          unitToConvert: 'px',
          viewportWidth: (file) => (file && file.indexOf('vant') !== -1 ? 375 : 750),
          unitPrecision: 3, // 转换后的精度，即保留几位小数
          viewportUnit: 'vw', // 转换后的视窗单位
          selectorBlackList: ['.ignore', '.hairlines'], // 不进行转换的 CSS 类名
          minPixelValue: 1, // 小于等于 1px 不转换为视窗单位
          mediaQuery: false // 是否允许在媒体查询中转换
        })
      ]
    }
  },
  server: {
    host: '0.0.0.0',
    strictPort: true
    // port: 8080, // 端口号
  }
})

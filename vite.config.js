import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/spread0608/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: { // <--- server 객체 추가 또는 수정
    proxy: {
      // '/api'로 시작하는 요청을 http://localhost:8000 으로 전달
      '/api': {
        target: 'http://localhost', // <<--- 실제 PHP 서버 주소 및 포트
        changeOrigin: true, // CORS 오류 방지를 위해 필요
        // rewrite: (path) => path.replace(/^\/api/, '') // 필요에 따라 경로 재작성 (여기서는 필요 없어 보임)
      }
    }
  }
})

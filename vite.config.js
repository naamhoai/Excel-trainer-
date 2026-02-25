import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        entry: 'electron/main.js',
        vite: {
          build: {
            outDir: 'dist-electron',
            rollupOptions: {
              external: ['mysql2', 'bcrypt', 'ws', 'electron']
            }
          }
        }
      }
    ]),
    renderer()
  ],
  server: {
    port: 5173
  }
})

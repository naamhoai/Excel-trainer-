import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  define: {
    'import.meta.env.VITE_WS_PORT': JSON.stringify(process.env.WS_PORT || '8081')
  },
  plugins: [
    vue(),
    electron([
      {
        entry: 'src/main/main.js',
        vite: {
          build: {
            rollupOptions: {
              external: [
                'mysql2',
                'bcrypt',
                'ws',
                'electron',
                'mock-aws-s3',
                'aws-sdk',
                'nock'
              ]
            }
          }
        }
      },
      {
        entry: 'src/preload/preload.js',
        onstart(options) {
          options.reload()
        },
        vite: {
          build: {
            outDir: 'dist-electron',
            rollupOptions: {
              external: ['electron']
            }
          }
        }
      }
    ]),
    renderer()
  ]
})

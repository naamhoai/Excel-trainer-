import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    console.log('✅ App closed successfully')
    mainWindow = null
  })
}

app.whenReady().then(() => {
  console.log('🚀 App started successfully')
  createWindow()
})

app.on('window-all-closed', () => {
  console.log('👋 All windows closed')
  if (process.platform !== 'darwin') {
    console.log('🔚 App is quitting...')
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('before-quit', () => {
  console.log('🛑 App is shutting down...')
})

app.on('will-quit', () => {
  console.log('✅ App closed successfully')
})

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Received SIGINT, closing app gracefully...')
  app.quit()
})

process.on('SIGTERM', () => {
  console.log('\n👋 Received SIGTERM, closing app gracefully...')
  app.quit()
})

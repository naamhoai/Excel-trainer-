import { app, BrowserWindow, ipcMain, shell } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import QRCode from 'qrcode'
import http from 'http'
import { connectDB, authenticateUser, createUser, getExercises, saveUserProgress, findOrCreateGoogleUser } from './database.js'
import { startWebSocketServer } from './websocket.js'

let oauthServer = null

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

async function createWindow() {
  // Connect to database (non-blocking)
  try {
    await connectDB()
  } catch (error) {
    console.log('App will continue without database')
  }
  
  // Start WebSocket server
  try {
    const wsPort = process.env.WS_PORT || 8081
    startWebSocketServer(wsPort)
  } catch (error) {
    console.error('Failed to start WebSocket server:', error.message)
    // The app can still run without QR login functionality
  }

  const preloadPath = path.join(__dirname, 'preload.js')
  console.log('Preload path:', preloadPath)
  console.log('Preload exists:', fs.existsSync(preloadPath))
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

// IPC Handlers
ipcMain.handle('login', async (event, credentials) => {
  try {
    const user = await authenticateUser(credentials.loginKey, credentials.password)
    return { success: !!user, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('register', async (event, userData) => {
  try {
    const result = await createUser(userData.username, userData.email, userData.password, userData.fullName)
    return { success: true, result }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('get-exercises', async () => {
  try {
    const exercises = await getExercises()
    return exercises
  } catch (error) {
    return []
  }
})

ipcMain.handle('save-progress', async (event, progress) => {
  try {
    const result = await saveUserProgress(
      progress.userId,
      progress.exerciseId,
      progress.score,
      progress.completed
    )
    return { success: true, result }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('google-login', async (event, googleUser) => {
  try {
    const user = await findOrCreateGoogleUser(googleUser)
    return { success: !!user, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('generate-qr-session', async () => {
  try {
    const sessionId = 'qr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    const qrData = JSON.stringify({ sessionId, type: 'qr-login' })
    const qrCodeUrl = await QRCode.toDataURL(qrData, { width: 250, margin: 2 })
    return { success: true, sessionId, qrCodeUrl }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('google-login-desktop', async (event, clientId) => {
  return new Promise((resolve) => {
    const redirectUri = 'http://localhost:8765/callback'
    const scope = 'email profile openid'
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`

    shell.openExternal(authUrl)

    const server = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://localhost:8765')
      if (url.pathname === '/callback') {
        const code = url.searchParams.get('code')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<html><body><script>window.close()</script><h1>Login successful! You can close this window.</h1></body></html>')
        server.close()
        
        if (code) {
          resolve({ success: true, code })
        } else {
          resolve({ success: false, error: 'No code received' })
        }
      }
    }).listen(8765)

    setTimeout(() => {
      server.close()
      resolve({ success: false, error: 'Timeout' })
    }, 120000)
  })
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

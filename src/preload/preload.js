import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  register: (userData) => ipcRenderer.invoke('register', userData),
  googleLogin: (googleUser) => ipcRenderer.invoke('google-login', googleUser),
  googleLoginDesktop: (clientId) => ipcRenderer.invoke('google-login-desktop', clientId),
  generateQRSession: () => ipcRenderer.invoke('generate-qr-session'),
  getExercises: () => ipcRenderer.invoke('get-exercises'),
  saveProgress: (progress) => ipcRenderer.invoke('save-progress', progress)
})

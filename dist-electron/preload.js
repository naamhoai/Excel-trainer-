import { contextBridge as g, ipcRenderer as o } from "electron";
g.exposeInMainWorld("electronAPI", {
  login: (e) => o.invoke("login", e),
  register: (e) => o.invoke("register", e),
  googleLogin: (e) => o.invoke("google-login", e),
  googleLoginDesktop: (e) => o.invoke("google-login-desktop", e),
  generateQRSession: () => o.invoke("generate-qr-session"),
  getExercises: () => o.invoke("get-exercises"),
  saveProgress: (e) => o.invoke("save-progress", e)
});

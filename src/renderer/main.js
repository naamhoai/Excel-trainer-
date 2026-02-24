import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Dashboard from './views/Dashboard.vue'
import ExcelPractice from './views/ExcelPractice.vue'
import Admin from './views/Admin.vue'
import './style.css'

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/practice', component: ExcelPractice },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

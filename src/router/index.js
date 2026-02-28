import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/programs',
    name: 'Programs',
    component: () => import('../views/Programs.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/assignments',
    name: 'Assignments',
    component: () => import('../views/Assignments.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/practice/:taskId',
    name: 'Practice',
    component: () => import('../views/Practice.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('../views/Progress.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
    next('/')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    // Redirect admin to admin page, others to dashboard
    if (authStore.user?.role === 'admin') {
      next('/admin')
    } else {
      next('/')
    }
  } else if (to.path === '/' && authStore.user?.role === 'admin') {
    // If admin tries to access dashboard, redirect to admin page
    next('/admin')
  } else {
    next()
  }
})

export default router

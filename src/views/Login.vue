<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Hero Section -->
    <div class="hidden lg:flex lg:w-3/4 bg-gray-100 items-center justify-center p-12 relative">
      <div class="absolute top-8 left-12">
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-white transition">
          <span>Excel Tutor X Hardware Ecosystem</span>
        </button>
      </div>
      
      <div class="max-w-xl text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Next-Gen Hardware with AI</h1>
        <p class="text-gray-600 text-lg mb-12">
          Sleek, powerful, and built for the classroom — Where smart tech meets inspired teaching
        </p>
        
        <div class="relative">
          <div class="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-2xl flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">🖥️</div>
              <p class="text-gray-600 font-medium">Hardware Product</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        <button class="w-2 h-2 rounded-full bg-gray-800"></button>
        <button class="w-2 h-2 rounded-full bg-gray-300"></button>
      </div>
      
      <button class="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-50">
        <span>&lt;</span>
      </button>
      <button class="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-50">
        <span>&gt;</span>
      </button>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-full lg:w-1/4 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900">Excel Tutor</h2>
          <router-link to="/register" class="text-green-500 hover:text-green-600 font-medium">
            Sign Up
          </router-link>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Phone/Email Input with Country Code -->
          <div class="flex gap-2">
            <select v-model="form.countryCode" 
                    class="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="+84">+84</option>
              <option value="+1">+1</option>
              <option value="+86">+86</option>
            </select>
            <input v-model="form.phoneOrEmail"
                   type="text"
                   placeholder="Mobile number/email"
                   class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>

          <!-- Password Input -->
          <div class="relative">
            <input v-model="form.password"
                   :type="showPassword ? 'text' : 'password'"
                   placeholder="Enter the password"
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            <button type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <span v-if="showPassword">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>

          <!-- Login Button -->
          <button type="submit"
                  :disabled="loading"
                  class="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50">
            {{ loading ? 'Loading...' : 'Log In' }}
          </button>

          <!-- Error Message -->
          <div v-if="errorMessage" class="text-red-500 text-sm text-center">
            {{ errorMessage }}
          </div>

          <!-- Demo Credentials -->
          <div class="mt-2 text-xs text-gray-500 text-center space-y-1">
            <p class="font-semibold">Demo Accounts:</p>
            <p>Admin: admin@classin.com / admin123</p>
            <p>Teacher: teacher@classin.com / teacher123</p>
            <p>Student: student@classin.com / student123</p>
          </div>

          <!-- Auto Login & Remember Password -->
          <div class="flex justify-between items-center text-sm">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="form.autoLogin" type="checkbox" class="w-4 h-4 rounded-full border-gray-300 appearance-none border-2 checked:bg-green-500 checked:border-green-500" />
              <span class="text-gray-600">Auto Login</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="form.rememberPassword" type="checkbox" class="w-4 h-4 rounded-full border-gray-300 appearance-none border-2 checked:bg-green-500 checked:border-green-500" />
              <span class="text-gray-600">Remember Password</span>
            </label>
          </div>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <!-- QR Code Login -->
          <button type="button"
                  @click="loginWithQR"
                  class="w-full py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition font-medium flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 8h8v8H3v-8zm2 2v4h4v-4H5zm8-12v8h8V3h-8zm2 2h4v4h-4V5zm4 8h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2-2h-2v2h2v-2zm6 0h-2v2h2v-2zm0 2h-2v2h2v-2zm2-2h-2v4h2v-4zm0 4h-2v2h2v-2z"/>
            </svg>
            Log in with QR Code
          </button>

          <!-- Google Login -->
          <button type="button"
                  @click="loginWithGoogle"
                  class="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Log in with Google
          </button>
        </form>

        <!-- Forgot Password -->
        <div class="mt-8 text-center">
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700">Forgot Password</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { authService } from '../services/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  countryCode: '+84',
  phoneOrEmail: '',
  password: '',
  autoLogin: false,
  rememberPassword: false
})

const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!form.value.phoneOrEmail || !form.value.password) {
    errorMessage.value = 'Please enter all required fields'
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const response = await authService.login(
      form.value.phoneOrEmail,
      form.value.password,
      form.value.countryCode
    )
    
    authStore.setAuth(response.user, response.token)
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.response?.data?.error || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const loginWithQR = () => {
  alert('QR Code login feature coming soon')
}

const loginWithGoogle = () => {
  alert('Google login feature coming soon')
}
</script>

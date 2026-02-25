<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Hero Section -->
    <div class="hidden lg:flex lg:w-3/4 bg-gray-100 items-center justify-center p-12 relative">
      <div class="absolute top-8 left-12">
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-white transition">
          <span>Classin X Hardware Ecosystem</span>
        </button>
      </div>
      
      <div class="max-w-xl text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Next-Gen Hardware with AI</h1>
        <p class="text-gray-600 text-lg mb-12">
          Sleek, powerful, and built for the classroom — Where smart tech meets inspired teaching
        </p>
        
        <div class="relative">
          <img src="https://via.placeholder.com/600x400/e5e7eb/374151?text=Hardware+Product+Image" 
               alt="Hardware Product" 
               class="w-full rounded-lg shadow-2xl" />
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

    <!-- Right Side - Register Form -->
    <div class="w-full lg:w-1/4 flex items-center justify-center p-6 bg-white">
      <div class="w-full max-w-sm">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900">Excel Tutor</h2>
          <router-link to="/login" class="text-green-500 hover:text-green-600 font-medium text-sm">
            Log In
          </router-link>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-3">
          <!-- Phone/Email Input with Country Code -->
          <div class="flex gap-2">
            <select v-model="form.countryCode" 
                    class="w-20 px-2 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="+84">+84</option>
              <option value="+1">+1</option>
              <option value="+86">+86</option>
            </select>
            <input v-model="form.phoneOrEmail"
                   type="text"
                   placeholder="Mobile number/email"
                   class="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>

          <!-- Full Name Input -->
          <input v-model="form.fullName"
                 type="text"
                 placeholder="Full name"
                 class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />

          <!-- Password Input -->
          <div class="relative">
            <input v-model="form.password"
                   :type="showPassword ? 'text' : 'password'"
                   placeholder="Enter the password"
                   class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            <button type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <span v-if="showPassword">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>

          <!-- Confirm Password Input -->
          <div class="relative">
            <input v-model="form.confirmPassword"
                   :type="showConfirmPassword ? 'text' : 'password'"
                   placeholder="Confirm password"
                   class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            <button type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <span v-if="showConfirmPassword">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>

          <!-- Register Button -->
          <button type="submit"
                  :disabled="loading"
                  class="w-full py-2.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium disabled:opacity-50">
            {{ loading ? 'Loading...' : 'Sign Up' }}
          </button>

          <!-- Terms & Conditions -->
          <div class="text-xs text-gray-500 text-center">
            By signing up, you agree to our 
            <a href="#" class="text-green-500 hover:text-green-600">Terms of Service</a> and 
            <a href="#" class="text-green-500 hover:text-green-600">Privacy Policy</a>
          </div>

          <!-- Divider -->
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-3 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <!-- Google Sign Up -->
          <button type="button"
                  @click="signUpWithGoogle"
                  class="w-full py-2.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  countryCode: '+84',
  phoneOrEmail: '',
  fullName: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)

const handleRegister = async () => {
  if (!form.value.phoneOrEmail || !form.value.fullName || !form.value.password || !form.value.confirmPassword) {
    alert('Please enter all required fields')
    return
  }
  
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  
  loading.value = true
  
  try {
    // Mock registration
    const mockUser = {
      id: Date.now(),
      username: form.value.phoneOrEmail,
      full_name: form.value.fullName,
      role: 'user'
    }
    
    authStore.setAuth(mockUser, 'mock-token-' + Date.now())
    router.push('/')
  } catch (error) {
    alert('Registration failed')
  } finally {
    loading.value = false
  }
}

const signUpWithGoogle = () => {
  alert('Google sign up feature coming soon')
}
</script>

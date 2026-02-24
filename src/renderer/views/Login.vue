
<template>
  <div class="login-page">
    <!-- Left Side -->
    <div class="left-panel">
      <!-- Nav arrows -->
      <button class="nav-arrow nav-arrow--left" @click="prevSlide">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button class="nav-arrow nav-arrow--right" @click="nextSlide">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Content -->
      <div class="left-content">
        <h1 class="left-title">AI-enhanced Teaching</h1>
        <p class="left-subtitle">Boosting classroom efficiency and outcomes</p>
        <div class="screenshot-container">
          <img :src="slides[currentSlide].image" :alt="slides[currentSlide].alt" class="screenshot-img" />
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="bottom-bar">
        <button class="more-btn"></button>
        <div class="dots">
          <span
            v-for="(_, i) in slides"
            :key="i"
            :class="['dot', { 'dot--active': i === currentSlide }]"
            @click="currentSlide = i"
          ></span>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="right-panel">
      <div class="form-wrapper">
        <!-- Header -->
        <div class="form-header">
          <span class="brand-logo">Excel Tutor</span>
          <button class="signup-link" @click="goToRegister">Sign Up</button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- Username or Email -->
          <div class="input-group">
            <input
              v-model="loginKey"
              type="text"
              placeholder="Tên đăng nhập hoặc Email"
              class="form-input"
              :class="{ 'form-input--error': errors.loginKey }"
              autocomplete="username"
              @blur="validateLoginKey"
            />
          </div>
          <div v-if="errors.loginKey" class="error-msg">{{ errors.loginKey }}</div>

          <!-- Password -->
          <div class="input-group">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="form-input"
              :class="{ 'form-input--error': errors.password }"
              autocomplete="current-password"
              @blur="validatePassword"
            />
            <button type="button" class="icon-btn icon-btn--single" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <div v-if="errors.password" class="error-msg">{{ errors.password }}</div>

          <!-- General Error -->
          <div v-if="errorMsg" class="error-msg error-msg--general">{{ errorMsg }}</div>

          <!-- Log In Button -->
          <button type="submit" class="login-btn" :disabled="loading">
            <svg v-if="loading" class="spin-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Logging in...' : 'Log In' }}
          </button>

          <!-- Options -->
          <div class="options-row">
            <label class="option-item">
              <span class="radio-circle" :class="{ 'radio-circle--empty': true }"></span>
              <span class="option-text">Auto Login</span>
            </label>
            <label class="option-item option-item--check" @click="rememberPassword = !rememberPassword">
              <span class="check-circle" :class="{ 'check-circle--active': rememberPassword }">
                <svg v-if="rememberPassword" width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="M5 13l4 4L19 7"/>
                </svg>
              </span>
              <span class="option-text">Remember Password</span>
            </label>
          </div>

          <!-- Forget Password -->
          <div class="forget-pwd">
            <a href="#" class="forget-link">Forget Password</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'

export default {
  name: 'Login',
  data() {
    return {
      loginKey: '',
      password: '',
      autoLogin: false,
      rememberPassword: true,
      showPassword: false,
      loading: false,
      errorMsg: '',
      errors: {
        loginKey: '',
        password: ''
      },
      currentSlide: 0,
      slides: [
        {
          image: 'https://placehold.co/820x440/f0fdf4/4ade80?text=AI+Summary+%26+Teaching+Tools',
          alt: 'AI Teaching Dashboard'
        },
        {
          image: 'https://placehold.co/820x440/f0fdf4/4ade80?text=Classroom+Management',
          alt: 'Classroom Management'
        },
        {
          image: 'https://placehold.co/820x440/f0fdf4/4ade80?text=Student+Analytics',
          alt: 'Student Analytics'
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    goToRegister() {
      this.$router.push('/register')
    },
    validateLoginKey() {
      this.errors.loginKey = ''
      if (!this.loginKey) {
        this.errors.loginKey = 'Tên đăng nhập hoặc Email không được để trống'
      }
    },
    validatePassword() {
      this.errors.password = ''
      if (!this.password) {
        this.errors.password = 'Mật khẩu không được để trống'
      } else if (this.password.length < 6) {
        this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
      }
    },
    validateForm() {
      this.validateLoginKey()
      this.validatePassword()
      return !this.errors.loginKey && !this.errors.password
    },
    async handleLogin() {
      this.errorMsg = ''
      
      if (!window.electronAPI) {
        this.errorMsg = 'Lỗi: electronAPI không khả dụng. Vui lòng khởi động lại ứng dụng.'
        return
      }
      
      if (!this.validateForm()) {
        return
      }
      this.loading = true
      try {
        const result = await window.electronAPI.login({
          loginKey: this.loginKey,
          password: this.password
        })
        console.log('Login result:', result)
        if (result.success) {
          const userStore = useUserStore()
          userStore.setUser(result.user)
          this.$router.push('/dashboard')
        } else {
          this.errorMsg = result.error || 'Tên đăng nhập/Email hoặc mật khẩu không đúng'
        }
      } catch (error) {
        console.error('Login error:', error)
        this.errorMsg = 'Đăng nhập thất bại: ' + error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* ===== PAGE LAYOUT ===== */
.login-page {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f5faf7;
}

/* ===== LEFT PANEL ===== */
.left-panel {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0faf5 0%, #e8f7f0 50%, #f5fdf8 100%);
  overflow: hidden;
}

.left-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 72px;
  max-width: 780px;
  width: 100%;
}

.left-title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #10b981 0%, #06d6a0 50%, #3ecf8e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.left-subtitle {
  font-size: 18px;
  color: #555;
  margin: 0 0 36px 0;
  font-weight: 400;
}

.screenshot-container {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
}

.screenshot-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Nav arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  transition: box-shadow 0.2s, background 0.2s;
  z-index: 10;
}
.nav-arrow:hover {
  background: #f9f9f9;
  box-shadow: 0 4px 16px rgba(0,0,0,0.16);
}
.nav-arrow--left { left: 20px; }
.nav-arrow--right { right: 20px; }

/* Bottom bar */
.bottom-bar {
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 56px;
}

.more-btn {
  position: absolute;
  left: 56px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.2s;
}
.more-btn:hover { color: #333; }

.dots {
  display: flex;
  gap: 7px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c5d5cc;
  cursor: pointer;
  transition: background 0.25s, transform 0.25s;
}
.dot--active {
  background: #1a1a1a;
  transform: scale(1.2);
}

/* ===== RIGHT PANEL ===== */
.right-panel {
  width: 420px;
  min-width: 420px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -4px 0 30px rgba(0,0,0,0.07);
}

.form-wrapper {
  width: 100%;
  padding: 0 44px;
}

/* Header */
.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.brand-logo {
  font-size: 26px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.signup-link {
  background: none;
  border: none;
  cursor: pointer;
  color: #3ecf8e;
  font-size: 15px;
  font-weight: 600;
  padding: 0;
  transition: color 0.2s;
}
.signup-link:hover { color: #2bb07a; }

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Inputs */
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 13px 50px 13px 14px;
  background: #f5f5f5;
  border: 1.5px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  color: #222;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  box-sizing: border-box;
}
.form-input:focus {
  border-color: #3ecf8e;
  background: #fff;
}
.form-input--error {
  border-color: #ef4444;
  background: #fff;
}
.form-input::placeholder {
  color: #aaa;
}

.error-msg {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12.5px;
  color: #dc2626;
  margin-top: -8px;
}
.error-msg--general {
  margin-top: 0;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 16px;
  transition: opacity 0.2s;
}
.icon-btn:hover { opacity: 0.7; }

.icon-btn--single {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

/* Login Button */
.login-btn {
  width: 100%;
  padding: 13px;
  background: #3ecf8e;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(62, 207, 142, 0.35);
  margin-top: 2px;
}
.login-btn:hover {
  background: #2bbf82;
  box-shadow: 0 6px 20px rgba(62, 207, 142, 0.45);
  transform: translateY(-1px);
}
.login-btn:active { transform: translateY(0); }
.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spin-icon {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Options Row */
.options-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 2px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #555;
  user-select: none;
}

.radio-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1.5px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: white;
}

.check-circle {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 1.5px solid #ccc;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s;
}
.check-circle--active {
  background: #3ecf8e;
  border-color: #3ecf8e;
}

.option-text {
  font-size: 12.5px;
  color: #555;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 0;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}
.divider-text {
  font-size: 12px;
  color: #aaa;
  flex-shrink: 0;
}

/* Alt buttons */
.alt-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: background 0.2s, box-shadow 0.2s;
}

.alt-btn--qr {
  background: #f0fdf8;
  border: 1.5px solid #3ecf8e;
  color: #2bb07a;
}
.alt-btn--qr:hover {
  background: #e6faf2;
  box-shadow: 0 2px 10px rgba(62,207,142,0.15);
}

.alt-btn--google {
  background: #f8f8f8;
  border: 1.5px solid #e5e7eb;
  color: #444;
}
.alt-btn--google:hover {
  background: #f0f0f0;
}

/* Forget Password */
.forget-pwd {
  text-align: center;
  margin-top: 6px;
}
.forget-link {
  font-size: 13px;
  color: #aaa;
  text-decoration: none;
  transition: color 0.2s;
}
.forget-link:hover { color: #555; }

/* QR Modal */
.qr-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.qr-modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 340px;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.qr-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}
.qr-modal-close:hover {
  background: #f5f5f5;
  color: #333;
}

.qr-modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.qr-modal-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
}

.qr-code-container {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;
  display: inline-block;
  margin-bottom: 16px;
}

.qr-code-img {
  width: 200px;
  height: 200px;
  display: block;
}

.qr-loading {
  padding: 40px;
  display: flex;
  justify-content: center;
}

.qr-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
}

.qr-status--success {
  background: #f0fdf4;
  color: #16a34a;
}

.qr-refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 12px;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  transition: background 0.2s;
}
.qr-refresh-btn:hover:not(:disabled) {
  background: #eeeeee;
}
.qr-refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

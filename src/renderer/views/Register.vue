<template>
  <div class="login-page">
    <!-- Left Side -->
    <div class="left-panel">
      <button class="nav-arrow nav-arrow--left">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button class="nav-arrow nav-arrow--right">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      

      <div class="left-content">
        <h1 class="left-title">AI-enhanced Teaching</h1>
        <p class="left-subtitle">Boosting classroom efficiency and outcomes</p>
        <div class="screenshot-container">
          <img src="https://placehold.co/820x440/f0fdf4/4ade80?text=AI+Teaching+Dashboard" alt="AI Teaching Dashboard" class="screenshot-img" />
        </div>
      </div>

      <div class="bottom-bar">
        <button class="more-btn"></button>
        <div class="dots">
          <span class="dot dot--active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <div class="right-panel">
      <div class="form-wrapper">
        <!-- Header -->
        <div class="form-header">
          <span class="brand-logo">Excel Tutor</span>
          <button class="login-link" @click="goToLogin">Log In</button>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="login-form">
          <!-- Username -->
          <div class="input-group">
            <input
              v-model="username"
              type="text"
              placeholder="Tên đăng nhập"
              class="form-input"
              :class="{ 'form-input--error': errors.username }"
              autocomplete="username"
              @blur="validateUsername"
            />
          </div>
          <div v-if="errors.username" class="error-msg">{{ errors.username }}</div>

          <!-- Full Name -->
          <div class="input-group">
            <input
              v-model="fullName"
              type="text"
              placeholder="Họ và tên"
              class="form-input"
              :class="{ 'form-input--error': errors.fullName }"
              autocomplete="name"
              @blur="validateFullName"
            />
          </div>
          <div v-if="errors.fullName" class="error-msg">{{ errors.fullName }}</div>

          <!-- Email -->
          <div class="input-group">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="form-input"
              :class="{ 'form-input--error': errors.email }"
              autocomplete="email"
              @blur="validateEmail"
            />
          </div>
          <div v-if="errors.email" class="error-msg">{{ errors.email }}</div>

          <!-- Password -->
          <div class="input-group">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mật khẩu"
              class="form-input"
              :class="{ 'form-input--error': errors.password }"
              autocomplete="new-password"
              @blur="validatePassword"
            />
            <button type="button" class="icon-btn icon-btn--single" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <div v-if="errors.password" class="error-msg">{{ errors.password }}</div>

          <!-- Confirm Password -->
          <div class="input-group">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Xác nhận mật khẩu"
              class="form-input"
              :class="{ 'form-input--error': errors.confirmPassword }"
              autocomplete="new-password"
              @blur="validateConfirmPassword"
            />
            <button type="button" class="icon-btn icon-btn--single" @click="showConfirmPassword = !showConfirmPassword">
              {{ showConfirmPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <div v-if="errors.confirmPassword" class="error-msg">{{ errors.confirmPassword }}</div>

          <!-- General Error -->
          <div v-if="errorMsg" class="error-msg error-msg--general">{{ errorMsg }}</div>

          <!-- Sign Up Button -->
          <button type="submit" class="login-btn" :disabled="loading">
            <svg v-if="loading" class="spin-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity:0.25"></circle>
              <path style="opacity:0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Creating account...' : 'Sign Up' }}
          </button>

          <!-- Already have account -->
          <div class="forget-pwd">
            <span class="forget-link-text">Already have an account? </span>
            <a href="#" class="forget-link" @click.prevent="goToLogin">Log In</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      errorMsg: '',
      errors: {
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/')
    },
    validateUsername() {
      this.errors.username = ''
      if (!this.username) {
        this.errors.username = 'Tên đăng nhập không được để trống'
      } else if (this.username.length < 3) {
        this.errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự'
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.username)) {
        this.errors.username = 'Tên đăng nhập chỉ chứa chữ cái, số và dấu gạch dưới'
      }
    },
    validateFullName() {
      this.errors.fullName = ''
      if (!this.fullName) {
        this.errors.fullName = 'Họ tên không được để trống'
      } else if (this.fullName.length < 2) {
        this.errors.fullName = 'Họ tên phải có ít nhất 2 ký tự'
      }
    },
    validateEmail() {
      this.errors.email = ''
      if (!this.email) {
        this.errors.email = 'Email không được để trống'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.errors.email = 'Email không hợp lệ'
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
    validateConfirmPassword() {
      this.errors.confirmPassword = ''
      if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
      } else if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Mật khẩu không khớp'
      }
    },
    validateForm() {
      this.validateUsername()
      this.validateFullName()
      this.validateEmail()
      this.validatePassword()
      this.validateConfirmPassword()
      return !this.errors.username && !this.errors.fullName && !this.errors.email && !this.errors.password && !this.errors.confirmPassword
    },
    async handleRegister() {
      this.errorMsg = ''
      if (!this.validateForm()) {
        return
      }
      this.loading = true
      try {
        const result = await window.electronAPI.register({
          username: this.username,
          fullName: this.fullName,
          email: this.email,
          password: this.password
        })
        if (result.success) {
          alert('✅ Đăng ký thành công! Vui lòng đăng nhập.')
          this.$router.push('/')
        } else {
          this.errorMsg = result.error || 'Đăng ký thất bại'
        }
      } catch (error) {
        this.errorMsg = error.message || 'Đăng ký thất bại'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
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
.nav-arrow:hover { background: #f9f9f9; box-shadow: 0 4px 16px rgba(0,0,0,0.16); }
.nav-arrow--left { left: 20px; }
.nav-arrow--right { right: 20px; }

.bottom-bar {
  position: absolute;
  bottom: 28px;
  left: 0; right: 0;
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

.dots { display: flex; gap: 7px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #c5d5cc; cursor: pointer; transition: background 0.25s; }
.dot--active { background: #1a1a1a; }

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

.form-wrapper { width: 100%; padding: 0 44px; }

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
}

.brand-logo { font-size: 26px; font-weight: 800; color: #1a1a1a; letter-spacing: -0.5px; }

.login-link {
  background: none;
  border: none;
  cursor: pointer;
  color: #3ecf8e;
  font-size: 15px;
  font-weight: 600;
  padding: 0;
  transition: color 0.2s;
}
.login-link:hover { color: #2bb07a; }

.login-form { display: flex; flex-direction: column; gap: 13px; }

.input-group { position: relative; display: flex; align-items: center; }

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
.form-input:focus { border-color: #3ecf8e; background: #fff; }
.form-input--error { border-color: #ef4444; background: #fff; }
.form-input::placeholder { color: #aaa; }

.input-actions {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 2px;
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
.icon-btn--single { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); }

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
}
.login-btn:hover { background: #2bbf82; box-shadow: 0 6px 20px rgba(62,207,142,0.45); transform: translateY(-1px); }
.login-btn:active { transform: translateY(0); }
.login-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.spin-icon { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.divider { display: flex; align-items: center; gap: 10px; margin: 2px 0; }
.divider-line { flex: 1; height: 1px; background: #e5e7eb; }
.divider-text { font-size: 12px; color: #aaa; flex-shrink: 0; }

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
  transition: background 0.2s;
}
.alt-btn--google { background: #f8f8f8; border: 1.5px solid #e5e7eb; color: #444; }
.alt-btn--google:hover { background: #f0f0f0; }

.forget-pwd { text-align: center; margin-top: 4px; }
.forget-link-text { font-size: 13px; color: #aaa; }
.forget-link { font-size: 13px; color: #3ecf8e; text-decoration: none; font-weight: 500; transition: color 0.2s; }
.forget-link:hover { color: #2bb07a; }
</style>

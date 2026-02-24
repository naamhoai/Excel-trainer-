
<template>
  <div class="student-dashboard">
    <!-- Top Navbar -->
    <nav class="top-nav">
      <div class="nav-left">
        <span class="brand-logo">Excel Tutor</span>
        <div class="nav-links">
          <a href="#" class="active">Học tập</a>
          <a href="#">Thư viện</a>
          <a href="#">Lịch sử</a>
        </div>
      </div>
      <div class="nav-right">
        <div class="user-info">
          <div class="text-info">
            <span class="user-name">{{ user.name || 'Người dùng' }}</span>
            <span class="user-rank">Kinh nghiệm: 1,250 XP</span>
          </div>
          <div class="avatar" @click="handleLogout">
            {{ user.name ? user.name.charAt(0) : 'U' }}
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="dashboard-content">
      <!-- Welcome Header -->
      <header class="welcome-header">
        <div class="welcome-text">
          <h1>Chào mừng trở lại, {{ firstName }}! 👋</h1>
          <p>Bạn đã hoàn thành 85% mục tiêu tuần này. Tiếp tục phát huy nhé!</p>
        </div>
        <div class="welcome-stats">
          <div class="stat-item">
            <span class="stat-label">Bài tập xong</span>
            <span class="stat-value">12/15</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">Điểm trung bình</span>
            <span class="stat-value">9.2</span>
          </div>
        </div>
      </header>

      <!-- Featured Card -->
      <section class="featured-section">
        <div class="featured-card">
          <div class="featured-info">
            <span class="badge">Tiếp tục học</span>
            <h2>Hàm VLOOKUP và HLOOKUP chuyên sâu</h2>
            <p>Khám phá cách trích xuất dữ liệu mạnh mẽ từ nhiều bảng khác nhau trong Excel.</p>
            <button class="primary-btn" @click="startPractice(1)">Bắt đầu ngay</button>
          </div>
          <div class="featured-image">
            <img src="https://placehold.co/400x200/f0fdf4/4ade80?text=VLOOKUP+Mastery" alt="Featured course" />
          </div>
        </div>
      </section>

      <!-- Exercise Grid -->
      <section class="exercises-section">
        <div class="section-header">
          <h2>Bài tập dành cho bạn</h2>
          <button class="text-btn">Xem tất cả</button>
        </div>
        
        <div class="exercise-grid">
          <div v-for="ex in exercises" :key="ex.id" class="ex-card">
            <div class="ex-image">
              <img :src="ex.image || getDefaultImage(ex.title)" alt="Exercise" />
              <div class="ex-status" :class="{ completed: ex.completed }">
                {{ ex.completed ? 'Đã xong' : 'Mới' }}
              </div>
            </div>
            <div class="ex-content">
              <div class="ex-meta">
                <span class="ex-category">Cơ bản</span>
                <span class="ex-time">15 phút</span>
              </div>
              <h3>{{ ex.title }}</h3>
              <p>{{ ex.description }}</p>
              <div class="ex-footer">
                <div class="progress-bar" v-if="!ex.completed">
                  <div class="progress-fill" :style="{ width: '40%' }"></div>
                </div>
                <button class="start-btn" @click="startPractice(ex.id)">
                  {{ ex.completed ? 'Làm lại' : 'Tiếp tục' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'

export default {
  name: 'Dashboard',
  data() {
    return {
      exercises: [],
      user: {}
    }
  },
  computed: {
    firstName() {
      if (!this.user.name) return 'Bạn'
      return this.user.name.split(' ').pop()
    }
  },
  async mounted() {
    const userStore = useUserStore()
    this.user = userStore.user || {}
    
    try {
      const result = await window.electronAPI.getExercises()
      this.exercises = result.map(ex => ({
        ...ex,
        completed: Math.random() > 0.7 // Mocking data for UI demo
      }))
    } catch (e) {
      console.error('Failed to load exercises:', e)
    }
  },
  methods: {
    startPractice(id) {
      this.$router.push(`/practice?id=${id}`)
    },
    handleLogout() {
      this.$router.push('/')
    },
    getDefaultImage(title) {
      return `https://placehold.co/300x150/f0fdf4/4ade80?text=${encodeURIComponent(title)}`
    }
  }
}
</script>

<style scoped>
.student-dashboard {
  min-height: 100vh;
  background: #f5faf7;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #333;
}

/* Top Nav */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 72px;
  background: white;
  border-bottom: 1px solid #e5ece8;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 48px;
}

.brand-logo {
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #10b981 0%, #3ecf8e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links a.active {
  color: #10b981;
}

.nav-right .user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.text-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
}

.user-rank {
  font-size: 11px;
  color: #888;
  font-weight: 500;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #3ecf8e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
}

/* Page Content */
.dashboard-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Welcome Header */
.welcome-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.welcome-text h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: #1a1a1a;
}

.welcome-text p {
  color: #666;
  font-size: 16px;
  margin: 0;
}

.welcome-stats {
  display: flex;
  background: white;
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid #e5ece8;
  gap: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: #10b981;
}

.stat-divider {
  width: 1px;
  background: #eee;
}

/* Featured Card */
.featured-section {
  margin-bottom: 48px;
}

.featured-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  border: 1px solid #e5ece8;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

.featured-info {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.badge {
  background: #ecfdf5;
  color: #10b981;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
  margin-bottom: 16px;
}

.featured-info h2 {
  font-size: 26px;
  font-weight: 800;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.featured-info p {
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.6;
}

.primary-btn {
  background: #3ecf8e;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  width: fit-content;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(62, 207, 142, 0.3);
}

.primary-btn:hover {
  background: #2bbf82;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(62, 207, 142, 0.4);
}

.featured-image {
  flex: 1;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Exercise Grid */
.exercises-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 22px;
  font-weight: 800;
}

.text-btn {
  background: none;
  border: none;
  color: #3ecf8e;
  font-weight: 600;
  cursor: pointer;
}

.exercise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.ex-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e5ece8;
  transition: all 0.2s;
}

.ex-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.1);
}

.ex-image {
  height: 160px;
  position: relative;
}

.ex-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ex-status {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  background: #3ecf8e;
  color: white;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}

.ex-status.completed {
  background: #1a1a1a;
}

.ex-content {
  padding: 20px;
}

.ex-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #888;
  font-weight: 600;
}

.ex-content h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.ex-content p {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ex-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #f0faf5;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3ecf8e;
  border-radius: 10px;
}

.start-btn {
  background: #f0fdf4;
  color: #10b981;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.start-btn:hover {
  background: #10b981;
  color: white;
}
</style>

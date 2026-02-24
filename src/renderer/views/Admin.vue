
<template>
  <div class="admin-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <span class="brand-logo">Excel Tutor</span>
        <span class="admin-badge">Admin</span>
      </div>
      
      <nav class="sidebar-nav">
        <button 
          v-for="item in navItems" 
          :key="item.id"
          :class="['nav-item', { active: currentTab === item.id }]"
          @click="currentTab = item.id"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          {{ item.name }}
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="content-header">
        <h2 class="section-title">{{ currentTabName }}</h2>
        <div class="header-actions">
          <div class="search-bar">
            <svg width="18" height="18" fill="none" stroke="#999" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Tìm kiếm..." />
          </div>
          <div class="admin-profile">
            <div class="avatar">A</div>
            <span class="admin-name">Administrator</span>
          </div>
        </div>
      </header>

      <!-- Section: Overview -->
      <section v-if="currentTab === 'overview'" class="tab-content">
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Tổng số người dùng</h3>
            <p class="stat-value">1,284</p>
            <span class="stat-trend trend-up">+12% tháng này</span>
          </div>
          <div class="stat-card">
            <h3>Đang trực tuyến</h3>
            <p class="stat-value">42</p>
            <span class="stat-trend">Ổn định</span>
          </div>
          <div class="stat-card">
            <h3>Số bài thực hành</h3>
            <p class="stat-value">156</p>
            <span class="stat-trend trend-up">+5 mới</span>
          </div>
          <div class="stat-card">
            <h3>Điểm trung bình</h3>
            <p class="stat-value">8.4</p>
            <span class="stat-trend trend-up">Tăng 0.2</span>
          </div>
        </div>

        <div class="activity-section">
          <h3>Hoạt động gần đây</h3>
          <div class="activity-list">
            <div v-for="i in 5" :key="i" class="activity-item">
              <div class="activity-dot"></div>
              <div class="activity-info">
                <p><strong>Người dùng #{{ i }}</strong> đã hoàn thành bài tập Excel Nâng cao</p>
                <span>3 phút trước</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Users -->
      <section v-if="currentTab === 'users'" class="tab-content">
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Email</th>
                <th>Quyền hạn</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>
                  <div class="user-cell">
                    <div class="avatar">{{ user.name.charAt(0) }}</div>
                    <span>{{ user.name }}</span>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td><span class="role-badge" :class="user.role">{{ user.role }}</span></td>
                <td><span class="status-indicator" :class="user.status">{{ user.status }}</span></td>
                <td>
                  <button class="action-btn">Sửa</button>
                  <button class="action-btn delete">Xoá</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section: Exercises -->
      <section v-if="currentTab === 'exercises'" class="tab-content">
        <div class="grid-layout">
          <div v-for="ex in exercises" :key="ex.id" class="ex-card">
            <div class="ex-image">
              <img :src="ex.image" alt="Exercise cover" />
              <span class="ex-level">{{ ex.level }}</span>
            </div>
            <div class="ex-body">
              <h4>{{ ex.title }}</h4>
              <p>{{ ex.description }}</p>
              <div class="ex-footer">
                <span>{{ ex.students }} học viên</span>
                <button class="edit-ex-btn">Chỉnh sửa</button>
              </div>
            </div>
          </div>
          <div class="add-ex-card">
            <svg width="40" height="40" fill="none" stroke="#3ecf8e" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Thêm bài tập mới</span>
          </div>
        </div>
      </section>

      <!-- Section: Monitor -->
      <section v-if="currentTab === 'monitor'" class="tab-content">
        <div class="monitor-grid">
          <div v-for="session in activeSessions" :key="session.id" class="monitor-card">
            <div class="monitor-header">
              <div class="user-mini">
                <div class="dot green"></div>
                <span>{{ session.userName }}</span>
              </div>
              <span class="duration">{{ session.duration }}</span>
            </div>
            <div class="screen-preview">
              <div class="preview-overlay">
                <button class="view-btn">Xem màn hình</button>
              </div>
              <img src="https://placehold.co/300x200/f0fdf4/4ade80?text=Excel+Preview" alt="Screen preview" />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      currentTab: 'overview',
      navItems: [
        { id: 'overview', name: 'Tổng quan', icon: '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>' },
        { id: 'users', name: 'Người dùng', icon: '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>' },
        { id: 'exercises', name: 'Bài tập', icon: '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>' },
        { id: 'monitor', name: 'Giám sát', icon: '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' }
      ],
      users: [
        { id: 1, name: 'Nguyễn Văn A', email: 'vana@gmail.com', role: 'admin', status: 'online' },
        { id: 2, name: 'Trần Thị B', email: 'thib@gmail.com', role: 'user', status: 'offline' },
        { id: 3, name: 'Lê Văn C', email: 'vanc@gmail.com', role: 'user', status: 'online' },
        { id: 4, name: 'Phạm Minh D', email: 'minhd@gmail.com', role: 'user', status: 'away' }
      ],
      exercises: [
        { id: 1, title: 'Hàm VLOOKUP cơ bản', level: 'Dễ', description: 'Học cách sử dụng hàm tìm kiếm dọc trong Excel.', students: 450, image: 'https://placehold.co/300x150/f0fdf4/4ade80?text=VLOOKUP' },
        { id: 2, title: 'Pivot Table nâng cao', level: 'Khó', description: 'Phân tích dữ liệu lớn bằng Pivot Table.', students: 230, image: 'https://placehold.co/300x150/f0fdf4/4ade80?text=PivotTable' }
      ],
      activeSessions: [
        { id: 1, userName: 'Nguyễn Văn A', duration: '12:45' },
        { id: 2, userName: 'Lê Văn C', duration: '05:20' }
      ]
    }
  },
  computed: {
    currentTabName() {
      return this.navItems.find(item => item.id === this.currentTab).name
    }
  },
  methods: {
    handleLogout() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 100vh;
  background: #f5faf7;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: white;
  border-right: 1px solid #e5ece8;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
}

.sidebar-header {
  padding: 0 24px 32px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(135deg, #10b981 0%, #3ecf8e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-badge {
  font-size: 10px;
  font-weight: 700;
  background: #ecfdf5;
  color: #10b981;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
}

.sidebar-nav {
  flex: 1;
  padding: 0 12px;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: none;
  background: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.nav-item:hover {
  background: #f0fdf4;
  color: #10b981;
}

.nav-item.active {
  background: #3ecf8e;
  color: white;
  box-shadow: 0 4px 12px rgba(62, 207, 142, 0.3);
}

.nav-icon {
  display: flex;
  align-items: center;
}

.sidebar-footer {
  padding: 20px 12px 0;
  border-top: 1px solid #eee;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: none;
  border: none;
  border-radius: 10px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #fef2f2;
}

/* Main Content */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1.5px solid #e5ece8;
  border-radius: 10px;
  padding: 0 12px;
  width: 250px;
  transition: border-color 0.2s;
}

.search-bar:focus-within {
  border-color: #3ecf8e;
}

.search-bar input {
  border: none;
  padding: 10px 8px;
  font-size: 13px;
  outline: none;
  width: 100%;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 36px;
  height: 36px;
  background: #3ecf8e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.admin-name {
  font-size: 14px;
  font-weight: 600;
}

/* Content: Overview */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e5ece8;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin: 0 0 12px 0;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.stat-trend {
  font-size: 12px;
  color: #666;
}

.trend-up {
  color: #10b981;
  font-weight: 600;
}

.activity-section {
  background: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e5ece8;
}

.activity-section h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.activity-dot {
  width: 8px;
  height: 8px;
  background: #3ecf8e;
  border-radius: 50%;
  margin-top: 6px;
}

.activity-info p {
  margin: 0 0 4px 0;
  font-size: 14px;
}

.activity-info span {
  font-size: 12px;
  color: #888;
}

/* Content: Table */
.data-table-container {
  background: white;
  border-radius: 16px;
  border: 1px solid #e5ece8;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 16px 24px;
  background: #f9fafb;
  font-size: 13px;
  color: #666;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}

.data-table td {
  padding: 16px 24px;
  font-size: 14px;
  border-bottom: 1px solid #f9f9f9;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.role-badge.admin { background: #ecfdf5; color: #10b981; }
.role-badge.user { background: #eff6ff; color: #3b82f6; }

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.status-indicator::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-indicator.online::before { background: #10b981; }
.status-indicator.offline::before { background: #9ca3af; }
.status-indicator.away::before { background: #f59e0b; }

.action-btn {
  background: none;
  border: 1px solid #e5ece8;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f3f4f6;
}

.action-btn.delete {
  color: #dc2626;
  border-color: #fecaca;
}

.action-btn.delete:hover {
  background: #fef2f2;
}

/* Content: Exercises */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.ex-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e5ece8;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ex-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.ex-image {
  height: 140px;
  position: relative;
}

.ex-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ex-level {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.ex-body {
  padding: 16px;
}

.ex-body h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.ex-body p {
  margin: 0 0 16px 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.ex-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
}

.edit-ex-btn {
  background: #f0fdf4;
  color: #10b981;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.add-ex-card {
  border: 2px dashed #3ecf8e;
  background: #f0fdf4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 16px;
  cursor: pointer;
  min-height: 250px;
  color: #3ecf8e;
  font-weight: 600;
  transition: background 0.2s;
}

.add-ex-card:hover {
  background: #dcfce7;
}

/* Content: Monitor */
.monitor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.monitor-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e5ece8;
  padding: 16px;
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.user-mini {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.green { background: #10b981; }

.duration {
  font-size: 12px;
  color: #888;
}

.screen-preview {
  height: 160px;
  background: #000;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.screen-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 2;
}

.monitor-card:hover .preview-overlay {
  opacity: 1;
}

.view-btn {
  background: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}
</style>

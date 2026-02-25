<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-bold text-green-600">Excel Tutor</h1>
        <el-menu mode="horizontal" :default-active="activeMenu" @select="handleMenuSelect">
          <el-menu-item index="dashboard">Dashboard</el-menu-item>
          <el-menu-item index="programs">Chương trình</el-menu-item>
          <el-menu-item index="assignments">Bài tập</el-menu-item>
          <el-menu-item index="progress">Tiến độ</el-menu-item>
          <el-menu-item v-if="authStore.isAdmin" index="admin">Quản trị</el-menu-item>
        </el-menu>
      </div>
      
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-600">{{ authStore.user?.full_name }}</span>
        <el-avatar :size="36">{{ authStore.user?.avatar || 'U' }}</el-avatar>
        <el-button size="small" @click="handleLogout">Đăng xuất</el-button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto bg-gray-50 p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <el-card shadow="hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Bài tập đã giao</p>
                <p class="text-2xl font-bold text-blue-600">12</p>
              </div>
              <el-icon :size="40" color="#409EFF"><Document /></el-icon>
            </div>
          </el-card>
          
          <el-card shadow="hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Đã hoàn thành</p>
                <p class="text-2xl font-bold text-green-600">8</p>
              </div>
              <el-icon :size="40" color="#67C23A"><CircleCheck /></el-icon>
            </div>
          </el-card>
          
          <el-card shadow="hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Điểm trung bình</p>
                <p class="text-2xl font-bold text-yellow-600">85</p>
              </div>
              <el-icon :size="40" color="#E6A23C"><TrophyBase /></el-icon>
            </div>
          </el-card>
          
          <el-card shadow="hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Tiến độ</p>
                <p class="text-2xl font-bold text-purple-600">67%</p>
              </div>
              <el-icon :size="40" color="#9C27B0"><TrendCharts /></el-icon>
            </div>
          </el-card>
        </div>

        <!-- Recent Assignments -->
        <el-card>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Bài tập gần đây</h2>
              <el-button type="primary" size="small" @click="$router.push('/assignments')">
                Xem tất cả
              </el-button>
            </div>
          </template>
          
          <el-table :data="recentAssignments" stripe>
            <el-table-column prop="title" label="Tiêu đề" />
            <el-table-column prop="difficulty" label="Độ khó" width="100">
              <template #default="{ row }">
                <el-tag :type="getDifficultyType(row.difficulty)" size="small">
                  {{ getDifficultyText(row.difficulty) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="deadline" label="Hạn nộp" width="150" />
            <el-table-column prop="status" label="Trạng thái" width="120">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Thao tác" width="150">
              <template #default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  @click="startPractice(row.id)"
                >
                  {{ row.status === 'Chưa làm' ? 'Bắt đầu' : 'Tiếp tục' }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Document, CircleCheck, TrophyBase, TrendCharts } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()
const activeMenu = ref('dashboard')

const recentAssignments = ref([
  { id: 1, title: 'Tính Tổng Doanh Thu', difficulty: 'easy', deadline: '2026-03-01', status: 'Chưa làm' },
  { id: 2, title: 'Tính Trung Bình', difficulty: 'easy', deadline: '2026-03-02', status: 'Đang làm' },
  { id: 3, title: 'Sử dụng VLOOKUP', difficulty: 'medium', deadline: '2026-03-05', status: 'Hoàn thành' },
])

const handleMenuSelect = (index) => {
  if (index === 'dashboard') return
  router.push(`/${index}`)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const startPractice = (taskId) => {
  router.push(`/practice/${taskId}`)
}

const getDifficultyType = (difficulty) => {
  const types = { easy: 'success', medium: 'warning', hard: 'danger' }
  return types[difficulty] || 'info'
}

const getDifficultyText = (difficulty) => {
  const texts = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' }
  return texts[difficulty] || difficulty
}

const getStatusType = (status) => {
  if (status === 'Hoàn thành') return 'success'
  if (status === 'Đang làm') return 'warning'
  return 'info'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold text-gray-900">Quản Trị Hệ Thống</h1>
          <span class="text-sm text-gray-500">Xin chào, {{ authStore.user?.full_name }}</span>
        </div>
        <div class="flex items-center gap-3">
          <button @click="handleLogout" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Đăng xuất
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8 pb-20">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Tổng Người Dùng</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">👥</span>
            </div>
          </div>
          <p class="text-xs text-green-600 mt-4">+12% so với tháng trước</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Tổng Lớp Học</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalClasses }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">📚</span>
            </div>
          </div>
          <p class="text-xs text-green-600 mt-4">+5% so với tháng trước</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Tổng Bài Học</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalLessons }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">📝</span>
            </div>
          </div>
          <p class="text-xs text-green-600 mt-4">+8% so với tháng trước</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Phiên Đang Hoạt Động</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.activeSessions }}</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">🎯</span>
            </div>
          </div>
          <p class="text-xs text-gray-600 mt-4">Đang trực tuyến</p>
        </div>
      </div>

      <!-- Main Content Tabs -->
      <div class="bg-white rounded-lg shadow">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-6 py-4 text-sm font-medium border-b-2 transition',
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- Create Lesson Tab -->
          <div v-if="activeTab === 'create'" class="max-w-3xl">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Tạo Bài Học Mới</h2>
            
            <form @submit.prevent="handleCreateLesson" class="space-y-6">
              <!-- Lesson Title -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tiêu Đề Bài Học</label>
                <input
                  v-model="lessonForm.title"
                  type="text"
                  placeholder="Nhập tiêu đề bài học"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mô Tả</label>
                <textarea
                  v-model="lessonForm.description"
                  rows="3"
                  placeholder="Nhập mô tả bài học"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <!-- Class Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Chọn Lớp Học</label>
                <select
                  v-model="lessonForm.classId"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn lớp học</option>
                  <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }}
                  </option>
                </select>
              </div>

              <!-- Difficulty Level -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Độ Khó</label>
                <div class="flex gap-4">
                  <label v-for="level in difficultyLevels" :key="level.value" class="flex items-center">
                    <input
                      v-model="lessonForm.difficulty"
                      type="radio"
                      :value="level.value"
                      class="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">{{ level.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Content -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nội Dung Bài Học</label>
                <textarea
                  v-model="lessonForm.content"
                  rows="6"
                  placeholder="Nhập nội dung, hướng dẫn và tài liệu bài học"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <!-- Duration -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Thời Lượng (phút)</label>
                <input
                  v-model.number="lessonForm.duration"
                  type="number"
                  min="1"
                  placeholder="60"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <!-- Submit Buttons -->
              <div class="flex gap-3 pt-4">
                <button
                  type="submit"
                  class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Tạo Bài Học
                </button>
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Đặt Lại
                </button>
              </div>
            </form>
          </div>

          <!-- All Lessons Tab -->
          <div v-if="activeTab === 'lessons'">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">Danh Sách Bài Học</h2>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm bài học..."
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu Đề</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lớp Học</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Độ Khó</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời Lượng</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày Tạo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao Tác</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="lesson in filteredLessons" :key="lesson.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm text-gray-900">{{ lesson.title }}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">{{ lesson.className }}</td>
                    <td class="px-6 py-4">
                      <span :class="getDifficultyClass(lesson.difficulty)" class="px-2 py-1 text-xs rounded-full">
                        {{ getDifficultyLabel(lesson.difficulty) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">{{ lesson.duration }} phút</td>
                    <td class="px-6 py-4 text-sm text-gray-600">{{ lesson.created }}</td>
                    <td class="px-6 py-4 text-sm">
                      <button @click="editLesson(lesson)" class="text-blue-600 hover:text-blue-800 mr-3">Sửa</button>
                      <button @click="deleteLesson(lesson.id)" class="text-red-600 hover:text-red-800">Xóa</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Users Tab -->
          <div v-if="activeTab === 'users'">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Quản Lý Người Dùng</h2>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ Tên</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vai Trò</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng Thái</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao Tác</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm text-gray-900">{{ user.full_name }}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
                    <td class="px-6 py-4">
                      <span :class="getRoleClass(user.role)" class="px-2 py-1 text-xs rounded-full">
                        {{ getRoleLabel(user.role) }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <span :class="user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" 
                            class="px-2 py-1 text-xs rounded-full">
                        {{ user.is_active ? 'Hoạt động' : 'Không hoạt động' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <button class="text-blue-600 hover:text-blue-800 mr-3">Sửa</button>
                      <button class="text-red-600 hover:text-red-800">Xóa</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('create')
const searchQuery = ref('')

const tabs = [
  { id: 'create', label: 'Tạo Bài Học' },
  { id: 'lessons', label: 'Danh Sách Bài Học' },
  { id: 'users', label: 'Quản Lý Người Dùng' }
]

const stats = ref({
  totalUsers: 156,
  totalClasses: 24,
  totalLessons: 89,
  activeSessions: 12
})

const lessonForm = ref({
  title: '',
  description: '',
  classId: '',
  difficulty: 'beginner',
  content: '',
  duration: 60
})

const difficultyLevels = [
  { value: 'beginner', label: 'Cơ Bản' },
  { value: 'intermediate', label: 'Trung Bình' },
  { value: 'advanced', label: 'Nâng Cao' }
]

const classes = ref([
  { id: 1, name: 'Toán Học 101' },
  { id: 2, name: 'Vật Lý 101' },
  { id: 3, name: 'Hóa Học 101' }
])

const lessons = ref([
  { id: 1, title: 'Giới thiệu Đại Số', className: 'Toán Học 101', difficulty: 'beginner', duration: 45, created: '2026-02-20' },
  { id: 2, title: 'Phương Trình Tuyến Tính', className: 'Toán Học 101', difficulty: 'intermediate', duration: 60, created: '2026-02-21' },
  { id: 3, title: 'Hàm Bậc Hai', className: 'Toán Học 101', difficulty: 'advanced', duration: 90, created: '2026-02-22' }
])

const users = ref([
  { id: 1, full_name: 'Quản Trị Viên', email: 'admin@classin.com', role: 'admin', is_active: true },
  { id: 2, full_name: 'Giáo Viên', email: 'teacher@classin.com', role: 'teacher', is_active: true },
  { id: 3, full_name: 'Học Sinh', email: 'student@classin.com', role: 'student', is_active: true }
])

const filteredLessons = computed(() => {
  if (!searchQuery.value) return lessons.value
  return lessons.value.filter(lesson =>
    lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    lesson.className.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleCreateLesson = () => {
  const newLesson = {
    id: lessons.value.length + 1,
    title: lessonForm.value.title,
    className: classes.value.find(c => c.id === lessonForm.value.classId)?.name || '',
    difficulty: lessonForm.value.difficulty,
    duration: lessonForm.value.duration,
    created: new Date().toISOString().split('T')[0]
  }
  
  lessons.value.unshift(newLesson)
  alert('Tạo bài học thành công!')
  resetForm()
  activeTab.value = 'lessons'
}

const resetForm = () => {
  lessonForm.value = {
    title: '',
    description: '',
    classId: '',
    difficulty: 'beginner',
    content: '',
    duration: 60
  }
}

const editLesson = (lesson) => {
  alert('Chỉnh sửa bài học: ' + lesson.title)
}

const deleteLesson = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa bài học này?')) {
    lessons.value = lessons.value.filter(l => l.id !== id)
  }
}

const getDifficultyClass = (difficulty) => {
  const classes = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }
  return classes[difficulty] || 'bg-gray-100 text-gray-800'
}

const getDifficultyLabel = (difficulty) => {
  const labels = {
    beginner: 'Cơ Bản',
    intermediate: 'Trung Bình',
    advanced: 'Nâng Cao'
  }
  return labels[difficulty] || difficulty
}

const getRoleClass = (role) => {
  const classes = {
    admin: 'bg-red-100 text-red-800',
    teacher: 'bg-blue-100 text-blue-800',
    student: 'bg-green-100 text-green-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getRoleLabel = (role) => {
  const labels = {
    admin: 'Quản Trị',
    teacher: 'Giáo Viên',
    student: 'Học Sinh'
  }
  return labels[role] || role
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

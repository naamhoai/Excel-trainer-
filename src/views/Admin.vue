<template>
  <div class="min-h-screen bg-white flex">
    <!-- Sidebar -->
    <AdminSidebar
      :active-section="activeSection"
      :user-name="authStore.user?.full_name || 'Admin'"
      :is-open="sidebarOpen"
      :is-hovered="sidebarHovered"
      @navigate="handleNavigate"
      @logout="handleLogout"
      @close="sidebarOpen = false"
      @hover="(value) => sidebarHovered = value"
    />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Mobile Header with Menu Button -->
      <div class="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          @click="sidebarOpen = true"
          class="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 class="text-lg font-bold text-gray-900">{{ getSectionTitle() }}</h2>
        <div class="w-10"></div>
      </div>

      <div class="max-w-7xl mx-auto px-8 py-8">
        <!-- Greeting Header -->
        <div class="mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-100">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 mb-1">
                {{ getGreeting() }}, {{ authStore.user?.full_name || 'Admin' }}! 👋
              </h1>
              <p class="text-gray-600">{{ getCurrentDateTime() }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Hôm nay</p>
              <p class="text-2xl font-bold text-green-600">{{ stats.submissionsToday }}</p>
              <p class="text-xs text-gray-600">bài nộp mới</p>
            </div>
          </div>
        </div>

        <!-- Page Header -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">{{ getSectionTitle() }}</h2>
          <p class="text-gray-600 mt-2">{{ getSectionDescription() }}</p>
        </div>

        <!-- Overview Section -->
        <div v-if="activeSection === 'overview'">
          <!-- Statistics Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-blue-700 font-medium">Tổng Bài Tập</p>
                  <p class="text-3xl font-bold text-blue-900 mt-2">{{ stats.totalExercises }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">📝</span>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-green-700 font-medium">Nhóm Bài Tập</p>
                  <p class="text-3xl font-bold text-green-900 mt-2">{{ stats.totalGroups }}</p>
                </div>
                <div class="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">📚</span>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-purple-700 font-medium">Học Sinh</p>
                  <p class="text-3xl font-bold text-purple-900 mt-2">{{ stats.totalStudents }}</p>
                </div>
                <div class="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">👥</span>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-orange-700 font-medium">Bài Nộp Hôm Nay</p>
                  <p class="text-3xl font-bold text-orange-900 mt-2">{{ stats.submissionsToday }}</p>
                </div>
                <div class="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">✅</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions & Recent Activity -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Exercises -->
            <div class="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">📝 Bài Tập Gần Đây</h2>
              <div class="space-y-3">
                <div
                  v-for="exercise in exercises.slice(0, 5)"
                  :key="exercise.id"
                  class="bg-white border rounded-lg p-4 hover:shadow transition"
                >
                  <h3 class="font-medium text-gray-900 text-sm mb-2">{{ exercise.title }}</h3>
                  <div class="flex gap-2 text-xs">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded">{{ exercise.groupName }}</span>
                    <span :class="getDifficultyClass(exercise.difficulty)" class="px-2 py-1 rounded">
                      {{ getDifficultyLabel(exercise.difficulty) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top Students -->
            <div class="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">🏆 Học Sinh Xuất Sắc</h2>
              <div class="space-y-3">
                <div
                  v-for="(user, index) in topStudents"
                  :key="user.id"
                  class="bg-white border rounded-lg p-4 flex items-center gap-3"
                >
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900 text-sm">{{ user.full_name }}</p>
                    <p class="text-xs text-gray-600">{{ user.submissions }} bài nộp</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-green-600">{{ user.avgScore }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Create Exercise Section -->
        <div v-if="activeSection === 'create'">
          <div class="bg-gray-50 rounded-lg border border-gray-200 p-6 max-w-4xl">
            <form @submit.prevent="handleCreateExercise" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tiêu Đề Bài Tập</label>
                  <input
                    v-model="exerciseForm.title"
                    type="text"
                    placeholder="VD: Giải phương trình bậc hai"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nhóm Bài Tập</label>
                  <select
                    v-model="exerciseForm.groupId"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Chọn nhóm</option>
                    <option v-for="group in exerciseGroups" :key="group.id" :value="group.id">
                      {{ group.icon }} {{ group.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Dạng Bài Tập</label>
                  <select
                    v-model="exerciseForm.type"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Chọn dạng</option>
                    <option v-for="type in exerciseTypes" :key="type.value" :value="type.value">
                      {{ type.icon }} {{ type.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Độ Khó</label>
                  <select
                    v-model="exerciseForm.difficulty"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option v-for="level in difficultyLevels" :key="level.value" :value="level.value">
                      {{ level.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Điểm Số</label>
                  <input
                    v-model.number="exerciseForm.points"
                    type="number"
                    min="1"
                    max="100"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mô Tả / Đề Bài</label>
                <textarea
                  v-model="exerciseForm.description"
                  rows="4"
                  placeholder="Nhập đề bài chi tiết..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>

              <!-- Dynamic Content Based on Type -->
              <div v-if="exerciseForm.type === 'multiple_choice'" class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Các Đáp Án</label>
                <div v-for="(option, index) in exerciseForm.options" :key="index" class="flex gap-2">
                  <input
                    v-model="option.text"
                    type="text"
                    :placeholder="'Đáp án ' + (index + 1)"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <label class="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                    <input
                      v-model="exerciseForm.correctAnswer"
                      type="radio"
                      :value="index"
                      class="w-4 h-4 text-green-600"
                    />
                    <span class="text-sm">Đúng</span>
                  </label>
                  <button
                    type="button"
                    @click="removeOption(index)"
                    v-if="exerciseForm.options.length > 2"
                    class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
                <button
                  type="button"
                  @click="addOption"
                  class="text-sm text-green-600 hover:text-green-700"
                >
                  + Thêm đáp án
                </button>
              </div>

              <div v-if="exerciseForm.type === 'code'" class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Test Cases</label>
                <div v-for="(test, index) in exerciseForm.testCases" :key="index" class="border rounded-lg p-3 space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium">Test {{ index + 1 }}</span>
                    <button
                      type="button"
                      @click="removeTestCase(index)"
                      v-if="exerciseForm.testCases.length > 1"
                      class="text-red-600 text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                  <input
                    v-model="test.input"
                    type="text"
                    placeholder="Input"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    v-model="test.output"
                    type="text"
                    placeholder="Expected Output"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button
                  type="button"
                  @click="addTestCase"
                  class="text-sm text-green-600 hover:text-green-700"
                >
                  + Thêm test case
                </button>
              </div>

              <div class="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Tạo Bài Tập
                </button>
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Đặt Lại
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Exercises List Section -->
        <div v-if="activeSection === 'exercises'">
          <div class="mb-6 flex gap-3">
            <select
              v-model="filterGroup"
              class="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Tất cả nhóm</option>
              <option v-for="group in exerciseGroups" :key="group.id" :value="group.id">
                {{ group.name }}
              </option>
            </select>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm bài tập..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div class="space-y-3">
            <div
              v-for="exercise in filteredExercises"
              :key="exercise.id"
              class="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow transition"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 mb-2">{{ exercise.title }}</h3>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="px-2 py-1 bg-white border border-gray-300 text-gray-700 rounded">{{ exercise.groupName }}</span>
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">{{ getTypeLabel(exercise.type) }}</span>
                    <span :class="getDifficultyClass(exercise.difficulty)" class="px-2 py-1 rounded">
                      {{ getDifficultyLabel(exercise.difficulty) }}
                    </span>
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded">{{ exercise.points }} điểm</span>
                    <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded">{{ exercise.submissions }} lượt nộp</span>
                  </div>
                </div>
                <div class="flex gap-2 ml-4">
                  <button @click="editExercise(exercise)" class="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50">Sửa</button>
                  <button @click="deleteExercise(exercise.id)" class="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50">Xóa</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Groups Section -->
        <div v-if="activeSection === 'groups'">
          <div class="mb-6">
            <button
              @click="showGroupModal = true"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              + Tạo Nhóm Mới
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="group in exerciseGroups"
              :key="group.id"
              class="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow transition"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-3xl">{{ group.icon }}</span>
                  <div>
                    <h3 class="font-bold text-gray-900">{{ group.name }}</h3>
                    <p class="text-sm text-gray-600">{{ group.exerciseCount }} bài tập</p>
                  </div>
                </div>
                <span :class="getDifficultyClass(group.difficulty)" class="px-2 py-1 text-xs rounded-full">
                  {{ getDifficultyLabel(group.difficulty) }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-4">{{ group.description }}</p>
              <div class="flex gap-2 pt-4 border-t">
                <button
                  @click="editGroup(group)"
                  class="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
                >
                  Sửa
                </button>
                <button
                  @click="deleteGroup(group.id)"
                  class="flex-1 px-3 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Students Section -->
        <div v-if="activeSection === 'students'">
          <div class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="bg-white border-b">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ Tên</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bài Nộp</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Điểm TB</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng Thái</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="user in topStudents" :key="user.id" class="hover:bg-white">
                  <td class="px-6 py-4 text-sm text-gray-900">{{ user.full_name }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ user.submissions }}</td>
                  <td class="px-6 py-4 text-sm font-medium text-green-600">{{ user.avgScore }}</td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Hoạt động
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Group Modal -->
    <div v-if="showGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Tạo Nhóm Bài Tập</h3>
        <form @submit.prevent="handleCreateGroup" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tên Nhóm</label>
            <input
              v-model="groupForm.name"
              type="text"
              placeholder="VD: Đại Số"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mô Tả</label>
            <textarea
              v-model="groupForm.description"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <input
                v-model="groupForm.icon"
                type="text"
                placeholder="📐"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Độ Khó</label>
              <select
                v-model="groupForm.difficulty"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option v-for="level in difficultyLevels" :key="level.value" :value="level.value">
                  {{ level.label }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Tạo
            </button>
            <button
              type="button"
              @click="showGroupModal = false"
              class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AdminSidebar from '../components/AdminSidebar.vue'

const router = useRouter()
const authStore = useAuthStore()

const activeSection = ref('overview')
const searchQuery = ref('')
const filterGroup = ref('')
const showGroupModal = ref(false)
const sidebarOpen = ref(false)
const sidebarHovered = ref(false)

const stats = ref({
  totalExercises: 127,
  totalGroups: 12,
  totalStudents: 156,
  submissionsToday: 34
})

const exerciseForm = ref({
  title: '',
  description: '',
  groupId: '',
  type: '',
  difficulty: 'easy',
  points: 10,
  options: [{ text: '' }, { text: '' }],
  correctAnswer: null,
  testCases: [{ input: '', output: '' }]
})

const groupForm = ref({
  name: '',
  description: '',
  icon: '📐',
  difficulty: 'easy'
})

const difficultyLevels = [
  { value: 'easy', label: '⭐ Dễ' },
  { value: 'medium', label: '⭐⭐ Trung Bình' },
  { value: 'hard', label: '⭐⭐⭐ Khó' }
]

const exerciseTypes = [
  { value: 'multiple_choice', label: 'Trắc Nghiệm', icon: '☑️' },
  { value: 'essay', label: 'Tự Luận', icon: '✍️' },
  { value: 'code', label: 'Lập Trình', icon: '💻' },
  { value: 'fill_blank', label: 'Điền Khuyết', icon: '📝' },
  { value: 'matching', label: 'Nối Đáp Án', icon: '🔗' }
]

const exerciseGroups = ref([
  { id: 1, name: 'Đại Số', description: 'Các bài tập về đại số', icon: '📐', difficulty: 'medium', exerciseCount: 25 },
  { id: 2, name: 'Hình Học', description: 'Bài tập hình học', icon: '📏', difficulty: 'hard', exerciseCount: 18 },
  { id: 3, name: 'Giải Tích', description: 'Đạo hàm, tích phân', icon: '📊', difficulty: 'hard', exerciseCount: 22 },
  { id: 4, name: 'Xác Suất', description: 'Xác suất và thống kê', icon: '🎲', difficulty: 'medium', exerciseCount: 15 },
  { id: 5, name: 'Số Học', description: 'Các phép tính cơ bản', icon: '🔢', difficulty: 'easy', exerciseCount: 30 },
  { id: 6, name: 'Logic', description: 'Tư duy logic', icon: '🧠', difficulty: 'medium', exerciseCount: 17 }
])

const exercises = ref([
  { id: 1, title: 'Giải phương trình bậc hai', groupName: 'Đại Số', type: 'essay', difficulty: 'medium', points: 10, submissions: 45, created: '2026-02-20' },
  { id: 2, title: 'Tính diện tích hình tròn', groupName: 'Hình Học', type: 'multiple_choice', difficulty: 'easy', points: 5, submissions: 67, created: '2026-02-21' },
  { id: 3, title: 'Viết hàm tính giai thừa', groupName: 'Số Học', type: 'code', difficulty: 'medium', points: 15, submissions: 32, created: '2026-02-22' },
  { id: 4, title: 'Tính đạo hàm hàm số', groupName: 'Giải Tích', type: 'essay', difficulty: 'hard', points: 20, submissions: 28, created: '2026-02-23' },
  { id: 5, title: 'Xác suất tung xúc xắc', groupName: 'Xác Suất', type: 'multiple_choice', difficulty: 'easy', points: 8, submissions: 54, created: '2026-02-24' },
  { id: 6, title: 'Tính thể tích hình cầu', groupName: 'Hình Học', type: 'multiple_choice', difficulty: 'medium', points: 10, submissions: 41, created: '2026-02-25' },
  { id: 7, title: 'Giải hệ phương trình', groupName: 'Đại Số', type: 'essay', difficulty: 'hard', points: 15, submissions: 23, created: '2026-02-26' }
])

const topStudents = ref([
  { id: 2, full_name: 'Nguyễn Văn A', email: 'student1@example.com', submissions: 52, avgScore: 9.2 },
  { id: 3, full_name: 'Trần Thị B', email: 'student2@example.com', submissions: 48, avgScore: 8.9 },
  { id: 4, full_name: 'Lê Văn C', email: 'student3@example.com', submissions: 45, avgScore: 8.5 },
  { id: 5, full_name: 'Phạm Thị D', email: 'student4@example.com', submissions: 42, avgScore: 8.3 },
  { id: 6, full_name: 'Hoàng Văn E', email: 'student5@example.com', submissions: 38, avgScore: 8.0 }
])

const filteredExercises = computed(() => {
  let result = exercises.value
  
  if (filterGroup.value) {
    const groupName = exerciseGroups.value.find(g => g.id === filterGroup.value)?.name
    result = result.filter(ex => ex.groupName === groupName)
  }
  
  if (searchQuery.value) {
    result = result.filter(ex =>
      ex.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ex.groupName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return result
})

const handleNavigate = (section) => {
  activeSection.value = section
}

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Chào buổi sáng'
  if (hour < 18) return 'Chào buổi chiều'
  return 'Chào buổi tối'
}

const getCurrentDateTime = () => {
  const now = new Date()
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
  const dayName = days[now.getDay()]
  const date = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const year = now.getFullYear()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  
  return `${dayName}, ${date}/${month}/${year} - ${hours}:${minutes}`
}

const getSectionTitle = () => {
  const titles = {
    overview: 'Tổng Quan',
    create: 'Tạo Bài Tập Mới',
    exercises: 'Danh Sách Bài Tập',
    groups: 'Quản Lý Nhóm Bài Tập',
    students: 'Quản Lý Học Sinh',
    statistics: 'Thống Kê & Báo Cáo',
    settings: 'Cài Đặt Hệ Thống'
  }
  return titles[activeSection.value] || 'Admin'
}

const getSectionDescription = () => {
  const descriptions = {
    overview: 'Xem tổng quan về hệ thống và hoạt động gần đây',
    create: 'Tạo bài tập mới cho học sinh',
    exercises: 'Quản lý tất cả bài tập trong hệ thống',
    groups: 'Tổ chức bài tập theo nhóm và chủ đề',
    students: 'Theo dõi tiến độ và thành tích của học sinh',
    statistics: 'Xem báo cáo chi tiết về hoạt động học tập',
    settings: 'Cấu hình và tùy chỉnh hệ thống'
  }
  return descriptions[activeSection.value] || ''
}

const addOption = () => {
  exerciseForm.value.options.push({ text: '' })
}

const removeOption = (index) => {
  exerciseForm.value.options.splice(index, 1)
}

const addTestCase = () => {
  exerciseForm.value.testCases.push({ input: '', output: '' })
}

const removeTestCase = (index) => {
  exerciseForm.value.testCases.splice(index, 1)
}

const handleCreateExercise = () => {
  const groupName = exerciseGroups.value.find(g => g.id === exerciseForm.value.groupId)?.name || ''
  
  const newExercise = {
    id: exercises.value.length + 1,
    title: exerciseForm.value.title,
    groupName: groupName,
    type: exerciseForm.value.type,
    difficulty: exerciseForm.value.difficulty,
    points: exerciseForm.value.points,
    submissions: 0,
    created: new Date().toISOString().split('T')[0]
  }
  
  exercises.value.unshift(newExercise)
  
  const group = exerciseGroups.value.find(g => g.id === exerciseForm.value.groupId)
  if (group) {
    group.exerciseCount++
  }
  
  alert('✅ Tạo bài tập thành công!')
  resetForm()
  activeSection.value = 'exercises'
}

const handleCreateGroup = () => {
  const newGroup = {
    id: exerciseGroups.value.length + 1,
    name: groupForm.value.name,
    description: groupForm.value.description,
    icon: groupForm.value.icon,
    difficulty: groupForm.value.difficulty,
    exerciseCount: 0
  }
  
  exerciseGroups.value.push(newGroup)
  alert('✅ Tạo nhóm bài tập thành công!')
  showGroupModal.value = false
  groupForm.value = {
    name: '',
    description: '',
    icon: '📐',
    difficulty: 'easy'
  }
}

const resetForm = () => {
  exerciseForm.value = {
    title: '',
    description: '',
    groupId: '',
    type: '',
    difficulty: 'easy',
    points: 10,
    options: [{ text: '' }, { text: '' }],
    correctAnswer: null,
    testCases: [{ input: '', output: '' }]
  }
}

const editGroup = (group) => {
  alert('Chỉnh sửa nhóm: ' + group.name)
}

const deleteGroup = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa nhóm này?')) {
    exerciseGroups.value = exerciseGroups.value.filter(g => g.id !== id)
  }
}

const editExercise = (exercise) => {
  alert('Chỉnh sửa bài tập: ' + exercise.title)
}

const deleteExercise = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa bài tập này?')) {
    exercises.value = exercises.value.filter(e => e.id !== id)
  }
}

const getDifficultyClass = (difficulty) => {
  const classes = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }
  return classes[difficulty] || 'bg-gray-100 text-gray-800'
}

const getDifficultyLabel = (difficulty) => {
  const labels = {
    easy: '⭐ Dễ',
    medium: '⭐⭐ TB',
    hard: '⭐⭐⭐ Khó'
  }
  return labels[difficulty] || difficulty
}

const getTypeLabel = (type) => {
  const labels = {
    multiple_choice: 'Trắc Nghiệm',
    essay: 'Tự Luận',
    code: 'Lập Trình',
    fill_blank: 'Điền Khuyết',
    matching: 'Nối Đáp Án'
  }
  return labels[type] || type
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

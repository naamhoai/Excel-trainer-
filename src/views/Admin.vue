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

      <!-- Desktop Header with Notifications -->
      <div class="hidden lg:block sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-4">
        <div class="flex items-center justify-end gap-4">
          <!-- Notification Bell -->
          <div class="relative">
            <button
              @click="showNotifications = !showNotifications"
              class="relative p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <span class="text-2xl">🔔</span>
              <span
                v-if="notifications.filter(n => !n.read).length > 0"
                class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
              >
                {{ notifications.filter(n => !n.read).length }}
              </span>
            </button>

            <!-- Notifications Dropdown -->
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div class="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 class="font-bold text-gray-900">Thông Báo</h3>
                <button
                  @click="markAllAsRead"
                  class="text-xs text-blue-600 hover:text-blue-800"
                >
                  Đánh dấu đã đọc
                </button>
              </div>
              
              <div v-if="notifications.length === 0" class="p-8 text-center text-gray-500">
                <span class="text-4xl mb-2 block">📭</span>
                <p>Không có thông báo mới</p>
              </div>

              <div v-else>
                <div class="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                  <div
                    v-for="notification in paginatedNotifications"
                    :key="notification.id"
                    @click="handleNotificationClick(notification)"
                    :class="[
                      'p-4 hover:bg-gray-50 cursor-pointer transition',
                      !notification.read ? 'bg-blue-50' : ''
                    ]"
                  >
                    <div class="flex items-start gap-3">
                      <span class="text-2xl flex-shrink-0">{{ notification.icon }}</span>
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 text-sm">{{ notification.title }}</p>
                        <p class="text-xs text-gray-600 mt-1">{{ notification.message }}</p>
                        <p class="text-xs text-gray-500 mt-2">{{ notification.time }}</p>
                      </div>
                      <span
                        v-if="!notification.read"
                        class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"
                      ></span>
                    </div>
                  </div>
                </div>

                <!-- Pagination -->
                <div v-if="totalNotificationPages > 1" class="p-3 border-t border-gray-200 flex items-center justify-between">
                  <button
                    @click="notificationPage = Math.max(1, notificationPage - 1)"
                    :disabled="notificationPage === 1"
                    :class="[
                      'px-3 py-1 text-sm rounded',
                      notificationPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'
                    ]"
                  >
                    ← Trước
                  </button>
                  <span class="text-sm text-gray-600">
                    {{ notificationPage }} / {{ totalNotificationPages }}
                  </span>
                  <button
                    @click="notificationPage = Math.min(totalNotificationPages, notificationPage + 1)"
                    :disabled="notificationPage === totalNotificationPages"
                    :class="[
                      'px-3 py-1 text-sm rounded',
                      notificationPage === totalNotificationPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'
                    ]"
                  >
                    Sau →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

        <!-- Settings Section -->
        <div v-if="activeSection === 'settings'">
          <div class="space-y-4">
            <!-- Create New Account -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <button
                @click="toggleSettingsPanel('account')"
                class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">👤</span>
                  <div class="text-left">
                    <h3 class="text-lg font-bold text-gray-900">Tạo Tài Khoản Mới</h3>
                    <p class="text-sm text-gray-600">Thêm người dùng mới vào hệ thống</p>
                  </div>
                </div>
                <span class="text-2xl transition-transform" :class="openSettingsPanel === 'account' ? 'rotate-180' : ''">
                  ▼
                </span>
              </button>
              
              <div v-if="openSettingsPanel === 'account'" class="p-6 bg-white border-t border-gray-200">
                <form @submit.prevent="handleCreateAccount" class="space-y-4 max-w-2xl">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <input
                        v-model="accountForm.fullName"
                        type="text"
                        placeholder="Nhập họ và tên"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        v-model="accountForm.email"
                        type="email"
                        placeholder="email@example.com"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                      <select
                        v-model="accountForm.role"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="student">Học Sinh</option>
                        <option value="teacher">Giáo Viên</option>
                        <option value="admin">Quản Trị Viên</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                      <input
                        v-model="accountForm.password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Tạo Tài Khoản
                  </button>
                </form>
              </div>
            </div>

            <!-- System Settings -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <button
                @click="toggleSettingsPanel('system')"
                class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">⚙️</span>
                  <div class="text-left">
                    <h3 class="text-lg font-bold text-gray-900">Cài Đặt Hệ Thống</h3>
                    <p class="text-sm text-gray-600">Cấu hình chung của hệ thống</p>
                  </div>
                </div>
                <span class="text-2xl transition-transform" :class="openSettingsPanel === 'system' ? 'rotate-180' : ''">
                  ▼
                </span>
              </button>
              
              <div v-if="openSettingsPanel === 'system'" class="p-6 bg-white border-t border-gray-200">
                <div class="space-y-4 max-w-2xl">
                  <div class="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p class="font-medium text-gray-900">Cho phép đăng ký</p>
                      <p class="text-sm text-gray-600">Học sinh có thể tự đăng ký tài khoản</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="systemSettings.allowRegistration"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p class="font-medium text-gray-900">Thông báo email</p>
                      <p class="text-sm text-gray-600">Gửi email khi có bài nộp mới</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="systemSettings.emailNotifications"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p class="font-medium text-gray-900">Chế độ bảo trì</p>
                      <p class="text-sm text-gray-600">Tạm khóa truy cập hệ thống</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="systemSettings.maintenanceMode"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>

                  <div class="pt-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Thời gian làm bài mặc định (phút)</label>
                    <input
                      v-model.number="systemSettings.defaultExerciseTime"
                      type="number"
                      min="5"
                      max="180"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <button
                    @click="saveSystemSettings"
                    class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Lưu Cài Đặt
                  </button>
                </div>
              </div>
            </div>

            <!-- Backup & Data -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <button
                @click="toggleSettingsPanel('backup')"
                class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">💾</span>
                  <div class="text-left">
                    <h3 class="text-lg font-bold text-gray-900">Sao Lưu & Dữ Liệu</h3>
                    <p class="text-sm text-gray-600">Quản lý backup và dữ liệu hệ thống</p>
                  </div>
                </div>
                <span class="text-2xl transition-transform" :class="openSettingsPanel === 'backup' ? 'rotate-180' : ''">
                  ▼
                </span>
              </button>
              
              <div v-if="openSettingsPanel === 'backup'" class="p-6 bg-white border-t border-gray-200">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                  <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p class="text-sm font-medium text-gray-900 mb-2">Sao lưu dữ liệu</p>
                    <p class="text-xs text-gray-600 mb-3">Tạo bản sao lưu toàn bộ dữ liệu hệ thống</p>
                    <button
                      @click="handleBackup"
                      class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                    >
                      📥 Tạo Bản Sao Lưu
                    </button>
                  </div>

                  <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p class="text-sm font-medium text-gray-900 mb-2">Khôi phục dữ liệu</p>
                    <p class="text-xs text-gray-600 mb-3">Khôi phục từ file sao lưu</p>
                    <button
                      @click="handleRestore"
                      class="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm"
                    >
                      📤 Khôi Phục
                    </button>
                  </div>

                  <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-sm font-medium text-red-900 mb-2">⚠️ Xóa toàn bộ dữ liệu</p>
                    <p class="text-xs text-red-600 mb-3">Hành động này không thể hoàn tác</p>
                    <button
                      @click="handleClearData"
                      class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                    >
                      🗑️ Xóa Dữ Liệu
                    </button>
                  </div>

                  <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p class="text-sm font-medium text-blue-900 mb-1">Phiên bản hệ thống</p>
                    <p class="text-xs text-blue-600 mb-2">v1.0.0 - Build 2026.02.27</p>
                    <p class="text-xs text-gray-600">Cập nhật lần cuối: 27/02/2026</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Appearance Settings -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <button
                @click="toggleSettingsPanel('appearance')"
                class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🎨</span>
                  <div class="text-left">
                    <h3 class="text-lg font-bold text-gray-900">Giao Diện</h3>
                    <p class="text-sm text-gray-600">Tùy chỉnh giao diện hệ thống</p>
                  </div>
                </div>
                <span class="text-2xl transition-transform" :class="openSettingsPanel === 'appearance' ? 'rotate-180' : ''">
                  ▼
                </span>
              </button>
              
              <div v-if="openSettingsPanel === 'appearance'" class="p-6 bg-white border-t border-gray-200">
                <div class="space-y-4 max-w-2xl">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Chế độ hiển thị</label>
                    <select class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option>Sáng</option>
                      <option>Tối</option>
                      <option>Tự động</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Màu chủ đạo</label>
                    <div class="flex gap-3">
                      <button class="w-12 h-12 rounded-lg bg-green-500 border-2 border-green-700"></button>
                      <button class="w-12 h-12 rounded-lg bg-blue-500 border-2 border-transparent"></button>
                      <button class="w-12 h-12 rounded-lg bg-purple-500 border-2 border-transparent"></button>
                      <button class="w-12 h-12 rounded-lg bg-orange-500 border-2 border-transparent"></button>
                    </div>
                  </div>
                  <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Lưu Thay Đổi
                  </button>
                </div>
              </div>
            </div>

            <!-- Notification Management -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <button
                @click="toggleSettingsPanel('notifications')"
                class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🔔</span>
                  <div class="text-left">
                    <h3 class="text-lg font-bold text-gray-900">Quản Lý Thông Báo</h3>
                    <p class="text-sm text-gray-600">Xem và quản lý tất cả thông báo</p>
                  </div>
                </div>
                <span class="text-2xl transition-transform" :class="openSettingsPanel === 'notifications' ? 'rotate-180' : ''">
                  ▼
                </span>
              </button>
              
              <div v-if="openSettingsPanel === 'notifications'" class="p-6 bg-white border-t border-gray-200">
                <!-- Search and Actions -->
                <div class="flex items-center gap-3 mb-4">
                  <input
                    v-model="notificationSearchQuery"
                    type="text"
                    placeholder="Tìm kiếm thông báo..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    @click="deleteAllNotifications"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm whitespace-nowrap"
                  >
                    🗑️ Xóa Tất Cả
                  </button>
                </div>

                <!-- Notifications Table -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu Đề</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nội Dung</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời Gian</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng Thái</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="notification in paginatedNotificationsForManagement" :key="notification.id" class="hover:bg-gray-50">
                        <td class="px-4 py-3">
                          <span class="text-2xl">{{ notification.icon }}</span>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ notification.title }}</td>
                        <td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{{ notification.message }}</td>
                        <td class="px-4 py-3 text-xs text-gray-500">{{ notification.time }}</td>
                        <td class="px-4 py-3">
                          <span :class="notification.read ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'" class="px-2 py-1 text-xs rounded-full">
                            {{ notification.read ? 'Đã đọc' : 'Chưa đọc' }}
                          </span>
                        </td>
                        <td class="px-4 py-3">
                          <button
                            @click="deleteNotification(notification.id)"
                            class="text-red-600 hover:text-red-800 text-sm"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Pagination -->
                <div v-if="totalNotificationManagementPages > 1" class="mt-4 flex items-center justify-between">
                  <div class="text-sm text-gray-600">
                    Hiển thị {{ ((notificationManagementPage - 1) * 10) + 1 }} - {{ Math.min(notificationManagementPage * 10, filteredNotificationsForManagement.length) }} 
                    trong tổng số {{ filteredNotificationsForManagement.length }} thông báo
                  </div>
                  <div class="flex gap-2">
                    <button
                      @click="notificationManagementPage = Math.max(1, notificationManagementPage - 1)"
                      :disabled="notificationManagementPage === 1"
                      :class="[
                        'px-4 py-2 text-sm rounded-lg border',
                        notificationManagementPage === 1 
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      ]"
                    >
                      ← Trước
                    </button>
                    <div class="flex items-center gap-1">
                      <button
                        v-for="page in totalNotificationManagementPages"
                        :key="page"
                        @click="notificationManagementPage = page"
                        :class="[
                          'px-3 py-2 text-sm rounded-lg',
                          notificationManagementPage === page
                            ? 'bg-green-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        ]"
                      >
                        {{ page }}
                      </button>
                    </div>
                    <button
                      @click="notificationManagementPage = Math.min(totalNotificationManagementPages, notificationManagementPage + 1)"
                      :disabled="notificationManagementPage === totalNotificationManagementPages"
                      :class="[
                        'px-4 py-2 text-sm rounded-lg border',
                        notificationManagementPage === totalNotificationManagementPages
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      ]"
                    >
                      Sau →
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

    <!-- Password Reset Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">🔒 {{ passwordModalData.type === 'change' ? 'Đổi Mật Khẩu' : 'Reset Mật Khẩu' }}</h3>
          <button
            @click="showPasswordModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div v-if="passwordModalData.type === 'reset'" class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-sm text-blue-900">
            <strong>Người yêu cầu:</strong> {{ passwordModalData.userName }}
          </p>
          <p class="text-sm text-blue-900">
            <strong>Email:</strong> {{ passwordModalData.userEmail }}
          </p>
          <p class="text-xs text-blue-600 mt-2">{{ passwordModalData.reason }}</p>
        </div>

        <form @submit.prevent="handlePasswordAction" class="space-y-4">
          <div v-if="passwordModalData.type === 'change'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              placeholder="Nhập mật khẩu hiện tại"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="Nhập mật khẩu mới"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {{ passwordModalData.type === 'change' ? 'Đổi Mật Khẩu' : 'Reset Mật Khẩu' }}
            </button>
            <button
              type="button"
              @click="showPasswordModal = false"
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
const showNotifications = ref(false)
const showPasswordModal = ref(false)
const openSettingsPanel = ref(null)
const notificationPage = ref(1)
const notificationSearchQuery = ref('')
const notificationsPerPage = 5
const notificationManagementPage = ref(1)

const passwordModalData = ref({
  type: 'change', // 'change' or 'reset'
  userId: null,
  userName: '',
  userEmail: '',
  reason: ''
})

const notifications = ref([
  {
    id: 1,
    type: 'password_reset',
    icon: '🔑',
    title: 'Yêu cầu reset mật khẩu',
    message: 'Nguyễn Văn A yêu cầu reset mật khẩu',
    time: '5 phút trước',
    read: false,
    data: {
      userId: 2,
      userName: 'Nguyễn Văn A',
      userEmail: 'student1@example.com',
      reason: 'Quên mật khẩu, không thể đăng nhập'
    }
  },
  {
    id: 2,
    type: 'feedback',
    icon: '💬',
    title: 'Ý kiến mới',
    message: 'Trần Thị B gửi ý kiến về bài tập',
    time: '15 phút trước',
    read: false,
    data: {
      message: 'Bài tập Đại Số quá khó, cần thêm hướng dẫn chi tiết'
    }
  },
  {
    id: 3,
    type: 'submission',
    icon: '📝',
    title: 'Bài nộp mới',
    message: '5 bài nộp mới cần chấm điểm',
    time: '30 phút trước',
    read: true,
    data: {}
  },
  {
    id: 4,
    type: 'password_reset',
    icon: '🔑',
    title: 'Yêu cầu reset mật khẩu',
    message: 'Lê Văn C yêu cầu reset mật khẩu',
    time: '1 giờ trước',
    read: false,
    data: {
      userId: 4,
      userName: 'Lê Văn C',
      userEmail: 'student3@example.com',
      reason: 'Tài khoản bị khóa'
    }
  },
  {
    id: 5,
    type: 'feedback',
    icon: '💬',
    title: 'Ý kiến mới',
    message: 'Phạm Thị D gửi góp ý về giao diện',
    time: '2 giờ trước',
    read: true,
    data: {
      message: 'Giao diện đẹp nhưng cần thêm chế độ tối'
    }
  },
  {
    id: 6,
    type: 'submission',
    icon: '📝',
    title: 'Bài nộp mới',
    message: '3 bài nộp mới từ lớp Toán 101',
    time: '3 giờ trước',
    read: true,
    data: {}
  },
  {
    id: 7,
    type: 'feedback',
    icon: '💬',
    title: 'Ý kiến mới',
    message: 'Hoàng Văn E báo lỗi hệ thống',
    time: '4 giờ trước',
    read: false,
    data: {
      message: 'Không thể nộp bài, hệ thống báo lỗi 500'
    }
  },
  {
    id: 8,
    type: 'password_reset',
    icon: '🔑',
    title: 'Yêu cầu reset mật khẩu',
    message: 'Nguyễn Thị F yêu cầu reset mật khẩu',
    time: '5 giờ trước',
    read: true,
    data: {
      userId: 7,
      userName: 'Nguyễn Thị F',
      userEmail: 'student6@example.com',
      reason: 'Đổi email mới'
    }
  },
  {
    id: 9,
    type: 'submission',
    icon: '📝',
    title: 'Bài nộp mới',
    message: '8 bài nộp mới cần chấm',
    time: '6 giờ trước',
    read: true,
    data: {}
  },
  {
    id: 10,
    type: 'feedback',
    icon: '💬',
    title: 'Ý kiến mới',
    message: 'Trần Văn G đề xuất tính năng mới',
    time: '1 ngày trước',
    read: true,
    data: {
      message: 'Nên có chức năng chat trực tiếp với giáo viên'
    }
  }
])

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

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const accountForm = ref({
  fullName: '',
  email: '',
  role: 'student',
  password: ''
})

const systemSettings = ref({
  allowRegistration: true,
  emailNotifications: true,
  maintenanceMode: false,
  defaultExerciseTime: 60
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

const handlePasswordAction = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('❌ Mật khẩu xác nhận không khớp!')
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    alert('❌ Mật khẩu phải có ít nhất 6 ký tự!')
    return
  }
  
  if (passwordModalData.value.type === 'reset') {
    alert(`✅ Đã reset mật khẩu cho ${passwordModalData.value.userName}!`)
    // Remove notification after handling
    notifications.value = notifications.value.filter(n => n.data.userId !== passwordModalData.value.userId)
  } else {
    alert('✅ Đổi mật khẩu thành công!')
  }
  
  showPasswordModal.value = false
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

const handleNotificationClick = (notification) => {
  notification.read = true
  
  if (notification.type === 'password_reset') {
    passwordModalData.value = {
      type: 'reset',
      userId: notification.data.userId,
      userName: notification.data.userName,
      userEmail: notification.data.userEmail,
      reason: notification.data.reason
    }
    showPasswordModal.value = true
    showNotifications.value = false
  } else if (notification.type === 'feedback') {
    alert(`💬 Ý kiến: ${notification.data.message}`)
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const toggleSettingsPanel = (panel) => {
  openSettingsPanel.value = openSettingsPanel.value === panel ? null : panel
}

const paginatedNotifications = computed(() => {
  const start = (notificationPage.value - 1) * notificationsPerPage
  const end = start + notificationsPerPage
  return notifications.value.slice(start, end)
})

const totalNotificationPages = computed(() => {
  return Math.ceil(notifications.value.length / notificationsPerPage)
})

const filteredNotificationsForManagement = computed(() => {
  let filtered = notifications.value
  
  if (notificationSearchQuery.value) {
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(notificationSearchQuery.value.toLowerCase()) ||
      n.message.toLowerCase().includes(notificationSearchQuery.value.toLowerCase())
    )
  }
  
  return filtered
})

const paginatedNotificationsForManagement = computed(() => {
  const start = (notificationManagementPage.value - 1) * 10
  const end = start + 10
  return filteredNotificationsForManagement.value.slice(start, end)
})

const totalNotificationManagementPages = computed(() => {
  return Math.ceil(filteredNotificationsForManagement.value.length / 10)
})

const deleteNotification = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
    notifications.value = notifications.value.filter(n => n.id !== id)
    alert('✅ Đã xóa thông báo!')
  }
}

const deleteAllNotifications = () => {
  if (confirm('⚠️ Bạn có chắc chắn muốn xóa TẤT CẢ thông báo?')) {
    notifications.value = []
    alert('✅ Đã xóa tất cả thông báo!')
  }
}

const handleCreateAccount = () => {
  if (accountForm.value.password.length < 6) {
    alert('❌ Mật khẩu phải có ít nhất 6 ký tự!')
    return
  }
  
  // TODO: Call API to create account
  alert(`✅ Tạo tài khoản thành công cho ${accountForm.value.fullName}!`)
  accountForm.value = {
    fullName: '',
    email: '',
    role: 'student',
    password: ''
  }
}

const saveSystemSettings = () => {
  // TODO: Save to backend
  alert('✅ Lưu cài đặt hệ thống thành công!')
}

const handleBackup = () => {
  if (confirm('Bạn có chắc chắn muốn tạo bản sao lưu?')) {
    // TODO: Implement backup logic
    alert('✅ Đang tạo bản sao lưu... File sẽ được tải xuống sau ít phút.')
  }
}

const handleRestore = () => {
  if (confirm('⚠️ Khôi phục dữ liệu sẽ ghi đè lên dữ liệu hiện tại. Bạn có chắc chắn?')) {
    // TODO: Implement restore logic
    alert('📤 Vui lòng chọn file sao lưu để khôi phục.')
  }
}

const handleClearData = () => {
  const confirmation = prompt('⚠️ CẢNH BÁO: Hành động này sẽ xóa TOÀN BỘ dữ liệu!\nNhập "XOA TAT CA" để xác nhận:')
  if (confirmation === 'XOA TAT CA') {
    // TODO: Implement clear data logic
    alert('🗑️ Đã xóa toàn bộ dữ liệu!')
  } else {
    alert('❌ Hủy thao tác xóa dữ liệu.')
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

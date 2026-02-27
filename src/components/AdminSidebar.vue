<template>
  <!-- Overlay for mobile -->
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
  ></div>

  <!-- Sidebar -->
  <aside
    @mouseenter="$emit('hover', true)"
    @mouseleave="$emit('hover', false)"
    :class="[
      'fixed lg:sticky top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      isHovered ? 'w-64' : 'w-20'
    ]"
  >
    <!-- Logo/Header -->
    <div class="p-6 border-b border-gray-200 flex items-center justify-center">
      <div v-if="isHovered">
        <h2 class="text-xl font-bold text-gray-900">🎓 ClassIn</h2>
        <p class="text-sm text-gray-600 mt-1">Quản trị</p>
      </div>
      <div v-else>
        <span class="text-2xl">🎓</span>
      </div>
      
      <!-- Close Button (Mobile) -->
      <button
        @click="$emit('close')"
        class="lg:hidden absolute right-4 top-6 p-2 hover:bg-gray-100 rounded-lg transition"
      >
        ✕
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <a
        v-for="item in menuItems"
        :key="item.id"
        href="#"
        @click.prevent="handleNavigate(item.id)"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
          activeSection === item.id
            ? 'bg-green-50 text-green-700 font-medium'
            : 'text-gray-700 hover:bg-gray-50',
          !isHovered ? 'justify-center' : ''
        ]"
        :title="!isHovered ? item.label : ''"
      >
        <span class="text-xl flex-shrink-0">{{ item.icon }}</span>
        <span v-if="isHovered" class="whitespace-nowrap">{{ item.label }}</span>
      </a>
    </nav>

    <!-- User Info -->
    <div class="p-4 border-t border-gray-200">
      <div v-if="isHovered">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
            {{ userInitial }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ userName }}</p>
            <p class="text-xs text-gray-600">Quản trị viên</p>
          </div>
        </div>
        <button
          @click="$emit('logout')"
          class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
        >
          Đăng xuất
        </button>
      </div>
      
      <div v-else class="flex flex-col items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
          {{ userInitial }}
        </div>
        <button
          @click="$emit('logout')"
          class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          title="Đăng xuất"
        >
          🚪
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  activeSection: {
    type: String,
    default: 'overview'
  },
  userName: {
    type: String,
    default: 'Admin'
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  isHovered: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['navigate', 'logout', 'close', 'hover'])

const handleNavigate = (section) => {
  emit('navigate', section)
  emit('close') // Close sidebar on mobile after navigation
}

const menuItems = [
  { id: 'overview', label: 'Tổng Quan', icon: '📊' },
  { id: 'create', label: 'Tạo Bài Tập', icon: '➕' },
  { id: 'exercises', label: 'Danh Sách Bài Tập', icon: '📝' },
  { id: 'groups', label: 'Nhóm Bài Tập', icon: '📚' },
  { id: 'students', label: 'Học Sinh', icon: '👥' },
  { id: 'statistics', label: 'Thống Kê', icon: '📈' },
  { id: 'settings', label: 'Cài Đặt', icon: '⚙️' }
]

const userInitial = computed(() => {
  return props.userName.charAt(0).toUpperCase()
})
</script>

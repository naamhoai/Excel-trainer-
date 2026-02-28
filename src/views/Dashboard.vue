<template>
  <div class="h-screen flex bg-[#f5f6f8] text-[#333] font-sans overflow-hidden">
    
    <!-- Left Sidebar -->
    <aside 
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      :class="[
        'flex-shrink-0 bg-[#f5f6f8] flex flex-col justify-between py-6 transition-all duration-300 ease-in-out z-50',
        isHovered ? 'w-64 px-4' : 'w-20 px-2'
      ]"
    >
      <!-- Logo -->
      <div class="mb-8 font-black text-2xl tracking-tight text-gray-900 flex justify-center items-center h-8">
        <span class="text-blue-600 block text-center" v-if="!isHovered">C</span>
        <span v-else>Class<span class="text-blue-600">in</span></span>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 space-y-1 overflow-x-hidden">
        <a href="#" :class="[
          'flex items-center gap-3 py-2.5 bg-gray-200/60 rounded-xl text-sm font-medium text-gray-900 transition-colors',
          isHovered ? 'px-3' : 'justify-center'
        ]">
          <el-icon :size="18" class="flex-shrink-0"><HomeFilled /></el-icon> 
          <span :class="['whitespace-nowrap transition-all duration-300 ease-in-out', isHovered ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">Home</span>
        </a>
        <a href="#" :class="[
          'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 transition-colors',
          isHovered ? 'px-3' : 'justify-center'
        ]">
          <el-icon :size="18" class="flex-shrink-0"><ChatDotRound /></el-icon> 
          <span :class="['whitespace-nowrap transition-all duration-300 ease-in-out', isHovered ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">Chat</span>
        </a>
        <a href="#" :class="[
          'flex items-center py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 transition-colors',
          isHovered ? 'px-3 justify-between' : 'justify-center relative'
        ]">
          <div class="flex items-center gap-3">
            <el-icon :size="18" class="flex-shrink-0"><List /></el-icon> 
            <span :class="['whitespace-nowrap transition-all duration-300 ease-in-out', isHovered ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">To Do</span>
          </div>
          <span 
            v-if="isHovered" 
            class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          >12</span>
          <span 
            v-else
            class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
          ></span>
        </a>
        <a href="#" :class="[
          'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 transition-colors',
          isHovered ? 'px-3' : 'justify-center'
        ]">
          <el-icon :size="18" class="flex-shrink-0"><Calendar /></el-icon> 
          <span :class="['whitespace-nowrap transition-all duration-300 ease-in-out', isHovered ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">Calendar</span>
        </a>
        <a href="#" :class="[
          'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 transition-colors',
          isHovered ? 'px-3' : 'justify-center'
        ]">
          <el-icon :size="18" class="flex-shrink-0"><Folder /></el-icon> 
          <span :class="['whitespace-nowrap transition-all duration-300 ease-in-out', isHovered ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">Drive</span>
        </a>
        <a href="#" :class="[
          'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 transition-colors',
          isHovered ? 'px-3' : 'justify-center'
        ]">
          <el-icon :size="18" class="flex-shrink-0"><DataBoard /></el-icon> 
          <span :class="['whitespace-nowrap transition-all duration-300 ease-in-out', isHovered ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">Blackboard</span>
        </a>
        <a href="#" :class="[
          'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 transition-colors',
          isHovered ? 'px-3' : 'justify-center'
        ]">
          <el-icon :size="18" class="flex-shrink-0"><Monitor /></el-icon> 
          <span :class="['whitespace-nowrap transition-all duration-300 ease-in-out', isHovered ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0']">Mirroring</span>
        </a>
      </nav>

      <!-- User Profile Bottom -->
      <div class="mt-4 pt-4 border-t border-gray-200/60 relative min-h-[120px] flex justify-center items-center">
        <!-- Collapsed state -->
        <div 
          :class="[
            'absolute inset-0 flex flex-col items-center justify-center gap-3',
            'transition-all duration-300 ease-in-out',
            !isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          ]"
        >
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden shadow-inner flex-shrink-0">
             <img v-if="authStore.user?.avatar" :src="authStore.user.avatar" class="w-full h-full object-cover" />
             <span v-else class="text-sm font-semibold">{{ userInitial }}</span>
          </div>
          <button
            @click="handleLogout"
            class="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow-sm"
            title="Đăng xuất"
          >
            <el-icon :size="18"><SwitchButton /></el-icon>
          </button>
        </div>

        <!-- Expanded state -->
        <div 
          :class="[
            'absolute inset-0 flex flex-col justify-center px-2',
            'transition-all duration-300 ease-in-out',
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          ]"
        >
           <div class="flex items-center gap-3 mb-4">
             <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden shadow-inner flex-shrink-0">
               <img v-if="authStore.user?.avatar" :src="authStore.user.avatar" class="w-full h-full object-cover" />
               <span v-else class="text-sm font-semibold">{{ userInitial }}</span>
             </div>
             <div class="flex-1 min-w-0">
               <span class="block text-sm font-bold text-gray-800 tracking-tight truncate">{{ authStore.user?.full_name || 'hoai nam' }}</span>
               <span class="block text-[11px] text-gray-500 font-medium">Học sinh</span>
             </div>
           </div>
           
           <button
             @click="handleLogout"
             class="w-full py-2 flex items-center justify-center gap-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-sm font-bold shadow-sm"
           >
             <el-icon :size="16"><SwitchButton /></el-icon> Đăng xuất
           </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col bg-white rounded-tl-xl rounded-bl-xl shadow-[-2px_0_15px_rgba(0,0,0,0.03)] overflow-hidden relative border border-gray-100/50">
      
      <!-- Top Titlebar/Search (mimicking Desktop feel) -->
      <header class="h-14 flex items-center justify-center px-6 relative border-b border-gray-100 bg-white z-10">
        <!-- Search bar -->
        <div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          <div class="relative flex items-center group/search">
            <input type="text" placeholder="" class="w-8 outline-none border-b-2 border-transparent group-hover/search:border-gray-300 focus:border-blue-500 bg-transparent text-sm pb-1 mr-2 opacity-0 focus:opacity-100 group-hover/search:opacity-100 focus:w-48 group-hover/search:w-32 transition-all duration-300" />
            <el-icon class="text-gray-600 cursor-pointer group-hover/search:text-blue-500 transition-colors" :size="18"><Search /></el-icon>
          </div>
          <!-- Current lesson badge -->
          <div class="bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 cursor-pointer shadow-sm mx-2">
             1 lesson
             <el-icon :size="12"><CaretBottom /></el-icon>
          </div>
          <el-icon class="text-gray-500 cursor-pointer hover:text-gray-900 transition-colors" :size="18"><Setting /></el-icon>
        </div>
        
        <!-- Window Controls -->
        <div class="absolute right-4 flex items-center gap-4 text-gray-400">
          <el-icon class="cursor-pointer hover:text-gray-800 transition-colors" :size="16"><RefreshRight /></el-icon>
          <div class="w-px h-4 bg-gray-200 mx-1"></div>
          <el-icon class="cursor-pointer hover:text-gray-800 transition-colors" :size="14"><Minus /></el-icon>
          <el-icon class="cursor-pointer hover:text-gray-800 transition-colors" :size="14"><CopyDocument /></el-icon>
          <el-icon class="cursor-pointer hover:text-red-500 transition-colors" :size="14"><Close /></el-icon>
        </div>
      </header>

      <div class="flex-1 overflow-auto flex">
        <!-- Main Timeline & Classes -->
        <div class="flex-1 p-8 overflow-y-auto">
          
          <!-- Tabs -->
          <div class="flex items-center gap-8 border-b border-gray-100 pb-0 mb-6">
            <button 
              @click="activeTab = 'all'"
              :class="['text-[15px] pb-2.5 focus:outline-none transition-colors border-b-[3px]', 
                activeTab === 'all' ? 'font-bold text-gray-900 border-gray-900 -mb-px' : 'font-medium text-gray-400 border-transparent hover:text-gray-900'
              ]">
              All Classes
            </button>
            <button 
              @click="activeTab = 'pending'"
              :class="['text-[15px] pb-2.5 focus:outline-none transition-colors border-b-[3px]', 
                activeTab === 'pending' ? 'font-bold text-gray-900 border-gray-900 -mb-px' : 'font-medium text-gray-400 border-transparent hover:text-gray-900'
              ]">
              Pending
            </button>
            <button class="text-[15px] font-medium text-gray-400 border-transparent border-b-[3px] hover:text-gray-900 pb-2.5 focus:outline-none transition-colors">Ended</button>
          </div>

          <!-- Class Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             
            <!-- Class Card -->
            <div v-for="(course, index) in displayedCourses" :key="course.id" class="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group flex flex-col h-full bg-gradient-to-b from-white to-gray-50/50">
              <!-- Header Image -->
              <div :class="['h-28 rounded-t-2xl relative overflow-hidden', course.bgClass]">
                <!-- Avatar overlapping image -->
                <div class="absolute -bottom-4 left-4 w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm z-10 border border-gray-100">
                  <span class="text-xl">{{ course.icon }}</span>
                </div>
                <!-- Top Badge -->
                <div class="absolute top-3 right-3 bg-black/20 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                  {{ course.level }}
                </div>
              </div>
              
              <!-- Content -->
              <div class="p-5 pt-8 relative flex flex-col flex-1">
                 <h4 class="font-bold text-gray-900 text-[15px] leading-snug mb-2 group-hover:text-blue-600 transition-colors flex-1">
                   {{ course.title }}
                 </h4>
                 
                 <div class="space-y-1 mb-4">
                   <p v-for="(item, i) in course.highlights" :key="i" class="text-[11px] text-gray-500 flex items-center gap-1.5">
                     <span class="w-1 h-1 rounded-full bg-gray-300"></span> {{ item }}
                   </p>
                 </div>
                 
                  <!-- Footer -->
                 <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/60">
                   <div class="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                     <el-icon :size="12"><Clock /></el-icon> {{ course.duration }}
                   </div>
                   <button @click.stop="startCourse(course.id, course.title)" class="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors z-20 relative">
                     Vào Học
                   </button>
                 </div>
              </div>
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
import { 
  HomeFilled, ChatDotRound, List, Calendar, Folder, 
  DataBoard, Monitor, Search, CaretBottom, Setting, 
  RefreshRight, Minus, CopyDocument, Close, Plus, 
  VideoPlay, MoreFilled, ArrowRight, SwitchButton, Clock
} from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

const isHovered = ref(false)

const courses = ref([
  {
    id: 1,
    title: 'Excel Cơ Bản Cho Người Mới',
    icon: '📗',
    level: 'Basic',
    bgClass: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    duration: '5-7 buổi',
    highlights: ['Giao diện, nhập dữ liệu', 'Hàm SUM, AVERAGE, IF cơ bản', 'Định dạng & Vẽ biểu đồ']
  },
  {
    id: 2,
    title: 'Excel Hàm Thực Chiến',
    icon: '⚡',
    level: 'Hot',
    bgClass: 'bg-gradient-to-br from-amber-400 to-orange-500',
    duration: '8-10 buổi',
    highlights: ['IF nâng cao, SUMIFS, COUNTIF', 'VLOOKUP, INDEX + MATCH', 'XLOOKUP, Xử lý chuỗi']
  },
  {
    id: 3,
    title: 'Excel Văn Phòng & Báo Cáo',
    icon: '📊',
    level: 'Intermediate',
    bgClass: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    duration: '6-8 buổi',
    highlights: ['Sort, Filter, Data Validation', 'Pivot Table, Conditional Formatting', 'Tạo dashboard đơn giản']
  },
  {
    id: 4,
    title: 'Excel Kế Toán – Quản Lý Kho',
    icon: '💰',
    level: 'Applied',
    bgClass: 'bg-gradient-to-br from-purple-400 to-fuchsia-500',
    duration: '8-10 buổi',
    highlights: ['Quản lý công nợ, thu chi', 'Quản lý hóa đơn, tính lương', 'Báo cáo tài chính cơ bản']
  },
  {
    id: 5,
    title: 'Excel Phân Tích Dữ Liệu',
    icon: '📈',
    level: 'Advanced',
    bgClass: 'bg-gradient-to-br from-rose-400 to-red-500',
    duration: '10-12 buổi',
    highlights: ['Pivot nâng cao, Dashboard', 'Power Query, Power Pivot', 'Làm báo cáo động']
  },
  {
    id: 6,
    title: 'Excel VBA / Tự Động Hóa',
    icon: '🤖',
    level: 'Pro',
    bgClass: 'bg-gradient-to-br from-slate-600 to-gray-800',
    duration: '12-15 buổi',
    highlights: ['Ghi Macro, Viết VBA cơ bản', 'Tạo Form trong Excel', 'Tự động hóa báo cáo']
  }
])

const activeTab = ref('all')

// Sync started courses from logic (simple memory storage across sessions by user ID)
const pendingCoursesKey = `pending_courses_${authStore.user?.id || 'guest'}`
const startedCourseIds = ref(JSON.parse(localStorage.getItem(pendingCoursesKey) || '[]'))

const displayedCourses = computed(() => {
  if (activeTab.value === 'pending') {
    return courses.value.filter(c => startedCourseIds.value.includes(c.id))
  }
  return courses.value
})

const userInitial = computed(() => {
  const name = authStore.user?.full_name || 'Học viên'
  return name.charAt(0).toUpperCase()
})

const startCourse = (courseId, courseTitle) => {
  if (!startedCourseIds.value.includes(courseId)) {
    startedCourseIds.value.push(courseId)
    localStorage.setItem(pendingCoursesKey, JSON.stringify(startedCourseIds.value))
  }
  
  router.push({ 
    name: 'Practice', 
    params: { taskId: courseId },
    query: { title: courseTitle }
  })
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Custom Webkit Scrollbar */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Base input styles */
input {
  transition: all 0.3s ease;
}
</style>

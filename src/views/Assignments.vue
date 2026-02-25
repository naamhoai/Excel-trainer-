<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="bg-white shadow-sm border-b px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Bài tập của tôi</h1>
        <el-button @click="$router.push('/')">Quay lại</el-button>
      </div>
    </header>

    <main class="flex-1 overflow-auto p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Filters -->
        <el-card class="mb-6">
          <div class="flex gap-4">
            <el-select v-model="filterStatus" placeholder="Trạng thái" style="width: 150px">
              <el-option label="Tất cả" value="" />
              <el-option label="Chưa làm" value="pending" />
              <el-option label="Đang làm" value="in_progress" />
              <el-option label="Hoàn thành" value="completed" />
            </el-select>
            
            <el-select v-model="filterDifficulty" placeholder="Độ khó" style="width: 150px">
              <el-option label="Tất cả" value="" />
              <el-option label="Dễ" value="easy" />
              <el-option label="Trung bình" value="medium" />
              <el-option label="Khó" value="hard" />
            </el-select>
            
            <el-input
              v-model="searchText"
              placeholder="Tìm kiếm bài tập..."
              style="width: 300px"
              clearable
            />
          </div>
        </el-card>

        <!-- Assignments List -->
        <el-card>
          <el-table :data="filteredAssignments" stripe>
            <el-table-column type="index" label="#" width="50" />
            <el-table-column prop="title" label="Tiêu đề" min-width="200" />
            <el-table-column prop="context" label="Bối cảnh" width="150" />
            <el-table-column prop="difficulty" label="Độ khó" width="100">
              <template #default="{ row }">
                <el-tag :type="getDifficultyType(row.difficulty)" size="small">
                  {{ getDifficultyText(row.difficulty) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="deadline" label="Hạn nộp" width="120" />
            <el-table-column prop="score" label="Điểm" width="80">
              <template #default="{ row }">
                <span :class="row.score ? 'text-green-600 font-semibold' : 'text-gray-400'">
                  {{ row.score || '-' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="Trạng thái" width="120">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">
                  {{ getStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Thao tác" width="150" fixed="right">
              <template #default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  @click="startPractice(row.id)"
                >
                  {{ row.status === 'pending' ? 'Bắt đầu' : row.status === 'completed' ? 'Xem lại' : 'Tiếp tục' }}
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const filterStatus = ref('')
const filterDifficulty = ref('')
const searchText = ref('')

const assignments = ref([
  { id: 1, title: 'Tính Tổng Doanh Thu', context: 'Báo Cáo Doanh Thu', difficulty: 'easy', deadline: '2026-03-01', score: null, status: 'pending' },
  { id: 2, title: 'Tính Trung Bình Điểm', context: 'Quản Lý Học Sinh', difficulty: 'easy', deadline: '2026-03-02', score: 85, status: 'in_progress' },
  { id: 3, title: 'Sử dụng VLOOKUP', context: 'Tra Cứu Dữ Liệu', difficulty: 'medium', deadline: '2026-03-05', score: 90, status: 'completed' },
  { id: 4, title: 'Tạo Pivot Table', context: 'Phân Tích Dữ Liệu', difficulty: 'medium', deadline: '2026-03-07', score: null, status: 'pending' },
  { id: 5, title: 'Sử dụng IF lồng nhau', context: 'Logic Phức Tạp', difficulty: 'hard', deadline: '2026-03-10', score: null, status: 'pending' },
])

const filteredAssignments = computed(() => {
  return assignments.value.filter(item => {
    const matchStatus = !filterStatus.value || item.status === filterStatus.value
    const matchDifficulty = !filterDifficulty.value || item.difficulty === filterDifficulty.value
    const matchSearch = !searchText.value || 
      item.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.context.toLowerCase().includes(searchText.value.toLowerCase())
    
    return matchStatus && matchDifficulty && matchSearch
  })
})

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
  const types = { pending: 'info', in_progress: 'warning', completed: 'success' }
  return types[status] || 'info'
}

const getStatusText = (status) => {
  const texts = { pending: 'Chưa làm', in_progress: 'Đang làm', completed: 'Hoàn thành' }
  return texts[status] || status
}
</script>

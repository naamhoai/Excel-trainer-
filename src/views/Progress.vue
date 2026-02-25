<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="bg-white shadow-sm border-b px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Tiến độ học tập</h1>
        <el-button @click="$router.push('/')">Quay lại</el-button>
      </div>
    </header>

    <main class="flex-1 overflow-auto p-6">
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Overall Progress -->
        <el-card>
          <template #header>
            <h2 class="text-lg font-semibold">Tổng quan</h2>
          </template>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <el-progress
                type="circle"
                :percentage="overallProgress"
                :width="120"
                :stroke-width="10"
              />
              <p class="mt-3 text-gray-600">Tiến độ tổng thể</p>
            </div>
            
            <div class="text-center">
              <div class="text-4xl font-bold text-green-600">{{ completedTasks }}</div>
              <p class="mt-2 text-gray-600">Bài tập hoàn thành</p>
            </div>
            
            <div class="text-center">
              <div class="text-4xl font-bold text-blue-600">{{ averageScore }}</div>
              <p class="mt-2 text-gray-600">Điểm trung bình</p>
            </div>
          </div>
        </el-card>

        <!-- Progress by Program -->
        <el-card>
          <template #header>
            <h2 class="text-lg font-semibold">Tiến độ theo chương trình</h2>
          </template>
          
          <div class="space-y-4">
            <div
              v-for="program in programProgress"
              :key="program.id"
              class="border rounded p-4"
            >
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium">{{ program.name }}</h3>
                <span class="text-sm text-gray-600">{{ program.completed }}/{{ program.total }} bài</span>
              </div>
              <el-progress
                :percentage="program.percentage"
                :color="getProgressColor(program.percentage)"
              />
            </div>
          </div>
        </el-card>

        <!-- Recent Submissions -->
        <el-card>
          <template #header>
            <h2 class="text-lg font-semibold">Lịch sử làm bài</h2>
          </template>
          
          <el-table :data="submissions" stripe>
            <el-table-column prop="date" label="Ngày" width="120" />
            <el-table-column prop="task" label="Bài tập" min-width="200" />
            <el-table-column prop="score" label="Điểm" width="80">
              <template #default="{ row }">
                <span :class="getScoreClass(row.score)">{{ row.score }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="Thời gian" width="100" />
            <el-table-column prop="attempts" label="Lần thử" width="80" />
            <el-table-column label="Kết quả" width="100">
              <template #default="{ row }">
                <el-tag :type="row.score >= 80 ? 'success' : row.score >= 60 ? 'warning' : 'danger'" size="small">
                  {{ row.score >= 80 ? 'Tốt' : row.score >= 60 ? 'Đạt' : 'Chưa đạt' }}
                </el-tag>
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

const overallProgress = ref(67)
const completedTasks = ref(8)
const averageScore = ref(85)

const programProgress = ref([
  { id: 1, name: 'Excel Cơ Bản', completed: 10, total: 15, percentage: 67 },
  { id: 2, name: 'Excel Nâng Cao', completed: 6, total: 20, percentage: 30 },
  { id: 3, name: 'Excel Chuyên Sâu', completed: 0, total: 25, percentage: 0 }
])

const submissions = ref([
  { date: '2026-02-24', task: 'Sử dụng VLOOKUP', score: 90, time: '15:30', attempts: 1 },
  { date: '2026-02-23', task: 'Tính Trung Bình', score: 85, time: '12:45', attempts: 2 },
  { date: '2026-02-22', task: 'Hàm IF cơ bản', score: 95, time: '08:20', attempts: 1 },
  { date: '2026-02-21', task: 'Tính Tổng Doanh Thu', score: 75, time: '18:15', attempts: 3 },
  { date: '2026-02-20', task: 'Format Cell', score: 100, time: '05:30', attempts: 1 }
])

const getProgressColor = (percentage) => {
  if (percentage >= 80) return '#67C23A'
  if (percentage >= 50) return '#E6A23C'
  return '#F56C6C'
}

const getScoreClass = (score) => {
  if (score >= 80) return 'text-green-600 font-semibold'
  if (score >= 60) return 'text-yellow-600 font-semibold'
  return 'text-red-600 font-semibold'
}
</script>

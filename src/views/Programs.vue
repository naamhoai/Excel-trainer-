<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="bg-white shadow-sm border-b px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Chương trình học</h1>
        <el-button @click="$router.push('/')">Quay lại</el-button>
      </div>
    </header>

    <main class="flex-1 overflow-auto p-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <el-card
            v-for="program in programs"
            :key="program.id"
            shadow="hover"
            class="cursor-pointer hover:shadow-lg transition-shadow"
            @click="viewProgram(program.id)"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-lg">{{ program.name }}</h3>
                <el-tag :type="program.progress === 100 ? 'success' : 'primary'" size="small">
                  {{ program.progress }}%
                </el-tag>
              </div>
            </template>
            
            <p class="text-gray-600 text-sm mb-4">{{ program.description }}</p>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">Số bài học:</span>
                <span class="font-medium">{{ program.lessons }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">Độ khó:</span>
                <el-tag :type="getDifficultyType(program.difficulty)" size="small">
                  {{ getDifficultyText(program.difficulty) }}
                </el-tag>
              </div>
            </div>
            
            <el-progress
              :percentage="program.progress"
              :color="program.progress === 100 ? '#67C23A' : '#409EFF'"
              class="mt-4"
            />
          </el-card>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const programs = ref([
  {
    id: 1,
    name: 'Excel Cơ Bản',
    description: 'Học các hàm và công thức cơ bản trong Excel',
    lessons: 15,
    difficulty: 'easy',
    progress: 67
  },
  {
    id: 2,
    name: 'Excel Nâng Cao',
    description: 'Pivot Table, VLOOKUP, và các hàm nâng cao',
    lessons: 20,
    difficulty: 'medium',
    progress: 30
  },
  {
    id: 3,
    name: 'Excel Chuyên Sâu',
    description: 'Macro, VBA và tự động hóa',
    lessons: 25,
    difficulty: 'hard',
    progress: 0
  }
])

const viewProgram = (id) => {
  router.push('/assignments')
}

const getDifficultyType = (difficulty) => {
  const types = { easy: 'success', medium: 'warning', hard: 'danger' }
  return types[difficulty] || 'info'
}

const getDifficultyText = (difficulty) => {
  const texts = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' }
  return texts[difficulty] || difficulty
}
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="bg-white shadow-sm border-b px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Quản trị hệ thống</h1>
        <el-button @click="$router.push('/')">Quay lại</el-button>
      </div>
    </header>

    <main class="flex-1 overflow-auto p-6">
      <div class="max-w-7xl mx-auto">
        <el-tabs v-model="activeTab">
          <!-- Users Management -->
          <el-tab-pane label="Người dùng" name="users">
            <el-card>
              <template #header>
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold">Quản lý người dùng</h2>
                  <el-button type="primary" @click="showAddUser = true">Thêm người dùng</el-button>
                </div>
              </template>
              
              <el-table :data="users" stripe>
                <el-table-column prop="username" label="Tên đăng nhập" width="150" />
                <el-table-column prop="full_name" label="Họ tên" width="200" />
                <el-table-column prop="email" label="Email" width="200" />
                <el-table-column prop="role" label="Vai trò" width="100">
                  <template #default="{ row }">
                    <el-tag :type="row.role === 'admin' ? 'danger' : 'primary'" size="small">
                      {{ row.role === 'admin' ? 'Admin' : 'User' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="is_active" label="Trạng thái" width="100">
                  <template #default="{ row }">
                    <el-tag :type="row.is_active ? 'success' : 'info'" size="small">
                      {{ row.is_active ? 'Hoạt động' : 'Khóa' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="Thao tác" width="150">
                  <template #default="{ row }">
                    <el-button size="small" @click="editUser(row)">Sửa</el-button>
                    <el-button size="small" type="danger" @click="deleteUser(row.id)">Xóa</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-tab-pane>

          <!-- Programs Management -->
          <el-tab-pane label="Chương trình" name="programs">
            <el-card>
              <template #header>
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold">Quản lý chương trình</h2>
                  <el-button type="primary" @click="showAddProgram = true">Thêm chương trình</el-button>
                </div>
              </template>
              
              <el-table :data="programs" stripe>
                <el-table-column prop="name" label="Tên chương trình" min-width="200" />
                <el-table-column prop="description" label="Mô tả" min-width="300" />
                <el-table-column prop="contexts" label="Số bối cảnh" width="120" />
                <el-table-column prop="tasks" label="Số bài tập" width="120" />
                <el-table-column label="Thao tác" width="150">
                  <template #default="{ row }">
                    <el-button size="small" @click="editProgram(row)">Sửa</el-button>
                    <el-button size="small" type="danger" @click="deleteProgram(row.id)">Xóa</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-tab-pane>

          <!-- Tasks Management -->
          <el-tab-pane label="Bài tập" name="tasks">
            <el-card>
              <template #header>
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold">Quản lý bài tập</h2>
                  <el-button type="primary" @click="showAddTask = true">Thêm bài tập</el-button>
                </div>
              </template>
              
              <el-table :data="tasks" stripe>
                <el-table-column prop="title" label="Tiêu đề" min-width="200" />
                <el-table-column prop="context" label="Bối cảnh" width="150" />
                <el-table-column prop="difficulty" label="Độ khó" width="100">
                  <template #default="{ row }">
                    <el-tag :type="getDifficultyType(row.difficulty)" size="small">
                      {{ getDifficultyText(row.difficulty) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="exam_mode" label="Chế độ thi" width="100">
                  <template #default="{ row }">
                    <el-tag :type="row.exam_mode ? 'warning' : 'info'" size="small">
                      {{ row.exam_mode ? 'Thi' : 'Luyện tập' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="Thao tác" width="150">
                  <template #default="{ row }">
                    <el-button size="small" @click="editTask(row)">Sửa</el-button>
                    <el-button size="small" type="danger" @click="deleteTask(row.id)">Xóa</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-tab-pane>

          <!-- Assignments -->
          <el-tab-pane label="Giao bài" name="assignments">
            <el-card>
              <template #header>
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold">Giao bài tập</h2>
                  <el-button type="primary" @click="showAssignTask = true">Giao bài mới</el-button>
                </div>
              </template>
              
              <el-table :data="assignments" stripe>
                <el-table-column prop="task" label="Bài tập" min-width="200" />
                <el-table-column prop="users" label="Số người" width="100" />
                <el-table-column prop="start_time" label="Bắt đầu" width="150" />
                <el-table-column prop="end_time" label="Kết thúc" width="150" />
                <el-table-column prop="is_exam" label="Loại" width="100">
                  <template #default="{ row }">
                    <el-tag :type="row.is_exam ? 'danger' : 'primary'" size="small">
                      {{ row.is_exam ? 'Thi' : 'Bài tập' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="Thao tác" width="100">
                  <template #default="{ row }">
                    <el-button size="small" type="danger" @click="deleteAssignment(row.id)">Xóa</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('users')
const showAddUser = ref(false)
const showAddProgram = ref(false)
const showAddTask = ref(false)
const showAssignTask = ref(false)

const users = ref([
  { id: 1, username: 'admin', full_name: 'System Admin', email: 'admin@excel.ai', role: 'admin', is_active: true },
  { id: 2, username: 'user1', full_name: 'Nguyen Van A', email: 'a@student.ai', role: 'user', is_active: true },
  { id: 3, username: 'user2', full_name: 'Tran Thi B', email: 'b@student.ai', role: 'user', is_active: true }
])

const programs = ref([
  { id: 1, name: 'Excel Cơ Bản', description: 'Chương trình dành cho người mới', contexts: 5, tasks: 15 },
  { id: 2, name: 'Excel Nâng Cao', description: 'Pivot Table, VLOOKUP', contexts: 8, tasks: 20 }
])

const tasks = ref([
  { id: 1, title: 'Tính Tổng Doanh Thu', context: 'Báo Cáo Doanh Thu', difficulty: 'easy', exam_mode: false },
  { id: 2, title: 'Sử dụng VLOOKUP', context: 'Tra Cứu Dữ Liệu', difficulty: 'medium', exam_mode: false },
  { id: 3, title: 'Tạo Pivot Table', context: 'Phân Tích Dữ Liệu', difficulty: 'hard', exam_mode: true }
])

const assignments = ref([
  { id: 1, task: 'Tính Tổng Doanh Thu', users: 2, start_time: '2026-02-25', end_time: '2026-03-01', is_exam: false },
  { id: 2, task: 'Sử dụng VLOOKUP', users: 3, start_time: '2026-02-26', end_time: '2026-03-05', is_exam: false }
])

const editUser = (user) => {
  ElMessage.info('Chức năng đang phát triển')
}

const deleteUser = (id) => {
  ElMessage.warning('Xác nhận xóa người dùng')
}

const editProgram = (program) => {
  ElMessage.info('Chức năng đang phát triển')
}

const deleteProgram = (id) => {
  ElMessage.warning('Xác nhận xóa chương trình')
}

const editTask = (task) => {
  ElMessage.info('Chức năng đang phát triển')
}

const deleteTask = (id) => {
  ElMessage.warning('Xác nhận xóa bài tập')
}

const deleteAssignment = (id) => {
  ElMessage.warning('Xác nhận xóa phân công')
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

<template>
  <div class="excel-tutor">
    <!-- Title Bar -->
    <div class="title-bar">
      <div class="logo">
        <div class="logo-icon">E</div>
        ExcelTutor
        <span class="ai-badge">AI</span>
      </div>
      <div class="file-name">📊 {{ task.title }} — ExcelTutor</div>
      <div class="win-btns">
        <button class="win-btn" @click="$router.back()">←</button>
      </div>
    </div>

    <!-- Ribbon -->
    <div class="ribbon">
      <div class="ribbon-tabs">
        <button class="ribbon-tab active">Trang chủ</button>
        <button class="ribbon-tab">Chèn</button>
        <button class="ribbon-tab">Công thức</button>
        <button class="ribbon-tab">Dữ liệu</button>
        <button class="ribbon-tab">Xem</button>
        <button class="ribbon-tab tutor-tab" @click="toggleTutorial">🎓 AI Gia sư</button>
      </div>
      <div class="ribbon-content">
        <div class="ribbon-group">
          <div class="ribbon-btns">
            <button class="rbn-btn"><span class="icon">📋</span>Dán</button>
            <button class="rbn-btn"><span class="icon">✂️</span>Cắt</button>
            <button class="rbn-btn"><span class="icon">📄</span>Sao chép</button>
          </div>
          <div class="ribbon-group-label">Bảng tạm</div>
        </div>
        
        <div class="ribbon-group">
          <div class="ribbon-btns">
            <select style="height:20px;font-size:11px;border:1px solid #ccc;padding:0 2px">
              <option>Calibri</option>
              <option>Arial</option>
              <option>Times New Roman</option>
            </select>
            <select style="height:20px;font-size:11px;border:1px solid #ccc;width:36px;padding:0 2px">
              <option>11</option>
              <option>12</option>
              <option>14</option>
            </select>
          </div>
          <div class="ribbon-btns" style="margin-top:2px">
            <button class="rbn-btn" style="min-width:24px"><b>B</b></button>
            <button class="rbn-btn" style="min-width:24px"><i>I</i></button>
            <button class="rbn-btn" style="min-width:24px"><u>U</u></button>
          </div>
          <div class="ribbon-group-label">Phông chữ</div>
        </div>
        
        <div class="ribbon-group">
          <div class="ribbon-btns">
            <button class="rbn-btn">⬛⬜⬜</button>
            <button class="rbn-btn">⬜⬛⬜</button>
            <button class="rbn-btn">⬜⬜⬛</button>
          </div>
          <div class="ribbon-group-label">Căn chỉnh</div>
        </div>
        
        <div class="ribbon-group">
          <div class="ribbon-btns">
            <button class="rbn-btn ai-btn" :class="{ 'active-btn': tutorialOpen }" @click="toggleTutorial">
              <span class="icon">🤖</span>AI Gia sư
            </button>
            <button class="rbn-btn ai-btn" @click="explainSelected">
              <span class="icon">💡</span>Giải thích
            </button>
            <button class="rbn-btn ai-btn" @click="checkExercise">
              <span class="icon">✅</span>Chấm bài
            </button>
          </div>
          <div class="ribbon-group-label">🤖 Tính năng AI</div>
        </div>
      </div>
    </div>

    <!-- Formula Bar -->
    <div class="formula-bar">
      <div class="cell-ref">{{ selectedCell }}</div>
      <div class="fx-label"><i>fx</i></div>
      <input type="text" v-model="formulaBar" @keyup.enter="applyFormula" />
    </div>

    <!-- Main Area -->
    <div class="main-area">
      <!-- Spreadsheet -->
      <div class="spreadsheet-container">
        <div class="grid-wrapper">
          <table class="grid">
            <thead>
              <tr>
                <th class="row-header"></th>
                <th 
                  v-for="(col, idx) in columns" 
                  :key="col"
                  :style="{ width: columnWidths[idx] + 'px', minWidth: columnWidths[idx] + 'px' }"
                  class="resizable-header"
                  @contextmenu.prevent="showContextMenu($event, 'column', idx)"
                >
                  {{ col }}
                  <div 
                    class="resize-handle"
                    @mousedown="startResize($event, idx)"
                  ></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row">
                <td 
                  class="row-header-cell"
                  @contextmenu.prevent="showContextMenu($event, 'row', row)"
                >
                  {{ row }}
                </td>
                <td
                  v-for="(col, idx) in columns"
                  :key="`${col}${row}`"
                  :class="getCellClass(col, row)"
                  :style="{ width: columnWidths[idx] + 'px', minWidth: columnWidths[idx] + 'px' }"
                  @click="selectCell(col, row)"
                  @contextmenu.prevent="showContextMenu($event, 'cell', `${col}${row}`)"
                  @mouseenter="onCellHover(col, row, $event)"
                  @mouseleave="onCellLeave"
                >
                  <div class="cell-content" :class="getCellAlign(col, row)">
                    {{ getCellDisplay(col, row) }}
                    <span v-if="isFormula(col, row)" class="formula-indicator">ƒ</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tutorial Panel -->
      <div class="tutorial-panel" :class="{ collapsed: !tutorialOpen }">
        <div class="tutorial-header">
          <div class="tutorial-header-left">🤖 AI Tutor Panel</div>
          <button class="tut-close" @click="toggleTutorial">✕</button>
        </div>
        
        <div class="tutorial-body">
          <div class="section-title">📚 Bài học hiện tại</div>
          
          <div class="lesson-card active">
            <div class="lesson-title">
              📊 {{ task.title }}
              <span class="lesson-badge badge-active">Đang học</span>
            </div>
            <div class="lesson-desc">{{ task.description }}</div>
          </div>

          <div class="step-container">
            <div class="step-label">📌 Các bước thực hành:</div>
            <div
              v-for="(step, idx) in steps"
              :key="idx"
              class="step-item"
              :class="getStepClass(idx)"
            >
              <div class="step-num">{{ step.done ? '✓' : idx + 1 }}</div>
              <div class="step-text" v-html="step.text"></div>
            </div>
          </div>

          <div class="tip-box">
            <div class="tip-title">💡 Bạn có biết?</div>
            <div class="tip-content" v-html="task.tip"></div>
          </div>
        </div>

        <!-- Exercise Section -->
        <div class="exercise-section">
          <div class="exercise-title">🏆 Bài tập thực hành</div>
          <div class="exercise-desc">{{ task.exerciseDesc }}</div>
          
          <div
            v-for="(ex, idx) in exercises"
            :key="idx"
            class="exercise-task"
          >
            <div class="task-check" :class="{ done: ex.done }">
              {{ ex.done ? '✓' : idx + 1 }}
            </div>
            <div v-html="ex.text"></div>
          </div>

          <button class="check-btn" @click="checkExercise">✅ Chấm bài</button>
          
          <div v-if="showScore" class="score-badge">
            🏆 Điểm: {{ score }}/{{ exercises.length }} — {{ scoreMessage }}
          </div>
        </div>
      </div>
    </div>

    <!-- Context Menu -->
    <div
      v-if="contextMenu.visible"
      class="context-menu"
      :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }"
      @click.stop
    >
      <template v-if="contextMenu.type === 'row'">
        <div class="context-menu-item" @click="insertRowAbove">
          <span>⬆️</span> Chèn dòng phía trên
        </div>
        <div class="context-menu-item" @click="insertRowBelow">
          <span>⬇️</span> Chèn dòng phía dưới
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item danger" @click="deleteRow">
          <span>🗑️</span> Xóa dòng
        </div>
      </template>
      
      <template v-if="contextMenu.type === 'column'">
        <div class="context-menu-item" @click="insertColumnLeft">
          <span>⬅️</span> Chèn cột bên trái
        </div>
        <div class="context-menu-item" @click="insertColumnRight">
          <span>➡️</span> Chèn cột bên phải
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item danger" @click="deleteColumn">
          <span>🗑️</span> Xóa cột
        </div>
      </template>
      
      <template v-if="contextMenu.type === 'cell'">
        <div class="context-menu-item" @click="copyCell">
          <span>📄</span> Sao chép
        </div>
        <div class="context-menu-item" @click="pasteCell">
          <span>📋</span> Dán
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" @click="clearCell">
          <span>🧹</span> Xóa nội dung
        </div>
      </template>
    </div>

    <!-- AI Tooltip -->
    <div
      class="ai-tooltip"
      :class="{ visible: tooltipVisible }"
      :style="tooltipStyle"
    >
      <button class="ai-tooltip-close" @click="closeTooltip">✕</button>
      <div class="ai-tooltip-header">🤖 {{ tooltipTitle }}</div>
      <div class="ai-tooltip-formula">{{ tooltipFormula }}</div>
      <div class="ai-tooltip-body" v-html="tooltipBody"></div>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">
      <span>{{ toastIcon }}</span>
      <span>{{ toastMessage }}</span>
    </div>

    <!-- Status Bar -->
    <div class="status-bar">
      <div class="status-item">📊 Sẵn sàng</div>
      <div class="status-divider"></div>
      <div class="status-item">Thời gian: {{ timer }}</div>
      <div class="status-divider"></div>
      <div class="status-item" style="color:#a78bfa">🤖 AI: Sẵn sàng giải thích</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Grid setup
const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const rows = Array.from({ length: 20 }, (_, i) => i + 1)

// Column widths (resizable)
const columnWidths = ref([140, 100, 100, 100, 100, 100, 100, 100])
let resizingColumn = null
let startX = 0
let startWidth = 0

// Context menu
const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0,
  type: 'cell', // 'cell', 'row', 'column'
  target: null
})

// Task data
const task = ref({
  id: route.params.taskId,
  title: 'Bài 1: Hàm SUM',
  description: 'Tính tổng các giá trị trong một vùng dữ liệu',
  exerciseDesc: 'Hoàn thành các nhiệm vụ dưới đây để ghi điểm:',
  tip: 'Hàm <span style="color:#a78bfa;font-family:monospace">=SUM()</span> có thể nhận nhiều vùng:<br><span style="color:#67e8f9;font-family:monospace">=SUM(A1:A5, C1:C5)</span>'
})

// Cell data
const cells = ref({
  A1: 'Sản phẩm', B1: 'Q1 (triệu)', C1: 'Q2 (triệu)', D1: 'Q3 (triệu)', E1: 'Tổng / SP',
  A2: 'Laptop Pro', B2: '450', C2: '520', D2: '610',
  A3: 'Mouse BT', B3: '120', C3: '145', D3: '132',
  A4: 'Keyboard', B4: '98', C4: '110', D4: '125',
  A5: 'Monitor 4K', B5: '380', C5: '410', D5: '490',
  A6: 'TỔNG',
  B6: '=SUM(B2:B5)',
  E2: '=SUM(B2:D2)',
  E3: '=SUM(B3:D3)',
  E4: '=SUM(B4:D4)',
  E5: '=SUM(B5:D5)',
  E6: '=SUM(E2:E5)'
})

const selectedCell = ref('B6')
const formulaBar = ref('=SUM(B2:B5)')

// Tutorial state
const tutorialOpen = ref(true)

// Steps
const steps = ref([
  { text: 'Click vào cell <span class="step-highlight">B6</span> để xem công thức SUM', done: true },
  { text: 'Nhập <span class="step-highlight">=SUM(B2:B5)</span> vào formula bar', done: false },
  { text: 'Thử thay đổi giá trị trong <span class="step-highlight">B2</span>', done: false },
  { text: 'Hover vào cell có công thức để xem <span class="step-highlight">AI giải thích</span>', done: false }
])

// Exercises
const exercises = ref([
  { text: 'Tạo công thức SUM cho cột Q2 (cell <b>C6</b>)', done: false },
  { text: 'Tính tổng cột Q3 với SUM ở cell <b>D6</b>', done: false },
  { text: 'Hover vào một cell có công thức để đọc AI giải thích', done: false }
])

const showScore = ref(false)
const score = ref(0)
const scoreMessage = computed(() => {
  const messages = ['Hãy thử làm bài!', 'Cố thêm chút!', 'Tốt lắm!', '🎉 Hoàn hảo!']
  return messages[score.value] || messages[0]
})

// Tooltip
const tooltipVisible = ref(false)
const tooltipTitle = ref('AI Giải thích công thức')
const tooltipFormula = ref('')
const tooltipBody = ref('')
const tooltipStyle = ref({})
let tooltipTimer = null

// Toast
const toastVisible = ref(false)
const toastIcon = ref('✅')
const toastMessage = ref('')

// Timer
const timer = ref('00:00')
let timerInterval = null
let seconds = 0

const statusText = ref('Sẵn sàng')

// Methods
const selectCell = (col, row) => {
  const cellId = `${col}${row}`
  selectedCell.value = cellId
  formulaBar.value = cells.value[cellId] || ''
}

const getCellClass = (col, row) => {
  const cellId = `${col}${row}`
  const classes = []
  
  if (cellId === selectedCell.value) classes.push('selected')
  if (row === 1) classes.push('header-row')
  if (isFormula(col, row)) classes.push('has-formula')
  
  return classes
}

const getCellAlign = (col, row) => {
  const val = getCellDisplay(col, row)
  if (!isNaN(val) && val !== '') return 'text-right'
  return ''
}

const isFormula = (col, row) => {
  const cellId = `${col}${row}`
  const val = cells.value[cellId] || ''
  return val.startsWith('=')
}

const getCellDisplay = (col, row) => {
  const cellId = `${col}${row}`
  const val = cells.value[cellId] || ''
  
  if (val.startsWith('=')) {
    return evalFormula(val)
  }
  return val
}

const evalFormula = (formula) => {
  if (!formula.startsWith('=')) return formula
  
  try {
    const expr = formula.substring(1)
    const sumMatch = expr.match(/^SUM\(([A-Z]+\d+):([A-Z]+\d+)\)$/i)
    
    if (sumMatch) {
      const cellIds = expandRange(sumMatch[1], sumMatch[2])
      const sum = cellIds.reduce((acc, cid) => {
        const val = parseFloat(cells.value[cid] || 0)
        return acc + (isNaN(val) ? 0 : val)
      }, 0)
      return sum.toLocaleString('vi-VN')
    }
    
    return formula
  } catch (e) {
    return '#ERROR'
  }
}

const expandRange = (from, to) => {
  const colFrom = from.match(/[A-Z]+/)[0]
  const rowFrom = parseInt(from.match(/\d+/)[0])
  const colTo = to.match(/[A-Z]+/)[0]
  const rowTo = parseInt(to.match(/\d+/)[0])
  
  const cFrom = columns.indexOf(colFrom)
  const cTo = columns.indexOf(colTo)
  
  const result = []
  for (let c = cFrom; c <= cTo; c++) {
    for (let r = rowFrom; r <= rowTo; r++) {
      result.push(columns[c] + r)
    }
  }
  return result
}

const applyFormula = () => {
  if (formulaBar.value) {
    cells.value[selectedCell.value] = formulaBar.value
    showToast('✅', 'Đã áp dụng công thức')
  }
}

const onCellHover = (col, row, event) => {
  const cellId = `${col}${row}`
  const val = cells.value[cellId] || ''
  
  if (val.startsWith('=')) {
    tooltipTimer = setTimeout(() => {
      showTooltipFor(val, event.target)
      if (!exercises.value[2].done) {
        exercises.value[2].done = true
        steps.value[3].done = true
      }
    }, 600)
  }
}

const onCellLeave = () => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
}

const showTooltipFor = (formula, target) => {
  const rect = target.getBoundingClientRect()
  
  tooltipFormula.value = formula
  tooltipTitle.value = 'Hàm SUM — Tính tổng'
  
  const match = formula.match(/SUM\(([^)]+)\)/i)
  const range = match ? match[1] : '...'
  
  tooltipBody.value = `<b>=SUM(${range})</b> sẽ cộng tất cả các số trong vùng <b>${range}</b>.<br><br>📌 <b>Cú pháp:</b> =SUM(vùng_số)<br>📌 <b>Ví dụ:</b> =SUM(B2:B5) → cộng các ô B2, B3, B4, B5<br><br>💡 Kết quả phụ thuộc vào giá trị trong ${range}`
  
  let left = rect.left
  let top = rect.bottom + 4
  
  if (left + 320 > window.innerWidth) left = window.innerWidth - 330
  if (top + 200 > window.innerHeight) top = rect.top - 210
  
  tooltipStyle.value = {
    left: left + 'px',
    top: top + 'px'
  }
  
  tooltipVisible.value = true
}

const closeTooltip = () => {
  tooltipVisible.value = false
}

const explainFormula = () => {
  if (formulaBar.value && formulaBar.value.startsWith('=')) {
    const cell = document.querySelector('.grid td.selected')
    if (cell) showTooltipFor(formulaBar.value, cell)
  } else {
    showToast('⚠️', 'Không có công thức để giải thích')
  }
}

const explainSelected = () => {
  explainFormula()
}

const toggleTutorial = () => {
  tutorialOpen.value = !tutorialOpen.value
}

const getStepClass = (idx) => {
  if (steps.value[idx].done) return 'done'
  if (idx === 1) return 'current'
  return ''
}

const checkExercise = () => {
  score.value = 0
  
  const c6 = cells.value.C6 || ''
  if (c6.toLowerCase().includes('sum') && c6.includes('C')) {
    exercises.value[0].done = true
    score.value++
  }
  
  const d6 = cells.value.D6 || ''
  if (d6.toLowerCase().includes('sum') && d6.includes('D')) {
    exercises.value[1].done = true
    score.value++
  }
  
  if (exercises.value[2].done) score.value++
  
  showScore.value = true
  
  const icons = ['⚠️', '💪', '👍', '🏆']
  showToast(icons[score.value] || '⚠️', `Điểm: ${score.value}/${exercises.value.length} — ${scoreMessage.value}`)
}

const showToast = (icon, message) => {
  toastIcon.value = icon
  toastMessage.value = message
  toastVisible.value = true
  
  setTimeout(() => {
    toastVisible.value = false
  }, 3000)
}

// Column resize
const startResize = (event, columnIndex) => {
  event.preventDefault()
  resizingColumn = columnIndex
  startX = event.clientX
  startWidth = columnWidths.value[columnIndex]
  
  document.addEventListener('mousemove', doResize)
  document.addEventListener('mouseup', stopResize)
}

const doResize = (event) => {
  if (resizingColumn === null) return
  
  const diff = event.clientX - startX
  const newWidth = Math.max(50, startWidth + diff)
  columnWidths.value[resizingColumn] = newWidth
}

const stopResize = () => {
  resizingColumn = null
  document.removeEventListener('mousemove', doResize)
  document.removeEventListener('mouseup', stopResize)
}

// Context menu
const showContextMenu = (event, type, target) => {
  contextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    type,
    target
  }
}

const hideContextMenu = () => {
  contextMenu.value.visible = false
}

// Row operations
const insertRowAbove = () => {
  const rowNum = contextMenu.value.target
  rows.value.splice(rowNum - 1, 0, rows.value.length + 1)
  // Renumber rows
  rows.value = rows.value.map((_, i) => i + 1)
  hideContextMenu()
  showToast('✅', `Đã chèn dòng phía trên dòng ${rowNum}`)
}

const insertRowBelow = () => {
  const rowNum = contextMenu.value.target
  rows.value.splice(rowNum, 0, rows.value.length + 1)
  // Renumber rows
  rows.value = rows.value.map((_, i) => i + 1)
  hideContextMenu()
  showToast('✅', `Đã chèn dòng phía dưới dòng ${rowNum}`)
}

const deleteRow = () => {
  const rowNum = contextMenu.value.target
  if (rows.value.length <= 1) {
    showToast('⚠️', 'Không thể xóa dòng cuối cùng')
    hideContextMenu()
    return
  }
  
  // Delete data in this row
  columns.forEach(col => {
    delete cells.value[`${col}${rowNum}`]
  })
  
  rows.value.splice(rowNum - 1, 1)
  // Renumber rows
  rows.value = rows.value.map((_, i) => i + 1)
  hideContextMenu()
  showToast('✅', `Đã xóa dòng ${rowNum}`)
}

// Column operations
const insertColumnLeft = () => {
  const colIdx = contextMenu.value.target
  const newCol = String.fromCharCode(65 + columns.length)
  columns.splice(colIdx, 0, newCol)
  columnWidths.value.splice(colIdx, 0, 100)
  hideContextMenu()
  showToast('✅', 'Đã chèn cột bên trái')
}

const insertColumnRight = () => {
  const colIdx = contextMenu.value.target
  const newCol = String.fromCharCode(65 + columns.length)
  columns.splice(colIdx + 1, 0, newCol)
  columnWidths.value.splice(colIdx + 1, 0, 100)
  hideContextMenu()
  showToast('✅', 'Đã chèn cột bên phải')
}

const deleteColumn = () => {
  const colIdx = contextMenu.value.target
  if (columns.length <= 1) {
    showToast('⚠️', 'Không thể xóa cột cuối cùng')
    hideContextMenu()
    return
  }
  
  const col = columns[colIdx]
  // Delete data in this column
  rows.value.forEach(row => {
    delete cells.value[`${col}${row}`]
  })
  
  columns.splice(colIdx, 1)
  columnWidths.value.splice(colIdx, 1)
  hideContextMenu()
  showToast('✅', `Đã xóa cột ${col}`)
}

// Cell operations
let clipboard = ''

const copyCell = () => {
  const cellId = contextMenu.value.target
  clipboard = cells.value[cellId] || ''
  hideContextMenu()
  showToast('📄', 'Đã sao chép')
}

const pasteCell = () => {
  if (!clipboard) {
    showToast('⚠️', 'Clipboard trống')
    hideContextMenu()
    return
  }
  
  const cellId = contextMenu.value.target
  cells.value[cellId] = clipboard
  hideContextMenu()
  showToast('📋', 'Đã dán')
}

const clearCell = () => {
  const cellId = contextMenu.value.target
  delete cells.value[cellId]
  hideContextMenu()
  showToast('🧹', 'Đã xóa nội dung')
}

onMounted(() => {
  timerInterval = setInterval(() => {
    seconds++
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    timer.value = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }, 1000)
  
  // Close context menu on click outside
  document.addEventListener('click', hideContextMenu)
  
  setTimeout(() => {
    showToast('🤖', 'Chào mừng! Hover vào cell màu xanh để xem AI giải thích')
  }, 800)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
  if (tooltipTimer) clearTimeout(tooltipTimer)
  document.removeEventListener('click', hideContextMenu)
})
</script>


<style>
/* Import CSS không scoped để áp dụng cho toàn bộ component */
@import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@300;400;600;700&display=swap');
@import '../assets/practice.css';

/* Đảm bảo grid có border rõ ràng */
.excel-tutor table.grid {
  border-collapse: collapse !important;
  font-size: 12px;
  white-space: nowrap;
}

.excel-tutor .grid th,
.excel-tutor .grid td {
  border: 1px solid #d0d0d0 !important;
}

.excel-tutor .grid td {
  background: white;
}

.excel-tutor .grid th {
  background: #f2f2f2;
}

/* Resizable columns */
.resizable-header {
  position: relative;
  user-select: none;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: -3px;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  z-index: 10;
}

.resize-handle:hover {
  background: rgba(29, 111, 66, 0.3);
}

.resize-handle:active {
  background: rgba(29, 111, 66, 0.5);
}

/* Context Menu */
.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  min-width: 220px;
  padding: 6px 0;
  font-size: 13px;
}

.context-menu-item {
  padding: 10px 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  transition: background 0.1s;
}

.context-menu-item:hover {
  background: #f0f0f0;
}

.context-menu-item.danger {
  color: #dc2626;
}

.context-menu-item.danger:hover {
  background: #fef2f2;
}

.context-menu-item span {
  font-size: 16px;
}

.context-menu-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 4px 0;
}
</style>

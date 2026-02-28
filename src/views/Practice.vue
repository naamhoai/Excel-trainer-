<template>
  <div class="excel-tutor">
    <!-- 1. Top Title Bar -->
    <div class="title-bar">
      <div class="title-bar-left">
        <div class="app-icon">
          <el-icon><DataBoard /></el-icon>
        </div>
        <div class="logo">
          {{ task.title }} - Excel
        </div>
      </div>
      <div class="title-bar-center">
        <div class="search-box">
          <el-icon><Search /></el-icon>
          <input type="text" placeholder="Search (Alt+Q)" />
        </div>
      </div>
      <div class="title-bar-right">
        <div class="share-btn">
          <el-icon><Share /></el-icon> Share
        </div>
        <div style="cursor: pointer; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #e1dfdd; border-radius: 50%; color: #323130; font-weight: bold; font-size: 14px;">
          NA
        </div>
        <div class="win-btns" style="display:flex; gap: 8px; color: #605e5c; padding-left: 16px;">
           <el-icon style="cursor: pointer" :size="16" @click="$router.push('/')"><Close /></el-icon>
        </div>
      </div>
    </div>

    <!-- 2. Ribbon Tabs -->
    <div class="ribbon">
      <div class="ribbon-tabs">
        <button class="ribbon-tab file-tab">File</button>
        <button class="ribbon-tab active">Home</button>
        <button class="ribbon-tab">Insert</button>
        <button class="ribbon-tab">Draw</button>
        <button class="ribbon-tab">Page Layout</button>
        <button class="ribbon-tab">Formulas</button>
        <button class="ribbon-tab">Data</button>
        <button class="ribbon-tab">Review</button>
        <button class="ribbon-tab">View</button>
        <button class="ribbon-tab">Help</button>
      </div>

      <!-- 3. Ribbon Content (Home Tab) -->
      <div class="ribbon-content">
        <!-- Clipboard Group -->
        <div class="ribbon-group">
          <div class="ribbon-group-content">
            <button class="rbn-btn rbn-btn-large">
              <img src="https://img.icons8.com/color/48/paste.png" class="icon" style="width:24px;height:24px;" alt="paste"/>
              <span>Paste</span>
            </button>
            <div class="rbn-stack">
              <button class="rbn-btn rbn-btn-small" @click="copyCell"><el-icon class="icon"><Scissor /></el-icon> Cut</button>
              <button class="rbn-btn rbn-btn-small"><el-icon class="icon"><CopyDocument /></el-icon> Copy</button>
              <button class="rbn-btn rbn-btn-small"><el-icon class="icon"><Brush /></el-icon> Format Painter</button>
            </div>
          </div>
          <div class="ribbon-group-label">Clipboard</div>
          <div class="dialog-launcher"><el-icon><CopyDocument /></el-icon></div>
        </div>
        
        <!-- Font Group -->
        <div class="ribbon-group">
          <div class="ribbon-group-content" style="flex-direction: column; gap: 4px;">
            <div class="rbn-row">
              <div class="rbn-dropdown font-family"><span>Calibri</span><el-icon class="rbn-dropdown-arrow"><ArrowDown /></el-icon></div>
              <div class="rbn-dropdown font-size"><span>11</span><el-icon class="rbn-dropdown-arrow"><ArrowDown /></el-icon></div>
              <div class="rbn-row" style="margin-left: 4px;">
                 <button class="rbn-btn rbn-btn-small" style="font-weight:bold; font-size:12px;">A<sup style="font-size:8px">^</sup></button>
                 <button class="rbn-btn rbn-btn-small" style="font-weight:bold; font-size:10px;">A<sup style="font-size:7px">v</sup></button>
              </div>
            </div>
            <div class="rbn-row">
              <button class="rbn-btn rbn-btn-small" style="font-weight: bold;">B</button>
              <button class="rbn-btn rbn-btn-small" style="font-style: italic; font-family: serif;">I</button>
              <button class="rbn-btn rbn-btn-small flex items-center gap-0">
                <span style="text-decoration: underline;">U</span>
                <el-icon class="rbn-dropdown-arrow" style="margin-left:2px"><ArrowDown /></el-icon>
              </button>
              <div class="rbn-divider"></div>
              <button class="rbn-btn rbn-btn-small flex items-center gap-0">
                <el-icon><Grid /></el-icon>
                <el-icon class="rbn-dropdown-arrow" style="margin-left:2px"><ArrowDown /></el-icon>
              </button>
              <button class="rbn-btn rbn-btn-small rbn-color-btn" style="border-bottom-color: yellow;">
                <el-icon style="color: #605e5c;"><Brush /></el-icon>
              </button>
              <button class="rbn-btn rbn-btn-small rbn-color-btn flex items-center gap-0" style="border-bottom-color: #A4262C;">
                <span style="color: #A4262C; font-weight: bold;">A</span>
                <el-icon class="rbn-dropdown-arrow" style="margin-left:2px"><ArrowDown /></el-icon>
              </button>
            </div>
          </div>
          <div class="ribbon-group-label">Font</div>
          <div class="dialog-launcher"><el-icon><CopyDocument /></el-icon></div>
        </div>

        <!-- Alignment Group -->
        <div class="ribbon-group">
          <div class="ribbon-group-content">
             <div class="rbn-stack">
               <div class="rbn-row">
                 <button class="rbn-btn rbn-btn-small"><el-icon style="transform: rotate(180deg)"><Fold /></el-icon></button>
                 <button class="rbn-btn rbn-btn-small"><el-icon><Expand /></el-icon></button>
                 <button class="rbn-btn rbn-btn-small"><el-icon><Fold /></el-icon></button>
               </div>
               <div class="rbn-row">
                 <button class="rbn-btn rbn-btn-small"><el-icon style="transform: rotate(180deg)"><Notification /></el-icon></button>
                 <button class="rbn-btn rbn-btn-small"><el-icon><Menu /></el-icon></button>
                 <button class="rbn-btn rbn-btn-small"><el-icon><Notification /></el-icon></button>
               </div>
             </div>
             <div class="rbn-stack" style="margin-left: 4px;">
                <button class="rbn-btn rbn-btn-small"><el-icon class="icon"><Connection /></el-icon> Wrap Text</button>
                <button class="rbn-btn rbn-btn-small"><el-icon class="icon"><DataLine /></el-icon> Merge & Center <el-icon class="rbn-dropdown-arrow"><ArrowDown /></el-icon></button>
             </div>
          </div>
          <div class="ribbon-group-label">Alignment</div>
          <div class="dialog-launcher"><el-icon><CopyDocument /></el-icon></div>
        </div>

        <!-- Number Group -->
        <div class="ribbon-group">
          <div class="ribbon-group-content" style="flex-direction: column; gap: 4px;">
            <div class="rbn-dropdown" style="width: 140px; justify-content: space-between;"><span>General</span><el-icon class="rbn-dropdown-arrow"><ArrowDown /></el-icon></div>
            <div class="rbn-row">
              <button class="rbn-btn rbn-btn-small flex items-center gap-0">$ <el-icon class="rbn-dropdown-arrow" style="margin-left:2px"><ArrowDown /></el-icon></button>
              <button class="rbn-btn rbn-btn-small">%</button>
              <button class="rbn-btn rbn-btn-small" style="font-weight: bold;">,</button>
              <div class="rbn-divider"></div>
              <button class="rbn-btn rbn-btn-small" style="font-size: 10px;">.00<br>→0</button>
              <button class="rbn-btn rbn-btn-small" style="font-size: 10px;">.0<br>←00</button>
            </div>
          </div>
          <div class="ribbon-group-label">Number</div>
          <div class="dialog-launcher"><el-icon><CopyDocument /></el-icon></div>
        </div>

        <!-- Styles Group -->
        <div class="ribbon-group">
          <div class="ribbon-group-content">
            <button class="rbn-btn rbn-btn-large">
              <el-icon class="icon" style="color: #D83B01"><Memo /></el-icon>
              <span>Conditional<br>Formatting <el-icon class="rbn-dropdown-arrow" style="margin:0"><ArrowDown /></el-icon></span>
            </button>
            <button class="rbn-btn rbn-btn-large">
              <el-icon class="icon" style="color: #0078D4"><Grid /></el-icon>
              <span>Format as<br>Table <el-icon class="rbn-dropdown-arrow" style="margin:0"><ArrowDown /></el-icon></span>
            </button>
            <button class="rbn-btn rbn-btn-large">
              <el-icon class="icon" style="color: #0078D4"><Tickets /></el-icon>
              <span>Cell<br>Styles <el-icon class="rbn-dropdown-arrow" style="margin:0"><ArrowDown /></el-icon></span>
            </button>
          </div>
          <div class="ribbon-group-label">Styles</div>
        </div>
        
        <!-- Cells Group -->
        <div class="ribbon-group">
          <div class="ribbon-group-content">
            <button class="rbn-btn rbn-btn-large">
              <el-icon class="icon" style="color: #107C41"><Plus /></el-icon>
              <span>Insert <el-icon class="rbn-dropdown-arrow" style="margin:0"><ArrowDown /></el-icon></span>
            </button>
            <button class="rbn-btn rbn-btn-large">
              <el-icon class="icon" style="color: #A4262C"><Close /></el-icon>
              <span>Delete <el-icon class="rbn-dropdown-arrow" style="margin:0"><ArrowDown /></el-icon></span>
            </button>
            <button class="rbn-btn rbn-btn-large">
              <el-icon class="icon" style="color: #0078D4"><Grid /></el-icon>
              <span>Format <el-icon class="rbn-dropdown-arrow" style="margin:0"><ArrowDown /></el-icon></span>
            </button>
          </div>
          <div class="ribbon-group-label">Cells</div>
        </div>
        
        <!-- Editing Group -->
        <div class="ribbon-group">
          <div class="ribbon-group-content">
             <div class="rbn-stack">
               <button class="rbn-btn rbn-btn-small" style="justify-content:flex-start"><span style="font-size:16px; font-weight:bold; color:var(--excel-green); padding-right:4px;">∑</span> AutoSum <el-icon class="rbn-dropdown-arrow"><ArrowDown /></el-icon></button>
               <button class="rbn-btn rbn-btn-small" style="justify-content:flex-start"><el-icon class="icon" style="color:#0078D4"><ArrowDown /></el-icon> Fill <el-icon class="rbn-dropdown-arrow"><ArrowDown /></el-icon></button>
               <button class="rbn-btn rbn-btn-small" style="justify-content:flex-start"><el-icon class="icon" style="color:#D83B01"><Close /></el-icon> Clear <el-icon class="rbn-dropdown-arrow"><ArrowDown /></el-icon></button>
             </div>
             
             <div class="rbn-stack" style="margin-left:4px">
                <button class="rbn-btn rbn-btn-large" style="min-width: 50px">
                  <span style="font-size:18px">A<br/>Z</span>
                  <span>Sort &<br/>Filter <el-icon class="rbn-dropdown-arrow" style="margin:0"><ArrowDown /></el-icon></span>
                </button>
             </div>
             <div class="rbn-stack">
                <button class="rbn-btn rbn-btn-large" style="min-width: 50px">
                  <el-icon class="icon" style="font-size:20px"><Search /></el-icon>
                  <span>Find &<br/>Select <el-icon class="rbn-dropdown-arrow" style="margin:0"><ArrowDown /></el-icon></span>
                </button>
             </div>
          </div>
          <div class="ribbon-group-label">Editing</div>
        </div>

        <div class="flex-1"></div>
        <button class="share-btn" style="align-self: center; margin-right: 16px; height: 28px; background: var(--excel-green); color: white;">
          <el-icon><Share /></el-icon> Share
        </button>
      </div>
    </div>

    <!-- 4. Formula Bar -->
    <div class="formula-bar-container">
      <div class="name-box">
        {{ selectedCell || 'A1' }}
        <el-icon class="name-box-arrow"><ArrowDown /></el-icon>
      </div>
      <div class="formula-splitter">⋮</div>
      <div class="formula-btns">
         <div class="f-btn disabled">✕</div>
         <div class="f-btn disabled">✓</div>
      </div>
      <div class="fx-btn" @click="explainSelected" title="Insert Function (Explain with AI)">fx</div>
      <div class="formula-input-wrapper">
        <input type="text" v-model="formulaBar" @keyup.enter="applyFormula" />
        <div class="formula-dropdown-arrow"><el-icon><ArrowDown /></el-icon></div>
      </div>
    </div>

    <!-- 5. Main Content Area -->
    <div class="main-content">
      <!-- Workspace (Grid + Bottom Bars) -->
      <div class="workspace">
        <div class="grid-scroll-area">
          <table class="excel-grid">
            <thead>
              <tr>
                <th class="select-all-corner">
                   <div class="select-all-triangle"></div>
                </th>
                <th 
                  v-for="(col, idx) in columns" 
                  :key="col"
                  :style="{ width: columnWidths[idx] + 'px' }"
                  class="col-header"
                  :class="{'active-header': selectedCell.startsWith(col)}"
                  @contextmenu.prevent="showContextMenu($event, 'column', idx)"
                >
                  {{ col }}
                  <div class="resize-handle" @mousedown="startResize($event, idx)"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row">
                <td 
                  class="row-header"
                  :class="{'active-header': selectedCell.endsWith(String(row))}"
                  @contextmenu.prevent="showContextMenu($event, 'row', row)"
                >
                  {{ row }}
                </td>
                <td
                  v-for="(col, idx) in columns"
                  :key="`${col}${row}`"
                  class="cell"
                  :class="{'active-cell': `${col}${row}` === selectedCell, 'has-formula': isFormula(col, row)}"
                  :style="{ width: columnWidths[idx] + 'px', maxWidth: columnWidths[idx] + 'px' }"
                  @click="selectCell(col, row)"
                  @contextmenu.prevent="showContextMenu($event, 'cell', `${col}${row}`)"
                  @mouseenter="onCellHover(col, row, $event)"
                  @mouseleave="onCellLeave"
                >
                  <div class="cell-content-div" :class="getCellAlign(col, row)">
                    {{ getCellDisplay(col, row) }}
                  </div>
                  <div v-if="`${col}${row}` === selectedCell" class="fill-handle"></div>
                  <div v-if="isFormula(col, row)" class="formula-triangle"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 6. Bottom Sheet Tabs -->
        <div class="bottom-bar">
          <div class="sheet-nav-btns">
            <el-icon class="icon"><CaretLeft /></el-icon>
            <el-icon class="icon"><CaretRight /></el-icon>
          </div>
          <div class="sheet-tabs">
            <div class="sheet-tab active">Sheet1</div>
            <button class="add-sheet-btn"><el-icon><Plus /></el-icon></button>
          </div>
          <div class="scrollbar-spacer">
             <div class="horizontal-scroll-track">
                <div class="horizontal-scroll-thumb"></div>
             </div>
          </div>
        </div>
        
        <!-- 7. Status Bar -->
        <div class="status-bar">
          <div class="status-left">
            <span>Ready</span>
            <span style="display: flex; align-items: center; gap: 4px;"><el-icon><Warning /></el-icon> Accessibility: Good to go</span>
            <span style="color: #A78BFA; font-weight: 600; margin-left: 8px;">🤖 {{ timer }}</span>
          </div>
          <div class="status-right">
            <div class="view-controls">
              <el-icon class="view-icon active"><Grid /></el-icon>
              <el-icon class="view-icon"><Document /></el-icon>
              <el-icon class="view-icon"><CopyDocument /></el-icon>
            </div>
            <div class="zoom-controls">
               <el-icon style="cursor: pointer"><Minus /></el-icon>
               <div class="zoom-slider">
                 <div class="zoom-thumb"></div>
               </div>
               <el-icon style="cursor: pointer"><Plus /></el-icon>
               <span>100%</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Tutorial Panel Overlay -->
      <div class="tutorial-panel" :class="{ collapsed: !tutorialOpen }">
        <div class="tutorial-header">
          <div class="tutorial-header-left"><el-icon style="margin-right:8px; font-size:16px"><MagicStick /></el-icon> AI Tutor Panel</div>
          <button class="tut-close" @click="toggleTutorial"><el-icon><Close /></el-icon></button>
        </div>
        
        <div class="tutorial-body">
          <div class="lesson-card active">
            <div class="lesson-title">
              {{ task.title }}
            </div>
            <div class="lesson-desc">{{ task.description }}</div>
          </div>

          <div class="step-container">
            <div class="step-label">PRACTICE STEPS:</div>
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

          <!-- Exercise Section -->
          <div class="exercise-section" style="margin-top: 16px; border-radius: 4px; padding: 12px; border: 1px solid var(--border-color);">
            <div class="exercise-title"><el-icon style="margin-right:4px;"><Trophy /></el-icon> Evaluation</div>
            <div class="exercise-desc">{{ task.exerciseDesc }}</div>
            
            <div
              v-for="(ex, idx) in exercises"
              :key="idx"
              class="exercise-task"
            >
              <div class="task-check" :class="{ done: ex.done }"></div>
              <div v-html="ex.text"></div>
            </div>

            <button class="check-btn" @click="checkExercise">Run Grader</button>
            
            <div v-if="showScore" class="score-badge">
              Score: {{ score }}/{{ exercises.length }} — {{ scoreMessage }}
            </div>
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
        <div class="context-menu-item" @click="insertRowAbove">Insert row above</div>
        <div class="context-menu-item" @click="insertRowBelow">Insert row below</div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item danger" @click="deleteRow">Delete row</div>
      </template>
      
      <template v-if="contextMenu.type === 'column'">
        <div class="context-menu-item" @click="insertColumnLeft">Insert column left</div>
        <div class="context-menu-item" @click="insertColumnRight">Insert column right</div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item danger" @click="deleteColumn">Delete column</div>
      </template>
      
      <template v-if="contextMenu.type === 'cell'">
        <div class="context-menu-item" @click="copyCell">
           <el-icon><CopyDocument /></el-icon> Copy
        </div>
        <div class="context-menu-item" @click="pasteCell">
           <el-icon><DocumentCopy /></el-icon> Paste
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" @click="clearCell">
           <el-icon><Delete /></el-icon> Clear contents
        </div>
      </template>
    </div>

    <!-- AI Tooltip -->
    <div
      class="ai-tooltip"
      :class="{ visible: tooltipVisible }"
      :style="tooltipStyle"
    >
      <button class="ai-tooltip-close" @click="closeTooltip"><el-icon><Close /></el-icon></button>
      <div class="ai-tooltip-header">🤖 {{ tooltipTitle }}</div>
      <div class="ai-tooltip-formula">{{ tooltipFormula }}</div>
      <div class="ai-tooltip-body" v-html="tooltipBody"></div>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">
      <span>{{ toastIcon }}</span>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DataBoard, Search, Share, Close, MagicStick, DocumentCopy, CopyDocument, Scissor, Brush,
  ArrowDown, Grid, Fold, Expand, Notification, Menu, Connection, DataLine, 
  Memo, Tickets, ChatDotRound, CircleCheck, CaretLeft, CaretRight, Plus, Warning, Document, 
  Minus, Trophy, Delete
} from '@element-plus/icons-vue'

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
  title: route.query.title || 'Book1',
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

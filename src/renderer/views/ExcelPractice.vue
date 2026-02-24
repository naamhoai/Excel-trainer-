
<template>
  <div class="excel-env">
    <!-- Top Bar / File Header -->
    <header class="excel-header">
      <div class="header-left">
        <button class="icon-btn back-btn" @click="goBack">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div class="file-name">
          <span class="file-title">Bài tập: {{ exerciseTitle }}</span>
          <span class="file-status">Đang tự động lưu...</span>
        </div>
      </div>
      <div class="header-right">
        <button class="submit-btn" @click="submitSolution">Nộp bài</button>
      </div>
    </header>

    <!-- Excel Ribbon -->
    <div class="excel-ribbon">
      <div class="ribbon-tabs">
        <div v-for="tab in tabs" :key="tab" :class="['ribbon-tab', { active: currentTab === tab }]" @click="currentTab = tab">
          {{ tab }}
        </div>
      </div>
      <div class="ribbon-content">
        <div class="ribbon-group">
          <button class="ribbon-tool"><div class="ribbon-icon">B</div></button>
          <button class="ribbon-tool italic"><div class="ribbon-icon">I</div></button>
          <button class="ribbon-tool underline"><div class="ribbon-icon">U</div></button>
        </div>
        <div class="ribbon-divider"></div>
        <div class="ribbon-group">
          <button class="ribbon-tool formula-sum">∑ Sum</button>
          <button class="ribbon-tool">Avg</button>
        </div>
      </div>
    </div>

    <!-- Formula Bar -->
    <div class="formula-bar">
      <div class="cell-address">{{ selectedCell || 'A1' }}</div>
      <div class="formula-fx">fx</div>
      <div class="formula-input">
        <input type="text" v-model="currentFormula" placeholder="Nhập công thức tại đây..." />
      </div>
    </div>

    <div class="workspace">
      <!-- Instruction Side Panel -->
      <aside class="instruction-panel" :class="{ collapsed: isCollapsed }">
        <div class="panel-header">
          <h3>Hướng dẫn</h3>
          <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
            {{ isCollapsed ? '»' : '«' }}
          </button>
        </div>
        <div class="panel-body" v-if="!isCollapsed">
          <div class="task-card">
            <p><strong>Yêu cầu:</strong> Tính tổng doanh thu quý 1 tại ô <span class="highlight">B10</span>.</p>
            <p class="hint">Gợi ý: Sử dụng hàm <code>=SUM(B2:B9)</code></p>
          </div>
          <div class="progress-section">
            <span class="progress-label">Tiến trình</span>
            <div class="progress-container">
              <div class="progress-bar" style="width: 40%"></div>
            </div>
            <span class="progress-percent">40% hoàn thành</span>
          </div>
        </div>
      </aside>

      <!-- Spreadsheet Area -->
      <div class="spreadsheet-container">
        <table class="excel-grid">
          <thead>
            <tr>
              <th class="corner-cell"></th>
              <th v-for="col in columns" :key="col" class="col-header">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row">
              <td class="row-header">{{ row }}</td>
              <td 
                v-for="col in columns" :key="col" 
                :class="['cell', { selected: selectedCell === `${col}${row}` }]"
                @click="selectCell(`${col}${row}`)"
              >
                <input 
                  type="text" 
                  v-model="cells[`${col}${row}`]"
                  @focus="selectCell(`${col}${row}`)"
                  class="cell-input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Celebration Modal (Simplified) -->
    <div v-if="showSuccess" class="modal-overlay">
      <div class="success-modal">
        <div class="confetti">🎉</div>
        <h2>Tuyệt vời!</h2>
        <p>Bạn đã hoàn thành bài tập với số điểm tối đa.</p>
        <button class="next-btn" @click="goBack">Quay lại Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExcelPractice',
  data() {
    return {
      exerciseTitle: 'Hàm SUM cơ bản',
      columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
      rows: Array.from({ length: 30 }, (_, i) => i + 1),
      cells: {},
      selectedCell: 'A1',
      currentFormula: '',
      tabs: ['Home', 'Insert', 'Page Layout', 'Formulas', 'Data'],
      currentTab: 'Home',
      isCollapsed: false,
      showSuccess: false
    }
  },
  methods: {
    selectCell(cell) {
      this.selectedCell = cell
      this.currentFormula = this.cells[cell] || ''
    },
    goBack() {
      this.$router.push('/dashboard')
    },
    submitSolution() {
      // Mock validation logic
      this.showSuccess = true
    }
  }
}
</script>

<style scoped>
.excel-env {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

/* Header */
.excel-header {
  height: 48px;
  background: #107c41; /* Official Excel Green */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  -webkit-app-region: drag;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  -webkit-app-region: no-drag;
}

.back-btn {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
}

.file-name {
  display: flex;
  flex-direction: column;
}

.file-title {
  font-size: 14px;
  font-weight: 600;
}

.file-status {
  font-size: 10px;
  opacity: 0.8;
}

.submit-btn {
  background: #3ecf8e;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  -webkit-app-region: no-drag;
}

/* Ribbon */
.excel-ribbon {
  background: #f3f2f1;
  border-bottom: 1px solid #edebe9;
}

.ribbon-tabs {
  display: flex;
  padding-left: 16px;
}

.ribbon-tab {
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.ribbon-tab.active {
  background: white;
  border-bottom-color: #107c41;
  font-weight: 600;
}

.ribbon-content {
  height: 80px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
}

.ribbon-group {
  display: flex;
  gap: 4px;
}

.ribbon-tool {
  background: none;
  border: 1px solid transparent;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.ribbon-tool:hover {
  background: #f3f2f1;
}

.ribbon-icon {
  font-weight: 800;
  font-size: 16px;
}

.ribbon-divider {
  width: 1px;
  height: 40px;
  background: #edebe9;
}

/* Formula Bar */
.formula-bar {
  display: flex;
  align-items: center;
  height: 32px;
  background: white;
  border-bottom: 1px solid #edebe9;
}

.cell-address {
  width: 60px;
  text-align: center;
  font-size: 13px;
  border-right: 1px solid #edebe9;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.formula-fx {
  width: 32px;
  text-align: center;
  font-family: serif;
  font-style: italic;
  font-weight: bold;
  color: #888;
}

.formula-input {
  flex: 1;
  height: 100%;
}

.formula-input input {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0 8px;
  font-size: 13px;
  outline: none;
}

/* Workspace */
.workspace {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.instruction-panel {
  width: 280px;
  background: #f9fafb;
  border-right: 1px solid #edebe9;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.instruction-panel.collapsed {
  width: 48px;
}

.panel-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #edebe9;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #107c41;
}

.collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #107c41;
}

.panel-body {
  padding: 16px;
  overflow-y: auto;
}

.task-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5ece8;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.task-card p {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.highlight {
  background: #dcfce7;
  color: #166534;
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 600;
}

.hint {
  font-size: 13px;
  color: #666;
  border-top: 1px dashed #eee;
  padding-top: 12px;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #888;
}

.progress-container {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #3ecf8e;
}

.progress-percent {
  font-size: 12px;
  color: #3ecf8e;
  font-weight: 700;
  text-align: right;
}

/* Grid */
.spreadsheet-container {
  flex: 1;
  overflow: auto;
  background: #f3f2f1;
}

.excel-grid {
  border-collapse: collapse;
  background: white;
}

.corner-cell {
  background: #f3f2f1;
  width: 40px;
  border: 1px solid #edebe9;
}

.col-header {
  background: #f3f2f1;
  height: 24px;
  min-width: 100px;
  border: 1px solid #edebe9;
  font-size: 11px;
  color: #666;
  font-weight: normal;
  text-align: center;
}

.row-header {
  background: #f3f2f1;
  width: 40px;
  border: 1px solid #edebe9;
  font-size: 11px;
  color: #666;
  text-align: center;
}

.cell {
  border: 1px solid #edebe9;
  position: relative;
  padding: 0;
}

.cell.selected {
  outline: 2px solid #107c41;
  z-index: 10;
}

.cell-input {
  width: 100%;
  height: 100%;
  border: none;
  padding: 4px 8px;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;
}

/* Modal */
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.success-modal {
  background: white;
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.confetti {
  font-size: 48px;
  margin-bottom: 16px;
}

.success-modal h2 {
  color: #107c41;
  margin: 0 0 12px 0;
}

.success-modal p {
  color: #666;
  margin-bottom: 24px;
}

.next-btn {
  background: #107c41;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
</style>

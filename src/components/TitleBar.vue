<template>
  <div class="custom-titlebar">
    <div class="titlebar-left">
      <span class="titlebar-title">Excel Tutor</span>
    </div>
    <div class="titlebar-right">
      <div class="titlebar-btn" @click="minimize">
        <svg viewBox="0 0 10 1" width="10" height="1"><rect width="10" height="1" fill="currentColor"/></svg>
      </div>
      <div class="titlebar-btn" @click="maximize">
        <svg viewBox="0 0 10 10" width="10" height="10"><path d="M0,0v10h10V0H0z M9,9H1V1h8V9z" fill="currentColor"/></svg>
      </div>
      <div class="titlebar-btn close-btn" @click="close">
        <svg viewBox="0 0 10 10" width="10" height="10"><path d="M10,1L9,0L5,4L1,0L0,1l4,4l-4,4l1,1l4-4l4,4l1-1l-4-4L10,1z" fill="currentColor"/></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const ipcRenderer = window.require ? window.require('electron').ipcRenderer : require('electron').ipcRenderer;

const minimize = () => {
  if (ipcRenderer) ipcRenderer.send('window-minimize')
}

const maximize = () => {
  if (ipcRenderer) ipcRenderer.send('window-maximize')
}

const close = () => {
  if (ipcRenderer) ipcRenderer.send('window-close')
}
</script>

<style scoped>
.custom-titlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  background-color: #212121; /* Match the dark theme from the screenshot roughly */
  color: #cccccc;
  -webkit-app-region: drag;
  user-select: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  flex-shrink: 0;
  z-index: 9999;
}

.titlebar-left {
  display: flex;
  align-items: center;
  padding-left: 14px;
}

.titlebar-title {
  font-weight: 400;
  letter-spacing: 0.5px;
}

.titlebar-right {
  display: flex;
  height: 100%;
  -webkit-app-region: no-drag;
}

.titlebar-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 100%;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.titlebar-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.titlebar-btn.close-btn:hover {
  background-color: #e81123;
  color: white;
}
</style>

<template>
  <div class="app-container">
    <TitleBar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import TitleBar from './components/TitleBar.vue'
</script>

<style>
/* Global flex layout for the app to allow titlebar to sit at the top */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #121212; /* Default dark mode background */
}

.main-content {
  flex: 1;
  overflow: auto;
  position: relative;
}
</style>

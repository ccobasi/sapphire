<template>
  <div class="main-container">
    <Sidebar v-if="!isLoginPage" />
    <div class="main">
      <TopNavbar v-if="!isLoginPage" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import TopNavbar from './components/TopNavbar.vue';

const route = useRoute();
const isLoginPage = computed(() => route.name === 'login');
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  background: var(--background);
  justify-content: flex-start;
  min-height: 100vh;
  width: 100dvw
}

.main {
  background: var(--background);
  width: 100%;
  height: 100dvh;
  overflow-y: auto;

}

@media screen and (max-width: 768px) {
  .main {
    padding: 20px;
  }
}
</style>

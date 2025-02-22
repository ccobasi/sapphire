<template>
  <div class="login-page">
    <div class="logo">
      <span class="bracket">[ ]</span> Sapphire HR
    </div>
    <div class="login-box">
      <div class="login-header">
        <span class="bracket">[ ]</span> Sapphire HR
        <p class="welcome-text">You're Welcome</p>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" placeholder="Email Address" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Password" required>
          <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p class="apply-text">Already an applicant? <a href="#">Click Here</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Reactive data
const email = ref('');
const password = ref('');

// Router
const router = useRouter();

// Methods
const login = () => {
  // Redirect to dashboard without authentication
  router.push({ name: 'dashboard' });
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2A70C7;
  color: white;
  font-family: Arial, sans-serif;
}

.logo {
  font-size: 24px;
  margin-bottom: 50px;
}

.bracket {
  color: white;
  font-weight: bold;
}

.login-box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.welcome-text {
  color: #2A70C7;
  font-size: 14px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.forgot-password {
  float: right;
  font-size: 12px;
  color: #2A70C7;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #FFA500;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #FF8C00;
}

.apply-text {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
}

.apply-text a {
  color: #2A70C7;
  text-decoration: none;
}

.apply-text a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-box {
    width: 90%;
  }
}
</style>


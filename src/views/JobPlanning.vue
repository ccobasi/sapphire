<template>
  <div class="job-planning">
    <h2>Job Planning</h2>
    <JobDescriptionWizard @submit="handleSubmit" />
  </div>
</template>

<script setup>
import JobDescriptionWizard from '../views/JobDescriptionWizard.vue';

const handleSubmit = (jobDescription) => {
  // API call to save job description
  console.log('Job Description Submitted:', jobDescription);
  // Implement actual API call here
};
</script>

<style scoped>
.job-planning {
  padding: 20px;
}
</style>
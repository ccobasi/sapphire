<template>
  <form @submit.prevent="submit">
    <label for="jobFunction">Job Function:</label>
    <select id="jobFunction" v-model="job.jobFunction" required>
      <option value="">Select Job Function</option>
      <!-- Add options dynamically from data or API -->
    </select>

    <label for="jobFamily">Job Family:</label>
    <select id="jobFamily" v-model="job.jobFamily" required>
      <option value="">Select Job Family</option>
      <!-- Add options dynamically from data or API -->
    </select>

    <label for="reportsTo">Job Reports To:</label>
    <input id="reportsTo" v-model="job.reportsTo" type="text" required />

    <label for="careerType">Career Type:</label>
    <select id="careerType" v-model="job.careerType" required>
      <option value="">Select Career Type</option>
      <!-- Add options dynamically from data or API -->
    </select>

    <button type="submit">Update</button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue';

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update']);

const job = reactive({ ...props.job });

const submit = () => {
  emit('update', job);
};
</script>

<style scoped>
/* Add styling as needed */
</style>
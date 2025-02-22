<template>
  <form @submit.prevent="submit">
    <!-- Qualifications -->
    <div v-for="(qual, index) in job.qualifications" :key="index">
      <label :for="'qualification' + index">Qualification {{ index + 1 }}:</label>
      <input :id="'qualification' + index" v-model="qual.title" type="text" required />
    </div>

    <!-- Experience -->
    <div v-for="(exp, index) in job.experience" :key="index">
      <label :for="'experience' + index">Experience {{ index + 1 }}:</label>
      <input :id="'experience' + index" v-model="exp.description" type="text" required />
    </div>

    <button @click.prevent="addQualification">Add Qualification</button>
    <button @click.prevent="addExperience">Add Experience</button>
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

const job = reactive({
  ...props.job,
  qualifications: props.job.qualifications || [{ title: '' }],
  experience: props.job.experience || [{ description: '' }]
});

const addQualification = () => {
  job.qualifications.push({ title: '' });
};

const addExperience = () => {
  job.experience.push({ description: '' });
};

const submit = () => {
  emit('update', { qualifications: job.qualifications, experience: job.experience });
};
</script>

<style scoped>
/* Add styling as needed */
</style>
<template>
  <form @submit.prevent="submit">
    <!-- Behavioral Competencies -->
    <div v-for="(comp, index) in job.behavioralCompetencies" :key="index">
      <label :for="'behavioral' + index">Behavioral Competency {{ index + 1 }}:</label>
      <input :id="'behavioral' + index" v-model="comp.label" type="text" required />
      <textarea v-model="comp.description"></textarea>
    </div>

    <!-- Technical Competencies -->
    <div v-for="(comp, index) in job.technicalCompetencies" :key="index">
      <label :for="'technical' + index">Technical Competency {{ index + 1 }}:</label>
      <input :id="'technical' + index" v-model="comp.label" type="text" required />
      <textarea v-model="comp.description"></textarea>
      <input v-model="comp.proficiency" type="text" placeholder="Proficiency Level" />
    </div>

    <button @click.prevent="addBehavioralCompetency">Add Behavioral Competency</button>
    <button @click.prevent="addTechnicalCompetency">Add Technical Competency</button>
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
  behavioralCompetencies: props.job.behavioralCompetencies || [{ label: '', description: '' }],
  technicalCompetencies: props.job.technicalCompetencies || [{ label: '', description: '', proficiency: '' }]
});

const addBehavioralCompetency = () => {
  job.behavioralCompetencies.push({ label: '', description: '' });
};

const addTechnicalCompetency = () => {
  job.technicalCompetencies.push({ label: '', description: '', proficiency: '' });
};

const submit = () => {
  emit('update', {
    behavioralCompetencies: job.behavioralCompetencies,
    technicalCompetencies: job.technicalCompetencies
  });
};
</script>

<style scoped>
/* Add styling as needed */
</style>
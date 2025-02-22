<template>
  <form @submit.prevent="submit">
    <div v-for="(group, index) in job.responsibilities" :key="index">
      <label :for="'outputGroup' + index">Output Group {{ index + 1 }}:</label>
      <input :id="'outputGroup' + index" v-model="group.title" type="text" required />
      <label :for="'outputsMeasures' + index">Outputs and Measures:</label>
      <textarea :id="'outputsMeasures' + index" v-model="group.details" required></textarea>
    </div>
    <button @click.prevent="addResponsibility">Add Responsibility</button>
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
  responsibilities: props.job.responsibilities || [{ title: '', details: '' }]
});

const addResponsibility = () => {
  job.responsibilities.push({ title: '', details: '' });
};

const submit = () => {
  emit('update', { responsibilities: job.responsibilities });
};
</script>

<style scoped>
/* Add styling as needed */
</style>
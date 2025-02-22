<template>
  <form @submit.prevent="submit">
    <div v-for="(report, index) in job.directReports" :key="index">
      <label :for="'directReport' + index">Direct Report {{ index + 1 }}:</label>
      <input :id="'directReport' + index" v-model="report.title" type="text" required />
      <input v-model="report.number" type="number" required />
    </div>

    <div v-for="(report, index) in job.indirectReports" :key="index">
      <label :for="'indirectReport' + index">Indirect Report {{ index + 1 }}:</label>
      <input :id="'indirectReport' + index" v-model="report.family" type="text" required />
      <input v-model="report.number" type="number" required />
    </div>

    <button @click.prevent="addDirectReport">Add Direct Report</button>
    <button @click.prevent="addIndirectReport">Add Indirect Report</button>
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
  directReports: props.job.directReports || [{ title: '', number: 0 }],
  indirectReports: props.job.indirectReports || [{ family: '', number: 0 }]
});

const addDirectReport = () => {
  job.directReports.push({ title: '', number: 0 });
};

const addIndirectReport = () => {
  job.indirectReports.push({ family: '', number: 0 });
};

const submit = () => {
  emit('update', {
    directReports: job.directReports,
    indirectReports: job.indirectReports
  });
};
</script>

<style scoped>
/* Add styling as needed */
</style>
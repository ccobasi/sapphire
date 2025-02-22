<template>
  <div class="job-description-wizard">
    <div v-if="currentStep === 1">
      <JobIdentifiers :job="job" @update="updateJob" />
      <button @click="nextStep">Next</button>
    </div>
    <div v-else-if="currentStep === 2">
      <JobStructures :job="job" @update="updateJob" />
      <button @click="prevStep">Back</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-else-if="currentStep === 3">
      <JobResponsibilities :job="job" @update="updateJob" />
      <button @click="prevStep">Back</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-else-if="currentStep === 4">
      <JobRequirements :job="job" @update="updateJob" />
      <button @click="prevStep">Back</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-else-if="currentStep === 5">
      <JobCompetencies :job="job" @update="updateJob" />
      <button @click="prevStep">Back</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-else-if="currentStep === 6">
      <JobAdditionalDimensions :job="job" @update="updateJob" />
      <button @click="prevStep">Back</button>
      <button @click="submitForm">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import JobIdentifiers from '../views/JobIdentifiers.vue';
import JobStructures from '../views/JobStructures.vue';
import JobResponsibilities from '../views/JobResponsibilities.vue';
import JobRequirements from '../views/JobRequirements.vue';
import JobCompetencies from '../views/JobCompetencies.vue';
import JobAdditionalDimensions from '../views/JobAdditionalDimensions.vue';

const job = ref({
  title: '',
  //... other fields initialized here
});

const currentStep = ref(1);

const nextStep = () => {
  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};

const updateJob = (data) => {
  job.value = { ...job.value, ...data };
};

const submitForm = () => {
  // Emit 'submit' event with the job data
  emit('submit', job.value);
};

const emit = defineEmits(['submit']);
</script>

<style scoped>
/* Style for each step, buttons, and layout */
.job-description-wizard {
  max-width: 800px;
  margin: auto;
}
</style>
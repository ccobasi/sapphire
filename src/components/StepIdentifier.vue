<template>
  <div>
    <h3>Job Identifiers</h3>

    <!-- Job Title -->
    <div class="mb-3">
      <label for="jobTitle" class="form-label">Job Title</label>
      <input
        type="text"
        id="jobTitle"
        class="form-control"
        v-model="formData.jobTitle"
        placeholder="Enter job title"
        required
      />
    </div>

    <!-- Job Code -->
    <div class="mb-3">
      <label for="jobCode" class="form-label">Job Code</label>
      <input
        type="text"
        id="jobCode"
        class="form-control"
        v-model="formData.jobCode"
        placeholder="Enter job code"
        required
      />
    </div>

    <!-- Alternative Job Titles -->
    <div class="mb-3">
      <label class="form-label">Alternative Job Titles</label>
      <div v-for="(altTitle, index) in formData.altJobTitles" :key="index" class="d-flex align-items-center mb-2">
        <input
          type="text"
          class="form-control"
          v-model="formData.altJobTitles[index]"
          placeholder="Enter alternative title"
        />
        <button
          type="button"
          class="btn btn-danger ms-2"
          @click="removeAltTitle(index)"
          v-if="formData.altJobTitles.length > 1"
        >
          Remove
        </button>
      </div>
      <button type="button" class="btn btn-outline-primary" @click="addAltTitle">
        Add Another Title
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Props
defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

// Emit Events
const emit = defineEmits(["add-alt-title"]);

// Methods
const addAltTitle = () => emit("add-alt-title");
const removeAltTitle = (index) => formData.altJobTitles.splice(index, 1);
</script>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import TableOne from '../components/TableOne.vue';
import { authStore } from "../store/store";

const store = authStore();
const showModal = ref(false);
const isEdit = ref(false);
const currentEditIndex = ref(null);
const filter = ref("All");

const applications = ref([
  {
    name: 'Adebayo Jamal',
    vacancy: "Sales Officer",
    status_reason: "Negotiation",
    test: "Passed",
    expected_salary: "200,000",
    received_on: "28/05/2025",
    cv: "adebayo_jamal_cv.pdf",
  },
  {
    name: 'Jane Doe',
    vacancy: "Marketing Specialist",
    status_reason: "Shortlisted",
    test: "Passed",
    expected_salary: "250,000",
    received_on: "29/05/2025",
    cv: "jane_doe_cv.pdf",
  },
  {
    name: 'Jake Solevan',
    vacancy: "Driver",
    status_reason: "Not reviewed",
    test: "Not Taken",
    expected_salary: "150,000",
    received_on: "2025-02-25",
    cv: null,
  },
]);

const newApplication = ref({
  name: '',
  vacancy: '',
  status_reason: '',
  test: '',
  expected_salary: '',
  received_on: '',
  cv: null,
});

const editApplication = (index) => {
  const app = { ...applications.value[index] };
  newApplication.value = app;
  currentEditIndex.value = index;
  isEdit.value = true;
  showModal.value = true;
};

const addOrUpdateApplication = () => {
  if (!newApplication.value.name || !newApplication.value.vacancy) {
    alert('Name and Vacancy are required');
    return;
  }

  const applicationData = { ...newApplication.value };
  
  if (isEdit.value && currentEditIndex.value !== null) {
    applications.value[currentEditIndex.value] = applicationData;
  } else {
    applications.value.push(applicationData);
  }

  resetForm();
  showModal.value = false;
};

const resetForm = () => {
  newApplication.value = {
    name: '',
    vacancy: '',
    status_reason: '',
    test: '',
    expected_salary: '',
    received_on: '',
    cv: null,
  };
  isEdit.value = false;
  currentEditIndex.value = null;
};

const cancelEdit = () => {
  resetForm();
  showModal.value = false;
};

const filteredApplications = computed(() => {
  if (filter.value === "All") {
    return applications.value || [];
  }
  return (applications.value || []).filter(app => app?.status_reason === filter.value);
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  newApplication.value.cv = file ? file.name : null;
};

onMounted(() => {
  store.currentpage = 'applications';
  store.showSidebar = false;
});

watch(filteredApplications, (newVal) => {
  console.log('filteredApplications:', newVal);
});
</script>

<template>
  <div class="vacancies mt-4">
    <div class="heading">
      <div class="title">
        <h1>Applications</h1>
        <p>Here's all your Applications</p>
      </div>
      <button @click="showModal = true" class="btn primary">Add Application</button>
    </div>

    <div class="selector-options">
      <button v-for="option in ['All', 'Shortlisted', 'Medical', 'Accepted', 'Interview Scheduling', 'Test', 'Interview', 'Negotiation', 'Rejected']" :key="option" :class="['btn option', { active: filter === option }]" @click="filter = option">
        {{ option }}
      </button>
    </div>

    <div class="row" v-if="filteredApplications && filteredApplications.length !== undefined">
      <TableOne :tableData="filteredApplications" :headings="['Name', 'Vacancy', 'Status Reason', 'Test', 'Expected Salary', 'Received On', 'CV', 'Actions']" tableType="applications" @editItem="editApplication">
        <template #cv="{ item }">
          <div v-if="item && item.cv">
            <a :href="`/path/to/cv/${item.cv}`" target="_blank" class="btn small">Download CV</a>
          </div>
          <div v-else>
            <span>No CV Uploaded</span>
          </div>
        </template>
        <template #actions="{ index }">
          <button class="btn small" @click="editApplication(index)">Edit</button>

        </template>
      </TableOne>
    </div>
    <div v-else>
      <p>Loading applications or no data available...</p>
    </div>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <div class="top-section d-flex justify-content-between mt-4">
          <h3 class="title">{{ isEdit ? 'Edit Application' : 'Add New Application' }}</h3>
          <div class="close-button" @click="cancelEdit">
            <iconify-icon icon="material-symbols:close" width="24" height="24"></iconify-icon>
          </div>
        </div>

        <div class="main">
          <div class="page split">
            <div class="lhs">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="newApplication.name" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <label for="vacancy">Vacancy</label>
                <input type="text" v-model="newApplication.vacancy" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <label for="status_reason">Status Reason</label>
                <select v-model="newApplication.status_reason" class="form-control">
                  <option value="Not Reviewed">Not Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Medical">Medical</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduling">Interview Scheduling</option>
                  <option value="Test">Test</option>
                  <option value="Interview">Interview</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Reject">Reject</option>
                </select>
              </div>
            </div>
            <div class="rhs">
              <div class="form-group">
                <label for="test">Test</label>
                <select v-model="newApplication.test" class="form-control">
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                  <option value="Not Taken">Not Taken</option>
                </select>
              </div>
              <div class="form-group mt-2">
                <label for="expected_salary">Expected Salary</label>
                <input type="number" v-model="newApplication.expected_salary" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <label for="received_on">Received On</label>
                <input type="date" v-model="newApplication.received_on" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <label for="attach_cv">Attach CV</label>
                <input type="file" @change="handleFileUpload" class="form-control" />
              </div>
            </div>
          </div>
          <div class="save-button">
            <button class="btn btn-primary" @click="addOrUpdateApplication">
              {{ isEdit ? 'Update' : 'Submit' }}
            </button>
            <button class="btn btn-secondary ml-2" @click="cancelEdit">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vacancies {
  padding: 20px;
}

.vacancies .heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Satoshi", sans-serif;
}

.primary {
  background-color: var(--primary);
  color: white;
  font-family: "Satoshi", sans-serif;
}

.small {
  color: var(--primary);
}

.selector-options {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  font-family: "Satoshi", sans-serif;
}

.selector-options .btn {
  padding: 10px 15px;
  cursor: pointer;
}

.selector-options .btn.active {
  background-color: var(--primary);
  color: white;
}

.row {
  margin-top: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  border-radius: 10px;
}

.split {
  display: flex;
  gap: 15px;
}

.close-button {
  cursor: pointer;
  font-size: 20px;
}

.save-button {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.ml-2 {
  margin-left: 10px;
}

@media (max-width: 768px) {
  .vacancies .heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .selector-options {
    flex-wrap: wrap;
  }

  .split {
    flex-direction: column;
  }
}
</style>
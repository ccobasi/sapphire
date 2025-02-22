<template>
  <div class="container">
    <div class="first">
        <div class="header">
        <h2 class="my-4">Disciplinary Case</h2>
    <p>Dashboard / Disciplinary Case</p>
    </div>
    <button class="btn btn-primary mb-3" id="add" @click="showModal = true">
      + Add Disciplinary Case
    </button>

    </div>
    <!-- Add Disciplinary Case Modal -->
     <div v-if="showModal" class="modal-overlay">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Disciplinary Case</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="title" class="form-label">Title *</label>
                <input type="text" id="title" class="form-control" v-model="form.title" required />
              </div>

              <div class="mb-3">
                <label for="accusedEmployees" class="form-label">Add Accused Employee</label>
                <div class="d-flex">
                  <select class="form-select" multiple v-model="availableEmployees">
                    <option v-for="employee in employees" :key="employee">{{ employee }}</option>
                  </select>

                  <div class="d-flex flex-column mx-3">
                    <button type="button" class="btn btn-outline-primary mb-2" @click="moveSelectedEmployees">></button>
                    <button type="button" class="btn btn-outline-primary" @click="removeSelectedEmployees"><</button>
                  </div>

                  <select class="form-select" multiple v-model="selectedEmployees">
                    <option v-for="employee in selectedEmployees" :key="employee">{{ employee }}</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label for="dateOfEvent" class="form-label">Date of Event *</label>
                <input type="date" id="dateOfEvent" class="form-control" v-model="form.dateOfEvent" required />
              </div>

              <div class="mb-3">
                <label for="accusation" class="form-label">Accusation *</label>
                <textarea id="accusation" class="form-control" v-model="form.accusation" required></textarea>
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Disciplinary Case Table -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Reporting Employees</th>
          <th>Accused Employees</th>
          <th>Accusation Title</th>
          <th>Date of Event</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="caseItem in disciplinaryCases" :key="caseItem.id">
          <td>{{ caseItem.reportingEmployee }}</td>
          <td>{{ caseItem.accusedEmployees.join(', ') }}</td>
          <td>{{ caseItem.accusationTitle }}</td>
          <td>{{ caseItem.dateOfEvent }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "../store/store";


const store = authStore();
const tab = ref(1);

const showModal = ref(false);
const employees = ref([
  "Codeware GM Testing",
  "Codeware Lazarus",
  "Codeware Dummy (Testing)",
  "Codeware Dummy Rank",
  "Codeware Dummy (TESTING2)",
  "Codeware Testing",
]);

const availableEmployees = ref([]);
const selectedEmployees = ref([]);
const disciplinaryCases = ref([
  {
    id: 1,
    reportingEmployee: "Codeware Dummy (Testing)",
    accusedEmployees: ["Codeware Dummy (Testing)"],
    accusationTitle: "Battery",
    dateOfEvent: "8/22/2024",
  },
  {
    id: 2,
    reportingEmployee: "Codeware Dummy (Testing)",
    accusedEmployees: ["Codeware Lazarus"],
    accusationTitle: "Assault",
    dateOfEvent: "2/16/2024",
  },
]);

const form = ref({
  title: "",
  dateOfEvent: "",
  accusation: "",
});

const moveSelectedEmployees = () => {
  selectedEmployees.value.push(...availableEmployees.value);
  availableEmployees.value = [];
};

const removeSelectedEmployees = () => {
  availableEmployees.value.push(...selectedEmployees.value);
  selectedEmployees.value = [];
};

const submitForm = () => {
  const newCase = {
    id: disciplinaryCases.value.length + 1,
    reportingEmployee: "SYSTEM", // Example default
    accusedEmployees: selectedEmployees.value,
    accusationTitle: form.value.title,
    dateOfEvent: form.value.dateOfEvent,
  };
  disciplinaryCases.value.push(newCase);
  resetForm();
  showModal.value = false;
};

const resetForm = () => {
  form.value = { title: "", dateOfEvent: "", accusation: "" };
  selectedEmployees.value = [];
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(() => {
  store.currentpage = 'disciplinary-case';
  store.showSidebar = false;
});
</script>

<style scoped>
h2, p {
    font-family: "Satoshi", sans-serif;
}

.first {
    display: flex;
    justify-content: space-between;
}

#add {
    height: 40px;
    background: var(--primary);
    font-family: "Satoshi", sans-serif;
    margin-top: 30px;
}

table th, td {
    font-family: "Satoshi", sans-serif;
}

.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>

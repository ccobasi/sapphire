<template>
  <div class="container mx-auto p-4 space-y-6 min-h-screen bg-gray-100">
    <!-- Role Switch Dropdown -->
    <div class="text-left mb-4">
      <select v-model="currentRole" class="form-select w-full sm:w-auto p-2 border rounded-md" @change="logRoleChange">
        <option value="resourcingOfficer">Resourcing Officer</option>
        <option value="prospectiveNewHire">Prospective New Hire</option>
        <option value="medicalConsultant">Medical Consultant</option>
      </select>
    </div>

    <!-- Notifications -->
    <div v-if="notifications.length" class="alert alert-info mb-4" role="alert">
      <ul class="mb-0">
        <li v-for="(notification, index) in notifications" :key="index" class="text-sm">
          {{ notification.message }} <button @click="removeNotification(index)" class="ml-2 text-red-500 hover:text-red-700">×</button>
        </li>
      </ul>
    </div>

    <!-- Medical Check Status -->
    <div v-if="currentRole !== 'resourcingOfficer' && selectedMedicalCheck && medicalChecks.length" class="medical-status bg-white p-3 rounded mb-4 shadow">
      <h3 class="text-lg font-semibold text-blue-600 mb-2">Medical Check Status</h3>
      <div class="flex flex-col sm:flex-row sm:items-center gap-2">
        <span :class="statusClass">{{ selectedMedicalCheck.status }}</span>
        <p v-if="selectedMedicalCheck.comments" class="text-gray-600 italic">"{{ selectedMedicalCheck.comments }}"</p>
      </div>
      <svg v-if="selectedMedicalCheck.comments" class="warning-icon w-5 h-5 text-yellow-500 ml-2 inline" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
      </svg>
    </div>

    <div class="text-left">
      <h1 class="title text-3xl font-bold text-blue-600 sm:text-4xl">Pre-Employment Medical Check</h1>
      <p class="subtitle text-gray-600 mt-2 text-sm sm:text-base">Manage the medical check process for new hires below.</p>
    </div>

    <div class="medical-records bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Current Medical Checks</h2>
      <table class="w-full border-collapse text-left" v-if="medicalChecks.length">
        <thead>
          <tr class="bg-gray-200 text-blue-600">
            <th class="px-2 py-2 border-b font-semibold sm:px-4">New Hire ID</th>
            <th class="px-2 py-2 border-b font-semibold sm:px-4">Name</th>
            <th class="px-2 py-2 border-b font-semibold sm:px-4">Status</th>
            <th class="px-2 py-2 border-b font-semibold sm:px-4">Action</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="medicalCheck in medicalChecks" :key="medicalCheck.id" class="hover:bg-gray-50">
            <td class="px-2 py-2 border-b text-gray-800 sm:px-4">{{ medicalCheck.id }}</td>
            <td class="px-2 py-2 border-b text-gray-800 sm:px-4">{{ medicalCheck.name }}</td>
            <td class="px-2 py-2 border-b text-gray-800 sm:px-4">{{ medicalCheck.status }}</td>
            <td class="px-2 py-2 border-b sm:px-4">
              <!-- Resourcing Officer Action -->
              <button v-if="currentRole === 'resourcingOfficer' && medicalCheck.status === 'Pending'" @click="provideMedicalForm(medicalCheck)" class="action-button px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">
                Provide Form
              </button>
              <!-- Prospective New Hire Action -->
              <button v-if="currentRole === 'prospectiveNewHire' && medicalCheck.status === 'Form Provided'" @click="proceedToMedicalCenter(medicalCheck)" class="action-button px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">
                Proceed to Medical Center
              </button>
              <!-- Medical Consultant Actions -->
              <button v-if="currentRole === 'medicalConsultant' && medicalCheck.status === 'At Medical Center'" @click="performTests(medicalCheck)" class="action-button px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base mr-1">
                Perform Tests
              </button>
              <button v-if="currentRole === 'medicalConsultant' && medicalCheck.status === 'Tests Completed' && medicalCheck.needsFurtherTests" @click="requestFurtherTests(medicalCheck)" class="action-button px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm sm:text-base mr-1">
                Request Further Tests
              </button>
              <button v-if="currentRole === 'medicalConsultant' && medicalCheck.status === 'Tests Completed' && !medicalCheck.needsFurtherTests" @click="submitResults(medicalCheck)" class="action-button px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base">
                Submit Results
              </button>
            </td>
            <!-- <td class="px-2 py-2 border-b text-gray-600 text-xs sm:text-sm">
              <span v-if="currentRole === 'resourcingOfficer' && medicalCheck.status !== 'Pending'">No action (Status: {{ medicalCheck.status }})</span>
              <span v-if="currentRole === 'prospectiveNewHire' && medicalCheck.status !== 'Form Provided'">No action (Status: {{ medicalCheck.status }})</span>
              <span v-if="currentRole === 'medicalConsultant' && !['At Medical Center', 'Tests Completed'].includes(medicalCheck.status)">No action (Status: {{ medicalCheck.status }})</span>
              <span>Active: {{ medicalCheck.active }}</span>
            </td> -->
          </tr>
        </tbody>
      </table>
      <p v-if="!medicalChecks.length" class="text-gray-600">No medical checks available. Add a new hire to begin.</p>
      <div class="flex justify-end mt-4">
        <button v-if="currentRole === 'resourcingOfficer'" @click="addNewHire" class="add-button px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm text-sm sm:text-base">
          Add New Hire
        </button>
      </div>
    </div>

    <!-- New Hire Form -->
    <div v-if="newHireFormVisible" class="new-hire-form bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Add New Hire</h2>
      <form @submit.prevent="saveNewHire" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="newHireId" class="block text-sm font-medium text-gray-700">New Hire ID</label>
            <input type="text" id="newHireId" v-model="newMedicalCheck.id" class="mt-1 p-2 w-full border rounded-md" required />
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" v-model="newMedicalCheck.name" class="mt-1 p-2 w-full border rounded-md" required />
          </div>
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" @click="cancelNewHire" class="cancel-button px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm sm:text-base">Cancel</button>
          <button type="submit" class="save-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">Save</button>
        </div>
      </form>
    </div>

    <!-- Review Modal -->
    <div v-if="showModal" class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="modal-content bg-white rounded-lg p-6 w-full max-w-2xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-blue-600">{{ getModalTitle() }}</h2>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">×</button>
        </div>
        <div v-if="currentRole === 'resourcingOfficer' && selectedMedicalCheck" class="space-y-4">
          <h3 class="text-lg font-medium text-gray-800">Update New Hire</h3>
          <form @submit.prevent="saveNewHire">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="editNewHireId" class="block text-sm font-medium text-gray-700">New Hire ID</label>
                <input type="text" id="editNewHireId" v-model="selectedMedicalCheck.id" class="mt-1 p-2 w-full border rounded-md" disabled />
              </div>
              <div>
                <label for="editName" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="editName" v-model="selectedMedicalCheck.name" class="mt-1 p-2 w-full border rounded-md" disabled />
              </div>
            </div>
            <div class="flex justify-end gap-3 mt-4">
              <button type="button" @click="showModal = false" class="cancel-button px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm sm:text-base">Cancel</button>
              <button type="submit" class="save-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">Save Changes</button>
            </div>
          </form>
        </div>
        <div v-if="currentRole === 'medicalConsultant' && selectedMedicalCheck && ['Tests Completed'].includes(selectedMedicalCheck.status)">
          <h3 class="text-lg font-medium text-gray-800">Medical Results</h3>
          <div class="mt-4">
            <p class="text-gray-700">New Hire: {{ selectedMedicalCheck.name }}</p>
            <p class="text-gray-700">Status: {{ selectedMedicalCheck.status }}</p>
            <p class="text-gray-700">Needs Further Tests: {{ selectedMedicalCheck.needsFurtherTests ? 'Yes' : 'No' }}</p>
            <textarea v-model="selectedMedicalCheck.comments" class="w-full p-2 mt-2 border rounded-md" placeholder="Enter recommendations or comments" rows="3"></textarea>
          </div>
          <div class="flex justify-end gap-3 mt-4">
            <button @click="showModal = false" class="cancel-button px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm sm:text-base">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, nextTick } from "vue";

const currentRole = ref("resourcingOfficer");
const showModal = ref(false);
const newHireFormVisible = ref(false);
const notifications = ref([]);
const currentDate = new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });

const medicalChecks = ref([]);

const newMedicalCheck = reactive({
  id: "",
  name: "",
  status: "Pending",
  active: "true",
  comments: "",
  needsFurtherTests: false,
  processedDate: null,
});
const selectedMedicalCheck = ref(null);

const statusClass = computed(() => {
  if (!selectedMedicalCheck?.value) return "status-badge px-2 py-1 rounded text-sm font-medium bg-gray-300 text-gray-800";
  return {
    "status-badge px-2 py-1 rounded text-sm font-medium": true,
    "bg-green-500 text-white": selectedMedicalCheck.value.status === "Results Submitted",
    "bg-yellow-500 text-gray-800": selectedMedicalCheck.value.status === "Pending" || selectedMedicalCheck.value.status === "Form Provided" || selectedMedicalCheck.value.status === "At Medical Center" || selectedMedicalCheck.value.status === "Tests Completed",
    "bg-red-500 text-white": selectedMedicalCheck.value.status === "Further Tests Authorized" || selectedMedicalCheck.value.status === "Deactivated",
  };
});

function getModalTitle() {
  if (currentRole.value === 'resourcingOfficer' && selectedMedicalCheck) return "Update New Hire";
  if (currentRole.value === 'medicalConsultant' && selectedMedicalCheck) return "Review Medical Results";
  return "Medical Check Management";
}

function logRoleChange() {
  console.log("Role changed to:", currentRole.value);
  console.log("Medical Checks:", medicalChecks.value);
}

function addNewHire() {
  newHireFormVisible.value = true;
  newMedicalCheck.id = `NH${Date.now().toString().slice(-5)}`;
  newMedicalCheck.name = "";
  newMedicalCheck.status = "Pending";
  newMedicalCheck.active = "true";
  newMedicalCheck.comments = "";
  newMedicalCheck.needsFurtherTests = false;
  newMedicalCheck.processedDate = null;
}

function cancelNewHire() {
  newHireFormVisible.value = false;
}

function saveNewHire() {
  const existingIndex = medicalChecks.value.findIndex(m => m.id === newMedicalCheck.id);
  if (existingIndex !== -1) {
    medicalChecks.value[existingIndex] = { ...newMedicalCheck, active: newMedicalCheck.active === "true" ? "true" : "false" };
    if (medicalChecks.value[existingIndex].active === "false") medicalChecks.value[existingIndex].status = "Deactivated";
  } else {
    medicalChecks.value.push({ ...newMedicalCheck, active: newMedicalCheck.active === "true" ? "true" : "false" });
  }
  newHireFormVisible.value = false;
  showModal.value = false;
  nextTick(() => {
    console.log("Medical check saved, updated medicalChecks:", medicalChecks.value);
  });
  notifications.value.push({ message: `New hire ${newMedicalCheck.name} added for medical check.` });
  alert("New hire record added/updated!");
}

function provideMedicalForm(medicalCheck) {
  const index = medicalChecks.value.findIndex(m => m.id === medicalCheck.id);
  if (medicalChecks.value[index] && medicalChecks.value[index].status === "Pending" && medicalChecks.value[index].active === "true") {
    medicalChecks.value[index].status = "Form Provided";
    medicalChecks.value[index].comments = "Form provided to new hire via email.";
    notifications.value.push({ message: `Medical form provided to ${medicalChecks.value[index].name} for pre-employment check.` });
    alert("Medical form provided and sent to new hire!");
    console.log("Medical form provided, updated medicalChecks:", medicalChecks.value);
  } else {
    console.log("Provide form failed:", { status: medicalChecks.value[index]?.status, active: medicalChecks.value[index]?.active, index });
  }
}

function proceedToMedicalCenter(medicalCheck) {
  const index = medicalChecks.value.findIndex(m => m.id === medicalCheck.id);
  if (medicalChecks.value[index] && medicalChecks.value[index].status === "Form Provided" && medicalChecks.value[index].active === "true") {
    medicalChecks.value[index].status = "At Medical Center";
    medicalChecks.value[index].comments = "New hire has proceeded to the designated hospital.";
    notifications.value.push({ message: `${medicalChecks.value[index].name} has proceeded to the medical center.` });
    alert("New hire has proceeded to the medical center!");
    console.log("Proceeded to medical center, updated medicalChecks:", medicalChecks.value);
  } else {
    console.log("Proceed to medical center failed:", { status: medicalChecks.value[index]?.status, active: medicalChecks.value[index]?.active, index });
  }
}

function performTests(medicalCheck) {
  const index = medicalChecks.value.findIndex(m => m.id === medicalCheck.id);
  if (medicalChecks.value[index] && medicalChecks.value[index].status === "At Medical Center" && medicalChecks.value[index].active === "true") {
    medicalChecks.value[index].status = "Tests Completed";
    medicalChecks.value[index].needsFurtherTests = Math.random() > 0.5; // Randomly determine if further tests are needed for demo
    medicalChecks.value[index].comments = `Tests performed. Further tests ${medicalChecks.value[index].needsFurtherTests ? 'required' : 'not required'}.`;
    notifications.value.push({ message: `Tests completed for ${medicalChecks.value[index].name}.` });
    alert("Tests completed. Check for further tests if needed.");
    console.log("Tests performed, updated medicalChecks:", medicalChecks.value);
  } else {
    console.log("Perform tests failed:", { status: medicalChecks.value[index]?.status, active: medicalChecks.value[index]?.active, index });
  }
}

function requestFurtherTests(medicalCheck) {
  const index = medicalChecks.value.findIndex(m => m.id === medicalCheck.id);
  if (medicalChecks.value[index] && medicalChecks.value[index].status === "Tests Completed" && medicalChecks.value[index].needsFurtherTests && medicalChecks.value[index].active === "true") {
    medicalChecks.value[index].status = "Further Tests Authorized";
    medicalChecks.value[index].comments = "Authorization requested from Nigalex for further tests at new hire's cost.";
    notifications.value.push({ message: `Further tests authorized for ${medicalChecks.value[index].name} at their cost.` });
    alert("Further tests authorized. Awaiting new hire response.");
    console.log("Further tests requested, updated medicalChecks:", medicalChecks.value);
  } else {
    console.log("Request further tests failed:", { status: medicalChecks.value[index]?.status, needsFurtherTests: medicalChecks.value[index]?.needsFurtherTests, active: medicalChecks.value[index]?.active, index });
  }
}

function submitResults(medicalCheck) {
  const index = medicalChecks.value.findIndex(m => m.id === medicalCheck.id);
  if (medicalChecks.value[index] && medicalChecks.value[index].status === "Tests Completed" && !medicalChecks.value[index].needsFurtherTests && medicalChecks.value[index].active === "true") {
    medicalChecks.value[index].status = "Results Submitted";
    medicalChecks.value[index].processedDate = new Date().toLocaleString();
    medicalChecks.value[index].comments = "Medical check completed. Results and recommendations submitted.";
    notifications.value.push({ message: `Results submitted for ${medicalChecks.value[index].name} to Resourcing Officer.` });
    alert("Results and recommendations submitted to Resourcing Officer!");
    console.log("Results submitted, updated medicalChecks:", medicalChecks.value);
  } else {
    console.log("Submit results failed:", { status: medicalChecks.value[index]?.status, needsFurtherTests: medicalChecks.value[index]?.needsFurtherTests, active: medicalChecks.value[index]?.active, index });
  }
}

function selectMedicalCheck(medicalCheck) {
  const index = medicalChecks.value.findIndex(m => m.id === medicalCheck.id);
  selectedMedicalCheck.value = { ...medicalChecks.value[index] };
  showModal.value = true;
}

function removeNotification(index) {
  notifications.value.splice(index, 1);
}

watch(medicalChecks, (newMedicalChecks) => {
  console.log("Medical checks updated:", newMedicalChecks);
}, { deep: true });
</script>

<style scoped>
/* Container and Base Styles */
.container {
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  min-height: 100vh;
  background-color: #f3f4f6;
}

.text-left {
  margin: 20px;
}

/* Headings */
.title {
  font-family: "Satoshi", sans-serif;
  font-size: 1.875rem;
  color: #3b82f6;
}

.subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

@media (min-width: 640px) {
  .title {
    font-size: 2.25rem;
  }
  .subtitle {
    font-size: 1rem;
  }
}

/* Form Select and Inputs */
.form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

@media (min-width: 640px) {
  .form-select {
    width: auto;
    padding: 0.5rem;
  }
}

/* Notifications */
.alert {
  background-color: #dbeafe;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.alert ul {
  margin-bottom: 0;
}

.alert li {
  font-size: 0.875rem;
}

.alert button {
  margin-left: 0.5rem;
  color: #ef4444;
  transition: color 0.2s;
}

.alert button:hover {
  color: #dc2626;
}

/* Medical Status */
.medical-status {
  background-color: #ffffff;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.medical-status h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 0.5rem;
}

.medical-status .flex {
  flex-direction: column;
}

@media (min-width: 640px) {
  .medical-status .flex {
    flex-direction: row;
    align-items: center;
  }
}

.medical-status .gap-2 {
  gap: 0.5rem;
}

.warning-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
  color: #eab308;
}

/* Medical Records */
.medical-records {
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.medical-records h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  padding: 20px;
}

.medical-records table {
  width: 100%;
  border-collapse: collapse;
}

.medical-records th,
.medical-records td {
  padding: 0.25rem;
  border-bottom: 1px solid #e5e7eb;
}

@media (min-width: 640px) {
  .medical-records th,
  .medical-records td {
    padding: 0.5rem;
  }
}

.medical-records th {
  font-weight: 600;
  color: #3b82f6;
}

.medical-records tr:hover {
  background-color: #f9fafb;
}

.medical-records p {
  color: #6b7280;
}

/* Buttons */
.action-button,
.add-button,
.save-button,
.cancel-button {
  padding: 0.25rem 0.5rem;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  font-size: 0.75rem;
}

@media (min-width: 640px) {
  .action-button,
  .add-button,
  .save-button,
  .cancel-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}

.action-button:hover,
.add-button:hover,
.save-button:hover {
  background-color: #2563eb;
}

.cancel-button {
  background-color: #6b7280;
}

.cancel-button:hover {
  background-color: #4b5563;
}

.add-button {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* New Hire Form */
.new-hire-form {
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.new-hire-form h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.new-hire-form label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.new-hire-form input {
  margin-top: 0.25rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.new-hire-form .grid {
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .new-hire-form .grid {
    grid-template-columns: 1fr 1fr;
  }
}

.new-hire-form .gap-4 {
  gap: 1rem;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 0.375rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 32rem;
}

.modal-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3b82f6;
}

.modal-content button {
  font-size: 1.25rem;
  transition: color 0.2s;
}

.modal-content textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

/* Status Badge */
.status-badge {
  padding: 0.5rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.bg-green-500 {
  background-color: #22c55e;
}

.bg-yellow-500 {
  background-color: #f59e0b;
}

.bg-red-500 {
  background-color: #ef4444;
}

.text-white {
  color: #ffffff;
}

.text-gray-800 {
  color: #1f2937;
}
</style>
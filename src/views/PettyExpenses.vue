<!-- <template>
  <div class="container mx-auto p-6 space-y-8">

    <div class="text-left mb-4">
      <select v-model="currentRole" class="form-select w-auto" style="max-width: 200px;">
        <option value="employee">Employee (Requester)</option>
        <option value="lineManager">Line Manager</option>
        <option value="internalAudit">Internal Audit</option>
        <option value="cfo">CFO</option>
        <option value="treasury">Treasury</option>
        <option value="mdCeo">MD/CEO</option>
      </select>
    </div>

    <div v-if="notifications.length" class="alert alert-info mb-4" role="alert">
      <ul class="mb-0">
        <li v-for="(notification, index) in notifications" :key="index" class="text-dark">
          {{ notification.message }} <button @click="removeNotification(index)" class="btn btn-sm btn-close ms-2"></button>
        </li>
      </ul>
    </div>

    <div class="bg-light p-3 rounded mb-4">
      <h3 class="h5 text-dark mb-2">Review and Approval Status</h3>
      <div class="d-flex align-items-center gap-2">
        <span :class="statusClass">{{ requisition.status }}</span>
        <p v-if="requisition.hrComments && requisition.status === 'Rejected'" class="text-muted mb-0">"{{ requisition.hrComments }}"</p>
      </div>
      <svg v-if="requisition.hrComments" class="text-warning ms-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
      </svg>
    </div>

    <div class="text-left">
      <h1 class="text-4xl font-bold text-primary">Petty Expense Requisition</h1>
      <p class="text-muted mt-2">Submit and manage petty expense requests below.</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Current Requisitions</h2>
      <table class="table-auto w-full border-collapse text-left" v-if="requisitions.length">
        <thead>
          <tr class="bg-light text-primary">
            <th class="px-4 py-3 border-b font-semibold">Req ID</th>
            <th class="px-4 py-3 border-b font-semibold">Amount</th>
            <th class="px-4 py-3 border-b font-semibold">Purpose</th>
            <th class="px-4 py-3 border-b font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in requisitions" :key="req.id" class="hover:bg-gray-100">
            <td class="px-4 py-3 border-b text-dark">{{ req.id }}</td>
            <td class="px-4 py-3 border-b text-dark">{{ req.amount }}</td>
            <td class="px-4 py-3 border-b text-dark">{{ req.purpose }}</td>
            <td class="px-4 py-3 border-b text-dark">{{ req.status }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!requisitions.length" class="text-muted">No requisitions submitted yet.</p>
      <div class="flex justify-end mt-4">
        <button v-if="currentRole === 'employee' && !requisitionFormVisible" @click="showRequisitionForm" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm transition duration-200 bd">
          Raise Requisition
        </button>
      </div>
    </div>

    <div v-if="requisitionFormVisible" class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Raise Petty Expense Requisition</h2>
      <form @submit.prevent="submitRequisition" class="mb-4">
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label for="amount" class="form-label text-muted">Amount (#)</label>
            <input type="number" id="amount" v-model="newRequisition.amount" class="form-control" required step="0.01" min="0" />
          </div>
          <div class="col-12 col-md-6">
            <label for="purpose" class="form-label text-muted">Purpose</label>
            <input type="text" id="purpose" v-model="newRequisition.purpose" class="form-control" required />
          </div>
        </div>
        <div class="d-flex justify-content-end gap-3 mt-4">
          <button type="button" @click="cancelRequisition" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Requisition</button>
        </div>
      </form>
    </div>

    <div v-if="showModal" class="modal d-block" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title text-primary">{{ currentRole === 'hrAdmin' && requisition.status === 'Pending HR Approval' ? 'Review Requisition' : 'Update Personal Information' }}</h2>
            <button type="button" @click="showModal = false" class="btn-close" aria-label="Close"></button>
          </div>

          <div class="modal-body p-4">

            <form v-if="currentRole === 'employee' || !requisition.pendingUpdate" @submit.prevent="handleSubmit" class="mb-4" v-show="false">

            </form>

            <div v-if="currentRole !== 'employee' && requisition.status !== 'Up to Date' && requisition.status !== 'Disbursed'">
              <h3 class="h5 text-dark mb-3">Review Requisition Details</h3>
              <div class="row g-3 mb-4">
                <div class="col-12">
                  <table class="table table-bordered">
                    <thead>
                      <tr class="bg-light">
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Requisition ID</td>
                        <td>{{ requisition.id }}</td>
                      </tr>
                      <tr>
                        <td>Amount</td>
                        <td>{{ requisition.amount }}</td>
                      </tr>
                      <tr>
                        <td>Purpose</td>
                        <td>{{ requisition.purpose }}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{{ requisition.status }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <section class="mb-4">
                <h3 class="h5 text-dark mb-3">Review and Approval Status</h3>
                <div class="bg-light p-3 rounded d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center gap-2">
                    <span :class="statusClass">{{ requisition.status }}</span>
                    <p v-if="requisition.hrComments" class="text-muted mb-0">"{{ requisition.hrComments }}"</p>
                  </div>
                  <svg v-if="requisition.hrComments" class="text-warning" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
                  </svg>
                </div>
              </section>

              <div class="d-flex justify-content-end gap-3">
                <button v-if="currentRole === 'lineManager' && requisition.status === 'Submitted'" type="button" @click="approveLineManager" class="btn btn-success">Approve</button>
                <button v-if="currentRole === 'lineManager' && requisition.status === 'Submitted'" type="button" @click="rejectLineManager" class="btn btn-danger">Reject</button>
                <input v-if="currentRole === 'lineManager' && requisition.status === 'Submitted'" v-model="requisition.hrComments" type="text" class="form-control w-50" placeholder="Reason for rejection" />

                <button v-if="currentRole === 'internalAudit' && requisition.status === 'Line Manager Approved'" type="button" @click="approveInternalAudit" class="btn btn-success">Approve</button>
                <button v-if="currentRole === 'internalAudit' && requisition.status === 'Line Manager Approved'" type="button" @click="rejectInternalAudit" class="btn btn-danger">Reject</button>
                <input v-if="currentRole === 'internalAudit' && requisition.status === 'Line Manager Approved'" v-model="requisition.hrComments" type="text" class="form-control w-50" placeholder="Reason for rejection" />

                <button v-if="currentRole === 'cfo' && requisition.status === 'Internal Audit Approved'" type="button" @click="approveCFO" class="btn btn-success">Approve</button>
                <button v-if="currentRole === 'cfo' && requisition.status === 'Internal Audit Approved'" type="button" @click="rejectCFO" class="btn btn-danger">Reject</button>
                <input v-if="currentRole === 'cfo' && requisition.status === 'Internal Audit Approved'" v-model="requisition.hrComments" type="text" class="form-control w-50" placeholder="Reason for rejection" />

                <button v-if="currentRole === 'treasury' && requisition.status === 'CFO Approved'" type="button" @click="disburseFunds" class="btn btn-success">Disburse Funds</button>
                <button type="button" @click="showModal = false" class="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentRole === 'mdCeo'" class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Periodic Payment Report</h2>
      <button @click="generateReport" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm transition duration-200 bd">
        Generate Report
      </button>
      <div v-if="reportGenerated" class="mt-4">
        <h4 class="text-dark">Payment Report (As of {{ currentDate }})</h4>
        <table class="table table-bordered mt-2">
          <thead>
            <tr class="bg-light">
              <th>Requisition ID</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Date Disbursed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in disbursedRequisitions" :key="req.id">
              <td>{{ req.id }}</td>
              <td>{{ req.amount }}</td>
              <td>{{ req.purpose }}</td>
              <td>{{ req.status }}</td>
              <td>{{ req.disbursedDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { authStore } from "../store/store";

const store = authStore();

// Reactive state
const currentRole = ref("employee");
const showModal = ref(false);
const requisitionFormVisible = ref(false);
const notifications = ref([]);
const currentDate = new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });

// Requisition data
const requisitions = ref([]);
const newRequisition = reactive({
  id: null,
  amount: 0,
  purpose: "",
});
const requisition = reactive({
  id: null,
  amount: 0,
  purpose: "",
  status: "Up to Date",
  hrComments: "",
  pendingUpdate: null,
  disbursedDate: null,
});
const disbursedRequisitions = ref([]);
const uploadedFiles = ref([]);
const reportGenerated = ref(false);

// Status class for review section
const statusClass = computed(() => ({
  "px-3 py-1 rounded-pill text-sm font-medium": true,
  "bg-success text-white": requisition.status === "Up to Date" || requisition.status === "Disbursed",
  "bg-warning text-dark": requisition.status === "Submitted" || requisition.status === "Line Manager Approved" || requisition.status === "Internal Audit Approved" || requisition.status === "CFO Approved",
  "bg-danger text-white": requisition.status === "Rejected",
}));

// Handlers
function showRequisitionForm() {
  requisitionFormVisible.value = true;
  newRequisition.id = Date.now(); // Unique ID based on timestamp
  newRequisition.amount = 0;
  newRequisition.purpose = "";
}

function cancelRequisition() {
  requisitionFormVisible.value = false;
}

function submitRequisition() {
  requisition.id = newRequisition.id;
  requisition.amount = newRequisition.amount;
  requisition.purpose = newRequisition.purpose;
  requisition.status = "Submitted";
  requisitions.value.push({ ...requisition });
  requisitionFormVisible.value = false;
  alert("Requisition submitted for line manager approval!");
}

function approveLineManager() {
  if (requisition.status === "Submitted") {
    requisition.status = "Line Manager Approved";
    alert("Requisition approved by Line Manager!");
  }
}

function rejectLineManager() {
  if (requisition.status === "Submitted") {
    requisition.status = "Rejected";
    if (!requisition.hrComments.trim()) requisition.hrComments = "No reason provided.";
    alert(`Requisition rejected by Line Manager: "#{requisition.hrComments}"`);
  }
}

function approveInternalAudit() {
  if (requisition.status === "Line Manager Approved") {
    requisition.status = "Internal Audit Approved";
    alert("Requisition approved by Internal Audit!");
  }
}

function rejectInternalAudit() {
  if (requisition.status === "Line Manager Approved") {
    requisition.status = "Rejected";
    if (!requisition.hrComments.trim()) requisition.hrComments = "No reason provided.";
    alert(`Requisition rejected by Internal Audit: "#{requisition.hrComments}"`);
  }
}

function approveCFO() {
  if (requisition.status === "Internal Audit Approved") {
    requisition.status = "CFO Approved";
    alert("Requisition approved by CFO!");
  }
}

function rejectCFO() {
  if (requisition.status === "Internal Audit Approved") {
    requisition.status = "Rejected";
    if (!requisition.hrComments.trim()) requisition.hrComments = "No reason provided.";
    alert(`Requisition rejected by CFO: "#{requisition.hrComments}"`);
  }
}

function disburseFunds() {
  if (requisition.status === "CFO Approved") {
    requisition.status = "Disbursed";
    requisition.disbursedDate = new Date().toLocaleString();
    disbursedRequisitions.value.push({ ...requisition });
    alert("Funds disbursed by Treasury!");
    showModal.value = false;
  }
}

function generateReport() {
  reportGenerated.value = true;
  alert("Periodic payment report generated!");
}

function handleQualificationUpload(event) {
  console.log(event.target.files);
}

function handleEvidenceUpload(event) {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    if (file.size <= 5 * 1024 * 1024) {
      uploadedFiles.value.push(file);
    } else {
      alert(`#{file.name} exceeds 5MB limit`);
    }
  });
}

function deleteFile(index) {
  uploadedFiles.value.splice(index, 1);
}

function removeNotification(index) {
  notifications.value.splice(index, 1);
}

onMounted(() => {
  store.currentpage = "petty-expenses";
  store.showSidebar = false;
});
</script>

<style scoped>
.text-left {
  margin: 20px;
}

h1 {
  font-family: "Satoshi", sans-serif;
  font-size: 30px;
  color: var(--dark);
}

p {
  font-size: 16px;
  color: var(--info);
}

.info {
  margin: 30px 20px;
}

h2 {
  padding: 20px;
}

.bd {
  background: var(--primary);
  padding: 10px;
  border-radius: 5px;
  margin-left: 40px;
  border: none;
  margin-bottom: 10px;
}

form {
  margin: 30px;
}

.bg-primary {
  background-color: #007bff; /* Bootstrap primary color */
}

.bg-primary-dark {
  background-color: #0056b3; /* Darker shade for hover */
}

.text-primary {
  color: #007bff;
}

.text-dark {
  color: #343a40;
}

.text-muted {
  color: #6c757d;
}

.text-secondary {
  color: #6c757d;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style> -->
<template>
  <div class="container mx-auto p-6 space-y-8">

    <div class="text-left mb-4">
      <select v-model="currentRole" class="form-select w-auto" style="max-width: 200px;">
        <option value="employee">Employee (Requester)</option>
        <option value="lineManager">Line Manager</option>
        <option value="internalAudit">Internal Audit</option>
        <option value="cfo">CFO</option>
        <option value="treasury">Treasury</option>
        <option value="mdCeo">MD/CEO</option>
      </select>
    </div>

    <div v-if="notifications.length" class="alert alert-info mb-4" role="alert">
      <ul class="mb-0">
        <li v-for="(notification, index) in notifications" :key="index" class="text-dark">
          {{ notification.message }} <button @click="removeNotification(index)" class="btn btn-sm btn-close ms-2"></button>
        </li>
      </ul>
    </div>

    <div v-if="currentRole !== 'employee' && currentRole !== 'mdCeo' && requisitions.length && selectedRequisition" class="bg-light p-3 rounded mb-4">
      <h3 class="h5 text-primary mb-2">Review and Approval Status</h3>
      <div class="d-flex align-items-center gap-2">
        <span :class="statusClass">{{ selectedRequisition.status }}</span>
        <p v-if="selectedRequisition.hrComments && selectedRequisition.status === 'Rejected'" class="text-muted mb-0">"{{ selectedRequisition.hrComments }}"</p>
      </div>
      <svg v-if="selectedRequisition.hrComments" class="text-warning ms-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
      </svg>
    </div>

    <div class="text-left">
      <h1 class="text-4xl font-bold text-primary">Petty Expense Requisition</h1>
      <p class="text-muted mt-2">Submit and manage petty expense requests below.</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Current Requisitions</h2>
      <table class="table-auto w-full border-collapse text-left" v-if="requisitions.length">
        <thead>
          <tr class="bg-light text-primary">
            <th class="px-4 py-3 border-b font-semibold">Req ID</th>
            <th class="px-4 py-3 border-b font-semibold">Amount</th>
            <th class="px-4 py-3 border-b font-semibold">Purpose</th>
            <th class="px-4 py-3 border-b font-semibold">Status</th>
            <th class="px-4 py-3 border-b font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in requisitions" :key="req.id" class="hover:bg-gray-100">
            <td class="px-4 py-3 border-b text-dark">{{ req.id }}</td>
            <td class="px-4 py-3 border-b text-dark">#{{ req.amount.toLocaleString() }}</td>
            <td class="px-4 py-3 border-b text-dark">{{ req.purpose }}</td>
            <td class="px-4 py-3 border-b text-dark">{{ req.status }}</td>
            <td v-if="currentRole !== 'employee' && currentRole !== 'mdCeo' && isActionableStatus(req.status)" class="px-4 py-3 border-b">
              <button @click="selectRequisition(req)" class="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark">Review</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!requisitions.length" class="text-muted">No requisitions submitted yet.</p>
      <div class="flex justify-end mt-4">
        <button v-if="currentRole === 'employee' && !requisitionFormVisible" @click="showRequisitionForm" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm transition duration-200 bd">
          Raise Requisition
        </button>
      </div>
    </div>

    <div v-if="requisitionFormVisible" class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Raise Petty Expense Requisition</h2>
      <form @submit.prevent="submitRequisition" class="mb-4">
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label for="amount" class="form-label text-muted">Amount (#)</label>
            <input type="number" id="amount" v-model="newRequisition.amount" class="form-control" required step="0.01" min="0" />
          </div>
          <div class="col-12 col-md-6">
            <label for="purpose" class="form-label text-muted">Purpose</label>
            <input type="text" id="purpose" v-model="newRequisition.purpose" class="form-control" required />
          </div>
        </div>
        <div class="d-flex justify-content-end gap-3 mt-4">
          <button type="button" @click="cancelRequisition" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Requisition</button>
        </div>
      </form>
    </div>

    <div v-if="showModal" class="modal d-block" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title text-primary">Review Requisition</h2>
            <button type="button" @click="showModal = false" class="btn-close" aria-label="Close"></button>
          </div>

          <div class="modal-body p-4">

            <div v-if="selectedRequisition">
              <h3 class="h5 text-dark mb-3">Review Requisition Details</h3>
              <div class="row g-3 mb-4">
                <div class="col-12">
                  <table class="table table-bordered">
                    <thead>
                      <tr class="bg-light">
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Requisition ID</td>
                        <td>{{ selectedRequisition.id }}</td>
                      </tr>
                      <tr>
                        <td>Amount</td>
                        <td>#{{ selectedRequisition.amount.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Purpose</td>
                        <td>{{ selectedRequisition.purpose }}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{{ selectedRequisition.status }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <section class="mb-4">
                <h3 class="h5 text-dark mb-3">Review and Approval Status</h3>
                <div class="bg-light p-3 rounded d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center gap-2">
                    <span :class="statusClass">{{ selectedRequisition.status }}</span>
                    <p v-if="selectedRequisition.hrComments" class="text-muted mb-0">"{{ selectedRequisition.hrComments }}"</p>
                  </div>
                  <svg v-if="selectedRequisition.hrComments" class="text-warning" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
                  </svg>
                </div>
              </section>

              <div class="d-flex justify-content-end gap-3">
                <button v-if="currentRole === 'lineManager' && selectedRequisition.status === 'Submitted'" type="button" @click="approveLineManager(selectedRequisition)" class="btn btn-success">Approve</button>
                <button v-if="currentRole === 'lineManager' && selectedRequisition.status === 'Submitted'" type="button" @click="rejectLineManager(selectedRequisition)" class="btn btn-danger">Reject</button>
                <input v-if="currentRole === 'lineManager' && selectedRequisition.status === 'Submitted'" v-model="selectedRequisition.hrComments" type="text" class="form-control w-50" placeholder="Reason for rejection" />

                <button v-if="currentRole === 'internalAudit' && selectedRequisition.status === 'Line Manager Approved'" type="button" @click="approveInternalAudit(selectedRequisition)" class="btn btn-success">Approve</button>
                <button v-if="currentRole === 'internalAudit' && selectedRequisition.status === 'Line Manager Approved'" type="button" @click="rejectInternalAudit(selectedRequisition)" class="btn btn-danger">Reject</button>
                <input v-if="currentRole === 'internalAudit' && selectedRequisition.status === 'Line Manager Approved'" v-model="selectedRequisition.hrComments" type="text" class="form-control w-50" placeholder="Reason for rejection" />

                <button v-if="currentRole === 'cfo' && selectedRequisition.status === 'Internal Audit Approved'" type="button" @click="approveCFO(selectedRequisition)" class="btn btn-success">Approve</button>
                <button v-if="currentRole === 'cfo' && selectedRequisition.status === 'Internal Audit Approved'" type="button" @click="rejectCFO(selectedRequisition)" class="btn btn-danger">Reject</button>
                <input v-if="currentRole === 'cfo' && selectedRequisition.status === 'Internal Audit Approved'" v-model="selectedRequisition.hrComments" type="text" class="form-control w-50" placeholder="Reason for rejection" />

                <button v-if="currentRole === 'treasury' && selectedRequisition.status === 'CFO Approved'" type="button" @click="disburseFunds(selectedRequisition)" class="btn btn-success">Disburse Funds</button>
                <button type="button" @click="showModal = false" class="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentRole === 'mdCeo'" class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Periodic Payment Report</h2>
      <button @click="generateReport" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm transition duration-200 bd">
        Generate Report
      </button>
      <div v-if="reportGenerated" class="mt-4">
        <h4 class="text-dark">Payment Report (As of {{ currentDate }})</h4>
        <table class="table table-bordered mt-2">
          <thead>
            <tr class="bg-light">
              <th>Requisition ID</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Date Disbursed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in disbursedRequisitions" :key="req.id">
              <td>{{ req.id }}</td>
              <td>#{{ req.amount.toLocaleString() }}</td>
              <td>{{ req.purpose }}</td>
              <td>{{ req.status }}</td>
              <td>{{ req.disbursedDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

// Reactive state
const currentRole = ref("employee");
const showModal = ref(false);
const requisitionFormVisible = ref(false);
const notifications = ref([]);
const currentDate = new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });

// Requisition data
const requisitions = ref([]);
const newRequisition = reactive({
  id: null,
  amount: 0,
  purpose: "",
});
const selectedRequisition = ref(null);
const disbursedRequisitions = ref([]);
const uploadedFiles = ref([]);
const reportGenerated = ref(false);

// Status class for review section
const statusClass = computed(() => {
  if (!selectedRequisition?.value) return "px-3 py-1 rounded-pill text-sm font-medium bg-secondary text-white";
  return {
    "px-3 py-1 rounded-pill text-sm font-medium": true,
    "bg-success text-white": selectedRequisition.value.status === "Up to Date" || selectedRequisition.value.status === "Disbursed",
    "bg-warning text-dark": selectedRequisition.value.status === "Submitted" || selectedRequisition.value.status === "Line Manager Approved" || selectedRequisition.value.status === "Internal Audit Approved" || selectedRequisition.value.status === "CFO Approved",
    "bg-danger text-white": selectedRequisition.value.status === "Rejected",
  };
});

function isActionableStatus(status) {
  return ["Submitted", "Line Manager Approved", "Internal Audit Approved", "CFO Approved"].includes(status);
}

// Handlers
function showRequisitionForm() {
  requisitionFormVisible.value = true;
  newRequisition.id = Date.now(); // Unique ID based on timestamp
  newRequisition.amount = 0;
  newRequisition.purpose = "";
}

function cancelRequisition() {
  requisitionFormVisible.value = false;
}

function submitRequisition() {
  const newReq = {
    id: newRequisition.id,
    amount: newRequisition.amount,
    purpose: newRequisition.purpose,
    status: "Submitted",
    hrComments: "",
    disbursedDate: null,
  };
  requisitions.value.push(newReq);
  requisitionFormVisible.value = false;
  alert("Requisition submitted for line manager approval!");
}

function selectRequisition(req) {
  selectedRequisition.value = req;
  showModal.value = true;
}

function approveLineManager(req) {
  if (req.status === "Submitted") {
    req.status = "Line Manager Approved";
    alert("Requisition approved by Line Manager!");
    showModal.value = false;
  }
}

function rejectLineManager(req) {
  if (req.status === "Submitted") {
    req.status = "Rejected";
    if (!req.hrComments.trim()) req.hrComments = "No reason provided.";
    alert(`Requisition rejected by Line Manager: "#{req.hrComments}"`);
    showModal.value = false;
  }
}

function approveInternalAudit(req) {
  if (req.status === "Line Manager Approved") {
    req.status = "Internal Audit Approved";
    alert("Requisition approved by Internal Audit!");
    showModal.value = false;
  }
}

function rejectInternalAudit(req) {
  if (req.status === "Line Manager Approved") {
    req.status = "Rejected";
    if (!req.hrComments.trim()) req.hrComments = "No reason provided.";
    alert(`Requisition rejected by Internal Audit: "#{req.hrComments}"`);
    showModal.value = false;
  }
}

function approveCFO(req) {
  if (req.status === "Internal Audit Approved") {
    req.status = "CFO Approved";
    alert("Requisition approved by CFO!");
    showModal.value = false;
  }
}

function rejectCFO(req) {
  if (req.status === "Internal Audit Approved") {
    req.status = "Rejected";
    if (!req.hrComments.trim()) req.hrComments = "No reason provided.";
    alert(`Requisition rejected by CFO: "#{req.hrComments}"`);
    showModal.value = false;
  }
}

function disburseFunds(req) {
  if (req.status === "CFO Approved") {
    req.status = "Disbursed";
    req.disbursedDate = new Date().toLocaleString();
    disbursedRequisitions.value.push({ ...req });
    alert("Funds disbursed by Treasury!");
    showModal.value = false;
  }
}

function generateReport() {
  reportGenerated.value = true;
  alert("Periodic payment report generated!");
}

function handleQualificationUpload(event) {
  console.log(event.target.files);
}

function handleEvidenceUpload(event) {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    if (file.size <= 5 * 1024 * 1024) {
      uploadedFiles.value.push(file);
    } else {
      alert(`#{file.name} exceeds 5MB limit`);
    }
  });
}

function deleteFile(index) {
  uploadedFiles.value.splice(index, 1);
}

function removeNotification(index) {
  notifications.value.splice(index, 1);
}
</script>

<style scoped>
.text-left {
  margin: 20px;
}

h1 {
  font-family: "Satoshi", sans-serif;
  font-size: 30px;
  color: var(--dark);
}

p {
  font-size: 16px;
  color: var(--info);
}

.info {
  margin: 30px 20px;
}

h2 {
  padding: 20px;
}

.bd {
  background: var(--primary);
  padding: 10px;
  border-radius: 5px;
  margin-left: 40px;
  border: none;
  margin-bottom: 10px;
}

form {
  margin: 30px;
}

.bg-primary {
  background-color: #007bff; /* Bootstrap primary color */
}

.bg-primary-dark {
  background-color: #0056b3; /* Darker shade for hover */
}

.text-primary {
  color: #007bff;
}

.text-dark {
  color: #343a40;
}

.text-muted {
  color: #6c757d;
}

.text-secondary {
  color: #6c757d;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
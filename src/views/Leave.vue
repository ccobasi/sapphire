<!-- <template>
  <div class="leaves-dashboard">
    <div class="header">
      <div>
        <h1>Leaves</h1>
      <p>Dashboard / Leaves</p>
      </div>
      <div class="header-actions">
        <select class="btn basic">
          <option>All</option>
          <option>New</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <button class="btn basic" @click="openAddLeaveModal" data-bs-toggle="modal" data-bs-target="#addLeaveModal">+ Add Leave</button>
      </div>
    </div>
    <div class="stats">
      <div class="stat-box">
        <p>Today Presents</p>
        <h2>{{ todayPresents }} / {{ totalEmployees }}</h2>
      </div>
      <div class="stat-box">
        <p>Pending Requests</p>
        <h2>{{ pendingRequests }}</h2>
      </div>
    </div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search" />
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th @click="sort('employee')">Employee</th>
            <th @click="sort('leaveType')">Leave Type</th>
            <th @click="sort('from')">From</th>
            <th @click="sort('to')">To</th>
            <th @click="sort('noOfDays')">No of Days</th>
            <th @click="sort('needAllowance')">Need Allowance</th>
            <th @click="sort('reason')">Reason</th>
            <th @click="sort('status')">Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!leaves.length">
            <td colspan="9" class="text-center">No data available</td>
          </tr>
          <tr v-for="leave in sortedLeaves" :key="leave.id">
            <td>{{ leave.employee }}</td>
            <td>{{ leave.leaveType }}</td>
            <td>{{ leave.from }}</td>
            <td>{{ leave.to }}</td>
            <td>{{ leave.noOfDays }}</td>
            <td>{{ leave.needAllowance ? 'Yes' : 'No' }}</td>
            <td>{{ leave.reason }}</td>
            <td>{{ leave.status }}</td>
            <td>
              <button class="btn btn-sm btn-primary">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>Rows per page: </span>
      <select v-model="rowsPerPage">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>{{ currentPage }} - {{ totalPages }} of {{ totalLeaves }}</span>
      <button class="btn" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button class="btn" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>

  <div class="modal fade" id="addLeaveModal" tabindex="-1" aria-labelledby="addLeaveModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addLeaveModalLabel">Add Leave Request</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
          
            <div class="col-md-6 mb-3">
              <label for="employeeName" class="form-label">Employee Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control rounded-pill" id="employeeName" placeholder="Enter employee name" required>
            </div>

            <div class="col-md-6 mb-3">
              <label for="leaveType" class="form-label">Leave Type <span class="text-danger">*</span></label>
              <select class="form-select rounded-pill" id="leaveType" required>
                <option value="" disabled selected>Select leave type</option>
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Maternity Leave</option>
                <option>Paternity Leave</option>
                <option>Study Leave</option>
                <option>Compassionate Leave</option>

              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="fromDate" class="form-label">From Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control rounded-pill" id="fromDate" required>
            </div>

            <div class="col-md-6 mb-3">
              <label for="toDate" class="form-label">To Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control rounded-pill" id="toDate" required>
            </div>

            <div class="col-md-6 mb-3">
              <label for="noOfDays" class="form-label">Number of Days <span class="text-danger">*</span></label>
              <input type="number" class="form-control rounded-pill" id="noOfDays" placeholder="Enter number of days" required min="1">
            </div>

            <div class="col-md-6 mb-3">
              <label for="needAllowance" class="form-label">Need Allowance</label>
              <select class="form-select rounded-pill" id="needAllowance">
                <option value="yes">Yes</option>
                <option value="no" selected>No</option>
              </select>
            </div>

            <div class="col-md-12 mb-3">
              <label for="reason" class="form-label">Reason <span class="text-danger">*</span></label>
              <textarea class="form-control rounded-pill" id="reason" placeholder="Enter reason for leave" required rows="3"></textarea>
            </div>

            <div class="col-md-6 mb-3">
              <label for="status" class="form-label">Initial Status</label>
              <select class="form-select rounded-pill" id="status">
                <option value="pending" selected>Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="contactInfo" class="form-label">Emergency Contact Info</label>
              <input type="text" class="form-control rounded-pill" id="contactInfo" placeholder="Optional: Emergency contact details">
            </div>

            <div class="text-center mt-3">
              <button type="submit" class="btn btn-primary rounded-pill px-4">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { authStore } from "../store/store";


const store = authStore();
const tab = ref(1);

const todayPresents = ref(34);
const totalEmployees = ref(34);
const pendingRequests = ref(11);
const searchQuery = ref('');
const sortKey = ref('employee');
const sortOrder = ref(1);
const currentPage = ref(1);
const rowsPerPage = ref(10);

const leaves = ref([

]);

// Computed properties
const filteredLeaves = computed(() => {
  return leaves.value.filter(leave => 
    leave.employee.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    leave.leaveType.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    leave.reason.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const sortedLeaves = computed(() => {
  return filteredLeaves.value.sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];
    if (aValue < bValue) return -1 * sortOrder.value;
    if (aValue > bValue) return 1 * sortOrder.value;
    return 0;
  }).slice((currentPage.value - 1) * rowsPerPage.value, currentPage.value * rowsPerPage.value);
});

const totalLeaves = computed(() => filteredLeaves.value.length);
const totalPages = computed(() => Math.ceil(totalLeaves.value / rowsPerPage.value));

// Methods
const sort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const openAddLeaveModal = () => {
  console.log('Open add leave modal');
};

onMounted(() => {
  store.currentpage = 'leave';
  store.showSidebar = false;
});
</script>

<style scoped>
.leaves-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-family: "Satoshi", sans-serif;
}

.header p {
  margin: 0;
  color: #6c757d;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Satoshi", sans-serif;
}

.btn .basic {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  background: var(--primary);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.basic {
  background: var(--primary);
  color: white;
}

.basic:hover {
  opacity: 0.8;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-box {
  background: white;
  padding: 15px;
  border-radius: 8px;
  flex: 1;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.stat-box p {
  margin: 0;
  color: #6c757d;
  font-size: 14px;
}

.stat-box h2 {
  margin: 5px 0 0;
  font-size: 24px;
  color: #333;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  outline: none;
  font-family: "Satoshi", sans-serif;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
  font-family: "Satoshi", sans-serif;
}

.table th {
  cursor: pointer;
  background-color: #e9ecef;
  font-weight: bold;
  color: #333;
}

.table th i {
  margin-left: 5px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination span, .pagination select {
  color: #6c757d;
  font-family: "Satoshi", sans-serif;
}

.pagination select {
  margin: 0 10px;
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-family: "Satoshi", sans-serif;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }

  .stats {
    flex-direction: column;
  }

  .stat-box {
    margin-bottom: 10px;
  }

  .table th, .table td {
    font-size: 14px;
    padding: 8px;
  }
  
  .pagination {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .pagination > * {
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .leaves-dashboard {
    padding: 10px;
  }

  .header h1 {
    font-size: 20px;
  }

  .table th, .table td {
    font-size: 12px;
    padding: 6px;
  }

  .btn {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style> -->
<template>
  <div class="leaves-dashboard">
    <div class="header">
      <div class="title">
        <h1>Leave Management</h1>
        <p>Dashboard / Leave Management</p>
      </div>
      <div class="header-actions">
        <select class="btn basic" v-model="filterStatus">
          <option value="All">All</option>
          <option value="Pending Employee Submission">Pending Employee Submission</option>
          <option value="Pending HOD Review">Pending HOD Review</option>
          <option value="Pending HR Review">Pending HR Review</option>
          <option value="Approved">Approved</option>
          <option value="Published">Published</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select class="btn basic" v-model="currentRole" @change="switchRole">
          <option value="employee">Employee</option>
          <option value="hod">HOD</option>
          <option value="hr">HR</option>
        </select>
        <button v-if="currentRole === 'hr'" class="btn primary" @click="sendLeavePlanReminder">Send Leave Plan Reminder to Employees</button>
      </div>
    </div>
    <div class="stats">
      <div class="stat-box">
        <p>Today Presents</p>
        <h2>{{ todayPresents }} / {{ totalEmployees }}</h2>
      </div>
      <div class="stat-box">
        <p>Pending Requests</p>
        <h2>{{ pendingRequests }}</h2>
      </div>
    </div>
    <div class="selector-options">
      <button v-if="currentRole === 'hr'" class="btn option" :class="{ active: activeTab === 'leavePlanning' }" @click="activeTab = 'leavePlanning'">
        Leave Planning
      </button>
      <button v-if="currentRole === 'employee'" class="btn option" :class="{ active: activeTab === 'myLeavePlan' }" @click="activeTab = 'myLeavePlan'; openLeaveModal()">
        My Leave Plan
      </button>
      <button v-if="currentRole === 'hod'" class="btn option" :class="{ active: activeTab === 'leavePlanning' }" @click="activeTab = 'leavePlanning'">
        HOD Review
      </button>
    </div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search" />
    </div>
    <div class="table-responsive">
      <TableOne :tableData="filteredAndSortedLeaves" :headings="currentTableHeadings" :tableType="'leaveManagement'" :tableOption="activeTab">
        <template #actions="{ item }">
          <div class="actions d-flex gap-2" v-if="currentRole === 'employee' && activeTab === 'myLeavePlan'">
            <button v-if="item.employeeName === formData.employeeName && item.status === 'Pending Employee Submission'" class="btn small secondary" @click="openLeaveModal(item)">
              Update
            </button>
          </div>
          <div class="actions d-flex gap-2" v-if="currentRole === 'hod' && activeTab === 'leavePlanning'">
            <button class="btn small secondary" @click="openLeaveModal(item)" :disabled="item.status === 'Published' || item.status === 'Approved' || item.status === 'Pending Employee Submission'">
              Update
            </button>
            <button v-if="item.status === 'Pending HOD Review'" class="btn small primary" @click="updateLeaveStatus(item, 'approveHOD')">Approve (HOD)</button>
            <button v-if="item.status === 'Pending HOD Review'" class="btn small warning" @click="formData.value.hodComments = ''; openLeaveModal(item); updateLeaveStatus(item, 'declineHOD')">Decline (HOD)</button>
          </div>
          <div class="actions d-flex gap-2" v-if="currentRole === 'hr' && activeTab === 'leavePlanning'">
            <button class="btn small secondary" @click="openLeaveModal(item)" :disabled="item.status === 'Published' || item.status === 'Approved' || item.status === 'Pending Employee Submission'">
              Update
            </button>
            <button v-if="item.status === 'Pending HR Review'" class="btn small primary" @click="updateLeaveStatus(item, 'approveHR')">Approve (HR)</button>
            <button v-if="item.status === 'Approved'" class="btn small success" @click="updateLeaveStatus(item, 'publish')">Publish</button>
          </div>
        </template>
      </TableOne>
    </div>
    <div class="pagination">
      <span>Rows per page: </span>
      <select v-model="rowsPerPage">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>{{ currentPage }} - {{ totalPages }} of {{ totalLeaves }}</span>
      <button class="btn" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button class="btn" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <div class="modal" v-if="isModalOpen" @click.self="closeModal">
      <div class="modal-content" :class="{ 'closing': isModalClosing }" @click.stop>
        <div class="top-section mt-4">
          <h3 class="title">{{ selectedEmployee ? `Update Leave Plan` : `Submit New Leave Plan` }} - Step {{ currentStep }} of 5</h3>
          <div class="close-button" @click="closeModal">
            <iconify-icon icon="material-symbols:close" width="24" height="24"></iconify-icon>
          </div>
        </div>

        <div class="main">
          <div class="items mt-4">
            <div class="step-content">

              <div v-if="activeTab === 'myLeavePlan' || activeTab === 'leavePlanning'">
                <div v-if="currentStep === 1 && currentRole === 'employee'">
                  <h4>Step 1: Employee Submission</h4>
                  <div class="form-group">
                    <label>Employee Name:</label>
                    <select class="form-control" v-model="formData.employeeName" :disabled="selectedEmployee">
                      <option v-for="employee in employeeList" :key="employee" :value="employee">{{ employee }}</option>
                    </select>
                  </div>
                  <div class="form-group mt-2">
                    <label>Leave Period (e.g., MM/DD/YYYY to MM/DD/YYYY):</label>
                    <input type="text" class="form-control" v-model="formData.leavePeriod" />
                  </div>
                  <div class="button-group mt-2">
                    <button class="btn primary" @click="submitLeave" :disabled="!formData.employeeName || !formData.leavePeriod">
                      Submit Plan
                    </button>
                    <button v-if="selectedEmployee" class="btn secondary" @click="prevStep">Back</button>
                  </div>
                </div>
                <div v-if="currentStep === 2 && currentRole === 'hod'">
                  <h4>Step 2: HOD Review</h4>
                  <p>Review leave plan for {{ formData.employeeName }}. Reconcile conflicts with employee if any.</p>
                  <div class="form-group">
                    <label>HOD Comments:</label>
                    <textarea class="form-control" v-model="formData.hodComments" rows="3" placeholder="Discuss and resolve conflicts with the employee"></textarea>
                  </div>
                  <div class="button-group mt-2">
                    <button class="btn primary" @click="updateLeaveStatus(selectedEmployee, 'approveHOD')">Approve</button>
                    <button class="btn warning" @click="updateLeaveStatus(selectedEmployee, 'declineHOD')">Decline</button>
                    <button class="btn secondary" @click="prevStep">Back</button>
                    <button class="btn secondary" @click="nextStep">Next</button>
                  </div>
                </div>
                <div v-if="currentStep === 3 && currentRole === 'hr'">
                  <h4>Step 3: HR Review</h4>
                  <p>Review leave plan for completeness and collation.</p>
                  <div class="form-group">
                    <label>HR Comments:</label>
                    <textarea class="form-control" v-model="formData.hrComments" rows="3"></textarea>
                  </div>
                  <div class="button-group mt-2">
                    <button class="btn primary" @click="updateLeaveStatus(selectedEmployee, 'approveHR')">Approve</button>
                    <button class="btn secondary" @click="prevStep">Back</button>
                    <button class="btn secondary" @click="nextStep">Next</button>
                  </div>
                </div>
                <div v-if="currentStep === 4 && currentRole === 'hr'">
                  <h4>Step 4: HR Final Approval</h4>
                  <p>Approve and prepare the leave plan for publishing.</p>
                  <div class="form-group">
                    <label>HR Final Comments:</label>
                    <textarea class="form-control" v-model="formData.hrFinalComments" rows="3"></textarea>
                  </div>
                  <div class="button-group mt-2">
                    <button class="btn primary" @click="updateLeaveStatus(selectedEmployee, 'approveHRFinal')">Approve</button>
                    <button class="btn secondary" @click="prevStep">Back</button>
                    <button class="btn secondary" @click="nextStep">Next</button>
                  </div>
                </div>
                <div v-if="currentStep === 5 && currentRole === 'hr'">
                  <h4>Step 5: Publish Leave Plan</h4>
                  <p>Publish the finalized leave plan for the year for execution.</p>
                  <div class="button-group mt-2">
                    <button class="btn success" @click="updateLeaveStatus(selectedEmployee, 'publish'); closeModal()">Publish</button>
                    <button class="btn secondary" @click="prevStep">Back</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import TableOne from "../components/TableOne.vue";
import { authStore } from "../store/store";

const store = authStore();
const activeTab = ref("leavePlanning"); 
const selectedEmployee = ref(null); 
const currentStep = ref(1); 
const filterStatus = ref("All"); 
const isModalOpen = ref(false); 
const isModalClosing = ref(false); 
const currentRole = ref("employee"); 
const employeeList = ref(["Ernest Young", "Adebayo Jamal"]);
const canSubmit = computed(() => currentRole.value === 'employee' && leaveData.value.leavePlanning.some(plan => plan.employeeName === formData.value.employeeName && plan.status === 'Pending Employee Submission'));

const todayPresents = ref(34);
const totalEmployees = ref(34);
const pendingRequests = ref(11);
const searchQuery = ref('');
const sortKey = ref('employeeName');
const sortOrder = ref(1);
const currentPage = ref(1);
const rowsPerPage = ref(10);

const leaveData = ref({
  leavePlanning: [
    {
      employeeName: "Ernest Young",
      leavePeriod: "2025-06-01 to 2025-06-15",
      status: "Pending Employee Submission",
      submittedDate: null,
      hod: "Jane Doe",
      hrComments: "",
      hrFinalComments: "",
      hodComments: "",
    },
    {
      employeeName: "Adebayo Jamal",
      leavePeriod: "",
      status: "Pending Employee Submission",
      submittedDate: null,
      hod: "John Smith",
      hrComments: "",
      hrFinalComments: "",
      hodComments: "",
    },
  
  ],
  leaveApplications: [], 
});

const tableHeadings = {
  leavePlanning: [
    "Employee Name",
    "Leave Period",
    "Status",
    "Submitted Date",
    "Actions",
  ],
  myLeavePlan: [
    "Employee Name",
    "Leave Period",
    "Status",
    "Submitted Date",
    "Actions",
  ],
  leaveApplications: [
    "Employee Name",
    "Leave Type",
    "Start Date",
    "End Date",
    "No of Days",
    "Status",
    "Actions",
  ],
};

const currentTableData = computed(() => {
  if (currentRole.value === 'employee' && activeTab.value === 'myLeavePlan') {
    return leaveData.value.leavePlanning.filter(item => 
      item.employeeName === formData.value.employeeName && 
      (filterStatus.value === "All" || item.status === filterStatus.value)
    );
  } else if (currentRole.value === 'hod' && activeTab.value === 'leavePlanning') {
    return leaveData.value.leavePlanning.filter(item => 
      item.hod === assignHOD(item.employeeName) && (filterStatus.value === "All" || item.status === filterStatus.value)
    );
  } else if (currentRole.value === 'hr' && activeTab.value === 'leavePlanning') {
    return leaveData.value.leavePlanning.filter(item => 
      filterStatus.value === "All" || item.status === filterStatus.value
    );
  }
  return leaveData.value.leavePlanning.filter(item => filterStatus.value === "All" || item.status === filterStatus.value);
});

const currentTableHeadings = computed(() => {
  if (currentRole.value === 'employee' && activeTab.value === 'myLeavePlan') {
    return tableHeadings.myLeavePlan;
  }
  return tableHeadings[activeTab.value];
});

const filteredAndSortedLeaves = computed(() => {
  return currentTableData.value
    .filter(leave => 
      leave.employeeName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortKey.value] || a[sortKey.value.toLowerCase()];
      const bValue = b[sortKey.value] || b[sortKey.value.toLowerCase()];
      if (aValue < bValue) return -1 * sortOrder.value;
      if (aValue > bValue) return 1 * sortOrder.value;
      return 0;
    })
    .slice((currentPage.value - 1) * rowsPerPage.value, currentPage.value * rowsPerPage.value);
});

const totalLeaves = computed(() => currentTableData.value.length);
const totalPages = computed(() => Math.ceil(totalLeaves.value / rowsPerPage.value));

const formData = ref({
  employeeName: "Ernest Young", 
  leavePeriod: "",
  hodComments: "",
  hrComments: "",
  hrFinalComments: "",
});

const switchRole = () => {

  closeModal();
  currentStep.value = 1;
  if (currentRole.value === 'employee') {
    activeTab.value = 'myLeavePlan'; 
    formData.value.employeeName = "Ernest Young";
  } else {
    activeTab.value = 'leavePlanning'; 
    formData.value.employeeName = ""; 
  }
};

const sendLeavePlanReminder = () => {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7); 
  employeeList.value.forEach(employee => {
    sendNotification(`Submit Your Annual Leave Plan`, employee, `Please submit your annual leave plan by ${deadline.toLocaleDateString()}.`);
  });

  leaveData.value.leavePlanning.forEach(plan => {
    if (!plan.submittedDate && !employeeList.value.includes(plan.employeeName)) {
      plan.status = "Pending Employee Submission";
    }
  });
  leaveData.value.leavePlanning = [...leaveData.value.leavePlanning]; 
};

const submitLeave = () => {
  console.log('Submitting leave plan:', formData.value); 
  const existingPlan = leaveData.value.leavePlanning.find(plan => plan.employeeName === formData.value.employeeName && plan.status === 'Pending Employee Submission');
  if (existingPlan) {
    existingPlan.leavePeriod = formData.value.leavePeriod;
    existingPlan.status = "Pending HOD Review";
    existingPlan.submittedDate = new Date().toLocaleDateString();
    existingPlan.hodComments = ""; 
  } else {
    leaveData.value.leavePlanning.push({
      employeeName: formData.value.employeeName,
      leavePeriod: formData.value.leavePeriod,
      status: "Pending HOD Review",
      submittedDate: new Date().toLocaleDateString(),
      hod: assignHOD(formData.value.employeeName),
      hrComments: "",
      hrFinalComments: "",
      hodComments: "",
    });
  }
  leaveData.value.leavePlanning = [...leaveData.value.leavePlanning]; 
  console.log('New plan submitted:', leaveData.value.leavePlanning); 
  sendNotification("Leave Plan Submitted", formData.value.employeeName, "Your leave plan has been sent to your HOD for review.");
  closeModal(); 
};

const assignHOD = (employeeName) => {
  const hodAssignments = {
    "Ernest Young": "Jane Doe",
    "Adebayo Jamal": "John Smith",
  };
  return hodAssignments[employeeName] || "Jane Doe"; 
};

const updateLeaveStatus = (item, action) => {
  const data = leaveData.value.leavePlanning;
  const index = data.findIndex((entry) => entry.employeeName === item.employeeName);

  if (index !== -1) {
    switch (action) {
      case "approveHOD":
        data[index].status = "Pending HR Review";
        sendNotification("Leave Plan Approved by HOD", item.employeeName, "Your leave plan has been sent to HR for review.");
        break;
      case "declineHOD":
        data[index].status = "Pending HOD Review";
        data[index].hodComments = formData.value.hodComments || "Please revise your leave plan.";
        sendNotification("Leave Plan Declined by HOD", item.employeeName, "Please revise your leave plan based on HOD comments.");
        break;
      case "approveHR":
        data[index].status = "Pending HR Review"; 
        sendNotification("Leave Plan Reviewed by HR", item.employeeName, "HR is reviewing your leave plan.");
        break;
      case "approveHRFinal":
        data[index].status = "Approved";
        sendNotification("Leave Plan Approved by HR", item.employeeName, "Your leave plan has been approved and is ready for publishing.");
        break;
      case "publish":
        data[index].status = "Published";
        sendNotification("Leave Plan Published", item.employeeName, "Your leave plan for the year has been published for execution.");
        break;
    }
    leaveData.value.leavePlanning = [...leaveData.value.leavePlanning]; 
  }
};

const sendNotification = (subject, employeeName, message) => {
  console.log(`Notification: ${subject} for ${employeeName} - ${message} Deadline: ${new Date().toLocaleDateString()} (7 days from submission)`);
};

const openLeaveModal = (item = null) => {
  selectedEmployee.value = item || null;
  currentStep.value = item ? getStepForStatus(item.status) : 1; 
  isModalOpen.value = true; 
  isModalClosing.value = false; 
  formData.value = {
    employeeName: item?.employeeName || "Ernest Young", 
    leavePeriod: item?.leavePeriod || "",
    hodComments: item?.hodComments || "",
    hrComments: item?.hrComments || "",
    hrFinalComments: item?.hrFinalComments || "",
  };
};

const getStepForStatus = (status) => {
  switch (status) {
    case "Pending HOD Review": return 2;
    case "Pending HR Review": return 3;
    case "Approved": return 4;
    default: return 1;
  }
};

const closeModal = () => {
  isModalClosing.value = true;
  setTimeout(() => {
    isModalOpen.value = false; 
    selectedEmployee.value = null;
    currentStep.value = 1;
    formData.value = {
      employeeName: "Ernest Young",
      leavePeriod: "",
      hodComments: "",
      hrComments: "",
      hrFinalComments: "",
    };
    isModalClosing.value = false; 
  }, 300); 
};

const nextStep = () => {
  if (currentStep.value < 5) currentStep.value++;
  updateLeaveStatus(selectedEmployee, getActionForStep());
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const getActionForStep = () => {
  switch (currentStep.value) {
    case 2: return "approveHOD";
    case 3: return "approveHR";
    case 4: return "approveHRFinal";
    case 5: return "publish";
    default: return "";
  }
};

const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
  return diffDays;
};

onMounted(() => {
  store.currentpage = 'leaveManagement';
  store.showSidebar = false;
});
</script>

<style scoped>
.leaves-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header .title h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-family: "Satoshi", sans-serif;
}

.header .title p {
  margin: 0;
  color: #6c757d;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Satoshi", sans-serif;
}

.btn.basic {
  background: var(--primary);
  color: white;
}

.btn.basic:hover {
  opacity: 0.8;
}

.btn.secondary {
  background-color: #6c757d;
  color: white;
}

.btn.secondary:hover {
  background-color: darken(#6c757d, 10%);
}

.btn.primary {
  background-color: var(--primary);
  color: white;
}

.btn.primary:hover {
  background-color: darken(var(--primary), 10%);
}

.btn.warning {
  background-color: #ffc107;
  color: #000;
}

.btn.warning:hover {
  background-color: darken(#ffc107, 10%);
}

.btn.success {
  background-color: #28a745;
  color: white;
}

.btn.success:hover {
  background-color: darken(#28a745, 10%);
}

.btn.small {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-box {
  background: white;
  padding: 15px;
  border-radius: 8px;
  flex: 1;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.stat-box p {
  margin: 0;
  color: #6c757d;
  font-size: 14px;
}

.stat-box h2 {
  margin: 5px 0 0;
  font-size: 24px;
  color: #333;
}

.selector-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.selector-options .option {
  border-radius: 1.5rem;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0.5rem 1.5rem;
}

.selector-options .option.active {
  background-color: var(--primary);
  color: var(--bs-white);
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  outline: none;
  font-family: "Satoshi", sans-serif;
}

.table-responsive {
  overflow-x: auto;
}

.actions.d-flex.gap-2 {
  gap: 0.5rem;
}

.modal {
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.modal .modal-content {
  width: 100%;
  max-width: 50rem;
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadein 0.5s ease forwards;
}

.modal-content {
  overflow-y: auto;
  max-height: 80vh;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-content.closing {
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeout 0.3s ease forwards;
}

.modal-content .top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-content .top-section .title {
  font-size: 24px;
  color: var(--dark);
}

.modal-content .top-section .close-button {
  background: var(--primary);
  border-radius: 0.5rem;
  padding: 0.3rem;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content .top-section .close-button:hover {
  background-color: darken(var(--primary), 10%);
}

.modal-content .main .items .step-content {
  padding: 1rem;
}

.modal-content .main .items .form-group {
  margin-bottom: 1rem;
}

.modal-content .main .items .form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.modal-content .main .items .form-group input,
.modal-content .main .items .form-group select,
.modal-content .main .items .form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.modal-content .main .items .button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination span,
.pagination select {
  color: #6c757d;
  font-family: "Satoshi", sans-serif;
}

.pagination select {
  margin: 0 10px;
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-family: "Satoshi", sans-serif;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }

  .stats {
    flex-direction: column;
  }

  .stat-box {
    margin-bottom: 10px;
  }

  .selector-options {
    flex-direction: column;
    align-items: flex-start;
  }

  .selector-options .option {
    width: 100%;
    text-align: center;
  }

  .pagination {
    flex-direction: column;
    align-items: flex-start;
  }

  .pagination > * {
    margin-bottom: 10px;
  }

  .modal .modal-content {
    max-width: 90%;
    padding: 1rem;
  }

  .modal-content .main .items .form-group {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .leaves-dashboard {
    padding: 10px;
  }

  .header .title h1 {
    font-size: 20px;
  }

  .btn {
    padding: 8px 12px;
    font-size: 14px;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
<template>
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
            <!-- Employee Name -->
            <div class="col-md-6 mb-3">
              <label for="employeeName" class="form-label">Employee Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control rounded-pill" id="employeeName" placeholder="Enter employee name" required>
            </div>

            <!-- Leave Type -->
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
                <!-- Add more leave types specific to Nigerian labor laws if necessary -->
              </select>
            </div>

            <!-- From Date -->
            <div class="col-md-6 mb-3">
              <label for="fromDate" class="form-label">From Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control rounded-pill" id="fromDate" required>
            </div>

            <!-- To Date -->
            <div class="col-md-6 mb-3">
              <label for="toDate" class="form-label">To Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control rounded-pill" id="toDate" required>
            </div>

            <!-- Number of Days -->
            <div class="col-md-6 mb-3">
              <label for="noOfDays" class="form-label">Number of Days <span class="text-danger">*</span></label>
              <input type="number" class="form-control rounded-pill" id="noOfDays" placeholder="Enter number of days" required min="1">
            </div>

            <!-- Need Allowance -->
            <div class="col-md-6 mb-3">
              <label for="needAllowance" class="form-label">Need Allowance</label>
              <select class="form-select rounded-pill" id="needAllowance">
                <option value="yes">Yes</option>
                <option value="no" selected>No</option>
              </select>
            </div>

            <!-- Reason -->
            <div class="col-md-12 mb-3">
              <label for="reason" class="form-label">Reason <span class="text-danger">*</span></label>
              <textarea class="form-control rounded-pill" id="reason" placeholder="Enter reason for leave" required rows="3"></textarea>
            </div>

            <!-- Status -->
            <div class="col-md-6 mb-3">
              <label for="status" class="form-label">Initial Status</label>
              <select class="form-select rounded-pill" id="status">
                <option value="pending" selected>Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <!-- Contact Information (Optional for emergency or HR purposes) -->
            <div class="col-md-6 mb-3">
              <label for="contactInfo" class="form-label">Emergency Contact Info</label>
              <input type="text" class="form-control rounded-pill" id="contactInfo" placeholder="Optional: Emergency contact details">
            </div>

            <!-- Submit Button -->
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
</style>
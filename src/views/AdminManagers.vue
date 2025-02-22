<template>
  <div class="employee-dashboard">
    <div class="first">
    <div class="title">
        <h1>Administrative Line Managers</h1>
        <p>Dashboard / Managers</p>
    </div>

    </div>
    <div class="search-bar">
      <input type="text" v-model="search.employeeCode" placeholder="Employee Code">
      <input type="text" v-model="search.employeeName" placeholder="Employee Name">
      <select v-model="search.designation">
        <option value="" selected>Select Designation</option>
        <option v-for="designation in designations" :key="designation" :value="designation">{{ designation }}</option>
      </select>
      <button class="btn search-btn" @click="searchEmployees">SEARCH</button>
    </div>
    <table class="employee-table">
      <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('employeeCode')">Employee Code</th>
          <th @click="sort('email')">Email</th>
          <th @click="sort('mobile')">Mobile</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in sortedEmployees" :key="employee.employeeCode">
          <td>{{ employee.name }}</td>
          <td>{{ employee.employeeCode }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.mobile }}</td>
          <td><button class="btn details-btn" @click="viewDetails(employee)">Details</button></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <span>Rows per page: </span>
      <select v-model="rowsPerPage">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>{{ currentPage }} - {{ totalPages }} of {{ totalEmployees }}</span>
      <button class="btn" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button class="btn" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>

  <div class="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addEmployeeModalLabel">Add Employee</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              
              <div class="col-md-6 mb-3">
                <label for="firstName" class="form-label">First Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control rounded-pill" id="firstName" placeholder="Enter first name" required>
              </div>

              <div class="col-md-6 mb-3">
                <label for="lastName" class="form-label">Last Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control rounded-pill" id="lastName" placeholder="Enter last name" required>
              </div>

              <div class="col-md-6 mb-3">
                <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                <input type="email" class="form-control rounded-pill" id="email" placeholder="Enter email" required>
              </div>

              <div class="col-md-6 mb-3">
                <label for="phone" class="form-label">Phone <span class="text-danger">*</span></label>
                <input type="tel" class="form-control rounded-pill" id="phone" placeholder="Enter phone number" required>
              </div>

              <div class="col-md-6 mb-3">
                <label for="businessUnit" class="form-label">Business Unit <span class="text-danger">*</span></label>
                <select class="form-select rounded-pill" id="businessUnit" required>
                  <option value="" disabled selected>Select business unit</option>
                  <option>Unit 1</option>
                  <option>Unit 2</option>
                  <option>Unit 3</option>
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label for="designation" class="form-label">Designation <span class="text-danger">*</span></label>
                <select class="form-select rounded-pill" id="designation" required>
                  <option value="" disabled selected>Select designation</option>
                  <option>Designer</option>
                  <option>Developer</option>
                  <option>Manager</option>
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label for="level" class="form-label">Level</label>
                <select class="form-select rounded-pill" id="level">
                  <option value="" disabled selected>Select level</option>
                  <option>Junior</option>
                  <option>Mid</option>
                  <option>Senior</option>
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label for="employeeCode" class="form-label">Employee Code</label>
                <input type="text" class="form-control rounded-pill" id="employeeCode" placeholder="Enter employee code">
              </div>

              <div class="col-md-6 mb-3">
                <label for="joinedDate" class="form-label">Joined Date</label>
                <input type="date" class="form-control rounded-pill" id="joinedDate">
              </div>
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-primary rounded-pill px-4">Submit</button>
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

const employees = ref([
  { name: 'Codeware Dummy (Testing)', employeeCode: 'jd001', busUnit: 'Global', email: 'johndoe@email.com', mobile: '0801234598', joinDate: '6/19/2023', gender: 'male' },
  { name: 'Jane Smith', employeeCode: 'js002', busUnit: 'Marketing', email: 'janesmith@email.com', mobile: '0802345678', joinDate: '7/10/2023', gender: 'female' },
  { name: 'Mike Johnson', employeeCode: 'mj003', busUnit: 'IT', email: 'mikejohnson@email.com', mobile: '0803456789', joinDate: '8/22/2023', gender: 'male' },
  { name: 'Emily Brown', employeeCode: 'eb004', busUnit: 'HR', email: 'emilybrown@email.com', mobile: '0804567890', joinDate: '9/15/2023', gender: 'female' },
  { name: 'Alex Lee', employeeCode: 'al005', busUnit: 'Finance', email: 'alexlee@email.com', mobile: '0805678901', joinDate: '10/05/2023', gender: 'male' },
  { name: 'Sara Kim', employeeCode: 'sk006', busUnit: 'Sales', email: 'sarakim@email.com', mobile: '0806789012', joinDate: '11/20/2023', gender: 'female' },
  { name: 'Tom White', employeeCode: 'tw007', busUnit: 'Operations', email: 'tomwhite@email.com', mobile: '0807890123', joinDate: '12/03/2023', gender: 'male' },
  { name: 'Lily Chen', employeeCode: 'lc008', busUnit: 'Research', email: 'lilychen@email.com', mobile: '0808901234', joinDate: '1/15/2024', gender: 'female' },
  { name: 'Daniel Perez', employeeCode: 'dp009', busUnit: 'Customer Service', email: 'danielperez@email.com', mobile: '0809012345', joinDate: '2/20/2024', gender: 'male' },
  { name: 'Sophia Martinez', employeeCode: 'sm010', busUnit: 'Legal', email: 'sophiamartinez@email.com', mobile: '0810123456', joinDate: '3/05/2024', gender: 'female' },
  { name: 'Oliver Taylor', employeeCode: 'ot011', busUnit: 'Engineering', email: 'olivertaylor@email.com', mobile: '0811234567', joinDate: '4/10/2024', gender: 'male' },
  { name: 'Ava Wilson', employeeCode: 'aw012', busUnit: 'Design', email: 'avawilson@email.com', mobile: '0812345678', joinDate: '5/20/2024', gender: 'female' },
  { name: 'Ethan Davis', employeeCode: 'ed013', busUnit: 'Logistics', email: 'ethandavis@email.com', mobile: '0813456789', joinDate: '6/01/2024', gender: 'male' },
  { name: 'Isabella Harris', employeeCode: 'ih014', busUnit: 'Quality Assurance', email: 'isabellaharris@email.com', mobile: '0814567890', joinDate: '7/15/2024', gender: 'female' },
  { name: 'Lucas Moore', employeeCode: 'lm015', busUnit: 'Security', email: 'lucasmoore@email.com', mobile: '0815678901', joinDate: '8/01/2024', gender: 'male' }
]);

const search = ref({
  employeeCode: '',
  employeeName: '',
  designation: '',
});

const designations = ref(['ACCOUNT CLERK', 'BILLING OFFICER', 'HEAD, FINANCE', 'STORE OFFICER', 'GROUP HUMAN RESOURCES EXECUTIVE', 'GMD', 'TLPM']);

const sortKey = ref('name');
const sortOrder = ref(1);
const currentPage = ref(1);
const rowsPerPage = ref(10);

// Computed properties
const filteredEmployees = computed(() => {
  return employees.value.filter(employee => 
    employee.employeeCode.toLowerCase().includes(search.value.employeeCode.toLowerCase()) &&
    employee.name.toLowerCase().includes(search.value.employeeName.toLowerCase()) &&
    (search.value.designation === '' || employee.name.includes(search.value.designation))
  );
});

const sortedEmployees = computed(() => {
  return filteredEmployees.value.sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];
    if (aValue < bValue) return -1 * sortOrder.value;
    if (aValue > bValue) return 1 * sortOrder.value;
    return 0;
  }).slice((currentPage.value - 1) * rowsPerPage.value, currentPage.value * rowsPerPage.value);
});

const totalEmployees = computed(() => filteredEmployees.value.length);
const totalPages = computed(() => Math.ceil(totalEmployees.value / rowsPerPage.value));

// Methods
const searchEmployees = () => {
  currentPage.value = 1;
};

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

onMounted(() => {
    store.currentpage = 'managers';
    store.showSidebar = false;
})

const viewDetails = (employee) => {

  console.log("View details for:", employee);

  alert(`Details for ${employee.name}:\nEmployee Code: ${employee.employeeCode}\nEmail: ${employee.email}\nMobile: ${employee.mobile}`);
};

</script>

<style scoped>
.employee-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.first {
    display: flex;
    justify-content: space-between;
}

.controls {
    display: flex;
}

.controls,
.search-bar,
.pagination {
  margin-bottom: 20px;
  padding-top: 15px;
}

.btn {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  background: var(--primary);
  color: white;
  border-radius: 20px;
}

.add-btn {
  background: var(--primary);
  height: 45px;
}

.btn-primary.dropdown-toggle:hover {
    background-color: #FFA321;
    border-color: #FFA321;
    color: #fff; 
}

.search-btn {
  background: var(--primary);
}

.search-bar input,
.search-bar select {
  padding: 10px;
  margin-right: 10px;
  width: 200px;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
    overflow-x: auto; 
  display: block; 
  white-space: nowrap; 
}

.employee-table th,
.employee-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.employee-table th {

  cursor: pointer;
}

.pagination {
  display: flex;
  align-items: center;
}

.pagination select {
  margin: 0 10px;
}

.details-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.details-btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .search-bar input,
  .search-bar select {
    width: 100%;
    margin-bottom: 10px;
  }

  .employee-table {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .first {
    flex-direction: column;
  }

  .title {
    margin-bottom: 10px;
  }

  .controls {
    gap: 10px;
    flex-direction: column;
  }

  .controls .btn {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar input,
  .search-bar select,
  .search-btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .employee-table th,
  .employee-table td {
    padding: 8px;
    font-size: 12px;
  }

  .pagination {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .pagination span,
  .pagination select {
    margin-bottom: 10px;
  }

  .pagination .btn {
    margin: 0;
    flex-grow: 1;
  }
}

@media (max-width: 576px) {
  .modal-dialog {
    max-width: 90%;
    margin: 1.75rem auto;
  }

  .modal-content {
    border-radius: 0.3rem;
  }

  .modal-body form .col-md-6 {
    width: 100%;
  }
}
</style>
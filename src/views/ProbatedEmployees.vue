<template>
  <div class="employee-dashboard">
    <div class="first">
      <div class="title">
        <h1>Probated Employees</h1>
        <p>Dashboard / Probated Employees</p>
      </div>
    </div>

    <table class="employee-table">
      <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('employeeCode')">Employee Code</th>
          <th @click="sort('email')">Email</th>
          <th @click="sort('joinDate')">Start Date</th>
          <th @click="sort('endDate')">End Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in sortedEmployees" :key="employee.employeeCode">
          <td>{{ employee.name }}</td>
          <td>{{ employee.employeeCode }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.joinDate }}</td>
          <td>{{ employee.endDate || 'N/A' }}</td>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { authStore } from "../store/store";

const store = authStore();
const tab = ref(1);

const employees = ref([
  { name: 'Codeware Dummy (Testing)', employeeCode: 'jd001', busUnit: 'Global', email: 'johndoe@email.com', mobile: '0801234598', joinDate: '6/19/2023', gender: 'male', birthday: '01/01/1990', endDate: '12/12/2024' },
  { name: 'Jane Smith', employeeCode: 'js002', busUnit: 'Marketing', email: 'janesmith@email.com', mobile: '0802345678', joinDate: '7/10/2023', gender: 'female', birthday: '05/15/1992', endDate: null },
  { name: 'Mike Johnson', employeeCode: 'mj003', busUnit: 'IT', email: 'mikejohnson@email.com', mobile: '0803456789', joinDate: '8/22/2023', gender: 'male', birthday: '11/22/1985', endDate: null },
  { name: 'Emily Brown', employeeCode: 'eb004', busUnit: 'HR', email: 'emilybrown@email.com', mobile: '0804567890', joinDate: '9/15/2023', gender: 'female', birthday: '03/03/1988', endDate: null },
  { name: 'Alex Lee', employeeCode: 'al005', busUnit: 'Finance', email: 'alexlee@email.com', mobile: '0805678901', joinDate: '10/05/2023', gender: 'male', birthday: '07/07/1995', endDate: null },
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


const viewDetails = (employee) => {
  console.log("View details for:", employee);
  alert(`Details for ${employee.name}:\nEmployee Code: ${employee.employeeCode}\nEmail: ${employee.email}\nStart Date: ${employee.joinDate}`);
};

onMounted(() => {
  store.currentpage = 'probated-employees';
  store.showSidebar = false;
});
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
  table-layout: fixed;
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
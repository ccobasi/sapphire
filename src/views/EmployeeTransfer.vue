<template>
  <div class="transferred-employees">
    <div class="header">
      <div>
        <h1>Transferred Employees</h1>
      <p>Dashboard / Transferred Employees</p>
      </div>
      <button class="btn btn-primary" @click="openTransferModal">+ Transfer Employee</button>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th @click="sort('name')">Employee </th>
            <th @click="sort('fromBusUnit')">From Bus. Unit </th>
            <th @click="sort('fromPosition')">From Position </th>
            <th @click="sort('fromLevel')">From Level </th>
            <th @click="sort('toBusUnit')">To Bus. Unit </th>
            <th @click="sort('toPosition')">To Position </th>
            <th @click="sort('toLevel')">To Level </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in sortedEmployees" :key="employee.employeeCode">
            <td>
              <div class="d-flex align-items-center">
                <div class="avatar me-2">
                  <img src="../assets/profile.jpeg" alt="Employee Avatar" class="rounded-circle">
                </div>
                {{ employee.name }}
              </div>
            </td>
            <td>{{ employee.fromBusUnit }}</td>
            <td>{{ employee.fromPosition }}</td>
            <td>{{ employee.fromLevel }}</td>
            <td>{{ employee.toBusUnit }}</td>
            <td>{{ employee.toPosition }}</td>
            <td>{{ employee.toLevel }}</td>
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
  { name: 'testing codeware2', employeeCode: 'tc001', fromBusUnit: 'Global', fromPosition: 'ACCOUNT OFFICER', fromLevel: 'AGM_S1', toBusUnit: 'Global', toPosition: 'ACCOUNT OFFICER', toLevel: 'AGM_S1' },
  { name: 'testing codeware', employeeCode: 'tc002', fromBusUnit: 'Global', fromPosition: 'ACCOUNT CLERK', fromLevel: 'AGM_S1', toBusUnit: 'Global', toPosition: 'ACCOUNT CLERK', toLevel: 'AGM_S1' },
  // ... Add other employee data here
]);

const sortKey = ref('name');
const sortOrder = ref(1);
const currentPage = ref(1);
const rowsPerPage = ref(10);

// Computed properties
const filteredEmployees = computed(() => {
  return employees.value;
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

const openTransferModal = () => {
  console.log('Open transfer employee modal');
};

onMounted(() => {
  store.currentpage = 'employee-transfer';
  store.showSidebar = false;
});
</script>

<style scoped>
.transferred-employees {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-family: "Satoshi", sans-serif;
}

p {
    font-family: "Satoshi", sans-serif;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-family: "Satoshi", sans-serif;
}

.table th {
  cursor: pointer;
  background-color: #f8f9fa;
}

.avatar img {
  width: 32px;
  height: 32px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination select {
  margin: 0 10px;
}

.btn {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  background: var(--primary);
  color: white;
  border-radius: 20px;
  font-family: "Satoshi", sans-serif;
}

.btn-primary {
  background: var(--primary);
}

@media (max-width: 768px) {
  .table th, .table td {
    font-size: 14px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header .btn {
    margin-top: 10px;
  }
  
  .table th, .table td {
    font-size: 12px;
    padding: 6px;
  }
  
  .pagination {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .pagination span, .pagination select, .pagination button {
    margin-bottom: 10px;
  }
}
</style>
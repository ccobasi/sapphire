<template>
  <div class="loan-requests">
    <div class="header">
      <h1>Loan Requests</h1>
      <p>Dashboard / Loan</p>
    </div>
    <div class="loan-types-grid">
      <div v-for="(loan, index) in loanTypes" :key="index" class="loan-type-card">
        <h3>{{ loan.name }}</h3>
        <p>{{ loan.duration }} Months Maximum</p>
      </div>
    </div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search" />
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th @click="sort('employee')">Employee </th>
            <th @click="sort('loanType')">Loan Type </th>
            <th @click="sort('amount')">Amount </th>
            <th @click="sort('tenor')">Tenor (per month) </th>
            <th @click="sort('repaymentAmount')">Repayment Amount </th>
            <th @click="sort('repaymentStartDate')">Repayment StartDate </th>
            <th @click="sort('status')">Status </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!filteredLoans.length">
            <td colspan="8" class="text-center">No data available</td>
          </tr>
          <tr v-for="loan in sortedLoans" :key="loan.id">
            <td>{{ loan.employee }}</td>
            <td>{{ loan.loanType }}</td>
            <td>{{ loan.amount }}</td>
            <td>{{ loan.tenor }}</td>
            <td>{{ loan.repaymentAmount }}</td>
            <td>{{ loan.repaymentStartDate }}</td>
            <td>{{ loan.status }}</td>
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
      <span>{{ currentPage }} - {{ totalPages }} of {{ totalLoans }}</span>
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

const loanTypes = ref([
  { name: 'Car Loan', duration: 48 },
  { name: 'Housing Loan', duration: 12 },
  { name: 'Compassionate Loan', duration: 6 },
  { name: 'Salary Advance', duration: 1 },
  { name: 'Miscellaneous Loan', duration: 0 },
  { name: 'CTCS Loan', duration: 0 },
  { name: 'ADDCTCS', duration: 0 },
  { name: 'CTCS Loan 1', duration: 0 },
  { name: 'Cooperative Loan', duration: 12 },
  { name: 'GEC CAR LOAN', duration: 60 },
]);

// Example loan data, in reality, this would be fetched from an API or database
const loans = ref([
  // { id: 1, employee: 'John Doe', loanType: 'Car Loan', amount: '500000', tenor: 24, repaymentAmount: '25000', repaymentStartDate: '2025-03-01', status: 'Approved' },
  // ... Add more loan entries here
]);

const searchQuery = ref('');
const sortKey = ref('employee');
const sortOrder = ref(1);
const currentPage = ref(1);
const rowsPerPage = ref(10);

// Computed properties
const filteredLoans = computed(() => {
  return loans.value.filter(loan => 
    loan.employee.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    loan.loanType.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const sortedLoans = computed(() => {
  return filteredLoans.value.sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];
    if (aValue < bValue) return -1 * sortOrder.value;
    if (aValue > bValue) return 1 * sortOrder.value;
    return 0;
  }).slice((currentPage.value - 1) * rowsPerPage.value, currentPage.value * rowsPerPage.value);
});

const totalLoans = computed(() => filteredLoans.value.length);
const totalPages = computed(() => Math.ceil(totalLoans.value / rowsPerPage.value));

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

onMounted(() => {
  store.currentpage = 'loan';
  store.showSidebar = false;
});

</script>

<style scoped>
.loan-requests {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
}

.header {

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
  font-family: "Satoshi", sans-serif;
}

.loan-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.loan-type-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  font-family: "Satoshi", sans-serif;
}

.loan-type-card:hover {
  transform: scale(1.05);
}

.loan-type-card h3 {
  margin: 0 0 5px;
  font-size: 18px;
  color: #333;
  font-family: "Satoshi", sans-serif;
}

.loan-type-card p {
  margin: 0;
  color: #6c757d;
  font-size: 14px;
  font-family: "Satoshi", sans-serif;
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
}

.btn {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  background: var(--primary);
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Satoshi", sans-serif;
}

.btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .loan-types-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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
  .loan-requests {
    padding: 10px;
  }

  .header h1 {
    font-size: 20px;
  }

  .loan-types-grid {
    grid-template-columns: 1fr;
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

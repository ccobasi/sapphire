<template>
  <div class="employee-salary-container">
     <div class="header">
        <div>
            <h2>Employee Salary</h2>
            <nav class="breadcrumb">Dashboard / Salary</nav>
        </div>

    <div class="action-buttons">
      <button class="btn-primary">+ Add Salary</button>
      <button class="btn-primary">Copy From</button>
      <button class="btn-primary">Add From Group</button>
      <button class="btn-primary">Generate Payslip</button>
      <div class="dropdown">
  <button class="btn-more">More</button>
  <div class="dropdown-content">
    <a href="#">Import Salary</a>
    <a href="#">Salary Review</a>
    <a href="#">Export Report</a>
  </div>
</div>
    </div>
     </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" placeholder="Employee Code" class="input" />
      <input type="text" placeholder="Search Employee" class="input" />
      <button class="btn-search">SEARCH</button>
    </div>

    <!-- Employee Table -->
    <table class="salary-table">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee Code</th>
          <th>Total Earnings</th>
          <th>Total Deductions</th>
          <th>Total Reliefs</th>
          <th>Net Pay</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.code">
          <td>{{ employee.name }}</td>
          <td>{{ employee.code }}</td>
          <td>{{ formatCurrency(employee.earnings) }}</td>
          <td>{{ formatCurrency(employee.deductions) }}</td>
          <td>{{ formatCurrency(employee.reliefs) }}</td>
          <td>{{ formatCurrency(employee.netPay) }}</td>
           <td class="action-cell">
              
                <button class="ellipsis-button" @click="toggleDropdown(employee.code)">⋮</button>
                <div v-if="activeDropdown === employee.code" class="dropdown-menu">
                  <button @click="editElement(employee.code)">Edit</button>
                  <button @click="deleteElement(employee.code)">Delete</button>
                </div>
          
            </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      Rows per page: 10 | 1-10 of 29
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Mock employee data
const employees = ref([
  { name: "Codeware GM Testing", code: "Testing-00208", earnings: 438692.08, deductions: 120614.60, reliefs: 0.00, netPay: 318077.48 },
  { name: "Codeware Lazarus", code: "testing-0941", earnings: 378999.31, deductions: 101305.92, reliefs: 0.00, netPay: 277693.40 },
  { name: "Codeware Dummy (Testing)", code: "jd001", earnings: 342451.68, deductions: 90717.65, reliefs: 0.00, netPay: 251734.03 }
]);

const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(value);
</script>

<style scoped>
.employee-salary-container {
  padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
}

.breadcrumb {
  color: #aaa;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
}

.btn-more {
  background: var(--primary);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  height: 40px;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  flex-grow: 1;
}

.btn-search {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.salary-table {
  width: 100%;
  border-collapse: collapse;
}

.salary-table th, .salary-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.salary-table th {
  background-color: #f8f9fa;
}

.btn-link {
  background: none;
  color: #007bff;
  border: none;
  cursor: pointer;
}

.btn-edit {
  background-color: #ffc107;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 5px;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 5px;
}

.pagination {
  margin-top: 10px;
  color: #666;
}

.dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    min-width: 150px;
    border-radius: 5px;
  }

  .dropdown-content a {
    color: black;
    padding: 10px;
    text-decoration: none;
    display: block;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }
</style>

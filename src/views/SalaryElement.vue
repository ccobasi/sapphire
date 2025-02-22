<!-- <template>
  <div class="salary-elements-container">
    <header>
      <h1>Salary Elements</h1>
      <p>Dashboard / Salary</p>
      <div class="action-buttons">
        <button class="add-element">+ Add Element</button>
        <button class="import-element">+ Import Element</button>
      </div>
    </header>

    <table class="responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Frequency</th>
          <th>Show In Payslip</th>
          <th>GL Account</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in salaryElements" :key="element.id">
          <td>{{ element.name }}</td>
          <td>{{ element.category }}</td>
          <td>{{ element.subCategory }}</td>
          <td>{{ element.frequency }}</td>
          <td>{{ element.showInPayslip }}</td>
          <td>{{ element.glAccount }}</td>
          <td>
            <div class="action-ellipsis">
              <button @click="toggleMenu(element.id)" class="ellipsis-button">⋮</button>
              <div v-if="menuVisible === element.id" class="dropdown-menu">
                <button @click="editElement(element)">Edit</button>
                <button @click="deleteElement(element.id)">Delete</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const salaryElements = ref([
  {
    id: 1,
    name: "ADDTCS",
    category: "Deduction",
    subCategory: "Loan",
    frequency: "Variable",
    showInPayslip: "Yes",
    glAccount: "GL001"
  },
  {
    id: 2,
    name: "Basic Pay",
    category: "Earning",
    subCategory: "Pension-Dependent Earning",
    frequency: "Monthly",
    showInPayslip: "Yes",
    glAccount: "GL002"
  }
]);

const menuVisible = ref(null);

const toggleMenu = (id) => {
  menuVisible.value = menuVisible.value === id ? null : id;
};

const editElement = (element) => {
  alert(`Editing: ${element.name}`);
};

const deleteElement = (id) => {
  salaryElements.value = salaryElements.value.filter(element => element.id !== id);
};
</script>

<style scoped>
.salary-elements-container {
  font-family: "Satoshi", sans-serif;
  padding: 1rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

h1 {
  font-size: 24px;
  margin: 0;
}

.action-buttons button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
}

.responsive-table th,
.responsive-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.action-ellipsis {
  position: relative;
}

.ellipsis-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  z-index: 10;
  width: 100px;
}

.dropdown-menu button {
  background: none;
  border: none;
  padding: 0.5rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
</style> -->
<template>
  <div class="salary-elements-container">
    <header class="header-container">
      <div class="title-section">
        <h1>Salary Elements</h1>
        <p>Dashboard / Salary</p>
      </div>
      <div class="action-buttons">
        <button class="btn primary" @click="addNewElement">+ Add Element</button>
        <button class="btn secondary" @click="importElement">+ Import Element</button>
      </div>
    </header>

    <div class="table-wrapper">
      <table class="responsive-table">
        <thead>
          <tr>
            <th>Name ↑</th>
            <th>Category ↑</th>
            <th>Sub Category ↑</th>
            <th>Frequency ↑</th>
            <th>Show In Payslip ↑</th>
            <th>GL Account ↑</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="element in salaryElements" :key="element.id">
            <td>{{ element.name }}</td>
            <td>{{ element.category }}</td>
            <td>{{ element.subCategory }}</td>
            <td>{{ element.frequency }}</td>
            <td>{{ element.showInPayslip }}</td>
            <td>{{ element.glAccount }}</td>
            <td class="action-cell">
              <div class="dropdown-wrapper">
                <button class="ellipsis-button" @click="toggleDropdown(element.id)">⋮</button>
                <div v-if="activeDropdown === element.id" class="dropdown-menu">
                  <button @click="editElement(element.id)">Edit</button>
                  <button @click="deleteElement(element.id)">Delete</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="pagination-footer">
      <span>Rows per page: 10</span>
      <span>1-10 of 57</span>
      <div class="pagination-buttons">
        <button @click="previousPage">‹</button>
        <button @click="nextPage">›</button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { authStore } from "../store/store";


const store = authStore();
const tab = ref(1);

const salaryElements = ref([
  { id: 1, name: "ADDTCS", category: "Deduction", subCategory: "Loan", frequency: "Variable", showInPayslip: "Yes", glAccount: "GL001" },
  { id: 2, name: "Basic Pay", category: "Earning", subCategory: "Pension-Dependent Earning", frequency: "Monthly", showInPayslip: "Yes", glAccount: "GL002" },
  { id: 3, name: "Canteen", category: "Earning", subCategory: "Earning", frequency: "Monthly", showInPayslip: "Yes", glAccount: "GL003" },
  { id: 4, name: "Car Loan", category: "Deduction", subCategory: "Loan", frequency: "Variable", showInPayslip: "Yes", glAccount: "GL004" },
  { id: 5, name: "Christmas Bonus", category: "Earning", subCategory: "Bonus", frequency: "Variable", showInPayslip: "No", glAccount: "GL005" },
]);

const activeDropdown = ref(null);

function toggleDropdown(id) {
  if (activeDropdown.value === id) {
    activeDropdown.value = null; 
  } else {
    activeDropdown.value = id; 
  }
}

function editElement(id) {
  alert(`Editing element with ID: ${id}`);
  activeDropdown.value = null; 
}

function deleteElement(id) {
  alert(`Deleting element with ID: ${id}`);
  activeDropdown.value = null; 
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown-wrapper')) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
    store.currentpage = 'salary-element';
  store.showSidebar = false;
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

let currentPage = ref(1);
const previousPage = () => { 
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {

  currentPage.value++;
};

const addNewElement = () => {
  alert("Functionality for adding a new element");
};

const importElement = () => {
  alert("Functionality for importing elements");
};
</script>

<style scoped>
.salary-elements-container {
  font-family: "Satoshi", sans-serif;
  padding: 1rem;
  background-color: #f9fafb;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.title-section {
  font-size: 1.5rem;
}

.action-buttons .btn {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  color: white;
  margin-left: 0.5rem;
  border-radius: 4px;
}

.btn.primary {
  background-color: #007bff;
}

.btn.secondary {
  background-color: #17a2b8;
}

.table-wrapper {
  overflow-x: auto;
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.responsive-table th,
.responsive-table td {
  border-bottom: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.action-cell {
  text-align: center;
  position: relative;
}

.ellipsis-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.dropdown-wrapper {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100px;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background: #f5f5f5;
}
</style>

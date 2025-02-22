
<template>
  <div class="salary-elements-container">
    <header class="header-container">
      <div class="title-section">
        <h1>Salary Category</h1>
        <p>Dashboard / Salary</p>
      </div>
      <div class="action-buttons">
        <button class="btn primary" @click="addNewElement" data-bs-toggle="modal" data-bs-target="#addCategoryModal">+ Add Sub Category</button>
        
      </div>
    </header>

    <div class="table-wrapper">
      <table class="responsive-table">
        <thead>
          <tr>
            <th>Name ↑</th>
            <th>Category ↑</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="element in salaryElements" :key="element.id">
            <td>{{ element.name }}</td>
            <td>{{ element.category }}</td>
            
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

    <div class="modal fade" id="addCategoryModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addCategoryModalLabel">Add Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">

              <div class="col-md-6 mb-3">
                <label for="firstName" class="form-label">Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control rounded-pill" id="firstName" placeholder="Enter Name" required>
              </div>

              <div class="col-md-6 mb-3">
                <label for="category" class="form-label">Category <span class="text-danger">*</span></label>
                <select class="form-select rounded-pill" id="category" required>
                  <option value="" disabled selected>Select category</option>
                  <option>Earning</option>
                  <option>Deduction</option>
                  <option>Relief</option>
                </select>
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
    store.currentpage = 'salary-category';
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
  background: var(--primary);
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

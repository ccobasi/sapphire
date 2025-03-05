<!-- <template>
  <div class="employee-dashboard">
    <div class="first">
      <div class="title">
        <h1>Employee</h1>
        <p>Dashboard / Employee</p>
      </div>
      <div class="controls">

        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Filter
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#">Active Employees</a></li>
            <li><a class="dropdown-item" href="#">Exit Employees</a></li>

          </ul>
        </div>

        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMoreButton" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMoreButton">
            <li><a class="dropdown-item" href="#">Import Employee</a></li>
            <li><a class="dropdown-item" href="#">Import Employee Details</a></li>
            <li><a class="dropdown-item" href="#">Export</a></li>
          </ul>
        </div>
        <button class="btn add-btn" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">+ Add Employee</button>
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
          <th @click="sort('busUnit')">Bus. Unit</th>
          <th @click="sort('email')">Email</th>
          <th @click="sort('mobile')">Mobile</th>
          <th @click="sort('joinDate')">Join Date</th>
          <th @click="sort('gender')">Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in sortedEmployees" :key="employee.employeeCode">
          <td>{{ employee.name }}</td>
          <td>{{ employee.employeeCode }}</td>
          <td>{{ employee.busUnit }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.mobile }}</td>
          <td>{{ employee.joinDate }}</td>
          <td>{{ employee.gender }}</td>
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
    store.currentpage = 'employees';
    store.showSidebar = false;
})
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
  background-color: #ffa321;
  border-color: #ffa321;
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
</style> -->
<!-- <template>
  <div class="container mx-auto p-6 space-y-8">

    <div class="text-left">
      <h1 class="text-4xl font-bold text-indigo-700">Employee Information</h1>
      <p class="text-gray-600 mt-2">Update and manage your personal details below.</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Current Information</h2>
      <table class="table-auto w-full border-collapse text-left">
        <thead>
          <tr class="bg-indigo-50 text-indigo-700">
            <th class="px-4 py-3 border-b font-semibold">Field</th>
            <th class="px-4 py-3 border-b font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in displayData" :key="key" class="hover:bg-gray-50">
            <td class="px-4 py-3 border-b capitalize font-medium text-gray-700">{{ key }}</td>
            <td class="px-4 py-3 border-b text-gray-600">{{ value || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-4">
        <button @click="showModal = true" class="px-6 py-2 text-white rounded-lg hover:bg-indigo-700 shadow-md transition duration-200 bd">
          Update Information
        </button>
      </div>
    </div>

    <div v-if="showModal" class="modal d-block" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title text-primary">Update Personal Information</h2>
            <button type="button" @click="showModal = false" class="btn-close" aria-label="Close"></button>
          </div>

          <form @submit.prevent="handleSubmit" class="modal-body p-4">

            <section class="mb-4">
              <h3 class="h5 text-dark mb-3">Personal Information</h3>
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label for="firstName" class="form-label text-muted">First Name</label>
                  <input type="text" id="firstName" v-model="form.firstName" class="form-control" required />
                </div>
                <div class="col-12 col-md-6">
                  <label for="lastName" class="form-label text-muted">Last Name</label>
                  <input type="text" id="lastName" v-model="form.lastName" class="form-control" required />
                </div>
                <div class="col-12 col-md-6">
                  <label for="dob" class="form-label text-muted">Date of Birth</label>
                  <input type="date" id="dob" v-model="form.dob" class="form-control" required />
                </div>
                <div class="col-12 col-md-6">
                  <label for="gender" class="form-label text-muted">Gender</label>
                  <select id="gender" v-model="form.gender" class="form-select" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="address" class="form-label text-muted">Address</label>
                  <textarea id="address" v-model="form.address" rows="3" class="form-control" required></textarea>
                </div>
                <div class="col-12 col-md-6">
                  <label for="phone" class="form-label text-muted">Phone Number <span class="text-secondary fs-6">(e.g., +1-123-456-7890)</span></label>
                  <input type="tel" id="phone" v-model="form.phone" pattern="^\+?\d{1,4}-?\d{6,}$" class="form-control" required />
                </div>
                <div class="col-12 col-md-6">
                  <label for="email" class="form-label text-muted">Email</label>
                  <input type="email" id="email" v-model="form.email" class="form-control" required />
                </div>
                <div class="col-12">
                  <label class="form-label text-muted">Emergency Contact</label>
                  <div class="row g-3">
                    <div class="col-12 col-md-6">
                      <input type="text" v-model="form.emergencyContact.name" placeholder="Name" class="form-control" required />
                    </div>
                    <div class="col-12 col-md-6">
                      <input type="tel" v-model="form.emergencyContact.phone" placeholder="Phone Number" pattern="^\+?\d{1,4}-?\d{6,}$" class="form-control" required />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="mb-4">
              <h3 class="h5 text-dark mb-3">Qualifications</h3>
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label for="educationLevel" class="form-label text-muted">Education Level</label>
                  <select id="educationLevel" v-model="form.educationLevel" class="form-select">
                    <option value="">Select Education Level</option>
                    <option value="highschool">High School</option>
                    <option value="bachelor">Bachelor’s</option>
                    <option value="master">Master’s</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label for="certifications" class="form-label text-muted">Certifications</label>
                  <input type="text" id="certifications" v-model="form.certifications" placeholder="e.g., PMP, AWS" class="form-control" />
                </div>
                <div class="col-12 col-md-6">
                  <label for="yearsExperience" class="form-label text-muted">Years of Experience</label>
                  <input type="number" id="yearsExperience" v-model="form.yearsExperience" min="0" class="form-control" />
                </div>
                <div class="col-12 col-md-6">
                  <label for="skills" class="form-label text-muted">Skills</label>
                  <input type="text" id="skills" v-model="form.skills" placeholder="e.g., JavaScript, Python" class="form-control" />
                </div>
                <div class="col-12">
                  <label class="form-label text-muted">Upload Qualifications</label>
                  <input type="file" @change="handleQualificationUpload" accept=".jpg,.png,.pdf" class="form-control" />
                </div>
              </div>
            </section>

            <section class="mb-4">
              <h3 class="h5 text-dark mb-3">Attach Evidence</h3>
              <div class="border border-dashed border-secondary p-4 text-center">
                <input type="file" @change="handleEvidenceUpload" accept=".jpg,.png,.pdf" multiple class="d-none" id="evidenceUpload" />
                <label for="evidenceUpload" class="text-muted cursor-pointer">Drag and drop files here or click to upload</label>
                <p class="text-muted small mt-2">Allowed formats: .jpg, .png, .pdf. Max size: 5MB.</p>
              </div>
              <div v-if="uploadedFiles.length" class="mt-3">
                <div v-for="(file, index) in uploadedFiles" :key="index" class="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                  <span class="text-dark">{{ file.name }}</span>
                  <button @click="deleteFile(index)" class="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </section>

            <section class="mb-4">
              <h3 class="h5 text-dark mb-3">Review and Approval Status</h3>
              <div class="bg-light p-3 rounded d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                  <span :class="statusClass">{{ form.status }}</span>
                  <p v-if="form.hrComments" class="text-muted mb-0">"{{ form.hrComments }}"</p>
                </div>
                <svg v-if="form.hrComments" class="text-warning" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
                </svg>
              </div>
            </section>

            <div class="d-flex justify-content-end gap-3">
              <button type="button" @click="showModal = false" class="btn btn-secondary">Cancel</button>
              <button type="button" @click="saveDraft" class="btn btn-success text-white">Save Draft</button>
              <button type="submit" class="btn btn-primary">Submit for Approval</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

// Reactive form data
const form = reactive({
  firstName: "John",
  lastName: "Doe",
  dob: "1990-01-01",
  gender: "male",
  address: "123 Main Street, City, Country",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  emergencyContact: { name: "", phone: "" },
  educationLevel: "",
  certifications: "",
  yearsExperience: 0,
  skills: "",
  status: "Pending HR Approval",
  hrComments: "",
});

// Display data for the table
const displayData = reactive({ ...form, emergencyContact: `${form.emergencyContact.name} (${form.emergencyContact.phone})` });

// Modal visibility
const showModal = ref(false);

// File uploads
const uploadedFiles = ref([]);

// Status class for review section
const statusClass = computed(() => ({
  "px-3 py-1 rounded-full text-sm font-medium": true,
  "bg-yellow-100 text-yellow-800": form.status === "Pending HR Approval",
  "bg-green-100 text-green-800": form.status === "Approved",
  "bg-red-100 text-red-800": form.status === "Rejected",
}));

// Handlers
function handleSubmit() {
  form.status = "Pending HR Approval";
  alert("Form submitted for approval!");
  updateDisplayData();
  showModal.value = false;
}

function saveDraft() {
  alert("Draft saved!");
  updateDisplayData();
  showModal.value = false;
}

function handleQualificationUpload(event) {
  // Placeholder for qualification file upload logic
  console.log(event.target.files);
}

function handleEvidenceUpload(event) {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    if (file.size <= 5 * 1024 * 1024) { // 5MB limit
      uploadedFiles.value.push(file);
    } else {
      alert(`${file.name} exceeds 5MB limit`);
    }
  });
}

function deleteFile(index) {
  uploadedFiles.value.splice(index, 1);
}

function updateDisplayData() {
  Object.assign(displayData, { ...form, emergencyContact: `${form.emergencyContact.name} (${form.emergencyContact.phone})` });
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

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>
 -->
<template>
  <div class="container mx-auto p-6 space-y-8">
    <!-- Role Switch Dropdown -->
    <div class="text-left mb-4">
      <select v-model="currentRole" class="form-select w-auto" style="max-width: 200px;">
        <option value="employee">Employee View</option>
        <option value="hrAdmin">HR Admin View</option>
      </select>
    </div>

    <!-- Notifications -->
    <div v-if="notifications.length" class="alert alert-info mb-4" role="alert">
      <ul class="mb-0">
        <li v-for="(notification, index) in notifications" :key="index" class="text-dark">
          {{ notification.message }} <button @click="removeNotification(index)" class="btn btn-sm btn-close ms-2"></button>
        </li>
      </ul>
    </div>

    <!-- Review and Approval Status (Outside Modal) -->
    <div class="bg-light p-3 rounded mb-4">
      <h3 class="h5 text-dark mb-2">Review and Approval Status</h3>
      <div class="d-flex align-items-center gap-2">
        <span :class="statusClass">{{ form.status }}</span>
        <p v-if="form.hrComments && form.status === 'Rejected'" class="text-muted mb-0">"{{ form.hrComments }}"</p>
      </div>
      <svg v-if="form.hrComments" class="text-warning ms-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
      </svg>
    </div>

    <div class="text-left">
      <h1 class="text-4xl font-bold text-primary">Employee Information</h1>
      <p class="text-muted mt-2">Update and manage your personal details below.</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Current Information</h2>
      <table class="table-auto w-full border-collapse text-left">
        <thead>
          <tr class="bg-light text-primary">
            <th class="px-4 py-3 border-b font-semibold">Field</th>
            <th class="px-4 py-3 border-b font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in displayData" :key="key" class="hover:bg-gray-100">
            <td class="px-4 py-3 border-b capitalize font-medium text-secondary">{{ key }}</td>
            <td class="px-4 py-3 border-b text-dark">{{ value || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-4">
        <button v-if="currentRole === 'employee' && !form.pendingUpdate" @click="showModal = true" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm transition duration-200 bd">
          Update Information
        </button>
        <button v-if="currentRole === 'hrAdmin' && form.pendingUpdate && !showModal" @click="showModal = true" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm transition duration-200 bd">
          Review Pending Update
        </button>
      </div>
    </div>

    <div v-if="showModal" class="modal d-block" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title text-primary">{{ currentRole === 'hrAdmin' && form.pendingUpdate ? 'Review Proposed Updates' : 'Update Personal Information' }}</h2>
            <button type="button" @click="showModal = false" class="btn-close" aria-label="Close"></button>
          </div>

          <div class="modal-body p-4">
            <!-- Employee Form -->
            <form v-if="currentRole === 'employee' || !form.pendingUpdate" @submit.prevent="handleSubmit" class="mb-4">
              <section class="mb-4">
                <h3 class="h5 text-dark mb-3">Personal Information</h3>
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label for="firstName" class="form-label text-muted">First Name</label>
                    <input type="text" id="firstName" v-model="form.firstName" class="form-control" required />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="lastName" class="form-label text-muted">Last Name</label>
                    <input type="text" id="lastName" v-model="form.lastName" class="form-control" required />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="dob" class="form-label text-muted">Date of Birth</label>
                    <input type="date" id="dob" v-model="form.dob" class="form-control" required />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="gender" class="form-label text-muted">Gender</label>
                    <select id="gender" v-model="form.gender" class="form-select" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label for="address" class="form-label text-muted">Address</label>
                    <textarea id="address" v-model="form.address" rows="3" class="form-control" required></textarea>
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="phone" class="form-label text-muted">Phone Number <span class="text-secondary fs-6">(e.g., +1-123-456-7890)</span></label>
                    <input type="tel" id="phone" v-model="form.phone" pattern="^\+?\d{1,4}-?\d{6,}$" class="form-control" required />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="email" class="form-label text-muted">Email</label>
                    <input type="email" id="email" v-model="form.email" class="form-control" required />
                  </div>
                  <div class="col-12">
                    <label class="form-label text-muted">Emergency Contact</label>
                    <div class="row g-3">
                      <div class="col-12 col-md-6">
                        <input type="text" v-model="form.emergencyContact.name" placeholder="Name" class="form-control" required />
                      </div>
                      <div class="col-12 col-md-6">
                        <input type="tel" v-model="form.emergencyContact.phone" placeholder="Phone Number" pattern="^\+?\d{1,4}-?\d{6,}$" class="form-control" required />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="mb-4">
                <h3 class="h5 text-dark mb-3">Qualifications</h3>
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label for="educationLevel" class="form-label text-muted">Education Level</label>
                    <select id="educationLevel" v-model="form.educationLevel" class="form-select">
                      <option value="">Select Education Level</option>
                      <option value="highschool">High School</option>
                      <option value="bachelor">Bachelor’s</option>
                      <option value="master">Master’s</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="certifications" class="form-label text-muted">Certifications</label>
                    <input type="text" id="certifications" v-model="form.certifications" placeholder="e.g., PMP, AWS" class="form-control" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="yearsExperience" class="form-label text-muted">Years of Experience</label>
                    <input type="number" id="yearsExperience" v-model="form.yearsExperience" min="0" class="form-control" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="skills" class="form-label text-muted">Skills</label>
                    <input type="text" id="skills" v-model="form.skills" placeholder="e.g., JavaScript, Python" class="form-control" />
                  </div>
                  <div class="col-12">
                    <label class="form-label text-muted">Upload Qualifications</label>
                    <input type="file" @change="handleQualificationUpload" accept=".jpg,.png,.pdf" class="form-control" />
                  </div>
                </div>
              </section>

              <section class="mb-4">
                <h3 class="h5 text-dark mb-3">Attach Evidence</h3>
                <div class="border border-dashed border-secondary p-4 text-center">
                  <input type="file" @change="handleEvidenceUpload" accept=".jpg,.png,.pdf" multiple class="d-none" id="evidenceUpload" />
                  <label for="evidenceUpload" class="text-muted cursor-pointer">Drag and drop files here or click to upload</label>
                  <p class="text-muted small mt-2">Allowed formats: .jpg, .png, .pdf. Max size: 5MB.</p>
                </div>
                <div v-if="uploadedFiles.length" class="mt-3">
                  <div v-for="(file, index) in uploadedFiles" :key="index" class="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                    <span class="text-dark">{{ file.name }}</span>
                    <button @click="deleteFile(index)" class="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
              </section>

              <div class="d-flex justify-content-end gap-3">
                <button type="button" @click="showModal = false" class="btn btn-secondary">Cancel</button>
                <button v-if="currentRole === 'employee' && !form.pendingUpdate" type="button" @click="saveDraft" class="btn btn-success text-white">Save Draft</button>
                <button v-if="currentRole === 'employee' && !form.pendingUpdate" type="submit" class="btn btn-primary">Submit for Approval</button>
              </div>
            </form>

            <!-- HR Admin Review Section -->
            <div v-if="currentRole === 'hrAdmin' && form.pendingUpdate">
              <h3 class="h5 text-dark mb-3">Review Proposed Updates</h3>
              <div class="row g-3 mb-4">
                <div class="col-12">
                  <h6 class="text-muted">Current Information</h6>
                  <table class="table table-bordered">
                    <thead>
                      <tr class="bg-light">
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, key) in displayData" :key="key">
                        <td class="capitalize">{{ key }}</td>
                        <td>{{ value || 'N/A' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-12">
                  <h6 class="text-muted">Proposed Changes</h6>
                  <table class="table table-bordered">
                    <thead>
                      <tr class="bg-light">
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, key) in form.pendingUpdate" :key="key">
                        <td class="capitalize">{{ key }}</td>
                        <td>{{ value || 'N/A' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <section class="mb-4">
                <h3 class="h5 text-dark mb-3">Review and Approval Status</h3>
                <div class="bg-light p-3 rounded d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center gap-2">
                    <span :class="statusClass">{{ form.status }}</span>
                    <p v-if="form.hrComments" class="text-muted mb-0">"{{ form.hrComments }}"</p>
                  </div>
                  <svg v-if="form.hrComments" class="text-warning" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
                  </svg>
                </div>
              </section>

              <div class="d-flex justify-content-end gap-3">
                <button type="button" @click="showModal = false" class="btn btn-secondary">Cancel</button>
                <button type="button" @click="approveUpdate" class="btn btn-success">Approve</button>
                <button type="button" @click="rejectUpdate" class="btn btn-danger">Reject</button>
                <input v-model="form.hrComments" type="text" class="form-control w-50" placeholder="Reason for rejection" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

// Reactive form data and state
const form = reactive({
  firstName: "John",
  lastName: "Doe",
  dob: "1990-01-01",
  gender: "male",
  address: "123 Main Street, City, Country",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  emergencyContact: { name: "", phone: "" },
  educationLevel: "",
  certifications: "",
  yearsExperience: 0,
  skills: "",
  status: "Up to Date",
  hrComments: "",
  pendingUpdate: null, // Store the pending update for HR review
});

// Display data for the table (reflects approved state)
const displayData = reactive({ ...form, emergencyContact: `${form.emergencyContact.name} (${form.emergencyContact.phone})` });

// Modal visibility, role state, and notifications
const showModal = ref(false);
const currentRole = ref("employee");
const notifications = ref([]); // Array to store notifications

// File uploads
const uploadedFiles = ref([]);

// Status class for review section
const statusClass = computed(() => ({
  "px-3 py-1 rounded-pill text-sm font-medium": true,
  "bg-success text-white": form.status === "Up to Date" || form.status === "Approved",
  "bg-warning text-dark": form.status === "Pending HR Approval",
  "bg-danger text-white": form.status === "Rejected",
}));

// Handlers
function handleSubmit() {
  if (currentRole.value === "employee" && !form.pendingUpdate) {
    form.pendingUpdate = { ...form }; // Store the submitted update
    form.status = "Pending HR Approval";
    alert("Update submitted for HR approval!");
    showModal.value = false; // Close modal after submission
  }
}

function saveDraft() {
  alert("Draft saved locally!");
  updateDisplayData();
  showModal.value = false;
}

function approveUpdate() {
  if (form.pendingUpdate && currentRole.value === "hrAdmin" && form.status === "Pending HR Approval") {
    Object.assign(form, form.pendingUpdate); // Apply the pending update to the main form
    form.status = "Approved";
    form.hrComments = ""; // Clear comments on approval
    form.pendingUpdate = null; // Clear pending update
    updateDisplayData();
    // Notify HOD of approval
    notifications.value.push({ message: "HOD Notification: Employee information update approved by HR Admin.", timestamp: new Date().toLocaleTimeString() });
    alert("Update approved by HR! HOD has been notified.");
    showModal.value = false; // Close modal after approval
  }
}

function rejectUpdate() {
  if (form.pendingUpdate && currentRole.value === "hrAdmin" && form.status === "Pending HR Approval") {
    form.status = "Rejected";
    form.pendingUpdate = null; // Clear pending update on rejection
    if (!form.hrComments.trim()) form.hrComments = "No reason provided."; // Default message if no comment
    alert("Update rejected by HR!");
    showModal.value = false; // Close modal after rejection
  }
}

function removeNotification(index) {
  notifications.value.splice(index, 1);
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
      alert(`${file.name} exceeds 5MB limit`);
    }
  });
}

function deleteFile(index) {
  uploadedFiles.value.splice(index, 1);
}

function updateDisplayData() {
  Object.assign(displayData, { ...form, emergencyContact: `${form.emergencyContact.name} (${form.emergencyContact.phone})` });
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
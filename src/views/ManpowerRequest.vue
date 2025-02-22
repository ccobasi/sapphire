<!-- <template>
  <div class="p-4">
    <h2>Manpower Request</h2>

    <button
      class="add-profile-btn"
      @click="openModal"
      data-bs-toggle="modal"
      data-bs-target="#addJobIdentifierModal"
    >
      Request Vacancy
    </button>

    <div class="manpower mt-6">
      <table>
        <thead>
          <tr>
            <th class="px-4 py-2">Job Title</th>
            <th class="px-4 py-2">Department</th>
            <th class="px-4 py-2">Grade</th>
            <th class="px-4 py-2">Vacancies</th>
            <th class="px-4 py-2">Justification</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(manpower, index) in manpowers" :key="index">
            <td>{{ manpower.jobTitle }}</td>
            <td>{{ manpower.department }}</td>
            <td>{{ manpower.grade }}</td>
            <td>{{ manpower.vacancies }}</td>
            <td>{{ manpower.justification }}</td>
            <td>{{ manpower.status }}</td>
            <td>
              <button
                class="btn btn-sm btn-outline-primary me-2 edit-btn bd"
                @click="editIdentifier(index)"
              >
                Edit
              </button>
              <button
                class="btn btn-sm btn-outline-danger delete-btn bd"
                @click="deleteIdentifier(index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Manpower Request</h2>
          <button class="text-gray-400 hover:text-gray-600" @click="closeModal">
            &times;
          </button>
        </div>

        <form @submit.prevent="submitRequest">
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Job Title</label>
            <select
              v-model="formData.jobTitle"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled>Select Job Title</option>
              <option v-for="title in jobTitles" :key="title" :value="title">
                {{ title }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Department</label>
            <select
              v-model="formData.department"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled>Select Department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Grade</label>
            <select
              v-model="formData.grade"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled>Select Grade</option>
              <option v-for="grade in grades" :key="grade" :value="grade">
                {{ grade }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Number of Vacancies</label>
            <input
              type="number"
              v-model="formData.vacancies"
              min="1"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter number of vacancies"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Justification</label>
            <textarea
              v-model="formData.justification"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              placeholder="Provide justification for this request"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              v-model="formData.status"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Decline">Decline</option>
            </select>
          </div>

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "../store/store";


const store = authStore();

const showModal = ref(false);

const manpowers = ref([
    {
  jobTitle: "Software Engineer", 
  department: "IT Department",  
  grade: "Level 2",             
  vacancy: 3,               
  justification: "To support upcoming projects and ensure smooth operations.",
  status: "Pending",         
}
]);


const jobTitles = ["Software Engineer", "Product Manager", "Data Analyst"];
const departments = ["Engineering", "Product", "Data"];
const grades = ["Junior", "Mid-Level", "Senior"];

const manpowerRequests = ref([]);

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  formData.value = {
    jobTitle: "",
    department: "",
    grade: "",
    vacancies: 1,
    justification: "",
    status: "Pending",
  };
};

// Submit form function
const submitRequest = () => {
  // Add the request to the table
  manpowerRequests.value.push({ ...formData.value });
  alert("Manpower request submitted successfully!");
  closeModal();
};

onMounted(() => {
    store.currentpage = 'manpower-request';
    store.showSidebar = false;
})
</script>

<style scoped>
h2 {
  font-family: "Satoshi", sans-serif;
  font-weight: 500;
  font-size: 30px;
  line-height: 40.5px;
  letter-spacing: 0%;
  color: #333333;
}

.job-profile {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

.add-profile-btn {
  float: right;
  background: #347ae2;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 20px;
  cursor: pointer;
  width: 190px;
  height: 50px;
  font-family: "Satoshi", sans-serif;
}

.manpower {
    margin-top: 100px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 27px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  padding: 15px 10px 15px 20px;
  gap: 25px;
}

tbody td {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  gap: 10px;
}
</style> -->
<!-- <template>
  <div class="p-4">
    <div class="mb-3">
       <h2>Manpower Request</h2>

    <button
      class="add-profile-btn"
      @click="openModal"
      data-bs-toggle="modal"
      data-bs-target="#addJobIdentifierModal"
    >
      Request Vacancy
    </button>
    </div>

    <div class="manpower mt-6">
      <table>
        <thead>
          <tr>
            <th class="px-4 py-2">Job Title</th>
            <th class="px-4 py-2">Department</th>
            <th class="px-4 py-2">Grade</th>
            <th class="px-4 py-2">Vacancies</th>
            <th class="px-4 py-2">Justification</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(manpower, index) in manpowers" :key="index">
            <td>{{ manpower.jobTitle }}</td>
            <td>{{ manpower.department }}</td>
            <td>{{ manpower.grade }}</td>
            <td>{{ manpower.vacancies }}</td>
            <td>{{ manpower.justification }}</td>
            <td>{{ manpower.status }}</td>
            <td>
              <button
                class="btn btn-sm btn-outline-primary me-2 edit-btn bd"
                @click="editIdentifier(index)"
              >
                Edit
              </button>
              <button
                class="btn btn-sm btn-outline-danger delete-btn bd"
                @click="deleteIdentifier(index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
    class="modal fade"
    id="addJobIdentifierModal"
    tabindex="-1"
    aria-labelledby="addJobIdentifierModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addJobIdentifierModalLabel">Manpower Request</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitRequest" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div class="form-group">
                <label for="jobTitle" class="block text-gray-700 font-semibold mb-2">Job Title <span class="text-red-500">*</span></label>
                <select
                  v-model="formData.jobTitle"
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  id="jobTitle"
                  required
                >
                  <option value="" disabled>Select Job Title</option>
                  <option v-for="title in jobTitles" :key="title" :value="title">
                    {{ title }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="department" class="block text-gray-700 font-semibold mb-2">Department <span class="text-red-500">*</span></label>
                <select
                  v-model="formData.department"
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  id="department"
                  required
                >
                  <option value="" disabled>Select Department</option>
                  <option v-for="dept in departments" :key="dept" :value="dept">
                    {{ dept }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="grade" class="block text-gray-700 font-semibold mb-2">Grade <span class="text-red-500">*</span></label>
                <select
                  v-model="formData.grade"
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  id="grade"
                  required
                >
                  <option value="" disabled>Select Grade</option>
                  <option v-for="grade in grades" :key="grade" :value="grade">
                    {{ grade }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="vacancies" class="block text-gray-700 font-semibold mb-2">Number of Vacancies <span class="text-red-500">*</span></label>
                <input
                  type="number"
                  v-model="formData.vacancies"
                  min="1"
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  id="vacancies"
                  placeholder="Enter number of vacancies"
                  required
                />
              </div>

              <div class="form-group col-span-2">
                <label for="justification" class="block text-gray-700 font-semibold mb-2">Justification <span class="text-red-500">*</span></label>
                <textarea
                  v-model="formData.justification"
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  id="justification"
                  rows="4"
                  placeholder="Provide justification for this request"
                  required
                ></textarea>
              </div>

              <div class="form-group">
                <label for="status" class="block text-gray-700 font-semibold mb-2">Status</label>
                <select
                  v-model="formData.status"
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  id="status"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Decline">Decline</option>
                </select>
              </div>
            </div>

            <div class="text-center mt-6">
              <button
                type="submit"
                class="px-6 py-2 text-white rounded-lg hover:bg-blue-700 focus:outline-none bde"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "../store/store";
import { Modal } from 'bootstrap'; 

const store = authStore();

const showModal = ref(false);
const manpowers = ref([
  {
    jobTitle: "Software Engineer",
    department: "IT Department",
    grade: "Level 2",
    vacancies: 3,
    justification: "To support upcoming projects and ensure smooth operations.",
    status: "Pending",
  },
]);

const jobTitles = ["Software Engineer", "Product Manager", "Data Analyst"];
const departments = ["Engineering", "Product", "Data"];
const grades = ["Junior", "Mid-Level", "Senior"];

const formData = ref({
  jobTitle: "",
  department: "",
  grade: "",
  vacancies: 1,
  justification: "",
  status: "Pending",
});

const resetForm = () => {
  formData.value = {
    jobTitle: "",
    department: "",
    grade: "",
    vacancies: 1,
    justification: "",
    status: "Pending",
  };
};

const removeBackdrop = () => {

  const backdrops = document.querySelectorAll(".modal-backdrop");
  backdrops.forEach((backdrop) => backdrop.remove());
};

const submitRequest = () => {
  manpowers.value.push({ ...formData.value });

  const modalElement = document.getElementById("addJobIdentifierModal");
  const modal = Modal.getInstance(modalElement);

  if (modal) {
    modal.hide();
  }

  modalElement.addEventListener("hidden.bs.modal", removeBackdrop);

  resetForm();
};

// const submitRequest = () => {
//   manpowers.value.push({ ...formData.value });
//   const modalElement = document.getElementById('addJobIdentifierModal');
//   const modal = Modal.getInstance(modalElement);
//   if (modal) {
//     modal.hide();
//   }

//   modalElement.addEventListener("hidden.bs.modal", () => {
//     const overlay = document.querySelector(".modal-backdrop");
//     if (overlay) {
//       overlay.remove();
//     }
//   });

//   resetForm();
// };

const openModal = () => {
  const modalElement = document.getElementById("addJobIdentifierModal");
  const modal = new Modal(modalElement);

  modal.show();

  modalElement.addEventListener("hidden.bs.modal", removeBackdrop);
};


const closeModal = () => {
  const modalElement = document.getElementById('addJobIdentifierModal');
  const modal = Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
  }
  resetForm();
};

// Edit function
const editIdentifier = (index) => {
  formData.value = { ...manpowers.value[index] };
  openModal();
};

// Delete function
const deleteIdentifier = (index) => {
  if (confirm("Are you sure you want to delete this manpower request?")) {
    manpowers.value.splice(index, 1);
  }
};

onMounted(() => {
  store.currentpage = "manpower-request";
  store.showSidebar = false;
});
</script>

<style scoped>
.add-profile-btn {
  float: right;
  background: #347ae2;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 20px;
  cursor: pointer;
  width: 190px;
  height: 50px;
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.manpower {
  overflow-x: auto;
  margin-top: 100px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f4f4f4;
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 27px;
  text-align: left;
  padding: 15px 10px 15px 20px;
}

td {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.6px;
  text-align: left;
  padding: 10px 10px 10px 20px;
  border-bottom: 1px solid #333;
}

.edit-btn,
.delete-btn {
  background: white;
  border: 1px solid;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Satoshi", sans-serif;
  font-size: 12px;
  font-weight: 500;
}

.edit-btn {
  color: #347ae2;
  border-color: #347ae2;
}

.delete-btn {
  color: #ff6b6b;
  border-color: #ff6b6b;
}

.modal-dialog-centered {
  display: flex;
  align-items: center;
  min-height: calc(100% - 1rem);
}

.modal-content {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}

.modal-title {
  font-family: 'Satoshi', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #333333;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.text-red-500 {
  color: #ef4444;
}

.btn-close {
  font-size: 1.25rem;
}

.add-profile-btn {
  float: right;
  background: #347ae2;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 20px;
  cursor: pointer;
  width: 190px;
  height: 50px;
  font-family: 'Satoshi', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.form-group {
    display: flex;
    flex-direction: column;
}

select {
    width: 100%;
}

.bde {
  background: #347ae2;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 20px;
  cursor: pointer;
  width: 190px;
  height: 50px;
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 500;
}
</style> -->
<template>
  <div class="hiring-request p-4">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Hiring Request</h2>

    <!-- Select Job Profile -->
    <div class="mb-6">
      <label for="jobProfileSelect" class="block text-sm font-medium text-gray-700 mb-2">Select Job Profile <span class="text-red-500">*</span></label>
      <select
        id="jobProfileSelect"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        v-model="selectedJobProfile"
        required
        @change="loadProfileDetails"
      >
        <option value="" disabled>Select Job Profile</option>
        <option v-for="profile in jobProfiles" :key="profile.jobCode" :value="profile">
          {{ profile.jobTitle }} ({{ profile.jobCode }})
        </option>
      </select>
    </div>

    <div v-if="selectedJobProfile" class="profile-details mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Job Profile Details</h3>
      <div class="space-y-4">
        <p><strong class="text-gray-700">Job Title:</strong> {{ selectedJobProfile.jobTitle }}</p>
        <p><strong class="text-gray-700">Department:</strong> {{ selectedJobProfile.jobFunction }}</p>
        <p><strong class="text-gray-700">Grade/Level:</strong> {{ selectedJobProfile.levelOfWork }}</p>
        <div class="mb-4">
          <label for="department" class="block text-sm font-medium text-gray-700 mb-2">Department <span class="text-red-500">*</span></label>
          <select
            id="department"
            v-model="hiringRequest.department"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="" disabled>Select Department</option>
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="vacancies" class="block text-sm font-medium text-gray-700 mb-2">Vacancies Needed <span class="text-red-500">*</span></label>
          <input
            type="number"
            id="vacancies"
            v-model="hiringRequest.vacancies"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          >
        </div>
        <div class="mb-4">
          <label for="quarter" class="block text-sm font-medium text-gray-700 mb-2">Quarter to Fill Vacancy <span class="text-red-500">*</span></label>
          <select
            id="quarter"
            v-model="hiringRequest.quarter"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="" disabled>Select Quarter</option>
            <option value="Q1 2025">Q1 2025</option>
            <option value="Q2 2025">Q2 2025</option>
            <option value="Q3 2025">Q3 2025</option>
            <option value="Q4 2025">Q4 2025</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="justification" class="block text-sm font-medium text-gray-700 mb-2">Justification <span class="text-red-500">*</span></label>
          <textarea
            id="justification"
            v-model="hiringRequest.justification"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Provide justification for hiring request"
            required
          ></textarea>
        </div>
      </div>
    </div>

    <button
      v-if="selectedJobProfile"
      class="btn btn-primary rounded-lg px-4 py-2"
      @click="submitHiringRequest"
      :disabled="!hiringRequest.department || !hiringRequest.vacancies || !hiringRequest.quarter || !hiringRequest.justification"
    >
      Submit Hiring Request
    </button>

    <div v-if="hiringRequests.length" class="mt-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Hiring Requests</h3>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Job Title</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Vacancies</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Quarter</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in hiringRequests" :key="index" class="border-t">
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.jobTitle }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.department }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.vacancies }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.quarter }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.status }}</td>
            <td class="px-4 py-2">
              <button
                class="btn btn-sm btn-outline-danger rounded-lg"
                @click="deleteHiringRequest(index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { Modal } from 'bootstrap';
import { authStore } from "../store/store";

const store = authStore();

const jobProfiles = ref([
  {
    jobTitle: 'Senior',
    jobCode: 'FIN-001',
    altTitle: 'Finance Manager',
    jobFunction: 'Finance',
    levelOfWork: 'Senior',
  },
]);

const selectedJobProfile = ref('');
const hiringRequest = reactive({
  jobTitle: '',
  department: '',
  vacancies: 1,
  quarter: '',
  justification: '',
  status: 'Pending',
});

const hiringRequests = ref([]);
const departments = ['Engineering', 'Finance', 'Product', 'Data', 'HR']; // Example departments

const loadProfileDetails = () => {
  if (selectedJobProfile.value) {
    Object.assign(hiringRequest, {
      jobTitle: selectedJobProfile.value.jobTitle,
      department: selectedJobProfile.value.jobFunction || '',
      vacancies: 1,
      quarter: '',
      justification: '',
      status: 'Pending',
    });
  }
};

const submitHiringRequest = () => {
  hiringRequests.value.push({ ...hiringRequest });

  Object.assign(hiringRequest, {
    jobTitle: selectedJobProfile.value.jobTitle,
    department: selectedJobProfile.value.jobFunction || '',
    vacancies: 1,
    quarter: '',
    justification: '',
    status: 'Pending',
  });
};

const deleteHiringRequest = (index) => {
  if (confirm('Are you sure you want to delete this hiring request?')) {
    hiringRequests.value.splice(index, 1);
  }
};

watch(() => selectedJobProfile.value, loadProfileDetails, { immediate: true });

onMounted(() => {
    store.currentpage = 'manpower-request';
    store.showSidebar = false;
});
</script>

<style scoped>
.hiring-request {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
}

.text-2xl {
  font-family: 'Satoshi', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
}

.form-label {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

.form-select,
.form-control,
textarea {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
}

.form-select:focus,
.form-control:focus,
textarea:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
}

.text-red-500 {
  color: #e53e3e;
}

.btn-primary {
  background-color: #3182ce;
  border-color: #3182ce;
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #2b6cb0;
  border-color: #2b6cb0;
}

.btn-outline-danger {
  color: #e53e3e;
  border-color: #e53e3e;
  font-family: 'Satoshi', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
}

.btn-outline-danger:hover {
  background-color: #e53e3e;
  color: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.5;
  text-align: left;
  padding: 12px 16px;
  background-color: #edf2f7;
  border-bottom: 2px solid #e2e8f0;
}

tbody td {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.profile-details {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.text-gray-800,
.text-gray-700 {
  font-family: 'Satoshi', sans-serif;
}

.text-lg {
  font-size: 1.125rem;
  font-weight: 600;
}

@media (max-width: 600px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin-bottom: 15px;
  }

  td {
    border: none;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label);
    font-weight: bold;
    color: #4a5568;
  }

  .btn-outline-danger {
    display: block;
    margin: 5px 0;
  }
}
</style>
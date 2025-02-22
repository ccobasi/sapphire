<template>
  <div class="job-profile mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1>Job Profile</h1>
        <p class="text-muted">Here's Your Job Profile Information</p>
      </div>
      <button class="btn btn-primary add" @click="showModal = true">Add Profile</button>
    </div>

    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="active-tab" data-bs-toggle="tab" data-bs-target="#active" type="button" role="tab" aria-controls="active" aria-selected="true">Active Profile</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="inactive-tab" data-bs-toggle="tab" data-bs-target="#inactive" type="button" role="tab" aria-controls="inactive" aria-selected="false">Inactive Profile</button>
      </li>
    </ul>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="active" role="tabpanel" aria-labelledby="active-tab">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Job Level</th>
              <th scope="col">Department</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(profile, index) in profiles" :key="index">
              <td>{{ profile.name }}</td>
              <td>{{ profile.jobLevel }}</td>
              <td>{{ profile.department }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2 bd" @click="editProfile(index)">Edit</button>
                <button class="btn btn-sm btn-outline-danger bd" @click="deleteProfile(index)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tab-pane fade" id="inactive" role="tabpanel" aria-labelledby="inactive-tab">
        <p>Inactive profiles content goes here.</p>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="addProfileModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Profile (General Details)</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close">X</button>
        </div>
        <div class="modal-body">

          <form>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" v-model="form.name" id="name" />
              </div>
              <div class="col-md-6">
                <label for="experience" class="form-label">Professional Experience (Years required)</label>
                <input type="text" class="form-control" v-model="form.experience" id="experience" />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="jobLevel" class="form-label">Job Level</label>
                <select class="form-select" v-model="form.jobLevel" id="jobLevel">
                  <option selected disabled>Choose...</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="department" class="form-label">Department</label>
                <select class="form-select" v-model="form.department" id="department">
                  <option selected disabled>Choose...</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="jobRank" class="form-label">Job Rank</label>
                <select class="form-select" v-model="form.jobRank" id="jobRank">
                  <option selected disabled>Choose...</option>
                  <option value="Junior">Junior</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="averageSalary" class="form-label">Average Salary</label>
                <input type="text" class="form-control" v-model="form.averageSalary" id="averageSalary" />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="salaryMin" class="form-label">Salary Min</label>
                <input type="text" class="form-control" v-model="form.salaryMin" id="salaryMin" />
              </div>
              <div class="col-md-6">
                <label for="salaryMax" class="form-label">Salary Max</label>
                <input type="text" class="form-control" v-model="form.salaryMax" id="salaryMax" />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="qualifications" class="form-label">Qualifications</label>
                <input type="text" class="form-control" v-model="form.qualifications" id="qualifications" />
              </div>
              <div class="col-md-6">
                <label for="status" class="form-label">Status</label>
                <select class="form-select" v-model="form.status" id="status">
                  <option selected disabled>Choose...</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control ta" v-model="form.description" id="description" rows="3"></textarea>
            </div>
          </form>

        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary" @click="submitForm">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

import { authStore } from "../store/store";


const store = authStore();



const profiles = ref([
  { name: 'Ade Muyiwa', jobLevel: 'Senior', department: 'Finance' },
  { name: 'Ade Muyiwa', jobLevel: 'Senior', department: 'Finance' },
  { name: 'Ade Muyiwa', jobLevel: 'Senior', department: 'Finance' },
  { name: 'Ade Muyiwa', jobLevel: 'Senior', department: 'Finance' },
  { name: 'Ade Muyiwa', jobLevel: 'Senior', department: 'Finance' },
  { name: 'Ade Muyiwa', jobLevel: 'Senior', department: 'Finance' },
  { name: 'Ade Muyiwa', jobLevel: 'Senior', department: 'Finance' },
  { name: 'Ade Muyiwa', jobLevel: 'Senior', department: 'Finance' }
]);

const editProfile = (index) => {
  alert(`Editing profile of ${profiles.value[index].name}`);
};

const deleteProfile = (index) => {
  if (confirm(`Are you sure you want to delete ${profiles.value[index].name}'s profile?`)) {
    profiles.value.splice(index, 1);
  }
};

const addProfile = () => {

  alert('Functionality to add a profile goes here');
};

const showModal = ref(false);

const form = reactive({
  name: '',
  experience: '',
  jobLevel: '',
  department: '',
  jobRank: '',
  averageSalary: '',
  salaryMin: '',
  salaryMax: '',
  qualifications: '',
  status: '',
  description: '',
});

const closeModal = () => {
  showModal.value = false;
};

const submitForm = () => {
  console.log('Form Data:', form);
  profiles.value.push({ name: form.name, jobLevel: form.jobLevel, department: form.department });
  closeModal();
};


onMounted(() =>{
  store.currentpage = 'job_profile';
  store.showSidebar = false;
})
</script>

<style scoped>
.job-profile {
  padding: 50px;
}

h1 {
  font-family: "Satoshi", sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 40.5px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

p {
  font-family: "Satoshi", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #7c8db5 !important;
}

.add {
  width: 131px;
  height: 50px;
  top: 173px;
  left: 1344px;
  padding: 14px;
  gap: 10px;
  border-radius: 20px;
  opacity: 0px;
  background: #347ae2;
  font-family: "Satoshi", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 24.3px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #fff;
}

thead th {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 27px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

tbody td {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.bd {
  width: 90px;
  height: 30px;
  top: 455px;
  left: 1052px;
  gap: 10px;
  border-radius: 20px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  font-family: "Satoshi", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16.2px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.modal.fade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  overflow-y: auto;
}

.modal-title {
  font-family: "Satoshi", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32.4px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.modal-content {
  width: 800px;
  height: 828px;
  gap: 0px;
  opacity: 1px;
}

.btn-close {
  width: 20px;
  height: 20px;
  top: 30px;
  left: 810px;
  gap: 0px;
  border-radius: 10px;
  opacity: 0px;
  background: #347ae2;
  color: #ffffff;
}

.form-label {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.9px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.form-control,
.form-select {
  width: 350px;
  height: 40px;
  gap: 0px;
  border-radius: 20px;
  opacity: 0px;
  background: #494d570d;
}

.ta {
  width: 750px !important;
  height: 131px !important;
  gap: 0px;
  border-radius: 20px;
  opacity: 0px;
}

.modal-footer button {
  width: 200px;
  height: 50px;
  gap: 0px;
  border-radius: 20px;
  opacity: 0px;
  font-family: "Satoshi", sans-serif;
}
</style>
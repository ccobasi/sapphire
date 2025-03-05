<!-- 
<script setup>

import { ref, onMounted } from 'vue';
import TableOne from '../components/TableOne.vue';

import { authStore } from "../store/store";


const store = authStore();

const tab = ref(1);

const accepted_applicants = [
  {
    name:"Ernest Young",
    designation: "sales Officer",
    start_date:"12-05-2025",
    negotiated_salary:"150000",
  },
  {
    name:"Ernest Young",
    designation: "sales Officer",
    start_date:"12-05-2025",
    negotiated_salary:"150000",
  },
  {
    name:"Ernest Young",
    designation: "sales Officer",
    start_date:"12-05-2025",
    negotiated_salary:"150000",
  },
  {
    name:"Ernest Young",
    designation: "sales Officer",
    start_date:"12-05-2025",
    negotiated_salary:"150000",
  },
  {
    name:"Ernest Young",
    designation: "sales Officer",
    start_date:"12-05-2025",
    negotiated_salary:"150000",
  },
  {
    name:"Ernest Young",
    designation: "sales Officer",
    start_date:"12-05-2025",
    negotiated_salary:"150000",
  },

]

const new_hires = [
    {
        name:"Adebayo Jamal",
        employee_id:"12323213",
        email_address:"adebayojamal231@gmail.com",
        mobile:"12333222",
        join_date:"342342342",
        gender:"male"
    },
    {
        name:"Adebayo Jamal",
        employee_id:"12323213",
        email_address:"adebayojamal231@gmail.com",
        mobile:"12333222",
        join_date:"342342342",
        gender:"male"
    },
    {
        name:"Adebayo Jamal",
        employee_id:"12323213",
        email_address:"adebayojamal231@gmail.com",
        mobile:"12333222",
        join_date:"342342342",
        gender:"male"
    },
    {
        name:"Adebayo Jamal",
        employee_id:"12323213",
        email_address:"adebayojamal231@gmail.com",
        mobile:"12333222",
        join_date:"342342342",
        gender:"male"
    },
    {
        name:"Adebayo Jamal",
        employee_id:"12323213",
        email_address:"adebayojamal231@gmail.com",
        mobile:"12333222",
        join_date:"342342342",
        gender:"male"
    },
]


const tempData = ref(accepted_applicants)



const tempHeadings = ref(["Name", "Designation", "Start Date", "Negotiated Salary", "Action", ])

const tableOption = ref("accepted_applicants")

const selectItem = (value) => {
    
}


const selectTableOption = (value) => {
    tableOption.value=value;
    if (tableOption.value === 'accepted_applicants'){
        tempHeadings.value = ["Name", "Designation", "Start Date", "Negotiated Salary", "Action", ]
        tempData.value = accepted_applicants
    } else if (tableOption.value === 'new_hires'){
        tempHeadings.value = ["Name", "Employee ID", "Email", "Mobile", "Join Date","Gender" ]
        tempData.value = new_hires
    }
}



onMounted(() => {
    store.currentpage = 'onboarding';
    store.showSidebar = false;
})




</script>
<template>
  <div class="vacancies mt-4">
    <div class="heading">
      <div class="title">
        <h1>Onboarding</h1>
        <p>Here's Onboarding Information</p>
      </div>

    </div>

    <div class="selector-options">
      <button class="btn option" :class="{'active':tableOption==='accepted_applicants'}" @click="selectTableOption('accepted_applicants')">Accepted Applicants</button>
      <button class="btn option" :class="{'active':tableOption==='new_hires'}" @click="selectTableOption('new_hires')">New Hires</button>

    </div>

    <div class="row">
      <TableOne :tableData=tempData :headings=tempHeadings :tableType="'onboarding'" @selectItem="selectItem" />
    </div>

    <div class="modal" v-if="selectedApplicant" @click="selectedApplicant=null">
      <div class="modal-content" @click.stop>
        <div class="top-section mt-4">
          <h3 class="title">Applicant Details</h3>
          <div class="close-button" @click="selectedApplicant=null">
            <iconify-icon icon="material-symbols:close" width="24" height="24"></iconify-icon>
          </div>
        </div>

        <div class="main">
          <div class="items  mt-4">
            <div class="split d-flex mt-2">
              <div class="form-group required">
                <label for="title">First name:</label>
                <input type="text" class="form-control" v-model="selectedApplicant.first_name">
              </div>
              <div class="form-group required">
                <label for="title">Last Name:</label>
                <input type="text" class="form-control" v-model="selectedApplicant.last_name">
              </div>
            </div>

            <div class="split d-flex mt-2">
              <div class="form-group required ">
                <label for="title">Email:</label>
                <input type="text" class="form-control" v-model="selectedApplicant.email_address">
              </div>
              <div class="form-group required ">
                <label for="title">Title:</label>
                <input type="text" class="form-control" v-model="selectedApplicant.title">
              </div>
            </div>

            <div class="split d-flex mt-2">
              <div class="form-group required ">
                <label for="title">Mobile Phone:</label>
                <input type="text" class="form-control" v-model="selectedApplicant.mobile_phone">
              </div>
              <div class="form-group required">
                <label for="title">Home Phone:</label>
                <input type="text" class="form-control" v-model="selectedApplicant.home_phone">
              </div>
            </div>

            <div class="split d-flex mt-2">
              <div class="form-group required ">
                <label for="title">Gender:</label>
                <input type="text" class="form-control" v-model="selectedApplicant.gender">
              </div>

              <div class="form-group ">
                <label for="title">Home Address:</label>
                <textarea rows="5" class="form-control" v-model="selectedApplicant.address"></textarea>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template> -->
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import TableOne from "../components/TableOne.vue";
import { authStore } from "../store/store";

const store = authStore();
const tableOption = ref("accepted_applicants"); 
const selectedApplicant = ref(null); 
const currentStep = ref(1); 

// Use ref for onboardingData to ensure reactivity
const onboardingData = ref({
  accepted_applicants: [
    {
      name: "Ernest Young",
      designation: "Sales Officer",
      start_date: "2025-05-12",
      negotiated_salary: "150000",
      status: "Bio Data Updated", 
      currentStep: 3, 
    },
    {
      name: "Jane Doe",
      designation: "Marketing Specialist",
      start_date: "2025-05-15",
      negotiated_salary: "200000",
      status: "Pending Initiation",
      currentStep: 0,
    },
  ],
  new_hires: [
    {
      name: "Adebayo Jamal",
      employee_id: "12323213",
      email_address: "adebayojamal231@gmail.com",
      mobile: "12333222",
      join_date: "2025-05-12",
      gender: "male",
      bioDataComplete: true,
      documentsComplete: false,
      inductionScheduled: false,
      buddyAssigned: false,
      jobObjectivesAssigned: false,
      status: "Bio Data Verified", 
      currentStep: 4, 
    },
    {
      name: "Jake Solevan",
      employee_id: "45678901",
      email_address: "jakesolevan@example.com",
      mobile: "98765432",
      join_date: "2025-05-20",
      gender: "male",
      bioDataComplete: false,
      documentsComplete: false,
      inductionScheduled: false,
      buddyAssigned: false,
      jobObjectivesAssigned: false,
      status: "Pending Initiation",
      currentStep: 0,
    },
  ],
});

const tableHeadings = {
  accepted_applicants: [
    "Name",
    "Designation",
    "Start Date",
    "Negotiated Salary",
    "Status",
    "Actions",
  ],
  new_hires: [
    "Name",
    "Employee ID",
    "Email",
    "Mobile",
    "Join Date",
    "Gender",
    "Status",
    "Actions",
  ],
};

const currentTableData = computed(() => onboardingData.value[tableOption.value]); // Update to use .value for ref
const currentTableHeadings = computed(() => tableHeadings[tableOption.value]);

const formData = ref({
  announcementSent: false,
  onboardingSchedule: "",
  employeeDetails: {
    name: "",
    resumptionDate: "",
    bioData: {
      employeeId: "",
      emailAddress: "",
      mobile: "",
      gender: "",
    },
    documents: {},
    inductionTasks: {},
    payrollDetails: {},
    buddyName: "",
    jobObjectives: "",
  },
  isBioDataComplete: false,
});

const startOnboarding = (applicant) => {
  selectedApplicant.value = { ...applicant };
  currentStep.value = 1; 

  if (tableOption.value === "accepted_applicants") {
    formData.value.employeeDetails.name = applicant.name;
    formData.value.employeeDetails.resumptionDate = applicant.start_date;
  } else {
    formData.value.employeeDetails.name = applicant.name;
    formData.value.employeeDetails.bioData = {
      employeeId: applicant.employee_id,
      emailAddress: applicant.email_address,
      mobile: applicant.mobile,
      gender: applicant.gender,
    };
    formData.value.employeeDetails.resumptionDate = applicant.join_date;
  }

  const index = currentTableData.value.findIndex(
    (item) => item.name === applicant.name
  );
  if (index !== -1) {
    // Update onboardingData reactively
    onboardingData.value[tableOption.value][index].currentStep = 1;
    onboardingData.value[tableOption.value][index].status = "Announcement Sent";
  }
};

const updateOnboarding = (applicant) => {
  selectedApplicant.value = { ...applicant };
  currentStep.value = applicant.currentStep || 1; // Resume at the current step or start at 1 if not set

  console.log("Updating applicant:", applicant.name, "Step:", currentStep.value, "Status:", applicant.status); // Debugging

  // Pre-fill form data based on selected applicant
  if (tableOption.value === "accepted_applicants") {
    formData.value.employeeDetails.name = applicant.name;
    formData.value.employeeDetails.resumptionDate = applicant.start_date;
    formData.value.onboardingSchedule = applicant.status === "Onboarding Scheduled" ? "Scheduled for " + applicant.start_date : "";
  } else {
    formData.value.employeeDetails.name = applicant.name;
    formData.value.employeeDetails.bioData = {
      employeeId: applicant.employee_id,
      emailAddress: applicant.email_address,
      mobile: applicant.mobile,
      gender: applicant.gender,
    };
    formData.value.employeeDetails.resumptionDate = applicant.join_date;
    formData.value.isBioDataComplete = applicant.bioDataComplete || false;
  }
  // Pre-fill other form data based on current status
  if (applicant.status === "Bio Data Updated") {
    formData.value.employeeDetails.bioData = {
      employeeId: applicant.employee_id,
      emailAddress: applicant.email_address,
      mobile: applicant.mobile,
      gender: applicant.gender,
    };
  }
  if (applicant.status === "Induction Scheduled") {
    formData.value.inductionTasks = { notes: "Induction scheduled" };
  }
  if (applicant.status === "Documents Verified") {
    formData.value.documents = { verified: true };
  }
  if (applicant.status === "Payroll Updated") {
    formData.value.payrollDetails = { notes: "Payroll updated" };
  }
  if (applicant.status === "Onboarding Complete") {
    formData.value.employeeDetails.buddyName = "Default Buddy"; // Example; adjust as needed
    formData.value.employeeDetails.jobObjectives = "Default Objectives"; // Example; adjust as needed
  }
};

const closeModal = () => {
  selectedApplicant.value = null;
  currentStep.value = 1;
  formData.value = {
    announcementSent: false,
    onboardingSchedule: "",
    employeeDetails: {
      name: "",
      resumptionDate: "",
      bioData: {
        employeeId: "",
        emailAddress: "",
        mobile: "",
        gender: "",
      },
      documents: {},
      inductionTasks: {},
      payrollDetails: {},
      buddyName: "",
      jobObjectives: "",
    },
    isBioDataComplete: false,
  };
};

const nextStep = () => {
  if (currentStep.value < 8) {
    currentStep.value++;
    updateApplicantStatus();
  }
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const updateApplicantStatus = () => {
  if (!selectedApplicant.value) return;

  const applicant = selectedApplicant.value;
  const index = currentTableData.value.findIndex(
    (item) => item.name === applicant.name
  );
  if (index === -1) return;

  switch (currentStep.value) {
    case 1:
      applicant.status = "Announcement Sent";
      applicant.currentStep = 1;
      formData.value.announcementSent = true;
      break;
    case 2:
      applicant.status = "Onboarding Scheduled";
      applicant.currentStep = 2;
      formData.value.onboardingSchedule = "Scheduled for " + formData.value.employeeDetails.resumptionDate;
      break;
    case 3:
      applicant.status = "Bio Data Updated";
      applicant.currentStep = 3;
      applicant.bioDataComplete = true;
      formData.value.employeeDetails.bioData = {
        employeeId: formData.value.employeeDetails.bioData.employeeId,
        emailAddress: formData.value.employeeDetails.bioData.emailAddress,
        mobile: formData.value.employeeDetails.bioData.mobile,
        gender: formData.value.employeeDetails.bioData.gender,
      };
      break;
    case 4:
      applicant.status = "Bio Data Verified";
      applicant.currentStep = 4;
      formData.value.isBioDataComplete = true;
      break;
    case 5:
      applicant.status = "Induction Scheduled";
      applicant.currentStep = 5;
      applicant.inductionScheduled = true;
      formData.value.inductionTasks = { completed: false };
      break;
    case 6:
      applicant.status = "Documents Verified";
      applicant.currentStep = 6;
      applicant.documentsComplete = true;
      formData.value.documents = { verified: true };
      break;
    case 7:
      applicant.status = "Payroll Updated";
      applicant.currentStep = 7;
      applicant.payrollUpdated = true;
      formData.value.payrollDetails = { updated: true };
      break;
    case 8:
      applicant.status = "Onboarding Complete";
      applicant.currentStep = 8;
      applicant.buddyAssigned = true;
      applicant.jobObjectivesAssigned = true;
      formData.value.employeeDetails.buddyName = formData.value.employeeDetails.buddyName;
      formData.value.employeeDetails.jobObjectives = formData.value.employeeDetails.jobObjectives;
      console.log(`Notified HOD: New hire ${applicant.name} onboarding completed`);
      break;
  }

  // Update onboardingData reactively
  onboardingData.value[tableOption.value][index] = { ...applicant };
  // Force re-render or ensure reactivity by assigning a new array if needed
  onboardingData.value = { ...onboardingData.value };
};

onMounted(() => {
  store.currentpage = "onboarding";
  store.showSidebar = false;
});

watch(selectedApplicant, (newVal) => {
  if (newVal) {
    const index = currentTableData.value.findIndex(
      (item) => item.name === newVal.name
    );
    if (index !== -1) {
      // Update onboardingData reactively
      onboardingData.value[tableOption.value][index] = { ...newVal };
      // Force re-render or ensure reactivity
      onboardingData.value = { ...onboardingData.value };
    }
  }
});
</script>

<template>
  <div class="vacancies mt-4">
    <div class="heading">
      <div class="title">
        <h1>Onboarding</h1>
        <p>Here's Onboarding Information</p>
      </div>
      <button class="btn primary" @click="startOnboarding" :disabled="!currentTableData.some(item => item.status === 'Pending Initiation')">
        Start Onboarding Process
      </button>
    </div>

    <div class="selector-options">
      <button class="btn option" :class="{ active: tableOption === 'accepted_applicants' }" @click="tableOption = 'accepted_applicants'">
        Accepted Applicants
      </button>
      <button class="btn option" :class="{ active: tableOption === 'new_hires' }" @click="tableOption = 'new_hires'">
        New Hires
      </button>
    </div>

    <div class="row">
      <TableOne :tableData="currentTableData" :headings="currentTableHeadings" :tableType="'onboarding'" :tableOption="tableOption">
        <template #actions="{ item }">
          <button class="btn small secondary" @click="updateOnboarding(item)" :disabled="item.status === 'Onboarding Complete'">
            Update
          </button>
        </template>
      </TableOne>
    </div>

    <div class="modal" v-if="selectedApplicant" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="top-section mt-4">
          <h3 class="title">Onboarding - Step {{ currentStep }} of 8</h3>
          <div class="close-button" @click="closeModal">
            <iconify-icon icon="material-symbols:close" width="24" height="24"></iconify-icon>
          </div>
        </div>

        <div class="main">
          <div class="items mt-4">
            <div class="step-content">

              <div v-if="currentStep === 1">
                <h4>Step 1: Send Announcement</h4>
                <p>Announce the new joiner: {{ selectedApplicant.name }}</p>
                <button class="btn primary mt-2" @click="nextStep">Send Announcement</button>
              </div>

              <div v-if="currentStep === 2">
                <h4>Step 2: Prepare Onboarding Schedule</h4>
                <div class="form-group">
                  <label>Resumption Date:</label>
                  <input type="date" class="form-control" v-model="formData.employeeDetails.resumptionDate" />
                </div>
                <div class="button-group mt-2">
                  <button class="btn primary" @click="nextStep">Save Schedule</button>
                  <button class="btn secondary" @click="prevStep">Back</button>
                </div>
              </div>

              <div v-if="currentStep === 3">
                <h4>Step 3: Update Bio Data</h4>
                <div class="form-group">
                  <label>Employee ID:</label>
                  <input type="text" class="form-control" v-model="formData.employeeDetails.bioData.employeeId" />
                </div>
                <div class="form-group mt-2">
                  <label>Email:</label>
                  <input type="email" class="form-control" v-model="formData.employeeDetails.bioData.emailAddress" />
                </div>
                <div class="form-group mt-2">
                  <label>Mobile:</label>
                  <input type="text" class="form-control" v-model="formData.employeeDetails.bioData.mobile" />
                </div>
                <div class="form-group mt-2">
                  <label>Gender:</label>
                  <input type="text" class="form-control" v-model="formData.employeeDetails.bioData.gender" />
                </div>
                <div class="form-group mt-2">
                  <label>Biodata Status:</label>
                  <input type="text" class="form-control" :value="formData.value.isBioDataComplete ? 'Complete' : 'Pending'" disabled />
                </div>
                <div class="button-group mt-2">
                  <button class="btn primary" @click="nextStep">Save Bio Data</button>
                  <button class="btn secondary" @click="prevStep">Back</button>
                </div>
              </div>

              <div v-if="currentStep === 4">
                <h4>Step 4: Verify Bio Data Completeness</h4>
                <p>Is the biodata for {{ selectedApplicant.name }} complete?</p>
                <div class="button-group mt-2">
                  <button class="btn primary" @click="nextStep">Yes, Complete</button>
                  <button class="btn warning" @click="currentStep = 3">No, Edit Bio Data</button>
                  <button class="btn secondary" @click="prevStep">Back</button>
                </div>
              </div>

              <div v-if="currentStep === 5">
                <h4>Step 5: Coordinate Induction Program</h4>
                <div class="form-group">
                  <label>Induction Schedule Notes:</label>
                  <textarea class="form-control" v-model="formData.inductionTasks.notes" rows="3"></textarea>
                </div>
                <div class="button-group mt-2">
                  <button class="btn primary" @click="nextStep">Schedule Induction</button>
                  <button class="btn secondary" @click="prevStep">Back</button>
                </div>
              </div>

              <div v-if="currentStep === 6">
                <h4>Step 6: Verify Required Documents</h4>
                <p>Ensure all documents for {{ selectedApplicant.name }} are complete.</p>
                <div class="button-group mt-2">
                  <button class="btn primary" @click="nextStep">Documents Verified</button>
                  <button class="btn secondary" @click="prevStep">Back</button>
                </div>
              </div>

              <div v-if="currentStep === 7">
                <h4>Step 7: Update Payroll and Details</h4>
                <div class="form-group">
                  <label>Payroll Notes:</label>
                  <input type="text" class="form-control" v-model="formData.payrollDetails.notes" />
                </div>
                <div class="button-group mt-2">
                  <button class="btn primary" @click="nextStep">Update Payroll</button>
                  <button class="btn secondary" @click="prevStep">Back</button>
                </div>
              </div>

              <div v-if="currentStep === 8">
                <h4>Step 8: Assign Buddy and Job Objectives</h4>
                <div class="form-group">
                  <label>Buddy Name:</label>
                  <input type="text" class="form-control" v-model="formData.employeeDetails.buddyName" />
                </div>
                <div class="form-group mt-2">
                  <label>Job Objectives:</label>
                  <textarea class="form-control" v-model="formData.employeeDetails.jobObjectives" rows="3"></textarea>
                </div>
                <div class="button-group mt-2">
                  <button class="btn success" @click="closeModal">Complete Onboarding</button>
                  <button class="btn secondary" @click="prevStep">Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vacancies {
  padding: 20px;
}

.vacancies .heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vacancies .heading .title h1 {
  font-size: 30px;
  color: var(--dark);
}

.vacancies .heading .title p {
  font-size: 16px;
  color: var(--info);
}

.vacancies .heading button {
  border-radius: 1rem;
}

.selector-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.selector-options .option {
  border-radius: 1.5rem;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0.5rem 1.5rem;
}

.selector-options .option.active {
  background-color: var(--primary);
  color: var(--bs-white);
}

.modal {
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.modal .modal-content {
  width: 100%;
  max-width: 50rem;
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadein 0.5s ease forwards;
}

.modal-content {
  overflow-y: auto;
  max-height: 80vh;
}

.modal-content .top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-content .top-section .title {
  font-size: 24px;
  color: var(--dark);
}

.modal-content .top-section .close-button {
  background: var(--primary);
  border-radius: 0.5rem;
  padding: 0.3rem;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content .top-section .close-button:hover {
  background-color: darken(var(--primary), 10%);
}

.modal-content .main .items .step-content {
  padding: 1rem;
}

.modal-content .main .items .form-group {
  margin-bottom: 1rem;
}

.modal-content .main .items .form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.modal-content .main .items .form-group input,
.modal-content .main .items .form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.modal-content .main .items .button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn.primary {
  background-color: var(--primary);
  color: white;
}

.btn.primary:hover {
  background-color: darken(var(--primary), 10%);
}

.btn.secondary {
  background-color: #6c757d;
  color: white;
}

.btn.secondary:hover {
  background-color: darken(#6c757d, 10%);
}

.btn.warning {
  background-color: #ffc107;
  color: #000;
}

.btn.warning:hover {
  background-color: darken(#ffc107, 10%);
}

.btn.success {
  background-color: #28a745;
  color: white;
}

.btn.success:hover {
  background-color: darken(#28a745, 10%);
}

.btn.small {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal .modal-content {
    max-width: 90%;
    padding: 1rem;
  }

  .modal-content .main .items .split {
    flex-direction: column;
    gap: 1rem;
  }

  .modal-content .main .items .form-group {
    width: 100%;
  }

  .selector-options {
    flex-direction: column;
    align-items: flex-start;
  }

  .selector-options .option {
    width: 100%;
    text-align: center;
  }
}
</style>

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
  background: var(--modal-background);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  padding: 2rem;
  justify-content: center;
}

.modal .modal-content {
  width: 100%;
  max-width: 50rem;
  height: fit-content;
  padding: 1rem;
  opacity: 0;
  animation: fadein 0.5s ease forwards;
}

.modal-content {
  overflow-y: auto;
}

.modal-content .top-section {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.modal-content .top-section .title {
  font-size: 24px;
}

.modal-content .top-section .close-button {
  position: absolute;
  right: 1rem;
  background: var(--primary);
  display: flex;
  padding: 0.2rem;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
}

.modal-content .main .items .split {
  gap: 10px;
}

.modal-content .main .items .split .form-group {
  width: 100%;
}

.modal-content .main .items .split .form-group select, 
.modal-content .main .items .split .form-group input, 
.modal-content .main .items .split .form-group textarea {
  width: 100%;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
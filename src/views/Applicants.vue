
<script setup>

import { ref, onMounted } from 'vue';
import TableOne from '../components/TableOne.vue';

import { authStore } from "../store/store";


const store = authStore();

const tab = ref(1);


const tempData = [
  {
    "title": "mr.",
    "first_name": "john",
    "last_name": "doe",
    "mobile_phone": "123-456-7890",
    "email_address": "john.doe@email.com",
    "gender": "male",
    "address": "123 elm street, springfield, il"
  },
  {
    "title": "ms.",
    "first_name": "jane",
    "last_name": "smith",
    "mobile_phone": "987-654-3210",
    "email_address": "jane.smith@email.com",
    "gender": "female",
    "address": "456 oak avenue, chicago, il"
  },
  {
    "title": "dr.",
    "first_name": "emily",
    "last_name": "johnson",
    "mobile_phone": "555-123-4567",
    "email_address": "emily.johnson@email.com",
    "gender": "female",
    "address": "789 pine road, madison, wi"
  },
  {
    "title": "mr.",
    "first_name": "michael",
    "last_name": "brown",
    "mobile_phone": "321-654-9870",
    "email_address": "michael.brown@email.com",
    "gender": "male",
    "address": "101 maple drive, detroit, mi"
  }
]



const tempHeadings = ["Title", "First Name", "Last Name", "Mobile Phone", "Email Address", "Gender", "Address"]

const selectedApplicant = ref(null);

const selectItem = (value) => {
    selectedApplicant.value = value;
}




onMounted(() => {
    store.currentpage = 'applicants';
    store.showSidebar = false;
})




</script>
<template>
    <div class="vacancies mt-4">
        <div class="heading">
            <div class="title">
                <h1>Active Applicants</h1>
                <p>Here's all your Active Applicants</p>
            </div>
            
        </div>

     
        <div class="row">
            <TableOne :tableData=tempData :headings=tempHeadings :tableType="'applicants'" @selectItem="selectItem" />
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
  padding: 50px; /* Added padding to the vacancies container */
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
  background: var(--background);
  opacity: 0;
  animation: fadein 0.5s ease forwards;
}

.modal .modal-content label {
  font-size: 16px;
  color: var(--dark);
}

.modal .modal-content input, .modal .modal-content select, .modal .modal-content textarea {
  color: var(--dark);
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
  color: var(--dark);
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
  display: flex;
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

<script setup>

import { ref, onMounted } from 'vue';
import TableOne from '../components/TableOne.vue';

import { authStore } from "../store/store";


const store = authStore();

const tab = ref(1);


const tempData = [
    {
        
        name:'Adebayo jamal',
        vacancy:"Sales Officer",
        status_reason:"Negotiation",
        test:"Passed",
        expected_salary:"200,000",
        received_on:"28/05/2025",
    },
    {
        
        name:'Adebayo jamal',
        vacancy:"Sales Officer",
        status_reason:"Negotiation",
        test:"Passed",
        expected_salary:"200,000",
        received_on:"28/05/2025",
    },
    {
        
        name:'Adebayo jamal',
        vacancy:"Sales Officer",
        status_reason:"Negotiation",
        test:"Passed",
        expected_salary:"200,000",
        received_on:"28/05/2025",
    },
    {
        
        name:'Adebayo jamal',
        vacancy:"Sales Officer",
        status_reason:"Negotiation",
        test:"Passed",
        expected_salary:"200,000",
        received_on:"28/05/2025",
    },
    {
        
        name:'Adebayo jamal',
        vacancy:"Sales Officer",
        status_reason:"Negotiation",
        test:"Passed",
        expected_salary:"200,000",
        received_on:"28/05/2025",
    },
   
]

const tempHeadings = ["Name","Vacancy","Status Reason","test","Expected Salary","Received on"]


const selectItem = () => {

}


onMounted(() => {
    store.currentpage = 'applications';
    store.showSidebar = false;
})




</script>
<template>
    <div class="vacancies mt-4">
        <div class="heading">
            <div class="title">
                <h1>Applications</h1>
                <p>Here's all your Applications</p>
            </div>
            
        </div>

        <div class="selector-options">
            <button class="btn option active">All</button>
            <button class="btn option">Shortlisted</button>
            <button class="btn option">Related</button>
            <button class="btn option">Accepted</button>
            <button class="btn option">Interview Scheduling</button>
            <button class="btn option">Test</button>
            <button class="btn option">Interview</button>
            <button class="btn option">Negotiation</button>
            <button class="btn option">Rejected</button>
        </div>

        <div class="row">
            <TableOne :tableData=tempData :headings=tempHeadings :tableType="'applications'" />
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
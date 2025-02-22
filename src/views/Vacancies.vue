
<script setup>

import { ref, onMounted } from 'vue';
import TableOne from '../components/TableOne.vue';

import {authStore} from "../store/store";


const store = authStore();

const tab = ref(1);

const showVacancyModal = ref(false);

const tempData = [
    {
        
        name:'Finance',
        employed_applications:3,
        rejected_applications:2,
        new_applications:4,
        interviews:1,
        status:'active',
    },
    {
        
        name:'Finance',
        employed_applications:3,
        rejected_applications:2,
        new_applications:4,
        interviews:1,
        status:'active',
    },
]

const tempHeadings = ["Name","Employed Applications","Rejected Applications","New Applications","Interviews","Status","Action"]


const selectItem = () => {

}


onMounted(() => {
    store.currentpage = 'vacancies';
    store.showSidebar = false;
})




</script>
<template>
    <div class="vacancies mt-4">
        <div class="heading">
            <div class="title">
                <h1>Vacancies</h1>
                <p>Here's your vacancy information</p>
            </div>
            <button class="btn btn-primary add-vacancy-button" @click="showVacancyModal=true">Add Vacancy</button>
        </div>

        <div class="vacancy-options">
            <button class="btn option active">All Vacancies</button>
            <button class="btn option">Active Vacancies</button>
            <button class="btn option">Inactive Vacancies</button>
        </div>

        <div class="row">
            <TableOne :tableData=tempData :headings=tempHeadings :tableType="'vacancies'" />
        </div>

        <div class="modal" v-if="showVacancyModal">
            <div class="modal-content">
                <div class="top-section mt-4">
                    <h3 class="title">Add Vacancy</h3>
                    <div class="close-button" @click="showVacancyModal=false">
                        <iconify-icon icon="material-symbols:close" width="24" height="24"></iconify-icon>
                    </div>
                </div>
                <div class="page-viewer">
                    <div class="page-viewer-item">
                        <span class="item" :class="{'active':tab === 1, 'completed':tab > 1}">
                            <div class="number-icon">
                                <p class="">1</p>
                            </div>
                            <h3>Details</h3>
                        </span>
                        <span class="seperator"></span>
                        <span class="item" :class="{'active':tab === 2, 'completed':tab > 2}">
                            <div class="number-icon">
                                <p>2</p>
                            </div>
                            <h3>Job Requistion</h3>
                        </span>
                        <span class="seperator"></span>
                        <span class="item" :class="{'active':tab === 3}">
                            <div class="number-icon">
                                <p>3</p>
                            </div>
                            <h3>Application Setting</h3>
                        </span>
                        
                    </div>
                </div>

                <div class="main">
                    <div class="page split" v-show="tab===1">
                        <div class="lhs">
                            <h3 class="mb-4">Overview</h3>
                            <div class="form-group required">
                                <label for="title">Job Profile:</label>
                                <select name="" id="" class="form-control"></select>
                                <iconify-icon icon="iconamoon:arrow-down-2" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>
                            <div class="form-group required mt-2">
                                <label for="title">Number of Occupancy:</label>
                                <select name="" id="" class="form-control"></select>
                                <iconify-icon icon="iconamoon:arrow-down-2" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>
                            <div class="form-group required mt-2">
                                <label for="title">Designation:</label>
                                <select name="" id="" class="form-control"></select>
                                <iconify-icon icon="iconamoon:arrow-down-2" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>
                            <div class="form-group required mt-2">
                                <label for="title">Type:</label>
                                <select name="" id="" class="form-control"></select>
                                <iconify-icon icon="iconamoon:arrow-down-2" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>
                            <div class="form-group mt-2">
                                <label for="title">Summary:</label>
                                <textarea rows="5" class="form-control"></textarea>
                               
                            </div>
                            
                        </div>
                        <div class="rhs">
                            <h3 class="mb-4">Vacancy Details</h3>
                            <div class="form-group">
                                <label for="title">Requested by:</label>
                                <select name="" id="" class="form-control"></select>
                                <iconify-icon icon="iconamoon:arrow-down-2" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>
                            <div class="form-group mt-2">
                                <label for="title">Application period from:</label>
                                <input type="text" class="form-control">
                                <iconify-icon icon="formkit:date" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>
                            <div class="form-group mt-2">
                                <label for="title">Application period from:</label>
                                <input type="text" class="form-control">
                                <iconify-icon icon="formkit:date" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>
                            <div class="form-group mt-2">
                                <label for="title">Application period from:</label>
                                <input type="text" class="form-control">
                                <iconify-icon icon="formkit:date" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>
                            <div class="form-group mt-2">
                                <label for="title">Application period from:</label>
                                <input type="text" class="form-control">
                                <iconify-icon icon="formkit:date" width="24" height="24" class="dropdown-icon"></iconify-icon>
                            </div>

                            
                        </div>
                    </div>

                    <div class="page flex-column" v-show="tab === 2">
                        
                        <div class="form-group required">
                            <label for="title">Title:</label>
                            <select name="" id="" class="form-control"></select>
                        </div>
                        <div class="form-group required mt-2">
                            <label for="title">Job Description:</label>
                            <select name="" id="" class="form-control"></select>
                            <iconify-icon icon="iconamoon:arrow-down-2" width="24" height="24" class="dropdown-icon"></iconify-icon>
                        </div>
                        
                        <div class="form-group mt-2">
                            <label for="title">Summary:</label>
                            <textarea placeholder="Type Job Description here..." rows="5" class="form-control"></textarea>
                            
                        </div>
                            
                        
                       
                    </div>

                   <div class="save-button">
                        <button class="btn btn-primary" @click="tab++">Save</button>
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

.vacancy-options {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.vacancy-options .option {
  border-radius: 1.5rem;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0.5rem 1.5rem;
}

.vacancy-options .option.active {
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
  justify-content: center;
  position: relative;
}

.modal-content .top-section .title {
  font-size: 18px;
}

.modal-content .top-section .close-button {
  position: absolute;
  right: 1rem;
  background: var(--primary);
  display: flex;
  padding: 0.2rem;
  border-radius: 10px;
  color: #fff;
}

.modal-content .page-viewer {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem 0 2rem 4rem;
}

.modal-content .page-viewer .page-viewer-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.modal-content .page-viewer .page-viewer-item .seperator {
  height: 10px;
  width: 70px;
  border-top: 3px dashed var(--primary);
  margin-top: -20px;
}

.modal-content .page-viewer .page-viewer-item .item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
}

.modal-content .page-viewer .page-viewer-item .item .number-icon {
  width: 50px;
  height: 50px;
  border: 3px solid var(--dark);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.modal-content .page-viewer .page-viewer-item .item .number-icon p {
  font-size: 24px;
  font-weight: 600;
  padding: 0;
  margin: 0;
}

.modal-content .page-viewer .page-viewer-item .item h3 {
  font-size: 16px;
}

.modal-content .page-viewer .page-viewer-item .item.active .number-icon {
  border: 3px solid var(--primary);
}

.modal-content .page-viewer .page-viewer-item .item.active .number-icon p {
  color: var(--primary);
}

.modal-content .page-viewer .page-viewer-item .item.active h3 {
  color: var(--primary);
}

.modal-content .page-viewer .page-viewer-item .item.completed .number-icon {
  border: 3px solid var(--bs-success);
}

.modal-content .page-viewer .page-viewer-item .item.completed .number-icon p {
  color: var(--bs-success);
}

.modal-content .page-viewer .page-viewer-item .item.completed h3 {
  color: var(--bs-success);
}

.modal-content .main .page {
  opacity: 0;
  display: flex;
  gap: 20px;
  animation: fadein 0.3s ease forwards;
}

.modal-content .main .page .lhs, .modal-content .main .page .rhs {
  width: 50%;
  padding: 10px;
}

.modal-content .main .page .lhs h3, .modal-content .main .page .rhs h3 {
  font-size: 18px;
}

.modal-content .main .page .lhs {
  border-right: 1px solid var(--grey);
}

.modal-content .main .page .form-group {
  position: relative;
}

.modal-content .main .page .form-group .dropdown-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  opacity: 0.4;
}

.modal-content .main .page .form-group label {
  padding: 0 0 5px 20px;
  font-size: 14px;
}

.modal-content .main .page .form-group select, .modal-content .main .page .form-group textarea, .modal-content .main .page .form-group input {
  border-radius: 1rem;
  font-size: 16px;
  background: var(--grey);
}

.modal-content .main .page .form-group select::placeholder, .modal-content .main .page .form-group textarea::placeholder, .modal-content .main .page .form-group input::placeholder {
  font-size: 14px;
}

.modal-content .main .page .form-group textarea {
  resize: none;
}

.modal-content .main .page .form-group.required label::after {
  content: ' *';
  color: #e32;
}

.modal-content .main .save-button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.modal-content .main .save-button button {
  padding: 0.5rem 3rem;
  border-radius: 1rem;
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

<script setup>

import { ref, onMounted } from 'vue';
import TableOne from '../components/TableOne.vue';

import {authStore} from "../store/store";


const store = authStore();

const tab = ref(1);

const showDepartmentModal = ref(false);
const departmentModalOption = ref('')

const tempData = [
    {
        unit:"ABU OPERATIONS",
        department_name:'Finance',
        status:'approved',
    },
   
    {
        unit:"ABU OPERATIONS",
        department_name:'Finance',
        status:'approved',
    },
   
    {
        unit:"ABU OPERATIONS",
        department_name:'Finance',
        status:'approved',
    },
   
]

const tempHeadings = ["Unit", "Department","Status","Action"]


const selectItem = () => {

}


onMounted(() => {
    store.currentpage = 'department_units';
    store.showSidebar = false;
})




</script>
<template>
    <div class="vacancies mt-4">
        <div class="heading">
            <div class="title">
                <h1>Department Units</h1>
                <p>Here are lists of your Departments</p>
            </div>
            <div class="buttons d-flex">
                <button class="btn btn-primary add-vacancy-button" @click="departmentModalOption='add';showDepartmentModal=true">Add Department Unit</button>
                <button class="btn add-vacancy-button" @click="departmentModalOption='import';showDepartmentModal=true">Import Department Unit</button>
            </div>
        </div>

        <div class="row">
            <TableOne :tableData=tempData :headings=tempHeadings :tableType="'departments'"  />
        </div>

        <div class="modal" v-show="showDepartmentModal">
            <div class="modal-content">
                <div class="top-section mt-4">
                    <h3 class="title text-capitalize">{{departmentModalOption}} Department Unit</h3>
                    <div class="close-button" @click="showDepartmentModal=false">
                        <iconify-icon icon="material-symbols:close" width="24" height="24"></iconify-icon>
                    </div>

                </div>

                <div class="subsection text-center mt-2">
                    <p v-if="departmentModalOption==='add'">Input the department unit name to get added</p>
                    <p v-if="departmentModalOption==='import'">Download an excel template by clicking on the below button</p>
                    <small class="" v-if="departmentModalOption==='import'">Note: please do not change the layout of the cells in the excel, you are expected to add your data below the column header (first row).</small>
                </div>
                

                <div class="main">
                    <div class="page d-flex align-items-center flex-column mt-4" v-if="departmentModalOption==='import'">
                        <button class="btn btn-skinny mt-2">Download Template</button>
                        <div class="file-upload-box mt-4">
                            <div class="file-upload mt-4">
                                <span class="uploader">
                                    <iconify-icon icon="line-md:upload-loop" class="upload-icon"></iconify-icon>
                                    <p class="text-primary">Choose File</p>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="page flex-column" v-if="departmentModalOption==='add'">
                        
                        <div class="form-group mt-4">
                            <label for="">Department Unit Name</label>
                            <input type="text" class="form-control">
                        </div>
                       
                        <div class="form-group">
                            <label for="">Department Name</label>
                            <input type="text" class="form-control">
                        </div>
                       
                            
                        
                       
                    </div>

                   <div class="save-button">
                        <button class="btn btn-primary text-capitalize" >{{departmentModalOption==='add' ? 'add' : departmentModalOption === 'import' ? 'upload' : ''}}</button>
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

.vacancies .heading button:not(.btn-primary) {
  border: 1px solid var(--primary);
  color: var(--primary);
}

.vacancies .heading .buttons {
  gap: 10px;
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
  padding: 2rem;
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

.modal .modal-content .subsection {
  color: var(--dark-2);
  padding: 0 2rem;
}

.page .btn-skinny {
  border-radius: 1rem;
  padding: 0.5rem 2rem;
}

.page .file-upload-box {
  padding: 0 4rem;
  width: 100%;
  height: 220px;
  margin-bottom: 2rem;
}

.page .file-upload-box .file-upload {
  background: var(--info-light);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.page .file-upload-box .file-upload .uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.page .file-upload-box .file-upload .uploader p {
  border-bottom: 1px solid var(--primary);
  margin-top: 1rem;
}

.page .file-upload-box .file-upload .uploader .upload-icon {
  color: var(--primary);
  font-size: 48px;
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
  font-weight: 600;
  color: var(--dark);
}

.modal-content .top-section .close-button {
  position: absolute;
  right: 1rem;
  background: var(--primary);
  display: flex;
  padding: 0.2rem;
  border-radius: 10px;
  cursor: pointer;
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

@media screen and (max-width: 768px) {
  .vacancies .heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .modal .modal-content {
    padding: 1rem;
  }

  .page .file-upload-box {
    padding: 0 1rem;
  }
}
</style>
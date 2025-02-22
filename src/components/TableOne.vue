

<script setup>

const props = defineProps({
    tableData: {
            type: Object,
            required: true,
        },
    headings:{
        type: Array,
        required: true,
    },
    tableType:{
        type: String,
        required: true,
    }

})

const emit = defineEmits();


const selectItem = (value) => {
    emit('selectItem', value);
}

</script>

<template>
    <div class="tableone mt-4">
        
       <div class="table-responsive">
        <table class="table text-nowrap mb-0 align-middle table-hover" >
            <thead>
                <tr>
                  <th v-for="(heading, index) in headings"  :key="index">{{ heading }}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" v-if="tableType === 'vacancies'">
                    <td class=""><span class="d-flex align-items-center">{{ row.name }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.employed_applications }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.rejected_applications }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.new_applications }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.interviews }}</span></td>
                    <td class=""><span class="d-flex align-items-center" :class="row.status === 'active' ? 'text-success' : 'text-warning'">{{ row.status }}</span></td>
                    <td class="actions d-flex">
                        <span><button class="btn text-primary">Edit</button></span>
                        <span><button class="btn text-danger">Delete</button></span>
                    </td>
                </tr>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" v-if="tableType === 'departments'">
                    <td class=""><span class="d-flex align-items-center">{{ row.department_name }}</span></td>
                    <td class=""><span class="d-flex align-items-center" :class="row.status === 'approved' ? 'text-success' : 'text-warning'">{{ row.status }}</span></td>
                    <td class="actions d-flex">
                        <span><button class="btn text-primary">Edit</button></span>
                        <span><button class="btn text-danger">Delete</button></span>
                    </td>
                </tr>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" v-if="tableType === 'designations'">
                    <td class=""><span class="d-flex align-items-center">{{ row.designation }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.department_name }}</span></td>
                    <td class=""><span class="d-flex align-items-center" :class="row.status === 'approved' ? 'text-success' : 'text-warning'">{{ row.status }}</span></td>
                    <td class="actions d-flex">
                        <span><button class="btn text-primary">Edit</button></span>
                        <span><button class="btn text-danger">Delete</button></span>
                    </td>
                </tr>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" v-if="tableType === 'designation_roles'">
                    <td class=""><span class="d-flex align-items-center">{{ row.designation }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.role }}</span></td>
                    
                    <td class="actions d-flex">
                        <span><button class="btn text-primary">Edit</button></span>
                        <span><button class="btn text-danger">Delete</button></span>
                    </td>
                </tr>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" v-if="tableType === 'company_unit'">
                    <td class=""><span class="d-flex align-items-center">{{ row.company_unit_name }}</span></td>
                    <td class=""><span class="d-flex align-items-center" :class="row.status === 'approved' ? 'text-success' : 'text-warning'">{{ row.status }}</span></td>
                    <td class="actions d-flex">
                        <span><button class="btn text-primary">Edit</button></span>
                        <span><button class="btn text-danger">Delete</button></span>
                    </td>
                </tr>
                <tr v-for="(rows, rowIndex) in tableData" :key="rowIndex" v-if="tableType === 'applications'">
                    <td class="" v-for="(col, row) in rows"><span class="d-flex align-items-center">{{ rows[row] }}</span></td>
                   
                </tr>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" v-if="tableType === 'applicants'" @click="selectItem(row)">
                    <td class=""><span class="d-flex align-items-center">{{ row.title }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.first_name }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.last_name }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.mobile_phone }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.email_address }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.gender }}</span></td>
                    <td class=""><span class="d-flex align-items-center">{{ row.address }}</span></td>
                </tr>
                <tr v-for="(rows, rowIndex) in tableData" :key="rowIndex" v-if="tableType === 'onboarding'" >
                    <td class="" v-for="(col, row) in rows"><span class="d-flex align-items-center">{{ rows[row] }}</span></td>
                   
                </tr>
            </tbody>


        </table>
       </div>
        
    </div>
</template>

<style lang="scss" scoped>
    table{
        border-collapse: collapse;
        width: 100%;
        
    }

    thead th{
        font-size: 16px;
        font-weight: 600;
        background:transparent;
        color:var(--dark);
    }

    tbody td{
        background:transparent;
        color:var(--dark);
    }
    td.actions{
        gap:10px;
        button{
            padding: 5px 1.5rem;
            border:1px solid var(--primary);
            border-radius:1rem;
            transition:all .3s ease;

            &:hover{
                background-color: var(--primary);
                color: white !important;
            }

            &.text-danger{
                border:1px solid var(--bs-danger);

                &:hover{
                    background-color: var(--bs-danger);
                    color: white !important;
                }
            }
        }
    }

</style>
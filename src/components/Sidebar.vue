
<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { authStore } from "../store/store";
import { ref, watch } from 'vue';

const store = authStore();

const currentSidebarTab = ref([]);

</script>

<template>
  <aside class="sidebar" :class="{'show':store.showSidebar}">
    <div class="sidebar-content">
      <div class="sidebar-top mt-2">
        <span class="small-menu">
          <iconify-icon icon="iconamoon:arrow-left-2-bold" width="36" height="36" @click="store.showSidebar=false" class="icon"></iconify-icon>
        </span>
        <div class="logo-box"><span class="logo d-flex">[ ] Sapphire HR</span></div>
      </div>
      <div class="sidebar-menu">
        <li>
          <router-link to="/" class="sidebar-link" :class="{'active':store.currentpage === 'dashboard'}">
            <iconify-icon icon="material-symbols:dashboard-outline" width="24" height="24"></iconify-icon>
            <span>Dashboard</span>
          </router-link>
        </li>

        <!--JOBPLANNING-->
        <li class="main-option mt-4 " :class="{'faded':currentSidebarTab.indexOf('job-planning') > -1}" @click="currentSidebarTab.indexOf('job-planning') > -1 ? currentSidebarTab.splice(currentSidebarTab.indexOf('job-planning'), 1) : currentSidebarTab.push('job-planning')">
          <span>JOB PLANNING</span>
          <iconify-icon icon="iconamoon:arrow-up-2-light" width="24" height="24" v-if="currentSidebarTab.indexOf('job-planning') > -1"></iconify-icon>
          <iconify-icon icon="iconamoon:arrow-down-2-light" width="24" height="24" v-else></iconify-icon>
        </li>
        <div class="suboptions recruitment mt-3" v-show="currentSidebarTab.indexOf('job-planning') > -1">
          <li style="--t:.1s">
            <router-link to="/job-identifiers" class="sidebar-link" :class="{'active':store.currentpage === 'job-identifiers'}">
              <iconify-icon icon="flowbite:briefcase-outline" width="24" height="24"></iconify-icon>
              <span>Job Profile</span>
            </router-link>
          </li>
          <li>
            <router-link to="/manpower-request" class="sidebar-link" :class="{'active':store.currentpage === 'manpower-request'}">
              <iconify-icon icon="mdi:account-group-outline" width="24" height="24"></iconify-icon>

              <span>Manpower Request</span>
            </router-link>
          </li>
          <li>
      <router-link to="/view-request" class="sidebar-link" :class="{'active':store.currentpage === 'view-request'}">
        <iconify-icon icon="mdi:certificate-outline" width="24" height="24"></iconify-icon>
        <span>View Request</span>
      </router-link>
    </li>
        </div>

        <!--RECUITMENT-->
        <li class="main-option mt-4 " :class="{'faded':currentSidebarTab.indexOf('recruitment') > -1}" @click="currentSidebarTab.indexOf('recruitment') > -1 ? currentSidebarTab.splice(currentSidebarTab.indexOf('recruitment'), 1) : currentSidebarTab.push('recruitment')">
          <span>RECRUITMENT</span>
          <iconify-icon icon="iconamoon:arrow-up-2-light" width="24" height="24" v-if="currentSidebarTab.indexOf('recruitment') > -1"></iconify-icon>
          <iconify-icon icon="iconamoon:arrow-down-2-light" width="24" height="24" v-else></iconify-icon>
        </li>
        <div class="suboptions recruitment mt-3" v-show="currentSidebarTab.indexOf('recruitment') > -1">
          <li style="--t:.1s">
            <router-link to="job-profile" class="sidebar-link" :class="{'active':store.currentpage === 'job_profile'}">
              <iconify-icon icon="flowbite:briefcase-outline" width="24" height="24"></iconify-icon>
              <span>Job Profile</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/managers" class="sidebar-link" :class="{'active':store.currentpage === 'managers'}">
              <iconify-icon icon="line-md:search-twotone" width="24" height="24"></iconify-icon>
              <span>Vacancies</span>
            </router-link>
          </li>
          <li style="--t:.15s">
            <router-link to="/applications" class="sidebar-link" :class="{'active':store.currentpage === 'applications'}">
              <iconify-icon icon="iconoir:submit-document" width="24" height="24"></iconify-icon>
              <span>Applications</span>
            </router-link>
          </li>
          <li style="--t:.175s">
            <router-link to="/applicants" class="sidebar-link" :class="{'active':store.currentpage === 'applicants'}">
              <iconify-icon icon="fluent:person-16-regular" width="24" height="24"></iconify-icon>
              <span>Applicants</span>
            </router-link>
          </li>
          <li style="--t:.2s">
            <router-link to="/onboarding" class="sidebar-link" :class="{'active':store.currentpage === 'onboarding'}">
              <iconify-icon icon="svg-spinners:clock" width="24" height="24"></iconify-icon>
              <span>Onboarding</span>
            </router-link>
          </li>
          <li style="--t:.2s">
            <router-link to="/designation-roles" class="sidebar-link" :class="{'active':store.currentpage === 'designation_roles'}">
              <iconify-icon icon="svg-spinners:clock" width="24" height="24"></iconify-icon>
              <span>Designation Roles</span>
            </router-link>
          </li>
        </div>

        <!--ORGANIZATION-->
        <li class="main-option mt-4 " :class="{'faded':currentSidebarTab.indexOf('organization') > -1}" @click="currentSidebarTab.indexOf('organization') > -1 ? currentSidebarTab.splice(currentSidebarTab.indexOf('organization'), 1) : currentSidebarTab.push('organization')">
          <span>ORGANIZATION</span>
          <iconify-icon icon="iconamoon:arrow-up-2-light" width="24" height="24" v-if="currentSidebarTab.indexOf('organization') > -1"></iconify-icon>
          <iconify-icon icon="iconamoon:arrow-down-2-light" width="24" height="24" v-else></iconify-icon>
        </li>
        <div class="suboptions organization mt-3" v-show="currentSidebarTab.indexOf('organization') > -1">
          <li style="--t:.1s">
            <router-link to="/departments" class="sidebar-link" :class="{'active':store.currentpage === 'departments'}">
              <iconify-icon icon="flowbite:briefcase-outline" width="24" height="24"></iconify-icon>
              <span>Departments</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/designations" class="sidebar-link" :class="{'active':store.currentpage === 'designations'}">
              <iconify-icon icon="line-md:search-twotone" width="24" height="24"></iconify-icon>
              <span>Designations</span>
            </router-link>
          </li>
          <li style="--t:.15s">
            <router-link to="/company-units" class="sidebar-link" :class="{'active':store.currentpage === 'company_units'}">
              <iconify-icon icon="iconoir:submit-document" width="24" height="24"></iconify-icon>
              <span>Company Units</span>
            </router-link>
          </li>
          <li style="--t:.175s">
            <router-link to="/department-units" class="sidebar-link" :class="{'active':store.currentpage === 'department_units'}">
              <iconify-icon icon="fluent:person-16-regular" width="24" height="24"></iconify-icon>
              <span>Department Units</span>
            </router-link>
          </li>
          <li style="--t:.2s">
            <router-link to="/designation-roles" class="sidebar-link" :class="{'active':store.currentpage === 'designation_roles'}">
              <iconify-icon icon="svg-spinners:clock" width="24" height="24"></iconify-icon>
              <span>Designation Roles</span>
            </router-link>
          </li>

        </div>

        <!--EMPLOYEES-->
        <li class="main-option mt-4 " :class="{'faded':currentSidebarTab.indexOf('employees') > -1}" @click="currentSidebarTab.indexOf('employees') > -1 ? currentSidebarTab.splice(currentSidebarTab.indexOf('employees'), 1) : currentSidebarTab.push('employees')">
          <span>EMPLOYEES</span>
          <iconify-icon icon="iconamoon:arrow-up-2-light" width="24" height="24" v-if="currentSidebarTab.indexOf('employees') > -1"></iconify-icon>
          <iconify-icon icon="iconamoon:arrow-down-2-light" width="24" height="24" v-else></iconify-icon>
        </li>
        <div class="suboptions employees mt-3" v-show="currentSidebarTab.indexOf('employees') > -1">
          <li style="--t:.175s">
            <router-link to="/employees" class="sidebar-link" :class="{'active':store.currentpage === 'employees'}">
              <iconify-icon icon="raphael:employee" width="24" height="24"></iconify-icon>
              <span>Employees</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/managers" class="sidebar-link" :class="{'active':store.currentpage === 'managers'}">
              <iconify-icon icon="material-symbols:admin-panel-settings-rounded" width="24" height="24"></iconify-icon>

              <span>Admin Managers</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/operational-managers" class="sidebar-link" :class="{'active':store.currentpage === 'operational-managers'}">
              <iconify-icon icon="mdi:account-cog-outline" width="24" height="24"></iconify-icon>

              <span>Operational Managers</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/upcoming-birthday" class="sidebar-link" :class="{'active':store.currentpage === 'upcoming-birthday'}">
              <iconify-icon icon="mdi:cake-variant-outline" width="24" height="24"></iconify-icon>

              <span>Upcoming Birthday</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/probated-employees" class="sidebar-link" :class="{'active':store.currentpage === 'probated-employees'}">
              <iconify-icon icon="mdi:account-badge-outline" width="24" height="24"></iconify-icon>

              <span>Probated Employees</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/probated-extension" class="sidebar-link" :class="{'active':store.currentpage === 'probated-extension'}">
              <iconify-icon icon="mdi:account-clock-outline" width="24" height="24"></iconify-icon>

              <span>Probated Extension</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/employee-transfer" class="sidebar-link" :class="{'active':store.currentpage === 'employee-transfer'}">
              <iconify-icon icon="mdi:account-arrow-right-outline" width="24" height="24"></iconify-icon>

              <span>Employee Transfer</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/leave" class="sidebar-link" :class="{'active':store.currentpage === 'leave'}">
              <iconify-icon icon="material-symbols:beach-access-outline" width="24" height="24"></iconify-icon>

              <span>Leave</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/loan" class="sidebar-link" :class="{'active':store.currentpage === 'loan'}">
              <iconify-icon icon="mdi:cash-multiple" width="24" height="24"></iconify-icon>

              <span>Loan</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/ranks" class="sidebar-link" :class="{'active':store.currentpage === 'ranks'}">
              <iconify-icon icon="mdi:medal-outline" width="24" height="24"></iconify-icon>

              <span>Ranks</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/disciplinary-case" class="sidebar-link" :class="{'active':store.currentpage === 'disciplinary-case'}">

              <iconify-icon icon="mdi:gavel" width="24" height="24"></iconify-icon>

              <span>Disciplinary Case</span>
            </router-link>
          </li>

        </div>

        <!--HR-->
        <li class="main-option mt-4 " :class="{'faded':currentSidebarTab.indexOf('hr') > -1}" @click="currentSidebarTab.indexOf('hr') > -1 ? currentSidebarTab.splice(currentSidebarTab.indexOf('hr'), 1) : currentSidebarTab.push('hr')">
          <span>HR</span>
          <iconify-icon icon="iconamoon:arrow-up-2-light" width="24" height="24" v-if="currentSidebarTab.indexOf('hr') > -1"></iconify-icon>
          <iconify-icon icon="iconamoon:arrow-down-2-light" width="24" height="24" v-else></iconify-icon>
        </li>
        <div class="suboptions hr mt-3" v-show="currentSidebarTab.indexOf('hr') > -1">
          <li style="--t:.175s">
            <router-link to="/salary-element" class="sidebar-link" :class="{'active':store.currentpage === 'salary-element'}">
              <iconify-icon icon="mdi:briefcase-outline" width="24" height="24"></iconify-icon>
              <span>Salary Element</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/salary-category" class="sidebar-link" :class="{'active':store.currentpage === 'salary-category'}">
              <iconify-icon icon="material-symbols:admin-panel-settings-rounded" width="24" height="24"></iconify-icon>
              <span>Salary Categories</span>
            </router-link>
          </li>
          <li style="--t:.125s">
            <router-link to="/employee-salary" class="sidebar-link" :class="{'active':store.currentpage === 'employee-salary'}">
              <iconify-icon icon="mdi:account-cog-outline" width="24" height="24"></iconify-icon>

              <span>Employee Salary</span>
            </router-link>
          </li>
          <!-- <li style="--t:.125s">
                        <router-link to="/upcoming-birthday" class="sidebar-link" :class="{'active':store.currentpage === 'upcoming-birthday'}">
                            <iconify-icon icon="mdi:cake-variant-outline" width="24" height="24"></iconify-icon>

                            <span>Upcoming Birthday</span>
                        </router-link>
                    </li>
                    <li style="--t:.125s">
                        <router-link to="/probated-employees" class="sidebar-link" :class="{'active':store.currentpage === 'probated-employees'}">
                            <iconify-icon icon="mdi:account-badge-outline" width="24" height="24"></iconify-icon>

                            <span>Probated Employees</span>
                        </router-link>
                    </li>
                    <li style="--t:.125s">
                        <router-link to="/probated-extension" class="sidebar-link" :class="{'active':store.currentpage === 'probated-extension'}">
                            <iconify-icon icon="mdi:account-clock-outline" width="24" height="24"></iconify-icon>

                            <span>Probated Extension</span>
                        </router-link>
                    </li>
                    <li style="--t:.125s">
                        <router-link to="/employee-transfer" class="sidebar-link" :class="{'active':store.currentpage === 'employee-transfer'}">
                            <iconify-icon icon="mdi:account-arrow-right-outline" width="24" height="24"></iconify-icon>

                            <span>Employee Transfer</span>
                        </router-link>
                    </li>
                    <li style="--t:.125s">
                        <router-link to="/leave" class="sidebar-link" :class="{'active':store.currentpage === 'leave'}">
                            <iconify-icon icon="material-symbols:beach-access-outline" width="24" height="24"></iconify-icon>


                            <span>Leave</span>
                        </router-link>
                    </li>
                    <li style="--t:.125s">
                        <router-link to="/loan" class="sidebar-link" :class="{'active':store.currentpage === 'loan'}">
                            <iconify-icon icon="mdi:cash-multiple" width="24" height="24"></iconify-icon>

                            <span>Loan</span>
                        </router-link>
                    </li>
                    <li style="--t:.125s">
                        <router-link to="/ranks" class="sidebar-link" :class="{'active':store.currentpage === 'ranks'}">
                           <iconify-icon icon="mdi:medal-outline" width="24" height="24"></iconify-icon>
                          
                            
                            <span>Ranks</span>
                        </router-link>
                    </li>
                    <li style="--t:.125s">
                        <router-link to="/disciplinary-case" class="sidebar-link" :class="{'active':store.currentpage === 'disciplinary-case'}">
                          
                           <iconify-icon icon="mdi:gavel" width="24" height="24"></iconify-icon>
                          
                            
                            <span>Disciplinary Case</span>
                        </router-link>
                    </li>
                    <li style="--t:.15s">
                        <router-link to="/applications" class="sidebar-link" :class="{'active':store.currentpage === 'company_units'}">
                            <iconify-icon icon="iconoir:submit-document" width="24" height="24"></iconify-icon>
                            <span>Company Units</span>
                        </router-link>
                    </li>
                    <li style="--t:.175s">
                        <router-link to="/applicants" class="sidebar-link" :class="{'active':store.currentpage === 'department_units'}">
                            <iconify-icon icon="fluent:person-16-regular" width="24" height="24"></iconify-icon>
                            <span>Department Units</span>
                        </router-link>
                    </li>
                    <li style="--t:.2s">
                        <router-link to="/onboarding" class="sidebar-link" :class="{'active':store.currentpage === 'designation_roles'}">
                            <iconify-icon icon="svg-spinners:clock" width="24" height="24"></iconify-icon>
                            <span>Designation Roles</span>
                        </router-link>
                    </li> -->

        </div>
      </div>
    </div>
  </aside>
</template>


<style lang="scss" scoped>
aside {
  background-color: var(--primary);
  min-width: 280px;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  padding-bottom: 2rem;
}

aside .sidebar-content {
}

aside .sidebar-top {
  padding: 20px;
  .logo {
    font-size: 26px;
    color: var(--bs-white);
    font-weight: 600;
  }
}

.sidebar-menu {
  margin-top: 20px;

  .main-option {
    cursor: pointer;

    &.faded {
      opacity: 0.4;
    }
    padding: 0 20px;
    span {
      font-size: 16px;
    }
  }
  .sidebar-link,
  li {
    color: var(--bs-white);
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: center;

    span {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .sidebar-link {
    margin: 5px 0;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;

    &:not(.active):hover {
      opacity: 0.5;
    }

    &.active {
      background-color: var(--secondary);
      color: var(--bs-white);
    }
  }
}

.small-menu {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: right;
  color: #fff;
  display: none;

  .icon {
    cursor: pointer;
    color: var(--secondary);
  }
}

.suboptions li {
  opacity: 0;
  animation: fadein 0.3s ease forwards;
  animation-delay: var(--t);
}

@media screen and (max-width: 1024px) {
  aside {
    position: absolute;
    left: -280px;
    top: 0;
    z-index: 99;
    transition: all 0.3s ease;

    &.show {
      left: 0;

      transition: all 0.3s ease;
    }
  }

  .small-menu {
    display: flex;
  }
}

@media screen and (max-width: 600px) {
  aside {
    min-width: 200px;
  }
}

@keyframes fadein {
  100% {
    opacity: 1;
  }
}
</style>
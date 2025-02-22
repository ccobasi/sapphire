import { createRouter, createWebHistory } from 'vue-router';

import Vacancies from '../views/Vacancies.vue';
import Applications from '../views/Applications.vue'
import NotFoundVue from '../views/notFoundvue.vue';
import Applicants from '../views/Applicants.vue';
import Onboarding from '../views/Onboarding.vue';
import Departments from '../views/Departments.vue';
import Designations from '../views/Designations.vue';
import CompanyUnits from '../views/CompanyUnits.vue'
import DepartmentUnits from '../views/DepartmentUnits.vue'
import DesignationsRoles from '../views/DesignationsRoles.vue'

import Dashboard from '../views/Dashboard.vue';
import JobProfile from '../views/JobProfile.vue';
import Login from '../views/Login.vue';
import Employees from '../views/Employees.vue';
import Managers from '../views/AdminManagers.vue'
import LineManagers from '../views/OperationalManagers.vue'
import UpcomingBirthday from '../views/UpcomingBirthday.vue'
import ProbatedEmployees from '../views/ProbatedEmployees.vue'
import ProbatedExtension from '../views/ProbatedExtension.vue'
import EmployeeTransfer from '../views/EmployeeTransfer.vue'
import Leave from '../views/Leave.vue'
import Loan from '../views/Loan.vue'
import Ranks from '../views/Ranks.vue'
import DisciplinaryCase from '../views/DisciplinaryCase.vue'

import SalaryElement from '../views/SalaryElement.vue'
import SalaryCategory from '../views/SalaryCategory.vue'
import EmployeeSalary from '../views/EmployeeSalary.vue'

import JobIdentifiers from '../views/JobIdentifiers.vue'
import ManpowerRequest from '../views/ManpowerRequest.vue'
import ViewRequest from '../views/ViewRequest.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/vacancies",
    name: "vacancies",
    component: Vacancies,
  },
  {
    path: "/job-profile",
    name: "job-profile",
    component: JobProfile,
  },
  {
    path: "/departments",
    name: "departments",
    component: Departments,
  },
  {
    path: "/department-units",
    name: "department-units",
    component: DepartmentUnits,
  },
  {
    path: "/designations",
    name: "designations",
    component: Designations,
  },
  {
    path: "/designation-roles",
    name: "designation-roles",
    component: DesignationsRoles,
  },
  {
    path: "/company-units",
    name: "company-units",
    component: CompanyUnits,
  },
  {
    path: "/applications",
    name: "applications",
    component: Applications,
  },
  {
    path: "/applicants",
    name: "applicants",
    component: Applicants,
  },
  {
    path: "/onboarding",
    name: "onboarding",
    component: Onboarding,
  },

  {
    path: "/:notFound(.*)*",
    name: "notFound",
    component: NotFoundVue,
  },
  {
    path: "/employees",
    name: "employees",
    component: Employees,
  },
  {
    path: "/managers",
    name: "managers",
    component: Managers,
  },
  {
    path: "/operational-managers",
    name: "operational-managers",
    component: LineManagers,
  },
  {
    path: "/upcoming-birthday",
    name: "upcoming-birthday",
    component: UpcomingBirthday,
  },
  {
    path: "/probated-employees",
    name: "probated-employees",
    component: ProbatedEmployees,
  },
  {
    path: "/probated-extension",
    name: "probated-extension",
    component: ProbatedExtension,
  },
  {
    path: "/employee-transfer",
    name: "employee-transfer",
    component: EmployeeTransfer,
  },
  {
    path: "/leave",
    name: "leave",
    component: Leave,
  },
  {
    path: "/loan",
    name: "loan",
    component: Loan,
  },
    {
    path: "/ranks",
    name: "ranks",
    component: Ranks,
  },
  {
    path: "/disciplinary-case",
    name: "disciplinary-case",
    component: DisciplinaryCase,
  },
  {
    path: "/salary-element",
    name: "salary-element",
    component: SalaryElement,
  },
   {
    path: "/salary-category",
    name: "salary-category",
    component: SalaryCategory,
  },
     {
    path: "/employee-salary",
    name: "employee-salary",
    component: EmployeeSalary,
  },
  {
    path: "/job-identifiers",
    name: "job-identifiers",
    component: JobIdentifiers,
  },
    {
    path: "/manpower-request",
    name: "manpower-request",
    component: ManpowerRequest,
  },
  {
    path: "/view-request",
    name: "view-request",
    component: ViewRequest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;

<template>
  <div class="dashboard-content">

    <div class="row">
      <div class="welcome d-flex align-items-center justify-content-between">
        <div class="col-md-6 navbar-brand-custom">Welcome Back, Admin!
          <p>Here is an overview of your dashboard today</p>
        </div>

        <div class="col-md-6 text-md-end mt-3 mt-md-0">
          <div class="d-inline-flex align-items-center">
            <!-- Year Dropdown -->
            <div class="dropdown me-3">
              <button class="btn btn-outline-secondary rounded-pill d-flex align-items-center" type="button" id="yearDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <iconify-icon icon="mdi:calendar" width="24" height="24"></iconify-icon><span>2023</span>
                <iconify-icon icon="iconamoon:arrow-down-2" width="24" height="24"></iconify-icon>
              </button>
              <ul class="dropdown-menu" aria-labelledby="yearDropdown">
                <li><a class="dropdown-item" href="#">2022</a></li>
                <li><a class="dropdown-item" href="#">2021</a></li>
              </ul>
            </div>

            <button class="btn btn-primary rounded-pill d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
              <iconify-icon icon="mdi:user-add" width="24" height="24"></iconify-icon> <span>Add Employee</span>
            </button>
          </div>
        </div>
      </div>

      <div class="count mt-4">
        <!-- Card 1 -->
        <div class="row-item">
          <div class="summary-card">
            <div class="card-content">
              <div class="number-icon">
                <span class="number">30</span>
                <iconify-icon icon="mdi:people-outline" class="icon"></iconify-icon>
              </div>
              <p class="label">Total Employees</p>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="row-item">
          <div class="summary-card">
            <div class="card-content">
              <div class="number-icon">
                <span class="number">20</span>
                <iconify-icon icon="tabler:briefcase"  class="icon"></iconify-icon>
              </div>
              <p class="label">Recent Applications</p>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="row-item">
          <div class="summary-card">
            <div class="card-content">
              <div class="number-icon">
                <span class="number">10</span>
                <iconify-icon icon="svg-spinners:clock"  class="icon"></iconify-icon>
              </div>
              <p class="label">Pending Leaves</p>
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="row-item">
          <div class="summary-card">
            <div class="card-content">
              <div class="number-icon">
                <span class="number">30</span>
                <iconify-icon icon="fluent:calendar-person-16-regular"  class="icon"></iconify-icon>
              </div>
              <p class="label">Employees on Leave</p>
            </div>
          </div>
        </div>
      </div>

      

      <div class="container-fluid py-4">
        <div class="row g-4">

          <div class="col-lg-8">
            <div class="card shadow-sm border-0 p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold">Employee Statistics</h5>
                <div class="d-flex align-items-center">
                  <span class="badge bg-primary me-2">New Intakes</span>
                  <span class="badge bg-warning me-2">Resignations</span>
                  <div class="dropdown">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Monthly
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Weekly</a></li>
                      <li><a class="dropdown-item" href="#">Quarterly</a></li>
                      <li><a class="dropdown-item" href="#">Yearly</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <LineChart />

            </div>
          </div>

          <div class="col-lg-4">
            <div class="card shadow-sm border-0 p-4">
              <h5 class="fw-bold mb-3">Employees Absent Today</h5>
              <ul class="list-unstyled">

                <li class="d-flex align-items-center justify-content-between mb-3">
                  <div class="d-flex align-items-center">
                    <div class="imgbox">
                      <img src="../assets/profile.jpeg" class="rounded-circle me-3" alt="Profile Picture">
                    </div>
                    <div>
                      <h6 class="mb-0 fw-bold">Ade James</h6>
                      <small class="text-muted">UI/UX Designer</small>
                    </div>
                  </div>
                  <a href="#" class="text-primary text-decoration-none">On leave</a>
                </li>

                <li class="d-flex align-items-center justify-content-between mb-3">
                  <div class="d-flex align-items-center">
                    <div class="imgbox">
                      <img src="../assets/2.png" class="rounded-circle me-3" alt="Profile Picture">
                    </div>
                    <div>
                      <h6 class="mb-0 fw-bold">Ade Jamal</h6>
                      <small class="text-muted">Digital Marketer</small>
                    </div>
                  </div>
                  <span class="text-muted">No reason</span>
                </li>

                <li class="d-flex align-items-center justify-content-between mb-3">
                  <div class="d-flex align-items-center">
                    <div class="imgbox">
                      <img src="../assets/profile.jpeg" class="rounded-circle me-3" alt="Profile Picture">
                    </div>
                    <div>
                      <h6 class="mb-0 fw-bold">Ade James</h6>
                      <small class="text-muted">UI/UX Designer</small>
                    </div>
                  </div>
                  <a href="#" class="text-primary text-decoration-none">On leave</a>
                </li>

                <li class="d-flex align-items-center justify-content-between mb-3">
                  <div class="d-flex align-items-center">
                    <div class="imgbox">
                      <img src="../assets/profile.jpeg" class="rounded-circle me-3" alt="Profile Picture">
                    </div>
                    <div>
                      <h6 class="mb-0 fw-bold">Ade James</h6>
                      <small class="text-muted">UI/UX Designer</small>
                    </div>
                  </div>
                  <a href="#" class="text-primary text-decoration-none">On leave</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="section-title">Upcoming Resignations</h5>
              <div class="table-container">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Reason</th>
                      <th>Notice Date</th>
                      <th>Resignation Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(resignation, index) in resignations" :key="index">
                      <td>{{ resignation.employee }}</td>
                      <td>{{ resignation.reason }}</td>
                      <td>{{ resignation.noticeDate }}</td>
                      <td>{{ resignation.resignationDate }}</td>
                      <td>{{ resignation.status }}</td>
                      <td>

                        <button v-if="resignation.status === 'Approved'" class="btn btn-primary action-btn" @click="sendInvite(resignation)">Send Invite</button>
                        <!-- <button v-if="resignation.status === 'Approved'" class="btn btn-danger action-btn" @click="deleteResignation(resignation)">Delete</button> -->
                        <button v-if="resignation.status === 'Pending'" class="btn btn-warning action-btn" @click="addRemark(resignation)">Add Remark</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                  <li v-for="page in totalPages" :key="page" class="page-item" :class="{active: currentPage === page}">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="section-title">Upcoming Interviews</h5>
              <ul class="nav nav-tabs pb-2" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link" :class="{active: activeTab === 'today'}" id="today-tab" data-toggle="tab" href="#today" role="tab" aria-controls="today" aria-selected="false" @click.prevent="setActiveTab('today')">Today</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{active: activeTab === 'tomorrow'}" id="tomorrow-tab" data-toggle="tab" href="#tomorrow" role="tab" aria-controls="tomorrow" aria-selected="true" @click.prevent="setActiveTab('tomorrow')">Tomorrow</a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'today' }" id="today" role="tabpanel" aria-labelledby="today-tab">
                  <!-- Content for Today's Interviews -->
                  <div v-for="(interview, index) in todayInterviews" :key="index" class="interview-card d-flex align-items-center">
                    <img :src="interview.profilePic" alt="Profile Picture" class="rounded-circle">
                    <div class="ml-3">
                      <h6 class="mb-0">{{ interview.name }}</h6>
                      <small class="text-muted">{{ interview.position }}</small>
                      <p class="mb-0"><small>{{ interview.time }}</small></p>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'tomorrow' }" id="tomorrow" role="tabpanel" aria-labelledby="tomorrow-tab">
                  <!-- Content for Tomorrow's Interviews -->
                  <div v-for="(interview, index) in tomorrowInterviews" :key="index" class="interview-card d-flex align-items-center">
                    <div class="imgbox">
                      <img :src="interview.profilePic" alt="Profile Picture" class="rounded-circle">
                    </div>
                    <div class="ml-4">
                      <h6 class="mb-0">{{ interview.name }}</h6>
                      <small class="text-muted">{{ interview.position }}</small>
                      <p class="mb-0 time"><small>{{ interview.time }}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
  <!-- Bootstrap Modal -->
  <div class="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addEmployeeModalLabel">Add Employee</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <!-- First Name -->
              <div class="col-md-6 mb-3">
                <label for="firstName" class="form-label">First Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control rounded-pill" id="firstName" placeholder="Enter first name" required>
              </div>

              <!-- Last Name -->
              <div class="col-md-6 mb-3">
                <label for="lastName" class="form-label">Last Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control rounded-pill" id="lastName" placeholder="Enter last name" required>
              </div>

              <!-- Email -->
              <div class="col-md-6 mb-3">
                <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                <input type="email" class="form-control rounded-pill" id="email" placeholder="Enter email" required>
              </div>

              <!-- Phone -->
              <div class="col-md-6 mb-3">
                <label for="phone" class="form-label">Phone <span class="text-danger">*</span></label>
                <input type="tel" class="form-control rounded-pill" id="phone" placeholder="Enter phone number" required>
              </div>

              <!-- Business Unit -->
              <div class="col-md-6 mb-3">
                <label for="businessUnit" class="form-label">Business Unit <span class="text-danger">*</span></label>
                <select class="form-select rounded-pill" id="businessUnit" required>
                  <option value="" disabled selected>Select business unit</option>
                  <option>Unit 1</option>
                  <option>Unit 2</option>
                  <option>Unit 3</option>
                </select>
              </div>

              <!-- Designation -->
              <div class="col-md-6 mb-3">
                <label for="designation" class="form-label">Designation <span class="text-danger">*</span></label>
                <select class="form-select rounded-pill" id="designation" required>
                  <option value="" disabled selected>Select designation</option>
                  <option>Designer</option>
                  <option>Developer</option>
                  <option>Manager</option>
                </select>
              </div>

              <!-- Level -->
              <div class="col-md-6 mb-3">
                <label for="level" class="form-label">Level</label>
                <select class="form-select rounded-pill" id="level">
                  <option value="" disabled selected>Select level</option>
                  <option>Junior</option>
                  <option>Mid</option>
                  <option>Senior</option>
                </select>
              </div>

              <!-- Employee Code -->
              <div class="col-md-6 mb-3">
                <label for="employeeCode" class="form-label">Employee Code</label>
                <input type="text" class="form-control rounded-pill" id="employeeCode" placeholder="Enter employee code">
              </div>

              <!-- Joined Date -->
              <div class="col-md-6 mb-3">
                <label for="joinedDate" class="form-label">Joined Date</label>
                <input type="date" class="form-control rounded-pill" id="joinedDate">
              </div>
            </div>

            <!-- Submit Button -->
            <div class="text-center">
              <button type="submit" class="btn btn-primary rounded-pill px-4">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import LineChart from '../components/LineChart.vue';
import profilePicAde from '../assets/profile.jpeg';
import profilePicAdebayo from '../assets/3.jpeg';

const resignations = ref([
  { employee: 'Ade James', reason: 'Low Pay', noticeDate: '21/02/23', resignationDate: '22/02/23', status: 'Approved' },
  { employee: 'Ade James', reason: 'Low Pay', noticeDate: '21/02/23', resignationDate: '22/02/23', status: 'Approved' },
  { employee: 'Ade James', reason: 'Low Pay', noticeDate: '21/02/23', resignationDate: '22/02/23', status: 'Pending' },
  { employee: 'Ade James', reason: 'Low Pay', noticeDate: '21/02/23', resignationDate: '22/02/23', status: 'Approved' }
]);

const todayInterviews = ref([
  { name: 'Ade James', position: 'UI/UX Designer', profilePic: 'path/to/profile-pic.jpg', time: '10:00 - 12:00' }
]);

const tomorrowInterviews = ref([
  { name: 'Ade James', position: 'UI/UX Designer', profilePic: profilePicAde, time: '10:00 - 12:00' },
  { name: 'Adebayo Jamai', position: 'Digital Marketer', profilePic: profilePicAdebayo, time: '10:00 - 12:00' }
]);

const activeTab = ref('tomorrow');
const currentPage = ref(1);
const totalPages = ref(3);

function sendInvite(resignation) {
  console.log('Sending invite for:', resignation.employee);
}

function deleteResignation(resignation) {
  console.log('Deleting resignation for:', resignation.employee);
}

function addRemark(resignation) {
  console.log('Adding remark for:', resignation.employee);
}

function setActiveTab(tab) {
  activeTab.value = tab;
}

function changePage(page) {
  currentPage.value = page;
}

</script>


<style lang="scss" scoped>


.row {
  margin-bottom: 20px;

}
.count{
  display:grid;
  padding:0;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap:20px;

    .row-item{
      width:100%;
      
    }
  }



  



.dropdown button {
  width: 138px;
  height: 50px;
  top: 173px;
  left: 1123px;
  padding: 0px 15px 0px 15px;
  gap: 15px;
  border-radius: 20px;
  border: 1px solid #33333380;
  opacity: 0px;
}

.rounded-pill {
  width: 190px;
  height: 50px;
  top: 173px;
  left: 1281px;
  padding: 14px 20px 14px 20px;
  gap: 10px;
  border-radius: 20px 0px 0px 0px;
  opacity: 0px;
}

.number {
  font-family: "Satoshi", sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--dark);
}

.summary-card {
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-card .number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
}

.summary-card .label {
  font-size: 0.9rem;
  color: var(--info);
}

.summary-card .icon {
  font-size: 2rem;
  color: #007bff;
}

/* Responsive Spacing */
.row > .col-md-3 {
  margin-bottom: 20px;
}

.summary-card .card-content .number-icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  
}

.summary-card .card-content .number-icon .icon {
  margin-left: 90px;
  font-size:36px !important;
}

h5 {
  font-family: "Satoshi", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  text-align: right;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--dark);
}

h6,
.form-label {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 18.9px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--dark);
}

.text-muted {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18.9px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color:var(--info) !important;
}

.badge {
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.card{
  background:var(--card-background);
}

.card-body {
  font-family: "Satoshi", sans-serif;
}

.card-title,
.text-muted,
.form-label {
  font-family: "Satoshi", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.navbar-brand-custom {
  font-family: "Satoshi", sans-serif;
  font-size: 30px;
  font-weight: 500;
  line-height: 40.5px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--dark);
}

p {
  font-family: "Satoshi", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--info);
}

.nav-item span {
  width: 65px;
  height: 30px;
  padding: 6px 12px 6px 12px;
  gap: 8px;
  border-radius: 6px;
  opacity: 0px;
  background: #ce4949;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #ffffff;
}

.filter-container {
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.nav-tabs .nav-link,
.form-select {
  cursor: pointer;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: black;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
}
.table-container {
  overflow-x: auto;
}

thead th {
  font-family: "Satoshi", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 18.9px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--dark);
  background:var(--card-background);
}

tbody td {
  font-family: "Satoshi", sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 18.9px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--dark);
  background:var(--card-background);
}

tbody button {
  width: 90px;
  height: 30px;
  left: 12px;
  padding: 7px 10px;
  gap: 10px;
  border-radius: 20px;
  opacity: 0px;
  color: #fff;
  font-family: "Satoshi", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16.2px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.action-btn {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
.interview-card {
  padding: 1rem;
  gap:20px;
  border: 1px solid var(--grey);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.interview-card img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.nav-tabs {
  gap:10px;
  .nav-link.active {
    color: #347ae2;
  }
}

#today-tab {
  width: fit-content;
  height: 32px;
  opacity: 0px;
  font-family: "Satoshi", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 21.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  padding: 5px 15px 5px 15px;
  gap: 10px;
  border-radius: 20px;
  background: #347ae2;
  color: #fff;
}

#tomorrow-tab {
  width: fit-content;
  height: 32px;
  padding: 5px 15px 5px 15px;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid #347ae2;
  opacity: 0px;
}

.time {
  width: fit-content;
  height: 31px;
  padding: 2px 8px;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid #347ae2;
  opacity: 0px;
}

.nav-tabs .nav-link.active {
  color: #347ae2;
  font-weight: bold;
}

.form-control,
.form-select {
  width: 350px !important;
  height: 50px;
  gap: 0px;
  border-radius: 20px;
  opacity: 0px;
  background: #494d570d;
  border-color: #ced4da;
  padding-right: 30px;
}

.form-control {
  width: auto;
}

.second {
  font-size: 14px;
}

.list {
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.36px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

img {
  width: 40px;
  height: 40px;
}

.imgbox{
  width: 50px;
  height: 50px;

  img{
    object-fit: cover;
  }
  
}






@media (max-width: 768px) {
  .nav-tabs .nav-link {
    font-size: 12px;
  }

  .card {
    margin-bottom: 15px;
    padding-left: 2px;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }




  .list-group-item {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .card-title,
  .text-muted,
  .form-label {
    font-size: 10px;
  }

  .res {
    flex-direction: column;
    gap: 20px;
  }

  .card-text,
  .text-success {
    font-size: 12px;
  }

  .list {
    font-size: 13px;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .top {
    flex-direction: column;
  }
}



@media (max-width: 576px) {
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>

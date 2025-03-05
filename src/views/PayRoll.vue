<!-- <template>
  <div class="container mx-auto p-4 space-y-4 md:space-y-6 lg:space-y-8">

    <div class="text-left mb-2 md:mb-4">
      <select v-model="currentRole" class="form-select w-full md:w-auto" style="max-width: 200px;">
        <option value="hrAdmin">HR Admin Officer</option>
        <option value="hrPayroll">HR Payroll Officer</option>
        <option value="headOfHr">Head of HR & Admin</option>
        <option value="internalAudit">Internal Audit</option>
        <option value="mdCeo">MD/CEO</option>
        <option value="accountsManager">Accounts Manager</option>
      </select>
    </div>

    <div v-if="notifications.length" class="alert alert-info mb-2 md:mb-4" role="alert">
      <ul class="mb-0">
        <li v-for="(notification, index) in notifications" :key="index" class="text-dark text-sm md:text-base">
          {{ notification.message }} <button @click="removeNotification(index)" class="btn btn-sm btn-close ms-1 md:ms-2"></button>
        </li>
      </ul>
    </div>

    <div v-if="currentRole !== 'mdCeo' && selectedPayroll?.value && payrolls.length" class="bg-light p-2 md:p-3 rounded mb-2 md:mb-4">
      <h3 class="h6 md:h5 text-primary mb-1 md:mb-2">Payroll Status</h3>
      <div class="d-flex align-items-center gap-1 md:gap-2">
        <span :class="statusClass">{{ selectedPayroll.value.status }}</span>
        <p v-if="selectedPayroll.value.comments" class="text-muted text-xs md:text-sm mb-0">"{{ selectedPayroll.value.comments }}"</p>
      </div>
      <svg v-if="selectedPayroll.value.comments" class="text-warning ms-1 md:ms-2" width="16 md:20" height="16 md:20" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
      </svg>
    </div>

    <div class="text-left">
      <h1 class="text-2xl md:text-4xl font-bold text-primary">Payroll Management</h1>
      <p class="text-xs md:text-sm text-muted mt-1 md:mt-2">Manage payroll processes and employee payments below.</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-2 md:p-6 info">
      <h2 class="text-lg md:text-xl font-semibold text-dark mb-2 md:mb-4">Current Payroll Records</h2>
      <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse text-left" v-if="payrolls.length">
          <thead>
            <tr class="bg-light text-primary">
              <th class="px-2 py-1 md:px-4 md:py-3 border-b font-semibold text-xs md:text-sm">Employee ID</th>
              <th class="px-2 py-1 md:px-4 md:py-3 border-b font-semibold text-xs md:text-sm">Name</th>
              <th class="px-2 py-1 md:px-4 md:py-3 border-b font-semibold text-xs md:text-sm">Base Salary</th>
              <th class="px-2 py-1 md:px-4 md:py-3 border-b font-semibold text-xs md:text-sm">Penalties</th>
              <th class="px-2 py-1 md:px-4 md:py-3 border-b font-semibold text-xs md:text-sm">Arrears</th>
              <th class="px-2 py-1 md:px-4 md:py-3 border-b font-semibold text-xs md:text-sm">Loans</th>
              <th class="px-2 py-1 md:px-4 md:py-3 border-b font-semibold text-xs md:text-sm">Status</th>
              <th class="px-2 py-1 md:px-4 md:py-3 border-b font-semibold text-xs md:text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payroll in payrolls" :key="payroll.id" class="hover:bg-gray-100">
              <td class="px-2 py-1 md:px-4 md:py-3 border-b text-dark text-xs md:text-sm">{{ payroll.id }}</td>
              <td class="px-2 py-1 md:px-4 md:py-3 border-b text-dark text-xs md:text-sm">{{ payroll.name }}</td>
              <td class="px-2 py-1 md:px-4 md:py-3 border-b text-dark text-xs md:text-sm">${{ payroll.baseSalary.toLocaleString() }}</td>
              <td class="px-2 py-1 md:px-4 md:py-3 border-b text-dark text-xs md:text-sm">${{ payroll.penalties.toLocaleString() }}</td>
              <td class="px-2 py-1 md:px-4 md:py-3 border-b text-dark text-xs md:text-sm">${{ payroll.arrears.toLocaleString() }}</td>
              <td class="px-2 py-1 md:px-4 md:py-3 border-b text-dark text-xs md:text-sm">${{ payroll.loans.toLocaleString() }}</td>
              <td class="px-2 py-1 md:px-4 md:py-3 border-b text-dark text-xs md:text-sm">{{ payroll.status }}</td>
              <td v-if="currentRole === 'hrAdmin' || (currentRole !== 'hrPayroll' && isActionableStatus(payroll.status)) || (currentRole === 'hrPayroll' && payroll.status === 'Not Initiated' && payroll.active === 'true')" class="px-2 py-1 md:px-4 md:py-3 border-b">
                <button v-if="currentRole === 'hrAdmin' || (currentRole !== 'hrPayroll' && isActionableStatus(payroll.status))" @click="selectPayroll(payroll)" class="px-2 py-1 md:px-3 md:py-1 bg-primary text-white rounded text-xs md:text-sm hover:bg-primary-dark">Manage</button>
                <button v-if="currentRole === 'hrPayroll' && payroll.status === 'Not Initiated' && payroll.active === 'true'" @click="initiatePayroll(payroll)" class="px-2 py-1 md:px-3 md:py-1 bg-primary text-white rounded text-xs md:text-sm hover:bg-primary-dark">Manage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="!payrolls.length" class="text-muted text-xs md:text-sm">No payroll records available.</p>
      <div class="flex justify-end mt-2 md:mt-4">
        <button v-if="currentRole === 'hrAdmin'" @click="addPayrollRecord" class="px-4 py-1 md:px-6 md:py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm text-xs md:text-sm transition duration-200 bd">
          Add Payroll Record
        </button>
      </div>
    </div>

    <div v-if="payrollFormVisible" class="bg-white rounded-lg shadow-lg p-2 md:p-6 info">
      <h2 class="text-lg md:text-xl font-semibold text-dark mb-2 md:mb-4">Add/Update Employee Record</h2>
      <form @submit.prevent="savePayroll" class="mb-2 md:mb-4">
        <div class="row g-1 md:g-3">
          <div class="col-12 md:col-md-6">
            <label for="employeeId" class="form-label text-muted text-xs md:text-sm">Employee ID</label>
            <input type="text" id="employeeId" v-model="newPayroll.id" class="form-control text-xs md:text-sm" required />
          </div>
          <div class="col-12 md:col-md-6">
            <label for="name" class="form-label text-muted text-xs md:text-sm">Name</label>
            <input type="text" id="name" v-model="newPayroll.name" class="form-control text-xs md:text-sm" required />
          </div>
          <div class="col-12 md:col-md-6">
            <label for="baseSalary" class="form-label text-muted text-xs md:text-sm">Base Salary ($)</label>
            <input type="number" id="baseSalary" v-model.number="newPayroll.baseSalary" class="form-control text-xs md:text-sm" required step="0.01" min="0" />
          </div>
          <div class="col-12 md:col-md-6">
            <label for="penalties" class="form-label text-muted text-xs md:text-sm">Penalties ($)</label>
            <input type="number" id="penalties" v-model.number="newPayroll.penalties" class="form-control text-xs md:text-sm" step="0.01" min="0" />
          </div>
          <div class="col-12 md:col-md-6">
            <label for="arrears" class="form-label text-muted text-xs md:text-sm">Arrears ($)</label>
            <input type="number" id="arrears" v-model.number="newPayroll.arrears" class="form-control text-xs md:text-sm" step="0.01" min="0" />
          </div>
          <div class="col-12 md:col-md-6">
            <label for="loans" class="form-label text-muted text-xs md:text-sm">Loans ($)</label>
            <input type="number" id="loans" v-model.number="newPayroll.loans" class="form-control text-xs md:text-sm" step="0.01" min="0" />
          </div>
          <div class="col-12">
            <label class="form-label text-muted text-xs md:text-sm">Active</label>
            <select v-model="newPayroll.active" class="form-select text-xs md:text-sm">
              <option value="true">Yes</option>
              <option value="false">No (Suspended/Terminated)</option>
            </select>
          </div>
        </div>
        <div class="d-flex justify-content-end gap-2 mt-2 md:mt-4">
          <button type="button" @click="cancelPayroll" class="btn btn-secondary px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Cancel</button>
          <button type="submit" class="btn btn-primary px-2 py-1 md:px-6 md:py-2 text-xs md:text-sm">Save</button>
        </div>
      </form>
    </div>

    <div v-if="showModal" class="modal d-block" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title text-primary text-lg md:text-xl">{{ getModalTitle() }}</h2>
            <button type="button" @click="showModal = false" class="btn-close" aria-label="Close"></button>
          </div>

          <div class="modal-body p-2 md:p-4">

            <div v-if="currentRole === 'hrAdmin' && selectedPayroll?.value">
              <h3 class="h5 md:h6 text-dark mb-1 md:mb-2 text-sm md:text-base">Update Employee Records</h3>
              <form @submit.prevent="savePayroll" class="mb-2 md:mb-4" :key="selectedPayroll.value?.id">
                <div class="row g-1 md:g-3">
                  <div class="col-12 md:col-md-6">
                    <label for="employeeId" class="form-label text-muted text-xs md:text-sm">Employee ID</label>
                    <input type="text" id="employeeId" v-model="selectedPayroll.value.id" class="form-control text-xs md:text-sm" disabled />
                  </div>
                  <div class="col-12 md:col-md-6">
                    <label for="name" class="form-label text-muted text-xs md:text-sm">Name</label>
                    <input type="text" id="name" v-model="selectedPayroll.value.name" class="form-control text-xs md:text-sm" disabled />
                  </div>
                  <div class="col-12 md:col-md-6">
                    <label for="baseSalary" class="form-label text-muted text-xs md:text-sm">Base Salary ($)</label>
                    <input type="number" id="baseSalary" v-model.number="selectedPayroll.value.baseSalary" class="form-control text-xs md:text-sm" required step="0.01" min="0" />
                  </div>
                  <div class="col-12 md:col-md-6">
                    <label for="penalties" class="form-label text-muted text-xs md:text-sm">Penalties ($)</label>
                    <input type="number" id="penalties" v-model.number="selectedPayroll.value.penalties" class="form-control text-xs md:text-sm" step="0.01" min="0" />
                  </div>
                  <div class="col-12 md:col-md-6">
                    <label for="arrears" class="form-label text-muted text-xs md:text-sm">Arrears ($)</label>
                    <input type="number" id="arrears" v-model.number="selectedPayroll.value.arrears" class="form-control text-xs md:text-sm" step="0.01" min="0" />
                  </div>
                  <div class="col-12 md:col-md-6">
                    <label for="loans" class="form-label text-muted text-xs md:text-sm">Loans ($)</label>
                    <input type="number" id="loans" v-model.number="selectedPayroll.value.loans" class="form-control text-xs md:text-sm" step="0.01" min="0" />
                  </div>
                  <div class="col-12">
                    <label class="form-label text-muted text-xs md:text-sm">Active</label>
                    <select v-model="selectedPayroll.value.active" class="form-select text-xs md:text-sm">
                      <option value="true">Yes</option>
                      <option value="false">No (Suspended/Terminated)</option>
                    </select>
                  </div>
                </div>
                <div class="d-flex justify-content-end gap-2 mt-2 md:mt-4">
                  <button type="button" @click="showModal = false" class="btn btn-secondary px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Cancel</button>
                  <button type="submit" class="btn btn-primary px-2 py-1 md:px-6 md:py-2 text-xs md:text-sm">Save Changes</button>
                </div>
              </form>
              <p class="text-xs md:text-sm text-muted">Debug: selectedPayroll = {{ JSON.stringify(selectedPayroll.value) }}</p>
            </div>

            <div v-if="currentRole !== 'hrAdmin' && currentRole !== 'hrPayroll' && selectedPayroll?.value && selectedPayroll.value.active === 'true' && selectedPayroll.value.status !== 'Not Initiated'">
              <h3 class="h5 md:h6 text-dark mb-1 md:mb-2 text-sm md:text-base">Review Payroll Details</h3>
              <div class="row g-1 md:g-3 mb-2 md:mb-4">
                <div class="col-12">
                  <table class="table table-bordered">
                    <thead>
                      <tr class="bg-light">
                        <th class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Field</th>
                        <th class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Employee ID</td>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{{ selectedPayroll.value.id }}</td>
                      </tr>
                      <tr>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Name</td>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{{ selectedPayroll.value.name }}</td>
                      </tr>
                      <tr>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Base Salary</td>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">${{ selectedPayroll.value.baseSalary.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Penalties</td>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">${{ selectedPayroll.value.penalties.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Arrears</td>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">${{ selectedPayroll.value.arrears.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Loans</td>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">${{ selectedPayroll.value.loans.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Net Salary</td>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">${{ calculateNetSalary(selectedPayroll.value).toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Status</td>
                        <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{{ selectedPayroll.value.status }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <section class="mb-2 md:mb-4">
                <h3 class="h6 md:h5 text-dark mb-1 md:mb-2 text-sm md:text-base">Review and Approval Status</h3>
                <div class="bg-light p-1 md:p-3 rounded d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center gap-1 md:gap-2">
                    <span :class="statusClass">{{ selectedPayroll.value.status }}</span>
                    <p v-if="selectedPayroll.value.comments" class="text-muted text-xs md:text-sm mb-0">"{{ selectedPayroll.value.comments }}"</p>
                  </div>
                  <svg v-if="selectedPayroll.value.comments" class="text-warning ms-1 md:ms-2" width="16 md:20" height="16 md:20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
                  </svg>
                </div>
              </section>

              <div class="d-flex justify-content-end gap-2 mt-2 md:mt-4">
                <button v-if="currentRole === 'headOfHr' && selectedPayroll.value.status === 'Initiated'" type="button" @click="reviewPayroll(selectedPayroll.value)" class="btn btn-success px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Validate</button>
                <button v-if="currentRole === 'headOfHr' && selectedPayroll.value.status === 'Initiated'" type="button" @click="rejectPayroll(selectedPayroll.value)" class="btn btn-danger px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Request Rework</button>
                <input v-if="currentRole === 'headOfHr' && selectedPayroll.value.status === 'Initiated'" v-model="selectedPayroll.value.comments" type="text" class="form-control w-50 text-xs md:text-sm" placeholder="Comments" />

                <button v-if="currentRole === 'internalAudit' && selectedPayroll.value.status === 'Head of HR Reviewed'" type="button" @click="validateAudit(selectedPayroll.value)" class="btn btn-success px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Validate</button>
                <button v-if="currentRole === 'internalAudit' && selectedPayroll.value.status === 'Head of HR Reviewed'" type="button" @click="declineAudit(selectedPayroll.value)" class="btn btn-danger px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Decline</button>
                <input v-if="currentRole === 'internalAudit' && selectedPayroll.value.status === 'Head of HR Reviewed'" v-model="selectedPayroll.value.comments" type="text" class="form-control w-50 text-xs md:text-sm" placeholder="Comments" />

                <button v-if="currentRole === 'mdCeo' && selectedPayroll.value.status === 'Internal Audit Validated'" type="button" @click="approveCeo(selectedPayroll.value)" class="btn btn-success px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Approve</button>
                <button v-if="currentRole === 'mdCeo' && selectedPayroll.value.status === 'Internal Audit Validated'" type="button" @click="declineCeo(selectedPayroll.value)" class="btn btn-danger px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Decline</button>
                <input v-if="currentRole === 'mdCeo' && selectedPayroll.value.status === 'Internal Audit Validated'" v-model="selectedPayroll.value.comments" type="text" class="form-control w-50 text-xs md:text-sm" placeholder="Comments" />

                <button v-if="currentRole === 'accountsManager' && selectedPayroll.value.status === 'MD/CEO Approved'" type="button" @click="uploadToBank(selectedPayroll.value)" class="btn btn-primary px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Upload to Bank</button>

                <button type="button" @click="showModal = false" class="btn btn-secondary px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Cancel</button>
              </div>
            </div>

            <div v-if="currentRole === 'hrAdmin' && selectedPayroll?.value && selectedPayroll.value.status === 'Bank Uploaded'">
              <h3 class="h5 md:h6 text-dark mb-1 md:mb-2 text-sm md:text-base">Generate Payslips</h3>
              <div class="d-flex gap-2">
                <button @click="generatePayslips(selectedPayroll.value)" class="btn btn-success px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Generate and Share Payslips</button>
                <button type="button" @click="showModal = false" class="btn btn-secondary px-2 py-1 md:px-4 md:py-1 text-xs md:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentRole === 'mdCeo'" class="bg-white rounded-lg shadow-lg p-2 md:p-6 info">
      <h2 class="text-lg md:text-xl font-semibold text-dark mb-2 md:mb-4">Periodic Payment Report</h2>
      <button @click="generateReport" class="px-4 py-1 md:px-6 md:py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm text-xs md:text-sm transition duration-200 bd">
        Generate Report
      </button>
      <div v-if="reportGenerated" class="mt-2 md:mt-4">
        <h4 class="text-dark text-sm md:text-base">Payment Report (As of {{ currentDate }})</h4>
        <table class="table table-bordered mt-1 md:mt-2">
          <thead>
            <tr class="bg-light">
              <th class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Employee ID</th>
              <th class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Name</th>
              <th class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Net Salary</th>
              <th class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Status</th>
              <th class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">Date Processed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payroll in paidPayrolls" :key="payroll.id">
              <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{{ payroll.id }}</td>
              <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{{ payroll.name }}</td>
              <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">${{ calculateNetSalary(payroll).toLocaleString() }}</td>
              <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{{ payroll.status }}</td>
              <td class="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{{ payroll.processedDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, nextTick, watch } from "vue";

// Reactive state
const currentRole = ref("hrAdmin");
const showModal = ref(false);
const payrollFormVisible = ref(false);
const notifications = ref([]);
const currentDate = new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });

// Payroll data
const payrolls = ref([]);
const newPayroll = reactive({
  id: "",
  name: "",
  baseSalary: 0,
  penalties: 0,
  arrears: 0,
  loans: 0,
  active: "true",
  status: "Not Initiated",
  comments: "",
  processedDate: null,
});
const selectedPayroll = ref(null);
const paidPayrolls = ref([]);
const reportGenerated = ref(false);

// Status class for review section
const statusClass = computed(() => {
  if (!selectedPayroll?.value) return "px-2 py-1 rounded-pill text-xs md:text-sm font-medium bg-secondary text-white";
  return {
    "px-2 py-1 rounded-pill text-xs md:text-sm font-medium": true,
    "bg-success text-white": selectedPayroll.value.status === "Bank Uploaded" || selectedPayroll.value.status === "MD/CEO Approved",
    "bg-warning text-dark": selectedPayroll.value.status === "Not Initiated" || selectedPayroll.value.status === "Initiated" || selectedPayroll.value.status === "Head of HR Reviewed" || selectedPayroll.value.status === "Internal Audit Validated",
    "bg-danger text-white": selectedPayroll.value.status === "Rejected" || selectedPayroll.value.status === "Deactivated",
  };
});

function isActionableStatus(status) {
  return [
    "Not Initiated",
    "Initiated",
    "Head of HR Reviewed",
    "Internal Audit Validated",
    "MD/CEO Approved",
  ].includes(status);
}

function calculateNetSalary(payroll) {
  return payroll.baseSalary - payroll.penalties + payroll.arrears - payroll.loans;
}

function getModalTitle() {
  if (currentRole.value === 'hrAdmin' && selectedPayroll?.value) return "Update Employee Record";
  if (currentRole.value === 'headOfHr' && selectedPayroll?.value) return "Review Payroll";
  if (currentRole.value === 'internalAudit' && selectedPayroll?.value) return "Audit Payroll";
  if (currentRole.value === 'mdCeo' && selectedPayroll?.value) return "CEO Payroll Approval";
  if (currentRole.value === 'accountsManager' && selectedPayroll?.value) return "Bank Upload";
  if (currentRole.value === 'hrAdmin' && selectedPayroll?.value?.status === 'Bank Uploaded') return "Generate Payslips";
  return "Payroll Management";
}

// Handlers
function addPayrollRecord() {
  payrollFormVisible.value = true;
  newPayroll.id = `EMP${Date.now().toString().slice(-5)}`;
  newPayroll.name = "";
  newPayroll.baseSalary = 0;
  newPayroll.penalties = 0;
  newPayroll.arrears = 0;
  newPayroll.loans = 0;
  newPayroll.active = "true";
  newPayroll.status = "Not Initiated";
  newPayroll.comments = "";
}

function cancelPayroll() {
  payrollFormVisible.value = false;
}

function savePayroll() {
  const existingPayroll = payrolls.value.find(p => p.id === newPayroll.id);
  if (existingPayroll) {
    Object.assign(existingPayroll, { ...newPayroll, active: newPayroll.active === "true" });
    if (!existingPayroll.active) existingPayroll.status = "Deactivated";
  } else {
    payrolls.value.push({ ...newPayroll, active: newPayroll.active === "true" });
  }
  payrollFormVisible.value = false;
  alert("Employee record updated!");
}

function selectPayroll(payroll) {
  console.log("Selecting payroll:", payroll); // Debug log to verify the object
  selectedPayroll.value = reactive({ ...payroll }); // Create a reactive copy
  console.log("Selected payroll value before nextTick:", selectedPayroll.value); // Debug log
  nextTick(() => {
    console.log("Selected payroll value after nextTick:", selectedPayroll.value); // Debug log after DOM update
    if (!selectedPayroll.value) {
      console.error("Selected payroll is null or undefined after nextTick");
    }
  }).then(() => {
    showModal.value = true; // Ensure modal opens after DOM update
  });
}

function initiatePayroll(payroll) {
  if (payroll && payroll.status === "Not Initiated" && payroll.active === "true") {
    console.log("Initiating payroll for:", payroll.name, "with status:", payroll.status, "and active:", payroll.active); // Enhanced debug log
    const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
    if (payrollIndex !== -1) {
      payrolls.value[payrollIndex].status = "Initiated";
      payroll.status = "Initiated"; // Sync with the passed payroll object
      notifications.value.push({ message: `Payroll initiated for ${payroll.name} and sent to Head of HR for review.`, timestamp: new Date().toLocaleTimeString() });
      alert("Payroll process initiated and sent to Head of HR!");
    } else {
      console.error("Payroll not found in payrolls array:", payroll.id);
    }
  } else {
    console.warn("Initiation failed: Invalid status or inactive employee. Status:", payroll?.status, "Active:", payroll?.active);
  }
}

function reviewPayroll(payroll) {
  if (payroll && payroll.status === "Initiated") {
    payroll.status = "Head of HR Reviewed";
    notifications.value.push({ message: `Payroll review for ${payroll.name} sent to Internal Audit.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payroll reviewed and sent to Internal Audit!");
  }
}

function rejectPayroll(payroll) {
  if (payroll && payroll.status === "Initiated") {
    payroll.status = "Rejected";
    if (!payroll.comments.trim()) payroll.comments = "Incomplete data.";
    notifications.value.push({ message: `Payroll for ${payroll.name} rejected by Head of HR: "${payroll.comments}".`, timestamp: new Date().toLocaleTimeString() });
    alert(`Payroll rejected: "${payroll.comments}". Returned to HR Payroll Officer.`);
  }
}

function validateAudit(payroll) {
  if (payroll && payroll.status === "Head of HR Reviewed") {
    payroll.status = "Internal Audit Validated";
    notifications.value.push({ message: `Payroll for ${payroll.name} sent to MD/CEO for approval.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payroll validated by Internal Audit!");
  }
}

function declineAudit(payroll) {
  if (payroll && payroll.status === "Head of HR Reviewed") {
    payroll.status = "Rejected";
    if (!payroll.comments.trim()) payroll.comments = "Non-compliant.";
    notifications.value.push({ message: `Payroll for ${payroll.name} declined by Internal Audit: "${payroll.comments}".`, timestamp: new Date().toLocaleTimeString() });
    alert(`Payroll declined: "${payroll.comments}". Returned to Head of HR.`);
  }
}

function approveCeo(payroll) {
  if (payroll && payroll.status === "Internal Audit Validated") {
    payroll.status = "MD/CEO Approved";
    notifications.value.push({ message: `Payroll for ${payroll.name} sent to Accounts Manager.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payroll approved by MD/CEO!");
  }
}

function declineCeo(payroll) {
  if (payroll && payroll.status === "Internal Audit Validated") {
    payroll.status = "Rejected";
    if (!payroll.comments.trim()) payroll.comments = "Approval denied.";
    notifications.value.push({ message: `Payroll for ${payroll.name} declined by MD/CEO: "${payroll.comments}".`, timestamp: new Date().toLocaleTimeString() });
    alert(`Payroll declined: "${payroll.comments}". Returned to Head of HR.`);
  }
}

function uploadToBank(payroll) {
  if (payroll && payroll.status === "MD/CEO Approved") {
    payroll.status = "Bank Uploaded";
    payroll.processedDate = new Date().toLocaleString();
    notifications.value.push({ message: `Payroll for ${payroll.name} uploaded to bank portal.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payroll uploaded to bank portal!");
  }
}

function generatePayslips(payroll) {
  if (payroll && payroll.status === "Bank Uploaded") {
    payroll.status = "Payslips Generated";
    paidPayrolls.value.push({ ...payroll, processedDate: new Date().toLocaleTimeString() });
    notifications.value.push({ message: `Payslips generated and shared for ${payroll.name}.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payslips generated and shared with staff!");
    showModal.value = false;
  }
}

function generateReport() {
  reportGenerated.value = true;
  alert("Periodic payment report generated!");
}

function removeNotification(index) {
  notifications.value.splice(index, 1);
}

// Watch for changes to force update if needed
watch(() => selectedPayroll.value, (newVal) => {
  if (newVal) {
    console.log("Watch triggered with selectedPayroll:", newVal);
  } else {
    console.warn("selectedPayroll is null or undefined");
  }
}, { immediate: true });
</script>

<style scoped>
.text-left {
  margin: 20px;
}

h1 {
  font-family: "Satoshi", sans-serif;
  font-size: 1.5rem;
  color: var(--dark);
}

p {
  font-size: 0.75rem;
  color: var(--info);
}

.info {
  margin: 15px 10px;
}

h2 {
  padding: 10px;
}

.bd {
  background: var(--primary);
  padding: 5px;
  border-radius: 5px;
  margin-left: 20px;
  border: none;
  margin-bottom: 5px;
}

form {
  margin: 15px;
}

.bg-primary {
  background-color: #007bff; /* Bootstrap primary color */
}

.bg-primary-dark {
  background-color: #0056b3; /* Darker shade for hover */
}

.text-primary {
  color: #007bff;
}

.text-dark {
  color: #343a40;
}

.text-muted {
  color: #6c757d;
}

.text-secondary {
  color: #6c757d;
}

@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
  h1 {
    font-size: 1.25rem;
  }
  p {
    font-size: 0.625rem;
  }
  h2 {
    font-size: 1rem;
    padding: 5px;
  }
  .info {
    margin: 10px 5px;
  }
  .bd {
    padding: 3px;
    margin-left: 10px;
    margin-bottom: 3px;
  }
  form {
    margin: 10px;
  }
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  th,
  td {
    padding: 1px;
    font-size: 0.625rem;
  }
  .btn {
    padding: 2px 6px;
    font-size: 0.625rem;
  }
  .modal-content {
    width: 90%;
    margin: 0 auto;
  }
  .modal-body {
    padding: 1rem;
  }
  .modal-header h2 {
    font-size: 1rem;
  }
  .alert {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
}

@media (min-width: 769px) {
  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 0.875rem;
  }
  h2 {
    font-size: 1.25rem;
  }
  .info {
    margin: 20px;
  }
  .bd {
    padding: 8px;
    margin-left: 30px;
    margin-bottom: 8px;
  }
  form {
    margin: 20px;
  }
  th,
  td {
    padding: 4px;
    font-size: 0.875rem;
  }
  .btn {
    padding: 4px 12px;
    font-size: 0.875rem;
  }
  .modal-content {
    width: 70%;
    margin: 0 auto;
  }
  .modal-body {
    padding: 2rem;
  }
  .modal-header h2 {
    font-size: 1.5rem;
  }
  .alert {
    padding: 1rem;
    font-size: 1rem;
  }
}
</style> -->
<template>
  <div class="container mx-auto p-6 space-y-8">
    <!-- Role Switch Dropdown -->
    <div class="text-left mb-4">
      <select v-model="currentRole" class="form-select w-auto" style="max-width: 200px;" @change="logRoleChange">
        <option value="hrAdmin">HR Admin Officer</option>
        <option value="hrPayroll">HR Payroll Officer</option>
        <option value="headOfHr">Head of HR & Admin</option>
        <option value="internalAudit">Internal Audit</option>
        <option value="mdCeo">MD/CEO</option>
        <option value="accountsManager">Accounts Manager</option>
      </select>
    </div>

    <!-- Notifications -->
    <div v-if="notifications.length" class="alert alert-info mb-4" role="alert">
      <ul class="mb-0">
        <li v-for="(notification, index) in notifications" :key="index" class="text-dark">
          {{ notification.message }} <button @click="removeNotification(index)" class="btn btn-sm btn-close ms-2"></button>
        </li>
      </ul>
    </div>

    <!-- Payroll Status -->
    <div v-if="currentRole !== 'mdCeo' && selectedPayroll && payrolls.length" class="bg-light p-3 rounded mb-4">
      <h3 class="h5 text-primary mb-2">Payroll Status</h3>
      <div class="d-flex align-items-center gap-2">
        <span :class="statusClass">{{ selectedPayroll.status }}</span>
        <p v-if="selectedPayroll.comments" class="text-muted mb-0">"{{ selectedPayroll.comments }}"</p>
      </div>
      <svg v-if="selectedPayroll.comments" class="text-warning ms-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
      </svg>
    </div>

    <div class="text-left">
      <h1 class="text-4xl font-bold text-primary">Payroll Management</h1>
      <p class="text-muted mt-2">Manage payroll processes and employee payments below.</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Current Payroll Records</h2>
      <table class="table-auto w-full border-collapse text-left" v-if="payrolls.length">
        <thead>
          <tr class="bg-light text-primary">
            <th class="px-4 py-3 border-b font-semibold">Employee ID</th>
            <th class="px-4 py-3 border-b font-semibold">Name</th>
            <th class="px-4 py-3 border-b font-semibold">Base Salary</th>
            <th class="px-4 py-3 border-b font-semibold">Penalties</th>
            <th class="px-4 py-3 border-b font-semibold">Arrears</th>
            <th class="px-4 py-3 border-b font-semibold">Loans</th>
            <th class="px-4 py-3 border-b font-semibold">Status</th>
            <th class="px-4 py-3 border-b font-semibold">Action</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="payroll in payrolls" :key="payroll.id" class="hover:bg-gray-100">
            <td class="px-4 py-3 border-b text-dark">{{ payroll.id }}</td>
            <td class="px-4 py-3 border-b text-dark">{{ payroll.name }}</td>
            <td class="px-4 py-3 border-b text-dark">${{ payroll.baseSalary.toLocaleString() }}</td>
            <td class="px-4 py-3 border-b text-dark">${{ payroll.penalties.toLocaleString() }}</td>
            <td class="px-4 py-3 border-b text-dark">${{ payroll.arrears.toLocaleString() }}</td>
            <td class="px-4 py-3 border-b text-dark">${{ payroll.loans.toLocaleString() }}</td>
            <td class="px-4 py-3 border-b text-dark">{{ payroll.status }}</td>
            <td class="px-4 py-3 border-b">
              <!-- HR Payroll Officer initiate payroll button -->
              <button v-if="currentRole === 'hrPayroll' && payroll.status.trim().toLowerCase() === 'not initiated' && payroll.active === 'true'" @click="initiatePayroll(payroll)" class="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark">
                Initiate Payroll
              </button>
              <!-- Manage button for other cases -->
              <button v-if="currentRole === 'hrAdmin' || (currentRole !== 'hrPayroll' && isActionableStatus(payroll.status))" @click="selectPayroll(payroll)" class="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark">
                Manage
              </button>
            </td>

          </tr>
        </tbody>
      </table>
      <p v-if="!payrolls.length" class="text-muted">No payroll records available. Add a record to begin.</p>
      <div class="flex justify-end mt-4">
        <button v-if="currentRole === 'hrAdmin'" @click="addPayrollRecord" class="px-6 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm transition duration-200 bd">
          Add Payroll Record
        </button>
      </div>
    </div>

    <!-- Payroll Form -->
    <div v-if="payrollFormVisible" class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Add/Update Employee Record</h2>
      <form @submit.prevent="savePayroll" class="mb-4">
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label for="employeeId" class="form-label text-muted">Employee ID</label>
            <input type="text" id="employeeId" v-model="newPayroll.id" class="form-control" required />
          </div>
          <div class="col-12 col-md-6">
            <label for="name" class="form-label text-muted">Name</label>
            <input type="text" id="name" v-model="newPayroll.name" class="form-control" required />
          </div>
          <div class="col-12 col-md-6">
            <label for="baseSalary" class="form-label text-muted">Base Salary ($)</label>
            <input type="number" id="baseSalary" v-model.number="newPayroll.baseSalary" class="form-control" required step="0.01" min="0" />
          </div>
          <div class="col-12 col-md-6">
            <label for="penalties" class="form-label text-muted">Penalties ($)</label>
            <input type="number" id="penalties" v-model.number="newPayroll.penalties" class="form-control" step="0.01" min="0" />
          </div>
          <div class="col-12 col-md-6">
            <label for="arrears" class="form-label text-muted">Arrears ($)</label>
            <input type="number" id="arrears" v-model.number="newPayroll.arrears" class="form-control" step="0.01" min="0" />
          </div>
          <div class="col-12 col-md-6">
            <label for="loans" class="form-label text-muted">Loans ($)</label>
            <input type="number" id="loans" v-model.number="newPayroll.loans" class="form-control" step="0.01" min="0" />
          </div>
          <div class="col-12">
            <label class="form-label text-muted">Active</label>
            <select v-model="newPayroll.active" class="form-select">
              <option value="true">Yes</option>
              <option value="false">No (Suspended/Terminated)</option>
            </select>
          </div>
        </div>
        <div class="d-flex justify-content-end gap-3 mt-4">
          <button type="button" @click="cancelPayroll" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>

    <!-- Review Modal -->
    <div v-if="showModal" class="modal d-block" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title text-primary">{{ getModalTitle() }}</h2>
            <button type="button" @click="showModal = false" class="btn-close" aria-label="Close"></button>
          </div>

          <div class="modal-body p-4">
            <!-- HR Admin Update Section -->
            <div v-if="currentRole === 'hrAdmin' && selectedPayroll">
              <h3 class="h5 text-dark mb-3">Update Employee Record</h3>
              <form @submit.prevent="savePayroll" class="mb-4">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label for="employeeId" class="form-label text-muted">Employee ID</label>
                    <input type="text" id="employeeId" v-model="selectedPayroll.id" class="form-control" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="name" class="form-label text-muted">Name</label>
                    <input type="text" id="name" v-model="selectedPayroll.name" class="form-control" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="baseSalary" class="form-label text-muted">Base Salary ($)</label>
                    <input type="number" id="baseSalary" v-model.number="selectedPayroll.baseSalary" class="form-control" required step="0.01" min="0" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="penalties" class="form-label text-muted">Penalties ($)</label>
                    <input type="number" id="penalties" v-model.number="selectedPayroll.penalties" class="form-control" step="0.01" min="0" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="arrears" class="form-label text-muted">Arrears ($)</label>
                    <input type="number" id="arrears" v-model.number="selectedPayroll.arrears" class="form-control" step="0.01" min="0" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="loans" class="form-label text-muted">Loans ($)</label>
                    <input type="number" id="loans" v-model.number="selectedPayroll.loans" class="form-control" step="0.01" min="0" />
                  </div>
                  <div class="col-12">
                    <label class="form-label text-muted">Active</label>
                    <select v-model="selectedPayroll.active" class="form-select">
                      <option value="true">Yes</option>
                      <option value="false">No (Suspended/Terminated)</option>
                    </select>
                  </div>
                </div>
                <div class="d-flex justify-content-end gap-3 mt-4">
                  <button type="button" @click="showModal = false" class="btn btn-secondary">Cancel</button>
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>

            <!-- Review Section for Other Roles (excluding HR Payroll Officer initiation) -->
            <div v-if="currentRole !== 'hrAdmin' && currentRole !== 'hrPayroll' && selectedPayroll && selectedPayroll.active === 'true'">
              <h3 class="h5 text-dark mb-3">Review Payroll Details</h3>
              <div class="row g-3 mb-4">
                <div class="col-12">
                  <table class="table table-bordered">
                    <thead>
                      <tr class="bg-light">
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Employee ID</td>
                        <td>{{ selectedPayroll.id }}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{{ selectedPayroll.name }}</td>
                      </tr>
                      <tr>
                        <td>Base Salary</td>
                        <td>${{ selectedPayroll.baseSalary.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Penalties</td>
                        <td>${{ selectedPayroll.penalties.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Arrears</td>
                        <td>${{ selectedPayroll.arrears.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Loans</td>
                        <td>${{ selectedPayroll.loans.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Net Salary</td>
                        <td>${{ calculateNetSalary(selectedPayroll).toLocaleString() }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <section class="mb-4">
                <h3 class="h5 text-dark mb-3">Review and Approval Status</h3>
                <div class="bg-light p-3 rounded d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center gap-2">
                    <span :class="statusClass">{{ selectedPayroll.status }}</span>
                    <p v-if="selectedPayroll.comments" class="text-muted mb-0">"{{ selectedPayroll.comments }}"</p>
                  </div>
                  <svg v-if="selectedPayroll.comments" class="text-warning" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
                  </svg>
                </div>
              </section>

              <div class="d-flex justify-content-end gap-3">
                <!-- Head of HR Controls -->
                <button v-if="currentRole === 'headOfHr' && selectedPayroll.status === 'Initiated'" type="button" @click="reviewPayroll(selectedPayroll)" class="btn btn-success">Validate</button>
                <button v-if="currentRole === 'headOfHr' && selectedPayroll.status === 'Initiated'" type="button" @click="rejectPayroll(selectedPayroll)" class="btn btn-danger">Request Rework</button>
                <input v-if="currentRole === 'headOfHr' && selectedPayroll.status === 'Initiated'" v-model="selectedPayroll.comments" type="text" class="form-control w-50" placeholder="Comments" />

                <!-- Internal Audit Controls with Summary and Comments -->
                <div v-if="currentRole === 'internalAudit' && selectedPayroll.status === 'Head of HR Reviewed'">
                  <h4 class="h6 text-dark mb-2">Audit Payroll Summary Report</h4>
                  <table class="table table-bordered mb-3">
                    <tbody>
                      <tr>
                        <td>Employee ID</td>
                        <td>{{ selectedPayroll.id }}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{{ selectedPayroll.name }}</td>
                      </tr>
                      <tr>
                        <td>Base Salary</td>
                        <td>${{ selectedPayroll.baseSalary.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Penalties</td>
                        <td>${{ selectedPayroll.penalties.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Arrears</td>
                        <td>${{ selectedPayroll.arrears.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Loans</td>
                        <td>${{ selectedPayroll.loans.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Net Salary</td>
                        <td>${{ calculateNetSalary(selectedPayroll).toLocaleString() }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex gap-3 align-items-center mb-3">
                    <button type="button" @click="validateAudit(selectedPayroll)" class="btn btn-success">Validate</button>
                    <button type="button" @click="declineAudit(selectedPayroll)" class="btn btn-danger">Decline</button>
                    <input v-model="selectedPayroll.comments" type="text" class="form-control w-50" placeholder="Add audit comments" />
                  </div>
                </div>

                <!-- MD/CEO Controls with Summary and Comments -->
                <div v-if="currentRole === 'mdCeo' && selectedPayroll.status === 'Internal Audit Validated'">
                  <h4 class="h6 text-dark mb-2">CEO Payroll Review Summary</h4>
                  <table class="table table-bordered mb-3">
                    <tbody>
                      <tr>
                        <td>Employee ID</td>
                        <td>{{ selectedPayroll.id }}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{{ selectedPayroll.name }}</td>
                      </tr>
                      <tr>
                        <td>Base Salary</td>
                        <td>${{ selectedPayroll.baseSalary.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Penalties</td>
                        <td>${{ selectedPayroll.penalties.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Arrears</td>
                        <td>${{ selectedPayroll.arrears.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Loans</td>
                        <td>${{ selectedPayroll.loans.toLocaleString() }}</td>
                      </tr>
                      <tr>
                        <td>Net Salary</td>
                        <td>${{ calculateNetSalary(selectedPayroll).toLocaleString() }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex gap-3 align-items-center mb-3">
                    <button type="button" @click="approveCeo(selectedPayroll)" class="btn btn-success">Approve</button>
                    <button type="button" @click="declineCeo(selectedPayroll)" class="btn btn-danger">Decline</button>
                    <input v-model="selectedPayroll.comments" type="text" class="form-control w-50" placeholder="Add CEO comments" />
                  </div>
                </div>

                <!-- Accounts Manager Controls with Upload -->
                <div v-if="currentRole === 'accountsManager' && selectedPayroll.status === 'MD/CEO Approved'">
                  <h4 class="h6 text-dark mb-2">Finance Payment Schedule</h4>
                  <table class="table table-bordered mb-3">
                    <tbody>
                      <tr>
                        <td>Employee ID</td>
                        <td>{{ selectedPayroll.id }}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{{ selectedPayroll.name }}</td>
                      </tr>
                      <tr>
                        <td>Net Salary</td>
                        <td>${{ calculateNetSalary(selectedPayroll).toLocaleString() }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="button" @click="uploadToBank(selectedPayroll)" class="btn btn-primary">Upload Schedule to Bank Portal</button>
                </div>

                <button type="button" @click="showModal = false" class="btn btn-secondary">Cancel</button>
              </div>
            </div>

            <!-- HR Admin Payslip Generation -->
            <div v-if="currentRole === 'hrAdmin' && selectedPayroll && selectedPayroll.status === 'Bank Uploaded'">
              <h3 class="h5 text-dark mb-3">Generate Payslips</h3>
              <button @click="generatePayslips(selectedPayroll)" class="btn btn-success">Generate and Share Payslips</button>
              <button type="button" @click="showModal = false" class="btn btn-secondary ms-2">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MD/CEO Report Section -->
    <div v-if="currentRole === 'mdCeo'" class="bg-white rounded-lg shadow-lg p-6 info">
      <h2 class="text-xl font-semibold text-dark mb-4">Periodic Payment Report</h2>
      <button @click="generateReport" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-sm transition duration-200 bd">
        Generate Report
      </button>
      <div v-if="reportGenerated" class="mt-4">
        <h4 class="text-dark">Payment Report (As of {{ currentDate }})</h4>
        <table class="table table-bordered mt-2">
          <thead>
            <tr class="bg-light">
              <th>Employee ID</th>
              <th>Name</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Date Processed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payroll in paidPayrolls" :key="payroll.id">
              <td>{{ payroll.id }}</td>
              <td>{{ payroll.name }}</td>
              <td>${{ calculateNetSalary(payroll).toLocaleString() }}</td>
              <td>{{ payroll.status }}</td>
              <td>{{ payroll.processedDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, nextTick } from "vue";

// Reactive state
const currentRole = ref("hrAdmin");
const showModal = ref(false);
const payrollFormVisible = ref(false);
const notifications = ref([]);
const currentDate = new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });

// Initial payroll data (empty to start dynamically)
const payrolls = ref([]);

const newPayroll = reactive({
  id: "",
  name: "",
  baseSalary: 0,
  penalties: 0,
  arrears: 0,
  loans: 0,
  active: "true", // Default to string "true"
  status: "Not Initiated", // Initial status set here
  comments: "",
  processedDate: null,
});
const selectedPayroll = ref(null);
const paidPayrolls = ref([]);
const reportGenerated = ref(false);

// Status class for review section
const statusClass = computed(() => {
  if (!selectedPayroll?.value) return "px-3 py-1 rounded-pill text-sm font-medium bg-secondary text-white";
  return {
    "px-3 py-1 rounded-pill text-sm font-medium": true,
    "bg-success text-white": selectedPayroll.value.status === "Bank Uploaded" || selectedPayroll.value.status === "MD/CEO Approved",
    "bg-warning text-dark": selectedPayroll.value.status === "Not Initiated" || selectedPayroll.value.status === "Initiated" || selectedPayroll.value.status === "Head of HR Reviewed" || selectedPayroll.value.status === "Internal Audit Validated",
    "bg-danger text-white": selectedPayroll.value.status === "Rejected" || selectedPayroll.value.status === "Deactivated",
  };
});

function isActionableStatus(status) {
  return [
    "Initiated",
    "Head of HR Reviewed",
    "Internal Audit Validated",
    "MD/CEO Approved",
  ].includes(status);
}

function calculateNetSalary(payroll) {
  return payroll.baseSalary - payroll.penalties + payroll.arrears - payroll.loans;
}

function getModalTitle() {
  if (currentRole.value === 'hrAdmin' && selectedPayroll) return "Update Employee Record";
  if (currentRole.value === 'headOfHr' && selectedPayroll) return "Review Payroll";
  if (currentRole.value === 'internalAudit' && selectedPayroll) return "Audit Payroll";
  if (currentRole.value === 'mdCeo' && selectedPayroll) return "CEO Payroll Approval";
  if (currentRole.value === 'accountsManager' && selectedPayroll) return "Finance Payment Upload";
  if (currentRole.value === 'hrAdmin' && selectedPayroll?.status === 'Bank Uploaded') return "Generate Payslips";
  return "Payroll Management";
}

// Handlers
function logRoleChange() {
  console.log("Role changed to:", currentRole.value);
  console.log("Payrolls:", payrolls.value);
}

function addPayrollRecord() {
  payrollFormVisible.value = true;
  newPayroll.id = `EMP${Date.now().toString().slice(-5)}`;
  newPayroll.name = "";
  newPayroll.baseSalary = 0;
  newPayroll.penalties = 0;
  newPayroll.arrears = 0;
  newPayroll.loans = 0;
  newPayroll.active = "true"; // Ensure active is string "true"
  newPayroll.status = "Not Initiated"; // Explicitly set initial status
  newPayroll.comments = "";
}

function cancelPayroll() {
  payrollFormVisible.value = false;
}

function savePayroll() {
  const existingPayrollIndex = payrolls.value.findIndex(p => p.id === newPayroll.id);
  if (existingPayrollIndex !== -1) {
    payrolls.value[existingPayrollIndex] = { ...newPayroll, active: newPayroll.active === "true" ? "true" : "false" }; // Ensure string values
    if (payrolls.value[existingPayrollIndex].active === "false") payrolls.value[existingPayrollIndex].status = "Deactivated";
  } else {
    payrolls.value.push({ ...newPayroll, active: newPayroll.active === "true" ? "true" : "false" }); // Ensure string values
  }
  payrollFormVisible.value = false;
  showModal.value = false;
  nextTick(() => {
    console.log("Payroll saved, updated payrolls after nextTick:", payrolls.value);
  });
  alert("Employee record added/updated!");
}

function selectPayroll(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  selectedPayroll.value = { ...payrolls.value[payrollIndex] }; // Use a copy to avoid direct mutation issues
  showModal.value = true;
}

function removeNotification(index) {
  notifications.value.splice(index, 1);
}

function initiatePayroll(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex]) {
    const currentStatus = payrolls.value[payrollIndex].status.trim().toLowerCase();
    const isNotInitiated = currentStatus === "not initiated";
    const isActive = payrolls.value[payrollIndex].active === "true";
    if (isNotInitiated && isActive) {
      payrolls.value[payrollIndex].status = "Initiated";
      payrolls.value[payrollIndex].comments = ""; // Reset comments when initiating directly
      notifications.value.push({ 
        message: `Payroll initiated for ${payrolls.value[payrollIndex].name} by HR Payroll Officer and sent to Head of HR for review.`,
        timestamp: new Date().toLocaleTimeString() 
      });
      alert("Payroll initiated and sent to Head of HR for review!");
      console.log("Payroll initiated, updated payrolls:", payrolls.value);
    } else {
      console.log("Initiate Payroll failed:", { status: payrolls.value[payrollIndex].status, active: payrolls.value[payrollIndex].active, currentStatus, isNotInitiated, isActive, payrollIndex });
    }
  }
}

function reviewPayroll(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex] && payrolls.value[payrollIndex].status === "Initiated") {
    payrolls.value[payrollIndex].status = "Head of HR Reviewed";
    notifications.value.push({ message: `Payroll review for ${payrolls.value[payrollIndex].name} sent to Internal Audit.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payroll reviewed and sent to Internal Audit!");
    showModal.value = false;
    console.log("Payroll reviewed, updated payrolls:", payrolls.value);
  }
}

function rejectPayroll(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex] && payrolls.value[payrollIndex].status === "Initiated") {
    payrolls.value[payrollIndex].status = "Rejected";
    if (!payrolls.value[payrollIndex].comments.trim()) payrolls.value[payrollIndex].comments = "Incomplete data.";
    notifications.value.push({ message: `Payroll for ${payrolls.value[payrollIndex].name} rejected by Head of HR: "${payrolls.value[payrollIndex].comments}".`, timestamp: new Date().toLocaleTimeString() });
    alert(`Payroll rejected: "${payrolls.value[payrollIndex].comments}". Returned to HR Payroll Officer.`);
    showModal.value = false;
    console.log("Payroll rejected, updated payrolls:", payrolls.value);
  }
}

function validateAudit(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex] && payrolls.value[payrollIndex].status === "Head of HR Reviewed") {
    payrolls.value[payrollIndex].status = "Internal Audit Validated";
    if (!payrolls.value[payrollIndex].comments.trim()) payrolls.value[payrollIndex].comments = "Validated by Internal Audit with no additional comments.";
    notifications.value.push({ message: `Payroll for ${payrolls.value[payrollIndex].name} validated by Internal Audit${payrolls.value[payrollIndex].comments ? `: "${payrolls.value[payrollIndex].comments}"` : '.'}, sent to MD/CEO for review.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payroll validated and sent to MD/CEO for review!");
    showModal.value = false;
    console.log("Payroll validated, updated payrolls:", payrolls.value);
  }
}

function declineAudit(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex] && payrolls.value[payrollIndex].status === "Head of HR Reviewed") {
    payrolls.value[payrollIndex].status = "Head of HR Reviewed"; // Return to Head of HR for rework
    if (!payrolls.value[payrollIndex].comments.trim()) payrolls.value[payrollIndex].comments = "Declined by Internal Audit with no comments.";
    notifications.value.push({ message: `Payroll for ${payrolls.value[payrollIndex].name} declined by Internal Audit: "${payrolls.value[payrollIndex].comments}". Returned to Head of HR & Admin for rework.`, timestamp: new Date().toLocaleTimeString() });
    alert(`Payroll declined: "${payrolls.value[payrollIndex].comments}". Returned to Head of HR & Admin for rework.`);
    showModal.value = false;
    console.log("Payroll declined, updated payrolls:", payrolls.value);
  }
}

function approveCeo(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex] && payrolls.value[payrollIndex].status === "Internal Audit Validated") {
    payrolls.value[payrollIndex].status = "MD/CEO Approved";
    if (!payrolls.value[payrollIndex].comments.trim()) payrolls.value[payrollIndex].comments = "Approved by MD/CEO with no additional comments.";
    notifications.value.push({ message: `Payroll for ${payrolls.value[payrollIndex].name} approved by MD/CEO${payrolls.value[payrollIndex].comments ? `: "${payrolls.value[payrollIndex].comments}"` : '.'}, sent to Accounts Manager for payment.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payroll approved and sent to Accounts Manager for payment!");
    showModal.value = false;
    console.log("Payroll approved, updated payrolls:", payrolls.value);
  }
}

function declineCeo(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex] && payrolls.value[payrollIndex].status === "Internal Audit Validated") {
    payrolls.value[payrollIndex].status = "Head of HR Reviewed"; // Return to Head of HR for rework
    if (!payrolls.value[payrollIndex].comments.trim()) payrolls.value[payrollIndex].comments = "Declined by MD/CEO with no comments.";
    notifications.value.push({ message: `Payroll for ${payrolls.value[payrollIndex].name} declined by MD/CEO: "${payrolls.value[payrollIndex].comments}". Returned to Head of HR & Admin for rework.`, timestamp: new Date().toLocaleTimeString() });
    alert(`Payroll declined: "${payrolls.value[payrollIndex].comments}". Returned to Head of HR & Admin for rework.`);
    showModal.value = false;
    console.log("Payroll declined, updated payrolls:", payrolls.value);
  }
}

function uploadToBank(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex] && payrolls.value[payrollIndex].status === "MD/CEO Approved") {
    payrolls.value[payrollIndex].status = "Bank Uploaded"; // Status updated after upload for final approval
    payrolls.value[payrollIndex].processedDate = new Date().toLocaleString();
    payrolls.value[payrollIndex].comments = "Schedule uploaded to bank portal for final approval."; // Default comment for upload
    notifications.value.push({ 
      message: `Payroll schedule for ${payrolls.value[payrollIndex].name} uploaded to bank portal by Accounts Manager for final approval.`,
      timestamp: new Date().toLocaleTimeString() 
    });
    alert("Payroll schedule uploaded to bank portal for final approval!");
    showModal.value = false;
    console.log("Payroll uploaded, updated payrolls:", payrolls.value);
  } else {
    console.log("Upload to Bank failed:", { status: payrolls.value[payrollIndex]?.status });
  }
}

function generatePayslips(payroll) {
  const payrollIndex = payrolls.value.findIndex(p => p.id === payroll.id);
  if (payrolls.value[payrollIndex] && payrolls.value[payrollIndex].status === "Bank Uploaded") {
    payrolls.value[payrollIndex].status = "Payslips Generated";
    paidPayrolls.value.push({ ...payrolls.value[payrollIndex], processedDate: new Date().toLocaleString() });
    notifications.value.push({ message: `Payslips generated and shared for ${payrolls.value[payrollIndex].name}.`, timestamp: new Date().toLocaleTimeString() });
    alert("Payslips generated and shared with staff!");
    showModal.value = false;
    console.log("Payslips generated, updated payrolls:", payrolls.value);
  }
}

function generateReport() {
  reportGenerated.value = true;
  alert("Periodic payment report generated!");
}

// Watch for changes in payrolls to ensure reactivity
watch(payrolls, (newPayrolls) => {
  console.log("Payrolls updated:", newPayrolls);
}, { deep: true });
</script>

<style scoped>
.text-left {
  margin: 20px;
}

h1 {
  font-family: "Satoshi", sans-serif;
  font-size: 30px;
  color: var(--dark);
}

p {
  font-size: 16px;
  color: var(--info);
}

.info {
  margin: 30px 20px;
}

h2 {
  padding: 20px;
}

.bd {
  background: var(--primary);
  padding: 10px;
  border-radius: 5px;
  margin-left: 40px;
  border: none;
  margin-bottom: 10px;
}

form {
  margin: 30px;
}

.bg-primary {
  background-color: #007bff;
}

.bg-primary-dark {
  background-color: #0056b3;
}

.text-primary {
  color: #007bff;
}

.text-dark {
  color: #343a40;
}

.text-muted {
  color: #6c757d;
}

.text-secondary {
  color: #6c757d;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
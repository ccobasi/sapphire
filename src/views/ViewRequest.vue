<template>
  <div class="hiring-request-quarter p-4">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Hiring Requests by Quarter</h2>

    <div class="mb-6">
      <label for="quarterSelect" class="block text-sm font-medium text-gray-700 mb-2">Select Quarter <span class="text-red-500">*</span></label>
      <select
        id="quarterSelect"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        v-model="selectedQuarter"
        required
        @change="filterRequestsByQuarter"
      >
        <option value="" disabled>Select Quarter</option>
        <option value="Q1 2025">Q1 2025</option>
        <option value="Q2 2025">Q2 2025</option>
        <option value="Q3 2025">Q3 2025</option>
        <option value="Q4 2025">Q4 2025</option>
      </select>
    </div>

    <div v-if="filteredRequests.length" class="mt-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Hiring Requests for {{ selectedQuarter }}</h3>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Job Title</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Vacancies</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in filteredRequests" :key="index" class="border-t">
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.jobTitle }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.department }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.vacancies }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ request.status }}</td>
            <td class="px-4 py-2">
              <button
                class="btn btn-sm btn-outline-primary rounded-lg"
                @click="viewJobDetails(request)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-gray-500 mt-4">No hiring requests found for the selected quarter.</p>

    <!-- Modal for Job Details -->
    <div
      class="modal fade"
      id="jobDetailsModal"
      tabindex="-1"
      aria-labelledby="jobDetailsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-bottom border-gray-200">
            <h5 class="modal-title" id="jobDetailsModalLabel">Job Profile Details</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div v-if="selectedJobDetails" class="space-y-4">
              <p><strong class="text-gray-700">Job Title:</strong> {{ selectedJobDetails.jobTitle }}</p>
              <p><strong class="text-gray-700">Job Code:</strong> {{ selectedJobDetails.jobCode }}</p>
              <p><strong class="text-gray-700">Alternative Title:</strong> {{ selectedJobDetails.altTitle }}</p>
              <p><strong class="text-gray-700">Job Function:</strong> {{ selectedJobDetails.jobFunction }}</p>
              <p><strong class="text-gray-700">Job Family:</strong> {{ selectedJobDetails.jobFamily }}</p>
              <p><strong class="text-gray-700">Reports To:</strong> {{ selectedJobDetails.reportsTo }}</p>
              <p><strong class="text-gray-700">Career Type:</strong> {{ selectedJobDetails.careerType }}</p>
              <p><strong class="text-gray-700">Level of Work:</strong> {{ selectedJobDetails.levelOfWork }}</p>
              <p><strong class="text-gray-700">Job Purpose:</strong> {{ selectedJobDetails.jobPurpose }}</p>
              <p><strong class="text-gray-700">Job Criticality:</strong> {{ selectedJobDetails.jobCriticality }}</p>
              <h4 class="text-md font-semibold mt-4">Key Responsibilities</h4>
              <ul class="list-disc pl-5">
                <li v-for="(resp, index) in selectedJobDetails.responsibilities" :key="index">
                  {{ resp.outputGroup }}: {{ resp.outputsAndMeasures }}
                </li>
              </ul>
              <h4 class="text-md font-semibold mt-4">Qualifications</h4>
              <p><strong>Minimum 1:</strong> {{ selectedJobDetails.qualifications.min1 }}</p>
              <p><strong>Minimum 2:</strong> {{ selectedJobDetails.qualifications.min2 }}</p>
              <p><strong>Preferred 1:</strong> {{ selectedJobDetails.qualifications.pref1 }}</p>
              <p><strong>Preferred 2:</strong> {{ selectedJobDetails.qualifications.pref2 }}</p>
              <h4 class="text-md font-semibold mt-4">Experiences</h4>
              <ul class="list-disc pl-5">
                <li v-for="(exp, index) in selectedJobDetails.experiences" :key="index">
                  {{ exp.jobFunction }} - {{ exp.jobFamily }} ({{ exp.years }} years): {{ exp.description }}
                </li>
              </ul>
              <h4 class="text-md font-semibold mt-4">Competencies</h4>
              <div class="ml-4">
                <p><strong>Behavioral:</strong></p>
                <ul class="list-disc pl-5">
                  <li v-for="(beh, index) in selectedJobDetails.competencies.behavioural" :key="'beh' + index">
                    {{ beh.label }}: {{ beh.description }}
                  </li>
                </ul>
                <p><strong>Technical:</strong></p>
                <ul class="list-disc pl-5">
                  <li v-for="(tech, index) in selectedJobDetails.competencies.technical" :key="'tech' + index">
                    {{ tech.label }}: {{ tech.description }} (Level: {{ tech.level }})
                  </li>
                </ul>
                <p v-if="selectedJobDetails.competencies.leadership.length"><strong>Leadership:</strong></p>
                <ul class="list-disc pl-5" v-if="selectedJobDetails.competencies.leadership.length">
                  <li v-for="(lead, index) in selectedJobDetails.competencies.leadership" :key="'lead' + index">
                    {{ lead.label }}: {{ lead.description }} (Level: {{ lead.levelDescription }})
                  </li>
                </ul>
              </div>
              <h4 class="text-md font-semibold mt-4">Additional Job Dimensions</h4>
              <p><strong>Direct Reports:</strong></p>
              <ul class="list-disc pl-5">
                <li v-for="(direct, index) in selectedJobDetails.directReports" :key="'direct' + index">
                  {{ direct.title }} ({{ direct.number }})
                </li>
              </ul>
              <p><strong>Indirect Reports:</strong></p>
              <ul class="list-disc pl-5">
                <li v-for="(indirect, index) in selectedJobDetails.indirectReports" :key="'indirect' + index">
                  {{ indirect.family }} ({{ indirect.number }})
                </li>
              </ul>
            </div>
            <p v-else class="text-gray-500">No job details available.</p>
          </div>
          <div class="modal-footer border-top border-gray-200">
            <button
              type="button"
              class="btn btn-secondary rounded-lg px-4 py-2"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { Modal } from 'bootstrap';
import { authStore } from "../store/store";

const store = authStore();

const jobProfiles = ref([
  {
    jobTitle: 'Senior',
    jobCode: 'FIN-001',
    altTitle: 'Finance Manager',
    jobFunction: 'Finance',
    levelOfWork: 'Senior',
    jobPurpose: 'Manage financial operations.',
    jobCriticality: 'High',
    responsibilities: [
      { outputGroup: 'Budget Planning', outputsAndMeasures: 'Complete quarterly budgets on time' },
      { outputGroup: 'Financial Reporting', outputsAndMeasures: 'Submit monthly reports with 98% accuracy' },
      { outputGroup: 'Audit Coordination', outputsAndMeasures: 'Facilitate annual audits successfully' },
      { outputGroup: '', outputsAndMeasures: '' },
    ],
    qualifications: {
      min1: 'CPA Certification',
      min2: 'Bachelor’s in Finance',
      pref1: 'MBA in Finance',
      pref2: '5+ years managerial experience',
    },
    experiences: [
      { jobFunction: 'Finance', jobFamily: 'Accounting', years: '5', description: 'Financial analysis and reporting' },
      { jobFunction: '', jobFamily: '', years: '', description: '' },
      { jobFunction: '', jobFamily: '', years: '', description: '' },
    ],
    competencies: {
      behavioural: [
        { label: 'Leadership', description: 'Leads teams effectively' },
        { label: 'Communication', description: 'Clear and concise communication' },
        { label: 'Problem Solving', description: 'Resolves complex financial issues' },
        { label: '', description: '' },
      ],
      technical: [
        { label: 'Financial Analysis', description: 'Proficient in financial modeling', level: 'Advanced' },
        { label: 'Accounting Software', description: 'Expert in QuickBooks', level: 'Intermediate' },
        { label: '', description: '', level: '' },
      ],
      leadership: [
        { label: 'Strategic Planning', description: 'Develops long-term strategies', levelDescription: 'High proficiency' },
        { label: 'Team Management', description: 'Manages large teams effectively', levelDescription: 'Expert' },
      ],
    },
    directReports: [{ title: 'Junior Accountant', number: '2' }, { title: 'Finance Analyst', number: '1' }],
    indirectReports: [{ family: 'Audit', number: '3' }, { family: 'Tax', number: '2' }, { family: '', number: '' }],
    reportsTo: 'CFO',
    careerType: 'Permanent',
  },
]);

const hiringRequests = ref([
  {
    jobTitle: 'Senior',
    department: 'Finance',
    vacancies: 2,
    quarter: 'Q1 2025',
    justification: 'Need additional staff to handle increased workload.',
    status: 'Pending',
  },
]);

const selectedQuarter = ref('');
const selectedJobDetails = ref(null);

const filteredRequests = computed(() => {
  return hiringRequests.value.filter(request => request.quarter === selectedQuarter.value);
});

const filterRequestsByQuarter = () => {

};

const viewJobDetails = (request) => {
  const profile = jobProfiles.value.find(p => p.jobTitle === request.jobTitle);
  selectedJobDetails.value = profile;
  const modalElement = document.getElementById('jobDetailsModal');
  const modal = new Modal(modalElement);
  modal.show();
};

onMounted(() => {
    store.currentpage = 'view-request';
    store.showSidebar = false;
});
</script>

<style scoped>
.hiring-request-quarter {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
}

.text-2xl {
  font-family: 'Satoshi', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
}

.form-label {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

.form-select,
.form-control,
textarea {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
}

.form-select:focus,
.form-control:focus,
textarea:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
}

.text-red-500 {
  color: #e53e3e;
}

.btn-outline-primary {
  color: #3182ce;
  border-color: #3182ce;
  font-family: 'Satoshi', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
}

.btn-outline-primary:hover {
  background-color: #3182ce;
  color: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.5;
  text-align: left;
  padding: 12px 16px;
  background-color: #edf2f7;
  border-bottom: 2px solid #e2e8f0;
}

tbody td {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-content {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header,
.modal-footer {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-family: 'Satoshi', sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: #333333;
}

.text-gray-800,
.text-gray-700 {
  font-family: 'Satoshi', sans-serif;
}

.text-lg {
  font-size: 1.125rem;
  font-weight: 600;
}

@media (max-width: 600px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin-bottom: 15px;
  }

  td {
    border: none;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label);
    font-weight: bold;
    color: #4a5568;
  }

  .btn-outline-primary {
    display: block;
    margin: 5px 0;
  }
}
</style>
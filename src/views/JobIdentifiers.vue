<template>
  <div class="job-profile p-4">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Job Profile</h2>

    <button
      class="add-profile-btn"
      @click="openModal"
      data-bs-toggle="modal"
      data-bs-target="#addJobProfileModal"
    >
      Add Profile
    </button>

    <div class="profile-list mt-6 overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Job Title</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Job Code</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Alternative Title</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(identifier, index) in identifiers" :key="index" class="border-t">
            <td class="px-4 py-2 text-sm text-gray-800">{{ identifier.jobTitle }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ identifier.jobCode }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ identifier.altTitle }}</td>
            <td class="px-4 py-2">
              <button
                class="btn btn-sm btn-outline-primary me-2 edit-btn"
                @click="editIdentifier(index)"
              >
                Edit
              </button>
              <button
                class="btn btn-sm btn-outline-danger delete-btn"
                @click="deleteIdentifier(index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="addJobProfileModal"
      tabindex="-1"
      aria-labelledby="addJobProfileModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-bottom border-gray-200">
            <h5 class="modal-title" id="addJobProfileModalLabel">
              {{ jobIdentifier.index === -1 ? "Add Job Profile" : "Edit Job Profile" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetForm"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div class="step-navigation mb-4">
              <button
                v-for="s in totalSteps"
                :key="s"
                @click="step = s"
                :class="{ 'active': step === s }"
                class="px-3 py-1 mr-2 border rounded"
              >
                Step {{ s }}
              </button>
            </div>
            <form @submit.prevent="submitForm" class="space-y-4">

              <div v-if="step === 1">
                <h4 class="text-lg font-semibold mb-3">Step 1: Identifiers</h4>
                <div class="mb-3">
                  <label for="jobTitle" class="form-label fw-semibold text-gray-700">Job Title <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="jobTitle"
                    class="form-control rounded-pill"
                    v-model="formData.jobTitle"
                    required
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="jobCode" class="form-label fw-semibold text-gray-700">Job Code</label>
                  <input
                    type="text"
                    class="form-control rounded-pill"
                    id="jobCode"
                    :value="jobIdentifier.jobCode"
                    readonly
                  />
                </div>
                <div v-for="(title, index) in formData.altJobTitles" :key="index" class="mb-3">
                  <label :for="'altTitle' + index" class="form-label fw-semibold text-gray-700">Alternative Job Title {{ index + 1 }}</label>
                  <div class="input-group">
                    <input
                      type="text"
                      :id="'altTitle' + index"
                      class="form-control rounded-pill"
                      v-model="formData.altJobTitles[index]"
                    />
                    <button
                      v-if="index > 0"
                      type="button"
                      class="btn btn-outline-danger rounded-pill ms-2"
                      @click="removeAltTitle(index)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary rounded-pill mt-2"
                  @click="addAltTitle"
                >
                  Add Alternative Title
                </button>
              </div>

              <div v-if="step === 2">
                <h4 class="text-lg font-semibold mb-3">Step 2: Links to Structures</h4>
                <div class="mb-3">
                  <label for="jobFunction" class="form-label fw-semibold text-gray-700">Job Function <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="jobFunction"
                    class="form-control rounded-pill"
                    v-model="formData.jobFunction"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="jobFamily" class="form-label fw-semibold text-gray-700">Job Family <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="jobFamily"
                    class="form-control rounded-pill"
                    v-model="formData.jobFamily"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="reportsTo" class="form-label fw-semibold text-gray-700">Job Reports To <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="reportsTo"
                    class="form-control rounded-pill"
                    v-model="formData.reportsTo"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-semibold text-gray-700">Jobs That Report To It</label>
                  <div v-for="(job, index) in formData.jobsThatReportTo" :key="'reportTo' + index" class="mb-3">
                    <div class="input-group">
                      <input
                        type="text"
                        :id="'reportTo' + index"
                        class="form-control rounded-pill"
                        v-model="formData.jobsThatReportTo[index]"
                        placeholder="Enter job title"
                      />
                      <button
                        v-if="index > 0"
                        type="button"
                        class="btn btn-outline-danger rounded-pill ms-2"
                        @click="removeJobReport(index)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-primary rounded-pill mt-2"
                    @click="addJobReport"
                  >
                    Add Job
                  </button>
                </div>
                <div class="mb-3">
                  <label for="careerType" class="form-label fw-semibold text-gray-700">Career Type <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="careerType"
                    class="form-control rounded-pill"
                    v-model="formData.careerType"
                    required
                  />
                </div>
              </div>

              <div v-if="step === 3">
                <h4 class="text-lg font-semibold mb-3">Step 3: Contribution</h4>
                <div class="mb-3">
                  <label for="levelOfWork" class="form-label fw-semibold text-gray-700">Level of Work <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="levelOfWork"
                    class="form-control rounded-pill"
                    v-model="formData.levelOfWork"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="jobPurpose" class="form-label fw-semibold text-gray-700">Job Purpose Description <span class="text-danger">*</span></label>
                  <textarea
                    id="jobPurpose"
                    class="form-control rounded-lg"
                    v-model="formData.jobPurpose"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="jobCriticality" class="form-label fw-semibold text-gray-700">Job Criticality</label>
                  <input
                    type="text"
                    id="jobCriticality"
                    class="form-control rounded-pill"
                    v-model="formData.jobCriticality"
                  />
                </div>
              </div>

              <div v-if="step === 4">
                <h4 class="text-lg font-semibold mb-3">Step 4: Key Responsibilities</h4>
                <div v-for="(resp, index) in formData.responsibilities" :key="index" class="mb-3">
                  <div class="input-group">
                    <label :for="'outputGroup' + index" class="form-label fw-semibold text-gray-700">Output Group {{ index + 1 }}</label>
                    <input
                      type="text"
                      :id="'outputGroup' + index"
                      class="form-control rounded-pill mb-2"
                      v-model="resp.outputGroup"
                    />
                    <textarea
                      class="form-control rounded-lg"
                      v-model="resp.outputsAndMeasures"
                      placeholder="Outputs and Measures"
                    ></textarea>
                    <button
                      v-if="index > 0"
                      type="button"
                      class="btn btn-outline-danger rounded-pill ms-2 mt-2"
                      @click="removeResponsibility(index)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary rounded-pill mt-2"
                  @click="addResponsibility"
                >
                  Add Responsibility
                </button>
              </div>

              <div v-if="step === 5">
                <h4 class="text-lg font-semibold mb-3">Step 5: Requirements</h4>
                <div class="mb-3">
                  <label for="min1" class="form-label fw-semibold text-gray-700">Minimum Qualification 1 <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="min1"
                    class="form-control rounded-pill"
                    v-model="formData.qualifications.min1"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="min2" class="form-label fw-semibold text-gray-700">Minimum Qualification 2</label>
                  <input
                    type="text"
                    id="min2"
                    class="form-control rounded-pill"
                    v-model="formData.qualifications.min2"
                  />
                </div>
                <div class="mb-3">
                  <label for="pref1" class="form-label fw-semibold text-gray-700">Preferred Qualification 1</label>
                  <input
                    type="text"
                    id="pref1"
                    class="form-control rounded-pill"
                    v-model="formData.qualifications.pref1"
                  />
                </div>
                <div class="mb-3">
                  <label for="pref2" class="form-label fw-semibold text-gray-700">Preferred Qualification 2</label>
                  <input
                    type="text"
                    id="pref2"
                    class="form-control rounded-pill"
                    v-model="formData.qualifications.pref2"
                  />
                </div>
                <div v-for="(exp, index) in formData.experiences" :key="index" class="mb-4">
                  <h5 class="text-md font-semibold mb-2">Experience {{ index + 1 }} <span v-if="index === 0" class="text-danger">*</span></h5>
                  <div class="mb-3">
                    <label :for="'jobFunction' + index" class="form-label fw-semibold text-gray-700">Job Function</label>
                    <input
                      type="text"
                      :id="'jobFunction' + index"
                      class="form-control rounded-pill"
                      v-model="exp.jobFunction"
                      :required="index === 0"
                    />
                  </div>
                  <div class="mb-3">
                    <label :for="'jobFamily' + index" class="form-label fw-semibold text-gray-700">Job Family</label>
                    <input
                      type="text"
                      :id="'jobFamily' + index"
                      class="form-control rounded-pill"
                      v-model="exp.jobFamily"
                      :required="index === 0"
                    />
                  </div>
                  <div class="mb-3">
                    <label :for="'years' + index" class="form-label fw-semibold text-gray-700">Years</label>
                    <input
                      type="number"
                      :id="'years' + index"
                      class="form-control rounded-pill"
                      v-model="exp.years"
                      :required="index === 0"
                    />
                  </div>
                  <div class="mb-3">
                    <label :for="'description' + index" class="form-label fw-semibold text-gray-700">Description</label>
                    <textarea
                      :id="'description' + index"
                      class="form-control rounded-lg"
                      v-model="exp.description"
                      :required="index === 0"
                    ></textarea>
                  </div>
                  <button
                    v-if="index > 0"
                    type="button"
                    class="btn btn-outline-danger rounded-pill mt-2"
                    @click="removeExperience(index)"
                  >
                    Remove
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary rounded-pill mt-2"
                  @click="addExperience"
                >
                  Add Experience
                </button>
              </div>

              <div v-if="step === 6">
                <h4 class="text-lg font-semibold mb-3">Step 6: Competencies</h4>

                <div class="mb-4">
                  <label class="form-label fw-semibold text-gray-700">Behavioral Competencies</label>
                  <div v-for="(beh, index) in formData.competencies.behavioural" :key="'behavioural' + index" class="mb-3">
                    <h5 v-if="index > 0" class="text-md font-semibold">Additional Competency {{ index + 1 }}</h5>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control rounded-pill"
                        v-model="beh.label"
                        placeholder="Label"
                        :required="index < 2"
                      />
                      <textarea
                        class="form-control rounded-lg mt-2"
                        v-model="beh.description"
                        placeholder="Description"
                        :required="index < 2"
                      ></textarea>
                      <button
                        v-if="index > 0"
                        type="button"
                        class="btn btn-outline-danger rounded-pill ms-2 mt-2"
                        @click="removeBehaviouralCompetency(index)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-primary rounded-pill mt-2"
                    @click="addBehaviouralCompetency"
                  >
                    Add Behavioral Competency
                  </button>
                </div>

                <div class="mb-4">
                  <label class="form-label fw-semibold text-gray-700">Technical Competencies</label>
                  <div v-for="(tech, index) in formData.competencies.technical" :key="'technical' + index" class="mb-3">
                    <h5 v-if="index > 0" class="text-md font-semibold">Additional Competency {{ index + 1 }}</h5>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control rounded-pill"
                        v-model="tech.label"
                        placeholder="Label"
                        :required="index < 2"
                      />
                      <textarea
                        class="form-control rounded-lg mt-2"
                        v-model="tech.description"
                        placeholder="Description"
                        :required="index < 2"
                      ></textarea>
                      <input
                        type="text"
                        class="form-control rounded-pill mt-2"
                        v-model="tech.level"
                        placeholder="Proficiency Level"
                        :required="index < 2"
                      />
                      <button
                        v-if="index > 0"
                        type="button"
                        class="btn btn-outline-danger rounded-pill ms-2 mt-2"
                        @click="removeTechnicalCompetency(index)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-primary rounded-pill mt-2"
                    @click="addTechnicalCompetency"
                  >
                    Add Technical Competency
                  </button>
                </div>

                <div v-if="formData.levelOfWork && parseInt(formData.levelOfWork) >= 3 && parseInt(formData.levelOfWork) <= 7">
                  <label class="form-label fw-semibold text-gray-700">Leadership Competencies</label>
                  <div v-for="(lead, index) in formData.competencies.leadership" :key="'leadership' + index" class="mb-3">
                    <h5 v-if="index > 0" class="text-md font-semibold">Additional Competency {{ index + 1 }}</h5>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control rounded-pill"
                        v-model="lead.label"
                        placeholder="Label"
                      />
                      <textarea
                        class="form-control rounded-lg mt-2"
                        v-model="lead.description"
                        placeholder="Description"
                      ></textarea>
                      <input
                        type="text"
                        class="form-control rounded-pill mt-2"
                        v-model="lead.levelDescription"
                        placeholder="Proficiency Level Description"
                      />
                      <button
                        v-if="index > 0"
                        type="button"
                        class="btn btn-outline-danger rounded-pill ms-2 mt-2"
                        @click="removeLeadershipCompetency(index)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-primary rounded-pill mt-2"
                    @click="addLeadershipCompetency"
                  >
                    Add Leadership Competency
                  </button>
                </div>
              </div>

              <div v-if="step === 7">
                <h4 class="text-lg font-semibold mb-3">Step 7: Additional Job Dimensions</h4>
                <div class="mb-4">
                  <label class="form-label fw-semibold text-gray-700">Direct Reports</label>
                  <div v-for="(direct, index) in formData.directReports" :key="'direct' + index" class="mb-3">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control rounded-pill mb-2"
                        v-model="direct.title"
                        placeholder="Job Title"
                        required
                      />
                      <input
                        type="number"
                        class="form-control rounded-pill mb-2 ms-2"
                        v-model="direct.number"
                        placeholder="Number"
                        required
                      />
                      <button
                        v-if="index > 0"
                        type="button"
                        class="btn btn-outline-danger rounded-pill ms-2 mt-2"
                        @click="removeDirectReport(index)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-primary rounded-pill mt-2"
                    @click="addDirectReport"
                  >
                    Add Direct Report
                  </button>
                </div>
                <div class="mb-4">
                  <label class="form-label fw-semibold text-gray-700">Indirect Reports</label>
                  <div v-for="(indirect, index) in formData.indirectReports" :key="'indirect' + index" class="mb-3">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control rounded-pill mb-2"
                        v-model="indirect.family"
                        placeholder="Job Family"
                      />
                      <input
                        type="number"
                        class="form-control rounded-pill mb-2 ms-2"
                        v-model="indirect.number"
                        placeholder="Number"
                      />
                      <button
                        v-if="index > 0"
                        type="button"
                        class="btn btn-outline-danger rounded-pill ms-2 mt-2"
                        @click="removeIndirectReport(index)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-primary rounded-pill mt-2"
                    @click="addIndirectReport"
                  >
                    Add Indirect Report
                  </button>
                </div>
              </div>

              <div class="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  class="btn btn-secondary rounded-pill px-3 py-2"
                  @click="goToPreviousStep"
                  :disabled="step === 1"
                >
                  Back
                </button>
                <button
                  type="button"
                  class="btn btn-primary rounded-pill px-3 py-2"
                  @click="goToNextStep"
                  :disabled="step === totalSteps"
                >
                  Next
                </button>
                <button
                  v-if="step === totalSteps"
                  type="submit"
                  class="btn btn-success rounded-pill px-3 py-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { authStore } from "../store/store";

const store = authStore();

const identifiers = ref([
  {
    jobTitle: 'Senior',
    jobCode: 'FIN-001',
    altTitle: 'Finance Manager',
  },
]);

const jobIdentifier = reactive({
  jobTitle: '',
  jobCode: '',
  altTitle: '',
  index: -1,
});

const step = ref(1);
const totalSteps = 7;

const formData = reactive({
  jobTitle: '',
  jobCode: '',
  altJobTitles: [''],
  jobFunction: '',
  jobFamily: '',
  reportsTo: '',
  jobsThatReportTo: [''],
  careerType: '',
  levelOfWork: '',
  jobPurpose: '',
  jobCriticality: '',
  responsibilities: [],
  qualifications: {
    min1: '',
    min2: '',
    pref1: '',
    pref2: '',
  },
  experiences: [],
  competencies: {
    behavioural: [{ label: '', description: '' }],
    technical: [{ label: '', description: '', level: '' }],
    leadership: [{ label: '', description: '', levelDescription: '' }],
  },
  directReports: [],
  indirectReports: [],
});

let modalInstance = null;

const generateJobCode = () => {
  jobIdentifier.jobCode = `JOB-${Date.now().toString().slice(-4)}`;
};

const goToNextStep = () => {
  if (step.value < totalSteps) {
    step.value++;
  }
};

const goToPreviousStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

const addAltTitle = () => {
  formData.altJobTitles.push('');
};

const removeAltTitle = (index) => {
  formData.altJobTitles.splice(index, 1);
  if (formData.altJobTitles.length === 0) {
    formData.altJobTitles.push('');
  }
};

const addResponsibility = () => {
  formData.responsibilities.push({ outputGroup: '', outputsAndMeasures: '' });
};

const removeResponsibility = (index) => {
  formData.responsibilities.splice(index, 1);
  if (formData.responsibilities.length === 0) {
    formData.responsibilities.push({ outputGroup: '', outputsAndMeasures: '' });
  }
};

const addDirectReport = () => {
  formData.directReports.push({ title: '', number: '' });
};

const removeDirectReport = (index) => {
  formData.directReports.splice(index, 1);
  if (formData.directReports.length === 0) {
    formData.directReports.push({ title: '', number: '' });
  }
};

const addIndirectReport = () => {
  formData.indirectReports.push({ family: '', number: '' });
};

const removeIndirectReport = (index) => {
  formData.indirectReports.splice(index, 1);
  if (formData.indirectReports.length === 0) {
    formData.indirectReports.push({ family: '', number: '' });
  }
};

const addExperience = () => {
  formData.experiences.push({ jobFunction: '', jobFamily: '', years: '', description: '' });
};

const removeExperience = (index) => {
  formData.experiences.splice(index, 1);
  if (formData.experiences.length === 0) {
    formData.experiences.push({ jobFunction: '', jobFamily: '', years: '', description: '' });
  }
};

const addBehaviouralCompetency = () => {
  formData.competencies.behavioural.push({ label: '', description: '' });
};

const removeBehaviouralCompetency = (index) => {
  formData.competencies.behavioural.splice(index, 1);
  if (formData.competencies.behavioural.length === 0) {
    formData.competencies.behavioural.push({ label: '', description: '' });
  }
};

const addTechnicalCompetency = () => {
  formData.competencies.technical.push({ label: '', description: '', level: '' });
};

const removeTechnicalCompetency = (index) => {
  formData.competencies.technical.splice(index, 1);
  if (formData.competencies.technical.length === 0) {
    formData.competencies.technical.push({ label: '', description: '', level: '' });
  }
};

const addLeadershipCompetency = () => {
  formData.competencies.leadership.push({ label: '', description: '', levelDescription: '' });
};

const removeLeadershipCompetency = (index) => {
  formData.competencies.leadership.splice(index, 1);
  if (formData.competencies.leadership.length === 0) {
    formData.competencies.leadership.push({ label: '', description: '', levelDescription: '' });
  }
};

const addJobReport = () => {
  formData.jobsThatReportTo.push('');
};

const removeJobReport = (index) => {
  formData.jobsThatReportTo.splice(index, 1);
  if (formData.jobsThatReportTo.length === 0) {
    formData.jobsThatReportTo.push('');
  }
};

const submitForm = () => {
  const newIdentifier = {
    jobTitle: formData.jobTitle,
    jobCode: jobIdentifier.jobCode || generateJobCode(),
    altTitle: formData.altJobTitles.filter(title => title.trim() !== '').join(', '),
    jobFunction: formData.jobFunction,
    jobFamily: formData.jobFamily,
    reportsTo: formData.reportsTo,
    jobsThatReportTo: formData.jobsThatReportTo.filter(job => job.trim() !== '').join(', '),
    careerType: formData.careerType,
    levelOfWork: formData.levelOfWork,
    jobPurpose: formData.jobPurpose,
    jobCriticality: formData.jobCriticality,
    responsibilities: [...formData.responsibilities],
    qualifications: { ...formData.qualifications },
    experiences: [...formData.experiences],
    competencies: { ...formData.competencies },
    directReports: [...formData.directReports],
    indirectReports: [...formData.indirectReports],
  };

  if (jobIdentifier.index >= 0) {
    identifiers.value[jobIdentifier.index] = newIdentifier;
  } else {
    identifiers.value.push(newIdentifier);
  }

  resetForm();
  const modalElement = document.getElementById('addJobProfileModal');
  const modal = Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
  }
};

const resetForm = () => {
  Object.assign(formData, {
    jobTitle: '',
    jobCode: '',
    altJobTitles: [''],
    jobFunction: '',
    jobFamily: '',
    reportsTo: '',
    jobsThatReportTo: [''],
    careerType: '',
    levelOfWork: '',
    jobPurpose: '',
    jobCriticality: '',
    responsibilities: [],
    qualifications: {
      min1: '',
      min2: '',
      pref1: '',
      pref2: '',
    },
    experiences: [],
    competencies: {
      behavioural: [{ label: '', description: '' }],
      technical: [{ label: '', description: '', level: '' }],
      leadership: [{ label: '', description: '', levelDescription: '' }],
    },
    directReports: [],
    indirectReports: [],
  });
  generateJobCode();
  jobIdentifier.index = -1;
  step.value = 1;
};

const openModal = () => {
  const modalElement = document.getElementById('addJobProfileModal');
  const modal = new Modal(modalElement);
  modal.show();
};

const editIdentifier = (index) => {
  const identifier = identifiers.value[index];
  Object.assign(formData, {
    jobTitle: identifier.jobTitle,
    jobCode: identifier.jobCode,
    altJobTitles: identifier.altTitle ? identifier.altTitle.split(', ') : [''],
    jobFunction: identifier.jobFunction || '',
    jobFamily: identifier.jobFamily || '',
    reportsTo: identifier.reportsTo || '',
    jobsThatReportTo: identifier.jobsThatReportTo ? identifier.jobsThatReportTo.split(', ') : [''],
    careerType: identifier.careerType || '',
    levelOfWork: identifier.levelOfWork || '',
    jobPurpose: identifier.jobPurpose || '',
    jobCriticality: identifier.jobCriticality || '',
    responsibilities: identifier.responsibilities || [],
    qualifications: identifier.qualifications || { min1: '', min2: '', pref1: '', pref2: '' },
    experiences: identifier.experiences || [],
    competencies: identifier.competencies || {
      behavioural: [{ label: '', description: '' }],
      technical: [{ label: '', description: '', level: '' }],
      leadership: [{ label: '', description: '', levelDescription: '' }],
    },
    directReports: identifier.directReports || [],
    indirectReports: identifier.indirectReports || [],
  });
  jobIdentifier.index = index;
  step.value = 1;
  openModal();
};

const deleteIdentifier = (index) => {
  if (confirm('Are you sure you want to delete this job profile?')) {
    identifiers.value.splice(index, 1);
  }
};

onMounted(() => {
  generateJobCode();
  store.currentpage = "job-identifiers";
  store.showSidebar = false;
});

</script>

<style scoped>
.job-profile {
  max-width: 1000px;
  margin: auto;
}

.add-profile-btn {
  float: right;
  background: #347ae2;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 20px;
  cursor: pointer;
  width: 190px;
  height: 50px;
  font-family: 'Satoshi', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.profile-list {
  margin-top: 100px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  font-family: 'Satoshi', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 27px;
  text-align: left;
  padding: 15px 10px 15px 20px;
  background-color: #edf2f7;
  border-bottom: 2px solid #ddd;
}

tbody td {
  font-family: 'Satoshi', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.6px;
  text-align: left;
  padding: 10px 10px 10px 20px;
  border-bottom: 1px solid #ddd;
}

.btn-outline-primary,
.btn-outline-danger {
  font-family: 'Satoshi', sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;
}

.btn-outline-primary {
  color: #347ae2;
  border-color: #347ae2;
}

.btn-outline-primary:hover {
  background-color: #347ae2;
  color: white;
}

.btn-outline-danger {
  color: #ff6b6b;
  border-color: #ff6b6b;
}

.btn-outline-danger:hover {
  background-color: #ff6b6b;
  color: white;
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
  font-size: 1.25rem;
  font-weight: 500;
  color: #333333;
}

.form-label {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-control,
.form-select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
}

.form-control:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.text-danger {
  color: #ef4444;
}

.btn-primary,
.btn-success,
.btn-secondary {
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
}

.btn-primary {
  background-color: #347ae2;
  border-color: #347ae2;
}

.btn-primary:hover {
  background-color: #2d6ab0;
  border-color: #2d6ab0;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #218838;
}

.btn-secondary {
  background-color: #e5e7eb;
  border-color: #e5e7eb;
}

.btn-secondary:hover {
  background-color: #d1d5db;
  border-color: #d1d5db;
}

.step-navigation button {
  background: none;
  border: 1px solid #ddd;
  color: #333;
}

.step-navigation button.active {
  background: #347ae2;
  color: white;
  border-color: #347ae2;
}

@media (max-width: 600px) {
  .profile-list table,
  .profile-list thead,
  .profile-list tbody,
  .profile-list th,
  .profile-list td,
  .profile-list tr {
    display: block;
  }

  .profile-list thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .profile-list tr {
    margin-bottom: 15px;
  }

  .profile-list td {
    border: none;
    position: relative;
    padding-left: 50%;
  }

  .profile-list td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label);
    font-weight: bold;
  }

  .btn-outline-primary,
  .btn-outline-danger {
    display: block;
    margin: 5px 0;
  }
}
</style>
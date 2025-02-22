<template>
  <div class="container">
    <div class="header">
      <h2>Ranks</h2>
      <div class="action-buttons">
        <button @click="importRank" class="btn btn-import" data-bs-toggle="modal" data-bs-target="#importRankModal">+ Import Rank</button>
        <button @click="newRank" class="btn btn-new" data-bs-toggle="modal" data-bs-target="#addRankModal">+ New Rank</button>
        
      </div>
    </div>

    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Rank"
        class="search-input"
      />
    </div>

    <table class="ranks-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rank in paginatedRanks" :key="rank.id">
          <td>{{ rank.name }}</td>
          <td class="actions">
            <button @click="editRank(rank)" class="btn-edit">✏️</button>
            <button @click="deleteRank(rank)" class="btn-delete">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <p>Rows per page:</p>
      <select v-model="rowsPerPage" @change="resetPage">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>
      <p>{{ pageInfo }}</p>
      <button @click="prevPage" :disabled="currentPage === 0">‹</button>
      <button @click="nextPage" :disabled="isLastPage">›</button>
    </div>
  </div>

   

  <div class="modal fade" id="importRankModal" tabindex="-1" aria-labelledby="importRankModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="importRankModalLabel">Import Rank</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>
              Download an excel template by clicking the button below. <br />
              Note: please do not change the layout of the cells in the excel. You are expected to add your data below the column header (first row).
            </p>
            <p>
              <strong>Department No:</strong> You are expected to get the value from their representing sheet.
            </p>
            <button class="btn btn-info text-white mb-3">Download Template</button>
            <div class="mb-3">
              <label class="form-label">Upload File</label>
              <input type="file" @change="onFileChange" class="form-control" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Rank Modal -->
    <div class="modal fade" id="addRankModal" tabindex="-1" aria-labelledby="addRankModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRankModalLabel">Add Rank</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="rankName" class="form-label">Rank *</label>
              <input id="rankName" v-model="rankName" class="form-control" type="text" required />
            </div>

            <h5 class="mt-4">Module Permission</h5>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Read</th>
                  <th>Write</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(permission, index) in modulePermissions" :key="index">
                  <td>{{ permission.module }}</td>
                  <td><input type="checkbox" v-model="permission.read" /></td>
                  <td><input type="checkbox" v-model="permission.write" /></td>
                  <td><input type="checkbox" v-model="permission.delete" /></td>
                </tr>
              </tbody>
            </table>

            <button @click="submitForm" class="btn btn-primary w-100 mt-3" data-bs-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { authStore } from "../store/store";


const store = authStore();
const tab = ref(1);

const ranks = ref([
  { id: 1, name: 'ACCESSABVC' },
  { id: 2, name: 'ACCESSABVNC' },
  { id: 3, name: 'ACCESSLOSC' },
  { id: 4, name: 'ACCESSLOSNC' },
  { id: 5, name: 'ACCESSPHCC' },
  { id: 6, name: 'ACCESSPHCNC' },
  { id: 7, name: 'AFRI GLOBAL' },
  { id: 8, name: 'AGM' },
  { id: 9, name: 'AGM_S1' },
  { id: 10, name: 'AGM_S2' },
]);

const searchQuery = ref('');
const currentPage = ref(0);
const rowsPerPage = ref(10);

const filteredRanks = computed(() =>
  ranks.value.filter(rank =>
    rank.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const paginatedRanks = computed(() => {
  const startIndex = currentPage.value * rowsPerPage.value;
  const endIndex = startIndex + rowsPerPage.value;
  return filteredRanks.value.slice(startIndex, endIndex);
});

const pageInfo = computed(() => {
  const start = currentPage.value * rowsPerPage.value + 1;
  const end = Math.min((currentPage.value + 1) * rowsPerPage.value, filteredRanks.value.length);
  return `${start} - ${end} of ${filteredRanks.value.length}`;
});

const isLastPage = computed(() =>
  currentPage.value * rowsPerPage.value + rowsPerPage.value >= filteredRanks.value.length
);

function newRank() {
  console.log('New rank creation triggered!');
}

function importRank() {
  console.log('Import rank functionality triggered!');
}

function editRank(rank) {
  alert(`Editing rank: ${rank.name}`);
}

function deleteRank(rank) {
  const confirmed = confirm(`Are you sure you want to delete ${rank.name}?`);
  if (confirmed) {
    ranks.value = ranks.value.filter(r => r.id !== rank.id);
  }
}

function nextPage() {
  if (!isLastPage.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 0) currentPage.value--;
}

function resetPage() {
  currentPage.value = 0;
}

onMounted(() => {
  store.currentpage = 'ranks';
  store.showSidebar = false;
});

const rankName = ref('');

const modulePermissions = ref([
  { module: 'Holidays', read: false, write: false, delete: false },
  { module: 'Leaves', read: false, write: false, delete: false },
  { module: 'Assets', read: false, write: false, delete: false },
  { module: 'Timing Sheets', read: false, write: false, delete: false },
]);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log('Selected file:', file.name);
  }
};

const submitForm = () => {
  const formData = {
    rankName: rankName.value,
    permissions: modulePermissions.value,
  };
  console.log('Form data:', formData);
};
</script>

<style scoped>
.container {
  padding: 2rem;
  background-color: #f9f9f9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-family: "Satoshi", sans-serif;
}

.action-buttons button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: var(--primary);
  color: #fff;
  font-family: "Satoshi", sans-serif;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
}

.ranks-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.ranks-table th,
.ranks-table td {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  font-family: "Satoshi", sans-serif;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit {

  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.btn-delete {

  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  font-family: "Satoshi", sans-serif;
}

.btn-info {
  background-color: #007bff;
  color: white;
  border: none;
}

.modal-body {
  padding: 20px;
}
</style>

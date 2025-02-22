
<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';
import DashboardContent from './DashboardContent.vue';
import JobProfile from './JobProfile.vue';
import { authStore } from "../store/store";
import { useRouter } from 'vue-router';


const store = authStore();
const router = useRouter();

const components = {
  DashboardContent,
  JobProfile,
};

const sidebarItems = reactive([
  {
    name: 'RECRUITMENT',
    icon: '',
    subItems: [
      { name: 'Job Profile', component: 'JobProfile', icon: 'fas fa-briefcase' },
      { name: 'Vacancies', component: 'Vacancies', icon: 'fas fa-magnifying-glass' },
      { name: 'Applications', component: 'Applications', icon: 'fas fa-file-signature' },
      { name: 'Applicants', component: 'Applicants', icon: 'fas fa-users' },
      { name: 'Onboarding', component: 'Onboarding', icon: 'fas fa-clipboard-check' },
      { name: 'Designation Roles', component: 'DesignationRoles', icon: 'fas fa-id-badge' }
    ],
    isOpen: false
  },
  {
    name: 'ORGANISATION',
    icon: '',
    subItems: [
      { name: 'Products List', component: 'ProductsTable' },
      { name: 'Add Product', component: 'AddProduct' },
      { name: 'Edit Product', component: 'EditProduct' }
    ],
    isOpen: false
  },
  {
    name: 'EMPLOYEES',
    icon: '',
    subItems: [
      { name: 'Job Profile', component: 'JobProfile', icon: 'fas fa-briefcase' },
      { name: 'Vacancies', component: 'OrderDetails', icon: 'fas fa-magnifying-glass' },
      { name: 'Applications', component: 'OrdersTable', icon: 'fas fa-file-signature' },
      { name: 'Applicants', component: 'OrderDetails', icon: 'fas fa-users' },
      { name: 'Onboarding', component: 'OrdersTable', icon: 'fas fa-clipboard-check' },
      { name: 'Designation Roles', component: 'OrderDetails', icon: 'fas fa-id-badge' }
    ],
    isOpen: false
  },
]);

const activeComponent = ref('DashboardContent');
const isSidebarVisible = ref(false);
const windowWidth = ref(window.innerWidth);
const selectedOrder = ref(null);
const selectedProduct = ref(null); 

const breadcrumbMapping = {
  DashboardContent: 'Home',
  
};

const currentBreadcrumb = computed(() => {
  return breadcrumbMapping[activeComponent.value] || 'Home';
});

const currentComponent = computed(() => {
  if (activeComponent.value === 'EditProduct' && selectedProduct.value) {
    return { 
      component: EditProduct, 
      props: { product: selectedProduct.value, setActiveComponent } 
    };
  } else if (activeComponent.value === 'OrderDetails') {
    return { 
      component: OrderDetails, 
      props: { order: selectedOrder.value, setActiveComponent } 
    };
  } else if (activeComponent.value === 'AddProduct') {
    return {
      component: AddProduct,
      props: { setActiveComponent }
    };
   }  
  return { component: components[activeComponent.value], props: { setActiveComponent } };
});

const setActiveComponent = (componentName) => {
  activeComponent.value = componentName;
  if (componentName === 'OrderDetails' && order) {
    selectedOrder.value = order; 
  } else if (componentName === 'EditProduct' && product) {
    selectedProduct.value = product;
     }// else if (componentName === 'AddProduct') {
    //   console.log('AddProduct');
      
    // }
  if (componentName === 'AddProduct') {
    console.log('Navigating to AddProduct');
  }
  if (windowWidth.value <= 576) {
    isSidebarVisible.value = false;
  }
};

const toggleSubmenu = (name) => {
  const item = sidebarItems.find(item => item.name === name);
  if (item) {
    item.isOpen = !item.isOpen;
  }
};

const isSubmenuOpen = (name) => {
  const item = sidebarItems.find(item => item.name === name);
  return item ? item.isOpen : false;
};

const isActive = (name) => {
  const item = sidebarItems.find(item => item.name === name);
  if (item) {
    return item.subItems.some(subItem => activeComponent.value === subItem.component);
  }
  return activeComponent.value === name;
};

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value > 576) {
    isSidebarVisible.value = true;
  } else {
    isSidebarVisible.value = false;
  }
};

onMounted(() => {
  store.currentpage = 'dashboard';
    store.showSidebar = false;
  window.addEventListener('resize', updateWindowWidth);
  updateWindowWidth();
});

onUnmounted(() => {
    
     window.removeEventListener('resize', updateWindowWidth);
});


const logout = () => {
  // localStorage.removeItem('authToken'); 
  // sessionStorage.removeItem('authToken')

  router.push('/login'); 
};
</script>
<template>
    <div class="dashboard mt-4">
        <component :is="currentComponent.component" v-bind="currentComponent.props" :setActiveComponent="setActiveComponent" />

    </div>
</template>

<style scoped>
.dashboard {
  padding: 50px;
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
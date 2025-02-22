import { defineStore } from "pinia";


export const authStore = defineStore("auth", {
  state: () => ({
    currentpage:'vacancies',
    showSidebar: false,
  }),
  actions: {
    
  },
  persist: {
    storage: sessionStorage,
  },
});

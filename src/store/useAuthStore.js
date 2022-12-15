import { defineStore } from "pinia";
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false);
  const addAuthentication = () => authenticated.value = true;
  const cancelAuthentication = () => authenticated.value = false;

  return { authenticated, addAuthentication, cancelAuthentication }
});

// Tried below two versions; not sure why they're not working
// Version 1
// const useAuthStore = defineStore('auth', () => {
//   const authenticated = ref(false);

//   return { authenticated }
// });

// export default { useAuthStore };

// Version 2
// const useAuthStore = defineStore('auth', () => {
//   const authenticated = ref(false);

//   return { authenticated }
// });

// export default useAuthStore;
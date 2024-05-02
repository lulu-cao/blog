import { defineStore } from "pinia";
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false);
  const addAuthentication = () => authenticated.value = true;
  const cancelAuthentication = () => authenticated.value = false;
  const currentUserUid = ref(null);
  const setCurrentUserUid = (uid) => currentUserUid.value = uid;
  const currentUserEmail = ref(null);
  const setCurrentUserEmail = (email) => currentUserEmail.value = email;

  return { authenticated, addAuthentication, cancelAuthentication, currentUserUid, setCurrentUserUid, currentUserEmail, setCurrentUserEmail}
});

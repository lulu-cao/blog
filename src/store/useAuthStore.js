import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from '@/plugins/axios';

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false);
  const addAuthentication = (uid, isSigningup) => {
    localStorage.setItem('user', uid);
    if (isSigningup) {
      axios.post('users/', {
        uid: user.uid,
      }).then((response) => {
        console.log("user created in django");
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }

    authenticated.value = true
  };
  const cancelAuthentication = () => {
    localStorage.removeItem('user');
    authenticated.value = false
  };

  return { authenticated, addAuthentication, cancelAuthentication}
});

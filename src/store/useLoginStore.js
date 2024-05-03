import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('openLogin', () => {
  const isLoginOpen = ref(false);
  function setLoginOpen(val) {
    isLoginOpen.value = val
  };

  return { isLoginOpen, setLoginOpen }
})

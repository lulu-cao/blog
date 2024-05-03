import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('openAddPost', () => {
  const isAddPostOpen = ref(false);
  function setAddPostOpen(val) {
    isAddPostOpen.value = val
  };

  function toggle() {
    isAddPostOpen.value = !isAddPostOpen.value
  }

  return { isAddPostOpen, setAddPostOpen, toggle }
})

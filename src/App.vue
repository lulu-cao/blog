<template>
  <Header 
    @toggle-add-post="toggleAddPost" 
    @sign-up="signUp"
    @login="openLoginModal"
    :showAddPost="showAddPost" 
  />

  <router-view :showAddPost="showAddPost"></router-view>
  
  <LoginModal v-if="isLoginOpen" @close="closeLoginModal" />

  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/LoginModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoginModal,
  },
  data() {
    return {
      showAddPost: false,
      timeout: "",
      isLoginOpen: false
    }
  },
  methods: {
    toggleAddPost() {
      this.showAddPost = !this.showAddPost
    },
    signUp() {
      alert('Welcome to sign up!'); 
      // Below wasn't doing anything so far; need to add function into "task"
      const task = () => {}
      this.debounce(task, 3000)
    },
    debounce(func, wait = 1000) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(func, wait)
    },
    openLoginModal() {
      this.isLoginOpen = true
    },
    closeLoginModal() {
      this.isLoginOpen = false
    },
  }
}
</script>

<template>
  <!-- Binding the value of "authorized" to the variable "authorized" and pass it to the child as a prop -->
  <!-- Binding the value of "showAddPost" to the variable "showAddPost" and pass it to the child as a prop -->
  <Header 
    @toggle-add-post="toggleAddPost" 
    @sign-up="signUp"
    @login="openLoginModal"
    @logout="logout"
    :showAddPost="showAddPost" 
    :authorized="authorized"
  />

  <router-view :showAddPost="showAddPost"></router-view>
  
  <Teleport to="body">
    <LoginModal v-if="isLoginOpen" @close="closeLoginModal" />
  </Teleport>

  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/LoginModal.vue'
// Import firebase file; it is used in submitLogin() even though it appears dim
import * as firebase from './utilities/firebase.js';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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
      isLoginOpen: false,
      authorized: false,
      authUser: {}
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
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.authorized = false;
        console.log("logged out");
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.authUser = user;
        this.authorized = true;
        console.log("authorized");
      } else {        
        this.authorized = false;
      }
    });
  }
}
</script>

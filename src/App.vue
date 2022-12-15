<template>
  <!-- Binding the value of "authorized" to the variable "authorized" and pass it to the child as a prop -->
  <!-- Binding the value of "showAddPost" to the variable "showAddPost" and pass it to the child as a prop -->
  <Header 
    @toggle-add-post="toggleAddPost" 
    @sign-up="signUp"
    @login="openLoginModal"
    @logout="logout"
    :showAddPost="state.showAddPost" 
    :authorized="state.authorized"
  />

  <router-view :showAddPost="state.showAddPost"></router-view>
  
  <Teleport to="body">
    <LoginModal v-if="state.isLoginOpen" @close="closeLoginModal" @showSuccessAlert="state.isSignedIn = true" />
  </Teleport>

  <Footer />
  <Alert v-if="state.isSignedIn" @closeAlert="closeSignInAlert" class="bg-green-800">Welcome back!</Alert>
  <Alert v-if="state.isSignedOut" @closeAlert="closeSignOutAlert" class="bg-green-800">You have been signed out.</Alert>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/LoginModal.vue'
import Alert from './components/Alert.vue'
import { ref, reactive } from 'vue';
// Import firebase file; it is used in submitLogin() even though it appears dim
import * as firebase from './utilities/firebase.js';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoginModal,
    Alert,
  },
  setup() {
    const state = reactive({
      showAddPost: false,
      timeout: "",
      isLoginOpen: false,
      authorized: false,
      authUser: {},
      isSignedIn: false,
      isSignedOut: false
    });

    function toggleAddPost() {
      state.showAddPost = !state.showAddPost
    };

    function signUp() {
      alert('Welcome to sign up!'); 
      // Below wasn't doing anything so far; need to add function into "task"
      const task = () => {}
      debounce(task, 3000)
    };

    function debounce(func, wait = 1000) {
      clearTimeout(state.timeout);
      state.timeout = setTimeout(func, wait)
    };

    function openLoginModal() {
      state.isLoginOpen = true
    };

    function closeLoginModal() {
      state.isLoginOpen = false
    };

    function logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        state.authorized = false;
        state.isSignedOut = true;
      }).catch((error) => {
        console.log(error);
      });
    };

    function closeSignInAlert() {
      state.isSignedIn = false
    };

    function closeSignOutAlert() {
      state.isSignedOut = false
    };

    return { state, toggleAddPost, signUp, debounce, openLoginModal, closeLoginModal, logout, closeSignInAlert, closeSignOutAlert }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.authUser = user;
        this.state.authorized = true;
        console.log("signed in")
      } else {        
        this.state.authorized = false;
        console.log("not signed in");
      }
    });
  }
}
</script>

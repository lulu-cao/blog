<template>
  <!-- Binding the value of "authorized" to the variable "authorized" and pass it to the child as a prop -->
  <v-app>
    <Header
      @sign-up="signUp"
      @logout="logout"
      :authorized="state.authorized"
    />
    <v-navigation-drawer>
      <v-list>
        <v-list-item v-for="route in list" :key="route.to">
          <router-link :to="route.to">{{ route.title }}</router-link>
        </v-list-item>
        <v-list-item v-if="routedToAbout">
          <router-link to="/new">Add a Post</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-fade-transition>
        <router-view></router-view>
      </v-fade-transition>
    </v-main>

    <Teleport to="body">
      <LoginModal @showSuccessAlert="state.isSignedIn = true" />
    </Teleport>

    <Footer />
    <Alert v-if="state.isSignedIn" @closeAlert="closeSignInAlert" class="bg-green-800">Welcome back!</Alert>
    <Alert v-if="state.isSignedOut" @closeAlert="closeSignOutAlert" class="bg-green-800">You have been signed out.</Alert>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/LoginModal.vue'
import Alert from './components/Alert.vue'
import { useAuthStore } from '@/store/useAuthStore'
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
      timeout: "",
      authorized: false,
      authUser: {},
      isSignedIn: false,
      isSignedOut: false,
    });

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

    return { state, signUp, debounce, logout, closeSignInAlert, closeSignOutAlert }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.authUser = user;
        this.state.authorized = true;
        console.log("signed in");
        useAuthStore().addAuthentication();
      } else {
        this.state.authorized = false;
        console.log("not signed in");
        useAuthStore().cancelAuthentication();
      }
    });
  }
}
</script>

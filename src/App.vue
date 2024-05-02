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
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-fade-transition>
        <router-view></router-view>
      </v-fade-transition>
    </v-main>

    <!-- <Teleport to="body">
      <LoginForm @showSuccessAlert="state.isSignedIn = true" />
    </Teleport> -->

    <Footer />
    <Alert v-if="state.isSignedIn" @closeAlert="closeSignInAlert" class="bg-green-800">Welcome back!</Alert>
    <Alert v-if="state.isSignedOut" @closeAlert="closeSignOutAlert" class="bg-green-800">You have been signed out.</Alert>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoginForm from './components/LoginForm.vue'
import Alert from './components/Alert.vue'
import { useAuthStore } from '@/store/useAuthStore'
import { ref, reactive, onMounted } from 'vue';
import * as firebase from './utilities/firebase.js';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const list = [
  { title: "Home", to: "/" },
  { title: "Explore", to: "/explore" },
  { title: "RSS", to: "/rss" },
  { title: "Account", to: "/account" },
];

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

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      state.authUser = user;
      state.authorized = true;
      console.log("signed in");
      useAuthStore().addAuthentication();
    } else {
      state.authorized = false;
      console.log("not signed in");
      useAuthStore().cancelAuthentication();
    }
  });
});
</script>

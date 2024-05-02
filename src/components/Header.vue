<script setup>
import Button from './Button.vue';
import { useAuthStore } from '@/store/useAuthStore';
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { useRouter } from 'vue-router';
import * as firebase from '../utilities/firebase.js';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();
const router = useRouter();
const isAuthorized = ref(false);

const isDarkTheme = ref(true);
const theme = useTheme();
const changeTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  theme.global.name = theme.global.current.dark ? 'light' : 'dark'
};

function logout() {
  signOut(auth).then(() => {
    isLoggingOut.value = true;
  }).catch((error) => {
    console.log(error);
  });
  router.push('/logout');
};

onMounted(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthorized.value = true;
      useAuthStore().addAuthentication();
    } else {
      isAuthorized.value = false;
      useAuthStore().cancelAuthentication();
    }
  });
})
</script>

<template>
  <v-app-bar :elevation="2" image="https://picsum.photos/1920/1080?random">
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Quiet Reading Room</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="changeTheme">
      <v-icon :icon="isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-icon>
    </v-btn>

    <Button
      @click="logout"
      v-if="isAuthorized"
    >
      Sign Out
    </Button>
    <Button
      @click="$router.push('/login')"
      v-else
    >
    Sign In
    </Button>
  </v-app-bar>
</template>

<style scoped>
</style>

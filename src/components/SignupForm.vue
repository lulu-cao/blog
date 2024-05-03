<script setup>
import * as firebase from '../utilities/firebase.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from 'vue';
import { useLoginStore } from '@/store/useLoginStore.js';
import { useAuthStore } from '@/store/useAuthStore.js';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();
const emailRef = ref("");
const isLoading = ref(false);
const store = useLoginStore();
const emit = defineEmits(['showSignupSuccess', 'showSignupFailure']);

function showSuccessAlert() {
  emit('showSignupSuccess')
};

function showFailureAlert(error) {
  emit('showSignupFailure', error)
};

const email = ref('');
const password = ref('');

const rules = {
  required: (v) => !!v || 'Required',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  password: (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
};

// https://firebase.google.com/docs/auth/web/start
function submitSignup() {
  if (!email.value || !password.value) {
    return
  };
  isLoading.value = true;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      authStore.setCurrentUserUid(user.uid)
      authStore.setCurrentUserEmail(user.email)
      localStorage.setItem('user', JSON.stringify(user.uid));
      axios.post('https://blog-cms-django-abaff6e17c2a.herokuapp.com/api/users/', {
        uid: user.uid,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      router.push('/rss')
      isLoading.value = false;
      email.value = "";
      password.value = "";
      showSuccessAlert();
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage;
      if (errorCode === "auth/email-already-in-use") {
        email.value = "";
        password.value = "";
        errorMessage = "Sorry, this email is already in use. Please try another."
      }

      if (!errorMessage) {
        errorMessage = error.message;
      }
      isLoading.value = false;
      showFailureAlert(errorMessage);
    });
};

onMounted(() => {store.isLoginOpen ? emailRef.value.focus() : ""});
</script>

<template>
  <v-container fluid>
    <v-overlay v-model="isLoading">
      <v-progress-circular
        color="blue-grey"
        model-value="100"
        class="justify-center align-middle"
      ></v-progress-circular>
    </v-overlay>
    <v-row justify="center">
      <v-col cols="4">
        <v-card class="pa-4 mix-auto" width="300">
          <v-card-title class="text-center -ms-5">👋 Register</v-card-title>
          <v-card-item>
            <v-form fast-fail @submit.prevent="submitSignup">
              <v-text-field
                prepend-inner-icon="mdi-email"
                v-model="email"
                :rules="[rules.required, rules.email]"
                label="Username / Email"
                ref="emailRef"
              ></v-text-field>

              <v-text-field
                prepend-inner-icon="mdi-lock"
                v-model="password"
                :rules="[rules.required, rules.password]"
                label="Password"
                type="password"
              ></v-text-field>

              <v-btn class="mt-2" type="submit" block>Submit</v-btn>
              <v-btn @click="$emit('register')" class="mt-2" block>Sign In</v-btn>
            </v-form>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



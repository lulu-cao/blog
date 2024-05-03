<script setup>
import * as firebase from '../utilities/firebase.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from 'vue';
import { useAuthStore } from '@/store/useAuthStore.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const auth = getAuth();
const router = useRouter();
const isLoading = ref(false);

const emit = defineEmits(['showSignupSuccess', 'showSignupFailure']);
const showSuccessAlert = () => emit('showSignupSuccess')
const showFailureAlert = (error) => emit('showSignupFailure', error)

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const signupForm = ref(null);

const rules = {
  required: (v) => !!v || 'Required',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  password: (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
  confirmPassword: (v) => (v && v === password.value) || 'Passwords must match',
};

// https://firebase.google.com/docs/auth/web/start
function submitSignup() {
  if (!email.value || !password.value || !confirmPassword.value) return;
  if (isLoading.value) return;
  // TODO: make sure the form is not submitted if it is not valid
  if (!signupForm.value.validate()) return;

  isLoading.value = true;
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      authStore.addAuthentication(JSON.stringify(user.uid), true);
      isLoading.value = false;
      showSuccessAlert();
      setTimeout(() => {
        router.push('/rss')
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage;
      if (errorCode === "auth/email-already-in-use") {
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
        errorMessage = "Sorry, this email is already in use. Please try another."
      }

      if (!errorMessage) {
        errorMessage = error.message;
      }

      isLoading.value = false;
      showFailureAlert(errorMessage);
    });
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-card class="pa-4 mix-auto" width="300">
          <v-card-title class="text-center -ms-5">👋 Register</v-card-title>
          <v-card-item>
            <v-form fast-fail ref="signupForm" @submit.prevent="submitSignup">
              <v-text-field
                prepend-inner-icon="mdi-email"
                v-model="email"
                :rules="[rules.required, rules.email]"
                label="Username / Email"
              ></v-text-field>

              <v-text-field
                prepend-inner-icon="mdi-lock"
                v-model="password"
                :rules="[rules.required, rules.password]"
                label="Password"
                type="password"
              ></v-text-field>

              <v-text-field
                prepend-inner-icon="mdi-lock"
                v-model="confirmPassword"
                :rules="[rules.required, rules.confirmPassword]"
                label="Confirm Password"
                type="password"
              ></v-text-field>

              <v-btn class="mt-2" type="submit" block color="teal" variant="elevated">
                <p>Submit</p>
                <v-progress-circular
                  color="teal"
                  indeterminate
                  size="24"
                  class="ps-10"
                  v-if="isLoading"
                ></v-progress-circular>
              </v-btn>
              <v-btn @click="$emit('register')" class="mt-2" block>Sign In</v-btn>
            </v-form>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script setup>
import * as firebase from '../utilities/firebase.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from 'vue';
import { useAuthStore } from '@/store/useAuthStore.js';
import { useRouter } from 'vue-router';

const emailRef = ref("");
const isLoading = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits(['showLoginSuccess', 'showLoginFailure']);
const showSuccessAlert = () => emit('showLoginSuccess')
const showFailureAlert = (error) => emit('showLoginFailure', error)

const email = ref('');
const password = ref('');
const loginForm = ref(null);

const rules = {
  required: (v) => !!v || 'Required.',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
};

function submitLogin() {
  if (!email.value || !password.value) return;
  if (isLoading.value) return;
  // TODO: make sure the form is not submitted if it is not valid
  if (!loginForm.value.validate()) return;

  isLoading.value = true;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      authStore.addAuthentication(user.uid, false);
      isLoading.value = false;
      showSuccessAlert();
      setTimeout(() => {
        router.push('/rss')
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        password.value = ""
        errorMessage = "Sorry, your password is incorrect. Please try again."
      } else if (errorCode === "auth/user-not-found") {
        email.value = ""
        password.value = ""
        errorMessage = "Sorry, this email is not registered. Please try again."
      };
      isLoading.value = false;
      showFailureAlert(errorMessage);
    });
};
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="4">
          <v-card class="pa-4" width="300">
            <v-card-title class="text-center">Welcome Back</v-card-title>
            <v-card-item>
              <v-form fast-fail ref="loginForm" @submit.prevent="submitLogin">
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
                  :rules="[rules.required]"
                  label="Password"
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
                <v-btn @click="$emit('register')" class="mt-2" block>Register</v-btn>
              </v-form>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



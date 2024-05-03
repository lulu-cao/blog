<script setup>
import * as firebase from '../utilities/firebase.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from 'vue';
import { useLoginStore } from '@/store/useLoginStore.js';
import { useAuthStore } from '@/store/useAuthStore.js';
import { useRouter } from 'vue-router';

const emailRef = ref("");
const isLoading = ref(false);
const store = useLoginStore();
const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits(['showLoginSuccess', 'showLoginFailure']);

function showSuccessAlert() {
  emit('showLoginSuccess')
};

function showFailureAlert(error) {
  emit('showLoginFailure', error)
};

function submitLogin() {
  if (!email.value || !password.value) {
    return
  };
  isLoading.value = true;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user.uid));
      authStore.setCurrentUserUid(user.uid)
      authStore.setCurrentUserEmail(user.email)
      console.log(user);
      isLoading.value = false;
      showSuccessAlert();
      setTimeout(() => {
        router.push('/rss')
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode + errorMessage);
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

onMounted(() => {store.isLoginOpen ? emailRef.value.focus() : ""});

const email = ref('');
const password = ref('');

const rules = {
  required: (v) => !!v || 'Required.',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
};
</script>

<template>
  <div>
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
          <v-card class="pa-4">
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-item>
              <v-form fast-fail @submit.prevent="submitLogin">
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

                <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                <v-btn @click="$emit('register')" class="mt-2" block>Register</v-btn>
              </v-form>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



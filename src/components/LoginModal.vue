<template>
  <div v-if="store.isLoginOpen">
    <!-- <div class="h-screen w-screen bg-gray-500 opacity-50 fixed top-0 z-20" @click="close()">
    </div> -->
    <!-- <div class="fixed h-screen w-screen z-30 top-20">
      <div class="bg-white top-40 w-3/4 md:w-1/3 rounded p-2 m-auto">
        <div class="flex justify-between">
          <h1 class="text-xl px-4 pt-4">Welcome</h1>
          <button class="px-4 pt-4" @click="close()">X</button>
        </div>
        <form class="p-4 my-2" @submit.prevent="submitLogin">
          <div class="my-4">
            <label>Email or Username</label>
            <input class="w-full border rounded shadow p-2 my-2" v-model="email" placeholder="Enter your email or username" ref="emailRef" />
          </div>
          <div class="my-4">
            <label>Password</label>
            <input class="w-full border rounded shadow p-2 my-2" v-model="password" placeholder="Enter your password" type="password" />
          </div>
          <div class="my-4">
            <button type="submit" class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-600 text-white p-2">
              <span v-if="!isLoading">Login</span>
              <span v-else>⏳</span>
            </button>
          </div>
        </form>
      </div>
    </div> -->
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
            <v-card-title>Login</v-card-title>
            <v-card-item>
              <v-form fast-fail @submit.prevent="submitLogin">
                <v-text-field
                  prepend-inner-icon="mdi-account"
                  v-model="firstName"
                  :rules="[rules.required]"
                  label="First name"
                ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-account"
                  v-model="lastName"
                  :rules="[rules.required]"
                  label="Last name"
                ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  ref="emailRef"
                ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  v-model="password"
                  :rules="[rules.required, rules.password]"
                  label="Password"
                  type="password"
                ></v-text-field>

                <v-checkbox
                  v-model="remember"
                  label="Remember me"
                ></v-checkbox>

                <v-btn class="mt-2" type="submit" block>Submit</v-btn>
              </v-form>
            </v-card-item>
            <v-card-actions>
              <v-btn @click="close" class="mt-2" block>Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import * as firebase from '../utilities/firebase.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from 'vue';
import { useLoginStore } from '@/store/useLoginStore.js';

const emailRef = ref("");
const isLoading = ref(false);
const store = useLoginStore();

function close() {
  store.setLoginOpen(false)
};

function showAlert() {
  emit('showSuccessAlert')
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
      isLoading.value = false;
      email.value = "";
      password.value = "";
      showAlert();
      close();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      if (errorCode === "auth/wrong-password") {
        console.log("Wrong password")
      } else if (errorCode === "auth/user-not-found") {
        console.log("User not found")
      };
      isLoading.value = false;
      password.value = ""
    });
};

onMounted(() => {store.isLoginOpen ? emailRef.value.focus() : ""});

const emits = defineEmits(['showSuccessAlert']);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const remember = ref(false);

const rules = {
  required: (v) => !!v || 'Required.',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  password: (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
};
</script>

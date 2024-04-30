<script setup>
import * as firebase from '../utilities/firebase.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from 'vue';
import { useLoginStore } from '@/store/useLoginStore.js';
import { useAuthStore } from '@/store/useAuthStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const emailRef = ref("");
const isLoading = ref(false);
const store = useLoginStore();

function showAlert() {
  emit('showSuccessAlert')
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
      console.log(user);
      router.push('/explore')
      isLoading.value = false;
      email.value = "";
      password.value = "";
      showAlert();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
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
          <v-card class="pa-4 mix-auto" width="300">
            <v-card-title>Register</v-card-title>
            <v-card-item>
              <v-form fast-fail @submit.prevent="submitSignup">
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
                <v-btn @click="$emit('register')" class="mt-2" block>Sign In</v-btn>
              </v-form>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


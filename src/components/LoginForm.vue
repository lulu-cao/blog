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
      authStore.setCurrentUserUid(user.uid)
      authStore.setCurrentUserEmail(user.email)
      console.log(user);
      isLoading.value = false;
      showAlert();
      router.push('/explore')
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
            <v-card-title>Login</v-card-title>
            <v-card-item>
              <v-form fast-fail @submit.prevent="submitLogin">
                <v-text-field
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  :rules="[rules.required]"
                  label="Email"
                  ref="emailRef"
                ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  v-model="password"
                  :rules="[rules.required]"
                  label="Password"
                  type="password"
                ></v-text-field>

                <v-checkbox
                  v-model="remember"
                  label="Remember me"
                ></v-checkbox>

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


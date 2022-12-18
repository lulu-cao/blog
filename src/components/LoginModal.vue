<template>
  <div v-if="store.isLoginOpen">
    <div class="h-screen w-screen bg-gray-500 opacity-50 fixed top-0 z-20" @click="close()">
    </div>
    <div class="fixed h-screen w-screen z-30 top-20">
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
    </div>
  </div>
</template>

<script>
// Import firebase file; it is used in submitLogin() even though it appears dim
import * as firebase from '../utilities/firebase.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from 'vue';
import { useLoginStore } from '@/store/useLoginStore.js';

export default {
  setup(_, { emit }) {
    const emailRef = ref(""); // This is the ref attribute on the email input
    const email = ref(""); // This is the value of the email input
    const password = ref("");
    const isLoading = ref(false);
    const store = useLoginStore();

    function close() {
      store.setLoginOpen(false)
    };

    function showAlert() {
      emit('showSuccessAlert')
    };

    function submitLogin() {
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

   return { emailRef, email, password, isLoading, store, close, submitLogin, showAlert }
  },
  emits: ['showSuccessAlert'],
}
</script>
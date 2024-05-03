<script setup>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'
import Alert from '@/components/Alert.vue';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const isSigningUp = ref(false)
const isLoggingOut = ref(false)
const props = defineProps(['isLoggingOut'])
const route = useRoute()

onMounted(()=>{
  if (route.path === '/logout') {
    isLoggingOut.value = true;

    setTimeout(() => {
      isLoggingOut.value = false;
    }, 5000);
  }
})

const toggleSignup = () => {
  isSigningUp.value = !isSigningUp.value
}

const errorText = ref('')
const isLoginSuccessAlertOpen = ref(false)
const isLoginFailureAlertOpen = ref(false)
const isSignupSuccessAlertOpen = ref(false)
const isSignupFailureAlertOpen = ref(false)

const toggleLoginSuccessAlert = () => {
  isLoginSuccessAlertOpen.value = !isLoginSuccessAlertOpen.value
}

const toggleLoginFailureAlert = (text) => {
  errorText.value = text
  isLoginFailureAlertOpen.value = !isLoginFailureAlertOpen.value
}

const toggleSignupSuccessAlert = () => {
  isSignupSuccessAlertOpen.value = !isSignupSuccessAlertOpen.value
}

const toggleSignupFailureAlert = (text) => {
  errorText.value = text
  isSignupFailureAlertOpen.value = !isSignupFailureAlertOpen.value
}
</script>

<template>
  <v-container>
    <Alert
      v-if="isLoginSuccessAlertOpen"
      @close-alert="toggleLoginSuccessAlert"
      title="Success"
      text="You have successfully signed in!"
      icon="$success"
      type="success"
    />
    <Alert
      v-if="isLoginFailureAlertOpen"
      @close-alert="toggleLoginFailureAlert"
      title="Failure"
      :text="errorText"
      icon="$error"
      type="error"
    />

    <Alert
      v-if="isSignupSuccessAlertOpen"
      @close-alert="toggleSignupSuccessAlert"
      title="Success"
      text="You have successfully signed up!"
      icon="$success"
      type="success"
    />
    <Alert
      v-if="isSignupFailureAlertOpen"
      @close-alert="toggleSignupFailureAlert"
      title="Failure"
      :text="errorText"
      icon="$error"
      type="error"
    />

    <Alert
      v-if="isLoggingOut"
      title="Success"
      text="Looking forward to seeing you again soon!"
      icon="$success"
      type="success"
    />

    <LoginForm
      v-if="!isSigningUp"
      @register="toggleSignup"
      @show-login-success="toggleLoginSuccessAlert"
      @show-login-failure="(text)=>toggleLoginFailureAlert(text)"
    />

    <SignupForm
      v-if="isSigningUp"
      @show-signup-success="toggleSignupSuccessAlert"
      @show-signup-failure="(text)=>toggleSignupFailureAlert(text)"
      @register="toggleSignup"
    />
  </v-container>
</template>

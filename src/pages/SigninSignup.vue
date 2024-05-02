<script setup>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'
import { onMounted, ref } from 'vue'

const isSigningUp = ref(false)
onMounted(()=>{
  isSigningUp.value = false
})
const register = () => {
  isSigningUp.value = true
}
</script>

<template>
  <v-container>
    <LoginForm v-if="!isSigningUp" @register="register" />
    <SignupForm v-else />
  </v-container>
</template>

<template>
  <div class="h-screen w-screen bg-gray-500 opacity-50 fixed top-0 z-20" @click="$emit('close')">
  </div>
  <div class="fixed h-screen w-screen z-30 top-20">
    <div class="bg-white top-40 w-3/4 md:w-1/3 rounded p-2 m-auto">
      <div class="flex justify-between">
        <h1 class="text-xl px-4 pt-4">Welcome</h1>
        <button class="px-4 pt-4" @click="$emit('close')">X</button>
      </div>
      <form class="p-4 my-2" @submit.prevent="submitLogin">
        <div class="my-4">
          <label>Email or Username</label>
          <input class="w-full border rounded shadow p-2 my-2" v-model="form.email" placeholder="Enter your email or username" />
        </div>
        <div class="my-4">
          <label>Password</label>
          <input class="w-full border rounded shadow p-2 my-2" v-model="form.password" placeholder="Enter your password" type="password" />
        </div>
        <div class="my-4">
          <button type="submit" class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-800 text-white p-2">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    submitLogin() {

    }
  }
}
</script>
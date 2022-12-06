<template>
  <header class="w-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 flex flex-wrap justify-between">
    <div class="flex my-2">
      <router-link to="/">Blog</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="routedToAbout" to="/new">Add a Post</router-link>
    </div>
    <nav class="flex">
      <Button 
        v-if="routedToHome"
        :color="showAddPostBtnColor" 
        v-text="showAddPostBtnText"
        @btn-click="$emit('toggle-add-post')"
      >      
      </Button>
      <Button 
        v-if="!authorized" 
        @btn-click="$emit('sign-up')"
        v-text="'Sign Up'"
      >
      </Button>
      <Button 
        @btn-click="$emit('login')"
        v-text="signInOutBtn"
      >
      </Button>
      <Button 
        @btn-click="$emit('logout')"
        v-text="'Sign Out'"
      >
      </Button>
    </nav>
  </header>
</template>

<script>
import Button from './Button'

export default {
  name: 'Header',
  props: {
    title: String,
    showAddPost: Boolean,
    authorized: Boolean,
  },
  components: {
    Button,
  },
  computed: {
    // The template shouldn't be complex; use computed properties to handle complex logic instead
    routedToHome() {
      if (this.$route.path === '/') {
        return true
      } else {
        return false
      }
    },
    routedToAbout() {
      if (this.$route.path === '/about') {
        return true
      } else {
        return false
      }
    },
    showAddPostBtnText() {
      return this.showAddPost ? 'Close' : 'Add a Post'
    },
    showAddPostBtnColor() {
      return this.showAddPost ? 'red' : 'darkgreen'
    },
    signInOutBtn() {
      return this.authorized ? 'Sign Out' : 'Sign In'
    }
  }
}
</script>

<style scoped>
a {
  margin-right: 20px;
  font-size: 1.5rem;
}
</style>
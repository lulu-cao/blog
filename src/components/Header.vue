<template>
  <header class="w-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2">
    <router-link to="/">Blog</router-link>
    <nav>
      <Button 
        v-if="routedToHome"
        @btn-click="$emit('toggle-add-post')" 
        :color="showAddPostBtnColor" 
        v-text="showAddPostBtnText"
      >
      </Button>
      <Button 
        v-if="!authorized" 
        @btn-click="$emit('sign-up')"
        v-text="'Sign Up'"
        :color="'green'"
      >
      </Button>
      <Button 
        @btn-click="$emit('sign-in-out')"
        v-text="signInOutBtn"
        :color="'green'"
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
    routedToHome() {
      if(this.$route.path === '/') {
        return true
      } else {
        return false
      }
    },
    // The template shouldn't be complex; use computed properties to handle complex logic instead
    showAddPostBtnText() {
      return this.showAddPost ? 'Close' : 'Add a Post'
    },
    showAddPostBtnColor() {
      return this.showAddPost ? 'red' : 'green'
    },
    signInOutBtn() {
      return this.authorized ? 'Sign Out' : 'Sign In'
    }
  }
}
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
    color: black;
    font-size: 2rem;
  }
</style>
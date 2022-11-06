<template>
  <header>
    <router-link to="/">{{ title }}</router-link>
    <Button 
      v-show="homePage"
      @btn-click="$emit('toggle-add-post')" 
      :text="showAddPost ? 'Close' : 'Add a Post'" 
      :color="showAddPost ? 'red' : 'green'" 
    />
  </header>
</template>

<script>
import Button from './Button'

export default {
  name: 'Header',
  props: {
    title: String,
    showAddPost: Boolean,
  },
  components: {
    Button,
  },
  computed: {
    homePage() {
      if(this.$route.path === '/') {
        return true
      } else {
        return false
      }
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
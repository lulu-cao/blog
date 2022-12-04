<template>
  <Header 
    @toggle-add-post="toggleAddPost" 
    @sign-up="signUp"
    @sign-in-out="signInOut"
    :showAddPost="showAddPost" 
  />

  <router-view :showAddPost="showAddPost"></router-view>
  
  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      showAddPost: false,
      timeout: ""
    }
  },
  methods: {
    toggleAddPost() {
      this.showAddPost = !this.showAddPost
    },
    signUp() {
      alert('Welcome to sign up!'); 
      // Below wasn't doing anything so far; need to add function into "task"
      const task = () => {}
      this.debounce(task, 3000)
    },
    debounce(func, wait = 1000) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(func, wait)
    },
    signInOut() {
      alert('Welcome to sign in/sign out!')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  padding: 30px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>

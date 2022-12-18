<template>
  <header class="w-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 flex flex-wrap justify-between">
    <div class="flex flex-wrap my-2">
      <router-link to="/">Blog</router-link>
      <router-link to="/movie">Movie</router-link>
      <router-link to="/tv">TV</router-link>
      <router-link to="/restaurant">Restautant</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="routedToAbout" to="/new">Add a Post</router-link>
    </div>
    <nav class="flex">
      <Button 
        v-if="authorized"
        :color="showAddPostBtnColor" 
        @btn-click="store.toggle"
        v-text=showAddPostBtnText
      >
      </Button>
      <Button 
        v-if="!authorized" 
        @btn-click="$emit('sign-up')"
      >
      Sign Up
      </Button>
      <Button 
        @btn-click="$emit('logout')"
        v-if="authorized"
      >
      Sign Out
      </Button>
      <Button 
        @btn-click="loginStore.setLoginOpen(true)"
        v-else
      >
      Sign In
      </Button>
    </nav>
  </header>
</template>

<script>
import Button from './Button';
import { computed } from 'vue';
import { usePostStore } from '@/store/usePostStore'; // Use curly braces even if there's only one thing exported
import { useLoginStore } from '@/store/useLoginStore';

export default {
  name: 'Header',
  props: {
    authorized: { type: Boolean, default: undefined, required: true }
  },
  components: {
    Button,
  },
  setup() {
    const store = usePostStore();
    const loginStore = useLoginStore();

    function routedToAbout() {
      if (this.$route.path === '/about') {
        return true
      } else {
        return false
      }
    };

    const showAddPostBtnText = computed(() => {
      return store.isAddPostOpen ? 'Close' : 'Add a Post'
    });

    const showAddPostBtnColor = computed(() => {
      return store.isAddPostOpen ? 'bg-gradient-to-r from-red-800 to-pink-600' : 'bg-gradient-to-r from-green-800 to-green-600'
    });

    return { store, loginStore, routedToAbout, showAddPostBtnText, showAddPostBtnColor }
  },
}
</script>

<style scoped>
a {
  margin-right: 20px;
  font-size: 1.5rem;
}
</style>
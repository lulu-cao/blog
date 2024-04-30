<script setup>
import Button from './Button.vue';
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/store/usePostStore'; // Use curly braces even if there's only one thing exported
import { useLoginStore } from '@/store/useLoginStore';

const props = defineProps({
  authorized: { type: Boolean, default: undefined, required: true }
});

const isDarkTheme = ref(true);
const theme = useTheme();
const changeTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  theme.global.name = theme.global.current.dark ? 'light' : 'dark'
};

const store = usePostStore();
const loginStore = useLoginStore();
const list = [
  { title: "Blog", to: "/"},
  { title: "Movie", to: "/movie"},
  { title: "TV", to: "/tv"},
  { title: "Restaurant", to: "/restaurant"},
  { title: "About", to: "/about"},
];

const routedToAbout = computed(()=>{
  const route = useRoute();

  if (route && route.path === '/about') {
    return true
  } else {
    return false
  }
});

const showAddPostBtnText = computed(() => {
  return store.isAddPostOpen ? 'Close' : 'Add a Post'
});
</script>

<template>
  <v-app-bar :elevation="2" image="https://picsum.photos/1920/1080?random">
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Blog</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="changeTheme">
      <v-icon :icon="isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-icon>
    </v-btn>

    <Button
      v-if="authorized"
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
  </v-app-bar>
  <!-- <header class="w-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 flex flex-wrap justify-between">
    <div class="flex flex-wrap my-2">
      <router-link v-for="route in list" :key="route.to" :to="route.to">{{ route.title }}</router-link>
      <router-link v-if="routedToAbout" to="/new">Add a Post</router-link>
    </div>
    <nav class="flex">
      <Button
        v-if="authorized"
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
  </header> -->
</template>

<style scoped>
a {
  margin-right: 20px;
  font-size: 1.5rem;
}
</style>

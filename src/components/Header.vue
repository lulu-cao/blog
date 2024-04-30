<script setup>
import Button from './Button.vue';
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/store/usePostStore';
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

    <v-app-bar-title>Symposia</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="changeTheme">
      <v-icon :icon="isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-icon>
    </v-btn>

    <Button
      @btn-click="$emit('logout')"
      v-if="authorized"
    >
    Sign Out
    </Button>
    <Button
      @click="$router.push('/login')"
      v-else
    >
    Sign In
    </Button>
  </v-app-bar>
</template>

<style scoped>
</style>

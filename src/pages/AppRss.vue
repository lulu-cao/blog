<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '@/store/useAuthStore';
import { computed } from 'vue';

const articles = ref([])
const authStore = useAuthStore();

const userUid = computed(() => {
  console.log(authStore.currentUserUid);
  authStore.currentUserUid
});

axios.get('https://blog-cms-django-abaff6e17c2a.herokuapp.com/api/featured-articles/')
  .then((response) => {
    articles.value = response.data
  })
  .catch((error) => {
    console.log(error)
  })
</script>

<template>
  <v-container>
    <v-row rows="3" justify="center">
      <v-col cols="6" v-for="article in articles" :key="article.id">
        <v-card height="500" class="overflow-hidden">
          <v-card-title>
            <a :href="article.link" target="_blank">{{ article.title }}</a>
          </v-card-title>
          <v-card-subtitle v-if="article.published">{{ article.published }}</v-card-subtitle>
          <v-card-text v-html="article.summary"></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>

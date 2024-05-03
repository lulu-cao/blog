<script setup>
import axios from 'axios'
import { ref } from 'vue'

const articles = ref([])

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
    <v-row rows="3">
      <v-col cols="6" v-for="article in articles" :key="article.id">
        <a :href="article.link" target="_blank">
          <v-card height="500" class="overflow-hidden">
            <v-card-title class="h-96">
              <div class="title-wrapper">{{ article.title }}</div>
            </v-card-title>
            <v-card-subtitle v-if="article.published">{{ article.published }}</v-card-subtitle>
            <v-card-text v-html="article.summary"></v-card-text>
            <div class="fade-effect"></div>
          </v-card>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.title-wrapper {
  white-space: normal;
  overflow-wrap: break-word;
  hyphens: auto;
}

.fade-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
}
</style>

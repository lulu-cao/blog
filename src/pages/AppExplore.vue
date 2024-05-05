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

const formatFeedDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options).replace(',', '');
}
</script>

<template>
  <v-container>
    <v-row rows="3">
      <v-col cols="12" md="6" v-for="article in articles" :key="article.id">
        <a :href="article.link" target="_blank">
          <v-card height="500" class="overflow-auto">
            <v-card-title class="h-96">
              <div class="title-wrapper">{{ article.title }}</div>
            </v-card-title>
            <v-card-subtitle v-if="article.published">{{ formatFeedDate(article.published) }}</v-card-subtitle>
            <v-card-text v-html="article.summary"></v-card-text>
          </v-card>
          <div class="fade-effect absolute bottom-0"></div>
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

/* TODO: add fade effect to bottom of cards */
.fade-effect {
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), black);
}

*::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
</style>

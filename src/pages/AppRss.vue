<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue'
import { useRssStore } from '@/store/useRssStore'
import { computed } from 'vue';

const rssStore = useRssStore();
const userFeeds = computed(() => {
  console.log(rssStore.userFeeds);
  console.log(rssStore.userUid);
  if (rssStore.userHasFeeds) {
    return rssStore.userFeeds
  }
});
</script>

<template>
  <v-container v-if="userFeeds && userFeeds.length !== 0">
    <div v-for="article in userFeeds" :key="article.id">
      <h1>{{ article.title }}</h1>
    </div>
    <v-row rows="3" justify="center">
      <v-col cols="6" v-for="article in userFeeds" :key="article.id">
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

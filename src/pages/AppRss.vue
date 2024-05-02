<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue'
import { useRssStore } from '@/store/useRssStore'
import { computed } from 'vue';
import axios from 'axios';

const rssStore = useRssStore();
const userFeeds = computed(() => {
  console.log(rssStore.userFeeds);
  console.log(rssStore.userUid);
  if (rssStore.userHasFeeds) {
    return rssStore.userFeeds
  }
});

const feedUrl = ref('');
const addFeed = () => {
  axios.post('https://blog-cms-django-abaff6e17c2a.herokuapp.com/api/cache-rss-feed/', {
    url: feedUrl.value,
    user: rssStore.userRecordId
  }).then(() => {
    rssStore.setUserFeeds(feedUrl.value)
  }).catch((error) => {
    console.log(error);
  });
}

const isAddingFeed = ref(false);
const isFiltering = ref(false);

const toggleAddFeed = () => {
  isAddingFeed.value = !isAddingFeed.value;
}

const toggleFilter = () => {
  isFiltering.value = !isFiltering.value;
}
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-btn @click="toggleAddFeed">Add a Feed</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="toggleFilter">Filter</v-btn>
    </v-toolbar>
    <v-card v-if="isAddingFeed">
      <v-form @submit.prevent="addFeed">
        <v-text-field
          v-model="feedUrl"
          label="Feed URL"
          outlined
          clearable
        ></v-text-field>
        <div class="flex justify-end">
          <v-btn type="submit">Add Feed</v-btn>
        </div>
      </v-form>
    </v-card>
    <!-- <v-card v-if="isFiltering">
      <v-form @submit.prevent="filterFeeds">
        <v-text-field
          v-model="title"
          label="Title"
          outlined
          clearable
        ></v-text-field>
        <v-textarea
          v-model="description"
          label="Description"
          outlined
          clearable
        ></v-textarea>
        <v-time-picker
          v-model="published"
          label="Published"
          outlined
          clearable
        ></v-time-picker>
        <v-btn type="submit">Filter</v-btn>
      </v-form>
    </v-card> -->
    <v-row rows="3">
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

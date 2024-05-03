<script setup>
import Alert from '@/components/Alert.vue';
import { onMounted, ref, computed } from 'vue'
import { useRssStore } from '@/store/useRssStore'
import axios from 'axios';

const rssStore = useRssStore();
const userFeeds = computed(() => rssStore.userFeeds);
const filteredFeeds = ref([]);
const filterForm = ref(null);
const isStartingFilters = ref(false);

onMounted(() => {
  filterFeeds.value = userFeeds.value;
});

const isAddingFeed = ref(false);
const isFiltering = ref(false);
const filtered = ref(false);

const toggleAddFeed = () => {
  if (isStartingFilters.value) {
    return
  }
  if (!isAddingFeed.value) {
    isFiltering.value = false;
  }
  isAddingFeed.value = !isAddingFeed.value;
}

const toggleFilter = () => {
  if (isFeedBeingSent.value) {
    return
  }
  if (!isFiltering.value) {
    isAddingFeed.value = false;
  }
  isFiltering.value = !isFiltering.value;
}

const feedUrl = ref('');
const isFeedBeingSent = ref(false);
const isFeedCacheSuccess = ref(false);
const isFeedCacheError = ref(false);
const feedCacheError = ref('');

const addFeed = () => {
  if (!feedUrl.value) {
    return
  }
  isFeedBeingSent.value = true;
  axios.post('https://blog-cms-django-abaff6e17c2a.herokuapp.com/api/cache-rss-feed/', {
    url: feedUrl.value,
    user: rssStore.userRecordId
  }).then(() => {
    isFeedBeingSent.value = false;
    isFeedCacheSuccess.value = true;
    rssStore.setUserFeeds(feedUrl.value);
    toggleAddFeed();

    setTimeout(() => {
      isFeedCacheSuccess.value = false;
    }, 5000);
  }).catch((error) => {
    feedCacheError.value = error.response.data.error;
    isFeedBeingSent.value = false;
    isFeedCacheError.value = true;

    setTimeout(() => {
      isFeedCacheError.value = false;
    }, 5000);
  });
}

const title = ref('');
const description = ref('');
const published = ref('');
const beforeAfter = ref('');
const year = ref('');
const month = ref('');
const day = ref('');
const hour = ref('');
const amPm = ref('');

const allOrNone = () => {
  const fields = [beforeAfter.value, year.value, month.value, day.value, hour.value, amPm.value];
  const anyFilled = fields.some(field => field !== '');
  const allFilled = fields.every(field => field !== '');
  return !anyFilled || allFilled;
}

const dateRules = [
  {beforeAfter: [
    v => !!v || allOrNone() || 'Before/After is required'
  ]},
  {year: [
    v => !!v || allOrNone() || 'Year is required',
    v => (/^\d{4}$/).test(v) || 'Year must be a 4-digit number'
  ]},
  {month: [
    v => !!v || allOrNone() || 'Month is required',
    v => v > 0 && v <= 12 || 'Month must be between 1 and 12'
  ]},
  {day: [
    v => !!v || allOrNone() || 'Day is required',
    v => v > 0 && v <= 31 || 'Day must be between 1 and 31'
  ]},
  {hour: [
    v => !!v || allOrNone() || 'Hour is required',
    v => v >= 0 && v < 24 || 'Hour must be between 0 and 23'
  ]},
  {amPm: [
    v => !!v || allOrNone() || 'AM/PM is required'
  ]}
]

const filterFeeds = () => {
  if (!filterForm.value.validate()) {
    return
  }
  if (isStartingFilters.value) {
    return
  }
  isStartingFilters.value = true;
  console.log(title.value);
  console.log(description.value);
  console.log(published.value);
  if (!title.value && !description.value && !published.value) {
    isStartingFilters.value = false;
    filtered.value = false;
    return
  }
  filteredFeeds.value = rssStore.userFeeds.filter((feed) => {
    if (title.value) {
      console.log(feed.title);
      return feed.title.includes(title.value)
    }
    if (description.value) {
      return feed.description.includes(description.value)
    }
    if (published.value) {
      return feed.published.includes(published.value)
    }
  });
  isStartingFilters.value = false;
  filtered.value = true;
}

// TODO: replace manual date fields with v-date-picker
// const date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
// const menu = ref(false);
</script>

<template>
  <v-container>
    <Alert
      v-if="isFeedCacheError"
      title="Failure"
      :text="feedCacheError"
      type="error"
      icon="$error"
    />
    <Alert
      v-if="isFeedCacheSuccess"
      title="Success"
      text="Your feed url has been added successfully."
      type="success"
      icon="$success"
    />
    <v-toolbar
      dark
      prominent
    >
      <v-btn @click.prevent="toggleAddFeed">Add a Feed</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="toggleFilter">Filter</v-btn>
    </v-toolbar>
    <v-card v-if="isAddingFeed" rounded="0">
      <v-form
        @submit.prevent="addFeed"
        fast-fail
      >
        <v-text-field
          v-model="feedUrl"
          label="Feed URL"
          :rules="[() => !!feedUrl || 'Required']"
          outlined
          clearable
        ></v-text-field>
        <div class="flex justify-end">
          <v-btn type="submit">
            <p v-if="!isFeedBeingSent">Add Feed</p>
            <v-progress-circular
              v-if="isFeedBeingSent"
              :size="25"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </div>
      </v-form>
    </v-card>
    <v-card v-if="isFiltering">
      <v-form
        @submit.prevent="filterFeeds"
        fast-fail
        ref="filterForm"
      >
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
        <v-row class="flex">
          <v-select
            v-model="beforeAfter"
            :items="['Before', 'After']"
            label="Published"
            outlined
            clearable
            :rules="dateRules.beforeAfter"
          ></v-select>
          <v-text-field
            v-model="year"
            label="YYYY"
            outlined
            clearable
            :rules="dateRules.year"
          ></v-text-field>
          <v-text-field
            v-model="month"
            label="MM"
            outlined
            clearable
            :rules="dateRules.month"
          ></v-text-field>
          <v-text-field
            v-model="day"
            label="DD"
            outlined
            clearable
            :rules="dateRules.day"
          ></v-text-field>
          <v-text-field
            v-model="hour"
            label="HH"
            outlined
            clearable
            :rules="dateRules.hour"
          ></v-text-field>
          <v-select
            v-model="amPm"
            :items="['AM', 'PM']"
            label="AM"
            outlined
            clearable
            :rules="dateRules.amPm"
          ></v-select>
        </v-row>
        <!-- <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu> -->
        <div class="flex justify-end">
          <v-btn type="submit">
            <p v-if="!isStartingFilters">Filter</p>
            <v-progress-circular
              v-if="isStartingFilters"
              :size="25"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </div>
      </v-form>
    </v-card>
    <v-row rows="3" v-if="!filtered">
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
    <v-row rows="3" v-if="filtered">
      <v-col cols="6" v-for="article in filteredFeeds" :key="article.id">
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

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
const isFilterSuccessAlertOpen = ref(false);

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
  feedUrl.value = '';
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

const dateRules = {
  year: v => (/^\d{4}$/).test(v) || allOrNone() || 'Year must be a 4-digit number',
  month: v => v > 0 && v <= 12 || allOrNone() || 'Month must be between 1 and 12',
  day: v => v > 0 && v <= 31 || allOrNone() || 'Day must be between 1 and 31',
  hour: v => v >= 0 && v < 24 || allOrNone() || 'Hour must be between 0 and 23',
  allOrNone: allOrNone() || 'Required'
}

const formatDate = () => {
  if (!year.value && !month.value && !day.value && !hour.value) {
    return '';
  }

  if (!year.value) year.value = new Date().getFullYear();
  if (!month.value) month.value = new Date().getMonth() + 1;
  if (!day.value) day.value = new Date().getDate();
  if (!hour.value) hour.value = new Date().getHours();

  let hourAdjusted = parseInt(hour.value);
  if (!amPm.value) {
    amPm.value = 'AM';
  }

  if (amPm.value === 'PM' && hourAdjusted < 12) {
    hourAdjusted += 12;
  }
  if (amPm.value === 'AM' && hourAdjusted === 12) {
    hourAdjusted = 0;
  }

  const paddedMonth = String(month.value).padStart(2, '0');
  const paddedDay = String(day.value).padStart(2, '0');
  const paddedHour = String(hourAdjusted).padStart(2, '0');

  return `${year.value}-${paddedMonth}-${paddedDay}T${paddedHour}:04:00.001000Z`;
}

const filterFeeds = () => {
  if (!filterForm.value.validate()) {
    return
  }
  if (isStartingFilters.value) {
    return
  }
  published.value = formatDate();
  isStartingFilters.value = true;
  if (!title.value && !description.value && !published.value) {
    isStartingFilters.value = false;
    filtered.value = false;
    return
  }

  filteredFeeds.value = userFeeds.value.filter((feed) => {
    let match = true; // Start assuming a feed matches

    if (title.value && feed.title) {
      match = match && feed.title.toLowerCase().includes(title.value.toLowerCase());
    }
    if (description.value && feed.description) {
      match = match && feed.description.toLowerCase().includes(description.value.toLowerCase());
    }
    if (published.value && feed.published) {
      const feedDate = new Date(feed.published);
      const userDate = new Date(published.value);

      if (beforeAfter.value === 'before') {
        match = match && feedDate < userDate;
      } else if (beforeAfter.value === 'after') {
        match = match && feedDate > userDate;
      } else {
        match = match && feedDate.toISOString().split('T')[0] === userDate.toISOString().split('T')[0];
      }
    }

    return match;
  });

  isStartingFilters.value = false;

  title.value = '';
  description.value = '';
  published.value = '';
  beforeAfter.value = '';
  year.value = '';
  month.value = '';
  day.value = '';
  hour.value = '';
  amPm.value = '';

  filtered.value = true;
  isFilterSuccessAlertOpen.value = true;
  setTimeout(() => {
    isFilterSuccessAlertOpen.value = false;
  }, 5000);
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
    <Alert
      v-if="isFilterSuccessAlertOpen"
      title="Success"
      text="Your feeds have been filtered successfully."
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
    <v-card v-if="isAddingFeed" rounded="0" class="mb-6">
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
    <v-card v-if="isFiltering" class="mb-6">
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
            :rules="[dateRules.allOrNone]"
          ></v-select>
          <v-text-field
            v-model="year"
            label="YYYY"
            outlined
            clearable
            :rules="[dateRules.year]"
          ></v-text-field>
          <v-text-field
            v-model="month"
            label="MM"
            outlined
            clearable
            :rules="[dateRules.month]"
          ></v-text-field>
          <v-text-field
            v-model="day"
            label="DD"
            outlined
            clearable
            :rules="[dateRules.day]"
          ></v-text-field>
          <v-text-field
            v-model="hour"
            label="HH"
            outlined
            clearable
            :rules="[dateRules.hour]"
          ></v-text-field>
          <v-select
            v-model="amPm"
            :items="['AM', 'PM']"
            label="AM"
            outlined
            clearable
            :rules="[dateRules.allOrNone]"
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
        <v-card height="500" class="overflow-auto">
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
        <v-card height="500" class="overflow-auto">
          <v-card-title>
            <a :href="article.link" target="_blank">{{ article.title }}</a>
          </v-card-title>
          <v-card-subtitle v-if="article.published">{{ article.published }}</v-card-subtitle>
          <v-card-text v-html="article.summary"></v-card-text>
          <div class="fade-effect"></div>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="filteredFeeds.length === 0">
        <v-card>
          <v-card-title>No feeds found</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fade-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
}

*::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
</style>

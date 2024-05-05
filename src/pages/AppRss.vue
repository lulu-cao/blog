<script setup>
import { useAuthStore } from '@/store/useAuthStore';
import { onMounted, ref, computed } from 'vue'
import Alert from '@/components/Alert.vue';
import axios from '@/plugins/axios';

const authStore = useAuthStore();
const userFeeds = computed(() => {
  if (authStore && authStore.userFeeds) {
    return authStore.userFeeds;
  }
});
const filteredFeeds = ref([]);

onMounted(() => {
  filterFeeds.value = userFeeds.value;
});

const isFeedFormOpen = ref(false);
const newFeedUrl = ref('');
const isFeedBeingSent = ref(false);
const isFeedCacheSuccessAlertOpen = ref(false);
const isFeedCacheErrorAlertOpen = ref(false);
const feedCacheErrorText = ref('');

const addFeed = () => {
  if (!newFeedUrl.value) return
  if (isFeedBeingSent.value) return

  isFeedBeingSent.value = true;

  axios.post('cache-rss-feed/', {
    url: newFeedUrl.value,
    user: authStore.userDjangoId,
  }).then(() => {
    isFeedCacheSuccessAlertOpen.value = true;
    toggleAddFeed();
    setTimeout(() => {
      isFeedBeingSent.value = false;
      window.location.reload();
    }, 3500);
  }).catch((error) => {
    feedCacheErrorText.value = error.response.data.error;
    isFeedBeingSent.value = false;
    isFeedCacheErrorAlertOpen.value = true;

    setTimeout(() => {
      isFeedCacheErrorAlertOpen.value = false;
    }, 5000);
  });
}

const toggleAddFeed = () => {
  if (isStartingFilters.value) return
  if (!isFeedFormOpen.value) {
    isFilterFormOpen.value = false;
  }
  isFeedFormOpen.value = !isFeedFormOpen.value;
}

const toggleFilter = () => {
  if (isFeedBeingSent.value) return
  if (!isFilterFormOpen.value) {
    isFeedFormOpen.value = false;
  }
  isFilterFormOpen.value = !isFilterFormOpen.value;
}

const filterForm = ref(null);
const isFilterFormOpen = ref(false);
const isStartingFilters = ref(false);
const isFiltered = ref(false);
const isFilterSuccessAlertOpen = ref(false);

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

const formatFilterDate = () => {
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

const formatFeedDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options).replace(',', '');
}

const filterFeeds = () => {
  if (!filterForm.value.validate()) {
    return
  }
  if (isStartingFilters.value) {
    return
  }
  published.value = formatFilterDate();
  isStartingFilters.value = true;
  if (!title.value && !description.value && !published.value) {
    isStartingFilters.value = false;
    isFiltered.value = false;
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

  isFiltered.value = true;
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
      v-if="isFeedCacheErrorAlertOpen"
      title="Failure"
      :text="feedCacheErrorText"
      type="error"
      icon="$error"
    />
    <Alert
      v-if="isFeedCacheSuccessAlertOpen"
      title="Success"
      text="Your feed url has been added successfully. We will reload the page to apply changes."
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
    <v-card v-if="isFeedFormOpen" rounded="0" class="mb-6">
      <v-form
        @submit.prevent="addFeed"
        fast-fail
      >
        <v-text-field
          v-model="newFeedUrl"
          label="Feed URL"
          :rules="[() => !!newFeedUrl || 'Required']"
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
    <v-card v-if="isFilterFormOpen" class="mb-6">
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
        <!-- TODO: replace manual date fields with v-date-picker -->
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
    <v-row rows="3" v-if="!isFiltered">
      <v-col cols="12" md="6" v-for="article in userFeeds" :key="article.id">
        <v-card height="500" class="overflow-auto">
          <v-card-title class="title-wrapper">
            <a :href="article.link" target="_blank">{{ article.title }}</a>
          </v-card-title>
          <v-card-subtitle v-if="article.published">{{ formatFeedDate(article.published) }}</v-card-subtitle>
          <v-card-text v-if="article.image">
            <v-img :src="article.image" height="200"></v-img>
          </v-card-text>
          <v-card-text v-html="article.summary"></v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row rows="3" v-if="isFiltered">
      <v-col cols="12" md="6" v-for="article in filteredFeeds" :key="article.id">
        <v-card height="500" class="overflow-auto">
          <v-card-title>
            <a :href="article.link" target="_blank">{{ article.title }}</a>
          </v-card-title>
          <v-card-subtitle v-if="article.published">{{ formatFeedDate(article.published) }}</v-card-subtitle>
          <v-card-text v-html="article.summary"></v-card-text>
          <!-- <div class="fade-effect"></div> -->
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
.title-wrapper {
  white-space: normal;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* TODO: add fade effect to bottom of cards */
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

import { defineStore } from "pinia";
import { useAuthStore } from "./useAuthStore";
import { ref } from 'vue';
import axios from '@/plugins/axios';

export const useRssStore = defineStore('rss', () => {
  const userUid = ref(null);
  const userRecordId = ref(null)
  const userFeeds = ref([])
  const userHasFeeds = ref(false)
  const authStore = useAuthStore()

  console.log('authStore.authenticated');
  console.log(authStore?.authenticated);
  if (localStorage.getItem('user') !== undefined) {
    console.log('localStorage.getItem(user)');
    console.log(localStorage.getItem('user'));
    userUid.value = JSON.parse(localStorage.getItem('user'))
  }
  console.log(userUid.value);

  axios.get('users/')
    .then((response) => {
      userRecordId.value = response.data.filter((user) => user.uid === userUid.value)[0].id;
      axios.get('rss-feeds/?user=' + userRecordId.value)
        .then((response) => {
          if (response.data && response.data.length !== 0) {
            response.data.forEach((feed) => {
              feed.rss_cache.forEach((item) => {
                userFeeds.value.push(item)
              })
            })
            if (userFeeds.value && userFeeds.value.length !== 0) {
              userHasFeeds.value = true
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })

    const clearUserRecord = () => {
      localStorage.removeItem('user');
      userUid.value = null
      userRecordId.value = null
    }

    const getUserRecordId = () => {
      userUid.value = JSON.parse(localStorage.getItem('user'))

      if (!userUid.value) return;

      axios.get('users/')
        .then((response) => {
          userRecordId.value = response.data.filter((user) => user.uid === userUid.value)[0].id;
        })
        .catch((error) => {
          console.log(error)
        })

      return userRecordId.value
    }

    const setUserFeeds = (url) => {
      if (!userRecordId.value) return;
      userFeeds.value = []
      axios.get(`rss-feeds/?url=${url}&user=${userRecordId.value}`)
        .then((response) => {
          if (response.data && response.data.length !== 0) {
            response.data.forEach((feed) => {
              feed.rss_cache.forEach((item) => {
                userFeeds.value.push(item)
              })
            })
            if (userFeeds.value && userFeeds.value.length !== 0) {
              userHasFeeds.value = true
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

  return { userUid, userRecordId, userFeeds, userHasFeeds, getUserRecordId, setUserFeeds, clearUserRecord }
});

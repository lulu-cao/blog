import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from 'axios'

export const useRssStore = defineStore('rss', () => {
  const userUid = ref(null);
  const userRecordId = ref(null)
  const userFeeds = ref([])
  const userHasFeeds = ref(false)

  userUid.value = JSON.parse(localStorage.getItem('user'))
  console.log(userUid.value);

  axios.get('https://blog-cms-django-abaff6e17c2a.herokuapp.com/api/users/')
    .then((response) => {
      userRecordId.value = response.data.filter((user) => user.uid === userUid.value)[0].id;
      axios.get('https://blog-cms-django-abaff6e17c2a.herokuapp.com/api/rss-feeds/?user=' + userRecordId.value)
        .then((response) => {
          if (response.data && response.data.length !== 0) {
            console.log('response.data');
            console.log(response.data);

            response.data.forEach((feed) => {
              console.log('feed.rss_cache');
              console.log(feed.rss_cache);
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

    const setUserFeeds = (url) => {
      axios.get(`https://blog-cms-django-abaff6e17c2a.herokuapp.com/api/rss-feeds/?url=${url}&user=${userRecordId.value}`)
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

  return { userUid, userRecordId, userFeeds, userHasFeeds, setUserFeeds }
});

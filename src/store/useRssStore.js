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
            response.data.forEach((feed) => {
              userFeeds.value.push(feed.rss_cache)
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

  return { userUid, userRecordId, userFeeds, userHasFeeds }
});

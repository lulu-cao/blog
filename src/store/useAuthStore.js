import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from '@/plugins/axios';

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false);
  const userUid = ref(null);
  const userDjangoId = ref(null);
  const userFeeds = ref([]);

  const addAuthentication = (uid, isSigningup) => {
    localStorage.setItem('user', uid);
    userUid.value = uid;
    if (isSigningup) {
      axios.post('users/', {
        uid: uid,
      }).then((response) => {
        console.log("user created in django");
        console.log(response.data);
      }).catch((error) => {
        console.log("error creating user in django");
        console.error(error);
      });
    };

    getUserDjangoId();

    authenticated.value = true
  };

  const cancelAuthentication = () => {
    localStorage.removeItem('user');
    authenticated.value = false
    userUid.value = null
    userDjangoId.value = null
    userFeeds.value = []
  };

  const getUserFeeds = () => {
    const feedsArray = [];
    axios.get('rss-feeds/?user=' + userDjangoId.value)
      .then((response) => {
        if (response.data && response.data.length !== 0) {
          response.data.forEach((feed) => {
            feed.rss_cache.forEach((item) => {
              feedsArray.push(item)
            })
          })
          userFeeds.value = feedsArray;
          return feedsArray
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const getUserDjangoId = () => {
    if (userUid.value) {
      axios.get('users/')
        .then((response) => {
          const filteredUser = response.data.filter(user => user.uid === userUid.value);
          if (filteredUser.length !== 0) {
            userDjangoId.value = filteredUser[0].id;
            console.log("user " + userDjangoId.value + " found in django");
            getUserFeeds();
            return userDjangoId.value
          } else {
            console.warn("user not found in django");
          }
        }).catch((error) => {
          console.error(error)
        });
    }
  }

  if (localStorage.getItem('user')) {
    authenticated.value = true;
    console.log("getting userUid from local storage");
    userUid.value = localStorage.getItem('user');
    getUserDjangoId();
  }

  return { authenticated, userUid, userDjangoId, userFeeds, addAuthentication, cancelAuthentication, getUserFeeds }
});

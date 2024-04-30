<script setup>
import axios from 'axios'

axios.get('https://medium.com/feed/@lcao_5526')
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
</script>

<template>
  <v-card color="teal-lighten-3">
    <v-card-title>w Blogging</v-card-title>
    <v-card-text>
      <img src="https://source.unsplash.com/1600x900/?blog" alt="Home" />
      A place to write your w blogs!
    </v-card-text>
  </v-card>
  <v-card color="teal-lighten-3">
    <v-card-title>One-Stop Reading</v-card-title>
    <v-card-text>
      <img src="https://source.unsplash.com/1600x900/?read" alt="Home" />
      A place to read your favorate RSS feeds!
    </v-card-text>
  </v-card>
</template>

<style scoped>
a {
  text-align: center;
}
</style>

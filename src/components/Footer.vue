<script setup>
const links = ['Home', 'About', 'Services', 'Contact']
</script>

<template>
  <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Lulu Cao</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
</style>

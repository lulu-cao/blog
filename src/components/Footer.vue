<script setup>
const links = [{
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/lulu-cao/'
  }, {
    name: 'GitHub',
    link: 'https://github.com/lulu-cao',
  }, {
    name: 'Medium',
    link: 'https://medium.com/@lcao_5526',
  }, {
    name: 'Resume',
    link: 'https://rxresu.me/caolulu000/resume-cao-lulu'
  }]
</script>

<template>
  <v-footer class="bg-teal sm:max-h-40 md:max-h-32" app>
    <v-row justify="center" no-gutters>
      <v-col class="text-center" cols="12">
        <v-btn
          v-for="link in links"
          :key="link"
          class="mx-2"
          color="white"
          rounded="xl"
          variant="text"
        >
          <a :href="link.link">{{ link.name }}</a>
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} @ <strong>Lulu Cao</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
</style>

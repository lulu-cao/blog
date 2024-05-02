<template>
  <!-- Binding the value of "authorized" to the variable "authorized" and pass it to the child as a prop -->
  <v-app>
    <Header />
    <v-navigation-drawer>
      <v-list>
        <v-list-item v-for="route in list" :key="route.to">
          <router-link :to="route.to">{{ route.title }}</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition>
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const list = [
  { title: "Home", to: "/" },
  { title: "Explore", to: "/explore" },
  { title: "RSS", to: "/rss" },
  { title: "Account", to: "/account" },
];
</script>

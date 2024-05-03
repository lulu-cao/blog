<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const list = [
  { title: "Home", to: "/" },
  { title: "Explore", to: "/explore" },
  { title: "RSS", to: "/rss" },
];

const isDrawingOpen = ref(true);
const toggleNavBar = () => {
  isDrawingOpen.value = !isDrawingOpen.value;
};

const windowWidth = ref(window.innerWidth);
const isPermanent = ref(windowWidth.value >= 960);

function updateWidth() {
  windowWidth.value = window.innerWidth;
  isPermanent.value = windowWidth.value >= 960;
}

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

<template>
  <v-app>
    <Header @toggle-nav-drawer="toggleNavBar" />
    <v-navigation-drawer
      v-model="isDrawingOpen"
      app
      :permanent="isPermanent"
    >
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



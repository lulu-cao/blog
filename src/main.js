import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      variant: 'outlined',
    },
    VTextField: {
      outlined: true,
    },
  },
  theme: {
    defaultTheme: 'dark',
  }
})

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')

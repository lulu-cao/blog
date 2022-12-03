import { createRouter, createWebHistory } from 'vue-router'

// 1. Define route components.
import Home from "../components/Home"
import About from "../components/About"

// 2. Define some routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

// 3. Create the router instance and pass the `routes` option
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
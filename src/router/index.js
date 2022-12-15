import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/useAuthStore'

// 1. Define route components.
import Home from "../pages/Home"
import About from "../pages/About"
import AddPost from "../pages/AddPost"

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
  {
    path: '/new',
    name: 'AddPost',
    component: AddPost,
    beforeEnter: (_, __, next) => {
      if ( useAuthStore().authenticated === false ) {
        next("/")
      } else {
        next()
      }
    }
  }
]

// 3. Create the router instance and pass the `routes` option
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/useAuthStore'

// 1. Define route components.
import Home from "../pages/Home"
import Movie from "../pages/Movie"
import Tv from "../pages/Tv"
import Restaurant from "../pages/Restaurant"
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
    path: '/movie',
    name: 'Movie',
    component: Movie,
    meta: { middleware: "auth" }
  },
  {
    path: '/tv',
    name: 'TV',
    component: Tv,
    meta: { middleware: "auth" }
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    component: Restaurant,
    meta: { middleware: "auth" }
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
});

router.beforeEach((to,_,next)=>{
  if (to.meta.middleware) {
    const middleware = require(`../middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(useAuthStore(), next);
    } else {
      next();
    }
  } else {
    next()
  }
})

export default router
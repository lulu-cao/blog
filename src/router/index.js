import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/useAuthStore'

import AppBlog from '@/pages/AppBlog.vue'
import AppRss from '@/pages/AppRss.vue'
import AppAccount from '@/pages/AppAccount.vue'
import AppExplore from '@/pages/AppExplore.vue'
import AppHome from '@/pages/AppHome.vue'
import SigninSignup from '@/pages/SigninSignup.vue'
import AddPost from "@/pages/AddPost.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppHome,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: AppBlog,
    meta: { middleware: "auth" }
  },
  {
    path: '/rss',
    name: 'RSS',
    component: AppRss,
    meta: { middleware: "auth" }
  },
  {
    path: '/account',
    name: 'AppAccount',
    component: AppAccount,
    meta: { middleware: "auth" }
  },
  {
    path: '/explore',
    name: 'AppExplore',
    component: AppExplore,
  },
  {
    path: '/login',
    name: 'Login',
    component: SigninSignup,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: SigninSignup,
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to,_,next)=>{
  if (to.meta.middleware) {
    const middleware = await import (`../middleware/${to.meta.middleware}.js`);
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

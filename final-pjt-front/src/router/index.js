import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'
// import HomeView from '../views/HomeView.vue'
// import LoginView from '../views/LoginView.vue'
// import SignupView from '../views/SignupView.vue'

Vue.use(VueRouter)

// const isLoggedIn = store.getters.isLogin

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    // beforeEnter(to, from, next) {
    //   console.log(to, from, next)
    //   console.log(store)
    //   if (isLoggedIn) {
    //     next({ name: 'home' })
    //   } else {
    //     next({ name: 'login'})
    //   }
    // }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/first-addMovie',
    name: 'first-addMovie',
    component: () => import('../views/FirstAddMovieView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },
  {
    path: '/movie/:id',
    name: 'movieDetail',
    component: () => import('../views/MovieDetail.vue')
  },
  // {
  //   path: '/browse',
  //   name: 'browse',
  //   component: () => import('../views/BrowseView.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

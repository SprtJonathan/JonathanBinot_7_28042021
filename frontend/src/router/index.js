import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('../views/Profile.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:userId/posts/',
    name: 'UserPostsList',
    component: () => import('../components/Post/UserPostsList.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'UsersList',
    component: () => import('../components/User/UsersList.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post/:postId/edit',
    name: 'EditPost',
    component: () => import('../components/Post/EditPost.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/comment/:commentId/edit',
    name: 'EditComment',
    component: () => import('../components/Comment/EditComment.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['user/isUserConnected']) {
      next()
      return
    }
    next({ path: '/user' })
  } else {
    next()
  }
})


export default router

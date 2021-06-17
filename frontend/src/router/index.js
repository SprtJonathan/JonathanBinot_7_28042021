import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // Route de la page d'accueil
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userId', // Route de la page de profil
    name: 'user',
    component: () => import('../views/Profile.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:userId/posts/', // Route de la page comprenant toutes les publications d'un utilisateur
    name: 'UserPostsList',
    component: () => import('../components/Post/UserPostsList.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users', // Route de la page de la liste des utilisateurs (accessible uniquement pour les admins)
    name: 'UsersList',
    component: () => import('../components/User/UsersList.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post/:postId/edit', // Route de la page de modification de posts
    name: 'EditPost',
    component: () => import('../components/Post/EditPost.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/comment/:commentId/edit', // Route de la page de modification de commentaires
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

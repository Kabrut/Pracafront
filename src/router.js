import Vue from 'vue'
import Router from 'vue-router'
import Home from './sites/Home.vue'
import store from './store/store'
Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/Login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: () => import('./sites/Login.vue')
    },
    {
      path: '/Register',
      name: 'register',
      component: () => import('./sites/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home,
     // beforeEnter: ifAuthenticated,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./sites/About.vue'),
     // beforeEnter: ifAuthenticated,
    },
    {
      path: '/grades',
      name: 'grades',
      component: () => import(/* webpackChunkName: "grades" */ './sites/Grades.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/Mail',
      name: 'mail',
      component: () => import(/* webpackChunkName: "mail" */ './sites/Mail.vue'),
     // beforeEnter: ifAuthenticated,
    },
    {
      path: '/Tasks',
      name: 'tasks',
      component: () => import(/* webpackChunkName: "tasks" */ './sites/Tasks.vue'),
     // beforeEnter: ifAuthenticated,
    },{
      path: '/Posts',
      name: 'posts',
      component: () => import(/* webpackChunkName: "posts" */ './sites/Posts.vue'),
     // beforeEnter: ifAuthenticated,
    },{
      path: '/UserPanel',
      name: 'userPanel',
      component: () => import(/* webpackChunkName: "posts" */ './sites/UserPanel.vue'),
     // beforeEnter: ifAuthenticated,
    },
      { path: '*', redirect: '/' }
      ]
    });

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/Login', '/Register'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/Login');
//   }
//   next();
// })
import Vue from 'vue'
import Router from 'vue-router'
import Home from './sites/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./sites/About.vue')
    },
    {
      path: '/grades',
      name: 'grades',
      component: () => import(/* webpackChunkName: "grades" */ './sites/Grades.vue')
    },
    {
      path: '/Mail',
      name: 'mail',
      component: () => import(/* webpackChunkName: "mail" */ './sites/Mail.vue')
    },
    {
      path: '/Tasks',
      name: 'tasks',
      component: () => import(/* webpackChunkName: "tasks" */ './sites/Tasks.vue')
    },{
      path: '/Posts',
      name: 'posts',
      component: () => import(/* webpackChunkName: "posts" */ './sites/Posts.vue')
    },{
      path: '/UserPanel',
      name: 'userpanel',
      component: () => import(/* webpackChunkName: "posts" */ './sites/UserPanel.vue')
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
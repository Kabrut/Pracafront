import Vue from 'vue'
import Router from 'vue-router'
import Home from './sites/Home.vue'
import store from './store/store'
import Login from './sites/Login.vue'
import Register from'./sites/Register.vue'
import About from'./sites/About.vue'
import Grades from  './sites/Grades.vue'
import Mail from './sites/Mail.vue'
import Tasks from './sites/Tasks.vue'
import Posts from './sites/Posts.vue'
import UserPanel from './sites/UserPanel.vue'

Vue.use(Router)




let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: Login

    },
    {
      path: '/Register',
      name: 'register',
      component: Register

    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }

    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/grades',
      name: 'grades',
      component: Grades,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Mail',
      name: 'mail',
      component: Mail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Tasks',
      name: 'tasks',
      component: Tasks,
      meta: {
        requiresAuth: true
      }

    },{
      path: '/Posts',
      name: 'posts',
      component: Posts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/UserPanel',
      name: 'userPanel',
      component: UserPanel,
      meta: {
        requiresAuth: true
      }

    },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn && store.state.status !== "") {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
// new Router({
//   mode: 'history',
//     routes: [
//   {
//     path: '/Login',
//     name: 'login',
//     component: Login
//
//   },
//   {
//     path: '/Register',
//     name: 'register',
//     component: Register
//
//   },
//   {
//     path: '/',
//     name: 'home',
//     component: Home,
//     meta: {
//       requiresAuth: true
//     }
//
//   },
//   {
//     path: '/about',
//     name: 'about',
//     component: About,
//     meta: {
//       requiresAuth: true
//     }
//   },
//   {
//     path: '/grades',
//     name: 'grades',
//     component: Grades,
//     meta: {
//       requiresAuth: true
//     }
//   },
//   {
//     path: '/Mail',
//     name: 'mail',
//     component: Mail,
//     meta: {
//       requiresAuth: true
//     }
//   },
//   {
//     path: '/Tasks',
//     name: 'tasks',
//     component: Tasks,
//     meta: {
//       requiresAuth: true
//     }
//
//   },{
//     path: '/Posts',
//     name: 'posts',
//     component: Posts,
//     meta: {
//       requiresAuth: true
//     }
//   },
//       {
//     path: '/UserPanel',
//     name: 'userPanel',
//     component: UserPanel,
//     meta: {
//       requiresAuth: true
//     }
//
//   },
//   { path: '*', redirect: '/' }
// ]
//     });

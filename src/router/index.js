import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import firebase from '../firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
    // {
    //   path: '/status',
    //   name: 'Status',
    //   component: HelloWorld,
    //   meta: {
    //     requiresAuth: true
    //   }
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if (firebase.GetCurrentUser() === undefined) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;

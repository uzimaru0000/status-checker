import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app';
import 'firebase/auth';
import HelloWorld from '@/components/HelloWorld'
import StatusItem from '@/components/status/StatusItem'
import Login from '@/components/Auth/Login'
import SignUp from '@/components/Auth/SignUp'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/statusitem',
      name: 'StatusItem',
      component: StatusItem,
      props: {
        user: {
          name: 'Taro Yamada',
          motivation: 100,
          comment: 'コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント',
          imageURL: 'https://bulma.io/images/placeholders/96x96.png'
        }
      }
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (firebase.auth().currentUser === undefined) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

import Vue from 'vue'
import Router from 'vue-router'
import firebase from '../firebase';
import HelloWorld from '@/components/HelloWorld'
import StatusItem from '@/components/status/StatusItem'
import Login from '@/components/Auth/Login'
import SignUp from '@/components/Auth/SignUp'
import Group from '@/components/Group/Group'
import Select from '@/components/Group/Select'
import Create from '@/components/Group/Create'
import Join from '@/components/Group/Join'


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
    },
    {
      path: '/group',
      name: 'Group',
      component: Group,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'Select',
          component: Select
        },
        {
          path: 'join',
          name: 'Join',
          component: Join
        },
        {
          path: 'create',
          name: 'Create',
          component: Create
        }
      ]
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
    if (firebase.IsAuth()) {
      next();
      return;
    }

    const unsubs = firebase.OnAuthStateChanged(user => {
      if (user) {
        next();
        unsubs();
      } else {
        next({ path: '/login' });
        unsubs();
      }
    });
  } else {
    next();
  }
});

export default router;

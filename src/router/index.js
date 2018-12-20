import Vue from 'vue'
import Router from 'vue-router'
import firebase from '../firebase';
import HelloWorld from '@/components/HelloWorld'
import StatusItem from '@/components/Status/StatusItem'
import Edit from '@/components/Status/Edit'
import Login from '@/components/Auth/Login'
import SignUp from '@/components/Auth/SignUp'
import Group from '@/components/Group/Group'
import Select from '@/components/Group/Select'
import Create from '@/components/Group/Create'
import Join from '@/components/Group/Join'
import NotFound from '@/components/NotFound'


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
      component: StatusItem
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
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
      path: '*',
      name: '404NotFound',
      component: NotFound
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

import Vue from 'vue'
import Router from 'vue-router'
import firebase from '../firebase';
import Edit from '@/components/Status/Edit'
import Login from '@/components/Auth/Login'
import Group from '@/components/Group/Group'
import Select from '@/components/Group/Select'
import Create from '@/components/Group/Create'
import Join from '@/components/Group/Join'
import Status from '@/components/Status/Status'
import NotFound from '@/components/NotFound'
import HomePage from '@/components/HomePage'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'Login',
      component: Login
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
        },
        {
          path: ':id',
          name: 'Status',
          component: Status,
          props: true
        }
      ]
    }
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

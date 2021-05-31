import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Questions from './views/Questions.vue';
import CreateQuestion from './views/CreateQuestion.vue';
import EditQuestion from './views/EditQuestion.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'questions',
      component: Questions,
      meta: { guest: true },
    },
    {
      path: '/questions/:questionId/edit',
      name: 'questions/edit',
      component: EditQuestion,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { guest: true },
    },
    {
      path: '/new-question',
      name: 'newQuestion',
      component: CreateQuestion,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }

    next('/login');
  } else {
    next();
  }
});

export default router;

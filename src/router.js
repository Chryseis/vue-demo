import Vue from 'vue';
import VueRouter from 'vue-router';

import dialog from '@/pages/dialog';
import form from '@/pages/form';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dialog',
    component: dialog
  },
  {
    path: '/form',
    name: 'form',
    component: form
  }
];

export default new VueRouter({ routes });

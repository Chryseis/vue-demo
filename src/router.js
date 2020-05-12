import Vue from 'vue';
import VueRouter from 'vue-router';

import dialog from '@/pages/dialog';
import form from '@/pages/form';
import list from '@/pages/list';

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
  },
  {
    path: '/list',
    name: 'list',
    component: list
  }
];

export default new VueRouter({ routes });

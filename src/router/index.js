import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import store from "../utils/storage";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: () => import('../views/pages/Home.vue')
      // },
      // {
      //   path: '/peoplelearner',
      //   name: 'peoplelearner',
      //   component: () => import('../views/pages/PeopleLearner.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },


]


var ms = store.getMenus();
for(var m in ms) routes[0].children.push(ms[m]);

console.info('routes',routes);

const router = new VueRouter({
  routes
})

export default router

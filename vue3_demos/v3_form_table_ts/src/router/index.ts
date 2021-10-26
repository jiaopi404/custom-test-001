import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [{
      path: '',
      name: 'AboutFormTable',
      component: () => import(/* webpackChunkName: "about" */ '../components/about/CusFormTable.vue')
    }, {
      path: 'about-form',
      name: 'AboutForm',
      component: () => import(/* webpackChunkName: "about" */ '../components/about/CusAboutForm.vue')
    }, {
      path: 'about-table',
      name: 'AboutTable',
      component: () => import(/* webpackChunkName: "about" */ '../components/about/CusAboutTable.vue')
    }, {
      path: 'about-form-2',
      name: 'AboutForm2',
      component: () => import(/* webpackChunkName: "about" */ '../components/about/CusAboutForm2.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Calendar from '@/components/Calendar'
import Boardroom from '@/components/Boardroom'


Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/boardroom/:id',
      name: 'Boardroom',
      component: Boardroom
    },
  
  ]
})

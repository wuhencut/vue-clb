import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'
import MyHome from '@/page/myHome'
import Login from '@/page/login'
import Reginster1 from '@/page/register1'
import MyInfo from '@/page/myInfo'

Vue.use(Router);

export default new Router({
  base: '/index.html/',
  routes: [
    {
      path: '/' || '',
      redirect: '/index',
      component: Index,
      meta: {
        requireAuth: false
      }
    }, {
      path: '/index',
      component: Index,
      meta: {
        requireAuth: false
      }/*,
      children:[{
        path:'/index/:agentCode',
        component:Index
      }]*/
    }, {
      path: '/index/:agentCode',
      component: Index,
      meta: {
        requireAuth: false
      }
    }, {
      path: '/login',
      component: Login,
      meta: {
        requireAuth: false
      }
    }, {
      path: '/myHome',
      component: MyHome,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/register1',
      component: Reginster1,
      meta: {
        requireAuth: false
      }
    },{
      path: '/myInfo',
      component: MyInfo,
      meta: {
        requireAuth: true
      }
    },
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import MyHome from '@/page/myHome'
import Login from '@/page/login'
import Register1 from '@/page/register1'
import Register2 from '@/page/register2'
import MyInfo from '@/page/myInfo'
import Help from '@/page/help.vue'
import HelpDetail from '@/page/helpDetail.vue'
import HelpCenter from '@/page/helpCenter.vue'
import HelpAsk from '@/page/helpAsk.vue'
import Guide from '@/page/guide.vue'
import Introduce from '@/page/introduce.vue'
import OuterAgreement from '@/page/tradeRuleHSI.vue'

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
      component: Register1,
      meta: {
        requireAuth: false
      }
    },{
      path: '/myInfo',
      component: MyInfo,
      meta: {
        requireAuth: true
      }
    },{
      path: '/register2/:mobile',
      component: Register2,
      meta: {
        requireAuth: false
      }
    },{
      path: '/help',
      component: Help,
      meta: {
        requireAuth: false
      }
    },{
      path: '/helpDetail/:helpDetailId',
      component: HelpDetail,
      meta: {
        requireAuth: false
      }
    }, {
      path: '/helpCenter',
      component: HelpCenter,
      meta: {
        requireAuth: true
      }
    },{
      path: '/helpAsk',
      component: HelpAsk,
      meta: {
        requireAuth: true
      }
    },{
      path: '/guide',
      component: Guide,
      meta: {
        requireAuth: false
      }
    },{
      path: '/introduce',
      component: Introduce,
      meta: {
        requireAuth: false
      }
    },{
      path: '/tradeRuleHSI',
      component: OuterAgreement,
      meta: {
        requireAuth: false
      }
    },{
      path: '/tradeRuleGC',
      component: OuterAgreement,
      meta: {
        requireAuth: false
      }
    },{
      path: '/tradeRuleCN',
      component: OuterAgreement,
      meta: {
        requireAuth: false
      }
    },{
      path: '/tradeRuleCL',
      component: OuterAgreement,
      meta: {
        requireAuth: false
      }
    },{
      path: '/tradeRuleCN',
      component: OuterAgreement,
      meta: {
        requireAuth: false
      }
    },{
      path: '/tradeRuleDAX',
      component: OuterAgreement,
      meta: {
        requireAuth: false
      }
    },{
      path: '/tradeRuleMHI',
      component: OuterAgreement,
      meta: {
        requireAuth: false
      }
    },
  ]
})

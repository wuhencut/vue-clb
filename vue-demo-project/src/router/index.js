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
import TradeRule from '@/page/tradeRule.vue'
import Safe from '@/page/safe.vue'
import AboutUs from '@/page/aboutUs.vue'
import PayType from '@/page/payType.vue'
import Withdraw from '@/page/withdraw.vue'
import Identification from '@/page/identification.vue'
import AddBankCard from '@/page/addBankCard.vue'

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
      path: '/tradeRule/:type',
      component: TradeRule,
      meta: {
        requireAuth: false
      }
    },{
      path: '/safe',
      component: Safe,
      meta: {
        requireAuth: false
      }
    },{
      path: '/aboutUs',
      component: AboutUs,
      meta: {
        requireAuth: false
      }
    },{
      path: '/payType',
      component: PayType,
      meta: {
        requireAuth: true
      }
    },{
      path: '/withdraw',
      component: Withdraw,
      meta: {
        requireAuth: true
      }
    },{
      path: '/identification',
      component: Identification,
      meta: {
        requireAuth: true
      }
    },{
      path: '/addBankCard',
      component: AddBankCard,
      meta: {
        requireAuth: true
      }
    },
  ]
})

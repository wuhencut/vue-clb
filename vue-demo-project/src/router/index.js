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
import TradePassSet from '@/page/tradePassSet.vue'
import UserPassModify from '@/page/userPassModify.vue'
import TradePassModify from '@/page/tradePassModify.vue'
import BankCardList from '@/page/bankCardList.vue'
import PhoneBind1 from '@/page/phoneBind1.vue'
import PhoneBind2 from '@/page/phoneBind2.vue'
import ModifyBankCard from '@/page/modifyBankCard.vue'
import AliPay from '@/page/aliPay.vue'
import GoAli from '@/page/goAli.vue'
import Download from '@/page/download.vue'
import PayBank from '@/page/payBank.vue'
import Fund from '@/page/fund.vue'
import ForgetTradePass from '@/page/forgetTradePass.vue'
import MyPacket from '@/page/myPacket.vue'
import Discover from '@/page/discover.vue'
import ActivityCenter from '@/page/activityCenter.vue'
import ActPacket from '@/page/actPacket.vue'
import DayGainList from '@/page/dayGainList.vue'
import Extension from '@/page/extension.vue'
import DangerTip from '@/page/dangerTip.vue'
import InvestLesson from '@/page/investLesson.vue'
import KnowledgeDetail from '@/page/knowledgeDetail.vue'
import News from '@/page/news.vue'
import OuterTrade from '@/page/outerTrade.vue'
import EchartsTest from '@/page/echartsTest.vue'

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
    },{
      path: '/tradePassSet',
      component: TradePassSet,
      meta: {
        requireAuth: true
      }
    },{
      path: '/userPassModify',
      component: UserPassModify,
      meta: {
        requireAuth: true
      }
    },{
      path: '/tradePassModify',
      component: TradePassModify,
      meta: {
        requireAuth: true
      }
    },{
      path: '/bankCardList',
      component: BankCardList,
      meta: {
        requireAuth: true
      }
    },{
      path: '/phoneBind1',
      component: PhoneBind1,
      meta: {
        requireAuth: true
      }
    },{
      path: '/phoneBind2',
      component: PhoneBind2,
      meta: {
        requireAuth: true
      }
    },{
      path: '/modifyBankCard/:bankCardId',
      component: ModifyBankCard,
      meta: {
        requireAuth: true
      }
    },{
      path: '/aliPay',
      component: AliPay,
      meta: {
        requireAuth: true
      }
    },{
      path: '/goAli',
      component: GoAli,
      meta: {
        requireAuth: false
      }
    },{
      path: '/download',
      component: Download,
      meta: {
        requireAuth: false
      }
    },{
      path: '/payBank',
      component: PayBank,
      meta: {
        requireAuth: false
      }
    },{
      path: '/fund',
      component: Fund,
      meta: {
        requireAuth: false
      }
    },{
      path: '/forgetTradePass',
      component: ForgetTradePass,
      meta: {
        requireAuth: false
      }
    },{
      path: '/myPacket',
      component: MyPacket,
      meta: {
        requireAuth: false
      }
    },{
      path: '/discover',
      component: Discover,
      meta: {
        requireAuth: false
      }
    },{
      path: '/activityCenter',
      component: ActivityCenter,
      meta: {
        requireAuth: false
      }
    },{
      path: '/actPacket',
      component: ActPacket,
      meta: {
        requireAuth: false
      }
    },{
      path: '/dayGainList',
      component: DayGainList,
      meta: {
        requireAuth: false
      }
    },{
      path: '/extension',
      component: Extension,
      meta: {
        requireAuth: false
      }
    },{
      path: '/extension',
      component: Extension,
      meta: {
        requireAuth: false
      }
    },{
      path: '/dangerTip',
      component: DangerTip,
      meta: {
        requireAuth: false
      }
    },{
      path: '/investLesson',
      component: InvestLesson,
      meta: {
        requireAuth: false
      }
    },{
      path: '/knowledgeDetail/:knowledgeId',
      component: KnowledgeDetail,
      meta: {
        requireAuth: false
      }
    },{
      path: '/news',
      component: News,
      meta: {
        requireAuth: false
      }
    },{
      path: '/outerTrade/:commonType/:marketType/:tradeType',
      component: OuterTrade,
      meta: {
        requireAuth: false
      }
    },{
      path: '/echartsTest',
      component: EchartsTest,
      meta: {
        requireAuth: false
      }
    },
  ]
})





















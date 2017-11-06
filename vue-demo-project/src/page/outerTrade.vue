<template>
  <section class="page-trade">
    <div class="page-trade-clearing">
      <header class="page-header">
        <div class="header-wrap">
          <h3>
          <span @click="showMenu=!showMenu">{{marketTxt}} - 点买{{commonTxt}}
             <i v-if="!showMenu" class="iconfont">&#xe608;</i><i v-if="showMenu" class="iconfont">&#xe609;</i>
            </span>
          </h3>
          <router-link :to="indexUrl" class="nav-left">
            <i class="icon-back"></i>
          </router-link>
          <a v-if="marketType == 1" class="nav-right txt-s14" @click="changeMarket()">换成实盘</a>
          <router-link v-if="marketType == 2" :to="{path: '/tradeRule/' + commonType}" class="nav-right">规则
          </router-link>
        </div>
      </header>
      <div class="trade-menu">
        <ul>
          <li class="m-buy"><a :class="{'bottom-red': tradeType=='buy'}" @click="tradeType='buy'">点买</a></li>
          <li class="m-sell"><a :class="{'bottom-red': tradeType=='sell'}" @click="tradeType='sell'">点卖</a></li>
          <li class="m-result"><a :class="{'bottom-red': tradeType=='result'}" @click="tradeType='result'">结算</a></li>
        </ul>
      </div>
    </div>
    <div v-show="showMenu" @click="showMenu=false;" class="mod-commodity-list db-bg" style="z-index: 99;">
      <div class="wrap">
        <a v-for="(value, key) in commodityTitles" @click="changeFuture(key)" v-if="value != commonTxt">{{value}}</a>
      </div>
    </div>
    <result :tradeType="tradeType" :commonType="commonType" :marketType="marketType"
            v-if="tradeType=='result'"></result>
    <sell :tradeType="tradeType" :commonType="commonType" :marketType="marketType" v-if="tradeType=='sell'"></sell>
    <buy :tradeType="tradeType" :commonType="commonType" :marketType="marketType" v-if="tradeType=='buy'"></buy>
  </section>
</template>
<script>
  import Result from './../components/tradeResult.vue';
  import TradeSell from './../components/tradeSell.vue';
  import TradeBuy from './../components/tradeBuy.vue';
  export default{
    components: {
      'result': Result,
      'sell': TradeSell,
      'buy': TradeBuy,
    },
    data(){
      return {
        indexUrl: this.server.SystemService().agentIndex(),//首页地址
        tradeType: this.$route.params.tradeType || 'buy', //点买，点卖，结算
        commonType: this.$route.params.commonType || 'CL',//期货类型
        marketType: this.$route.params.marketType || 2,
        commodityTitles: {
          MHI: '小恒指',
          HSI: '恒指',
          GC: '美黄金',
          SI: '美白银',
          CL: '美原油',
          CN: '富时A50',
          DAX: '德指'
        },
        listenType: '',
        marketTxt: '',
        showMenu: false,
        commonTxt: '',
        txtLinkObj: {
          header: {
            text: '',
            link: ''
          },
          corner: {
            // text: '申请模拟币',
            text: '',
            link: '',
            title: ''
          }
        },
      }
    },
    mounted(){
      this.marketTxt = this.marketType == 1 ? '模拟盘' : '实盘'
      this.commonTxt = this.commodityTitles[this.commonType]
      this.txtLinkObj = this.marketType == 1 ? {
        header: {
          text: '换成实盘',
          link: '/outerTrade/' + this.commonType + '/2' + '/buy'
        },
        corner: {
          // text: '申请模拟币',
          text: '',
          link: '/getSimCoin',
          title: '模拟币'
        }
      } : {
        header: {
          text: '规则',
          link: '/tradeRule/' + this.commonType
        },
        corner: {
          text: '立即充值',
          link: '/payType',
          title: '账户余额'
        }
      };
    },
    methods: {
      changeMarket(){
        this.$router.push({path: '/outerTrade/' + this.commonType + '/2/' + 'buy'});
        window.location.reload(); // 由于页面params变化后，页面不刷新，这里做刷新，不是最佳处理方式，之后处理
      },
      changeFuture(key){
        this.commonTxt = this.commodityTitles[key];
        this.commonType = key;
        this.$router.push({path: '/outerTrade/' + key + '/' + this.marketType + '/buy'});
        window.location.reload();
      }
    },
    computed: {},
    destroyed(){

    }
  }
</script>

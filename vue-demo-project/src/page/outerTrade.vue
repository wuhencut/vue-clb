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
          <router-link :to="{path: '/tradeRule'}" class="nav-right">规则</router-link>
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
        <a v-for="(value, key) in commodityTitles" @click="commonType=key;tradeType='buy'" v-if="value != commonTxt">{{value}}</a>
      </div>
    </div>
    <result :tradeType="tradeType" :commonType="commonType" :marketType="marketType" v-if="tradeType=='result'"></result>
    <sell :tradeType="tradeType" :commonType="commonType" :marketType="marketType" v-if="tradeType=='sell'"></sell>
  </section>
</template>
<script>
  import Result from './../components/tradeResult.vue';
  import TradeSell from './../components/tradeSell.vue'
  export default{
    components:{
      'result': Result,
      'sell': TradeSell
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
        marketTxt: this.marketType == 1 ? '模拟盘' : '实盘',
        showMenu: false,
        commonTxt: '',
      }
    },
    mounted(){
        this.commonTxt = this.commodityTitles[this.commonType]
    },
    methods: {},
    computed: {},
    destroyed(){

    }
  }
</script>

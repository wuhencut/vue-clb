<template>
  <section class="mod-clearing">
    <div class="mod-clearing" style="padding-bottom: 0">
      <div class="list-wrap">
        <div v-for="settle in settleDataList" class="wrap">
          <ul class="row-1">
            <li class="txt-s16">{{settle.commodityName}}－{{settle.commodityNo}}{{settle.contractNo}} <i
              class="commoID txt-s12">JQ {{settle.id}}</i></li>
            <li class="txt-right txt-s12">{{settle.closeReasonName}}</li>
          </ul>
          <div class="row-2">
            <ul class="clearfix">
              <li class="fl">
                <p v-if="settle.direction == 'B'" class="title txt-red">看涨{{settle.amount}}手</p>
                <p v-if="settle.direction == 'S'" class="title txt-green">看跌{{settle.amount}}手</p>
                <p>买入 &nbsp;&nbsp;{{settle.buyPriceDeal}}</p>
                <p>卖出 &nbsp;&nbsp;{{settle.sellPriceDeal}}</p>
              </li>
              <li class="fl">
                <p v-if="settle.profitTotal < 0" class="title txt-green">{{settle.profitTotal}}</p>
                <p v-if="settle.profitTotal > 0" class="title txt-red">+{{settle.profitTotal}}</p>
                <p v-if="settle.profitTotal == 0" class="title txt-red">0</p>
                <p>止盈 &nbsp;&nbsp;{{settle.quitGain}}</p>
                <p>止损 &nbsp;-{{settle.quitLoss}}</p>
              </li>
              <li class="fr pt15">
                <div v-if="settle.status == 8" class="state">结算成功</div>
              </li>
            </ul>
            <p v-if="settle.profitTotal > 0 && marketType == 2" class="pt5">{{settle.profitTotal}}元 =
              您得{{settle.profitShare}}元 + 投资人得{{settle.investorGain}}元</p>
          </div>
          <div class="row-3">
            <ul v-if="settle.id == currTrade">
              <li class="clearfix">买入类型<span class="fr">市价买入</span></li>
              <li class="clearfix">买入时间<span class="fr">{{settle.dealTime | formatTime('yyyy.MM.dd HH:mm:ss')}}</span>
              </li>
              <li class="clearfix">结算时间<span
                class="fr">{{settle.liquidateTime | formatTime('yyyy.MM.dd HH:mm:ss')}}</span>
              </li>
              <li v-if="marketType == 2" class="clearfix">合同详情
                <router-link to="/" class="fr txt-blue">查看合同</router-link>
              </li>
            </ul>
            <div v-if="settle.id == currTrade" @click="showCurrTradeDetail(settle.id)" class="desc">收起</div>
            <div v-if="settle.id != currTrade" @click="showCurrTradeDetail(settle.id)" class="desc">查看详情</div>
          </div>
        </div>

        <div v-if="currPage != totalPage && settleDataList.length >= 10" class="pt10">
          <div class="mod-more" @click="getSettleList(currPage+1);">
            加载更多
          </div>
        </div>
        <div v-if="settleDataList.length == 0" class="mod-no-data">暂无数据</div>
      </div>
    </div>
    <!--<loading v-if="glb.showLoading"></loading>-->
  </section>
</template>
<script>
  export default{
//    name: 'result',
    props: [
      'tradeType',//点买，点卖，结算
      'commonType',//期货类型
      'marketType',//实盘，模拟盘
    ],
    data(){
      return {
        glb: this.global,
        settleDataList: [],
        currPage: 1,//当前页码
        totalPage: 1,//总页数
        currTrade: 0,
      }
    },
    mounted(){
      this.getSettleList();
    },
    methods: {
      getSettleList(page) {
        var pageSize = 10;
        let t = this;
        t.glb.showLoading = true;
        t.server.TradeService.getTradeResult(page, pageSize, t.marketType).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            var list = data.data['dataList'];
            t.currPage = data.data['pageIndex'];
            t.totalPage = data.data['totalPage'];
            if (page == 1) {
              t.settleDataList = list;
            } else {
              t.settleDataList = t.settleDataList.concat(list);
            }
          } else {
            t.showTip = true;
            t.tipMsg = data['resultMsg'];
          }
          t.glb.showLoading = false;
        }).catch(function (error) {
          if (error) {
            Promise.reject(error)
          } else {
            t.showTip = true;
            t.tipMsg = '服务器请求异常';
          }
        });
      },

      //显示当前选择的结算详情
      showCurrTradeDetail(tradeId) {
        if (this.currTrade == tradeId) {
          this.currTrade = 0;
        } else {
          this.currTrade = tradeId;
        }
      },

    },
    computed: {},
    destroyed(){

    }
  }
</script>

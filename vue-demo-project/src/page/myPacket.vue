<template>
  <section id="" class="page-user">
    <div class="page-myPacket">
      <header class="page-header">
        <div class="header-wrap">
          <h3>我的红包</h3>
          <a href="#/myHome" class="nav-left"><i class="icon-back"></i></a>
        </div>
      </header>
      <ul class="mod-mypacket-head">
        <li v-if="packetFund.tipAllBalance">我收到的红包<p
          :class="{'txt-red':packetFund.tipAllBalance != 0,'txt-grey':packetFund.tipAllBalance == 0}">
          {{packetFund.tipAllBalance.toFixed(2)}}<em>元</em></p></li>
        <li v-if="packetFund.tipAllBalance">红包余额<p :class="{'txt-red':packetFund.tipAllBalance != 0,'txt-grey':packetFund.tipAllBalance == 0}">
          {{packetFund.tipBalance.toFixed(2)}}<em>元</em></p></li>
      </ul>
      <div class="mod-actpacket-list mt15">
        <div class="wrap" v-if="items.length && items.length > 0">
          <div class="list" v-for="item in items">
            <div class="tit">
              <p class="txt-s14" v-html="packetTitle[item.title][item.type-1] || '&nbsp;'"></p>
              <p class="desc">{{item.time| formatTime('MM-dd HH:mm')}}</p>
            </div>
            <span class="fr txt-red txt-s14" v-if="item.type==1">+{{item.money.toFixed(2)}}元</span>
            <span class="fr txt-red txt-s14" v-if="item.type==2">-{{item.money.toFixed(2)}}元</span>
          </div>
        </div>
        <div class="no-package txt-center pl15 pr15" v-if="items.length && items.length == 0">
          <p class="txt-gray txt-s10">您还没有获得红包，</p>
          <p class="txt-gray txt-s10">快来参加活动，红包正在召唤你</p>
          <a href="#/activityCenter" class="btn btn-blue txt-white mt30">更多红包活动</a>
        </div>
      </div>
    </div>
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        packetFund: {},
        packetRecord: [],
        packetTitle: {
          'ZCHB': ['新注册用户送红包'],
          'MNJY': ['完成模拟交易5次送红包'],
          'SCCZ': ['首次充值送红包'],
          'SPJY': ['实盘交易送红包'],
          'SMRZ': ['完成实名认证送红包'],
          'JYZHF': ['实盘交易综合费返还', '实盘交易综合费抵扣']
        },
        pageIndex: 1,
        totalPage: 1,
        items: [],
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let t = this;
        t.glb.showLoading = true;
        t.server.PacketService.getPacketFundInfoData().then(function (res) {
          var packetFund = res.data;
          if (packetFund.code == 100) {
            t.packetFund = packetFund.data;
            t.getPacketRecordList(t.pageIndex);
          } else {
            if (packetFund.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = packetFund['resultMsg'];
            }
          }
          t.glb.showLoading = false;
        }).catch(function (err) {
          if (err) {
            Promise.reject(err)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },
      //获取红包列表
      getPacketRecordList() {
        let t = this;
        var pageSize = 10;
        t.glb.showLoading = true;
        t.server.PacketService.getPacketRecordListData().then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.items = data.data.items;
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
          t.glb.showLoading = false;
        }).catch(function (err) {
          if (err) {
            Promise.reject(err)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      }
    },
    computed: {},
    destroyed(){

    }
  }
</script>

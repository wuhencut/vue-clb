<template>
  <section class="page-pay">
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
    <div class="page-pay-type">
      <header class="page-header">
        <div class="header-wrap">
          <h3>账户充值</h3>
          <backMenu></backMenu>
        </div>
      </header>
      <div class="mod-choose-type">
        <p class="title">选择充值方式</p>
        <router-link :key="item.id" v-for="item in payList" :class="{'express': item['pay_key'] != 'pay_zhifubao','alipay': item['pay_key'] == 'pay_zhifubao'}" class="mb15" :to="item.href">
          <p class="txt-s16">{{item['pay_desc']}}<i class="icon-recommend ml5"></i></p>
          <span v-if="item['pay_key'] != 'pay_zhifubao'">快速安全，24小时支付</span>
          <span v-if="item['pay_key'] == 'pay_zhifubao'">手机支付，免手续费</span>
          <i class="mod-arrow-r"></i>
        </router-link>
        <!--<a href="#/alipay" class="alipay">
            <p class="txt-s16">支付宝转账</p>
            <span>手机支付，免手续费</span>
            <i class="mod-arrow-r"></i>
        </a>-->
      </div>
    </div>
  </section>

</template>
<script>
    export default{
        data(){
            return {
              glb: this.global,
              backURL: this.$route.query.backURL || '/myHome',
              payList: [],
            }
        },
      mounted(){
        this.getData();
      },
      methods:{
        getData(){
          let t = this;
          t.glb.showLoading = true;
          this.server.PayService.getPayListStatus().then(function (res) {
            var  href = '';
            var data = res.data;
            if(data.code == 100){
              let paydata = data.data;
              paydata.forEach(function (item) {
                if(item['pay_status'] == 1){
                  if(item['pay_key'] != 'pay_zhifubao'){
                    href = '/payBank?backURL=' + t.backURL + '&type=' + item['pay_key'];
                  }else if(item['pay_key'] == 'pay_zhifubao'){
                    href = '/alipay';
                  }
                  item.href = href;
                  t.payList.push(item);
                }
              })
            }else{
              t.glb.showTip = true;
              t.glb.tipMsg = data['resultMsg'];
            }
            t.glb.showLoading = false;
          }).catch(function (error) {
            if (error) {
              Promise.reject(error);
            } else {
              t.glb.showTip = true;
              t.glb.tipMsg = '服务器请求异常';
            }
          });
        }
      }
    }
</script>

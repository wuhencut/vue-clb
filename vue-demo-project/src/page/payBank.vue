<template>
  <section class="page-pay">
    <div class="page-pay-bank">
      <header class="page-header">
        <div class="header-wrap">
          <h3>账户充值</h3>
          <backMenu></backMenu>
        </div>
      </header>
      <div class="mod-bank">
        <div class="balance">账户余额：{{balance.toFixed(2)}}元</div>
        <div class="username">
          <p><i class="icon-express mr10"></i>无需开通网银，有银行卡就能支付</p>
        </div>
      </div>
      <div class="mod-card">
        <div class="mod-form">
          <label>充值金额</label>
          <input class="inp" type="tel" v-model="money" placeholder="最低100元起充" style="width: 2rem">
        </div>
        <p class="desc">
          <span class="txt-grey">注：单卡单笔限额5000，每日最高1万,不支持信用卡</span>
        </p>
      </div>
      <div class="pl15 pr15 pt20">
        <form id="payForm" @submit.prevent="pay();" method="post">
          <input v-if="payType == 'pay_lianlian' || payType == 'pay_iapppay'" class="hiddenInp" type="hidden" name="req_data">
          <input type="submit" class="btn btn-blue" value="提交"/>
        </form>
      </div>
    </div>
    <confirm v-if="glb.showConfirm" :confirmMsg="glb.confirmMsg" @sure="confirmFunc(1)" @cancel="confirmFunc(0)" :sureTxt="glb.sureTxt"></confirm>
    <loading v-if="glb.showLoading"></loading>
    <tip v-if="glb.showTip" :tip="glb.tipMsg" @hide="glb.showTip = false"></tip>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        backURL: this.$route.query.backURL || '/fund',
        payType: this.$route.query.type,
        balance: 0,
        userInfo: {},
        money: '',//充值金额
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let t = this;
        t.glb.showLoading = true;
        this.axios.all([
          this.server.UserService.getUserInfo(),
          this.server.UserService.getBalance()
        ]).then(this.axios.spread(function (userInfo, balance) {
          var userInfoData = userInfo.data;
          var balanceData = balance.data;

          if (userInfoData.code == 100 && balanceData.code == 100) {
            t.balance = balanceData.data.balance;
            t.userInfo = userInfoData.data;
            if (!t.userInfo.named) {
              t.toIdenty();
            } else {
              t.userInfo.maskName = t.X.maskName(t.userInfo.name);
            }
          } else {
            if (userInfoData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = userInfoData['resultMsg'];
            } else if (balanceData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = balanceData['resultMsg'];
            }
          }
//          t.payForm.removeAttribute('action');
          t.glb.showLoading = false;
        })).catch(function (error) {
          if (error) {
            Promise.reject(error);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      //跳转到联动的接口
      pay() {
        let t = this;
        if (!t.userInfo.named) {
          t.toIdenty();
          return;
        }
        if (t.money == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入充值金额';
          return;
        }

        if (!t.X.isMoney(t.money, true)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '充值金额输入错误';
          return;
        }

        //最低100元，测试后添加
        // if ($scope.money < 100) {
        //     X.tip('最低100元起充');
        //     return;
        // }

        if (t.money > 5000) {
          t.glb.showTip = true;
          t.glb.tipMsg = '单次充值最高5000元';
          return;
        }
        var httpRequest;
        if (t.payType == 'pay_lianlian') {
          httpRequest = this.server.PayService.getLLWapPayUrl(t.money)
        } else if (t.payType == 'pay_liandong') {
          httpRequest = this.server.PayService.liandongH5pay(t.money)
        } else if (t.payType == 'pay_iapppay') {
          httpRequest = this.server.PayService.iappPayH5Pay(t.money)
        }
        t.glb.showLoading = true;
        httpRequest.then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.payJump(data.data);
            /*zhuge.track("充值", {
             充值金额: $scope.money
             });*/
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
            t.glb.showLoading = true;
          }
        }).catch(function (error) {
          if (error) {
            Promise.reject(error);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },
      //支付跳转第三方
      payJump(payData) {
        let t = this;
        var payFrom = document.getElementById('payForm')
        if (t.payType == 'pay_lianlian') {
          var data = JSON.parse(payData), payURL = data.url, reqData = data.req_data;
          document.getElementsByClassName('hiddenInp')[0].value = reqData;
          payForm.setAttribute('action', payURL);
          payForm.submit();
        } else if (t.payType == 'pay_liandong' || t.payType == 'pay_iapppay') {
          // var payURL = payData;
          payForm.setAttribute('action', payData);
          payForm.submit();
        }
      },
      //实名认证
      toIdenty() {
        this.glb.showConfirm = true;
        this.glb.confirmMsg = '您还未实名认证，请先实名认证';
        this.glb.sureTxt = '确定';
  },
      //confirm弹窗操作
      confirmFunc(type){
        let t = this;
        if(type == 1){
          t.$router.push({path: '/identification', query: {backURL: '/payBank'}});
        }else{
          t.$router.push({path: '/payType'});
        }
      }
    },
    computed: {},
    destroyed(){

    }
  }
</script>

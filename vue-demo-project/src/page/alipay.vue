<template>
  <section class="page-pay">
    <div class="page-pay-bank">
      <header class="page-header">
        <div class="header-wrap">
          <h3>支付宝转账</h3>
          <!--<a href="/payType" class="nav-left"><i class="icon-back"></i></a>-->
          <backMenu></backMenu>
        </div>
      </header>
      <div class="mod-bank">
        <div v-if="balance" class="balance">账户余额：{{balance.balance.toFixed(2)}}元</div>
        <div class="mod-form-wrap mt15 mb15">
          <!--<div class="mod-form">
              <label style="width: 0.8rem">支付宝实名</label>
              <span class="pl10">{{name}}</span>
          </div>-->
          <div class="mod-form">
            <label style="width: 0.8rem">支付宝账号</label>
                    <span v-if="user.bindingAlipayAccount">
                        <span class="pl10 txt-gray" v-html="user.alipayAccount"></span>
                        <span class="fr pr30 txt-s14 txt-blue" @click="edit()">修改</span>
                        <i class="mod-arrow-r"></i>
                    </span>
            <input class="inp txt-gray" type="text" v-if="!user.bindingAlipayAccount" v-model="param.account"
                   placeholder="请输入支付宝账号" style="width: 2rem">
          </div>
          <div class="mod-form">
            <label style="width: 0.8rem">充值金额</label>
            <input class="inp txt-gray" type="text" v-model="param.money" placeholder="请输入金额" style="width: 2rem">
          </div>
        </div>
        <p class="ml15 mr15 mb30 txt-grey txt-s12">
                <span class="copy-target">
                    注：<span>为保证资金安全，请准确填写支付宝账号。</span>若未能正常打开支付宝，请复制账号
                    <input type="text" class="txt-blue copy" value="xinguzhifubao@xingu365.com "/>,手动去支付宝完成转账。
                </span>
        </p>
      </div>
      <div class="pl15 pr15">
        <a class="btn btn-blue" @click="pay();">下一步</a>
      </div>
      <div class="mod-prompt pt50 pb20">
        <p class="mb10 txt-center">到账时间</p>

        <p> 08:30-17:30<span class="fr">(1小时内到账)</span></p>

        <p>17:30以后<span class="fr">(次日09:30前到账)</span></p>

        <p>如急需到账，请电话<a v-if="cellPhone" class="txt-blue" href="tel:0571-28284082">联系客服</a>。</p>
      </div>
    </div>
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
    <confirm :confirmMsg="glb.confirmMsg" @sure="confirmFunc(1)" :sureTxt="glb.sureTxt" @cancel="confirmFunc(0)"
             v-if="glb.showConfirm"></confirm>
    <alert :alertMsg="glb.alertMsg" v-if="glb.showAlert" @sure="glb.showAlert=false"></alert>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        account: '',
        money: '',
        balance: 0,
        user: {},
        name: '',
        param: {},
        cellPhone: '',
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
          this.server.UserService.getBalance(),
          this.server.UserService.getUserInfo()
        ]).then(this.axios.spread(function (balance, userInfo) {
          var balance = balance.data;
          var userData = userInfo.data;
          t.X.clipboard.init('str');
          if (balance.code == 100 && userData.code == 100) {
            t.balance = balance.data;
            t.user = userData.data;
            t.param.account = userData.data.alipayAccount;
            t.cellPhone = t.server.SystemService().cellPhoneNumber();
            if (t.user['name'] == '') {
              t.toIdenty();
            } else {
              t.name = t.X.maskName(t.user['name']);
            }
          } else {
            if (balance.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = balance['resultMsg'];
            } else if (userData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = userData['resultMsg'];
            }
          }
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

      edit(){
        this.glb.showAlert = true;
        this.glb.alertMsg = '如需要更换或解绑支付宝账号，请 <br>联系客服电话 <a class="txt-blue" href=' + this.cellPhone.cellPhoneATag + '>' + this.cellPhone.cellPhone + '</a>';
      },

      //支付
      pay() {
        let t = this;
        var account = t.param.account ? t.param.account : t.user.alipayAccount;
        if (!account && !t.param.account) {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入支付宝账号';
          return;
        }
        //支付宝账号长度大于5，与6006类似
        if (t.param.account.length < 5) {
          t.glb.showTip = true;
          t.glb.tipMsg = '支付宝账号输入错误';
          return;
        }
        if (t.param.money == '' || !t.param.money) {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入充值金额';
          return;
        }
        if (!t.X.isMoney(t.param.money, true)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '充值金额输入错误';
          return;
        }
        //充值金额大于等于1元，上限10万   -------------- 测试后加上去
        if (t.param.money < 1) {
          t.glb.showTip = true;
          t.glb.tipMsg = '充值金额最低1元';
          return;
        }
        if (t.param.money > 100000) {
          t.glb.showTip = true;
          t.glb.tipMsg = '充值金额最高10万元';
          return;
        }

        t.glb.showLoading = true;
        t.server.PayService.alipay(t.param.money, t.param.account).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.$router.push({path: '/goAli'});
          } else {
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
      },

      //实名认证
      toIdenty() {
        let t = this;
        t.glb.showConfirm = true;
        t.glb.confirmMsg = '您还未实名认证，请先实名认证';
      },

      //confirm弹窗操作
      confirmFunc(type){
        let t = this;
        if(type == 1){
          t.$router.push({path: '/identification', query: {backURL: '/aliPay'}});
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

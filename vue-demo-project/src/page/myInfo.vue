<template>
  <section class="page-user">
    <div class="page-info">
      <header class="page-header">
        <div class="header-wrap">
          <h3>我的信息</h3>
          <a href="#/myHome" class="nav-left"><i class="icon-back"></i></a>
        </div>
      </header>
        <confirm v-if="showConfirm" :confirmMsg="confirmMsg" @sure="sureFunc" @cancel="showConfirm = false" :sureTxt="sureTxt"></confirm>
        <loading v-if="showLoading"></loading>
        <tip v-if="showTip" :tip="tipMsg" @hide="showTip = false"></tip>
      <div class="mod-info">
        <div class="pic">
          {{user.username}}
        </div>
        <div class="mod-menu-wrap mt10">
          <a v-if="!user.named" class="mod-menu" href="#/identification">
            <span class="fr mr30 txt-grey">未认证</span>
            实名认证
            <i class="mod-arrow-r"></i>
          </a>
          <div v-if="user.named" class="mod-menu">
            <span class="fr mr30 txt-grey">{{user.nameVerifyStatus}}</span>
            实名认证
          </div>
          <!--<div class="mod-menu">
              <span class="fr mr30 txt-grey">{{user.loginMobile}}</span>
              手机号码
          </div>-->
          <a class="mod-menu" href="#/phoneBind1">
            <span class="fr mr30 txt-gray">{{user.loginMobile}}</span>
            手机绑定
            <i class="mod-arrow-r"></i>
          </a>
          <a @click="showConfirm = true;sureTxt = '去充值';operaType = 'goAli';confirmMsg = '使用支付宝进行首次入金操作后，即可自动<br/>绑定支付宝账号'" v-if="!user.bindingAlipayAccount" class="mod-menu">
            <span class="fr mr30 txt-grey">未认证</span>
            支付宝账户认证
            <i class="mod-arrow-r"></i>
          </a>
          <a v-if="user.bindingAlipayAccount" class="mod-menu" @click="telTip()">
            <span class="fr mr30 txt-blue">已认证</span>
            支付宝账户认证
            <i class="mod-arrow-r"></i>
          </a>
        </div>
        <div class="mod-menu-wrap mt10">
          <a class="mod-menu" href="#/userPassModify">
            <span class="fr mr30 txt-grey">修改</span>
            登录密码
            <i class="mod-arrow-r"></i>
          </a>
          <a v-if="!user.withdrawPw" class="mod-menu" href="#/tradePassSet">
            <span class="fr mr30 txt-grey">未设置</span>
            提现密码
            <i class="mod-arrow-r"></i>
          </a>
          <a v-if="user.withdrawPw" class="mod-menu" href="#/tradePassModify">
            <span class="fr mr30 txt-grey">修改</span>
            提现密码
            <i class="mod-arrow-r"></i>
          </a>
        </div>
        <div v-if="!bankCards.length" class="mod-menu-wrap mt10">
          <a class="mod-menu" href="#/bankCardList">
            <span class="fr mr30 txt-grey">未绑定</span>
            我的银行卡
            <i class="mod-arrow-r"></i>
          </a>
        </div>
        <div v-if="bankCards.length" class="mod-menu-wrap mt10">
          <a class="mod-menu" href="#/bankCardList">
            <span class="fr mr30 txt-grey">{{bankCards.length}}张</span>
            我的银行卡
            <i class="mod-arrow-r"></i>
          </a>
        </div>
      </div>
      <div class="pt30 pl15 pr15 pb30">
        <button class="btn btn-blue" @click="logOut">退出登录</button>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    components: {},
    data(){
      return {
        user: {
          username: '',
          named: null,
          nameVerifyStatus: null,
          loginMobile: '',
          withdrawPw: null,
          bindingAlipayAccount: null,
          cellPhone: '',
        },
        bankCards: [],
        showConfirm: false,
        confirmMsg: '',
        showLoading: false,
        showTip : false,
        tipMsg: '',
        sureTxt: '确定',
        operaType : '',//弹窗操作的种类
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let t = this;
        this.showLoading = true;
        this.axios.all([
          this.server.UserService.getUserInfo(),
          this.server.UserService.getBankCards()
        ]).then(this.axios.spread(function (userInfo, bankCards) {
          let userInfoData = userInfo.data, bankCardsData = bankCards.data;
          if (userInfoData.code == 100 && bankCardsData.code == 100) {
            t.user = userInfoData.data;
            t.bankCards = bankCardsData.data;
          } else {
            if (userInfoData.code != 100) {
              t.showTip = true;
              t.tipMsg = userInfoData['resultMsg']
            } else if (bankCardsData.code != 100) {
              t.showTip = true;
              t.tipMsg = bankCardsData['resultMsg']
            }
          }
          t.showLoading = false;
        })).catch(function (error) {
          if (error) {
            Promise.reject(error)
          } else {
            t.showTip = true;
            t.tipMsg = '服务器请求异常';
          }
        });
      },
      //拨打电话或者跳转支付宝认证
      telTip() {
        this.cellPhone = this.server.SystemService.cellPhoneNumber();
        this.X.dialog.alert('如需要更换或解绑支付宝账号，请 <br>联系客服电话 <a class="txt-blue" href=' + this.cellPhone.cellPhoneATag + '>' + this.cellPhone.cellPhone + '</a>');
      },

      //支付宝认证弹窗


      //点击退出登录
      logOut(){
        this.showConfirm = true;
        this.confirmMsg = '确定要退出当前账号吗？'
        this.operaType = 'logOut'
      },
      //弹窗操作中执行操作的那个按钮几成写成一个
      sureFunc(){
        if(this.operaType == 'goAli'){
          this.$router.push({path: '/alipay?backURL=/myInfo'});
        }else if(this.operaType == 'logOut'){
          this.signOut()
        }
      },

      //退出登录
      signOut() {
        let indexUrl = this.server.SystemService().agentIndex();
        let t = this;
        this.X.loading.show();
        this.server.LoginService.logout().then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.server.AuthService.signOut();
            t.$router.push({path: '/index'});
          } else {
            t.X.tip(data['resultMsg']);
          }
          t.X.loading.hide();
        }).catch(function (error) {
          if(error){
            Promise.reject(error)
          }else{
            t.X.tip('服务器请求异常');
          }
        });
      }
    },

    computed: {}
  }
</script>

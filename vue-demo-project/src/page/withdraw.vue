<template>
  <div>
    <section class="page-pay">
      <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
      <loading v-if="glb.showLoading"></loading>
      <confirm :confirmMsg="glb.confirmMsg" @cancer="confirmFunc(0)" @sure="confirmFunc(1)" v-if="glb.showConfirm"></confirm>
      <alert :alertMsg="glb.alertMsg" @suer="" v-if="glb.showAlert"></alert>
      <div class="page-withdraw">
        <header class="page-header">
          <div class="header-wrap">
            <h3>账户提现</h3>
            <router-link to="/myHome" class="nav-left"><i class="icon-back"></i></router-link>
          </div>
        </header>
        <div class="mod-withdraw">
          <div class="balance">
            账户余额：{{balance}}元
          </div>
          <div class="mod-form mt10">
            <label>提现金额</label>
            <input class="inp" v-model="money" type="text" placeholder="最低100元起提，每日限提3次" style="width: 2.1rem">
          </div>
          <div class="tips">
            提现银行卡
          </div>
          <div v-if="selectBankCard!=null" class="bank-card mb10" @click="showDialog=true;">
            <i class="bank-icon mr10" :class="bankCardClassName"></i>
            {{selectBankCard.bank}} 尾号{{selectBankCard.cardNumber.substr(-4)}}
            <i class="mod-arrow-r"></i>
          </div>
          <div class="mod-form">
            <router-link class="tip-r" :to="{path: '/forgetTradePass', query: {backURL: '/withdraw'}}">忘记密码
            </router-link>
            <label>提现密码</label>
            <input class="inp" v-model="password" type="password" placeholder="请输入提现密码" style="width: 1.3rem">
          </div>
        </div>
        <div class="pt30 pl15 pr15">
          <button class="btn btn-blue" @click="checkMoney();">确定</button>
        </div>
        <div class="mod-prompt pt50 pb20 ">
          <p class="mb10 txt-center">提现处理时间：</p>
          <p> 白天：上午11:00 — 下午16:00 (当天17:00前处理)</p>
          <p> 晚上：下午16:00 — 次日11:00 (次日12:00前处理)</p>
          <p> 具体到账时间以银行为准，节假日延后处理</p>
        </div>
      </div>
    </section>
    <!--选择银行-->
    <div class="db-bg" v-show="showDialog" style="z-index: 10000;">
      <div class="mod-db-wrap">
        <div class="mod-choose-bank-card">
          <div class="title">选择我的银行卡</div>
          <ul class="bank-card-list">
            <li v-for="(bankCard, index) in bankCardList" class="clearfix" @click="sureChoose(index)">
                    <span class="fl">
                        <i :class="bankCard.bankClassName"></i>
                    </span>
                    <span class="fl">
                        <p v-if="bankCardList" class="pt10">{{bankCard.bank}}</p>
                        <p class="txt-s12 pt5">**** **** **** {{bankCard.cardNumber.substr(-4)}}</p>
                    </span>
              <i class="mod-ok-r" v-if="bankCard.id == selectBankCard.id"></i>
            </li>
          </ul>
          <router-link v-if="bankCardList && bankCardList.length < 3" class="add-bank-card" :to="{path: 'addBankCard',query:{backURL: '/withdraw'}}">
            添加银行卡
          </router-link>
          <div class="footer" @click="showDialog=false;">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        money: '',
        cardId: '',
        password: '',
        bankCardList: null,
        selectBankCard: null,
        balance: 0,
        user: {},
        userName: '',
        showDialog: false,
        urlParams: {
          url: '',
          queryName: '',
          queryCont: ''
        },
        bankCardClassName: '',
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      //页面初始化获取所有需要的数据
      getData(){
        this.glb.showLoading = true;
        let t = this;
        this.axios.all([
          this.server.UserService.getBalance(),//余额
          this.server.UserService.getBankCards(),//银行卡列表
          this.server.UserService.getUserInfo()//用户信息
        ]).then(this.axios.spread(function (balance, bankCards, userInfo) {
          var balanceData = balance.data;
          var bankCardData = bankCards.data;
          var userInfoData = userInfo.data;
          if (balanceData.code == 100 && bankCardData.code == 100 && userInfoData.code == 100) {
            t.bankCardList = bankCardData.data;
            t.balance = balanceData.data['balance'];
            t.user = userInfoData.data;
            t.initDefaultBankCard();
            t.initValidate();
          } else {
            if (balanceData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = balanceData['resultMsg'];
            } else if (bankCardData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = bankCardData['resultMsg'];
            } else if (userInfoData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = userInfoData['resultMsg'];
            }
          }
          t.glb.showLoading = false;
        })).catch(function (err) {
          if (err) {
            Promise.reject(err)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      ////确认选择银行卡
      sureChoose(index) {
        this.selectBankCard = this.bankCardList[index];
        this.bankCardClassName = 'icon-bank-' + this.selectBankCard.bankCode;
        this.showDialog = false;
      },

      //初始化默认卡
      initDefaultBankCard() {
        let t = this;
        if (!this.bankCardList.length) {
          this.selectBankCard = null;
          return;
        }
        this.selectBankCard = this.bankCardList[0];
        this.bankCardClassName = 'icon-bank-' + this.selectBankCard.bankCode;
        var i, bank;
        for (i = 0; i < t.bankCardList.length; i++) {
          t.bankCardList[i]['bankClassName'] = 'icon-bank-' + t.bankCardList[i]['bankCode'];
          bank = t.bankCardList[i];
          if (bank['defaultCard'] == 0) {
            t.selectBankCard = bank;
//            break;  不明白为什么这里要break，对我vue重构不友好，先注释
          }
        }
      },

      //校验信息是否合法
      initValidate() {
        let t = this;
        if (!this.user.named) {
          t.glb.showConfirm = true;
          t.glb.confirmMsg = '您还未实名认证，请先实名认证';
          t.urlParams = {
            url: '/identification',
            queryName: 'backURL',
            queryCont: '/withdraw'
          };
           return;
        }

        if (this.balance.balance == 0) {
          t.glb.showAlert = true;
          t.glb.alertMsg = '您的账户没有可提金额';
           return;
        }

        if (!this.bankCardList.length) {
          t.glb.showConfirm = true;
          t.glb.confirmMsg = '提款前请先添加提款银行卡';
          t.urlParams = {
            url: '/addBankCard',
            queryName: 'backURL',
            queryCont: '/withdraw'
          };
           return;
        }

        if (this.user.withdrawPw == '') {
          t.glb.showConfirm = true;
          t.glb.confirmMsg = '您还未设置提现密码';
          t.urlParams = {
            url: '/tradePassSet',
            queryName: 'backURL',
            queryCont: '/withdraw'
          };
           return;
        }

        if (this.selectBankCard == null || this.selectBankCard.province == '*' || this.selectBankCard.city == '*' || this.selectBankCard['subbranch'] == '*') {
          t.glb.showConfirm = true;
          t.glb.confirmMsg = '所选提款银行卡信息不完善<br>请先完善该银行卡信息';
          t.urlParams = {
            url: '/bankInfo',
            queryName: 'backURL',
            queryCont: '/withdraw'
          };
         }
      },
      //confirm弹框操作
      confirmFunc(type, url, queryName, queryCont){
        if (type == 0) {
          this.$router.push({path: '/myHome'});
        } else {
          this.$router.push({path: url, query: {queryName: queryCont}})
        }
      },

      //判断提现金额和提现密码的正确性
      checkMoney() {
        let t = this;
        if (this.money == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入提现金额';
          return false;
        }
        if (!this.X.isMoney(this.money)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '金额输入错误';
          return false;
        }
        if (this.money < 100) {
          t.glb.showTip = true;
          t.glb.tipMsg = '提现金额最低100元起提';
          return false;
        }
        if (this.money > this.balance) {
          t.glb.showTip = true;
          t.glb.tipMsg = '提现金额超出您的余额';
          return false;
        }
        if (this.password == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '提现密码不为空!';
          return false;
        }
        if (!/^\d{6}$/.test(this.password)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '提现密码为6位数字';
          return false;
        }
        if (this.selectBankCard == null) {
          t.glb.showTip = true;
          t.glb.tipMsg = '未找到您的提现银行卡信息';
          return false;
        }
        t.glb.showLoading = true;
        this.server.PayService.doWithdraw(this.selectBankCard.id, this.money, this.password).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '提现发起成功，等待处理中';
            this.$router.push({path: 'fund', query: {type: 'withdraw'}});
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
          t.glb.showLoading = false;
        }).catch(function (err) {
          if(err){
            Promise.reject(err)
          }else{
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },
    },
    computed: {},
    destroyed(){

    }
  }
</script>

<template>
  <section class="page-user">
    <div class="page-my">
      <header class="page-header">
        <div class="header-wrap">
          <h3>{{user.username}}</h3>
          <router-link to="/help?backURL=/myHome&indexUrl=/index" class="nav-left"><i class="icon-msg"></i>
          </router-link>
          <router-link to="/myInfo" class="nav-right"><i class="icon-setting"></i></router-link>
        </div>
      </header>
      <div class="mod-userinfo">
        <div class="balance-wrap">
          <p>账户余额</p>
          <p class="txt-s40">{{user.balance.toFixed(2)}}</p>
        </div>
        <ul class="pay-wrap">
          <li class="pr15">
            <a href="#/payType?backURL=/myHome">充值</a>
          </li>
          <li class="pl15">
            <a @click="doWithdraw()">提现</a>
          </li>
        </ul>
      </div>
      <div class="mod-menu">
        <router-link to="/fund" class="link-trade-list">
          资金明细<i class="mod-arrow-r"></i>
        </router-link>
        <router-link to="/myPacket" class="link-packet">
          我的红包<i class="mod-arrow-r"></i>
        </router-link>
      </div>
      <!--<div class="mod-menu mt10">
          <a href="#/extension" class="link-extension">
              推广赚钱<i class="mod-arrow-r"></i>
          </a>
      </div>-->
      <!--<div class="mod-menu mt10 mb15">
          <a href="#/attentionWechat" class="link-wechat">
              关注微信<span class="fr pr20 txt-s12 txt-redgold">关注领红包</span> <i class="mod-arrow-r"></i>
          </a>

      </div>-->
      <footer class="page-footer">
        <div class="footer-wrap">
          <ul>
            <li>
              <router-link to="/index" class="nav-home">
                <i class="iconfont">&#xe611;</i><br>首页
              </router-link>
            </li>
            <li>
              <a href="#/outerTrade/HSI/2?backURL=/index" class="nav-trade">
                <i class="iconfont">&#xe612;</i><br>交易
              </a>
            </li>
            <li>
              <a href="#/news" class="nav-news">
                <i class="iconfont">&#xe61b;<em></em></i><br>资讯
              </a>
            </li>
            <li>
              <a href="#/discover" class="nav-discover">
                <i class="iconfont">&#xe61a;</i><br>发现
              </a>
            </li>
            <li>
              <a href="#/myHome" class="nav-user">
                <i class="iconfont">&#xe613;</i><br>我的
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </section>
</template>
<script>
  export default{
    components: {},
    data(){
      return {
        user: {
          balance: 0
        },
        bankCards: [],
        indexUrl: ''
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      //进页面先获取全部用户数据
      getData(){
        this.X.loading.show();
        let t = this;
        this.axios.all([
          this.server.UserService.getUserInfo(),//获取用户基本信息
          this.server.UserService.getBalance(),//获取用户账余额
          this.server.UserService.getBankCards()//获取银行卡
        ]).then(this.axios.spread(function (userInfo, balance, bankCards) {
          let userInfoData = userInfo.data, balanceData = balance.data, bankCardsData = bankCards.data;
          if (userInfoData.code == 100 && balanceData.code == 100 && bankCardsData.code == 100) {
            t.user = userInfoData.data;
            t.user.balance = balanceData.data.balance;
            t.bankCards = bankCardsData.data;
          } else if (userInfoData.code == 405) {
            t.$router.push({path: '/login'});
          } else {
            if (userInfoData.code != 100) {
              t.X.tip(userInfoData['resultMsg']);
            } else if (balanceData.code != 100) {
              t.X.tip(balanceData['resultMsg']);
            } else if (bankCardsData.code != 100) {
              t.X.tip(bankCardsData['resultMsg']);
            }
          }
          t.X.loading.hide();
        })).catch(function (error) {
          if (error) {
            console.error(error)
          } else {
            t.X.tip('服务器请求异常')
          }
        })
      },

      //去提现
      doWithdraw () {
        if (!this.user.named) {
          X.dialog.confirm('您还未实名认证，请先实名认证', {
            notify: function (nt) {
              if (nt == 1) {
                this.$router.push({path: '/identification?backURL=/myHome'});
              }
            }
          });
          return;
        }
        if (this.user.balance == 0) {
          X.tip('您的账户没有可提金额');
          return;
        }
        //没有银行卡提示添加银行卡
        if (!this.bankCards.length) {
          X.dialog.confirm('提款前请先添加提款银行卡', {
            sureBtn: '添加银行卡', notify: function (nt) {
              if (nt == 1) {
                //跳转到添加银行卡页面
                this.$router.push('/addBankCard?backURL=/myHome');
              }
            }
          });
          return;
        }
        //没有设置提现密码的提示去设置提现密码
        if (!this.user.withdrawPw) {
          X.dialog.confirm('您还未设置提现密码', {
            sureBtn: '马上设置', notify: function (nt) {
              if (nt == 1) {
                this.$router.push('/tradePassSet?backURL=/withdraw');
              }
            }
          });
          return;
        }
        //银行卡列表可能有多张银行卡，没法校验用户到底选择哪一张卡，该判断放到用户发起提现时候后端校验
        // if ($scope.cardInfo.province == null || $scope.cardInfo.city == null || $scope.cardInfo['subbranch'] == null) {
        //     X.dialog.confirm('您的银行卡信息不全<br>请先完善银行卡信息', {
        //         sureBtn: '去完善', notify: function (nt) {
        //             if (nt == 1) {
        //                 bootURL('/bankInfo');
        //             }
        //         }
        //     });
        //     return;
        // }
        this.$router.push({path: '/withdraw'});
      }
    },

    computed: {}
  }
</script>

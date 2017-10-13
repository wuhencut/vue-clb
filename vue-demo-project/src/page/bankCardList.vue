<template>
  <section id="" class="page-pay">
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <div class="page-bank-card-list">
      <header class="page-header">
        <div class="header-wrap">
          <h3>我的银行卡</h3>
          <a href="#/myInfo" class="nav-left"><i class="icon-back"></i></a>
          <a href="#/addBankCard" class="nav-right" v-if="bankCards.length < 3"><i class="iconfont" style="font-size: 0.28rem">&#xe610;</i></a>
        </div>
      </header>
      <div class="mod-bank-card-list">
        <router-link :key="item.id" v-for="bankCard in bankCards" class="clearfix" :to="bankCardURL">
          <span class="icon"><i :class="item.className"></i></span>
          <p class="title">{{bankCard.bank}} <span v-if="bankCard.defaultCard==0">(默认卡)</span></p>
          <p class="number">**** **** **** {{bankCard.cardNumber.substr(-4)}}</p>
        </router-link>
        <router-link ng-if="bankCards && bankCards.length < 3" class="add" to="/addBankCard">
          <p><span class="add-icon"></span>添加银行卡</p>
        </router-link>
      </div>
      <div class="mt15 pl15 pr15 txt-center txt-grey">注：最多可以添加3张银行卡</div>
    </div>
  </section>
</template>
<script>
    export default{
        data(){
            return {
              glb: this.global,
              bankCards: [],
              user: {},
              sureTxt: '',
            }
        },
        mounted(){

        },
        methods: {
          getData(){
            let t = this;
            this.glb.showLoading = true;
            this.axios.all([
              this.server.UserService.getBankCards(),
              this.server.UserService.getUserInfo()
            ]).then(this.axios.spread(function (bankCards, userInfo) {
              var bankCardData = bankCards.data;
              var userData = userInfo.data;
              if (bankCardData.code == 100 && userData.code == 100) {
                t.user = userData.data;
                t.bankCards.forEach(function (item) {
                  item.className = 'icon-bank-' + item.bankCode;
                  item.bankCardURL = '/modifyBankCard/' + item.id;
                });
                t.bankCards = bankCardData.data;
                t.initValidate();
              } else {
                t.glb.showTip = true;
                t.glb.tipMsg = bankCardData['resultMsg'];
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

          //实名认证
          initValidate() {
            if (!this.user.named) {
              this.glb.showConfirm = true;
              this.glb.confirmMsg = '您还未实名认证，请先实名认证';
              this.sureTxt = '确定';
            }
          },

          //弹窗操作
          confirmFunc(type){
            if(type == 1){
              this.$router.push({path: '/identification', query: {backURL: '/bankCardList'}});
            }else{
              this.$router.push({path: '/myInfo'});
            }
          }
        },
        computed: {},
        destroyed(){

        }
    }
</script>

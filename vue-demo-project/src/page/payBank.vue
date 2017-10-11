<template>
  <section class="page-pay">
    <div class="page-pay-bank">
      <header class="page-header">
        <div class="header-wrap">
          <h3>账户充值</h3>
          <router-link :to="{path: 'payType', query: {backURL: backURL}}" class="nav-left"><i class="icon-back"></i></router-link>
        </div>
      </header>
      <div class="mod-bank">
        <div class="balance">账户余额：{{balance.toFixed(2)}}元</div>
        <div class="username">
          <p><i class="icon-express mr10"></i>无需开通网银，有银行卡就能支付</p>
          <!--
          <p ng-if="userInfo.named" class="pt10">持卡人姓名：{{userInfo.maskName}}</p>
          -->
        </div>
        <!--
        <div ng-if="bankCard==null && bankCode == ''" class="choose-bank" ng-click="chooseBank();">
            请选择银行
            <i class="mod-arrow-r"></i>
        </div>
        <div ng-if="bankCard==null && bankCode != ''" class="choose-bank" ng-click="chooseBank();" >
            <i class="icon-bank-{{bankCode}} mr10"></i>{{chooseBankCard.bankName}}
            <i class="mod-arrow-r"></i>
        </div>
        <div ng-if="bankCard!=null" class="choose-bank">
            <i class="icon-bank-{{bankCard.bankCode}} mr10"></i>{{bankCard.bank}}　尾号{{bankCard.cardNumber.substr(-4)}}
        </div>
        -->
      </div>
      <div class="mod-card">
        <!--
        <div ng-if="bankCard==null" class="mod-form mt10">
            <label>银行卡号</label>
            <input class="inp" type="tel" ng-model="$parent.cardNo" placeholder="请输入银行卡号" style="width: 2rem">
        </div>
        -->
        <div class="mod-form">
          <label>充值金额</label>
          <input class="inp" type="tel" v-model="money" placeholder="最低100元起充" style="width: 2rem">
        </div>
        <!--
        <p class="desc">
            <span class="txt-red">充值手续费：{{charge}}元</span><br>
            <span class="txt-grey">单卡单笔限额5万，每日最高20万</span>
        </p>
        -->
        <p class="desc">
          <span class="txt-grey">注：单卡单笔限额5000，每日最高1万,不支持信用卡</span>
        </p>
      </div>
      <div class="pl15 pr15 pt20">
        <form id="payForm" @submit.prevent="pay();" method="post">
          <!--<input class="hiddenInp" type="hidden" name="req_data">-->
          <input type="submit" class="btn btn-blue" value="提交" />
        </form>
      </div>
    </div>
  </section>
</template>
<script>
    export default{
        data(){
            return {}
        },
        mounted(){

        },
        methods: {},
        computed: {},
        destroyed(){

        }
    }
</script>

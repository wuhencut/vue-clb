<template>
  <section class="page-user">
    <div class="page-help">
      <header v-if="showHeader" class="page-header">
        <div class="header-wrap">
          <h3>客服中心</h3>
          <router-link :to="backURL" class="nav-left"><i class="icon-back"></i></router-link>
          <a href="tel:4008888566" class="nav-right"><i class="icon-tel"></i></a>
        </div>
      </header>
      <div class="mod-help-center">
        <p class="mod-form-title">注册问题</p>
        <div class="mod-menu-wrap">
          <router-link :to="{path:'/helpDetail/QA0001', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">用户名无法登录怎么办？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QA0002', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">忘记登录密码如何获取？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QA0003', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">获取短信验证码失败怎么办？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QA0004', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">登录的方式有哪些？<i
            class="mod-arrow-r"></i></router-link>
        </div>
        <p class="mod-form-title">充值提现问题</p>
        <div class="mod-menu-wrap">
          <router-link :to="{path:'/helpDetail/QB0001', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">如何充值？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QB0002', query: {source: showHeader? '': 'IOSAPP'}}"
             class="mod-menu txt-black">充值提现有什么限制吗？提现多久到账？<i class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QB0003', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">为什么银行卡会充值失败？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QB0004', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">快捷支付收不到验证码怎么办？<i
            class="mod-arrow-r"></i></router-link>
        </div>
        <p class="mod-form-title">交易保证金/费用问题</p>
        <div class="mod-menu-wrap">
          <router-link :to="{path:'/helpDetail/QC0001', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">什么是履约保证金？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QC0002', query: {source: showHeader? '': 'IOSAPP'}}"
             class="mod-menu txt-black">交易的履约保证金是固定的还是浮动的？<i class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QC0003', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">交易过程中可以追加履约保证金吗？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QC0004', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">风险较高容易被平仓，如何选择保证金档次？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QC0005', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">交易需要支付什么费用？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QC0006', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">交易时间费用和汇率是固定的吗？<i
            class="mod-arrow-r"></i></router-link>
        </div>
        <p class="mod-form-title">结算问题</p>
        <div class="mod-menu-wrap">
          <router-link :to="{path:'/helpDetail/QD0001', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">盈亏如何分配？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QD0002', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">如何设置止盈止损？是否有限制？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QD0003', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">国际期货的持仓盈亏是如何计算的？<i
            class="mod-arrow-r"></i></router-link>
          <router-link :to="{path:'/helpDetail/QD0004', query: {source: showHeader? '': 'IOSAPP'}}" class="mod-menu txt-black">是否支持限定价格卖出？<i
            class="mod-arrow-r"></i></router-link>
        </div>
        <div class="wrap-footer mt10">
          <a @click="toHelpCenter();">没有解决问题？点此提问</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        backURL: this.$route.query.backURL || '/',
        showHeader: true,
        source: this.$route.query.source || '',
      }
    },
    mounted(){
      if(this.shource && this.source == 'IOSAPP'){
        this.showHeader = false;
      }
    },
    methods: {
      toHelpCenter() {
        let t = this;
        if (this.showHeader) {
          t.$router.push({path: '/helpCenter', query: {goURL: '/help'}});
        } else {
          window.location = 'jumpCenter::suggestion';
        }
      },
    },
  }
</script>

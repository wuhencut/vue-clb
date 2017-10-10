<template>
  <section class="page-guide">
    <div class="page-guide-menu">
      <header v-if="showHeader" class="page-header">
        <div class="header-wrap">
          <h3>新手引导</h3>
          <router-link to="/index" class="nav-left">
            <i class="icon-back"></i>
          </router-link>
        </div>
      </header>
      <div class="mod-menu-wrap mt20">
        <router-link :to="{path: '/introduce', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          一分钟介绍
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/tradeRuleHSI', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          恒指交易规则
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/tradeRuleGC', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          美黄金交易规则
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/tradeRuleSI', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          美白银交易规则
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/tradeRuleCL', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          美原油交易规则
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/tradeRuleCN', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          富时A50交易规则
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/tradeRuleDAX', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          德指交易规则
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/tradeRuleMHI', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          小恒指交易规则
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/safe', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          安全保证
          <i class="mod-arrow-r"></i>
        </router-link>
        <router-link :to="{path: '/aboutUs', query: {source : showHeader ? '' : 'IOSAPP'}}" class="mod-menu txt-black">
          关于我们
          <i class="mod-arrow-r"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        showHeader: true,
        source: this.$route.query.source,
      }
    },
    mounted(){
      if(this.source && this.source == 'IOSAPP'){
        this.showHeader = false;
      }
    },
    methods: {},
  }
</script>

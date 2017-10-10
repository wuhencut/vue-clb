<template>
  <section class="page-guide">
    <div class="page-introduce">
      <header v-if="showHeader" class="page-header">
        <div class="header-wrap">
          <h3>一分钟介绍</h3>
          <a href="javascript:history.go(-1);" class="nav-left">
            <i class="icon-back"></i>
          </a>
        </div>
      </header>
      <div class="mod-intro-img">
        <img src="../static/images/introduce/introduce8.jpg">
      </div>
      <div class="mod-intro-button">
        <a @click="toTrade();">立即操盘<i></i></a>
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
      if (this.source && this.source == 'IOSAPP') {
        this.showHeader = false;
      }
    },
    methods: {
      toTrade() {
        let t = this;
        if (this.showHeader) {
          t.$router.push({path: '/outerTrade/HSI/2'});
        } else {
          /*window.location = 'jumpCenter::suggestion';*/
          window.location.href = 'clb://clb.yztz.cn/trade?type=1&real=false&kind=gc';
        }
      },
    },
  }
</script>

<template>
  <section class="page-guide">
    <div class="page-about">
      <header v-if="showHeader" class="page-header">
        <div class="header-wrap">
          <h3>关于我们</h3>
          <router-link to="/guide" class="nav-left">
            <i class="icon-back"></i>
          </router-link>
        </div>
      </header>
      <div class="mod-about">
        <br>
        <div class="wrap">
          <p>
            我们是撮合操盘手和投资人的线上合作交易平台，让有能力的操盘手提供交易买卖指令，有资金的投资人提供交易资金，双方按约定共享收益共担风险。
          </p>
          <p>
            我们立志在互惠金融领域努力深耕和创新探索
          </p>
          <p>
            为广大用户提供更多的财富投资产品
          </p>
          <p>
            为中国互联网金融事业添砖加瓦
          </p>
          <p>
            为"大众创业，万众创新"而奋斗
          </p>
        </div>
        <div class="wrap">
          <h3>专业的线上合作交易平台</h3>
          <p>交易合作撮合服务</p>
          <p>交易指令通讯服务</p>
          <p>交易风控管理服务</p>
          <p>合作资金支付服务</p>
          <p>合作协议生成与保管</p>
          <p>精英团队，只为中国金融的明天</p>
          <p>平台由多位证券、金融、私募领域的资深专家，以及互联网精英团队共同组建而成。丰富的金融知识和经验，极致互联网产品体验，让我们立志于从“心”打造一家为用户创造财富的社区化合作交易平台。
          </p>
        </div>
        <div class="wrap">
          <h3>售后服务</h3>
          <p class="noc">客服热线： 0571-28284082 <br/>服务时间： 工作日 8:30-21:00，周末 8:30-17:30</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        showHeader: true,
      }
    },
    mounted(){
      this.ctrlHeader();
    },
    methods: {
      ctrlHeader(){
        let t = this;
        var source = this.$route.query.source;
        if(source && source == 'IOSAPP'){
          t.showHeader = false;
        }
      }
    }
  }
</script>

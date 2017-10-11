<template>
  <section class="page-guide">
    <div class="page-safe">
      <header v-if="showHeader" class="page-header">
        <div class="header-wrap">
          <h3>安全保障</h3>
          <router-link to="/guide" class="nav-left">
            <i class="icon-back"></i>
          </router-link>
        </div>
      </header>
      <div class="mod-about">
        <br>
        <div class="wrap">
          <p>
            这里是撮合操盘手和投资人的线上合作交易平台，为交易双方提供安全、稳定、可靠的服务平台。
          </p>
        </div>
        <div class="wrap">
          <h3>技术安全</h3>
          <p>
            采用银行级监控技术，内部资金信息传输多层加密，分级设制权限，交叉复制，形成严格内部控制体系，用户账户信息，密码防篡改泄露。
          </p>
        </div>
        <div class="wrap">
          <h3>合法合规</h3>
          <p>
            平台不参与交易，只做撮合点买人和投资人的信息匹配服务，指令的通讯服务，交易风控管理服务，资金支付及清算服务，交易合作协议生产和管理服务。
          </p>
        </div>
        <div class="wrap">
          <h3>资金安全</h3>
          <p>
            点买人和投资人的所有资金全部通过第三方支付通道，所有的资金进出全权由第三方机构负责处理并监管。
          </p>
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

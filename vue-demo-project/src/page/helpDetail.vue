<template>
  <section class="page-user">
    <div class="page-help">
      <header v-if="showHeader" class="page-header">
        <div class="header-wrap">
          <h3>问题详情</h3>
          <a href="#/help" class="nav-left"><i class="icon-back"></i></a>
          <a href="tel:4008888566" class="nav-right"><i class="icon-tel"></i></a>
        </div>
      </header>
      <div class="mod-help-detail">
        <h3>{{helpObj.title}}</h3>
        <div class="content" v-html="helpObj.content">

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
        source: this.$route.query.source,
        helpObj: {},
        helpObjs: {},
      }
    },
    mounted(){
      if(this.source && this.source == 'IOSAPP'){
        this.showHeader = false;
      }
      this.regContent()
    },
    methods: {
      toHelpCenter() {
        let t = this;
        if (this.showHeader) {
          t.$router.push({path: '/helpCenter'});
        } else {
          window.location = 'jumpCenter::suggestion';
        }
      },
      regContent(){
        this.helpObjs = {

          'QA0001': {
            title: '用户名无法登录怎么办？',
            content: '<p">使用注册手机号码也可以登录。</p>'
          },
          'QA0002': {
            title: '忘记登录密码如何获取？',
            content: '<p>可以用注册手机找回密码。</p><P>操作流程：选择登录 —— 点击忘记密码 —— 输入手机号码 —— 获取验证码 —— 输入新登录密码 —— 修改成功。</P>'
          },
          'QA0003': {
            title: '获取短信验证码失败怎么办？',
            content: '<p>检查是否输错手机号码。如无问题，请致电400-8888-566（9点到17点半）或15575990597（17点半到21点）客服热线进行处理。</p>'
          },
          'QA0004': {
            title: '登录的方式有哪些？',
            content: '<p>支持微信公众号、app、pc进行登录。</P>'
          },
          'QB0001': {
            title: '如何充值？',
            content: '<p>微信端/APP端目前支持银行卡快捷充值、支付宝转账，在线充值立即到账。</p>'
          },
          'QB0002': {
            title: '充值提现有什么限制吗？提现多久到账？',
            content: '<p>1、充值最低100元。</p><p>2、交易结算后、或者账户有余额，可随时申请提出现金。</p><p>3、单次提款金额最低100元起提，提款采用银行批量转账，到账时间以银行为准，一般处理时间需要1-2个工作日左右，节假日将延后处理。</p>'
          },
          'QB0003': {
            title: '为什么银行卡会充值失败？',
            content: '<p>1、确保银行卡号、姓名、银行预留身份号、身份证号、开户银行是否保持一致。</p><p>2、充值失败可致电400-8888-566（9点到17点半）或15575990597（17点半到21点）获取帮助。</p>'
          },
          'QB0004': {
            title: '快捷支付收不到验证码怎么办？',
            content: '<p>1、请核实手机号是否为该银行卡的绑定手机，手机是否设置短信拦截功能。</p><p>2、因支付验证码是由第三方支付公司发出的，如仍收不到验证码，请致电400-8888-566（9点到17点半）或15575990597（17点半到21点）客服热线咨询并获取帮助。</p>'
          },
          'QC0001': {
            title: '什么是履约保证金？',
            content: '<p>1、履约保证金为点买人委托平台冻结用于履约交易亏损赔付义务的保证金。</p><p>2、点买人以冻结的履约保证金作为承担交易亏损赔付的上限。</p><p>3、多出上限部分的亏损全部由合作的投资人承担。</p><p>4、合作交易结束后，根据结算结果，如交易盈利，点买人冻结的履约保证金全额退还。如交易亏损，从冻结的履约保证金中，扣减操盘人所应承担的亏损赔付额，扣减后余额退还。</p>'
          },
          'QC0002': {
            title: '交易的履约保证金是固定的还是浮动的？',
            content: '<p>目前是固定的，根据投资人选择对应的交易手数叠加。</p>'
          },
          'QC0003': {
            title: '交易过程中可以追加履约保证金吗？',
            content: '<p>交易中不能追加履约保证金，所以开仓的时候，建议选择高保证金，下单成功后，可以自行设置止盈止损。</p>'
          },
          'QC0004': {
            title: '风险较高容易被平仓，如何选择保证金档次？',
            content: '<p>1、每个品种都有多个保证金档次可选的，客户可以按照自己的风险承受能力自由选择每笔的保证金档次。</p><p>2、比如客户可以用1340保证金做一手原油，也可以2010、2680的保证金做一手的原油，在开仓界面，触发止损中选择即可。履约保证金高，不容易被平仓。</p>'
          },
          'QC0005': {
            title: '交易需要支付什么费用？',
            content: '<p>交易过程中只需要支付每笔的交易综合费，不交易不收费，下单未成功撤单也不收费。</p>'
          },
          'QC0006': {
            title: '交易时间费用和汇率是固定的吗？',
            content: '<p>关于交易时间和交易综合费 、汇率，因期货公司变动，平台有可能进行调整，以平台公布的最新数据为准。</p>'
          },
          'QD0001': {
            title: '盈亏如何分配？',
            content: '<p>1、点买人与投资人合作交易，止盈金额以内的盈利，点买人拿90%，投资人拿10%。</p><p>2、超出止盈部分的盈利全部归合作的投资人所有，同时超出止亏部分的亏损也全部由投资人承担。</p>'
          },
          'QD0002': {
            title: '如何设置止盈止损？是否有限制？',
            content: '<p>下单成功后，在持仓信息里可自定义设置，止盈、止损有最大限制。</p>'
          },
          'QD0003': {
            title: '国际期货的持仓盈亏是如何计算的？',
            content: '<p>美原油、美黄金、美白银、富时A50是美元计价盈亏，已经在持仓里边自动按照固定的汇率换算成人民币，平仓会自动结算成人民币。恒指是以港币计价盈亏，已经在持仓里边自动按照固定的汇率换算成人民币，平仓会自动结算成人民币。德指是以欧元计价盈亏，已经在持仓里边自动按照固定的汇率换算成人民币，平仓会自动结算成人民币。</p>'
          },
          'QD0004': {
            title: '是否支持限定价格卖出？',
            content: '<p>暂时不支持。可以通过修改止盈止损去实现。</p>'
          }
        };
        var detailId = this.$route.params.helpDetailId;
        this.helpObj = this.helpObjs[detailId];
      },
    },
  }
</script>

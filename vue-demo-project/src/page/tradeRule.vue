<template>
  <section class="page-guide">
    <div class="page-rule">
      <header v-if="showHeader" class="page-header">
        <div class="header-wrap">
          <h3>{{rule.name}}交易规则</h3>
          <backMenu></backMenu>
        </div>
      </header>
      <div class="mod-trade-rule">
        <div class="wrap">
          <div class="pt20">
            <table>
              <tr>
                <td width="30%;">交易品种</td>
                <td width="70%">{{rule.name}}</td>
              </tr>
              <tr>
                <td>货币单位</td>
                <td>{{rule.currencyUnit}}</td>
              </tr>
              <tr>
                <td>交易单位</td>
                <td>{{rule.tradeUnit}}</td>
              </tr>
              <tr>
                <td>最小波动</td>
                <td>{{rule.waveUnit}}</td>
              </tr>
              <tr>
                <td>波动盈亏</td>
                <td>{{rule.waveProfit}}</td>
              </tr>
              <tr>
                <td>交易时间</td>
                <td v-html="rule.tradeTime"></td>
              </tr>
              <tr>
                <td>清仓时间</td>
                <td>{{rule.clearTime}}</td>
              </tr>
              <tr>
                <td>交易综合费</td>
                <td>{{rule.tradeCost}}</td>
              </tr>
              <tr>
                <td>汇率</td>
                <td>{{rule.exchangeRate}}<br>( 汇率波动较大时，将会进行调整 )</td>
              </tr>
            </table>
          </div>
          <p class="pt10">{{rule.ruleTip}}</p>
        </div>
        <div class="wrap">
          <h3>新手练习</h3>
          <p>如果您是新手，没有交易经验，建议您到模拟练习区进行模拟交易。</p>
        </div>
        <div class="wrap">
          <h3>什么是买涨？</h3>
          <p>当你买涨时，价格涨了你就赚钱，跌了就亏钱。</p>
        </div>
        <div class="wrap">
          <h3>什么是买跌？</h3>
          <p>当你买跌时，价格跌了你就赚钱，涨了就亏钱。</p>
        </div>
        <div class="wrap">
          <h3>什么是止盈？</h3>
          <p>当单笔交易盈利金额触发（多于等于）指定的止盈金额时，该笔交易会被强制平仓。</p>
          <p>由于市场的价格实时都在变动，不保证平仓后最终盈利金额一定大于等于止盈金额，有可能会小于触发的止盈金额。</p>
        </div>
        <div class="wrap">
          <h3>什么是止损？</h3>
          <p>当单笔交易亏损金额触发（多于等于）指定的止损金额时，该笔交易会被强制平仓。</p>
          <p>由于市场的价格实时都在变动，不保证卖出后最终亏损金额一定小于等于止损金额，有可能会大于止损金额。</p>
        </div>
        <div class="wrap">
          <h3>什么是持仓时间？</h3>
          <p>{{rule.tradeTimeTip}}</p>
          <p>当持仓时间到点后，持仓中的交易会被强制平仓，不保证成交价格，请务必在到期前自己选择卖出。</p>
        </div>
        <div class="wrap">
          <h3>大涨大跌交易限制？</h3>
          <p>交易品种涨幅≥20%时禁止买涨，跌幅≥20%时禁止买跌。</p>
        </div>
        <div class="wrap">
          <h3>交易综合费</h3>
          <p>{{rule.tradeCostTip}}（买进卖出只收取一次）</p>
        </div>
        <div class="wrap">
          <h3>履约保证金</h3>
          <p>履约保证金为操盘手委托平台冻结用于履行交易亏损赔付义务的保证金。操盘手以冻结的履约保证金作为承担交易亏损赔付的上限。多出上限部分的亏损全部由合作的投资人承担。</p>
          <p>合作交易结束后，根据结算结果，如交易盈利，操盘手冻结的履约保证金全额退还。如交易亏损，从冻结的履约保证金中，扣减操盘手所应承担的亏损赔付额，扣减后余额退还。</p>
        </div>
        <div class="wrap">
          <h3>盈利如何分配？</h3>
          <p>操盘手与投资人合作交易，止盈金额以内的盈利，操盘手拿90%，投资人拿10%。</p>
          <p>超出止盈部分的盈利全部归合作的投资人所有，同时超出止亏部分的亏损也全部由投资人承担。</p>
        </div>
        <div class="wrap">
          <h3>实盘交易下单</h3>
          <p>{{rule.realTradeTip}}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        backURL: this.$route.query.backURL || '/guide',
        source: this.$route.query.source || '',
        showHeader: true,
        type: this.$route.params.type,
        rules: {
          CL: {}, CN: {}, DAX: {}, GC: {}, HSI: {}, MHI: {}, SI: {}
        },
        rule: {},
      }
    },
    mounted(){
      let t = this;
      if (this.source && this.source == 'IOSAPP') {
        t.showHeader = false;
      }
      this.initInfo();
    },
    methods: {
      initInfo(){
        this.rules = {
          CL: {
            name: '美原油',
            currencyUnit: '美元',
            tradeUnit: '每手1000桶',
            waveUnit: '0.01美元/桶',
            waveProfit: '每次波动 = 10美元',
            tradeTime: '上午06:00:00 - 次日04:55:00',
            clearTime: '次日04:55:00',
            tradeCost: '168元/手',
            exchangeRate: '1美元 = 6.6人民币',
            ruleTip: '纽交所美原油期货，每手1000桶，最小波动10美元（相当于最小波动盈亏人民币66元）可买涨买跌。',
            tradeTimeTip: '美原油股指期货最后持仓时间：次日04:55:00',
            tradeCostTip: '美原油期货每手交易综合费：168元',
            realTradeTip: '操盘手的所有美原油交易，全部经由投资人的期货交易账户，下单到纽约商品交易所。'
          }, CN: {
            name: '富时A50',
            currencyUnit: '美元',
            tradeUnit: '1个指数点',
            waveUnit: '2.5美元/2.5点',
            waveProfit: '波动一次＝2.5美元',
            tradeTime: '白天 09:00:00 - 16:20:00<br>夜间 17:15:00 - 01:55:00</td>',
            clearTime: '白天 16:15:00<br>夜间 01:55:00</td>',
            tradeCost: '88元/手',
            exchangeRate: '1美元 = 6.6人民币',
            ruleTip: '新交所富时A50期货，每点1美元，最小波动2.5点（相当于最小波动盈亏人民币16.5元），可买涨买跌。',
            tradeTimeTip: '富时A50期货最后持仓时间：白天 16:25:00 | 夜间 01:55:00',
            tradeCostTip: '富时A50期货每手交易综合费：88元',
            realTradeTip: '操盘手的所有富时A50交易，全部经由投资人的期货交易账户，下单到新加坡期货交易所。'
          }, DAX: {
            name: '德指',
            currencyUnit: '欧元',
            tradeUnit: '每点187.5元',
            waveUnit: '0.5点',
            waveProfit: '波动一次＝12.5欧元',
            tradeTime: '下午15:00:00-次日04:55:00',
            clearTime: '次日04:55:00',
            tradeCost: '168元/手',
            exchangeRate: '1欧元＝7.5人民币',
            ruleTip: '欧期所德指期货，每点25欧元，最小波动0.5点（相当于最小波动盈亏人民币93.75元），可买涨买跌。',
            tradeTimeTip: '德指期货最后持仓时间：次日04:55:00',
            tradeCostTip: '德指期货每手交易综合费：168元',
            realTradeTip: '操盘手的所有德指交易，全部经由投资人的期货交易账户，下单到欧洲期货交易所。'
          }, GC: {
            name: '美黄金',
            currencyUnit: '美元',
            tradeUnit: '每手100盎司',
            waveUnit: '0.1美元/盎司',
            waveProfit: '每次波动＝10美元',
            tradeTime: '上午06:00:00-次日04:55:00',
            clearTime: '次日04:55:00',
            tradeCost: '158元/手',
            exchangeRate: '1美元＝6.6人民币',
            ruleTip: '纽交所美黄金期货，每手100盎司，最小波动10美元（相当于最小波动盈亏人民币66元），可买涨买跌。',
            tradeTimeTip: '美黄金股指期货最后持仓时间：次日04:55:00',
            tradeCostTip: '美黄金期货每手交易综合费：158元',
            realTradeTip: '操盘手的所有美黄金交易，全部经由投资人的期货交易账户，下单到纽约商品交易所。'
          }, HSI: {
            name: '恒指',
            currencyUnit: '港元',
            tradeUnit: '1个指数点',
            waveUnit: '50港元/点',
            waveProfit: '每点波动＝50港元',
            tradeTime: '上午 09:15:00 - 12:00:00<br>下午 13:00:00 - 16:15:00<br>夜间 17:15:00 - 23:25:00（若有）',
            clearTime: '白天16:15:00<br>夜间23:25:00',
            tradeCost: '158元/手',
            exchangeRate: '1港元＝0.86人民币',
            ruleTip: '港交所恒指期货，每点50港元，最小波动1点（相当于最小波动盈亏人民币43元）， 可买涨买跌。',
            tradeTimeTip: '恒指期货最后持仓时间：白天16:15:00 | 夜间23:25:00',
            tradeCostTip: '恒指期货每手交易综合费：158元',
            realTradeTip: '操盘手的所有恒指交易，全部经由投资人的期货交易账户，下单到港交所。'
          }, MHI: {
            name: '小恒指',
            currencyUnit: '港元',
            tradeUnit: '1个指数点',
            waveUnit: '10港元/点',
            waveProfit: '每点波动＝10港元',
            tradeTime: '上午 09:15:00 - 12:00:00<br>下午 13:00:00 - 16:15:00<br>夜间 17:15:00 - 23:25:00（若有）',
            clearTime: '白天16:15:00<br>夜间23:25:00',
            tradeCost: '50元/手',
            exchangeRate: '1港元＝0.86人民币',
            ruleTip: '港交所小恒指期货，每点10港元，最小波动1点（相当于最小波动盈亏人民币8.6元）， 可买涨买跌。',
            tradeTimeTip: '小恒指期货最后持仓时间：白天16:15:00 | 夜间23:25:00',
            tradeCostTip: '小恒指期货每手交易综合费：50元',
            realTradeTip: '操盘手的所有恒指交易，全部经由投资人的期货交易账户，下单到港交所。'
          }, SI: {
            name: '美白银',
            currencyUnit: '美元',
            tradeUnit: '每手5000盎司',
            waveUnit: '0.005美元/盎司',
            waveProfit: '波动一次＝25美元',
            tradeTime: '上午06:00:00-次日04:55:00',
            clearTime: '次日04:55:00',
            tradeCost: '158元/手',
            exchangeRate: '1美元＝6.6人民币',
            ruleTip: '纽交所美白银期货，每手5000盎司，最小波动25美元（相当于最小波动盈亏人民币165元），可买涨买跌。',
            tradeTimeTip: '美白银股指期货最后持仓时间：次日04:55:00',
            tradeCostTip: '美白银期货每手交易综合费：158元',
            realTradeTip: '操盘手的所有美白银交易，全部经由投资人的期货交易账户，下单到纽约商品交易所。'
          }
        };
        this.rule = this.rules[this.type];
      }
    },
    computed: {},
    destroyed(){

    }
  }
</script>

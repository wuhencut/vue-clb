<template>
  <div class="mod-clearing">
    <div v-for="trade in saleList" class="wrap mt15 txt-gray pb15">
      <ul class="row-1">
        <li class="txt-s16">{{trade.commodityName}}－{{trade.commodityNo}}{{trade.contractNo}} <i
          class="txt-s12 pl10">JQ {{trade.id}}</i></li>
        <li v-if="trade.status != 4" class="txt-right txt-light-gray txt-s12">设置止盈止损</li>
        <li @click="setGainLoss(trade.id,trade.commodityNo,trade.quitGain,trade.quitLoss,trade.rmb)"
            v-if="trade.status == 4" class="txt-right txt-s12 txt-blue">设置止盈止损
        </li>
      </ul>
      <div class="row-2">
        <ul class="clearfix">
          <li class="fl">
            <p v-if="trade.direction == 1" class="title txt-red">看涨{{trade.amount}}手</p>
            <p v-if="trade.direction == -1" class="title txt-green">看跌{{trade.amount}}手</p>
            <p>买入 &nbsp;&nbsp;{{trade.buyPriceDeal}}</p>
            <p>现价 &nbsp;&nbsp;{{trade.price}}</p>
          </li>
          <li class="fl">
            <p v-if="trade.rmb>0 && trade.status >= 4" class="title txt-red">+{{trade.rmb}}<i
              class="txt-light-gray txt-s12">({{trade.symbol}}{{trade.currMoney}})</i>
            </p>
            <p v-if="trade.rmb<0 && trade.status >= 4" class="title txt-green">{{trade.rmb}}<i
              class="txt-light-gray txt-s12">({{trade.symbol}}{{trade.currMoney}})</i>
            </p>
            <p v-if="trade.rmb==0 && trade.status >= 4" class="title txt-red">0<i
              class="txt-light-gray txt-s12">({{trade.symbol}}0)</i></p>
            <p v-if="trade.status < 4" class="title txt-light-gray">— —</p>
            <p>止盈 &nbsp;&nbsp;{{trade.quitGain}}</p>
            <p>止损 &nbsp;-{{trade.quitLoss}}</p>
          </li>
          <li class="fr pt15">
            <div
              @click="sellOutDialog(trade.id,trade.commodityNo,trade.direction,trade.quitCloseRatio,trade.amount,trade.status)"
              v-if="trade.status == 4" class="state-blue">平仓
            </div>
            <div v-if="trade.status == 1 || trade.status == 2 || trade.status == 3" class="state">
              正在<br>买入
            </div>
            <div v-if="trade.status == 5 || trade.status == 6 || trade.status == 7" class="state">
              正在<br>卖出
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--止盈止损弹窗-->
    <div v-if="currCommoID == 1" class="mod-all-sell">
      <div class="all-sell-options txt-center">
        <div class="title-inf txt-s14">
          <p class="txt-s14 txt-left">{{setWindowObj.setCommoName}} - {{setWindowObj.setCommoNo}}{{setWindowObj.setContractNo}}</p>
          <p v-if="setDirection == 1" class="txt-left">看涨{{setWindowObj.setAmount}}手</p>
          <p v-if="setDirection == -1" class="txt-left">看跌{{setWindowObj.setAmount}}手</p>
          <p v-if="rmb > 0" class="txt-red txt-right">+{{rmb}}</p>
          <p v-if="rmb < 0" class="txt-green txt-right">{{rmb}}</p>
          <p v-if="rmb == 0" class="txt-red txt-right">0</p>
        </div>
        <div class="amount-adjust">
          <p class="gainLossSet">盈利
            <i v-if="gainInput > onePointPrice" @click="setAdd('gain',gainInput,-1)" class="amount-btn-reduce"></i>
            <i v-if="gainInput <= onePointPrice" class="btn-reduce-disabled"></i>
            <input type="number" class="amount txt-center" v-model="gainInput" style="width: 64px;"/>
            <i v-if="gainInput < setWindowObj.setGainPrincipal" @click="setAdd('gain',gainInput, 1)" class="amount-btn-add"></i>
            <i v-if="gainInput >= setWindowObj.setGainPrincipal" class="btn-add-disabled"></i>元时,触发平仓
          </p>
          <p>亏损
            <i v-if="lossInput > onePointPrice" @click="setAdd('loss',lossInput,-1)" class="amount-btn-reduce"></i>
            <i v-if="lossInput <= onePointPrice" class="btn-reduce-disabled"></i>
            <input type="number" class="amount txt-center" v-model="lossInput" style="width: 64px;"/>
            <i v-if="lossInput < setLossPrincipal" @click="setAdd('loss',lossInput, 1)" class="amount-btn-add"></i>
            <i v-if="lossInput >= setLossPrincipal" class="btn-add-disabled"></i>元时,触发平仓
          </p>
        </div>
        <div class="dialog-confirm txt-s16 txt-red">
          <p @click="cancelDialog()">取消</p>
          <p @click="confirmGainLoss()">确定</p>
        </div>
      </div>
    </div>
    <!--弹出全部平仓窗口-->
    <div v-if="sellAllID == 1" class="mod-all-sell">
      <div class="all-sell-options">
        <ul class="txt-s14">
          <li><i @click="chooseAllSell()" v-if="allSellStatus == 1 || allSellStatus == 2" class="all-sell-check"></i><i
            v-if="allSellStatus == 0" class="all-sell-checked"></i><i>共{{allIDsArr.length}}笔 > 全部即时平仓</i></li>
          <li v-if="upIDsArr.length > 0 && upIDsArr.length < allIDsArr.length"><i @click="chooseAllUp()"
                                                                                  v-if="allSellStatus == 0 || allSellStatus == 2"
                                                                                  class="all-sell-check"></i><i
            v-if="allSellStatus == 1" class="all-sell-checked"></i><i><i class="txt-red">看涨共{{upIDsArr.length}}笔</i> >
            全部即时平仓</i></li>
          <li v-if="downIDsArr.length > 0 && downIDsArr.length < allIDsArr.length"><i @click="chooseAllDown()"
                                                                                      v-if="allSellStatus == 1 || allSellStatus == 0"
                                                                                      class="all-sell-check"></i><i
            v-if="allSellStatus == 2" class="all-sell-checked"></i><i><i class="txt-green">看跌共{{downIDsArr.length}}笔</i>
            > 全部即时平仓</i></li>
          <div class="dialog-confirm txt-s16 txt-red txt-center">
            <p @click="cancelDialog()">取消</p>
            <p @click="sellCurrCommodity()">确定</p>
          </div>
        </ul>
      </div>
    </div>
    <!--弹出单个平仓窗口-->
    <div v-if="sellOutID == 1" class="mod-all-sell">
      <div class="all-sell-options txt-center">
        <div class="sell-directions clearfix">
          <div v-if="choiceStatus == 0" class="txt-red chosen sell-left fl ml30">即时平仓</div>
          <div v-if="choiceStatus == -1 || choiceStatus == 1" @click="chooseSellOut()" class="sell-left fl ml30">即时平仓
          </div>
          <div v-if="choiceStatus == 1" class="txt-red chosen sell-right fr mr30"><p>即时卖出<br>马上<i
            v-if="tradeDirection == 1" class="txt-green">看跌</i><i v-if="tradeDirection == -1" class="txt-red">看涨</i></p>
          </div>
          <div v-if="choiceStatus == -1 || choiceStatus == 0" @click="chooseBackHand()" class="sell-right fr mr30"><p>
            即时卖出<br>马上<i v-if="tradeDirection == 1" class="txt-green">看跌</i><i v-if="tradeDirection == -1" class="txt-red">看涨</i></p></div>
        </div>
        <div class="dialog-confirm txt-s16 txt-red">
          <p @click="cancelDialog()">取消</p>
          <p @click="sellCurrCommodity()">确定</p>
        </div>
      </div>
    </div>
    <!--全部平仓-->
    <div class="mod-sell-footer txt-white txt-s18">
      <p v-if="total>0" class="txt-light-gray txt-s12 txt-center">持仓盈亏 <i class="txt-red">+{{total}}</i></p>
      <p v-if="total<0" class="txt-light-gray txt-s12 txt-center">持仓盈亏 <i class="txt-green">{{total}}</i></p>
      <p v-if="total==0" class="txt-light-gray txt-s12 txt-center">持仓盈亏 <i class="txt-red">0</i></p>
      <button @click="allSellDialog()" class="btn btn-blue mt10" v-if="allIDsArr.length>=2">全部平仓</button>
    </div>
    <div v-if="currCommoID != 0 || sellOutID != 0 || sellAllID != 0" class="db-bg" style="z-index: 10000"></div>
    <div v-if="saleList.length && saleList.length == 0" class="mod-no-data">暂无交易</div>
    <tip v-if="glb.showTip" :tip="glb.tipMsg" @hide="glb.showTip = false"></tip>
    <loading v-if="glb.showLoading"></loading>
    <alert :alertMsg="glb.alertMsg" v-if="glb.showAlert" :sure="alertFunc(type)"></alert>
  </div>
</template>
<script>
  export default{
    props: [
      'tradeType',//点买，点卖，结算
      'commonType',//期货类型
      'marketType',//实盘，模拟盘
    ],
    data(){
      return {
        SystemService: this.server.SystemService(),
        glb: this.global,
        options: {
          CL:{},
          CN:{},
          DAX:{},
          GC:{},
          HSI:{},
          MHI:{},
          SI:{}
        }, // 行情相关信息
        currentSaleFutures: [],//当前策略
        currentPrices: {},//当前买价
        //初始化弹窗ID
        currCommoID: 0,
        sellOutID: 0,
        sellAllID: 0,
        HSIRiskData: {}, CLRiskData: {}, GCRiskData: {}, SIRiskData: {}, CNRiskData: {}, DAXRiskData: {},
        MHIRiskData: {},
        willSaleTradeID: '',//要卖出的方案ID
        sellCommoNo: '',//当前策略号（后面反手有用）
        saleList: [],    //策略列表
        total: 0,    //总盈亏
        gainInput: 0,//初始化绑定输入框的v-model\
        lossInput: 0,//止盈止损
        currCommoNo: '',//声明策略号，为后面弹窗实时显示当前策略盈亏做准备
        currID: 0,//声明策略ID，准确取到当前策略的盈亏（currCommoNo && currID）
        setWindowObj: {}, // 止盈止损弹窗对象
        onePointPrice: 0, //一个波动点的价格
        setLossPrincipal: 0, //最大止损价格
        rmb: 0, // 止盈止损弹窗右上角的价格
        tradeDirection: null,//交易方向
        allSellStatus: null,//状态为0：全选，1：选择涨，2：选择跌
        choiceStatus: 0,//根据状态来判断选择了即时平仓还是马上看跌，0：即时平仓，1：即时平仓，马上看跌/看涨
        closeFeaturesData: [],//平仓对象数据
        alertType: 'info',//展示内容和操作类型
        allIDsArr: [],//所有持仓列表的ID
        setDirection: -1,
      }
    },
    mounted(){
      this.getRisk();
      this.getFuturesSale();
      this.X.engine.addTask(this.getFuturesSale, 3000);//持仓
      this.X.engine.addTask(this.getFuturesQuote, 1000);//行情
      this.X.engine.start();
    },
    methods: {
      //分别获取到恒指、美原油、美黄金的风控数据
      getRisk(){
        let t = this;
        this.axios.all([//分别获取到恒指、美原油、美黄金的风控数据
          this.server.TradeService.getRisk('HSI'),
          this.server.TradeService.getRisk('CL'),
          this.server.TradeService.getRisk('GC'),
          this.server.TradeService.getRisk('SI'),
          this.server.TradeService.getRisk('CN'),
          this.server.TradeService.getRisk('DAX'),
          this.server.TradeService.getRisk('MHI')
        ]).then(this.axios.spread(function (HSIRisk, CLRisk, GCRisk, SIRisk, CNRisk, DAXRisk, MHIRisk) {
          t.HSIRiskData = HSIRisk.data;
          t.CLRiskData = CLRisk.data;
          t.GCRiskData = GCRisk.data;
          t.SIRiskData = SIRisk.data;
          t.CNRiskData = CNRisk.data;
          t.DAXRiskData = DAXRisk.data;
          t.MHIRiskData = MHIRisk.data;
          if (t.HSIRiskData.code == 100 && t.CLRiskData.code == 100 && t.GCRiskData.code == 100 && t.SIRiskData.code == 100 && t.CNRiskData.code == 100 && t.DAXRiskData.code == 100 && t.MHIRiskData.code == 100) {
            t.init(t.HSIRiskData.data['strRisk'], t.CLRiskData.data['strRisk'], t.GCRiskData.data['strRisk'], t.SIRiskData.data['strRisk'], t.CNRiskData.data['strRisk'], t.DAXRiskData.data['strRisk'], t.MHIRiskData.data['strRisk']);//分别取到strRisk的数据并转换JSON为js对象
          } else {
            t.showTip = true;
            t.tipMsg = '系统错误';
          }
        })).catch(function (error) {
          if (error) {
            t.showTip = true;
            t.tipMsg = error;
            Promise.reject(error)
          } else {
            t.showTip = true;
            t.tipMsg = '服务器请求异常';
          }
        });
      },

      //初始化配置参数数据，开启定时任务
      init(HSIRisk, CLRisk, GCRisk, SIRisk, CNRisk, DAXRisk, MHIRisk) {
        let t = this;
        var hsiRisk = JSON.parse(HSIRisk);
        var clRisk = JSON.parse(CLRisk);
        var gcRisk = JSON.parse(GCRisk);
        var siRisk = JSON.parse(SIRisk);
        var cnRisk = JSON.parse(CNRisk);
        var daxRisk = JSON.parse(DAXRisk);
        var mhiRisk = JSON.parse(MHIRisk);
        var HSICommNo = t.getCommNo(hsiRisk['contractCode'].value);
        var CLCommNo = t.getCommNo(clRisk['contractCode'].value);
        var GCCommNo = t.getCommNo(gcRisk['contractCode'].value);
        var SICommNo = t.getCommNo(siRisk['contractCode'].value);
        var CNCommNo = t.getCommNo(cnRisk['contractCode'].value);
        var DAXCommNo = t.getCommNo(daxRisk['contractCode'].value);
        var MHICommNo = t.getCommNo(mhiRisk['contractCode'].value);

        t.options[HSICommNo] = {
          symbol: 'HK$',
          commodityNo: HSICommNo,
          contractValue: t.X.toFloat(hsiRisk['contractValue'].value),
          exchangeRate: t.X.toFloat(hsiRisk['exchangeRate'].value),
          fluctuationValue: t.X.toFloat(hsiRisk['fluctuationValue'].value),
          isTrade: hsiRisk['isTrade'].value
        };
        t.options[CLCommNo] = {
          symbol: '$',//货币标示符
          commodityNo: CLCommNo,//策略号
          contractValue: t.X.toFloat(clRisk['contractValue'].value),//波动单价
          exchangeRate: t.X.toFloat(clRisk['exchangeRate'].value),//汇率
          fluctuationValue: t.X.toFloat(clRisk['fluctuationValue'].value),//最小波动点数
          isTrade: clRisk['isTrade'].value
        };
        t.options[GCCommNo] = {
          symbol: '$',
          commodityNo: GCCommNo,
          contractValue: t.X.toFloat(gcRisk['contractValue'].value),
          exchangeRate: t.X.toFloat(gcRisk['exchangeRate'].value),
          fluctuationValue: t.X.toFloat(gcRisk['fluctuationValue'].value),
          isTrade: gcRisk['isTrade'].value
        };
        t.options[SICommNo] = {
          symbol: '$',
          commodityNo: SICommNo,
          contractValue: t.X.toFloat(siRisk['contractValue'].value),
          exchangeRate: t.X.toFloat(siRisk['exchangeRate'].value),
          fluctuationValue: t.X.toFloat(siRisk['fluctuationValue'].value),
          isTrade: siRisk['isTrade'].value
        };
        t.options[CNCommNo] = {
          symbol: '$',
          commodityNo: CNCommNo,
          contractValue: t.X.toFloat(cnRisk['contractValue'].value),
          exchangeRate: t.X.toFloat(cnRisk['exchangeRate'].value),
          fluctuationValue: t.X.toFloat(cnRisk['fluctuationValue'].value),
          isTrade: cnRisk['isTrade'].value
        };
        t.options[DAXCommNo] = {
          symbol: '€',
          commodityNo: DAXCommNo,
          contractValue: t.X.toFloat(daxRisk['contractValue'].value),
          exchangeRate: t.X.toFloat(daxRisk['exchangeRate'].value),
          fluctuationValue: t.X.toFloat(daxRisk['fluctuationValue'].value),
          isTrade: daxRisk['isTrade'].value
        };
        t.options[MHICommNo] = {
          symbol: 'HK$',
          commodityNo: MHICommNo,
          contractValue: t.X.toFloat(mhiRisk['contractValue'].value),
          exchangeRate: t.X.toFloat(mhiRisk['exchangeRate'].value),
          fluctuationValue: t.X.toFloat(mhiRisk['fluctuationValue'].value),
          isTrade: mhiRisk['isTrade'].value
        };
        t.getFuturesSale();
      },
      //转换策略代号如CL1606 -->CL
      getCommNo(commNo) {
        return commNo.replace(/\d+/, '');
      },

      //初始化risk数据，得到时候交易时间和holiday等参数
      initRisk(data, commo) {
        var serverTime = data['nowTime'];
        var risk = JSON.parse(data['strRisk']);
        var holiday = this.SystemService.parseHoliday(risk['holiday'].value);
        var tradeTime = this.SystemService.parsePeriod(risk['tradingTimeLimit'].value);
        var quoteTime = this.SystemService.parsePeriod(risk['quoteTime'].value);
        //配置参数要优先设置，否则所有的方法都会有问题，因为所有的计算都是依赖于基础的参数配置的
        var isTrade = risk['isTrade'].value == '1';
        this.SystemService.setCurrentTime(serverTime);
        this.SystemService.setCurrentCurrencyType('USD');
        this.SystemService.setHoliday(holiday);
        this.SystemService.setTradePeriod(tradeTime);
        this.SystemService.setQuotePeriod(quoteTime, commo);
      },

      //查询持仓数据
      getFuturesSale() {
        let t = this;
        t.server.TradeService.getSaleFutures(t.marketType).then(function (res) {
          var tradeData = res.data;
          if (tradeData.code == 100) {
            t.currentSaleFutures = tradeData.data;
            //保证查询持仓同时能获取行情数据
            t.getFuturesQuote();
            t.process();//此时已得到$scope.saleList

            t.upIDsArr = [];//看涨的策略ID
            t.downIDsArr = [];//看跌的策略ID
            t.allIDsArr = [];//所有ID

            t.saleList.forEach(function (currCommo) {
              var direction = currCommo['direction'];//交易方向（看张看跌）
              var status = currCommo['status'];//当前状态：持仓，正在卖出，正在买入
              var commoNo = currCommo['commodityNo'];//当前策略号
              var isTrade = t.options[commoNo]['isTrade'] == '1';//判断是否在交易时间内（可手动开关的）
              if (isTrade) {
                var isInPeriod = false;
                if (commoNo == 'HSI') {//分别取得判断时候在实际交易时间的配置参数
                  t.initRisk(t.HSIRiskData.data, commoNo);
                  isInPeriod = t.SystemService.isInPeriod(commoNo, 'trade')
                } else if (commoNo == 'GC') {
                  t.initRisk(t.GCRiskData.data, commoNo);
                  isInPeriod = t.SystemService.isInPeriod(commoNo, 'trade')
                } else if (commoNo == 'CL') {
                  t.initRisk(t.CLRiskData.data, commoNo);
                  isInPeriod = t.SystemService.isInPeriod(commoNo, 'trade')
                } else if (commoNo == 'SI') {
                  t.initRisk(t.SIRiskData.data, commoNo);
                  isInPeriod = t.SystemService.isInPeriod(commoNo, 'trade')
                  console.log(isInPeriod);
                } else if (commoNo == 'CN') {
                  t.initRisk(t.CNRiskData.data, commoNo);
                  isInPeriod = t.SystemService.isInPeriod(commoNo, 'trade')
                } else if (commoNo == 'DAX') {
                  t.initRisk(t.DAXRiskData.data, commoNo);
                  isInPeriod = t.SystemService.isInPeriod(commoNo, 'trade')
                } else if (commoNo == 'MHI') {
                  t.initRisk(t.MHIRiskData.data, commoNo);
                  isInPeriod = t.SystemService.isInPeriod(commoNo, 'trade')
                }
                if (isInPeriod && status == 4) {
                  if (direction == 1) {
                    t.upIDsArr.push(currCommo['id']);
                  }
                  if (direction == -1) {
                    t.downIDsArr.push(currCommo['id']);
                  }
                }
              }
              //将id数组转换成字符串
              t.upIDsArr.join(',');
              t.downIDsArr.join(',');
              t.allIDsArr = t.upIDsArr.concat(t.downIDsArr);
            })

          } else {
            t.showTip = true;
            t.tipMsg = tradeData['resultMsg'];
          }
        }).catch(function (error) {
          if (error) {
            t.showTip = true;
            t.tipMsg = error;
            Promise.reject(error)
          } else {
            t.showTip = true;
            t.tipMsg = '服务器请求异常';
          }
        });
      },

      //查询行情数据
      getFuturesQuote() {
        let t = this;
        //是否在交易时段
        //查询持仓中对应的策略号'HSI','GC','CL'(可能并不会都存在)
        var commNoStr = t.getSaleCommNo(t.currentSaleFutures);
        if (commNoStr.length == 0)return;
        t.server.StockService.getFuturesSimpleQuote(commNoStr.join(',')).then(function (res) {
          var quoteData = res.data, quoteDataArray;
          if (quoteData.code == 100) {
            quoteDataArray = quoteData.data.split(';');
            //解析行情 ：  遍历行情，并将与行情相对应的当前买价与行情对应
            t.parseQuote(commNoStr, quoteDataArray);
            t.process();
          } else {
            t.showTip = true;
            t.tipMsg = quoteData['resultMsg'];
          }
        }).catch(function (error) {
          if (error) {
            t.showTip = true;
            t.tipMsg = error;
            Promise.reject(error)
          } else {
            t.showTip = true;
            t.tipMsg = '服务器请求异常';
          }
        });
      },

      //查询持仓中对应的策略代码'HSI','GC','CL'(可能并不会都存在)
      getSaleCommNo(data) {
        var commNos = [];
        data.forEach(function (commObj) {
          var commodityNo = commObj['commodityNo'];
          commNos.indexOf(commodityNo) == -1 && commNos.push(commodityNo);//如果当前commoNos中没有commodityNo，则推入当前commodityNo
        });
        return commNos;
      },

      //解析行情 ：  遍历行情，并将与行情相对应的当前买价与行情对应
      parseQuote(commNoStr, quoteDataArray) {
        let t = this;
        if (quoteDataArray.length == commNoStr.length) {
          commNoStr.forEach(function (commNo, i) {
            var quoteData = quoteDataArray[i],
              quoteDataArr = quoteData.split(',');
            //与行情相对应的当前卖价
            t.currentPrices[commNo] = quoteDataArr[2];
          });
        }
      },

      //根据持仓获得的数据进行配置成需要的参数，并得到策略列表$scope.saleList
      process() {
        let t = this;
        t.saleList = [];
        t.total = 0;//总盈亏
        t.currentSaleFutures.forEach(function (commInfo) {
          var commNo = commInfo['commodityNo'];
          var currOptions = t.options[commNo] || '';
          var buyPriceDeal = commInfo['buyPriceDeal'];
          var price = t.X.toFloat(t.currentPrices[commNo]);
          var direction = commInfo['direction'] == 'B' ? 1 : -1;
          var amount = commInfo['amount'];
          var symbol = currOptions.symbol;
          var status = commInfo['status'];

          //当前盈亏
          var currMoney = 0;
          var rmb = 0;
          //如果买价从行情获取到
          if (buyPriceDeal) {//                                          最小波动点数                              波动单价            涨跌方向
            currMoney = Math.round((price - buyPriceDeal) / currOptions.fluctuationValue * amount * currOptions.contractValue * direction * 100) / 100;
            //                                            汇率
            rmb = Math.round(currMoney * currOptions.exchangeRate * 100) / 100;
          }
          //商品数据初始化
          var commObj = {
            id: commInfo['id'],//策略ID
            amount: amount,//手数
            commodityName: commInfo['commodityName'],//策略名字
            commodityNo: commNo,//策略号
            buyPriceDeal: buyPriceDeal,//买入价
            contractNo: commInfo['contractNo'],
            dealTime: commInfo['dealTime'],//结算时间
            direction: direction,//交易方向：看掌柜看跌
            gainPrincipal: commInfo['gainPrincipal'],//最大止盈线
            lossPrincipal: commInfo['lossPrincipal'],//合约保证金
            quitLoss: commInfo['quitLoss'],//当前止损线
            quitGain: commInfo['quitGain'],//当前止盈线
            status: status,//当前策略状态
            price: t.currentPrices[commNo],//当前价
            currMoney: Math.round(currMoney * 100) / 100,//当前策略盈亏
            symbol: symbol,//货币符 ： $ HK$
            rmb: rmb,//当前盈亏转换为人名币后的金额
            quitCloseRatio: commInfo['quitCloseRatio']//点数
          };
          t.saleList.push(commObj);
          if (status > 3) {//状态为持仓和正在卖出时都要计算总盈亏
            t.total = Math.round((t.total + rmb) * 100) / 100;//总盈亏也会数显0.09999999999998/0.000000000001
          }
        });
      },

      //弹窗交互

      //弹出止盈止损窗口
      setGainLoss(tradeID, setCommoNo, setGain, setLoss) {
        let t = this;
        t.currCommoNo = setCommoNo;//弹框后将闯入的策略号赋值给之前生命的currCommoNo
        t.currID = tradeID;//得到当前ID
        t.gainInput = setGain;//将止盈止损线金额赋给input框中作为默认值
        t.lossInput = setLoss;
        var addObj = t.options[setCommoNo];//策略号对应的风控配置参数
        t.willSaleTradeID = tradeID;//若点击的是单挑测U额，ID只有一个，赋给willSaleTradeID
        t.currCommoID = 1;//弹出止盈止损窗口

        var quitCloseRatio = 0;//止损线点数
        var addContractValue = addObj['contractValue'],//最小波动点的对应货币价格
          addExchangeRate = addObj['exchangeRate'];//汇率

        t.saleList.forEach(function (gainLossObj) {//遍历saleList取到当前ID对应的相关数据
          var gainLossID = gainLossObj['id'];//当前策略ID
          if (gainLossID == tradeID) {
            quitCloseRatio = gainLossObj['quitCloseRatio'];//止损线点数
            t.setWindowObj = {
              setGainPrincipal: gainLossObj['gainPrincipal'],//最大止盈线金额
              setCommoName: gainLossObj['commodityName'],//策略name
              setCommoNo: gainLossObj['commodityNo'],//策略号
              setDirection: gainLossObj['direction'],//交易方向
              setAmount: gainLossObj['amount'],//手数
              setContractNo: gainLossObj['contractNo']//策略编号：1606....
            };
            //一个波动点的价格 * 手数 * 汇率 = 单个策略最小波动价格
            t.onePointPrice = Math.round(addContractValue * addExchangeRate * t.setWindowObj['setAmount'] * 100) / 100;//当前策略止盈止损允许的按钮最低调整价
          }
        });

        t.setLossPrincipal = Math.round(t.onePointPrice * quitCloseRatio * 100) / 100 | 0;//当前策略的最低止损线金额

        t.getPrice();//获取当前价
//        t.X.engine.addTask(t.getPrice, 1000);//1秒取一次
      },

      //取当前策略的当前价
      getPrice() {
        let t = this;
        var currPrice = 0;
        t.saleList.forEach(function (currObj) {
          if (t.currCommoNo == currObj['commodityNo'] && t.currID == currObj['id'])
            currPrice = currObj['rmb'];
        });
        t.rmb = currPrice;
      },

      //                      止盈/止损 金额  + / -
      setAdd(type, data, flag) {//按钮的算法
        let t = this;
        data += t.onePointPrice * flag;
        if (type == 'gain') {
          t.gainInput = Math.round(data * 100) / 100;//保留两位小数
          if (t.gainInput > t.setWindowObj['setGainPrincipal']) {//如果大于最大止盈金额，则设置成最大止盈金额
            t.gainInput = t.setWindowObj['setGainPrincipal'];
          } else if (t.gainInput < t.onePointPrice) {//如果小于最小波动点金额 * 手数，则设置成最小波动点金额 * 手数
            t.gainInput = t.onePointPrice;
          }
        } else {
          t.lossInput = Math.round(data * 100) / 100;
          if (t.lossInput > t.setLossPrincipal) {
            t.lossInput = t.setLossPrincipal;
          } else if (t.lossInput < t.onePointPrice) {
            t.lossInput = t.onePointPrice;
          }
        }
      },
      //alert弹窗的确定操作
      alertFunc(){
        let t = this;
        if(this.alertType == 'info'){
          t.glb.showAlert = false
          return
        }else if(t.alertType == 'aa'){ // 止盈金额大于最大止盈
          t.gainInput = t.setWindowObj['setGainPrincipal'];
          return
        }else if(t.alertType == 'bb'){ // 止盈金额小于最小止盈
          t.gainInput = t.onePointPrice;
          return
        }else if(t.alertType == 'cc'){ // 止损金额大于最大止损
          t.lossInput = t.setLossPrincipal;
          return
        }else if(t.alertType == 'dd'){ // 止损金额小于最小止损
          t.lossInput = t.onePointPrice;
          return
        }
      },

      //止盈止损确认
      confirmGainLoss() {//止盈止损金额大于最大止盈止损，或者小于onPointPrice时，自动调整为最大最小限定值，并提示
        let t = this;
        if (t.gainInput > t.setWindowObj['setGainPrincipal']) {
          t.glb.showAlert = true;
          t.glb.alertMsg = '止盈金额不能大于' + t.setWindowObj['setGainPrincipal'];
          t.alertType = 'aa';
        }
        if (t.gainInput < t.onePointPrice) {
          t.glb.showAlert = true;
          t.glb.alertMsg = '止盈金额不能小于' + t.onePointPrice;
          t.alertType = 'bb';
        }
        if (t.lossInput > t.setLossPrincipal) {
          t.glb.showAlert = true;
          t.glb.alertMsg = '止损金额不能大于' + t.setLossPrincipal;
          t.alertType = 'cc';
        }
        if (t.lossInput < t.onePointPrice) {
          t.glb.showAlert = true;
          t.glb.alertMsg = '止损金额不能小于' + t.onePointPrice;
          t.alertType = 'dd';
        }

        var setLoss = t.lossInput.toFixed(2), setGain = t.gainInput.toFixed(2);
        t.server.TradeService.setQuitGainLoss(willSaleTradeID, t.marketType, setLoss, setGain).then(function (res) {
          t.currCommoID = 0;
          var setData = res.data;
          if (setData.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '设置成功';
//            X.dialog.alert('设置成功');
            t.getFuturesSale();
          } else {
            t.showTip = true;
            t.tipMsg = setData['resultMsg'];
          }
        }).catch(function (error) {
          if (error) {
            Promise.reject(error)
          } else {
            t.showTip = true;
            t.tipMsg = '服务器请求异常';
          }
        });
      },

      //弹出平仓交易窗口 当前ID    策略号     交易方向        止损线点数       手数      状态
      sellOutDialog(tradeID, commo, tradeDirection, tradeCloseRadio, amount, status) {
        let t = this;
        t.willSaleTradeID = tradeID;
        t.sellCommoNo = commo;
        t.server.TradeService.getRisk(commo).then(function (res) {
          var riskData = res.data;
          if (riskData.code == 100) {
            var riskStr = riskData.data['strRisk'];
            var risk = JSON.parse(riskStr);
            var isTrade = risk['isTrade'].value == '1';//判断是否暂停交易
            t.initRisk(riskData.data, sellCommoNo);//得到节假日，是否暂停交易等信息
            var isInPeriod = t.SystemService.isInPeriod(commo, 'trade');
            var tradeT = t.SystemService.beyondTradeTimeTips(commo);
            if (isTrade) {
              if (!isInPeriod) {
                t.alertType = 'info';
                t.glb.showAlert = true;
                t.glb.alertMsg = tradeT;
              }
              else {
                t.sellOutID = 1;
              }
            } else {
              t.alertType = 'info';
              t.glb.showAlert = true;
              t.glb.alertMsg = '暂停交易';
            }
          }
        }).catch(function (error) {
          if (error) {
            Promise.reject(error)
          } else {
            t.showTip = true;
            t.tipMsg = '服务器请求异常';
          }
        });
        t.tradeDirection = tradeDirection;
        t.quitCloseRatio = tradeCloseRadio;
        t.status = status;
        t.amount = amount;
      },

      //选择卖出的类型
      chooseAllSell() {
        this.allSellStatus = 0;   //状态为0：全选，1：选择涨，2：选择跌
      },
      //选择涨类型
      chooseAllUp() {
        this.allSellStatus = 1;
      },
      //选择跌的类型
      chooseAllDown() {
        this.allSellStatus = 2;
      },

      //弹出全部平仓窗口
      allSellDialog() {
        this.sellAllID = 1;
        this.allSellStatus = 0;
        if (this.upIDsArr.length == this.allIDsArr.length || this.downIDsArr.length == this.allIDsArr.length) this.allSellStatus = 0;
      },

      //选择卖出 平仓，还是平仓-反买
      chooseSellOut() {
        this.choiceStatus = 0;
      },

      chooseBackHand() {//及时平仓，立即反手
        this.choiceStatus = 1;
      },

      //平仓
      sellCurrCommodity() {
        let t = this;
        this.closeFeaturesData = [];
        //根据选择的卖出种类以及笔数来选择全部/看涨/看跌IDs,若没有选择的是全部平仓，则willSaleTradeID为当前单条策略的ID
        if (t.sellAllID == 1) {//当全部平仓窗口弹出时，才对willSaleTradeID进行赋值操作。此前bug：当看涨IDs提交后，willSaleTradeID = [],当点击单个平仓后allSellStatus还等于1，但是willSaleTradeID是空数组，所以会出现点击单个平仓时出现策略ID为空。
          if (t.allSellStatus == 0) {
            t.willSaleTradeID = t.allIDsArr;
          } else if (t.allSellStatus == 1) {
            t.willSaleTradeID = t.upIDsArr;
          } else if (t.allSellStatus == 2) {
            t.willSaleTradeID = t.downIDsArr;
          }
        }
        t.sellAllID = 0;

        if (!t.willSaleTradeID) {
          t.glb.showTip = true;
          t.glb.tipMsg = '策略ID不能为空';
          return;
        }
        t.glb.showLoading = true;
        t.server.TradeService.getCloseFutures(willSaleTradeID, t.marketType).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.getFuturesSale();
            var dataInfoArr = data.data.split(';');
            var sucNum = t.X.toFloat(dataInfoArr[0]);
            var failNum = t.X.toFloat(dataInfoArr[1]);
            var allDeal = sucNum + failNum;
            if (t.willSaleTradeID.length > 1) {
              t.glb.showAlert = true;
              t.alertType = 'info';
              t.glb.alertMsg = '<h3>委托卖出提交完毕</h3><br>' + '共' + allDeal + '笔，' + '成功' + sucNum + '笔，' + '失败' + failNum + '笔';
            } else {
              if (t.choiceStatus == 0) {
                if (sucNum == 1) {
                  t.glb.showAlert = true;
                  t.alertType = 'info';
                  t.glb.alertMsg = '委托卖出成功';
                  t.sellOutID = 0;
                } else {
                  t.glb.showAlert = true;
                  t.alertType = 'info';
                  t.glb.alertMsg = '委托卖出失败';
                  t.sellOutID = 0;
                }
              } else {
                if (sucNum != 1) {
                  t.glb.showAlert = true;
                  t.alertType = 'info';
                  t.glb.alertMsg = '委托卖出失败';
                  t.sellOutID = 0;
                }
                else {
                  let sellBuy = '';//跳转到买跌还是买张
                  t.closeFeaturesData = data.data;
                  if (t.tradeDirection == 1) {
                    sellBuy = 'sell';
                  } else {
                    sellBuy = 'buy';
                  }
                  t.$router.push({
                    path: '/tradeBuy',
                    params: {commonNo: t.sellCommoNo, marketType: t.marketType, sellBuy: sellBuy},
                    query: {quitCloseRatio: t.quitCloseRatio, amount: amount}
                  });
                }
              }
            }
          } else {
            t.showTip = true;
            t.tipMsg = data['resultMsg'];
          }
          t.glb.showLoading = false;
        }).catch(function (error) {
          if (error) {
            Promise.reject(error)
          } else {
            t.showTip = true;
            t.tipMsg = '服务器请求异常';
          }
        });
      },

      //取消弹窗
      cancelDialog() {
        let t = this;
        if (t.sellAllID == 1 || t.sellOutID == 1 || t.currCommoID == 1) {
          t.sellAllID = 0;
          t.sellOutID = 0;
          t.currCommoID = 0;
        }
      },
    },
    computed: {},
    destroyed(){
      this.X.engine.destroy();
    }
  }
</script>

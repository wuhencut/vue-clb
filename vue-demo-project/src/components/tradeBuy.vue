<template>
  <section class="page-trade">
    <div class="page-trade-stock">
      <div class="mod-futures mt15">
        <div class="wrap">
          <ul class="clearfix">
            <li style="width:40%;" class="fl pt5 pb10">
              <span class="txt-black txt-s20">{{futureInfo.commodityTitle}}</span>
              <span class="txt-grey">{{futureInfo.contractNo}}</span>
            </li>
            <li style="width:60%;" class="fl txt-right pt5">
                        <span v-if="futureInfo.newPrice >= futureInfo.yesterdayPrice" class="txt-s20 txt-red">
                            {{futureInfo.newPrice}}</span>
						<span v-if="futureInfo.newPrice < futureInfo.yesterdayPrice" class="txt-s20 txt-green">
                            {{futureInfo.newPrice}}</span>
						<span v-if="futureInfo.newPrice > futureInfo.yesterdayPrice"
                  class="txt-red txt-s14 futures-txt">
                            +{{futureInfo.changeQuote}}%</span>
						<span v-if="futureInfo.newPrice == futureInfo.yesterdayPrice"
                  class="txt-red txt-s14 futures-txt ">
                            {{futureInfo.changeQuote}}%</span>
						<span v-if="futureInfo.newPrice < futureInfo.yesterdayPrice"
                  class="txt-green txt-s14 futures-txt">
                            {{futureInfo.changeQuote}}%</span>
						<span v-if="futureInfo.newPrice > futureInfo.yesterdayPrice"
                  class="txt-red txt-s14 futures-txt">
                            +{{futureInfo.changeValue}}</span>
						<span v-if="futureInfo.newPrice == futureInfo.yesterdayPrice"
                  class="txt-red txt-s14 futures-txt">
                            {{futureInfo.changeValue}}</span>
						<span v-if="futureInfo.newPrice < futureInfo.yesterdayPrice"
                  class="txt-green txt-s14 futures-txt">
                            {{futureInfo.changeValue}}</span>

            </li>
          </ul>
        </div>
        <!--
              <div class="pt10 pb10 txt-s12">
                  <table>
                      <tr>
                          <td>今开</td>
                          <td v-if="futureInfo.openPrice >= futureInfo.yesterdayPrice" class="txt-red">{{futureInfo.openPrice}}</td>
                          <td v-if="futureInfo.openPrice < futureInfo.yesterdayPrice" class="txt-green">{{futureInfo.openPrice}}</td>
                          <td class="txt-center">最高</td>
                          <td v-if="futureInfo.highPrice >= futureInfo.yesterdayPrice" class="txt-red txt-center">{{futureInfo.highPrice}}</td>
                          <td v-if="futureInfo.highPrice < futureInfo.yesterdayPrice" class="txt-green txt-center">{{futureInfo.highPrice}}</td>
                          <td class="txt-right">涨跌</td>
                          <td v-if="futureInfo.newPrice > futureInfo.yesterdayPrice" class="txt-red txt-right">+{{futureInfo.changeValue}}</td>
                          <td v-if="futureInfo.newPrice == futureInfo.yesterdayPrice" class="txt-red txt-right">{{futureInfo.changeValue}}</td>
                          <td v-if="futureInfo.newPrice < futureInfo.yesterdayPrice" class="txt-green txt-right">{{futureInfo.changeValue}}</td>
                      </tr>
                      <tr>
                          <td>昨收</td>
                          <td class="txt-gray">{{futureInfo.yesterdayPrice}}</td>
                          <td class="txt-center">最低</td>
                          <td v-if="futureInfo.lowPrice >= futureInfo.yesterdayPrice" class="txt-red txt-center">{{futureInfo.lowPrice}}</td>
                          <td v-if="futureInfo.lowPrice < futureInfo.yesterdayPrice" class="txt-green txt-center">{{futureInfo.lowPrice}}</td>
                          <td class="txt-right">总手</td>
                          <td class="txt-right txt-gray">{{futureInfo.total}}</td>
                      </tr>
                  </table>
              </div>
              -->
      </div>
      <div class="mod-lines act-{{currType}}">
        <div class="tab-title">
          <ul class="tab-title-wrap">
            <li class="sline" @click="switchPanel('sline');">分时图</li>
            <li class="tline" @click="switchPanel('tline');">闪电图</li>
            <li class="kline" @click="switchPanel('kline');">{{klineInfo.title}}<i
              class="iconfont-smill ng-scope ml10">{{showKillwrap?'&#xe609;':'&#xe608;'}}</i>
              <div class="wrap" v-show="showKillwrap" @click="showKillwrap=false;">
                <span v-for="klt in klineTypes" @click="switchKL($index,$event);">{{klt.title}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="line-content">
          <div class="quote-wrap">
            <ul class="clearfix">
              <li id="sline-wrap-{{uuid}}"></li>
              <li id="tline-wrap-{{uuid}}"></li>
              <li id="kline-wrap-{{uuid}}"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mod-future-footer">
        <div class="balance-wrap">
          <span class="balance-count fl txt-grey txt-s12">{{txtLinkObj.corner.title}}: {{balance.toFixed(2)}}</span> <a
          href={{txtLinkObj.corner.link}} class="balance-recharge fr txt-s12">{{txtLinkObj.corner.text}}</a>
        </div>
        <div class="rate-wrap">
                <span>
                    <span class="rate"><i style="width:{{futureInfo.buyNumRate}}%;"></i></span>
                    <span>{{futureInfo.buyNum}}</span>
                </span>
          <span class="txt-light-orange">买卖量</span>
				<span>
                    <span>{{futureInfo.sellNum}}</span>
                    <span class="rate"><i style="width:{{futureInfo.sellNumRate}}%;"></i></span>
                </span>
        </div>
        <div class="btn-wrap clearfix">
          <div class="fl">
            <a href="#/outerTradeBuy/{{commodityNo}}/{{type}}/buy" class="btn btn-red"><span
              class="iconfont">&#xe619;</span>看涨
              {{futureInfo.buyPrice}}</a>
          </div>
          <div class="fr">
            <a href="#/outerTradeBuy/{{commodityNo}}/{{type}}/sell" class="btn btn-green"><span
              class="iconfont">&#xe60e;</span>看跌 {{futureInfo.sellPrice}}</a>
          </div>
        </div>
        <p v-if="isInPeriod" class="trade-time-tip txt-red">{{tips}}</p>
        <p v-if="!isInPeriod" class="trade-time-tip txt-grey">{{tips}}</p>
      </div>
    </div>
    <tip v-if="glb.showTip" :tip="glb.tipMsg" @hide="glb.showTip = false"></tip>
    <loading v-if="glb.showLoading"></loading>
    <alert :alertMsg="glb.alertMsg" v-if="glb.showAlert" @sure="alertFunc()"></alert>
  </section>
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
        uuid: this.server.SystemService().uuid(),
        commodityNo: this.$router.params.commodityNo || 'CL',

        chartOpts: {},
        //分时数据上一次查询是否已经完成，是否开启交易
        isLoadFuturesQuote: true,
        isTrade: false,
        tChart: {},
        sChart: {},
        kChart: {},
        QUOTE_DATA: {},
        CACHE_KLINE: {},
        CACHE_1KLINE: {},
        CACHE_3KLINE: {},
        CACHE_5KLINE: {},
        CACHE_15KLINE: {},
        TEMP_1K: {},
        TEMP_3K: {},
        TEMP_5K: {},
        TEMP_15K: {},
        sessionStorage: window.sessionStorage,
        session: window.sessionStorage.getItem('sessionID'),
        balance: 0,
        showMenu: false,
        futureInfo: {},
        currType: 'sline',
        tips: '',
        isInPeriod: false,
        //K线相关
        showKillwrap: false,
        currKLineIndex: 4,
        klineInfo: null,
        klineTypes: [{
          title: '1分钟',
          type: 'oneMKline',
          dt: 'hm'
        }, {
          title: '3分钟',
          type: 'threeMKline',
          dt: 'hm'
        }, {
          title: '5分钟',
          type: 'fiveMKline',
          dt: 'hm'
        }, {
          title: '15分钟',
          type: 'fifteenMKline',
          dt: 'hm'
        }, {
          title: '日线',
          type: 'dayKline',
          dt: 'YMD'
        }],
      }
    },
    mounted(){
      this.chartOpts = {
        sline: {
          CL: {
            wrap: 'sline-wrap-' + this.uuid,
            scale: 2
          },
          GC: {
            wrap: 'sline-wrap-' + this.uuid,
            scale: 1
          },
          HSI: {
            wrap: 'sline-wrap-' + this.uuid,
            scale: 0
          },
          MHI: {
            wrap: 'sline-wrap-' + this.uuid,
            scale: 0
          },
          SI: {
            wrap: 'sline-wrap-' + this.uuid,
            scale: 3
          },
          DAX: {
            wrap: 'sline-wrap-' + this.uuid,
            scale: 1
          },
          CN: {
            wrap: 'sline-wrap-' + this.uuid,
            scale: 1
          }
        },
        kline: {
          CL: {
            wrap: 'kline-wrap-' + this.uuid
          },
          GC: {
            wrap: 'kline-wrap-' + this.uuid
          },
          HSI: {
            wrap: 'kline-wrap-' + this.uuid
          },
          MHI: {
            wrap: 'kline-wrap-' + this.uuid
          },
          SI: {
            wrap: 'kline-wrap-' + this.uuid
          },
          DAX: {
            wrap: 'kline-wrap-' + this.uuid
          },
          CN: {
            wrap: 'kline-wrap-' + this.uuid
          }
        },
        tline: {
          CL: {
            wrap: 'tline-wrap-' + this.uuid,
            unit: 0.01,
            multiple: 2
          },
          GC: {
            wrap: 'tline-wrap-' + this.uuid,
            unit: 0.1,
            multiple: 2
          },
          HSI: {
            wrap: 'tline-wrap-' + this.uuid,
            unit: 1,
            multiple: 2
          },
          MHI: {
            wrap: 'tline-wrap-' + this.uuid,
            unit: 1,
            multiple: 2
          },
          SI: {
            wrap: 'tline-wrap-' + this.uuid,
            unit: 0.005,
            multiple: 2
          },
          DAX: {
            wrap: 'tline-wrap-' + this.uuid,
            unit: 0.5,
            multiple: 2
          },
          CN: {
            wrap: 'tline-wrap-' + this.uuid,
            unit: 2.5,
            multiple: 2
          }
        }
      };
    },
    methods: {
      getData(){
        let t = this;
        t.glb.showLoading = true;
        this.axios.all([
          this.server.TradeService.getRisk(this.commodityNo),
          this.server.StockService.getFuturesQuote(this.commodityNo)
        ]).then(this.axios.spread(function (risk, quote) {
          var riskData = risk.data,
            quoteData = quote.data;
          t.session && t.getBalance();
          if (riskData.code == 100 && quoteData.code == 100) {
            t.processQuoteData(quoteData.data);
            t.init(riskData.data);
            t.switchPanel('sline');
            t.klineInfo = t.klineTypes[t.currKLineIndex];
          } else {
            if (riskData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = riskData['resultMsg'];
            } else if (quoteData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = quoteData['resultMsg'];
            }
          }
          t.glb.showLoading = true;
        })).catch(function (err) {
          if (err) {
            Promise.reject(err)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      //获取账户余额
      getBalance() {
        let t = this;
        var http;
        if (t.marketType == 1) {
          http = t.server.UserService.getSimBalance();
        } else {
          http = t.server.UserService.getBalance();
        }

        http.then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            if (t.marketType == 2) {
              t.balance = data.data.balance;
            } else {
              var balanceArr = data.data.split(';');
              t.balance = balanceArr[0] - 0;
            }
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
        }).catch(function (err) {
          if (err) {
            Promise.reject(err)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      //切换图
      switchPanel(type) {
        let t = this;
        //双判断是为了实现第一次切换不出现菜单
        if (t.currType == 'kline' && type == 'kline') {
          t.showKillwrap = !t.showKillwrap;
        } else {
          t.showKillwrap = false;
        }
        t.currType = type;
        if (type == 'sline' && !t.sChart) {
          t.getFuturesSline();
        } else if (type == 'tline' && !t.tChart) {
          t.drawTick();
        } else if (type == 'kline' && !t.kChart) {
          t.getFuturesKline();
        }
      },

      //切换k线图
      switchKL(index, e) {
        let t = this;
        window.event ? window.event.cancelBubble = true : e.stopPropagation();//阻止事件冒泡到上层节点而触发上级的事件
//      $event.stopPropagation();
        t.showKillwrap = false;
        t.klineInfo = t.klineTypes[index];
        if ((t.klineInfo.type == 'oneMKline' && !t.CACHE_1KLINE)
          || (t.klineInfo.type == 'threeMKline' && !t.CACHE_3KLINE)
          || (t.klineInfo.type == 'fiveMKline' && !t.CACHE_5KLINE)
          || (t.klineInfo.type == 'fifteenMKline' && !t.CACHE_15KLINE)
          || (t.klineInfo.type == 'dayKline' && !t.CACHE_KLINE)) {
          t.getFuturesKline();
        } else {
          if (t.klineInfo.type == 'oneMKline' && !!t.CACHE_1KLINE) {
            t.kChart.draw(t.CACHE_1KLINE);
          } else if (t.klineInfo.type == 'threeMKline' && !!t.CACHE_3KLINE) {
            t.kChart.draw(t.CACHE_3KLINE);
          } else if (t.klineInfo.type == 'fiveMKline' && !!t.CACHE_5KLINE) {
            t.kChart.draw(t.CACHE_5KLINE);
          } else if (t.klineInfo.type == 'fifteenMKline' && !!t.CACHE_15KLINE) {
            t.kChart.draw(t.CACHE_15KLINE);
          } else if (t.klineInfo.type == 'dayKline' && !!t.CACHE_KLINE) {
            t.kChart.draw(t.CACHE_KLINE);
          }
        }
      },

      //初始化
      init(data) {
        let t = this;
        var serverTime = data['nowTime'];
        var risk = JSON.parse(data.strRisk);
        //X.log(risk);
        t.isTrade = risk['isTrade'].value == '1';
        //配置参数要优先设置，否则所有的方法都会有问题，因为所有的计算都是依赖于基础的参数配置的
        var holiday = t.SystemService.parseHoliday(risk['holiday'].value);
        var tradeTime = t.SystemService.parsePeriod(risk['tradingTimeLimit'].value);
        var quoteTime = t.SystemService.parsePeriod(risk['quoteTime'].value);
        t.SystemService.setCurrentTime(serverTime);
        t.SystemService.setCurrentCurrencyType('USD');
        t.SystemService.setHoliday(holiday);
        t.SystemService.setTradePeriod(tradeTime);
        t.SystemService.setQuotePeriod(quoteTime, t.commodityNo);

        t.getFuturesQuote(true);
        X.engine.addTask(t.getFuturesQuote, 500);
        X.engine.start();
      },

      //重绘
      resize() {
        var els = [
          '#sline-wrap-' + this.uuid,
          '#kline-wrap-' + this.uuid,
          '#tline-wrap-' + this.uuid
        ];
        var height = window.screen.height;
        els.forEach(function (id) {
          //var top = $(id).offset().top;
          var top = 223;//上面获取分时图的上偏移，由于SPA切换的时候DOM会出现模板重叠导致top计算出现错误，因此用固定值计算
          var h = height - top - 103 - 5;
          document.getElementById(id).style.height = h;
        });
      },

      //获取分时图数据
      getFuturesSline() {
        let t = this;
        this.server.StockService.getFuturesSline(t.commodityNo).then(function (res) {
          var sLineData = res.data;
          if (sLineData.code == 100) {
            t.rawSline(sLineData.data);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = sLineData['resultMsg'];
          }
        }).catch(function (err) {
          if (err) {
            Promise.reject(err)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      //获取k线图绘图数据
      getFuturesKline() {
        let t = this;
        this.server.StockService.getFuturesKline(t.commodityNo, t.klineInfo.type).then(function (res) {
          var kLineData = res.data;
          if (kLineData.code == 100) {
            t.drawKline(kLineData.data)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = kLineData['resultMsg'];
          }
        }).catch(function (err) {
          if (err) {
            Promise.reject(err)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      //绘制分时图
      drawSline(sLineDataStr) {
        let t = this;
        t.resize();
        if (!t.QUOTE_DATA)return;
        var slineData = sLineDataStr.split(';');
        var data = {}, lastTime;
        slineData.forEach(function (str) {
          var arr = str.split(',');
          lastTime = t.X.formatDate(X.toInt(arr[0]), 'hm') - 0;
          data[lastTime] = {
            current: t.X.toFloat(arr[1]),
            volume: 0,
            time: lastTime
          };
        });

        t.sChart = new t.X.Sline(chartOpts['sline'][$scope.commodityNo]);
        sChart.draw({
          data: data,
          close: X.toFloat(QUOTE_DATA['yesterdayPrice']),
          high: X.toFloat(QUOTE_DATA['highPrice']),
          low: X.toFloat(QUOTE_DATA['lowPrice']),
          quoteTime: lastTime,
          code: $scope.commodityNo,
          period: SystemService.getRealPeriod($scope.commodityNo, lastTime),
          isIntl: isIntl($scope.commodityNo)
        });
      }

    },
    computed: {},
    destroyed(){

    }
  }
</script>

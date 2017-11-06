<template>
  <section class="page-trade">
    <div class="page-trade-stock">
      <div class="mod-futures mt15">
        <div class="wrap">
          <ul class="clearfix">
            <li v-if="futureInfo != {}" style="width:40%;" class="fl pt5 pb10">
              <span class="txt-black txt-s20">{{futureInfo.commodityTitle}}</span>
              <span class="txt-grey">{{futureInfo.contractNo}}</span>
            </li>
            <li v-if="futureInfo != {}" style="width:60%;" class="fl txt-right pt5"><span
              v-if="futureInfo.newPrice >= futureInfo.yesterdayPrice"
              class="txt-s20 txt-red">{{futureInfo.newPrice}}</span>
              <span v-if="futureInfo.newPrice < futureInfo.yesterdayPrice"
                    class="txt-s20 txt-green">{{futureInfo.newPrice}}</span>
              <span v-if="futureInfo.newPrice > futureInfo.yesterdayPrice"
                    class="txt-red txt-s14 futures-txt">+{{futureInfo.changeQuote}}%</span>
              <span v-if="futureInfo.newPrice == futureInfo.yesterdayPrice" class="txt-red txt-s14 futures-txt ">
              {{futureInfo.changeQuote}}%</span>
              <span v-if="futureInfo.newPrice < futureInfo.yesterdayPrice"
                    class="txt-green txt-s14 futures-txt">{{futureInfo.changeQuote}}%</span>
              <span v-if="futureInfo.newPrice > futureInfo.yesterdayPrice"
                    class="txt-red txt-s14 futures-txt">+{{futureInfo.changeValue}}</span>
              <span v-if="futureInfo.newPrice == futureInfo.yesterdayPrice"
                    class="txt-red txt-s14 futures-txt">{{futureInfo.changeValue}}</span>
              <span v-if="futureInfo.newPrice < futureInfo.yesterdayPrice"
                    class="txt-green txt-s14 futures-txt">{{futureInfo.changeValue}}</span>
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
      <div class="mod-lines" :class="currType">
        <div class="tab-title">
          <ul class="tab-title-wrap">
            <li class="sline" @click="">分时图</li>
            <li class="tline" @click="">闪电图</li>
            <li class="kline" @click="">{{klineInfo.title}}<i
              class="iconfont-smill ng-scope ml10">{{showKillwrap ? '&#xe609;' : '&#xe608;'}}</i>
              <div class="wrap" v-show="showKillwrap" @click="showKillwrap=false;">
                <span v-for="klt in klineTypes" @click="switchKL($index);">{{klt.title}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="line-content">
          <div class="quote-wrap">
            <ul class="clearfix">
              <li class="chart"></li>
              <!--<li id="sline-wrap-{{uuid}}"></li>
              <li id="tline-wrap-{{uuid}}"></li>
              <li id="kline-wrap-{{uuid}}"></li>-->
            </ul>
          </div>
        </div>
      </div>
      <div class="mod-future-footer">
        <div class="balance-wrap">
          <span class="balance-count fl txt-grey txt-s12">{{txtLinkObj.corner.title}}: {{balance.toFixed(2)}}</span>
          <router-link
            :to="txtLinkObj.corner.link" class="balance-recharge fr txt-s12">{{txtLinkObj.corner.text}}
          </router-link>
        </div>
        <div class="rate-wrap">
                <span>
                    <!--<span class="rate"><i style="width:{{futureInfo.buyNumRate}}%;"></i></span>-->
                    <span>{{futureInfo.buyNum}}</span>
                </span>
          <span class="txt-light-orange">买卖量</span>
          <span>
                    <span>{{futureInfo.sellNum}}</span>
            <!--<span class="rate"><i style="width:{{futureInfo.sellNumRate}}%;"></i></span>-->
                </span>
        </div>
        <div class="btn-wrap clearfix">
          <div class="fl">
            <router-link :to="{path: '/outerTradeBuy/' + commodityNo + '/' + marketType + '/' + 'buy'}"
                         class="btn btn-red"><span
              class="iconfont">&#xe619;</span>看涨
              {{futureInfo.buyPrice}}
            </router-link>
          </div>
          <div class="fr">
            <router-link :to="{path: '/outerTradeBuy/' + commodityNo + '/' +  marketType + '/' + 'sell'}"
                         class="btn btn-green"><span
              class="iconfont">&#xe60e;</span>看跌 {{futureInfo.sellPrice}}
            </router-link>
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
  export default {
    props: [
      'tradeType',//点买，点卖，结算
      'commonType',//期货类型
      'marketType',//实盘，模拟盘
    ],
    data() {
      return {
        SystemService: this.server.SystemService(),
        glb: this.global,
        uuid: this.server.SystemService().uuid(),
        commodityNo: this.$route.params.commodityNo || 'CL',

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
        currType: 'act-sline',
        tips: '',
        isInPeriod: false,
        //K线相关
        showKillwrap: false,
        currKLineIndex: 4,
        klineInfo: {},
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
        txtLinkObj: {
          header: {
            text: '',
            link: ''
          },
          corner: {
            // text: '申请模拟币',
            text: '',
            link: '',
            title: ''
          }
        },
        commodityTitles: {
          CL: '美原油',
          GC: '美黄金',
          SI: '美白银',
          HSI: '恒指',
          MHI: '小恒指',
          CN: '富时A50',
          DAX: '德指'
        },
        slineData: [],
      }
    },
    mounted() {
      this.getFuturesSline()
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
      this.getData();
      this.txtLinkObj = this.marketType == 1 ? {
        header: {
          text: '换成实盘',
          link: '/outerTrade/' + this.commonType + '/2' + '/buy'
        },
        corner: {
          // text: '申请模拟币',
          text: '',
          link: '/getSimCoin',
          title: '模拟币'
        }
      } : {
        header: {
          text: '规则',
          link: '/tradeRule/' + this.commonType
        },
        corner: {
          text: '立即充值',
          link: '/payType',
          title: '账户余额'
        }
      };
    },
    methods: {
      getData() {
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
//            t.switchPanel('sline');
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
        if (t.currType == 'act-kline' && type == 'act-kline') {
          t.showKillwrap = !t.showKillwrap;
        } else {
          t.showKillwrap = false;
        }
        t.currType = type;
        if (type == 'act-sline' && !t.sChart) {
          t.getFuturesSline();
        } else if (type == 'act-tline' && !t.tChart) {
          t.drawTick();
        } else if (type == 'act-kline' && !t.kChart) {
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
        t.X.engine.addTask(t.getFuturesQuote, 500);
        t.X.engine.start();
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
            t.initSlineData(sLineData.data.split(";"));
            t.drawLine();
            console.log(t.slineData);
//            t.drawSline(sLineData.data);
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

      initSlineData(data){
        console.log(data)
        let t = this;
        data.forEach(function (item) {
          let itemArr = item.split(",")
          t.slineData.push([
            new Date(itemArr[0] - 0),
            (itemArr[1] - 0).toFixed(2),
            (Math.random() * 100).toFixed(2) - 0
          ])
        })
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
      //这应该是闪电图每秒钟的画图 -- 猜想
      perDrawSline(data) {
        var t = this;
        var o = {
          current: t.X.toFloat(data['newPrice']),
          volume: 0,
          time: t.X.formatDate(data.time, 'hm') - 0
        };

        t.sChart && t.sChart.perDraw(o, {
          close: t.X.toFloat(data['yesterdayPrice']),
          high: t.X.toFloat(data['highPrice']),
          low: t.X.toFloat(data['lowPrice']),
          quoteTime: o.time,
          code: t.commodityNo,
          period: t.SystemService.getRealPeriod(t.commodityNo, o.time),
          isIntl: t.isIntl(t.commodityNo)
        });
      },
      /*//更新最新K线信息
       perDrawKline(data) {
       // 累加和更新数据//如果股票停牌则不放到K线数据中PS：其实是可以看，接口数据错误所以先不加
       if (data['newPrice'] == 0 || !CACHE_KLINE || !CACHE_KLINE.length) {
       return;
       }
       var o = {
       time: X.formatDate(data.time, 'YMD'),
       open: data['openPrice'],
       close: data['yesterdayPrice'],
       high: data['highPrice'],
       low: data['lowPrice'],
       price: data['newPrice']// 即时数据，使用当前价格
       };
       var last = CACHE_KLINE[CACHE_KLINE.length - 1];

       if (last.time === o.time) {
       CACHE_KLINE[CACHE_KLINE.length - 1] = o;
       } else {
       CACHE_KLINE.push(o);
       }

       kChart && kChart.draw(CACHE_KLINE);
       }*/

      //获取期货信息
      getFuturesQuote(flag) {
        var t = this;
        //判断是否是在交易时间段内
        //PS要把时间段的提示绑定到页面上，因为作用域的$scope问题，当赋值完成以后必须要在执行angular的原生方法激活数据的双向绑定否则新赋值不能双向绑定到页面
        if (t.isTrade) {
          t.isInPeriod = t.SystemService.isInPeriod(t.commodityNo, 'trade');
          if (t.isInPeriod) {
            t.tips = '本时段' + t.SystemService.getTipsForTradeStopTime(t.commodityNo);
          } else {
            t.tips = '已休市，' + t.SystemService.getTipsForNextTime(t.commodityNo);
          }
        } else {
          t.isInPeriod = false;
          t.tips = '暂停交易';
        }
        var isInQuoteTime = t.SystemService.isInPeriod(t.commodityNo, 'quote');

        /*if (!flag && !isInQuoteTime) {
         $scope.$apply();
         }*/

        //判断是否是在行情时间段内
        if (t.isLoadFuturesQuote && isInQuoteTime) {
          t.isLoadFuturesQuote = false;
          t.server.StockService.getFuturesQuote(t.commodityNo).then(function (res) {
            t.isLoadFuturesQuote = true;
            var data = res.data;
            if (data.code == 100) {
              t.processQuoteData(data.data);
            } else {
              t.glb.showTip = true;
              t.glb.tipMsg = data['resultMsg'];
            }
            t.glb.showLoading = false;
          }).catch(function (err) {
            if (err) {
              Promise.reject(err)
            } else {
              t.glb.showTip = true;
              t.glb.tipMsg = '服务器请求异常';
            }
          });
        }
      },
      //格式化股票数据
      processQuoteData(data) {
        var t = this;
        var futureArr;
        if (data) {
          futureArr = data.split(',');
          //合约编号, 时间,开盘价,昨收,涨跌值,涨跌幅,最高,最低,总手,最新价,对手买价,对手卖价,买量,卖量
          var baseNum = 50, buyNum = t.X.toInt(futureArr[12]), sellNum = t.X.toInt(futureArr[13]),
            buyNumRate = buyNum / baseNum * 100, sellNumRate = sellNum / baseNum * 100;
          if (buyNumRate > 100) {
            buyNumRate = 100;
          }
          if (sellNumRate > 100) {
            sellNumRate = 100;
          }
          t.QUOTE_DATA = {
            commodityTitle: t.commodityTitles[t.commodityNo],
            contractNo: futureArr[0],
            time: futureArr[1] - 0,
            openPrice: futureArr[2],
            yesterdayPrice: futureArr[3],
            changeValue: futureArr[4],
            changeQuote: futureArr[5],
            highPrice: futureArr[6],
            lowPrice: futureArr[7],
            total: t.X.sketchNumber(futureArr[8], 2),
            newPrice: futureArr[9],
            buyPrice: futureArr[10],
            sellPrice: futureArr[11],
            buyNum: buyNum,
            sellNum: sellNum,
            buyNumRate: buyNumRate,
            sellNumRate: sellNumRate
          };
          t.futureInfo = t.QUOTE_DATA;

//          perDrawTick(QUOTE_DATA);
//          perDrawSline(QUOTE_DATA);
//          perDrawKline(QUOTE_DATA);
        }
      },
      //
      isIntl(commNo) {
        return commNo == 'GC' || commNo == 'CL' || commNo == 'SI' || commNo == 'DAX';
      },

      //测试画图
      drawLine() {
        let t = this;
        let myChart = this.$echarts.init(document.getElementsByClassName("chart")[0]);
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              var date = new Date(params.value[0]);
              data = date.getFullYear() + '-'
                + (date.getMonth() + 1) + '-'
                + date.getDate() + ' '
                + date.getHours() + ':'
                + date.getMinutes();
              return data + '<br/>'
                + params.value[1] + ', '
                + params.value[2];
            }
          },
          grid: {
            x: 30,
            y: 20,
            width: "95%",
            y2: 35,
          },
          xAxis: [
            {
              type: 'time',
              splitNumber: 3//中间标值
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
            }
          ],
          series: [
            {
              name: 'series1',
              type: 'line',
              color: "#ECECEC",
              /*showAllSymbol: true,
              symbolSize: function (value) {
                return Math.round(value[2] / 10) + 2;
              },*/
              symbol: 'none',
              smooth: true,
              data: (function () {
                /*var d = [];
                var len = 0;
                var now = new Date();
                var value;
                while (len++ < 200) {
                  d.push([
                    new Date(2014, 9, 1, 0, len * 10000),
                    (Math.random() * 30).toFixed(2) - 0,
                    (Math.random() * 100).toFixed(2) - 0
                  ]);
                }
                return d;*/
                console.log("data: " + t.slineData);
                return t.slineData;
              })()
            }
          ]
        };
        myChart.setOption(option)
      }
    },
    computed: {},
    destroyed() {

    }
  }
</script>

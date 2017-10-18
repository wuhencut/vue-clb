<template>
  <section class="page-home">
    <div class="page-index">
      <header class="page-header">
        <div class="header-wrap">
          <h3>王者期货</h3>
          <a href="#/help" class="nav-left"><i class="icon-msg"></i></a>
          <router-link to="/guide" class="nav-right">新手指引</router-link>
        </div>
      </header>
      <app-banner></app-banner>
      <div class="mod-index-tab mt15">
        <!--<a href="#/oneYuanIntroduce" title="">
            <div class="nav-oneYuan">
                <p class="txt-s14">新人专享</p>
                <p class="txt-s12 txt-gray">一元玩恒指</p>
            </div>
        </a>-->
        <a href="#/outerTrade/CL/1" title="">
          <div class="nav-simulate">
            <p class="txt-s14">模拟练习</p>
            <p class="txt-s12 txt-gray">成就高手</p>
          </div>
        </a>
        <a href="#/investLesson" title="">
          <div class="nav-invest">
            <p class="txt-s14">投资课堂</p>
            <p class="txt-s12 txt-gray">知识储备</p>
          </div>
        </a>
        <a href="#/activityCenter" title="">
          <div class="nav-package">
            <p class="txt-s14">领红包</p>
            <p class="txt-s12 txt-gray">惊喜不断</p>
          </div>
        </a>
      </div>
      <div class="mod-index-list">
        <div class="wrap">
          <div class="title">
            <span>实盘交易</span>
            <a href="#/dangerTip" class="fr"><i class="iconfont danger-tip">&#xe77d;</i> 风险提示</a>
          </div>
          <div v-if="showFutureList" class="mod-menu">
            <a href="#/outerTrade/CL/2" class="CL clearfix">
              <!--<span class="title-icon"><img src="/app/images/icons/icon-CL.png"></span>-->
              <div class="tit">
                <p class="txt-s14">美原油 <span class="desc">T+0</span></p>

                <p class="desc">国际大宗 23小时交易</p>
              </div>
              <!--<span ng-if="future['CL'].rote>0" class="fr txt-red">{{future['CL'].price}}<br>+{{future['CL'].rote}}%</span>
              <span ng-if="future['CL'].rote==0" class="fr txt-red">{{future['CL'].price}}<br>{{future['CL'].rote}}%</span>
              <span ng-if="future['CL'].rote<0" class="fr txt-green">{{future['CL'].price}}<br>{{future['CL'].rote}}%</span>-->
              <div v-if="future['CL'].rote>0" class="future-info">
                <span class="fr txt-red border-red">+{{future['CL'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['CL'].price}}</span>
              </div>
              <div v-if="future['CL'].rote==0" class="future-info">
                <span class="fr txt-red border-red">{{future['CL'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['CL'].price}}</span>
              </div>
              <div v-if="future['CL'].rote<0" class="future-info">
                <span class="fr txt-green border-green">{{future['CL'].rote}}%</span>
                <span class="fr txt-green border-green">{{future['CL'].price}}</span>
              </div>
              <!--<i class="mod-arrow-r"></i>-->
            </a>
            <a href="#/outerTrade/GC/2" class="GC clearfix">
              <!--<span class="title-icon"><img src="/app/images/icons/icon-GC.png"></span>-->
              <div class="tit">
                <p class="txt-s14">美黄金 <span class="desc">T+0</span></p>

                <p class="desc">多空双赢 全球热门品种</p>
              </div>
              <!--<span ng-if="future['GC'].rote>0" class="fr txt-red">{{future['GC'].price}}<br>+{{future['GC'].rote}}%</span>
              <span ng-if="future['GC'].rote==0" class="fr txt-red">{{future['GC'].price}}<br>{{future['GC'].rote}}%</span>
              <span ng-if="future['GC'].rote<0" class="fr txt-green">{{future['GC'].price}}<br>{{future['GC'].rote}}%</span>-->
              <div v-if="future['GC'].rote>0" class="future-info">
                <span class="fr txt-red border-red">+{{future['GC'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['GC'].price}}</span>
              </div>
              <div v-if="future['GC'].rote==0" class="future-info">
                <span class="fr txt-red border-red">{{future['GC'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['GC'].price}}</span>
              </div>
              <div v-if="future['GC'].rote<0" class="future-info">
                <span class="fr txt-green border-green">{{future['GC'].rote}}%</span>
                <span class="fr txt-green border-green">{{future['GC'].price}}</span>
              </div>
              <!--<i class="mod-arrow-r"></i>-->
            </a>
            <a href="#/outerTrade/SI/2" class="SI clearfix">
              <!--<span class="title-icon"><img src="/app/images/icons/icon-SI.png"></span>-->

              <div class="tit">
                <p class="txt-s14">美白银 <span class="desc">T+0</span></p>

                <p class="desc">投资者青睐的避险品种</p>
              </div>
              <!--<span ng-if="future['SI'].rote>0" class="fr txt-red">{{future['SI'].price}}<br>+{{future['SI'].rote}}%</span>
              <span ng-if="future['SI'].rote==0" class="fr txt-red">{{future['SI'].price}}<br>{{future['SI'].rote}}%</span>
              <span ng-if="future['SI'].rote<0" class="fr txt-green">{{future['SI'].price}}<br>{{future['SI'].rote}}%</span>-->
              <div v-if="future['SI'].rote>0" class="future-info">
                <span class="fr txt-red border-red">+{{future['SI'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['SI'].price}}</span>
              </div>
              <div v-if="future['SI'].rote==0" class="future-info">
                <span class="fr txt-red border-red">{{future['SI'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['SI'].price}}</span>
              </div>
              <div v-if="future['SI'].rote<0" class="future-info">
                <span class="fr txt-green border-green">{{future['SI'].rote}}%</span>
                <span class="fr txt-green border-green">{{future['SI'].price}}</span>
              </div>
              <!--<i class="mod-arrow-r"></i>-->
            </a>
            <a href="#/outerTrade/HSI/2" class="HSI clearfix">
              <!--<span class="title-icon"><img src="/app/images/icons/icon-HSI.png"></span>-->

              <div class="tit">
                <p class="txt-s14">恒指 <span class="desc">T+0</span></p>

                <p class="desc">香港恒生指数 每点50港元</p>
              </div>
              <!--<span ng-if="future['HSI'].rote>0" class="fr txt-red">{{future['HSI'].price}}<br>+{{future['HSI'].rote}}%</span>
              <span ng-if="future['HSI'].rote==0" class="fr txt-red">{{future['HSI'].price}}<br>{{future['HSI'].rote}}%</span>
              <span ng-if="future['HSI'].rote<0" class="fr txt-green">{{future['HSI'].price}}<br>{{future['HSI'].rote}}%</span>-->
              <div v-if="future['HSI'].rote>0" class="future-info">
                <span class="fr txt-red border-red">+{{future['HSI'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['HSI'].price}}</span>
              </div>
              <div v-if="future['HSI'].rote==0" class="future-info">
                <span class="fr txt-red border-red">{{future['HSI'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['HSI'].price}}</span>
              </div>
              <div v-if="future['HSI'].rote<0" class="future-info">
                <span class="fr txt-green border-green">{{future['HSI'].rote}}%</span>
                <span class="fr txt-green border-green">{{future['HSI'].price}}</span>
              </div>
              <!--<i class="mod-arrow-r"></i>-->
            </a>
            <a href="#/outerTrade/MHI/2" class="MHI clearfix">
              <!--<span class="title-icon"><img src="/app/images/icons/icon-MHI.png"></span>-->
              <div class="tit">
                <p class="txt-s14">小恒指 <span class="desc">T+0</span></p>
                <p class="desc">200起投 玩赚外盘</p>
              </div>
              <!--<span ng-if="future['MHI'].rote>0" class="fr txt-red">{{future['MHI'].price}}<br>+{{future['MHI'].rote}}%</span>
              <span ng-if="future['MHI'].rote==0" class="fr txt-red">{{future['MHI'].price}}<br>{{future['MHI'].rote}}%</span>
              <span ng-if="future['MHI'].rote<0" class="fr txt-green">{{future['MHI'].price}}<br>{{future['MHI'].rote}}%</span>-->
              <div v-if="future['MHI'].rote>0" class="future-info">
                <span class="fr txt-red border-red">+{{future['MHI'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['MHI'].price}}</span>
              </div>
              <div v-if="future['MHI'].rote==0" class="future-info">
                <span class="fr txt-red border-red">{{future['MHI'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['MHI'].price}}</span>
              </div>
              <div v-if="future['MHI'].rote<0" class="future-info">
                <span class="fr txt-green border-green">{{future['MHI'].rote}}%</span>
                <span class="fr txt-green border-green">{{future['MHI'].price}}</span>
              </div>
              <!--<i class="mod-arrow-r"></i>-->
            </a>
            <a href="#/outerTrade/CN/2" class="CN clearfix">
              <!--<span class="title-icon"><img src="/app/images/icons/icon-CN.png"></span>-->

              <div class="tit">
                <p class="txt-s14">富时A50 <span class="desc">T+0</span></p>

                <p class="desc">A股市场风险对冲利器</p>
              </div>
              <!--<span ng-if="future['CN'].rote>0" class="fr txt-red">{{future['CN'].price}}<br>+{{future['CN'].rote}}%</span>
              <span ng-if="future['CN'].rote==0" class="fr txt-red">{{future['CN'].price}}<br>{{future['CN'].rote}}%</span>
              <span ng-if="future['CN'].rote<0" class="fr txt-green">{{future['CN'].price}}<br>{{future['CN'].rote}}%</span>-->
              <div v-if="future['CN'].rote>0" class="future-info">
                <span class="fr txt-red border-red">+{{future['CN'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['CN'].price}}</span>
              </div>
              <div v-if="future['CN'].rote==0" class="future-info">
                <span class="fr txt-red border-red">{{future['CN'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['CN'].price}}</span>
              </div>
              <div v-if="future['CN'].rote<0" class="future-info">
                <span class="fr txt-green border-green">{{future['CN'].rote}}%</span>
                <span class="fr txt-green border-green">{{future['CN'].price}}</span>
              </div>
              <!--<i class="mod-arrow-r"></i>-->
            </a>
            <a href="#/outerTrade/DAX/2" class="DAX clearfix">
              <!--<span class="title-icon"><img src="/app/images/icons/icon-DAX.png"></span>-->

              <div class="tit">
                <p class="txt-s14">德指 <span class="desc">T+0</span></p>

                <p class="desc">德国法兰克福指数 收益高</p>
              </div>
              <!--<span ng-if="future['DAX'].rote>0" class="fr txt-red">{{future['DAX'].price}}<br>+{{future['DAX'].rote}}%</span>
              <span ng-if="future['DAX'].rote==0" class="fr txt-red">{{future['DAX'].price}}<br>{{future['DAX'].rote}}%</span>
              <span ng-if="future['DAX'].rote<0" class="fr txt-green">{{future['DAX'].price}}<br>{{future['DAX'].rote}}%</span>-->
              <div v-if="future['DAX'].rote>0" class="future-info">
                <span class="fr txt-red border-red">+{{future['DAX'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['DAX'].price}}</span>
              </div>
              <div v-if="future['DAX'].rote==0" class="future-info">
                <span class="fr txt-red border-red">{{future['DAX'].rote}}%</span>
                <span class="fr txt-red border-red">{{future['DAX'].price}}</span>
              </div>
              <div v-if="future['DAX'].rote<0" class="future-info">
                <span class="fr txt-green border-green">{{future['DAX'].rote}}%</span>
                <span class="fr txt-green border-green">{{future['DAX'].price}}</span>
              </div>
              <!--<i class="mod-arrow-r"></i>-->
            </a>
          </div>
        </div>
      </div>
      <div class="pt15 pb15 txt-center txt-s12 txt-grey">投资有风险 入市需谨慎</div>
      <div class="mod-app-download">
        <a href="#/download" class="clearfix">
          <div class="fl">
            <img src="../images/logo.png">
          </div>
          <div class="fl desc">
            王者期货手机客户端<br>操作更流畅，交易更便捷！
          </div>
          <div class="fr">
            <button class="btn btn-blue">立即下载</button>
          </div>
        </a>
      </div>
      <loading v-if="showLoading"></loading>
      <tip v-if="showTip" :tip="tipMsg" @hide="showTip = false"></tip>
      <footer class="page-footer">
        <div class="footer-wrap">
          <ul>
            <li>
              <a href="#/index" class="nav-home">
                <i class="iconfont">&#xe611;</i><br>首页
              </a>
            </li>
            <li>
              <a href="#/outerTrade/CL/2?backURL=/index" class="nav-trade">
                <i class="iconfont">&#xe612;</i><br>交易
              </a>
            </li>
            <li>
              <a href="#/news" class="nav-news">
                <i class="iconfont">&#xe61b;<em></em></i><br>资讯
              </a>
            </li>
            <li>
              <a href="#/discover" class="nav-discover">
                <i class="iconfont">&#xe61a;</i><br>发现
              </a>
            </li>
            <li>
              <router-link to="/myHome" class="nav-user">
                <i class="iconfont">&#xe613;</i><br>我的
              </router-link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </section>
</template>
<script>
  import Banner from './../components/banner.vue'
  export default{
    components: {
      'app-banner': Banner,
    },
    data(){
      return {
        agentCode: '',
        commodityNo: ['CL', 'GC', 'HSI', 'SI', 'DAX', 'CN', 'MHI'],
        isFirstFuturesQuote: true,
        isLoadFuturesQuote: true,
        AD: {},
        showADDialog: false,
        showFutureList: false,
        future: {
          CL: {}, GC: {}, HSI: {}, SI: {}, DAX: {}, CN: {}, MHI: {}
        },
        tipMsg: '',
        showTip: false,
        showLoading: false,
      }
    },
    mounted(){
//      this.initAgentCode();
//      this.getADBanner();
      this.initAgentCode();
      this.showLoading = true;
      this.getFuturesQuote();
      this.showLoading = false;
      this.X.engine.addTask(this.getFuturesQuote, 1000);
      this.X.engine.start();

    },
    methods: {
      initAgentCode(){
        this.agentCode = this.$route.params.agentCode ? this.$route.params.agentCode : 'YZTZ';
        var storage = window.localStorage, agentStr = storage.getItem('agentCode') ? storage.getItem('agentCode') : 'YZTZ';
        if (this.agentCode == '') {
          storage.removeItem('agentCode')
        }
        if (agentStr == '' || agentStr != this.agentCode) {
          storage.setItem('agentCode', this.agentCode);
        }
        this.getFuturesQuote();
      },
      getFuturesQuote(){
        let t = this;
//        this.showLoading = true;
        //判断是否在行情时段
        if (this.isFirstFuturesQuote || (true && this.isLoadFuturesQuote)) {
          this.isFirstFuturesQuote = false;
          this.isLoadFuturesQuote = false;
          this.server.StockService.getFuturesSimpleQuote(this.commodityNo.join(','), this.agentCode).then(function (res) {
            t.isLoadFuturesQuote = true;
            var data = res.data;
            if (data.code == 100) {
              t.processFuturesQuote(data.data);
            } else {
              t.showTip = true;
              t.tipMsg = data['resultMsg'];
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
        }
      },
      //url跳转
      urlJump(obj) {
        if (!obj.link)return;
        var link = obj.link;
        if (obj.btnName) {
          var btnName = encodeURIComponent(obj.btnName), btnLink = encodeURIComponent(obj.btnLink);
          link = link + '?btnName=' + btnName + '&btnLink=' + btnLink;
        }
        window.location.href = link;
      },
      processFuturesQuote(data) {
        this.showFutureList = true;
        if (!data) {
          return;
        }
        var i, datas = data.split(';'), len = datas.length, tempArr;
        if (this.commodityNo.length != len) {
          return;
        }
        for (i = 0; i < len; i++) {
          tempArr = datas[i].split(',');
          //时间,涨跌幅,最新价
          this.future[this.commodityNo[i]] = {
            price: tempArr[2],
            rote: tempArr[1]
          };
        }
      },

    },

    computed: {},
    destroyed(){
      this.X.engine.destroy();
    }
  }
</script>

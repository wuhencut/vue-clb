<template>
  <div>
    <h1>111</h1>
  </div>
</template>
<script>
  export default{
    components: {},
    data(){
      return {
        agent_code: this.$route.query.agent_code || '',
        commodityNo: ['CL', 'GC', 'HSI', 'SI', 'DAX', 'CN', 'MHI'],
        isFirstFuturesQuote: true,
        isLoadFuturesQuote: true,
        AD: {},
        showADDialog: false,
      }
    },
    mounted(){

    },
    methods: {
      getFuturesQuote(){
        let t = this;
        //判断是否在行情时段
        if (this.isFirstFuturesQuote || (true && this.isLoadFuturesQuote)) {
          this.isFirstFuturesQuote = false;
          this.isLoadFuturesQuote = false;
          this.server.StockService.getFuturesSimpleQuote(this.commodityNo.join(',')).then(function (res) {
            t.isLoadFuturesQuote = true;
            var data = res.data;
            if (data.code == 100) {
              t.processFuturesQuote(data.data);
            } else {
              //X.tip(data['resultMsg']);
            }
            t.X.loading.hide();
          }).catch(function () {
            t.X.tip('服务器请求异常');
          });
        }
      },
      getADBanner() {
        let t = this;
        X.loading.show();
        this.server.ADBannerService.getADBannerData().then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.initADBannerData(data.data);
            t.showAD($scope.AD.id);
          } else {
            t.X.tip(data['resultMsg']);
          }
          t.X.loading.hide();
        }).catch(function () {
          t.X.tip('服务器请求异常');
        });
      },
      //初始化弹窗广告的数据
      initADBannerData(data) {
        var arr = [], banners = [];
        for (var i in data) {
          data[i] = arr[i] = {
            id: data[i][0],
            title: data[i][1],
            type: data[i][2],
            imgURL: data[i][3],
            link: data[i][5] || '',
            btnName: data[i][6] || '',
            btnLink: data[i][8] || ''
          };
          if (data[i].type == 0) {
            this.AD = data[i];
          } else {
            banners.push(data[i]);
          }
        }
//        X.slide.init('mod-slide', banners, $swipe);
      },
      //展示弹窗广告
      showAD(id) {
        let t = this;
        if (this.AD.imgURL && this.AD.id) {
          var storage = window.localStorage, ADID = 'ADID', ADIDStr = storage.getItem(ADID) || '';
          if (ADIDStr == '' || ADIDStr != id) {
            storage.setItem(ADID, id);
            t.showADDialog = true;
          }
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
          this.future[commodityNo[i]] = {
            price: tempArr[2],
            rote: tempArr[1]
          };
        }
      },
      a: "hello"
    }
  }
</script>
<style>
  .article-list {
    margin: auto;
  }

  time {
    display: inline-block;
    width: 150px;
  }
</style>

<template>
  <section class="page-news">
    <div class="page-news-content">
      <header v-if="showHeader" class="page-header">
        <div class="header-wrap">
          <h3>资讯直播</h3>
        </div>
      </header>
      <div class="mod-news-wrap">
        <div class="timecon">
          <ul class="livecon">
            <li v-for="news in newsList" class="flash" :class="news.important ? 'important' : ''" :id="news.id">
              <div>
                <div class="timeline">
                  <div class="dotbg">
                    <div class="dot"></div>
                  </div>
                  <div class="time">{{news.time}}</div>
                </div>
                <div v-if="news.type==0" class="live-c onlytxt">
                  <div class="txt">
                    <div v-html="news.content"></div>
                    <div v-if="news.showImgIcon" class="text-img">
                      <router-link :to="news.newsImgURL" class="text-img-lnk">
                        <img class="thumb" :src="news.newsImgURL"/>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div v-if="news.type==1" class="live-c">
                  <div class="txt">
                    <div v-html="news.content"></div>
                    <div class="live-ele" :class="news.important ? 'important' : ''">
                      <img class="flag" :src="news.countryImgURL">
                      <table class="pindex">
                        <tbody>
                        <tr>
                          <td>前值:{{news.prefix}}</td>
                          <td>预期：{{news.expected}}</td>
                          <td>实际：<span :id="realID" class="fact" :class="news.evaluate.className">{{news.published}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <div class="live-ele-l">
                              <img :src="news.starImgURL" width="20" height="34"/>
                            </div>
                          </td>
                          <td>
                            <div class="live-ele-r" :class="news.evaluate.className">{{news.evaluate.text}}</div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="timebox" v-if="month!='' && day!=''">
            <span>{{day}}</span>
            <p>{{month}}月</p>
          </div>
        </div>
      </div>
      <footer class="page-footer">
        <div class="footer-wrap">
          <ul>
            <li>
              <router-link :to="indexUrl" class="nav-home">
                <i class="iconfont">&#xe611;</i>
                <div>首页</div>
              </router-link>
            </li>
            <li>
              <router-link :to="{path: '/outerTrade/HSI/2', query: {backURL: '/news'}}" class="nav-trade">
                <i class="iconfont">&#xe612;</i>
                <div>交易</div>
              </router-link>
            </li>
            <li>
              <a href="#/news" class="nav-news">
                <i class="iconfont">&#xe61b;</i>
                <div>资讯</div>
              </a>
            </li>
            <li>
              <a href="#/discover" class="nav-discover">
                <i class="iconfont">&#xe61a;</i>
                <div>发现</div>
              </a>
            </li>
            <li>
              <a href="#/myHome" class="nav-user">
                <i class="iconfont">&#xe613;</i>
                <div>我的</div>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        realID: 'actual_',
        showHeader: true,
        indexUrl: this.server.SystemService().agentIndex(),
        newsList: [],
        page: 0,
        month: '',
        day: '',
        lastTime: 0,
        firstTime: 0,
        dataLoadFinish: false,
      }
    },
    mounted(){
      var source = this.$route.query.source;
      if (source && source == 'IOSAPP') {
        this.showHeader = false;
      }

      this.getNewsList(0);
      this.X.engine.addTask(this.getNew, 10000);
      this.X.engine.start();
      window.addEventListener('scroll', this.scroll)
    },
    methods: {
      //监控scroll的方法
      scroll(){
        let t = this;
        var win = window;
        if(this){
          var elem = document.getElementsByClassName('mod-news-wrap')[0];
          var H = win.screen.height;
          var T = window.scrollY;
          var eH =  elem.offsetHeight;
          if ((2 * H + T) > eH) {
            t.dataLoadFinish = false;
            t.getNewsList(t.page, t.lastTime);
          }
        }
      },

      //获取新闻列表
      getNewsList(page, time) {
        let t = this;
        t.glb.showLoading = true;
        t.server.NoticeService.getNewsList(page, 30, time).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            var news = data.data || [];
            if (news.length > 0) {
              news.forEach(function (strMsg) {
                var msg = t.processNews(strMsg);
                if (/链接>>>|activity\.jin10\.com|live\.jin10\.com|app\.jin10\.com|v\.jin10\.com|news\.jin10\.com/.test(msg.content)) {
                  return;
                }
                if(msg.imgUrl)msg.newsImgURL = '/images/jin10/' + msg.imgUrl;
                if(msg.country)msg.countryImgURL = '/images/jin10/' + msg.country + '.png';
                if(msg.star)msg.starImgURL = '/images/jin10/' + msg.star + '.png';
                console.log();
                t.newsList.push(msg);
              });
              t.firstTime = t.newsList[0].id;
              t.lastTime = t.newsList[t.newsList.length - 1].id.substring(0, 17);
              t.getNewsCurrDate(t.newsList);
              t.page++;
              //如果没有数据则忽略滚动事件
              t.dataLoadFinish = true;
            } else {
              t.glb.showTip = true;
              t.glb.tipMsg = '到底了，没有新数据了';
            }
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
      },

      //获取新闻具体时间
      getNewsCurrDate(newsList) {
        let t = this;
        if (newsList.length < 1) {
          return;
        }

        var firstDate = newsList[0].date;
        var dateArr = firstDate.split('-');
        t.month = dateArr[1];
        t.day = dateArr[2];
      },

      //获取新的新闻
      getNew() {
        let t = this;
        //X.loading.show();
        t.server.NoticeService.getNewsList(0, 20).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            var news = data.data || [];
            if (news.length > 0) {
              var newData = [];
              for (var i = 0, len = news.length; i < len; i++) {
                var msg = t.processNews(news[i]);
                if (/链接>>>|activity\.jin10\.com|live\.jin10\.com|app\.jin10\.com|v\.jin10\.com|news\.jin10\.com/.test(msg.content)) {
                  continue;
                }
                if (msg.id === t.firstTime) {
                  break;
                }
                newData.push(msg);
              }
              if (newData.length > 0) {
                t.newsList = newData.reverse().concat(t.newsList);
                t.firstTime = t.newsList[0].id;
              }
              t.getNewsCurrDate(t.newsList);
            }
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
          //X.loading.hide();
        }).catch(function (err) {
          if (err) {
            Promise.reject(err)
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      //组装数据
      processNews(data) {
        let t = this;
        data = data.split('#');
        var type = data[0],
          date,
          time,
          content,
          important,
          star = 0,
          websiteUrl = '',
          videoUrl = '',
          id,
          imgIcon,
          prefix = 0,
          expected = 0,
          published = 0,
          country,
          evaluate,
          params = {};

        if (type == 1) {
          date = data[8].split(' ')[0];
          time = data[8].split(' ')[1];
          content = data[2].replace(/\/br/g, 'br');
          star = data[6];
          important = (star > 3);
          id = data[12];
          prefix = data[3];
          expected = data[4];
          published = data[5];
          country = data[9];
          evaluate = data[7];
          params = {
            id: id,
            important: important,
            type: 1,
            date: date,
            time: time,
            content: content,
            country: country,
            prefix: prefix,
            expected: expected,
            published: published,
            star: star,
            evaluate: star >= 3 ? t.getChangeClassText(evaluate) : t.getChangeClassText(evaluate + '2')
          };
        } else {
          date = data[2].split(' ')[0];
          time = data[2].split(' ')[1];
          content = data[3].replace(/\/br/g, 'br');
          important = (data[1] == 0);
          id = data[11];
          websiteUrl = data[4];
          imgIcon = data[6];
          videoUrl = data[5];
          params = {
            id: id,
            important: important,
            type: 0,
            date: date,
            time: time,
            content: content,
            websiteUrl: websiteUrl,
            showWebsiteIcon: websiteUrl ? true : false,
            videoUrl: videoUrl,
            showVideoIcon: videoUrl ? true : false,
            showImgIcon: imgIcon ? true : false,
            imgName: imgIcon,
            imgUrl: imgIcon.replace('_lite', '')
          };
        }
        return params;
      },


      //改变文本显示
      getChangeClassText(text) {
        var classn = "";

        if (text == "利多") {
          classn = "liduo";
        } else if (text == "利空") {
          classn = "likong";
        } else if (text == "无影响") {
          text = "影响较小";
          classn = "wuyingxiang";
        } else if (text == "利多2") {
          text = "利多";
          classn = "liduo2";
        } else if (text == "利空2") {
          text = "利空";
          classn = "likong2";
        } else if (text == "无影响2") {
          text = "影响较小";
          classn = "wuyingxiang2";
        }

        var rege = new RegExp("影响");
        if (rege.test(text)) {
          text = "影响较小";
        }

        if (text != "影响较小") {
          text += " 金银";
        }
        return {className: classn, text: text};
      }
    },
    destroyed(){

    }
  }
</script>

<template>
  <section id="" class="page-discover">
    <div>
      <header class="page-header">
        <div class="header-wrap">
          <h3>发现</h3>
        </div>
      </header>
      <!--<a href="#/oneYuanIntroduce" class="one-yuan">
          <span class="txt-black txt-s14">新人专享</span> <i class="corner-icon"></i><br>
          <span class="txt-s12 txt-gray">１元操盘 盈利归你</span>
      </a>
      <a href="#/extension" class="extension">
          <span class="txt-black txt-s14">推广赚钱</span><br>
          <span class="txt-s12 txt-gray">0成本 月入万元！</span>
      </a>-->
      <div class="mod-discover">
        <div class="discover-nav">
          <!-- <a href="#/dayGainList?type=day" class="dayProfit">每日盈利榜 <i class="iconfont go-activity txt-grey txt-s12">&#xe65e;</i></a>
           <a href="#/dayGainList?type=month" class="comProfit">佣金收入榜 <i class="iconfont go-activity txt-grey txt-s12">&#xe65e;</i></a>
           <a href="#/extension" class="extension">推广赚钱 <i class="fr pr15 txt-grey txt-s12">0成本 月入万元！</i><i class="iconfont go-activity txt-grey txt-s12"> &#xe65e;</i></a>-->
          <div class="activity-nav">
            <a class="activity-center" href="#/activityCenter">活动中心</a>
            <a v-if="showSpread" class="extension-nav" href="#/extension">推广赚钱</a>
            <!--<a class="day-gain" href="#/dayGainList?type=day">每日盈利榜</a>-->
            <a class="com-gain" href="#/dayGainList?type=month">佣金收入榜</a>
          </div>
        </div>
      </div>

      <div class="notice-outer">
        <div class="notice-fixed">
          <p class="notice bb-gray txt-s14 pl15">公告信息</p>
        </div>
      </div>

      <div class="mod-notice">
        <div class="notice-list bb-gray" v-for="item in noticeList">
          <div @click="showCurrNotice(item.id)" class="notice-title">
            <p class="notice-title" >{{item.noticeTitle}}</p><i
            v-if="currNoticeIndex != item.id" class="iconfont icon-down">&#xe608;</i>
            <p class="txt-s12 txt-grey">{{item.releaseTime | formatTime('yyyy-MM-dd HH:mm:ss')}}</p>
          </div>
          <div class="txt-s12" v-if="currNoticeIndex == item.id">
            <div class="notice-content pb20" v-html="item.noticeContent"></div>
            <span class="icon-hide" @click="showCurrNotice(item.id)">收起</span>
          </div>
        </div>
        <div class=" btn btn-gray" @click="getNoticeList(currPage + 1)" v-if="currPage < totalPage">加载更多</div>
      </div>

      <footer class="page-footer">
        <div class="footer-wrap">
          <ul>
            <li>
              <router-link :to="indexUrl" class="nav-home">
                <i class="iconfont">&#xe611;</i><br>首页
              </router-link>
            </li>
            <li>
              <a href="#/outerTrade/HSI/2?backURL=/index" class="nav-trade">
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
              <a href="#/myHome" class="nav-user">
                <i class="iconfont">&#xe613;</i><br>我的
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        page: 1,
        pageSize: 10,
        id: 0,
        currPage: 1,
        totalPage: 1,
        currNoticeIndex: 0,
        showSpread: false,
        indexUrl: this.server.SystemService().agentIndex(),
        noticeList: [],
        agentCode: '',
      }
    },
    mounted(){
      this.getNoticeList(this.page);
      var storage = window.localStorage || '';
      var agentCode = storage.getItem('agentCode') || '';
      this.agentCode = agentCode;
      agentCode == '' || !agentCode ? this.showSpread = true : this.showSpread = false;
      if (agentCode != '') {
        document.getElementsByClassName('activity-nav')[0].getElementsByTagName('a')[0].style.width = '50%';
//        $('.activity-nav a')[0].style.width = '50%';
//        console.log(document.getElementsByClassName('activity-nav')[0].getElementsByTagName('a')[0]);
      }
    },
    methods: {
      //获取公告列表
      getNoticeList(page) {
        let t = this;
        this.server.NoticeService.getNotices(page, t.pageSize).then(function (res) {
          var data = res.data,
            noticeList,
            noticeData;
          noticeData = data.data;
          t.currPage = data.data['pageIndex'];
          t.totalPage = data.data['totalPage'];
          if (data.code == 100) {
            noticeList = data.data['items'];
            if (page == 1) {
              t.noticeList = noticeList;
            } else {
              t.noticeList = t.noticeList.concat(noticeList);
            }
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
          for (var i in t.noticeList) {
            t.noticeList[i]['noticeContent'] = "<p style='word-break: break-all'>" + t.noticeList[i].noticeContent + "</p>"
            t.noticeList[i]['id'] = t.id;
            t.id++;
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

      //展示公告详情
      showCurrNotice(currId) {
        let t = this;
        if (t.currNoticeIndex == currId) {
          t.currNoticeIndex = -1;
        } else {
          t.currNoticeIndex = currId;
        }
      }
    },
    computed: {},
    destroyed(){

    }
  }
</script>

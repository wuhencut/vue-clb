<template>
  <section class="page-guide">
    <div class="page-extension">
      <header class="page-header">
        <div class="header-wrap">
          <h3>推广赚钱</h3>
          <backMenu></backMenu>
        </div>
      </header>
      <div class="mod-extension" :class="className">
        <div class="extension-menu">
          <ul>
            <li class="act-detail" @click="type='detail'">推广详情</li>
            <li class="act-user" @click="getUsers(pageIndex)">我的用户</li>
          </ul>
        </div>
        <div class="wrap con-detail">
          <div class="extension-wrap extension-detail mt15">
            <ul>
              <li>
                <p>已赚佣金</p>
                <p><em v-if="extensionInfo.commission" class="number">{{extensionInfo.commission.toFixed(2)}}</em></p>
                <p></p>
              </li>
              <li>
                <p>佣金比例<em class="ml5 icon-rate" onclick="javascript:document.getElementById('rate').scrollIntoView()"></em></p>
                <p><em class="number">{{extensionInfo.ratio}}%</em></p>
                <p><span class="officer">{{extensionInfo.commType}}</span></p>
              </li>
              <li>
                <p>我的用户</p>
                <p><em class="number">{{extensionInfo.userCount}}</em></p>
                <p>交易{{extensionInfo.tradeCount}}人</p>
              </li>
            </ul>
          </div>
          <div v-if="extensionInfo.ratio != 0" class="extension-wrap extension-code mt15">
            <p>复制推广链接发给朋友<span class="txt-gray">（已访问{{extensionInfo.generalizeVisitCount}}次）</span></p>
            <p class="reproduce"><input type="text" :value="extensionInfo.generalizeUrl" readonly="readonly"
                                        class="copy-target"><span class="copy">复制</span></p>
            <p class="mt20">推荐朋友扫码，成为你的用户</p>
            <p class="mt5"><img class="qrCode" :src="wechatCode"></p>
          </div>
          <div class="not-login mt10" v-if="extensionInfo.ratio == 0">
            <a class="btn btn-disabled txt-white txt-s16" href="#/login?goURL=/extension">登录后获取您的推广链接</a>
          </div>
          <div class="extension-intro">
            <h3>------ 如何赚钱 -----</h3>
            <img src="/static/images/activity/extension/intro.jpg" width="100%" class="mt10 mb10">
            <h3>------ 推广渠道 -----</h3>
            <div class="extension-intro-channel mt20">
              朋友、微信、朋友圈、QQ、微博、博客、论坛 <br>或在自己的网站上推广
            </div>
            <p class="mt30 txt-s16">1个用户1天交易10次</p>
            <p class="txt-s20">你<span class="txt-yellow">赚500元</span></p>
            <p class="txt-s20">100个用户</p>
            <p class="txt-s24">你<span class="txt-yellow">赚50000元</span></p>
            <p class="txt-s24">交易一个月</p>
            <p class="txt-s24">你<span class="txt-yellow">赚1000000元</span></p>
            <p class="txt-s24">交易一年</p>
            <p class="txt-s24">你<span class="txt-yellow">赚12000000元</span></p>
          </div>
          <div class="extension-wrap extension-level mt15 mb20">
            <h2>推广员级别</h2>
            <table class="mb20" id="rate">
              <tbody>
              <tr>
                <th style="width:31%;">级别</th>
                <th style="width:23%;">下线交易<br>用户数量</th>
                <th style="width:23%;">交易提成<br>佣金比例</th>
                <th style="width:23%;">下线<br>有效期</th>
              </tr>
              <tr>
                <td>普通推广员</td>
                <td>&lt;＝9人</td>
                <td>5%</td>
                <td>半年</td>
              </tr>
              <tr>
                <td>金牌推广员</td>
                <td>10-49人</td>
                <td>15%</td>
                <td>一年</td>
              </tr>
              <tr>
                <td>钻石推广员</td>
                <td>&gt;＝50人</td>
                <td>30%</td>
                <td>两年</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="wrap con-user">
          <div class="extension-user mt15">
            <ul class="title">
              <li>用户</li>
              <li>交易手数</li>
              <li>注册时间</li>
            </ul>
            <div class="extension-wrap list" v-if="items.length > 0">
              <ul :key="item.id" v-for="item in items">
                <li>{{item.username}}</li>
                <li>{{item.amount}}</li>
                <li>{{item.registerTime | date:'yy-MM-dd HH:mm:ss'}}</li>
              </ul>

              <div v-if="totalPage!=0">
                <div class="mod-more txt-grey" v-if="pageIndex != totalPage"
                     @click="getExtensionUserList(pageIndex+1);">
                  查看更多（共{{totalUserCount}}人，交易{{tradeCount}}人）
                </div>
                <div class="mod-more txt-grey" v-if="pageIndex == totalPage">
                  （共{{totalUserCount}}人，交易{{tradeCount}}人）
                </div>
              </div>
            </div>
            <div class="extension-userNo txt-center txt-gray" v-if="totalPage==0">
              暂无用户
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        pageSize: 10,
        pageIndex: 1,
        type: 'detail',
        extensionInfo: {},
        totalUserCount: '',
        tradeCount: '',
        showGenerateLink: false,
        ratio: 0,
        className: '',
        items: [],
        totalPage: 0,
        wechatCode: '',
      }
    },
    mounted(){
        this.getData();
    },
    methods: {
      getData(){
        this.className = 'mode-' + this.type;
        let t = this;
        this.server.ExtensionService.getExtensionInfoData().then(function (res) {
          var extensionInfo = res.data;
          if (extensionInfo.code == 100) {
            t.extensionInfo = extensionInfo.data;
            t.ratio = t.extensionInfo['ratio'];
//            t.X.clipboard.init();
            t.wechatCode = '/home/generalize/getQRcode.json?device=1';
          } else {
            if (t.extensionInfo.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = t.extensionInfo['resultMsg'];
            }
          }
        }).catch(function (error) {
          if (error) {
            Promise.reject(error);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      getUsers(page) {
        let t = this;
        t.type = 'user';
        if (t.ratio == 0) {
          t.$router.push({path: '/login', query: {goURL: '/extension'}});
          return;
        }
        this.server.ExtensionService.getExtensionUserListData(t.page, t.pageSize).then(function (res) {
          var users = res.data;
          if (users.code == 100) {
            var usersData = users.data;
            t.init(usersData);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = users['resultMsg'];
          }
        }).catch(function (error) {
          if (error) {
            Promise.reject(error);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },

      init(data) {
        let t = this;
        var list = data.dataList;
        t.pageIndex = data.pageIndex;
        t.totalPage = data.totalPage;
        t.tradeCount = data.tradeCount;
        t.totalUserCount = data.totalUserCount;
        /*for (var i in list) {
         list[i].registerTime = X.formatDate(list[i].registerTime);
         }*/

        if (t.pageIndex == 1) {
          t.items = list;
        } else {
          t.items = t.items.concat(list);
        }
      },

      //获取数据列表
      getExtensionUserList(page) {
        page = page || 1;
        this.getUsers(page);
      },
    },
    computed: {},
    destroyed(){

    }
  }
</script>

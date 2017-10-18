<template>
  <section  class="page-gain-list">
    <div class="page-day-gain">
      <header class="page-header">
        <div class="header-wrap">
          <h3>{{txtObj[type]['title']}}</h3>
          <backMenu></backMenu>
        </div>
      </header>
      <div class="day-gain-content txt-gray">
        <ul class="day-gain-title txt-s16">
          <li>排名</li>
          <li>用户</li>
          <li>{{txtObj[type]['gainTxt']}}</li>
        </ul>
        <ul v-for="item in rankList" class="day-gain-list">
          <li v-if="item.rankNum < 4 && item.rankNum > 0" class="list-NO" style="width:33.33%;height: 44px;display:inline-block"></li>
          <li v-if="item.rankNum > 3">{{item.rankNum}}</li>
          <li class="list-name">{{item.userName}}</li>
          <li class="list-gain txt-red">{{X.formatNumber(item.money)}}元</li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
    export default{
        data(){
            return {
              glb: this.global,
              type: this.$route.query.type,
              txtObj: {
                day: {
                  title: '昨日盈利榜',
                  gainTxt: '盈利(元)'
                },
                month: {
                  title: '佣金收入榜',
                  gainTxt: '总收入(元)'
                }
              },
              rankList: [],
            }
        },
        mounted(){
          if (this.type == 'day') {
            this.getRankData(this.type);
          } else if (this.type == 'month') {
            this.getRankData(this.type);
          }

        },
        methods: {
          getRankData(type) {
            let t = this;
            this.server.RankService.getRank(type).then(function (res) {
              var data = res.data;
              if (data.code == 100) {
                t.rankList = data.data;
              } else {
                t.glb.showTip = true;
                t.glb.tipMsg = data['resultMsg'];
              }
            }).catch(function (error) {
              if (error) {
                Promise.reject(error);
              } else {
                t.glb.showTip = true;
                t.glb.tipMsg = '服务器请求异常';
              }
            })
          }
        },
        computed: {},
        destroyed(){

        }
    }
</script>

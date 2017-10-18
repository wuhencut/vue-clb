<template>
  <section class="page-user">
    <div class="page-activity">
      <header class="page-header">
        <div class="header-wrap">
          <h3>活动中心</h3>
          <backMenu></backMenu>
        </div>
      </header>
      <router-link :key="item.id" :to="item.clickUrl" v-for="item in activityList" v-if="activityList.length > 0" class="activity-list mb15">
        <img :src="item.imgUrl" alt="">
      </router-link>
      <div class="wait-activity txt-center txt-s24 txt-bold txt-white">
        各项活动敬请期待
      </div>
    </div>
    <loading v-if="glb.showLoading"></loading>
    <tip v-if="glb.showTip" :tip="glb.tipMsg" @hide="glb.showTip = false"></tip>
  </section>
</template>
<script>
    export default{
        data(){
            return {
              activityList: [],
              glb: this.global,
            }
        },
        mounted(){
          this.getData();
        },
        methods: {
          getData(){
            let t = this;
            this.server.PacketService.getActivityInfo().then(function (res) {
              var data = res.data;
              if (data.code == 100) {
                if (data.data) {
                  data.data.forEach(function (item) {
                    var url = item.bannerUrl.split(',')[0].slice(4);
                    item.imgUrl = '/static' + url;
                    item.clickUrl = item.bannerUrl.split(',')[2].slice(16);
                  });
                  t.activityList = data.data;
                } else {
                  t.activityList = [];
                }
              } else {
                t.activityList = [];
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
            });
          },
          //页面跳转
          goURL(id) {
            this.$router.push({path: '/actPacket', query: {activityId: id}});
        }
        },
        computed: {},
        destroyed(){

        }
    }
</script>

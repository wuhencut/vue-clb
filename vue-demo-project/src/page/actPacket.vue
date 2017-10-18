<template>
  <section class="page-guide">
    <div class="page-activity">
      <header class="page-header">
        <div class="header-wrap">
          <h3>红包活动</h3>
          <backMenu></backMenu>
        </div>
      </header>
      <!--<div class="mod-act-actpacket-banner">
          <img src="/app/images/banner/banner20.png">
      </div>-->
      <div class="mod-actpacket-list">
        <div class="wrap">
          <div class="list" v-for="(item, index) in TipInfo" @click="goURL(item.title, item.status)">
            <div class="tit">
              <p :class="{'txt-red': item.status == 0 || item.status == 1}" class="txt-s14">{{item.name}} <span
                :class="{'hot-icon': item.index != TipInfo.length}"></span><span
                :class="{'hot-icon new-icon':item.index == TipInfo.length}"></span></p>
              <p class="desc" v-html="item.description ||'&nbsp;'">{{item.description}}</p>
                        <span class="fr">
                            <em v-if="item.status == 0" class="packet-icon packet-icon-on">{{item.value}}元</em>
                          <!--<em v-if="item.status == 0" class="packet-type txt-red">GO</em>-->
                            <em v-if="item.status == 1" class="packet-icon packet-icon-on" @click="receivePacket(item)">{{item.value}}元</em>
                          <!--<em v-if="item.status == 1" class="packet-type">完成</em>-->
                            <em v-if="item.status == 2" class="packet-icon">{{item.value}}元</em>
                          <!--<em v-if="item.status == 2" class="packet-type">已领</em>-->
                            <em class="packet-type" :class="{'txt-red':item.status == 0}"
                                v-html="{'0':'GO','1':'完成','2':'已领'}[item.status]"></em>
                        </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tip v-if="glb.showTip" :tip="glb.tipMsg" @hide="glb.showTip = false"></tip>
    <loading v-if="glb.showLoading"></loading>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        activityId: this.$route.query.activityId,
        TipInfo: [],

      }
    },
    mounted(){
        this.tipInfo(this.activityId);
    },
    methods: {
      tipInfo(id) {
        let t = this;
        this.server.PacketService.getActAwardSetInfo(id).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            if (!data || data.length == 0) {
              t.TipInfo = [];
            } else {
              t.TipInfo = data.data;
            }
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
        });
      },
      //领取红包
      receivePacket(obj) {
        let t = this;
        // $event.stopPropagation();//阻止事件冒泡到上层节点而触发上级的事件
        this.server.PacketService.receiveTipByActivity(obj.title, obj.awardLogId, obj.value).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '领取成功';
            t.tipInfo(t.activityId);
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
        });
      },

      //页面跳转
      goURL(name, status) {
        if (name == 'ZCHB' && status == 0) {
          this.$router.push({path: '/register1', query: {backURL: '/actPacket', activityId: this.activityId}});
        } else if (name == 'MNJY' && status == 0) {
          this.$router.push({path: '/outerTrade/CL/1', query: {backURL: '/actPacket', activityId: this.activityId}});
        } else if (name == 'SCCZ' && status == 0) {
          this.$router.push({path: '/payType', query: {backURL: '/actPacket', activityId: this.activityId}});
        } else if (name == 'SPJY' && status == 0) {
          this.$router.push({path: '/outerTrade/CL/2', query: {backURL: '/actPacket', activityId: this.activityId}});
        } else if (name == 'SMRZ' && status == 0) {
          this.$router.push({path: '/identification', query: {backURL: '/actPacket', activityId: this.activityId}});
        } else {
          return;
        }
      },
    },
    computed: {},
    destroyed(){

    }
  }
</script>

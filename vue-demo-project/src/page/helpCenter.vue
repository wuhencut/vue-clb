<template>
  <section class="page-user">
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
    <div class="page-help">
      <header class="page-header">
        <div class="header-wrap">
          <h3>提问</h3>
          <router-link to="/help" class="nav-left"><i class="icon-back"></i></router-link>
          <a href="tel:4008888566" class="nav-right"><i class="icon-tel"></i></a>
        </div>
      </header>
      <div class="mod-help-service">
        <div v-if="helpList.length > 0">
          <div class="wrap" v-for="obj in helpList">
            <div class="question">
              <p>{{obj.msg}}</p>
              <p class="txt-s10 txt-grey">{{obj.msgTime | formatTime('yyyy-MM-dd HH:mm')}}</p>
            </div>
            <div class="answer" v-if="obj.reply">
              <p>{{obj.reply}}</p>
              <p class="txt-s10 txt-grey">{{obj.replyTime | formatTime('yyyy-MM-dd HH:mm')}}</p>
            </div>
          </div>
          <div v-if="currPage != totalPage" class="pt20">
            <div class="mod-more" @click="getHelpList(currPage+1);">
              加载更多
            </div>
          </div>
        </div>
        <div v-if="helpList.length == 0" class="mod-no-data">暂无数据</div>
      </div>
      <div class="mod-send">
        <div class="wrap">
          <router-link to="/helpAsk">我要留言</router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        pageSize: 6,
        helpList: [],
        currPage: 1,
        totalPage: 1,
        glb: this.global,
      }
    },
    mounted(){
      this.getHelpList()
    },
    methods: {
      //获取问题信息列表
      getHelpList(page) {
        let t = this;
        this.glb.showLoading = true;
        this.server.UserService.getMsgPage(page, t.pageSize).then(function (res) {
          var msgListData = res.data;
          if (msgListData.code == 100) {
            var data = msgListData.data;
            t.helpList = t.helpList.concat(data['items']);
            t.currPage = data['pageIndex'];
            t.totalPage = data['totalPage'];
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = msgListData['resultMsg'];
          }
          t.glb.showLoading = false;
        }).catch(function (err) {
          if(err){
            Promise.reject(err)
          }else{
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },
  },
  }
</script>

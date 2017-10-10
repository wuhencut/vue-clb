<template>
  <section class="page-user">
    <tip :tip="glb.tipMsg" v-if="glb.showTip" @hide="glb.showTip = false"></tip>
    <loading v-if="glb.showLoading"></loading>
    <div class="page-help">
      <header class="page-header">
        <div class="header-wrap">
          <h3>提问</h3>
          <a href="#/helpCenter" class="nav-left"><i class="icon-back"></i></a>
          <a href="" class="nav-right"><i class="icon-tel"></i></a>
        </div>
      </header>
      <div class="mod-help-ask">
        <div class="pt20">
          <select v-model="type">
            <option v-for="type in types">{{type}}</option>
          </select>
        </div>
        <div class="pt20">
          <textarea v-model="content" placeholder="请写下你宝贵的意见，我们客服将及时解答您的题！"></textarea>
        </div>
        <div class="pt30">
          <button class="btn btn-blue" @click="postMsg();">提交</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        types: [
          '请选择留言类型',
          '账户充值及提款问题',
          '点买点卖问题',
          '结算问题',
          '我要投诉',
          '意见反馈',
          '其他问题'
        ],
        type: '请选择留言类型',
        content: '',
        glb: this.global,
      }
    },
    mounted(){

    },
    methods: {
      //用户发起留言
      postMsg() {
        let t = this;
        if (this.type == '请选择留言类型') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择留言类型';
          return;
        }

        if (t.X.strLen(this.content) < 1 || t.X.strLen(this.content) > 300) {
          t.glb.showTip = true;
          t.glb.tipMsg = '留言内容不符合规范';
          return;
        }
        t.glb.showLoading = true;
        this.server.UserService.postMsg(this.type, '', this.content).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '留言成功';
            t.$router.push({path: '/helpCenter'});
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
          t.glb.showLoading = falsv
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

<template>
  <section class="page-user">
    <div class="page-identification">
      <header class="page-header">
        <div class="header-wrap">
          <h3>实名认证</h3>
          <!--<router-link :to="backURL" class="nav-left"><i class="icon-back"></i></router-link>-->
          <backMenu></backMenu>
        </div>
      </header>
      <div class="mod-form-wrap mt20">
        <div class="mod-form">
          <label>真实姓名</label><input v-model="name" type="text" class="inp" placeholder="请输入真实姓名"/>
        </div>
        <div class="mod-form">
          <label>身份证号</label><input v-model="IDNum" type="text" class="inp" placeholder="请输入身份证号"/>
        </div>
      </div>
      <div class="pt30 pl15 pr15">
        <button @click="certification()" class="btn btn-blue">认证</button>
      </div>
      <div class="txt-center txt-grey pt20">
        为保证资金安全，请务必输入您的真实信息。如遇到<p>问题，请联系<a href="tel:0571-28284082" class="txt-blue">客服</a></p>
      </div>
    </div>
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        backURL: this.$route.query.backURL || 'myInfo',
        name: '',
        IDNum: '',
        glb: this.global,
      }
    },
    mounted(){

    },
    methods: {
      certification() {
        let t = this;
        if (this.name == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入您的姓名';
          return false;
        }

        if (!this.X.isChinaName(this.name)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入正确的姓名';
          return false;
        }

        if (this.IDNum == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入身份证号码';
          return false;
        }

        if (!this.X.isIdentityNumber(this.IDNum)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '身份证号码错误';
          return false;
        }

        this.glb.showLoading = true;
        this.server.UserService.realName(this.name, this.IDNum).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '实名认证成功';
            t.$router.push({path: t.backURL});
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
    },
    computed: {},
    destroyed(){

    }
  }
</script>

<template>
  <section class="page-user">
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
    <div class="page-user-pass">
      <header class="page-header">
        <div class="header-wrap">
          <h3>修改登录密码</h3>
          <router-link to="/myInfo" class="nav-left"><i class="icon-back"></i></router-link>
        </div>
      </header>
      <div class="mt20">
        <div class="mod-form">
          <label>原登录密码</label><input v-model="oldPassword" type="password" class="inp" placeholder="请输入原登录密码"/>
        </div>
      </div>
      <div class="mod-form-wrap mt10">
        <div class="mod-form">
          <label>登录密码</label><input v-model="newPassword" type="password" class="inp" placeholder="请输入新登录密码"/>
        </div>
        <div class="mod-form">
          <label>确认密码</label><input v-model="surePassword" type="password" class="inp" placeholder="请输入确认密码"/>
        </div>
      </div>
      <div class="pt30 pl15 pr15">
        <button class="btn btn-blue" @click="changePass()">确定</button>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        newPassword: '',
        surePassword: '',
        oldPassword: '',
      }
    },
    mounted(){

    },
    methods: {
      changePass() {
        let t = this;
        if (this.oldPassword == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入原登录密码';
          return false;
        }
        if (!/^\w{6,16}$/.test(this.oldPassword) || /^\d+$/.test(this.oldPassword) || /^([a-zA-Z]+)$/.test(this.oldPassword)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '原登录密码输入错误';
          return false;
        }
        if (this.newPassword == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入新密码';
          return false;
        }
        if (!/^\w{6,16}$/.test(this.newPassword) || /^\d+$/.test(this.newPassword) || /^([a-zA-Z]+)$/.test(this.newPassword)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '密码为6-16位数字和字母组成';
          return false;
        }
        if (this.surePassword == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入确认密码';
          return false;
        }
        if (this.surePassword != this.newPassword) {
          t.glb.showTip = true;
          t.glb.tipMsg = '新密码与确认密码不一致';
          return false;
        }
        if (this.oldPassword.length < 6) {
          t.glb.showTip = true;
          t.glb.tipMsg = '原登录密码错误';
          return false;
        }
        if (this.newPassword == this.oldPassword) {
          t.glb.showTip = true;
          t.glb.tipMsg = '新密码不能与原始密码相同';
          return false;
        }
        this.glb.showLoading = true;
        this.server.PasswordService.loginPwdModify(this.oldPassword, this.newPassword).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '密码修改成功，请重新登录';
            t.server.AuthService.signOut();
            t.$router.push({path: '/login'});
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
          t.glb.showLoading = false;
        }).catch(function (error) {
          if (error) {
            Promise.reject(error);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      }
    },
    computed: {},
    destroyed(){

    }
  }
</script>

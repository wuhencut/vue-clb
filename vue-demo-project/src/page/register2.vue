<template>
  <section class="page-user">
    <tip :tip="global.tipMsg" @hide="global.showTip = false" v-if="global.showTip"></tip>
    <loading v-if="global.showLoading"></loading>
    <div class="page-register">
      <header class="page-header">
        <div class="header-wrap">
          <h3>注册</h3>
          <router-link to="/register1" class="nav-left"><i class="icon-back"></i></router-link>
        </div>
      </header>
      <div class="mod-form-wrap mod-step2 mt10">
        <div class="mod-form">
          <label>用户名</label><input v-model="username" type="text" class="inp" placeholder="请设置用户名"/>
        </div>
        <div class="mod-form">
          <label>登录密码</label><input v-model="password" type="password" class="inp" placeholder="6-16位数字和字母组成"/>
        </div>
        <div class="mod-form">
          <label>确认密码</label><input v-model="surepass" type="password" class="inp" placeholder="请输入确认密码"/>
        </div>
      </div>
      <div class="pl15 pr15 pt30">
        <button class="btn btn-blue" @click="register">注册</button>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        mobile: this.$route.params.mobile,//手机号
        password: '',//密码
        surepass: '',//确认密码
        username: '',//昵称
        global: this.global,
      }
    },
    mounted(){

    },
    methods: {
      //注册
      register() {
        let t = this;
        if (this.username == '') {
          t.global.showTip = true;
          t.global.tipMsg = '用户名不能为空';
          return false;
        }
        if (this.X.strLen(this.username) < 4 || this.X.strLen(this.username) > 16) {
          this.global.showTip = true;
          this.global.tipMsg = '用户名为4-16个字符，中文算2个字符';
          return false;
        }
        if (!/^[0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(this.username)) {
          this.global.showTip = true;
          this.global.tipMsg = '用户名只允许字母、数字、下划线或中文';
          return false;
        }
        if (!/^\w{6,16}$/.test(this.password) || /^\d+$/.test(this.password) || /^([a-zA-Z]+)$/.test(this.password)) {
          this.global.showTip = true;
          this.global.tipMsg = '登录密码为6-16位数字和字母组成';
          return false;
        }
        if (this.password != this.surepass) {
          this.global.showTip = true;
          this.global.tipMsg = '确认密码与密码不一致';
          return false;
        }
        this.global.showLoading = true;
        this.server.RegisterService.doRegister(this.mobile, this.username, this.password).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.global.showTip = true;
            t.global.tipMsg = '注册成功';
            t.$router.push({path: '/index'});
            //默认用户是在登录页面进入，如果是直接输入URL进入注册，此处将会有问题
            //history.go(-2);

            //    埋点：注册-完成注册
//            zhuge.track('注册-完成注册');
            t.server.AuthService.signIn(data.data);
          } else {
            t.global.showTip = true;
            t.global.tipMsg = data['resultMsg'];
          }
          t.global.showLoading = false;
        }).catch(function (error) {
          if(error){
            Promise.reject(error)
          }else{
            t.global.showTip = true;
            t.global.tipMsg = '服务器请求异常'
          }
        });
      },
    },

    computed: {}
  }
</script>

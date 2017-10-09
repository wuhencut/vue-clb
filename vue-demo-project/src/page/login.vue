<template>
  <section class="page-user">
    <div class="page-login">
      <header class="page-header">
        <div class="header-wrap">
          <h3>登录</h3>
          <router-link to="/register1" class="nav-right">注册</router-link>
        </div>
      </header>
      <div class="mod-form-wrap mt20">
        <div class="mod-form">
          <label>账号</label><input v-model="form.username" type="text" class="inp" placeholder="请输入昵称或手机号码" /><!--v-keyup="loginKeyUp($event)"-->
        </div>
        <div class="mod-form">
          <label>密码</label><input v-model="form.password" type="password" class="inp" placeholder="请输入密码"/> <!--v-keyup="loginKeyUp($event)"-->
          <router-link to="#forgetUserPass" class="tip-r">忘记密码</router-link>
        </div>
      </div>
      <div class="pt30 pl15 pr15">
        <button @click="login();" class="btn btn-blue">登录</button>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        form: {
          username: 'stone001',
          password: 'a123456'
        },
      }
    },
    mounted(){

    },
    methods: {
      /*loginKeyUp(e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
          this.login();
        }
      },*/
      login(){
        if (this.form.username == '') {
          this.X.tip('请输入您的账号');
          return false;
        }
        if (this.form.password == '') {
          this.X.tip('请输入登录密码');
          return false;
        }

        this.X.loading.show();
        let t = this;
        this.server.LoginService.login(this.form.username, this.form.password).then(function (res) {
          var data = res.data;
          if (data['authenticated']) {
            t.isLogin = true;
            if (t.backURL == '/login') {
              t.backURL = '/myHome';
            }
            t.server.AuthService.signIn(data['userId']);
            t.$router.push({path:'/myHome'});
            //埋点：个人信息
//            zhuge.identify(data['userId']);
          } else {
            t.X.tip(data['resultMsg']);
          }
          t.X.loading.hide();
        }).catch(function (error) {
          if(error){
            console.error(error)
          }else {
            t.X.tip('服务器请求异常');
          }
        });
      }
    },

    computed: {}
  }
</script>

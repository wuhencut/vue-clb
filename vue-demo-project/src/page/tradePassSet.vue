<template>
  <section class="page-user">
    <tip :tip="tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <div class="page-trade-pass">
      <header class="page-header">
        <div class="header-wrap">
          <h3>设置提现密码</h3>
          <!--<a href="#{{backURL}}" class="nav-left"><i class="icon-back"></i></a>-->
          <backMenu></backMenu>
        </div>
      </header>
      <div class="mod-form-wrap mt20">
        <div class="mod-form">
          <label>提现密码</label><input minlength="6" v-model="password" type="password" class="inp" placeholder="请输入提现密码"/>
        </div>
        <div class="mod-form">
          <label>确认密码</label><input minlength="6" v-model="surePassword" type="password" class="inp"
                                    placeholder="请再次确认提现密码"/>
        </div>
      </div>
      <div class="pt30 pl15 pr15">
        <button class="btn btn-blue" @click="tradePassSet()">确定</button>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        backURL: this.$route.query.backURL || '/myInfo',
        password: '',
        surePassword: '',
      }
    },
    mounted(){

    },
    methods: {
      tradePassSet() {
        let t = this;
        if (this.password == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入提现密码';
          return false;
        }
        if (!/^\d{6}$/.test(this.password)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '提现密码为6位数字';
          return false;
        }
        if (this.surePassword == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入确认密码';
          return false;
        }
        if (this.password != this.surePassword) {
          t.glb.showTip = true;
          t.glb.tipMsg = '两次密码不一致';
          return false;
        }
        this.glb.showLoading = true;
        this.server.PasswordService.PwdSet(this.password, this.surePassword).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '提现密码设置成功';
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
  }
</script>

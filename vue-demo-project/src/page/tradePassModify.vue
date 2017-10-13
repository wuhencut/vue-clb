<template>
  <section class="page-user">
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
    <div class="page-trade-pass">
      <header class="page-header">
        <div class="header-wrap">
          <h3>修改提现密码</h3>
          <router-link to="/myInfo" class="nav-left"><i class="icon-back"></i></router-link>
        </div>
      </header>
      <div class="mt20">
        <div class="mod-form">
          <label>原提现密码</label><input v-model="oldPwd" type="password" class="inp" style="width: 1rem;"
                                     placeholder="原提现密码"/>
          <router-link to="/forgetTradePass" class="tip-r">忘记密码</router-link>
        </div>
      </div>
      <div class="mod-form-wrap mt10">
        <div class="mod-form">
          <label>提现密码</label><input v-model="newPwd" type="password" class="inp" placeholder="请输入提现密码"/>
        </div>
        <div class="mod-form">
          <label>确认密码</label><input v-model="surePwd" type="password" class="inp" placeholder="请输入确认密码"/>
        </div>
      </div>
      <div class="pt30 pl15 pr15">
        <button class="btn btn-blue" @click="tradePassModify()">确定</button>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        oldPwd: '',
        newPwd: '',
        surePwd: '',
      }
    },
    mounted(){
    },
    methods: {
      tradePassModify() {
        let t = this;
        if (this.oldPwd == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入原始提现密码';
          return false;
        }
        if (!/^\d{6}$/.test(this.oldPwd)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '原始提现密码为6位数字';
          return false;
        }
        if (this.newPwd == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入新提现密码';
          return false;
        }
        if (!/^\d{6}$/.test(this.newPwd)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '提现密码为6位数字';
          return false;
        }
        if (this.surePwd == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入确认密码';
          return false;
        }
        if (this.surePwd != this.newPwd) {
          t.glb.showTip = true;
          t.glb.tipMsg = '新密码与确认密码不一致';
          return false;
        }
        if (this.newPwd == this.oldPwd) {
          t.glb.showTip = true;
          t.glb.tipMsg = '新密码不能与原始密码相同';
          return false;
        }
        this.glb.showLoading = true;
        this.server.PasswordService.PwdModify(this.newPwd, this.oldPwd).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '提现密码修改成功';
            setTimeout(function () {
              t.$router.push({path: '/myInfo'})
            },2010);
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

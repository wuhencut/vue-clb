<template>
  <section class="page-user">
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
    <div class="page-trade-pass">
      <header class="page-header">
        <div class="header-wrap">
          <h3>找回提现密码</h3>
          <backMenu></backMenu>
        </div>
      </header>
      <div class="mod-form-wrap mt20">
        <div class="mod-form">
          <label>手机号</label> <span v-model="mobile" class="pl5 txt-grey">{{hideMobile}}</span>
        </div>
        <div class="mod-form">
          <label>验证码</label><input v-model="checkCode" type="text" class="inp" placeholder="请输入验证码"/>
          <span v-if="time == 0" @click="getPasswordCode()" class="tip-r">获取验证码</span>
          <span v-if="time != 0" class="tip-r txt-grey">{{time}}秒后重发</span>
        </div>
      </div>
      <div class="mod-form-wrap mt10">
        <div class="mod-form">
          <label>提现密码</label><input v-model="password" type="password" class="inp" placeholder="6位纯数字"/>
        </div>
        <div class="mod-form">
          <label>确认密码</label><input v-model="surePassword" type="password" class="inp" placeholder="请确认提现密码"/>
        </div>
      </div>
      <div class="pt30 pl15 pr15">
        <button class="btn btn-blue" @click="resetTradePassInfo()">确定</button>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        timer: null,
        backURL: this.$route.query.backURL || '/myInfo',
        mobile: '',
        hideMobile: '',
        checkCode: '',
        password: '',
        surePassword: '',
        time: 0,
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let t = this;
        t.glb.showLoading = true;
        this.server.UserService.getUserInfo().then(function (res) {
          var userInfoData = res.data;
          if (userInfoData.code == 100) {
            t.mobile = userInfoData.data['loginMobileNoHidden'];
            t.hideMobile = userInfoData.data['loginMobile'];
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = userInfoData['resultMsg'];
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
      },
      //重设密码
      resetTradePassInfo() {
        let t = this;
        if (t.checkCode == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入验证码';
          return false;
        }
        if (!/^\d{6}$/.test(t.checkCode)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '验证码输入有误';
          return false;
        }
        if (t.password == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入提现密码';
          return false;
        }
        if (!/^\d{6}$/.test(t.password)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '提现密码为6位数字';
          return false;
        }
        if (t.surePassword == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入确认密码';
          return false;
        }
        if (t.surePassword != t.password) {
          t.glb.showTip = true;
          t.glb.tipMsg = '提现密码与确认密码不符';
          return false;
        }
        //重置提现密码服务
        t.glb.showLoading = true;
        this.server.PasswordService.resetWithdrawPwd(t.password, t.checkCode).then(function (res) {
          var resetWithdrawPwdData = res.data;
          if (resetWithdrawPwdData.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '提现密码修改成功';
            t.$router.push({path: t.backURL});
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = resetWithdrawPwdData['resultMsg'];
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
      },

      //获取验证码
      getPasswordCode() {
        let t = this;
        //发送验证码请求
        this.server.PasswordService.sendPasswordCode(t.mobile).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.time = 60;
            t.glb.showTip = true;
            t.glb.tipMsg = '验证码已发送至手机，请注意查收';
            t.timerFn();
          } else if (data.code == 101) {
            t.time = data.data.interval;
            t.timerFn();
          }
          else {
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

      //倒计时
      timerFn() {
        let t = this;
        t.timer = setInterval(function () {
          if (t.time > 0) {
            t.time--;
          } else {
            t.timer && clearTimeout(t.timer);
          }
        }, 1000);
      }
    },
    computed: {},
    destroyed(){
      this.timer && clearTimeout(this.timer);
    }
  }
</script>

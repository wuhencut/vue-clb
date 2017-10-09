<template>
  <section class="page-user">
    <tip v-if="global.showTip" :tip="tipMsg" @hide="global.showTip = false"></tip>
    <loading v-if="showLoading"></loading>
    <div class="page-register">
      <header class="page-header">
        <div class="header-wrap">
          <h3>注册</h3>
        </div>
      </header>
      <div class="mod-form-wrap mt20">
        <div class="mod-form">
          <label>手机号</label><input maxlength="11" v-model="mobile" type="tel" class="inp" placeholder="请输入手机号码"/>
        </div>
        <div class="mod-form">
          <span v-if="time==0" class="tip-r" @click="getImgCode();">获取验证码</span>
          <span v-if="time!=0" class="tip-r txt-grey">{{time}}秒后重发</span>
          <label>验证码</label><input maxlength="6" v-model="checkCode" type="tel" class="inp" placeholder="验证码" style="width: 0.9rem"/>
        </div>
      </div>
      <p class="pl20 pt20 txt-grey">
        <label>
          <input type="checkbox" v-model="agreement">
          我已阅读并同意
          <router-link to="/agreementRegister?backURL=/register1" class="txt-blue">《平台网站服务协议》</router-link>
        </label>
      </p>
      <div class="pl15 pr15 pt20">
        <button class="btn btn-blue" @click="register();">下一步</button>
      </div>
      <p class="pt20 txt-center txt-grey">
        已有账号？
        <router-link class="txt-blue" to="#login">请登录</router-link>
      </p>
    </div>
    <div class="db-bg" v-if="showCodeDialog">
      <div class="mod-img-code-wrap">
        <header>请输入验证码</header>
        <div class="content">
          <img class="img-code" @click="refreshCode()" :src="imgURL">
          <input class="inp-code ml10" v-model="imgCode" type="text" maxlength="4">
        </div>
        <footer>
          <ul>
            <li @click="closeDialog">取消</li>
            <li @click="sendCode()">确定</li>
          </ul>
        </footer>
      </div>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        timer: null,
        mobile: '',
        time: 0,
        temptimes: Date.now(),
        agreement: true,
        checkCode: '',//验证码
        imgCode: '',
        showCodeDialog: false,
        imgURL: '/sso/checkCode.json?v=' + this.temptimes,
        tipMsg: '',
        showTip: false,
        showLoading: false,
        global: this.global
      }
    },
    mounted(){

    },
    methods: {
      //下一步
      register() {
        if (this.mobile == '') {
          this.showTip = true;
          this.tipMsg = '请输入手机号码';
          return false;
        }
        if (!this.X.isMobile(this.mobile)) {
          this.showTip = true;
          this.tipMsg = '手机号码输入错误';
          return false;
        }
        if (this.checkCode == '') {
          this.showTip = true;
          this.tipMsg = '请输入短信验证码';
          return false;
        }
        if (!/^\d{4}$/.test(this.checkCode)) {
          this.showTip = true;
          this.tipMsg = '验证码输入错误';
          this.refreshCode();
          return false;
        }
        if (!this.agreement) {
          this.showTip = true;
          this.tipMsg = '请阅读并同意网站服务协议';
          return false;
        }

        //验证手机号码是否已经注册
        this.showLoading = true;
        let t = this;
        this.server.RegisterService.regNextStep(this.mobile, this.checkCode).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.$router.push({path: '/register2/' + data.data});
          } else {
            t.showTip = true;
            t.tipMsg = data['resultMsg'];
          }
          t.showLoading = false;
        }).catch(function () {
          t.showTip = true;
          t.tipMsg = '服务器请求异常';
        });
        //埋点：开始注册
//        zhuge.track('注册-开始注册');
      },
      //显示图片验证码
      getImgCode() {
        if (this.mobile == '') {
          this.showTip = true;
          this.tipMsg = '请输入手机号码';
          return false;
        }
        if (!this.X.isMobile(this.mobile)) {
          this.showTip = true;
          this.tipMsg = '手机号码输入错误';
          return false;
        }
        this.refreshCode();
        this.showCodeDialog = true;
      },
      //获取验证吗
      sendCode() {
        if (this.mobile == '') {
          this.showTip = true;
          this.tipMsg = '请输入手机号码';
          return false;
        }
        if (!this.X.isMobile(this.mobile)) {
          this.showTip = true;
          this.tipMsg = '手机号码输入错误';
          return false;
        }
        if (this.imgCode == '') {
          this.showTip = true;
          this.tipMsg = '请输入图片验证码';
          return false;
        }
        if (!/^\d{4}$/.test(this.imgCode)) {
          this.showTip = true;
          this.tipMsg = '图片验证码输入错误';
          // this.refreshCode();
          return false;
        }
        if (!/^\d{4}$/.test(this.imgCode)) {
          this.showTip = true;
          this.tipMsg = '图片验证码输入错误';
          if (this.imgCode == 4)this.refreshCode();
          return false;
        }
        //发送验证码请求
        this.showLoading = true;
        let t = this;
        this.server.RegisterService.getRegisterCode(this.mobile, this.imgCode).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.closeDialog();
            t.showTip = true;
            t.tipMsg = '验证码已发送至手机，请注意查收';
            t.time = 60;
            t.timerFn();
          } else if (data.code == 101) {
            t.closeDialog();
            t.showTip = true;
            t.tipMsg = '验证码已发送至手机，请注意查收';
            t.time = data.data.interval;
            t.timerFn();
          } else {
            t.showTip = true;
            t.tipMsg = data['resultMsg'];
            t.refreshCode();
          }
          t.showLoading = false;
        }).catch(function (error) {
          if(error){
            Promise.reject(error)
          }else{
            this.showTip = true;
            this.tipMsg = '服务器请求异常';
          }
        });
      },
      // 关闭弹出框
      closeDialog() {
        this.showCodeDialog = false;
        this.imgCode = '';
      },
      //刷新验证码
      refreshCode() {
        this.temptimes = Date.now();
        this.imgURL = '/sso/checkCode.json?v=' + this.temptimes;
      },
      //倒计时方法
      timerFn() {
        let t = this;
        this.timer = setInterval(function () {
          if (t.time > 0) {
            t.time--;
          } else {
            t.timer && clearTimeout(t.timer);
          }
        }, 1000);
      },
      //清空定时器
      clearTimer() {
        let t = this;
        this.time = 0;
        this.timer && clearTimeout(timer);
        t.timer = null;
      }
    },

    computed: {},
    destroyed(){
      this.X.engine.destroy();
    }
  }
</script>

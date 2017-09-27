<template>
  <section class="page-user">
    <div class="page-register">
      <header class="page-header">
        <div class="header-wrap">
          <h3>注册</h3>
        </div>
      </header>
      <div class="mod-form-wrap mt20">
        <div class="mod-form">
          <label>手机号</label><input v-model="mobile" type="tel" class="inp" placeholder="请输入手机号码"/>
        </div>
        <div class="mod-form">
          <span v-if="time==0" class="tip-r" @click="getImgCode();">获取验证码</span>
          <span v-if="time!=0" class="tip-r txt-grey">{{time}}秒后重发</span>
          <label>验证码</label><input v-model="checkCode" type="tel" class="inp" placeholder="验证码" style="width: 0.9rem"/>
        </div>
      </div>
      <p class="pl20 pt20 txt-grey">
        <label>
          <input type="checkbox" v-model="agreement">
          我已阅读并同意
          <router-link to="#/agreementRegister?backURL=/register1" class="txt-blue">《平台网站服务协议》</router-link>
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
  </section>
  <!--<dialog v-show="showCodeDialog">
    <div class="mod-img-code-wrap">
      <header>请输入验证码</header>
      <div class="content">
        <img class="img-code" @click="refreshCode();" ng-src="/sso/checkCode.json?v={{temptimes}}">
        <input class="inp-code ml10" v-model="$parent.imgCode" type="text" maxlength="4">
      </div>
      <footer>
        <ul>
          <li @click="closeDialog();">取消</li>
          <li @click="sendCode();">确定</li>
        </ul>
      </footer>
    </div>
  </dialog>-->
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
      }
    },
    mounted(){

    },
    methods: {
      //下一步
      register() {
        if (this.mobile == '') {
          this.X.tip('请输入手机号码');
          return false;
        }
        if (!this.X.isMobile(this.mobile)) {
          this.X.tip('手机号码输入错误');
          return false;
        }
        if (this.checkCode == '') {
          this.X.tip('请输入短信验证码');
          return false;
        }
        if (!/^\d{4}$/.test(this.checkCode)) {
          this.X.tip('验证码输入错误');
          this.refreshCode();
          return false;
        }
        if (!this.agreement) {
          this.X.tip('请阅读并同意网站服务协议');
          return false;
        }

        //验证手机号码是否已经注册
        this.X.loading.show();
        let t = this;
        this.server.RegisterService.regNextStep(this.mobile, this.checkCode).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            this.$router.push({path: '/register2/' + data.data});
          } else {
            t.X.tip(data['resultMsg']);
          }
          t.X.loading.hide();
        }).catch(function () {
          t.X.tip('服务器请求异常');
        });
        //埋点：开始注册
//        zhuge.track('注册-开始注册');
      },
      //显示图片验证码
      getImgCode() {
        if (this.mobile == '') {
          this.X.tip('请输入手机号码');
          return false;
        }
        if (!this.X.isMobile(this.mobile)) {
          this.X.tip('手机号码输入错误');
          return false;
        }
        this.refreshCode();
        this.showCodeDialog = true;
      },
      //获取验证吗
      sendCode() {
        if (this.mobile == '') {
          this.X.tip('请输入手机号码');
          return false;
        }
        if (!X.isMobile(this.mobile)) {
          this.X.tip('手机号码输入错误');
          return false;
        }
        if (this.imgCode == '') {
          this.X.tip('请输入图片验证码');
          return false;
        }
        if (!/^\d{4}$/.test(this.imgCode)) {
          this.X.tip('图片验证码输入错误');
          // this.refreshCode();
          return false;
        }
        if (!/^\d{4}$/.test(this.imgCode)) {
          this.X.tip('图片验证码输入错误');
          if (this.imgCode == 4)this.refreshCode();
          return false;
        }
        //发送验证码请求
        this.X.loading.show();
        let t = this;
        this.server.RegisterService.getRegisterCode(this.mobile, this.imgCode).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.closeDialog();
            t.X.tip('验证码已发送至手机，请注意查收');
            t.time = 60;
            t.timerFn();
          } else if (data.code == 101) {
            this.closeDialog();
            t.X.tip('验证码已发送至手机，请注意查收');
            this.time = data.data.interval;
            t.timerFn();
          } else {
            t.X.tip(data['resultMsg']);
            t.refreshCode();
          }
          t.X.loading.hide();
        }).catch(function () {
          t.X.tip('服务器请求异常');
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

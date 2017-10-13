<template>
  <div>
    <section class="page-user">
      <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
      <loading v-if="glb.showLoading"></loading>
      <div class="page-phoneBind">
        <header class="page-header">
          <div class="header-wrap">
            <h3>手机绑定</h3>
            <a href="#/phoneBind1" class="nav-left"><i class="icon-back"></i></a>
          </div>
        </header>
        <div class="mod-form-wrap mt20">
          <div class="mod-form">
            <label>新手机号</label><input v-model="mobile" type="tel" class="inp" placeholder="请输入手机号码"/>
          </div>
          <div class="mod-form">
            <span v-if="time==0" class="tip-r" @click="getImgCode();">获取验证码</span>
            <span v-if="time!=0" class="tip-r txt-grey">{{time}}秒后重发</span>
            <label class="pr15">验证码</label><input v-model="checkCode" type="tel" class="inp" maxlength="6" placeholder="请输入验证码" style="width: 1.2rem"/>
          </div>
        </div>
        <div class="pt30 pl15 pr15">
          <button class="btn" :class="btnState" @click="bind()">绑定</button>
        </div>
        <p class="txt-center pt15 txt-grey">如有问题，请<a class="txt-bright-blue" href="tel:4008888566">联系客服</a></p>
      </div>
    </section>
    <div v-show="showCodeDialog">
      <div class="db-bg"></div>
      <div class="mod-img-code-wrap" style="z-index: 10001">
        <p class="txt-black txt-center pt50">获取验证码前，请您先填写下面数字</p>
        <div class="content">
          <img class="img-code" @click="refreshCode();" :src="imgURL">
          <input class="inp-code ml10" v-model="imgCode" type="text" maxlength="4" placeholder="请输入">
        </div>
        <footer class="pt10">
          <ul>
            <li @click="closeDialog();">取消</li>
            <li @click="sendCode();">确定</li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        imgURL: '',
        btnState: '',
        timer: null, changeTimer: null,
        mobile: '',
        oldMobile: '',
        time: 0,
        temptimes: Date.now(),
        checkCode: '',//验证码
        imgCode: '',
        showCodeDialog: false,
      }
    },
    mounted(){
      this.getData();
      this.changeBtnTimer();
    },
    methods: {
      getData(){
        let t = this;
        this.glb.showLoading = true;
        this.server.UserService.getUserInfo().then(function (res) {
          var userInfoData = res.data;
          if (userInfoData.code == 100) {
            t.oldMobile = userInfoData.data.loginMobileNoHidden;
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

      //绑定手机号
      bind() {
        let t = this;
        /*if (this.mobile == '') {
         X.tip('请输入手机号码');
         return false;
         }*/
        if (!this.X.isMobile(this.mobile)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '手机号码输入错误';
          return false;
        }
        /*if (this.checkCode == '') {
         X.tip('请输入短信验证码');
         return false;
         }*/
        if (!/^\d{6}$/.test(this.checkCode)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '验证码输入错误';
          t.refreshCode();
          return false;
        }
        //绑定手机号
        this.glb.showLoading = true;
        this.server.UserService.bindMobile(this.checkCode, this.mobile).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '手机绑定成功';
            t.$router.push({path: '/myInfo'});
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
      },

      //显示图片验证码
      getImgCode() {
        if (this.mobile == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入手机号码';
          return false;
        }
        if (!this.X.isMobile(this.mobile)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '手机号码输入错误';
          /*this.refreshCode();*/
          return false;
        }
        this.showCodeDialog = true;
        this.refreshCode();
      },

      //获取验证码
      sendCode() {
        let t = this;
        if (this.mobile == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入手机号码';
          return false;
        }
        if (!this.X.isMobile(this.mobile)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '手机号码输入错误';
          return false;
        }
        if (this.imgCode == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入图片验证码';
          return false;
        }
        if (!/^\d{4}$/.test(this.imgCode)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '图片验证码输入错误';
          if (t.imgCode == 4)this.refreshCode();
          return false;
        }
        if (this.mobile == this.oldMobile) {
          t.glb.showTip = true;
          t.glb.tipMsg = '新手机号码不能和旧手机号相同';
          t.closeDialog();
          t.refreshCode();
          return false;
        }
        //发送短信验证码请求
        t.glb.showLoading = true;
        this.server.UserService.mobileBindCode(this.imgCode, this.mobile).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.closeDialog();
            t.glb.showTip = true;
            t.glb.tipMsg = '验证码已发送至手机，请注意查收';
            t.time = 60;
            t.timerFn();
          } else if (data.code == 101) {
            t.closeDialog();
            t.glb.showTip = true;
            t.glb.tipMsg = '验证码已发送至手机，请注意查收';
            t.time = data.data.interval;
            t.timerFn();
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
            t.closeDialog();
            t.refreshCode();
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

      // 关闭弹出框
      closeDialog() {
        this.showCodeDialog = false;
        this.imgCode = '';
      },

      //刷新验证码
      refreshCode() {
        this.imgCode = '';
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

      //定时器，用来检测输入框是否有内容 ，并来修改样式
      changeBtnTimer() {
        let t = this;
        this.changeTimer = setInterval(function () {
          t.btnState = 'btn-disabled';
          t.btnDisabled = true;

          if (t.mobile.length == 11 && t.checkCode.length == 6) {
            t.btnState = 'btn-red';
            t.btnDisabled = false;
          } else {
            t.btnState = 'btn-disabled';
            t.btnDisabled = true;
          }
        }, 100);
      },

      //清空定时器
      clearTimer() {
        this.time = 0;
        this.timer && clearTimeout(this.timer);
        this.changeTimer && clearTimeout(this.changeTimer);
        this.changeTimer = this.timer = null;
      }
    },
    computed: {},
    destroyed(){
      this.clearTimer();
    }
  }
</script>

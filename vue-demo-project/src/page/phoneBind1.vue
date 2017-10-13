<template>
  <div>
    <section class="page-user">
      <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
      <loading v-if="glb.showLoading"></loading>
      <div class="page-phoneBind">
        <header class="page-header">
          <div class="header-wrap">
            <h3>手机绑定</h3>
            <a href="#/myInfo" class="nav-left"><i class="icon-back"></i></a>
          </div>
        </header>
        <div class="mod-form-wrap mt20">
          <div class="mod-form">
            <label>手机号</label><em class="txt-s14 pl10">{{user.loginMobileNoHidden}}</em>
          </div>
          <div class="mod-form">
            <span v-if="time==0" class="tip-r" @click="getImgCode()">获取验证码</span>
            <span v-if="time!=0" class="tip-r txt-grey">{{time}}秒后重发</span>
            <label>验证码</label><input v-model="checkCode" type="tel" class="inp" placeholder="请输入验证码" maxlength="6" style="width: 1.2rem"/>
          </div>
        </div>
        <div class="pt30 pl15 pr15">
          <button class="btn" :class="btnState" @click="toNext();">下一步</button>
        </div>
        <p class="txt-center pt15 txt-grey">如有问题，请
          <a class="txt-bright-blue" href="tel:4008888566">联系客服</a>
        </p>
      </div>
    </section>
    <div v-show="showCodeDialog">
      <div class="db-bg"></div>
      <div class="mod-img-code-wrap" style="z-index: 100001">
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
        timer: null,
        changeTimer: null,
        user: {},
        mobile: '',
        time: 0,
        temptimes: Date.now(),
        checkCode: '',//验证码
        imgCode: '',
        showCodeDialog: false,
        cellPhone: '',
        btnState: 'disabled'
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
            t.user = userInfoData.data;
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

      clickNumber(){
        this.cellPhone = this.server.SystemService().cellPhoneNumber();
      },

      //下一步
      toNext() {
        let t = this;
        /*if (this.checkCode == '') {
         X.tip('请输入短信验证码');
         return false;
         }*/
        if (!/^\d{6}$/.test(this.checkCode)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '验证码输入错误';
          this.refreshCode();
          return false;
        }
        //手机号解绑
        this.showLoading = true;
        this.server.UserService.unbindMobile(this.checkCode).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.$router.push({path: '/phoneBind2'});
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
          t.showLoading = false;
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
        this.imgCode = '';
        this.showCodeDialog = true;
        this.refreshCode();
      },

      //原手机号短信验证
      sendCode() {
        let t = this;
        if (this.imgCode == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入图片验证码';
          return false;
        }
        if (!/^\d{4}$/.test(this.imgCode)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '图片验证码输入错误';
          if (this.imgCode == 4)this.refreshCode();
          return false;
        }
        //发送验证码请求
        this.glb.showLoading = true;
        this.server.UserService.mobileUnbindCode(this.imgCode).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.closeDialog();
            t.glb.showTip = true;
            t.glb.tipMsg = '验证码发送成功，请注意查收短信';
            t.time = 60;
            t.timerFn();
          } else if (data.code == 101) {
            t.closeDialog();
            t.glb.showTip = true;
            t.glb.tipMsg = '验证码发送成功，请注意查收短信';
            t.time = data.data.interval;
            t.timerFn();
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
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

      //刷新验证码
      refreshCode() {
        this.temptimes = Date.now();
        this.imgURL = '/sso/checkCode.json?v=' + this.temptimes;
      },

      // 关闭弹出框
      closeDialog() {
        this.showCodeDialog = false;
      },

      //倒计时方法
      timerFn() {
        let t = this;
        this.timer = setInterval(function () {
          if (t.time > 0) {
            t.time--;
          } else {
            t.timer && clearTimeout(timer);
          }
        }, 1000);
      },

      //定时器，用来检测输入框是否有内容 ，并来修改样式
      changeBtnTimer(){
        let t = this;
        this.changeTimer = setInterval(function () {
          t.btnState = 'btn-disabled';
          t.btnDisabled = true;
          if (t.checkCode.length == 6) {
            t.btnState = 'btn-blue';
            t.btnDisabled = false;
          } else {
            t.btnState = 'btn-disabled';
            t.btnDisabled = true;
          }
        }, 100);
      },

      //清空定时器
      clearTimer() {
        let t = this;
        var timer = this.timer,changeTimer = this.changeTimer;
        this.time = 0;
        timer && clearTimeout(timer);
        changeTimer && clearTimeout(changeTimer);
        changeTimer = timer = null;
      }

    },
    computed: {},
    destroyed(){
      this.clearTimer();
    }
  }
</script>

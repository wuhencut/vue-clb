<template>
  <div class="wrap">
    <div class="title">
      <h3>王者期货</h3>
      <p>赚取人生财富，低成本高收益</p>
      <div class="logo">
        <img src="/static/images/logo.png">
      </div>
      <div id="tips" class="tips">请点击右上角菜单，选择在浏览器打开</div>
    </div>
    <div class="img">
      <img src="/static/images/download-bg.jpg">
    </div>
  </div>
</template>
<style type="text/css">
  * {
    padding: 0;
    margin: 0;
  }

  html, body {
    height: 100%;
    color: #333;
  }

  body {
    font: 14px/1.5 微软雅黑, Arial, YaHei, tahoma, 'Hiragino Sans GB', 宋体;
    background: #FA645C;
  }

  .wrap .title {
    text-align: center;
    background: #FFFFFF;
    padding: 30px 0;
  }

  .wrap .title > h3 {
    font-size: 30px;
  }

  .wrap .title > p {
    padding-top: 10px;
    font-size: 16px;
    color: #666666;
  }

  .wrap .title .logo {
    padding-top: 30px;
  }

  .wrap .title .tips {
    display: none;
    padding-top: 20px;
    color: #E34C4D;
  }

  .wrap .title .logo > img {
    width: 100px;
  }

  .wrap .img {
    /*padding: 50px 20px;*/
  }

  .wrap .img > img {
    width: 100%;
  }
</style>
<script>
  export default{
    data(){
      return {}
    },
    mounted(){
      this.check();
    },
    methods: {
      check(){
        var ua = navigator.userAgent,
          tips = document.getElementById('tips'),
          androidURL = 'https://www.xingu365.com/xingu_apk.apk',
          iosURL = 'https://itunes.apple.com/us/app/id1270644248?l=zh&ls=1&mt=8';
        var isWX = (ua.indexOf("MicroMessenger") > -1),
          android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
          ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
          ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
          iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
        if (isWX) {
          tips.innerHTML = '请点击右上角菜单，选择在浏览器打开';
          tips.style.display = 'block';
          return;
        }
        if (android) {
          if (androidURL == '') {
            tips.innerHTML = '即将上架，敬请期待';
            tips.style.display = 'block';
          } else {
            window.location.href = androidURL;
          }
          return;
        }
        if (iphone || ipad || ipod) {
          if (iosURL == '') {
            tips.innerHTML = '即将上架，敬请期待';
            tips.style.display = 'block';
          } else {
            window.location.href = iosURL;
          }
        }
      }
    },
    computed: {},
    destroyed(){

    }
  }
</script>

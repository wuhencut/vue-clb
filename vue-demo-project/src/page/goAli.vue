<template>
  <div class="wrap">
    <div class="title">
      <h3>前往支付宝</h3>
      <div id="tips" class="tips">请点击右上角菜单，选择在浏览器打开,<br>跳转支付宝</div>
      <div class="logo">
        <img src="/static/images/ali-icon.png">
      </div>
    </div>
    <div class="img">
      <img src="/static/images/aliPay-bg.jpg">
    </div>
  </div>
</template>
<style>
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
    background: #E34C4D;
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
            this.check()
        },
        methods: {
          check(){
            var ua = navigator.userAgent,
              tips = document.getElementById('tips'),
              url = 'HTTPS://QR.ALIPAY.COM/FKX09878CHJPODHTY1R89C';
            var isWX = (ua.indexOf("MicroMessenger") > -1),
              android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
              ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
              ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
              iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
            if (isWX) {
              tips.innerHTML = '请点击右上角菜单，选择在浏览器打开,<br>跳转支付宝';
              tips.style.display = 'block';
              return;
            }
            if (android) {
              if(url == ''){
                tips.innerHTML = '即将上架，敬请期待';
                tips.style.display = 'block';
              }else{
                window.location.href = url;
              }
              return;
            }
            if (iphone || ipad || ipod) {
              if(url == ''){
                tips.innerHTML = '即将上架，敬请期待';
                tips.style.display = 'block';
              }else{
                window.location.href = url;
              }
            }
          }
        }
    }
</script>

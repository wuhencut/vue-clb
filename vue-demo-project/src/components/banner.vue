<template>
  <swipe class="my-swipe">
    <swipe-item v-for="item in banners"><a :href="item.link"><img :src="item.imgURL" alt=""></a></swipe-item>
  </swipe>

</template>

<style>
  .my-swipe {
    height: 110px;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }

  .my-swipe img{
    width:100%;
  }

</style>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  require('vue-swipe/dist/vue-swipe.css');
  export default {
    components:{
      'swipe':Swipe,
      'swipe-item': SwipeItem
    },
    data(){
      return {
        banners: [],
      }
    },
    /*directives: {
     run(el, binding){
     if (typeof binding.value == 'function') {
     binding.value(el)
     }
     }
     },*///绑定指令来实现取到dom元素
    mounted() {
      this.getADBanner();
    },

    methods: {
      getADBanner() {
        var t = this;
        this.X.loading.show();
        this.server.ADBannerService.getADBannerData().then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.initADBannerData(data.data);
//            t.showAD(t.AD.id);
          } else {
            t.X.tip(data['resultMsg']);
          }
          t.X.loading.hide();
        }).catch(function (error) {
          if (error) {
            console.log(error);
          } else {
            t.X.tip('服务器请求异常');
          }
        });
      },

      //初始化弹窗广告的数据
      initADBannerData(data) {
        var arr = [], banners = [];
        for (var i in data) {
          data[i] = arr[i] = {
            id: data[i][0],
            title: data[i][1],
            type: data[i][2],
            imgURL: '../static/' + data[i][3].split('/').splice(2).join('/'),
            link: data[i][5] || '',
            btnName: data[i][6] || '',
            btnLink: data[i][8] || ''
          };
          if (data[i].type == 0) {
            this.AD = data[i];
          } else {
            banners.push(data[i]);
          }
        }
        this.banners = banners;
      },
    }
  }
</script>




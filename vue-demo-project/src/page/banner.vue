<template>
  <section class="page-home">
    <div class="page-index">
      <div id="mod-slide" class="mod-slide">
        <ul class="slide-wrap"></ul>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    mounted() {
      this.getADBanner();
      this.initADBannerData();
    },
    methods:{
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
          if(error){
            console.log(error);
          }else{
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
        this.init('mod-slide', banners);
      },
      init: function (el, arr) {
        var $el = $("#" + el);
        this.el = $el;
        this.wrap = $el.find("ul.slide-wrap");
        this.arr = arr;
        this.len = arr.length;
        this.index = 0;

        this.initHtml();
        if(this.len<2){
          return;
        }
        this.createMenu();

        var t = this;
        this.timer = setTimeout(function () {
          t.swipe('L');
        }, 3000);
        /*var startX, l = Date.now();
         $swipe.bind($el, {
         'start': function (coords, event) {
         startX = coords.x;
         },
         'end': function (coords, event) {
         var ll = Date.now();
         if (ll - l > 500) {
         l = ll;
         var diff = coords.x - startX;
         if (diff > 10) {
         t.swipe('R');
         } else if (diff < -10) {
         t.swipe('L');
         }
         }
         }
         });*/
      },
      initHtml: function () {
        var t = this, arr = t.arr, $el = t.el, wrap = t.wrap;
        var inner = '';
        for (var i in arr) {
          var item = arr[i];
          if (item.link) {
            // item.link += '?backURL=/index';
            if (item.btnName && item.btnLink) {
              var btnName = encodeURIComponent(item.btnName), btnLink = encodeURIComponent(item.btnLink);
              item.link = item.link + '&btnName=' + btnName + '&btnLink=' + btnLink;
            }
            inner += '<li><a href="' + item.link + '"><img src="' + item.imgURL + '"/></a></li>'
          } else {
            inner += '<li><img src="' + item.imgURL + '"/></li>'
          }
        }
        wrap.append(inner);
        var li = $('ul.slide-wrap > li');
        li.css('left', '100%');
        li.eq(0).css('left', 0);
        this.li = li;
      },
      createMenu: function () {
        var t = this, len = t.len, $el = t.el;
        var menu = '<ul class="slide-menu">';
        for (var i = 0; i < len; i++) {
          menu += '<li></li>';
        }
        menu += '</ul>';
        $el.append(menu);
        var $menu = $('.slide-menu > li');
        $menu.eq(0).addClass('curr');
        this.menu = $menu;
      },
      swipe: function (dir) {
        var t = this, index = t.index, len = t.len, li = t.li, menu = t.menu;
        t.clearTimer();
        var next = dir == 'L' ? index + 1 : index - 1;
        next = next < 0 ? len - 1 : next > len - 1 ? 0 : next;
        li.eq(index).animate({'left': dir == 'L' ? '-100%' : '100%'});
        menu.removeClass('curr');
        menu.eq(next).addClass('curr');
        li.eq(next).css({'left': dir == 'L' ? '100%' : '-100%'}).animate({'left': '0'}, function () {
          t.index = next;
        });
        t.timer = setTimeout(function () {
          t.swipe('L');
        }, 3000);
      },
      clearTimer: function () {
        var t = this, timer = t.timer;
        if (timer) {
          clearTimeout(timer);
        }
      }
    }
  }
</script>

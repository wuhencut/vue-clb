import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import {Y} from './utils/yztz'
import $ from 'jquery'
var axios = require('axios');
import server from './api/server'
import tip from './components/tip.vue'
import loading from './components/loading.vue'
import confirm from './components/confirm.vue'
import glb from './global/global.js'
import backMenu from './components/backMenu.vue'
import alert from './components/alert.vue'
// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.use(Vuex);
Vue.prototype.$api = api;
Vue.prototype.X = Y;
Vue.prototype.axios = axios
Vue.prototype.server = server;
Vue.prototype.global = glb;

Vue.config.productionTip = false;
Vue.component('tip', tip);
Vue.component('loading', loading);
Vue.component('confirm', confirm);
Vue.component('backMenu', backMenu);
Vue.component('alert', alert);

router.beforeEach(function (to, from, next) {
  var backURL = from.path, key;
  if (from.path && to.meta.requireAuth) {
    for (key in to.params) {
      backURL = backURL.replace(":" + key, to.params[key]);
    }
    console.log('-----路由拦截 URL:' + to.path + '-----');
    if (!server.AuthService.auth()) {
      console.log('-----用户未登录，跳转到登录-----');
      router.push({path: '/login', query: {goURL: to.path}})
    } else {
      console.log('-----用户已登录，放行-----');
      next()
    }
  } else {
    console.log('-----路由放行 URL:' + to.path + '-----')
    next();
  }

});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
//元素的补零计算
function addZero(val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
};

Vue.filter('formatTime', function (value, type) {
  var dataTime = "";
  var data = new Date();
  data.setTime(value);
  var year = data.getFullYear();
  var month = addZero(data.getMonth() + 1);
  var day = addZero(data.getDate());
  var hour = addZero(data.getHours());
  var minute = addZero(data.getMinutes());
  var second = addZero(data.getSeconds());
  type = type.toLowerCase();
  if(type == 'yyyy-mm-dd hh:mm:ss'){
    dataTime = year + '-' + month + '-' + day + " " + hour + ':' + minute + ':' + second;
  }else if(type == 'yyyy-mm-dd hh:mm'){
    dataTime = year + '-' + month + '-' + day + " " + hour + ':' + minute
  }else if(type == 'yyyy-mm-dd'){
    dataTime = year + '-' + month + '-' + day
  }else if(type == 'yyyy/mm/dd hh:mm:ss'){
    dataTime = year + '/' + month + '/' + day + " " + hour + ':' + minute + ':' + second;
  }else if(type == 'yyyy/mm/dd hh:mm'){
    dataTime = year + '/' + month + '/' + day + " " + hour + ':' + minute
  }else if(type == 'yyyy/mm/dd'){
    dataTime = year + '/' + month + '/' + day
  }else if(type == 'MM-dd HH:mm'){
    dataTime = month + '-' + day + " " + hour + ':' + minute;
  }else if(type == 'yyyy.mm.dd hh:mm:ss'){
    dataTime = year + '.' + month + '.' + day + " " + hour + ':' + minute + ':' + second;
  }

  return dataTime
});
















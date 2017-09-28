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

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.use(Vuex);
Vue.prototype.$api = api;
Vue.prototype.X = Y;
Vue.prototype.axios = axios
Vue.prototype.server = server;

Vue.config.productionTip = false;
Vue.component('tip', tip)
Vue.component('loading', loading)

router.beforeEach(function (to, from, next) {
  var backURL = from.path, key;
  if(from.path && to.meta.requireAuth){
    for(key in to.params){
      backURL = backURL.replace(":" + key, to.params[key]);
    }
    Y.log('-----路由拦截 URL:' + to.path + '-----');
    if(!server.AuthService.auth()){
      Y.log('-----用户未登录，跳转到登录-----');
      router.push({path: '/login'})
    }else{
      Y.log('-----用户已登录，放行-----');
      next()
    }
  }else{
    Y.log('-----路由放行 URL:' + to.path + '-----')
    next();
  }

});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

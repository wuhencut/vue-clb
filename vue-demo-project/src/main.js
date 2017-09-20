import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './utils/index'
import {Y} from './utils/yztz'
import server from './api/server'
import $ from 'jquery'
var axios = require('axios');
var VueTouch = require('vue-touch')

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
Vue.prototype.X = Y;
Vue.prototype.server = server;
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

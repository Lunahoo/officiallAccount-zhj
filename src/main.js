import Vue from 'vue'
import App from './App.vue'
 import {Carousel,CarouselItem} from 'element-ui'
 import 'element-ui/lib/theme-chalk/index.css'
 Vue.use(Carousel,CarouselItem);
//公共css
import './assets/css/public.css';
import './assets/css/index.css';
import './assets/css/login.css';
import './assets/css/animate.css'
//路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './router-config.js'
import './assets/js/public.js'
import './assets/css/animate.css'
import focus from './assets/js/public/directives'
/*Vue.prototype.focus = focus*/
import format from './assets/js/format.js';
import spaceOther from './assets/js/public/pubCode';
 import fourYsJy from './assets/js/public/fourYsJy';
const config = require('../config')
axios.defaults.baseURL = config.dev.env.API_ROOT;
import axios from 'axios';
import lrz from 'lrz'
import Mui from 'vue-awesome-mui';
//全局复制组件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);
Vue.use(require('vue-wechat-title'));
Vue.use(Mui);
/*高德地图*/
import AMap from 'vue-amap'
Vue.use(AMap);
import htmlToPdf from '@/assets/js/htmlToPdf'
Vue.use(htmlToPdf);
import VueDND from 'awe-dnd';
Vue.use(VueDND);
import wx from 'weixin-js-sdk';
Vue.use(wx);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '249f026d06815dfa478d5b632b77a8b7',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});

Vue.prototype.$http = axios;
Vue.prototype.$format = format;
Vue.prototype.$spaceOther = spaceOther;
Vue.prototype.$fourYsJy = fourYsJy;
// Vue.prototype.commerBL = pubVariable;
//路由对象
const router=new VueRouter({
  routes:routes,
  mode:'history', //路由路径
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      //console.log(savedPosition)
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
});

new Vue({
  el: '#app',
  data:{
    vNav:true,
    vApp:true,
    vBroad:true,
    vFoot:true,
    vBack:true,
    vgiveUPlogin:false,
    bindingWeixin:false,
    isOpenSale:false,
    article:'',
    redirect_uri:"http%3a%2f%2fzhihuijia.imwork.net%2fwx%2frest%2fwx%2fv1%2fgetToken",
    queryvoucherData:[],
    jsondata:[],
    sumAmount:"",
    canTransferAmount:"",
    noTransferAmount:""
  },

  render: h => h(App),
  router,
});

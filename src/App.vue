<template>
  <div id="app" class="local_scroll">
    <div v-wechat-title="$route.meta.title"></div>
    <bxFootbar v-show="$root.$data.inVoice"></bxFootbar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import goback from './components/userinfo/loginreg/goback.vue'
/*  import giveUPlogin from './components/userinfo/loginreg/giveUPlogin.vue'*/
  import {findWxUserInfo} from './api/weixin/weixinApi'//查询微信用户详情信息接口
  import {queryWeChatBind} from './api/user/headService'
  import {queryCouponBalanceSum} from '@/api/aloneC/cInterface'
  import {findVueTokenVo} from '@/api/weixin/weixinApi'//微信前端验签接口
  import yzmMask from './components/userinfo/loginreg/yzmMask.vue'
  import bxFootbar from './components/account/bxFootbar.vue'
  import Vue from 'vue'
  import axios from 'axios';
  import calendar from 'vue2-datepick';
  import $ from 'jquery'
  import wx from 'weixin-js-sdk';
  Vue.use(calendar);
  export default {
    name: 'app',
    data () {
      return {
        msg: '',
      }
    },
    components: {
      goback, yzmMask, bxFootbar
    },
    methods: {
      menu() {
        window.scrollTo(0, 0);
      },
    },
    created(){
      this.menu();
    },
    mounted(){

    },
  }
  Vue.prototype.getOpenId = function(url){
    if(url.indexOf("&")>0){                                      /*判断是否是一个参数还是多个参数*/
      let urlParamArry=url.split("&");                            /*分开每个参数，并放到数组里*/
      for(var i=0; i<urlParamArry.length; i++){
        let paramerName = urlParamArry[i].split("=");   /*把每个参数名和值分开，并放到数组里*/
        if(paramerName[0].indexOf('openid')>0){                     /*匹配输入的参数和数组循环出来的参数是否一样*/
          return paramerName[1];                           /*返回想要的参数值*/
        }
      }
    }else{                                                              /*判断只有个参数*/
      return url.substr(url.indexOf('openid') + 7, url.length);
    }
  },
    //微信免登录
  Vue.prototype.byOpenIdgetInfo = function (openId,page,code,parter){
    localStorage.setItem('openId',openId);
    queryWeChatBind(openId).then(res =>{
      if(res.data.code == 200){
        this.$root.$data.bindingWeixin=true;
        if(res.data.data!="" && res.data.data!=null && res.data.data!="null" && res.data.data!=undefined){
            localStorage.setItem('userID',res.data.data.id);
            localStorage.setItem("loginTell",res.data.data.mobile);
            localStorage.setItem("companyId",res.data.data.companyId);
            localStorage.setItem("companyName",res.data.data.companyName);
            localStorage.setItem("identificationNumber",res.data.data.identificationNumber);
            if(res.data.data.nickName!="" && res.data.data.nickName!=null && res.data.data.nickName!=undefined && res.data.data.headUrl!="" && res.data.data.headUrl!=null && res.data.data.headUrl!=undefined){
              localStorage.setItem('nickName',res.data.data.nickName);
              localStorage.setItem('head_url',res.data.data.headUrl);
            }else{
              findWxUserInfo(openId).then(res =>{
                if(res.data.code == 0){
                  let data = res.data.data;
                  if(data.nickName!="" && data.nickName!=null && data.nickName!=undefined){
                    localStorage.setItem('wxnickName',data.nickName);
                    localStorage.setItem('headimgurl',data.headimgurl);
                  }
                }else{
                  if(page!="user" && page!="home" && page!="inviteIndex"){
                    if(localStorage.getItem('userID')==null || localStorage.getItem('userID') == undefined || localStorage.getItem('userID') =='undefined' || localStorage.getItem('userID') == 'null' || localStorage.getItem('userID') == ''){
                      localStorage.setItem("loginToPage",page);
                      this.$router.push({name: 'login',params:{openId:openId}});
                    }
                  }
                }
              },res =>{
                if(page!="user" && page!="home" && page!="inviteIndex"){
                  if(localStorage.getItem('userID')==null || localStorage.getItem('userID') == undefined || localStorage.getItem('userID') =='undefined' || localStorage.getItem('userID') == 'null' || localStorage.getItem('userID') == ''){
                    localStorage.setItem("loginToPage",page);
                    this.$router.push({name: 'login',params:{openId:openId}});
                  }
                }
              })
            }
           if(page=="shop"){
              this.shopInit(res.data.data.id);
            }else if(page=="user"){
              this.userInit(res.data.data.id);
            }else if(page=="home"){
              this.homeInit(res.data.data.id);
            }else if(page=="allLication"){
              this.allLocationInit(res.data.data.id);
            }else if(page=="addministration"){
              this.AdministrationInit(res.data.data.id);
            }else if(page=="fill"){
              this.fillgetList(res.data.data.id);
            }else if(page=="simpleReim"){
              this.simpleReimInit(res.data.data.id);
            }else if(page=="inviteIndex"){
             this.inviteInit(res.data.data.id);
           }
          }else{
            findWxUserInfo(openId).then(res =>{
              if(res.data.code == 0){
                let data = res.data.data;
                if(data.nickName!="" && data.nickName!=null && data.nickName!=undefined){
                  localStorage.setItem('wxnickName',data.nickName);
                  localStorage.setItem('headimgurl',data.headimgurl);
                }
                if(page!="user" && page!="home" && page!="inviteIndex"){
                  if(localStorage.getItem('userID')==null || localStorage.getItem('userID') == undefined || localStorage.getItem('userID') =='undefined' || localStorage.getItem('userID') == 'null' || localStorage.getItem('userID') == ''){
                    localStorage.setItem("loginToPage",page);
                    this.$router.push({name: 'login',params:{openId:openId}});
                  }
                }
              }else{
                if(page!="user" && page!="home" && page!="inviteIndex"){
                  if(localStorage.getItem('userID')==null || localStorage.getItem('userID') == undefined || localStorage.getItem('userID') =='undefined' || localStorage.getItem('userID') == 'null' || localStorage.getItem('userID') == ''){
                    localStorage.setItem("loginToPage",page);
                    this.$router.push({name: 'login',params:{openId:openId}});
                  }
                }
              }
            },res =>{
              if(page!="user" && page!="home" && page!="inviteIndex"){
                if(localStorage.getItem('userID')==null || localStorage.getItem('userID') == undefined || localStorage.getItem('userID') =='undefined' || localStorage.getItem('userID') == 'null' || localStorage.getItem('userID') == ''){
                  localStorage.setItem("loginToPage",page);
                  this.$router.push({name: 'login',params:{openId:openId}});
                }
              }
            })
          }
      }else{  /*5412 未绑定*/
        this.$root.$data.bindingWeixin=false;
        if(localStorage.getItem("userID")==null || localStorage.getItem("userID")==undefined || localStorage.getItem("userID")=='undefined' || localStorage.getItem("userID")=="" || localStorage.getItem("userID")=='null'){
         // 調用手動授權
         findWxUserInfo(openId).then(res =>{
           if(res.data.code == 0){
             let data = res.data.data;
             if(data == null || data == ''){
               if(parter!=null && parter!=undefined && parter!='undefined'){
                 this.$router.push({name: 'authorization',params:{code:code,page:page,parter:parter}});
               }else{
                 this.$router.push({name: 'authorization',params:{code:code,page:page}});
               }
             }else{
               if(page=="user"){
                 if(data.nickName!="" && data.nickName!=null && data.nickName!=undefined){
                   localStorage.setItem('wxnickName',data.nickName);
                   localStorage.setItem('headimgurl',data.headimgurl);
                   this.getQueryMemberCenter();
                 }else{
                     this.unFindMemberCenter()
                 }
               }else if(page!="user" && page!="home" && page!="inviteIndex"){
                 localStorage.setItem("loginToPage",page);
                 this.$router.push({name: 'login',params:{openId:openId}});
               }
             }
           }else{
             if(page!="user" && page!="home" && page!="inviteIndex"){
                 localStorage.setItem("loginToPage",page);
                 this.$router.push({name: 'login',params:{openId:openId}});
             }
             if(page=="user"){
               this.unFindMemberCenter()
             }
           }
         },res =>{
           if(page!="user" && page!="home" && page!="inviteIndex"){
               localStorage.setItem("loginToPage",page);
               this.$router.push({name: 'login',params:{openId:openId}});
           }
           if(page=="user"){
             this.unFindMemberCenter()
           }
         })
       }else{
          if(page=="shop"){
            this.shopInit(localStorage.getItem("userID"));
          }else if(page=="user"){
            this.userInit(localStorage.getItem("userID"));
          }else if(page=="home"){
            this.homeInit(localStorage.getItem("userID"));
          }else if(page=="allLication"){
            this.allLocationInit(localStorage.getItem("userID"));
          }else if(page=="addministration"){
            this.AdministrationInit(localStorage.getItem("userID"));
          }else if(page=="fill"){
            this.fillgetList(localStorage.getItem("userID"));
          }else if(page=="simpleReim"){
            this.simpleReimInit(localStorage.getItem("userID"));
          }else if(page=="inviteIndex"){
            this.inviteInit(localStorage.getItem("userID"));
          }
        }
      }
    },res =>{
      this.$root.$data.bindingWeixin=false;
    })
  },
    //微信授权
  Vue.prototype.byWechAtgetOpenId = function (flag,code,redirect_uri,toPage,parter){
        if(parter!=null && parter!=undefined && parter!='undefined'){
          window.location.href = axios.defaults.baseURL+'/wx/rest/wx/v1/redirect?flag='+flag+'&page='+code+'&redirect_uri='+redirect_uri+'&parter='+parter;
        }else{
          window.location.href = axios.defaults.baseURL+'/wx/rest/wx/v1/redirect?flag='+flag+'&page='+code+'&redirect_uri='+redirect_uri;
        }
  },
    //获取用户消费券账户列表（企业 易得多 个人）(多个账户)
  Vue.prototype.getVoucherAttributeInfo = function(queryInfoData){
    queryCouponBalanceSum(localStorage.getItem("userID"),queryInfoData).then(res => {
      if(res.data.code == 200){
        this.$root.$data.queryvoucherData = res.data.data;
        console.info(this.$root.$data.queryvoucherData);
        localStorage.setItem('queryvoucherData',JSON.stringify(this.$root.$data.queryvoucherData));
        if(queryInfoData.balanceTypeList!=null && queryInfoData.balanceTypeList!="" && queryInfoData.balanceTypeList.length == 1){
            if(queryInfoData.balanceTypeList[0] == '1'){/*个人账户*/
              this.$router.push({name:'voucherPers'});
            }else if(queryInfoData.balanceTypeList[0] == '2'){/*企业账户*/
              this.$root.$data.sumAmount = this.$root.$data.queryvoucherData.company.sumAmount;
              this.$root.$data.canTransferAmount = this.$root.$data.queryvoucherData.company.canTransferAmount;
              this.$root.$data.noTransferAmount = this.$root.$data.queryvoucherData.company.nonTransferAmount;
              this.$router.push({name:'voucherEnterprise'});
            }else if(queryInfoData.balanceTypeList[0] == '3'){/*易得多账户*/
              this.$router.push({name:'voucherEasytoBuy'});
            }
        }else{
          if(this.$root.$data.queryvoucherData.memberType == 'PE'){   /*独立C*/
            if(this.$root.$data.queryvoucherData.company.sumAmount == 0 && this.$root.$data.queryvoucherData.yideduo.sumAmount == 0){
              this.$router.push({name:'voucherPers'});
            }else{
              if(this.$root.$data.queryvoucherData.company.sumAmount == 0){
                this.$router.push({name:'vouchers',params:{hideTitle:'company'}});
              }else if(this.$root.$data.queryvoucherData.yideduo.sumAmount == 0){
                this.$router.push({name:'vouchers',params:{hideTitle:'yideduo'}});
              }else{
                this.$router.push({name:'vouchers'});
              }
            }
          }else if(this.$root.$data.queryvoucherData.memberType == 'CP'){   /*企业员工*/
            if(this.$root.$data.queryvoucherData.yideduo.sumAmount == 0){
              this.$router.push({name:'vouchers',params:{hideTitle:'yideduo'}});
            }else{
              this.$router.push({name:'vouchers'});
            }
          }
        }
      }else{
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },res => {
      this.$message({
        message: res.data.msg,
        type: "warning"
      });
    })
  },
    //微信分享代码
    Vue.prototype.wxShare = function (title, desc, link,imgStr) {
      let urlImg = window.location.href.split('#')[0];
      if (urlImg.indexOf('from') > 0) {
        urlImg = encodeURIComponent(urlImg);
      }
      let data = {
        title: title,       // 分享标题
        desc: desc,   // 分享描述
        link: link,       // 分享链接 默认以当前链接
        imgUrl: imgStr,// 分享图标
        // 用户确认分享后执行的回调函数
        success: function () {
          next();//用户确认分享后执行的回调函数
        },
        cancel: function () {
          //用户取消分享后执行的回调函数
        }
      }
      findVueTokenVo(urlImg).then(res => {
        if (res.data.code == 0) {
          if (res.data.data.appId != undefined && res.data.data.appId != null && res.data.data.appId != "") {
            localStorage.setItem('appId', res.data.data.appId);
          }
          wx.config({
            debug: false,
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timstamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名，见附录1
            jsApiList: ['updateAppMessageShareData',
              'updateTimelineShareData',
              // 微信新版1.4.0暂不支持安卓，故这里要两个接口一起调用下
              'onMenuShareAppMessage',
              'onMenuShareTimeline',
              'onMenuShareQQ',
              'onMenuShareWeibo',] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(() => {
            wx.onMenuShareAppMessage(data);
            wx.updateAppMessageShareData(data);
            wx.updateTimelineShareData(data);
            wx.onMenuShareTimeline(data);
            wx.onMenuShareQQ(data);
            wx.onMenuShareWeibo(data);
          });
        }
      });
    },
    //判断是不是微信浏览器
  Vue.prototype.isWeixn =  function(){
    let ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
      return true;
    } else {
      return false;
    }
  }
</script>

<style>
  #app{
    /*position:relative;*/
  }
  body,html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .local_scroll{/*//局部滚动*/
    position:absolute;
    overflow:scroll;
    -webkit-overflow-scrolling: touch;
    top:0;
    left:0;
    bottom:0;
    right:0
  }
  ::-webkit-scrollbar{/*//scroll滚动条设置*/
    width: 0px;
    height: 0px;
    background-color: #fff;
  }
</style>

<template>
  <div class="home bg-f6" ref="home">
    <div style="overflow-y: scroll;height: 90%;">
    <div id="homeheader">
      <navbar></navbar>
    </div>
    <div id="homepage">
      <applica></applica>
      <broadcast></broadcast>
      <div v-show="!ShowIndexMallUrl" class="home_Link" @click="perfectAccount">
        <img class="home_Link_img" src="../../../assets/image/home/img_fxhh.png"/>
        <img class="home_Link_img" src="../../../assets/image/home/img_mrsx.png"/>
        <img class="home_Link_img" src="../../../assets/image/home/img_phb.png"/>
        <img class="home_Link_img" src="../../../assets/image/home/img_sqjx.png"/>
      </div>
        <iframe style="position:relative;" v-show="ShowIndexMallUrl" class="ifram_home" scrolling="no" frameborder="0" :src="getIndexMallUrl" id="sub_frame"></iframe>
     <!-- <div align="center" style="margin:0 auto;">
        <div style="width:100%;height:auto;overflow:hidden;border:0px">
         <div style="width:100%;height:auto;border:0px">
           <iframe :src="getIndexMallUrl" width="100%" height="auto" scrolling="no">
           </iframe>
         </div>
      </div>
    </div>-->
      <recommend></recommend>
    </div>
    </div>
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
    <section class="zz" v-show="showDia">
      <div class="wrapcenter">
        <div class="wrapcenter_tips bg-ff">
          <div class="section_top cont font-12" style="line-height: 4.1rem;">需要完善并验证手机号</div>
          <div class="section_bottom">
            <div class="qx_set" @click="abolish">取消</div>
            <div class="qx_right qx_set" @click="toGetToken">去完善</div>
          </div>
        </div>
      </div>
    </section>
    <div id="homefooter" class="width btm-0 pst-abs">
      <footbar></footbar>
    </div>
  </div>
</template>
<script>
  function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };
/*  import $ from 'jquery';*/
  import Swiper from 'swiper';
  import navbar from '../nav/navbar.vue'
  import applica from '../content/applica.vue';
  import broadcast from '../content/broadcast.vue';
  import recommend from '../content/recommend.vue';
  import footbar from '../../footbar.vue';
  import {queryWeChatBind} from '@/api/user/headService'
  import {getJiaFuUrl} from '@/api/user/headService'
  export default {
    data() {
      return {
        getIndexMallUrl:"",
        error_prompt:"",
        content:"",
        ShowIndexMallUrl:false,
        showDia:false,
        companyId:"",
      }
    },
    methods:{
      homeInit(accessToken){
        this.ShowIndexMallUrl = false;
        if (accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined') {
          let serviceId = "h5.scene.ds.shelf.zhihuijia";
          let returlUrl = window.location.href;
          if(localStorage.getItem("companyId")!=undefined &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
            this.companyId = localStorage.getItem("companyId");
          }else{
            this.companyId = "";
          }
          getJiaFuUrl(accessToken,serviceId,this.companyId,returlUrl).then(res => {
            if (res.data.code == 200) {
              this.getIndexMallUrl = res.data.data;
              this.ShowIndexMallUrl = true;
            }else{
              this.ShowIndexMallUrl = false;
            }
            //得到父页面的iframe框架的对象
            let obj = $("#sub_frame");
            //把当前页面内容的高度动态赋给iframe框架的高
            obj.height = document.documentElement.clientHeight;
          })
        }
      },
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      abolish(){
        this.showDia = false;
      },
      toGetToken(){
        this.showDia = false;
        localStorage.setItem("loginToPage",'home');
        this.$router.push({name:'login'});
      },
      perfectAccount(){
        let accessToken = localStorage.getItem("userID");
        if(accessToken==undefined || accessToken==null || accessToken==""){
          this.showDia = true;
        }else{
          this.error_prompt="tel-message";
          this.content = "账号信息错误,正在修复,请稍后再试";
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      this.$root.$data.vBack = false;
      let accessToken = localStorage.getItem("userID");
      let url = window.location.href;
      if(this.isWeixn()){
        if (url.indexOf('openid') > 0) {
          this.byOpenIdgetInfo(this.getOpenId(url),'home');
        }else {
          if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
            this.byOpenIdgetInfo(localStorage.getItem('openId'),'home');
          }else{
            //静默授权
            this.byWechAtgetOpenId('one',"",this.$root.$data.redirect_uri,'home')
          }
        }
      }else{
        if (accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined') {
            this.homeInit(accessToken);
        }else{
          localStorage.setItem("loginToPage", 'home');
          this.$router.push({name: 'login'});
        }
      }
    },
      components:{
        navbar, applica, broadcast, recommend, footbar
      }
  }
</script>

<style>
  body{
    overflow:scroll;
    overflow-y:visible;
  }
  .home{
    height: 100%;
    position: relative;
  }
  .ifram_home{
    width:98%;
    height:70%;
    padding-left:1%;
  }
  #homeheader{
    /*height: 15%;
    padding-bottom: 1rem;*/
  }
  #homepage .home_Link .home_Link_img{
    width: 46%;
    float: left;
    margin-left: 2.5%;
    margin-top: 1rem;
  }
  #homepage{
    width: 100%;
    margin: 0 auto;
    height: 80%;
  }
  #homefooter{
   /* height: 9%;*/
    background: #fafafa;
    clear: both;
  }
  .tel-mess .tel-message {
    width: 65%;
  }
  .trans {
    width: 65%;
  }
  @media screen and (max-width:321px){
    .ifram_home{
     /* height:772%*/
    }
  }
  @media screen and (max-width:414px)and (max-width: 736px){
    .ifram_home{
      /*height:606%*/
    }
  }
  @media screen and (max-width: 812px){
    .ifram_home{
      /*height:669%*/
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    #homeheader {
      height: 16%;
    }
    #homefooter{
      /*height: 10%;*/
    }
    .ifram_home{
      /*height:436%*/
    }
  }
  /*ipad Pro下面的样式*/
  @media screen and (min-width:1024px)and (max-width: 1366px){
    #homeheader {
      height: 16%;
    }
    #homefooter{
      /*height: 10%;*/
    }
    .ifram_home{
      /*height:327%*/
    }
  }
</style>


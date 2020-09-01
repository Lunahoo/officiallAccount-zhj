<template>
  <div class="footbar height">
    <ul class="height font-1">
   <!-- <router-link  :to="item.path" :key="index"  tag="li">-->
      <a href="javascript:;"  v-for="(item,index) in imgData" :key="index">
      <div @click="changeState(item,item.path)" >
        <div v-if="jfInterface">
          <div class="bt-icon">
            <img v-if="item.active" :src="item.tab_img_active">
            <img v-else :src="item.src">
            <!--<img src="../assets/img/home.png">-->
          </div>
          <div v-if="item.active" class="bt-font-active">{{item.name}}</div>
          <div v-else class="bt-font">{{item.name}}</div>
        </div>
      </div>
      </a>
   <!-- </router-link>-->
  </ul>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess" v-show="errorMes">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  /*import Vue from 'vue'
   import App from '../App.vue'*/
  import navbar from './index/nav/navbar.vue'
  import {getJiaFuUrl} from '@/api/user/headService'
 /* import footbar from  './footbar.vue
 '*/
  export default {
    data () {
      let url = this.$route;
      let actHome = false;
      let actShop = false;
      let actFound = false;
      let actOrder = false;
      let actUser = false;
      if(url.path.indexOf("home")>0){
        actHome = true;
      }else if(url.path.indexOf("shop")>0){
        actShop = true;
      }else if(url.path.indexOf("found")>0){
        actFound = true;
      }else if(url.path.indexOf("couponMarket")>0){
        actOrder = true;
      }else{
        actUser = true;
      }
      return {
        error_prompt:"",
        content:"",
        jfInterface:true,
        errorMes:false,
        footToken:"",
        service:"",
        imgData:[
          {
            path:'/home',
            name:"首页",
            src:require('../assets/img/home.png'),
            tab_img_active:require('../assets/img/home-check.png'),
            active:actHome
          },
          {
            path:'/shop',
            name:"购物",
            src:require('../assets/img/shoping.png'),
            tab_img_active:require('../assets/img/shoping-check.png'),
            active:actShop
          },
         /* {//先去掉
            path:'/found',
            name:"发现",
            src:require('../assets/img/found.png'),
            tab_img_active:require('../assets/img/found-check.png'),
            active:actFound
          },*/
          {//先去掉
            path:'/couponMarket',
            name:"券市场",
            src:require('../assets/img/icon_Securitiesmarket_noselected.png'),
            tab_img_active:require('../assets/img/icon_Securitiesmarket_selected.png'),
            active:actOrder
          },
          {
            path:'/user',
            name:"我的",
            src:require('../assets/img/my.png'),
            tab_img_active:require('../assets/img/my-check.png'),
            active:actUser
          }
        ]
      }
    },
    methods:{
      timer:function(){
        if(this.error_prompt=="footbar_error1"){
         this.error_prompt="footbar_error0";
         }
       },
      changeState(item,url){
          let toK = localStorage.getItem("userID");
        if (toK!=null && toK != '' && toK!= undefined && toK!= 'undefined') {
          let arr = this.imgData;
          if (item.name == "购物") {
            for (let i = 0; i < arr.length; i++) {
              if (i != 1) {
                arr[i].active = false;
              } else {
                arr[i].active = true;
              }
            }
            //因为带底部栏会跟着刷新，所以又写了一个新的为跳转到京东的样式；
            this.footToken = localStorage.getItem("userID");
            this.service = "h5.scene.ds.master";
            let returlUrl = window.location.href;
            getJiaFuUrl(this.footToken, this.service,localStorage.getItem('companyId'),returlUrl).then(res => {
              if (res.data.code == 200) {
                window.location.href = res.data.data;
              }else{
                this.errorMes = true;
                this.error_prompt="footbar_error1";
                this.content = res.data.msg;
              }
            }, res => {
              this.errorMes = true;
              this.error_prompt="footbar_error1";
              this.content = res.data.msg;
            })

          } else {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].path != item.path) {
                arr[i].active = false;
              } else {
                item.active = true;
                if (url == "/user") {
                  if (localStorage.getItem('userID') != undefined && localStorage.getItem('userID') != "" && localStorage.getItem('userID') != null) {
                    this.$router.push({path: url});
                  } else {
                     if(localStorage.getItem('loginTell')!=undefined && localStorage.getItem('loginTell')!=null && localStorage.getItem('loginTell')!=""){
                        this.$router.push({name:'password'});
                      }else{
                        /*localStorage.setItem("loginToPage",'user');*/
                        this.$router.push({name:'login'});
                      }
                  }
                }else{
                this.$router.push({path:url});
              }
            }
          }

        }

      }else{
            if(item.name == "购物"){
              //localStorage.setItem("loginToPage",'shop');
              this.$router.push({name:'login'});
            }/*else if(item.name == "我的"){
              localStorage.setItem("loginToPage",'user');
            }*/
          else{
              this.$router.push({path:url});
            }
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    components:{
      navbar/*,footbar*/
    },

  }
</script>
<style>
  .footbar a{
    color: #2E2A2A;
  }
  .footbar .bt-icon img{
    width:3rem;
  }
  .footbar ul{
    display:flex;
    justify-content:space-around;
  }
  .footbar ul li:first-child{
    padding-left: 1rem;
  }
  .footbar ul li:last-child{
    padding-right: 1rem;
  }
  .footbar ul li{
    padding-left: 1.8rem;
    float: left;
  }
  .footbar .bt-font{
    /*padding-left: .3rem;*/
    text-align: center;
    margin-bottom: .5rem;
  }
  .footbar .bt-font-active{
    color: #FA8C16;
    /*padding-left: .3rem;*/
    text-align: center;
    margin-bottom: .5rem;
  }
  .footbar_error1{
    width: 60%;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 0.4rem;
    text-align: center;
    position: absolute;
    top: -28.5rem;
    left: 20%;
    opacity: .7;
  }
  .footbar_error0{
    width: 60%;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 0.4rem;
    text-align: center;
    position: absolute;
    top: -28.5rem;
    left: 20%;
    opacity: 0;
  }
</style>

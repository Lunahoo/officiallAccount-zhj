<template>
    <div class="applica">
      <div class="bd-btm bd-btmf6 applica-bottom">
      <div class="applications">
        <div class="application fl" @click="UseMeiTuan(item.service)" v-for="(item,index) in homeData.menuList">
            <div class="app-icon"><img :src="item.url"></div>
            <div class="size">{{item.name}}</div>
        </div>
        <div class="application fl" @click="AllApp"><div class="app-icon all-app-icon " style="padding-top: 0;"><img src="../../../assets/img/allApp/icon_AllAPP.png"></div><div class="size">全部应用</div></div>
      </div>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="user_format">{{content}}</section>
        </div>
      </div>
  </div>
</template>
<script>
  import {newsToken} from '@/api/user/news';
  import {getJiaFuUrl} from '@/api/user/headService';
  import {queryMenu} from "@/api/user/loginReg";
  export default {
    name: 'applica',
    data () {
      return {
        toke:'',
        mld:'',
        service:"",       //业务场景服务
        homeData:[],
        applicaFlag:false,
        tabs:{

        },
        queryM:{
          className:"",
          type:1,
          grouped:1,
        },
        error_prompt:"",
        content:"",
        tabss:0,
        companyId:"",
      }
    },
    components: {
      /*pwd*/
    },
    created(){
      if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null" && localStorage.getItem('companyId')!="999999"){
        this.companyId =localStorage.getItem("companyId");
      }else{
        this.companyId = "";
      }
      this.init();
    },

    methods: {
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      AllApp(){
          if(this.toke!=null && this.toke != '' && this.toke!= undefined && this.toke!= 'undefined'){
            this.$router.push({name:'allLication'});
          }else{
            this.$router.push({name:'login'});
          }
      },
      //判断是否登录，如果没有登录就引导用户登录
      chenkLogin(){
        if(this.toke!=null && this.toke != '' && this.toke!= undefined && this.toke!= 'undefined'){
          this.applicaFlag = true;
        }else{
          this.$router.push({name:'login'});
        }
      },
      toNewsC(){
        this.chenkLogin();
        if(this.applicaFlag == true){
          this.$router.push({name:'newsC'});
        }
      },
      showClicked(){
        this.showPwd = true;
      },
      //applica用餐
      UseMeiTuan(H5Service){
          this.chenkLogin();
          if(this.applicaFlag == true){
            if(H5Service != "" && H5Service != null && H5Service != undefined){
              this.service = H5Service;   //美团
              let returlUrl = window.location.href;
              getJiaFuUrl(this.toke,this.service,this.companyId,returlUrl).then(res =>{
                if(res.data.code == 200){
                  window.location.href = res.data.data;
                }else{
                  this.error_prompt="tel-message";
                  this.content = res.data.msg;
                }
              },res =>{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              })
            }
          }
      },
      addETMask1(){
        this.addETMask=true;
      },
      init(){
        this.toke = localStorage.getItem("userID");
        this.mld = localStorage.getItem("userID");
        newsToken(this.toke,this.mld).then(res => {
          if(res.data.code == 200) { //成功
            this.tabs=res.data.data.messageList;
            this.tabss=res.data.data.messageList.length;
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res => {
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        });
        //查询菜单列表
        if(this.toke!=undefined && this.toke!=null && this.toke!=""){
          queryMenu(this.queryM,this.toke,this.companyId).then(res =>{
            if(res.data.code == 200){
              this.homeData = res.data.data;
              if(localStorage.getItem('companyId')==null || localStorage.getItem('companyId')==undefined || localStorage.getItem('companyId')=="" || localStorage.getItem('companyId')=="null" || localStorage.getItem('companyId')=="999999"){
                if(res.data.data.companyId!=undefined && res.data.data.companyId!=null && res.data.data.companyId!=""){
                  localStorage.setItem("companyId",res.data.data.companyId);
                  localStorage.setItem("companyName",res.data.data.companyName);
                  localStorage.setItem("identificationNumber",res.data.data.identificationNumber);
                  this.companyId = res.data.data.companyId;
                }
              }
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          })
        }else{
          queryMenu(this.queryM,"","").then(res =>{
            if(res.data.code == 200){
              this.homeData = res.data.data;
              if(localStorage.getItem('companyId')==null || localStorage.getItem('companyId')==undefined || localStorage.getItem('companyId')=="" || localStorage.getItem('companyId')=="null"){
                if(res.data.data.companyId!=undefined && res.data.data.companyId!=null && res.data.data.companyId!=""){
                  localStorage.setItem("companyId",res.data.data.companyId);
                  localStorage.setItem("companyName",res.data.data.companyName);
                  localStorage.setItem("identificationNumber",res.data.data.identificationNumber);
                  this.companyId = res.data.data.companyId;
                }
              }
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          })
        }


      }
    },
    //页面加载后执行
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
  }
</script>
<style>
  .applications{display:flex;justify-content:space-around;}
  .applica{
    float: left;
    background: #fff;
    /*padding-bottom: 1rem;*/
  }
  .applica .applications{
    /*margin:0 1rem;*/
    flex-wrap:wrap;
  }
  .applica .applications .application{
    /*width: 11rem;*/
    width: 25%;
  }
  .applica .applications .application .app-icon{
    margin: 1.16666667rem 0px 0px 0;
    height: 4rem;
    width: 4rem;
    padding-left: 1.89rem;
  }
  .applica .applications .application .all-app-icon{
    width: 4rem;
    height: 4rem;
  }
  .applica .applications .application .size{
    text-align: center;
    font-size: 1rem;
  }
  .applica .applica-news{
    margin: 0 1.08333rem;
    padding-top: 1rem;
  }
  .applica-news .applica-news-font-img .applica-news-font-icon{
    width: 2.91666667rem;
    padding-right: 2.8rem;
    padding-top: 0.25rem;
  }
  .applica-news .applica-news-image .applica-news-i-s{
    width: 1.33333333rem;
    height: 1.33333333rem;
    background: #F5222D;
    border-radius: 1rem;
    margin: 0.25rem 1.083333rem 0 0;
    position: relative;
  }
  .applica-news .applica-news-image .applica-news-i-s span{
    padding-left: 0.45rem;
    position: absolute;
    bottom:0;
  }
  .applica-news .applica-news-image{
    padding-top: 0.5rem;
  }
  .applica-news .applica-news-image .applica-news-i-con{
    width: 0.5833333rem;
    padding-top: 0.5rem;
  }
  .applica .applica-bottom{
    padding-bottom: 1.25rem;
    /*margin-top: 8rem;*/
  }
  @media screen and (max-width:321px){
    .applica .applications .application .all-app-icon{
      padding-left: 1.4rem;
    }
    .applica .applications .application .app-icon{
      padding-left: 1.4rem;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){

  }
</style>

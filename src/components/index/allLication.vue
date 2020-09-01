<template>
    <div class="allLication width height-942"  >
      <!--便民生活对应的页面-->
      <div class="allL-main fl width bg-ff" v-for="(item,index) in ConvenientData.classNameList">
        <div class="allL-yXbx-font">{{item}}</div><!--v-if="item!='便民生活'"-->
        <div class="allL-main-app">
          <div class="allL-main-img fl cont" v-for="(item1,index) in ConvenientData.menuList" @click="UseMeiTuan(item1.service)" v-if="item1.className == item"><!--每一个图标-->
              <img class="allL-main-icon" :src="item1.url" />
              <p>{{item1.name}}</p>
          </div>
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
  import {queryMenu} from "@/api/user/loginReg";
  import {getJiaFuUrl} from '@/api/user/headService'
  export default {
    name: 'Administration',
    data() {
      return {
        Invalid:false,
        error_prompt:"",
        content:"",
        toke:"",
        toMeiTuan:"",
        toDiDi:"",
        toLivingpayment:"",
        toTrainticket:'',
        toJBT:"",    //嘉白条
        toGasoline:"",    // 加油卡
        queryM:{
          className:"",
          type:1,
          grouped:"",
        },
        ConvenientData:[],           //便民生活
        travelData:[],                 //交通出行
       // FinanceData:[]                //金融服务
        companyId:"",
      }
    },
    directives: {
      focus: {
        inserted: function () {
          document.getElementsByClassName("bt-font1")[0].style.cssText=" border-bottom: 1px solid #1890FF";
        }
      }
    },
    methods:{
      allLocationInit:function (accessToken) {
        if(accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined'){
          queryMenu(this.queryM,accessToken,this.companyId).then(res =>{
            if(res.data.code == 200){
              this.ConvenientData = res.data.data;
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
          },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }
      },
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      //用餐
      UseMeiTuan(allLiService){
          if(allLiService != "" && allLiService != null && allLiService != undefined){
            this.service = allLiService;   //美团
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

      },
      //火车，订火车票
      UseTrainticket(ser){
        if(ser != "" && ser != null && ser != undefined){
          this.service = ser;   //美团
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
      },
      //用车
      UseDiDi(){
        //  alert("aa");
        this.service = "h5.scene.didi";
        let returlUrl = window.location.href;
        getJiaFuUrl(this.toke,this.service,this.companyId,returlUrl).then(res =>{
         /* console.log(res.data);*/
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
      },
      //嘉白条
      UseJBT(se){
        if(se != "" && se != null && se != undefined){
          this.service = se;   //美团
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
      },
      stays:function (index) {
        /*this.dSp=true;
        this.yXbx=false;
        this.wXbx=false;*/
        let arrs = document.getElementsByName('farst');
        for(let i=0;i<arrs.length;i++){
          arrs[i].style.cssText=" border-bottom: 2px solid #fff;color:#7E7A7A";
        }
        document.getElementById(index).style.cssText=" border-bottom: 2px solid #1890FF;font-weight: bold";
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null" && localStorage.getItem("companyId")!="999999"){
        this.companyId = localStorage.getItem("companyId");
      }else{
        this.companyId = "";
      }
      this.toke = localStorage.getItem("userID");
      this.$root.$data.vBack=true;
      this.$root.$data.article = '全部应用';
      let url = window.location.href;
      if(this.isWeixn()){
        if (url.indexOf('openid') > 0) {
          this.byOpenIdgetInfo(this.getOpenId(url),'allLication','50005');
        }else {
          if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
            this.byOpenIdgetInfo(localStorage.getItem('openId'),'allLication','50005');
          }else{
            //静默授权
            this.byWechAtgetOpenId('one','50005',this.$root.$data.redirect_uri,'allLication')
          }
        }
      }else{
        if(this.toke != undefined && this.toke != null && this.toke != "" && this.toke!='null' && this.toke!='undefined'){
          this.allLocationInit(this.toke);
        }else{
          localStorage.setItem("loginToPage",'allLication');
          this.$router.push({name:'login'});
        }
      }
    },
  }
</script>
<style>
  .allLication{
    padding-top: 3rem;
  }
  .allLication .allL-title{
    line-height: 3.6666667rem;
    font-size: 1.3333333rem;
    margin-bottom: 3.6rem;
  }
  .allL-list{
    width:33.3333333%;
  }
  .allL-title-farst .allL-margin{
  }
  .allL-title-farst .allL-margin-first{
    /*font-weight: bold*/
  }
  .allL-main,.allL-yXbx,.allL-wXbx{
    padding: 0.3rem 0 1.6666667rem;
    /*margin-top: 0.4rem;*/
  }
  .allL-main .allL-main-app{
    margin: 0 0.791666667rem;
    font-size: 1rem;
  }
  .allL-main-app .allL-main-img,.allL-yXbx-app .allL-yXbx-img{
    width: 25%;
    padding: 1.3333333rem 0 0;
    font-size: 1rem;
  }
  .allL-main-app .allL-main-img .allL-main-icon{
    width: 2.666667rem;
    padding-left: 32%;
  }
  /*第二页*/

  .allL-yXbx-app{
    margin: 0 0.70833333rem;
  }
  .allL-yXbx-app .allL-yXbx-img{
    width: 25%;
  }
  .allL-yXbx-app .allL-yXbx-img .allL-yXbx-icon{
    width: 3rem;
    padding-left: 28%;
  }
  .allL-yXbx-app .allL-yXbx-img .allL-yXbx-icon1{
    width: 2.666667rem;
    padding-left: 32%;
  }
  .allL-yXbx-font{
    padding: 0 1.083333rem;
    line-height: 3.66666667rem;
    font-size: 1.3333333rem;
  }
  @media screen and (max-width:321px){
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .allLication{
      height:96.4%;
      padding-top: 5.083333rem;
    }
    .allL-main .allL-main-app{
      margin: 0 0.791666667rem;
      font-size: 1.8rem;
    }
    .allL-main-app .allL-main-img,.allL-yXbx-app{
      font-size:1.8rem;
    }
    .allL-main-app .allL-main-img,.allL-yXbx-app .allL-yXbx-img{
      font-size:1.8rem;
    }
    .allLication .allL-title{
      line-height: 5.6666667rem;
      font-size: 2rem;
    }
    .allL-yXbx-font {
       padding: 0 1.083333rem;
       line-height: 4.666667rem;
       font-size: 2rem;
     }
  }
</style>

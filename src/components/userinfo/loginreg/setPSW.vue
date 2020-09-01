<!--suppress ALL -->
<template>
  <div class="setPSW width fl" @click="CSbgLogin">
    <!--<div class="captcha cont height-316">
      <img class="captcha_img fl goCaptcha_img" @click="setPGoBack" src="../../../assets/img/left.png">&lt;!&ndash;&ndash;&gt;
    </div>-->
    <div class="text-center bd-bt">
      <div class="set_loginPSW">{{title}}</div>
      <div class="psw_rule">
        <!--<div v-if="seen" class="acc">请使用8-20位大、小字母和数字的组合</div>-->
        <div class="acc" id="acc" ref="accShowHide">{{content}}</div><!--v-else="!seen"-->
      </div>
      <div class="aaa bd-btm">
        <label class="login-label">密码</label>
        <div v-show="newPswOp" class="aaanewPswOp">
          <input ref="showPwd1" v-show="downIcon" class="setPSWipt" v-focus type="password" maxlength="20" placeholder="请输入新密码" v-model="oldPwd" clearable></input>
          <input ref="showPwd2" v-show="!downIcon" class="setPSWipt" v-focus type="text" placeholder="请输入新密码" maxlength="20" v-model="oldPwd" clearable></input>
        </div>
        <div v-show="!newPswOp" style="width: 75%;margin-left: 15%;margin-top: -2rem;">
          <input ref="showPwd1" v-show="downIcon" class="setPSWipt" v-focus type="password" maxlength="20" placeholder="请输入登录密码" v-model="oldPwd" clearable></input>
          <input ref="showPwd2" v-show="!downIcon" class="setPSWipt" v-focus type="text" placeholder="请输入登录密码" maxlength="20" v-model="oldPwd" clearable></input>
        </div>
      </div>
      <div style="position: relative;">
      <div class="psweyes" @click="switc">
        <img class="closea" v-show="downIcon" src="../../../assets/img/closeEyes.png"/>
        <img class="opena" v-show="!downIcon" src="../../../assets/img/openEyes.png"/>
      </div>
      <div class="srtdelete" @click="srtdelete" v-show="oldPwd">
        <img src="../../../assets/img/clean.png"/>
      </div>
      </div>
    </div>
    <div class="set_next_t">
      <button class="btn_login" ref="loginBtn" @click="setNewPwd(oldPwd)">下一步</button>
    </div>
    <!--<div class="tel-mess" ref="telmess">
      <div class="juzhong">
      <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>-->
    <div class="read_agree">注册即表示同意</div>
    <div class="agreenment">《智慧嘉平台服务协议》</div>
    <section class="zz" v-show="isappear">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top" style="line-height: 4.1rem;">是否放弃注册</div>
          <div class="section_bottom">
            <div class="qx_set" @click="gu">放弃</div>
            <div class="qx_right qx_set" @click="continueLogin">继续注册</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  /*  function getStyle(obj, attr){
   if(obj.currentStyle){
   return obj.currentStyle[attr];
   }else{
   return getComputedStyle(obj, false)[attr];
   }
   };*/
  import {login,register,forgetLoginPasswordIdCard,resetLoginPasswordIdCard,forgetLoginPasswordSms,resetLoginPasswordSms} from '@/api/user/loginReg'
  export default{
    data(){
      return{
        dataPhone1:'',
        oldPwd:'',
        downIcon: true,
        error_prompt:"",
        content:"请使用8-20位大、小字母和数字的组合",
        seen:true,
        disab:true,
        sfzCode:"",       //接口需要身份证号码
        isappear:false,//放弃注册
        status:"",//状态值（判断是否是注册流程）
        title:"设置登录密码",
        newPswOp:true,//密码框描述输入新密码
        regData:{
          mobile:'',
          password:'',
          smsCode:'',
          deviceId:''/*013025009298520*/
        },
        loginData:{
          mobile:'',
          password:'',
          deviceId:'',
          loginType:"1"
        }
      }
    },
    methods:{
      /*点击空白处失焦*/
      CSbgLogin(){

      },
      //返回按钮
      setPGoBack(){
          //设置新密码返回按钮
        if(this.$route.params.status!=undefined){
            if(this.$route.params.status == 'reg'){
              this.isappear = true
            }else if(this.$route.params.status == 'findPsw'){
              this.$router.push({name:"password"});
            }else if(this.$route.params.status == 'resetPsw'){
              this.$router.push({name:"choiceReset"});
            }

        }else{
          if(localStorage.getItem('capStatus')!=undefined){
            if(localStorage.getItem('capStatus')=='reg'){
              this.isappear = true
            }else{
              this.$router.go(-1);
            }
          }else{
            this.$router.go(-1);
          }
        }
      },
      //放弃注册
      gu:function(){
        this.isappear = false;
        this.$router.push({name:"login"})
      },
      //继续注册
      continueLogin(){
        this.isappear = false;
      },
      switc(){
        this.downIcon=!this.downIcon;
        //this.$refs.telmess.style.display="none";
        /*this.seen=true;*/
        let arrs = document.getElementsByClassName('setPSWipt');
        setTimeout(function(){
          for(let i=0;i<arrs.length;i++){
            arrs[i].focus()
          }
        },500)
      },
      srtdelete:function () {
        this.content = "请使用8-20位大、小字母和数字的组合"
        this.oldPwd='',
        this.$refs.showPwd1.focus();
        this.$refs.showPwd2.focus();
        this.seen=true;
      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      backErrorfun(msg){
          if(document.getElementsByClassName('acc')[0]!=undefined){
            document.getElementsByClassName('acc')[0].innerHTML = msg;
            document.getElementsByClassName('acc')[0].style.color = 'red'
          }else{
            if(document.getElementById('acc')!=undefined){
              document.getElementById('acc').innerHTML = msg;
              document.getElementById('acc').style.color = 'red'
            }
          }
        this.oldPwd = '';
      },
      setNewPwd:function (oldValue) {
        if(this.$refs.loginBtn.style.opacity ==1){
         if(this.$format.PwdFormat(this.oldPwd)){
           this.regData.password = this.oldPwd
           //  console.log(this.$route.params.sj);
           if(this.$route.query.id != null || this.$route.params.id != null){
             localStorage.setItem('loginToPage','')
             this.sfzCode = localStorage.getItem("identityNo");
             //短信验证码 找回||重置 密码
             if(this.sfzCode == '' || this.sfzCode == null || this.sfzCode == undefined){
               if(this.$route.params.id == 'forgetP'){
                   if(this.regData.mobile!=undefined && this.regData.mobile!=null && this.regData.mobile!=""){
                     this.regData.mobile = this.regData.mobile.replace(/[" "]/g, "");
                   }else{
                     if(localStorage.getItem("loginTell")!=undefined && localStorage.getItem("loginTell")!=null && localStorage.getItem("loginTell")!=""){
                       this.regData.mobile = localStorage.getItem("loginTell").replace(/[" "]/g, "");
                     }
                   }
                 forgetLoginPasswordSms(this.regData.mobile,this.regData.smsCode,this.oldPwd).then(res => {
                   if(res.data.code == 200){ //成功
                     /* alert("密码设置成功")*/
                      this.loginData.mobile = this.regData.mobile;
                      this.loginData.password = this.oldPwd;
                      this.loginData.deviceId = "";/*this.regData.deviceId*/
                     login(this.loginData).then(res => {
                       if(res.data.code == 200){//成功
                         localStorage.setItem("userID",res.data.data.id);
                         localStorage.setItem("nickName",res.data.data.nickName);
                         localStorage.setItem("head_url",res.data.data.headUrl);
                         localStorage.setItem("companyId",res.data.data.companyId);
                         localStorage.setItem("companyName",res.data.data.companyName);
                         localStorage.setItem("identificationNumber",res.data.data.identificationNumber);
                         this.$router.push({name:'home'});
                       }else{
                         this.backErrorfun(res.data.msg);
                         return false
                       }
                     },res => {
                       this.backErrorfun(res.data.msg);
                       return false
                     })
                   }else{
                     this.backErrorfun(res.data.msg);
                     return false;
                   }
                 },res => {
                   this.backErrorfun(res.data.msg);
                   return false;
                 })
               }else if(this.$route.params.id == 'resetP'){
                 resetLoginPasswordSms(localStorage.getItem('userID'),this.regData.smsCode,this.oldPwd).then(res => {
                   if(res.data.code == 200){//成功
                     this.$router.push({name:'user'});
                   }else{
                     this.backErrorfun(res.data.msg);
                     return false;
                   }
                 },res => {
                   this.backErrorfun(res.data.msg);
                   return false;
                 })
               }

             }else{
               //身份证 找回||重置 密码
               if(this.$route.params.id == 'sfz-find'){
                 //身份证找回密码
                 let mobile = localStorage.getItem('loginTell').replace(/[" "]/g, "");
                 if(mobile!=null && mobile!="" && mobile!=undefined){
                   forgetLoginPasswordIdCard(mobile,this.sfzCode,this.oldPwd).then(res => {
                     if(res.data.code == 200){//成功
                       this.loginData.mobile = mobile;
                       this.loginData.password = this.oldPwd;
                       this.loginData.deviceId = "";
                       login(this.loginData).then(res => {
                         if(res.data.code == 200){//成功
                           localStorage.setItem("userID",res.data.data.id);
                           localStorage.setItem("nickName",res.data.data.nickName);
                           localStorage.setItem("head_url",res.data.data.headUrl);
                           localStorage.setItem("companyId",res.data.data.companyId);
                           localStorage.setItem("companyName",res.data.data.companyName);
                           localStorage.setItem("identificationNumber",res.data.data.identificationNumber);
                           this.$router.push({name:'home'});
                         }else{
                           this.backErrorfun(res.data.msg);
                           return false
                         }
                       },res => {
                         this.backErrorfun(res.data.msg);
                         return false
                       })
                     }else{
                       this.backErrorfun(res.data.msg);
                       return false;
                     }
                   },res => {
                     this.backErrorfun(res.data.msg);
                     return false;
                   })
                 }
               }else if(this.$route.params.id == 'sfz-reset'){
                 //身份证重置密码
                 resetLoginPasswordIdCard(localStorage.getItem('userID'),this.sfzCode,this.oldPwd).then(res => {
                   if(res.data.code == 200){//成功
                     this.$router.push({name:'user'});
                   }else{
                     this.backErrorfun(res.data.msg);
                     return false;
                   }
                 },res => {
                   this.backErrorfun(res.data.msg);
                   return false;
                 })
               }
             }
           }else{
             let url = window.location.href;
             if(this.isWeixn()){
               let openId = localStorage.getItem("openId");
               if(openId!=undefined && openId!=null && openId!="" && openId!='null'){
                 this.regData.openId = localStorage.getItem('openId');
               }
             }
             register(this.regData).then(res => {
               if(res.data.code == 200){//成功
                 //console.log(res)
                 /*localStorage.setItem("loginTell",res.data.data.mobile);*/
                 if(res.data.data!=null){
                   localStorage.setItem("userID",res.data.data.id);
                 }
                 this.$router.push({name:'home'});
                 /* if(localStorage.getItem('loginToPage')==null || localStorage.getItem('loginToPage') == '' || localStorage.getItem('loginToPage') == undefined){
                  this.$router.push({name:'home'});
                  }else{
                  this.$router.push({name:localStorage.getItem('loginToPage')});
                  }*/
               }else{
                 this.backErrorfun(res.data.msg);
                 return false
               }
             },res => {
               this.backErrorfun(res.data.msg);
               return false
             })
           }
         }
       }else{
          this.$refs.showPwd1.focus();
          this.$refs.showPwd2.focus();
       }
      },
      plusReady:function(){
        this.regData.deviceId = "";/*plus.device.uuid;*/
        /* alert( "uuid: "+plus.device.uuid );*/
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      if(this.$route.params.id!=undefined){
          if(this.$route.params.id == "resetP" || this.$route.params.id=="sfz-reset"){
              this.title = "重置登录密码"
              this.newPswOp = true
          }else if(this.$route.params.id == "forgetP" || this.$route.params.id=="sfz-find"){
            this.title = "设置登录密码"
            this.newPswOp = false
          }
      }
      this.$root.$data.vBack=false;
      this.regData.mobile = this.$route.params.tel;
      if(localStorage.getItem('loginTell')!=undefined && localStorage.getItem('loginTell')!=null && localStorage.getItem('loginTell')!=""){
        this.loginData.mobile = localStorage.getItem('loginTell');
      }else{
        this.loginData.mobile = this.regData.mobile;
      }
      if(this.$route.params.smsCode!='' && this.$route.params.smsCode != null && this.$route.params.smsCode != undefined){
        this.regData.smsCode = this.$route.params.smsCode
      }
      if(this.$route.params.status!=undefined){
        if(this.$route.params.status == 'reg'){
          this.status = this.$route.params.status;
          localStorage.setItem('setPswStatus',this.status);
        }
      }
    },
    watch:{
      oldPwd:function (newValue, oldValue) {
        if(this.oldPwd.length>0){
          this.$refs.loginBtn.style.opacity = 1;
          let pattern_chin1 = /[\u4e00-\u9fa5]/g;
          if(newValue.match(pattern_chin1)!=null){
            this.oldPwd = oldValue;
            if(this.oldPwd == ""){
              this.$refs.loginBtn.style.opacity = 0.3
            }else{
              this.$refs.loginBtn.style.opacity = 1
            }
          }else{
            if(newValue.length<=7){
              this.seen=false;
              this.error_prompt="tel-message";
              this.content = "请输入8-20位密码";
              this.$refs.accShowHide.style.color = 'red'
            }else if(newValue.length>7){
              if (this.$format.PwdFormat(this.oldPwd)){
                this.seen=false;
                this.content ='请使用8-20位大、小字母和数字的组合';
                this.$refs.accShowHide.style.color = "#7E7A7A"
              }else {
                this.seen=false;
                this.error_prompt="tel-message";
                this.content = "密码需要8-20位大小写字母及数字组合";
                this.$refs.accShowHide.style.color = 'red'
              }
          }
          }
        }else{
          this.$refs.loginBtn.style.opacity = 0.3;
          this.seen=true;
          this.content ='请使用8-20位大、小字母和数字的组合';
          this.$refs.accShowHide.style.color = '#7E7A7A'
        }
      },
      $route(to,from){

        //console.info(to,from)

      },
    }
  }
</script>
<style>
  @import "../../../assets/css/login.css";
  .setPSW .set_loginPSW{
    font-size:2.416rem;
    color:#2E2A2A;
    text-align:center;
    margin-bottom:0.416rem;
  }
  .setPSW .psw_rule{
    font-size: 1.166rem;
    color: #7E7A7A;
    justify-content: center;
    display: flex;
    text-align: center;
  }
  .setPSW .login-title{
    padding-top: 7rem;
    justify-content: center;
    display: flex;
  }
  .setPSW .login-title .log-img img{
    width:7.5rem;
  }
  .setPSW{
    background-color: #fff;
  }
  .setPSW .text-center{
    margin:0 1.3rem;
  }
  .setPSW .bd-bt{
    /*border-bottom: 1px solid #E5E5E5;*/
    margin-bottom: 3rem;
    margin-top: 3.6666667rem;
    position: relative;
  }
  .setPSW .login-btn .bt-font{
    font-size: 1.6rem;
    color: #FFFFFF;
    text-align: center;
    line-height: 4rem;
  }
  .setPSW .login-tel{
    border-bottom: 1px solid #FFFFFF;
    height: 3rem;
    caret-color: #F2D2B4;
    width: 73%;
    /*color:#BBB7B7;*/
  }
  .setPSW .login-btn{
    position: relative;
    opacity: 0.7;
    border-radius: 0.4rem;
  }
  .setPSW .login-btn span{
    position: absolute;
    top: .7rem;
    color: #FFFFFF;
    transform: translateX(-2.1rem);
    font-size: 1.6rem;
  }
  .setPSW .text-center .login-label{
    padding: 0 2rem 0 0.4rem;
  }
  .setPSW .login-label,.login-tel{
    font-size:1.333rem;
  }
  .setPSW .hh{
    opacity:1!important;
  }
  .setPSW .tel-mess{
    justify-content: center;
    display: flex;
    color: #ccc;
  }
  .setPSW .read_agree{
    font-size:0.916rem;
    color:#BBB7B7;
    margin: 1.666667rem 0 .416rem 1.5rem;
  }
  .setPSW .agreenment{
    font-size:0.916rem;
    color:#605C5C;
    margin: 0 1.083333rem;
  }
  .setPSWipt{
    border-bottom: 1px solid #FFFFFF;
    caret-color: #F2D2B4;
    width: 73%;
  }
  .setPSW .psweyes{
    width: 1.2rem;
    position: absolute;
    top: -1.8rem;
    right: 0;

  }
  .setPSW #setPwd_format{
    display: block!important;
    margin-top: 3rem;
  }
  /*小叉號*/
  .setPSW .srtdelete{
    width: 1.08333333rem;
    position: absolute;
    top: -2rem;
    right: 2rem;
  }
  /*居中*/
  .juzhong{
    justify-content: center;
    display: flex;
  }
  @media screen and (max-width:321px){
    .setPSW .bd-bt{
      margin-top:4rem;
    }
    .setPSW .aaa .setPSWipt{
    font-size: 1.25rem;
  }
  }
  /*错误提示样式*/
/*  .errorSeen{
    color: #F5222D;
    max-width: 19rem;
    position: absolute;
  }*/
  .setPSW .aaa{
    padding-top: 6.9rem;
    padding-bottom: 0.4rem;
  }
  .setPSW .aaa .aaanewPswOp{
    width: 75%;
    margin-left: 15%;
    margin-top: -1.9rem;
  }
  /*.setPSW .psw_rule .acc{
    position: absolute;
  }*/
  /*下一步的样式*/
  .set_next_t{
    margin:0 1.083333rem;
  }
  .setPSW .set_next_t .btn_login{
    opacity: 0.3;
  }
  /**/
  .tSxx{
    color: #F5222D;
   /* position: absolute;
    text-align: center;*/
  }
</style>

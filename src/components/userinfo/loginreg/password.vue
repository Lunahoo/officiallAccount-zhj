<template>
  <div class="bg-login height"  @click="CSbgLogin">
    <div class="login-title text-center1" v-if="phoneTitle">
      <div class="log-img"><img v-if="phoneSH" style="width: 5.1rem;height: 5.1rem;border-radius: 4rem;" src="../../../assets/image/man.png"><img style="width: 5.1rem;height: 5.1rem;border-radius: 4rem;" src="../../../assets/image/lady.png" v-else="!phoneSH" /></div>
      <div class="bgLoginPhone"><span>{{loginData.mobile|encrypt}}</span></div>
    </div>
    <div class="login-title text-center1" v-if="!phoneTitle">
      <div class="log-img"><img :src="head_url" style="width: 5.1rem;height: 5.1rem;border-radius: 4rem;"></div>
      <div class="bgLoginPhone"><span>{{loginData.mobile|encrypt}}</span></div>
    </div>
    <div v-if="LoginphoneTitle" class="login_T cont">
      <div class="bg-login-title">输入登录密码</div>
      <div v-if="seen" class="acc font-ipt">该手机号已注册，可以直接登录</div>
      <!--<div v-else class="animated shake">{{content}}</div>-->
    </div>
    <div class="text-center bd-bt" style="padding-top: 3rem;">
      <label class="login-label">密码</label>
      <input ref="showPwd1" v-show="downIcon" class="setPSWipt" v-focus type="password" maxlength="20" placeholder="请输入登录密码" v-model="pwdInput" @click="pswSb" @blur="changeFixed" clearable />
      <input ref="showPwd2" v-show="!downIcon" class="setPSWipt" v-focus type="text" placeholder="请输入登录密码" maxlength="20" @click="pswSb" v-model="pwdInput" @blur="changeFixed" clearable/>
      <div class="psweyes" @click="switc">
        <img class="closea" v-show="downIcon" src="../../../assets/img/closeEyes.png"/>
        <img class="opena" v-show="!downIcon" src="../../../assets/img/openEyes.png"/>
      </div>
      <div class="passdetele" @click="passdetele" v-show="pwdInput"><img src="../../../assets/img/clean.png"/></div>
    </div>
    <section class="psw_static both_option" id="psw_static" ref="pswStatic">
      <button class="btn_login"  ref="loginBtn" @click="pwdLoginn(pwdInput)">登录</button><!--点击跳转页面-->

      <div class="tel-mess" id="tel-mess1" ref="telMess1">
        <div class="telCon-mess">
          <section :class="[error_prompt]" id="oldS_pwd">{{content}}</section>
        </div>
      </div>
    </section>

    <section class="psw_new both_option" id="psw_new" ref="pswNew">
      <button class="btn_login"  ref="loginBtns" @click="pwdLoginn(pwdInput)">下一步</button><!--点击跳转页面-->
      <div class="tel-mess" id="tel-mess" ref="telMess">
        <div class="telCon-mess">
          <section :class="[error_prompt]" id="newS_pwd">{{content}}</section>
        </div>
      </div>
    </section>
    <div class="setPSW-more cont" ref="moreMes" id="moreMes" @click="show1">更多</div><!-- v-show="moreMesMore"-->
    <!--点击更多出现的弹窗-->
    <div class="maskMore" v-show="maskMore" @click="hideMask">
      <div class="maskMorePopup">
        <div class="maskRetrieve">
          <!--<router-link to="{path:'/choiceReset',query:{sb:hide}}">-->
          <p class="bd-btm" :class="line" v-show="foundPSW" @click="Fpsw">找回密码</p>
          <!--</router-link>-->
          <p class="register bd-btm" @click="loginYzm" v-show="ksLogin">验证码登录</p><!-- @click="toCaptcha"-->
          <p class="btnline-x" @click="toLogin">其他账号登录</p>
        </div>
        <div class="cancel"><p class="cancelTk" @click="hidee">取消</p></div>
      </div>
    </div>
    <!--账号密码错误次数过多提示-->
    <section class="zz" v-show="pswTips">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">账号或密码错误次数过多，请1小时后再试或找回密码</div>
          <div class="section_bottom">
            <div class="qx_set1" @click="abolish">确定</div>
           <!--<div @click="toChoiceReset" class="qx_set qx_Retrieve">找回密码</div>-->
          </div>
        </div>
      </div>
    </section>
    <!--账号密码错误次数过多提示2-->
    <section class="zz" v-show="pswTips2">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">{{sec_top}}</div>
          <div class="section_one" @click="knows">知道了</div>
        </div>
      </div>
    </section>
    <!--提示新设备首次登录-->
    <section class="zz" v-show="smsMessage">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">发现您使用新设备登录，为了您账号安全，请验证短信验证码</div>
          <div class="section_bottom">
            <div class="section_one" @click="sendMsg">确认</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  /*function getStyle(obj, attr){
   if(obj.currentStyle){
   return obj.currentStyle[attr];
   }else{
   return getComputedStyle(obj, false)[attr];
   }
   };*/
  import filter from '../../../filters/filter.js';
  import {login,queryIsNewDeviceLogin} from '@/api/user/loginReg'
  export default {
    name:'bg-login',
    data() {
      return {
        moreMesMore:true,
        line:"",           //弹出框的圆角样式
        //   line2:"",           //添加弹出框的圆角样式
        foundPSW:true,     //找回密码
        ksLogin:false,     //验证码登录
        pwdInput:'',
        downIcon: true,
        error_prompt:"",
        content:"",
        maskMore:false,
        pswTips:false,
        pswTips2:false,
        sec_top:"该账号的操作次数超过上限，请使用其他登录方式",
        smsMessage:false,//提示发送短信验证码框
        c:0,
        phoneSH:true,/*头像显示*/
        phoneTitle:true,/*头部显示*/
        LoginphoneTitle:false,
        seen:true,
        head_url:"",//头像
        loginData:{
          mobile:'',
          password:'',
          deviceId:'',/*013025009298520*/
          loginType:'1',//登录方式，1：密码；2：短信验证码
          openId:""
        },
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {

          el.focus();
        },

      }
    },
    mounted:function(){
     /* this.init();*/
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = ' ';
      if(localStorage.getItem("loginTell")!='' && localStorage.getItem("loginTell")!=undefined){
        this.loginData.mobile = localStorage.getItem("loginTell").replace(/[" "]/g, "")
      }
      if(localStorage.getItem("head_url")!='' && localStorage.getItem("head_url")!=undefined){
        this.head_url = localStorage.getItem("head_url");
        this.phoneTitle = false;
      }
     /* this.init();*/
    },
    methods:{
      CSbgLogin(){
          //console.log(11111111)
      },
      //进入页面自动获焦
      init(){
          this.$refs.showPwd1.addEventListener('click',function () {
            this.$refs.showPwd1.focus();
            this.moreMesMore=false
          })
        this.$refs.showPwd2.addEventListener('click',function () {
          this.$refs.showPwd2.focus();
          this.moreMesMore=false
        })
      },
      //input框点击事件
      pswSb(){
          this.$nextTick(function(){
          //  alert(document.documentElement.scrollTop);
              this.moreMesMore=false//失焦时隐藏更多按钮
          });

        //this.$refs.moreMes.style = "position:static!important;margin-top:2rem!important";//获焦时更多弹起暂时去掉下一版可能还要做2018/8/22
      },
      //失焦更多定位
      changeFixed(){
        //this.$refs.moreMes.style = "position:fixed!important";
       // alert(window.screen.availHeight);
        this.moreMesMore=true
      },
      //找回密码
      Fpsw(){
        this.$router.push({
          name:"login",
          query:{
            pas:"findPSW"
          }
        })
      },
      //用其他账号登录
      toLogin(){
        this.$router.push({
          name:"login",
        })
      },
      hideMask(){
        this.maskMore = false;
        this.$refs.telMess1.style.display="none";
      },
      show1:function () {
        //当密码输入错误的时候隐藏快速注册栏
        this.maskMore = true;
        this.$refs.telMess1.style.display="none";
        //查询是否是新设备
        queryIsNewDeviceLogin(this.loginData.mobile,this.loginData.deviceId).then(res => {
            if(res.data.code == 200){//新设备
              this.ksLogin = false;
              this.line = "btnline";
            }else if(res.data.code == 5110){//非新设备
              this.ksLogin = true;
              this.foundPSW = true;
              this.line = "btnline";
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
       /* if(this.content == "密码格式错误"){    //还有一个快速注册出现的情况没有加上
          this.foundPSW = false;
        }else{
          this.ksLogin = true;
          this.foundPSW = true;
          this.line = "btnline";
        }*/
      },
      hidee:function () {
        this.maskMore = false;
      },
      //验证码登录
      loginYzm(){
        this.$router.push({
          name:'captcha',
          params:{
            mes:'mes-Yzm'
          }
        })
      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      passdetele:function () {
        /*this.$refs.moreMes.style = "position:static!important;margin-top:2rem!important";*/
       // document.getElementById("moreMes").scrollIntoView({block:center });
        this.pwdInput='';
        this.$refs.showPwd1.focus();
        this.$refs.showPwd2.focus();
        this.$refs.telMess.style.display="none";
        this.$refs.telMess1.style.display="none";
      },

      switc(){
        this.downIcon=!this.downIcon;
        window.document.getElementsByClassName("tel-mess")[0].style.display = "none";
    //    let arrs = document.getElementsByClassName('setPSWipt');
        this.$refs.showPwd2.focus();
//        setTimeout(function(){
//         for(let i=0;i<arrs.length;i++){
//             arrs[i].focus()
//         }
//        },500)
      },
      pwdLoginn:function (pwdValue) {
        if(this.$refs.loginBtn.style.opacity ==1 && this.$refs.loginBtns.style.opacity ==1){
            this.loginData.password = this.pwdInput
          let url = window.location.href;
          if(this.isWeixn()){
            if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
              this.loginData.openId = localStorage.getItem('openId')
            }
          }
          this.$refs.loginBtn.style.opacity = 0.3;
          this.$refs.loginBtns.style.opacity = 0.3;
            login(this.loginData).then(res => {
              if(res.data.code == 200){ //成功
                /*console.info(res.data);*/
                /*localStorage.setItem("loginTell",this.loginData.mobile);*/
                localStorage.setItem("userID",res.data.data.id);
                localStorage.setItem("loginTell",res.data.data.mobile);
                localStorage.setItem("nickName",res.data.data.nickName);
                localStorage.setItem("head_url",res.data.data.headUrl);
                localStorage.setItem("companyId",res.data.data.companyId);
                localStorage.setItem("companyName",res.data.data.companyName);
                localStorage.setItem("identificationNumber",res.data.data.identificationNumber);
                if(localStorage.getItem('loginToPage')==null || localStorage.getItem('loginToPage') == '' || localStorage.getItem('loginToPage') == undefined){
                  this.$router.push({name:'home'});
                }else{
                  this.$router.push({name:localStorage.getItem('loginToPage')});
                }
              }else if(res.data.code == 6110){
                this.smsMessage = true;
              }else{
                  if(res.data.code == "5113"){
                      this.pswTips2 = true
                  }else{
                    this.backErrorfun(res.data.msg);
                  }
                return false
              }
            },res => {
              this.backErrorfun(res.data.msg);
              return false
            })
        }else{
          this.$refs.showPwd1.focus();
          this.$refs.showPwd2.focus();
        }

      },
      backErrorfun(msg){
        this.error_prompt="tel-message";
        this.content = msg;
        this.$refs.telMess.style.display="block";
        this.$refs.telMess1.style.display="block";
        this.$refs.loginBtn.style.opacity = 1;
        this.$refs.loginBtns.style.opacity = 1;
        this.oldPwd = '';
      },
      //确定发送短信验证码
      sendMsg(){
        this.smsMessage = false;
        this.$router.push({name:'messageCaptcha',params:{tel:this.loginData.mobile,smsSign:'login_plat_sms',retry:'Y',sendloginData:this.loginData}});
      },
      plusReady:function(){
        this.regData.deviceId = "";/*plus.device.uuid;*/
        //alert( "uuid: "+plus.device.uuid );
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener("plusready",plusReady,false);
        }
      },
      //确定
      abolish:function(){
        this.pswTips2 = false;
      },
      //知道了
      knows:function(){
        this.pswTips2 = false;
      }

    },
    watch:{
      '$route':'getParams',
      pwdInput(newValue,oldValue){
        if(this.pwdInput.length>0){
          this.$refs.loginBtn.style.opacity = 1
          this.$refs.loginBtns.style.opacity = 1
          let pattern_chin1 = /[\u4e00-\u9fa5]/g;
          if(newValue.match(pattern_chin1)!=null){
              this.pwdInput = oldValue;
            if(this.oldPwd == ""){
              this.$refs.loginBtn.style.opacity = 0.3
              this.$refs.loginBtns.style.opacity = 0.3
            }else{
              this.$refs.loginBtn.style.opacity = 1
              this.$refs.loginBtns.style.opacity = 1
            }
          }
        }else{
          this.$refs.loginBtn.style.opacity = 0.3
          this.$refs.loginBtns.style.opacity = 0.3
        }
      }
    },
  }
</script>
<style>
  @import "../../../assets/css/public.css";
  @import "../../../assets/css/login.css";
  /*.bg-login{
    display:-webkit-box;-webkit-box-orient:vertical;
  }*/
  .bg-login .log-mode {
    position: absolute;
    width: 100%;
    padding-top: 1.2rem;
    color: #FA8C16;
  }
  .bg-login .setPSWipt{
    border-bottom: 1px solid #FFFFFF;
    caret-color: #D46B08;
    width: 73%;
    /* color: #BBB7B7;*/
  }
  .bg-login .psweyes{
    width: 1.2rem;
    position: absolute;
    bottom: 1.2rem;
    right: 0;
  }
  bg-login #psw_static,#psw_new{
    display:none;
    margin: 0 1.08rem;
  }
  .bg-login #oldS_pwd{
    display: block!important;
    /* margin-left: 7rem;*/
    margin-top: 2rem;
  }
  .bg-login #newS_pwd{
    display: block!important;
    /*margin-left: 3rem;*/
    margin-top: -1rem;
  }
  .telCon-mess{
    display: flex;
    justify-content: center;
  }
  /*小叉號*/
  .bg-login .passdetele{
    width: 1.0833333rem;
    position: absolute;
    right: 2rem;
    top: 3.8rem;
  }
  .bg-login .both_option .btn_login{
    opacity: 0.3;
  }
  @media screen and (max-width:321px){
    .bg-login #newS_pwd{
      margin-top: 0.2rem!important;
    }
    .bg-login #oldS_pwd{
      margin-top: 1rem!important;
    }
    .bg-login .btn_login{
      width: 24.08333rem;
    }
    .bg-login{
      height:93.4%
    }
  }

  /*更多*/
  .bg-login .setPSW-more{
    color: #FA8C16;
    font-size: 1.083333rem;
    padding-top: .5rem;
    margin-top: 1rem;
  }
  /*弹框*/
  .bg-login .maskMore{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
  }
  .bg-login .maskMore .maskMorePopup{
    width: 100%;
    position: absolute;
    bottom: 0.75rem;
    left: 0;
    text-align: center;
    font-size: 1.5rem;
  }
  .bg-login .maskMorePopup .maskRetrieve,.psw_static .maskMorePopup .cancel{
    margin: 0 0.75rem;
  }
  .bg-login .maskMore .maskMorePopup p {
    background: #fff;
    line-height: 4.1666667rem;
    font-size: 1.25rem;
  }
  /*.bg-login .maskMore .btnline {*/
    /*!*border-bottom: 1px solid #E5E5E5;*!*/
    /*border-radius: 7px 7px 0 0;*/
  /*}*/
  .bg-login .maskMore .maskRetrieve  p:nth-of-type(1){
    /*border-bottom: 1px solid #E5E5E5;*/
    border-radius: 7px 7px 0 0;
  }
  .bg-login .maskMore .btnline-x {
    border-radius: 0 0 7px 7px;
  }
  .bg-login .maskMore .cancel {
    margin: 0.583333333rem 0.75rem 0;
  }
  .psw_static .maskMore .cancel p {
    border-radius: 1rem;
    color: #969191;
  }
  .bg-login .maskMorePopup .cancelTk{
    border-radius: 7px;
  }
  /*手机号*/
  .bg-login .bgLoginPhone{
    position: absolute;
    top: 12rem;
    font-size: 1.33333rem;
  }
  /**/
  .bg-login .text-center1{
    margin: 0 1.3rem 3rem;
  }
  .bg-login .setPSWipt{
    font-size: 1.333333rem;
  }
  /*头像背景色*/
  .bg-login .login-title .log-img{
    background: #F9F9F9;
    border-radius: 4rem;
    width: 5rem;
    height: 5rem;
  }
  #psw_static{
    justify-content: center;
    display: flex;
    margin: 0 1.08333rem;
  }
  /*按钮找回密码的颜色*/
  .qx_Retrieve{
    color: #EB7B03;
    border-left:1px solid #E5E5E5;
  }
  /*密码页头部显示之文字*/
  .bg-login .login_T{
    padding-top: 3.666667rem;

  }
  .bg-login .login_T .bg-login-title{
    font-size: 2.41666667rem;
  }
  .bg-login .login_T .acc{
    font-size: 1.16666667rem;
    padding-bottom: 2.166667rem;
  }
</style>

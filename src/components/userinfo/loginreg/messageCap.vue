<template>
  <div class="yzm height">
   <!-- <div class="captcha cont height-316">
      <img class="captcha_img fl goCaptcha_img" @click="mesGoBack" src="../../../assets/img/left.png">&lt;!&ndash;&ndash;&gt;
     &lt;!&ndash; <span class="captcha captcha_size" style="font-size: 1.25rem;padding-right: 1.35rem;">{{article}}</span>&ndash;&gt;
    </div>-->
    <div class="h3">重置支付密码</div>
    <div class="yzm_text">
      <div class="yzm_mess">我们已向 <span class="mobile_phone" id="mobile_phone">{{mobile|encrypt}}</span> 发送验证码短信,<div class="inputYZm">请查看短信并输入验证码</div></div>
    </div>
    <label for="mesCaptcha">
      <ul class="security-code-container">
        <li class="field-wrap" v-for="(item, index) in number" :key="index">
          <i class="char-field" >{{value[index] || placeholder}}</i>
        </li>
      </ul>
    </label>
   <!-- <div class="tel-mess">
      <section :class="[error_prompt]" id="mesContent" >{{mesContent}}</section>
    </div>-->
    <input ref="keyboard" class="input-code" v-model="value" @blur="mesCaptcha"
           id="mesCaptcha" name="mesCaptcha" type="text"  :maxlength="number"
           autocorrect="off" autocomplete="off" autocapitalize="off" @focus="onFocus" v-focus autofocus><!--@keyup="handleInput($event)"-->
    <div class="send_yzm">
      <span style="display:none;" class="pst-abs auth_text auth_text_blue auth_text_display"><span class="yzm_resend" @click="getAuthCode">重新发送</span>或<span class="yzm_voice_get" @click="getVoiceCode">语音获取</span></span>
      <span  style="display:block" class="auth_text auth_text_black" > <span class="auth_text_blue"  id="inputValue">{{auth_time}}</span> 秒之后重新发送验证码</span>
    </div>
    <div class="sbd_yzmDAD bd-top" v-if="sbdYzmDAD">
      <p @click="toCaptchaText" class="n_receivedYZM font-fa">收不到验证码？</p>
    </div>

    <Keyboard :option="option" @keyVal="getInputValue" v-show="option.show"></Keyboard>
    <div class="mask" v-if="maskPopup" @click="mask">
      <div class="Popup width cont">
        <div class="Retrieve">
          <p @click="goBack" class="btnline">其他方式重置密码</p>
          <p @click="toCaptchaText('again')" class="btnline-x">帮助</p>
        </div>
        <div class="cancel"><p @click="hide">取消</p></div>
      </div>
    </div>
    <!--语音接听-->
    <div class="yzmMask" ref="yzmMask">
      <section class="section_yzm" ref="sectionYZM">
        <div class="voice_yzm">您将受到券易销电话播报的语音验证码，请注意接听</div>
        <div class="hr"></div>
        <div class="yzm_alert">
          <div class="yzm_cancel" @click="canCle">取消</div>
          <div class="yzm_confirm_answer" @click="voiceYzmJT">确认接听</div>
        </div>
      </section>
    </div>
    <!--账号操作次数达到上限-->
    <section class="zz" v-show="upperLimit">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">该账号的操作次数超过上限，请使用其他登录方式</div>
          <div class="section_bottom">
            <div class="qx_set" @click="abolish">取消</div>
            <div class="qx_right qx_set" @click="pswIn">密码登录</div>
          </div>
        </div>
      </div>
    </section>
    <section class="zz" v-show="unReg">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">该账号的操作次数超过上限，请明天再试</div>
          <div class="section_bottom">
            <div class="qx_set1 font-fa" @click="backLogin">知道了</div>
          </div>
        </div>
      </div>
    </section>
    <!--验证码多次输入错误重新获取-->
    <section class="zz" v-show="upperLimit2">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">{{sec_top}}</div>
          <div class="section_bottom" v-show="beginGet">
            <div class="qx_set" @click="abolish2">取消</div>
            <div class="qx_right qx_set" @click="getAuthCode2">重新获取</div>
          </div>
          <div class="section_bottom" v-show="back">
            <div class="qx_set1" @click="abolish2">返回</div>
          </div>
        </div>
      </div>
    </section>
    <div class="tel-mess" ref="history">
      <div class="juzhong">
        <section :class="[error_prompt]" id="error_sms">{{mesContent}}</section>
      </div>
    </div>
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
  import {} from "@/api/user/loginReg";
   /* function getStyle(obj, attr){
   if(obj.currentStyle){
   return obj.currentStyle[attr];
   }else{
   return getComputedStyle(obj, false)[attr];
   }
   };*/
   import Keyboard from '../../keyboard1.vue'
  import {sendMess,checkRegisterSms,login,forgetPswSms,sendSmsCode} from '@/api/user/loginReg'
  export default {
    components: {
      Keyboard
    },
    name: 'yzm',
    props: {
      number: {
        type: Number,
        maskPopup:false,
        default: 4
      },
      placeholder: {
        type: String,
        default: '-'
      },
    },
    // variables
    data() {
      return {
        option: {
          show: true,
          sourceDom: ''
        },
        sbdYzmDAD:true,//收不到验证码
        isappear:false,//放弃注册
        status:"",//状态值（判断是否是注册流程）
        state:"",
        beginGet:true,
        back:false,
        title:'验证码登录',
        changeful:"", //换个方式重置密码
        value:"",
        mobile:'',
        auth_time: 5,
        mesContent:"",
        maskPopup:false,
        error_prompt:"",
        upperLimit:false,
        upperLimit2:false,
        unReg:false,
        smsType:'register_plat_sms',
        sec_top:"该账号的操作次数超过上限，请使用其他登录方式",
        meg:"",
        messageData:{//初始化动态赋值，勿删

        },
        loginData:{//初始化动态赋值，勿删

        },
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
          document.activeElement.blur();
          var List=document.getElementsByClassName('field-wrap');
          List[0].style.cssText="border-color:#FA8C16";
        }
      }
    },
    created(){
      this.$root.$data.vBack=false;




	   /* this.$root.$data.article = '短信验证码';*/
//      if(this.$route.params.messageData != undefined && this.$route.params.messageData != null && this.$route.params.messageData != ''){
//	      if(this.$route.params.state == true || this.$route.params.meg == 'mes-find' || this.$route.params.state == "inputMes"){ //判断用户是否进入忘记||重置密码流程
//          this.forgetPswPublice();
//	          this.messageData.smsSign ='reset_plat_login_password_sms';
//	        }else if(this.$route.params.transforValue == true){//判断用户是否要通过验证码登录
//	          this.forgetPswPublice();
//	          this.messageData.smsSign = 'login_plat_sms';
//	        }else{
//	          this.title = "该手机号还未注册";
//	          this.mobile = this.$route.params.messageData.mobile;
//		        this.messageData = this.$route.params.messageData
//	        }
//      }else{
//          if(this.$route.params.tel!=undefined && this.$route.params.tel!=null && this.$route.params.tel!=""){
//            this.mobile = this.$route.params.tel;
//          }else{
//            this.mobile = localStorage.getItem('loginTell')
//          }
//        this.messageData.mobile = this.mobile;
//        this.messageData.type = '1';
//        this.messageData.smsSign = this.$route.params.smsSign;
//        this.messageData.retry = this.$route.params.retry;
//        if(this.$route.params.sendloginData!=undefined){
//          this.loginData = this.$route.params.sendloginData;
//        }
//      }
//      if(this.$route.params.status!=undefined){
//        if(this.$route.params.status == 'reg'){
//          this.status = this.$route.params.status;
//        }
//      }
//      if(localStorage.getItem("title")!=undefined && localStorage.getItem("title")!=null && localStorage.getItem("title")!=""){
//          this.title = localStorage.getItem("title");
//      }
//      if(this.$route.params.state!=undefined){
//        this.state = this.$route.params.state;
//      }
//      if(this.$route.params.meg!=undefined){
//          this.meg = this.$route.params.meg
//      }
    },
    mounted:function(){
      this.init();
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      });
    },
    watch:{
      value(){
          this.handleInput();
        if(this.value.length == 4){
          this.mesCaptcha();
        }
      }
    },
    methods: {
        //返回其他方式重置密码页面
      goBack(){
        this.maskPopup = false;
        this.$router.go(-1);
      },
        //收不到验证码
      toCaptchaText(value){
        this.sbdYzmDAD = false;
         if(value == "again"){
           clearInterval(window.auth_timetimer);
           this.$router.push({name:"captchaText"});
           localStorage.setItem("title",this.title)
           localStorage.setItem('state',this.state);
         }else{
           if(this.title!="输入验证码"){
             clearInterval(window.auth_timetimer);
             this.$router.push({name:"captchaText"});
             localStorage.setItem("title",this.title)
             localStorage.setItem('state',this.state);
           }else{
             this.option.show = false
             this.maskPopup = true;
           }
         }
      },
      //取消按钮
      hide(){
        this.option.show = true
        this.maskPopup = false;
      },
      mask(){
        this.option.show = true
        this.maskPopup = false;
        this.sbdYzmDAD = true;
      },
      //返回按钮
      mesGoBack(){
        if(this.$route.params.status!=undefined && this.$route.params.status == 'reg'){
          this.isappear = true
        }else{
          this.$router.go(-1);
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
      getInputValue(val) {
        if(val === 'delete'){
          this.value = this.value.slice(0,this.value.length -1)
        }else{
          this.value += val
        }
      },
      onFocus() {
        this.$set(this.option, 'show', true)
        this.$set(this.option, 'sourceDom', this.$refs['keyboard'])
        document.activeElement.blur();
      },
      //获取光标位置
      getCursorPosition() {
        let doc = this.$refs['keyboard']
        if (doc.selectionStart) return doc.selectionStart
        return -1
      },
      //设置光标位置 暂未实现
      setCursorPosition(pos) {
        let doc = this.$refs['keyboard']
       // console.log(doc.setSelectionRange)
        doc.focus()
        doc.setSelectionRange(1,3)
      },
      //初始化忘记密码公用部分
      forgetPswPublice(){
        this.messageData = this.$route.params.messageData;
        this.mobile = localStorage.getItem("loginTell").replace(/[" "]/g, "");
        this.messageData.mobile = this.mobile;
        this.messageData.type = '1';
        this.messageData.retry = this.$route.params.retry;
      },
      hide:function () {
        this.maskPopup = false;
        this.option.show = true
      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      hideKeyboard() {
        // 输入完成隐藏键盘
        document.activeElement.blur(); // ios隐藏键盘
        this.$refs.keyboard.blur() // android隐藏键盘
      },
      handleSubmit() {
        var List=document.getElementsByClassName('field-wrap');
        this.$emit('input', this.value);
        if (this.value.length==1){
          List[1].style.cssText="border-color:#FA8C16";
          List[0].style.cssText="border-color:#E5E5E5";
          List[2].style.cssText="border-color:#E5E5E5";
          List[3].style.cssText="border-color:#E5E5E5";
        }else if(this.value.length==2){
          List[2].style.cssText="border-color:#FA8C16";
          List[1].style.cssText="border-color:#E5E5E5";
          List[0].style.cssText="border-color:#E5E5E5";
          List[3].style.cssText="border-color:#E5E5E5";
        }else if(this.value.length==3){
          List[3].style.cssText="border-color:#FA8C16";
          List[2].style.cssText="border-color:#E5E5E5";
          List[1].style.cssText="border-color:#E5E5E5";
          List[0].style.cssText="border-color:#E5E5E5";
        }else if(this.value.length==4){
          List[0].style.cssText="border-color:#E5E5E5";
          List[1].style.cssText="border-color:#E5E5E5";
          List[2].style.cssText="border-color:#E5E5E5";
          List[3].style.cssText="border-color:#E5E5E5";
        }else if(this.value.length==0){
          List[3].style.cssText="border-color:#E5E5E5";
          List[0].style.cssText="border-color:#FA8C16";
          List[1].style.cssText="border-color:#E5E5E5";
          List[2].style.cssText="border-color:#E5E5E5";
        }
      },
      handleInput(e) {
        this.$refs.keyboard.value = this.value;
        if (this.value.length >= this.number) {
          this.hideKeyboard();
        }
        this.handleSubmit();
      },
      //初始化显示倒计时
      init: function(){
        if(this.$route.params.state!=undefined){
          if(this.$route.params.state == "inputMes"){
            this.title = '输入验证码';
            this.messageData.smsSign ='reset_plat_login_password_sms';
          }else{
              if(this.$route.params.status!=undefined){
                if(this.$route.params.status=="reg"){
                  this.title = '该手机号还未注册';
                  this.messageData.smsSign ='register_plat_sms';
                }else{
                  this.title = '验证码登录';
                  this.messageData.smsSign ='login_plat_sms';
                }
              }else{
                this.title = '输入验证码';
                this.messageData.smsSign ='reset_plat_login_password_sms';
              }
          }
        }
//       if(this.$route.params.smsSign!=undefined){
//           this.smsType = this.$route.params.smsSign
//       }
      this.opensetInterval();
      },
      //启动定时器
      opensetInterval(){
        document.getElementsByClassName("auth_text_black")[0].style.display = 'block';
        document.getElementsByClassName("auth_text_display")[0].style.display = 'none';
        this.auth_time = 5;
        window.auth_timetimer = setInterval(() => {
          this.auth_time--;
          if(document.getElementById("inputValue")!=null){
            document.getElementById("inputValue").innerHTML = this.auth_time;
          }
          if (this.auth_time == undefined || this.auth_time <= 0) {
              if(document.getElementsByClassName("auth_text_black").length>0){
                document.getElementsByClassName("auth_text_black")[0].style.display = 'none';
                document.getElementsByClassName("auth_text_display")[0].style.display = 'block';
                document.getElementById("inputValue").innerHTML = 5;
                clearInterval(auth_timetimer);
              }
          }
        }, 1000);
      },
      //提取忘记&重置密码流程的验证短信接口
      sendShortMessage(){
        this.mobile = localStorage.getItem("loginTell").replace(/[" "]/g, "")
        if(this.smsType == undefined || this.smsType == null || this.smsType == ""){
          this.smsType = "reset_plat_login_password_sms"
        }
        //忘记密码||重置密码 验证短信验证码操作
          forgetPswSms(this.mobile,this.value,this.smsType).then(res => {
            if(res.data.code == 200){//成功
              if(this.smsType == "login_plat_sms" && this.meg == 'mes-Yzm'){
                this.loginData.loginDeviceName = navigator.userAgent;
                this.loginData.mobile = this.mobile;
                this.loginData.smsCode = this.value;
                this.loginData.deviceId = "";/*013025009298520*/
                this.loginData.loginType = '2';
                login(this.loginData).then(res => {
                      if(res.data.code == 200 || res.data.code == 6110){//成功
                        /*localStorage.setItem("loginTell",this.loginData.mobile);*/
                        localStorage.setItem("userID",res.data.data.id);
                        localStorage.setItem("nickName",res.data.data.nickName);
                        localStorage.setItem("head_url",res.data.data.headUrl);
                        localStorage.setItem("companyId",res.data.data.companyId);
                        localStorage.setItem("companyName",res.data.data.companyName);
                        localStorage.setItem("identificationNumber",res.data.data.identificationNumber);
                        /*localStorage.setItem("companyId",res.data.data.companyId);*/
                        this.$router.push({name:'home'});
                  }else{
                    this.backErrorfun(res.data.msg,res.data.code);
                    return false;
                  }
                },res => {
                  this.backErrorfun(res.data.msg,res.data.code);
                  return false;
                })
                /*this.$router.push({name:'home'});*/
              }else{
                localStorage.setItem("identityNo",'');
                if(this.meg == 'mes-find'){
                    //找回密码
                  this.$router.push({name:'setPsw',params:{tel:this.mobile,smsCode:this.value,id:'forgetP'}});
                }else{
                    //重置密码
                  this.$router.push({name:'setPsw',params:{tel:this.mobile,smsCode:this.value,id:'resetP'}});
                }
              }
            }else{
              this.backErrorfun(res.data.msg,res.data.code);
              return false;
            }
          },res => {
            this.backErrorfun(res.data.msg,res.data.code);
            return false;
          })
      },
      //重新发送验证码
      getAuthCode: function () {
        this.value = '';
        this.$refs.keyboard.value = '';
        document.getElementById("mesCaptcha").focus();
        document.activeElement.blur();
        this.handleSubmit();
        this.option.show = true;
//        if(this.title != "输入验证码"){
//              //忘记密码&新设备登录发送短信验证码
//          if(this.title == "验证码登录" ){
//            this.messageData.smsSign = this.smsType;
//          }else if(this.title == "该手机号还未注册"){
//            this.messageData.smsSign = 'register_plat_sms';
//          }
//          this.messageData.retry = 'Y';
//          this.messageData.mobile = this.messageData.mobile.replace(/[" "]/g, "");
//          sendMess(this.messageData).then(res => {
//            if(res.data.code == 200){//成功
//              this.opensetInterval();
//            }else{
//              this.backErrorfun(res.data.msg,res.data.code);
//              return false;
//            }
//          },res => {
//            this.backErrorfun(res.data.msg,res.data.code);
//            return false;
//          })
//        }else{

          this.messageData.type = '1';
          this.messageData.retry = 'Y';
          this.messageData.smsSign ='reset_plat_login_password_sms';
            if(this.$route.params.fromUrl!=undefined){
              if(this.$route.params.fromUrl == "captcha"){
                sendMess(this.messageData).then(res => {
                  if(res.data.code == 200){//成功
                    this.opensetInterval();
                  }else{
                    this.backErrorfun(res.data.msg,res.data.code);
                    return false;
                  }
                },res => {
                  this.backErrorfun(res.data.msg,res.data.code);
                  return false;
                })
              }
            }else{
              //已登录用户发送短信验证码
              sendSmsCode(localStorage.getItem('userID'),this.messageData).then(res => {
                if(res.data.code == 200){//成功
                  this.opensetInterval();
                }else{
                  this.backErrorfun(res.data.msg,res.data.code);
                  return false;
                }
              },res => {
                this.backErrorfun(res.data.msg,res.data.code);
                return false;
              })
            }

 //       }
      },
      //重新获取验证码
      getAuthCode2:function(){
          this.upperLimit2 = false
          this.getAuthCode();
      },

      //失焦验证
      mesCaptcha:function(){
          if(this.value.length == 4){
            this.option.show = true
            this.value.toUpperCase();//取得输入的验证码并转化为大写
            if(this.value == ''||this.value == null || this.value == undefined){
              this.value = '';
              document.getElementById("mesCaptcha").focus();
              document.activeElement.blur();
            }else {
              if(this.messageData.smsSign!=undefined){
                this.smsType = this.messageData.smsSign;
              }
              if(this.title == "该手机号还未注册"){
                this.mobile = this.mobile.replace(/[" "]/g, "");
                //验证未注册短信验证码
                forgetPswSms(this.mobile,this.value,this.smsType).then(res => {
                  if(res.data.code == 200){//成功
                    this.$router.push({name:'setPsw',params:{tel:this.mobile,smsCode:this.value,status:'reg'}});
                  }else{

                    this.backErrorfun(res.data.msg,res.data.code);
                    return false;
                  }
                },res => {
                  this.backErrorfun(res.data.msg,res.data.code);
                  return false;
                })
              }else{
                if(this.title == "验证码登录" && this.$route.params.state!=undefined){
                   /* if(this.$route.params.state == true || localStorage.getItem('state') == true){*/
                      this.sendShortMessage();
                   /* }*/
                }else if(this.title == "输入验证码"){
                    if(this.$route.params.state == "inputMes" ||  this.$route.params.state == true){
                      this.sendShortMessage();
                    }else if(localStorage.getItem('state') == true || localStorage.getItem('state') == "inputMes"){
                      this.sendShortMessage();
                    }
                }else if(this.$route.params.transforValue == true || this.$route.params.meg == 'mes-find'){
                  this.sendShortMessage();
                }else{
                  //新设备登录
                  //console.log(this.mobile);
                  this.loginData.mobile = this.mobile.replace(/[" "]/g, "");
                  this.loginData.smsCode = this.value;
                  this.loginData.deviceId = "";/*013025009298520*/
                  this.loginData.loginType = '2';
                  login(this.loginData).then(res => {
                    if(res.data.code == 200 || res.data.code == 6110){//成功
                      /*localStorage.setItem("loginTell",this.loginData.mobile);*/
                      localStorage.setItem("userID",res.data.data.id);
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
                    }else{
                      this.backErrorfun(res.data.msg,res.data.code);
                      return false;
                    }
                  },res => {
                    this.backErrorfun(res.data.msg,res.data.code);
                    return false;
                  })
                }

              }
            }
          }else{
            this.value = '';
            this.$refs.keyboard.value = '';
          /*  document.getElementById("mesCaptcha").focus();
            document.activeElement.blur();*/
            this.handleSubmit()
            this.option.show = true
          }
      },
      backErrorfun(msg,code){
        /*document.getElementsByClassName('yzm_mess')[0].innerHTML = msg;
         document.getElementsByClassName('yzm_mess')[0].style.color = 'red'*/
        this.value = '';
        this.$refs.keyboard.value = '';
        document.getElementById("mesCaptcha").focus();
        document.activeElement.blur();
        this.handleSubmit()
        this.option.show = true
       if(code == '1001' || code == '5211'){
          this.error_prompt="tel-message";
          this.mesContent = msg;
          window.document.getElementById("error_sms").style.display = "block";
          return false
        }else if(code == '5214'){
         if(this.title == "该手机号还未注册"){
           this.unReg = true
           return false
         }else{
           this.upperLimit = true;
           return false
         }
       }else{
          this.upperLimit2 = true;
          this.sec_top = msg
          this.back = false
          this.beginGet = true
          return false
        }
      },
      //未注册用户手机验证码上限
      backLogin(){
        this.upperLimit = false;
        this.$router.push({name:'login'});
      },
      //获取语音验证码
      getVoiceCode:function(){
      this.$refs.yzmMask.style = "display:block!important";
        this.$refs.sectionYZM.style = "display:block!important";
      },
      //确认接听语音验证码事件
      voiceYzmJT(){
        this.messageData.retry = 'Y';
        this.$refs.yzmMask.style = "display:none!important";
        this.$refs.sectionYZM.style = "display:none!important";
        this.messageData.type = "2";
        if(this.title != "输入验证码"){
          //忘记密码&新设备登录发送短信验证码
          this.messageData.retry = 'Y';
          if(this.title == "验证码登录" ){
            this.messageData.smsSign = 'login_plat_sms'
          }else if(this.title == "该手机号还未注册"){
            this.messageData.smsSign = 'register_plat_sms'
          }
          sendMess(this.messageData).then(res => {
            if(res.data.code == 200){//成功
              this.opensetInterval();
            }else{
              this.backErrorfun(res.data.msg,res.data.code);
              return false
            }
          },res => {
            this.backErrorfun(res.data.msg,res.data.code);
            return false
          })
        }else{
            this.messageData.smsSign ='reset_plat_login_password_sms';
          //已登录用户发送短信验证码
          sendSmsCode(localStorage.getItem('userID'),this.messageData).then(res => {
            if(res.data.code == 200){//成功
              this.opensetInterval();
            }else{
              this.backErrorfun(res.data.msg,res.data.code);
              return false
            }
          },res => {
            this.backErrorfun(res.data.msg,res.data.code);
            return false
          })
        }
      },
      //语音验证码的取消按钮事件
      canCle:function(){
        this.$refs.yzmMask.style = "display:none!important";
        this.$refs.sectionYZM.style = "display:none!important";
        this.option.show = true
      },
      //操作上限取消事件
      abolish:function(){
        this.upperLimit = false;
        this.option.show = true
      },
      abolish2:function(){
        this.upperLimit2 = false;
        this.option.show = true
      },
      pswIn:function(){
        this.upperLimit = false;
        this.$router.push({name:'password'});
      },
      //当页面跳转时清除定时器
      beforeRouteLeave(to,from,next){
           next();

      },
    }
  }
</script>
<style scoped>
  .yzm{
    width:100%;
    height:100%;
    position:relative;
  }
  .yzm input{
    outline: none;
    height: 30px;
    font-size: 16px;
    letter-spacing: 2px;
    padding: 0 5px;
  }
  .yzm .h3{
    font-size:2.41rem;
    text-align:center;
    color:#2E2A2A;
    padding-top:4rem;
    margin-bottom:0.5rem;
  }
  .yzm .yzm_text{
    font-size:1.16rem;
    color:#7E7A7A;
    display: flex;
    justify-content: center;
  }
  .yzm .yzm_text .mobile_phone{
    color:#2E2A2A;
    font-weight:bold;
  }
  .yzm label{
    display:flex;
    justify-content:center;
  }
  .yzm label ul{
    margin:1.8rem auto;
  }
  .yzm .field-wrap {
    list-style: none;
    display: block;
    width: 4.25rem;
    height: 4.25rem;
    line-height: 4.25rem;
    font-size: 16px;
    margin: 2px;
    float:left;
    text-align:center;
    border:solid 1px #E5E5E5;
    border-radius:4px;
    color:#2E2A2A;
  }
  .yzm .field-wrap:nth-of-type(-n+3){
    margin-right:1.25rem;
  }
  .yzm .char-field {
    font-style: normal;
  }
  .yzm .input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
  .yzm .inputYZm{
    transform:translateX(-9px);
    text-align: center;
  }
  .yzm .send_yzm{
    color: #BBB7B7;
    font-size: 1.16rem;
    text-align: center;
    height: 94pt;
    display: flex;
    justify-content: center;
  }
  .yzm .yzm_resend,.yzm_voice_get{
    color:#FA8C16;
  }
  .send_yzm .n_receivedYZM{
    /*width:30%;*/
    text-align:center;
    color:#FA8C16;
    font-size:1.3px;
  }
  .sbd_yzmDAD{
    padding: 1rem 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
    z-index: 100;
    bottom: 17rem;
    position: absolute;
  }
  .yzm .section_yzm_wrap{
    display:flex;
    justify-content:center;
  }
  .yzm .section_yzm{
    left:50%;
    margin-left:-11.25rem;
    display:none;
    position:absolute;
    top:18rem;
    width:22.5rem;
    height:10.5rem;
    z-index:6666;
    background:#fff;
    border-radius:6px;
  }
  .yzm section .voice_yzm{
    width:19rem;
    height:3rem;
    margin-top:1.6666rem;
    margin-left:1.75rem;
    background:#fff;
    font-size:1.25rem;
    text-align:center;
    color:#2E2A2A;
  }
  .yzm section .hr{
    width:22.5rem;
    height:1px;
    background:#E5E5E5;
    margin-top:1.66rem;
  }
  .yzm section .yzm_alert{
    width:100%;
    height:2.5rem;
    padding:0.83rem 0;
  }
  .yzm section .yzm_alert div{
    float:left;
    width:11.2rem;
    height:2.58rem;
    line-height:2.58rem;
    text-align:center;
    font-size:1.333333rem;
  }
  .yzm .yzm_alert .yzm_confirm_answer{
    color:#D46B08;
    border-left:solid 1px #E5E5E5;
  }
  .yzm #mesContent{
    display:block!important;
    margin-top:2rem;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .yzm .h3{
      padding-top: 3rem!important;
    }
    .yzm label ul{
      margin:3rem auto;
    }
    .yzm #mesContent{
      margin-top:0.1rem;
    }
    .yzm .section_yzm{
      top: 16rem!important;
    }
    .yzm .send_yzm{
      height: 94pt;
    }
  }
  /*弹出框*/
  .yzm .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
  }
  .yzm .mask .Popup{
    position: absolute;
    bottom: 0.75rem;
    left: 0;
    font-size: 1.5rem;
  }
  .yzm .mask .Popup .Retrieve {
    margin: 0 0.75rem;
  }
  .yzm .mask .Popup .btnline {
    border-bottom: 1px solid #E5E5E5;
    border-radius: 1rem 1rem 0 0;
  }
  .yzm .mask .Popup .btnline-x {
    border-radius: 0 0 1rem 1rem;
  }
  .yzm .mask .Popup p {
    background: #fff;
    line-height: 4.1666667rem;
  }
  .yzm .mask .Popup .cancel {
    margin-top: 0.583333333rem;
  }
  .yzm .mask .Popup .cancel p {
    margin: 0 0.75rem;
    border-radius: 1rem;
    color: #969191;
  }
  /*重新发送的或左右的距离*/
  .send_yzm .yzm_resend{
    padding-right: 0.5rem;
  }
  .send_yzm .yzm_voice_get{
    padding-left: 0.5rem;
  }
  .field-wrap .char-field{
    height: 3rem;
    line-height: 4rem;
  }
  .tel-mess .juzhong #error_sms{
    display: block!important;
    margin-top: 2.4rem;
  }
</style>


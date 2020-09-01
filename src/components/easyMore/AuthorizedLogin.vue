<template>
    <div class="AuthorizedLogin width height">
      <div class="AuthorizedLogin_title pd1083">
        <div class="AuthorizedLogin_title_font font-col-b padTop-308">智惠嘉授权登录</div>
        <div class="AuthorizedLogin_mask bg-ff fl" v-if="PswLogin">
          <div class="AuthorizedLogin_mask_top bd-btm fl width">
            <input ref="PhoneNumberFocus" v-model="PhoneNumber" type="tel" style="width: 80%;" placeholder="请填写手机号码" pattern="[0-9]*" v-focus />
            <img @click="clearLogin" v-show="PhoneNumber" class="fr AuthorizedLogin_mask_top_img" src="../../assets/img/clean.png" />
          </div>
          <div class="AuthorizedLogin_mask_btm width fl bd-btm">
            <input v-if="loginPass" type="password" ref="loginPassFocus" style="width: 80%;" v-model="loginPsw" placeholder="请填写密码" />
            <input v-else="!loginPass" type="text" ref="loginPassFocus" style="width: 80%;" v-model="loginPsw" placeholder="请填写密码" />
            <div class="fr" style="padding-top: 0.6rem;">
              <div class="fl AuthorizedLogin_mask_btm_clean">
                <img v-show="loginPsw" @click="loginPswClean" src="../../assets/img/clean.png" />
              </div>
              <div class="fr AuthorizedLogin_mask_btm_eyes" @click="switchEyes">
                <img v-if="Eyes" src="../../assets/img/closeEyes.png" />
                <img v-else="!Eyes" src="../../assets/img/openEyes.png" />
              </div>
            </div>
          </div>
          <div class="AuthorizedLogin_mask_login fl width cont font-col-b font-133" ref="login_btn" @click="passlogin">登录</div><!--密码登录-->
          <div class="fl width font-108" style="opacity: 1;padding-top: 0.7rem;">
            <div @click="toAuthorizedPsw" class="fl font-7b7">忘记密码</div>
            <div @click="switchLogin" class="fr font-EB">验证码登录</div>
          </div>
        </div>
<!--图形验证码登录-->
        <div class="AuthorizedLogin_mask bg-ff fl" v-if="!PswLogin">
          <div class="AuthorizedLogin_mask_top bd-btm fl width">
            <input ref="PhoneNumberFocus1" maxlength="13" v-model="PhoneNumber1" style="width: 80%;" type="tel" placeholder="请填写手机号码" pattern="[0-9]*" v-focus />
            <img @click="clearLogin1" v-show="PhoneNumber1" class="fr AuthorizedLogin_mask_top_img" src="../../assets/img/clean.png" />
          </div>
          <div class="AuthorizedLogin_mask_model">
            <div class="AuthorizedLogin_mask_top bd-btm fl width">
              <input ref="input" v-model="Graphical" placeholder="请填写图形验证码" @blur="checkLpicma"/>
              <span class="captcha_img" @click="VerificationCode" v-if="code.type == 'text'">{{code.value}}</span>
              <img @click="VerificationCode" class="fr AuthorizedLogin_mask_top_img_yzm" :src="code.src" alt="验证码" />
            </div>
          </div>
          <div class="AuthorizedLogin_mask_btm width fl bd-btm">
            <input type="text" v-model="SMSCode" placeholder="请填写验证码" />
            <div v-if="RegainValueN" class="fr">
              <div v-if="VerificationShow " class="fr font-7b7" @click="VerificationObtain" style="padding-top: 0.2rem;" ref="getsmsMes">获取验证码</div>
              <div v-else="!VerificationShow" class="fr">已发送(<span id="inputValue">{{auth_time}}s)</span></div>
            </div>
            <div v-else="!RegainValueN" id="RegainV" class="fr font-EB" @click="RegainTime">重新获取</div>
          </div>
          <div class="AuthorizedLogin_mask_login fl width cont font-col-b font-133" ref="SMS_btn" @click="SMSlogin">登录</div><!--验证码登录-->
          <div class="fl width font-108" style="padding-top: 0.7rem;">
            <div @click="switchLogin" class="fr font-EB">密码登录</div>
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
  import {login,queryIsNewDeviceLogin} from '@/api/user/loginReg'/*登录接口*/
  var code ; //在全局定义验证码
  import {sendMess} from '@/api/user/loginReg'/*验证码*/
  export default {
    name: 'bg-login',
    data() {
      return {
        Eyes:true,
        RegainValueN:true,/*是否显示  重新获取  几个字*/
        PhoneNumber:'',/*手机号*/
        PhoneNumber1:'',/*图形验证码手机号*/
        loginPsw:'',/*密码*/
        Graphical:'',/*图形验证码的v-model*/
        SMSCode:'',/*短信验证码*/
        loginPass:true,/*显示密码还是点点*/
        PswLogin:true,/*显示密码登录还是图形验证码登录*/
        VerificationShow:true,/*获取验证码文字显示*/
        error_prompt:"",
        content:"",
        loginData:{/*密码登录*/
          mobile:'',
          password:'',
          deviceId:'',/*013025009298520*/
          loginType:'1',//登录方式，1：密码；2：短信验证码
          openId:"",
          source:'3',
          yideduoOpenId:'',
        },
        code: {/*图形验证码*/
          src: "/admin/code",
          value: "",
          len: 4,
          type: "image"
        },
        messageData:{/*发送短信验证码*/
          mobile:'',//注册手机号
          type:'1',//验证码类型，1：短信
          imgCode:'',//图形验证码
          randomStr:'',//图形验证码随机数
          retry:'N',//是否重试
          smsSign:'login_plat_sms',//验证码类型，register_plat_sms ：注册；login_plat_sms：登录，reset_plat_login_password_sms：重置登录密码；reset_plat_pay_password_sms：重置支付密码
        },
        auth_time: 59,/*倒计时*/
      }
    },
    methods:{
      RegainTime(){
        this.messageData.retry = 'Y';
        this.messageData.imgCode = this.Graphical;
        this.RegainValueN = false;
        sendMess(this.messageData).then(res => {
          if(res.data.code == 200){//成功
            this.VerificationShow = false;
            this.opensetInterval();
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
            this.VerificationShow = true;
          }
        },res => {
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      /*to忘记密码页面*/
      toAuthorizedPsw(){
        this.$router.push({
          name:"AuthorizedPsw",
        });
      },
      timer:function() {/*弹框*/
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      clearLogin1(){/*点击清空*/
        this.PhoneNumber1='';
        this.$refs.PhoneNumberFocus1.focus();

      },
      clearLogin(){
        this.PhoneNumber='';
        this.$refs.PhoneNumberFocus.focus();
      },
      loginPswClean(){
        this.$refs.loginPassFocus.focus();
        this.loginPsw='';
      },
      switchEyes(){/*点击小眼睛*/
        this.Eyes = !this.Eyes;
        this.loginPass = !this.loginPass;
      },
      VerificationObtain(){ /*点击获取验证码*/
        if(this.$refs.getsmsMes.className == 'fr font-EB'){
          this.messageData.mobile = this.PhoneNumber1;
          this.messageData.imgCode = this.Graphical;
          sendMess(this.messageData).then(res => {
            if(res.data.code == 200){//成功
              this.VerificationShow = false;
              this.opensetInterval();
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
              this.VerificationShow = true;
            }
          },res => {
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }
      },
      switchLogin(){/*切换登录方式*/
        this.PswLogin = !this.PswLogin
        this.VerificationCode();
      },
      passlogin(){/*密码登录*/
        this.loginData.mobile = this.PhoneNumber;
        this.loginData.password = this.loginPsw;
        this.loginData.loginType = '1';
        this.loginData.source = '3';
        if(this.$format.PhoneFormat(this.PhoneNumber)){
          login(this.loginData).then(res => {
            if(res.data.code == 200){ //成功
              let url = res.data.data.url;
                if(url!=undefined && url!=null && url!=""){
                  window.location.href = url;
                }
              }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res => {
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else{
          this.$message({
            message: "手机号码格式错误",
            type: "error"
          });
        }
      },
      // 图片验证码
      VerificationCode(){
        this.messageData.imgCode = "";
        //生成三位随机数
        this.messageData.randomStr = Math.floor(Math.random () * 900) + 100;
        this.code.src = axios.defaults.baseURL+'/admin/code/'+ this.messageData.randomStr;
        //获取后台验证码
      },
      SMSlogin(){ /*验证码登录*/
        this.loginData.mobile = this.PhoneNumber1;
        this.loginData.smsCode = this.SMSCode;
        this.loginData.loginType = '2';
        this.loginData.source = '4';
        if(this.$format.PhoneFormat(this.PhoneNumber1)){
          login(this.loginData).then(res => {
            if(res.data.code == 200){ //成功
              let url = res.data.data.url;
              if(url!=undefined && url!=null && url!=""){
                window.location.href = url;
              }
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res => {
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else{
          this.$message({
            message: "手机号码格式错误",
            type: "error"
          });
        }
      },
      //启动定时器
      opensetInterval(){
        this.auth_time = 59;
        window.auth_timetimer = setInterval(() => {
          this.auth_time--;
          if(this.VerificationShow = false){
            document.getElementById("inputValue").innerHTML = this.auth_time;
          }
          if (this.auth_time == undefined || this.auth_time <= 0) {/*RegainV*/
            clearInterval(auth_timetimer);
            this.RegainValueN = false
          }else {
            this.RegainValueN = true
          }
        }, 1000);
      },
    },
    watch:{
      PhoneNumber(newValue, oldValue){/*监听密码登录的手机号input框*/
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.PhoneNumber = oldValue;
        }else{
          this.PhoneNumber = newValue;
        }
        this.PhoneNumber=this.PhoneNumber.replace(/([a-z]|[A-Z]|[`~·!！\-@#$￥%^&*……()（）——=.。；;":‘’_+|、\\<>{}\/'[\]])/g,'');
        if(this.PhoneNumber!=undefined && this.PhoneNumber!= '' && this.PhoneNumber!= null){
          if(this.PhoneNumber.length>11){
            this.PhoneNumber = oldValue;
          }else {
            this.PhoneNumber = newValue;
          }
          if(this.loginPsw!=undefined && this.loginPsw!= '' && this.loginPsw!= null){
              if(this.PhoneNumber.length==11){
                this.$refs.login_btn.style.opacity = 1;
              }else {
                this.$refs.login_btn.style.opacity = 0.3;
              }
          }else {
            this.$refs.login_btn.style.opacity = 0.3;
          }
        }else{
          this.$refs.login_btn.style.opacity = 0.3;
        }
      },
      loginPsw(newValue,oldValue){/*监听密码登录的密码框输入*/
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.loginPsw = oldValue;
        }else{
          this.loginPsw = newValue;
        }
        if(this.loginPsw!=undefined && this.loginPsw!= '' && this.loginPsw!= null){
          if(this.loginPsw.length>20){
            this.loginPsw = oldValue;
          }else {
            this.loginPsw = newValue;
          }
          if(this.PhoneNumber!=undefined && this.PhoneNumber!= '' && this.PhoneNumber!= null){
            if(this.PhoneNumber.length==11){
              this.$refs.login_btn.style.opacity = 1;
            }else {
              this.$refs.login_btn.style.opacity = 0.3;
            }
          }else {
            this.$refs.login_btn.style.opacity = 0.3;
          }
        }else{
          this.$refs.login_btn.style.opacity = 0.3;
        }
      },
      PhoneNumber1(newValue, oldValue){/*监听验证码登录的手机号input框*/
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.PhoneNumber1 = oldValue;
        }else{
          this.PhoneNumber1 = newValue;
        }
        this.PhoneNumber1=this.PhoneNumber1.replace(/([a-z]|[A-Z]|[`~·!！\-@#$￥%^&*……()（）——=.。；;":‘’_+|、\\<>{}\/'[\]])/g,'');
        if(this.PhoneNumber1!=undefined && this.PhoneNumber1!= '' && this.PhoneNumber1!= null){
          if(this.PhoneNumber1.length>11){
            this.PhoneNumber1 = oldValue;
          }else {
            this.PhoneNumber1 = newValue;
          }
          if(this.Graphical.length == 4){
            this.$refs.getsmsMes.setAttribute('class',"fr font-EB");
          }else{
            this.$refs.getsmsMes.setAttribute('class',"fr font-7b7");
          }
          if(this.Graphical!=undefined && this.Graphical!= '' && this.Graphical!= null && this.SMSCode!=undefined && this.SMSCode!= '' && this.SMSCode!= null){
              if(this.SMSCode.length == 4 && this.Graphical.length == 4 && this.PhoneNumber1.length == 11){
                this.$refs.SMS_btn.style.opacity = 1;
              }else{
                this.$refs.SMS_btn.style.opacity = 0.3;
              }
          }
        }
      },
      Graphical(newValue,oldValue){/*监听验证码登录的图形验证码框*/
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.Graphical = oldValue;
        }else{
          this.Graphical = newValue;
        }
        this.Graphical=this.Graphical.replace(/([`~·!！\-@#$￥%^&*……()（）——=.。；;":‘’_+|、\\<>{}\/'[\]])/g,'');
        if(this.Graphical!=undefined && this.Graphical!= '' && this.Graphical!= null){
          if(this.Graphical.length>4){
            this.Graphical = oldValue;
            if(this.PhoneNumber1!=undefined && this.PhoneNumber1!= '' && this.PhoneNumber1!= null){
              this.$refs.getsmsMes.setAttribute('class',"fr font-EB");
            }
          }else{
            if(this.PhoneNumber1!=undefined && this.PhoneNumber1!= '' && this.PhoneNumber1!= null){
              if(this.Graphical.length==4){
                this.$refs.getsmsMes.setAttribute('class',"fr font-EB");
              }else{
                this.$refs.getsmsMes.setAttribute('class',"fr font-7b7");
              }
            }
            this.Graphical = newValue;
          }
          if(this.PhoneNumber1!=undefined && this.PhoneNumber1!= '' && this.PhoneNumber1!= null && this.SMSCode!=undefined && this.SMSCode!= '' && this.SMSCode!= null){
              if(this.SMSCode.length==4 && this.Graphical.length==4 && this.PhoneNumber1.length == 11){
                this.$refs.SMS_btn.style.opacity = 1;
              }else{
                this.$refs.SMS_btn.style.opacity = 0.3;
              }
          }
        }
      },
      SMSCode(newValue,oldValue){/*监听验证码登录的短信验证码框*/
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.SMSCode = oldValue;
        }else{
          this.SMSCode = newValue;
        }
        this.SMSCode=this.SMSCode.replace(/([a-z]|[A-Z]|[`~·!！\-@#$￥%^&*……()（）——=.。；;":‘’_+|、\\<>{}\/'[\]])/g,'');
        if(this.SMSCode!=undefined && this.SMSCode!= '' && this.SMSCode!= null){
          if(this.SMSCode.length>4){
            this.SMSCode = oldValue;
          }else{
            this.SMSCode = newValue;
          }
          if(this.PhoneNumber1!=undefined && this.PhoneNumber1!= '' && this.PhoneNumber1!= null && this.Graphical!=undefined && this.Graphical!= '' && this.Graphical!= null){
              if(this.Graphical.length==4 && this.SMSCode.length==4 && this.PhoneNumber1.length == 11){
                this.$refs.SMS_btn.style.opacity = 1;
              }else{
                this.$refs.SMS_btn.style.opacity = 0.3;
              }
          }
        }
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
       if(this.isWeixn()){
         var url=window.location.href.split("?")[1];            /*获取url里"?"后面的值*/
         if(url!=undefined && url!=null && url!=""){
           if(url.indexOf("&")>0){                                      /*判断是否是一个参数还是多个参数*/
             let urlParamArry=url.split("&");                            /*分开每个参数，并放到数组里*/
             for(var i=0; i<urlParamArry.length; i++){
               let paramerName = urlParamArry[i].split("=");   /*把每个参数名和值分开，并放到数组里*/
               if(paramerName[0].indexOf('openid')>0){                     /*匹配输入的参数和数组循环出来的参数是否一样*/
                 this.loginData.yideduoOpenId = paramerName[1];                           /*返回想要的参数值*/
               }
             }
           }else{                                                              /*判断只有个参数*/
             if (url.indexOf('openid') >= 0) {
               let openId = url.substr(url.indexOf('openid') + 7, url.length);
               this.loginData.yideduoOpenId = openId;
             }
           }
         }
      }
    }
  }
</script>
<style>
  .AuthorizedLogin_title{
    height: 12.916rem;
    background: url("../../assets/image/Authorized/img_background_@2x.png") no-repeat 100% 25%;
  }
  .AuthorizedLogin_title_font{
    font-size: 2.083333333rem;
    padding-left: 1.083333rem;
    padding-bottom: 1rem;
  }
  .AuthorizedLogin_mask{
    width:92%;
    border-radius: 0.833333333rem;
    padding: 0.5rem 1.0833333rem 2.6666667rem;
    box-shadow: 0 0 16px -2px rgba(196,104,116,0.54);
  }
  .AuthorizedLogin_mask_top_img{
    width: 1rem;
    padding-top: 0.6rem;
  }
  .AuthorizedLogin_mask_top_img_yzm{
    width: 6rem;
    padding-top: 0;
  }
  .AuthorizedLogin_mask_top ,.AuthorizedLogin_mask_btm{
    padding:1.99233334rem 0 0.5rem;
  }
  .AuthorizedLogin_mask_btm_clean{
    padding-right: 1rem;
    width: 1rem;
  }
  .AuthorizedLogin_mask_btm_eyes{
    width: 1.5rem;
  }
  .AuthorizedLogin_mask_login{
    line-height: 3.433333rem;
    background: #E63950;
    border-radius: 3rem;
    margin: 2rem 0 0;
    opacity: 0.3;
  }
</style>

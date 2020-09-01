<template>
    <div class="ChoiceReset height bg-f6">
        <div class="ChoiceReset-conter width fl">
      <div class="ChoiceReset-Prompt width fl height-4083 font-ipt"><p>{{message}}</p></div>
      <div class="ChoiceReset-main width fl bg-ff">
        <router-link to="/modifypsd"><div class="Original width fl bd-btm height-375" v-show="psw" @click="toModifypsd"><p class="fl OgPadding">原登录密码</p><div class="Original-img fr OgPaddingr"><img src="../../../../assets/img/right.png"></div></div></router-link>
        <div class="SMS bd-btm width fl height-375" @click="messageYZM"><p class="fl OgPadding">手机短信验证</p><div class="SMS-img fr OgPaddingr"><img src="../../../../assets/img/right.png"></div></div>
        <div class="ID width fl height-375" @click="idC" v-show="isShiMing"><p class="fl OgPadding">身份证号验证</p><div class="ID-img fr OgPaddingr"><img src="../../../../assets/img/right.png"></div></div>
      </div>
    </div>
      <div class="tel-mess" id="error-mess" ref="choiceError">
        <div class="telCon-mess">
          <section :class="[error_prompt]" id="error_content">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script>
  import verify from "vue-verify-plugin";
  import {sendSmsCode,queryMemberByMobile} from '@/api/user/loginReg'
  import {queryMemberNew} from '@/api/user/userLogin'
    export default{
        data(){
            return{
              psw:false,
              isShiMing:false,
              meg:'mes-find',
              mess:'reset_plat_login_password_sms',
              message:'选一个方式重置密码',
              error_prompt:"",
              content:"",
              messageData:{
                mobile:'',//注册手机号
                type:'1',//验证码类型，1：短信，2：语音
                imgCode:'',//图形验证码
                randomStr:'',//图形验证码随机数
                retry:'Y',//是否重试
                smsSign:'reset_plat_login_password_sms',//验证码类型，register_plat_sms ：注册；login_plat_sms：登录，reset_plat_login_password_sms：重置登录密码；reset_plat_pay_password_sms：重置支付密码
              }
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
          this.init();
        },
        methods:{
          timer:function(){
            if(this.error_prompt=="tel-message"){
              this.error_prompt="trans";
            }
          },
            //初始化判断是否显示原登录密码
            init(){
              //
              if(this.$route.query.sb == 'false' || this.$route.query.sb == false){
                  this.psw = false;
                  this.message = '选择一种方式来找回密码';
                  this.$root.$data.article = '找回密码';
              }else{
                this.psw = true;
                this.$root.$data.article = '重置登录密码';
              }
              //判断当前用户是否实名，如果实名即显示身份证号验证
              if(localStorage.getItem("userID")!=null && localStorage.getItem("userID") != '' && localStorage.getItem("userID")!= undefined){
                  //if已实名，isShiMing == true
                  //else{isShiMing = false}
                queryMemberNew(localStorage.getItem("userID"),localStorage.getItem('companyId')).then(res => {
                  if(res.data.code == 200){
                    if(res.data.data.identityNo!='' && res.data.data.identityNo!=null && res.data.data.identityNo!=undefined){
                      this.isShiMing = true;
                      localStorage.setItem("identityNo",res.data.data.identityNo);
                    }else{
                      this.isShiMing = false;
                    }
                  }else{
                      this.$message({
                        message: res.data.msg,
                        type: "warning"
                      });
                    this.isShiMing = false
                  }
                },res => {
                  this.isShiMing = false
                })
              }else{
                  //手机号验证是否实名
                let title = localStorage.getItem("loginTell").replace(/[" "]/g, "");
                if(title!=null && title!= '' && title!= undefined){
                  queryMemberByMobile(title).then(res => {
                    if(res.data.code == 200){
                      if(res.data.data.identityNo!='' && res.data.data.identityNo!=null && res.data.data.identityNo!=undefined){
                        this.isShiMing = true;
                        localStorage.setItem("identityNo",res.data.data.identityNo);
                      }else{
                        this.isShiMing = false;
                      }
                    }else{
                      this.$message({
                        message: res.data.msg,
                        type: "warning"
                      });
                      this.isShiMing = false
                    }
                  },res => {
                    this.isShiMing = false;
                  });
                }
              }
            },
          //to原登录密码页面
          toModifypsd(){
          },
          //点击短信验证
          messageYZM(){
            //用户找回登录密码
              if(this.psw == false){
                this.$router.push({
                  name:"captcha",
                  params:{
                    mes:this.meg,
                    smsSign:this.mess,
                    tel:this.$route.params.tel,
                  }
                })
              }else{
                  //用戶重置登錄密碼
                  this.messageData.mobile = localStorage.getItem('loginTell').replace(/[" "]/g, "");
                //已登录用户发送短信验证码
                this.messageData.retry = 'N';
                sendSmsCode(localStorage.getItem('userID'),this.messageData).then(res => {
                  if(res.data.code == 200){
                    this.$refs.choiceError.style.display = 'none'//成功
                    this.$router.push({
                      name:'messageCaptcha',
                      params:{
                        messageData:this.messageData,
                        state:"inputMes",
                        transforValue:false,
                      }
                    });
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
          backErrorfun(msg){
            this.error_prompt="tel-message";
            this.content = msg;
            window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
            document.getElementById('error_content').style.color = 'red'
          },
          //身份证验证
          idC(){
              //找回密码
            if(this.psw == false){
              this.$router.push({
                name:"verificationID",
                /*query:{id:'sfz-find'},*/
                params:{id:'sfz-find'}
              })
            }else{
                //重置密码
              this.$router.push({
                name:"verificationID",
                /*query:{id:'sfz-reset'},*/
                params:{id:'sfz-reset'}
              })
            }

          }
        }
    }
</script>
<style>
  .ChoiceReset-conter{
    font-size: 1.25rem;
  }
  .ChoiceReset-Prompt p{
    padding:0 1.666666667rem;
    font-size: 1.25rem;
  }
  .ChoiceReset-main .OgPadding{
    padding-left: 1.5rem;
    font-size: 1.25rem;
  }
  .ChoiceReset-main .OgPaddingr{
    padding-right: 1.66667rem;
    width: 0.416rem;
    padding-top: 1.45rem;
  }
  {
    float: left;
    width: 100%;
  }
  .ChoiceReset .tel-mess .telCon-mess{
    justify-content: center;
    display: flex;
  }
  #error_content{
    display: block!important;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
  }
</style>

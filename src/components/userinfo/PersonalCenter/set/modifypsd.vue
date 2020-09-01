<template>
    <div class="Modifypsd bg-ff">
      <div class="Modify-title cont text-center">
        <div class="log-img">
          <p class="Modifypsd-center">重置登录密码</p>
          <p ref="tipS" class="Modifypsd-small font-167 font-ipt tipS">请输入原登录密码</p>
          <p  class="Modifypsd-small font-167 font-ipt font-22d" ref="tipM">密码有误请重新输入</p><!--animated shake -->
          <p  class="Modifypsd-small font-167 font-ipt font-22d" ref="tipL" >密码不能为空</p><!--animated shake -->
        </div>
      </div>
      <div class="Modify-conter bd-bt pst-rlt bd-btm">
        <label class="font-133">密码</label>
        <input v-show="downIcon" class="input" ref="loginPsw1" v-focus placeholder="请输入登录密码" type="password" v-model="pwdInput" clearable maxlength="20" autofocus="autofocus"/>
        <input v-show="!downIcon" class="input" ref="loginPsw2" v-focus placeholder="请输入登录密码" type="text" v-model="pwdInput" clearable maxlength="20" autofocus="autofocus"/>
        <div class="psweyes pst-abs pos-right"  @click="switc">
          <img v-show="downIcon" class="closea" src="../../../../assets/img/closeEyes.png"/>
          <img v-show="!downIcon" class="opena" src="../../../../assets/img/openEyes.png"/>
        </div>
        <div class="passdetele pst-abs" @click="passdetele" v-show="pwdInput"><img src="../../../../assets/img/clean.png"/></div>
      </div>
      <div class="Modify-btn">
        <div class="btn login-btn font-133 font-col-b cont" ref="loginBtn" @click="next(pwdInput)">下一步</div>
      </div>
      <div class="other_resetPsw font-EB width cont font-108" @click="other_resetPsw">其他方式重置密码</div>
      <div class="mask pst-fixed pos-top pos-left width height" v-if="isShow" @click="mask">
        <div class="Popup cont font-s15 pos-left btm-0 width pst-abs">
          <div class="Retrieve">
            <p @click="toSFsetPsw" class="btnline" v-if="isShiMing">身份证验证重置</p>
            <p @click="toTelfsetMes" class="phoneZ">手机验证重置</p>
          </div>
        <div class="cancel"><p>取消</p></div>
        </div>
      </div>
      <!--锁定弹框-->
      <div class="errorT width height" v-show="errorTk">
        <div class="error_mask bg-ff">
          <div class="section_top">账号或密码错误次数过多，请1小时后再试或找回密码</div>
          <div class="section_bottom">
            <div class="qx_set" @click="sure">确定</div>
            <router-link to="/choiceReset"><div class="qx_set qx_Retrieve">其他方式重置</div></router-link>
          </div>
        </div>
      </div>
      <div class="errorT width height" v-show="errorKt">
        <div class="error_mask1 bg-ff">
          <div class="section_top">该账号的操作次数超过上限，请使用其他登录方式</div>
          <div class="section_one" @click="knows">知道了</div>
        </div>
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
  import filter from '../../../../filters/filter.js';
  import verify from "vue-verify-plugin";
  import {checkResetLoginPassword,sendSmsCode} from '@/api/user/loginReg'
  import {queryMemberNew} from '@/api/user/userLogin'
  export default {
    name:'Modifypsd',
    data() {
      return {
        isShow:false,
        downIcon: true,
        isShiMing:false,
        error_prompt:"",
        content:"",
        pwdInput:'',
        c:0,
        errorTk:false,
        errorKt:false,
        mobile:'',
        accessToken:"",
        messageData:{
          type:"1",
          retry:'N',//是否重试
          smsSign:'reset_plat_login_password_sms',//验证码类型，register_plat_sms ：注册；login_plat_sms：登录，reset_plat_login_password_sms：重置登录密码；reset_plat_pay_password_sms：重置支付密码
        }
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
        }
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.init();
    },
    methods:{
      //身份证是否显示
      init(){
          let accessToken = localStorage.getItem("userID");
          if(accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined'){
            queryMemberNew(localStorage.getItem("userID"),localStorage.getItem('companyId')).then(res => {
              if(res.data.code == 200){
                //console.log(res);
                if(res.data.data.identityNo!='' && res.data.data.identityNo!=null && res.data.data.identityNo!=undefined){
                  this.isShiMing = true
                }else{
                  this.isShiMing = false
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
          }else {
            this.ShowIndexMallUrl = false;
            let url = window.location.href;
            if(this.isWeixn()){
              if (url.indexOf('openid') > 0) {
                this.byOpenIdgetInfo(this.getOpenId(url),'modifypsd');
              }else {
                if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
                  this.byOpenIdgetInfo(localStorage.getItem('openId'),'modifypsd');
                }else{
                  //静默授权
                  this.byWechAtgetOpenId('one',"",this.$root.$data.redirect_uri,'modifypsd')
                }
              }
            }else{
              localStorage.setItem("loginToPage", 'modifypsd');
              this.$router.push({name: 'login'});
            }
          }
      },
      hide:function(){
        this.isShow = true;
      },
      mask:function(){
        this.isShow = false;
      },
      switc(){
        this.downIcon=!this.downIcon;
        let arrs = document.getElementsByClassName('input');
        setTimeout(function(){
          for(let i=0;i<arrs.length;i++){
            arrs[i].focus()
          }
        },500)
      },
      knows:function () {
        this.errorKt=false;
      },
      sure:function () {
        this.errorTk=false;
      },
      passdetele:function () {
        this.pwdInput='';
        this.$refs.loginPsw1.focus();
        this.$refs.loginPsw2.focus();
      },
      other_resetPsw(){
        this.isShow = true;
      },
      //手机验证重置密码
      toTelfsetMes(){
        /*this.messageData.mobile = localStorage.getItem('loginTell').replace(/[" "]/g, "");*/
        this.accessToken = localStorage.getItem('userID');
        sendSmsCode(this.accessToken,this.messageData).then(res => {
          if(res.data.code == 200){//成功
            this.$router.push({
              name:'messageCaptcha',
              params:{state:"inputMes"},
            })
            //console.log(this.messageData.imgCode);
          }else{
            this.showError(res.data.msg);
            return false
          }
          //    console.log(res.data);
        },res => {
          this.showError(res.data.msg);
          return false
        })
      },
      //身份证号重置密码
      toSFsetPsw(){
        this.$router.push({name:'verificationID',params:{id:"sfz-reset"}});
      },
      //密码验证
      next:function(){
          if(this.$refs.loginBtn.style.opacity == 1){
              if(localStorage.getItem("userID") != '' && localStorage.getItem("userID") != null && localStorage.getItem("userID") != undefined){
                if(localStorage.getItem("loginTell")!='' && localStorage.getItem("loginTell")!= null && localStorage.getItem("loginTell")!=undefined){
                  this.mobile = localStorage.getItem("loginTell").replace(/[" "]/g, "");
                  this.$refs.loginBtn.style.opacity = 0.3;
                  checkResetLoginPassword(localStorage.getItem("userID"),this.pwdInput).then(res => {
                    if(res.data.code == 200){
                      this.$router.push({
                        name:'modifySetpsw',
                        params:{
                          tell:this.pwdInput
                        }
                      });
                    }else{
                      this.$refs.loginBtn.style.opacity = 1;
                      this.showError(res.data.msg);
                    }
                  },res => {
                    this.$refs.loginBtn.style.opacity = 1;
                    this.showError(res.data.msg);
                  })
                }
              }else{
                //alert("您当前未登录，请先登录");
                this.$router.push({name:"login",})
              }
          }else{
            this.$refs.loginPsw1.focus();
            this.$refs.loginPsw2.focus();
          }

      },
      showError(conent){
        this.$refs.tipS.style.cssText = "display:none!important";
        /*this.$refs.tipM.display = 'block'*/
        this.$refs.tipM.innerHTML = conent;
        this.$refs.tipM.style.cssText = "display:block!important";
        this.$refs.tipL.style.cssText = "display:none!important";
      },
      other_resetPsw(){
        this.$router.go(-1);
      }
    },
    watch:{
      pwdInput:function (newValue,oldValue) {
        if(this.pwdInput.length>0){
          this.$refs.loginBtn.style.opacity = 1
          let pattern_chin1 = /[\u4e00-\u9fa5]/g;
          if(newValue.match(pattern_chin1)!=null){
            this.pwdInput = oldValue;
            if(this.pwdInput == ""){
              this.$refs.loginBtn.style.opacity = 0.3
            }else{
              this.$refs.loginBtn.style.opacity = 1
            }
          }
        }else{
          this.$refs.loginBtn.style.opacity = 0.3
        }
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/login.css";/*
  @import "../../../../assets/css/public.css";*/
  #massage_error{
    display: block!important;
    margin-top: 0;
  }
  .Modifypsd .psweyes{
    width: 1.2rem;
    bottom: 1.2rem;
  }
  .Modifypsd .Modify-title {
    padding: 5.66666667rem 0 3rem;
  }
  .Modifypsd .Modify-title .Modifypsd-center{
    margin-bottom:0.2rem;
    font-size: 2.41666667rem;
  }
  .input::-webkit-input-placeholder {
               color: #BBB7B7;
               font-size: 1.3333333rem;
         }

  .Modifypsd .Modify-title .Modifypsd-small{
    display:none;
  }
  .Modifypsd .tipS{
    display:block!important;
  }
  .Modify-conter{
    margin: 0 1.08333333rem 2.33333333rem;
    padding-bottom: 0.66666667rem;
  }
  /*小叉號*/
  .Modifypsd .passdetele{
    width: 1.0833333rem;
    right: 2rem;
    top: 0.5rem;
  }
  /*btn*/
  .Modifypsd .Modify-btn{
    margin: 0 1.083333333rem;
  }
  .Modifypsd .Modify-btn .btn{
    line-height: 3.83333333rem;
    background: linear-gradient(to right,#FAAD14, #FA8C16);
    opacity: 0.3;
    border-radius: 4px;
  }
  .Modifypsd .retrieve{
    padding-top: 1.25rem;
    color: #FA8C16;
  }
  .Modifypsd .other_resetPsw{
    padding: 1rem 0;
  }
  /*弹出框*/
  .Modifypsd .mask{
    background: rgba(0,0,0,.4);
  }
  .Modifypsd .Popup p{
    background: #fff;
    line-height: 4.1666667rem;
  }
  .Modifypsd .Popup .cancel{
    margin-top: 0.583333333rem;
  }
  .Modifypsd .Popup .Retrieve{
    margin: 0 1rem;
  }
  .Modifypsd .Popup .Retrieve  p:nth-of-type(1){
    border-bottom:1px solid #E5E5E5;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }
  .Modifypsd .Popup .Retrieve .phoneZ{
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
  .Modifypsd .Popup .cancel p{
    border-radius: 1rem;
    margin: 0 1rem 0.75rem;
    color: #969191;
  }
  /*input长度*/
  .Modifypsd .Modify-conter .input{
    width: 22rem;
    padding-left: 1rem;
  }
  /*锁定1小时弹框*/
  .Modifypsd .errorT{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    z-index: 666;
    justify-content: center;
    display: flex;
  }
  .Modifypsd .errorT .error_mask{
    width: 22.5rem;
    height: 9.25rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .Modifypsd .errorT .error_mask .qx_Retrieve {
    color: #EB7B03;
    border-left: 1px solid #E5E5E5;
  }
  /*锁定一天*/
  .Modifypsd .errorT .error_mask1{
    width: 22.5rem;
    height: 9.25rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .Modifypsd .Modify-conter .input{
      width: 17rem!important;
    }
  }
</style>

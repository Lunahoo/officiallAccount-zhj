<!--suppress ALL -->
<template>
  <div class="bg-login height" @click="CSbgLogin">
    <!--<div class="pst-abs" style="right: 1rem;top: 0rem;font-size: 2rem;z-index: 100;" @click="DropOut" v-show="isShow">×</div>-->
    <div class="login-title text-center cont">
      <!--图标logo区-->
      <div class="log-img" v-if="isShow"><img src="../../../assets/image/Wisdom.png"></div>
      <!--找回密码提示区-->
      <div class="rule cont" v-else="!isShow" style="justify-content: center;">
        <div class="set_loginPSW">输入手机号</div>
        <!--<div class="rule">-->
        <div v-show="initShow" class="acc">请输入需要找回密码的手机号</div>
        <div v-show="!initShow" class="acc font-22d">手机号格式错误，请重新输入</div>
        <!--</div>-->
      </div>
    </div>
    <div class="text-center2 bd-bt2">
      <label class="login-label">手机号</label><!--@keyup.space="SpaceOption"监听删除事件-->
      <input v-if="!isShow" ref="input" maxlength="13" v-model="dataPhone" type="tel" placeholder="输入手机号" pattern="[0-9]*" v-focus id="tel" :class="font" class="login-tel" @blur="telFormat"/>
      <input v-else="isShow" ref="input" maxlength="13" v-model="dataPhone" type="tel" placeholder="输入手机号，直接注册或登录" pattern="[0-9]*" v-focus id="tel" :class="font" class="login-tel" @blur="telFormat"/>
      <div class="logindetele" @click="logindetele" v-show="dataPhone"><img src="../../../assets/img/clean.png"/></div>
      <!--向上向下两个箭头-->
      <div class="psweyes" @click="open"><!-- v-show="dataPhone<1"-->
        <img class="closea" v-show="!downIcon" src="../../../assets/img/open.png"/>
        <img class="opena" v-show="downIcon" src="../../../assets/img/TakeUp.png"/>
      </div>
    </div>
    <!-- <section :class="[error_prompt]" id="error_prompt">{{content}}</section>-->
    <div class="login-btn text-center">
      <!--@click="this.loginTel(dataPhone)"-->
      <ul>
        <li v-for="val in cptArr" class="history bd-btm height-325" v-if="downIcon">{{val}}</li><!---->
      </ul>
      <div class="bt-font1 bt-color bt-next history-top" style="opacity: 0.3" ref="loginBtn" @click="goParam">下一步</div>
    </div>
    <div class="tel-mess" ref="history">
      <div class="juzhong">
        <section :class="[error_prompt]" id="error_tel">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import filter from '../../../filters/filter.js';
  import Vue from "vue";
  import verify from "vue-verify-plugin";
  import axios from 'axios';
  import {logintel} from '@/api/user/loginReg'
  import {character} from "../../../assets/js/format"
  /* import {enter_token} from "././router/api"*/
  //  Vue.prototype.$reqs = router;

  Vue.use(verify,{
    blur:true
  });
  export default {
    name:'bg-login',
    data() {
      return {
        font:"",
        isShow:true,//显示的头像
        initShow:true,//提示文字
        dataPhone: '',
        show:true,
        error_prompt:"",
        content:"",
        static:"jiu",   //模拟数据
        new:"xin",      //模拟数据
        downIcon:false,
        arr:[],/*'174 **** **41','173 **** **41','135 **** **41','179 **** **41'*/
        userName:'',
        phoneNumber:'',
        formData:{
          mobile: '',
        }
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
          /*document.getElementsByClassName("bt-font1")[0].style.cssText="opacity:.3!important";*/
        }
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '';
      this.init();
      if(this.$route.query.pas != '' && this.$route.query.pas != null && this.$route.query.pas != undefined){
        this.isShow = false
      }
    },
    methods:{
      /*点击空白处失焦*/
      CSbgLogin(){

      },
      //监听删除事件
      SpaceOption(){

      },
      DropOut(){
        this.$router.go(-1);
      },
      //初始化判断找回密码还是登录注册
      init(){
        //动态修改5下面placeholder的大小
//        if(window.screen.width <= 375){
//            this.font = "font-075";
//        }else{
//          this.font = "";
//        }
        //console.log(localStorage.getItem("loginTell"));
        if(localStorage.getItem("loginTell") == null){
          this.isShow = true;
        }else if(this.$route.query.pas == "findPSW" && localStorage.getItem("loginTell") != null){
          this.isShow = false;
          this.dataPhone = localStorage.getItem("loginTell");
        } else{
          this.dataPhone = localStorage.getItem("loginTell");
        }
      },
      open() {
        this.downIcon=!this.downIcon;
        this.$refs.history.style.display="none"
      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      logindetele:function () {/*点击❌清空input*/
        this.dataPhone='';
        this.$refs.input.focus();
        /* document.getElementsByClassName("bt-font1")[0].style.cssText="opacity:.3!important";*/
        window.document.getElementsByClassName("tel-mess")[0].style.display = "none";
      },
      //传值到password页面判断新旧设备
      goParam:function(){
        if(this.$refs.loginBtn.style.opacity == 1){
          //保存账号信息
          localStorage.setItem("loginTell",this.dataPhone);
          localStorage.setItem("userID",'');
          localStorage.setItem("identityNo",'');
          let self = this;
          //在按钮高亮的情况下判断是找回密码的情况还是注册登录的情况
          if(this.isShow == false){ //找回密码
            if(this.dataPhone!= '' && this.dataPhone!= null && this.dataPhone!=undefined){
              if(this.$format.PhoneFormat(this.dataPhone) == false){
                this.initShow = false;
              }else{
                this.formData.mobile = this.dataPhone.replace(/[" "]/g, "")
                this.$refs.loginBtn.style.opacity = 0.3;
                logintel(this.formData).then(res => {
                  if (res.data.code == 5310) { //账号不存在，未注册
                    self.error_prompt="tel-message";//失焦不弹出弹框
                    self.content = "账号不存在，请重新输入.";
                    window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                    document.getElementById('tel').style.color = 'red'
                    self.$refs.loginBtn.style.opacity = 1;
                  } else if (res.data.code == 5110) { //账号已存在
                    self.$router.push({
                      name:'choiceReset',
                      query:{sb:this.isShow},
                      params:{tel:this.dataPhone}
                    })
                  }else{
                    self.error_prompt="tel-message";//失焦不弹出弹框
                    self.content = res.data.msg;
                    window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                    document.getElementById('tel').style.color = 'red';
                    self.$refs.loginBtn.style.opacity = 1;
                  }
                },res => {
                  self.error_prompt="tel-message";//失焦不弹出弹框
                  self.content = res.data.msg;
                  window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                  document.getElementById('tel').style.color = 'red';
                  self.$refs.loginBtn.style.opacity = 1;
                });
              }
            }
          }else{
            //去除字符串中间的空格
            if(this.dataPhone!= '' && this.dataPhone!= null && this.dataPhone!=undefined){
              if(this.$format.PhoneFormat(this.dataPhone) == false){
                this.error_prompt="tel-message";//失焦不弹出弹框
                this.content = "手机号格式错误，请重新输入";
                window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                document.getElementById('tel').style.color = 'red';
              }else{
                this.formData.mobile = this.dataPhone.replace(/[" "]/g, "");
                this.$refs.loginBtn.style.opacity = 0.3;
                logintel(this.formData).then(res => {
                  //账号不存在，未注册
                  if(res.data.code == 5310){
                    localStorage.setItem('captMes',undefined);
                    self.$router.push({name:'captcha',params:{tel:this.formData.mobile,status:'reg'}});
                  }else if(res.data.code == 5110){//账号已存在
                    self.$router.push({name:'password',params:{tel:this.formData.mobile}});
                  }else{
                    self.error_prompt="tel-message";
                    self.content = res.data.msg;
                    window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                    self.$refs.loginBtn.style.opacity =1;
                  }
                },res => {
                  self.error_prompt="tel-message";
                  self.content = res.data.msg;
                  window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                  self.$refs.loginBtn.style.opacity = 1;
                })
              }
            }
          }
        }else{
          this.$refs.input.focus();
        }
      },
      telFormat:function () {
        if(this.dataPhone!= '' && this.dataPhone!= null && this.dataPhone!=undefined){
          if(this.$format.PhoneFormat(this.dataPhone) == false){
            if(this.isShow == false){
              this.initShow = false
            }else{
              this.initShow = true
              this.error_prompt="tel-message";//失焦不弹出弹框
              this.content = "手机号格式错误，请重新输入";
              window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
              document.getElementById('tel').style.color = 'red'
            }
          }
        }
      }
    },
    computed:{
      cptArr:function(){
        var result=[];
        this.arr.forEach(function(val,index){
          if(val.indexOf(this.dataPhone) != -1){
            result.push(val);
          }
        }.bind(this));
        return result;
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    watch: {
      // 通过watch来设置空格
      dataPhone(newValue, oldValue) {
        document.getElementById('tel').style.color = '#2E2A2A'
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.dataPhone = oldValue;
        }else{
          this.dataPhone = newValue;
        }
        /*自动添加空格*/
        if(this.dataPhone!=null && this.dataPhone!= "" && this.dataPhone!=undefined){
          this.dataPhone = this.$spaceOther.telSpace(newValue,oldValue,this.dataPhone);
        }
        if(this.dataPhone.length>0){
          this.$refs.loginBtn.style.opacity = 1;
        }else{
          this.$refs.loginBtn.style.opacity = 0.3;
          this.initShow = true;
        }

      }
    }
  }
</script>
<style scoped>
  @import "../../../assets/css/login.css";
  .bg-login .acc{
    font-size: 1.166rem;
    color: #7E7A7A;
  }
  .bg-login .set_loginPSW{
    font-size: 2.416rem;
    color: #2E2A2A;
    margin-bottom: 0.416rem;
  }
  .bg-login .psw_new{
    margin:0 1.3333rem;
  }
  .bg-login .login-btn span{
    position: absolute;
    top: .7rem;
    color: #FFFFFF;
    transform: translateX(-2.1rem);
    font-size: 1.6rem;
  }
  .bg-login .hh{
    opacity:1!important;
  }
  .bg-login #error_tel{
    display: block!important;
    margin-top: 1.5rem;
  }
  .bg-login .opcity{
    border-radius: 0.5rem;
  }
  /*居中*/
  .juzhong{
    justify-content: center;
    display: flex;
  }
  /*小叉號*/
  .bg-login .logindetele{
    width: 1.08333333rem;
    position: absolute;
    right: 2rem;
    bottom: 1rem;
  }
  .bg-login .bt-next{
    border-radius: 0.4rem;
  }
  .history{
    font-size: 1.25rem;
    opacity: 1;
    margin-left: 6rem;
  }
  .bg-login .bd-bt2{
    border-bottom: 1px solid #E5E5E5;
    margin-top: 2.83333rem;
    position: relative;
    padding-bottom: 0.426666667rem;
    font-size: 1.25rem;
  }
  .bd-bt2 .login-label{
    padding-right: 2.416666rem;
  }
  .bg-login .text-center2{
    margin: 0 1.3rem 0rem;
  }
  .history-top{
    margin-top: 3.3333rem;
  }
  /*向上向下箭头*/
  .psweyes{
    width: 1.08333333rem;
    position: absolute;
    right: 0;
    bottom: 1.3rem;
  }
  .bt-font1{
    font-size: 1.6rem;
    color: #FFFFFF;
    text-align: center;
    line-height: 3.83rem;
  }
  @media screen and (max-width:321px) {
    .bd-bt2 .login-label{
      padding-right: 1.8rem!important;
    }
    ::-webkit-input-placeholder{
      font-size:1.1rem;
    }
  }
  @media screen and (max-width:815px)and (min-width: 450px){
  }
</style>

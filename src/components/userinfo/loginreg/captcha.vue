<template>
  <div class="captcha" @click="iptKeyboard">
      <!--<div class="captcha cont height-316">
        <img class="captcha_img fl goCaptcha_img" @click="capGoBack" src="../../../assets/img/left.png">&lt;!&ndash;&ndash;&gt;
       &lt;!&ndash; <span class="captcha captcha_size" style="font-size: 1.25rem;padding-right: 1.35rem;">{{article}}</span>&ndash;&gt;
      </div>-->
    <div class="title">
      <p class="titleTop">{{contentH}}</p>
      <p class="titleBtn" ref="titleBtn">{{contentS}}</p>
    </div>
    <div class="captcha">
      <div class="login_content1 ">
        <div class="security-code-wrap">
          <label for="code">
            <ul class="security-code-container fl">
              <li class="field-wrap mg-l" v-for="(item, index) in number" :key="index">
                <i class="char-field">{{picLyanzhengma[index] || placeholder}}</i>
              </li>
            </ul>
          </label>
          <input ref="keyboard" class="input-code yanzhengma_input" @keyup="handleInput($event)" v-model="picLyanzhengma"
                 id="code1" name="code" type="text" :maxlength="number"
                 autocorrect="off" autocomplete="off" autocapitalize="off" @blur="checkLpicma" @focus="onFocus" v-focus>
          <Keyboard :option="option" @keyVal="getInputValue" @close="option.show = true"></Keyboard>
          <span class="captcha_img" @click="createCode" v-if="code.type == 'text'">{{code.value}}</span>
          <img :src="code.src" alt="验证码" class="captcha_img" @click="createCode" v-else/>
          <!--<input type="button" id="code" />--> <br> <!--  class="verification1 fr"-->
        </div>

      </div>
    </div>
    <div class="tel-mess">
      <section :class="[error_prompt]" id="content">{{content}}</section>
    </div>
    <div class="change_Fpsw cont font-108 bd-top " @click="cgFpsw" v-show="change">换个方式找回密码</div>
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
  function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };
/*  import $ from 'jquery';*/
  import Keyboard from '../../keyboard.vue'
  var code ; //在全局定义验证码
  import {sendMess} from '@/api/user/loginReg'
  import { randomLenNum } from "../../../util/util";
  import axios from 'axios';
  export default {
    components: {
      Keyboard
    },
    name: 'SecurityCode',
    data () {
      return {
        option: {
          show: true,
          sourceDom: ''
        },
        isappear:false,//放弃注册
       /* article:"图形验证码",*/
        change:false,
        contentH:"",
        contentS:"",
        picLyanzhengma: '',
        content:"",
        error_prompt:"",
        code: {
          src: "/admin/code",
          value: "",
          len: 4,
          type: "image"
        },
        mob:"",
        transforValue:false,   //验证码登录传值
        status:"",//状态值（判断是否是注册流程）
        meg:"",
        messageData:{
          mobile:'',//注册手机号
          type:'1',//验证码类型，1：短信，2：语音
          imgCode:'',//图形验证码
          randomStr:'',//图形验证码随机数
          retry:'N',//是否重试
          smsSign:'register_plat_sms',//验证码类型，register_plat_sms ：注册；login_plat_sms：登录，reset_plat_login_password_sms：重置登录密码；reset_plat_pay_password_sms：重置支付密码
        },
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
         /* el.focus();*/
          var Lists=document.getElementsByClassName('field-wrap');
          Lists[0].style.cssText="border-color:#FA8C16";
        }
      }
    },
    props: {
      number: {
        type: Number,
        default: 4
      },
      placeholder: {
        type: String,
        default: '-'
      }
    },
    methods:{
      iptKeyboard(){
          /*在全局加了一个点击事件让input失焦*/
      },
      getInputValue(val) {
        if(val === 'delete'){
          this.picLyanzhengma = this.picLyanzhengma.slice(0,this.picLyanzhengma.length -1)
        }else{
          this.picLyanzhengma += val
        }
      },
      //放弃注册
      gu:function(){
        this.isappear = false;
        this.$router.push({path:"/login"})
      },
      //继续注册
      continueLogin(){
        this.isappear = false;
      },
      //返回按钮
      capGoBack(){
          if(this.$route.params.status!=undefined && this.$route.params.status == 'reg'){
            this.isappear = true
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
      onFocus() {
        this.$set(this.option, 'show', true)
        this.$set(this.option, 'sourceDom', this.$refs['keyboard'])
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
        //console.log(doc.setSelectionRange)
        doc.focus()
        doc.setSelectionRange(1,3)
      },
      //初始化判断页面是否有传值
      init(){
          if(localStorage.getItem('loginTell')!=undefined && localStorage.getItem('loginTell')!=null && localStorage.getItem('loginTell')!=''){
            this.messageData.mobile = localStorage.getItem('loginTell').replace(/[" "]/g, "");
          }
        if(this.$route.params.mes == "mes-Yzm" || this.$route.params.mes == 'mes-find'){ //用户通过验证码登录的情况
          this.contentH = "输入验证码";
          this.contentS = "请输入图形验证码以接收手机验证码";
          this.transforValue = true;
          if(this.$route.params.mes == "mes-Yzm"){
            this.meg = "mes-Yzm"
            this.change = false;
          }else if(this.$route.params.mes == 'mes-find'){
            this.meg = "mes-find"
            this.change = true;
          }
          localStorage.setItem('captMes',this.$route.params.mes);
        }else if(localStorage.getItem('captMes')!=undefined && localStorage.getItem('captMes')!='undefined' && localStorage.getItem('captMes')!='' && localStorage.getItem('captMes')!=null && localStorage.getItem('captMes')!='unll'){
          this.contentH = "输入验证码";
          this.contentS = "请输入图形验证码以接收手机验证码";
          this.transforValue = true;
          if(localStorage.getItem('captMes') == "mes-Yzm"){
            this.meg = "mes-Yzm"
            this.change = false;
          }else if(localStorage.getItem('captMes') == 'mes-find'){
            this.meg = "mes-find"
            this.change = true;
          }
        }else{
          this.contentH = "该手机号还未注册";
          this.contentS = "请输入图形验证码，注册成为新用户";
          this.change = false;
          this.messageData.mobile = this.$route.params.tel;
          this.messageData.smsSign = 'register_plat_sms';
        }
      },
      //换个方式找回密码
      cgFpsw(){
        this.$router.push({
          name: "choiceReset",
          query:{
            sb:false
          }
        })
        /* query:{
         sfz:'sfz-find'
         }*/
      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      // 图片验证码
      createCode(){
        this.messageData.imgCode = "";
        //生成三位随机数
        this.messageData.randomStr = Math.floor(Math.random () * 900) + 100;
        this.code.src = axios.defaults.baseURL+'/admin/code/'+ this.messageData.randomStr;
        //获取后台验证码
      },
      // 失焦验证图和密码
      checkLpicma(){
          if(this.picLyanzhengma.length == 4){
              this.messageData.imgCode = this.picLyanzhengma;
              if(this.contentH == "输入验证码" && this.change == true){
                this.messageData.smsSign = "reset_plat_login_password_sms";
              }else if(this.contentH == "输入验证码" && this.change == false){
                this.messageData.smsSign = 'login_plat_sms';
              }else if(this.contentH == '该手机号还未注册'){
                this.messageData.smsSign = "register_plat_sms";
              }
              if(this.messageData.mobile!=undefined){
                this.messageData.mobile = this.messageData.mobile.replace(/[" "]/g, "");
              }else {
                  if(localStorage.getItem('loginTell')!=undefined && localStorage.getItem('loginTell')!=''){
                    this.messageData.mobile= localStorage.getItem('loginTell').replace(/[" "]/g, "");
                  }
              }
                sendMess(this.messageData).then(res => {
                  if(res.data.code == 200){//成功
                    if(this.messageData.smsSign != 'reset_plat_login_password_sms'){
                      this.$router.push({
                        name:'messageCaptcha',
                        params:{messageData:this.messageData,state:this.change,smsSign:this.messageData.smsSign,transforValue:this.transforValue,status:this.status,meg:this.meg,fromUrl:"captcha"}
                      })
                    }else{
                      this.$router.push({
                        name:'messageCaptcha',
                        params:{messageData:this.messageData,state:this.change,smsSign:this.messageData.smsSign,transforValue:this.transforValue,meg:this.meg,fromUrl:"captcha"}
                      })
                    }
                    //console.log(this.messageData.imgCode);
                  }else{
                    this.backErrorfun(res.data.msg);
                    return false
                  }
                  //    console.log(res.data);
                },res => {
                  this.backErrorfun(res.data.msg);
                  return false
                })
          }else if(this.picLyanzhengma == '' || this.picLyanzhengma == null || this.picLyanzhengma == undefined){
            this.picLyanzhengma = '';
            this.handleSubmit();
          }else{
          this.handleSubmit();
          return false;
        }
      },
      backErrorfun(msg){
        this.$refs.titleBtn.innerHTML = msg;
        this.$refs.titleBtn.setAttribute('class','fontColor')/*animated shake*/
        this.picLyanzhengma = '';
        document.getElementById("code1").value = '';
        this.handleSubmit();
        this.checkLpicma();
        this.createCode();
      },
      hideKeyboard() {
        // 输入完成隐藏键盘
        document.activeElement.blur(); // ios隐藏键盘
        this.$refs.keyboard.blur() // android隐藏键盘
      },
      handleSubmit() {
        var Lists=document.getElementsByClassName('field-wrap');
        this.$emit('input', this.value);
        if(this.picLyanzhengma.length==0){
          Lists[0].style.cssText="border-color:#FA8C16";
          Lists[1].style.cssText="border-color:#E5E5E5";
          Lists[2].style.cssText="border-color:#E5E5E5";
          Lists[3].style.cssText="border-color:#E5E5E5";
        }else if (this.picLyanzhengma.length==1){
          Lists[1].style.cssText="border-color:#FA8C16";
          Lists[0].style.cssText="border-color:#E5E5E5";
          Lists[2].style.cssText="border-color:#E5E5E5";
          Lists[3].style.cssText="border-color:#E5E5E5";
        }else if (this.picLyanzhengma.length==2){
          Lists[2].style.cssText="border-color:#FA8C16";
          Lists[1].style.cssText="border-color:#E5E5E5";
          Lists[0].style.cssText="border-color:#E5E5E5";
          Lists[3].style.cssText="border-color:#E5E5E5";
        }else if (this.picLyanzhengma.length==3){
          Lists[3].style.cssText="border-color:#FA8C16";
          Lists[2].style.cssText="border-color:#E5E5E5";
          Lists[1].style.cssText="border-color:#E5E5E5";
          Lists[0].style.cssText="border-color:#E5E5E5";
        }else if(this.picLyanzhengma.length==4){
          Lists[0].style.cssText="border-color:#E5E5E5";
          Lists[1].style.cssText="border-color:#E5E5E5";
          Lists[2].style.cssText="border-color:#E5E5E5";
          Lists[3].style.cssText="border-color:#E5E5E5";
        }else if(this.picLyanzhengma.length==0){
          Lists[3].style.cssText="border-color:#E5E5E5";
          Lists[2].style.cssText="border-color:#E5E5E5";
          Lists[1].style.cssText="border-color:#E5E5E5";
          Lists[0].style.cssText="border-color:#FA8C16";
        }
      },
      handleInput(e) {
        this.$refs.keyboard.picLyanzhengma = this.picLyanzhengma;
        if (this.picLyanzhengma.length >= this.number) {
          this.hideKeyboard();
        }
        this.handleSubmit();
      }
    },
    /*checkUserPhone(){
      if(this.userPhone == ''){
        console.log(111);
        $(".hiddenTanchuang").removeClass('hiddenTanchuang')
      }
    },*/
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      this.init();
      this.createCode();
      this.$root.$data.vBack=false;
      if(this.$route.params.status!=undefined){
          if(this.$route.params.status == 'reg'){
            this.contentH = '该手机号还未注册';
            this.status = this.$route.params.status;
            localStorage.setItem('capStatus',this.status);
          }
      }
    },
    watch:{
      picLyanzhengma(){
        this.handleInput();
        if(this.picLyanzhengma.length == 4){
            this.checkLpicma();
        }
      }
    },
  }
</script>
<style scoped>
  @import "../../../assets/css/login.css";
  .captcha input{
    outline: none;
    height: 30px;
    font-size: 16px;
    letter-spacing: 2px;
    padding: 0 5px;
  }
  .captcha .title{
    padding-top:3.666rem;
    text-align: center;
  }
  .captcha .title .titleTop{
    font-size: 2.416rem;
    color: #2E2A2A;
  }
  .captcha .title .titleBtn{
    font-size: 1.166rem;
    color: #7E7A7A;
  }
  .security-code-wrap {
    overflow: hidden;
    margin-top: 5rem;
  }
  .security-code-container {
    display: flex;
    padding-left: 1.516rem;
  }
  .security-code-container li:first-child{
    margin:0;
  }
  .field-wrap {
    width:4rem;
    height:4rem;
    line-height:4rem;
    font-size:25px;
    color:#2E2A2A;
    justify-content:center;
    display:flex;
    border:1px solid #E5E5E5;
    border-radius:5px;
  }
  .char-field {
    font-style: normal;
  }
  .input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
  .read_already a{
    color:#053d84;
  }
  /*登录模块*/
  .login_content1 p{
    margin-top: 30px;
    font-size: 25px;
    line-height: 18px;
    margin-bottom: 15px;
  }
  .login_content1 .yanzhengma_input{
    margin-left: 1.916rem;
    height: 3.55rem;
    border: 1px solid #E5E5E5;
  }
  .login_content1{
    height:4.17rem;
    /*border:1px solid #E5E5E5;*/
    border-radius:4px;
    margin-right:2rem;
  }
  /*弹窗*/
  .tanchuang{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,.5);
    z-index:100;
  }
  .hiddenTanchuang{
    display: none;
  }
  #content{
    display: block!important;
    margin-top: 4.3rem;
  }
  .captcha .change_Fpsw{
    position:absolute;
    /*bottom:0;*/
    left:0;
    width:100%;
    color:#EB7B03;
    height:3.416666rem;
    line-height:3.416666rem;
  }
  .captcha .login_content1 .security-code-wrap .captcha_img{
    border: none;
    width: 8rem;
    height: 4rem;
    border-radius: 4px;
    position: absolute;
    right: 1.5rem;
  }
  .security-code-container .field-wrap i{
    height: 3rem;
    line-height: 4rem;
    font-size: 2rem;
  }
  @media screen and (max-width:321px){
    .login_content1{
      height: 3.2rem!important;
    }
    .field-wrap {
      width: 3rem!important;
      height: 3rem!important;
      line-height: 3rem!important;
    }
    #content {
      margin-top: 3.5rem!important;
    }
    .captcha .login_content1 .security-code-wrap .captcha_img{
      width: 7rem!important;
      height: 3rem!important;
      margin-left: 19rem!important;
    }
    .security-code-container .field-wrap i{
      height: 3rem;
      line-height: 3rem;
    }
  }

 /* @media screen and (max-width:815px)and (min-width: 450px){

    .security-code-container .field-wrap i{
      height: 10rem;
      line-height: 10rem;
    }
    .captcha .login_content1 .security-code-wrap .captcha_img{
      width: 16rem!important;
      height: 10rem!important;
      right: 1.5rem;
    }
    .field-wrap {
      width:10rem;
      height:10rem;
      line-height:10rem;
      font-size: 5rem;
    }
  }*/
</style>

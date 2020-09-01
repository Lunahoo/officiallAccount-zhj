<template>
<div class="setPayment_Psw height">
  <div class="h1">确认支付密码</div>
  <div v-if="seen" class="promptMessage" :class="setPayPswTipsColor">{{setPayPswTips}}</div>
  <div v-else ref="error_mess" class="errorSeen errorMess cont">密码有误请重新输入</div><!--animated shake -->
  <!--密码输入框-->
  <div class="input_box">
    <label for="mesCaptcha">
      <ul class="security-code-container">
        <li class="field-wrap" v-for="(item, index) in number" :key="index">
          <i class="char-field" >{{value[index] || placeholder}}</i>
        </li>
      </ul>
    </label>
    <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value" @blur="mesCaptcha"
           id="mesCaptcha" name="mesCaptcha" type="password"  :maxlength="number"
           autocorrect="off" autocomplete="off" autocapitalize="off" v-focus >
  </div>
</div>
</template>
<script>
  import {checkPayPassword} from "@/api/user/loginReg";
  export default{
    name: 'paymentSet',
    props: {
      number: {
        type: Number,
        default: 6
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        value: '',
        setPayPswTips:"请再次输入",
        accessToken:"",
        setPayPassword:"",
        setPayPswTipsColor:"",
        //   mesContent:"",
        // error_prompt:"",
        seen:true
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
          var List=document.getElementsByClassName('field-wrap');
          List[0].style.cssText="border-color:#FA8C16";
        }
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.accessToken = localStorage.getItem("userID");
    },
    methods:{
      handleSubmit() {
        var List=document.getElementsByClassName('field-wrap');
        this.$emit('input', this.value);
        if (this.value.length==1){
          List[1].style.cssText="border-color:#FA8C16";
          List[0].style.cssText="border-color:#E5E5E5";
          List[2].style.cssText="border-color:#E5E5E5";
          List[3].style.cssText="border-color:#E5E5E5";
          List[4].style.cssText="border-color:#E5E5E5";
          List[5].style.cssText="border-color:#E5E5E5";
        }else if(this.value.length==2){
          List[2].style.cssText="border-color:#FA8C16";
          List[1].style.cssText="border-color:#E5E5E5";
          List[0].style.cssText="border-color:#E5E5E5";
          List[3].style.cssText="border-color:#E5E5E5";
          List[4].style.cssText="border-color:#E5E5E5";
          List[5].style.cssText="border-color:#E5E5E5";
        }else if(this.value.length==3){
          List[3].style.cssText="border-color:#FA8C16";
          List[2].style.cssText="border-color:#E5E5E5";
          List[1].style.cssText="border-color:#E5E5E5";
          List[0].style.cssText="border-color:#E5E5E5";
          List[4].style.cssText="border-color:#E5E5E5";
          List[5].style.cssText="border-color:#E5E5E5";
        }else if(this.value.length==4){
          List[0].style.cssText="border-color:#E5E5E5";
          List[1].style.cssText="border-color:#E5E5E5";
          List[2].style.cssText="border-color:#E5E5E5";
          List[3].style.cssText="border-color:#E5E5E5";
          List[4].style.cssText="border-color:#FA8C16";
          List[5].style.cssText="border-color:#E5E5E5";
        }else if(this.value.length==5){
          List[3].style.cssText="border-color:#E5E5E5";
          List[0].style.cssText="border-color:#E5E5E5";
          List[1].style.cssText="border-color:#E5E5E5";
          List[2].style.cssText="border-color:#E5E5E5";
          List[4].style.cssText="border-color:#E5E5E5";
          List[5].style.cssText="border-color:#FA8C16";
        }else if(this.value.length==0){
          List[3].style.cssText="border-color:#E5E5E5";
          List[0].style.cssText="border-color:#FA8C16";
          List[1].style.cssText="border-color:#E5E5E5";
          List[2].style.cssText="border-color:#E5E5E5";
          List[4].style.cssText="border-color:#E5E5E5";
          List[5].style.cssText="border-color:#E5E5E5";
        }
      },
      retrieve(){
        this.$router.push({path:"/findPsw"});
      },
      handleInput(e) {
        this.$refs.input.value = this.value;
        if (this.value.length >= this.number) {
          this.hideKeyboard();
        }
        this.handleSubmit();
      },
      hideKeyboard() {
        // 输入完成隐藏键盘
        document.activeElement.blur(); // ios隐藏键盘
        this.$refs.input.blur() // android隐藏键盘
      },
      //用户输入内容分给li
      mesCaptcha:function(){
        this.value.toUpperCase();//取得输入的验证码并转化为大写
        if(this.value == ''||this.value == null || this.value == undefined){
          this.value = '';
          document.getElementById("mesCaptcha").focus();
        }else{
            this.setPayPassword = this.value;
          checkPayPassword(this.accessToken,this.setPayPassword).then(res =>{
              if(res.data.code == 200){
                this.$router.push({
                  name:"pawManage"
                })
              }else{
                  this.setPayPswTips = res.data.msg;
                  this.setPayPswTipsColor = "font-22d";
                this.value = '';
              }
          },res =>{
            this.setPayPswTips = res.data.msg;
            this.setPayPswTipsColor = "font-22d";
            this.value = '';
          })
        }

      },

    }
  }
</script>
<style>
  .setPayment_Psw .h1{
    width:100%;
    text-align:center;
    font-size:2.41rem;
    margin-top:3.66rem;
  }
  .setPayment_Psw .promptMessage{
    width:100%;
    font-size:1.16rem;
    text-align:center;
    color:#7E7A7A;
    margin-top:0.5rem;
  }
  /*密码输入框样式设置*/
  .setPayment_Psw .input_box ul{
    display:flex;
    justify-content: center;
    margin: 4rem auto;
  }
  .setPayment_Psw .input-code{
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
  .setPayment_Psw .field-wrap{
    list-style: none;
    display: block;
    width:3.5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 16px;
    margin-right: 1rem;
    float: left;
    text-align: center;
    border: solid 1px #E5E5E5;
    border-radius: 0.4rem;
    color: #2E2A2A;
  }
  .setPayment_Psw .field-wrap:last-of-type{
    margin-right:0!important;
  }
  .setPayment_Psw .errorMess{
    color: #F5222D;
    font-size: 1.16rem;
    margin-top: 0.5rem;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .setPayment_Psw .input_box{
        margin:0 1.5rem!important;
    }
    .setPayment_Psw .input_box ul li{
      height:3rem!important;
      line-height:3rem!important;
    }
  }
</style>

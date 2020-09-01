<template>
  <div class="resetPaymentPsw height">
    <div class="h3 cont">重置支付密码</div>
    <div class="inputPsw cont" :class="className">{{tips}}</div>
    <!--密码输入区-->
    <div class="input_box">
      <label for="mesCaptcha">
        <ul class="security-code-container">
          <li class="field-wrap" v-for="(item, index) in number" :key="index">
            <i class="char-field" >{{value[index] || placeholder}}</i>
          </li>
        </ul>
      </label>
      <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value" @blur="mesCaptcha"
             id="mesCaptcha" name="mesCaptcha" type="text"  :maxlength="number"
             autocorrect="off" autocomplete="off" autocapitalize="off" v-focus >
    </div>
    <!--弹框提示区-->
    <section class="section" v-show="false">
      <div class="section_father">
        <div class="section_wrap">
          <div class="sec_top">支付密码已被锁定请<span ref="timeRun">一小时</span>后再试</div>
          <div class="sec_bottom">
            <div class="sec_cacle" @click="">确定</div>
            <div class="sec_set" @click="">其他方式重置</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default{
      name:"resetPaymentPsw",
      data(){
          return{
             tips:"请输入原支付密码",
             value: '',
            className:"font-ipt",
            a:0
          }
      },
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
    },
    methods:{
      handleSubmit() {
        var List = document.getElementsByClassName('field-wrap');
        this.$emit('input', this.value);
        if (this.value.length == 1) {
          List[1].style.cssText = "border-color:#FA8C16";
          List[0].style.cssText = "border-color:#E5E5E5";
          List[2].style.cssText = "border-color:#E5E5E5";
          List[3].style.cssText = "border-color:#E5E5E5";
          List[4].style.cssText = "border-color:#E5E5E5";
          List[5].style.cssText = "border-color:#E5E5E5";
        } else if (this.value.length == 2) {
          List[2].style.cssText = "border-color:#FA8C16";
          List[1].style.cssText = "border-color:#E5E5E5";
          List[0].style.cssText = "border-color:#E5E5E5";
          List[3].style.cssText = "border-color:#E5E5E5";
          List[4].style.cssText = "border-color:#E5E5E5";
          List[5].style.cssText = "border-color:#E5E5E5";
        } else if (this.value.length == 3) {
          List[3].style.cssText = "border-color:#FA8C16";
          List[2].style.cssText = "border-color:#E5E5E5";
          List[1].style.cssText = "border-color:#E5E5E5";
          List[0].style.cssText = "border-color:#E5E5E5";
          List[4].style.cssText = "border-color:#E5E5E5";
          List[5].style.cssText = "border-color:#E5E5E5";
        } else if (this.value.length == 4) {
          List[0].style.cssText = "border-color:#E5E5E5";
          List[1].style.cssText = "border-color:#E5E5E5";
          List[2].style.cssText = "border-color:#E5E5E5";
          List[3].style.cssText = "border-color:#E5E5E5";
          List[4].style.cssText = "border-color:#FA8C16";
          List[5].style.cssText = "border-color:#E5E5E5";
        } else if (this.value.length == 5) {
          List[3].style.cssText = "border-color:#E5E5E5";
          List[0].style.cssText = "border-color:#E5E5E5";
          List[1].style.cssText = "border-color:#E5E5E5";
          List[2].style.cssText = "border-color:#E5E5E5";
          List[4].style.cssText = "border-color:#E5E5E5";
          List[5].style.cssText = "border-color:#FA8C16";
        } else if (this.value.length == 0) {
          List[3].style.cssText = "border-color:#E5E5E5";
          List[0].style.cssText = "border-color:#FA8C16";
          List[1].style.cssText = "border-color:#E5E5E5";
          List[2].style.cssText = "border-color:#E5E5E5";
          List[4].style.cssText = "border-color:#E5E5E5";
          List[5].style.cssText = "border-color:#E5E5E5";
        }
      },
//      retrieve(){
//        this.$router.push({path:"/findPsw"});
//      },
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
        }else if(this.value.toUpperCase() != "AAAAAA" ) { //若输入的验证码与产生的验证码不一致时
          this.a++;
          this.tips = "密码有误请重新输入";
          this.className = "font-22d";
            this.value = '';
          document.getElementById("mesCaptcha").focus();
          return false;

        }else { //输入正确时
          this.$router.push({path:"/home"});
        }
        console.log(this.a);
      },

    }
  }

</script>
<style>
  .resetPaymentPsw .h3{
    font-size:2.416rem;
    margin-top:3.666rem;
  }
  .resetPaymentPsw .inputPsw{
    font-size:1.166rem;
    margin-top:0.416rem;
  }
  .resetPaymentPsw .input_box ul{
    margin:5.083rem auto;
  }
  .resetPaymentPsw .field-wrap{
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
    border-radius: 4px;
    color: #2E2A2A;
  }
  .resetPaymentPsw .input-code{
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
  .resetPaymentPsw .field-wrap:last-of-type{
    margin-right:0!important;
  }
  .resetPaymentPsw .input_box ul{
    display:flex;
    justify-content: center;
  }
  .resetPaymentPsw .section{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
  }
  .resetPaymentPsw .section_father{
    display:flex;
    justify-content:center;
  }
  .resetPaymentPsw .section_wrap{
    width:22.5rem;
    height:9.25rem;
    background:#fff;
    border-radius:0.53rem;
    margin-top:50%;
  }
  .resetPaymentPsw .sec_top{
    width:100%;
    height:5rem;
    line-height:5rem;
    text-align:center;
    font-size:1.25rem;
    border-bottom:solid 0.083rem #DDDDDD;
  }
  .resetPaymentPsw .sec_bottom{
    padding:0.83rem 0;
    height:2.5rem;
  }
  .resetPaymentPsw .sec_cacle,.sec_set{
    float:left;
    width:49.5%;
    text-align:center;
    line-height:2.5rem;
    font-size:1.33333rem;
  }
  .resetPaymentPsw .sec_cacle{
    color:#969191;
  }
  .resetPaymentPsw .sec_set{
    color:#FA8C16;
    border-left:solid 1px #DDDDDD;
  }
  @media screen and (max-width:321px){
    .resetPaymentPsw .input_box ul{
      margin:5.083rem 1.91rem!important;
    }
    .resetPaymentPsw .input_box ul li{
      height:3rem!important;
    }
  }
</style>

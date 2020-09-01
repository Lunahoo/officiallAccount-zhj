<template>
  <div class="paymentSet height bg-f6">
    <div class="paymentSet_page">
      <div class="zzzf_wrap appear" ref="appear">
        <div class="zzzf">指纹支付</div>
        <div class="zzzf_text">指纹仅对本机有效，开通即视为同意</div>
        <div class="zzzf_agreement" >《指纹相关协议》</div>
      </div>
      <!--右边按钮点击区-->
      <div class="right_btn btn-appear"  ref="btnAppear" @click="alertK">
        <input type="checkbox" class="al-toggle-button" v-model="value2">
      </div>
    </div>
    <!--设置支付密码区-->
    <section class="section" v-show="value1">
      <div class="section_father">
        <div class="section_wrap">
          <div class="sec_top">请先设置支付密码后继续</div>
          <div class="sec_bottom">
            <div class="sec_cacle" @click="canClose">取消</div>
            <div class="sec_set" @click="toSet">去设置</div>
          </div>
        </div>
      </div>
    </section>

    <!--支付密码被锁定，1小时候后再试-->
    <section class="section" v-show="threeTips">
      <div class="section_father">
        <div class="section_wrap">
          <div class="sec_top">支付密码已被锁定请<span ref="timeRun">一小时</span>后再试</div>
          <div class="sec_bottom">
            <div class="sec_cacle" @click="sure">确定</div>
            <div class="sec_set" @click="retrieve">找回密码</div>
          </div>
        </div>
      </div>
    </section>

    <!--开启指纹支付区-->
    <section class="paymentZw mask" v-if="isShow">
      <div class="mask_wrap">
        <div class="payment_top">
          <span @click="mask">×</span>
          <div>开启指纹支付</div>
        </div>
        <div class="payment_bottom ">
          <div class="tips" :class="className">{{tips}}</div>
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
                 id="mesCaptcha" name="mesCaptcha" type="text"  :maxlength="number"
                 autocorrect="off" autocomplete="off" autocapitalize="off" v-focus >
        </div>
          <div class="find_password fr" @click="zhPsw">找回密码</div>
        </div>
      </div>
    </section>
    <!--开启成功提示-->
    <div class="tel-mess" ref="history">
      <div class="juzhong">
        <section :class="[error_prompt]"  id="error_tel">
          <div class="kqSuccess_img" :class="sty"><img src="../../../../assets/img/success.png"></div>
          <div class="kqSuccess" :class="sty">开启成功</div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
//  import jqu from '../../../../assets/js/jquery-1.11.3.js'
  export default {
    name: 'paymentSet',
    data() {
      return {
        phoneType:"",
        c:0,
        value: '',
        error_prompt:"",   //弹框样式赋值
        value1: false,
        value2: false,
        isShow:false,
        threeTips:false,
        className:"font-ipt",
        sty:"opa",
        tips:"请输入支付密码开启指纹支付"
      }
    },
    //设置密码输入区样式
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
    methods: {
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
      retrieve(){
        this.$router.push({
          path:'./forgetPaymentPsw',
          query:{
            sb:"yes",
          }
        });
      },
      //判断设备类型
      iSApp(){
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
                              "SymbianOS", "Windows Phone",
                               "iPad", "iPod"];
        let u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                 this.phoneType = '安卓手机'; //安卓手机
               } else if (u.indexOf('iPhone') > -1) {
                  this.phoneType = '苹果手机'; //苹果手机
               } else if (u.indexOf('Windows Phone') > -1) {
                  this.phoneType = 'winphone手机'; //winphone手机
               }
      },
      timer: function () {
        if (this.error_prompt == "kqSuccessImgWrap") {
          this.error_prompt = "kqSuccess_img_wrap";
        }
      },
      handleInput(e) {
        this.$refs.input.value = this.value;
        if (this.value.length >= this.number) {
          this.hideKeyboard();
        }
        this.handleSubmit();
        console.log(this.value);
      },
      hideKeyboard() {
        // 输入完成隐藏键盘
        document.activeElement.blur(); // ios隐藏键盘
        this.$refs.input.blur() // android隐藏键盘
      },
      zhPsw(){
          this.$router.push({path:"findPsw"});
      },
      //用户输入内容分给li
      mesCaptcha:function(){
        this.value.toUpperCase();//取得输入的验证码并转化为大写
        if(this.value == ''||this.value == null || this.value == undefined){
          this.value = '';
          document.getElementById("mesCaptcha").focus();
        }else if(this.value.toUpperCase() != "AAAA" ) { //若输入的验证码与产生的验证码不一致时
          if(this.c == 3){
              this.value = "";
              this.isShow = false;
            this.threeTips = true;
          }else if(this.c == 4){
            this.c = 0;
          }else{
            this.value = '';
            document.getElementById("mesCaptcha").focus();
            this.c++;
            this.tips = "支付密码错误，还可重新输入"+( 5 - (this.c))+"次";
            this.className = "font-22d";
            return false;
          }
        }else { //输入正确时
          this.$router.push({path:"/home"});
        }
        console.log(this.c);

      },
      //取消键事件
      canClose:function(){
        this.value1 = false;
        this.value2 = false;
      },
      //去设置  开通指纹支付
      toSet:function(){
        this.value1 = false;
        this.value2 = true;
        this.isShow = true;

      },
      alertK:function(){
          if(this.phoneType == "苹果手机"){
            if(this.value2 == true) {
              this.value1 = true;
              //     this.value2 = !this.value2;
            }
          }else{
        this.hp = this.value2;
            if(this.value2 == false) {
              this.value1 = true;
              //     this.value2 = !this.value2;
            }

          }



       //   this.hp = this.value2;

      },
      mask:function(){
        this.isShow = false;
        this.value2 = false;
      },
      //支付密码已锁定--确定事件
      sure(){
        this.threeTips = false;
        this.value2=false;
      }
    },
    created(){

      //  document.getElementById('#mesCaptcha').focus();
      this.$root.$data.vBack=true;
      this.$root.$data.article = '支付设置';
      this.iSApp();
    },
    mounted: function () {
      this.$nextTick(function () {
        setInterval(this.timer, 2000);
      })
    },
  }
</script>
<style>
  .paymentSet{
    /*height:94.4%;*/
  }
  .paymentSet_page ul li:nth-of-type(1){
    background:red!important;
  }
  .paymentSet_page{
    overflow: hidden;
    /*height:3.75rem;*/
    background: #fff;
    width:100%;
    margin-top: 1.5rem;
  }
  .paymentSet_page .zzzf_wrap{
    text-indent:1.5rem;
    font-size:1.25rem;
    display:inline-block;
  }
  .paymentSet .zzzf_text{
    font-size:0.916rem;
    color:#BBB7B7;
  }
  .paymentSet .appear{
    padding:0.75rem 0;
  }
  .paymentSet .btn-appear{
    margin-top:1.9rem;
  }
  .paymentSet .zzzf_agreement{
    font-size:0.916rem;
    color:#605C5C;
    transform:translateX(-4px);
  }
  .paymentSet .readAndAgreen{
      text-indent:1.4rem;
  }
  .paymentSet .margin-t1{
    margin-top:0.4rem;
  }
  .paymentSet .margin-t2{
    margin-top:0.2rem;
  }
  .paymentSet .right_btn{
    float: right;
    margin-right:1.66rem;
    /*margin-top:2.333rem;*/
  }
  .paymentSet{
    width:100%;
    overflow:hidden;
  }
  .paymentSet .section{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
  }
  .paymentSet .section_father{
    display:flex;
    justify-content:center;
  }
  .paymentSet .section_wrap{
    width:22.5rem;
    height:9.25rem;
    background:#fff;
    border-radius:0.53rem;
    margin-top:50%;
  }
  .paymentSet .sec_top{
    width:100%;
    height:5rem;
    line-height:5rem;
    text-align:center;
    font-size:1.25rem;
    border-bottom:solid 0.083rem #DDDDDD;
  }
  .paymentSet .sec_bottom{
    padding:0.83rem 0;
    height:2.5rem;
  }
  .paymentSet .sec_cacle,.sec_set{
    float:left;
    width:49.5%;
    text-align:center;
    line-height:2.5rem;
    font-size:1.5rem;
  }
  .paymentSet .sec_set{
    color:#FA8C16;
    border-left:solid 1px #DDDDDD;
  }
  .paymentSet .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    /*display: none;*/
  }
  .paymentSet .mask_wrap{
    width:100%;
    height: 21rem;
    position:fixed;
    bottom:0;
    background:#fff;
  }
  .paymentSet .payment_top{
    height:4.5rem;
    line-height:4.5rem;
    border-bottom:solid 1px #E5E5E5;
  }
  .paymentSet .payment_top span{
    display:block;
    height:2rem;
    margin-top:1.2rem;
    line-height:2rem;
    float:left;
    font-size:2rem;
    margin-left:0.91rem;
  }
  .paymentSet .payment_top div{
    width:120px;
    font-size:1.5rem;
    display:inline-block;
    margin-left:50%;
    transform:translateX(-85px);
  }
  .paymentSet .payment_bottom{
    margin-top:1rem;
  }
  .paymentSet .payment_bottom .tips{
    width:100%;
    text-align:center;
    font-size:1rem;
  }
  .paymentSet .payment_bottom .input_box ul{
    margin:2rem auto;
  }
  .paymentSet .payment_bottom .field-wrap{
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
  .paymentSet .input-code{
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
  .paymentSet .payment_bottom .field-wrap:last-of-type{
    margin-right:0!important;
  }
  .paymentSet .payment_bottom .input_box ul{
    display:flex;
    justify-content: center;
  }
  .paymentSet .payment_bottom .find_password{
    margin-right:1.5rem;
    color: #FA8C16;
  }
  .paymentSet .tel-mess-wrap{
    display:flex;
    justify-content:center;
  }
  /*弹框样式修改*/
  .paymentSet .kqSuccess_img img{
    width:3rem;
    height:3rem;
    margin-left:50%;
    margin-top:1.5rem;
    transform:translateX(-1.5rem);
  }
  .paymentSet #error_tel{
    display: block!important;
  }
  .paymentSet .kqSuccess_img{
    width:100%;
    height:2.5rem;
  }
  .paymentSet  .kqSuccess{
    width:100%;
    text-align: center;
  }
  .paymentSet .opa{
    opacity:0;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .paymentSet {

    }
    .paymentSet .mask_wrap{
      height:34rem!important;
    }
    .paymentSet .paymentZw .input_box{
      margin:0 1.5rem!important;
    }
    .paymentSet .paymentZw ul li{
        height:3rem!important;
        line-height:3rem!important;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px) {
    .paymentSet {

    }
  }
</style>

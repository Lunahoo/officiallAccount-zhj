<template>
  <div class="safeSet pst-rlt height bg-f6 font-ipt font-167">
    <div class="safeSet_img width bg-ff">
      <img src="../../../../assets/image/safeSet.png">
      <div class="cont">在启动券易销或离开5分钟再进入时 需要指纹/手势解锁</div>
    </div>
    <div class="paymentSet_page width bg-ff">
      <div class="zzzf_wrap font-125 appear" >
        <div class="zzzf">指纹登录</div>
        <div class="zzzf_text font-1 font-7b7" >指纹仅对本机有效，开通即视为同意</div>
        <div class="zzzf_agreement" >《指纹相关协议》</div>
      </div>
      <div class="right_btn fr btn-appear"  @click="fingerLogin" >
        <input type="checkbox" class="al-toggle-button" v-model="value1">
      </div>
    </div>
    <ul>
      <li>
        <section ref="sec_bor" class="sec_bo" :class="c">
          <div class="fl">手势登录</div>
          <div class="gestureLogin fr">
            <input type="checkbox" class="al-toggle-button" v-model="value2" @click="gestureLogin">
          </div>
        </section>
      </li>
      <li ref="resetGesture" @click="resetGesture">
        重置手势
      </li>
    </ul>
    <!--开启成功提示框-->
    <div class="tel-mess" ref="history">
      <div class="juzhong">
        <section :class="[error_prompt]"  id="error_tel">
          <div class="kqSuccess_img" :class="sty"><img src="../../../../assets/img/success.png"></div>
          <div class="kqSuccess width cont" :class="sty">开启成功</div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };
  export default {
    name: "safeSet",
    data() {
      return {
        c: "",
        error_prompt: "",
        sty: "opa",
        value1: false,
        value2: false
      }
    },
    methods: {
      //指纹登录开关
      fingerLogin(){
        if (this.value1 == false) {
          //开启成功弹框提示区
          this.error_prompt = "kqSuccessImgWrap";
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          this.sty = "";
        }
      },
      timer: function () {
        if (this.error_prompt == "kqSuccessImgWrap") {
          this.error_prompt = "kqSuccess_img_wrap";
        }
      },
      //手势登录开关
      gestureLogin(){
        if (this.value2 == true) {
          this.c = "";
          this.$refs.resetGesture.style.display = "none";
        } else {
          this.c = "sec_bor";
          this.$refs.resetGesture.style.display = "block";
        }
      },
      //重置手势链接
      resetGesture(){
          this.$router.push({path:'sSmima'})
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        setInterval(this.timer, 1500);
      })
    },
    created(){
      this.$root.$data.vBack = true;
      this.$root.$data.article = '安全设置';
    }
  }
</script>
<style>
  .safeSet .opa{
    opacity:1;
  }
  .safeSet .kqSuccess_img img{
    width:3rem;
    height:3rem;
    margin-left:50%;
    margin-top:1.5rem;
    transform:translateX(-1.5rem);
  }
  .safeSet #error_tel{
    display: block!important;
    margin-top: -1rem;
  }
  .safeSet .opa{
    opacity:0;
  }
  /*按钮样式区*/
  .safeSet .sec_bo .gestureLogin{
    margin-top: 0.6rem;
    margin-right: 1.16rem;
  }
  /*按钮样式区结束*/
  .safeSet .appear{
    padding:0.75rem 0;
  }
  .safeSet .btn-appear{
    margin-top:2rem;
  }
  .safeSet #telMess1{
    display:none;
  }
  .safeSet .paymentSet_page{
    overflow: hidden;
    margin:1.25rem 0;
  }
  .safeSet .paymentSet_page .zzzf_wrap {
    text-indent: 1.5rem;
    display: inline-block;
  }
  .safeSet .paymentSet_page .zzzf_agreement {
    color: #605C5C;
    -webkit-transform: translateX(-4px);
    transform: translateX(-4px);
  }
  .safeSet .paymentSet_page .right_btn{
    margin-right:1.16rem;
  }
  .safeSet .safeSet_img{
    overflow:hidden;
    padding-top:2.16rem;
  }
  .safeSet_img img{
    margin-left:50%;
    transform:translateX(-7.58rem);
    width:15.16rem;
    height:14.58rem;
  }
  .safeSet .safeSet_img div{
    transform:translateX(-9.15rem);
    width:18.33rem;
    margin:1rem 0 1rem 50%;
  }
  .safeSet ul li{
    padding-left:1.08rem;
    height:3.75rem;
    background:#fff;
    line-height:3.75rem;
    font-size:1.25rem;
  }
  .safeSet ul li section{
    height:3.7rem;
  }
  .safeSet ul li .sec_bor{
    border-bottom:solid 1px #E5E5E5;
  }
  .safeSet ul li .switBtn{
      margin-top:1rem;
    margin-right:1rem;
  }
  .safeSet ul li:last-of-type{
    display:none;
    background:#fff url("../../../../assets/img/right.png") no-repeat 95% 50%;
    background-size: 0.583rem;
  }
  @media screen and (max-width:321px){
    .safeSet{
      height: 93.5%;
    }
    .safeSet_img img {
      margin-left: 59%;
      width: 10.16rem;
      height: 10.58rem;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .safeSet{
      height: 96.4%;
    }
  }
</style>

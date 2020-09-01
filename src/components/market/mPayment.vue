<template>
  <div class="mPayment width height bg-f6" v-wechat-title="$route.meta.title=mPaymentTitle">
    <div class="width bg-ff padTop-408 cont fl">
      <img style="" src="../../assets/image/c/mPayment.png" v-if="successFail == '支付成功'" />
      <img style="" src="../../assets/image/c/icon_paydefeated@2x.png" v-if="successFail == '支付失败'" />
      <p class="font-s15">{{this.successFail}}</p>
      <div class="mPayment-btn font-ffa font-125" @click="mPayment">返回券市场</div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {editInvoiceApply,editCouponBuyApply} from '@/api/aloneC/cInterface';//预开票回调、回调劵申请购买
  export default {
    data () {
      return {
        mPaymentTitle:"",
        content: "",
        error_prompt:"",
        successFail:'',//支付成功
        parameter:{
          applyStatus:'',//申请状态--1:待付款2:付款成功 3:付款失败
          id:'',
          fromCode:'',
        },
        parameter1:{
          invoiceStatus:'',//开票状态：1：待开票，2：开票成功，3：开票失败
          id:'',
        }
      }
    },
    methods: {
      adTimer: function () {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      mPayment(){
        this.$router.push({
          name:"couponMarket",
        })
      }
    },
    created(){
      this.accessToken = localStorage.getItem("userID");
      let url = window.location.href;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        let  str = url.substr(1);
        let strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
      }
      this.parameter.applyStatus = theRequest.state;
      this.parameter.id = theRequest.bizid;
      this.parameter.fromCode = theRequest.tid;
      if(this.parameter.applyStatus=="success"){
        this.mPaymentTitle = "支付成功"
        this.successFail = "支付成功"
        let bizid1 = this.parameter.id.split(",")
        this.parameter.applyStatus = "2";  //开票状态  2是成功
        //id
        this.parameter.id = bizid1[0];     //业务编号
        // 回调劵申请购买接口
        editCouponBuyApply(this.accessToken,this.parameter).then(res =>{
          if(res.data.code == 200){
            this.parameter1.invoiceStatus = "2";//开票状态位成功
            if(bizid1.length == 2){
              //如果返回的是两个就调预开票回调
              this.parameter1.id = bizid1[1];
              editInvoiceApply(this.accessToken,this.parameter1).then(res =>{
                if(res.data.code == 200){
                }else {
                  this.error_prompt = "tel-message";
                  this.content = res.data.msg;
                }
              },res =>{
                this.error_prompt = "tel-message";
                this.content = res.data.msg;
              })
            }
          }else {
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        })
      }else{
        this.mPaymentTitle = "支付失败";
        this.successFail = "支付失败";
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.adTimer,2000);
      })
    },
  }
</script>
<style>
  .mPayment img{
    width: 8.333333333rem;
    justify-content: center;
    display: -webkit-inline-box;
  }
  .mPayment-btn{
    width: 7rem;
    margin: 5.5rem 0 6.25rem 32%;
    border: 1px solid #FFA436;
    padding: 0.4666666667rem 1.4666666667rem;
    border-radius: 3rem;
  }
</style>

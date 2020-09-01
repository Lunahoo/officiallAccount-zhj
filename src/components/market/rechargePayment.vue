<template>
    <div class="mPayment width height bg-f6">
      <div class="width bg-ff padTop-408 cont fl">
        <img style="" :src="stateUrl" />
        <p class="font-s15">支付成功</p>
        <div class="mPayment-btn font-ffa font-125" @click="toCashAccount">返回现金账户</div>
      </div>
    </div>
</template>
<script>
  import {editRecharge} from "@/api/aloneC/cInterface"
  export default {
    data () {
      return {
        stateUrl:require('../../assets/image/c/mPayment.png'),   //   mPayment
        callbackInfo:{
          id:"",
          state:'',     //1:待付款,2:付款成功,3:付款失败
          fromCode:'',
        },
      }
    },
    methods:{
      toCashAccount(){
        this.$router.push({
          name:"cashAccount",
        })
      }
    },
    created(){
      let JFurl = window.location.href;
      let theRequest = new Object();
      if (JFurl.indexOf("?") != -1) {
        let  str = JFurl.substr(1);
        let strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
      }
      let state = theRequest.state;
      this.callbackInfo.id = theRequest.bizid;
      this.callbackInfo.fromCode = theRequest.tid;
      if(state=="success"){
        this.callbackInfo.state = "2";
      }else if(state=="fail"){
        this.stateUrl = require('../../assets/image/c/icon_paydefeated@2x.png');
        this.callbackInfo.state = "3";
      }
      console.log(this.callbackInfo)
      //获取回调
      editRecharge(localStorage.getItem("userID"),this.callbackInfo).then(res =>{
        if(res.data.code == 200){

        }
      },res =>{
        this.error_prompt = "tel-message";
        this.content = res.data.msg;
      })
    }
  }

</script>
<style>
  .mPayment img{
    width: 8.333333333rem;
    justify-content: center;
    display: -webkit-inline-box;
  }
  .mPayment-btn{
    width: 8rem;
    margin: 5.5rem 0 6.25rem 32%;
    border: 1px solid #FFA436;
    padding: 0.4666666667rem 1.4666666667rem;
    border-radius: 3rem;
  }
</style>

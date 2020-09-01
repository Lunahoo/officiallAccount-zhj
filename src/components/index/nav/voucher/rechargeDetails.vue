<template>
  <div class="rechargeDetails bg-f6 height z_index">
    <div class="QDetails-conter" >
      <div class="QDetails-title">
        <img class="QDetails-title-jz" :src="imgUrl">
        <div class="QDetails-title-N width">
          <div class="fl width Q_Wrap">
            <div class="Q_name fl">
              <p class="Q_name_t">{{voucherDetailName}}</p>
            </div>
            <div class="Q_money fr">
              <p class="font-fa" style="line-height:2.0833333rem"><span class="money_1"></span><span class="money_2">￥</span><span class="money_3 font-b">{{voucherDetailAmount|money}}</span></p>
            </div>
          </div>
          <div class="Q_limit fl font-ipt">
            <div>{{voucherDetailTime}}</div>
          </div>
        </div>
      </div>
      <div class="QDetails-main bg-ff width fl font-1">
        <div class="condition">
          <div class="condition-title font-a39" >使用说明</div>
          <div class="condition-main">
            <div class="condition-farst width fl ">
              <span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
              <div class="industry fl font-2a2a">使用限制：</div>
              <div class="industry-cont font-F89 fl font-ipt">该券需要充值后才可消费使用</div>
            </div>
          </div>
          <div class="condition-farst width fl">
            <span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
            <div class="industry fl font-2a2a">购买时间：</div>
            <div class="industry-cont font-ipt fl font-ipt">{{voucherDetailTime}}</div>
          </div>
          <div class="condition-farst width fl ">
            <span class="industry-img fl"><img class="industry-img1" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
            <div class="industry fl font-2a2a">行业类别：</div>
            <div class="industry-cont font-ipt fl font-ipt">出行</div>

          </div>
          <div class="condition-farst width fl">
            <span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
            <div class="industry fl font-2a2a">地域限制：</div>
            <div class="industry-cont font-ipt fl">不限</div>
          </div>

          <div class="condition-farst width fl">
            <span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
            <div class="industry fl font-2a2a">商户限制：</div>
            <div class="industry-cont font-ipt fl pst-rlt">不限
              <!--<img class="pst-abs" src="../../../../assets/img/icon_details@2x.png" @click="onlyConsumption">-->
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="QDetails-fot pst-abs width" style="bottom: .5rem;">
      <div class="QDetails-btn width" >
        <div class="QDetails-btn-r font-col-b font-133 cont" @click="toAllApp">
          <div class="bt-color">充值</div>
        </div>
      </div>
    </div>

    <div class="tel-mess" ref="history">
      <div class="juzhong">
        <section :class="[error_prompt]" id="error_bxMingxi">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {rechargeDetail,rechargeMemberIdList} from '@/api/user/userLogin'
  export default {
    data() {
      return {
        couponId:'',
        imgUrl:"",
        error_prompt:"",
        content:"",
        companyId:"",
        voucherDetailName:"",    //定额券名称
        voucherDetailAmount:"",    //定额券金额
        voucherDetailTime:"",    //定额券时间
        canTransfer:"",
        rechargeId:[],    //券id
        isToVoucherHome:false,  //充值完成之后是否直接跳转到消费券列表页
      }
    },
    methods:{
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      //充值
      toAllApp(){
        rechargeMemberIdList(localStorage.getItem("userID"),this.rechargeId).then(res =>{   //单个充值
          if(res.data.code == 200){
            this.error_prompt = "tel-message";
            this.content = "充值成功";
            if(this.isToVoucherHome == true){
              this.$router.push({
                name:"vouchers"
              })
            }else {
              this.$router.push({
                name: "voucherRecharge"
              })
            }
          }else{
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        })

      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      if(this.$route.params.couponDetail!='' && this.$route.params.couponDetail!=null && this.$route.params.couponDetail!=undefined){
        this.rechargeId.push(this.$route.params.couponDetail.couponId);
        this.voucherDetailName = this.$route.params.couponDetail.couponName;
        this.voucherDetailAmount = this.$route.params.couponDetail.couponAmount;
        this.voucherDetailTime = this.$route.params.couponDetail.startTime;
        this.imgUrl = this.$route.params.couponDetail.imageUrl;
        localStorage.setItem("couponDetail",JSON.stringify(this.$route.params.couponDetail));
      }else{
        this.rechargeId.push(JSON.parse(localStorage.getItem("couponDetail")).couponId);
        this.voucherDetailName = JSON.parse(localStorage.getItem("couponDetail")).couponName;
        this.voucherDetailAmount = JSON.parse(localStorage.getItem("couponDetail")).couponAmount;
        this.voucherDetailTime = JSON.parse(localStorage.getItem("couponDetail")).startTime;
        this.imgUrl = JSON.parse(localStorage.getItem("couponDetail")).imageUrl;
      }
      //列表页张数为1时，充值之后直接跳转到消费券列表页
      if(this.$route.params.couponLenght!='' && this.$route.params.couponLenght!=null && this.$route.params.couponLenght!=undefined){
        if(this.$route.params.couponLenght == 1){
          this.isToVoucherHome = true;
          localStorage.setItem("lenghtIsOne",this.isToVoucherHome)
        }else{
          this.isToVoucherHome = false;
        }
      }else{
        this.isToVoucherHome = localStorage.getItem("lenghtIsOne");
      }
    },
  }
</script>
<style>
  .rechargeDetails .QDetails-conter{
    height:90.5%;
  }
  .rechargeDetails .QDetails-conter .QDetails-title{
    padding-top:2.66666rem;
    position: relative;
  }
  .rechargeDetails .QDetails-title .QDetails-title-jz{
    width: 9.16666667rem;
    position: absolute;
    top: 6.2rem;
    left: 50%;
    margin-left: -4.4rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-title .QDetails-title-N{
    width: 28.25rem;
    height: 9.5rem;
    background:url("../../../../assets/img/Q_Modular/Q_bg.png") no-repeat center;
    background-size: 100%;
    margin: 0 auto;
  }
  .rechargeDetails .QDetails-conter .QDetails-title .QDetails-title-N .Q_name{
    margin-left: 2rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-title .QDetails-title-N .Q_money{
    margin-right: 2rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-title-N .Q_money .money_1{
    font-size: 1.333333rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-title-N .Q_money .money_2{
    font-size: 1.7rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-title-N .Q_money .money_3{
    font-size: 2.25rem;
  }
  .rechargeDetails .Q_limit{
    margin-left: 2rem;
    margin-top: 4rem;
    font-size: 1rem;
  }
  .rechargeDetails .Q_Wrap{
    padding-top: 1rem;
    height:2.0833333rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-title-N .Q_name .Q_name_t{
    line-height: 2.08333333rem;
    font-weight: bold;
    font-size: 1.5rem;
  }
  /*使用条件*/
  .rechargeDetails .QDetails-conter .QDetails-main{
    margin: 2rem 0 0;
    padding-bottom: 1rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-main .condition{
    margin: 0 1.5833333rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-main .condition .condition-title{
    line-height: 3.9166667rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-main .condition .condition-farst .industry-img img{
    width: 0.7rem;
    padding: 1.2rem 0.75rem 0 0;
  }
  .rechargeDetails .QDetails-conter .QDetails-main .condition .condition-farst .industry{
    width: 5rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-main .condition .condition-farst .industry-cont{
    padding-left: 0.83333rem;
    max-width: 17.6rem;
  }
  .rechargeDetails .QDetails-conter .QDetails-main .condition .condition-farst .industry-cont img{
    right:-1.5rem;
    top:50%;
    transform:translateY(-50%);
    width:1.3333rem;
    height:1.333rem;
  }
  .rechargeDetails .condition-farst{
    line-height: 3rem;
  }
  /*底部*/
  .rechargeDetails .QDetails-conter .QDetails-fot{
    height: 8%;
  }
  .rechargeDetails .QDetails-fot .QDetails-btn-l .Q_zR img{
    width: 2.25rem;
    padding-left: 0.75rem;
    font-size: 0.8rem;
  }
  .rechargeDetails .QDetails-fot .QDetails-btn-r{
    width: 93%;
    line-height: 3.83333rem;
    height: 3.8333333rem;
    margin:0 auto;
  }
  .rechargeDetails .QDetails-fot .anotherB div:first-of-type{
    width:43%;
    background:#FFE8D0;
  }
  .rechargeDetails .QDetails-fot .anotherB div:nth-of-type(2){
    width:57%;
    background:#FFA436;
  }
  /*5*/
  @media screen and (max-width:321px){
    .rechargeDetails .QDetails-conter .QDetails-title-N .Q_name .Q_name_t{
      font-size:1.5rem;
      line-height: 2.9rem;
    }
    .rechargeDetails .QDetails-conter .QDetails-fot{
      height: 9%;
    }
    .rechargeDetails .QDetails-conter .QDetails-title .QDetails-title-N {
      width: 25rem;
    }
    .rechargeDetails .Q_limit{
      margin-top: 3.5rem;
    }
    .rechargeDetails .QDetails-conter .QDetails-title .QDetails-title-N .Q_name{
      margin-left: 1.7rem;
    }
    .rechargeDetails .QDetails-conter .QDetails-title .QDetails-title-N .Q_money{
      margin-right: 1.7rem;
    }
    .rechargeDetails .QDetails-title .QDetails-title-jz {
      width: 8.166667rem;
      top: 5.5rem;
      right: 7rem;
    }
  }
  /*ipad下面的样式*/
  @media screen and (max-width:768px)and (min-width: 450px){
    .rechargeDetails .QDetails-conter .QDetails-main .condition {
      margin: 0 2.583333rem;
    }
    .rechargeDetails .QDetails-conter{
      height:88%;
    }
  }
</style>

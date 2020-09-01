<template>
    <div class="QDetails bg-f6 height z_index">
      <div :class="voucherDetail.canTransfer=='1'?'QDetails-conter1':'QDetails-conter'" v-if="voucherDetail!=undefined&&voucherDetail!=null">
        <div class="QDetails-title">
          <!--<img class="QDetails-title-bg" src="../../../../assets/img/Q_Modular/Q_bg.png">-->
          <img class="QDetails-title-jz" :src="imgUrl">
          <div class="QDetails-title-N width">
            <img class="QDetails-title-img" v-if="voucherDetail.status=='4'" src="../../../../assets/img/Q_Modular/Q_zRz.png">
            <div class="fl width Q_Wrap">
            <div class="Q_name fl">
              <p class="Q_name_t">{{voucherDetail.name|strTitleSub}}<!--定制化优惠券1--></p>
             <!-- <p class="Q_name_s font-7b7">{{voucherDetail.startTime|parseTime('{y}-{m}-{d} {h}:{i}')}}&lt;!&ndash;2018.06.22—2018.08.30&ndash;&gt;</p>-->
            </div>
            <div class="Q_img">
              <img class="img_Generals fr" src="../../../../assets/img/aloneC/img_Generalsilhouette.png"/>
            </div>
            </div>
            <div class="Q_limit fl font-ipt">
              <div class="Q_money fl">
                <p class="font-fa" style="line-height:2.0833333rem"><span class="money_1"></span><span class="money_2">￥<!--255112--></span><span class="money_3 font-b">{{voucherDetail.couponAmount|money}}</span></p>
              </div>
             <!-- <div class=""><span>限定商户：</span><span>{{voucherDetail.commercialsName|strSub}}&lt;!&ndash;携程 去哪儿 飞猪…&ndash;&gt;</span></div>
              <div class=""><span>限定地区：</span><span>{{voucherDetail.areasName|strSub}}</span></div>-->
            </div>
          </div>
        </div>
        <div class="QDetails-main bg-ff width fl font-1">
          <div class="condition">
            <div class="condition-title font-a39" >使用条件</div>
            <div class="condition-main">
              <div class="condition-farst width fl ">
                <span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
                <div class="industry fl">行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</div>
                <div class="industry-cont font-ipt fl font-ipt">{{voucherDetail.industryName}}</div>
              </div>
            </div>
            <div class="condition-farst width fl">
              <span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
              <div class="industry fl">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
              <div class="industry-cont font-ipt fl font-ipt">{{voucherDetail.categorysName}}</div>
            </div>
           <!--<div class="condition-farst width fl">-->
              <!--<span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>-->
              <!--<div class="industry fl">有效日期：</div>-->
              <!--<div class="industry-cont font-ipt" style="text-align: center">{{voucherDetail.startTime|parseTime('{y}-{m}-{d} {h}:{i}')}}—{{voucherDetail.endTime|parseTime('{y}-{m}-{d} {h}:{i}')}}&lt;!&ndash;出行&ndash;&gt;</div>-->
            <!--</div>-->
            <div class="condition-farst width fl ">
              <span class="industry-img fl"><img class="industry-img1" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
              <div class="industry fl">限定地区：</div>
             <!-- <div class="industry-cont font-ipt fl">{{voucherDetail.provincesName+','+voucherDetail.citysName}}</div>-->
              <div class="industry-cont font-ipt fl font-ipt">{{voucherDetail.areasName}}</div>

            </div>
            <div class="condition-farst width fl">
              <span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
              <div class="industry fl">限定商户：</div>
              <div class="industry-cont font-ipt fl">{{voucherDetail.commercialsName}}</div>
            </div>

            <div class="condition-farst width fl">
              <span class="industry-img fl"><img class="industry-img" src="../../../../assets/img/Q_Modular/combined_shape.png"/></span>
              <div class="industry fl">可否转让：</div>
              <div class="industry-cont font-ipt fl" v-if="voucherDetail.canTransfer==1||voucherDetail.canTransfer=='1'">可转让</div>
              <div class="industry-cont font-ipt fl pst-rlt" v-if="voucherDetail.canTransfer==0||voucherDetail.canTransfer=='0'">仅限消费
                <img class="pst-abs" src="../../../../assets/img/icon_details@2x.png" @click="onlyConsumption">
              </div>
              <!--<div class="industry-cont font-ipt fl pst-rlt" v-if="voucherDetail.canTransfer==1||voucherDetail.canTransfer=='1'">可转让
                <img class="pst-abs" src="../../../../assets/img/icon_details@2x.png" @click="eazyMoreZR=true">
              </div>
              <div class="industry-cont font-ipt fl pst-rlt" v-if="voucherDetail.canTransfer==0||voucherDetail.canTransfer=='0'">仅限消费
                <img class="pst-abs" src="../../../../assets/img/icon_details@2x.png" @click="onlyConsumption">
              </div>-->
            </div>
            <div class="condition-farst width fl" v-if="voucherDetail.canTransfer==1||voucherDetail.canTransfer=='1'">
              <div class="industry-cont font-ipt fl" style="padding-left: 8rem;">智惠嘉账号登录易得多小程序进行转让</div>
            </div>
          </div>
        </div>
      </div>
      <div class="QDetails-fot pst-abs width " v-if="voucherDetail.canTransfer==0||voucherDetail.canTransfer=='0'">
      <div class="QDetails-fot pst-abs width" style="bottom: .5rem;">
        <div class="QDetails-btn width" >
          <div class="QDetails-btn-r font-col-b font-133 cont" @click="toAllApp">
            <div class="bt-color">去消费</div>
          </div>
        </div>
      </div>
      </div>
      <div class="QDetails-fot btm-0 pst-abs width " v-if="voucherDetail.canTransfer==1||voucherDetail.canTransfer=='1'">
        <!--另外一个按钮-->
        <div class="anotherB width font-133" >
          <div class="fl cont font-F89" @click="showQRcodeImg">我要转让</div>
          <div class="fl cont font-col-b" @click="toAllApp">去消费</div>
        </div>
      </div>
      <!--仅限消费提示框-->
        <section class="zz" v-if="onlyConsumptionTips">
          <div class="wrapcenter">
            <div class="wrapcenter_tips">
              <div class="section_top">消费券是否可转让由企业设定，仅限消费的券只能消费使用</div>
              <div class="section_bottom">
                <div class="qx_set1 font-fa" @click="Ayes">知道了</div>
              </div>
            </div>
          </div>
        </section>

      <!--可转让弹窗-->
      <section class="zz eazyMoreZR" v-if="eazyMoreZR">
        <div class="wrapcenter">
          <div class="wrapcenter_tips">
            <div class="section_top">消费券可去易得多小程序转让，转让折损率2%</div>
            <div class="section_bottom">
              <div class="qx_set1 font-fa" @click="closeEazyMoreZR">知道了</div>
            </div>
          </div>
        </div>
      </section>
      <!--去转让弹窗-->
      <div class="goTransfor zz cont" v-if="GOtransfor">
        <div class="zzWrap cont pst-rlt">
          <p class="zzClose pst-abs" @click="GOtransfor=false">×</p>
          <div class="zzTips1 font-s15 cont font-b">去易得多转让消费券</div>
          <div class="zzTips2 font-108 cont">长按识别二维码跳转小程序</div>
          <div class="width"><img src="../../../../assets/img/Coupon/img_miniprogram@2x.png"></div>
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
  import {queryCouponDetail} from '@/api/aloneC/cInterface'
  import {getJiaFuUrl} from '@/api/user/headService';
  export default {
    data() {
      return {
        onlyConsumptionTips:false,
        couponId:'',
        imgUrl:"",
        error_prompt:"",
        content:"",
        companyId:"",
        eazyMoreZR:false,
        GOtransfor:false,
        voucherDetail:{

        },
        queryVoucherDetail:{
          companyId:"",
          couponId:"",
          canTransfer:"",
          balanceType:"",
        }
      }
    },
    methods:{
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      getVoucherDetail(){
        this.queryVoucherDetail.couponId = this.couponId;
        this.queryVoucherDetail.companyId = this.companyId;
        queryCouponDetail(localStorage.getItem("userID"),this.queryVoucherDetail).then(res => {
          if(res.data.code == 200){
            this.voucherDetail = res.data.data;
          }else if(res.data.code == 9996 || res.data.code == '9996'){
            this.error_prompt="tel-message";
            this.content = '您的消费券已消费，请返回上一步获取券列表详情';
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res => {
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //显示易得多二维码
      showQRcodeImg(){
        this.GOtransfor = !this.GOtransfor;
      },
      /*仅限消费，不可转让*/
      onlyConsumption(){
        this.onlyConsumptionTips = true;
      },
      Ayes(){
          this.onlyConsumptionTips = false;
      },
      closeEazyMoreZR(){
          this.eazyMoreZR = false;
      },
     /* toTransfer(){
          let service = "h5.scene.voucher.transfer";
          let returlUrl = window.location.href;
        getJiaFuUrl(localStorage.getItem("userID"),service,this.companyId,returlUrl,this.couponId).then(res => {
          if(res.data.code == 200){
            window.location.href = res.data.data;
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res => {
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },*/
      toAllApp(){
        this.$router.push({name:'allLication'});
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
        if(this.$route.params.couponId!='' && this.$route.params.couponId!=null && this.$route.params.couponId!=undefined){
            this.couponId = this.$route.params.couponId;
            localStorage.setItem('getCouponId',this.couponId);
        }else{
          this.couponId = localStorage.getItem("getCouponId");
        }
        if(this.$route.params.ingUrl!='' && this.$route.params.ingUrl!=null && this.$route.params.ingUrl!=undefined){
            this.imgUrl = this.$route.params.ingUrl;
        }
      this.$root.$data.vBack=true;
      this.$root.$data.article = '消费券详情';
      if(this.$route.params.companyId!=undefined && this.$route.params.companyId!='undefined' &&this.$route.params.companyId!=null && this.$route.params.companyId!="null" && this.$route.params.companyId!=''){
        this.companyId =this.$route.params.companyId;
      }else{
        if(localStorage.getItem('QDetailCompanyId')!=undefined && localStorage.getItem('QDetailCompanyId')!='undefined' && localStorage.getItem('QDetailCompanyId')!=null && localStorage.getItem('QDetailCompanyId')!='null'){
          this.companyId = localStorage.getItem('QDetailCompanyId')
        }else{
          this.companyId = "";
        }
      }
      if(this.$route.params.canTransfer!='' && this.$route.params.canTransfer!=null && this.$route.params.canTransfer!=undefined && this.$route.params.canTransfer!='undefined'){
        this.queryVoucherDetail.canTransfer = this.$route.params.canTransfer;
        localStorage.setItem('canTransfer',this.queryVoucherDetail.canTransfer);
      }else{
        this.queryVoucherDetail.canTransfer = localStorage.getItem('canTransfer');
      }
      if(this.$route.params.balanceType!='' && this.$route.params.balanceType!=null && this.$route.params.balanceType!=undefined){
        this.queryVoucherDetail.balanceType = this.$route.params.balanceType;
        localStorage.setItem('balanceType',this.queryVoucherDetail.balanceType);
      }else{
        this.queryVoucherDetail.balanceType = localStorage.getItem('balanceType');
      }
      this.getVoucherDetail();
    },
    destroyed: function () {
      localStorage.setItem('canTransfer',this.queryVoucherDetail.canTransfer);
    },
    //当页面跳转时清除定时器
    beforeRouteEnter(to,from,next){
      let self = this;
      if(from.path == "/voucherEnterprise"){
        if(localStorage.getItem('getCompanyId')!=undefined && localStorage.getItem('getCompanyId')!='undefined' && localStorage.getItem('getCompanyId')!=null && localStorage.getItem('getCompanyId')!='null' && localStorage.getItem('getCompanyId')!=''){
          localStorage.setItem('QDetailCompanyId',localStorage.getItem('getCompanyId'));
        }
        next();
      }else{
        localStorage.setItem('QDetailCompanyId','undefined');
        next();
      }
    },
  }
</script>
<style>
  .QDetails .QDetails-conter{
    height:100%;
  }
  .QDetails .QDetails-conter1{
    height:90.5%;
  }
  .QDetails-conter .QDetails-title,.QDetails-conter1 .QDetails-title{
    padding-top:1.166666rem;
    /*margin: 0 0.916rem 0;*/
    position: relative;
  }
  .QDetails-title .QDetails-title-bg,.QDetails-title1 .QDetails-title-bg{
    padding-top: 2.0833333rem
  }
  .QDetails-title .QDetails-title-jz,.QDetails-title1 .QDetails-title-bg{
    width: 9.16666667rem;
    position: absolute;
    top: 6.2rem;
    /*right: 9rem;*/
    left: 50%;
    margin-left: -4.4rem;
  }
  .QDetails-conter .QDetails-title .QDetails-title-N,.QDetails-conter1 .QDetails-title .QDetails-title-N{
    width: 97%;
    height: 9.5rem;
    background:url("../../../../assets/img/Q_Modular/Q_bg.png") no-repeat center;
    background-size: 100%;
    margin: 0 auto;                       /*!**********************头部margin**********************!*/
  }
  .QDetails-conter .QDetails-title .QDetails-title-N .Q_name,.QDetails-conter1 .QDetails-title .QDetails-title-N .Q_name{
    margin-left: 2rem;
  }
  .QDetails-conter .QDetails-title .QDetails-title-N .Q_money, .QDetails-conter1 .QDetails-title .QDetails-title-N .Q_money{
    margin-right: 2rem;
  }
  .QDetails .QDetails-fot{
    /*height: 9.5%;*/
  }
  .QDetails-conter .QDetails-title-N .Q_money .money_1,.QDetails-conter1 .QDetails-title-N .Q_money .money_1{
    font-size: 1.333333rem;
  }
  .QDetails-conter .QDetails-title-N .Q_money .money_2,.QDetails-conter1 .QDetails-title-N .Q_money .money_2{
    font-size: 1.7rem;
  }
  .QDetails-conter .QDetails-title-N .Q_money .money_3,.QDetails-conter1 .QDetails-title-N .Q_money .money_3{
    font-size: 2.25rem;
  }
  .QDetails .Q_limit{
    margin:0 2rem;
    font-size: 1rem;
  }
  .QDetails .Q_Wrap{
    margin: 1.5rem 0 2rem;
    height:2.0833333rem;
  }
  .QDetails-conter .QDetails-title-N .Q_name .Q_name_t, .QDetails-conter1 .QDetails-title-N .Q_name .Q_name_t{
    line-height: 2.08333333rem;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .QDetails-conter .QDetails-title-N .QDetails-title-img, .QDetails-conter1 .QDetails-title-N .QDetails-title-img{
    width: 4.08333333rem;
    position: absolute;
    top: -1.1rem;
    left: 0.5rem;
  }
  /*使用条件*/
  .QDetails-conter .QDetails-main,.QDetails-conter1 .QDetails-main{
    margin: 1.5rem 0 0;
    padding-bottom: 1rem;
  }
  .QDetails-conter .QDetails-main .condition, .QDetails-conter1 .QDetails-main .condition{
    margin: 0 1.5833333rem;
  }
  .QDetails-conter .QDetails-main .condition .condition-title,.QDetails-conter1 .QDetails-main .condition .condition-title{
    line-height: 3.9166667rem;
  }
  .QDetails-conter .QDetails-main .condition .condition-farst .industry-img img ,.QDetails-conter1 .QDetails-main .condition .condition-farst .industry-img img{
    width: 0.7rem;
    padding: 1.2rem 0.75rem 0 0;
  }
  .QDetails-conter .QDetails-main .condition .condition-farst .industry,.QDetails-conter1 .QDetails-main .condition .condition-farst .industry{
    /*width: 5rem;*/
  }
  .QDetails-conter .QDetails-main .condition .condition-farst .industry-cont, .QDetails-conter1 .QDetails-main .condition .condition-farst .industry-cont{
    padding-left: 1.666667rem;
    max-width: 17.6rem;
  }
  .QDetails-conter .QDetails-main .condition .condition-farst .industry-cont img, .QDetails-conter1 .QDetails-main .condition .condition-farst .industry-cont img{
    right:-1.5rem;
    top:50%;
    transform:translateY(-50%);
    width:1.3333rem;
    height:1.333rem;
  }
  .condition-farst{
    line-height: 3rem;
  }
  /*底部*/
  .QDetails-conter .QDetails-fot，.QDetails-conter1 .QDetails-fot{
    height: 8%;
  }
  .QDetails-fot .QDetails-btn-l .Q_zR img{
    width: 2.25rem;
    padding-left: 0.75rem;
    font-size: 0.8rem;
  }
  .QDetails-fot .QDetails-btn-l{
    padding-left: 2.333333rem;
    margin-top: 0.5rem;
  }
  .QDetails-fot .QDetails-btn-r{
    width: 93%;
    line-height: 3.83333rem;
    height: 3.8333333rem;
    margin:0 auto;
    /*margin: 0.8rem 0.5rem 0 0;*/
  }
  /*.QDetails-fot .QDetails-btn-r div{*/
    /*margin:0 auto;*/
  /*}*/
  .QDetails-fot .anotherB{
    /*height:3.66666rem;*/
    line-height:3.66666rem;
  }
  .QDetails-fot .anotherB div:first-of-type{
      width:43%;
    background:#FFE8D0;
  }
  .QDetails-fot .anotherB div:nth-of-type(2){
    width:57%;
    background:#FFA436;
  }
  /*转让弹窗*/
  .QDetails .goTransfor{
    justify-content: center;
    display: flex;
  }
  .QDetails .goTransfor .zzClose{
    font-size:1.8rem;
    right:1.3333rem;
    top:0.5rem;
  }
  .QDetails .zzWrap{
    width:22.5rem;
    height:24.83333rem;
    border-radius:7px;
    background:#fff;
    margin-top:50%;
  }
  .QDetails .zzWrap .zzTips1{
    margin-top:4rem;
  }
  .QDetails .zzWrap .zzTips2{
    color:#7E7A7A;
    margin-top:0.6666rem;
  }
  .QDetails .zzWrap img{
    margin-left: 50%;
    margin-top:1.5rem;
    transform: translateX(-50%);
    width:12rem;
    height:12rem;
  }
  .QDetails-title .QDetails-title-N .Q_img .img_Generals {
    width: 12.75rem;
    margin: -1rem 3rem 2rem;
  }
  /*5*/
  @media screen and (max-width:321px){
    /*.QDetails-conter .QDetails-title {
      margin: 6% 0.916rem 0;
    }*//*2018/10/9*/
    .QDetails-conter .QDetails-title-N .Q_name .Q_name_t，.QDetails-conter1 .QDetails-title-N .Q_name .Q_name_t{
      font-size:1.25rem;
      line-height: 2.9rem;
    }
    .QDetails-conter .QDetails-fot，.QDetails-conter1 .QDetails-fot{
      height: 9%;
    }
    .QDetails-conter .QDetails-title .QDetails-title-N ， .QDetails-conter1 .QDetails-title .QDetails-title-N {
      width: 25rem;
    }
    .QDetails .Q_limit{
      margin:0 1.7rem;
    }
    .QDetails-conter .QDetails-title .QDetails-title-N .Q_name，.QDetails-conter1 .QDetails-title .QDetails-title-N .Q_name{
      margin-left: 1.7rem;
    }
    .QDetails-conter .QDetails-title .QDetails-title-N .Q_money，.QDetails-conter1 .QDetails-title .QDetails-title-N .Q_money，{
      margin-right: 1.7rem;
    }
    .QDetails-conter .QDetails-title-N .QDetails-title-img ，.QDetails-conter1 .QDetails-title-N .QDetails-title-img {
      width: 3.083333rem;
      top: -0.5rem;
    }
    .QDetails .QDetails-fot{
      /*height: 9%;*/
    }
    .QDetails-title .QDetails-title-jz {
      width: 8.166667rem;
      top: 5.5rem;
      right: 7rem;
    }
    .QDetails-conter .QDetails-main,.QDetails-conter1 .QDetails-main{
      margin: 1rem 0 0;
      padding-bottom: 1rem;
    }
    .QDetails-conter .QDetails-main .condition .condition-farst .industry-cont, .QDetails-conter1 .QDetails-main .condition .condition-farst .industry-cont{
      max-width: 14.6rem;
    }
  }
  /*ipad下面的样式*/
  @media screen and (max-width:768px)and (min-width: 450px){
  .QDetails-conter .QDetails-title-N .QDetails-title-img ，.QDetails-conter1 .QDetails-title-N .QDetails-title-img {
    width: 9.083333rem;
    top: -1.1rem;
    left: 1.2rem;
  }
    .QDetails-conter .QDetails-main .condition ， .QDetails-conter1 .QDetails-main .condition{
      margin: 0 2.583333rem;
    }
    .QDetails .QDetails-conter1{
      height:88%;
    }
    .QDetails .QDetails-fot{
      /*height: 11%;*/
    }
  }
</style>

<template><!--券订单-->
    <div class="mOrder width height bg-f6">
      <div class="mOrder-title padTop-1">
        <div class="bg-ff width fl">
          <div class="mOrder-title-img fl">
            <img class="Market-Coupon-img" v-if="this.type=='通信券'" src="../../assets/image/c/img_Communicate240-144.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='电商券'" src="../../assets/image/c/img_electricity240-144.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='通用券'" src="../../assets/image/c/img_General240-144.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='办公券'" src="../../assets/image/c/img_office240-144.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='服务券'" src="../../assets/image/c/img_service240-144.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='旅游券'" src="../../assets/image/c/img_Trave240-144.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='咨询券'" src="../../assets/image/c/img_consultation_240_144@2x.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='信息券'" src="../../assets/image/c/img_information_240_144@2x.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='培训券'" src="../../assets/image/c/img_train240_144.png"/>
            <img class="Market-Coupon-img" v-if="this.type=='福利券'" src="../../assets/image/c/img_welfare240_144.png"/>
          </div>
          <div class="mOrder-title-font fl" >
            <p class="font-133 mOrder-font-p" style="">{{parameter1.couponName}}</p>
            <div class="font-167 font-ipt pd05 fl width ellipsis_name"  style="height: 1rem;">{{businessNameList|strSub}}</div>
          </div>
        </div>
        <div class="mOrder-main font-167" v-show="aaa">
          <p class="mOrder-main-title">订单信息</p>
          <div class="bg-ff fl width bd-btm mOrder-font-p">
            <div class="mOrder-main-font fl four_father">
              <div class="fl font-a39">购买金额（元）</div>
              <div class="fr">{{parameter1.buyAmount|money}}</div>
            </div>
            <div class="mOrder-main-font fl four_father" v-if="parameter1.invoiceType != '3' && parameter1.invoiceSelect != '2'">
              <div class="fl font-a39">快递费（元）</div>
              <div class="fr">{{parameter1.expressFee|money}}</div>
            </div>
          </div>
          <div class="bg-ff fl width mOrder-font-p">
            <div class="mOrder-main-font fl four_father">
              <div class="fl font-a39">开票选择</div>
              <div class="fr" v-if="parameter1.invoiceSelect == '1'">立即开票</div>
              <div class="fr" v-if="parameter1.invoiceSelect == '2'">稍后开票</div>
              <div class="fr" v-if="parameter1.invoiceSelect == '3'">不需要开票</div>
            </div>
            <div class="mOrder-main-font fl four_father" v-show="Later" v-if="this.parameter1.invoiceSelect != '3'">
              <div class="fl font-a39">发票类型</div>
              <div class="fr" v-if="parameter1.invoiceType == '1'">纸质普票</div>
              <div class="fr" v-if="parameter1.invoiceType == '2'">纸质专票</div>
              <div class="fr" v-if="parameter1.invoiceType == '3'">电子发票</div>
            </div>
            <div class="mOrder-main-font fl four_father"  v-if="parameter1.invoiceSelect != '3'">
              <div class="fl font-a39">发票内容</div>
              <div class="fr mOrder-ellipsis ellipsis_name cont-r">{{'*'+ parameter1.itemName + '*'}}{{parameter1.subjectName}}（税率：{{parameter1.rate}}）</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mOrder-foot bg-ff width fl btm-0 height-4083">

        <div class="mOrder-foot-f">
          <div class="font-a39 font-167 fl">合计：</div>
          <!--<div  class="fl font-F89 mOrder-foot-font">
            ￥{{parameter1.buyAmount + parameter1.expressFee|money}}
          </div>-->
          <div class="fl font-F89 mOrder-foot-font"  v-if="parameter1.invoiceSelect != '1'||parameter1.invoiceSelect !=1 || parameter1.invoiceType =='3' || parameter1.invoiceType ==3 ">
            ￥{{parameter1.buyAmount|money}}</div>
          <div class="fl font-F89 mOrder-foot-font"  v-if="(parameter1.invoiceSelect == '1'||parameter1.invoiceSelect ==1) && (parameter1.invoiceType !='3' || parameter1.invoiceType !=3 )">
            ￥{{parameter1.buyAmount+parameter1.expressFee|money}}</div>
        </div>
        <div class="mOrder-foot-r fr cont bg-FA4 font-col-b font-133" @click="goPayment">
          去支付
        </div>
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
  import {queryMemberNew} from '@/api/user/userLogin'
  import {getCouponBuyApply,editCouponBuyApply} from '@/api/aloneC/cInterface';//劵购买申请详情、回调劵申请购买
  import {generateRequestUrl} from '@/api/user/headService';//获取收银台地址
  export default {
    data () {
      return {
        businessName: {},//行业
        businessNameList:"",
        aa:false,//来源
        content: "",
        error_prompt:"",
        type:'',//图片判断词
        aaa:true,
        fee:true,/*快递费*/
        Later:true,/*不需要开票时为false*/
        purchaseN:'',/*金额*/
        checkValue:'',/*开票选择*/
        InvoiceType:'',/*开票类型*/
        Icontent:'',/*发票内容*/
        yApplyId:'',//预开票id
        couponId1:'',/*1107202910636040194*/   /*1107970064029585409*/   /*1107971363768897538*/
        parameter1:{},//券购买详情返回数据
        userType:"",
        parameter:{//回调接口参数
          scene:"buy-coupon", //支付场景 ： 充值recharge；提现withdraw；消费consume-wechat；薪资账户consume-salary；  券购买buy_coupon    consume
          amount:"",       //支付金额
          cost:"",         //支付单价
          bizid:"",        //业务编号
          desc:"券购买订单支付111",
          otherinfo:"券购买订单支付",
          isVerify:"0",     //是否需要短信验证 0：不需要    1：需要
          companyId:localStorage.getItem("companyId"),
          asycType:'h5.pay',
        }
      }
    },
    methods: {
      adTimer: function () {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      init(){
        this.accessToken = localStorage.getItem("userID");
        this.Ctips();
        //applyId
        if(this.$route.params.applyId!=undefined && this.$route.params.applyId!="" && this.$route.params.applyId!=null && this.$route.params.applyId!='undefined' && this.$route.params.applyId!='null'){
          this.couponId1 = this.$route.params.applyId;
          localStorage.setItem('couponId1',this.couponId1);
        }else{
          if(localStorage.getItem('couponId1')!=undefined && localStorage.getItem('couponId1')!="" && localStorage.getItem('couponId1')!=null && localStorage.getItem('couponId1')!='undefined' && localStorage.getItem('couponId1')!='null'){
            this.couponId1 = localStorage.getItem('couponId1');
          }
        }
        //商户名称
        if (this.$route.params.businessName != undefined && this.$route.params.businessName != "" && this.$route.params.businessName != null && this.$route.params.businessName != 'undefined' && this.$route.params.businessName != 'null') {
          this.businessName = this.$route.params.businessName; //适用行业
          localStorage.setItem('businessName', JSON.stringify(this.businessName));
        } else {
          if (localStorage.getItem('businessName') != undefined && localStorage.getItem('businessName') != "" && localStorage.getItem('businessName') != null && localStorage.getItem('businessName') != 'undefined' && localStorage.getItem('businessName') != 'null') {
            this.businessName =JSON.parse(localStorage.getItem('businessName'));
          }
        }
        if(this.businessName!='' && this.businessName!=null && this.businessName!='null' && this.businessName!=undefined && this.businessName!='undefined'){
          for(let i=0;i<this.businessName.length;i++){
            if(i!=this.businessName.length-1){
              this.businessNameList += this.businessName[i].businessName+','
            }else{
              this.businessNameList += this.businessName[i].businessName
            }
          }
        }
        if(this.$route.params.aa!=undefined && this.$route.params.aa!='undefined'){
          this.aa = this.$route.params.aa;
          localStorage.setItem('aa',this.aa);
        }else{
          this.aa = localStorage.getItem('aa');
        }
        if(this.aa == 'true' || this.aa == true){
          this.yApplyId = ""
        }else if(this.aa == 'false' || this.aa == false){
          //yApplyId
          if(this.$route.params.yApplyId!=undefined && this.$route.params.yApplyId!="" && this.$route.params.yApplyId!=null && this.$route.params.yApplyId!='undefined' && this.$route.params.yApplyId!='null'){
            this.yApplyId = this.$route.params.yApplyId;
            localStorage.setItem('yApplyId',this.yApplyId);
          }else{
            if(localStorage.getItem('yApplyId')!=undefined && localStorage.getItem('yApplyId')!="" && localStorage.getItem('yApplyId')!=null && localStorage.getItem('yApplyId')!='undefined' && localStorage.getItem('yApplyId')!='null'){
              this.yApplyId = localStorage.getItem('yApplyId');
            }
          }
        }
        //图片
        if (this.$route.params.type != undefined && this.$route.params.type != "" && this.$route.params.type != null && this.$route.params.type != 'undefined' && this.$route.params.type != 'null') {
          this.type = this.$route.params.type; //券名称
          localStorage.setItem('type', this.type);
        } else {
          if (localStorage.getItem('type') != undefined && localStorage.getItem('type') != "" && localStorage.getItem('type') != null && localStorage.getItem('type') != 'undefined' && localStorage.getItem('type') != 'null') {
            this.type = localStorage.getItem('type');
          }
        }
        //详情接口
        getCouponBuyApply(this.accessToken,this.couponId1).then(res =>{
          if(res.data.code == 200){
              console.log(res.data.data)
            this.parameter1 = res.data.data
            this.parameter1.rate = this.parameter1.rate /100 + '%'
          }else {
            this.aaa = false
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        })
      },
      goPayment(){
        this.parameter.bizid = this.couponId1;//传到总部的数据
        if(this.aa == 'false' || this.aa == false){
          this.parameter.bizid = this.couponId1 +','+this.yApplyId;//预开票传到总部的数据
        }
        if(this.parameter1.invoiceSelect != '1'||this.parameter1.invoiceSelect !=1 || this.parameter1.invoiceType =='3' || this.parameter1.invoiceType ==3){
          this.parameter.amount = this.parameter1.buyAmount/1000;
          this.parameter.cost = this.parameter1.buyAmount/1000;
        }else if((this.parameter1.invoiceSelect == '1'||this.parameter1.invoiceSelect ==1) && (this.parameter1.invoiceType !='3' || this.parameter1.invoiceType !=3 )){
          this.parameter.amount = (this.parameter1.buyAmount + this.parameter1.expressFee) /1000
          this.parameter.cost = (this.parameter1.buyAmount + this.parameter1.expressFee) /1000
        }
        //跳转总部支付地址接口
        generateRequestUrl(this.accessToken,this.parameter).then(res =>{
          if(res.data.code == 200){
            let aUrl = res.data.data
            window.location.href = aUrl;
          }
        },res =>{
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        })
      },
      //判断是否是c端用户，如果是c端用户则无法进行报销，显示提示
      Ctips(){
        queryMemberNew(localStorage.getItem('userID'),"").then(res =>{
          if(res.data.code == 200){
            this.userType = res.data.data.type;
            if(this.userType == 'CP'){/*企业用户*/
              if(localStorage.getItem('companyId') != '' && localStorage.getItem('companyId') != null && localStorage.getItem('companyId') != 'null'){
                //this.parameter.companyId = localStorage.getItem('companyId');
                this.parameter.companyId = '1107853461363306498';
              }else {
                this.parameter.companyId = '1107853461363306498';
              }
            }else if(this.userType == 'PE'){
              this.parameter.companyId = "1107853461363306498";
            }
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.adTimer,2000);
      })
    },
    created(){
      this.init();
    }
  }

</script>
<style>
  .mOrder-title{
    height: 90.6%;
  }
  .mOrder-title-img{
    padding: 1rem 1.083rem;
  }
  .mOrder-title-img img{
    width: 10rem;
    height: 6rem;
  }
  .mOrder-title-font{
    padding: 1rem 0;
    width: 50%;
  }
  .mOrder-font-p{
    line-height: 3rem;
  }
  .mOrder-main-title{
    line-height: 3rem;
    padding: 0 1.083rem
  }
  .mOrder-main-font{
    width: 93%;
  }
  .mOrder-ellipsis{
    width:78%;
  }
  .mOrder-foot-f{
    padding-left: 1.083rem;
  }
  .mOrder-foot-font{
    font-size: 2rem;
  }
  .mOrder-foot-r{
    width: 30%;
  }
 @media screen and (max-width:321px){
   .mOrder-main-font{
     width: 92%;
   }
   .mOrder-title{
     height: 89.2%;
   }
 }

</style>

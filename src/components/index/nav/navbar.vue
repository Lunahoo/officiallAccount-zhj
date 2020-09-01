<template>
    <div class="navbar gd-color height" >
      <ul class="nav-top">
        <li @click="toFill"><div class="bt-icon"><img src="../../../assets/image/nav/icon_ReimbursementManagement.png"></div><div class="bt-font">简易报销</div></li>
        <li @click="UseQrcode">
          <div class="bt-icon"><img src="../../../assets/img/payment.png"></div><div class="bt-font">付款码</div>
        </li>
        <li @click="toCouponMarket"><div class="bt-icon"><img src="../../../assets/image/nav/icon_WelfareMarket.png"></div><div class="bt-font">券市场</div></li>
        <li @click="toVouchers"><div class="bt-icon"><img src="../../../assets/image/nav/icon_Coupons.png"></div><div class="bt-font">消费券</div></li>
      </ul>
      <!--c端用户点击报销提示框-->
      <section class="zz" v-show="checkLoginShow">
        <div class="wrapcenter">
          <div class="wrapcenter_tips">
            <div class="section_top">您还没有归属企业，暂时不能使用该功能</div>
            <div class="section_bottom">
              <div class="qx_set1 font-fa" @click="Iknowit">知道了</div>
            </div>
          </div>
        </div>
      </section>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="user_format">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script>
  import {queryMemberNew} from '@/api/user/userLogin'
  import {getJiaFuUrl} from '@/api/user/headService'
  export default {
    data:function(){
      return {
        toQrcode:'',      //扫码支付（沃尔玛、罗森）
        navToken:'',
        service:'',
        checkLoginShow:false,
        error_prompt:"",
        content:"",
        companyId:"",
        queryInfoData:{
          memberId:"",
          companyId:"",
          canTransfer:"",
          balanceTypeList:[]
        }
      }
    },
    methods:{
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
        //扫码支付
      UseQrcode(){
//        this.service = "h5.scene.qrcode";
//          let returlUrl = window.location.href;
//        getJiaFuUrl(this.navToken,this.service,this.companyId,returlUrl).then(res =>{
//          if(res.data.code == 200){
//            window.location.href = res.data.data;
//          }
//        },res =>{
//          this.$message({
//            message: res.data.msg,
//            type: "warning"
//          });
//        })

        if(localStorage.getItem("userID")!=null && localStorage.getItem("userID") != '' && localStorage.getItem("userID")!= undefined && localStorage.getItem("userID")!= 'undefined'){
          this.$router.push({name:'payment'});
        }else{
          localStorage.setItem("loginToPage",'payment');
          this.$router.push({name:'login'});
        }
      },
      //判断是否是c端用户，如果是c端用户则无法进行报销，显示提示
      Ctips(wherePage){
        queryMemberNew(this.navToken,"").then(res =>{
            if(res.data.code == 200){
              if(res.data.data.companyList!=null&&res.data.data.companyList!=""&&res.data.data.companyList!=undefined){ //企业用户
                this.$router.push({name:wherePage});
              }else{ //c端用户给提示
                this.checkLoginShow = true;
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
      Iknowit(){
         this.checkLoginShow = false;
      },
      //券
      toVouchers(){
          if(localStorage.getItem("userID")!=null && localStorage.getItem("userID") != '' && localStorage.getItem("userID")!= undefined && localStorage.getItem("userID")!= 'undefined'){
            this.getVoucherAttributeInfo(this.queryInfoData);
          }else{
            localStorage.setItem("loginToPage",'vouchers');
            this.$router.push({name:'login'});
          }
        },
      //简易报销
      toFill(){
          //判断用户是否登录
        if(localStorage.getItem("userID")!=null && localStorage.getItem("userID") != '' && localStorage.getItem("userID")!= undefined && localStorage.getItem("userID")!= 'undefined'){
          this.$router.push({name:'simpleReim'});
        }else{
          localStorage.setItem("loginToPage",'simpleReim');
          this.$router.push({name:'login'});
        }
      },
      //嘉市（福利集市）
      toCouponMarket(){
        if(localStorage.getItem("userID")!=null && localStorage.getItem("userID") != '' && localStorage.getItem("userID")!= undefined && localStorage.getItem("userID")!= 'undefined'){
          this.$router.push({name:'couponMarket'});
        }else{
          localStorage.setItem("loginToPage",'simpleReim');
          this.$router.push({name:'login'});
        }

      },
      },
    created(){
      this.navToken = localStorage.getItem("userID");
      if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
        this.companyId = localStorage.getItem("companyId");
      }else{
        this.companyId = "";
      }
     /* this.init();*/
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
  }
</script>
<style>
  .GradualDisplay{
    height: 3.5rem;
  }
  .GradualDisplay_div{
    padding-left: 0.5rem;
  }
  .GradualDisplay_div_img{
    width: 2rem;
    float: left;
    padding: 0.8rem 0.5rem;
  }
  .navbar ul{
    display:flex;justify-content:space-around;
    height:100%;
  }
  .navbar .nav-top .bt-icon img{
    width:2.666666667rem;
  }
  .userinfo{
    line-height: 2rem;
  }
  .navbar .userinfo .nav-bot{
    padding: 0 1.5rem;
  }
  .navbar .nav-top .bt-font{
    text-align: center;
    font-size: 1.1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.8rem;
  }
  .navbar .nav-top .bt-icon{
    padding: 1.2rem 1.5rem 0.2rem;
  }
  .navbar .nav-top li:first-child{
  }
  .navbar .nav-top li:last-child{
  }
  .navbar .userinfo .nav-bot .bt-font{
    font-size: 1.25rem;
  }
  .navbar ul li,.userinfo ul li{
    float: left;
  }
  .navbar ul li{
    height:100%;/*
    padding:0 0 0.5rem;*/
  }
  .navbar ul li .bt-font{
    color: #ffffff;
  }
  .navbar .line{
    height: 1.9rem;
  }
  /*消息提示*/
  .navbar .hints{
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 8.3rem;
    right: 1rem;
    background: #fff;
    border-radius: 1rem;
    line-height: 1.5rem;
  }
  .navbar .hints span{
    padding-left: 0.45rem;
  }
  @media screen and (max-width:321px){
  .navbar .nav-top .bt-icon{
    padding: 1.1rem 1.5rem 0;
  }
  }
</style>


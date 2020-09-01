<template>
  <div class="cRecharge width height bg-f6"><!-- cRecharge_error-->
    <div class="cRecharge_error pst-abs width animated " :class="fadeStyle" v-if="false">
      <img src="../../assets/img/account/Invalid.png" class="fl">
      <div class="fl font-22d font-12" v-text="cRecharge_tips"></div>
    </div>
    <div class="cRecharge_money bg-ff">
      <div class="cRecharge_money_title">充值金额（元）</div>
      <div class="cRecharge_money_content"><div class="fl">￥</div><input type="number" class="fl font-133" v-model="cRechargeMoney" @blur="rechargeMblur" ></div>
    </div>
    <div class="paymentMethod">
      <section class="width four_wrap bg-ff" v-for="(item,index) in paymentMethod" :key="index">
        <div class="section_l fl"><img :src="item.srcT"></div>
        <div class="section_r height fl" :class="paymentMethod.length-index==1?'':'bd-btm'" style="width:78%;">
          <div class="four_left fl font-125">{{item.method}}
            <!--<span class="font-a39">{{item.brokerage}}</span>-->
          </div>
          <div class="fr"><img class="unselected_circle" :src="item.srcC" @click="clickPayment(index,item.method)"/></div>
        </div>             <!-- -->

      </section>
    </div>
    <div class="cRecharge_next width wrapcenter">  <!--  @click="cRechargeNext"  -->
      <div class="font-col-b btn_style height width cont font-133" :class="btnColor" @click="rechargeS">立即充值</div>
    </div>
    <div class="addAddress_wechatRecharge" v-if="addAddress_wechatRecharge">
      <div class="zz"></div>
      <div class="wechatRecharge pst-abs width bg-ff">
        <div class="wechatRecharge_title bd-btm">
          <div class="wechatRecharge_title_cha fl" @click="addAddress_wechatRecharge=false">×</div>
          <div class="fl cont" v-text="rechargeWay+'充值'"></div>
        </div>
        <div class="wechatRecharge_content">
          <div class="font-a39 cont font-108">充值金额(元)</div>
          <div class="wechatRecharge_content_money cont" v-text="cRechargeMoney"></div>
          <div class="serviceCharge bd-btm">
            <p class="fl mG-lft183 font-125 font-ipt">手续费(元)</p>
            <p class="fr mG-rit183  font-133" v-text="brokerage"></p>
          </div>
          <div class="serviceCharge">
            <p class="fl mG-lft183 font-125 font-ipt">支付金额(元)</p>
            <p class="fr mG-rit183  font-133" v-text="paymentM"></p>
          </div>
        </div>
        <div class="wechatRecharge_btn width pst-abs cont bg-FA4 font-col-b font-133"  @click="rechargeS">立即充值</div>
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
  import {addRecharge,queryShippingAddressPage,queryBankCard} from "@/api/aloneC/cInterface"
  import {generateRechargeRequestUrl} from "@/api/user/headService"
  export default{
    data(){
      return{
        content:"",
        error_prompt:"",
        addAddress_wechatRecharge:false,
        cRechargeMoney:"",
        btnColor:"op-1",
        fadeStyle:"",
        cRecharge_error:false,
        paymentM:"",
        rechargeWay:"银行卡转账",
        brokerage:"",
        btnOpen:false,
        cRecharge_tips:"",
        parameterList:{
          scene:"recharge",
          amount:"",   //支付金额
          cost:"",        //支付单价
          bizid:"",      //业务编号
          asycType:"",/*asycType*/
          desc:"c用户充值订单",    //暂时没有，让前端自己定义
          otherinfo:"c用户充值订单",    //暂时没有，让前端自己定义
          isVerify:"0",   //是否需要验证 短信验证 0 不验证 1 验证
          companyId:'',
        },
        paymentMethod:[
          {
            method:"银行卡转账",
            brokerage:"(免手续费)",
            srcT:require("../../assets/img/aloneC/icon_bankcard.png"),
            srcC:require("../../assets/img/btn_selected.png")
          },
//          {
//            method:"微信",
//            brokerage:"(手续费0.8%)",
//            srcT:require("../../assets/img/aloneC/icon_we_cat@2x.png"),
//            srcC:require("../../assets/img/btn_Unselected.png")
//          },
//              {
//                method:"支付宝",
//                brokerage:"(手续费0.8%)",
//                srcT:require("../../assets/img/aloneC/icon_alipay@2x.png"),
//                srcC:require("../../assets/img/btn_Unselected.png")
//              }
        ],
        rechargeInfo:{
          rechargeType:"",
          source:1,
          fromTerminal:4,
          amount:"",
        }
      }
    },
    methods:{
      cRechargeTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      rechargeMblur(){
        if(this.cRechargeMoney<=0){
          this.fadeStyle = "fadeInDown";
          this.cRecharge_error = true;
        }
      },
      //支付方式选择--先隐藏  后期添加
      clickPayment(index,name){
        for(let i=0;i<this.paymentMethod.length;i++){
          if(i==index){
            this.paymentMethod[index].srcC =  require("../../assets/img/btn_selected.png");
            this.rechargeWay = name;
            this.fadeStyle = "fadeOutUp";
            this.rechargeInfo.rechargeType=index+1;
            this.btnOpen = true;
            if(this.cRechargeMoney<=50000&&this.cRechargeMoney>0){
              this.btnColor = "op-1";
            }
          }else{
            this.paymentMethod[i].srcC =  require("../../assets/img/btn_Unselected.png");
            if(name=="银行卡转账"){
              this.btnColor = "op-1";
            }else if(name!="银行卡转账"){
              this.btnColor = "op-3";
            }
          }
        }
      },
      cRechargeNext(){   //产品说先隐藏着一步，因为总部没有计算手续费的
//        if(this.btnColor == "op-1"&&(this.rechargeWay == "微信"||this.rechargeWay == "支付宝")){
//          this.addAddress_wechatRecharge = true;
//          this.brokerage = this.cRechargeMoney * 0.008;
//          this.paymentM = Number(this.cRechargeMoney) + Number(this.brokerage);
//        }else{
//            if(this.rechargeWay == ""){
//              this.fadeStyle = "fadeInDown";
//                this.cRecharge_error = true;
//                this.cRecharge_tips = "请选择充值方式";
//            }
//        }
      },
      //立即充值
      rechargeS(){
        if(this.btnColor == "op-1"){
          this.rechargeInfo.amount = this.cRechargeMoney;
        //  this.rechargeWay="银行卡转账";
          if(this.rechargeWay=="银行卡转账"){   //银行卡
            queryBankCard(localStorage.getItem("userID")).then(res=>{
              if(res.data.code==200){
                if(res.data.data.length>0){
                  this.$router.push({name:"cardDetail"})
                }else{
                  this.$router.push({
                    name:"tiedCard",
                    params:{
                      toUrl:"cRecharge"
                    }
                  })
                }
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            },res=>{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            })

          }else if(this.rechargeWay=="微信"){   //微信   if(this.rechargeWay=="银行卡转账")
            this.rechargeInfo.rechargeType = '2';
            addRecharge(localStorage.getItem("userID"),this.rechargeInfo).then(res=>{
              if(res.data.code==200){
                this.parameterList.bizid = res.data.data.id;
                this.parameterList.companyId = '1107853461363306498';
                this.parameterList.amount = this.cRechargeMoney;
                this.parameterList.cost = this.cRechargeMoney;
                this.parameterList.asycType = "h5.recharge";
                generateRechargeRequestUrl(localStorage.getItem("userID"),this.parameterList).then(res=>{
                  if(res.data.code==200){
                    window.location.href=res.data.data;
                  }else{
                    this.error_prompt="tel-message";
                    this.content = res.data.msg;
                  }
                },res=>{
                  this.error_prompt="tel-message";
                  this.content = res.data.msg;
                })
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            },res=>{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            })
          }
        }else if(this.cRechargeMoney>0){
          this.error_prompt="tel-message";
          this.content = "请选择充值方式";
        }else if(this.cRechargeMoney == ''){
          this.error_prompt="tel-message";
          this.content = "请输入金额";
        }

      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.cRechargeTimer,2000);
      })
    },
    created(){
      if(this.cRechargeMoney == ""){
        this.cRecharge_tips = "请输入充值金额";
      }
    },
    watch:{
      cRechargeMoney(newValue, oldValue){
        this.btnColor = "op-1";
        if(this.cRechargeMoney==0){
          this.cRechargeMoney = '';
          this.fadeStyle = "fadeInDown";
          this.cRecharge_error = true;
          this.cRecharge_tips = "充值金额范围为1-50000元";
        }else {
          let str = '' + this.cRechargeMoney;
          if (str.indexOf('.') != -1) {
            this.fadeStyle = "fadeInDown";
            this.cRecharge_error = true;
            this.cRecharge_tips = "充值金额范围为1-50000元";
            this.cRechargeMoney = oldValue;
            }
          }

        if(this.cRechargeMoney<=50000&&this.cRechargeMoney>0){   //if(this.cRechargeMoney<=50000&&this.cRechargeMoney>0)
      //    if(this.btnOpen==true){}
            this.btnColor = "op-1";
          this.fadeStyle = "fadeOutUp";
        }else{
      //    if(this.btnOpen==true){ }
            this.btnColor = "op-3";
        }
        if(newValue.length>5){
          this.cRechargeMoney = oldValue;
        }else if(newValue.length<1){
          this.fadeStyle = "fadeInDown";
          this.cRecharge_error = true;
          this.cRecharge_tips = "请输入充值金额";
        }
      }
    }
  }
</script>
<style>
  .cRecharge .cRecharge_error{
    left:0;
    top:0;
    height:3rem;
    background:rgb(255,220,221);
  }
  .cRecharge .cRecharge_error img{
    width:1.3333rem;
    height:1.3333rem;
    margin-top:0.9rem;
    margin-left:1.0833333rem;
  }
  .cRecharge .cRecharge_error div{
    line-height:3rem;
    margin-left:0.5rem;
  }
  .cRecharge .cRecharge_money{
    height:10rem;
    padding-top:2.8rem;
    padding-left:1.75rem;
  }
  .cRecharge .cRecharge_money_title{
    /*font-size:2.6666rem;*/
  }
  .cRecharge .cRecharge_money_content{
    margin-top:2rem;
  }
  .cRecharge .cRecharge_money_content div{
    font-size:3.4rem;
  }
  .cRecharge .cRecharge_money_content div,input{
    transform:translateX(-6px);
  }
  .cRecharge .cRecharge_money_content input{
    height:5rem;
    font-size:3.33333rem;
  }
  .cRecharge .paymentMethod{
    margin-top:1.33333rem;
  }
  .cRecharge .cRecharge_next{
    margin-top:1.8rem;
  }
  .cRecharge .paymentMethod .four_wrap{
    margin-top:0;
  }
  .cRecharge .wechatRecharge{
    left:0;
    top:18%;
    height:44.5rem;
    z-index:667;
  }
  .cRecharge .wechatRecharge_title{
    height:4.25rem;
    line-height:4.25rem;
  }
  .cRecharge .wechatRecharge .wechatRecharge_title .wechatRecharge_title_cha{
    font-size:2rem;
    margin-left:1.75rem;
  }
  .cRecharge .wechatRecharge .wechatRecharge_title div:last-of-type{
    margin-left:30%;
    font-size:1.416666666rem;
  }
  .cRecharge .wechatRecharge .wechatRecharge_content{
    margin-top:1.166666rem;
  }
  .cRecharge .wechatRecharge .wechatRecharge_content .wechatRecharge_content_money{
    font-size:2.08333333rem;
    margin:0.75rem 0;
  }
  .cRecharge .serviceCharge{
    height:4.1rem;
    line-height:4.1rem;
  }
  .cRecharge .wechatRecharge_btn{
    height:3.833333rem;
    line-height:3.833333rem;
    left:0;
    bottom:0;
  }
</style>

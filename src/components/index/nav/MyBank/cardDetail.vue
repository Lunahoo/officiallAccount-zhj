<template><!--银行卡转账-->
    <div class="CardDetail width bg-f6" style="min-height:100%;">
      <div class="CardDetail-title fl width">
        <div class="CardD-bgIcon font-F89 fl font-1">温馨提示:必须用已选择的付款账号转账才能充值成功</div>
      </div>
      <!--银行卡-->
      <div class="fl width">
        <div class="fl width padTop-1 pd-bt">
          <div class="four_father">
            <div class="fl font-167 font-ipt">付款账号</div>
            <div class="fr font-108 font-3b9" @click="replaceCard">更换付款卡</div>
          </div>
        </div>
        <div class="fl width font-col-b pd-bt">
          <div class="four_father CardD-card-bg fl">
            <div class="fl width">
              <div class="fl">
                <div class="fl">
                  <img :src="bankUrl" style="width: 2.916rem;" />
                </div>
                <div class="fl pd-lf">
                  <div class="font-s15">{{nowContent}}</div>
                  <div class="font-108">储蓄卡</div>
                </div>
              </div>
              <div class="fr font-s15">{{subordinateName}}</div>
            </div>
            <div class="CardD-numb fl width font-s15 cont">{{defaultBankCode}}</div>
          </div>
          <div class="font-22d four_father font-108">*不建议使用华夏银行卡</div>
        </div>
      </div>
      <!--收款账号-->
      <div class="fl width padTop-1">
        <div class="fl width pd05">
          <div class="four_father">
            <div class="fl font-167 font-ipt">收款账号</div>
            <div class="fr font-108 font-3b9" >
              <p v-if="eazyMoreSJ.canGet" @click="sendMessage">发送到手机</p>
              <p v-else="eazyMoreSJ.canGet">{{eazyMoreSJ.waitTime}}s之后重新发送</p>
            </div>
          </div>
        </div>
        <div class="fl width">
          <div class="four_father bg-ff fl CardD-main">
            <!--列表-->
            <div class="fl bd-btm width CardD-main-list">
              <div class="fl pd-lf font-125">
                <div class="font-ipt ">收款账户</div>
                <div class="" v-text="collectionAccount"></div>
              </div>
              <div class="fr font-108 font-F89 mG-lfr1 CardD-pad-r" v-clipboard:copy="collectionAccount" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
            </div>
            <div class="fl bd-btm width CardD-main-list">
              <div class="fl pd-lf font-125">
                <div class="font-ipt ">收款账号</div>
                <div class="" v-text="collectionNumber"></div>
              </div>
              <div class="fr font-108 font-F89 mG-lfr1 CardD-pad-r" v-clipboard:copy="collectionNumber" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
            </div>
            <div class="fl bd-btm width CardD-main-list">
              <div class="fl pd-lf font-125" style="width:78%;">
                <div class="font-ipt ">开户行</div>
                <div class="" v-text="openingBank"></div>
              </div>
              <div class="fr font-108 font-F89 mG-lfr1 CardD-pad-r" v-clipboard:copy="openingBank" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
            </div>
          </div>
        </div>
      </div>
      <!--返回現金賬戶-->
      <div class="fl width cont font-3b9 font-108 pad-top2" @click="toCashAccount">返回现金账户</div>
      <div class="zz" v-show="replaceC" @click="replaceC=false">
        <div class="width bg-f6 pst-abs btm-0 fl padTop-408" style="max-height:51%;">
          <div class="bg-ff cont width font-s15 padTop-1 pd-bt pst-abs pos-left pos-top">选择银行卡</div>
          <div class="bg-ff fl width mG-top" style="margin-bottom:5.8rem;height:75%;overflow-y: scroll" >
            <div class="fl width CardD-pd-1" @click="ChoiceCard(item.bankName,item.bankNumber,item.name,item.bankLogo)" v-for="(item, index) in QContent" :key="index" :class="QContent.length-index!=1?'bd-btm':''">
              <div class="fl">
                <img class="CardD-maskIcon" :src="item.bankLogo" />
              </div>
              <div class="fl">
                <p class="font-s15">{{item.bankName}}</p>
                <p class="font-108 font-a39" >{{item.bankNumber|newtel}}</p><!--{{item.id|newtel}}-->
              </div>
              <div class="fr CardD-mask-tick"><img v-show="item.bankNumber == checkContent" src="../../../../assets/image/c/icon_tick.png"/></div>
            </div>
          </div>
          <div class="fl width wrapcenter CardD-foot bg-ff pst-abs pos-left btm-0" @click="addCard">
            <div class="fl"><img style="width: 1.67rem;" src="../../../../assets/image/c/icon_add_to@2x.png"/></div>
            <div class="fl font-125 pd-lf">添加新卡</div>
          </div>
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
  import {queryBankCard,sendReceiveAccountJiaFu} from "@/api/aloneC/cInterface"
  export default{
    data(){
      return{
        replaceC:false,/*更換卡彈窗*/
        content:"",
        error_prompt:"",
        nums:59,
        nowContent:"",
        checkContent:'',
        subordinateName:"",
        collectionAccount:"砾洲（上海）企业服务有限公司", //收款账户
        defaultBankCode:"",
        bankUrl:require("../../../../assets/image/news/btn_Setting.png"),
        collectionNumber:'36810188000075341',   //收款账号
        openingBank:"中国光大银行股份有限公司上海联洋支行",   //开户行
        QContent:[],
        eazyMoreSJ:{
          canGet:true,
          tipsContent:"发送到手机",
          getYZMC:"",
          timer:null,
          waitTime:59
        },
      }
    },
    methods:{
      CardDetailTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      photoYZMblur(){
        if(this.telJY == true && this.photoYZM.length>0 ){
          this.eazyMoreSJ.getYZMC = "font-EB";
          this.sendYZM.imgCode = this.photoYZM;
        }else{
          return false;
        }
      },
      //发短信到手机
      sendMessage(){
        this.eazyMoreSJ.canGet = false;
        this.eazyMoreSJ.timer = window.CardDetailTimer;
        this.$spaceOther.timeCountdown(this.eazyMoreSJ);
        sendReceiveAccountJiaFu(localStorage.getItem("userID"),localStorage.getItem("loginTell")).then(res=>{
          if(res.data.code==200){
            this.error_prompt="tel-message";
            this.content = "短信发送成功";
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
        //复制
      onCopy(){
        this.error_prompt="tel-message";
        this.content = '已复制';
      },
      onError(){  //请勿取消，此处留作提示，一般不会提示
        this.error_prompt="tel-message";
        this.content = '无法复制文本';
         alert("无法复制文本！");
      },
      replaceCard(){
          this.replaceC = true;
        queryBankCard(localStorage.getItem("userID")).then(res=>{
          if(res.data.code==200){
            this.QContent = res.data.data;
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      ChoiceCard(bName,code,name,bankLogo){
        this.checkContent = code;
        this.nowContent = bName;
        this.replaceC = false;
        let code1 = code.substr(-4,1);
        let code2 = code.substr(-3,3);
        this.defaultBankCode = "**** **** **** ***"+code1 +" "+code2;
        this.subordinateName = name;   //银行卡归属人姓名
        this.bankUrl = bankLogo;
      },
      toCashAccount(){
        this.$router.push({name:"cashAccount"});
      },
      addCard(){
        this.$router.push({name:"tiedCard"});
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.CardDetailTimer,2000);
      })
    },
    filters : {
      newtel (value1) {
        if(!value1) return ''
        let value2 = value1.toString().substr(0,0)
        value1 = value1.toString().substr(-3,4);
//        value1 =value2+'*'.repeat(16)+ ' ' +value1;
        value1 = "**** **** **** **** " +value1;
//        let endMember = value1.substr(-1,1);
//        if(endMember % 2){
//          value1 = "**** **** **** **** " +value1
//        }
        return value1
      }
    },
    created(){
      queryBankCard(localStorage.getItem("userID")).then(res=>{
        if(res.data.code==200){
          if(res.data.data.length!=0){
              this.nowContent=res.data.data[0].bankName;    //银行名称
              this.bankUrl = res.data.data[0].bankLogo;
              this.subordinateName=res.data.data[0].name;
            this.checkContent = res.data.data[0].bankNumber;
              let code1 = res.data.data[0].bankNumber.substr(-4,1);
              let code2 = res.data.data[0].bankNumber.substr(-3,3);
              this.defaultBankCode = "**** **** **** ***"+code1 +" "+code2;
          }
        }else{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        }
      },res=>{
        this.error_prompt="tel-message";
        this.content = res.data.msg;
      })
    }
  }
</script>
<style>
  .CardDetail-title{
    background: #FFF4e8;
    padding: 0.83rem 0;
  }
  .CardD-bgIcon{
    background: url("../../../../assets/image/c/icon_notice@2x.png") no-repeat 0 50%;
    background-size: 1.25rem;
    margin-left: 1.083rem;
    padding-left: 2rem;
  }
  .CardD-card-bg{
    background: url("../../../../assets/image/img_abc@2x.png") no-repeat 100% 100%;
    background-size: 100%;
    width:84%;
    padding: 1.5rem 1.333rem 0;
    margin-bottom: 0.66666667rem;
  }
  .CardD-numb{
    padding: 1.5rem 0 2rem;
  }
  .CardD-pad-r{
    border:1px solid #F89114;
    padding: 0.1rem 0.92rem;
    margin-top: 0.9rem;
  }
  .CardD-main{
    width: 93%;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
  }
  .CardD-main-list{
    padding: 1.083rem 0;
  }
  .CardD-main-list:last-child{
    border-bottom:none;
  }
  .CardD-maskIcon{
    width: 2.083rem;
    padding: 1rem 1rem 0 0;
  }
  .CardD-pd-1{
    padding: 0.8rem 1.083rem 0.65rem;
  }
  .CardD-foot{
    padding:1.5rem 0;
  }
  .CardD-mask-tick{
    padding-right: 2rem;
    width: 1.5rem;
    padding-top: 1.25rem;
  }
  .CardDetail .pad-top2{
    padding-top:  2rem;
  }
  @media screen and (max-width:321px){
    .CardD-card-bg{
      width:82%;
    }
    .CardD-main{
      width:92%;
    }
    .CardD-bgIcon{
      padding-left: 1.5rem;
      margin-left: 0.8rem;
    }
    .CardDetail .pad-top2{
      padding-top:  1rem;
    }
  }
</style>

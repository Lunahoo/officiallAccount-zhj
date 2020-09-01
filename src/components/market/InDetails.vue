<template><!--开票详情-->
    <div class="inDetails width height bg-f6" >
      <div class="padTop-1" style="height: 97%;" >
        <div class="inDetails-scroll overflow-s">
          <div class="inDetails-08 fl width bg-ff" >
            <div class="fl font-133 four_father">
              <div v-if="typeId==3">{{typeName}}<span v-if="invoiceStatus==2">已开票</span><span v-if="invoiceStatus==1">待开票</span></div>
              <div v-if="typeId==1||typeId==2">{{typeName}}已申请</div>
            <div class="font-b7 font-108" style="padding-top: 0.5rem;" v-if="typeId==3" v-text="applyDate"></div>
              <div class="font-b7 font-108" style="padding-top: 0.5rem;" v-if="typeId!=3" >预计申请后5个工作内发出</div>
            </div>
            <!--<div class="fr inDetails-detail four_father font-b7 font-108" v-if="typeId==3&&invoiceStatus==2" @click="see(picUrl)">查看</div>-->
          </div>
          <div class="fl inDetails-phone width font-133">
            <p class="inDetails-p inDetails-108 font-108">接收信息</p>
            <div class="fl bg-ff width height-375" v-if="typeId==3">
              <div class="fl inDetails-108">手机号码</div>
              <div class="fr inDetails-108" >{{receivingPhone}}</div>
            </div>
            <div class="fl bg-ff width" v-if="typeId==1||typeId==2">
              <div class=" font-133" style="padding:0.8rem 1.083333rem;">{{applyName}}<span class="font-ipt font-12">&nbsp;&nbsp;{{receivingPhone}}</span></div>
              <div class=" font-12" style="padding:0 1.083333rem 0.8rem;" v-text="mailingAddress"></div>
            </div>
          </div>
          <div class="fl inDetails-phone width font-133">
            <p class="inDetails-p inDetails-108 font-108">发票信息</p>
            <div class="fl bg-ff width height-375 bd-btm">
              <div class="fl inDetails-108">发票抬头</div>
              <div class="fr inDetails-108" v-text="buyerName"></div>
            </div>
            <div class="fl bg-ff width height-375 bd-btm">
              <div class="fl inDetails-108">税号</div>
              <div class="fr inDetails-108" v-text="salesNumber"></div>
            </div>
            <div class="fl bg-ff width height-375 bd-btm">
              <div class="fl inDetails-108">发票内容</div>
              <div class="fr inDetails-108 ellipsis_name cont-r" style="width: 65%;" v-text="invoiceContents"></div>
            </div>
            <div class="fl bg-ff width height-375 bd-btm">
              <div class="fl inDetails-108">发票金额</div>
              <div class="fr inDetails-108" ><span class="font-F89">{{invoiceAmt|money}}</span>元</div>
            </div>
            <div class="fl bg-ff width height-375">
              <div class="fl inDetails-108">申请时间</div>
              <div class="fr inDetails-108" v-text="applyDate"></div>
            </div>
          </div>
          <div class="fl width bg-ff mG-top inDetails-08" @click="historyOrder" >
            <div class="fl font-133 four_father">
              <div>{{invoiceNums}}张发票，含{{orderNums}}个订单</div>
              <div class="font-b7 font-108" style="padding-top: 0.5rem;" v-text="createdTime"></div>
            </div>
            <div class="fr inDetails-detail four_father font-b7 font-108" v-if="false">查看</div>
          </div>
        </div>
       <!-- <div class="fl width cont pst-abs" style="bottom: 2rem;" v-if="typeId==3" @click="sendMessage">
          <div class="inDetails-btn bg-FA4 font-col-b bRadius-3 font-133">重新发送电子发票</div>
        </div>-->
      </div>
      <div class="inDetails-mask width height" v-show="inDetailsSee" @click="clickSee">
        <img class="width" :src="openInvoiceURL"/>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
        </div>
      </div>

      <!--添加成功提示************-->
      <div class="addET-mask bg-000 cont" v-show="inDetailsSuccess">
        <img class="addET-mask-img" src="../../assets/img/account/icon_Identification_success@2x.png"/>
        <p class="font-col-b addET-mask-img-font">发送成功</p>
      </div>
    </div>
</template>
<script>
  import {findInvoiceDetailById,sendInvoiceSms} from "@/api/aloneC/cInterface"
  export default {
    components: {},
    data () {
      return {
        typeId:'',
        typeName:'',
        invoiceStatus:'',
        invoiceDate:'',
        picUrl:'',
        receivingPhone:'',
        mailingAddress:'',
        buyerName:'',
        salesNumber:'',
        invoiceNums:'',    //发票张数
        invoiceContents:'',
        invoiceAmt:'',
        applyDate:'',
        applyName:'',
        orderNums:'',
        inDetailsSee:false,/*查看发票图片*/
        content:"",
        error_prompt:"",
        inDetailsSuccess:false,
        inDTimer:null,
        detailKeys:{},
        openInvoiceID:{},     //开票申请id
        orderPayNoList:[],    //支付订单合集
        invoiceDetailID:{},
        invoiceDetailInfo:{},
        openInvoiceURL:require("../../assets/image/img_icon_vat_speccial_invoice@2x.png"),
      }
    },
    methods: {
      inDetailsTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      //一个添加成功之后跳转回首页的定时器
      inDetailsSendMessTimers(){
        this.inDTimer = setInterval(() =>{
          this.inDetailsSuccess = false;
        },2000)
      },
      //查看开票图片
      see(picU){
        this.inDetailsSee = true;
        this.openInvoiceURL = picU;
      },
      sendMessage(){
        sendInvoiceSms(localStorage.getItem("userID"),this.openInvoiceID).then(res=>{
          if(res.data.code==200){
            this.inDetailsSuccess = true;
            this.inDetailsSendMessTimers();
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      clickSee(){
        this.inDetailsSee = false
      },
//      historyOrder(){      //这一期先隐藏20190321
//        this.$router.push({
//          path:"historyDetails",
//        })
//      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.inDetailsTimer,2000);
      });
      clearInterval(this.inDTimer);
    },
    created(){
        if(this.$route.params.detailsId!=""&&this.$route.params.detailsId!=null&&this.$route.params.detailsId!=undefined){
          //开票详情
          this.invoiceDetailID.id = this.$route.params.detailsId;
          findInvoiceDetailById(localStorage.getItem("userID"),this.invoiceDetailID).then(res =>{
            if(res.data.code==200){
                if(res.data.data.typeId==3){   //電子發票
                  this.openInvoiceID.id = res.data.data.id;
                }
//                let arr = [];
//                for(let i in res.data.data){
//                    let o = {};
//                    o[i] = res.data.data[i];
//                    arr.push(o);
//                }
              this.orderNums= res.data.data.orderApplyInvoices.length;
              for(let j=0;j<res.data.data.orderApplyInvoices.length;j++){
                this.orderPayNoList.push(res.data.data.orderApplyInvoices[j].orderPaymentNo);
              }
              localStorage.setItem("orderPayNoList",JSON.stringify(this.orderPayNoList));
              this.typeId  = res.data.data.typeId;
              this.typeName  = res.data.data.typeName;
              this.invoiceContents  = '*'+ res.data.data.itemName+'*'+res.data.data.subItemName;
              this.invoiceStatus  = res.data.data.invoiceStatus;
              this.invoiceDate  = res.data.data.invoiceDate;
              this.picUrl  = res.data.data.picUrl;
              this.receivingPhone  = res.data.data.receivingPhone;
              this.mailingAddress  = res.data.data.mailingAddress;
              this.buyerName  = res.data.data.buyerName;
              this.salesNumber  = res.data.data.buyerNumber;   //税号
              this.invoiceAmt  = res.data.data.taxIncludedPrice;
              this.applyDate  = res.data.data.applyDate;
              this.applyName  = res.data.data.applyName;
              this.invoiceNums = res.data.data.applyInvoiceDetailVos.length;
              //    this.invoiceDetailInfo = JSON.stringify(res.data.data);
              //  console.log(this.invoiceDetailInfo);

            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }
    },
    destroyed(){
      clearInterval(this.inDTimer);
    },
    beforeDestroy(){
      clearInterval(this.inDTimer);
    }
  }
</script>
<style>
  .inDetails .inDetails-detail{
    background: url("../../assets/img/right.png") no-repeat 100% 85%;
    background-size: 0.583rem;
    padding: 1rem 1rem 0 0;
  }
  .inDetails .inDetails-108{
    padding:0 1.0833333rem;
  }
  .inDetails .inDetails-p{
    line-height: 2.833333rem;
  }
  .inDetails .inDetails-btn{
    margin: 0 1.0833333rem;
    line-height: 3.75rem;
  }
  .inDetails .inDetails-08{
    padding: 0.8rem 0;
  }
  .inDetails .inDetails-scroll{
    /*height: 88%;*/
  }
  .inDetails .inDetails-mask{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999999;
    background: #000;
    overflow: auto;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  /*添加成功提示*/
  .inDetails .addET-mask {
    width: 10rem;
    height: 7rem;
    opacity: 0.6;
    margin-left: 34%;
    position: absolute;
    top: 15rem;
    border-radius: 5px;
  }
  .inDetails .addET-mask .addET-mask-img {
    width: 2rem;
    padding-left: 38%;
    padding-top: 1.3rem;
  }
  .inDetails .addET-mask .addET-mask-img-font {
    padding-top: 0.8rem;
  }
  /*添加成功结束*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .inDetails .inDetails-scroll{
      height: 86%;
    }
  }
</style>

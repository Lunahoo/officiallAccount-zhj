<template>
  <div class="openInvoice width height bg-f6" v-if="openInvoiceShow">
    <div v-if="UCO_kong" class="UCO_empty width height bg-ff">
      <div class="cont"><img src="../../assets/img/aloneC/img_empty_state_coupon@2x.png" class="dis_inb"></div>
      <div class="font-ipt font-1 cont">还没有券可以开票哦，空空如也～</div>
      <div class="UCO_go cont width"><div class="dis_inb cont font-F89 font-1" @click="toCouponMarket">去券市场</div></div>
    </div>
    <div v-else="UCO_kong">
      <div class="openInvoice_type">
        <section class="width four_wrap bg-ff" v-for="(item,index) in invoiceType" :key="index" @click="openInvoiceOpen(item.couponId,item.couponName)">
          <!--<div class="section_l fl"><img src="../../assets/img/order-check.png"></div>-->
          <div class="section_r height fl" :class="invoiceType.length-index==1&&item.couponName!='现金消费'?'':'bd-btm'" style="width:92%">
            <div class="four_left fl font-125">{{item.couponName}}</div>
            <img class="fr four_img_right " src="../../assets/img/right.png"/>
            <div class="four_div_right fr cont-r font-125 font-a39" >{{item.totalApplyAmount|moneyFormat}}</div>
          </div>
        </section>
        <section class="width four_wrap bg-ff sectionLast" v-if="cashDisplay" @click="openInvoiceOpen(cashCouponId,couponName)">
          <!--<div class="section_l fl"><img src="../../assets/img/order-check.png"></div>-->
          <div class="section_r height fl"  style="width:92%">
            <div class="four_left fl font-125">{{couponName}}</div>
            <img class="fr four_img_right " src="../../assets/img/right.png"/>
            <div class="four_div_right fr cont-r font-125 font-a39" >{{totalApplyAmount|moneyFormat}}</div>
          </div>
        </section>
      </div>
      <div class="invoice_rules font-96 font-12">
        <p class="fl" @click="tomHistory">开票历史</p>
        <p class="fr" @click="toRuleText">开票规则</p>
      </div>
      <div class="openInvoice_help pst-abs font-3b9 font-12 cont" @click="toHelpText">发票帮助</div>
      <!--选择开票类型费率弹框-->
      <section class="zz" v-if="openInvoiceOn">
        <div class="wrapcenter">
          <div class="mP-mask width bg-ff QPurchase-btm font-s15" >
            <div class="wechatRecharge_title bd-btm">
              <div class="wechatRecharge_title_cha fl" @click="openInvoiceOn=false">×</div>
              <div class="fl cont" >选择开票类型</div>
            </div>
            <div class="oP-mask-height width fl mP-375 font-125 overflow-s">
              <div class="width" v-for="(item,index) in taxPointList" :key="index" style="height:4.2rem;">
                <div class=" fourWrap_hight" :class="taxPointList.length-index==1?'':'bd-btm'" @click="taxRateCheck(item)">
                  <div class="width fl font-125" v-if="item.invoiceType==1" style="line-height:4.2rem;">
                    <div class="fl mG-lft183  elli75">
                      <p class="one-txt-cut width" style="line-height:2rem">*{{item.itemName}}*{{item.subjectName}}&nbsp;</p>
                      <p style="line-height:2rem">(税率{{item.rate/100}}%)</p>
                    </div>
                    <div class="fr mG-rit183">纸质普票</div>
                  </div>
                  <div class="width fl font-125" v-if="item.invoiceType==2" style="line-height:4.2rem;">
                    <div class="fl mG-lft183  elli75">
                      <p class="one-txt-cut width" style="line-height:2rem">*{{item.itemName}}*{{item.subjectName}}&nbsp;</p>
                      <p style="line-height:2rem">(税率{{item.rate/100}}%)</p>
                    </div>
                    <div class="fr mG-rit183">纸质专票</div>
                  </div>
                  <div class="width fl font-125 " v-if="item.invoiceType==3" style="line-height:4.2rem;">
                    <div class="fl mG-lft183 elli75">
                      <p class="one-txt-cut width" style="line-height:2rem">*{{item.itemName}}*{{item.subjectName}}&nbsp;</p>
                      <p style="line-height:2rem">(税率{{item.rate/100}}%)</p>
                    </div>
                    <div class="fr mG-rit183">电子发票</div>
                  </div>
                  <!--<div class="four_left fr cont-r mG-rit183 font-a39" >￥{{item.buyAmount}}</div>-->
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
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
  import {findCouponInfoByApplyor,findSubjectByApplyIdAndCouponId} from "@/api/aloneC/cInterface"
  export default{
    data(){
      return{
        quan:'￥20,000',
        openInvoiceOn:false,
        UCO_kong:true,
        openInvoiceShow:false,
        content:"",
        error_prompt:"",
        nextPageTitle:'',
        cashDisplay:false,
        couponName:"",
        totalApplyAmount:"",
        vendorId:'',     //后台要传的值
        vendorName:'',
        cashCouponId:"",
        invoiceType:[],
        taxPointList:{},
        couponIdInfo:{},
        openInvoiceData:{},     //开票列表要传的参数
        universalCouponInfo:{
          "couponId":"",
          "invoiceType":"",
          "rate":"",        //税率
          "subjectName":"现金服务费",     //子科目名称
          "itemName":"服務費"       //父科目名称
        },
      }
    },
    methods:{
      openInvoiceTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      toCouponMarket(){  //去券市场
        this.$router.push({name:"couponMarket"});
      },
      openInvoiceOpen(id,name){
        this.openInvoiceData.couponId = id;   //券id
        this.openInvoiceData.couponName = name;   //券名称
        this.nextPageTitle = name;
        this.openInvoiceOn = true;
        this.couponIdInfo.couponId = id;
        this.couponIdInfo.invoiceSelect = '2';
        this.universalCouponInfo.couponId = id;
        findSubjectByApplyIdAndCouponId(localStorage.getItem("userID"),this.couponIdInfo).then(res=>{   //获取开票科目
          if(res.data.code==200){
            this.taxPointList = res.data.data;
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      taxRateCheck(allS){
        //  this.openInvoiceOn = false;
        this.universalCouponInfo.rate = allS.rate;//后台返回的税率/100  此处不需要除，universalCouponOpenInv页面除了
        this.universalCouponInfo.itemName = allS.itemName;    //父科目
        this.universalCouponInfo.subjectName = allS.subjectName;   //子科目
        this.openInvoiceData.itemCode = allS.itemCode;    //开票接口参数--主科目code
        this.openInvoiceData.itemName = allS.itemName;    //开票接口参数--主科目name
        this.openInvoiceData.subjectId = allS.subjectId;    //开票接口参数--子科目code
        this.openInvoiceData.subjectName = allS.subjectName;    //开票接口参数--子科目name
        this.openInvoiceData.rate = allS.rate/100;     //税率
        this.openInvoiceData.typeId = allS.invoiceType;     //
        this.universalCouponInfo.invoiceType = allS.invoiceType;   //1."纸质普票" 2."纸质专票" 3."电子发票"
        this.universalCouponInfo.vendorId = allS.vendorId;   //后台要传的值
        this.universalCouponInfo.vendorName = allS.vendorName;   //后台要传的值
        if(allS.invoiceType==1){
          this.openInvoiceData.typeName = "纸质普票";  //开票接口参数--科目类型名称
        }else if(allS.invoiceType==2){
          this.openInvoiceData.typeName = "纸质专票";
        }else{
          this.openInvoiceData.typeName = "电子发票";
        }
        localStorage.setItem("currencyQopenQInfo",JSON.stringify(this.universalCouponInfo));  //保存获取通用券开票列表页需要的数据
        localStorage.setItem("openInvoiceData",JSON.stringify(this.openInvoiceData));    //开票接口参数保存
        let invoiceContent = '*'+ allS.itemName + '*' + allS.subjectName + ' ' + '(税率' + allS.rate/100 + '%)';
        localStorage.setItem("subjectDes",invoiceContent);    //开票内容
        this.$router.push({
          name:"UniversalCouponOpenInv",
          params:{
            title:this.nextPageTitle,
          }
        });
      },
      tomHistory(){
        this.$router.push({name:"mHistory"});
      },
      toRuleText(){
        this.$router.push({name:"ruleText"});
      },
      toHelpText(){
        this.$router.push({name:"helpText"});
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.openInvoiceTimer,2000);
      })
    },
    filters:{
      percentage:function(value){
        if (value==0) {
          return 0;
        }
        let str=Number(value*100).toFixed();
        str+="%";
        return str;
      }
    },
    created(){
      //获取开票历史列表
      findCouponInfoByApplyor(localStorage.getItem("userID")).then(res=>{
        if(res.data.code==200){
          if(res.data.data.length>0){
              this.openInvoiceShow = true;
            this.UCO_kong=false;
            this.invoiceType = res.data.data;
            for(let i=0;i<res.data.data.length;i++){
              if(res.data.data[i].couponName=="现金消费"){
                this.cashDisplay = true;
                this.couponName = res.data.data[i].couponName;
                this.totalApplyAmount = res.data.data[i].totalApplyAmount;
                this.cashCouponId = res.data.data[i].couponId;
              }
            }
          }else{
            this.openInvoiceShow = true;
            this.UCO_kong=true;
          }
        }else{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        }
      },res=>{
        this.error_prompt="tel-message";
        this.content = res.data.msg;
      })
    },
  }
</script>
<style>
  .openInvoice .UCO_empty img{
    width:12.5rem;
    margin-top: 46%;
  }
  .openInvoice .UCO_go div{
    width:8.3333rem;
    height:2.083333rem;
    line-height:2.083333rem;
    border:solid 1px #F89114;
    margin-top:1.5rem;
    border-radius: 2rem;
  }
  .openInvoice .openInvoice_type{
    padding-top:1.0833333rem;
  }
  .openInvoice .openInvoice_type section{
    margin-top:0;
  }
  .openInvoice .openInvoice_type .sectionLast{
    margin-top:1.33333rem;
  }
  .openInvoice .invoice_rules{
    margin:1rem 1.08333333rem;
  }
  .openInvoice .openInvoice_help{
    left:50%;
    transform:translateX(-50%);
    bottom:2rem;
  }
  .elli75{
    width: 72%;
  }
  /*选择开票类型费率弹框样式*/
  .openInvoice .mP-mask{
    position: absolute;
    bottom: 0;
    z-index: 99999999;
    overflow: auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .openInvoice .wechatRecharge_title{
    height:4.25rem;
    line-height:4.25rem;
  }
  .openInvoice .wechatRecharge_title .wechatRecharge_title_cha{
    font-size:2rem;
    margin-left:1.75rem;
  }
  .openInvoice .wechatRecharge_title div:last-of-type{
    margin-left:23%;
    font-size:1.416666666rem;
  }
  .openInvoice .QPurchase-btm{
    height: 25rem;
  }
  .openInvoice .oP-mask-height{
    height: 20.7rem;
  }
</style>

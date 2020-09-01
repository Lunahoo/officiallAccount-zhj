<template>
  <div class="UniversalCouponOpenInv width height bg-f6" v-wechat-title="$route.meta.title=UCOtitle">
    <div class="UCO_container">
      <div class="cRecharge_error pst-abs width animated " :class="fadeStyle" v-if="UCO_notice">
        <img src="../../assets/image/c/icon_notice@2x.png" class="fl">
        <div class="fl font-F89 font-12" v-text="UCO_tips"></div>
      </div><!--:class="item.showTime==''?'marginZ':''"-->
      <div class="UCO_content width" v-for="(item,index) in invoiceList" :key="index" :class="index==0?'UCO_content_first':''">
        <div class="UCO_time font-108 font-ipt mG-lft183">{{item.showTime}}</div>
        <div class="UCO_couponOrder mG-top" >
        <section class="bg-ff" >
          <div class="list_left fl mG-lft183">
            <img src="../../assets/img/aloneC/icon_Radio_disabled.png" v-if="item.canOpenInvoiceAmount==0">
            <img src="../../assets/img/btn_Unselected.png" :class="'imgT'+index" v-if="item.canOpenInvoiceAmount!=0" :id="'imgT'+index" @click="itemChecked('imgT'+index,index,item.canOpenInvoiceAmount,item.orderId)">
            <img src="../../assets/img/btn_selected.png" style="display:none" :class="'imgB'+index" :id="'imgB'+index" @click="itemChecked('imgB'+index,index,item.canOpenInvoiceAmount,item.orderId)">
          </div>
          <div class="list_right fr" ><!--:class="item.orderDetailVos.length!=0?'bd-btm':''"-->
            <div class="list_name overflow-h"><p class="fl font-125">购买消费券</p><p class="fr font-125 font-7b7">可开金额</p></div>
            <!--<div class="list_time font-1 font-a39">{{item.createTime}}</div>先隐藏，产品说这一期的逻辑有bug，第二期还是要这样的-->
            <div class="list_bottom ">
              <div class="fl list_time font-1 font-a39" style="line-height: 2.5rem;">{{item.createTime}}</div>
              <!--<div class="fl font-125 font-7b7">原购买金额<span class="font-141">{{item.buyAmount|moneyFormat}}</span>元</div>-->
              <div class="fr font-125" :class="item.canOpenInvoiceAmount!=0.00?'font-2a2a':'font-7b7'"><span style="font-size:1.58333333rem;" class="font-b">{{item.buyAmount|moneyFormat}}</span>元</div><!--item.canOpenInvoiceAmount-->
            </div>
          </div>
        </section>
          <!--不要删，二期订单内容-->
        <!--<section class="bg-ff"  v-for="(item2,index2) in item.orderDetailVos">-->
          <!--<div class="list_left fl mG-lft183">-->
            <!--<img src="../../assets/img/btn_Unselected.png" class="imgSubT" style="display:block;" :id="'imgSubT'+index+index2" @click="subjectChecked('imgSubT'+index+index2,index,index2,item2.paymentAmount,item2.id)">-->
            <!--<img src="../../assets/img/btn_selected.png" class="imgSubB" style="display:none;" :id="'imgSubB'+index+index2" @click="subjectChecked('imgSubB'+index+index2,index,index2,item2.paymentAmount,item2.id)">-->
          <!--</div>-->
          <!--<div class="list_right fr" >-->
            <!--<div class="list_name overflow-h"><p class="fl font-125">{{item2.orderVo.subTypeName}}<span v-if="item2.orderVo.subTypeName!='转让'">-{{item2.paymentIndustryName}}</span><span v-if="item2.orderVo.subTypeName=='转让'">消费券</span></p><p class="fr font-125 font-7b7">可开金额</p></div>-->
            <!--<div class="list_time font-1 font-a39">{{item2.createTime}}</div>-->
            <!--<div class="list_bottom">-->
              <!--<div class="fl font-125 font-3b9" @click="relationOrder" v-if="false">查看关联订单</div>-->
              <!--<div class="fr font-125"><span style="font-size:1.58333333rem;" class="font-b">{{item2.paymentAmount|moneyFormat}}</span>元</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->
      </div>
      </div>
    </div><div class="TotalM bg-f6 cont-r pst-abs width"><div class="font-b mG-rit183 fr">{{UCO_totalMoney|moneyFormat}}</div><div class="E7A7A font-108 fr">合计(元)：</div></div>
    <div class="selected_btn bg-ff pst-abs width">
      <div class="selected_all fl mG-lft183">
        <div class="unselected_circle fl"><img :src="allCheck" @click="allChecked"></div>
        <p class="fl E7A7A font-108" >全选</p>
      </div>
      <div class="btn_group font-12 fr height">
        <div class="font-F89 cont fl height" style="display: none" @click="notOpenInvoice">不开发票</div>
        <div class="font-col-b cont fr height" @click="toLastDrawABill">立即开票</div>
      </div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <div :class="[error_prompt]" id="setPwd_format">{{content}}</div>
      </div>
    </div>
    <!--额度不足提示框-->
    <div class="zz" v-if="QuotaTip">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">{{QuotaMessage}}</div>
          <div class="section_bottom">
            <div class="qx_set1 font-fa" @click="QuotaTip=false">知道了</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {findCouponInvoiceRecords,validateOpenInvoiceQuota,editOrderDetailByIds,queryFreightAmount} from "@/api/aloneC/cInterface"/*指定券开票页面 开票额度校验 不开发票*/
  export default{
      data(){
          return{
            content:"",
            error_prompt:"",
            UCOtitle:'',
            postage:0,    //邮费
            openInvoiceAmountMin:'',   //最低可开票金额
            QuotaTip:false,
            QuotaMessage:'',
            UCO_notice:true,
            fadeStyle:"",
            UCO_tips:"",
            UCO_totalMoney:"0",
            invoiceList:{},
            storageAmount:"",
            setLastShowTime:'',
            allCheck:require("../../assets/img/btn_Unselected.png"),
            quotaJYInfo:{},
            isAllCheck:false,    //现在是否有订单,可以选择去开票  默认false
            orderDeVoList:[],      //全选push 订单明细id合集
            notOpenInvoiceInfo:{
              id:"",
              invoiceStatus:"1"
            },
            orderIdInfo:[],   //orderId集合
            orderDetailIdInfo:{
              orderDetailIdList:[],
            },
            invoiceL:[ ],
              }
      },
    methods:{
      UCOTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      //主科目的点击事件
      itemChecked(refName,index,money,orderId){
        let lastTotalM = this.UCO_totalMoney;
        if(refName == 'imgT'+index){   //变成选中的状态
          document.getElementById('imgB'+index).style.display = 'block';
          document.getElementById('imgT'+index).style.display = 'none';
          this.UCO_totalMoney = Number(lastTotalM)+Number(money);
          //4.10号一期修改，隐藏了订单，把订单id合集收集传给调总部接口
          this.orderDetailIdInfo.orderDetailIdList.push(orderId);
          //完
        }else if(refName == 'imgB'+index){ //取消选中状态
          document.getElementById('imgT'+index).style.display = 'block';
          document.getElementById('imgB'+index).style.display = 'none';
          this.UCO_totalMoney = Number(lastTotalM)-Number(money);
          //4.10号一期修改，隐藏了订单，把订单id合集收集传给调总部接口
          let idIndex = "";
          for(let i=0;i<this.orderDetailIdInfo.orderDetailIdList.length;i++){
            if(this.orderDetailIdInfo.orderDetailIdList[i]==orderId){
              idIndex=i;
            }
          }
       //   this.orderDetailIdInfo.orderDetailIdList=this.orderDetailIdInfo.orderDetailIdList.splice(idIndex,1);
          let sb=this.orderDetailIdInfo.orderDetailIdList.splice(idIndex,1);
          //完
        }

      },
      //子科目的点击事件
      subjectChecked(subName,index,index2,money,id){
          let LASTMoney = this.UCO_totalMoney;
        if(subName == 'imgSubT'+index+index2){   //变成选中的状态
          document.getElementById('imgSubB'+index+index2).style.display = 'block';
          document.getElementById('imgSubT'+index+index2).style.display = 'none';
          this.UCO_totalMoney = Number(LASTMoney)+Number(money);
          this.orderDetailIdInfo.orderDetailIdList.push(id);
        }else if(subName == 'imgSubB'+index+index2){ //取消选中状态
          document.getElementById('imgSubT'+index+index2).style.display = 'block';
          document.getElementById('imgSubB'+index+index2).style.display = 'none';
          this.UCO_totalMoney = Number(LASTMoney)-Number(money);
          //删除不开发票参数
         let idIndex = "";
          for(let i=0;i<this.orderDetailIdInfo.orderDetailIdList.length;i++){
            if(this.orderDetailIdInfo.orderDetailIdList[i]==id){
              idIndex=i;
            }
          }
          this.orderDetailIdInfo.orderDetailIdList=this.orderDetailIdInfo.orderDetailIdList.splice(idIndex,1);
        }
      },
      //全选事件
      allChecked(){
      //  if(this.isAllCheck==true){
          let imgSubTArr = document.getElementsByClassName('imgSubT');
          let imgSubBArr = document.getElementsByClassName('imgSubB');
          if(this.allCheck==require("../../assets/img/btn_Unselected.png")){
            this.allCheck=require("../../assets/img/btn_selected.png");
            for(let i=0;i<imgSubTArr.length;i++){
              imgSubTArr[i].style.display = 'none';
            }
            for(let i=0;i<imgSubBArr.length;i++){
              imgSubBArr[i].style.display = 'block';
            }
            //主科目的显示
            for(let i=0;i<this.invoiceList.length;i++){
              if(Number(this.invoiceList[i].canOpenInvoiceAmount)!=0){
                document.getElementById('imgB'+i).style.display = 'block';
                document.getElementById('imgT'+i).style.display = 'none';
              }
            }
            this.UCO_totalMoney = this.storageAmount;
         //   this.orderDetailIdInfo.orderDetailIdList = this.orderDeVoList; //不开发票id集合
            this.orderDetailIdInfo.orderDetailIdList = this.orderIdInfo; //4.10
          }else{
            this.allCheck=require("../../assets/img/btn_Unselected.png");
            for(let i=0;i<imgSubTArr.length;i++){
              imgSubTArr[i].style.display = 'block';
            }
            for(let i=0;i<imgSubBArr.length;i++){
              imgSubBArr[i].style.display = 'none';
            }
            //主科目的不显示   不要删  后期可能会有用
            for(let i=0;i<this.invoiceList.length;i++){
              if(Number(this.invoiceList[i].canOpenInvoiceAmount)!=0){
                document.getElementById('imgB'+i).style.display = 'none';
                document.getElementById('imgT'+i).style.display = 'block';
              }
            }
            this.orderDetailIdInfo.orderDetailIdList = '';
            this.UCO_totalMoney = "";
            this.orderDetailIdInfo.orderDetailIdList = "";
          }
    //    }
      },
      //立即开票
      toLastDrawABill(){
          localStorage.setItem('orderID',JSON.stringify(this.orderDetailIdInfo.orderDetailIdList));
        let money = this.UCO_totalMoney/1000;
        if(money>=this.openInvoiceAmountMin){
          this.quotaJYInfo.buyAmount = this.UCO_totalMoney/1000;
          validateOpenInvoiceQuota(localStorage.getItem("userID"),this.quotaJYInfo).then(res=>{  //额度校验
            if(res.data.code==200){
               this.$router.push({
                 name:"lastDrawABill",
                 params:{
                  openInvoiceAmount:this.UCO_totalMoney,    //往后开票页面传合计金额
                  formPage:'UCO',
                  sendMoney:this.postage
                 }
               });
            }else{
              if(res.data.code==1){
                this.QuotaMessage = '当前开票额度不足，无法立即开票';
                this.QuotaTip = true;
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else{
          this.error_prompt="tel-message";
          this.content = '当前金额未满'+this.openInvoiceAmountMin+'元，不能开票';
        }
      },
      //不开发票
      notOpenInvoice(){
          if(this.UCO_totalMoney>0){
      //  this.orderDetailIdInfo.orderDetailIdList.push("1106133105686372353");
        editOrderDetailByIds(localStorage.getItem("userID"),this.orderDetailIdInfo).then(res=>{
          if(res.data.code==200){
            this.getCurrencyVoucherList();
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
      relationOrder(){
          this.$router.push({name:"BillDetails"});
      },
      getCurrencyVoucherList(){
        let currencyQopenQInfo=JSON.parse(localStorage.getItem("currencyQopenQInfo"));
        let QopenQInfo={};
        QopenQInfo.couponId = currencyQopenQInfo.couponId;   //"1"
        QopenQInfo.invoiceType = currencyQopenQInfo.invoiceType;
        QopenQInfo.rate = currencyQopenQInfo.rate/100;
        QopenQInfo.subjectName = currencyQopenQInfo.subjectName;
        QopenQInfo.itemName = currencyQopenQInfo.itemName;
        QopenQInfo.invoiceSelect = '2';  //后开票
        QopenQInfo.applyStatus = '2';
        findCouponInvoiceRecords(localStorage.getItem("userID"),QopenQInfo).then(res=>{
           if(res.data.code==200){
             if(res.data.data.length>0){
               this.invoiceList = res.data.data;
               this.quotaJYInfo.vendorId = res.data.data[0].vendorId;
               this.quotaJYInfo.letterheadId = res.data.data[0].letterheadId;
               let storageMoney = 0;
               let orderAmount = 0;   //所有订单金额总和
               for(let i=0;i<res.data.data.length;i++){
                 let subTotalMoney=0;  //订单金额
                 this.orderIdInfo.push(res.data.data[i].orderId);  //4.10
               //  alert(this.orderIdInfo);
//                 if(res.data.data[i].orderDetailVos.length>0){
//                   this.isAllCheck = true;
//                 }else{
//                   this.isAllCheck = false;
//                 }
//                 for(let j=0;j<res.data.data[i].orderDetailVos.length;j++){
//                   subTotalMoney += Number(res.data.data[i].orderDetailVos[j].paymentAmount);
//                   this.orderDeVoList.push(res.data.data[i].orderDetailVos[j].id);
//                 }
                 //可开金额赋值
                 this.invoiceList[i].canOpenInvoiceAmount = Number(res.data.data[i].buyAmount) - Number(subTotalMoney);
               //  orderAmount += Number(subTotalMoney);  //子订单金额
                 //做一个月份的去重
                 let showList = res.data.data[i].createTime.split("-");
                 this.invoiceList[i].showTime = showList[0]+"年"+showList[1]+"月";
                 if(i!=0&&this.invoiceList[i].showTime==this.setLastShowTime){
                   this.invoiceList[i].showTime = "";
                 }else{
                   this.setLastShowTime= this.invoiceList[i].showTime;
                 }
                 //计算一个总金额
                 storageMoney+=Number(this.invoiceList[i].canOpenInvoiceAmount);
               }
               this.storageAmount = Number(storageMoney)+Number(orderAmount);
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
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.UCOTimer,2000);
      })
    },
    created(){
      this.fadeStyle = "fadeInDown";
      let thisTitle = this.$route.params.title;
      if(thisTitle!=''&&thisTitle!='null'&&thisTitle!='undefined'&&thisTitle!=null&&thisTitle!=undefined){
        this.UCOtitle = thisTitle+'开票';
        localStorage.setItem("UCOtitle",this.UCOtitle);
      }else{
        this.UCOtitle = localStorage.getItem("UCOtitle")+'开票';
      }
      this.getCurrencyVoucherList();
      //查询运费接口
      queryFreightAmount(localStorage.getItem('userID')).then(res=>{
        if(res.data.code==200){
          this.postage = res.data.data.freightAmount; //邮费
          this.openInvoiceAmountMin = res.data.data.invoiceAmountMin/1000; //最低可开票金额
          this.UCO_tips = '公告：开票最低金额为'+this.openInvoiceAmountMin+'元';
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
  .UniversalCouponOpenInv .UCO_container{
    height: 86%;
    overflow-y: scroll;
  }
  .UniversalCouponOpenInv .cRecharge_error{
    left:0;
    top:0;
    height:3rem;
    background:rgb(255,244,232);
    z-index:664;
  }
  .UniversalCouponOpenInv .cRecharge_error img{
    width:1.3333rem;
    height:1.3333rem;
    margin-top:0.9rem;
    margin-left:1.0833333rem;
  }
  .UniversalCouponOpenInv .cRecharge_error div{
    line-height:3rem;
    margin-left:0.5rem;
  }
  .UniversalCouponOpenInv .UCO_content_first{
    padding-top:4rem;
  }
  .UniversalCouponOpenInv .marginZ{
    /*transform:transLateY(-3.8rem);*/
  }
  .UniversalCouponOpenInv .UCO_content .UCO_time{
      margin-bottom:0.5rem;
  }
  /*for循环内样式*/
  .UniversalCouponOpenInv section{
    height: 6.3rem;
  }
  .UniversalCouponOpenInv section img{
    width:1.416666666rem;
    margin-top:1.3555rem;
  }
  .UniversalCouponOpenInv section .list_right{
    width:84%;
    padding:1rem 1.0833333rem 0.7rem 0;
  }
  .UniversalCouponOpenInv section .list_bottom{
    margin-top:0.5rem;
  }
  .UniversalCouponOpenInv .TotalM{
    font-size:1.583333rem;
    height:3rem;
    line-height:3rem;
    bottom:4.166666rem;
  }
  .UniversalCouponOpenInv .selected_btn{
    height:3.5rem;
    left:0;
    bottom:0;
  }
  .UniversalCouponOpenInv .selected_btn .selected_all div img{
    margin-top:0.1rem;
  }
  .UniversalCouponOpenInv .selected_btn .selected_all p{
    margin-top:1rem;
    margin-left:1.2rem;
  }
  .UniversalCouponOpenInv .selected_btn .btn_group div:first-of-type{
    width:7.66666rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left:solid 1px rgba(187,183,183,.4);
  }
  .UniversalCouponOpenInv .selected_btn .btn_group div:last-of-type{
    width:7.8333rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background:rgb(255,164,54);
  }
  @media screen and (max-width:321px){
    .UniversalCouponOpenInv .TotalM{
      height:2.5rem;
      line-height:2.5rem;
    }
    /*弹框样式*/
    .UniversalCouponOpenInv .section_top{
      height: 3rem;
      line-height: 3rem;
    }
  }
</style>

<template>
    <div class="deliveryOrderDetail width height bg-ff">
      <div class="delivery-order">
        <div class="width bg-f6 fl"> <p class="delivery-title font-108 four_father font-96">订单信息</p></div>
        <div class="bg-ff width fl">
          <div class="delivery-order-allInfo mG-lft183 fl" style="width: 93%;">
            <div class="delivery-order-top fl width" v-if="items.applyBalanceStatus!='process'">
              <div class="delivery-order-info pd-tp1 width fl">
                <p class="fl font-108 font-ipt">到账金额</p>
                <p class="fr font-s15 font-2a2a font-b">￥{{items.payAmount|moneyFormat}}</p>
              </div>
              <div class="delivery-order-info pd-tp1 width fl">
                <p class="fl font-108 font-ipt">代卖总额</p>
                <p class="fr font-125 font-2a2a">￥{{items.couponAmount|moneyFormat}}</p>
              </div>
              <div class="delivery-order-info pd-tp1 pd-bt bd-btm width fl">
                <p class="fl font-108 font-ipt">总转让费</p>
                <p class="fr font-125 font-2a2a">￥{{items.serviceAmount|moneyFormat}}</p>
              </div>
              <!--<div class="delivery-order-info pd-tp1 pd-bt bd-btm">
                <p class="fl font-108 font-ipt">银行卡</p>
                <p class="fr font-108 font-2a2a">工商银行(*7896)</p>
              </div>-->
            </div>
            <div class="delivery-order-bottom fl width">
              <div class="delivery-order-info pd-tp1" v-if="items.applyBalanceStatus=='process'">
                <p class="fl font-108 font-ipt">代卖总额</p>
                <p class="fr font-108 font-2a2a">￥{{items.couponAmount|moneyFormat}}</p>
              </div>
              <div class="delivery-order-info pd-tp1">
                <p class="fl font-108 font-ipt">订单号</p>
                <p class="fr font-108 font-2a2a">{{items.orderNo}}</p>
              </div>
              <div class="delivery-order-info pd-tp1">
                <p class="fl font-108 font-ipt">订单状态</p>
                <p class="fr font-108 font-3b9" v-if="StatusedValue">交易成功</p>
                <p class="fr font-108 font-F89" v-if="StatusingValue">代卖中</p>
              </div>
              <div class="delivery-order-info delivery-order-infoEnd1 pd-tp1">
                <p class="fl font-108 font-ipt">订单时间</p>
                <p class="fr font-108 font-2a2a">{{items.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="delivery-transfer">
        <div class="width bg-f6 fl"> <p class="delivery-title font-108 four_father font-96">转让信息</p></div>
        <div class="bg-ff width fl">
          <div class="delivery-order-allInfo mG-lft183 fl" style="width: 93%;">
            <div class="delivery-order-top fl width" v-for="(item,index) in items.applyChargesDtos">
              <div class="delivery-order-info pd-tp1 fl width">
                <p class="fl font-108 font-ipt">券类型</p>
                <p class="fr font-125 font-2a2a">{{item.chargesItemCode}}</p>
              </div>
              <div class="delivery-order-info pd-tp1 width fl" v-if="items.applyBalanceStatus!='process'">
                <div class="fl font-108 font-ipt">券金额</div>
                <div class="fr font-125 font-2a2a">￥{{item.amount |moneyFormat}}</div>
              </div>
              <div class="delivery-order-info pd-tp1 bd-btm pd-bt width fl" v-if="items.applyBalanceStatus=='process' && index!=items.applyChargesDtos.length-1">
                <div class="fl font-108 font-ipt">券金额</div>
                <div class="fr font-125 font-2a2a">￥{{item.amount |moneyFormat}}</div>
              </div>
              <div class="delivery-order-info pd-tp1 pd-bt width fl" v-if="items.applyBalanceStatus=='process' && index==items.applyChargesDtos.length-1">
                <div class="fl font-108 font-ipt">券金额</div>
                <div class="fr font-125 font-2a2a">￥{{item.amount |moneyFormat}}</div>
              </div>
              <div class="delivery-order-info pd-tp1 width fl" v-if="items.applyBalanceStatus!='process'">
                <p class="fl font-108 font-ipt">转出价</p>
                <p class="fr font-125 font-2a2a">￥{{item.putOutAmount|moneyFormat}}</p>
              </div>
              <div class="delivery-order-info pd-tp1 pd-bt bd-btm width fl" v-if="index!=items.applyChargesDtos.length-1 && items.applyBalanceStatus!='process'">
                <p class="fl font-108 font-ipt">转让费</p>
                <p class="fr font-108 font-2a2a">￥{{item.rateAmount |moneyFormat}}</p>
              </div>
              <div class="delivery-order-info delivery-order-infoEnd pd-tp1 pd-bt width fl" v-if="index==items.applyChargesDtos.length-1 && items.applyBalanceStatus!='process'">
                <p class="fl font-108 font-ipt">转让费</p>
                <p class="fr font-108 font-2a2a">￥{{item.rateAmount |moneyFormat}}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setQuota_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {findSubstituteSaleOrderDetail} from '@/api/saleApi/saleJs'
  export default{
    data: function () {
      return {
        orderNo:"",
        applyBalanceStatus:"",
        StatusingValue:false,
        StatusedValue:false,
        items:[
          /*{type:'服务券',amount:'152000',transPrice:'4900000',rateAmount:'200000'},
           {type:'商户券',amount:'9500000',transPrice:'354000',rateAmount:'100000'},
           {type:'通用券',amount:'751000',transPrice:'12300000',rateAmount:'700000'},*/
        ],
        success:false
      }
    },
    methods:{
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      getSaleOrderDetail(orderNo){
        findSubstituteSaleOrderDetail(localStorage.getItem('userID'),orderNo).then(res =>{
          if(res.data.code == 200){
            this.items = res.data.data[0];
            if(this.items.applyBalanceStatus == 'process'){
              this.StatusingValue = true;
              this.StatusedValue = false;
            }else{
              this.StatusedValue = true;
              this.StatusingValue = false;
            }
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      }
    },
    created(){
      if(this.$route.params.orderNo!=undefined && this.$route.params.orderNo!='undefined' && this.$route.params.orderNo!=null && this.$route.params.orderNo!='null' && this.$route.params.orderNo!=''){
        this.orderNo = this.$route.params.orderNo;
        this.applyBalanceStatus = this.$route.params.applyBalanceStatus;
        localStorage.setItem('orderNo',this.orderNo);
        localStorage.setItem('applyBalanceStatus',this.applyBalanceStatus);
      }else{
        if(localStorage.getItem('orderNo')!=undefined && localStorage.getItem('orderNo')!='undefined' && localStorage.getItem('orderNo')!=null && localStorage.getItem('orderNo')!='null' && localStorage.getItem('orderNo')!=''){
          this.orderNo = localStorage.getItem('orderNo');
        }
        if(localStorage.getItem('applyBalanceStatus')!=undefined && localStorage.getItem('applyBalanceStatus')!='undefined' && localStorage.getItem('applyBalanceStatus')!=null && localStorage.getItem('applyBalanceStatus')!='null' && localStorage.getItem('applyBalanceStatus')!=''){
          this.applyBalanceStatus = localStorage.getItem('applyBalanceStatus');
        }
      }
      this.getSaleOrderDetail(this.orderNo);
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
  }
</script>
<style>
  .deliveryOrderDetail .delivery-title{
    height: 2.83333rem;
    line-height: 2.83333rem;
  }
  .delivery-order-allInfo{
    padding-right: 1.0833333rem;
  }
  .delivery-order-allInfo .delivery-order-top{
    height:55.2%;
  }
  .delivery-order-allInfo .delivery-order-bottom{
    height:44.5%;
  }
  .delivery-order-allInfo .delivery-order-info{
    height:1.583333rem;
    padding-top: 1rem;
  }
  .delivery-order-allInfo .delivery-order-infoEnd{
    padding-bottom: 2.916667rem;
  }
  .delivery-order-allInfo .delivery-order-infoEnd1{
    padding-bottom: 1.33333333rem;
  }
</style>

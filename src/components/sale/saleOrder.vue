<template>
    <div class="saleOrder width height bg-f6">
      <div class="fillIn-comter cont" v-if="kong">
        <img src="../../assets/image/news/img_blank_page@2x.png" class="errorImg">
        <p class="font-ipt pd-bt font-1">没有代卖订单记录～</p>
      </div>
      <div class="padTop-1" v-if="!kong">
        <div class="four_father bg-ff" v-for="(item,index) in saleOrderInfos">
          <div class="saleOrder-item four_father" v-if="index==0" @click="toOrderDetail(item.orderNo,item.applyBalanceStatus)">
            <div class="saleOrder-money font-s15 font-b">￥{{item.couponAmount | moneyFormat}}</div>
            <div class="sale-time font-7b7">{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
            <div class="saleOrder-status font-s15 fr font-b font-F89" v-if="item.applyBalanceStatus == 'process'">代卖中</div>
            <div class="saleOrder-status font-s15 fr font-b font-3b9" v-if="item.applyBalanceStatus != 'process'">交易成功</div>
          </div>
          <div class="saleOrder-item1" v-if="index!=0" @click="toOrderDetail(item.orderNo)">
            <div class="saleOrder-money font-s15 font-b">￥{{item.couponAmount | moneyFormat}}</div>
            <div class="sale-time font-7b7">{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
            <div class="saleOrder-status font-s15 fr font-b font-F89" v-if="item.applyBalanceStatus == 'process'">代卖中</div>
            <div class="saleOrder-status font-s15 fr font-b font-3b9" v-if="item.applyBalanceStatus != 'process'">交易成功</div>
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
  import {findSubstituteSaleOrder} from '@/api/saleApi/saleJs'
  export default{
    data: function () {
      return {
        content:"",
        error_prompt:"",
        saleOrderInfos:[
         /* {orderNo:'001',couponAmount:'52000',createTime:'2018-06-13 12:23:45',applyBalanceStatus:'代卖中'},
          {orderNo:'002',couponAmount:'8513000',createTime:'2018-08-25 04:43:12',applyBalanceStatus:'交易成功'},
          {orderNo:'003',couponAmount:'421000',createTime:'2017-12-04 18:01:01',applyBalanceStatus:'交易成功'},*/
        ],
        kong:false,
      }
    },
    methods:{
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
        //查询代卖订单列表
      getSaleOrderList(){
        findSubstituteSaleOrder(localStorage.getItem('userID')).then(res =>{
          if(res.data.code == 200){
            this.saleOrderInfos = res.data.data;
            if(this.saleOrderInfos!=null && this.saleOrderInfos.length!=0){
              this.kong = false;
            }else{
              this.kong = true;
            }
          }else{
            this.kong = true;
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.kong = true;
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
        //to代卖订单详情页
      toOrderDetail(orderNo,applyBalanceStatus){
        this.$router.push({name:'deliveryOrderDetail',params:{orderNo:orderNo,applyBalanceStatus:applyBalanceStatus}});
      }
    },
    created(){
        this.getSaleOrderList();
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
  }
</script>
<style>
  .saleOrder .saleOrder-item{
    height:6.66667rem;
  }
  .saleOrder-money{
    padding-top: 1.1666667rem;
  }
  .sale-time{
    margin-top: .666667rem;
  }
  .saleOrder-status{
    margin-top: -4rem;
  }
 .saleOrder .saleOrder-item1{
   height:6.66667rem;
   margin: 1rem 1.083333333rem 0;
  }
</style>

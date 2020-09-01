<template><!--开票历史详情发票订单页面-->
  <div class="historyDetails mHistory width height bg-f6">
    <div class="padTop-1">
      <div class="mHistory-list fl width bg-ff" v-for="(item, index) in Order" :key="index">
        <div class="mHistory-main four_father fl">
          <div class="fl font-133">{{item.paymentIndustryName}}</div>
          <div class="fr font-s15">￥{{item.paymentAmount|money}}</div>
          <div class="width fl font-ipt font-108">{{item.paymentItemName}}</div>
          <div class="width fl pd-tp085 font-108 font-ipt">
            <div class="fl mHistory-time font-7b7">{{item.createTime}}</div>
          </div>
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
  import {findOrderDetailByOrderNo} from "@/api/aloneC/cInterface"
  export default {
    data () {
      return {
        content:"",
        error_prompt:"",
        orderPayNos:{},
        Order:[
//          {a:'充话费',b:'50.00',c:'通用券',d:'2018-10-11 11:24'},
//          {a:'美团消费',b:'489.38',c:'通用券',d:'2018-12-20 15:34'},
//          {a:'京东消费',b:'179.64',c:'通用券',d:'2018-12-20 15:34'},
//          {a:'携程消费',b:'1,320.00',c:'通用券',d:'2018-12-20 15:34'},
        ],
      }
    },
    methods: {
      historyDetailsTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      /*mDetail(){
        this.$router.push({path:"historyDetails"})
      }*/
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.historyDetailsTimer,2000);
      })
    },
    created(){
        this.orderPayNos.orderPayNos = JSON.parse(localStorage.getItem("orderPayNoList"));
          //获取开票订单详情
          findOrderDetailByOrderNo(localStorage.getItem("userID"),this.orderPayNos).then(res=>{
            if(res.data.code==200){
              this.Order = res.data.data;
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
  .mHistory-time{
    background: url("../../assets/image/c/icon_time@2x.png") no-repeat 0 50%;
    background-size: 1.083rem;
    padding-left: 1.5rem;
  }
  .mHistory-main{
    padding: 0.67777rem 0;
    width: 92.5%;
  }
  .mHistory-list{
    margin-bottom: 1rem;
  }
</style>

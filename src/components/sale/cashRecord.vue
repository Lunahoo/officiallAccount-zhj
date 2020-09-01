<template>
  <div class="cashRecord width height bg-f6">
    <div class="fillIn-comter cont" v-if="kong">
      <img src="../../assets/image/news/img_blank_page@2x.png" class="errorImg">
      <p class="font-ipt pd-bt font-133">没有提现记录～</p>
    </div>
    <div class="padTop-1" v-if="!kong">
      <div class="four_father bg-ff" v-for="(item,index) in cashRecordList">
        <div class="cashRecord-item four_father" v-if="index==0" @click="tocashRecordDetail(item.id)">
          <div class="cashRecord-name font-133 font-2a2a font-b">{{item.bankName}}({{item.bankNumber|bankNumberFormat}})</div>
          <div class="sale-time font-7b7 font-108">{{item.widthdrawTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
          <p class="cashRecord-money fr font-b font-167">{{item.withdrawAmount|moneyFormat}}</p>
        </div>
        <div class="cashRecord-item1" v-if="index!=0" @click="tocashRecordDetail(item.id)">
          <div class="cashRecord-name font-133 font-2a2a font-b">{{item.bankName}}({{item.bankNumber|bankNumberFormat}})</div>
          <div class="sale-time font-7b7 font-108">{{item.widthdrawTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
          <p class="cashRecord-money fr font-b font-167">{{item.withdrawAmount|moneyFormat}}</p>
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
  import {findWithdrawRerecord} from '@/api/saleApi/saleJs'
  export default{
    data: function () {
      return {
        content:"",
        error_prompt:"",
        cashRecordList:[
          /*{id:'001',bankName:"工商银行",bankNumber:'23678451368252',widthdrawTime:'2019-01-30 16:50:25',withdrawAmount:'49500000'},
          {id:'002',bankName:"招商银行",bankNumber:'32484654655636',widthdrawTime:'2019-01-26 12:50:20',withdrawAmount:'49480000'}*/
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
      //获取提现记录列表
      getCashRecordList(){
        findWithdrawRerecord(localStorage.getItem('userID')).then(res =>{
          if(res.data.code == 200){
            this.cashRecordList = res.data.data;
            if(this.cashRecordList!=null && this.cashRecordList.length!=0){
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
      tocashRecordDetail(id){
        this.$router.push({name:'cashRecordDetail',params:{cashRecordId:id}});
      }
    },
    created(){
      this.getCashRecordList();
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
  }
</script>
<style>
  .cashRecord .cashRecord-item{
    height:6.66667rem;
  }
  .cashRecord-name{
    padding-top: 1.1666667rem;
  }
  .sale-time{
    margin-top: .666667rem;
  }
  .cashRecord-money{
    margin-top: -14%;
    font-size: 1.66667rem;
  }
  .cashRecord .cashRecord-item1{
    height:6.66667rem;
    margin: 1rem 1.083333333rem 0;
  }
</style>

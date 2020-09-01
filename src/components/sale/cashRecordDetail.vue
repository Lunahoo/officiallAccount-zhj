<template>
    <div class="cashRecordDetail height width bg-f6">
      <div class="padTop-1">
        <div class="width bg-ff">
        <div class="cashRecordDetail_info font-167">
          <p class="width font-167 E7A7A">流水号<span class="fr font-2a2a">{{cashRecordData.withdrawNo}}</span></p>
          <p class="width font-167 E7A7A mG-top">金额<span class="fr font-2a2a">{{cashRecordData.withdrawAmount|moneyFormat}}元</span></p>
          <p class="width font-167 E7A7A mG-top">银行卡<span class="fr font-2a2a">{{cashRecordData.bankCardVo.bankName}}（{{cashRecordData.bankCardVo.bankNumber | bankNumberFormat}}）</span></p>
          <p class="width font-167 E7A7A mG-top">时间<span class="fr font-2a2a">{{cashRecordData.widthdrawTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></p>
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
  import {findWithdrawInfo} from '@/api/saleApi/saleJs'
  export default{
    data: function () {
      return {
        cashRecordData:{
          withdrawNo:"",
          withdrawAmount:"",
          widthdrawTime:"",
          bankCardVo:{
            bankName:"",
            bankNumber:"",
          }
        },
        content:"",
        error_prompt:"",
        cashRecordId:""
      }
    },
    methods:{
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      getfindWithdrawInfo(cashRecordId){
        findWithdrawInfo(localStorage.getItem('userID'),cashRecordId).then(res =>{
          if(res.data.code == 200){
            this.cashRecordData = res.data.data;
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
      if(this.$route.params.cashRecordId!=undefined && this.$route.params.cashRecordId!='undefined' && this.$route.params.cashRecordId!=null && this.$route.params.cashRecordId!='null' && this.$route.params.cashRecordId!=''){
        this.cashRecordId = this.$route.params.cashRecordId;
        localStorage.setItem('cashRecordId',this.cashRecordId);
      }else{
        if(localStorage.getItem('cashRecordId')!=undefined && localStorage.getItem('cashRecordId')!='undefined' && localStorage.getItem('cashRecordId')!=null && localStorage.getItem('cashRecordId')!='null' && localStorage.getItem('cashRecordId')!=''){
          this.cashRecordId = localStorage.getItem('cashRecordId');
        }
      }
      this.getfindWithdrawInfo(this.cashRecordId);
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
  }
</script>
<style>
  .cashRecordDetail .cashRecordDetail_info{
    padding: 1.6667rem 1.0833333rem;
    width:92%;
  }
</style>

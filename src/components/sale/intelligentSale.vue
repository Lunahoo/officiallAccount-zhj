<template>
    <div class="intelligentSale height width cont">
      <img class="height width" src="../../assets/img/sale/img_ornaments@2x.png"/>
      <div class="intelligentSale_cont cont width" style="margin-top: 8.25rem;">
        <p class="font-133 font-col-b">智能代卖是自动完成消费券转卖，</p>
        <p class="font-133 font-col-b">转卖收益回款至指定银行卡的智能服务</p>
      </div>
      <div class="intelligentSale_cont cont width" style="margin-top: 20.25rem;">
        <div class="intelligentSale_btn bg-color-3B9 font-125 "><span class="height-325 font-3b9 font-125" @click="toquotaManaPage">立即开启</span></div>
        <p class="font-col-b font-133" style="margin-top: 2rem;opacity:.796;">开启后将代卖所有账户内消费券</p>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
        </div>
      </div>
      <!--未綁定銀行卡-->
      <section class="zz" v-show="canNotCard">
        <div class="wrapcenter">
          <div class="wrapcenter_tips bg-ff" style="width:80%">
            <div class="section_top1" style="padding: 3.416667rem 1.6667rem 0;height:5rem;">
              <p class="font-133 fl font-b">您尚未绑定任何银行卡，请先进行 银行卡认证才能开启智能代卖。</p>
            </div>
            <div class="section_bottom cont btn_style" style="margin: 1rem 1.0833333rem 2rem;">
              <div class="width font-133 font-col-b" style="line-height: 3.5rem" @click="tofirstTiedCardPage">去绑卡</div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
  import {findWithdrawBankCardList} from '@/api/saleApi/saleJs'
  export default{
    data: function () {
      return {
        bankCardList:[],
        content:"",
        error_prompt:"",
        canNotCard:false,
      }
    },
    methods:{
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      //to额度管理页面
      toquotaManaPage(){
        findWithdrawBankCardList(localStorage.getItem('userID')).then(res =>{
          if(res.data.code == 0){
            this.bankCardList = res.data.data;
            if(this.bankCardList.length>0){
              this.$router.push({name:'quotaMana',params:{issetQuota:false,bankCardList:this.bankCardList}});
            }else{
              this.canNotCard = true;
            }
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //第一次添加银行卡
      tofirstTiedCardPage(){
        this.canNotCard = false;
        this.$router.push({name: 'tiedCard'});
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
  }
</script>
<style>
  .intelligentSale{
    background: linear-gradient(#4D7BFE,#6AB2FF);
  }
  .intelligentSale .intelligentSale_cont{
    position: absolute;
    top:0;
  }
  .intelligentSale .intelligentSale_btn{
    background: #FFFFFF;
    border-radius: 2rem;
    width: 8.66667rem;
    height: 3.25rem;
    margin: 0 33.5%;
    opacity:.82;
  }
</style>

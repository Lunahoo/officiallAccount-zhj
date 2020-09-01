<template>
    <div class="PaymentReset width height bg-f6">
      <div class="PaymentReset-conter width fl">
        <div class="PaymentReset-Prompt width fl height-4083 font-ipt"><p>选一个方式重置密码</p></div>
        <div class="PaymentReset-main width fl bg-ff">
          <router-link to="/setPaymentPsw"><div class="Original width fl bd-btm height-375"><p class="fl OgPadding">原支付密码</p><div class="Original-img fr OgPaddingr"><img src="../../../../assets/img/right.png"></div></div></router-link>
          <router-link to="/bankCardFind"><div class="SMS bd-btm width fl height-375"><p class="fl OgPadding">银行卡信息</p><div class="SMS-img fr OgPaddingr"><img src="../../../../assets/img/right.png"></div></div></router-link>
          <div class="ID height-375" @click="messageCapID"><p class="fl OgPadding">短信验证码+身份证</p><div class="ID-img fr OgPaddingr"><img src="../../../../assets/img/right.png"></div></div>
        </div>
      </div>
    </div>
</template>
<script>
  export default{
      methods:{
        messageCapID(){
            this.$router.push({name:"messageCap"});
        }
      },
    created(){
      this.$root.$data.vBack=true;
    }
  }
</script>
<style>
  .PaymentReset-conter{
    font-size: 1.25rem;
  }
  .PaymentReset-Prompt p{
    padding:0 1.666666667rem;
  }
  .PaymentReset-main .OgPadding{
    padding-left: 1.5rem;
    color: #2E2A2A;
    font-size: 1.25rem;
  }
  .PaymentReset-main .OgPaddingr{
    padding-right: 1.66667rem;
    padding-top: 1.47rem;
    width: 0.583333rem;
  }
</style>

<template>
  <div class="bankCardFind bg-f6 height">
    <div class="bankCardFind-conter">
      <div class="font-ipt  margin-l line-h">验证已绑定的银行卡验证身份</div>
      <div class="padding-l bg-ff">
        <section class="Credit_Card bd-btm">兴业银行 信用卡 (5613)</section>
        <section class="Credit_Card">浦发银行 信用卡 (5621)</section>
      </div>
      <div class="font-ipt margin-l line-h">或绑定新卡验证</div>
      <router-link to="/addBank"><section class="Credit_Card padding-l">添加本人的银行卡</section></router-link>
    </div>
  </div>
</template>
<script>
  export default{
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '重置支付密码';

    }
  }
</script>
<style>
  .bankCardFind-conter .line-h{
    line-height: 4.083rem;
  }
  .margin-l{
    margin-left: 1.5rem;
  }
  .padding-l{
    padding-left: 1.5rem;
  }
  .bankCardFind{
    font-size:1.25rem;
  }
  /*.bankCardFind div{
    padding-top:1.25rem;
    padding-bottom: 1.25rem;
  }
  .bankCardFind section{
    padding:1.25rem 0;
  }*/
  .bankCardFind .Credit_Card{
      background:#fff url(../../../../assets/img/right.png) no-repeat 96% 50%;
    background-size: 0.583333rem;
    line-height: 3.75rem;
  }
  /*5*/
  @media screen and (max-width:321px){
    .bankCardFind{
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px) {
    .bankCardFind {
      font-size: 1.25rem;
    }
  }
</style>

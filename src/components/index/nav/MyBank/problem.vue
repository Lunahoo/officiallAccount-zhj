<template>
    <div class="problem">
      <div class="problem-main">
        <p class="problem-title">1、绑卡时提示银行预留证件信息不符</p>
        <p class="problem-conter font-ipt">这是由于您绑定的卡片信息与身份信息不符所致，请确认卡片与身份信息一致或联系银行修改。</p>
        <p class="problem-title">2、确认信息正确，银行卡还是添加不上</p>
        <p class="problem-conter font-ipt">请联系发卡行核对卡片信息、预留手机以及身份信息，若仍不能解决请尝试换一张银行卡绑定。</p>
      </div>
    </div>
</template>
<script>
  export default{
    data(){
      return {}
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '添加常见问题';
    }
  }
</script>
<style>
  .problem .problem-main{
    margin: 0 1.083333rem;
  }
  .problem .problem-main .problem-title{
    font-size: 1.5rem;
    padding: 1.5rem 0 0.58333333rem;
  }
  .problem .problem-main .problem-conter{
    font-size: 1.333333rem;
    line-height: 1.7rem;
  }
</style>

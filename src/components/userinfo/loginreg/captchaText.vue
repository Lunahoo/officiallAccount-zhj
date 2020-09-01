<template>
  <div class="captchaText">
    <section class="pst-rlt">
      <div class="captchaText_h1 font-s15">1、收不到验证码<span class="font-fa">(推荐)</span></div>
      <p class="font-ipt font-133">超过60秒无法受到验证码短信，可以通过接听电话的方式获取验证码。</p>
      <div class="captchaText_h1 font-s15 h2">2、快速自助解决</div>
      <p class="font-ipt font-133">如果您是我们企业客户的员工，请联系本企业管理人员在后台重置您账号的密码；</p>
      <p class="font-ipt font-133">请查看短信是否被安全或助手软件拦截；</p>
      <p class="font-ipt font-133">可能是网络问题引起，可以尝试重启手机。</p>
    </section>
    <button class="pst-abs cont font-133 font-col-b bt-color" id="captchaText_return" @click="go_fanhui">返回</button>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        Texts:""
      }
    },
    methods: {
      go_fanhui(){
//   this.$router.go(-1);
        this.$router.push({
          name:"messageCaptcha",
          params:{
            Textstatus:"block"
          }
        });
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.Texts = this.$route.params.status;
    }
  }
</script>
<style>
  .captchaText section{
    margin-left:1.5rem;
    margin-right:1.91rem;
    margin-top: 4rem;
  }
  .captchaText .captchaText_h1{
    margin-bottom:0.66rem;
  }
  .captchaText .h2{
    margin-top:2.5rem;
  }
  .captchaText p{
    margin-bottom:2rem;
  }
  .captchaText button{
    width: 92%;
    bottom: 3rem;
    margin: 0 1.0833333rem;
    line-height: 3.8333333rem;
    border-radius: 0.4rem;
    outline: none;
    border: none;
  }
</style>

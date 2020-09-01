<template>
    <div class="forgetPsw width height bg-f6 font-125">
      <div class="forgetPsw-first font-ipt">选择一种方式来找回密码</div>
      <div class="forgetPsw-conter width">
        <router-link to="/messageCaptcha">
          <div class="forgetF bg-ff forgetPsw-phone width fl bd-btm">
            <div class="forgetM">
              <span class="fl">手机短信验证</span><img class="fr" src="../../../../assets/img/right.png"/>
            </div>
          </div>
        </router-link>
        <router-link to="/verificationID">
          <div class="forgetF bg-ff forgetPsw-ID width fl">
            <div class="forgetM bg-ff">
              <span class="fl">身份证号验证</span><img class="fr" src="../../../../assets/img/right.png"/>
            </div>
          </div>
        </router-link>
      </div>
    </div>
</template>
<script>
  export default{
    created(){
      this.$root.$data.vBack=true;
    }
  }
</script>
<style>
  .forgetPsw .forgetPsw-first{
    line-height: 4rem;
    margin: 0 1.5rem;
  }
  .forgetPsw .forgetF .forgetM{
    margin: 0 1.5rem;
    line-height: 3.75rem;
  }
  .forgetPsw .forgetF img{
    width: 0.583rem;
    padding-top: 1.4rem;
  }
</style>

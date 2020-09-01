<template>
  <div class="giveUPlogin">
    <!--是否放弃注册框-->
    <section class="zz" v-show="isappear">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top" style="line-height: 4.1rem;">是否放弃注册</div>
          <div class="section_bottom">
            <div class="qx_set" @click="gu">放弃</div>
            <div class="qx_right qx_set" @click="continueLogin">继续注册</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default{
      name:"giveUPlogin",
    data(){
          return{
            isappear:true
          }
    },
    methods:{
      //放弃注册
      gu:function(){
        this.isappear = false;
        this.$router.push({name:"login"})
      },
      //继续注册
      continueLogin(){
        this.isappear = false;
      }
    },
    created(){
      this.$root.$data.vBack=false;
    }
  }
</script>
<style>
  .giveUPlogin .section_top{
    line-height:3.7rem;
  }
</style>

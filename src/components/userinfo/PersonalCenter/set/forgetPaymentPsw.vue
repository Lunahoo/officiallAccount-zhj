<template>
  <div class="forget-p-psw height bg-f6">
    <div class="choose font-125 font-ipt">选一个方式重置密码</div>
    <ul class="bg-ff">
      <li :class="color" >原支付密码</li>
      <li><router-link to="/addBank">银行卡信息</router-link></li>
      <li><router-link to="/addBank">短信验证码+身份证</router-link></li>
    </ul>
  </div>
</template>
<script>
  export default{
      name:"forget-p-psw",
      data(){
          return{
            color:""
          }
      },
    mounted(){
          this.init();
    },
    methods:{
        //初始化的时候判断是否从支付设置密码页面进入
        init(){
          let routerParams = this.$route.query.sb;
            if(routerParams == "yes"){
                this.color="grey";
            }else{
              this.color="";
            }
         // modifypsd
        }
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '重置支付密码';
    }
  }
</script>
<style>
  .forget-p-psw .choose{
      margin-left:1.5rem;
      padding:1.33rem 0;
  }
  .forget-p-psw ul{
    padding-left:1.5rem;
  }
  .forget-p-psw ul li{
    padding:1rem 0;
    font-size:1.25rem;
    border-bottom:solid 1px #E5E5E5;
    background:url(../../../../assets/img/right.png) no-repeat 93% 50%;
    background-size: 0.5833333rem;
  }
  .forget-p-psw ul li:last-of-type{
    border:none!important;
  }
  .forget-p-psw .grey{
    color:#7E7A7A;
  }
</style>

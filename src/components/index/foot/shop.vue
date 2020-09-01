<template>
  <div class="shop">
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import footbar from '../../footbar.vue';
  import {getJiaFuUrl} from '@/api/user/headService'
  export default{
      data(){
        return{
          accessToken:"",
          service:"",
          jsShop:"",
          that:this,
          error_prompt:"",
          content:"",
          companyId:"",
        }
      },
    method:{
      shopInit(accessToken){
        let returlUrl = window.location.href;
        let service = "h5.scene.ds.master";
        if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
          this.companyId = localStorage.getItem("companyId");
        }else{
          this.companyId = "";
        }
          getJiaFuUrl(accessToken,service,this.companyId,returlUrl).then(res => {
            if (res.data.code == 200) {
              window.location.href = res.data.data;
              return false;
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res => {
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
      },
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      let accessToken = localStorage.getItem("userID");
      let url = window.location.href;
      if(this.isWeixn()){
        if (url.indexOf('openid') > 0) {
          this.byOpenIdgetInfo(this.getOpenId(url),'shop','50004');
        }else {
          if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
            this.byOpenIdgetInfo(localStorage.getItem('openId'),'shop','50004');
          }else{
            //静默授权
            this.byWechAtgetOpenId('one','50004',this.$root.$data.redirect_uri,'shop')
          }
        }
      }else{
        if (accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined') {
            this.shopInit(accessToken);
        }else{
          localStorage.setItem("loginToPage",'shop');
          let url = window.location.origin+'/login';
          window.location.href = url
        }
      }
    },
    components:{
      footbar
    }
  }
</script>
<style>
 .shop .tel-mess .juzhong .trans{
    display:block!important;
    opacity:0;
    transition:opacity 0s;
  }
</style>

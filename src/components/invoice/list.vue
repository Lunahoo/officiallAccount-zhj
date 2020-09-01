<template>
  <div class="list">
    <div v-for="(picurl,index) in picurls" v-if="picurls!=undefined && picurls!='undefined' && picurls.length>0">
      <div v-if="picurl!=null">
        <div v-if="picurl.indexOf('.pdf')>0" style="margin-top: 1rem;">
          <iframe style="width:100%;height: 24rem;" scrolling="no" frameborder="0" :src="picurl" ></iframe>

        </div>
        <div v-if="picurl.indexOf('.pdf')<0">
          <img style="height:19.833333rem;" :src="picurl"/>
        </div>
      </div>
      <div v-if="picurl==null">
        <img style="height:19.833333rem;" :src="errorUserPhoto"/>
      </div>
    </div>
    <div v-if="picurls==undefined || picurls.length==0">
      <img style="height:19.833333rem;" :src="errorUserPhoto"/>
    </div>
    <div v-if="picurls!=undefined && picurls.length==1" class="cont font-b7 mG-top067">长按可保存发票图片到手机</div>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {
        errorUserPhoto:require('../../assets/img/allApp/img_photo@2x.png'),//默认图片
        picurls:[],
      }
    },
    methods:{
    },
    created(){
        if(this.$route.params.picUrls!=undefined){
            if(this.$route.params.picUrls.length>0){
              this.picurls = this.$route.params.picUrls;
            }
        }
      if(this.$route.params.BxMxId!=undefined && this.$route.params.BxMxId!='undefined' && this.$route.params.BxMxId!=null && this.$route.params.BxMxId!="null"){
         localStorage.setItem('BxMxId',this.$route.params.BxMxId);
      }else if(this.$route.params.invoiceId!=undefined && this.$route.params.invoiceId!="undefined" && this.$route.params.invoiceId!=null && this.$route.params.invoiceId!="null"){
        localStorage.setItem('invoiceId',this.$route.params.invoiceId);
      }
    }
  }
</script>
<style>
  .list{
    height:100%;
  }
</style>

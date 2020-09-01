<template>
    <div class="authorization width height">
      <div class="authorization_wrap cont mar">
        <img src="../assets/image/Wisdom.png">
        <div class="font-b" style="font-size: 2rem">智惠嘉</div>
      </div>
      <div class="authorization_copywritting font-b mar">
        <div class="">授权后开发者将获得以下权限</div>
        <div>· 获得你的公开信息(昵称、头像等)</div>
      </div>
      <div class="authorization_btn mar">
        <div class="cont width" @click="showAuthor">确认授权</div>
      </div>
      <!--<section class="zz" v-show="showDia">
        <div class="wrapcenter">
          <div class="wrapcenter_tips bg-ff">
            <div class="section_top cont font-12">确认授权</div>
            <div class="section_bottom">
              <div class="qx_set" @click="abolish">取消</div>
              <div class="qx_right qx_set" @click="sureAuthor">授权</div>
            </div>
          </div>
        </div>
      </section>-->
    </div>
</template>
<script>
  export default {
    data() {
      return {
        showDia:false,
        code:"",
        page:"",
        parter:""
      }
    },
    methods:{
      showAuthor(){
        /*this.showDia = true;*/
        this.byWechAtgetOpenId('two',this.code,this.$root.$data.redirect_uri,this.page,this.parter);
      },
     /* abolish(){
        this.showDia = false;
      },
      sureAuthor(){
        this.showDia = false;
        this.byWechAtgetOpenId('two',this.code,this.$root.$data.redirect_uri,this.page);
      }*/
  },
    created(){
        if(this.$route.params.code!=undefined && this.$route.params.page!=undefined){
          this.code = this.$route.params.code;
          this.page = this.$route.params.page;
          if(this.$route.params.page!=undefined && this.$route.params.page!='undefined' && undefined!=null && undefined!='null'){
            this.parter = this.$route.params.parter;
          }else{
            this.parter = "undefined";
          }
        }else{
          /*this.$router.push({name: 'home'});*/
        }
    }
  }
</script>
<style>
  .authorization .mar{
    width:80%;
    margin:0 auto;
    font-size: 1.2rem;
  }
  .authorization_wrap{
    height:20rem;
    border-bottom:solid 1px rgb(245,246,247);
  }
  .authorization_wrap img{
    margin-top:6rem;
    display:inline-block;
    width:7rem;
    height:7rem;
  }
  .authorization_wrap div{
    margin-top:0.5rem;
  }
  .authorization_copywritting div:nth-of-type(1){
    margin:1rem 0;
  }
  .authorization_copywritting div:nth-of-type(2){
    color:grey;
  }
  .authorization_btn div{
    margin-top: 3rem;
    height: 4rem;
    line-height: 4rem;
    color: #fff;
    border-radius: 4px;
    background: rgb(70,183,67);
  }
</style>

<template>
    <div class="pawmanage height bg-f6">
      <div class="pawMargin">
      <div class="pawmanage-conter bg-ff">
        <router-link to="/choiceReset" tag="li" class="pawbtm pawfont font-125 height-375 pst-rlt"><div>重置登录密码</div><div class="xq fl"><img src="../../../../assets/img/right.png"></div></router-link>
        </div>
      </div>
    </div>
</template>
<script>
  import {queryMemberNew} from '@/api/user/userLogin'
  export default{
      data(){
        return{
          token:"",
          pawmanagePSW:"",
          companyId:"",
        }
      },
    created(){
      if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
        this.companyId = localStorage.getItem("companyId")
      }else{
        this.companyId = "";
      }
      this.init();
      this.$root.$data.vBack=true;
      this.$root.$data.article = '密码管理';
    },
    methods:{
        init(){
            this.token = localStorage.getItem("userID");
          //判断用户是否有设置支付密码
          if(this.token!=undefined && this.token!=null && this.token!=""){
            queryMemberNew(this.token,this.companyId).then(res =>{
              if(res.data.code == 200){
                if(res.data.data.isSetPayPassword == 1){
                  this.pawmanagePSW = "重置支付密码";
                }else{
                  this.pawmanagePSW = "设置支付密码";
                }
                localStorage.setItem("isSetPAYPSW",this.pawmanagePSW);  //怕变量名重复，所以设置大写，勿改
              }
            },res =>{
              //console.log(res.data);
            })
          }else {
            this.ShowIndexMallUrl = false;
            let url = window.location.href;
            if(this.isWeixn()){
              if (url.indexOf('openid') > 0) {
                this.byOpenIdgetInfo(this.getOpenId(url),'pawManage');
              }else {
                if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
                  this.byOpenIdgetInfo(localStorage.getItem('openId'),'pawManage');
                }else{
                  //静默授权
                  this.byWechAtgetOpenId('one',"",this.$root.$data.redirect_uri,'pawManage')
                }
              }
            }else{
               localStorage.setItem("loginToPage", 'pawManage');
               this.$router.push({name: 'login'});
            }
          }
        }
    }
  }
</script>
<style>
  .pawmanage .pawmanage-conter{
    padding: 0 1.5rem;
  }
  .pawmanage .pawmanage-conter .xq{
    width: 0.416rem;
    float: left;
    position: absolute;
    top: 1.5rem;
    right:0rem;
  }
  .pawmanage .pawMargin{
    padding: 1.5rem 0 0;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
  }
</style>

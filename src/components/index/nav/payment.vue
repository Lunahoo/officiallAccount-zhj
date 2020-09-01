<template>
  <div class="payment-main fl width bg-f6 height">
    <div class="payment-yXbx-font bg-ff height-375 font-133" style="padding: 0 1.0833333rem">全部线下商户</div>
    <div class="payment fl width bg-ff pd-bt">
      <div class="bg-ff">
          <div class="allL-main-img fl cont" v-for="(item1,index) in PaymentCodeData.menuList" @click="UseMeiTuan(item1.service)"><!--每一个图标--><!--@click="UseMeiTuan(item1.service)" -->
            <img class="allL-main-icon " style="width: 4.58333333rem;" :src="item1.url" />
            <p class="font-1">{{item1.name}}</p>
          </div>
        </div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
    <!--<router-link to="/aBank"><div >click</div></router-link>-->
  </div>
</template>
<script>
  import {queryMenu} from "@/api/user/loginReg";
  import {getJiaFuUrl} from '@/api/user/headService'
  export default {
    name: '',
    // 定义数据
    data () {
      return {
        queryM:{
          className:"",
          type:3,
          grouped:"",
        },
        PaymentCodeData:[],
        error_prompt:"",
        content:"",
        companyId:"",
      }
    },//定义事件
    methods:{
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
        init(){
        if(localStorage.getItem("userID")!=null && localStorage.getItem("userID") != '' && localStorage.getItem("userID")!= undefined && localStorage.getItem("userID")!= 'undefined'){
          queryMenu(this.queryM,localStorage.getItem("userID"),this.companyId).then(res =>{
            if(res.data.code == 200){
              this.PaymentCodeData = res.data.data;
              if(localStorage.getItem('companyId')==null || localStorage.getItem('companyId')==undefined || localStorage.getItem('companyId')=="" || localStorage.getItem('companyId')=="null" || localStorage.getItem('companyId')=="999999"){
                if(res.data.data.companyId!=undefined && res.data.data.companyId!=null && res.data.data.companyId!=""){
                  localStorage.setItem("companyId",res.data.data.companyId);
                  localStorage.setItem("companyName",res.data.data.companyName);
                  localStorage.setItem("identificationNumber",res.data.data.identificationNumber);
                  this.companyId = res.data.data.companyId;
                }
              }
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else {
            let url = window.location.href;
            if(this.isWeixn()){
            if (url.indexOf('openid') > 0) {
              this.byOpenIdgetInfo(this.getOpenId(url),'payment','50003');
            }else {
              if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
                this.byOpenIdgetInfo(localStorage.getItem('openId'),'payment','50003');
              }else{
                //静默授权
                  this.byWechAtgetOpenId('one','50003',this.$root.$data.redirect_uri,'payment')
              }
            }
          }else{
            localStorage.setItem("loginToPage",'payment');
            this.$router.push({name:'login'});
          }
        }

      },
      UseMeiTuan(allLiService){
        if(allLiService != "" && allLiService != null && allLiService != undefined){
          this.service = allLiService;
          let toke = localStorage.getItem("userID");
          let returlUrl = window.location.href;
          getJiaFuUrl(toke,this.service,this.companyId,returlUrl).then(res =>{
            if(res.data.code == 200){
              window.location.href = res.data.data;
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }

      },

    },
    //页面加载后执行
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '付款码';
      if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null" && localStorage.getItem('companyId')!="999999"){
        this.companyId =localStorage.getItem("companyId");
      }else{
        this.companyId = "";
      }
      this.init();
      /* this.init();*/
    },
  }
</script>
<style>
.allL-main-img{
  padding:0 1.5rem 1rem;
}
/*5下面的样式*/
@media screen and (max-width:321px){
  .allL-main-img{
    padding:0 1rem 1rem;
  }
}
</style>

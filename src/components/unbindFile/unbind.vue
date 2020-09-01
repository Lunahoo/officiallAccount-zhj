<template>
    <div class="unbind">
      <div class="unbindWrap cont"><img src="../../assets/img/weixinImg/icon_binding@2x.png"></div>
      <section>
        <div class="font-167">解除绑定将无法在微信端通过微信账号快速登陆，无法使用微信账号快捷登陆App。</div>
        <div class="font-167 font-ipt" style="display: none;">为了您账号的安全，绑定后30天内不可解除账号关联。</div>
        <div >
          <span class="span1"><img src="../../assets/img/weixinImg/split@2x.png"></span>
          <span class="span2"><img src="../../assets/img/weixinImg/split@2x.png"></span>
          <p class="font-108 font-ipt cont">确定要解除与当前微信的绑定？</p>
        </div>
        <div class="unbindBtn cont font-col-b bt-color font-133" @click="gobackSet">保持绑定</div>
        <div class="unbindBtn cont font-96 font-133" @click="requireunbind">解除绑定</div>
      </section>
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="user_format">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script>
  import {unBindWeChat} from '@/api/weixin/weixinApi'//微信前端验签接口
  export default{
    name:"set",
    data(){
      return{
        error_prompt:"",
        content:"",
        toke:"",
      }
    },
    methods: {
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      gobackSet(){
        this.$router.go(-1);
      },
      requireunbind(){
        this.toke = localStorage.getItem("userID");
        let self = this;
        if(this.toke!=undefined && this.toke!=null && this.toke!=""){
          //查询微信绑定接口文档
          let openId = localStorage.getItem('openId');
          if(openId!=undefined && openId!=null && openId!=""){
            unBindWeChat(this.toke,openId).then(res => {
              if(res.data.code == 200) {//成功
                let wxnickName = localStorage.getItem('wxnickName');
                let headimgurl = localStorage.getItem('headimgurl');
                let mobile = localStorage.getItem('loginTell');
                localStorage.clear();
                localStorage.setItem("wxnickName",wxnickName);
                localStorage.setItem("headimgurl",headimgurl);
                localStorage.setItem("mobile",mobile);
                self.$router.push({name:'user'});
              }else{
                self.error_prompt="tel-message";
                self.content = res.data.msg;
              }
            },res => {
              self.error_prompt="tel-message";
              self.content = res.data.msg;
            })
          }
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
  }
</script>
<style>
  .unbind .unbindWrap{
    width:100%;
    height:12.75rem;
  }
  .unbind .unbindWrap img{
    margin-top:2.66666rem;
    display:inline-block;
    width:4.6666666rem;
    height:7.4166666rem;
  }
  .unbind section{
    margin:0 1.0833333rem;
  }
  .unbind section div:nth-of-type(1){
    color:#2A2E2E;
    margin-bottom:2rem;
  }
  .unbind section div:nth-of-type(3){
    margin:3.416666rem 0 2.66667rem;
    position:relative;
  }
  .unbind section div span{
    position:absolute;
    top:50%;
  }
  .unbind section div .span1{
    left:0;
  }
  .unbind section div .span2{
    right:0;
  }
  .unbind section span img{
    width:6.1666666rem;
    height:1px;
  }
  .unbind section .unbindBtn{
    width:100%;
    height:3.833333rem;
    line-height:3.8333333rem;
  }
  .unbind section div:nth-of-type(5){
    margin-top:1.66666rem;
      border-radius: 0.4rem;
      border:solid 1px #e5e5e5;
  }
</style>

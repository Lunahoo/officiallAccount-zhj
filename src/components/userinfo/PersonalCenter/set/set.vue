<template>
    <div class="set bg-f6">
      <ul>
        <!--<router-link to="paymentset" tag="li">支付设置</router-link>-->
        <li class="bg-ff" @click="topawManagePage">
          <div class="bd-btm">
            密码管理
            <img class="img_set" src="../../../../assets/img/right.png">
          </div>
        </li>
        <li class="bg-ff" @click="tofeedbackPage">
          <div>
            意见反馈
            <img class="img_set" src="../../../../assets/img/right.png">
          </div>
        </li>
      </ul>
      <div class="set_signOut" v-if="!this.$root.$data.bindingWeixin" @click="sigOutC">退出账号</div>
      <div class="set_signOut" @click="querybBinding" v-if="this.$root.$data.bindingWeixin">解除绑定</div>
      <div class="mask" v-if="isShow1" @click="isShowHide">
        <div class="Popup">
          <div class="Retrieve">
            <p @click="outLogin" class="font-22d" style="border-radius: 7px 7px 0 0;">退出登录</p>
            <p @click="SwitchAccount" class="bd-top" style="border-radius: 0 0 7px 7px;">切换账号</p>
          </div>
          <div class="cancel"><p style="margin: 0 0.75rem;border-radius: 5px;" @click="mask1">取消</p></div>
        </div>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="user_format">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script>
  import {signOut} from '@/api/user/SignOut'
  import {queryWeChatIsUnBind} from '@/api/weixin/weixinApi'
  export default{
    name:"set",
    data(){
      return{
        value1: true,
        value2: false,
        isShow1:false,
        toke:'',
        aa:'',
        weixin:false,
        error_prompt:"",
        content:""
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '设置';
      if(this.isWeixn()){
          this.weixin = true;
      }else{
        this.weixin = false;
      }
    },
    methods: {
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      isShowHide(){
        this.isShow1 = false
      },
      sigOutC(){
          this.isShow1 = true
      },
      //退出登录
      outLogin(){
        this.isShow1 = false
        this.toke = localStorage.getItem("userID");
        signOut(this.toke).then(res => {
          localStorage.clear();
          if(res.data.code == 200) {//成功
            this.$router.push({name:'home'});
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res => {
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //查询微信绑定关系
      querybBinding(){
        this.toke = localStorage.getItem("userID");
        if(this.toke!=undefined && this.toke!=null && this.toke!="" && this.toke!='undefined' && this.toke!='null'){
          //查询微信绑定接口文档
          let openId = localStorage.getItem('openId');
          if(openId!=undefined && openId!=null && openId!="" && openId!='undefined' && openId!='null'){
            queryWeChatIsUnBind(this.toke,openId).then(res => {
              if(res.data.code == 200) {//成功
                this.$router.push({name:'unbind'});
              }else{
                this.$router.push({name:'unbindFail'});
              }
            },res => {
              this.$router.push({name:'unbindFail'});
            })
          }
        }else{
          this.error_prompt="tel-message";
          this.content = "未获取用户登录信息";
        }
      },
      topawManagePage(){
        this.$router.push({name:'pawManage'});
      },
      tofeedbackPage(){
        this.$router.push({name:'feedback'});
      },
      //切换账号
      SwitchAccount(){
        this.isShow1 = false
        let mobile = localStorage.getItem('loginTell');
        localStorage.clear();
        localStorage.setItem("loginToPage",'home');
        localStorage.setItem("loginTell",mobile);
        this.$router.push({name:'login'});
      },
      //取消
      mask1(){
        this.isShow1 = false
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
  .set{
    height: 100%;
  }
  .img_set{
    width: 0.416666667rem;
    float: right;
    padding: 1.5rem 1rem;
    /*padding: 1rem;*/
  }
  .set ul{
   /* background:#FFFFFF;
    padding-left:1.5rem;*/
    padding-top:1.5rem;
  }
  .set ul li{
    padding-left: 1.083rem;
    height:3.74rem;
    line-height:3.74rem;
    font-size:1.25rem;
    background-size: 0.5833333rem;
  }
  .set ul li:nth-of-type(3){
    position:relative;
  }
  .set ul li:last-of-type{
    border:none;
  }
  .set ul li span{
    position:absolute;
    right:18%;
    font-size:1rem;
    color:#7E7A7A;
  }
  .set_signOut{
    position:absolute;
    bottom:5.75rem;
    width:100%;
    height:3.75rem;
    text-align:center;
    font-size:1.333rem;
    line-height:3.75rem;
    background:#FFFFFF;
  }
  .set .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    /*display: none;*/
  }
  .set .Popup{
    width:100%;
    position: absolute;
    bottom: 0.75rem;
    left: 0;
    text-align: center;
    font-size: 1.5rem;
  }
  .set .Retrieve{
    margin:0 0.75rem;
  }
  .set .Popup p{
    background: #fff;
    line-height: 4.1666667rem;
    font-size: 1.4rem;
  }
  .set .Popup .cancel {
    margin-top: 0.583333333rem;
  }
  /*5*/
  @media screen and (max-width:321px){

  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px) {

  }
</style>

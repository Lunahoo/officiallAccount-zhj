<template>
  <div class="user bg-f6"><!--{path:'/test',query: {name: id}}-->
    <div v-if="userChoice" class="fillIn-mask height"></div>
    <div id="userheader" class="bg-color-3B9" style="z-index: 1">
      <div class="fl userNickname pst-abs" style="height: 15%" @click="goInfoLogin">
        <div class="fl height width">
          <div class="user-title height fl">
            <div class="user-photo">
              <img class="portrait" v-if="userCenterInfo.head_url!='' && userCenterInfo.head_url!=null && userCenterInfo.head_url!='null' && userCenterInfo.head_url!=undefined && userCenterInfo.head_url!='undefined'" :src="userCenterInfo.head_url">
              <img class="portrait" v-if="userCenterInfo.head_url=='' || userCenterInfo.head_url==null || userCenterInfo.head_url==undefined ||userCenterInfo.head_url=='undefined'" src="../../../assets/image/man.png">
            </div>
          </div>
          <div class="Nickname fl">
            <p class="Nick width" v-if="userStatus!=undefined && userStatus!='' && userStatus!=null && userStatus!='undefined' && undefined!='null'">{{userStatus|strNickName}}</p>
            <p class="Nick width" v-if="userStatus==undefined || userStatus=='' || userStatus==null || userStatus=='undefined' || undefined=='null'">用户昵称</p>
            <p class="user-phone" v-if="userMobile=='' || userMobile==null || userMobile == undefined || userMobile == 'undefined'">登录后可体验更多功能</p>
            <p class="user-phone" v-if="userMobile != 'null' && userMobile != '' && userMobile!=undefined">{{userMobile|encrypt}}</p>
          </div>
          <div class="fr user-top-right">
            <img src="../../../assets/img/rightFFF.png" />
          </div>
        </div>
      </div>
    </div>
    <!--邀请好友 -->
    <!--<div id="inviteImg" @click="inviteFriends" class="inviteFriends"><img src="../../../assets/img/inviteIndex/img_mebanner@2x.png" ></div>-->
    <inviteUser></inviteUser>
    <!--消费券 style="margin-top: 8.3333333rem"-->
    <div class="user_overflow_main" style=" overflow-y: scroll;">
      <div id="userpage">
        <div class="broadcast fl bg-f6">
          <section class="user-main bg-ff fl" v-for="(item,index) in menuList" :key="index" @click="clickEvent(item.name)" :class="index==0||index==2||index==4 || index==5?bottomA:bot">
            <div class="user-conter fl">
              <div class="user-conter-xf-l fl">
                <img class="user-c-icon" :src="item.url"/>
              </div>
              <div class="user-conter-xf-r fr bd-btmf1" :class="index==1||index==3?bot:bottomB">
                <div class="user-c-font fl">{{item.name}}</div>
                <div class="user-c-money fr">
                  <div class="user-c-money-img fr width">
                    <img class="user-c-money-icon fr" src="../../../assets/img/right.png"/>
                    <span v-if="item.name=='消费券'" class="fr mG-lfr1">{{userCenterInfo.couponAmount|money}}元</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
    <section class="zz" v-show="showDia">
      <div class="wrapcenter">
        <div class="wrapcenter_tips bg-ff">
          <div class="section_top cont font-12" style="line-height: 4.1rem;">需要完善并验证手机号</div>
          <div class="section_bottom">
            <div class="qx_set" @click="showDia = false">取消</div>
            <div class="qx_right qx_set" @click="toGetToken">去完善</div>
          </div>
        </div>
      </div>
    </section>
    <div id="userfooter" class="width btm-0 pst-abs">
      <footbar></footbar>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  import footbar from '../../footbar.vue';
  import inviteUser from './inviteUser.vue';
  import set from '../../userinfo/PersonalCenter/set/set.vue';
  import {queryMemberNew,queryMemberCenter} from '@/api/user/userLogin';
  import {selectCompanyShow} from '@/api/user/news'
  import {getJiaFuUrl,queryWeChatBind} from '@/api/user/headService';
  import {queryMenu} from "@/api/user/loginReg";
  import {queryRecommendCode} from '@/api/inviteFriends/inviteFs'   //邀请好友
  export default{
    data:function(){
      return {
        newsT:[
          /*{ message: '国开发展基金有限公司',companyId:'001'},
           { message: '上海砾洲医学科技责任有限公司',companyId:'002'},
           { message: '上海广略外包服务有限公司',companyId:'003'},*/
        ],
        money:true,
        acstoken:false,
        showDia:false,
        userStatus:'',
        userMobile:'',
        username:"",
        pwd:"",
        tel:"",
        toAccount:"",     //我的账单
        toJBT:'',
        error_prompt:"",
        content:"",
        bottomA:"bt-bottom",
        bottomB:"bt-border",
        pdA:"pdL",
        pdB:"pdS",
        service:'',
        userToken:"",
        man:true,
        menuList:[
          { name:'消费券',url:require('../../../assets/img/user/icon_XiaoFeiQuan.png')},
          { name:'现金账户',url:require('../../../assets/img/user/icon_BankCard.png')},
          { name:'账单',url:require('../../../assets/img/user/icon_Bill.png')},
          { name:'开票设置',url:require('../../../assets/img/user/icon_Reimburse.png')},
          { name:'银行卡',url:require('../../../assets/img/user/icon_BankCard.png')},
          { name:'设置',url:require('../../../assets/img/user/icon_Setting.png')}
        ],
        bot:"",
        companyId:"",
        queryM:{
          className:"",
          type:2,
          grouped:"",
        },
        userCenterInfo:{
          head_url:''
        },
        queryInfoData:{
          memberId:"",
          companyId:"",
          canTransfer:"",
          balanceTypeList:[]
        }
      }
    },
    methods:{
      userInit(){
        let self = this;
        self.$root.$data.vBack=false;

        if(localStorage.getItem("userID")!=null && localStorage.getItem("userID")!=undefined && localStorage.getItem("userID")!="" && localStorage.getItem("userID")!='null'){
          self.acstoken = true;
          self.getQueryMemberCenter();
        }else{
          self.acstoken = false;
        }
      },
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      toGetToken(){
        this.showDia = false;
        localStorage.setItem("loginToPage",'user');
        this.$router.push({name:'login'});
      },
      clickEvent(itemName){
        let userId = localStorage.getItem('userID');
        if(userId=="" || userId==null || userId=='null' || userId==undefined || userId=='undefined'){
          this.showDia = true;
        }else {
          if (itemName == "设置") {
            if (localStorage.getItem('userID') != null && localStorage.getItem('userID') != "" && localStorage.getItem('userID') != undefined) {
              this.$router.push({name: 'set'});
            } else {
              this.$router.push({name: 'login'});
            }
          } else if (itemName == "银行卡") {
            this.$router.push({path: "bankCard"})
          } else if (itemName == "消费券") {
            this.getVoucherAttributeInfo(this.queryInfoData);
          } else if (itemName == "现金账户") {
            this.$router.push({name: 'cashAccount'});
          } else if (itemName == "账单") {
            this.$router.push({name: 'bill'});
          } else if (itemName == "开票设置") {
            this.$router.push({name: 'openInvoiceSet'});
          }
        }
      },
      goInfoLogin(){
        if(localStorage.getItem("userID")==null || localStorage.getItem("userID") == '' || localStorage.getItem("userID")== undefined){
          localStorage.setItem("loginToPage",'user');
          this.$router.push({name:'login'});
        }else{
          this.$router.push({name:'personalInfo'});
        }
      },
      getQueryMemberCenter(){
        if(localStorage.getItem("userID")!=null && localStorage.getItem("userID") != '' && localStorage.getItem("userID")!= undefined){
          let self = this;
          queryMemberCenter(localStorage.getItem("userID"),"").then(res => {
            if(res.data.code == 200){
              self.userCenterInfo = res.data.data;
              if(self.userCenterInfo.nickName!=undefined && self.userCenterInfo.nickName!=null && self.userCenterInfo.nickName!=""){
                self.userStatus = self.userCenterInfo.nickName;
                localStorage.setItem('nickName',self.userStatus);
              }else{
                if(localStorage.getItem('nickName')!=null && localStorage.getItem('nickName')!="" && localStorage.getItem('nickName')!=undefined){
                  self.userStatus = localStorage.getItem('nickName');
                }else{
                  if(localStorage.getItem('wxnickName')!=null && localStorage.getItem('wxnickName')!="" && localStorage.getItem('wxnickName')!=undefined){
                    self.userStatus = localStorage.getItem('wxnickName');
                  }else{
                    if(self.userCenterInfo.realName!=undefined && self.userCenterInfo.realName!=null && self.userCenterInfo.realName!=""){
                      self.userStatus = self.userCenterInfo.realName;
                    }
                  }
                }
              }
              if(self.userCenterInfo.head_url!=undefined && self.userCenterInfo.head_url!=null && self.userCenterInfo.head_url!="" && self.userCenterInfo.head_url!="null"){
                localStorage.setItem('head_url',self.userCenterInfo.head_url);
              }else{
                if(localStorage.getItem('head_url')!=undefined && localStorage.getItem('head_url')!=null && localStorage.getItem('head_url')!="" && localStorage.getItem('head_url')!="null"){
                  self.userCenterInfo.head_url = localStorage.getItem('head_url');
                }else if(localStorage.getItem('headimgurl')!=null && localStorage.getItem('headimgurl')!="" && localStorage.getItem('headimgurl')!=undefined){
                  self.userCenterInfo.head_url = localStorage.getItem('headimgurl');
                }else{
                  self.userCenterInfo.head_url = null;
                }
                if(self.userCenterInfo.head_url!=undefined && self.userCenterInfo.head_url!=null && self.userCenterInfo.head_url!="" && self.userCenterInfo.head_url!="null"){
                  localStorage.setItem('head_url',this.userCenterInfo.head_url);
                }
              }
            }else{
              self.error_prompt="tel-message";
              self.content = res.data.msg;
              self.unFindMemberCenter();
            }
          },res =>{
            self.unFindMemberCenter();
          })
        }else{
          if(localStorage.getItem('headimgurl')!=null && localStorage.getItem('headimgurl')!="" && localStorage.getItem('headimgurl')!=undefined){
            this.userCenterInfo.head_url = localStorage.getItem('headimgurl');
          }else{
            if(localStorage.getItem('head_url')!=null && localStorage.getItem('head_url')!="" && localStorage.getItem('head_url')!=undefined){
              this.userCenterInfo.head_url = localStorage.getItem('head_url');
            }else{
              this.userCenterInfo.head_url = null;
            }
          }
          if(this.userCenterInfo.head_url!=undefined && this.userCenterInfo.head_url!=null && this.userCenterInfo.head_url!=""){
            localStorage.setItem('head_url',this.userCenterInfo.head_url);
          }
          if(localStorage.getItem('nickName')!=null && localStorage.getItem('nickName')!="" && localStorage.getItem('nickName')!=undefined){
            this.userStatus = localStorage.getItem('nickName');
          }else{
            if(localStorage.getItem('wxnickName')!=null && localStorage.getItem('wxnickName')!="" && localStorage.getItem('wxnickName')!=undefined){
              this.userStatus = localStorage.getItem('wxnickName');
            }
          }
          if(this.acstoken){
            if(localStorage.getItem("loginTell")!=null && localStorage.getItem("loginTell")!="" && localStorage.getItem("loginTell")!=undefined){
              this.userMobile = localStorage.getItem("loginTell")
            }else{
              this.userMobile = "";
            }
          }else{
            this.userMobile = "";
          }
        }
      },
      unFindMemberCenter(){
        if(localStorage.getItem('head_url')!=undefined && localStorage.getItem('head_url')!=null && localStorage.getItem('head_url')!=""){
          this.userCenterInfo.head_url = localStorage.getItem('head_url');
        }else if(localStorage.getItem('headimgurl')!=null && localStorage.getItem('headimgurl')!="" && localStorage.getItem('headimgurl')!=undefined){
          this.userCenterInfo.head_url = localStorage.getItem('headimgurl');
        }else{
          this.userCenterInfo.head_url = null;
        }
        if(this.userCenterInfo.head_url!=undefined && this.userCenterInfo.head_url!=null && this.userCenterInfo.head_url!=""){
          localStorage.setItem('head_url',this.userCenterInfo.head_url);
        }
        if(localStorage.getItem('nickName')!=null && localStorage.getItem('nickName')!="" && localStorage.getItem('nickName')!=undefined && localStorage.getItem('nickName')!='null'){
          this.userStatus = localStorage.getItem('nickName');
        }else{
          if(localStorage.getItem('wxnickName')!=null && localStorage.getItem('wxnickName')!="" && localStorage.getItem('wxnickName')!=undefined && localStorage.getItem('wxnickName')!='null'){
            this.userStatus = localStorage.getItem('wxnickName');
          }else{
            if(this.userCenterInfo.realName!=undefined && this.userCenterInfo.realName!=null && this.userCenterInfo.realName!="" && this.userCenterInfo.realName!="null"){
              this.userStatus = this.userCenterInfo.realName;
            }
          }
          localStorage.setItem('nickName',this.userStatus);
        }
        if(this.acstoken){
          if(localStorage.getItem("loginTell")!=null && localStorage.getItem("loginTell")!="" && localStorage.getItem("loginTell")!=undefined){
            this.userMobile = localStorage.getItem("loginTell")
          }else{
            this.userMobile = "";
          }
        }else{
          this.userMobile = "";
        }
      },
    },
    mounted () {
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      });

    },
    computed:{
      /*verifyError:function(){
       return this.$verify.$errors;
       }*/
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
        }
      }
    },
    created(){
      let userToken = localStorage.getItem("userID");
      if (localStorage.getItem("loginTell") != null && localStorage.getItem("loginTell") != "" && localStorage.getItem("loginTell") != undefined) {
        this.userMobile = localStorage.getItem("loginTell");
      } else {
        this.userMobile = "";
      }
      if(localStorage.getItem('head_url')!=undefined && localStorage.getItem('head_url')!=null && localStorage.getItem('head_url')!=""){
        this.userCenterInfo.head_url = localStorage.getItem('head_url');
      }else if(localStorage.getItem('headimgurl')!=null && localStorage.getItem('headimgurl')!="" && localStorage.getItem('headimgurl')!=undefined){
        this.userCenterInfo.head_url = localStorage.getItem('headimgurl');
      }else{
        this.userCenterInfo.head_url = null;
      }
      if(localStorage.getItem('nickName')!=null && localStorage.getItem('nickName')!="" && localStorage.getItem('nickName')!=undefined && localStorage.getItem('nickName')!='null'){
        this.userStatus = localStorage.getItem('nickName');
      }else{
        if(localStorage.getItem('wxnickName')!=null && localStorage.getItem('wxnickName')!="" && localStorage.getItem('wxnickName')!=undefined && localStorage.getItem('wxnickName')!='null'){
          this.userStatus = localStorage.getItem('wxnickName');
        }else{
          if(this.userCenterInfo.realName!=undefined && this.userCenterInfo.realName!=null && this.userCenterInfo.realName!="" && this.userCenterInfo.realName!="null"){
            this.userStatus = this.userCenterInfo.realName;
          }
        }
        localStorage.setItem('nickName',this.userStatus);
      }
      if(userToken !=null && userToken!="" && userToken!=undefined && userToken!="null" && userToken!='undefined'){
        this.acstoken = true;
      }else{
        this.acstoken = false;
      }
      let url = window.location.href;
      if(this.isWeixn()){
        if (url.indexOf('openid') > 0) {
          this.byOpenIdgetInfo(this.getOpenId(url),'user','50006');
        }else {
            if (url.indexOf('openid') > 0) {
              this.byOpenIdgetInfo(this.getOpenId(url),'user','50006');
            }else {
              if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
                  this.byOpenIdgetInfo(localStorage.getItem('openId'),'user','50006');
              }else{
                //静默授权
                window.location.href = axios.defaults.baseURL+'/wx/rest/wx/v1/redirect?flag=one&page=50006&redirect_uri='+this.$root.$data.redirect_uri;
              }
            }
        }
      }else{
        if(this.acstoken){
          this.userInit(userToken);
        }else{
          this.userCenterInfo.head_url = null;
          this.userMobile = "";
          this.userStatus = "未登录"
        }
      }
    },
    components:{
      footbar,inviteUser
    },
  }

</script>
<style scoped>
  @import "../../../assets/css/uploader.css";
  .companyNXX:hover{
    color: #1890FF;
  }
  .companyNXX:last-child{
    border-bottom: 0;
  }
  .user_companyN_width{
    width: 95.2%;
    padding: 0px 0 0 1.33333rem;
    border-top: 1px solid #f5f5f5;
  }
  .user{
    height: 100%; /*IE6不识别min-height*/
    position: relative;
  }
  /*.user_overflow_main{
    height: 84%;
  }*/
  .user .bt-bottom{
    margin-bottom: 8pt;
  }
  .user .bt-border{
    border-bottom: 1px solid #F5F5F5;
  }
  .user label{color:red;}
  .user .user-ipt{
    width: 19rem;
    height: 2.5rem;
    border-radius: 0.6rem;
    margin-bottom:0.3rem;
    margin-left:0.5rem;
    text-indent:0.7rem;
  }
  .user button{
    margin-left:0.5rem;
    width: 19rem;
    height: 2.5rem;
    background:rgb(130,162,255);
  }
  .user #error_prompt{
    width: 19rem;
    height: 2.5rem;
    line-height:2.5rem;
    background:rgb(48,48,48);
    color:#fff;
    text-align:center;
    margin-left:1rem;
    margin-top:1rem;
    vertical-align: center;
    border-radius: 0.4rem;
    display:none;
  }
  .user .tel-message{
    display:block!important;
  }
  /*user页头部*/
  .user .section:nth-of-type(1){
    margin-top: 1.33333333rem;
  }
  .user-main{
    justify-content: center;
    display: flex;
  }
  .user .pdL{
    padding-top:0;
  }
  .user .pdS{
    padding-top:0;
  }
  .user_title_main_pad{
    padding: 1rem 1.333333rem;
  }
  .user_title_main_pad .ellipsis_user{
    max-width: 23rem;
  }
  .user_title_main_img{
    width: 0.916667rem;
    padding: 0.7rem 1rem 0;
  }
  .user .user_title_main{
    margin: 0 1.0833333rem;
    width: 93%;
    border-radius: 4px;
    box-shadow: 0 1px 4px #DFF1FF;
  }
  .user .userNickname .user-title{
    /* padding-top: 12%;*/
    padding-left: 1.5rem;
  }
  .user .userNickname .user-title .user-photo{
    width: 5rem;
    height: 5rem;
    border-radius: 20rem;
    overflow: hidden;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .user .userNickname .user-photo .portrait{
    width: 5rem;
    height: 5rem;
    /*border-radius: 5rem;*/
  }
  .user .userNickname .Nickname{
    /* padding:0.8rem 0 0 1.1666667rem;*/
    color: #fff;
    margin-left: 0.91666667rem;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .user .userNickname .Nickname .Nick{
    font: 1.5rem/2rem arial;
    font-weight: bolder;
  }
  .user .userNickname .Nickname .user-phone{
    font: 1rem/1.5rem arial;
    margin-top: 4pt;
  }
  .user .photo-right .details{
    width: 0.5833333rem;
    padding-right: 2rem;
    padding-top: 3.83333333rem;
  }
  .user-main .user-conter{
    margin: 0 0 0 1.08333333rem;
    /*height:3.74rem;*/
  }
  .user-main .user-conter .user-conter-xf-l{
    padding-top: 0.875rem;
  }
  .user-main .user-conter .user-conter-xf-r{
    width: 83%;
    line-height: 3.74rem;
    margin-right: 1.75rem;
    font-size: 1.1666666667rem;
  }
  .user-main .user-conter .user-conter-xf-l .user-c-icon{
    width: 2.6666667rem;
  }
  .user-main .user-conter-xf-r .user-c-money-img .user-c-money-icon{
    width: 0.416666667rem;
    padding-top:1.4rem;
  }
  .user-main .user-conter-xf-r .user-c-money{
    width:40%;
  }
  .user-conter-xf-r .user-c-money-f{
    color: #BFBBBB;
    width: 9rem;
    display: inline-block;
    float: none;
    text-align: right;
  }
  .user .user-conter-xf-r .JBTa {
    /*display:block;*/
    /*width: 81%;*/
    /*height: 3.75rem;*/
  }
  #userpage{
    width: 100%;
    margin: 0 auto;/*
    padding-top: 1rem;*/
  }
  #userfooter{
    /* height: 9%;!*脚部的高度*!*/
    background: #fafafa;
    clear:both;
  }
  .user .fillIn-mask{
    position: absolute;
    top: 13%;
    left: 0;
    width: 100%;
    height: 87%;
    background: #000;
    opacity: 0.2;
    z-index: 10;
  }
  #userheader{
    height:15%;
  }
  /*邀请好友*/
  .user .inviteFriends{
    /*width: 29.08333rem;*/
    margin:0.66666rem 1.083rem;
    /*height: 6.83333rem;*/
  }
  .user-top-right{
    padding-top: 11%;
    width: 0.6rem;
    padding-right: 1.083rem;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .user .fillIn-mask{
      top: 15%;
      height: 85%;
    }
    .user_companyN_width{
      width: 94%;
    }
    .user .user_title_main{
      width: 92%;
    }
    .user-main .user-conter .user-conter-xf-r{
      width: 81%;
    }
    .user-conter-xf-r .user-c-money-f{
      width: 7rem;
    }
    .user_title_main_pad .ellipsis_user{
      max-width: 19rem;
    }
  }
  @media screen and (max-width:768px)and (min-width: 450px){
    .user-top-right{
      padding-top: 9%;
    }
  }
</style>

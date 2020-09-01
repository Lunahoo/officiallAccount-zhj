<template>
  <div class="simpleReim width height pst-rlt">
    <div class="simpleReimWrap" :style="{'overflow-y':overflowAB?'hidden':'auto'}">
      <!--最底层-->
      <div v-if="simpleReimMask" class="fillIn-mask"></div>
      <div class="sim_wrap width pst-rlt" @click="simChoiceCP">
        <div class="mar_l font-133 pst-rlt">
          <div class="fl conpanyName pst-abs" ref="reim_name">{{nowCompanyName}}</div>
          <div class="sim_img fl pst-abs" v-if="showCompanys"><!-- -->
            <img class="sim_wrap_img" v-if="!simpleReimMask" src="../../assets/img/account/icon_white_down@2x.png" />
            <img class="sim_wrap_img" v-else="simpleReimMask" src="../../assets/img/account/icon_white_up@2x.png" />
          </div>
        </div>
        <div class="fl mar_l font-1" style="margin-top: 2.3rem" v-if="identificationNumber!='' && identificationNumber!=undefined && identificationNumber!='undefined'">税号：<span>{{identificationNumber}}</span></div>
        <div v-if="showsimpleReimMask" class="pst-abs width" style="color: #000;top: 4.583333rem;z-index: 100000;">
          <div style="margin: 0 1.0833333rem;padding: 0 1.333333rem;" @click="changeCompanyN(item.companyId,item.companyName,item.identificationNumber)" ref="companyColor" class="sim_wrap_list bd-btm font-167 height-4083 bg-ff" v-for="(item, index) in newsT" :key="index">{{item.companyName}}</div>
        </div>
      </div>
      <!--浮动层-->
      <div class="sim_fly pst-rlt">
        <ul class="sim_num bg-ff pst-abs">
          <li @click="toFill(event,'3')">
          <div class="font-2a2a font-b ellipsis_name">¥{{invoiceAmt|money}}</div>   <!--{{this.invoiceAmt}}-->
            <p class="font-ipt font-108">有效发票（{{invoiceNumber}}张）</p>   <!--{{this.invoiceNumber}}-->
          </li>
          <li @click="tonewAmountPage">
          <div class="font-2a2a font-b ellipsis_name">¥{{couponAmt|money}}</div>     <!--{{this.couponAmt}}-->
            <p class="font-ipt font-108">可报销</p>
          </li>
          <li @click="toAddminPage(event)">
          <div class="font-2a2a font-b ellipsis_name">¥{{approvalAmt|money}}</div>     <!--{{this.approvalAmt}}-->
            <p class="font-ipt font-108">审批中</p>
          </li>
          <li @click="toAddminPage(event,'valid')">
          <div class="font-2a2a font-b ellipsis_name">¥{{reimbursedAmt|money}}</div>  <!--{{this.reimbursedAmt}}-->
            <p class="font-ipt font-108">已报销</p>
          </li>
        </ul>
        <div class="BXsubject">
          <h3 class="font-s15">报销科目</h3>
          <!--报销科目为空时 v-if="bxSubject!=undefined"-->
          <div v-if="BXKMkong" class="bxKong_Status font-1">
            <div class="cont"><img src="../../assets/image/img_blank_page@2x.png" class="dis_inb"></div>
            <div class="cont font-2a2a">企业暂未设置报销科目</div>
            <div class="cont font-a39">可联系企业相关管理员设置并启用</div>
          </div>
          <div v-else="!BXKMkong">
            <ul class="width">
              <li class="fl" v-for="(item,index) in bxSubject" :key="index" @click="toChooseFill(item.code,item.id,item.name)">
                <div class="cont"><img :src="picUrl" class="dis_inb"></div>
                <p class="cont font-1" style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;line-clamp: 3;-webkit-box-orient: vertical;">{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
      <!--底部footer-->
      <div class="simpleReim_footer pst-abs width bg-ff">
        <section class="width pst-rlt">
          <div class="foot_left fl">
            <div class="cont"><img src="../../assets/img/icon_SimpleReimbursement_pressed.png"></div>
            <p class="Imp font-F89 cont">简易报销</p>
          </div>
          <div class="foot_center fl pst-abs" @click="toFill">
          <div class="cont"><img src="../../assets/img/icon_invoice.png"></div>
            <p class="Imp font-a39 cont">发票</p>
          </div>
          <div class="foot_right fr" @click="toAddmini">
          <div class="cont"><img src="../../assets/img/icon_ReimbursementForm.png"></div>
            <p class="Imp font-a39 cont">报销单</p>
          </div>
        </section>
      </div>
      <section class="zz" v-show="checkShowsimpleReim">
        <div class="wrapcenter">
          <div class="wrapcenter_tips">
            <div class="section_top">您还没有归属企业，暂时不能使用该功能</div>
            <div class="section_bottom">
              <div class="qx_set1 font-fa" @click="simReimGoBack">知道了</div>
            </div>
          </div>
        </div>
      </section>
      <div class="Loading" v-if="Loading"><img src="../../assets/img/Loading/loading.gif"></div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
        </div>
      </div>
  </div>
</template>
<script>
  import {queryMemberNew} from '@/api/user/userLogin'
  import {queryReimburseInfoAll} from '@/api/user/SignOut'
  import {selectCompanyShow} from '@/api/user/news'
  export default{
    data: function () {
      return {
        simpleReimMask:false,
        showsimpleReimMask:false,
        showCompanys:true,
        identificationNumber:"",
        Loading:false,
        BXKMkong:false,
        overflowAB:false,
        checkShowsimpleReim:false,
        error_prompt:"",
        content:"",
        nowCompanyName:"",
        newsT:[],
        invoiceAmt:"",       //有效发票(可报销状态的含税金额)
        invoiceNumber:"",       //发票数量
        couponAmt:"",           //可报销
        approvalAmt:"",           //审批中
        reimbursedAmt:"",           //已报销
        information:{
            companyId:localStorage.getItem("companyId"),
        },
        picUrl:require('../../assets/img/account/icon_16.png'),
        bxSubject:[/*
          {code:"01",picUrl:require('../../assets/img/account/icon_15.png'),name:"馨琪关爱儿童新创基金"},
          {code:"02",picUrl:require('../../assets/img/account/icon_15.png'),name:"馨琪关爱儿童"},
          {code:"03",picUrl:require('../../assets/img/account/icon_15.png'),name:"馨琪关爱儿童新创基金"},
          {code:"04",picUrl:require('../../assets/img/account/icon_15.png'),name:"投资项目客户招"},
          {code:"05",picUrl:require('../../assets/img/account/icon_15.png'),name:"那个接口的那个卡"},
          {code:"06",picUrl:require('../../assets/img/account/icon_15.png'),name:"哪个接口"},
          {code:"07",picUrl:require('../../assets/img/account/icon_15.png'),name:"儿童新创基金投资项目客户"},
          {code:"08",picUrl:require('../../assets/img/account/icon_15.png'),name:"馨琪关爱儿童新创基金投资项目"},
        */]//报销科目集合
      }
    },
    methods:{
      simpleReimInit(accessToken){
        this.Loading = true;
        let self = this;
        if (accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined') {
          queryMemberNew(accessToken,"").then(res => {
            if (res.data.code == 200) {
              self.Loading = false;
              if(res.data.data.companyList!=null&&res.data.data.companyList!=""&&res.data.data.companyList!=undefined) {
                if(res.data.data.companyList.length==1){
                  self.showCompanys = false;
                  self.simpleReimMask = false;
                  self.identificationNumber = res.data.data.companyList[0].identificationNumber;
                }else{
                  self.newsT = res.data.data.companyList;
                  if(localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!="null"){
                    if(self.identificationNumber == "" || self.identificationNumber == null || self.identificationNumber == undefined){
                      for(let i=0;i<self.newsT.length;i++){
                        if(self.newsT[i].companyId == localStorage.getItem("companyId")){
                          self.identificationNumber = self.newsT[i].identificationNumber;
                        }
                      }
                    }
                  }
                  self.showCompanys = true;
                }
                //报销科目
                self.getqueryReimburseInfoAll();
                //判断是否多企业用户
              }else{
                self.showCompanys = false;
                self.Loading = false;
                self.checkShowsimpleReim = true;
              }
            }else{
              self.showCompanys = false;
              self.Loading = false;
              self.identificationNumber = "";
              self.error_prompt="tel-message";
              self.content = res.data.msg;
            }
          });
        }else{
          localStorage.setItem("loginToPage",'simpleReim');
          this.$router.push({name: 'login'});
        }
      },
      timer(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      changeCompanyN(companyId,companyName,identificationNumber){
        this.nowCompanyName = companyName;
        this.identificationNumber = identificationNumber;
        this.userChoice= false;
        selectCompanyShow(localStorage.getItem("userID"),companyId).then(res => {
          if(res.data.code == 200){
            localStorage.setItem("companyId",companyId);
            localStorage.setItem("companyName",companyName);
            localStorage.setItem("identificationNumber",identificationNumber);
            //更换报销科目接口
            this.getqueryReimburseInfoAll();
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res => {
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        });
      },
      simReimGoBack(){
        this.checkShowsimpleReim = false;
        this.$router.push({name:"home"});
      },
      simChoiceCP(){
          if(this.showCompanys){
            this.overflowAB = true;
            this.simpleReimMask = !this.simpleReimMask;
            this.showsimpleReimMask = !this.showsimpleReimMask;
          }
      },
      toChooseFill(code,id,name){
        localStorage.setItem('mainSubjectCode',code);
        localStorage.setItem('mainSubjectId',id);
        localStorage.setItem('mainSubjectName',name);
        this.$router.push({name:'chooseInvoice'});
      },
      tonewAmountPage(){
        this.$router.push({name:'voucherEnterprise',params:{toPage:'simpleReim',companyId:localStorage.getItem('companyId'),companyName:localStorage.getItem('companyName')}});
      },
      toAddminPage(event,value){
        if(value == undefined || value == null || value == ""){
          this.$router.push({name:'addministration'});
        }else{
          this.$router.push({name:'addministration',params:{status:value}});
        }
      },
      toAddmini(){
        this.$router.push({name:"addministration"});
      },
      toFill(event,status){
          if(status!=undefined && status!=''){
            this.$router.push({name:"fill",params:{status:'3'}});
          }else{
            this.$router.push({name:"fill"});
          }
      },
      //获取全部报销科目
      getqueryReimburseInfoAll(){
        this.information.companyId = localStorage.getItem('companyId');
        queryReimburseInfoAll(this.accessToken,this.information.companyId).then(res =>{
          if(res.data.code == 200){
            this.invoiceAmt = res.data.data.invoiceAmt;     //有效发票(可报销状态的含税金额)
            this.invoiceNumber = res.data.data.invoiceNumber;     //发票数量
            this.couponAmt = res.data.data.couponAmt;        //可报销券额度
            this.approvalAmt = res.data.data.approvalAmt;        //审批中
            this.reimbursedAmt = res.data.data.reimbursedAmt;        //已报销
            this.bxSubject = res.data.data.reimburseitemList;
            if(this.bxSubject!=undefined && this.bxSubject.length>0){
              this.BXKMkong = false;
            }else{
              this.BXKMkong = true;
            }
          }else {
            this.BXKMkong = true;
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
          this.BXKMkong = true;
        })
      }

    },
    created(){
      this.accessToken = localStorage.getItem("userID");
      if(localStorage.getItem("companyName")!=null && localStorage.getItem("companyName")!=undefined && localStorage.getItem("companyName")!="" && localStorage.getItem("companyName")!="null"){
        this.nowCompanyName = localStorage.getItem("companyName");
      }
      if(localStorage.getItem("identificationNumber")!=null && localStorage.getItem("identificationNumber")!=undefined && localStorage.getItem("identificationNumber")!="" && localStorage.getItem("identificationNumber")!="null"){
        this.identificationNumber = localStorage.getItem("identificationNumber");
      }
        let url = window.location.href;
        if(this.isWeixn()){
          if (url.indexOf('openid') > 0) {
            this.byOpenIdgetInfo(this.getOpenId(url),'simpleReim');
          }else {
            if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
              this.byOpenIdgetInfo(localStorage.getItem('openId'),'simpleReim');
            }else{
              //静默授权
              this.byWechAtgetOpenId('one',"",this.$root.$data.redirect_uri,'simpleReim')
            }
          }
        }else{
          if (this.accessToken != undefined && this.accessToken != null && this.accessToken != "" && this.accessToken!='null' && this.accessToken!='undefined') {
              this.simpleReimInit(this.accessToken);
          }else{
            localStorage.setItem("loginToPage", 'simpleReim');
            this.$router.push({name: 'login'});
          }
        }
      localStorage.setItem('oldInvoiceList',undefined);
    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    }
  }
</script>
<style scoped>
  /*最底层*/
  .simpleReim .sim_wrap{
    height:13.5rem;
    padding-top:2rem;
    background:url("../../assets/image/img_background@2x.png") no-repeat 0 -1px;
    background-size:100% 15.5rem;
    color:#fff;
  }
  .simpleReim .simpleReimWrap{
    height:93%;
  }
  .simpleReim .fillIn-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.2;
    z-index: 999;
  }
  .simpleReim .sim_wrap .sim_wrap_list:first-child{
    border-radius: 0.4rem 0.4rem 0rem 0rem;
  }
  .simpleReim .sim_wrap .sim_wrap_list:last-child{
    border-radius: 0rem 0rem 0.4rem 0.4rem;
  }
  .simpleReim .sim_wrap .mar_l{
    margin-left:2.833333rem;
  }
  .simpleReim .sim_wrap .mar_l .conpanyName{
    left: 0;
    top: 0;
    z-index: 10000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 20rem;
  }
  .simpleReim .sim_wrap .sim_img{
    top: 2px;
    left: 75%;
    margin-top:0.6667rem;
    z-index: 10000;
  }
  .simpleReim .sim_wrap .sim_img .sim_wrap_img{
    width:0.75rem;
    padding:0.2rem 1.41666667rem;
  }
  .simpleReim .BXsubject{
    width:28.3rem;
    margin:12rem auto 0;
  }
  .simpleReim .BXsubject .bxKong_Status img{
    width:12.5rem;
    height:12.5rem;
  }
  .simpleReim .BXsubject .bxKong_Status div:nth-of-type(2){
    margin-bottom:0.4rem;
  }
  .simpleReim .BXsubject ul{
    margin-top:1.3333rem;
  }
  .simpleReim .BXsubject ul li{
    width:20.7%;
    margin-bottom:1rem;
    margin-right:1.55rem;
  }
  .simpleReim .BXsubject ul li:nth-of-type(4n+4){
    margin-right:0;
  }
  .simpleReim .BXsubject ul li img{
    width:3.833333rem;
    height:3.833333rem;
  }
  .simpleReim .BXsubject ul li div{
    width:6rem;
  }
  .simpleReim .BXsubject ul li p{
    width:6rem;
  }
  /*浮动层*/
  .simpleReim .sim_fly{
    width:100%;
    /*top:8rem;*/
    /*left:0;*/
    /*!*left:1.0833333rem;*!*/
    /*z-index:555;*/
  }
  .simpleReim .sim_fly .sim_num{
    top:-20rem;
    left:50%;
    transform: translateX(-50%);
    z-index:555;
    width:28.3rem;
    height:13.25rem;
    margin:0 auto;
    padding:2.3333rem 0;
    box-shadow:0 1px 10px #3c92ee38;
    -webkit-box-shadow:0 1px 10px #3c92ee38;
    -moz-box-shadow:0 1px 10px #3c92ee38;
    -webkit-appearance: none;
  }
  .simpleReim .sim_fly .sim_num li{
    float:left;
    width:42%;
    margin-left:6.8%;
  }
  .simpleReim .sim_fly .sim_num li:nth-of-type(-n+2){
    margin-bottom:2.3333rem;
  }
  .simpleReim .sim_fly .sim_num li div{
    font-size:1.83333rem;
    margin-bottom:1rem;
  }
  .simpleReim .sim_fly .sim_function{
    width:28.3rem;
    margin:2rem auto 0;
    height:5.83333rem;
    box-shadow:0 0 9px #8888882e;
    -webkit-box-shadow:0 0 9px #8888882e;
    -moz-box-shadow:0 0 9px #8888882e;
    -webkit-appearance: none;
  }
  .simpleReim .sim_fly .sim_function .div{
    margin-left:6.8%;
    width:42%;
  }
  .simpleReim .sim_fly .sim_function img{
    width:2.83333rem;
    height:2.83333rem;
    margin-top:1.45rem;
  }
  .simpleReim .sim_fly .sim_function p{
    height:5.83333rem;
    line-height:5.83333rem;
    margin-left:1.3333rem;
  }
  .simpleReim .sim_fly .sim_function .sim_f_icon{
    height:5.83333rem;
  }
  /*底部footer*/
  .simpleReim .simpleReim_footer{
    left:0;
    bottom:0;
    height:3.75rem;
    box-shadow:1px 0 9px #8888882e;
    -webkit-box-shadow:1px 0 9px #8888882e;
    -moz-box-shadow:1px 0 9px #8888882e;
    -webkit-appearance: none;
    z-index:888;
  }
  .simpleReim .simpleReim_footer section{
    height:3.75rem;
  }
  .simpleReim .simpleReim_footer .foot_left div,.Imp{
    width:4rem;
  }
  .simpleReim .simpleReim_footer .Imp{
    font-size:0.75rem;
  }
  .simpleReim .simpleReim_footer p{
    transform:translateY(-5px);
  }
  .simpleReim .simpleReim_footer img{
    width:2.2rem;
    height:2.2rem;
    display: inline-block;
  }
  .simpleReim .simpleReim_footer .foot_left{
    margin-left:4.75rem;
    height:100%;
  }
  .simpleReim .simpleReim_footer .foot_center{
    height:100%;
    left:50%;
    top:0;
    transform:translateX(-50%);
  }
  .simpleReim .simpleReim_footer .foot_right{
    height:100%;
    margin-right:4.75rem;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .simpleReim .sim_wrap{
      height: 11.5rem;
    }
    .simpleReim .sim_fly .sim_num{
      width:24.5rem;
      height: 11.1rem;
      top:-17.2rem;
    }
    .simpleReim .BXsubject{
      width:24.5rem;
      margin: 11.5rem auto 0;
    }
    .simpleReim .BXsubject ul li{
      width:18.7%;
    }
    .simpleReim .sim_fly .sim_function{
      width:25rem;
    }
    .simpleReim .simpleReim_footer .foot_left{
      margin-left:3.75rem;
    }
    .simpleReim .simpleReim_footer .foot_right{
      margin-right:3.75rem;
    }
    .simpleReim .sim_wrap .mar_l .conpanyName{
      max-width: 20rem;
    }
    .simpleReim .sim_wrap div:nth-of-type(2){
      margin-top:0.5667rem;
    }
  }
  @media screen and (min-width: 1023px){
    .simpleReim .sim_fly .sim_num{
      width:94%;
    }
    .simpleReim .sim_fly .sim_function{
      width:94%;
    }
  }
</style>

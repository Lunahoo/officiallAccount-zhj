<template>
  <div class="voucherHome width height bg-f6 overflow-s" ref="vouchers"><!-- style="position: absolute"-->
    <!--无消费券状态-->
    <div class="vouchersInformation width pst-rlt" ref="voucherInformation" :class="Recharge==true?lHeight:sHeight">
      <div class="informationWarp cont">
        <div class="font-167 pst-rlt font-col-b">
          消费券总额度（元）
          <div class="SZDetailed cont pst-abs font-1" @click="toBudgetPage">收支明细</div>
          <div class="SZDetailed1 cont pst-abs font-1" @click="tosaleHome">智能代卖</div>
        </div>
        <div class="useED font-col-b">{{sumAmount|money}}</div>
        <div class="Account-Modular padTop-2" v-if="AccountAll.length==3">
          <div v-for="(item,index) in AccountAll">
            <div class="Account-Modular-3 fl cont" v-if="index!=2" @click="toVoucherAccountPage(item.name)">
              <span class="Account-title font-1">{{item.name}}(元)</span>
              <div class="font-col-b font-s15">{{item.money|money}}</div>
            </div>
            <div class="Account-Modular-3 fl cont" v-if="index==2" @click="toVoucherAccountPage(item.name)">
              <span class="Account-title font-1">{{item.name}}(元)</span>
              <div class="font-col-b font-s15">{{item.money|money}}</div>
            </div>
          </div>
        </div>
        <div class="Account-Modular1 padTop-2" v-if="AccountAll.length==2">
          <div v-for="(item,index) in AccountAll">
            <div class="Account-Modular-2 fl" v-if="index == 0" @click="toVoucherAccountPage(item.name)">
              <span class="Account-title font-1">{{item.name}}(元)</span>
              <div class="font-col-b font-s15">{{item.money|money}}</div>
            </div>
            <div class="Account-Modular-2 fr" v-if="index == 1" @click="toVoucherAccountPage(item.name)">
              <span class="Account-title font-1">{{item.name}}(元)</span>
              <div class="font-col-b font-s15">{{item.money|money}}</div>
            </div>
          </div>
        </div>
        <div class="fixedArea pst-abs font-167" v-if="canTransfer=='' || canTransfer == '1' || canTransfer == 1" >
          <div @click="switchC" class="canTransfer fl cont font-b" ref="switchClick" :class="canTransfers">
            <p>可转让（元）</p >
            <p>{{canTransferAmount|money}}</p >
          </div>
          <div @click="switchCl" class="canExpense fl cont font-b" ref="switchClicks" :class="canExpenses">
            <p>仅限消费（元）</p >
            <p>{{noTransferAmount|money}}</p >
          </div>
        </div>
        <div class="fixedArea pst-abs font-167" v-if="canTransfer!='' && canTransfer == '0'" >
          <div @click="switchC" class="canTransfer fl cont font-b" ref="switchClick" :class="canExpenses">
            <p>可转让（元）</p >
            <p>{{canTransferAmount|money}}</p >
          </div>
          <div @click="switchCl" class="canExpense fl cont font-b" ref="switchClicks" :class="canTransfers">
            <p>仅限消费（元）</p >
            <p>{{noTransferAmount|money}}</p >
          </div>
        </div>
      </div>
    </div>
<!--    <div class="vouchers-title width " ref="vouchersTitle" :style="{height:vouchersTHeight}" v-show="voucherDataListShow">
      <div class="QMarket v_title_img fl" @click="showQRcodeImg" v-show="switchClick1"><img src="../../../../assets/img/Coupon/icon_Transfer@2x.png"/><span class="">去转让</span></div>
      <div class="QMarket v_title_img fl" @click="showQRcodeImg1" v-show="!switchClick1"><img src="../../../../assets/img/Coupon/icon_Transfer@2x.png"/><span class="">去使用</span></div>
      <img src="../../../../assets/img/Q_Modular/line@2x.png" class="pst-abs font-1 img_line" style="top: 5px;right: 50%;color: #E5E5E5;">
      <div class="Qcreen v_title_img fl" @click="screen"><img src="../../../../assets/img/Coupon/icon_screen@2x.png"/><span class="">筛选</span></div>
    </div>-->
    <div class="vouchers-conter vouchers-container vouchers-conterIpad pst-abs bg-f6 width " ref="vouchersContent" :style="{top:voucherTop,overflow:overflowS}"  v-show="voucherDataListShow"><!--voucherDataListShow overflow-s-->
      <!--出行--><!--
        <div class="jdkfsfjs"></div>-->
      <div class="vouchers-wrap bg-f6 width" v-if="voucherDataList.length>0">
          <div v-for="(voucherData,index1) in voucherDataList" :key="index1" v-if="voucherData.info!=null && voucherData.info!=''" class="pst-rlts  pst-rlts height pd-tp0583">
            <div class="Travel-farst fl width" @click="toVoucherDetail(voucherData.info.id,voucherData.info.imageUrl,voucherData.balance.canTransfer)">
              <img class="Travel-farst-img" :src="voucherData.info.imageUrl" />
              <img class="Travel-farst-imgs pst-abs" v-if="voucherData.info.canTransfer=='0'||voucherData.info.canTransfer==0" src="../../../../assets/image/img_seal@2x.png">
              <div class="Travel-title">
                <div class="Travel-title-l fl">
                  <p class="Travel-conter ellipsis_name">{{voucherData.info.name}}</p>
                  <!--<p class="Travel-small font-7b7">{{voucherData.info.startTime | parseTime('{y}-{m}-{d} {h}:{i}')}}/{{voucherData.info.endTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
                --></div>
                <div class="Travel-title-r fr">
                  <p class="Travel-conter1 font-fa ellipsis_name"><span class="money_1">￥</span><span class="money_2">{{voucherData.balance.balanceAmount|money}}</span><span class="money_3"></span></p>
                </div>
              </div>
              <div class="Travel-sec width fl">
                <img class="Travel-zRz-img" v-if="voucherData.info.status=='4'" src="../../../../assets/img/Q_Modular/Q_zRz.png"/>
                <div class="Travel-sec-l font-ipt fl">
                  <div class="font-1 ellipsis_name"><span>限定商户：</span><span>{{voucherData.info.commercialsName|strSub}}</span></div>
                  <div class="font-1 ellipsis_name"><span>限定地区：</span><span>{{voucherData.info.areasName|strSub}}</span>
                  </div>
                  <!--</small>-->
                </div>
                <div class="Travel-sec-r font-7b7 fr">查看详情
                  <!--<img src="../../../../assets/img/Q_Modular/seeDetail@2x.png">-->
                </div>
              </div>

            </div>
          </div>
      </div>
    </div>
    <div class="vouchers-footOp width cont" v-if="voucherDataList!=null && voucherDataList.length>0&&(getVoucherListParms.canTransfer == 1 || getVoucherListParms.canTransfer == '1') && canTransferAmount>0">
      <div class="font-133 fl" style="width: 43.4666%;background: #FFE8D0;color: #F89114;" @click="showQRcodeImg">去转让</div>
      <div class="font-col-b font-133 fr" style="width:56.533333%;background: #FFA436" @click="showQRcodeImg1">去消费</div>
    </div>
    <div class="vouchers-footOp width cont" v-if="voucherDataList!=null && voucherDataList.length>0 && (getVoucherListParms.canTransfer == 0 || getVoucherListParms.canTransfer == '0') && noTransferAmount>0">
      <div class="font-col-b font-133" style="background: #FFA436" @click="showQRcodeImg1">去消费</div>
    </div>
    <!--空状态-->
    <div class="fillIn-comter2 vouchers-conter pst-abs pos-top width" v-show="!voucherDataListShow">
      <img src="../../../../assets/image/news/img_blank_page@2x.png" class="img_Bx">
      <p class="font-ipt pd-bt cont">暂无可用消费券</p>
    </div>
    <div class="Loading" v-show="Loading"><img src="../../../../assets/img/Loading/loading.gif"></div>
    <!--去转让弹窗-->
    <div class="goTransfor zz cont" v-if="GOtransfor">
      <div class="zzWrap cont pst-rlt">
        <p class="zzClose pst-abs" @click="GOtransfor=false">×</p>
        <div class="zzTips1 font-s15 cont font-b">去易得多转让消费券</div>
        <div class="zzTips2 font-108 cont">长按识别二维码跳转小程序</div>
        <div class="width"><img src="../../../../assets/img/Coupon/img_miniprogram@2x.png"></div>
      </div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="history">
      <div class="juzhong">
        <section :class="[error_prompt]" id="error_bxMingxi">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<!--<script type="text/javascript" src="../../../../static/util/index.js"></script>-->
<script>
  import index from '../../../../../static/util/index'
  import {queryCouponBalanceDetail} from '@/api/aloneC/cInterface'
  import {isOpenSubstituteSale} from '@/api/saleApi/saleJs'
  import ElCheckbox from "../../../../../node_modules/element-ui/packages/checkbox/src/checkbox";
  import ElRadio from "../../../../../node_modules/element-ui/packages/radio/src/radio";
  import {getJiaFuUrl} from '@/api/user/headService';
  export default {
    components: {
      ElRadio,
      ElCheckbox},
    name: 'bg-login',
    data() {
      return {
        sumAmount:"",
        canTransferAmount:"",
        noTransferAmount:"",
        canTransfer:"",
        switchClick1:true,/*去使用、去转让的显示*/
        error_prompt:"",//提示弹框
        content:"",
        SxWk:false,
        voucherDataListShow:false,
        Loading:false,
        showQRcode:false,//显示易得多二维码
        vouchersTHeight:'6%',
        vouchersHeight:"52%",   //
        voucherTop:"",     //3.2rem
        overflowS:'scroll',   //scroll
        psi:"",
        bgImg: require('../../../../assets/img/Q_Modular/Q_Select.png'),
        companyId:"",
        canTransfers:"action",
        canExpenses:"normal",
        GOtransfor:false,
        Recharge:true,
        deviceModel:"",   //判断设备机型
        lHeight:"largeHeight",
        sHeight:"smallHeight",
        //获取消费券列表
        getVoucherListParms:{
          companyId:"",
          canTransfer:'1',//是否可转让标识；1：可转让；0：不可转让
          balanceType:"0",
        },
        //获取员工券账户总额
        queryInfoData:{
          memberId:"",
          companyId:"",
          canTransfer:"",
          balanceTypeList:[]
        },
        //获取券列表信息
        voucherDataList:{

        },
        //所有账户集合
        AccountAll:[
          /*{name:'企业消费券',money:2000},
          {name:'易得多购买',money:4000},
          {name:'个人消费券',money:1180},*/
        ],
      }
    },
    mounted () {
      this.$nextTick(function(){
        setInterval(this.timer,2000);
        window.addEventListener('scroll',this.handleScroll,true);
      });

    },
    methods:{
      /*切换*/
      switchC(){
        this.$refs.switchClick.style.cssText = "color:#2E2A2A;background:#FFF;";
        this.$refs.switchClicks.style.cssText = "color:#3B92EF;background:#B7DBFF;";
        this.getfindTransferCouponList('1');
        this.switchClick1 = true;
      },
      switchCl(){
        this.$refs.switchClick.style.cssText = "color:#3B92EF;background:#B7DBFF;";
        this.$refs.switchClicks.style.cssText = "color:#2E2A2A;background:#FFF;";
        this.getfindTransferCouponList('0');
        this.switchClick1 = false;
      },
      //显示易得多二维码
      showQRcodeImg(){
        this.GOtransfor = !this.GOtransfor;
      },
      //点击去使用跳转到全部应用
      showQRcodeImg1(){
        this.$router.push({name:'allLication'});
      },
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      },
      //to收支明细page
      toBudgetPage(){
        localStorage.setItem('getVoucherListParms',JSON.stringify(this.getVoucherListParms));
        this.$router.push({name:'budget',params:{canTransfer:this.getVoucherListParms.canTransfer,balanceType:this.getVoucherListParms.balanceType}});
      },
      //to代卖首页
      tosaleHome(){
        isOpenSubstituteSale(localStorage.getItem("userID")).then(res => {
          if (res.data.code == 200) {
            this.$root.$data.isOpenSale = res.data.data;
            localStorage.setItem('isOpenSale', res.data.data);
            if (res.data.data) {
              this.$router.push({name: 'saleHome'});
            } else {
              this.$router.push({name: 'intelligentSale'});
            }
          } else {
            this.error_prompt = "tel-message1";
            this.content = res.data.msg;
          }
        }, res => {
          this.error_prompt = "tel-message1";
          this.content = res.data.msg;
        });
      },
      //从消费券首页总账户进入单独券账户页面
      toVoucherAccountPage(name){
        //ToDo 根据所传账户信息进入不同券账户页面
        if(name == '企业消费券'){
          this.$router.push({name:'voucherEnterprise'});
        }else if(name == '易得多购买'){
          this.$router.push({name:'voucherEasytoBuy'});
        }else if(name == '个人消费券'){
          this.$router.push({name:'voucherPers'});
        }
      },
      timer:function(){
        if(this.error_prompt=="tel-message1"){
          this.error_prompt="trans1";
        }
      },
      //查询消费券是否可转让券列表
      getfindTransferCouponList(canTransfer){
        if(canTransfer == undefined || canTransfer == null){
          this.getVoucherListParms.canTransfer = '1';
        }else{
           this.getVoucherListParms.canTransfer = canTransfer;
        }
        this.queryInfoData.canTransfer = this.getVoucherListParms.canTransfer;
        this.getVoucherAttributeInfo(this.queryInfoData);
        if(localStorage.getItem("userID")==undefined || localStorage.getItem("userID")==null || localStorage.getItem("userID")=='' || localStorage.getItem("userID")=='undefined' || localStorage.getItem("userID")=='null'){
          localStorage.setItem("loginToPage",'vouchers');
          this.$router.push({name:'login'});
        }else{
          this.getVoucherListParms.companyId = "";
          queryCouponBalanceDetail(localStorage.getItem("userID"),this.getVoucherListParms).then(res => {
            this.Loading = false;
            if (res.data.code == 200) {
                if(res.data.data==null || res.data.data=='null'){
                  this.voucherDataList = [];
                  this.voucherDataListShow = false;
                  this.SxWk = true;
                }else{
                  this.voucherDataList = res.data.data;
                  if (this.voucherDataList != null && this.voucherDataList.length>0) {
                    this.voucherDataListShow = true;
                  } else {
                    this.voucherDataListShow = false;
                    this.SxWk = true;
                  }
                }
            } else {
              this.voucherDataList = [];
              this.voucherDataListShow = false;
              this.SxWk = true;
            }
          });
        }
        let self = this;
        setTimeout(function () {
          if(self.$root.$data.queryvoucherData.master!=null && self.$root.$data.queryvoucherData.master!=undefined && self.$root.$data.queryvoucherData.master!=''){
            self.sumAmount = self.$root.$data.queryvoucherData.master.sumAmount;
            self.canTransferAmount = self.$root.$data.queryvoucherData.master.canTransferAmount;
            self.noTransferAmount = self.$root.$data.queryvoucherData.master.nonTransferAmount;
            self.AccountAll = [];
            if(self.$route.params.hideTitle == undefined || self.$route.params.hideTitle == 'undefined' || self.$route.params.hideTitle == null || self.$route.params.hideTitle == 'null' || self.$route.params.hideTitle == ''){
              if(self.$root.$data.queryvoucherData.memberType == 'PE'){   /*独立C*/
                if(self.$root.$data.queryvoucherData.company.sumAmount == 0 && self.$root.$data.queryvoucherData.yideduo.sumAmount == 0){
                  self.$router.push({name:'voucherPers'});
                }else{
                  if(self.$root.$data.queryvoucherData.company.sumAmount == 0){
                    self.AccountAll.push({name:'易得多购买',money:self.$root.$data.queryvoucherData.yideduo.sumAmount});
                    self.AccountAll.push({name:'个人消费券',money:self.$root.$data.queryvoucherData.customer.sumAmount});
                  }else if(self.$root.$data.queryvoucherData.yideduo.sumAmount == 0){
                    self.AccountAll.push({name:'企业消费券',money:self.$root.$data.queryvoucherData.company.sumAmount});
                    self.AccountAll.push({name:'个人消费券',money:self.$root.$data.queryvoucherData.customer.sumAmount});
                  }else{
                    self.AccountAll.push({name:'企业消费券',money:self.$root.$data.queryvoucherData.company.sumAmount});
                    self.AccountAll.push({name:'易得多购买',money:self.$root.$data.queryvoucherData.yideduo.sumAmount});
                    self.AccountAll.push({name:'个人消费券',money:self.$root.$data.queryvoucherData.customer.sumAmount});
                  }

                }
              }else if(self.$root.$data.queryvoucherData.memberType == 'CP'){   /*企业员工*/
                if(self.$root.$data.queryvoucherData.yideduo.sumAmount == 0){
                  self.AccountAll.push({name:'企业消费券',money:self.$root.$data.queryvoucherData.company.sumAmount});
                  self.AccountAll.push({name:'个人消费券',money:self.$root.$data.queryvoucherData.customer.sumAmount});
                }else{
                  self.AccountAll.push({name:'企业消费券',money:self.$root.$data.queryvoucherData.company.sumAmount});
                  self.AccountAll.push({name:'易得多购买',money:self.$root.$data.queryvoucherData.yideduo.sumAmount});
                  self.AccountAll.push({name:'个人消费券',money:self.$root.$data.queryvoucherData.customer.sumAmount});
                }
              }
            }else{
              if(self.$route.params.hideTitle == 'company'){
                self.AccountAll.push({name:'易得多购买',money:self.$root.$data.queryvoucherData.yideduo.sumAmount});
                self.AccountAll.push({name:'个人消费券',money:self.$root.$data.queryvoucherData.customer.sumAmount});
              }else if(self.$route.params.hideTitle == 'yideduo'){
                self.AccountAll.push({name:'企业消费券',money:self.$root.$data.queryvoucherData.company.sumAmount});
                self.AccountAll.push({name:'个人消费券',money:self.$root.$data.queryvoucherData.customer.sumAmount});
              }
            }
          }
        },500)
      },
      toVoucherDetail(couponId,ingUrl,canTransfer){
        localStorage.setItem('getVoucherListParms',JSON.stringify(this.getVoucherListParms));
        if(couponId!='' && couponId!=null && couponId!=undefined){
          localStorage.setItem("getCouponId",couponId);
          this.$router.push({name:'qDetails',params:{couponId:couponId,ingUrl:ingUrl,canTransfer:this.getVoucherListParms.canTransfer,balanceType:this.getVoucherListParms.balanceType}});
        }
      }
    },
    created(){
      /*判断设备是iOS还是安卓设备*/
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isAndroid==true&&isiOS==false){
        this.deviceModel = "安卓";
      }else{
        this.deviceModel = "iOS";
      }
//        alert('是否是Android：'+isAndroid);
//        alert('是否是iOS：'+isiOS);
      this.$nextTick(function(){
        if(document.documentElement.clientHeight == 812){
          this.vouchersTHeight = "4.8%";
//          this.vouchersHeight = (document.documentElement.clientHeight - this.$refs.vouchersTitle.clientHeight - this.$refs.voucherInformation.clientHeight) + "px";
//          this.voucherTop = (this.$refs.vouchersTitle.clientHeight + this.$refs.voucherInformation.clientHeight) + "px";
        }
      })
      if(localStorage.getItem("companyId")!=undefined &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
        this.companyId = localStorage.getItem("companyId");
      }else{
        this.companyId = "";
      }
      if(localStorage.getItem('canTransferBill')!='undefined'){
        this.canTransfer = localStorage.getItem('canTransferBill');
        if(localStorage.getItem('getVoucherListParmsBill')!='undefined'){
          this.getVoucherListParms=JSON.parse(localStorage.getItem('getVoucherListParmsBill'));
        }
      }else{
        this.canTransfer = "";
      }
      if(this.canTransfer==""){
        this.switchClick1 = true;
        this.getfindTransferCouponList();
      }else{
          if(this.canTransfer == '' || this.canTransfer == '1' || this.canTransfer == 1){
            this.switchClick1 = true;
          }else{
            this.switchClick1 = false;
          }
        this.getfindTransferCouponList(this.canTransfer);
      }
    },
    computed: {

    },
    watch:{      //监听路由变化
    },
    //当页面跳转时清除定时器
    beforeRouteEnter(to,from,next){
        let self = this;
      if(from.path == "/qDetails"){
          if(localStorage.getItem('canTransfer')!=undefined && localStorage.getItem('canTransfer')!='undefined' && localStorage.getItem('canTransfer')!=null && localStorage.getItem('canTransfer')!='null' && localStorage.getItem('canTransfer')!=''){
            localStorage.setItem('canTransferBill',localStorage.getItem('canTransfer'));
          }
        if(localStorage.getItem('getVoucherListParms')!=undefined && localStorage.getItem('getVoucherListParms')!='undefined' && localStorage.getItem('getVoucherListParms')!=null && localStorage.getItem('getVoucherListParms')!='null' && localStorage.getItem('getVoucherListParms')!=''){
          localStorage.setItem('getVoucherListParmsBill',localStorage.getItem('getVoucherListParms'));
        }
        next();
      }else{
        localStorage.setItem('canTransferBill','undefined');
        localStorage.setItem('getVoucherListParmsBill','undefined');
        next();
      }
    },
  }
</script>
<style type="text/css">
  .voucherHome{
    position:absolute;
    left:0;
    top:0;
  }
  .Loading{
    position: inherit;
    top: auto;
  }
  #sect{
    width:100%;
    height:100px;
    background:darkred;
    position:sticky;
    left:0;
    top:0;
  }
  /*转让弹窗*/
  .voucherHome .goTransfor{
    justify-content: center;
    display: flex;
  }
  .voucherHome .goTransfor .zzClose{
    font-size:1.8rem;
    right:1.3333rem;
    top:0.5rem;
  }
  .voucherHome .zzWrap{
    width:22.5rem;
    height:24.83333rem;
    border-radius:7px;
    background:#fff;
    margin-top:50%;
  }
  .voucherHome .zzWrap .zzTips1{
    margin-top:4rem;
  }
  .voucherHome .zzWrap .zzTips2{
    color:#7E7A7A;
    margin-top:0.6666rem;
  }
  .voucherHome .zzWrap img{
    margin-left: 50%;
    margin-top:1.5rem;
    transform: translateX(-50%);
    width:12rem;
    height:12rem;
  }
  /*新添加头部*/
  .voucherHome .largeHeight{
    height:21.7rem;
  }
  .voucherHome .smallHeight{
    height:16.25rem;
  }
  .voucherHome .vouchersInformation{
    background:#3B92EF;
  }
  .voucherHome .vouchersInformation .informationWarp{
    /*width:95%;*/
    height:16.083333rem;
    margin:0 1.08333333rem;
    padding-top:1.3333333rem;
  }
  .voucherHome .vouchersInformation .informationWarp .Account-Modular{
    margin: 0;
  }
  .voucherHome .vouchersInformation .informationWarp .Account-Modular1{
    margin: 0 3.7rem 4.75rem;
  }
 .Account-Modular .Account-title,.Account-Modular1 .Account-title{
   color: #A9CFF8;
  }
  .voucherHome .informationWarp .SZDetailed{
    background: #FFFFFF;
    border-radius: 1.25rem 0 0 1.25rem;
    top: 1.5rem;
    transform: translateY(-50%);
    padding: 0.25rem 0.8rem;
    color: #3B92EF;
    height: 2rem;
    line-height: 2rem;
    right: 0;
    width: 4.583333rem;
    opacity: .75;
    margin-right: -1.1rem;
  }
  .voucherHome .informationWarp .SZDetailed1{
    background: #FFFFFF;
    border-radius: 1.25rem 0 0 1.25rem;
    top: 5.5rem;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: 0.25rem 0.8rem;
    color: #3B92EF;
    height: 2rem;
    line-height: 2rem;
    right: 0;
    width: 4.583333rem;
    opacity: .75;
    margin-right: -1.1rem;
  }
  .voucherHome .informationWarp .useED{
    margin-top:0.3rem;
    font-size:2.583333rem;
    margin-bottom: 2rem;
  }
  .voucherHome .informationWarp .stayRecharge{
    margin-top:0.58rem;
  }
  .voucherHome .informationWarp .stayRecharge p:nth-of-type(2){
    width:3.6rem;
    height:1.3333rem;
    line-height:1.2rem;
    background:#fff;
    color:#3B92EF;
    border-radius:1.25rem;
    margin-left:0.416rem;
    padding:0.15rem 0.5rem;
    /*margin-top:0.16666rem;*/
  }
  .voucherHome .fixedArea{
    width:93%;
    height:5rem;
    bottom:0;
    z-index:555;
  }
  .voucherHome .fixedArea .action{
    background:#fff;
    color:#2E2A2A;
  }
  .voucherHome .fixedArea .normal{
    background:#B7DBFF;
    color:#3B92EF;
  }
  .voucherHome .fixedArea .canTransfer,.canExpense{
    width:50%;
    height:100%;
  }
  .voucherHome .fixedArea p:first-of-type{
    margin-top:0.6666667rem;
  }
  /*修改样式bug*/
  .voucherHome .industry-border{
    border-bottom:solid 1rem #F6F6F6;
  }
  .voucherHome .vouchersMarket{
    width:8.3333rem;
    height:2.083333rem;
    line-height:2.083333rem;
    border:solid 1px #FA8C16;
    border-radius:2.166665rem;
  }
  .tel-mess .tel-message1{
    width: 60%;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 0.4rem;
    text-align: center;
    position: fixed;/*写成固定定位解决报销单明细错误提示总在上面的问题  top值写成25rem*/
    top: 15rem;
    left: 20%;
    opacity: .7;
  }
  .tel-mess .trans1{
    width: 60%;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 4px;
    text-align: center;
    position: fixed;
    top: 15rem;
    left: 20%;
    opacity: 0;
  }
  .voucherHome .pst-rlts{
    /*width:28.5rem;*/
    width:96%;
    background:url("../../../../assets/img/Q_Modular/Q_bg.png") no-repeat center;
    height: 10.583333rem;
    background-size:100%;
    margin: 0 .7rem;
  }
  .animated {
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  .voucherHome .img_Bx1{
    width: 13rem;
    height: 13rem;
    margin-left: 8rem;
    padding-top: 50%;
  }
  .voucherHome .fillIn-comter2{
    margin-top: 59.5%;
  }
  .voucherHome .fillIn-comter2 .img_Bx{
    width: 13rem;
    height: 13rem;
    margin-left:30%;
    padding-top: 22%;
  }
  .voucherHome .img_line{
    width: 1px;
    height: 2.083333rem;
  }
  .voucherHome .fillIn-comter2 .font-ipt{
    margin-left: 0;
  }
  /*头部*/
  .voucherHome .vouchers-title{
    /*height: 6%;*/
    position: sticky;
    /*position:fixed;*/
    top:0;
    left:0;
    background:#fff;
    z-index:555;
    /*top: 0.3rem;*/
  }
  .voucherHome .vouchers-title .v_title_img{
    width: 50%;
    /*line-height: 3.2rem;*/
    height:100%;
  }
  .voucherHome .vouchers-title .v_title_img img{
    width: 1.4166666667rem;
    padding-left: 35%;
    padding-top: 0.8rem;
    float: left;
  }
  .voucherHome .vouchers-title .v_title_img span{
    padding-left: 0.5rem;
    font-size: 1rem;
    display: inline-block;
    line-height:3.2rem;
  }
  /*券部分*/
  .voucherHome .vouchers-container{
    float:left;
    overflow-y: scroll;
    height:52%;
  }
  .voucherHome .vouchers-footOp{
    bottom: 0;
    position: absolute;
    height: 3.666667rem;
    line-height: 3.6666667rem;
  }
  .voucherHome .vouchers-conter .vouchers_Q{
    margin: 0 0.916rem;
    position: relative;
  }
  .voucherHome .vouchers-conter .vouchers_Q_p{
    line-height: 4rem;
    margin: 0 0.65rem;
    font-size: 1.2rem;
  }
  .voucherHome .vouchers-conter .Travel-farst{             /****************考虑删除**************************/
    width:98%;
    height:100%;
    position: relative;
    margin: 0 1rem;
  }
  .voucherHome .vouchers-conter .Travel-farst .Travel-title{
    height: 2.083333rem;
    padding-top: 0.75rem;
    margin:0 1.5rem;
  }
  .voucherHome .vouchers-conter .Travel-conter1{
    line-height: 2.0833333rem;
  }
  .Travel-title .Travel-title-l .Travel-conter{
    line-height: 2.0833333rem;
    font-size: 1.5rem;
    color: #2E2A2A;
    font-weight: bold;
  }
  .Travel-title .Travel-title-l .Travel-small{
    font-size: 0.833333rem;
  }
  /*钱*/
  .voucherHome .Travel-title .Travel-title-r{
    margin-right: 1.025rem;
    max-width: 48%;
  }
  .voucherHome .Travel-title .Travel-title-r .money_1{
    font-size: 1.7rem;
  }
  .voucherHome .Travel-title .Travel-title-r .money_2{
    font-size: 2.25rem;
    font-weight: bold;
  }
  .voucherHome .Travel-title .Travel-title-r .money_3{
    font-size: 1.56666667rem;
  }
  .Travel-farst .Travel-sec{
    margin-top:2.7rem;
  }
  .Travel-farst .Travel-sec .Travel-sec-r{
    width:5.1rem;
    height: 1.16666rem;
    line-height: 1.166666rem;
    margin-top: 1.5rem;
    float: right;
    margin-right: 3rem;
    position:relative;
    background:url("../../../../assets/img/Q_Modular/seeDetail@2x.png") no-repeat right center;
    background-size:1rem;
    font-size: 1rem;
  }
  /*背景图图标*/
  .Travel-farst .Travel-farst-img{
    position: absolute;
    bottom: 0.666667rem;
    left: 50%;
    margin-left: -4.9rem;
    width: 9.1666667rem;
    z-index: 444;
  }
  .Travel-farst .Travel-farst-imgs{
    width: 5rem;
    height: 5rem;
    top: 57%;
    transform: translateY(-35%);
    right: 28%;
  }
  /*转让中图标*/
  .Travel-farst .Travel-zRz-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 4.5833333rem;
  }
  /*筛选消费券样式*/
  .voucherHome .v_screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    overflow-y: scroll;
    z-index:999999;
  }
  .voucherHome .v_screen .pst-fixed{
    margin: 6rem 0;
    width: 7rem;
  }
  .voucherHome .v_screen .v_screen_mask{
    position: absolute;
    font-size: 1.5rem;
    width: 89%;
    margin-left: 11%;
  }
  .v_screen .v_screen_mask .mask_Popup{
    width: 100%;
  }
  .v_screen .v_screen_mask .mask_Popup .industry_title{
    width:100%;
  }
  .v_screen_mask .mask_Popup .mask_Popup_p{
    font-size: 1.166667rem;
    line-height: 4.833333rem;
    margin-left: 1.083333333rem;
  }
  .v_screen_mask .mask_Popup .mask_Popup_p1{
    font-size: 1.333333rem;
    line-height: 4.833333rem;
    margin-left: 1.08333333rem;
    color: #2E2A2A;
    font-weight: 600;
  }
  .v_screen .v_screen_mask .mask_Popup .voucher_industry_icon{
    width: 0.666667rem;
    padding: 0.6rem 1rem 0;
  }
  .v_screen_mask .mask_Popup .mask_Popup_type{
    font-size: 1.1rem;
    background: #F6F6F6;
    line-height: 3.666667rem;
    width: 29%;
    height: 3.666667rem;
    margin-left: 0.8333rem;
    margin-bottom: 0.83333rem;
    text-align: center;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0.4rem;
  }
  .v_screen_mask .mask_Popup .mask_Popup_type_check {
    background:url("../../../../assets/img/Coupon/icon_label@2x.png") no-repeat 72% 48%;
    background-size: 10rem;
    color: rgb(235, 123, 3);
    font-size: 1.1rem;
    line-height: 3.666667rem;
    width: 29%;
    height: 3.666667rem;
    margin-left: 0.8333rem;
    margin-bottom: 0.83333rem;
    text-align: center;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0.4rem;
  }
  .v_screen .industry1{
    margin-bottom: 3.5rem;
  }
  /*重置确定*/
  .industry_btn_l div{
    width: 100%;
    height: 100%;
    line-height: 2.83333rem;
  }
  .industry_btn_l .industry_reset{
    border-radius: 0.5rem;
  }
  .industry_btn{
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    height: 6%;
    line-height: 6%;
    width: 100%;
  }
  .industry_btn .industry_btn_l{
    width: 50%;
    height: 100%;
  }
  .voucherHome .vouchers-conter .vouchers-title{
    margin-top: 0;
    position: absolute;
    top: 0.3rem;
    z-index: 1000;
  }
  .Travel-farst .Travel-sec .Travel-sec-l {            /*****************outTravel-sec-l*************/
    font-size: 1rem;
    padding-left: 1.5rem;
    max-width: 18rem;
  }
  .voucherHome .Travel-farst .Travel-title .Travel-title-l{
    max-width: 50%;
  }
  .wrapcenter_tips{
    width: 22.5rem;
    background: #fff;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .voucherHome .vouchersInformation .informationWarp .Account-Modular .Account-Modular-3{
    width: 33%;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .voucherHome .pst-rlts{
      height:9rem;
      margin: 0 .5rem;
    }
    .voucherHome .fixedArea p:first-of-type{
      margin-top: 1.2rem;
    }
    .voucherHome .zzWrap{
      margin-top:35%;
    }
    .voucherHome .vouchers-conter .vouchers_Q_p{
      line-height: 3rem;
    }
    .voucherHome .vouchers-conter .Travel-farst {
      margin: 0.0525rem;
    }
    .Travel-farst .Travel-sec {
      margin: 1.7rem 1.5rem 0 0;
    }
    .Travel-farst .Travel-zRz-img {
      position: absolute;
      top: 0.3rem;
      left: 0.4rem;
      width: 3.9rem;
    }
    .Travel-title .Travel-title-l .Travel-conter {
      font-size: 1.25rem;
    }
    .voucherHome .Travel-title .Travel-title-r {
      margin-right: 0.025rem;
    }
    .Travel-farst .Travel-sec .Travel-sec-r {
      margin-right: 1.6rem;
      margin-top: 1.8rem;
    }
    .industry_btn{
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 0;
      height: 6%;
      line-height: 6%;
      width: 100%;
    }
    .v_screen_mask .mask_Popup .mask_Popup_p1{
      font-size: 1rem;
    }
    .Travel-farst .Travel-farst-imgs{
      width: 5rem;
      height: 5rem;
      top: 52%;
      transform: translateY(-35%);
      right: 26%;
      z-index: 666666;
    }
    .v_screen_mask .mask_Popup .mask_Popup_type_check {
      background:url("../../../../assets/img/Coupon/icon_label@2x.png") no-repeat 80% 48%;
      background-size: 10rem;
    }
    .Travel-farst .Travel-sec .Travel-sec-l {
      max-width: 16rem;
    }
    .voucherHome .vouchersInformation .informationWarp .Account-Modular1{
      margin: 0 2.7rem 4.75rem;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .voucherHome .vouchers-container{
      height:47%;
    }
    .industry_btn_l div{
      /*padding-right:0.7rem;*/
    }
    .vouchers-conterIpad{
      height: 89.1%
    }
    .voucherHome .fillIn-comter2 .img_Bx{
      margin-left:30%;
    }
    .voucherHome .vouchers-title .v_title_img img{
      padding-top: 0.6rem;
    }
    .voucherHome .vouchers-title .v_title_img span{
      line-height: 2.5rem;
    }
  }
</style>

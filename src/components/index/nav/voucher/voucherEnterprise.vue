<template>
  <div class="voucherEnterprise width height bg-f6 overflow-s" ref="vouchers"><!-- style="position: absolute"-->
    <!--无消费券状态-->
    <div class="vouchersInformation width pst-rlt" ref="voucherInformation" :class="Recharge==true?lHeight:sHeight">
      <div class="informationWarp">
        <div class="mar_l font-133 pst-rlt">
          <div class="fl conpanyName pst-abs font-col-b font-133" ref="reim_name">{{nowCompanyName}}</div>
          <div class="sim_img fl pst-abs" v-if="showCompanys" @click="showCompanysList=true"><!-- -->
            <img class="info_wrap_img" v-if="simpleReimMask" @click="simpleReimMask = false" src="../../../../assets/img/account/icon_white_down@2x.png" />
            <img class="info_wrap_img" v-else="!simpleReimMask" src="../../../../assets/img/account/icon_white_up@2x.png" />
          </div>
        </div>
        <div class="font-167 pst-rlt font-A9CFF8 mG-top">
          <div class="SZDetailed cont pst-abs font-1" @click="toBudgetPage">收支明细</div>
          <div class="SZDetailed1 cont pst-abs font-1" @click="tosaleHome">智能代卖</div>
        </div>
        <p class="font-col-b font-col-b-margin3 font-167 "> 消费券总额度（元）</p>
        <div class="useED font-col-b">{{this.$root.$data.sumAmount|money}}</div>
        <div class="fixedArea pst-abs font-167" v-if="canTransfer=='' || canTransfer == '1' || canTransfer == 1" >
          <div @click="switchC" class="canTransfer fl cont font-b" ref="switchClick" :class="canTransfers">
            <p>可转让（元）</p >
            <p>{{this.$root.$data.canTransferAmount|money}}</p >
          </div>
          <div @click="switchCl" class="canExpense fl cont font-b" ref="switchClicks" :class="canExpenses">
            <p>仅限消费（元）</p >
            <p>{{this.$root.$data.noTransferAmount|money}}</p >
          </div>
        </div>
        <div class="fixedArea pst-abs font-167" v-if="canTransfer!='' && canTransfer == '0'" >
          <div @click="switchC" class="canTransfer fl cont font-b" ref="switchClick" :class="canExpenses">
            <p>可转让（元）</p >
            <p>{{this.$root.$data.canTransferAmount|money}}</p >
          </div>
          <div @click="switchCl" class="canExpense fl cont font-b" ref="switchClicks" :class="canTransfers">
            <p>仅限消费（元）</p >
            <p>{{this.$root.$data.noTransferAmount|money}}</p >
          </div>
        </div>
      </div>
    </div>
    <!--height:vouchersHeight,-->
    <div class="vouchers-conter vouchers-container vouchers-conterIpad pst-abs bg-f6  width" ref="vouchersContent" :style="{top:voucherTop,overflow:overflowS}"  v-show="voucherDataListShow"><!--voucherDataListShow overflow-s-->
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
                <p class="Travel-conter1 font-fa ellipsis_name" style="margin-right: 2rem;"><span class="money_1">￥</span><span class="money_2">{{voucherData.balance.balanceAmount|money}}</span><span class="money_3"></span></p>
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
    <div class="vouchers-footOp width cont" v-if="voucherDataList!=null && voucherDataList.length>0&&(getVoucherListParms.canTransfer == 1 || getVoucherListParms.canTransfer == '1') && this.$root.$data.canTransferAmount>0">
      <div class="font-133 fl" style="width: 43.4666%;background: #FFE8D0;color: #F89114;" @click="showQRcodeImg">去转让</div>
      <div class="font-col-b font-133 fr" style="width:56.533333%;background: #FFA436" @click="showQRcodeImg1">去消费</div>
    </div>
    <div class="vouchers-footOp width cont" v-if="voucherDataList!=null && voucherDataList.length>0 && (getVoucherListParms.canTransfer == 0 || getVoucherListParms.canTransfer == '0') && this.$root.$data.noTransferAmount>0">
      <div class="font-col-b font-133" style="background: #FFA436" @click="showQRcodeImg1">去消费</div>
    </div>
    <!--空状态-->
    <div class="fillIn-comter2 vouchers-conter pst-abs pos-top width" v-show="!voucherDataListShow">
      <img src="../../../../assets/image/news/img_blank_page@2x.png" class="img_Bx">
      <p class="font-ipt pd-bt cont font-1">暂无可用消费券</p>
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
    <!--切换企业弹框-->
    <div class="zz" v-show="showCompanysList">
      <div class="width bg-f6 pst-abs btm-0 fl" style="height:76%;">
        <div class="bg-ff cont font-s15 bd-btmddd font-b" style="padding: 1.1666667rem;">
         <img class="fl" style="width: 1rem;margin-top: .5rem" @click="showCompanysList = false" src="../../../../assets/img/account/icon_CLOSE@2x.png">
          选择账户类型
        </div>
      <div class="bg-ff fl width" style="height: 37rem;overflow-y: scroll;">
          <div class="fl width CardD-pd-1 mG-lft183" v-for="(item,index) in allCompanyList" @click="switchingEnter(item.companyId,item.companyName)">
           <div v-if="index==0">
             <div class="fl">
               <p class="font-167 font-2a2a" style="line-height: 4.5rem">{{item.companyName}}</p >
             </div>
             <div class="fr" v-if="nowCompanyName == item.companyName"><img style="width: 1.166667rem;margin: 1.83333rem 2.5rem;" src="../../../../assets/image/c/icon_tick.png"/></div>
           </div>
            <div class="bd-btmF4" v-if="index!=0">
              <div class="fl">
                <p class="font-167 font-2a2a" style="line-height: 4.5rem">{{item.companyName}}</p >
              </div>
              <div class="fr" v-if="nowCompanyName == item.companyName"><img style="width: 1.166667rem;margin: 1.83333rem 2.5rem;" src="../../../../assets/image/c/icon_tick.png"/></div>
            </div>
          </div>
        </div>
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
<script>
  import {queryMemberNew} from '@/api/user/userLogin'
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
        nowCompanyName:"",
        showCompanys:false,
        simpleReimMask:false,
        showCompanysList:false,
        canTransfer:"",
        switchClick1:true,/*去使用、去转让的显示*/
        error_prompt:"",//提示弹框
        content:"",
        SxWk:false,
        voucherDataListShow:false,
        Loading:false,
        showQRcode:false,//显示易得多二维码
        /*vouchersHeight:"59.5%",*/   //
        vouchersTHeight:'6%',
        voucherTop:"",     //3.2rem
        overflowS:'scroll',   //scroll
        bgImg: require('../../../../assets/img/Q_Modular/Q_Select.png'),
        companyId:"",
        canTransfers:"action",
        canExpenses:"normal",
        GOtransfor:false,
        Recharge:true,
        deviceModel:"",   //判断设备机型
        lHeight:"largeHeight",
        sHeight:"smallHeight",
        //员工所属全部企业列表
        allCompanyList:[
          {companyId:"001",companyName:"上海京东金融有限公司"},
          {companyId:"002",companyName:"上海淘略数据有限公司"},
          {companyId:"003",companyName:"上海加薪支付有限公司"},
          {companyId:"004",companyName:"上海砾洲平台有限公司"},
          {companyId:"005",companyName:"北京汉莎服务有限公司"},
          {companyId:"006",companyName:"砾洲(上海)企业服务有限公司"},
          {companyId:"007",companyName:"天津永久机械有限公司"},
        ],
        //获取消费券列表
        getVoucherListParms:{
          companyId:localStorage.getItem('companyId'),
          canTransfer:'1',//是否可转让标识；1：可转让；0：不可转让
          balanceType:"2",
        },
        //获取企业员工券账户总额
        queryInfoData:{
          memberId:"",
          companyId:"",
          canTransfer:"",
          balanceTypeList:['2']
        },
        //获取券列表信息
        voucherDataList:{

        },
      }
    },
    mounted () {
      this.$nextTick(function(){
        setInterval(this.timer,2000);
        window.addEventListener('scroll',this.handleScroll,true);
      });

    },
    methods:{
      //获取员工所属全部企业列表
      getCompanyList(){
        this.Loading = true;
        let self = this;
        self.allCompanyList = [];
        queryMemberNew(localStorage.getItem("userID"),"").then(res => {
          if (res.data.code == 200) {
            this.Loading = false;
            if(res.data.data.companyList!=null&&res.data.data.companyList!=""&&res.data.data.companyList!=undefined) {
              if(res.data.data.companyList.length==1){
                self.showCompanys = false;
                self.simpleReimMask = false;
                self.nowCompanyName = res.data.data.companyList[0].companyName;
              }else{
                self.allCompanyList.push({companyName:"账户总览"},0);
                for(let i=0;i<res.data.data.companyList.length;i++){
                  self.allCompanyList.push(res.data.data.companyList[i],i+1);
                }
                if(localStorage.getItem('EntercompanyId')=='undefined' || localStorage.getItem('EntercompanyId')==undefined){
                  self.nowCompanyName = self.allCompanyList[0].companyName;
                }else{
                  this.queryInfoData.companyId = localStorage.getItem('EntercompanyId');
                  this.nowCompanyName = localStorage.getItem('EntercompanyName');
                }
                self.showCompanys = true;
                self.simpleReimMask = true;
              }
            }else{
              self.Loading = false;
              self.showCompanys = false;
              self.simpleReimMask = false;
              self.nowCompanyName = '账户总览';
            }
          }else{
            self.Loading = false;
            self.showCompanys = false;
            self.simpleReimMask = false;
            self.nowCompanyName = '账户总览';
            self.error_prompt="tel-message";
            self.content = res.data.msg;
          }
        },res => {
          self.Loading = false;
          self.showCompanys = false;
          self.simpleReimMask = false;
          self.nowCompanyName = '账户总览';
        })
    /*   if(this.allCompanyList.length==1){
         this.showCompanys = false;
         this.simpleReimMask = false;
       }else{
         this.showCompanys = true;
         this.simpleReimMask = true;
         this.allCompanyList.splice(0,0,{companyName:"账户总览"});
       }*/
      },
      //切换员工所属企业
      switchingEnter(companyId,companyName){
        if(companyName == '账户总览'){
          this.nowCompanyName = companyName;
          this.queryInfoData.companyId = "";
        }else{
          this.nowCompanyName = companyName;
          this.queryInfoData.companyId = companyId;
        }
        this.showCompanysList = false;
        this.simpleReimMask = true;
        this.getfindTransferCouponList(this.queryInfoData.canTransfer);
      },
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
        //document.body.scrollTop
        /*console.log(scrollTop);*/
      },
      //to收支明细page
      toBudgetPage(){
        localStorage.setItem('getVoucherListParms',JSON.stringify(this.getVoucherListParms));
        localStorage.setItem("getCompanyId",this.queryInfoData.companyId);
        localStorage.setItem("getCompanyName",this.nowCompanyName);
        this.$router.push({name:'budget',params:{companyId:this.queryInfoData.companyId,canTransfer:this.getVoucherListParms.canTransfer,balanceType:this.getVoucherListParms.balanceType}});
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
      vTitleImgShow(){
        this.error_prompt = "tel-message1";
        this.content = "暂无可用消费券";
      },
      timer:function(){
        if(this.error_prompt=="tel-message1"){
          this.error_prompt="trans1";
        }
      },
      //to券集市
      toVoucherMarket(){
        let service = "h5.scene.voucher";
        let returlUrl = window.location.href;
        getJiaFuUrl(localStorage.getItem("userID"),service,this.companyId,returlUrl).then(res => {
          this.Loading = false;
          if(res.data.code == 200){
            window.location.href = res.data.data;
          }else{
            this.Loading = false;
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        },res => {
          this.Loading = false;
          /* this.$message({
           message: res.data.msg,
           type: "warning"
           });*/
        })
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
        let self = this;
          if(localStorage.getItem("userID")==undefined || localStorage.getItem("userID")==null || localStorage.getItem("userID")=='' || localStorage.getItem("userID")=='undefined' || localStorage.getItem("userID")=='null'){
            localStorage.setItem("loginToPage",'vouchers');
            self.$router.push({name:'login'});
          }else{
            self.getVoucherListParms.companyId = self.queryInfoData.companyId;
            queryCouponBalanceDetail(localStorage.getItem("userID"),self.getVoucherListParms).then(res => {
              self.Loading = false;
              if (res.data.code == 200) {
                if(res.data.data==null || res.data.data=='null'){
                  self.voucherDataList = [];
                  self.voucherDataListShow = false;
                  self.SxWk = true;
                }else{
                  self.voucherDataList = res.data.data;
                  if (self.voucherDataList != null && self.voucherDataList.length>0) {
                    self.voucherDataListShow = true;
                  } else {
                    self.voucherDataListShow = false;
                    self.SxWk = true;
                  }
                }
              } else {
                self.voucherDataList = [];
                self.voucherDataListShow = false;
                self.SxWk = true;
              }
            });
          }
      },
      toVoucherDetail(couponId,ingUrl,canTransfer){
        localStorage.setItem('getVoucherListParms',JSON.stringify(this.getVoucherListParms));
        if(couponId!='' && couponId!=null && couponId!=undefined){
          localStorage.setItem("getCouponId",couponId);
          localStorage.setItem("getCompanyId",this.queryInfoData.companyId);
          localStorage.setItem("getCompanyName",this.nowCompanyName);
          this.$router.push({name:'qDetails',params:{couponId:couponId,ingUrl:ingUrl,canTransfer:this.getVoucherListParms.canTransfer,companyId:this.getVoucherListParms.companyId,balanceType:this.getVoucherListParms.balanceType}});
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
        }
      });
        this.getCompanyList();
      if(localStorage.getItem('EntercompanyId')!='undefined' && localStorage.getItem('EntercompanyId')!=undefined){
        if(localStorage.getItem('EntercompanyName') == '账户总览'){
          this.queryInfoData.companyId = "";
          this.nowCompanyName = localStorage.getItem('EntercompanyName');
        }else{
          this.queryInfoData.companyId = localStorage.getItem('EntercompanyId');
          this.nowCompanyName = localStorage.getItem('EntercompanyName');
        }

      }
      if(localStorage.getItem('canTransferBill')!='undefined'){
        this.canTransfer = localStorage.getItem('canTransferBill');
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
      if(from.path == "/qDetails" || from.path == '/budget'){
        if(localStorage.getItem('canTransfer')!=undefined && localStorage.getItem('canTransfer')!='undefined' && localStorage.getItem('canTransfer')!=null && localStorage.getItem('canTransfer')!='null' && localStorage.getItem('canTransfer')!=''){
          localStorage.setItem('canTransferBill',localStorage.getItem('canTransfer'));
        }
        if(localStorage.getItem('getVoucherListParms')!=undefined && localStorage.getItem('getVoucherListParms')!='undefined' && localStorage.getItem('getVoucherListParms')!=null && localStorage.getItem('getVoucherListParms')!='null' && localStorage.getItem('getVoucherListParms')!=''){
          localStorage.setItem('getVoucherListParmsBill',localStorage.getItem('getVoucherListParms'));
        }
        if(localStorage.getItem('getCompanyId')!=undefined && localStorage.getItem('getCompanyId')!='undefined' && localStorage.getItem('getCompanyId')!=null && localStorage.getItem('getCompanyId')!='null'){
            if(localStorage.getItem('getCompanyName') == '账户总览'){
              localStorage.setItem('EntercompanyId',"");
              localStorage.setItem('EntercompanyName',localStorage.getItem('getCompanyName'));
            }else{
              localStorage.setItem('EntercompanyId',localStorage.getItem('getCompanyId'));
              localStorage.setItem('EntercompanyName',localStorage.getItem('getCompanyName'));
            }
        }
        next();
      }else if(from.path=='/simpleReim'){
        localStorage.setItem('canTransferBill','undefined');
        localStorage.setItem('getVoucherListParmsBill','undefined');
        localStorage.setItem('EntercompanyId',localStorage.getItem('companyId'));
        localStorage.setItem('EntercompanyName',localStorage.getItem('companyName'));
        next();
      }else{
        localStorage.setItem('canTransferBill','undefined');
        localStorage.setItem('getVoucherListParmsBill','undefined');
        localStorage.setItem('EntercompanyId','undefined');
        localStorage.setItem('EntercompanyName','undefined');
        next();
      }
    },
  }
</script>
<style type="text/css">
  .font-col-b-margin3{
    margin-top: 3rem;
  }
  .voucherEnterprise{
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
  .voucherEnterprise .goTransfor{
    justify-content: center;
    display: flex;
  }
  .voucherEnterprise .goTransfor .zzClose{
    font-size:1.8rem;
    right:1.3333rem;
    top:0.5rem;
  }
  .voucherEnterprise .zzWrap{
    width:22.5rem;
    height:24.83333rem;
    border-radius:7px;
    background:#fff;
    margin-top:50%;
  }
  .voucherEnterprise .zzWrap .zzTips1{
    margin-top:4rem;
  }
  .voucherEnterprise .zzWrap .zzTips2{
    color:#7E7A7A;
    margin-top:0.6666rem;
  }
  .voucherEnterprise .zzWrap img{
    margin-left: 50%;
    margin-top:1.5rem;
    transform: translateX(-50%);
    width:12rem;
    height:12rem;
  }
  /*新添加头部*/
  .voucherEnterprise .largeHeight{
    height:35%;
  }
  .voucherEnterprise .smallHeight{
    height:16.25rem;
  }
  .voucherEnterprise .vouchersInformation{
    background:#3B92EF;
  }
  .voucherEnterprise .vouchersInformation .informationWarp{
    /*width:95%;*/
    height:16.083333rem;
    margin:0 1.08333333rem;
    padding-top:1.3333333rem;
  }
  .voucherEnterprise .vouchersInformation .informationWarp .conpanyName{
    max-width: 18rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .voucherEnterprise .vouchersInformation .informationWarp .sim_img{
    top: -3px;
    left: 60%;
    margin-top: 0.6667rem;
    z-index: 10000;
  }
  .voucherEnterprise .vouchersInformation .informationWarp .sim_img .info_wrap_img{
    width:0.75rem;
    padding:0.2rem 1.41666667rem;
  }
  .voucherEnterprise .informationWarp .SZDetailed{
    background: #FFFFFF;
    border-radius: 1.25rem 0 0 1.25rem;
    top: .5rem;
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
  .voucherEnterprise .informationWarp .SZDetailed1{
    background: #FFFFFF;
    border-radius: 1.25rem 0 0 1.25rem;
    top: 4.5rem;
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
  .voucherEnterprise .informationWarp .useED{
    margin-top:0.3rem;
    font-size:2.583333rem;
  }
  .voucherEnterprise .informationWarp .stayRecharge{
    margin-top:0.58rem;
  }
  .voucherEnterprise .informationWarp .stayRecharge p:nth-of-type(2){
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
  .voucherEnterprise .fixedArea{
    width:93%;
    height:30%;
    bottom:0;
    z-index:555;
  }
  .voucherEnterprise .fixedArea .action{
    background:#fff;
    color:#2E2A2A;
  }
  .voucherEnterprise .fixedArea .normal{
    background:#B7DBFF;
    color:#3B92EF;
  }
  .voucherEnterprise .fixedArea .canTransfer,.canExpense{
    width:50%;
    height:100%;
  }
  .voucherEnterprise .fixedArea p:first-of-type{
    margin-top:0.6666667rem;
  }
  /*修改样式bug*/
  .voucherEnterprise .industry-border{
    border-bottom:solid 1rem #F6F6F6;
  }
  .voucherEnterprise .vouchersMarket{
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
  .voucherEnterprise .pst-rlts{
    /*width:28.5rem;*/
    width:100%;
    background:url("../../../../assets/img/Q_Modular/Q_bg.png") no-repeat center;
    height: 10.583333rem;
    background-size:100%;
  }
  .animated {
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  .voucherEnterprise .img_Bx1{
    width: 13rem;
    height: 13rem;
    margin-left: 8rem;
    padding-top: 50%;
  }
  .voucherEnterprise .fillIn-comter2{
    margin-top: 55.5%;
  }
  .voucherEnterprise .fillIn-comter2 .img_Bx{
    width: 13rem;
    height: 13rem;
    margin-left:30%;
    padding-top: 22%;
  }
  .voucherEnterprise .img_line{
    width: 1px;
    height: 2.083333rem;
  }
  .voucherEnterprise .fillIn-comter2 .font-ipt{
    margin-left: 0;
  }
  /*头部*/
  .voucherEnterprise .vouchers-title{
    /*height: 6%;*/
    position: sticky;
    /*position:fixed;*/
    top:0;
    left:0;
    background:#fff;
    z-index:555;
    /*top: 0.3rem;*/
  }
  .voucherEnterprise .vouchers-title .v_title_img{
    width: 50%;
    /*line-height: 3.2rem;*/
    height:100%;
  }
  .voucherEnterprise .vouchers-title .v_title_img img{
    width: 1.4166666667rem;
    padding-left: 35%;
    padding-top: 0.8rem;
    float: left;
  }
  .voucherEnterprise .vouchers-title .v_title_img span{
    padding-left: 0.5rem;
    font-size: 1rem;
    display: inline-block;
    line-height:3.2rem;
  }
  /*券部分*/
  .voucherEnterprise .vouchers-container{
    float:left;
    overflow-y: scroll;
    height:59.5%;
  }
  .voucherEnterprise .vouchers-footOp{
    bottom: 0;
    position: absolute;
    height: 3.666667rem;
    line-height: 3.6666667rem;
  }
  .voucherEnterprise .vouchers-conter .vouchers_Q{
    margin: 0 0.916rem;
    position: relative;
  }
  .voucherEnterprise .vouchers-conter .vouchers_Q_p{
    line-height: 4rem;
    margin: 0 0.65rem;
    font-size: 1.2rem;
  }
  .voucherEnterprise .vouchers-conter .Travel-farst{             /****************考虑删除**************************/
    width:98%;
    height:100%;
    position: relative;
    /*margin: 0 1rem;*/
  }
  .voucherEnterprise .vouchers-conter .Travel-farst .Travel-title{
    height: 2.083333rem;
    padding-top: 0.75rem;
    /*margin:0 1rem;*/
  }
  .voucherEnterprise .vouchers-conter .Travel-conter1{
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
  .voucherEnterprise .Travel-title .Travel-title-r{
    margin-right: 1.025rem;
    max-width: 48%;
  }
  .voucherEnterprise .Travel-title .Travel-title-r .money_1{
    font-size: 1.7rem;
  }
  .voucherEnterprise .Travel-title .Travel-title-r .money_2{
    font-size: 2.25rem;
    font-weight: bold;
  }
  .voucherEnterprise .Travel-title .Travel-title-r .money_3{
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
  .voucherEnterprise .v_screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    overflow-y: scroll;
    z-index:999999;
  }
  .voucherEnterprise .v_screen .pst-fixed{
    margin: 6rem 0;
    width: 7rem;
  }
  .voucherEnterprise .v_screen .v_screen_mask{
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
  .voucherEnterprise .vouchers-conter .vouchers-title{
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
  .voucherEnterprise .Travel-farst .Travel-title .Travel-title-l{
    max-width: 50%;
    margin-left: 1.25rem;
  }
  .wrapcenter_tips{
    width: 22.5rem;
    background: #fff;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .informationWarp .sim_wrap .sim_img .sim_wrap_img{
    width:0.75rem;
    padding:0.2rem 1.41666667rem;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .voucherEnterprise .vouchers-container{
      height:56.5%;
    }
    .voucherEnterprise .largeHeight{
      height:37%;
    }
    .voucherEnterprise .pst-rlts{
      height:9rem;
    }
    .voucherEnterprise .fixedArea p:first-of-type{
      margin-top: 1.2rem;
    }
    .voucherEnterprise .zzWrap{
      margin-top:35%;
    }
    .voucherEnterprise .vouchers-conter .vouchers_Q_p{
      line-height: 3rem;
    }
    .voucherEnterprise .vouchers-conter .Travel-farst {
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
    .voucherEnterprise .Travel-title .Travel-title-r {
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
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    /*.font-col-b-margin3{
      margin-top: 3rem;
    }*/
    .voucherEnterprise .vouchers-container{
      height:53.5%;
    }
    .voucherEnterprise .largeHeight {
      height: 42%;
    }
    .voucherEnterprise .fillIn-comter2 .img_Bx{
      padding-top:0;
    }
    .industry_btn_l div{
      /*padding-right:0.7rem;*/
    }
    .vouchers-conterIpad{
      height: 89.1%
    }
    .voucherEnterprise .fillIn-comter2 .img_Bx{
      margin-left:30%;
    }
    .voucherEnterprise .vouchers-title .v_title_img img{
      padding-top: 0.6rem;
    }
    .voucherEnterprise .vouchers-title .v_title_img span{
      line-height: 2.5rem;
    }
  }
</style>

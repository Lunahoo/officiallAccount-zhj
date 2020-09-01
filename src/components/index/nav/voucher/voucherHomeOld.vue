<template>
  <div class="voucherHome width height bg-f6 overflow-s" ref="vouchers"><!-- style="position: absolute"-->
    <!--无消费券状态-->
    <div class="vouchersInformation width pst-rlt" ref="voucherInformation" :class="Recharge==true?lHeight:sHeight">
      <div class="informationWarp">
        <div class="font-167 pst-rlt font-col-b">
          可用额度（元）
          <div class="SZDetailed cont pst-abs font-1" @click="toBudgetPage">收支明细</div>
        </div>
        <div class="useED font-col-b">{{canFreeAmount|money}}</div>
        <div class="stayRecharge font-col-b" v-if="Recharge">
          <p class="fl font-108">待充值：{{rechargeAmount|money}}</p>
          <!--<p class="font-075 fl cont" @click="tovoucherRechargePage">去充值</p>-->
        </div>
        <div class="fixedArea pst-abs font-167" v-if="canTransfer=='' || canTransfer == '1' || canTransfer == 1" >
          <div @click="switchC" class="canTransfer fl cont" ref="switchClick" :class="canTransfers">
            <p>可转让（元）</p >
            <p>{{canTransferAmount|money}}</p >
          </div>
          <div @click="switchCl" class="canExpense fl cont" ref="switchClicks" :class="canExpenses">
            <p>仅限消费（元）</p >
            <p>{{noTransferAmount|money}}</p >
          </div>
        </div>
        <div class="fixedArea pst-abs font-167" v-if="canTransfer!='' && canTransfer == '0'" >
          <div @click="switchC" class="canTransfer fl cont" ref="switchClick" :class="canExpenses">
            <p>可转让（元）</p >
            <p>{{canTransferAmount|money}}</p >
          </div>
          <div @click="switchCl" class="canExpense fl cont" ref="switchClicks" :class="canTransfers">
            <p>仅限消费（元）</p >
            <p>{{noTransferAmount|money}}</p >
          </div>
        </div>
      </div>
    </div>
    <div class="vouchers-title width " ref="vouchersTitle" :style="{height:vouchersTHeight}" v-show="voucherDataListShow">
      <div class="QMarket v_title_img fl" @click="showQRcodeImg" v-show="switchClick1"><img src="../../../../assets/img/Coupon/icon_Transfer@2x.png"/><span class="">去转让</span></div>
      <div class="QMarket v_title_img fl" @click="showQRcodeImg1" v-show="!switchClick1"><img src="../../../../assets/img/Coupon/icon_Transfer@2x.png"/><span class="">去使用</span></div>
      <img src="../../../../assets/img/Q_Modular/line@2x.png" class="pst-abs font-1 img_line" style="top: 5px;right: 50%;color: #E5E5E5;">
      <div class="Qcreen v_title_img fl" @click="screen"><img src="../../../../assets/img/Coupon/icon_screen@2x.png"/><span class="">筛选</span></div>
    </div>
    <div class="vouchers-conter vouchers-container vouchers-conterIpad pst-abs bg-f6  width" ref="vouchersContent" :style="{height:vouchersHeight,top:voucherTop,overflow:overflowS}"  v-show="voucherDataListShow"><!--voucherDataListShow overflow-s-->
      <!--出行--><!--
        <div class="jdkfsfjs"></div>-->
      <div class="vouchers-wrap bg-f6 width">
          <div v-for="(voucherData,index1) in voucherDataList" :key="index1" class="pst-rlts  pst-rlts height pd-tp0583">
            <div class="Travel-farst fl width" @click="toVoucherDetail(voucherData.couponId,voucherData.imageUrl,voucherData.canTransfer)" :key="voucherData.couponId">
              <img class="Travel-farst-img" :src="voucherData.imageUrl" />
              <img class="Travel-farst-imgs pst-abs" v-if="voucherData.canTransfer=='0'||voucherData.canTransfer==0" src="../../../../assets/image/img_seal@2x.png">
              <div class="Travel-title">
                <div class="Travel-title-l fl">
                  <p class="Travel-conter ellipsis_name">{{voucherData.couponName}}</p>
                  <!--<p class="Travel-small font-7b7">{{voucherData.startTime | parseTime('{y}-{m}-{d} {h}:{i}')}}/{{voucherData.endTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
                --></div>
                <div class="Travel-title-r fr">
                  <p class="Travel-conter1 font-fa ellipsis_name"><span class="money_1">￥</span><span class="money_2">{{voucherData.couponAmount|money}}</span><span class="money_3"></span></p>
                </div>
              </div>
              <div class="Travel-sec width fl">
                <img class="Travel-zRz-img" v-if="voucherData.status=='4'" src="../../../../assets/img/Q_Modular/Q_zRz.png"/>
                <div class="Travel-sec-l font-ipt fl">
                  <div class="font-1 ellipsis_name"><span>限定商户：</span><span>{{voucherData.commercialsName|strSub}}</span></div>
                  <div class="font-1 ellipsis_name"><span>限定地区：</span><span>{{voucherData.areasName|strSub}}</span>
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
    <!--空状态-->
    <div class="fillIn-comter2 vouchers-conter pst-abs pos-top width" v-show="!voucherDataListShow">
      <img src="../../../../assets/image/news/img_blank_page@2x.png" class="img_Bx">
      <p class="font-ipt pd-bt cont">暂无可用消费券</p>
    </div>
    <!--弹出框-->
    <div class="v_screen" v-show="screen1">
      <!--行业类别-->
      <div @click="screen1SHide" class="pst-fixed pos-left height font-s15"></div>
      <div class="v_screen_mask bg-f6 height animated fadeInRightBig"><!---->
        <div style="height: 95%;overflow-y: scroll;">
          <!--第一条-->
          <div class="industry width fl bg-ff industry-border">
            <div class="mask_Popup fl width bd-btm" name="industry">
              <div class="industry_title">
                <p class="mask_Popup_p1 font-ipt">行业</p>
                <div @click="showHideindustry">
                  <img class="voucher_industry_icon fr showAndhide" v-show="!industryAll" src="../../../../assets/img/account/icon_white_down.png"/>
                  <img class="voucher_industry_icon fr showAndhide" v-show="industryAll" src="../../../../assets/img/account/icon_white_up.png"/>
                  <span class="font-1 fr showAndhide" v-show="!industryAll" style="margin-right: 2rem;">全部</span>
                  <span class="font-1 fr showAndhide" v-show="industryAll" style="margin-right: 2rem;">收起</span>
                </div>
              </div>
              <template v-if="queryDataList.length != 0 && queryDataList!=null">
                <div class="mask_Popup_type" :id="'industry_'+queryData.id" v-if="index<3 && queryData.industryName!=''" v-for="(queryData,index) in this.queryDataList" :key="index" @click="ifShowImg($event,queryData.id)">
                  {{queryData.industryName}}
                </div>
                <div class="mask_Popup_type" :id="'industry_'+queryData.id" v-show="index>2 && industryAll && queryData.industryName!=''" v-for="(queryData,index) in this.queryDataList" :key="index" @click="ifShowImg($event,queryData.id)">
                  {{queryData.industryName}}
                </div>
              </template>
            </div>
          </div>
          <!--第二条-->
          <div class="industry width fl bg-ff industry-border">
            <div class="mask_Popup fl width bd-btm" name="category">
              <div class="industry_title">
                <p class="mask_Popup_p1 font-ipt">类别</p>
                <div @click="showHidecategory">
                  <img class="voucher_industry_icon fr showAndhide" v-show="!categoryAll" src="../../../../assets/img/account/icon_white_down.png"/>
                  <img class="voucher_industry_icon fr showAndhide" v-show="categoryAll" src="../../../../assets/img/account/icon_white_up.png"/>
                  <span class="font-1 fr showAndhide" v-show="!categoryAll" style="margin-right: 2rem;">全部</span>
                  <span class="font-1 fr showAndhide" v-show="categoryAll" style="margin-right: 2rem;">收起</span>
                </div>
              </div>
              <div class="mask_Popup_type" id="categoryAll" v-show="!isCheckedIndustry" @click="ifShowImg($event,undefined,'all')">
                全部
              </div>
              <template v-if="queryCategoryDataList.length != 0 && queryCategoryDataList!=null">
                <div class="mask_Popup_type" :id="'category_'+queryCategoryData.id" v-if="index<indexCategory && queryCategoryData.industryName!=''" v-for="(queryCategoryData,index) in this.queryCategoryDataList" :key="index" @click="ifShowImg($event,undefined,queryCategoryData.id)">
                  {{queryCategoryData.industryName}}
                </div>
                <div class="mask_Popup_type" :id="'category_'+queryCategoryData.id" v-show="index>indexCategory-1 && categoryAll && queryCategoryData.industryName!=''" v-for="(queryCategoryData,index) in this.queryCategoryDataList" :key="index" @click="ifShowImg($event,undefined,queryCategoryData.id)">
                  {{queryCategoryData.industryName}}
                </div>
              </template>
            </div>
          </div>
          <!--第三条-->
          <div class="industry width fl bg-ff industry-border">
            <div class="mask_Popup fl width" name="vendors">
              <div class="industry_title">
                <p class="mask_Popup_p1 font-ipt">商户</p>
                <div @click="showHideVendors">
                  <img class="voucher_industry_icon fr showAndhide" v-show="!vendorsAll" src="../../../../assets/img/account/icon_white_down.png"/>
                  <img class="voucher_industry_icon fr showAndhide" v-show="vendorsAll" src="../../../../assets/img/account/icon_white_up.png"/>
                  <span class="font-1 fr showAndhide" v-show="!vendorsAll" style="margin-right: 2rem;">全部</span>
                  <span class="font-1 fr showAndhide" v-show="vendorsAll" style="margin-right: 2rem;">收起</span>
                </div>
              </div>
              <div class="mask_Popup_type" id="vendorsAll" v-show="!isCheckedCategory" @click="ifShowImg($event,undefined,undefined,'all')">
                全部
              </div>
              <template v-if="this.queryVendorsList.length>0">
                <div class="mask_Popup_type" :id="'vendors_'+queryVendorsData.id" v-if="index<indexVendor && queryVendorsData.vendorName!=''" v-for="(queryVendorsData,index) in this.queryVendorsList" :key="index" @click="ifShowImg($event,undefined,undefined,queryVendorsData.id)">
                  {{queryVendorsData.vendorName}}
                </div>
                <div class="mask_Popup_type" :id="'vendors_'+queryVendorsData.id" v-show="index>indexVendor-1&&vendorsAll && queryVendorsData.vendorName!=''" v-for="(queryVendorsData,index) in this.queryVendorsList" :key="index" @click="ifShowImg($event,undefined,undefined,queryVendorsData.id)">
                  {{queryVendorsData.vendorName}}
                </div>
              </template>
            </div>
          </div>
          <!--重置确定-->
          <!--<router-link to="/aBank"><div style="width:30px;height:30px;background:#fff;position:absolute;top:0;right:0"></div></router-link>--> <!--先留着，后续测试通过删除  -- hp-->
        </div>
        <div class="industry_btn fl">
          <div class="industry_btn_l fl cont" @click="clearQueryData">
            <div class="industry_reset bg-ff">重置</div>
          </div>
          <div class="industry_btn_l fl cont" @click="disappear">
            <div class="industry_btn_Q bt-color font-col-b">确定</div>
          </div>
        </div>
      </div>
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
<script>
  import {queryMemberCouponList,findTransferCouponList,queryCategoryOrIndustry,queryVendors,queryVendorsByCategory,queryIndustryClass} from '@/api/user/userLogin'
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
        canTransfer:"",
        switchClick1:true,/*去使用、去转让的显示*/
        error_prompt:"",//提示弹框
        content:"",
        SxWk:false,
        voucherDataListShow:false,
        Loading:false,
        screen1:false,
        industryAll:false,//行业全部显示
        categoryAll:false,//类别全部显示
        vendorsAll:false,//商户全部显示
        showQRcode:false,//显示易得多二维码
        isCheckedIndustry:false,//是否选中行业信息
        isCheckedCategory:false,//是否选中类别信息
        indexCategory:2,
        indexVendor:2,
        aa:'生活服务通a',
        bb:'',
        vouchersHeight:"60.5%",   //
        vouchersTHeight:'6%',
        voucherTop:"",     //3.2rem
        overflowS:'scroll',   //scroll
        psi:"",
        bgImg: require('../../../../assets/img/Q_Modular/Q_Select.png'),
        checkDataList:[],
        checkVendorsList:[],
        IndustryId:"",//行业ID
        companyId:"",
        canTransfers:"action",
        canExpenses:"normal",
        GOtransfor:false,
        Recharge:true,
        deviceModel:"",   //判断设备机型
        lHeight:"largeHeight",
        sHeight:"smallHeight",
        canTransferAmount:0,//可转让金额
        noTransferAmount:0,//不可转让金额
        canFreeAmount:0,//可用额度
        rechargeAmount:0,//待充值额度
        searchCategoryList:[],//选中类别集合
        //获取消费券列表
        getVoucherListParms:{
          companyId:localStorage.getItem('companyId'),
          canTransfer:'1',//是否可转让标识；1：可转让；0：不可转让
          industryId:'',//行业类型ID
          vendorIdList:[],//商户集合
          categoryIdList:[],//券类别id集合
        },
        //获取券列表信息
        voucherDataList:{

        },
        //获取券行业列表
        queryDataList:{

        },
        //获取券类别列表
        queryCategoryDataList:{

        },
        //获取券查询条件信息（商户列表）
        queryVendorsList:{

        },
        categoryIdList:[],
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
      //显示全部收起行业
      showHideindustry(){
        this.industryAll = !this.industryAll;
      },
      //显示全部收起类别
      showHidecategory(){
        this.categoryAll = !this.categoryAll;
      },
      //显示全部收起商户
      showHideVendors(){
        this.vendorsAll = !this.vendorsAll;
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
        this.$router.push({name:'budget'});
      },
      tovoucherRechargePage(){
        this.$router.push({name:'voucherRecharge'});
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
      screen1SHide(){//点击任意地方隐藏遮罩
        this.overflowS = 'scroll';
        this.screen1= false;
        if(this.voucherDataList==undefined || this.voucherDataList.length == 0 || this.voucherDataList == null){
          this.SxWk = true;
        }
      },
      //选中全部类别切换页面样式
      clearCategoryAll(){
        let ArrayCategory = document.getElementsByName('category')[0].children;
        for(let i=0;i<ArrayCategory.length;i++){
          if(ArrayCategory[i].className == 'mask_Popup_type_check' && ArrayCategory[i].id!='categoryAll'){
            ArrayCategory[i].className = 'mask_Popup_type';
            ArrayCategory[i].style.color = '#2E2A2A';
            this.clearCategoryAll();
          }
        }
          document.getElementById('categoryAll').setAttribute('class', 'mask_Popup_type_check');
          document.getElementById('categoryAll').style.color = '#EB7B03';
      },
      //选中全部商户切换页面样式
      clearVendorsAll(){
        let ArrayVendors = document.getElementsByName('vendors')[0].children;
        for(let i=0;i<ArrayVendors.length;i++){
          if(ArrayVendors[i].className == 'mask_Popup_type_check' && ArrayVendors[i].id!='vendorsAll'){
            ArrayVendors[i].className = 'mask_Popup_type';
            ArrayVendors[i].style.color = '#2E2A2A';
            this.clearVendorsAll();
          }
        }
          document.getElementById('vendorsAll').setAttribute('class','mask_Popup_type_check');
          document.getElementById('vendorsAll').style.color = '#EB7B03';
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
      //显示隐藏选中状态img
      ifShowImg:function (event,industryId,typeIds,vendors) {
        this.screen1= true;
        //券状态
        if(event.currentTarget.className == "mask_Popup_type"){
          event.currentTarget.setAttribute('class','mask_Popup_type_check');
          event.currentTarget.style.color = '#EB7B03';
          //选中行业券ID
          if(industryId!=undefined && industryId!='' && industryId!=null){
            this.isCheckedIndustry = true;
            this.indexCategory = 3;
            this.getVoucherListParms.industryId = industryId;
            //ToDo 删选选中行业下的类别信息
            this.IndustryList('1',industryId);
            this.checkVendorsList = [];
            //ToDo 实现行业单选功能
            let industryArrays = event.currentTarget.parentNode.children;
            for(let i=0;i<industryArrays.length;i++){
              if(industryArrays[i].className == 'mask_Popup_type_check'){
                industryArrays[i].style.color = '#2E2A2A'
                industryArrays[i].className = "mask_Popup_type";
              }
            }
            event.currentTarget.setAttribute('class','mask_Popup_type_check');
            event.currentTarget.style.color = '#EB7B03';
            this.checkDataList = [];
            this.clearCategoryAll();
          }else{
            event.currentTarget.setAttribute('class','mask_Popup_type_check');
            event.currentTarget.style.color = '#EB7B03';
            if(typeIds!=undefined && typeIds!='' && typeIds!=null){
              if(typeIds=='all'){
                this.checkDataList = [];
                this.checkVendorsList = [];
                this.checkDataList[0] = typeIds;
                this.VendorsList();
                this.clearCategoryAll();
              }else{
                if(this.checkDataList!=undefined && this.checkDataList.length>0){
                  for(let i=0;i<this.checkDataList.length;i++){
                    if(this.checkDataList[i] == 'all'){
                      document.getElementById('categoryAll').setAttribute('class','mask_Popup_type');
                      document.getElementById('categoryAll').style.color = '#2E2A2A';
                      this.checkDataList.splice(i,1);
                    }
                  }
                }
                this.checkDataList[this.checkDataList.length] = typeIds;
                this.isCheckedCategory = true;
                this.indexVendor = 3;
                this.categoryIdList = this.checkDataList;
                this.VendorsList();
              }
            }
            //添加商户ids
            if(vendors!=undefined && vendors!=null && vendors!=''){
              if(vendors=='all'){
                this.checkVendorsList = [];
                this.checkVendorsList[0] = vendors;
                this.clearVendorsAll();
              }else{
                if(this.checkVendorsList!=undefined && this.checkVendorsList.length>0){
                  for(let i=0;i<this.checkVendorsList.length;i++){
                    if(this.checkVendorsList[i] == 'all'){
                      document.getElementById('vendorsAll').setAttribute('class','mask_Popup_type');
                      document.getElementById('vendorsAll').style.color = '#2E2A2A';
                      this.checkVendorsList.splice(i,1);
                    }
                  }
                }
                this.checkVendorsList[this.checkVendorsList.length] = vendors;
              }
              }
          }
        }else{
          event.currentTarget.setAttribute('class','mask_Popup_type');
          event.currentTarget.style.color = '#2E2A2A';
          //删除已有类别ids
          if(typeIds!=undefined && typeIds!=null && typeIds!=''){
            if(this.checkDataList.length>0){
              for(let i=0;i<this.checkDataList.length;i++){
                if(this.checkDataList[i] == typeIds){
                  this.checkDataList.splice(i,1);
                  if(this.checkDataList.length==0){
                    this.isCheckedCategory = false;
                    this.indexVendor = 2;
                    if(this.getVoucherListParms.industryId!=undefined && this.getVoucherListParms.industryId!=null && this.getVoucherListParms.industryId!=""){
                      this.categoryIdList = [];
                    }else{
                      this.isCheckedIndustry = false;
                      this.indexCategory = 2;
                      this.categoryIdList = [];
                    }
                  }else{
                    this.categoryIdList = this.checkDataList;
                  }
                }
              }
              if(this.getVoucherListParms.industryId == undefined || this.getVoucherListParms.industryId == null || this.getVoucherListParms.industryId == ""){
                this.isCheckedIndustry = false;
                this.indexCategory = 2;
                if(this.checkDataList.length == 0){
                  this.isCheckedCategory = false;
                  this.indexVendor = 2;
                  this.categoryIdList = [];
                }
              }
            }else{
              this.isCheckedCategory = false;
              this.indexVendor = 2;
              this.categoryIdList = [];
            }
            this.VendorsList();
            this.checkVendorsList = [];
          }else{
            if(industryId!=undefined && industryId!='' && industryId!=null){
              this.getVoucherListParms.industryId = "";
              this.isCheckedIndustry = false;
              this.indexCategory = 2;
              this.categoryIdList = [];
              this.IndustryList('1');
              this.checkVendorsList = [];
            }
            //删除已有商户ids
            if(vendors!=undefined && vendors!=null && vendors!=''){
              if(this.checkVendorsList.length>0){
                for(let i=0;i<this.checkVendorsList.length;i++){
                  if(this.checkVendorsList[i] == vendors){
                    this.checkVendorsList.splice(i,1);
                  }
                }
              }
            }
          }
        }
      },
      screen:function () {
        this.overflowS = 'scroll';
        this.screen1 = true;
        //获取全部行业信息
        this.IndustryList('0');
        if(this.getVoucherListParms.industryId!=null && this.getVoucherListParms.industryId!=""){
          this.isCheckedIndustry = true;
          this.indexCategory = 3;
        }
        if(this.getVoucherListParms.categoryIdList.length == 1 && this.getVoucherListParms.categoryIdList[0] != 'all'){
          this.isCheckedCategory = true;
          this.indexVendor = 3;
        }
        this.IndustryList('1',this.getVoucherListParms.industryId);
        this.SxWk= false;
        this.VendorsList();
        let self = this;
        setTimeout(function () {
          if(self.getVoucherListParms.industryId!=null && self.getVoucherListParms.industryId!=""){
              document.getElementById('industry_'+self.getVoucherListParms.industryId).setAttribute('class','mask_Popup_type_check');
              document.getElementById('industry_'+self.getVoucherListParms.industryId).style.color = '#EB7B03';
              document.getElementById('categoryAll').style.display = 'none';
          }
          if(self.getVoucherListParms.categoryIdList!=null && self.getVoucherListParms.categoryIdList.length>0){
              if(self.getVoucherListParms.categoryIdList.length == 1 && self.getVoucherListParms.categoryIdList[0] == 'all'){
                document.getElementById('categoryAll').setAttribute('class','mask_Popup_type_check');
                document.getElementById('categoryAll').style.color = '#EB7B03';
              }else{
                for(let i=0;i<self.getVoucherListParms.categoryIdList.length;i++){
                  document.getElementById('category_'+self.getVoucherListParms.categoryIdList[i]).setAttribute('class','mask_Popup_type_check');
                  document.getElementById('category_'+self.getVoucherListParms.categoryIdList[i]).style.color = '#EB7B03';
                }
              }
          }
          if(self.getVoucherListParms.vendorIdList!=null && self.getVoucherListParms.vendorIdList.length>0){
            if(self.getVoucherListParms.vendorIdList.length == 1 && self.getVoucherListParms.vendorIdList[0] == 'all'){
              document.getElementById('vendorsAll').setAttribute('class','mask_Popup_type_check');
              document.getElementById('vendorsAll').style.color = '#EB7B03';
            }else{
              for(let i=0;i<self.getVoucherListParms.vendorIdList.length;i++){
                document.getElementById('vendors_'+self.getVoucherListParms.vendorIdList[i]).setAttribute('class','mask_Popup_type_check');
                document.getElementById('vendors_'+self.getVoucherListParms.vendorIdList[i]).style.color = '#EB7B03';
              }
            }
          }
        },500)
      },
      //获取全部行业信息
      IndustryList(level,industryId){
        let industry = "";
        if(industryId == undefined || industryId == null || industryId == "" || industryId == 'undefined'){
          industry == this.getVoucherListParms.industryId;
        }else{
          industry = industryId;
        }
        queryCategoryOrIndustry(localStorage.getItem("userID"),level,industry).then(res => {
          if(res.data.code == 200){
            this.Loading = false;
            if(level=='0' || level==0){
              this.queryDataList = res.data.data;
            }else{
              this.queryCategoryDataList = res.data.data;
            }
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
        });
      },
      //获取全部商户信息
      VendorsList(value){
          this.searchCategoryList = this.checkDataList;
          if(this.checkDataList!=undefined && this.checkDataList[0] == 'all'){
            this.searchCategoryList = [];
            this.isCheckedCategory = false;
            this.indexVendor = 2;
            this.categoryIdList = [];
          }
        queryVendorsByCategory(localStorage.getItem("userID"),this.searchCategoryList).then(res => {
          if(res.data.code == 200){
            this.queryVendorsList = res.data.data
          }else{
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        },res => {
          /* this.$message({
           message: res.data.msg,
           type: "warning"
           });*/
        });
      },
      disappear:function () {
        this.screen1 = false;
        /* this.clearQueryData()*/
        this.getVoucherListParms.categoryIdList = this.checkDataList;
        this.getVoucherListParms.vendorIdList = this.checkVendorsList;
        this.getfindTransferCouponList(this.getVoucherListParms.canTransfer);
      },
      //清空所有选中删选条件
      clearQueryData(){
        let checkArrs = document.getElementsByClassName('mask_Popup_type_check');
        if(checkArrs.length>0) {
          checkArrs[0].style.color = '#2E2A2A'
          checkArrs[0].className = "mask_Popup_type";
          this.clearQueryData()
        }
        this.isCheckedIndustry = false;
        this.isCheckedCategory = false;
        this.indexCategory = 2;
        this.indexVendor = 2;
        this.categoryAll = false;
        this.getVoucherListParms.categoryIdList = [];
        this.getVoucherListParms.vendorIdList = [];
        this.getVoucherListParms.industryId = '';
        this.checkDataList = [];
        this.checkVendorsList = [];
        this.categoryIdList = [];
        this.VendorsList();
        this.IndustryList('0');
        this.IndustryList('1');
      },
      //查询消费券是否可转让券列表
      getfindTransferCouponList(canTransfer){
        if(canTransfer == undefined || canTransfer == null){
          this.getVoucherListParms.canTransfer = '1';
        }else{
           this.getVoucherListParms.canTransfer = canTransfer;
        }
        if(localStorage.getItem("userID")==undefined || localStorage.getItem("userID")==null || localStorage.getItem("userID")=='' || localStorage.getItem("userID")=='undefined' || localStorage.getItem("userID")=='null'){
          localStorage.setItem("loginToPage",'vouchers');
          this.$router.push({name:'login'});
        }else{
          this.getVoucherListParms.companyId = localStorage.getItem('companyId');
          findTransferCouponList(localStorage.getItem("userID"),this.getVoucherListParms).then(res => {
            this.Loading = false;
            if (res.data.code == 200) {
                if(res.data.data==null || res.data.data=='null'){
                  this.voucherDataList = [];
                  this.voucherDataListShow = false;
                  this.SxWk = true;
                }else{
                  this.canTransferAmount = res.data.data.canTransferAmount;
                  this.noTransferAmount = res.data.data.noTransferAmount;
                  this.canFreeAmount = res.data.data.canFreeAmount;
                  this.rechargeAmount = res.data.data.rechargeAmount;
                  this.voucherDataList = res.data.data.couponH5VoList;
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
      },
      toVoucherDetail(couponId,ingUrl,canTransfer){
        localStorage.setItem('getVoucherListParms',JSON.stringify(this.getVoucherListParms));
        if(couponId!='' && couponId!=null && couponId!=undefined){
          localStorage.setItem("getCouponId",couponId);
          this.$router.push({name:'qDetails',params:{couponId:couponId,ingUrl:ingUrl,canTransfer:canTransfer}});
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
          this.checkDataList = this.getVoucherListParms.categoryIdList;
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
    height:18.083333rem;
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
  .voucherHome .informationWarp .SZDetailed{
    /*width:5.83333rem;*/
    /*height:2.25rem;*/
    /*line-height:2.3rem;*/
    border:solid 1px #fff;
    border-radius:1.25rem;
    right:0;
    top:50%;
    transform:translateY(-50%);
    padding:0.25rem 0.8rem;
  }
  .voucherHome .informationWarp .useED{
    margin-top:0.3rem;
    font-size:2.583333rem;
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
    height:6.666666rem;
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
    margin-top:1.6666rem;
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
    width:100%;
    background:url("../../../../assets/img/Q_Modular/Q_bg.png") no-repeat center;
    height: 10.583333rem;
    background-size:100%;
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
    margin: 0 .525rem;
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
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .voucherHome .pst-rlts{
      height:9rem;
    }
    .voucherHome .largeHeight{
      height: 33.5%;
    }
    .voucherHome .fixedArea{
      height: 5.666666rem;
    }
    .voucherHome .fixedArea p:first-of-type{
      margin-top: 1.2rem;
    }
    .voucherHome .zzWrap{
      margin-top:35%;
    }
    .voucherHome .informationWarp .SZDetailed{

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
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
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

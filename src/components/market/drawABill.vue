<template>
  <div class="DrawABill width bg-f6 fl" style="min-height: 100%;">
    <!--同时可以开设电子发票和纸质发票-->
    <div class="mG-top fl bg-ff">
      <div v-show="draSec" class="bg-ff fl width font-125 bd-btm">
        <div class="four_father fl DrawABill-width Draw-pad">
          <div class="fl ">发票类型</div>
          <img class="fl DrawABill-pad-w" src="../../assets/img/icon_details@2x.png"/>
        </div>
        <div class="four_father fl DrawABill-width">
          <div v-if="InvoiceType== 3 || InvoiceType== '3'" :class="this.InvoiceType == 3?'DrawABill-pad':'DrawABill-pad1'" @click="switchC" ref="switchClick" class="fl cont bRadius-3 DB-pad-icon" >
            <p class="font-133">电子发票</p>
            <p class="font-108">免费</p>
          </div>
          <div v-if="InvoiceType!= 3 || InvoiceType!= '3'" :class="this.InvoiceType == 2 || this.InvoiceType == 1?'DrawABill-pad':'DrawABill-pad1'" @click="switchC1" ref="switchClicks" class="fl font-a39 cont bRadius-3">
            <p class="font-133">纸质发票</p>
            <p class="font-108">快递￥{{parameter1.expressFee}}元</p>
          </div>
          <div class="font-108 font-7b7 fl pd-tp1 pd-bt">电子发票与纸质发票具有同等法律效力，可支持报销入账，推荐使用电子发票。</div>
        </div>
      </div>
      <div class="bg-ff fl width font-125">
        <div class="Draw-main-108 fl bd-btm DrawABill-width" >
          <div class="fl ">开票种类</div>
          <div class="fr" v-if="InvoiceType== 3 || InvoiceType== '3' || InvoiceType== 1 || InvoiceType== '1'">普票</div>
          <div class="fr" v-if="InvoiceType== 2 || InvoiceType== '2'">专票</div>
        </div>
        <div class="Draw-main-108 fl bd-btm DrawABill-width" >
          <div class="fl ">发票金额</div>
          <img v-show="!draSec" class="fl" style="width: 1.41666667rem;padding: 0.3rem 0 0 0.5rem;" src="../../assets/img/icon_details@2x.png"/>
          <div class="fr ">￥ {{parameter1.buyAmount}}</div>
        </div>
        <!--选择发票抬头-->
        <div class="Draw-main-108 fl bd-btm DrawABill-width" v-if="ChoiceIpt" @click="choiceI">
          <div class="fl">发票抬头</div>
          <div class="fr mP-right cont-r">
            <div class="cont-r font-7b7" >请选择发票抬头</div>
          </div>
        </div>
        <div class="Draw-main-108 fl bd-btm DrawABill-width" v-if="!ChoiceIpt" @click="choiceI">
          <div v-show="!ChoiceKong">
            <div class="fl" style="padding-top: 0.8rem;">发票抬头</div>
            <div class="fr mP-right cont-r">
              <div @blur="jySYS('公司抬头',invoiceTitle)">{{this.parameter1.buyerName}}</div>
              <div class="font-108 font-7b7 fr">
                <div class="fl Draw-qy-icon"><img src="../../assets/image/c/icon_ordinary@2x.png" /></div>
                <div class="fl Draw-qy-icon" v-show="Special"><img src="../../assets/image/c/icon_special@2x.png" /></div>
                <div class="fl" v-show="configT">[企业]</div>
                <div class="fl" v-show="!configT">[个人]</div>
                <div class="fl" v-show="qY">{{this.parameter1.buyerNumber}}</div>
              </div>
            </div>
          </div>
          <div v-show="ChoiceKong">
            <div class="fl">发票抬头</div>
            <div class="fr mP-right cont-r font-7b7">
              <div>请选择发票抬头</div>
            </div>
          </div>
        </div>
        <!--选择发票抬头结束-->
        <div class="Draw-main-108 fl bd-btm DrawABill-width">
          <div class="fl ">发票内容</div>
          <div class="fr cont-r" style="width: 78%;">
            <div class="cont-r font-125 width font-2a2a ellipsis_name" v-text="Icontent" ></div>
          </div>
        </div>
        <div class="Draw-main-108 fl bd-btm DrawABill-width">
          <div class="fl" v-if="InvoiceType==3" >手机号</div>
          <div class="fl" v-if="InvoiceType==1 || InvoiceType == 2">邮寄</div>
          <div class="fr cont-r">
            <input style="width: 100%;padding-right: 0.5rem;" type="text" @blur="jySYS('手机号',dTel)" v-if="InvoiceType==3" v-model="drawTel" maxlength="11" class="cont-r" placeholder="用于接收电子发票"/>
            <div v-if="InvoiceType==1 || InvoiceType == 2">快递 {{parameter1.expressFee}}元</div>
          </div>
        </div>
        <div class="Draw-main-108 fl DrawABill-width">
          <div class="fl" v-if="InvoiceType==3">电子邮箱</div>  <!--Paper-->
          <div class="fl" v-if="InvoiceType==1 || InvoiceType == 2">
            <p v-show="PaperLeft">邮寄地址</p>
            <p v-show="!PaperLeft" class="height-4083">邮寄地址</p>
          </div>
          <div>
            <div class="fr mP-right1 font-7b7 cont-r" v-if="parameter1.invoiceType==3 || parameter1.invoiceType=='3'" v-show="PaperDz">
              <input style="width: 100%;" class="cont-r" v-model="drawEmail" @blur="jySYS('电子邮箱',dEmail)"  placeholder="用于接收电子发票"/>
            </div>
            <div v-show="PaperDz" class="fr font-7b7 cont-r" @click="mladdress">
              <div v-show="InvoiceType!= 3 || InvoiceType!= '3'">请选择邮寄地址</div>
            </div>
            <div class="fr mP-right cont-r" v-show="!PaperDz" v-if="parameter1.invoiceType==1 || parameter1.invoiceType=='1' || parameter1.invoiceType==2 || parameter1.invoiceType=='2'">
              <div v-show="paperKong" class="fr font-7b7 cont-r" @click="mladdress">请选择邮寄地址</div>
              <div class="fr" v-show="!paperKong" @click="mladdress">
                <div class="fr width">{{this.addName}} {{this.addTel}}</div>
                <div class="font-108 fr width" @blur="jySYS('收获地址',addressDz)">{{addressDz}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Draw-main-108 fl DrawABill-width font-ipt font-167" v-if="parameter1.buyAmount > invoiceAmountMax"> <!--  invoiceAmountMax-->
      <!--<div class="fl ">开票规则</div>
      <div class="fr">发票帮助</div>-->
      <div class="font-F89 font-125">提示:由于开票金额大于单张最大可开金额，将为您拆分为多张发票。</div>
    </div>
    <div class="fl width" style="padding: 1rem 0;">
      <div @click="Submission" :class="btnColor"
           class="font-col-b bg-FA4 fl four_father DrawABill-width cont four_left bRadius-3 font-133"
           style="bottom: 0.5rem;">提交</div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryMemberInvoiceConfigPage,queryShippingAddressPage,addInvoiceApply,editInvoiceApply,queryFreightAmount} from "@/api/aloneC/cInterface"/*发票抬头、收获地址、分页查询发票抬头、预开票接口、预开票回调接口*/
  export default {
    data () {
      return {
        invoiceAmountMax:'',
        typeP:'',
        qY:true,
        businessName:{},//商户名称
        content: "",
        error_prompt:"",
        idAll:'',//预开票回调id
        type:'',//图片订单页用
        addressList:[],
        drawTel:localStorage.getItem("loginTell"),//手机号
        btnColor:"op-3", /*按钮颜色*/
        drawEmail:'',//邮箱
        General:true,/*普票图标*/
        Special:true,/*专票图标*/
        configT:false,/*显示个人还是企业*/
        ChoiceIpt:false,/*显示input或者发票抬头样式*/
        addressM:false,//地址判断来源
        draSec:true,/*是否可以同时开具电子发票和纸质发票*/
        PaperDz:true,//电子邮箱input
        PaperLeft:false,                                   //邮寄地址两种样式  左
        PaperRight:true,                                  //邮寄地址两种样式  右
        paperKong:true,/*纸质发票地址为空时*/
        ChoiceKong:false,/*发票抬头未输入时*/
        Icontent:'发票内容',/*发票内容*/
        drawMoney:'',/*金额*/
        InvoiceType:'',/*发票类型*/
        addName:'',//地址姓名
        addTel:'',//地址手机号
        addressDz:'',//地址详情
        listdata:{
          ttName:'',//发票抬头公司名称
          zInvoice:'',//是否支持专票
          configType:'',//个人还是企业
          orgTaxNo:'',//税号
        },//发票抬头
        parameter:{//
        },
        parameter2:{

        },
        ttList:{},
        parameter1:{
          yApplyId:'',
          phone:'',//手机号
          mailingAddress:'',//邮箱
          mailBox:'',//邮寄地址
          couponId:'',                    //劵id
          couponName:'',                  //券名称
          vendorId:'',                    //商户id
          vendorName:'',                  //商户名称
          letterheadId:'',//开票抬头公司
          letterheadName:'',//开票抬头公司名称
          itemCode:'',//主科目code
          itemName:'',//主科目名称
          subItemCode:'',//子科目code
          subItemName:'',//子科目名称
          subjectId: '',//子科目code
          subjectName: '',//子科目名称
          rate:'',//税率
          subjectDesprict:'',//科目汇总
          applyor:'',//申请人
          //buyAmount:'',//购买金额
          taxIncludedPrice:'',//购买金额
          expressFee:'',//快递费
          invoiceContent:'',//发票内容和科目汇总一样
          invoiceSelect:1,//开票选择，1：立即开票，2：稍后开票 3：不需要开票
          invoiceType:3,//发票类型 ：1：纸质普票，2：纸质专票 ，3:电子发票
          isAdvance:1,//
          orderPayNos:[],
        },
      }
    },
    methods: {
      adTimer: function () {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      init(){
        let regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        //点击提交需要的参数
        if(this.$route.params.parameter1!=undefined && this.$route.params.parameter1!="" && this.$route.params.parameter1!=null && this.$route.params.parameter1!='undefined' && this.$route.params.parameter1!='null'){
          this.parameter1 = this.$route.params.parameter1;
          localStorage.setItem('parameter1',JSON.stringify(this.parameter1));
          //发票内容
          this.Icontent = '*'+this.parameter1.itemName+'*' +this.parameter1.subjectName+ ' ' +'('+ '税率'+ this.parameter1.rate+'%'+')';
          //类型
          this.InvoiceType=this.parameter1.invoiceType;
          this.parameter1.subItemCode = this.parameter1.subjectId
          this.parameter1.subItemName = this.parameter1.subjectName
          console.log(this.parameter1)
          console.log(this.parameter1.expressFee)
          this.Express();
        }else{
          if(JSON.parse(localStorage.getItem('parameter1'))!=undefined && JSON.parse(localStorage.getItem('parameter1'))!="" && JSON.parse(localStorage.getItem('parameter1'))!=null && JSON.parse(localStorage.getItem('parameter1'))!='undefined' && JSON.parse(localStorage.getItem('parameter1'))!='null'){
            this.parameter1 = JSON.parse(localStorage.getItem('parameter1'));
            //发票内容
            this.Icontent = '*'+this.parameter1.itemName+'*' +this.parameter1.subjectName+ ' ' +'('+ '税率'+ this.parameter1.rate+'%'+')';
            this.InvoiceType=this.parameter1.invoiceType;
            this.parameter1.subItemCode = this.parameter1.subjectId
            this.parameter1.subItemName = this.parameter1.subjectName
            console.log(this.parameter1)
            this.Express();
          }
        }
        //订单号
        if (this.$route.params.orderPayNos != undefined && this.$route.params.orderPayNos != "" && this.$route.params.orderPayNos != null && this.$route.params.orderPayNos != 'undefined' && this.$route.params.orderPayNos != 'null') {
          this.parameter1.orderPayNos=[];
          this.parameter1.orderPayNos.push(this.$route.params.orderPayNos) //券名称
          localStorage.setItem('orderPayNos', JSON.stringify(this.parameter1.orderPayNos));
        } else {
          if (JSON.parse(localStorage.getItem('orderPayNos')) != undefined && JSON.parse(localStorage.getItem('orderPayNos')) != "" && JSON.parse(localStorage.getItem('orderPayNos')) != null && JSON.parse(localStorage.getItem('orderPayNos')) != 'undefined' && JSON.parse(localStorage.getItem('orderPayNos')) != 'null') {
            this.parameter1.orderPayNos=[];
            this.parameter1.orderPayNos=JSON.parse(localStorage.getItem('orderPayNos'));
            //this.parameter1.orderPayNos.push(JSON.parse(localStorage.getItem('orderPayNos'))) //券名称
          }
        }
        //图片
        if (this.$route.params.type != undefined && this.$route.params.type != "" && this.$route.params.type != null && this.$route.params.type != 'undefined' && this.$route.params.type != 'null') {
          this.type = this.$route.params.type; //券名称
          localStorage.setItem('type', this.type);
        } else {
          if (localStorage.getItem('type') != undefined && localStorage.getItem('type') != "" && localStorage.getItem('type') != null && localStorage.getItem('type') != 'undefined' && localStorage.getItem('type') != 'null') {
            this.type = localStorage.getItem('type');
          }
        }
        //idAll
        if(this.$route.params.idAll!=undefined && this.$route.params.idAll!="" && this.$route.params.idAll!=null && this.$route.params.idAll!='undefined' && this.$route.params.idAll!='null'){
          this.idAll = this.$route.params.idAll;
          localStorage.setItem('idAll',this.idAll);
        }else{
          if(localStorage.getItem('idAll')!=undefined && localStorage.getItem('idAll')!="" && localStorage.getItem('idAll')!=null && localStorage.getItem('idAll')!='undefined' && localStorage.getItem('idAll')!='null'){
            this.idAll = localStorage.getItem('idAll');
          }
        }
        /*来源*/
        if(this.$route.params.ChoiceIpt!=undefined && this.$route.params.ChoiceIpt!='undefined'){
          this.ChoiceIpt = this.$route.params.ChoiceIpt;
          localStorage.setItem('ChoiceIpt',this.ChoiceIpt);
        }else{
          this.ChoiceIpt = localStorage.getItem('ChoiceIpt');
        }
        //抬头判断来源
        if(this.ChoiceIpt == true || this.ChoiceIpt == 'true'){
          queryMemberInvoiceConfigPage(localStorage.getItem("userID"),this.ttListInfo).then(res=>{
            if(res.data.code==200){
              this.listdata1 = res.data.data.records;
              if(this.listdata1.length>0){
                if(this.InvoiceType== 2 || this.InvoiceType== '2'){
                  this.ChoiceIpt = false;
                  for(let i=0;i<this.listdata1.length;i++){
                    if(this.listdata1[i].isIncrement == '1' || this.listdata1[i].isIncrement == 1){ //判断专普票
                      this.parameter1.buyerName = this.listdata1[i].invoiceTopName
                      this.parameter1.buyerNumber = this.listdata1[i].orgTaxNo
                      this.parameter1.buyerAddr = this.listdata1[i].increaseAddress
                      this.parameter1.buyerId = this.listdata1[i].id
                      this.parameter1.buyerBankAccount = this.listdata1[i].increaseBankSubbranch
                      this.Special = true
                      this.ChoiceIpt = false
                      if(this.listdata1[i].isIncrement == 1 || this.listdata1[i].isIncrement == '1'){
                        this.Special = true;
                      }else if(this.listdata1[i].isIncrement == 0 || this.listdata1[i].isIncrement == '0'){
                        this.Special = false;
                      }
                      if(this.listdata1[i].configType == 1 || this.listdata1[i].configType == '1'){
                        this.configT = true;
                        this.qY = true
                      }else if(this.listdata1[i].configType == 2 || this.listdata1[i].configType == '2'){
                        this.configT = false;
                        this.qY = false
                      }
                      break;
                    }else {
                      if(this.listdata.ttName == '' || this.listdata.ttName == null ||this.listdata.ttName == undefined){
                        this.ChoiceIpt = true
                        this.Special = false
                      }else {
                        this.ChoiceIpt = false
                        this.Special = true
                      }
                    }
                  }
                }else if(this.InvoiceType== 1 || this.InvoiceType== '1' || this.InvoiceType== 3 || this.InvoiceType== '3'){
                  this.Special = false
                  if(this.listdata1[0].isIncrement == 1 || this.listdata1[0].isIncrement == '1'){
                    this.Special = true;
                  }else if(this.listdata1[0].isIncrement == 0 || this.listdata1[0].isIncrement == '0'){
                    this.Special = false;
                  }
                  if(this.listdata1[0].configType == 1 || this.listdata1[0].configType == '1'){
                    this.configT = true;
                    this.qY = true
                  }else if(this.listdata1[0].configType == 2 || this.listdata1[0].configType == '2'){
                    this.configT = false;
                    this.qY = false
                  }
                  if(this.listdata1[0].isDefault==1 || this.listdata1[0].isDefault=='1'){  //有默认就显示
                    this.parameter1.buyerName  = this.listdata1[0].invoiceTopName
                    this.parameter1.buyerNumber =  this.listdata1[0].orgTaxNo
                    this.parameter1.buyerAddr = this.listdata1[0].increaseAddress
                    this.parameter1.buyerId = this.listdata1[0].id
                    this.parameter1.buyerBankAccount = this.listdata1[0].increaseBankSubbranch
                    this.ChoiceIpt = false;
                  } else {
                    this.ChoiceIpt = true;
                  }
                }
              }else {
                this.Special = true
              }
            }else{
              this.ChoiceKong = true;
              this.ChoiceIpt = true;
            }
          },res=>{

          })
          this.PaperLeft = true;
        }else if(this.ChoiceIpt == false || this.ChoiceIpt == 'false'){
          this.ChoiceIpt = false;
          //综合抬头信息
          if(this.$route.params.ttList!=undefined && this.$route.params.ttList!="" && this.$route.params.ttList!=null && this.$route.params.ttList!='undefined' && this.$route.params.ttList!='null'){
            this.ttList = JSON.parse(this.$route.params.ttList);
            localStorage.setItem('ttList',this.$route.params.ttList);
            if(this.ttList.configType == 1 || this.ttList.configType == '1'){//企业
                this.configT = true
              this.qY = true
            }else if(this.ttList.configType == 2 || this.ttList.configType == '2'){//企业
              this.configT = false;
              this.qY = false
            }
            if(this.ttList.isIncrement == 1 ||this.ttList.isIncrement == '1'){
                this.Special = true
            }else {
              this.Special = false
            }
          }else{
            if(JSON.parse(localStorage.getItem('ttList'))!=undefined && JSON.parse(localStorage.getItem('ttList'))!="" && JSON.parse(localStorage.getItem('ttList'))!=null && JSON.parse(localStorage.getItem('ttList'))!='undefined' && JSON.parse(localStorage.getItem('ttList'))!='null'){
              this.ttList = JSON.parse(localStorage.getItem('ttList'));
              if(this.ttList.configType == 1 || this.ttList.configType == '1'){//企业
                this.configT = true
              }else if(this.ttList.configType == 0 || this.ttList.configType == '0'){//企业
                this.configT = true
              }
              if(this.ttList.isIncrement == 1 ||this.ttList.isIncrement == '1'){
                this.Special = true
              }else {
                this.Special = false
              }
            }
          }
          this.parameter1.buyerName = this.ttList.invoiceTopName
          this.parameter1.buyerNumber = this.ttList.orgTaxNo
          this.parameter1.buyerAddr = this.ttList.increaseAddress
          this.parameter1.buyerId = this.ttList.id
          this.parameter1.buyerBankAccount = this.ttList.increaseBankSubbranch
        }
        //地址来源  addressM
        if(this.$route.params.addressM!=undefined && this.$route.params.addressM!='undefined'){
          this.addressM = this.$route.params.addressM;
          localStorage.setItem('addressM',this.addressM);
        }else{
          this.addressM = localStorage.getItem('addressM');
        }
        //地址显示
        if(this.addressM == true || this.addressM == 'true'){
          queryShippingAddressPage(this.accessToken).then(res =>{
            if(res.data.code == 200){
              if(res.data.data.records != null && res.data.data.records.length>0 ){
                this.addressList = res.data.data.records[0];
                if(this.addressList.isDefault == 1 || this.addressList.isDefault == '1'){
                  this.paperKong = false;
                  if(this.InvoiceType!= 3 || this.InvoiceType!= '3'){
                    this.PaperDz = false;
                    this.PaperLeft = false;
                  }
                  this.addName = this.addressList.shippingName;
                  this.addTel = this.addressList.shippingMobile;
                  this.addressDz = this.addressList.provinceCode + ' '+this.addressList.cityName+' '+this.addressList.areaName+' '+this.addressList.address;
              }
            }else{
              this.paperKong = true;
            }
          }else{
              this.paperKong = true;
            }
          },res =>{
            this.PaperDz = true;
            this.paperKong = true;
          })
        }else if(this.addressM != false || this.addressM != 'false'){
          this.paperKong = false;
          this.PaperLeft = false;
          this.PaperDz = false;
          //邮寄地址姓名
          if(this.$route.params.addName!=undefined && this.$route.params.addName!="" && this.$route.params.addName!=null && this.$route.params.addName!='undefined' && this.$route.params.addName!='null'){
            this.addName = this.$route.params.addName;
            localStorage.setItem('addName',this.addName);
          }else{
            if(localStorage.getItem('addName')!=undefined && localStorage.getItem('addName')!="" && localStorage.getItem('addName')!=null && localStorage.getItem('addName')!='undefined' && localStorage.getItem('addName')!='null'){
              this.addName = localStorage.getItem('addName');
            }
          }
          //邮寄地址手机号
          if(this.$route.params.addTel!=undefined && this.$route.params.addTel!="" && this.$route.params.addTel!=null && this.$route.params.addTel!='undefined' && this.$route.params.addTel!='null'){
            this.addTel = this.$route.params.addTel;
            localStorage.setItem('addTel',this.addTel);
          }else{
            if(localStorage.getItem('addTel')!=undefined && localStorage.getItem('addTel')!="" && localStorage.getItem('addTel')!=null && localStorage.getItem('addTel')!='undefined' && localStorage.getItem('addTel')!='null'){
              this.addTel = localStorage.getItem('addTel');
            }
          }
          //邮寄地址详情
          if(this.$route.params.addressDz!=undefined && this.$route.params.addressDz!="" && this.$route.params.addressDz!=null && this.$route.params.addressDz!='undefined' && this.$route.params.addressDz!='null'){
            this.addressDz = this.$route.params.addressDz;
            localStorage.setItem('addressDz',this.addressDz);
          }else{
            if(localStorage.getItem('addressDz')!=undefined && localStorage.getItem('addressDz')!="" && localStorage.getItem('addressDz')!=null && localStorage.getItem('addressDz')!='undefined' && localStorage.getItem('addressDz')!='null'){
              this.addressDz = localStorage.getItem('addressDz');
            }
          }
        }
      },
      Express(){
        if(this.InvoiceType == 1){  //电子
          this.PaperDz = false;
          this.publiceBtn()
        }else if(this.InvoiceType == 2){
          this.PaperDz = true;
          this.publiceBtn()
        }else if(this.InvoiceType == 3){
          this.PaperDz = true;
          this.publiceBtn()
        }
      },
      choiceI(){
        if(this.InvoiceType== 2 || this.InvoiceType== '2'){
          this.typeP = '专票'
        }else {
          this.typeP = '普票'
        }
        localStorage.setItem('formSouS', 'drawABill');
        this.$router.push({
          name:"invoiceTT",
          params:{
            drawABill:"drawABill",
            type:this.typeP
          }
        });
      },
      /*选择邮寄地址*/
      mladdress(){
        this.$router.push({
          name:"addressManage",
          params:{
            drawABill:"drawABill",
          }
        });
      },
      //按钮高亮色校验
      publiceBtn(){   //如果发票抬头、收获地址有数据按钮为可点击状态
        if(this.InvoiceType == 3 || this.InvoiceType == '3'){  //电子发票类型下的点击
          if(this.drawTel !='' && this.drawEmail != ''){
            if(this.drawTel.replace(/[" "]/g, "").length == 11 && this.drawEmail.length >0){
              this.btnColor = "op-1";
            }else{
              this.btnColor = 'op-3';
            }
          }else {
            this.btnColor = "op-3";
          }
        }else if(this.InvoiceType == 2 || this.InvoiceType == 1 || this.InvoiceType == '2' || this.InvoiceType == '1'){ //纸质发票类型下的
          if(this.addressDz != '' && this.addressDz != undefined && this.addressDz != null && this.addressDz !='undefined' ){  //如果地址有数据
            this.btnColor = "op-1";
          }else{
            this.btnColor = "op-3";
          }
        }
      },
      //公共input校验
      publiceKong(name,key){
        if(key == ""){
          this.error_prompt="tel-message";
          this.content = "请填写"+name;
        }
      },
      //页面失焦校验
      jySYS(name,key){
        this.publiceKong(name,key);
      },
      //跳转订单页面
      Submission(){
        if(this.btnColor == "op-1") { //保存按钮为亮色可点击时
          var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if(this.InvoiceType == 3 || this.InvoiceType == '3'){
            this.parameter1.mailBox = this.drawEmail;
            this.parameter1.receivingPhone = this.drawTel;
            this.parameter1.typeId = 3
            this.parameter1.typeName = '电子发票'
          }else if(this.InvoiceType != 3 || this.InvoiceType != '3'){
            if(this.InvoiceType == 1 || this.InvoiceType == '1'){
              this.parameter1.typeId = 1
              this.parameter1.typeName = '纸质普票'
            }else if(this.InvoiceType == 2 || this.InvoiceType == '2'){
              this.parameter1.typeId = 2
              this.parameter1.typeName = '纸质专票'
            }
            this.parameter1.mailingAddress = this.addressDz;
            this.parameter1.consignee = this.addName;
            this.parameter1.receivingPhone = this.addTel;
          }
          if(this.InvoiceType == 3 || this.InvoiceType == '3'){
            if(!regEmail.test(this.drawEmail)){
              this.error_prompt = "tel-message";
              this.content = "邮箱格式不正确";
            }else {
              //预开票接口
              addInvoiceApply(this.accessToken,this.parameter1).then(res =>{
                  console.log(111111)
                if(res.data.code == 200){
                  this.parameter = res.data.data;
                  var yApplyId = res.data.data.id;
                  this.$router.push({
                    name:"mOrder",
                    params:{
                      applyId:this.idAll,
                      type:this.type,
                      yApplyId:yApplyId,
                      aa:false,//来源
                    }
                  });
                }else{
                  this.error_prompt = "tel-message";
                  this.content = res.data.msg;
                }
              },res =>{
                this.error_prompt = "tel-message";
                this.content = res.data.msg;
              })
            }
          }else{
            //预开票接口
            addInvoiceApply(this.accessToken,this.parameter1).then(res =>{
              if(res.data.code == 200){
                console.log(111111)
                this.parameter = res.data.data;
                var yApplyId = res.data.data.id;
                this.$router.push({
                  name:"mOrder",
                  params:{
                    applyId:this.idAll,
                    type:this.type,
                    yApplyId:yApplyId,
                    aa:false,//来源
                  }
                });
              }else{
                this.error_prompt = "tel-message";
                this.content = res.data.msg;
              }
            },res =>{
              this.error_prompt = "tel-message";
              this.content = res.data.msg;
            })
          }
        }else {
          this.error_prompt="tel-message";
          this.content = "请将页面信息填写完整";
        }
      },

    },
    created(){
      this.accessToken = localStorage.getItem("userID");
      queryFreightAmount(this.accessToken).then(res => {
        if (res.data.code == 200) {
          this.invoiceAmountMax = res.data.data.invoiceAmountMax/1000
          console.log(this.invoiceAmountMax)
          this.init();
        } else {
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        }
      }, res => {
        this.error_prompt = "tel-message";
        this.content = res.data.msg;
      });
      this.publiceBtn();
    },
    watch:{
      invoiceTitle(){  //抬头
        if(this.invoiceTitle !=''){  //如果抬头有数据
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
      },
      addressDz(){
        if(this.addressDz != ''){  //如果地址有数据
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
      },
      drawTel(){
        if(this.drawTel !=''){  //如果手机号有数据
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
      },
      drawEmail(){
        if(this.drawEmail !=''){  //如果地址有数据
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.adTimer,2000);
      })
    }
  }
</script>
<style>
  .DrawABill-width{
    width:92%;
  }
  .Draw-pad{
    padding: 1rem 0;
  }
  .DrawABill-pad{
    padding: 0.4rem 4rem;
    border: 1px solid #3B92EF;
    color: #3B92EF;
  }
  .DrawABill-pad1{
    padding: 0.4rem 4rem;
    border: 1px solid #BBB7B7;
    color: #BBB7B7;
  }
  .DrawABill-pad-w{
    width: 1.41666667rem;
    padding: 0.3rem 0 0 0.5rem;
  }
  .Draw-main-108{
    padding: 1rem 1.083rem;
  }
  .DB-pad-icon{
    background:url("../../assets/image/c/icon_fast.png")no-repeat 101% -8%;
    background-size: 2.5rem;
  }
  .Draw-qy-icon{
    width: 1.5rem;
    padding-top: 0.3rem;
    padding-right: 0.3666667rem;
  }
  @media screen and (max-width:321px){
    .DrawABill-pad{
      padding: 0.4rem 3.4rem;
    }
    .DrawABill-pad1{
      padding: 0.4rem 3.4rem;
    }
  }
</style>

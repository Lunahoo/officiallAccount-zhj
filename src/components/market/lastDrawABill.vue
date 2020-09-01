<template>
    <div class="DrawABill width height bg-f6">
      <!--同时可以开设电子发票和纸质发票-->
      <div class="mG-top fl">
        <div v-show="draSec" class="bg-ff fl width font-125 bd-btm">
          <div class="four_father fl DrawABill-width Draw-pad">
            <div class="fl ">发票类型</div>
            <img class="fl" style="width: 1.41666667rem;padding: 0.3rem 0 0 0.5rem;" src="../../assets/img/icon_details@2x.png"/>
          </div>
          <div class="four_father fl DrawABill-width">
            <div class="fl cont bRadius-3 DB-pad-icon DrawABill-pad" v-if="elecInvoice">
              <p class="font-133">电子发票</p>
              <p class="font-108">免费</p>
            </div>
            <div class="fl font-a39 cont bRadius-3 DrawABill-pad" v-else="elecInvoice">
              <p class="font-133">纸质发票</p>
              <p class="font-108">快递 ￥{{postage|money}}</p>
            </div>
            <div class="font-108 font-7b7 fl pd-tp1 pd-bt">电子发票与纸质发票具有同等法律效力，可支持报销入账，推荐使用电子发票。</div>
          </div>
        </div>
        <div class="bg-ff fl width font-125">
          <div class="Draw-main-108 fl bd-btm DrawABill-width" >
            <div class="fl ">开票种类</div>
            <!--<img class="fl" style="width: 1.41666667rem;padding: 0.3rem 0 0 0.5rem;" src="../../assets/img/icon_details@2x.png"/>-->
            <div class="fr" v-if="invoiceTypeJudge== 3||invoiceTypeJudge== 1">普票</div>
            <div class="fr" v-if="invoiceTypeJudge== 2">专票</div>
          </div>


          <div class="Draw-main-108 fl bd-btm DrawABill-width" >
            <div class="fl ">发票金额</div>
            <img v-show="!draSec" class="fl" style="width: 1.41666667rem;padding: 0.3rem 0 0 0.5rem;" src="../../assets/img/icon_details@2x.png"/>
            <div class="fr ">￥ {{drawMoney|money}}</div>
          </div>
      <!--选择发票抬头-->
          <div class="Draw-main-108 fl bd-btm DrawABill-width" v-if="ChoiceIpt" @click="choiceI">
            <div class="fl">发票抬头</div>
            <div class="fr mP-right cont-r">
              <div class="cont-r font-7b7">请选择发票抬头</div>
            </div>
          </div>
          <div class="Draw-main-108 fl bd-btm DrawABill-width" v-if="!ChoiceIpt" @click="choiceI">
            <div > <!--v-show="!ChoiceKong"-->
              <div class="fl" style="padding-top: 0.8rem;">发票抬头</div>
              <div class="fr mP-right cont-r">
                <div @blur="jySYS('公司抬头',invoiceTitle)">{{listdata.ttName}}</div>
                <div class="font-108 font-7b7 fr">
                  <div class="fl Draw-qy-icon" ><img src="../../assets/image/c/icon_ordinary@2x.png" /></div>
                  <div class="fl Draw-qy-icon" v-show="Special"><img src="../../assets/image/c/icon_special@2x.png" /></div>
                  <div class="fl" v-show="configT">[企业]</div>
                  <div class="fl" v-show="!configT">[个人]</div>
                  <div class="fl">{{listdata.orgTaxNo}}</div>
                </div>
              </div>
            </div>
            <!--<div v-show="ChoiceKong">-->
              <!--<div class="fl">发票抬头</div>-->
              <!--<div class="fr mP-right cont-r font-7b7">-->
                <!--<div>请选择发票抬头</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
      <!--选择发票抬头结束  value="100"-->
          <div class="Draw-main-108 fl bd-btm DrawABill-width">
            <div class="fl ">发票内容</div>
            <div class="fr cont-r " style="width: 73%;">
              <div class="cont-r font-125 width one-txt-cut" v-text="Icontent" ></div>
            </div>
          </div>
          <div class="Draw-main-108 fl bd-btm DrawABill-width">
            <div class="fl">{{telOrMail}}</div>
            <div class="fr cont-r">
              <input type="text" @blur="jySYS(telOrMail,drawTel)" v-if="elecInvoice" v-model="drawTel" maxlength="11" class="cont-r" placeholder="请填写手机号" style="margin-right:1rem"/>
              <div v-else="elecInvoice">快递 ￥{{postage|money}}</div>
            </div>
          </div>

          <div class="Draw-main-108 fl DrawABill-width" v-if="elecInvoice">
            <div class="fl" >电子邮箱</div>
            <div class="fr cont-r" style="width:65%;">
              <input type="text" @blur="jySYS('电子邮箱',drawEmail)" v-if="elecInvoice" v-model="drawEmail"  class="cont-r width" placeholder="用于接收电子发票"  />
            </div>
          </div>
          <div v-if="!elecInvoice">
          <div class="Draw-main-108 fl DrawABill-width" v-if="addressKong">
            <div class="fl">邮寄地址</div>
            <div class="fr mP-right cont-r font-7b7" @click="mladdress">
              <div>请选择邮寄地址</div>
            </div>
          </div>

          <div class="Draw-main-108 fl DrawABill-width" v-if="addressNotKong">
            <div class="fl">
              <p  class="height-4083">邮寄地址</p>
            </div>
            <div>
              <div class="fr mP-right cont-r">
                <div class="fr" @click="mladdress">
                  <div class="fr width" @click="mladdress">{{this.addName}} {{this.addTel}}</div>
                  <div class="font-108 fr width" @blur="jySYS('收获地址',addressDz)">{{this.addressDz}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="Draw-main-108 fl DrawABill-width font-ipt font-167" v-if="false">
        <div class="fl ">开票规则</div>
        <div class="fr">发票帮助</div>
      </div>
      <div @click="Submission" :class="btnColor" class="font-col-b bg-FA4 fl four_father DrawABill-width cont four_left bRadius-3 font-133" style="bottom: 0.5rem;margin-top:2rem;">提交</div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script>
  import {queryMemberInvoiceConfigPage,queryShippingAddressPage,openInvoiceByApplyInvoice} from "@/api/aloneC/cInterface"/*发票抬头、收获地址、后开票申请订单添加*/
  import {generateRequestUrl} from "@/api/user/headService"
  export default {
    data () {
      return {
        addressList:[],
        drawTel:'',//手机号
        btnColor:"op-3", /*按钮颜色*/
        telOrMail:"",
        drawEmail:'',//邮箱
        postage:"",   //邮费
        error_prompt:"",
        content:"",
        Special:true,/*专票图标*/
        chooseAdr:"请选择邮寄地址",
        elecInvoice:true,
        addressKong:true,
        addressNotKong:false,
        configT:false,/*显示个人还是企业*/
        ChoiceIpt:true,/*显示input或者发票抬头样式*/
        draSec:true,/*是否可以同时开具电子发票和纸质发票*/
        ChoiceKong:true,/*发票抬头未输入时*/
        Icontent:'',/*发票内容*/
        drawMoney:'',/*金额*/
        invoiceTypeJudge:'',/*发票类型*/
        addName:'',//地址姓名
        addTel:'',//地址手机号
        addressDz:'',//地址详情
        listdata:{
          ttName:'',//发票抬头公司名称
          zInvoice:'',//是否支持专票
          configType:'',//个人还是企业
          orgTaxNo:'',//税号
        },//发票抬头
        dataInfo:{},      //当前页面数据保存
        quotaInfo:{},     //开票申请参数
        parameterList:{
          scene:"express",
          amount:100,   //支付金额
          cost:100,        //
          asycType:'',
          bizid:"",
          desc:"后开票邮费订单",    //暂时没有，让前端自己定义
          otherinfo:"后开票邮费订单",    //暂时没有，让前端自己定义
          isVerify:"0",   //是否需要验证 短信验证 0 不验证 1 验证
          companyId:''
        },
        parameter:{},
      }
    },
    created(){
      if(this.$route.params.backKey!=""&&this.$route.params.backKey!=null&&this.$route.params.backKey!=undefined){
        this.dataInfo = JSON.parse(localStorage.getItem("dataInfos"));
        this.ChoiceIpt = this.dataInfo.ChoiceIpt;     //发票抬头的有值没值
        this.invoiceTypeJudge = this.dataInfo.invoiceTypeJudge;   //开票类型
        this.drawMoney = this.dataInfo.drawMoney;     //发票金额
        this.postage = localStorage.getItem('postage');    //快递费
        this.reset();
          if(this.$route.params.backKey=="invoiceTT"){ //选择抬头
            queryMemberInvoiceConfigPage(localStorage.getItem("userID")).then(res=>{
              if(res.data.code==200){
                 if(res.data.data.records.length>0){
                   //抬头页面选择的抬头信息
                   let ttList={};
                   ttList=this.$route.params.ttList;
                   ttList=JSON.parse(ttList);
                   /*开票申请接口抬头参数*/
                   this.parameter.buyerId =  ttList.id;    //购买方id
                   this.parameter.buyerName =  ttList.invoiceTopName;    //购买方名称
                   this.parameter.buyerAddr =  ttList.increaseAddress;    //购买方地址
                   this.parameter.buyerNumber =  ttList.orgTaxNo;    //购买方纳税人识别码
                   this.parameter.buyerBankAccount =  ttList.increaseBankSubbranch;    //购买方开户行
                   let  PIA_list= JSON.parse(localStorage.getItem("openInvoiceByApplyInvoiceInfo"));
                   this.parameter.rate = PIA_list.rate;    //费率
                   this.parameter.vendorId = PIA_list.vendorId;
                   this.parameter.vendorName = PIA_list.vendorName;
                   //发票抬头
                   this.ChoiceIpt=false;
                   this.listdata.ttName = ttList.invoiceTopName;     //抬头
                   if(ttList.configType==1){
                     this.configT=true;  //企业或者个人
                     this.listdata.orgTaxNo = ttList.orgTaxNo;   //税号
                   }else{
                     this.configT=false;
                     this.listdata.orgTaxNo = '';
                   }
                   if(ttList.isIncrement==1){
                     this.Special=true; //专票显示与否
                   }else{
                     this.Special=false;
                   }
                 }else{
                   this.ChoiceIpt = true;
                 }
                this.publiceBtnLight();
              }else{
                this.publiceBtnLight();
                this.ChoiceIpt = true;
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            })

          }else if(this.$route.params.backKey=="addressManage"){
            let addrList={};
            addrList=this.$route.params.addressLists;
            addrList=JSON.parse(addrList);
            this.addressKong = false;
            this.addressNotKong = true;
            this.addName = addrList.shippingName;
            this.addTel = addrList.shippingMobile;
            this.addressDz = addrList.provinceCode+ ' ' + addrList.cityName+ ' ' + addrList.areaName+ ' ' + addrList.address;
            /*开票申请接口抬头参数*/
            let ttInfo = JSON.parse(localStorage.getItem("openInvoiceByApplyInvoiceInfo"));
            if(ttInfo!=''&&ttInfo!=null&&ttInfo!=undefined){
              this.parameter.buyerId =  ttInfo.buyerId;    //购买方id
              this.parameter.buyerName =  ttInfo.buyerName;    //购买方名称
              this.parameter.buyerAddr =  ttInfo.buyerAddr;    //购买方地址
              this.parameter.buyerNumber =  ttInfo.buyerNumber;    //购买方纳税人识别码
              this.parameter.buyerBankAccount =  ttInfo.buyerBankAccount;    //购买方开户行
              this.parameter.rate = ttInfo.rate;    //费率
              this.parameter.vendorId = ttInfo.vendorId;
              this.parameter.vendorName = ttInfo.vendorName;
            }
            this.publiceBtnLight();
          }
      }else{
        this.init(this.parameter);
      }
    },
    methods: {
      adTimer: function () {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      getTT(index,dataS){  //获取抬头数据公用
        this.ChoiceIpt = false;
        this.listdata.ttName  = dataS.records[index].invoiceTopName;
        if(dataS.records[index].configType==1){ //企业
          this.configT = true;
          this.Special = true;  //专票的显示与否
          this.listdata.orgTaxNo =  dataS.records[index].orgTaxNo;
        }else{
          this.configT = false;
          this.Special = false;  //专票的显示与否
        }
        this.parameter.buyerId =  dataS.records[index].id;    //购买方id
        this.parameter.buyerName =  dataS.records[index].invoiceTopName;    //购买方名称
        this.parameter.buyerAddr =  dataS.records[index].increaseAddress;    //购买方地址
        this.parameter.buyerNumber =  dataS.records[index].orgTaxNo;    //购买方纳税人识别码
        this.parameter.buyerBankAccount =  dataS.records[index].increaseBankSubbranch;    //购买方开户行
        localStorage.setItem("openInvoiceByApplyInvoiceInfo",JSON.stringify(this.parameter)); //开票申请参数
      },
      init(){/*发票内容*/
        this.accessToken = localStorage.getItem("userID");
        //获取发票类型
        let currencyQopenQInfo = JSON.parse(localStorage.getItem("currencyQopenQInfo"));
        console.log(currencyQopenQInfo);
        this.invoiceTypeJudge = currencyQopenQInfo.invoiceType;
        this.parameter.rate = currencyQopenQInfo.rate;   //费率
        this.parameter.vendorId = currencyQopenQInfo.vendorId;   //后台要传的值
        this.parameter.vendorName = currencyQopenQInfo.vendorName;   //后台要传的值
        if(currencyQopenQInfo.invoiceType==1||currencyQopenQInfo.invoiceType==2){
          this.elecInvoice = false;
          this.telOrMail="邮寄";
        }else{
          this.addressKong = false;
          this.addressNotKong = false;
          this.telOrMail="手机号";
          this.elecInvoice = true;
          this.drawTel = localStorage.getItem("loginTell");
        }
        //获取发票内容
        this.Icontent = localStorage.getItem("subjectDes");

        //发票金额
        if(this.$route.params.openInvoiceAmount!=undefined && this.$route.params.openInvoiceAmount!="" && this.$route.params.openInvoiceAmount!=null && this.$route.params.openInvoiceAmount!='undefined' && this.$route.params.openInvoiceAmount!='null'){
            this.drawMoney = this.$route.params.openInvoiceAmount;
            localStorage.setItem('lastDrawMoney',this.drawMoney)
            //邮费
            this.postage = this.$route.params.sendMoney;
          localStorage.setItem('postage',this.postage);
        }else{
            //金额
            let lastDrawMoney = localStorage.getItem('lastDrawMoney');
            if(lastDrawMoney!=null&&lastDrawMoney!=''&&lastDrawMoney!=undefined){
              this.drawMoney = lastDrawMoney;
            }
          //邮费
          let lastDrawPostage = localStorage.getItem('postage');
          if(lastDrawPostage!=null&&lastDrawPostage!=''&&lastDrawPostage!=undefined&&lastDrawPostage!='undefined'&&lastDrawPostage!='null'){
            this.postage = lastDrawPostage;
          }
        }
          //发票抬头
        if(this.$route.params.formPage!=undefined&&this.$route.params.formPage!=undefined&&this.$route.params.formPage!=undefined&&this.$route.params.formPage=='UCO'){
          queryMemberInvoiceConfigPage(localStorage.getItem("userID")).then(res=>{
            if(res.data.code==200){
              if(res.data.data.records.length>0){
                let dataSave = res.data.data;
                if(res.data.data.records[0].isDefault==1){
                  if(this.invoiceTypeJudge ==2){//如果是开专票
                    let getTTIndex;   //获取当前要抬头需要的下标
                    if(res.data.data.records[0].isIncrement ==1){  //判断默认抬头是否支持专票
                      getTTIndex = 0;
                      this.getTT(getTTIndex,dataSave);
                    }else{//默认抬头不支持专票
                      for(let i=1;i<res.data.data.records.length;i++){//找寻新的支持专票的抬头
                        if(res.data.data.records[i].isIncrement==1){
                          getTTIndex = i;
                          break;
                        }
                      }
                      if(getTTIndex!=''&&getTTIndex!=null&getTTIndex!=undefined){
                        this.getTT(getTTIndex,dataSave);
                      }else{
                        this.ChoiceIpt = true;
                      }
                    }
                  }else{  //开普票
                    this.getTT(0,dataSave);
                  }
                }else{  //查询出没有默认发票抬头
                  this.ChoiceIpt = true;
                  this.error_prompt="tel-message";
                  this.content = "暂无默认抬头，请手动选择";
                }
                this.publiceBtnLight();
              }else{
                this.ChoiceIpt = true;
              }
            }else{
              this.ChoiceIpt = true;
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res=>{
            this.ChoiceIpt = true;
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else{
          queryMemberInvoiceConfigPage(localStorage.getItem("userID")).then(res=>{
             if(res.data.code==200){
               if(res.data.data.records.length>0){
             //   alert(this.invoiceTypeJudge);
                if(this.invoiceTypeJudge==2){//专票
                  let getTTIndex; //保存专票下标
                  let isDel; //之前保存的是否删除
                  for(let i=1;i<res.data.data.records.length;i++){//找寻新的支持专票的抬头
                    if(res.data.data.records[i].isIncrement==1){
                      getTTIndex = i;
                      break;
                    }
                  }
                  if(getTTIndex!=''&&getTTIndex!=null&getTTIndex!=undefined){
                    let  ttDataS = JSON.parse(localStorage.getItem("dataInfos"));
                    for(let i=1;i<res.data.data.records.length;i++){//找寻新的支持专票的抬头
                      if(ttDataS.ttName == res.data.data.records[i].invoiceTopName){//如果之前保存的抬头没有被删除
                        isDel = true;
                        if(ttDataS!=null&&ttDataS!=''&&ttDataS!=undefined){
                          this.ChoiceIpt = ttDataS.ChoiceIpt;     //发票抬头的有值没值
                          if(this.ChoiceIpt == false){ //发票抬头有值
                            this.listdata.ttName = ttDataS.ttName;     //抬头
                            if(ttDataS.configT==true){ //企业
                              this.configT=true;  //企业或者个人
                              this.listdata.orgTaxNo = ttDataS.orgTaxNo;   //税号
                            }else{
                              this.configT=false;
                            }
                            this.Special= ttDataS.Special; //专票显示与否
                          }
                        }
                      }else{//如果之前保存的抬头被删除了
                        isDel = false;
                        this.getTT(getTTIndex,res.data.data);
                      }
                    }
                  //  this.getTT(getTTIndex,res.data.data);
                  }else{
                    this.ChoiceIpt = true;
                  }
                }else{//普票
                  let  ttDataS = JSON.parse(localStorage.getItem("dataInfos"));
                  if(ttDataS!=null&&ttDataS!=''&&ttDataS!=undefined){
                    this.ChoiceIpt = ttDataS.ChoiceIpt;     //发票抬头的有值没值
                    if(this.ChoiceIpt == false){ //发票抬头有值
                      this.listdata.ttName = ttDataS.ttName;     //抬头
                      if(ttDataS.configT==true){ //企业
                        this.configT=true;  //企业或者个人
                        this.listdata.orgTaxNo = ttDataS.orgTaxNo;   //税号
                      }else{
                        this.configT=false;
                      }
                      this.Special= ttDataS.Special; //专票显示与否
                    }
                  }
                }
               }else{ //当发票抬头被删除返回的时候
                 this.ChoiceIpt = true;
               }
             }else{
               this.ChoiceIpt = true;
               this.error_prompt="tel-message";
               this.content = res.data.msg;
             }
          },res=>{
            this.ChoiceIpt = true;
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })


          /*开票申请接口抬头参数*/
          let ttInfo = JSON.parse(localStorage.getItem("openInvoiceByApplyInvoiceInfo"));
          if(ttInfo!=''&&ttInfo!=null&&ttInfo!=undefined){
            this.parameter.buyerId =  ttInfo.buyerId;    //购买方id
            this.parameter.buyerName =  ttInfo.buyerName;    //购买方名称
            this.parameter.buyerAddr =  ttInfo.buyerAddr;    //购买方地址
            this.parameter.buyerNumber =  ttInfo.buyerNumber;    //购买方纳税人识别码
            this.parameter.buyerBankAccount =  ttInfo.buyerBankAccount;    //购买方开户行
            this.parameter.rate = ttInfo.rate;    //费率
            this.parameter.vendorId = ttInfo.vendorId;
            this.parameter.vendorName = ttInfo.vendorName;
          }
          this.publiceBtnLight();
        }

        //发票地址
        if(this.$route.params.formPage!=undefined&&this.$route.params.formPage!=undefined&&this.$route.params.formPage!=undefined&&this.$route.params.formPage=='UCO'){
          if(this.elecInvoice==false){  //纸票
            this.addressKong = true;
            queryShippingAddressPage(localStorage.getItem("userID")).then(res=>{
              if(res.data.code==200){
                if(res.data.data.records.length>0){
                  if(res.data.data.records[0].isDefault==1){
                    this.addressKong = false;
                    this.addressNotKong = true;
                    this.addName = res.data.data.records[0].shippingName; //姓名
                    this.addTel = res.data.data.records[0].shippingMobile; //手机号
                    this.addressDz = res.data.data.records[0].provinceCode+" "+res.data.data.records[0].cityName+" "+res.data.data.records[0].areaName+" "+res.data.data.records[0].address; //收货地址
                  }else{
                    this.error_prompt="tel-message";
                    this.content = "暂无默认抬头，请手动选择";
                  }
                  this.publiceBtnLight();
                }else{
                  this.addressKong = true;
                }
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            },res=>{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            })
          }
        }else{
            //this.elecInvoice==false
          if(this.elecInvoice==false){//纸票
            queryShippingAddressPage(localStorage.getItem("userID")).then(res=>{
              if(res.data.code==200){
                if(res.data.data.records.length>0){
                  let  addressDataS = JSON.parse(localStorage.getItem("dataInfos"));
                  if(addressDataS!=null&&addressDataS!=''&&addressDataS!=undefined){
                    this.addressKong = addressDataS.addressKong;//邮寄地址的显示
                    this.addressNotKong = addressDataS.addressNotKong;//邮寄地址的显示
                    this.addName = addressDataS.addName;     //姓名
                    this.addTel = addressDataS.addTel;     //电话
                    this.addressDz = addressDataS.addressDz;     //地址
                  }
                  this.publiceBtnLight();
                }else{
                  this.addressKong = true;
                }
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            },res=>{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            })
          }
        }

        },
      reset(){
        this.elecInvoice = this.dataInfo.elecInvoice;   //电票or普票
        this.drawMoney = this.dataInfo.drawMoney;     //发票金额
        this.Icontent = this.dataInfo.Icontent;     //发票内容
        if(this.ChoiceIpt==false){  //发票抬头有值
          this.listdata.ttName = this.dataInfo.ttName;     //抬头
          this.configT = this.dataInfo.configT;     //企业或者个人
          this.Special = this.dataInfo.Special;     //专票显示与否
          this.listdata.Special = this.dataInfo.Special;     //专票显示与否
          this.listdata.orgTaxNo = this.dataInfo.orgTaxNo;   //税号
        }
        if(this.elecInvoice == true){   //电票
          this.drawTel = this.dataInfo.drawTel;     //手机号
          this.drawEmail = this.dataInfo.drawEmail;     //电子邮箱
          this.telOrMail = "手机号";
        }else{  //纸票
          this.telOrMail = "邮寄";
          this.addressKong = this.dataInfo.addressKong;//邮寄地址的显示
          this.addressNotKong = this.dataInfo.addressNotKong;//邮寄地址的显示
          this.addName = this.dataInfo.addName;     //姓名
          this.addTel = this.dataInfo.addTel;     //电话
          this.addressDz = this.dataInfo.addressDz;     //地址
        }
       this.publiceBtnLight();
      },
      //选择发票抬头
      choiceI(){
        this.saveData();
        let typeP;
        if(this.invoiceTypeJudge==3||this.invoiceTypeJudge==1){
          typeP = '普票';
        }else{
          typeP = '专票';
        }
        localStorage.setItem('formSouS', 'lastDrawABill');
        this.$router.push({
          name:"invoiceTT",
          params:{
              drawABill:"lastDrawABill",
              type:typeP,
          }
        });
      },
      //按钮高亮色校验
      publiceBtnLight(){
        if(this.drawMoney!=""&&this.listdata.ttName!=""&&this.Icontent!=""){
          if(this.elecInvoice == true) {  //此时显示电子发票
            if(this.drawTel != "" && this.drawEmail != ""){
              this.btnColor = "op-1";
            }else{
              this.btnColor = "op-3";
            }
          }else{ //纸票
            if(this.addressDz!= ""){
              this.btnColor = "op-1";
            }else{
              this.btnColor = "op-3";
            }
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
      //提交按钮
      Submission(){
        if(this.btnColor == "op-1") { //保存按钮为亮色可点击时
          let openCS = JSON.parse(localStorage.getItem("openInvoiceData"));
          this.parameter.couponId = openCS.couponId;   //
          this.parameter.couponName = openCS.couponName;
          this.parameter.itemCode = openCS.itemCode;
          this.parameter.itemName = openCS.itemName;
          this.parameter.subItemCode = openCS.subjectId;
          this.parameter.subItemName = openCS.subjectName;
//          this.parameter.receivingPhone = this.drawTel;   //手机号
          this.parameter.mailBox = this.drawEmail;     //邮箱
          this.parameter.consignee = this.addName;     //收件人姓名
          /*this.parameter.receivingPhone = this.addTel;*/     //收件人电话
          this.parameter.mailingAddress = this.addressDz;     //邮寄地址
          this.parameter.buyerNumber = this.listdata.orgTaxNo;   //税号
          this.parameter.typeId = openCS.typeId;
          this.parameter.typeName = openCS.typeName;
          this.parameter.taxIncludedPrice = this.drawMoney/1000;     //含税金额
          if(this.invoiceTypeJudge == 3 || this.invoiceTypeJudge == '3'){
            this.parameter.receivingPhone = this.drawTel;   //手机号
          }else if(this.invoiceTypeJudge != 3 || this.invoiceTypeJudge != '3'){
            this.parameter.receivingPhone = this.addTel;     //收件人电话
          }
          if(this.elecInvoice == true){   //电子发票
            this.parameter.expressFee = '';
          }else{
            this.parameter.expressFee = this.postage/1000;
          }
          //4.10号一期修改，隐藏了订单，把订单id合集收集传给调总部接口
          let bizS = JSON.parse(localStorage.getItem('orderID'));
          this.parameter.orderPayNos = bizS;
          //完
          console.log(this.parameter)
          openInvoiceByApplyInvoice(localStorage.getItem("userID"),this.parameter).then(res=>{  //先进行开票申请
            if(res.data.code==200){
              if(this.elecInvoice==true){//此时显示电子发票直接进开票历史页面
                this.$router.push({name:"mHistory"})
              }else{
                this.parameterList.bizid = res.data.data.id;
                localStorage.setItem("openInvID",res.data.data.id);
                this.parameterList.amount = this.postage/1000;
                this.parameterList.cost = this.postage/1000;
                this.parameterList.asycType = "h5.invoice";
                this.parameterList.companyId = '1107853461363306498';    //券易销id
           //     alert(this.parameterList.bizid)
                generateRequestUrl(localStorage.getItem("userID"),this.parameterList).then(res=>{  //纸质发票调收银台
                  if(res.data.code==200){
                   window.location.href=res.data.data;
                  }else{
                    this.error_prompt="tel-message";
                    this.content = res.data.msg;
                  }
                },res=>{
                  this.error_prompt="tel-message";
                  this.content = res.data.msg;
                })
              }
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })

        }

      },
      //保存页面数据
      saveData(){
        this.dataInfo.elecInvoice = this.elecInvoice;   //电票普票
        this.dataInfo.drawMoney = this.drawMoney;     //发票金额
        this.dataInfo.Icontent = this.Icontent;     //发票内容
        this.dataInfo.ChoiceIpt = this.ChoiceIpt;   //发票抬头的有值没值
        this.dataInfo.invoiceTypeJudge = this.invoiceTypeJudge;   //开票类型
        //发票抬头
        if(this.ChoiceIpt==false){  //发票抬头有值
          this.dataInfo.ttName = this.listdata.ttName; //抬头
          this.dataInfo.configT = this.configT; //企业或者个人
          this.dataInfo.Special = this.Special; //专票显示与否
          this.dataInfo.orgTaxNo = this.listdata.orgTaxNo;   //税号
        }
        if(this.elecInvoice == true){   //电票
          this.dataInfo.drawTel = this.drawTel;     //手机号
          this.dataInfo.drawEmail = this.drawEmail;     //手机号
        }else{  //纸票
          this.dataInfo.addressKong = this.addressKong; //邮寄地址的显示
          this.dataInfo.addressNotKong = this.addressNotKong; //邮寄地址的显示
          this.dataInfo.addName = this.addName;     //姓名
          this.dataInfo.addTel = this.addTel;     //电话
          this.dataInfo.addressDz = this.addressDz;     //地址

        }
        localStorage.setItem("dataInfos",JSON.stringify(this.dataInfo));
        localStorage.setItem("openInvoiceByApplyInvoiceInfo",JSON.stringify(this.parameter)); //开票申请参数储存
      },
      /*选择邮寄地址*/
      mladdress(){
        this.saveData();
        this.$router.push({
          name:"addressManage",
          params:{
            formSource:"lastDrawABill"
          }
        });
      },

      },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.adTimer,2000);
      })
    },
    watch:{
      drawEmail(newValue, oldValue) {  //电子邮件
         if(this.drawEmail!=""){  //邮箱校验
          let regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if(!regEmail.test(this.drawEmail)){
//            this.error_prompt = "tel-message";
//            this.content = "邮箱格式不正确";
          }else{
            this.publiceBtnLight();
          }
        }
       },
      invoiceTitle(){  //抬头
        if(this.invoiceTitle !=''){  //如果抬头有数据
          this.publiceBtnLight();
        }else{
          this.btnColor = "op-3";
        }
      },
      drawTel(){
//        if(this.Harvest !=''){  //如果地址有数据
//          this.publiceBtnLight();
//        }else{
//          this.btnColor = "op-3";
//        }
      }
    }
  }
</script>
<style>
  .DrawABill-width{
    width:93%;
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
    padding-right: 0.666667rem;
  }
  @media screen and (max-width:321px){
    .DrawABill-pad{
      padding: 0.4rem 3.4rem;
    }
    .DrawABill-pad1{
      padding: 0.4rem 3.4rem;
    }
    .Draw-qy-icon{
      padding-right: 0.3rem;
    }
    .Draw-main-108{
      padding: 1rem 0.93rem;
    }
  }
</style>

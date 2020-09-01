<template>
  <div class="add addInvoice bg-f6 width height" >
    <div class="fl width height overflow-s">
      <!--11111-->
      <div class="addInvoice-top addInvoice-main width">
        <p class="addInvoice-main-p addMar font-108 font-ipt">选择发票抬头</p>
        <div class="width four_wrap bg-ff" @click="chooseInvoiceStart('选择发票抬头')">
          <div class="four_father height" >
            <div class="four_left fl font-125" :class="ttName=='请选择'?'font-7b7':'font-2a2a'"  v-text="ttName"></div>
            <img class="fr four_img_right " src="../../assets/img/right.png"/>
          </div>
        </div>
      </div>
      <!--22222-->
      <div class="addInvoice-main">
        <p class="addInvoice-main-p addMar font-ipt font-108">选择发票分类</p>
        <div class="width four_wrap bg-ff" @click="chooseInvoiceStart('选择发票分类')">
          <div class="four_father height" >
            <div class="four_left fl font-125" :class="invoiceTy=='请选择'?'font-7b7':'font-2a2a'" v-text="invoiceTy"></div>
            <img class="fr four_img_right " src="../../assets/img/right.png"/>
          </div>
        </div>
      </div>
      <!--33333-->
      <p class="addInvoice-main-p addMar font-ipt font-108">发票信息</p>
      <div v-if="information" class="fl width">
        <div class="addInvoice-main addInvoice-main-last">
          <div class="fl bg-ff width">
            <div class="width four_wrap bg-ff" >
              <div class="four_father height bd-btm" >
                <div class="four_left fl font-125">发票类型</div>
                <div class="four_typeDiv_right fr cont-r font-125" v-text="addInvoiceType" :class="addInvoiceType=='请选择'?'font-7b7':'font-a39'"></div>
              </div>
            </div>
            <div class="width four_wrap bg-ff" >
              <div class="four_father height bd-btm">
                <div class="four_left fl font-125" >发票代码</div>
                <input type="number" pattern="\d*" v-model="addInvoiceCode" class="four_input_right fr cont-r" maxlength="12" placeholder="请输入" @blur="jyInvoiceCodeLength">
              </div>
            </div>
            <div class="width four_wrap bg-ff" >
              <div class="four_father height bd-btm">
                <div class="four_left fl font-125" >发票号码</div>
                <input type="number" pattern="\d*" v-model="addInvoiceNum" class="four_input_right fr cont-r" maxlength="8" placeholder="请输入" @blur="pubJY('发票号码',addInvoiceNum,8)">
              </div>
            </div>
            <div class="width four_wrap bg-ff" >
              <div class="four_father height bd-btm" :class="openDate" @click="chooseDay">
                <div class="four_left fl font-125">开票日期</div>
                <img class="fr four_img_right " src="../../assets/img/right.png"/>
                <div class="four_div_right fr cont-r font-125" ref="InvoiceDate" :class="openDatasColor" v-text="openDatas"></div>
                <!--<div class="four_div_right fr cont-r font-125" ref="InvoiceDate" :class="addOpenDataSj.tipsContent=='只能报销一年内的发票'||addOpenDataSj.tipsContent=='不能查验当日及以后日期发票'?'font-22d':'font-2a2a'" v-if="openDatas!='请选择'" v-text="openDatas"></div>-->
              </div>
            </div>
            <div class="width four_wrap bg-ff" >
              <div class="four_father height" :class="addInvoiceType!='增值税专票'&&addInvoiceType!='卷式发票'?'bd-btm':''">
                <div class="four_left fl font-125" >不含税金额</div>
                <input v-model="addMoney"  class="four_input_right fr cont-r" placeholder="请输入" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" v-on:keyup="onlyNumber(addMoney)"  step="0.01"
                       @keydown="handleInput2" maxlength="10" >
              </div>
            </div>

            <!--增值税专票/卷式发票没有校验码-->
            <div v-if="addInvoiceType!='增值税专票'&&addInvoiceType!='卷式发票'" class="width four_wrap bg-ff">
              <div class="four_father height ">
                <div class="four_left fl font-125" >校验码</div>
                <input type="number" pattern="\d*" v-model="addJYM" class="four_input_right fr cont-r" placeholder="请输入" maxlength="6" @blur="pubJY('校验码',addJYM,6)">
              </div>
            </div>

          </div>
        </div>

        <!--44444-->
        <div class="" v-if="addWrapcenter">
          <div class="width">
            <div class="fl font-7b7 font-167" @click="examplePhoto">
              <img src="../../assets/img/fill/icon_sample@2x.png" class="fl add-icon-s"/>
              <span class="fl add-icon-pad" style="">示例图片</span>
            </div>
            <div class="fr font-7b7 font-167">
              <a href="http://sao315.com/w/api/saoyisao?redirect_uri=http%3a%2f%2fzhihuijia.imwork.net%2fadd">
                <!--<div class="fl" @click="clickS">-->
                <img src="../../assets/img/fill/icon_RichScan_small@2x.png" class="fl add-icon-s"/>
                <span class="fl font-7b7 add-icon-pad add-icon-pad-s">扫一扫</span>
                <!--</div>-->
              </a>
            </div>
          </div>
        </div>
        <!--提交按钮 v-if="invoiceTTShow==false" -->
        <div class="width wrapcenter bg-f6" v-if="addWrapcenter">
          <div class="font-col-b font-EB addInvoice-main-last-btn fl width cont font-133" :class="iptInforMop" @click="AddCommit">提交</div>
        </div>
        <p class="font-125 font-7b7" style="padding: 0 1.0833333rem;">友情提示: </p>
        <p class="font-125 font-7b7" style="padding: 0 1.0833333rem 1rem;">请仔细核对以上发票信息,确保无误后提交</p>
      </div>
      <!--进入页面且识别信息失败时显示  -->
      <div class="font-ipt cont fl width bg-ff" style="padding: 3rem 0;" v-else="!information">
        <a href="http://sao315.com/w/api/saoyisao?redirect_uri=http%3a%2f%2fzhihuijia.imwork.net%2fadd"><img src="../../assets/img/fill/icon_RichScan_big@2x.png" class="cont scan-icon" ></a>
        <p class="font-125 height-316">扫描发票左上角二维码识别</p>
        <p class="font-108 font-7b7" @click="handInput">手动输入</p>
      </div>
    </div>
    <!--识别失败-->
    <section class="zz" v-show="checkShowAdd">
      <div class="wrapcenter">
        <div class="wrapcenter_tips bg-ff">
          <div class="section_top cont" style="font-size: 1.16666667rem;">未能识别二维码信息，您可以手动输入发票信息</div>
          <div class="section_bottom">
            <div class="qx_set font-7b7" @click="checkShowAdd=false">取消</div>
            <div class="qx_right qx_set font-F89" @click="information=true;checkShowAdd=false">手动输入</div>
          </div>
        </div>
      </div>
    </section>
    <!--发票已存在提示框-->
    <section class="zz" v-show="clickOk">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top" style="line-height: 4.1rem;">该发票已存在，不能重复添加</div>
          <div class="section_bottom">
            <div class="qx_set1 font-fa font-F89" @click="clickOk=false">知道了</div>
          </div>
        </div>
      </div>
    </section>
    <!--从错误的类型入口进入，识别出正确类型的提示框-->
    <section class="zz" v-show="errorEntry">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top" style="line-height: 2rem;font-weight:500;padding: 19px 6% 15px;">识别出您上传的发票类型为电子发票，已为您选择正确的类型</div>
          <div class="section_bottom">
            <div class="qx_set1 font-fa font-F89" @click="addGoBack">确定</div>
          </div>
        </div>
      </div>
    </section>
    <!--专票普票示例图-->
    <div class="zz" v-show="addImageShow">
      <img class="pst-abs addImageHeight" v-show="!addImageBg" src="../../assets/image/img_icon_vat_speccial_invoice@2x.png" />
      <img class="pst-abs addImageHeight" v-show="addImageBg" src="../../assets/image/img_vat_ordinary_invoice@2x.png" />
      <img @click="clickImage" class="pst-abs addImageIcon" src="../../assets/img/clean.png"/>
    </div>

    <!-- 选择发票抬头/发票分类/发票类型 -->
    <section class="zz InvoiceRise width" style="position:absolute;bottom: 0;height: 99.7%;z-index:100000" v-if="invoiceTTShow">
      <div class="InvoiceRise-margin-top bg-f6">
        <div class="InvoiceRise_title bg-ff font-s15 cont"><p class="fl" @click="backAdd"><img src="../../assets/img/black_back.png"></p><p class="dis_inb">{{ChooseTTorFL}}</p></div>
        <div class="invoiceRise_all font-125" >
          <!-- 发票抬头 -->
          <div class="invoiceRise_item bg-ff pst-rlt height-375" @click="chooseCompany(item)"  v-for="(item,index) in AllCompanyList" v-if="ChooseTTorFL=='选择发票抬头'" :class="index==0?'':'bd-top'">
            <span :class="invoiceRise==item.name?'font-3b9':''" class="mG-lft183 ">{{item}}</span>  <!-- 参数不变-->
            <p class="pst-abs pst-center" v-if="chooseTT == item"><img  src="../../assets/img/fill/icon_Selected.png"></p>
          </div>
          <!-- 发票分类 -->
          <div class="invoiceRise_item bg-ff pst-rlt height-375" @click="chooseCompany(item.name,item.id)"  v-for="(item,index) in AllInvoiceFL" v-if="ChooseTTorFL=='选择发票分类'&&item.state == 1" :class="index==0?'':'bd-top'" :key="index">
            <span :class="invoiceRise==item.name?'font-3b9':''" class="mG-lft183 ">{{item.name}}</span>
            <p class="pst-abs pst-center" v-if="chooseTTs == item.name"><img  src="../../assets/img/fill/icon_Selected.png"></p>
          </div>
          <div class="bg-f6" style="height: 4rem;"></div>
        </div>
      </div>
    </section>

    <!--示例图片-->
    <div class="iptInforM-E-mask" v-if="slPhoto">
      <img class="iptInforM-E-mask-img" v-if="addInvoiceType=='增值税专票'"  src="../../assets/image/img_icon_vat_speccial_invoice@2x.png"/>
      <img class="iptInforM-E-mask-img" v-if="addInvoiceType!='增值税专票'"  src="../../assets/image/img_vat_ordinary_invoice@2x.png"/>
      <img class="iptInforM-E-mask-icon"  src="../../assets/img/account/icon_cancel_button@2x.png" @click="slPhoto=false" />
    </div>

    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">  <!--class="font-col-b" -->
        <section :class="[addOpenDataSj.tips]" class="font-col-b"  id="user_format">{{addOpenDataSj.tipsContent}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {addEInvoice} from '@/api/user/SignOut'
  import {distinguishImage} from "@/api/user/loginReg";
  //import indentifyInvoice from "@/api/user/loginReg";
  import {queryInvoiceType,indentifyInvoice,findAssetConterCompanyList,findInvoiceCategoryAll} from "@/api/user/loginReg";/*解析二维码信息接口*/
  if (location.href.indexOf("qrresult=")>-1){
    var code = location.href.split("qrresult=")[1];
  }
  /*var qr=getQueryString("qrresult");
   if(qr){
   $("#result").html(qr);
   var wl=qr.split("CODE_128,");
   if (wl.length==2){
   window.open("https://www.baidu.com/s?wd=" + wl[1]);
   }else{
   alert("请对准条形码进行扫描！");
   }
   }

   function getQueryString(name)
   {
   var reg = new RegExp("\\b"+ name +"=([^&]*)");
   var r = location.href.match(reg);
   if (r!=null) return decodeURIComponent(r[1]);
   //if (r!=null) return unescape(r[1]);
   }*/
  export default {
    components: {},
    data() {
      return {
        addWrapcenter:true,
        invoiceTTShow:false,
        ChooseTTorFL:"",
        chooseTT:"",
        chooseTTs:"",
        ttName:"请选择",
        addInvoiceType:"请选择",
        addInvoiceCode:"",
        addInvoiceNum:"",
        addMoney:"",
        addJYM:"",
        openDatasColor:"",
        slPhoto:false,
        iptInforMop:"op-3",
        invoiceTy:"请选择",
        allInvoice:"",
        addMoneyJY:false,
        information:true,/*扫一扫图片，识别失败时显示*/
        checkShowAdd:false,/*识别失败提示框*/
        clickOk:false,/*已存在提示框*/
        addImageBg:true,/*两张展示图片显示哪张*/
        addImageShow:false,/*展示图片*/
        openDatas:'请选择',/*日期*/
        invoiceRise:"",
        content:"",/*显示内容*/
        addCode:"",       //扫一扫返回结果
        code:"",
        Issao:"",
        addOpenDataSj:{   //开票日期校验对象
          openDate:"",
          flag:false,
          tips:"",
          tipsContent:"",
        },
        addInvInfo:{    //添加发票接口参数
          picUrl:"",     // localStorage.getItem("photoUrl")写在data数据里面可能拿不到数据
          invoiceTitleName:"",
          companyId:localStorage.getItem("companyId"),
          companyName:localStorage.getItem("companyName"),
          salesName:"",     //销售方名称
          salesAddr:"",     //销售方地址
          salesNumber:"",     //销售方纳税人识别码
          salesBankaccount:"",     //销售方开户行
        },
        AllCompanyList:[],        //发票抬头公司
        AllInvoiceFL:[],        //全部发票分类
        moneyCode:true,/*电子发票专票显示校验码为false，纸质发票显示金额为true*/
        errorEntry:false,/*从错误的类型入口进入，识别出正确类型的提示框*/
        AddOCRinfo:{     //OCR参数
          companyId:localStorage.getItem("companyId"),
          typeId:"",      // 1增值税专票 2增值税普票 3电子发票 4飞机票 5火车票 6出租车发票 7定额发票 9卷式发票
          imageUrl:localStorage.getItem("photoUrl")      //接收上一个页面传过来的urls
        }
      }
    },
    created(){
      findAssetConterCompanyList(localStorage.getItem("companyId")).then(res =>{ //成本中心查询关联公司列表
        if(res.data.code == 200){
          this.AllCompanyList = res.data.data;
        }else{
          this.AllCompanyList = [];
          this.addOpenDataSj.tips="tel-message";
          this.addOpenDataSj.tipsContent = res.data.msg;
        }
      },res =>{
        this.AllCompanyList = [];
        this.addOpenDataSj.tips="tel-message";
        this.addOpenDataSj.tipsContent = res.data.msg;
      });
      let self = this;
      setTimeout(function () {
        self.init();
      });
      //解析二维码返回页面

    },
    updated: function () {
      localStorage.setItem("addInvInfoArr",JSON.stringify(this.addInvInfo));
      if(this.openDatas == "请选择"){
        this.openDatasColor = "font-7b7"; //灰色
      }else if(this.addOpenDataSj.flag == false){
        this.openDatasColor = "font-22d"; //红色
      }else{
        this.openDatasColor = "font-2a2a"; //黑色
      }
      this.btnLight();
    },
    methods:{
        init(){
          this.ttName = localStorage.getItem("companyName");    //发票抬头
          this.addInvInfo.picUrl = localStorage.getItem("photoUrl");
        //  alert(location.href.indexOf("qrresult="));
          if (location.href.indexOf("qrresult=")>-1){  //扫一扫
            this.code = location.href.split("qrresult=")[1];
            //alert('code:'+this.code);
            this.addInvInfo = JSON.parse(localStorage.getItem("addInvInfoArr"));
            this.invoiceTy = this.addInvInfo.categoryName;
            this.addInvoiceType = localStorage.getItem("invoiceTypeName");
            this.ttName = this.addInvInfo.companyName;
      //      alert('this.analysisEWM()');
            this.analysisEWM();
          }else{
            //填充上传发票类型id
            if(this.$route.params.categId!=""&&this.$route.params.categId!=null&&this.$route.params.categId!=undefined){
              this.AddOCRinfo.typeId = this.$route.params.categId;
              this.addInvInfo.typeId = this.$route.params.categId;
              localStorage.setItem("AddInvoiceId",this.$route.params.categId);
            }else{ //扫一扫未识别用户手动返回
              this.addInvInfo.typeId = localStorage.getItem("AddInvoiceId");
            }
            //填充上传发票类型名称
            if(this.$route.params.categName!=""&&this.$route.params.categName!=null&&this.$route.params.categName!=undefined){
              this.addInvoiceType = this.$route.params.categName;
              this.addInvInfo.typeName = this.$route.params.categName;
              localStorage.setItem("invoiceTypeName",this.$route.params.categName);
            }else{
              this.addInvoiceType = localStorage.getItem("invoiceTypeName");
              this.addInvInfo.typeName = localStorage.getItem("invoiceTypeName");
              this.Issao = "扫一扫";
            }
            this.AddOCRinfo.imageUrl = localStorage.getItem("photoUrl");
            if(this.AddOCRinfo.typeId !=9 ) {  //ocr暂不支持识别卷式发票
              if (this.Issao == "") {  //判断是否是扫一扫back页面
                distinguishImage(localStorage.getItem("userID"), this.AddOCRinfo).then(res => {     //ocr识别接口
                  if (res.data.code == 200) {
                    if (res.data.data.words_result != null && res.data.data.words_result != undefined && res.data.data.words_result != '') {
                      this.addInvInfo.salesName = res.data.data.words_result.sellerName;
                      this.addInvInfo.salesAddr = res.data.data.words_result.sellerAddress;
                      this.addInvInfo.salesNumber = res.data.data.words_result.sellerRegisterNum;
                      this.addInvInfo.salesBankaccount = res.data.data.words_result.sellerBank;
                      this.addInvoiceCode = res.data.data.words_result.invoiceCode;   //发票代码
                      this.addInvoiceNum = res.data.data.words_result.invoiceNum;   //发票号码
                      let D = res.data.data.words_result.invoiceDate.substr(8, 2);
                      let M = res.data.data.words_result.invoiceDate.substr(5, 2);
                      let N = res.data.data.words_result.invoiceDate.substr(0, 4);
                      //现ocr识别不准确，偶会出现识别出来的月和日是三位数的，当这种情况发生的时候日期不显示
                      if (D.indexOf("月") < 0 && D.indexOf("日") < 0) {
                        this.openDatas = N + "-" + M + "-" + D;    //开票日期
                      }
                      //this.openDatas = "2017-10-10";    //开票日期
                      this.addOpenDataSj.openDate = this.openDatas;
                      this.$fourYsJy.openDatasJY(this.addOpenDataSj);
                      this.addMoney = res.data.data.words_result.totalAmount / 1000;   //不含税金额
                      this.addJYM = res.data.data.words_result.checkCode.substr(res.data.data.words_result.checkCode.length - 6, 6);   //校验码
                      this.addInvInfo.taxIncludePrice = res.data.data.words_result.amountInFiguers / 1000;  //含税总金额
                      this.addInvInfo.taxAmt = res.data.data.words_result.totalTax;   //税金额
                      //TODo 年后添加这段逻辑
                     /* let purchaserName = res.data.data.words_result.purchaserName;//ocr识别出的公司抬头
                      let flag = false;
                      if(this.AllCompanyList!=null && this.AllCompanyList.length>0){
                        for(let i=0;i<this.AllCompanyList.length;i++){
                          if(purchaserName == this.AllCompanyList[i]){
                            flag = true;
                            return;
                          }
                        }
                        if(flag){
                          this.addInvInfo.categoryName = purchaserName;
                          this.ttName = purchaserName;
                        }else{
                          this.addInvInfo.categoryName = "";
                          this.ttName = "请选择";
                          this.addOpenDataSj.tips="tel-message";
                          this.addOpenDataSj.tipsContent = "未匹配到所属公司抬头信息";
                        }
                      }else{
                        this.addInvInfo.categoryName = "";
                        this.ttName = "请选择";
                        this.addOpenDataSj.tips="tel-message";
                        this.addOpenDataSj.tipsContent = "未匹配到所属公司抬头信息";
                      }*/
                    } else {   //ocr未识别或者识别为空
//                 this.addOpenDataSj.tips="tel-message";
//                 this.addOpenDataSj.tipsContent = "ocr未能识别";
                    }
                  } else {
                    this.addOpenDataSj.tips = "tel-message";
                    this.addOpenDataSj.tipsContent = "ocr识别失败，请手动输入";
                  }
                }, res => {
                  this.addOpenDataSj.tips = "tel-message";
                  this.addOpenDataSj.tipsContent = "ocr识别失败，请手动输入";
                })
              }
            }
          }
        },
      onlyNumber(ele) {
        let self = this;
          //只能输入两个小数
        ele = ele.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(ele.match(pattern_chin1)!=null){
          ele = '';
          this.addMoneyJY = false;
        }else{
          let reg = /^\d+(\.\d{0,2})?$/;
          if(reg.test(ele)){
            ele = parseFloat(ele);
            this.addMoneyJY = true;
          }else{
            ele = "";
            this.addMoneyJY = false;
            this.addOpenDataSj.tips = "tel-message";//失焦不弹出弹框
            this.addOpenDataSj.tipsContent = "请输入数字格式,最多两位小数";
          }
        }
      },
      clickImage(){
        this.addImageShow = false;
      },
      //发票代码校验
      jyInvoiceCodeLength(){
        if(this.addInvoiceCode.length < 10 || this.addInvoiceCode.length == 11){
          this.addOpenDataSj.tips="tel-message";
          this.addOpenDataSj.tipsContent = "发票代码输入有误";
        }
      },
      pubJY(name,verb,num){
          if(verb == ""){
            this.addOpenDataSj.tips="tel-message";
            this.addOpenDataSj.tipsContent = name + "不能为空";
          }else if(verb.length != num){
            this.addOpenDataSj.tips="tel-message";
            this.addOpenDataSj.tipsContent = name + "输入有误";
          }
      },
      examplePhoto(){
        this.slPhoto = true;
      },
      timer(){
        if(this.addOpenDataSj.tips=="tel-message"){
          this.addOpenDataSj.tips="trans";
        }
      },
      handleInput2(e) {
        // 通过正则过滤小数点后两位
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null;
      },
      //手动输入
      handInput(){
        this.information = true;
      },
      chooseInvoiceStart(key){
        this.invoiceTTShow = true;
        this.addWrapcenter = false;
        this.ChooseTTorFL = key;
        if(key == "选择发票抬头"){
         /* findAssetConterCompanyList(localStorage.getItem("companyId")).then(res =>{ //成本中心查询关联公司列表
            if(res.data.code == 200){
              this.AllCompanyList = res.data.data;
            }
          })*/
        }else{
          findInvoiceCategoryAll().then(res =>{    //查询全部发票类别
            if(res.data.code == 200){
              this.AllInvoiceFL = res.data.data.records;
            }
          })
        }
      },
      chooseDay(){
        this.$picker.show({
          type:'datePicker',
          onOk: (date) =>{
            this.openDatas = date;
            this.addOpenDataSj.openDate = this.openDatas;
            this.$fourYsJy.openDatasJY(this.addOpenDataSj);
          },
        })
      },
      //写一个关于提交按钮高亮的公用方法
      btnLight(){
          if(this.addInvoiceCode.length >= 10 &&  this.addInvoiceCode.length != 11 && this.addInvoiceNum.length == 8 && this.addMoney!="" && this.addOpenDataSj.flag == true ){
            if(this.addInvoiceType!='增值税专票'&&this.addInvoiceType!='卷式发票'){
                if(this.addJYM.length == 6){
                  this.iptInforMop = "op-1";
                }
            }else{
              this.iptInforMop = "op-1";
            }
          }else{
            this.iptInforMop = "op-3";
          }
      },
      //提交   addInvoiceType
      AddCommit(){
        if(this.iptInforMop == "op-1"){
            this.addInvInfo.invoiceTitleName = this.ttName;
            this.addInvInfo.invoiceCode = this.addInvoiceCode;
            this.addInvInfo.invoiceNo = this.addInvoiceNum;
            this.addInvInfo.invoiceDate = this.openDatas;
            if(this.addInvoiceType == "卷式发票"){
              this.addInvInfo.taxIncludedPrice = this.addMoney;  //卷式发票传含税金额
            }else{
              this.addInvInfo.invoiceAmt = this.addMoney;
            }
            if(this.addInvoiceType!= "增值税专票" && this.addInvoiceType!= "卷式发票"){    //校验码
              this.addInvInfo.checkCode = this.addJYM;
            }
            addEInvoice(localStorage.getItem("userID"),this.addInvInfo).then(res =>{   //添加发票
              if(res.data.code == 200){
                this.$router.push({
                  name:"fill"
                })
              }else{
                if(res.data.msg == '发票已经存在'){
                  this.clickOk = true;
                }else{
                  this.addOpenDataSj.tips="tel-message";
                  this.addOpenDataSj.tipsContent = res.data.msg;
                }
              }
            },res =>{
              this.addOpenDataSj.tips="tel-message";
              this.addOpenDataSj.tipsContent = res.data.msg;
            })
        }
      },
      chooseCompany(name,id){
        if(this.ChooseTTorFL == "选择发票抬头"){
          this.ttName = name;
          this.chooseTT = name;
        }else{
          this.chooseTTs = name;
          this.invoiceTy = name;
          this.addInvInfo.categoryName = name;
          this.addInvInfo.categoryId = id;
        }
        this.invoiceTTShow = false;
        this.addWrapcenter = true;
      },
      backAdd(){
        this.invoiceTTShow = false;
        this.addWrapcenter = true;
      },
      dataPub(){
        if(this.openDatas!=""){
          this.addOpenDataSj.openDate = this.openDatas;
          this.$fourYsJy.openDatasJY(this.addOpenDataSj);
          this.btnLight();
        }
      },
      addScanning(){

      },
      analysisEWM(){
        indentifyInvoice(localStorage.getItem("userID"),this.code).then(res => {   //解析二维码信息接口
          if (res.data.code == 200) {
            this.addInvInfo.typeId = localStorage.getItem("AddInvoiceId");
            this.addInvInfo.typeName = localStorage.getItem("invoiceTypeName");
            this.addInvoiceCode = res.data.data.invoiceCode;
            this.addInvoiceNum = res.data.data.invoiceNumber;
            this.openDatas = res.data.data.invoiceDate.substr(0,10);   //返回的开票日期带有时分秒
            this.addOpenDataSj.openDate = this.openDatas;
            this.$fourYsJy.openDatasJY(this.addOpenDataSj);
            this.addMoney = res.data.data.invoiceAmount/1000;  //金额缩小一千倍
            this.dataPub();
            if(res.data.data.invoiceType!="增值税专票"){
              this.addJYM = res.data.data.invoiceCheckcode.substr(res.data.data.invoiceCheckcode.substr.length-8,6);
            }
          } else {
            this.information = false;
            this.checkShowAdd = true;
          }
        }, res => {
          this.checkShowAdd = true;
          this.information = false;
        })
      },
    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.timer,2500);
      })
    },
    watch:{
      addInvoiceCode(newValue, oldValue){ //发票代码
        if(newValue.length>12){
          this.addInvoiceCode = oldValue;
        }else{
          this.btnLight();
        }
      },
      addInvoiceNum(newValue, oldValue){  //发票号码
        if(newValue.length>8){
          this.addInvoiceNum = oldValue;
        }else{
          this.btnLight();
        }
      },
      addJYM(newValue, oldValue){  //校验码
        if(newValue.length>6){
          this.addJYM = oldValue;
        }else{
          this.btnLight();
        }
      },
      addMoney(newValue, oldValue){  //金额
        if(newValue!=""){
          this.btnLight();
        }
      },
      openDatas(newValue, oldValue){   //开票日期
        if(this.openDatas!=""){
          this.addOpenDataSj.openDate = this.openDatas;
          this.$fourYsJy.openDatasJY(this.addOpenDataSj);
          this.btnLight();
        }
      },

    }
  }
</script>
<style>
  .add .wrapcenter_tips{
    margin-top:60%;
  }
  .addInvoice .addInvoice-main-p{
    line-height: 3.75rem;
  }
  .addInvoice .addMar{
    padding: 0 1.083333333rem;
  }
  .addInvoice-main-last-btn {
    margin: 1rem 1.0833333rem 1rem;
    line-height: 3.83rem;
    border-radius: 0.4rem;
    background: #FFA436;
  }
  .scan-icon{
    width: 9.16667rem;
    padding: 0.5rem 0 0.5rem 36%;
  }
  .add-icon-s{
    width: 1.5rem;
    padding:1.1rem 0.5rem 0 1.66666667rem;
  }
  .add-icon-pad{
    line-height: 4rem;
  }
  .add-icon-pad-s{
    padding-right: 1.666667rem;
  }
  .addImageHeight{
    bottom:15%;
  }
  .addImageIcon{
    bottom: 5%;
    width: 2rem;
    left: 47%;
  }
  /*发票抬头样式*/
  .add .InvoiceRise-margin-top {
    height: 54%;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .add .InvoiceRise .InvoiceRise_title {
    height: 4.166667rem;
  }
  .add .InvoiceRise .InvoiceRise_title p:first-of-type {
    width: 30%;
  }
  .add .InvoiceRise .InvoiceRise_title p img {
    margin-top: 16%;
    margin-left: 1.0833333rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .add .InvoiceRise .InvoiceRise_title p:nth-of-type(2) {
    float: left;
    width: 40%;
    line-height: 4.166667rem;
  }
  .add .InvoiceRise .invoiceRise_all {
    margin-top: 0.666667rem;
    overflow-y: scroll;
    height: 24.5rem;
  }
  .add .InvoiceRise .invoiceRise_item p {
    right: 2rem;
  }
  .add .InvoiceRise .invoiceRise_item p img {
    width: 1.16666rem;
    height: 0.833333rem;
  }
  /*示例图片样式*/
  .add .iptInforM-E-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
  }
  .add .iptInforM-E-mask .iptInforM-E-mask-img{
    padding-top: 13%;
    height: 80%;
  }
  .add .iptInforM-E-mask .iptInforM-E-mask-icon{
    width: 2.5rem;
    padding-top: 1.333333rem;
    padding-left: 46%;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    /*.add .pub_five_w{*/
        /*width:92%;*/
      /*}*/
    .add .InvoiceRise .invoiceRise_all{
      height:20.8rem;
    }
  }
</style>

<template>
  <div class="addQuotaInvoice width height bg-f6">
    <div v-if="addInvoiceType=='定额发票'"> <!--  -->
      <p class="addInvoice-main-p addMar font-ipt font-108">选择发票分类</p>
      <div class="invoiceTypeWrap width bg-ff">
        <div class="addInvoice-main-last-wid fl addInvoice-main-p font-125" @click="chooseInvoiceTp('选择发票分类')">
          <div class="fl" :class="invoiceFL=='请选择'?'font-7b7':'font-2a2a'">{{invoiceFL}}</div>
          <img src="../../assets/img/right.png" class="fr addInvoice-right-icon"/>
        </div>
      </div>
    </div>
    <div>
      <p class="addInvoice-main-p addMar font-ipt font-108">完善信息</p>
      <div class="fl bg-ff width">
        <div class="width four_wrap bg-ff" >
          <div class="four_father height bd-btm" >
            <div class="four_left fl font-125">发票类型</div>
            <div class="four_typeDiv_right fr cont-r font-125"  :class="addInvoiceType=='请选择'?'font-7b7':'font-2a2a'" v-text="addInvoiceType"></div>
          </div>
        </div>
        <div class="width four_wrap bg-ff" >
          <div class="four_father height bd-btm">
            <div class="four_left fl font-125" >发票代码</div>
            <input type="number" pattern="\d*" maxlength="12" v-model="addInvoiceCode" class="four_input_right fr cont-r" placeholder="请输入" @blur="IncodeJY">
          </div>
        </div>
        <div class="width four_wrap bg-ff" >
          <div class="four_father height bd-btm">
            <div class="four_left fl font-125" >发票号码</div>
            <input type="number" pattern="\d*" v-model="addInvoiceNum" maxlength="8" class="four_input_right fr cont-r" placeholder="请输入" @blur="publiceJY('发票号码',addInvoiceNum,8)">
          </div>
        </div>
        <div class="width four_wrap bg-ff" v-if="addInvoiceType!='定额发票'">
          <div class="four_father height bd-btm" :class="openDate" @click="quotaChooseDay">
            <div class="four_left fl font-125">开票日期</div>
            <img class="fr four_img_right " src="../../assets/img/right.png"/>
            <div class="four_div_right fr cont-r font-125"  :class="openDatasColor" v-text="openDatas"></div>
          </div>
        </div>
        <div class="width four_wrap bg-ff" >
          <div class="four_father height">
            <div class="four_left fl font-125" >开具金额（元）</div>
            <input v-model="addMoney" class="four_input_right fr cont-r" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" v-on:keyup="onlyNumber(addMoney)"  step="0.01" @keydown="handleInput2" maxlength="10" placeholder="请输入">
          </div>
        </div>

      </div>
    </div>
    <div class="fl width wrapcenter">
      <div class="font-col-b font-EB addInvoice-main-last-btn fl width cont font-133" :class="comColor" @click="quotaAddCommit">提交</div>
    </div>
    <p class="font-125 font-7b7" style="padding: 0 1.0833333rem;">友情提示: </p>
    <p class="font-125 font-7b7" style="padding: 0 1.0833333rem 1rem;">请仔细核对以上发票信息,确保无误后提交</p>
    <!-- 选择发票分类/发票类型 -->
    <section class="zz InvoiceRise width" v-if="invoiceTpShow" style="position: absolute;height: 99.7%;">
      <div class="InvoiceRise-margin-top bg-f6">
        <div class="InvoiceRise_title bg-ff font-s15 cont"><p class="fl" @click="quotaBackAdd"><img src="../../assets/img/black_back.png"></p><p class="dis_inb">{{ChooseLXorFL}}</p></div>
        <div class="invoiceRise_all font-125">
          <!-- 发票分类 -->
          <div class="invoiceRise_item bg-ff pst-rlt height-375" @click="quotaChooseCompany(item.name,item.id)"  v-for="(item,index) in AllInvoiceFL" v-if="ChooseLXorFL=='选择发票分类'&&item.state == 1" :class="index==0?'':'bd-top'" :key="index">
            <span :class="invoiceRise==item.name?'font-3b9':''" class="mG-lft183 ">{{item.name}}</span>
            <p class="pst-abs pst-center" v-if="chooseTTs == item.name"><img  src="../../assets/img/fill/icon_Selected.png"></p>
          </div>
          <div class="bg-f6" style="height: 4rem;"></div>
        </div>
      </div>
    </section>

    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[openD.tips]" class="font-col-b" id="user_format">{{openD.tipsContent}}</section>
      </div>
    </div>

    <!--发票已存在提示框-->
    <section class="zz" v-show="repeatInvoice">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top" style="line-height: 4.1rem;">该发票已存在，不能重复添加</div>
          <div class="section_bottom">
            <div class="qx_set1 font-fa font-F89" @click="repeatInvoice=false">知道了</div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
  import {addEInvoice} from '@/api/user/SignOut'
  import {queryInvoiceType,findInvoiceCategoryAll,distinguishImage} from "@/api/user/loginReg";
  export default {
    data() {
        return{
          addInvoiceType:"请选择",
          addInvoiceCode:"",
          addInvoiceNum:"",
          openDatas:"请选择",
          addMoney:"",
          invoiceTpShow:"",
          invoiceFL:'请选择',
          ChooseLXorFL:"",
          AllInvoiceFL:{},
          chooseTTs:"",
          comColor:"op-3",
          invoiceTTShow:"",
          openDatasColor:"",
          repeatInvoice:false, //发票重复提示
          openD:{    //开票日期校验对象
            openDate:"",
            flag:false,
            tips:"",
            tipsContent:"",
          },
          addInfo:{   //添加发票参数
            picUrl:localStorage.getItem("photoUrl"),
            companyId:localStorage.getItem("companyId"),
            companyName:localStorage.getItem("companyName"),
            typeId:6,
          },
          ocrInfo:{    //ocr参数
            companyId:localStorage.getItem("companyId"),
            typeId:"",      // 1增值税专票 2增值税普票 3电子发票 4飞机票 5火车票 6出租车发票 7定额发票 9卷式发票
            imageUrl:localStorage.getItem("photoUrl")      //接收上一个页面传过来的urls localStorage.getItem("photoUrl")
          }
        }
    },
    updated: function () {
        if(this.openDatas == "请选择"){
          this.openDatasColor = "font-7b7"; //灰色
        }else if(this.openD.flag == false){
          this.openDatasColor = "font-22d"; //红色
        }else{
          this.openDatasColor = "font-2a2a"; //黑色
        }
    },
    created(){
      this.openDatasColor = "font-7b7"; //灰色
        if(this.$route.params.categId!=""&&this.$route.params.categId!=null&&this.$route.params.categId!=undefined){
          this.addInfo.typeId = this.$route.params.categId;
          this.ocrInfo.typeId = this.$route.params.categId;
          if(this.$route.params.categId == 6){  //出租车发票
            this.addInfo.categoryId = '201901111217'; //出租车类别id
            this.addInfo.categoryName = '出租车发票'; //出租车类别name
            distinguishImage(localStorage.getItem("userID"),this.ocrInfo).then(res =>{    //ocr识别接口  现在暂时还没接入识别定额发票的，待后期产品完善，勿删
              if(res.data.code == 200){
                this.addInvoiceCode = res.data.data.words_result.invoiceCode;   //发票代码
                this.addInvoiceNum = res.data.data.words_result.invoiceNum;   //发票号码
                if(res.data.data.words_result.date!=""){
                  let D = res.data.data.words_result.date.substr(8,2);
                  let M = res.data.data.words_result.date.substr(5,2);
                  let N = res.data.data.words_result.date.substr(0,4);
                  this.openDatas = N +"-"+ M +"-"+ D;    //开票日期
                  this.openD.openDate = this.openDatas;
                  this.$fourYsJy.openDatasJY(this.openD);
                }
                //开具金额
                let saveDataMoney = res.data.data.words_result.fare;
                let saveMoneyJY = RegExp(/[(\￥)]+/);
                let savePageMoney = res.data.data.words_result.fare;
                if(saveDataMoney.indexOf('元')<0&&saveDataMoney.indexOf('￥')<0){
                  this.addMoney = saveDataMoney;
                }else{
                  if(saveMoneyJY.test(saveDataMoney)){  //判断有没有￥符号
                    savePageMoney = res.data.data.words_result.fare.substr(1,saveDataMoney.length);
                  }
                  if(savePageMoney.indexOf('元')>0){
                    this.addMoney = savePageMoney.substr(0,savePageMoney.length-1);
                  }
                }
              //  this.addInfo.taxIncludePrice = res.data.data.words_result.amountInFiguers;  //含税总金额
             //   this.addInfo.taxAmt = res.data.data.words_result.totalTax;   //税金额
              }
            })
          }
        }
      if(this.$route.params.categName!=""&&this.$route.params.categName!=null&&this.$route.params.categName!=undefined){
        this.addInvoiceType = this.$route.params.categName;
        this.addInfo.typeName = this.$route.params.categName;
      }

    },
    methods:{
      onlyNumber(ele) {
        //只能输入两个小数
        ele = ele.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(ele.match(pattern_chin1)!=null){
          ele = '';
        }else{
          let reg = /^\d+(\.\d{0,2})?$/;
          if(reg.test(ele)){
            ele = parseFloat(ele);
          }else{
            ele = "";
            this.openD.tips = "tel-message";//失焦不弹出弹框
            this.openD.tipsContent = "请输入数字格式,最多两位小数";
          }
        }
      },
      quotaBackAdd(){
        this.invoiceTpShow = false;
      },
      quotaChooseCompany(name,id){
        this.invoiceFL = name;
        this.chooseTTs = name;
        this.addInfo.categoryId = id;
        this.addInfo.categoryName = name;
        this.invoiceTpShow = false;
      },
      //代码校验
      IncodeJY(){
        if(this.addInvoiceCode.length < 10 || this.addInvoiceCode.length == 11){
          this.openD.tips="tel-message";
          this.openD.tipsContent = "发票代码输入有误";
        }
      },
      //公共校验
      publiceJY(name,verb,num){
        if(verb == ""){
          this.openD.tips="tel-message";
          this.openD.tipsContent = name + "不能为空";
        }else if(verb.length != num){
          this.openD.tips="tel-message";
          this.openD.tipsContent = name + "输入有误";
        }
      },
      handleInput2(e) {
        // 通过正则过滤小数点后两位
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
      },
      chooseInvoiceTp(){
        let thIs = this;
        thIs.invoiceTpShow = true;
        thIs.ChooseLXorFL = "选择发票分类";
        findInvoiceCategoryAll().then(res =>{    //查询全部发票类别
          if(res.data.code == 200){
            thIs.AllInvoiceFL = res.data.data.records;
          }
        })
      },
      quotaAddCommit(){
        if(this.comColor == "op-1"){
          this.addInfo.invoiceCode = this.addInvoiceCode;
          this.addInfo.invoiceNo = this.addInvoiceNum;
          this.addInfo.taxIncludedPrice = this.addMoney;   //出租车/定额传的都是含税金额
          if(this.addInvoiceType!="定额发票"){
            this.addInfo.invoiceDate = this.openDatas; //定额发票没有开票日期
          }
            addEInvoice(localStorage.getItem("userID"),this.addInfo).then(res =>{
              if(res.data.code == 200){
                this.$router.push({
                  name:"fill"
                })
              }else{
                  if(res.data.msg == "发票已经存在"){
                      this.repeatInvoice = true;
                  }else{
                    this.openD.tips="tel-message";
                    this.openD.tipsContent = res.data.msg;
                  }
              }
            },res =>{
              this.openD.tips="tel-message";
              this.openD.tipsContent = res.data.msg;
            })

        }
      },
      //写一个关于提交按钮高亮的公用方法
      buttonLight(){
        if(this.addInvoiceCode.length >= 10 &&  this.addInvoiceCode.length != 11 && this.addInvoiceNum.length == 8 && this.addMoney!="" ){
            if(this.addInvoiceType != "定额发票"){
                if(this.openD.flag == true){
                  this.comColor = "op-1";
                }else{
                  this.comColor = "op-3";
                }
            }else{
              this.comColor = "op-1";
            }
        }else{
          this.comColor = "op-3";
        }
      },
      timer(){
        if(this.openD.tips=="tel-message"){
          this.openD.tips="trans";
        }
      },
      quotaChooseDay(){
        this.$picker.show({
          type:'datePicker',
          onOk: (date) =>{
            this.openDatas = date;
            this.openD.openDate = this.openDatas;
            this.$fourYsJy.openDatasJY(this.openD);
            if(this.openDatas == ""){
              this.openD.tips="tel-message";
              this.openD.tipsContent = "请输入行程日期";
            }
          },

        })
      },

    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    watch:{
      addInvoiceCode(newValue, oldValue){   //发票代码
        if(newValue.length>12){
          this.addInvoiceCode = oldValue;
        }else{
          this.buttonLight();
        }
      },
      openDatas(newValue, oldValue){ //开票日期
        if(this.openDatas!=""){
          this.openD.openDate = this.openDatas;
          this.$fourYsJy.openDatasJY(this.openD);
          this.buttonLight();
        }
      },
      addInvoiceNum(newValue, oldValue){  //发票号码
        if(newValue.length>8){
          this.addInvoiceNum = oldValue;
        }else{
          this.buttonLight();
        }
      },
      addMoney(newValue, oldValue){  //开具金额
        if(this.addMoney!=""){
          this.buttonLight();
        }
      }
    }
  }
</script>
<style>
  .addQuotaInvoice .invoiceTypeWrap{
    height: 3.75rem;
  }
  .addQuotaInvoice .addMar {
    padding: 0 1.083333333rem;
  }
  .addQuotaInvoice .addInvoice-main-p {
    line-height: 3.75rem;
  }
  .addQuotaInvoice .addInvoice-main-last-wid {
    width: 93%;
    margin: 0 1.0833333rem;
  }
  .addQuotaInvoice .addInvoice-main-p {
    line-height: 3.75rem;
  }
  .addQuotaInvoice .addInvoice-right-icon {
    width: 0.6rem;
    padding: 1.5rem 0 0 1rem;
  }
  .addQuotaInvoice .addInvoice-main-p {
    line-height: 3.75rem;
  }
  /*选择发票分类/类型分类样式*/
  .addQuotaInvoice .InvoiceRise-margin-top {
    margin-top: 73%;
    height: 50%;
  }
  .addQuotaInvoice .InvoiceRise .InvoiceRise_title {
    height: 4.166667rem;
  }
  .addQuotaInvoice .InvoiceRise .InvoiceRise_title p:first-of-type {
    width: 30%;
  }
  .addQuotaInvoice .InvoiceRise .InvoiceRise_title p img {
    margin-top: 16%;
    margin-left: 1.0833333rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .addQuotaInvoice .InvoiceRise .InvoiceRise_title p:nth-of-type(2) {
    float: left;
    width: 40%;
    line-height: 4.166667rem;
  }
  .addQuotaInvoice .InvoiceRise .invoiceRise_all {
    margin-top: 0.666667rem;
    overflow-y: scroll;
    height: 100%;
  }
  .addQuotaInvoice .InvoiceRise .invoiceRise_item p {
    right: 2rem;
  }
  .addQuotaInvoice .InvoiceRise .invoiceRise_item p img {
    width: 1.16666rem;
    height: 0.833333rem;
  }
  .addQuotaInvoice .wrapcenter{
    margin-top:1.4rem;
  }
  .addQuotaInvoice .addInvoice-main-last-btn {
    margin: 1rem 1.0833333rem 1rem;
    line-height: 3.83rem;
    border-radius: 0.4rem;
    background: #FFA436;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    /*选择发票分类/类型分类样式*/
    .addQuotaInvoice .InvoiceRise-margin-top {
      margin-top: 71%;
    }
  }
</style>

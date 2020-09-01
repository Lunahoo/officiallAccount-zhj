<template>
  <div class="causerWarp pst-rlt height">
    <div class="Cause bg-f6 width overflow-s" :class="editMoveUp">
      <div class="height" @touchmove="someFunction" :style="{overflow:wrapH}">
        <div class="Cause-conter">
          <div class="Cause-c-main fl width bg-ff mG-top067">
            <div class="Cause-c-main-font bd-btm" @click="toChooseInvoicePage">
              <p class="Cause-c-main-p pst-rlt font-167"><span class="fl">已选择发票{{invoiceCount}}张</span>
                <!--<span class="font-22d fr">发票收款方为不同公司</span>-->
                <span class="pst-center pst-abs"><img class="rightImgSize" src="../../assets/img/right.png"></span></p>
              <!--<p class="Cause-c-main-p font-96 font-133">报销事由<span class="font-166 font-96">（必填项）</span></p>-->
            </div>
            <div class="Cause-c-main-font bd-btm pst-rlt Cause-c-main-height font-167" @click="toCostattribution">
              <span class="dis_inb">费用归属</span><span class="dis_inb fr" style="margin-right: 1rem;">{{ReimbursementDetail.assetCenterName}}</span><span class="pst-center pst-abs"><img class="rightImgSize" src="../../assets/img/right.png"></span>
            </div>
            <div class="Cause-c-main-text"><!--v-on:keyup="write()" v-on:compositionstart="importStart()" v-on:compositionend="importEnd()"-->
              <div class="Cause-numb"><p class="fl">报销事由</p><p class="Cause-numb-p fr" ref="SyNum"><span>{{conterNum}}</span>/200</p></div>
              <textarea maxlength="200" v-model="causeValue" class="textHeight width textStyle font-133" placeholder="必填，请输入不小于10个字的报销事由"></textarea>
            </div>

          </div>
          <!--明细-->

          <div class="Cause-Detailed fl width bg-ff mG-top067" v-if="ReimbursementDetail.dtlList!=undefined" v-for="(mingxi,indexM) in ReimbursementDetail.dtlList" :key="indexM">
            <div class="Cause-Detailed-title bd-btm bg-f6 font-ipt">
              明细{{indexM+1}}
              <span class="font-1 font-fa fr mG-lfr1" @click="deleteMingxi(indexM)" v-if="ReimbursementDetail.dtlList.length>1">删除</span>
              <!--</div> -->
            </div>
            <div class="Cause-Detailed-lable">
              <div class="Cause-ipt ">
                <span class="dis_block fl rowHeight font-167">报销金额（元）</span>
                <!--<span class="dis_block fr rowHeight font-125" v-text="mingxi.price" step="0.01"></span>-->
                <input style="width: 50%;" placeholder="请输入报销金额（元）" type="text" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" v-on:keyup="onlyNumber(mingxi.price,indexM)" v-on:compositionstart="importStart()"
                v-on:compositionend="importEnd(indexM)" write v-model="mingxi.price" step="0.01"  @keydown="handleInput2" class="dis_block fr rowHeight font-167 cont-r"/>
         <span class="Cause-sp3 dis_block fr sheep_horn" v-if="MoneySymbol">￥</span>
        </div>
            </div>
            <div class="Cause-Detailed-lable" v-show="Mtype" v-if="mingxi.categoryName!='' && mingxi.categoryName!=undefined">
              <div class="Cause-ipt pst-rlt" v-if="mingxi.categoryName!=''">
                <p class="fl rowHeight font-167">费用类型</p>
                <p class="fr rowHeight font-167" v-text="mingxi.categoryName"></p>
               <!-- <span class="Cause-iptImg pst-abs reimbRight">
                  <img class="rightImgSize" src="../../assets/img/right.png" />
                </span>-->
              </div><!-- @click="CauseDetailed(indexM)"-->
            </div>

            <!-- 填写报销备注-->
            <div class="Cause-c-main-text">
              <p class="cause_remark">备注</p>
            <textarea  v-on:keyup="write(indexM)" v-on:compositionstart="importStart()"
                      v-on:compositionend="importEnd(indexM)" v-model="mingxi.remark" class="text_height width textStyle" placeholder="请输入"></textarea>
            </div>
          </div>
          <!-- +小图标 -->
         <!-- <div class="Cause-add fl cont width bg-f6" @click="addMingXi">
            <div class="Cause-add-img fl"><img src="../../assets/img/account/icon_increase.png"></div>
            <div class="Cause-add-span fl font-167 font-fa">新增明细</div>
          </div>-->
          <!--mask选择报销类型 -->
          <div class="Cause-mask width height pst-fixed pos-top pos-left" v-show="CauseMask" >
            <div style="height: 42.5%;" @click="CauseMaskHide"></div>
            <div style="height: 57.5%;" class="Cause-mask-title width bg-ff fl">
              <div style="height: 16%;z-index: 1;" class="bg-ff Cause-m-t-span bd-btm">
                <div class="Cause-m-t-margin">
                  <!--<span class="Cause-m-t-m-f"></span>-->
                  <span class="Cause-m-t-m-s">选择报销类型</span>
                  <span class="fl font-s25" @click="CauseMaskGb">×</span>
                  <span class="font-F89" @click="cpmP">完成</span><!--v-if="complete"-->
                </div>
              </div>
              <div style="height: 80%;overflow-y: scroll" class="width Cause-mask-overF fl pd-bt bg-f6">
                <!--通用报销-->
                <div class="currencyReim bg-ff pst-rlt" v-if="true">
                  <div class="margin_lt">
                    <div class="firstD font-133 fl">{{currencyT}}</div>
                    <div class="secondD font-s15 font-F89 fl">￥{{currencyE}}</div>
                    <div class="font-7b7 width font-108 fl">可与各类报销额度叠加使用</div>
                    <div class="currencyReim_img pst-abs" @click="checkCirEvent(checkCir)"><img :src="checkCir"></div>
                  </div>
                </div>
                <!--非通用报销-->
                <div class="width Not_currencyReim bg-ff" v-if="true">
                  <section class="mar_left pst-rlt" v-for="(item,index) in detailList" :key="item.id">
                    <div class="firstD font-2a2a font-133 fl">{{item.type}}</div>
                    <div class="secondD fl">￥{{item.price}}</div>
                    <div class="currencyReim_img pst-abs" @click="checkCircleEvent(index,item.checkCircle,item.type)"><img :src="item.checkCircle" :key="index" :id="'circle_'+index"></div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="zz" v-show="deteleMx">
          <div class="wrapcenter">
            <div class="wrapcenter_tips bg-ff">
              <div class="section_top cont font-12" style="line-height:1.9rem" v-if="typeName==null || typeName == undefined || typeName == ''">确认删除“明细{{MxTitleCount}}"吗</div>
              <div class="section_top cont font-12" style="line-height:1.9rem" v-if="typeName!=null && typeName != undefined && typeName != ''">确认删除“明细{{MxTitleCount}}"吗？删除将取消选中{{typeName}}类型的发票</div>
              <div class="section_bottom">
                <div class="qx_set bd-rt-ddd" @click="cancle">取消</div>
                <div class="qx_set font-fa" @click="delMxRequire">确认</div>
              </div>
            </div>
          </div>
        </section>
        <section class="zz" v-show="backSession">
          <div class="wrapcenter">
            <div class="wrapcenter_tips bg-ff">
              <div class="section_top cont font-12">确认返回将不保存已填写的内容</div>
              <div class="section_bottom">
                <div class="qx_set bd-rt-ddd" @click="backAddList">确定</div>
                <div class="qx_set font-fa" @click="cancelBack">取消</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="tel-mess" ref="history">
    <div class="juzhong">
      <section :class="[error_prompt]" id="error_bxMingxi">{{content}}</section>
    </div>
  </div>
    <!--底部-->
    <div class="Cause-footB fl width bg-ff pst-abs btm-0" v-show="CauseBtnShow" id="CauseBtnShowClick" >
      <div class="Cause-footB-l fl">
        <div class="font-108 mG-top067">报销总金额：<span class="font-1">¥</span><span class="font-s15 dis_inb">{{ReimbursementDetail.price}}</span></div>
        <!--<div class="font-96 font-1">合计</div>-->
      </div>
      <div class="Cause-footB-r fr font-col-b cont" ref="FqBxBtn" @click="InitiateBx">
        发起报销
        <!--<div class="Reelection fl" @click="againCheckFp">重选发票</div>-->
        <div class="Launch fl font-col-b" ></div>
      </div>
    </div>

      <!--子科目-->
        <div v-if="CostTypeShow">
          <div class="zz"></div>
          <div class="cause_costT pst-abs width" >
            <div class="costT_title bg-ff bd-btm"><p class="pWidth fl"><img src="../../assets/img/black_back.png" @click="closeType"></p><p class="cont fl font-s15">费用类型</p><!--<p class="pWidth fl"><img src="../../assets/img/costType-check.png"></p>--></div>
        <ul>
          <li class="width bg-ff bd-btm pst-rlt"  v-for="(item,indexIMG) in cosTtype" :key="indexIMG" @click="typeCheck(indexIMG,item.name)">
            {{item.name}}
            <p class="pst-abs"><img v-show="ReimbursementDetail.dtlList[mingXiCheck].categoryName == item.name" src="../../assets/img/fill/icon_Selected.png" ></p>
          </li>
        </ul>
      </div>
  </div>

  </div>
</template>
<script>
  import {queryParams} from '@/api/user/userLogin'
  import {queryReimburseDetail,addReimbursement,reAddReimburse,queryReimburseItemPage,initAddReimburse} from '@/api/user/SignOut'
  function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };
  export default {
    name: 'cause',
    data () {
      return {
        reimburseId:"",
        causeValue:"",
        costTypeName:"",
        editMoveUp:"height1",      //控制页面移动样式
        wrapH:"scroll",
        content:"",
        error_prompt:"",
        MxTitleCount:'',//报销明细Count
        mingXiCheck:0,
        conterNum:0,
        chnIpt: false,
        MoneySymbol:false,
        Mtype:false,         //费用类型
        CauseMask:false,
        deteleMx:false,//删除明细弹出框
        CauseBtnShow:true,
        CostTypeShow:false,
        currencyT:"通用报销",
        currencyName:"通用报销",
        currencyE:7600.00,
        typeName:"",
        invoiceCount:0,
        notcurrencyP:0,
        oldCheck:0,
        ReimbursementDetail:{
          companyId:"",//企业ID
          price:'0.00',//总价额
          cause:"",//报销事由
          dtlList:[ //报销明细集合
            {
              invoices:[],//发票集合id
              price:"",
              remark:"",
            }
          ],//报销明细集合
          categoryId:"",//主科目id
          categoryName:"",//主科目name
          assetCenterId:"",//费用归属id
          assetCenterName:"",//费用归属名称
          assetCenterCompany:"",//关联公司名称
        },
        detailList:[
          {type:"机票",price:3600.00,checkCircle:require("../../assets/img/btn_Unselected.png")},
          {type:"火车票",price:600.00,checkCircle:require("../../assets/img/btn_Unselected.png")},
          {type:"用餐",price:800.00,checkCircle:require("../../assets/img/btn_Unselected.png")},
          {type:"水电煤",price:1200.00,checkCircle:require("../../assets/img/btn_Unselected.png")},
          {type:"差旅费",price:0.00,checkCircle:require("../../assets/img/btn_Unselected.png")},
          {type:"火车票",price:250.00,checkCircle:require("../../assets/img/btn_Unselected.png")}
        ],
        cosTtype:[],
        CauseInformation:{
          companyId:localStorage.getItem("companyId"),
          invoiceList:[],
        },
        getoldInfoShow:false,
      }
    },
    methods:{
      someFunction(){
        document.activeElement.blur(); // ios隐藏键盘
        /* this.$refs.input.blur(); // android隐藏键盘*/
      },
      /*通用报销选择*/
      checkCirEvent(checkStatus){
        if(checkStatus == require("../../assets/img/check.png")){
          this.checkCir = require("../../assets/img/btn_Unselected.png");
          this.currencyName = "";
        }else{
          this.checkCir = require("../../assets/img/check.png");
          this.currencyName = "通用报销";
        }
      },
      /*非通用报销选择*/
      checkCircleEvent(index,checkStu,checkType){
        if(checkStu == require("../../assets/img/check.png")){
          this.detailList[index].checkCircle = require("../../assets/img/btn_Unselected.png");
          this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName = "";
        }else{
          for(let i=0;i<this.detailList.length;i++){
            if(index == i){
              this.detailList[index].checkCircle = require("../../assets/img/check.png");
              this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName = checkType;
              this.notcurrencyP = this.detailList[index].price;
            }else{
              this.detailList[i].checkCircle = require("../../assets/img/btn_Unselected.png");
            }
          }
        }
      },
      timer:function(){
        if(this.error_prompt=="tel-message1"){
          this.error_prompt="trans1";
        }
      },
      init(){
        if(this.$route.params.reimburseId!=undefined && this.$route.params.reimburseId!=null && this.$route.params.reimburseId!=""){
          this.reimburseId = this.$route.params.reimburseId
          localStorage.setItem('reimburseId',this.reimburseId);
        }
        if(this.reimburseId!=undefined && this.reimburseId!="" && this.reimburseId!=null){
          queryReimburseDetail(localStorage.getItem("userID"),this.reimburseId).then(res => {
            if(res.data.code == 200){
              this.ReimbursementDetail = res.data.data;
              this.ReimbursementDetail.dtlList = res.data.data.dtlList;
              if(this.ReimbursementDetail.dtlList!=undefined && this.ReimbursementDetail.dtlList.length>0){
                for(let i=0;i<this.ReimbursementDetail.dtlList.length;i++){
                  this.ReimbursementDetail.dtlList[i].invoices = [];
                  this.ReimbursementDetail.price+=this.ReimbursementDetail.dtlList[i].price/1000;
                  this.ReimbursementDetail.dtlList[i].price = this.ReimbursementDetail.dtlList[i].price/1000;
                  if(this.ReimbursementDetail.dtlList[i].invoiceList!=null && this.ReimbursementDetail.dtlList[i].invoiceList.length>0){
                      for(let j=0;j<this.ReimbursementDetail.dtlList[i].invoiceList.length;j++){
                        this.ReimbursementDetail.dtlList[i].invoices.push(this.ReimbursementDetail.dtlList[i].invoiceList[j].invoiceId);
                        this.CauseInformation.invoiceList.push(this.ReimbursementDetail.dtlList[i].invoiceList[j]);
                      }
                  }
                }
                if(this.CauseInformation.invoiceList!=undefined){
                  this.invoiceCount = this.CauseInformation.invoiceList.length;
                }else{
                  this.invoiceCount = 0;
                }
              }
              this.ReimbursementDetail.cause = res.data.data.cause;
              this.causeValue = res.data.data.cause;
              if(res.data.data.remark!=null && res.data.data.remark!=''){
                this.conterNum = res.data.data.cause.length;
              }
            }else{
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          },res => {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          })
        }
        if(this.$route.params.idArr!=undefined){
          this.CauseInformation.invoiceList = this.$route.params.idArr;
          if(localStorage.getItem('oldInvoiceList')!=undefined && localStorage.getItem('oldInvoiceList')!="undefined"){
            this.oldInvoiceList=JSON.parse(localStorage.getItem('oldInvoiceList'));
            if(this.CauseInformation.invoiceList.length!=this.oldInvoiceList.length){
              this.mingxiList();
            }else{
              let Array1 = [];
              let Array2 = [];
              for(let i=0;i<this.oldInvoiceList.length;i++){
                Array1.push(this.oldInvoiceList[i].id);
                Array2.push(this.CauseInformation.invoiceList[i].id);
              }
              if(Array1.sort().toString() === Array2.sort().toString()){
                this.getoldInfo();
              }else{
                this.mingxiList();
              }
            }
          }else{
            this.mingxiList();
          }
        }else{
          if(localStorage.getItem('tabList')!=undefined){
            this.CauseInformation.invoiceList=JSON.parse(localStorage.getItem('tabList'));
          }
        }
        if(this.CauseInformation.invoiceList!=undefined){
            this.invoiceCount = this.CauseInformation.invoiceList.length;
          }else{
            this.invoiceCount = 0;
          }
        if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
          this.ReimbursementDetail.companyId = localStorage.getItem("companyId")
        }else{
          this.ReimbursementDetail.companyId = "";
        }
      },
      getoldInfo(){
        if(this.$route.params.causeValue!=undefined && this.$route.params.causeValue!=""){
          this.causeValue = this.$route.params.causeValue;
          this.ReimbursementDetail.cause = this.$route.params.causeValue;
        }if(this.$route.params.dtlList!=undefined){
          if(this.$route.params.dtlList.length>0){
            this.ReimbursementDetail.dtlList = this.$route.params.dtlList;
            for(let i=0;i<this.ReimbursementDetail.dtlList.length;i++){
                if(this.ReimbursementDetail.dtlList[i].categoryId!=undefined && this.ReimbursementDetail.dtlList[i].categoryId!="undefined"){
                    this.getoldInfoShow = true;
                }
            }
          }
        }
        if(this.$route.params.price!=undefined && this.$route.params.price!=""){
          this.ReimbursementDetail.price = this.$route.params.price;
        }
        if(this.$route.params.tabList!=undefined){
          if(this.$route.params.tabList.length>0){
            this.CauseInformation.invoiceList = this.$route.params.tabList;
            this.invoiceCount = this.CauseInformation.invoiceList.length;
          }
        }
      },
      mingxiList(){
        //获取所选发票整合明细列表信息
       //查询子科目时候传入父科目的编码
        this.CauseInformation.itemCode = localStorage.getItem('mainSubjectId');
        let self = this;
        let reg = /^\d+(\.\d{0,2})?$/;
        initAddReimburse(localStorage.getItem("userID"),this.CauseInformation).then(res => {
          if(res.data.code == 200){
            if(res.data.data!=undefined){
                if(res.data.data.length>0){
                  this.ReimbursementDetail.dtlList = res.data.data;
                    for(let i=0;i<this.ReimbursementDetail.dtlList.length;i++){
                      if(self.ReimbursementDetail.dtlList[i].price!="") {
                        if (reg.test(self.ReimbursementDetail.dtlList[i].price)) {
                          if (self.ReimbursementDetail.dtlList[i].price == "") {
                            self.ReimbursementDetail.price = parseFloat(this.ReimbursementDetail.price);
                          } else {
                            self.ReimbursementDetail.dtlList[i].price = parseFloat(self.ReimbursementDetail.dtlList[i].price/1000).toFixed(2);
                            self.ReimbursementDetail.price = Number(parseFloat(self.ReimbursementDetail.price) + parseFloat(self.ReimbursementDetail.dtlList[i].price)).toFixed(2);
                          }
                        }
                      }
                  }
                }else{
                  for(let i=0;i<this.CauseInformation.invoiceList.length;i++){
                    this.ReimbursementDetail.dtlList[0].invoices.push(this.CauseInformation.invoiceList[i].id);
                  }
                }
            }else{
              for(let i=0;i<this.CauseInformation.invoiceList.length;i++){
                this.ReimbursementDetail.dtlList[0].invoices.push(this.CauseInformation.invoiceList[i].id);
              }
            }
          }else{
            self.error_prompt = "tel-message1";
            self.content = res.data.msg;
          }
        })
      },
      //查询所选发票
      toChooseInvoicePage(){
        localStorage.setItem('oldInvoiceList',JSON.stringify(this.CauseInformation.invoiceList));
        this.$router.push({name:'chooseInvoice',params:{tabList:this.CauseInformation.invoiceList,causeValue:this.causeValue,price:this.ReimbursementDetail.price,dtlList:this.ReimbursementDetail.dtlList}});
      },
      //选择费用归属
      toCostattribution(){
        this.$router.push({name:"costattribution",params:{tabList:this.CauseInformation.invoiceList,checkedName:this.ReimbursementDetail.assetCenterName,causeValue:this.causeValue,price:this.ReimbursementDetail.price,dtlList:this.ReimbursementDetail.dtlList}})
      },
      //添加新的明细
      addMingXi(){
        let arrs = this.ReimbursementDetail.dtlList;
        let flag = true;
        if(this.cosTtype!=undefined && this.cosTtype.length>0){
          for(let i=0;i<arrs.length;i++){
           if(arrs[i].categoryId == '' || arrs[i].categoryId == null || arrs[i].categoryId == undefined || arrs[i].price == "") {
           this.error_prompt = "tel-message1";//失焦不弹出弹框
           this.content = "请填写已有报销明细";
           window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
           document.getElementById('error_bxMingxi').style.color = '#fff';
           flag = false;
           }
           }
        }else{
          for(let i=0;i<arrs.length;i++){
           if(arrs[i].price == "") {
           this.error_prompt = "tel-message1";//失焦不弹出弹框
           this.content = "请填写已有报销明细";
           window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
           document.getElementById('error_bxMingxi').style.color = '#fff';
           flag = false;
           }
           }
        }
        if(flag){
          this.addMxList();
        }
      },
      //添加新的明细
      addMxList(){
          if(this.cosTtype.length>0){
            this.$set(this.ReimbursementDetail.dtlList,this.ReimbursementDetail.dtlList.length,{remark:"",categoryId:"",categoryName:"",price:""});
          }else{
            this.$set(this.ReimbursementDetail.dtlList,this.ReimbursementDetail.dtlList.length,{remark:"",price:""});
          }

      },
      //删除明细
      deleteMingxi(index){
        this.MxTitleCount = index+1;
        this.typeName = this.ReimbursementDetail.dtlList[index].categoryName;
        this.deteleMx = true;
      },
      write(index) {
        let self = this;
        if (self.chnIpt == false) {
          if(index!=undefined){
            self.ReimbursementDetail.dtlList[index].remark = self.ReimbursementDetail.dtlList[index].remark.replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, "");
          }else{
            self.conterNum = self.ReimbursementDetail.cause.length;
          }
        }
      },
      onlyNumber(obj,index) {
        let self = this;
        if (self.chnIpt == false) {
          //只能输入两个小数
          self.ReimbursementDetail.dtlList[index].price = self.ReimbursementDetail.dtlList[index].price.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
          this.ReimbursementDetail.price = '0.00'
          let reg = /^\d+(\.\d{0,2})?$/;
          for(let i=0;i<this.ReimbursementDetail.dtlList.length;i++){
            if(self.ReimbursementDetail.dtlList[i].price!=""){
              if(reg.test(self.ReimbursementDetail.dtlList[i].price)){
                if(self.ReimbursementDetail.dtlList[i].price == ""){
                  this.ReimbursementDetail.price=parseFloat(this.ReimbursementDetail.price);
                }else{
                  this.ReimbursementDetail.price=Number(parseFloat(this.ReimbursementDetail.price)+parseFloat(self.ReimbursementDetail.dtlList[i].price)).toFixed(2);
                }

              }else{
                self.ReimbursementDetail.dtlList[i].price = ""
                this.error_prompt = "tel-message1";//失焦不弹出弹框
                this.content = "请输入数字格式,最多两位小数";
                window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                document.getElementById('error_bxMingxi').style.color = '#fff';
              }
            }
          }
        }
      },
      importStart() {
        this.chnIpt = true;
      },
      importEnd(index) {
        this.chnIpt = false;
        this.write(index);
      },
      handleInput2(e) {
        // 通过正则过滤小数点后两位
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
      },
      //根据主科目查询子科目公用
      childSubject(){
        //初始化查询主科目code值是否有值
        this.CauseInformation.itemCode = localStorage.getItem('mainSubjectId');
        queryReimburseItemPage(localStorage.getItem("userID"),this.CauseInformation).then(res =>{
          if(res.data.code == 200){
            if(res.data.data.records!=undefined && res.data.data.records!=null && res.data.data.records.length>0){
                this.cosTtype = res.data.data.records;
                this.Mtype = true;
            }else{
                this.Mtype = false;
            }
          }
        });
      },
      CauseDetailed(index,typeN){
        this.mingXiCheck = index;
       /* this.CauseInformation.parentCode = this.ReimbursementDetail.dtlList[index].id;*/
        this.CostTypeShow = true;
      },
      //弹框点击隐藏
      CauseMaskHide(){
        this.CauseMask = false;
        this.wrapH = "scroll";
        this.CauseBtnShow = true;
        this.editMoveUp = "height1";
      },
      CauseMaskGb(){
        this.wrapH = "scroll";
        this.CauseMask=false;
        this.CauseBtnShow = true;
        this.editMoveUp = "height1";
        this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName = "";
      },
      cpmP(){
        if((this.currencyE + this.notcurrencyP) < this.ReimbursementDetail.price){
          this.error_prompt = "tel-message1";
          this.content = "报销额度不足";
        }else{
          this.wrapH = "scroll";
          this.CauseMask=false;
          this.CauseBtnShow = true;
          if(this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName == ""||this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName == null){
            if(this.checkCir == require("../../assets/img/check.png")){
              this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName = this.currencyT;
            }else{
              this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName = this.currencyName;
            }
          }else if(this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName == "通用报销"){
            if(this.checkCir == require("../../assets/img/check.png")){
              this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName = this.currencyT;
            }else{
              this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName = this.currencyName;
            }
          }
        }
      },
      //取消删除明细
      cancle(){
        this.deteleMx = false;
      },
      //确认删除明细
      delMxRequire(){
        if(this.ReimbursementDetail.dtlList.length>1){
            if(this.ReimbursementDetail.dtlList[this.MxTitleCount-1].invoices!=undefined && this.ReimbursementDetail.dtlList[this.MxTitleCount-1].invoices.length>0){
                for(let i=0;i<this.ReimbursementDetail.dtlList[this.MxTitleCount-1].invoices.length;i++){
                  for(let j=0;j<this.CauseInformation.invoiceList.length;j++){
                    if(this.ReimbursementDetail.dtlList[this.MxTitleCount-1].invoices[i] == this.CauseInformation.invoiceList[j].id){
                      this.CauseInformation.invoiceList.splice(j,1);
                    }
                  }
                }
            }
          this.ReimbursementDetail.dtlList.splice(this.MxTitleCount-1,1);
          if(this.mingXiCheck>=1){
            this.mingXiCheck = this.mingXiCheck-1;
          }
        }
        this.invoiceCount = this.CauseInformation.invoiceList.length;
        this.deteleMx = false;
      },
      //确认添加报销单
      InitiateBx(){
        this.ReimbursementDetail.categoryId = localStorage.getItem('mainSubjectId');
        this.ReimbursementDetail.categoryName = localStorage.getItem('mainSubjectName');
        this.ReimbursementDetail.cause = this.causeValue;
        if(this.ReimbursementDetail.cause==""){
          this.error_prompt = "tel-message1";
          this.content = "请填写报销事由";
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          document.getElementById('error_bxMingxi').style.color = '#fff';
          this.$refs.FqBxBtn.style.opacity = 0.3;
          return false;
        }else if(this.ReimbursementDetail.assetCenterName==''){
          this.error_prompt = "tel-message1";
          this.content = "请选择费用归属";
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          document.getElementById('error_bxMingxi').style.color = '#fff';
          this.$refs.FqBxBtn.style.opacity = 0.3;
          return false;
        }
        if(this.$refs.FqBxBtn.style.opacity == 1){
          for(let i=0;i<this.ReimbursementDetail.dtlList.length;i++){
              this.ReimbursementDetail.dtlList[i].orderCode = i+1;
            if(this.ReimbursementDetail.cause == "" || this.ReimbursementDetail.cause == undefined || this.ReimbursementDetail.cause == undefined){
              this.error_prompt="tel-message1";//失焦不弹出弹框
              this.content = "请填写报销事由";
              window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
              document.getElementById('error_bxMingxi').style.color = '#fff';
              return false;
            }else{
                if(this.cosTtype.length>0){
                if(this.ReimbursementDetail.dtlList[i].categoryName == "" || this.ReimbursementDetail.dtlList[i].categoryId == "" || this.ReimbursementDetail.dtlList[i].price == ""){
                    this.error_prompt="tel-message1";//失焦不弹出弹框
                    this.content = "请填写已有报销明细";
                    window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                    document.getElementById('error_bxMingxi').style.color = '#fff';
                    return false;
                  }
                }
              var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
              if(!reg.test(this.ReimbursementDetail.dtlList[i].price)) {
                this.error_prompt = "tel-message1";
                this.content = "您输入的金额格式有误";
                window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                document.getElementById('error_bxMingxi').style.color = '#fff';
                return false;
              }
            }
          }
          this.$refs.FqBxBtn.style.opacity = 0.3;
          if(this.reimburseId!=undefined && this.reimburseId!='undefined' && this.reimburseId!=null && this.reimburseId!='null' && this.reimburseId!=''){
            this.ReimbursementDetail.id = this.reimburseId;
            reAddReimburse(localStorage.getItem("userID"), this.ReimbursementDetail).then(res => {
              if(res.data.code == 200){
                localStorage.setItem('reimburseId',"");
                this.$router.push({name:'addministration',param:{status:"unapproved"}});
              }else if(res.data.code == 2 || res.data.code == '2'){
                let returnDataList = res.data.data.coupons;
                let subSubject = '';
                if(returnDataList!=undefined && returnDataList.length>0){
                  for(let i=0;i<returnDataList.length;i++){
                    if(returnDataList[i].state == '0' || returnDataList[i].state == 0){
                      if(subSubject == ''){
                        subSubject = returnDataList[i].busiItemCode;
                      }else{
                        subSubject = subSubject + ',' + returnDataList[i].busiItemCode;
                      }
                    }
                  }
                }
                if(subSubject!=''){
                  this.error_prompt = "tel-message1";
                  this.content =subSubject+'消费券额度不足';
                  window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                  document.getElementById('error_bxMingxi').style.color = '#fff';
                  this.$refs.FqBxBtn.style.opacity = 1;
                }
              }else{
                this.error_prompt = "tel-message1";
                this.content = res.data.msg;
                window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                document.getElementById('error_bxMingxi').style.color = '#fff';
                this.$refs.FqBxBtn.style.opacity = 1;
              }
            },res => {
              this.error_prompt = "tel-message1";
              this.content = res.data.msg;
              window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
              document.getElementById('error_bxMingxi').style.color = '#fff';
              this.$refs.FqBxBtn.style.opacity = 1;
            })
          }else{
            addReimbursement(localStorage.getItem("userID"), this.ReimbursementDetail).then(res => {
              if(res.data.code == 200){
                this.$router.push({name:'addministration',param:{status:"unapproved"}});
              }else if(res.data.code == 2 || res.data.code == '2'){
                let returnDataList = res.data.data.coupons;
                let subSubject = '';
                if(returnDataList!=undefined && returnDataList.length>0){
                  for(let i=0;i<returnDataList.length;i++){
                    if(returnDataList[i].state == '0' || returnDataList[i].state == 0){
                        if(subSubject == ''){
                          subSubject = returnDataList[i].busiItemCode;
                        }else{
                          subSubject = subSubject + ',' + returnDataList[i].busiItemCode;
                        }
                    }
                  }
                }
                if(subSubject!=''){
                  this.error_prompt = "tel-message1";
                  this.content =subSubject+'消费券额度不足';
                  window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                  document.getElementById('error_bxMingxi').style.color = '#fff';
                  this.$refs.FqBxBtn.style.opacity = 1;
                }
              }else{
                this.error_prompt = "tel-message1";
                this.content = res.data.msg;
                window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
                document.getElementById('error_bxMingxi').style.color = '#fff';
                this.$refs.FqBxBtn.style.opacity = 1;
              }
            },res => {
              this.error_prompt = "tel-message1";
              this.content = res.data.msg;
              window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
              document.getElementById('error_bxMingxi').style.color = '#fff';
              this.$refs.FqBxBtn.style.opacity = 1;
            })
          }
        }
      },
      //费用类型选择事件
      typeCheck(subscript,name){
        this.costTypeName = name;
        this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryName = this.cosTtype[subscript].name;
        this.ReimbursementDetail.dtlList[this.mingXiCheck].categoryId = this.cosTtype[subscript].id;
      },
      closeType(){
        this.CostTypeShow = false;
      },
    },
    mounted () {
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      });
    },
    created(){
      this.childSubject();
      this.$root.$data.vBack=false;
      if(this.$route.params.checkedName!=undefined && this.$route.params.checkedName!="undefined"){
        this.ReimbursementDetail.assetCenterName = this.$route.params.checkedName;
        this.ReimbursementDetail.assetCenterId = this.$route.params.checkedId;
        this.ReimbursementDetail.assetCenterCompany = this.$route.params.targetName;
        localStorage.setItem('checkedName',this.ReimbursementDetail.assetCenterName);
        localStorage.setItem('checkedId',this.ReimbursementDetail.assetCenterId);
        localStorage.setItem('targetName',this.ReimbursementDetail.assetCenterCompany);
        this.getoldInfo();
      }/*else{
        if(localStorage.getItem('checkedName')!=undefined && localStorage.getItem('checkedName')!='undefined'){
          this.ReimbursementDetail.assetCenterName=localStorage.getItem('checkedName');
          this.ReimbursementDetail.assetCenterId=localStorage.getItem('checkedId');
          this.ReimbursementDetail.assetCenterCompany=localStorage.getItem('targetName');
        }
      }*/

      this.init();
    },
    watch:{
      causeValue(newValue,oldValue){
        oldValue = oldValue.trim();
        newValue = newValue.replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, "");
        if(newValue!=undefined && newValue!=null && newValue!=""){
          if(newValue.length == 200){
            this.$refs.SyNum.style.color = 'red';
            this.ReimbursementDetail.cause = newValue;
            this.conterNum = newValue.length
          }else if(newValue.length > 200){
            this.$refs.SyNum.style.color = 'red'
            this.ReimbursementDetail.cause = oldValue;
            this.conterNum = oldValue.length
          }else{
            this.$refs.SyNum.style.color = '#BBB7B7';
            this.ReimbursementDetail.cause = newValue
            this.conterNum = newValue.length
          }
          this.$refs.FqBxBtn.style.opacity = 1
        }else{
          this.conterNum = newValue.length
          this.$refs.FqBxBtn.style.opacity = 0.3
        }
      }
    }
  }
</script>
<style scoped>
  .Cause{
    transition:transform 10ms;
  }
  /*发票右下角数字显示*/
  .Cause .Cause-p-fill{
    width:33%;
    position:relative;
  }
  .Cause .Cause-p-fill p{
    position:absolute;
    bottom:0.6666666rem;
    right:0;
    width:1.3333rem;
    height:1.33333rem;
    line-height:1.33333rem;
    border-radius:50%;

  }
  /*.editTransf{
    transform:translateY(-11.5rem);
  }
  .causeTransf{
    transform:translateY(-17.5rem);
  }*/
  .Cause .captcha .captcha_img{
    width: 0.833333333rem;
  }
  .Cause .zz .wrapcenter_tips {
    width: 24.5rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .Cause .zz .wrapcenter_tips .section_top {
    width: 88%;
    padding: 9px 6%;
    height: 3.9rem;
    /* line-height: 1.9rem;    3.9*/
    font-weight: bold;
    border-bottom: solid 0.083rem #DDDDDD;
  }
  .Cause .BigPicture{
    /*z-index: 2147483647;
    background: #333;
    opacity: 1;*/
  }
  .pst-rlt .BigPicture{
    z-index: 10;
  }
  .pst-rlt .BigPicture .BigImage .pst-abs{
    position: relative;
  }
  .pst-rlt .BigPicture .BigImage{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 99999999;
    overflow: auto;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .Cause .Cause-conter .Cause-c-top .page-tab {
    overflow-y: hidden;
    white-space: nowrap;
    justify-content: center;
    padding-top: 0.5rem;
  }
  .Cause .Cause-conter .Cause-c-top .page-tab img{
    box-sizing: border-box;
    width:100%;
    height: 7rem;
    margin-left: .5rem;
    display: initial;
  }
  .Cause .trans1{/*错误弹框*/
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
    transition:opacity 0s;
  }
  .tel-mess .tel-message1{/*错误弹框*/
    width: 60%;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 0.4rem;
    text-align: center;
    position: fixed;/*写成固定定位解决报销单明细错误提示总在上面的问题  top值写成25rem*/
    top: 35%;
    left: 20%;
    opacity: .7;
    transition:opacity 0s;
    z-index:9999;
  }
  .Cause .Cause-c-main .Cause-c-main-font img{
    width:0.41666666rem;
    height:0.75rem;
  }
  .Cause .Cause-c-main .Cause-c-main-p span:nth-of-type(-n+2){
    line-height:3.0833333rem;
    /*right:1.75rem;*/
    /*top:50%;*/
    /*transform:translateY(-50%);*/
  }
 /* .Cause .Cause-c-main .Cause-c-main-font span:nth-of-type(2){
    margin-right:1rem;
  }*/
  .Cause .Cause-c-main .Cause-c-main-main span:last-of-type{
    margin-right:1rem;
    right:0;
  }
  .Cause .Cause-c-main .Cause-c-main-p,.Cause-Detailed .Cause-Detailed-title{
    height: 3.0833333rem ;
  }
  .Cause .Cause-c-main .Cause-c-main-font,
  .Cause .Cause-c-main .Cause-c-main-text,
  /*.Cause .Cause-Detailed .Cause-Detailed-title,*/
  .Cause .Cause-Detailed .Cause-Detailed-lable,
  .Cause-c-Remarks .Cause-c-Remarks-mar,
  .Cause-footB .Cause-footB-l{
    margin: 0 1.0833333rem;
  }
  .Cause .Cause-c-main .Cause-c-main-height{
    line-height:3.0833333rem;
  }
  .Cause .Cause-c-main .Cause-c-main-font span:last-of-type{
    right:0;
  }
  .Cause-footB .Cause-footB-l{
    text-indent:0.3rem;
  }
  .Cause .Cause-Detailed .Cause-Detailed-title{
    padding: 0 1.0833333rem;
  }
  .Cause .Cause-c-main{
    margin:0.6666667rem 0 0;
  }
  .Cause .Cause-c-main .Cause-numb{
    margin-top:0.8rem;
  }
  .Cause .Cause-c-main .Cause-numb .Cause-numb-p{
    padding: 0 0 0.5rem 0;
    font-size: 1rem;
  }
  /*报销明细*/
  .Cause-Detailed .Cause-Detailed-lable .Cause-ipt{
    height: 3.6666667rem;
    border-bottom:solid 1px #E5E5E5;
  }
  .Cause-Detailed .Cause-Detailed-lable .rowHeight{
    height: 3.6666667rem;
    line-height: 3.6666667rem;
  }
  .Cause-Detailed .Cause-Detailed-lable .Cause-sp3{
    line-height:3.8rem;
      font-size:0.9166666rem;
  }
  /*.Cause-Detailed .Cause-Detailed-lable .Cause-ipt p{*/
    /*height: 3.6666667rem;*/
    /*line-height: 3.6666667rem;*/
  /*}*/
  .Cause-Detailed .Cause-Detailed-lable .Cause-ipt .reimbRight{
      right:0.083333rem;
      top:50%;
    transform:translateY(-50%);
  }
  .Cause-Detailed .Cause-Detailed-lable .Cause-ipt p:nth-of-type(2){
   /* margin-right:2rem;*/
  }
  .Cause-Detailed .Cause-Detailed-lable .Cause-ipt p span{
    height:0.75rem;
    right:1.75rem;
    top:50%;
    transform:translateY(-50%);
  }
  .Cause-Detailed .Cause-Detailed-lable .rightImgSize{
    width:0.41666666rem;
    height:0.75rem;
  }
    /*    *符号   */
  .Cause-ipt-c{
    padding-right: 0.8rem;
  }
  /*填写报销备注*/
  .Cause-Detailed-lable .Cause-ipt .Cause-ipt-icon{
    width: 1rem;
    padding-top: 1.6rem;
  }
  /*底部小图标*/
  .Cause-conter .Cause-add{
    margin-bottom: 20rem;
    margin-top: 1.3333rem;
    padding:0.8rem 0;
    background:#fff;
    /*margin:1.5333333rem 0 5rem;*/
  }
  .Cause-conter .Cause-add .Cause-add-img{
    width: 2rem;
    padding-left: 40%;

  }
  .Cause-conter .Cause-add .Cause-add-img{
    width:1.083333rem;
    height:1.083333rem;
    transform:translateY(33%);
    line-height: 2rem;
    margin-right: 0.5rem;
  }
  /*底部*/
  .Cause-conter .Cause-footB{
    position: absolute;
    bottom: 0;
  }
  .causerWarp #CauseBtnShowClick{
    box-shadow:0 1px 1px 1px rgb(232,234,240);
    height:6.8%;
  }
  /*.Cause-footB .Cause-footB-r{*/
    /*padding: 0.5rem 0;*/
    /*margin: 0.5rem 1.083333333rem;*/
  /*}*/
  .Cause-footB .Cause-footB-r .Reelection{
    padding: 0.5666667rem 1.583333rem;
    border-radius: 0.4rem;
    margin-right: 0.5rem;
    opacity:.7;
    border:1px solid #e5e5e5;
  }
  .Cause-footB .Cause-footB-r{
    width:9.0833333rem;
    height:100%;
    line-height:3.75rem;
    font-size:1.4166666rem;
    /*padding: 0.5666667rem 1.583333rem;
    border-radius: 4px;
    line-height: 1.7rem;*/
    background: #FFA436;
    /*opacity: .3;*/
  }
  .Cause-mask{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    z-index: 6666;
  }
  .Cause-mask .Cause-mask-overF{
    overflow: scroll;
    margin-top: 5.12rem;
    /*padding-top: 13%;*/
   /* height: 25rem;
    margin-bottom: 4rem;*/
  }
  .Cause-mask .Cause-mask-overF .firstD{
    width:25%;
  }
  .Cause-mask .Cause-mask-overF .secondD{
    width:70%;
  }
  /*通用报销*/
  .Cause-mask .Cause-mask-overF .currencyReim{
      height:4rem;
    margin-top:0.4rem;
    margin-bottom:0.5rem;
      padding:1rem 0;
  }
  .Cause-mask .Cause-mask-overF .margin_lt{
    margin-left:1.08333rem;
  }
  .Cause-mask .Cause-mask-overF .currencyReim div:nth-of-type(1){
    margin-bottom:0.3rem;
  }
  .Cause-mask .Cause-mask-overF .currencyReim_img{
    right:2rem;
    top:50%;
    transform:translateY(-50%);
  }
  .Cause-mask .Cause-mask-overF  img{
    width:1.66667rem;
    height:1.66667rem;
  }
  .Cause-mask .Cause-mask-overF .Not_currencyReim .mar_left{
    height:4.083333rem;
    line-height:4.083333rem;
    margin-left:1.0833333rem;
    border-bottom:solid 1px #E5E5E5;
  }
  .Cause-mask .Cause-mask-overF .Not_currencyReim section:last-of-type{
    border-bottom:none;
  }
  .Cause-mask .Cause-mask-title{
    position: absolute;
    left: 0;
    /*bottom: 0;*/
    font-size: 1.5rem;
    /*top: 42.5%;*/
    height:57.5%;
  }
  .Cause-mask .Cause-mask-title .Cause-m-t-span{
    position: absolute;
    line-height: 4rem;
    height: 13%;
    width: 100%;
  }
  .Cause-mask .Cause-mask-title .Cause-m-t-span .Cause-m-t-margin{
    margin:0 1.3333333rem;
    padding-top: 1%;
  }
  .Cause-mask .Cause-mask-title .Cause-m-t-span .Cause-m-t-margin span:last-of-type{
    margin-left:5rem;
  }
  .Cause-mask .Cause-mask-title .Cause-m-t-span .Cause-m-t-margin .Cause-m-t-m-f{
    font-size: 2rem;
  }
  .Cause-mask .Cause-mask-title .Cause-m-t-span .Cause-m-t-margin .Cause-m-t-m-s{
    font-size: 1.5rem;
    padding-left:27%;
  }
  .Cause-mask-title .Cause-mask-main .Cause-mask-m .Cause-bQ{
    white-space: nowrap;
    line-height: 2.5rem;
    width: 6rem;
    height: 2.5rem;
    margin: 0 0.54156rem 0.666667rem;
  }
  .Cause-mask-title .Cause-mask-main .Cause-mask-m .Cause-bQ1{
    background: RGB(251,219,183);
    white-space: nowrap;
    line-height: 2.5rem;
    width: 6rem;
    height: 2.5rem;
    margin: 0 0.54156rem 0.666667rem;
    color: #EB7B03;
  }
  .Cause-mask-title .Cause-mask-main .Cause-mask-m{
    margin: 0 0.8rem;
  }
  .Cause-mask-title .Cause-mask-main .Cause-mask-m .Cause-mask-m-p{
    line-height: 3.416rem;
  }
  .Cause .Cause-Detailed .Cause-numb .Cause-numb-p{
    padding: 0 1.5rem 0.5rem 0;
  }
  .Cause .Cause-Detailed .Cause-c-main-text{
    margin: 0 1.0833333rem;
  }
  .Cause .Cause-c-main-text .limit_num{
    margin:1rem 0;
  }
  .Cause .Cause-Detailed .Cause-c-main-text .cause_remark{
      margin-top:0.8rem;
    margin-bottom:0.4rem;
  }
  .Cause .Cause-c-main-text .textHeight{
    height: 6rem;
    overflow-y: scroll;
    font-size: 1.1666666rem;
    line-height: 1.5rem;
    padding-top: 0.2rem;
    color: #2A2E2E;
  }
  .Cause .Cause-c-main-text .text_height{
    font-size: 1.1666666rem;
    margin:0.416rem 0;
    line-height: 1.5rem;
    color: #2A2E2E;
    height:5rem;
    overflow-y: scroll;
  }
  .Cause #error_bxMingxi{
    display: block!important;
    margin-top: 26rem;
  }
  .height1{
    height: 93.2%;
  }
  .causerWarp .cause_costT{
    left:0;
    bottom:0;
    z-index: 888;
  }
  .causerWarp .cause_costT .costT_title{
    height:3.75rem;
  }
  .causerWarp .cause_costT .costT_title p{
    line-height:3.75rem;
  }
  .causerWarp .cause_costT .costT_title .pWidth{
    width:30%;
    margin-top: 1.125rem;
  }
  .causerWarp .cause_costT ul li p{
    right:2.7rem;
    top:50%;
    transform: translateY(-50%);
    z-index:999;
  }
  .causerWarp .cause_costT ul li img{
    width: 1.16666rem;
    height: 0.833333rem;
  }
  .causerWarp .cause_costT .costT_title p:first-of-type img{
    margin-left:2rem;
  }
  .causerWarp .cause_costT .costT_title p:nth-of-type(2){
    width:40%;
  }
  .causerWarp .cause_costT .costT_title p:last-of-type img{
    margin-left:5rem;
  }
  .causerWarp .cause_costT .costT_title img{
    width:1.5rem;
    height:1.5rem;
  }
  .causerWarp .cause_costT li{
    height:3.75rem;
    line-height:3.75rem;
    text-indent:2rem;
  }
  .causerWarp .cause_costT li:last-of-type{
    border:none;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .Cause-mask .Cause-mask-title .Cause-m-t-span .Cause-m-t-margin {
      margin: 0 1.3333333rem;
    }
    .Cause-mask .Cause-mask-title .Cause-m-t-span{
      line-height: 3.5rem;
      height: 3.5rem;
    }
    .Cause-mask .Cause-mask-overF{
      margin-top:4.5rem;
    }
    .Cause-mask-title .Cause-mask-main .Cause-mask-m .Cause-mask-m-p {
      line-height: 3rem;
    }
    .Cause-mask-title .Cause-mask-main .Cause-mask-m .Cause-bQ{
      margin: 0 0.54156rem 0.666667rem;
      line-height: 2.5rem;
      height: 2.5rem;
    }
    .Cause-mask-title .Cause-mask-main .Cause-mask-m .Cause-bQ1{
      width: 6rem;
    }
  }
  @media screen and (max-width:768px)and (min-width: 450px){

  }
</style>

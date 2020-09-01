<template><!--券购买-->
    <div class="mPurchase QPurchase bg-f6 width height fl">
      <div class="mPurchase-ht overflow-s">
        <div class="mP-tips font-F89 font-108" v-show="mPTips">
          <p class="four_father">当前购买金额未满足最低开票金额，无法立即开票。</p>
          <p class="four_father">可购买成功后在账单页与其他消费券合并开票。</p>
        </div>
        <div class="mG-top bd-btm bg-ff fl width">
          <div class="QPurchase-t-img fl">
            <img class="Market-Coupon-img" v-if="this.type=='通信券'" src="../../assets/image/c/img_Communicate240-144.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='电商券'" src="../../assets/image/c/img_electricity240-144.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='通用券'" src="../../assets/image/c/img_General240-144.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='办公券'" src="../../assets/image/c/img_office240-144.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='服务券'" src="../../assets/image/c/img_service240-144.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='旅游券'" src="../../assets/image/c/img_Trave240-144.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='咨询券'" src="../../assets/image/c/img_consultation_240_144@2x.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='信息券'" src="../../assets/image/c/img_information_240_144@2x.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='培训券'" src="../../assets/image/c/img_train240_144.png"/>
              <img class="Market-Coupon-img" v-if="this.type=='福利券'" src="../../assets/image/c/img_welfare240_144.png"/>
          </div>
          <div class="QPurchase-t-font fl" style="padding: 2.2rem 0px 1.35rem;width: 50%;">
            <p class="font-133 font-b">{{this.parameter.couponName}}</p>
            <div class="font-167 font-ipt pd05 fl width ellipsis_name"  style="height: 1rem;">{{businessNameList|strSub}}</div>
          </div>
        </div>
        <div class="bg-ff fl width">
          <div class="QPurchase-s">
            <div class="fl width font-125 height-4083">
              <div class=" fl">购买金额（元）</div>
              <!--<div class="fr four_father" ref="purchaseN">4545</div>--><!--之后放开-->
              <div  class="cont-r mG-rit183" v-text="purchaseN"></div><!--暂时这样写之后去掉-->
            </div>
          </div>
        </div>
        <div class="fl font-125 bg-ff height-375 mG-top width" v-show="items.length!=0">
          <div class="QPurchase-btm-title bd-btm">开票选择</div>
          <div id="example">
            <div class="check-area">
              <ul class="pst-rlt">
                <li class="border-1px" v-for="(item,index) in items" @click="setCheckV(item.id)">
                  <input class="self-radio" type="radio"
                         :id="'radio-'+item.id"
                         :data-id="'food-'+item.id" name="radio"
                         :checked="index==0"
                         :value="item.value"
                         v-model="checkValue">
                  <label :for="'radio-'+item.id" @click="setCheckValue(item)"></label>
                  <span>{{item.value}}</span>
                </li>
                <div class="mPIcon pst-abs font-F89" v-if="this.purchaseN < this.invoiceAmountMin || !this.flag || this.flag=='false'">
                  <img src="../../assets/image/c/34px.png" />
                </div>
                <!--一期没有返券  之后再加上-->
                <!--<div class="pst-abs btm-0 font-F89" style="left: 8rem;">（享受返券)</div>-->
              </ul>
            </div>
          </div>
        </div>
        <div class="QPurchase-btm mG-top fl bg-ff width font-125" v-show="Unwanted">
          <div class="fl width bd-btm">
            <div class="fl four_father">发票类型</div>
            <div class="fl font-1 height-141 QPurchase-s">
              <div v-show="dianZ" @click="clickType" :class="this.flag3 == false || this.flag3 == 'false'?'mPurchase-pad':'mPurchase-pad1'" v-model="aaa" ref="clickTypes" class="fl QPurchase-m-type cont font-3b9 bRadius-3">
                <div>电子发票</div>
                <div class="font-0083">免费</div>
              </div>
              <div v-show="dianZ1" @click="clickType1" :class="((this.flag3 == false || this.flag3 == 'false')&&(this.flag1 != false || this.flag1 !='false'))?'mPurchase-pad1':'mPurchase-pad'" ref="clickTypes1" class="fl QPurchase-m-type1 cont font-7b7 bRadius-3">
                <div>纸质普票</div>
                <div class="font-0083">快递¥{{Postage}}</div>
              </div>
              <div v-show="dianZ2" @click="clickType2" :class="((this.flag3 == false || this.flag3 == 'false')&&(this.flag1 == false || this.flag1 =='false')) ?'mPurchase-pad1':'mPurchase-pad'" ref="clickTypes2" class="fl QPurchase-m-type1 cont font-7b7 bRadius-3">
                <div>纸质专票</div>
                <div class="font-0083">快递¥{{Postage}}</div>
              </div>
            </div>
          </div>
          <div class="fl mP-right mpContentList" v-if="" @click="mpContent" v-show="invoiceCot">
            <div class="fl four_father">发票内容</div>
            <div class="fr font-108 ellipsis_name_2" style="width: 43%;line-height: 1.5rem;padding-top: 0.6rem;" @blur="jySYS('发票内容',nowContent)" >{{nowContent}}</div>
          </div>
        </div>

        <div class="Draw-main-108 fl DrawABill-width font-ipt font-167">
          <div class="fl" @click="ruleText">开票规则</div>
          <div class="fr" @click="helpText">发票帮助</div>
        </div>
        <div class="fl width font-108 font-a39 QPurchase-tips pd-bt" style="padding-bottom: 2.5rem;" v-show="tS">
          <div class="four_father">
            <p style="line-height: 2.75rem;">提示：</p>
            <p>1、最低开票金额为{{this.invoiceAmountMin}}元；</p>
            <p>2、单张发票最大金额为{{this.invoiceAmountMax}}元。</p>
          </div>
        </div>
      </div>
      <div :class="btnColor" class="QPurchase-next font-col-b bg-FA4 cont font-133 pst-abs bRadius-3" @click="nextOrder()">
        下一步
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
        </div>
      </div>
      <!--个人单一商户限额-->
      <section class="zz" v-show="wrapcenterC">
        <div class="wrapcenter">
          <div class="wrapcenter_tips">
            <div class="section_top" style="height: auto;">当前开票额度不足，无法立即开票，您可以选择“稍后开票”</div>
            <div class="section_bottom">
              <div class="qx_set1 font-fa" @click="Iknowit">知道了</div><!---->
            </div>
          </div>
        </div>
      </section>
      <!--弹框-->
      <section class="zz" v-show="inContent" >
        <div class="wrapcenter">
          <div class="mP-mask width bg-f6 QPurchase-btm font-s15" style="">
            <div class="bg-ff width cont pst-rlt">
              <div class="pst-abs pos-left pos-top font-133 font-F89 four_father" @click="Sure1">取消</div>
              <div>选择发票内容</div>
              <div class="pst-abs pos-right pos-top font-133 font-F89 four_father" @click="Sure">确定</div>
            </div>
            <div class="bg-ff width fl font-125 mG-top">
              <div class="mP-mask-btm bd-btm pst-rlt"
                   @click="clickSelection
                   ( '*'+ item.subjectPname+ '*' + item.subjectName + ' ' + '税率'+item.invoiceRate / 100 +'%'+ ' '+item.transferred,
                   item.id,item.subjectPid,item.subjectPname,item.subjectId,
                   item.subjectName,item.invoiceRate,item.letterheadId,         /*invoiceRate*/
                   item.letterheadName,item.serviceRate,item.untransferRate,item.vendorId)"
                   v-for="(item, index,key) in QContent" :key="index">
                <div class="four_father height-141" style="padding: 0.5rem 0;" >{{'*'+ item.subjectPname+ '*' + item.subjectName}}<br/> 税率{{item.invoiceRate / 100 + '%'}} {{item.transferred}}</div>
                <img v-show="index == 0" v-if="aac" class="pst-abs mP-mask-icon" src="../../assets/image/c/icon_tick.png" />
                <img v-show="item.id == checkedId" class="pst-abs mP-mask-icon" src="../../assets/image/c/icon_tick.png" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
  var itemData = [
    {id: '1', value: '立即开票'},
    {id: '2', value: '稍后开票'},
    /*{id: '3',value: '不需要开票'},*/
  ]
  import {addCouponBuyApply,getItemByCoupon,queryFreightAmount} from '@/api/aloneC/cInterface';/*劵购买申请订单添加、劵查询科目信息、运费接口*/
  export default {
    components: {},
    data () {
      return {
        invoiceAmountMax:'',//
        Postage:'',//运费
        invoiceAmountMin:'',
        aac:true,
        wrapcenterC:false,
        dianZ:true,//三个发票类型
        dianZ1:true,
        dianZ2:true,
        flag:true,//四种判断
        flag1:true,
        flag2:true,
        flag3:true,
        Subject:{},//科目信息
        tS:true,
        content: "",
        error_prompt:"",
        error_prompt1:"",
        type:'',//图片根据type来定
        invoiceCot: true,//发票内容
        btnColor: "op-3", /*按钮颜色*/
        Unwanted: true,//发票类型发票内容为显示状态
        Recharge: true,//购买金额超出余额时为true
        mPTips: true, /*头部橙色提示文字*/
        inContent: false,
        purchaseN: '', /*购买金额*/
        industry: '',//适用行业
        invoiceType: '',//发票类型
        items: '',
        checkValue: '',
        checkId: '',

        Selection: false, /*选中图标暂时隐藏*/
        nowContent: "", /*科目内容显示*/
        checkedId: '', /*点击选择*/
        QContent: [],
        businessName: {},//行业
        businessNameList:"",
        parameter: {
          typeName:'',
          serviceRate:'',//服务费率
          untransferRate:'',//不可转让税率
          creator: '1',
          updator: '1',
          couponId: '',                    //劵id
          couponName: '',                  //券名称
          vendorId: '',                    //商户id
          vendorName: '',                  //商户名称
          letterheadId: '',//开票抬头公司
          letterheadName: '',//开票抬头公司名称
          itemCode: '',//主科目code
          itemName: '',//主科目名称
          subjectId: '',//子科目code
          subjectName: '',//子科目名称
          rate: '',//税率
          subjectDesprict: '',//科目汇总
          applyor: '',//申请人
          buyAmount: '',//购买金额
          taxIncludedPrice:'',//购买金额
          expressFee: '',//快递费
          invoiceContent: '',//发票内容和科目汇总一样
          invoiceSelect: 1,//开票选择，1：立即开票，2：稍后开票 3：不需要开票
          invoiceType: 3,//发票类型 ：1：纸质普票，2：纸质专票 ，3:电子发票
          isAdvance: '',//
        },
      }
    },
    methods: {
      adTimer: function () {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      init(){/*初始化判断金额、头部提示框是否显示*/
        //是否支持预开票
        if (this.$route.params.flag != undefined && this.$route.params.flag != "" && this.$route.params.flag != null && this.$route.params.flag != 'undefined' && this.$route.params.flag != 'null') {
          this.flag = this.$route.params.flag;
          localStorage.setItem('flag', this.flag);
        } else {
          if (localStorage.getItem('flag') != undefined && localStorage.getItem('flag') != "" && localStorage.getItem('flag') != null && localStorage.getItem('flag') != 'undefined' && localStorage.getItem('flag') != 'null') {
            this.flag = localStorage.getItem('flag');
            //console.log(this.flag)
          }
        }
        //是否能开纸质普票
        if (this.$route.params.flag1 != undefined && this.$route.params.flag1 != "" && this.$route.params.flag1 != null && this.$route.params.flag1 != 'undefined' && this.$route.params.flag1 != 'null') {
          this.flag1 = this.$route.params.flag1;
          localStorage.setItem('flag1', this.flag1);
          //console.log(this.flag1)
          if(this.flag1 == false || this.flag1 == 'false'){
            this.dianZ1 = false
          }
        } else {
          if (localStorage.getItem('flag1') != undefined && localStorage.getItem('flag1') != "" && localStorage.getItem('flag1') != null && localStorage.getItem('flag1') != 'undefined' && localStorage.getItem('flag1') != 'null') {
            this.flag1 = localStorage.getItem('flag1');
            if(this.flag1 == false || this.flag1 == 'false'){
              this.dianZ1 = false
            }
          }
        }
        //是否能开纸质专票
        if (this.$route.params.flag2 != undefined && this.$route.params.flag2 != "" && this.$route.params.flag2 != null && this.$route.params.flag2 != 'undefined' && this.$route.params.flag2 != 'null') {
          this.flag2 = this.$route.params.flag2;
          localStorage.setItem('flag2', this.flag2);
          if(this.flag2 == false || this.flag2 == 'false'){
            this.dianZ2 = false
          }
        } else {
          if (localStorage.getItem('flag2') != undefined && localStorage.getItem('flag2') != "" && localStorage.getItem('flag2') != null && localStorage.getItem('flag2') != 'undefined' && localStorage.getItem('flag2') != 'null') {
            this.flag2 = localStorage.getItem('flag2');
            if(this.flag2 == false || this.flag2 == 'false'){
              this.dianZ2 = false
            }
          }
        }
        //是否能开电子发票
        if (this.$route.params.flag3 != undefined && this.$route.params.flag3 != "" && this.$route.params.flag3 != null && this.$route.params.flag3 != 'undefined' && this.$route.params.flag3 != 'null') {
          this.flag3 = this.$route.params.flag3;
          localStorage.setItem('flag3', this.flag3);
        } else {
          if (localStorage.getItem('flag3') != undefined && localStorage.getItem('flag3') != "" && localStorage.getItem('flag3') != null && localStorage.getItem('flag3') != 'undefined' && localStorage.getItem('flag3') != 'null') {
            this.flag3 = localStorage.getItem('flag3');
          }
        }
        //金额
        if (this.$route.params.money != undefined && this.$route.params.money != "" && this.$route.params.money != null && this.$route.params.money != 'undefined' && this.$route.params.money != 'null') {
          this.purchaseN = this.$route.params.money;
          this.parameter.buyAmount = this.purchaseN;   //购买金额
          this.parameter.taxIncludedPrice = this.parameter.buyAmount;   //购买金额
          localStorage.setItem('purchaseN', this.parameter.taxIncludedPrice);
          if (this.purchaseN < this.invoiceAmountMin) {
            this.mPTips = true;
          } else {
            this.mPTips = false;
          }
        } else {
          if (localStorage.getItem('purchaseN') != undefined && localStorage.getItem('purchaseN') != "" && localStorage.getItem('purchaseN') != null && localStorage.getItem('purchaseN') != 'undefined' && localStorage.getItem('purchaseN') != 'null') {
            this.purchaseN = localStorage.getItem('purchaseN');
            this.parameter.buyAmount = this.purchaseN;   //购买金额
            this.parameter.taxIncludedPrice = this.purchaseN;   //购买金额
            if (this.purchaseN < this.invoiceAmountMin) {
              this.mPTips = true;
            } else {
              this.mPTips = false;
            }
          }
        }
        this.initData();
        if(this.flag == false || this.flag == 'false'){//不支持预开票
          this.parameter.invoiceSelect = 2
          this.parameter.isAdvance = 0
        }else if(this.flag == true || this.flag == 'true'){ //支持预开票
          this.parameter.invoiceSelect = 1
          if(this.parameter.taxIncludedPrice < this.invoiceAmountMin){
            this.parameter.invoiceSelect = 2
            this.parameter.isAdvance = 0
          }else {
            this.parameter.isAdvance = 1
          }
        }
        //判断  invoiceType 初始化值
        if(this.flag3 == false || this.flag3 == 'false'){    //没有电子发票
          this.dianZ = false
          //console.log(this.flag3)
          if(this.flag2 == false || this.flag2 == 'false'){               //没有纸质专票
            this.parameter.invoiceType = 1//普票
          }else {
            this.parameter.invoiceType = 2
          }
        }else if(this.flag3 == true || this.flag3 == 'true'){
          this.parameter.invoiceType = 3
          this.dianZ = true
        }

        if(this.flag2 == false || this.flag2 == 'false'){   //没有纸质专票
          this.dianZ2 = false
          if(this.flag1 == false || this.flag1 == 'false'){                 //没有纸质普票
            this.parameter.invoiceType = 3//电子
          }
          if(this.flag3 == true || this.flag3 == 'true'){
            this.parameter.invoiceType = 1
          }
        }else if(this.flag2 == true || this.flag2 == 'true'){
          if(this.flag3 == true || this.flag3 == 'true'){
            this.parameter.invoiceType = 3
          }else {
            this.parameter.invoiceType = 1
          }
        }
        if(this.flag1 == false || this.flag1 == 'false'){   //没有纸质普票
          this.dianZ1 = false  //普票
          if(this.flag2 == false || this.flag2 == 'false'){      //没有纸质专票
            this.parameter.invoiceType = 3//电子
          }else {
            this.parameter.invoiceType = 2
          }
          if(this.flag3 == false || this.flag3 == 'false'){
              this.parameter.invoiceType = 2
          }else {
            this.parameter.invoiceType = 3
          }
        }else if(this.flag1 == true || this.flag1 == 'true'){
          this.parameter.invoiceType = 1
          if(this.flag2 == true || this.flag2 == 'true'){
            this.parameter.invoiceType = 1
          }
          if(this.flag3 == true || this.flag3 == 'true'){
            this.parameter.invoiceType = 3
          }
        }
        if(this.$route.params.Subject!=undefined && this.$route.params.Subject!="" && this.$route.params.Subject!=null && this.$route.params.Subject!='undefined' && this.$route.params.Subject!='null'){
          this.Subject = this.$route.params.Subject;
          localStorage.setItem('Subject',JSON.stringify(this.Subject));
          //console.log(JSON.parse(localStorage.getItem('parameter1')))
        }else{
          if(JSON.parse(localStorage.getItem('Subject'))!=undefined && JSON.parse(localStorage.getItem('Subject'))!="" && JSON.parse(localStorage.getItem('Subject'))!=null && JSON.parse(localStorage.getItem('Subject'))!='undefined' && JSON.parse(localStorage.getItem('Subject'))!='null'){
            this.Subject = JSON.parse(localStorage.getItem('Subject'));
            //console.log(this.Subject)
          }
        }
       //图片
        if (this.$route.params.type != undefined && this.$route.params.type != "" && this.$route.params.type != null && this.$route.params.type != 'undefined' && this.$route.params.type != 'null') {
          this.type = this.$route.params.type; //券名称
          localStorage.setItem('type', this.type);
          //console.log(this.type)
        } else {
          if (localStorage.getItem('type') != undefined && localStorage.getItem('type') != "" && localStorage.getItem('type') != null && localStorage.getItem('type') != 'undefined' && localStorage.getItem('type') != 'null') {
            this.type = localStorage.getItem('type');
            //console.log(this.type)
          }
        }
        //券名称
        if (this.$route.params.mDname != undefined && this.$route.params.mDname != "" && this.$route.params.mDname != null && this.$route.params.mDname != 'undefined' && this.$route.params.mDname != 'null') {
          this.parameter.couponName = this.$route.params.mDname; //券名称
          localStorage.setItem('couponName', this.parameter.couponName);
          this.parameter.couponName = localStorage.getItem('couponName');
        } else {
          if (localStorage.getItem('couponName') != undefined && localStorage.getItem('couponName') != "" && localStorage.getItem('couponName') != null && localStorage.getItem('couponName') != 'undefined' && localStorage.getItem('couponName') != 'null') {
            this.parameter.couponName = localStorage.getItem('couponName');
          }
        }
        //券id  couponId
        if (this.$route.params.couponId != undefined && this.$route.params.couponId != "" && this.$route.params.couponId != null && this.$route.params.couponId != 'undefined' && this.$route.params.couponId != 'null') {
          this.parameter.couponId = this.$route.params.couponId;
          localStorage.setItem('couponId', this.parameter.couponId);
        } else {
          if (localStorage.getItem('couponId') != undefined && localStorage.getItem('couponId') != "" && localStorage.getItem('couponId') != null && localStorage.getItem('couponId') != 'undefined' && localStorage.getItem('couponId') != 'null') {
            this.parameter.couponId = localStorage.getItem('couponId');
            //console.log(this.parameter.couponId)
          }
        }
        //商户名称
        if (this.$route.params.businessName != undefined && this.$route.params.businessName != "" && this.$route.params.businessName != null && this.$route.params.businessName != 'undefined' && this.$route.params.businessName != 'null') {
          this.businessName = this.$route.params.businessName; //适用行业
          localStorage.setItem('businessName', JSON.stringify(this.businessName));
          //console.log(this.businessName)
        } else {
          if (localStorage.getItem('businessName') != undefined && localStorage.getItem('businessName') != "" && localStorage.getItem('businessName') != null && localStorage.getItem('businessName') != 'undefined' && localStorage.getItem('businessName') != 'null') {
            this.businessName =JSON.parse(localStorage.getItem('businessName'));
            //console.log(this.businessName)
          }
        }
        if(this.businessName!='' && this.businessName!=null && this.businessName!='null' && this.businessName!=undefined && this.businessName!='undefined'){
            for(let i=0;i<this.businessName.length;i++){
                if(i!=this.businessName.length-1){
                  this.businessNameList += this.businessName[i].businessName+','
                }else{
                  this.businessNameList += this.businessName[i].businessName
                }
            }
        }

        this.Ld();
      },
      ruleText(){
        this.$router.push({name:"ruleText"})
      },
      helpText(){
        this.$router.push({name:"helpText"})
      },
      Iknowit(){
          this.wrapcenterC = false
      },
      initData: function () {
        var self = this;
        self.items = itemData;
        if (itemData.length != 0) {
          if(!this.mPTips || this.mPTips == 'false'){
            self.checkValue = self.items[0].value;
            self.checkId = 'food-' + self.items[0].id
            self.parameter.isAdvance = 1
          }else{
            self.checkValue = self.items[1].value;
            self.checkId = 'food-' + self.items[1].id
            self.parameter.isAdvance = 0
          }
        }
      },
      setCheckValue: function (item) {
        this.checkId = 'food-' + item.id;

      },
      setCheckV(item){
        this.checkId = 'food-' + item.id;
        this.parameter.invoiceSelect = item
        if (item == 1 || item == 2) {
          if (item == 1) {
            this.parameter.isAdvance = 1  //判断是不是预开票  是
            this.Ld()
          } else if (item == 2) {
            this.parameter.isAdvance = 0    //判断是不是预开票  否
            this.Ld()
          }
          this.Unwanted = true
          this.tS = true;
        } else if (item = 3) {
          this.Unwanted = false;
          this.btnColor = "op-1";  //选择不需要开票时发票类型和科目不需要显示
          this.tS = false;
        }
      },
      //以上是单选
      clickSelection(a, id, z, zc, i, ic, s, t, tn, serviceRate,untransferRate,sHid,index){/*选择*/
        this.nowContent = a;
        this.checkedId = id;
        this.parameter.subjectDesprict = a
        this.parameter.invoiceContent = a
        this.parameter.itemCode = z
        this.parameter.itemName = zc
        this.parameter.subjectId = i
        this.parameter.subjectName = ic
        this.parameter.rate = s/100
        this.parameter.letterheadId = t
        this.parameter.letterheadName = tn
        this.parameter.serviceRate = serviceRate
        this.parameter.untransferRate = untransferRate
        this.parameter.vendorId = sHid
        this.aac = false
      },
      //联动
      Ld(){
        this.aac = true
        //初始化获取科目数据
        getItemByCoupon(this.accessToken, this.parameter).then(res => {
          //console.log(res)
          if (res.data.code == 200) {
              if(res.data.data == '' || res.data.data==null || res.data.data.length==0){
                this.QContent = [];
                this.nowContent = '';
                this.error_prompt = "tel-message";     //数据为空时给一个报错信息
                this.content = '发票科目为空';
              }else {
                this.QContent = res.data.data;
                this.parameter.itemCode = this.QContent[0].subjectPid
                this.parameter.itemName = this.QContent[0].subjectPname
                this.parameter.subjectId = this.QContent[0].subjectId
                this.parameter.subjectName = this.QContent[0].subjectName
                this.parameter.subjectDesprict = '*'+ this.parameter.itemName+ '*' + this.parameter.subjectName //汇总
                this.parameter.invoiceContent = '*'+ this.parameter.itemName+ '*' + this.parameter.subjectName //汇总
                this.parameter.rate = this.QContent[0].invoiceRate/100
                this.parameter.letterheadId = this.QContent[0].letterheadId
                this.parameter.letterheadName = this.QContent[0].letterheadName
                this.parameter.serviceRate = this.QContent[0].serviceRate
                this.parameter.untransferRate = this.QContent[0].untransferRate
                this.parameter.vendorId = this.QContent[0].vendorId
                this.parameter.vendorName = this.QContent[0].vendorName
                this.nowContent = this.QContent[0].subjectDesprict+ ' ' + '税率'+this.QContent[0].invoiceRate / 100 + '%'+ ' ' + this.QContent[0].transferred

              }
          } else {
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          }
        }, res => {
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        })
      },
      //科目接口
      mpContent(){
        if(this.QContent!=null && this.QContent!='' && this.QContent.length!=0){
          this.inContent = true;
        }
      },
      /*选择发票科目总和弹框*/
      Sure(){
        this.inContent = false;
      },

      Sure1(){
        this.inContent = false;
      },
      beforeDestroy(){
        clearInterval(this.addAddressTimer);
      },
      /*选择发票类型*/
      clickType(){
        if (this.checkValue == "立即开票" || this.checkValue == "稍后开票") {
          if(this.flag3 == false || this.flag3 == 'false'){
            this.dianZ = false
            this.$refs.clickTypes1.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
            this.$refs.clickTypes2.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
          }else if(this.flag2 == false || this.flag2 == 'false'){
            this.dianZ2 = false
            this.$refs.clickTypes.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
            this.$refs.clickTypes1.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
          }else if(this.flag1 == false || this.flag1 == 'false'){
            this.dianZ1 = false
            this.$refs.clickTypes.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
            this.$refs.clickTypes2.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
          }else {
            this.$refs.clickTypes.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
            this.$refs.clickTypes1.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
            this.$refs.clickTypes2.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
          }
        }
        this.parameter.invoiceType = '3';
        this.invoiceType = '电子发票'
        this.parameter.expressFee = 0
        this.Ld();
      },
      clickType1(){
        if (this.checkValue == "立即开票" || this.checkValue == "稍后开票") {
          if(this.flag3 == false || this.flag3 == 'false'){
            this.dianZ = false
            this.$refs.clickTypes1.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
            this.$refs.clickTypes2.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
          }else if(this.flag2 == false || this.flag2 == 'false'){
            this.dianZ2 = false
            this.$refs.clickTypes1.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
            this.$refs.clickTypes.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
          }else if(this.flag1 == false || this.flag1 == 'false'){
            this.dianZ1 = false
            this.$refs.clickTypes1.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
            this.$refs.clickTypes.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
          }else {
            this.$refs.clickTypes.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
            this.$refs.clickTypes1.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
            this.$refs.clickTypes2.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
          }
        }
        this.parameter.invoiceType = '1';
        this.parameter.expressFee = this.Postage //选择纸质发票时默认有25元运费
        this.invoiceType = '纸质普票'
        this.Ld();
      },
      clickType2(){
        if (this.checkValue == "立即开票" || this.checkValue == "稍后开票") {
          if(this.flag3 == false || this.flag3 == 'false'){
            this.dianZ = false
            this.$refs.clickTypes1.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
            this.$refs.clickTypes2.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
          }else if(this.flag2 == false || this.flag2 == 'false'){
            this.dianZ2 = false
            this.$refs.clickTypes.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
            this.$refs.clickTypes2.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
          }else if(this.flag1 == false || this.flag1 == 'false'){
            this.dianZ1 = false
            this.$refs.clickTypes.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
            this.$refs.clickTypes2.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
          }else {
            this.$refs.clickTypes.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
            this.$refs.clickTypes1.style.cssText = "color:#A39C9C;border-color:#A39C9C;";
            this.$refs.clickTypes2.style.cssText = "color:#3B92EF;border-color:#3B92EF;";
          }
        }
        this.parameter.invoiceType = '2';
        this.invoiceType = '纸质专票'
        this.parameter.expressFee = this.Postage //选择纸质发票时默认有25元运费
        this.Ld();
      },
      //点击下一步
      nextOrder(){
          //console.log(this.parameter.invoiceType)
        if (this.btnColor == "op-1") {   //按钮亮色可点击
          //劵购买申请订单添加接口
          addCouponBuyApply(this.accessToken, this.parameter).then(res =>{
            if(this.parameter.invoiceType == 3){
              this.parameter.typeName = '电子发票'
            }else if(this.parameter.invoiceType == 2){
              this.parameter.typeName = '纸质专票'
            }else if(this.parameter.invoiceType == 1){
              this.parameter.typeName = '纸质普票'
            }
            //console.log(this.parameter.typeName)
            if(this.parameter.invoiceSelect == 1 || this.parameter.invoiceSelect == '1' ){ //立即
              if(this.parameter.invoiceType == 1 || this.parameter.invoiceType == 2){  //纸质
                this.parameter.expressFee = this.Postage
              }else if(this.parameter.invoiceType == 3){  //电子
                this.parameter.expressFee = 0
              }
            }else if(this.parameter.invoiceSelect != 1 || this.parameter.invoiceSelect != '1'){  //不立即
              this.parameter.expressFee = 0
            }
            if(res.data.code == 200){
                //console.log(res.data.data)
              let idAll = res.data.data.id
              if(this.checkValue == "立即开票"){  //立即开票跳转预开票页
                let orderPayNos = res.data.data.orderId
                this.$router.push({
                  name:"drawABill",
                  params:{
                    type:this.type,//判断图片
                    idAll:idAll,//订单页要用的id
                    parameter1:this.parameter,//下一页需要的参数
                    money:this.purchaseN, //开票金额
                    Invoice:this.checkValue,//开票选择
                    InvoiceType:this.parameter.invoiceType,//发票类型
                    InContent:this.parameter.invoiceContent,//开票内容
                    ChoiceIpt:true,//记录来源
                    addressM:true,//记录地址来源
                    businessName:this.businessName,//商户
                    orderPayNos:orderPayNos
                  }
                });
              }else if(this.checkValue == "稍后开票" || this.checkValue == "不需要开票"){
                this.$router.push({
                  name:"mOrder",
                  params:{
                    type:this.type,//判断图片
                    applyId:idAll,//订单页要用的id
                    parameter:this.parameter,//下一页需要的参数
                    money:this.purchaseN, //开票金额
                    Invoice:this.checkValue,//开票选择
                    InvoiceType:this.parameter.invoiceType,//发票类型
                    InContent:this.parameter.invoiceContent,//开票内容
                    aa:true,//来源
                    businessName:this.businessName//商户
                  }
                });
              }
            }else if(res.data.code == 9998){
              this.wrapcenterC = true;
            }else {
              this.error_prompt = "tel-message";
              this.content = res.data.msg;
            }
          },res =>{
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          })
        }
      },
      //公共input校验
      publiceKong(name, key){
        if(key == "") {
          this.error_prompt="tel-message";
          this.content = "请填写"+name;
        }
      },
      //页面失焦校验
      jySYS(name,key){
        this.publiceKong(name,key);
      },
    },
    created(){
      this.accessToken = localStorage.getItem("userID");
      //运费
      //queryFreightAmount
      queryFreightAmount(this.accessToken).then(res => {
        if (res.data.code == 200) {
          this.Postage = res.data.data.freightAmount/1000
          this.invoiceAmountMin = res.data.data.invoiceAmountMin/1000
          this.invoiceAmountMax = res.data.data.invoiceAmountMax/1000
          this.init();
        } else {
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        }
      }, res => {
        this.error_prompt = "tel-message";
        this.content = res.data.msg;
      });
    },
    watch:{
      nowContent(){ //发票内容（科目）有数据时按钮为可点击
        if(this.nowContent != '' && this.nowContent != undefined && this.nowContent != null){
          this.btnColor = "op-1";
        }else {
          this.btnColor = "op-3";
        }
      },
      spTicket(){
        this.btnColor = "op-1";
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.adTimer,4000);
      })
    }
    }

</script>
<style>

  .Draw-main-108{
    padding: 1rem 1.083rem;
  }
  .DrawABill-width{
    width:92%;
  }
  .mPIcon{
    top: 0;
    right: 0rem;
    width: 4.2rem;
  }
  .tel-mess .tel-message{
    padding:0 1rem;
  }
  .mPurchase-ht{
    height:92%;
  }
  .mP-tips{
    background: #FFF4E8;
    line-height: 2rem;
    padding: 0.5rem 0;
  }
  .QPurchase-btm{
    line-height: 4.167rem;
  }
  .QPurchase-t-img{
    padding: 1rem;
    width: 10rem;
    height: 6rem;
    display: -webkit-box;
  }
  .QPurchase-s{
    padding-left: 1.083333333rem;
  }
  .QPurchase-tips{
    line-height: 2rem;
  }
  .QPurchase-next{
    margin: 0 1.083333rem;
    padding: 0.9rem 0;
    position: absolute;
    bottom: 0.5rem;
    width: 93%;
  }
  .QPurchase-btm-title{
    margin-left: 1.083rem;
  }
  .QPurchase-m-type{
    padding: 0.2rem 0.5rem;
    border: 1px solid #3B92EF;
    margin-top: 0.4rem;
    margin-right: 1rem;
  }
  .QPurchase-m-type1{
    padding: 0.2rem 0.5rem;
    border: 1px solid #A39C9C;
    margin-top: 0.4rem;
    margin-right: 1rem;
  }
  .mP-mask{
    position: absolute;
    bottom: 0;
    z-index: 99999999;
    overflow: auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .mP-375{
    line-height: 3.75rem;
  }
  .mP-mask-btm:last-child{
    border-bottom:none;
  }
  .mP-mask-icon{
    width: 1.167rem;
    top: 1.5rem;
    right: 1.083rem;
  }
  .mPurchase-ht .border-1px {
    position: relative;
  }
  .mpContentList{
    width:92%;
  }
  .mpContentList .ellipsis_name_2{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;       /*2行溢出显示省略*/
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  /*
  @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
    .border-1px::after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .border-1px ::after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }*/
  .mPurchase-ht .self-radio {
    display: none;
  }
  .mPurchase-ht .self-radio + label {
    -webkit-appearance: none;
    background: url("../../assets/img/btn_Unselected.png") no-repeat 100% 100%;
    background-size: 1.3rem;
    display: inline-block;
    position: relative;
    left: 90%;
    width: 1.5rem;
    height: 1.5rem;
    box-sizing: border-box;
  }
  .mPurchase-ht .self-radio:checked + label {
    background: url("../../assets/img/check.png") no-repeat 100% 100%;
    background-size: 1.3rem;
  }
  .mPurchase-ht li .self-radio + label {
    vertical-align: middle;
  }
  .mPurchase-ht li .self-radio + label {
    vertical-align: middle;
  }
  .mPurchase-pad{
    color:#A39C9C;
    border-color:#A39C9C;
  }
  .mPurchase-pad1{
    color:#3B92EF;
    border-color:#3B92EF;
  }
  @media screen and (max-width:321px){
    .mPurchase-ht{
      height:91%;
    }
  }
  @media screen and (max-width:815px)and (min-width: 450px){
    .mPurchase-ht{
      height:90%;
    }
  }
</style>

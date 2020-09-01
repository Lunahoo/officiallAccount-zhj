<template>
  <div class="width height"><!--券详情-->
    <div class="pst-rlt mDetails width fl overflow-s">
      <div >
        <div class="">
          <img v-if="this.mDinfo.name=='通用券'" src="../../assets/img/aloneC/couponNew/couponTop/img_Generalvouchers@2x.png"/>
          <img v-if="this.mDinfo.name=='旅游券'" src="../../assets/img/aloneC/couponNew/couponTop/img_Travelvouchers@2x.png"/>
          <img v-if="this.mDinfo.name=='咨询券'" src="../../assets/img/aloneC/couponNew/couponTop/img_advisory_voucher@2x.png"/>
          <img v-if="this.mDinfo.name=='信息券'" src="../../assets/img/aloneC/couponNew/couponTop/img_Information_coupon@2x.png"/>
          <img v-if="this.mDinfo.name=='培训券'" src="../../assets/img/aloneC/couponNew/couponTop/img_Trainingvouchers@2x.png"/>
          <img v-if="this.mDinfo.name=='福利券'" src="../../assets/img/aloneC/couponNew/couponTop/img_Welfarevouchers@2x.png"/>
        </div>
        <div class="mDetails-title mDetails-title-tj bRadius-3 fl pst-abs">
          <div class="fl font-108 bg-ff mDetails-pad-16 bRadius-3" style="line-height: 2rem;">
            <p class="cont width height-4083 mDt-bgIcon1 font-F89 font-s15">消费场景</p>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='培训券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_site@2x.png"/>
              </div>
              <div>场地租借</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'||this.mDinfo.name=='旅游券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_have_meals@2x.png"/>
              </div>
              <div>餐饮</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='旅游券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_Tourism@2x.png"/>
              </div>
              <div>旅游</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='培训券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_have_meals@2x.png"/>
              </div>
              <div>预定餐食</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_pay@2x.png"/>
              </div>
              <div>购物</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_shopping@2x.png"/>
              </div>
              <div>缴费</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='旅游券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_entertainment@2x.png"/>
              </div>
              <div>娱乐</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'||this.mDinfo.name=='旅游券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_vehicle_use@2x.png"/>
              </div>
              <div>用车</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'||this.mDinfo.name=='旅游券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_plane_ticketpng@2x.png"/>
              </div>
              <div>机票</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'||this.mDinfo.name=='旅游券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_train_tickets@2x.png"/>
              </div>
              <div>火车票</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_Tourism@2x.png"/>
              </div>
              <div>旅游</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_entertainment@2x.png"/>
              </div>
              <div>娱乐</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='通用券'||this.mDinfo.name=='福利券'||this.mDinfo.name=='旅游券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_hotel@2x.png"/>
              </div>
              <div>酒店</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='培训券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_rent_a_car@2x.png"/>
              </div>
              <div>租车</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='培训券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_training@2x.png"/>
              </div>
              <div>培训</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='信息券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_communication_services@2x.png"/>
              </div>
              <div>通信服务</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='信息券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_lntelligent_testing@2x.png"/>
              </div>
              <div>智能测试</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='信息券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_architecture_services@2x.png"/>
              </div>
              <div>架构服务</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='信息券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_application_service@2x.png"/>
              </div>
              <div>应用服务</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='咨询券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_project_planning@2x.png"/>
              </div>
              <div>项目规划</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='咨询券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_consulting_service@2x.png"/>
              </div>
              <div>咨询服务</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='咨询券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_strategic_analysis@2x.png"/>
              </div>
              <div>战略分析</div>
            </div>
            <div class="fl cont mDetails-icon" v-if="this.mDinfo.name=='咨询券'">
              <div class="fl">
                <img class="mDetails-icon-img" src="../../assets/img/aloneC/couponNew/couponIcon/icon_technical_support@2x.png"/>
              </div>
              <div>技术支持</div>
            </div>
          </div>
          <p class="height-316 pd-lf font-F89 font-167 mDetails-bgIconS fl cont-r" @click="maskIcon">
            <span>发票示例</span>
          </p>
          <div v-show="invoceKm" class="mDetails-title-tj bg-ff bRadius-3 fl font-1 width" >
            <p class="cont width height-4083 mDt-bgIcon font-F89 font-s15">发票内容</p>
            <div class="mDetails-t-list-last height-375 fl cont" >
              <div class="mDetails-b-list-l mDetails-b-list-l1 ellipsis_name_2 fl">开票内容</div>
              <div class="mDetails-b-list-l fl">发票类型</div>
              <div class="mDetails-b-list-l fl">税率</div>
              <div class="mDetails-b-list-l fl">转让比例</div>
              <div class="mDetails-b-list-l fl">预开票</div>
            </div>
            <div class="mDetails-t-list-last height-375 fl cont" v-for="(items,index) in Subject" :key="index">
              <div class="mDetails-b-list-l mDetails-b-list-l1 fl ellipsis_name_2" style="line-height: 1.9rem;overflow: hidden;">*{{items.subjectPname}}* {{items.subjectName}}</div>
              <div class="mDetails-b-list-l fl" v-if="items.invoiceType == 1">纸质普票</div>
              <div class="mDetails-b-list-l fl" v-if="items.invoiceType == 2">纸质专票</div>
              <div class="mDetails-b-list-l fl" v-if="items.invoiceType == 3">电子发票</div>
              <div class="mDetails-b-list-l fl">{{items.invoiceRate / 100 + '%' }}</div>
              <div class="mDetails-b-list-l fl" v-if="items.transferred == '100%可转'">全部可转</div>
              <div class="mDetails-b-list-l fl" v-if="items.transferred == '100%不可转'">不可转让</div>
              <div class="mDetails-b-list-l fl" v-if="items.transferred != '100%可转'&&items.transferred != '100%不可转'">{{items.transferred}}</div>
              <div class="mDetails-b-list-l fl" v-if="items.isAdvance == 1">支持</div>
              <div class="mDetails-b-list-l fl" v-if="items.isAdvance == 0">不支持</div>
            </div>
          </div>
          <div class="fl width bg-ff mG-top bRadius-3">
            <p class="cont width height-4083 mDt-bgIcon font-F89 font-s15">专属优势</p>
            <div style="padding: 0 0.75rem;">
              <img class="mDetails-zs-image" src="../../assets/img/aloneC/couponNew/advantage/img_1@2x.png" />
              <img class="mDetails-zs-image" src="../../assets/img/aloneC/couponNew/advantage/img_2@2x.png" />
              <img class="mDetails-zs-image" src="../../assets/img/aloneC/couponNew/advantage/img_3@2x.png" />
              <img class="mDetails-zs-image" src="../../assets/img/aloneC/couponNew/advantage/img_4@2x.png" />
              <img class="mDetails-zs-image" src="../../assets/img/aloneC/couponNew/advantage/img_5@2x.png" />
              <img class="mDetails-zs-image" src="../../assets/img/aloneC/couponNew/advantage/img_6@2x.png" />
            </div>
          </div>
          <div class="fl width bg-ff mG-top bRadius-3">
            <img src="../../assets/img/aloneC/couponNew/img_how_to_use@2x.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="mDurchase-next pst-abs btm-0 width font-col-b bg-FA4 cont font-133 pst-abs" @click="purchase">立即购买</div>
    <!--示例发票图片弹窗-->
    <div class="mDetails-mask-image" v-show="maskImage">
      <div class="fl pst-rlt">
        <img src="../../assets/image/c/img_example@2x.png" />
        <img src="../../assets/image/c/icon_close@2x.png" @click="maskHide" class="pst-abs btm-3" style="width: 2rem;left:46.5%;"/>
      </div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
    <!--行业-->
    <!--<section class="zz" v-show="divMask3" @click="allMask3">
      <div class="wrapcenter">
        <div class="bg-ff pst-abs bRadius-3 wrapcenter-div">
          <div class="fl" v-for="(items,index) in industry" :key="index">{{items.businessName}}<span v-if="industry.length-index != 1">、</span></div>
        </div>
      </div>
    </section>-->
    <!--所有类别弹窗-->
   <!-- <section class="zz" v-show="divMask2" @click="allMask2">
      <div class="wrapcenter">
        <div class="bg-ff pst-abs bRadius-3 wrapcenter-div">
          <div class="fl" v-for="(items,index) in categoryList" :key="index">{{items.businessName}}<span v-if="categoryList.length-index != 1">、</span></div>
        </div>
      </div>
    </section>-->
    <!--所有商户弹窗-->
    <!--<section class="zz" v-show="divMask" @click="allMask">
      <div class="wrapcenter">
        <div class="bg-ff pst-abs bRadius-3 wrapcenter-div">
            <div class="fl" v-for="(items,index) in internalVendorList" :key="index">{{items.businessName}}<span v-if="internalVendorList.length-index != 1">、</span></div>
        </div>
      </div>
    </section>-->
    <!--所有地区弹窗-->
    <!--<section class="zz" v-show="divMask1" @click="allMask1">
      <div class="wrapcenter">
        <div class="bg-ff pst-abs bRadius-3 wrapcenter-div">
          <div class="fl" v-for="(items,index) in cityList" :key="index">{{items.businessName}}<span v-if="cityList.length-index != 1">、</span></div>
        </div>
      </div>
    </section>-->
    <!--弹框-->
    <section class="zz" v-show="moneyMask">
      <div class="wrapcenter">
        <div class="mP-mask width bg-f6 font-s15" style="">
          <div class="bg-ff width cont pst-rlt mD-QPurchase-btm1">
            <div class="pst-abs pos-left pos-top font-133 font-F89 four_father" @click="Sure1">取消</div>
            <div>购买{{mName}}</div>
            <div class="pst-abs pos-right pos-top font-133 font-F89 four_father" @click="Sure">确定</div>
          </div>
          <div class="bg-ff width fl mP-375 font-125 mG-top pd-tp1 pd-bt">
            <div>
              <p class="four_father font-7b7 padTop-1">请输入购买金额</p>
              <div class="bd-btm mG-lft183 height-4083" style="font-size: 2rem;">
                ￥ <input type="number" pattern="\d*" onkeyup="value=value.replace(/([a-z]|[A-Z]|[`~·.!！\-@#$￥%^&*…()（）—=.。；;':‘’_+|、\\<>{}\/'[\]])/g,'')" v-model="moneyIpt" class="zMaskIpt" />
              </div>
              <div class="fl mDetails-title font-108" style="margin: 1rem 1.083rem;width: 93%;">
                <div v-if="this.totalAmount/1000>=this.moneyIpt">
                  <div class="font-7b7 fl">可用余额：{{this.totalAmount|moneyFormat}}元</div>
                  <div class="font-3b9 fr" @click="allMoney" v-show="allMoneyHide">全部购买</div><!-- v-show="allMoneyHide"-->
                </div>
                <div class="width fl font-22d font-1" v-show="moneyKong">请输入金额</div>
                <div v-if="this.totalAmount/1000<this.moneyIpt" class="font-F89 font-1 fl width" style="height: 1.5rem;"><!-- v-show="moneyExceed"-->
                  <div class="fl">购买金额超出余额</div>
                  <div class="fr bRadius-3" style="border: 1px solid;padding: 0 0.2rem;" @click="cRecharge">去充值</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {queryCouponDetailNew,queryAllSalaryBalance} from '@/api/aloneC/cInterface';/*消费券详情 \ 查询个人总金额*/
  export default {
    data () {
      return {
        mName:'',//购买名称
        flag:false,
        flag1:false,
        flag2:false,
        flag3:false,
        content: "",
        error_prompt:"",
        type:'',
        divMask:false,
        divMask1:false,
        divMask2:false,
        moneyMask:false,/*输入金额弹框*/
        maskImage:false,/*示例发票图片*/
        moneyIpt:'',/*input金额*/
        moneyKong:false,/*金额为空点击确定按钮时显示*/
        moneyExceed:false,/*金额超过可用余额*/
        allMoneyHide:true,/*全部购买按钮*/
        couponId:'',  /*券id*/
        mDinfo:'',/*券详情信息*/
        industry:'',/*行业信息*/
        categoryList:[],/*类别信息*/
        divMask3:false,//行业
        lType:false,//类别icon
        hY:false,//
        dQu:false,//地区icon
        sHu:false,//商户
        internalVendorList:[],
        businessName:'',//
        businessId:'',
        cityList:[],/*城市信息*/
        mDimage:'',
        Subject:[],//科目
        invoceKm:true,
        totalAmount:'',//个人现金账户额度  可用额度
      }
    },
    methods: {
      adTimer: function () {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      lB(){this.divMask2 = true;},
      sH(){this.divMask = true;},
      dQ(){this.divMask1 = true;},
      //原来的弹框不要了之后删除
      //hYc(){this.divMask3 = true;},
      //allMask(){this.divMask = false;},
      //allMask1(){this.divMask1 = false;},
      //allMask2(){this.divMask2 = false;},
      //allMask3(){this.divMask3 = false;},
      init(){
        this.accessToken = localStorage.getItem("userID");
        //id
        if(this.$route.params.key!=undefined && this.$route.params.key!="" && this.$route.params.key!=null && this.$route.params.key!='undefined' && this.$route.params.key!='null'){
          this.couponId = this.$route.params.key;
          localStorage.setItem('couponId',this.couponId);
          this.mDinit();
        }else{
          if(localStorage.getItem('couponId')!=undefined && localStorage.getItem('couponId')!="" && localStorage.getItem('couponId')!=null && localStorage.getItem('couponId')!='undefined' && localStorage.getItem('couponId')!='null'){
            this.couponId = localStorage.getItem('couponId');
            this.mDinit();
          }
        }
        //可用余额接口
        queryAllSalaryBalance(localStorage.getItem("userID")).then(res=> {
          if(res.data.code==200){
             //console.log(res.data.data.peAccount.salaryAmount)
              this.totalAmount = res.data.data.peAccount.salaryAmount;   //可用余额res.data.data.peAccount.salaryAmount
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      mDinit(){  //获取详情接口
        queryCouponDetailNew(this.accessToken,this.couponId).then(res =>{
          if(res.data.code == 200){
            this.mDinfo = res.data.data
            this.Subject = this.mDinfo.couponAcctrateList  //科目信息
            this.mName = this.mDinfo.categoryList[0].couponName
            if(this.Subject!=null && this.Subject.length>0){//判断详情里科目的信息判断购买页
                for(let i=0;i<this.Subject.length;i++){
                    if(this.Subject[i].isAdvance == '1' || this.Subject[i].isAdvance==1){  //是否支持预开票
                      this.flag = true;
                    }
                    if(this.Subject[i].invoiceType == '1' || this.Subject[i].invoiceType == 1){ //纸质普票
                      this.flag1 = true
                    }
                    if(this.Subject[i].invoiceType == '2' || this.Subject[i].invoiceType == 2){  //纸质专票
                      this.flag2 = true
                    }
                    if(this.Subject[i].invoiceType == '3' || this.Subject[i].invoiceType == 3){  //电子发票
                      this.flag3 = true
                    }
                }
            }
            /*this.industry = res.data.data.industryList//行业详细信息
            if(this.industry.length > 4){ //类别icon显示隐藏
              this.hY = true;
            }else {
              this.hY = false;
            }
            this.categoryList = res.data.data.categoryList//类别信息
            if(this.categoryList.length > 4){ //类别icon显示隐藏
              this.lType = true;
            }else {
              this.lType = false;
            }
            this.cityList = res.data.data.cityList//市信息
            if(this.cityList.length > 4){ //地区icon显示隐藏
              this.dQu = true;
            }else {
              this.dQu = false;
            }
            this.internalVendorList = res.data.data.internalVendorList//商户
            if(this.internalVendorList.length > 4){ //商户icon显示隐藏
              this.sHu = true;
            }else {
              this.sHu = false;
            }*/
          }else {
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        })
      },
      purchase(){/*显示输入金额弹框*/
        if(this.Subject.length>0){
          this.moneyMask = true;
        }else {
          this.error_prompt = "tel-message";
          this.content = '科目信息为空';
        }
      },
      Sure1(){
          this.moneyMask = false;
      },
      Sure(){/*点击弹窗上的确定跳转页面*/
        let flag = this.flag
        let flag1 = this.flag1
        let flag2 = this.flag2
        let flag3 = this.flag3
        if(this.moneyIpt != '' || this.moneyIpt != undefined || this.moneyIpt != null || this.moneyIpt != 'null' || this.moneyIpt != 'undefined'){
          this.allMoneyHide = false;
          if( this.moneyIpt > 0){ /*totalAmount*/
            if( this.moneyIpt > this.totalAmount / 1000){
              this.moneyExceed = true;
              this.moneyKong = false;
            }else {
              localStorage.setItem('flag',this.flag);
              localStorage.setItem('flag1',this.flag1);
              localStorage.setItem('flag2',this.flag2);
              localStorage.setItem('flag3',this.flag3);
              this.$router.push({
                name:"mPurchase",
                params:{
                  flag:this.flag,//有没有支持预开票
                  flag1:this.flag1,//含有的发票类型  纸质普票
                  flag2:this.flag2,//含有的发票类型  纸质专票
                  flag3:this.flag3,//含有的发票类型  电子发票
                  type:this.mDinfo.name,//根据name显示图片传到券购买页
                  money:this.moneyIpt,//金额
                  mDname:this.mDinfo.name,//券名称
                  couponId:this.mDinfo.id,//券id
                  businessName:this.internalVendorList,//商户名称
                  Subject:this.Subject//科目信息
                }
              });
            }
          }else {
            this.moneyKong = true
          }
        }else if(this.moneyIpt == ''){
          this.moneyKong = true;
          this.allMoneyHide = false;
        }
      },
      maskIcon(){/*显示发票示例图*/
        this.maskImage = true;
      },
      maskHide(){/*发票示例图隐藏*/
        this.maskImage = false;
      },
      allMoney(){/*点击全部金额this.moneyIpt=全部金额的额度 */
        this.moneyIpt = Math.floor(this.totalAmount/1000);
        if(this.moneyIpt > 50000){
          this.moneyIpt = 50000;
        }
      },
      cRecharge(){
        this.$router.push({name:"cRecharge"});
      }
    },
    created(){
      this.init();
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.adTimer,2000);
      })
    },
    watch:{
      moneyIpt(newValue,oldValue){
        let arr = '';
        if (newValue!=null && newValue!=''){
          for (let i=0;i<newValue.length;i++){
              if(newValue[i]!='.'){
                arr+=newValue[i];
              }
          }
        }
        newValue = arr
        this.moneyIpt = newValue;
        if(this.moneyIpt >0){
          this.moneyKong = false;
          this.allMoneyHide = true;
          this.moneyExceed = false;
        }
        if(this.moneyIpt>=1 && this.moneyIpt<=50000){
          this.moneyIpt = newValue
        }else if(this.moneyIpt>50000){
          this.moneyIpt = oldValue;
        }else{
          this.moneyIpt = "";
        }
      }
    }
  }
</script>
<style>
  .mDetails-zs-image{
    float: left;
    width:47.7%;
    padding-bottom: 1rem;
  }
  .mDetails-zs-image:nth-child(even){
    padding-left: 1.25rem;
  }
  .mDetails-pad-16{
    padding:0 2.75rem;
    width: 81.3%;
  }
  .mDetails-icon{
    padding: 0 2.45rem 1.083rem;
  }
  .mDetails-icon:nth-of-type(1){
    padding-left:0;
  }
  .mDetails-icon:nth-of-type(4){
    padding-left:0;
  }
  .mDetails-icon:nth-of-type(7){
    padding-left:0;
  }
  .mDetails-icon:nth-of-type(3){
    padding-right:0;
  }
  .mDetails-icon:nth-of-type(6){
    padding-right:0;
  }
  .mDetails-icon:nth-of-type(9){
    padding-right:0;
  }
  .mDetails-icon:last-child{
    padding-right:0;
  }
  .mDetails-icon-img{
    width: 3.58333rem;
    padding:0 0.5rem;
  }
  .zMaskIpt{
    height: 2rem;
    padding: 0.5rem 0;
    caret-color:#3B92EF;
    font-size: 2rem;
    width:88%;
  }
  .mDetails{
    padding: 0 0px 1rem;
    height: 92%;
    background: #ECF5FF;
  }
  .mDetails-title{
    margin: 0 0.7rem 1rem;
    width:95.5%;
  }
  .mDetails-title-tj{
    top: 9rem;
    padding-bottom: 1.6666667rem;
  }
  .mDetails-bgIconS{
    background: url("../../assets/img/icon_details@2x.png") no-repeat 100% 51%;
    background-size: 1.3rem;
    width:96%;
  }
  .mDetails-bgIconS span{
    padding-right: 2rem;
  }
  .mDetails-b-list-l{
    width:18.7%;
    border-left:1px solid #fff;
    height: 3.75rem;
  }
  .mDetails-b-list-l1{
    width:23%;
  }
  .mDetails-b-list-l:first-child{
    border-left:none;
  }
  .mDetails-t-list-last{
    border: 1px solid #fff;
    border-bottom: none;
    margin: 0 1rem;
    width: 93%;
  }
  .mDetails-t-list-last:nth-child(even){
    background: rgba(161,218,255,0.12);
  }
  .mDetails-t-list-last .ellipsis_name_2{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;       /*2行溢出显示省略*/
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .mDetails-t-list:last-child{
    border-bottom: 1px solid #fff;
  }
  .mDetails-t-list-last:last-child{
    border-bottom: 1px solid #fff;
  }
  .mDurchase-next{
    padding: 0.9rem 0;
  }
  .mP-mask{
    position: absolute;
    bottom: 0;
    z-index: 99999999;
    overflow: auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .mD-QPurchase-btm1{
    line-height: 4.167rem;
  }
  .mDt-bgIcon1{
    background: url("../../assets/img/aloneC/couponNew/img_decorative_line@2x.png")no-repeat 18% 54%,url("../../assets/img/aloneC/couponNew/img_decorative_line@2x.png")no-repeat 82% 54%;
    background-size: 4.83rem 0.15rem;
  }
  .mDt-bgIcon{
    background: url("../../assets/img/aloneC/couponNew/img_decorative_line@2x.png")no-repeat 25% 54%,url("../../assets/img/aloneC/couponNew/img_decorative_line@2x.png")no-repeat 75% 54%;
    background-size: 4.83rem 0.15rem;
  }
  .wrapcenter-div{
    width: 65%;
    height:auto;
    top: 30%;
    padding: 1rem;
    line-height: 2.7rem;
    max-height: 15rem;
    overflow-y: scroll;
  }
  @media screen and (max-width:321px){
    .mDetails-pad-16 {
       padding: 0 2.5rem;
      width:80.5%;
     }
    .mDetails-icon {
      padding: 0 1.6rem 1.083rem;
    }
    .mDetails-title{
      width:94.3%;
    }
    .mDetails{
      height: 91%;
    }
    .mDetails-zs-image {
       width: 47.2%;
     }
    .mDetails-title-tj{
      top: 8rem;
    }
  }
</style>

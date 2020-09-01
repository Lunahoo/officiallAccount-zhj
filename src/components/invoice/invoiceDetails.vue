<template>
  <div class="width height pst-rlt" style="background: #FFF4E8;">
    <div v-if="invoiceData.invoiceStatus==4" style="line-height: 1.8rem;height: 8%;" class=" font-F89 font-1">
      <div class="invoiceDetails-title-div1">错误信息：</div>
      <div class="invoiceDetails-title-div2">发票图片不清晰，请上传清晰发票图片</div>
    </div>
    <div v-if="invoiceData.invoiceStatus!=4" style="height: 8%;background: #3B71AB;" class="width pst-abs font-F89 font-1 btm-0"></div>
    <div class="invoiceDetails width pst-abs" ref="invoiceDetails1"><!--背景色暂定-->
      <div class="invoiceDetails-div">
        <div class="invoiceDetails-k width"></div>
        <div class="invoiceDetails-title bg-ff cont">
          <div class="invoiceDetails-cont fl width">
            <div class="invoiceDetails-cont-top font-133" v-if="invoiceData.typeId==1">增值税专票</div>
            <div class="invoiceDetails-cont-top font-133" v-if="invoiceData.typeId==2">增值税普票</div>
            <div class="invoiceDetails-cont-top font-133" v-if="invoiceData.typeId==3">电子发票</div>
            <div class="invoiceDetails-cont-top font-133" v-if="invoiceData.typeId==4">飞机票 </div>
            <div class="invoiceDetails-cont-top font-133" v-if="invoiceData.typeId==5">火车票 </div>
            <div class="invoiceDetails-cont-top font-133" v-if="invoiceData.typeId==6">出租车发票</div>
            <div class="invoiceDetails-cont-top font-133" v-if="invoiceData.typeId==7">定额发票</div>
            <div class="invoiceDetails-cont-top font-133" v-if="invoiceData.typeId==9">卷式发票</div>
          </div>
          <div class="bg-ff invoiceDetails-list fl pst-rlt" style="width: 92%;">
            <div class="">
              <div class="width fl invoiceDetails-list-mar" v-if="invoiceData.typeId!=7 && invoiceData.typeId!=6">
                <div class="fl font-ipt ellipsis_name font-108 invoiceDetails-list-fl">付款方</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell" style="width: 70%;">{{invoiceData.invoiceTitleName}}</div>
              </div>
              <!--<div class="width fl invoiceDetails-list-mar" v-if="invoiceData.typeId!=7 && invoiceData.typeId!=6">-->
              <div class="width fl invoiceDetails-list-mar" v-if="invoiceData.typeId!=7 && invoiceData.typeId!=6 && invoiceData.typeId!=9">
                <div class="fl font-ipt ellipsis_name font-108 invoiceDetails-list-fl">收款方</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell" v-if="invoiceData.invoiceStatus==1">待识别</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell" v-if="invoiceData.invoiceStatus==2">识别中</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell" v-if="invoiceData.invoiceStatus==4">识别失败</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell" v-if="invoiceData.invoiceStatus==10">审核失败</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell" v-if="invoiceData.invoiceStatus==3 || invoiceData.invoiceStatus==11">{{invoiceData.salesName}}</div>
              </div>
              <div class="width fl invoiceDetails-list-mar">
                <div class="fl font-ipt ellipsis_name font-108 invoiceDetails-list-fl">发票金额</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell" v-if="invoiceData.invoiceStatus==3 || invoiceData.invoiceStatus==11">￥{{invoiceData.taxIncludedPrice|money}}</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell" v-if="invoiceData.invoiceStatus!=3 && invoiceData.invoiceStatus!=11">￥{{invoiceData.invoiceAmt|money}}</div>
              </div>
              <div class="width fl invoiceDetails-list-mar" v-if="invoiceData.typeId!=7 && invoiceData.typeId!='7'">
                <div class="fl font-ipt ellipsis_name font-108 invoiceDetails-list-fl">开票时间</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell">{{invoiceData.invoiceDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
              </div>
              <div class="width fl invoiceDetails-list-mar">
                <div class="fl font-ipt ellipsis_name font-108 invoiceDetails-list-fl">发票代码</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell">{{invoiceData.invoiceCode}}</div>
              </div>
              <div class="width fl invoiceDetails-list-mar">
                <div class="fl font-ipt ellipsis_name font-108 invoiceDetails-list-fl">发票号码</div>
                <div class="fl font-108 ellipsis_name invoiceDetails-list-ell">{{invoiceData.invoiceNo}}</div>
              </div>
              <img class="fl pst-abs" style="bottom: -8px;width: 108.8%;" src="../../assets/img/fill/img_InvoiceStyle.png" />
            </div>

            <div class="bg-ff width invoiceDetails-list-mar pst-abs invoiceDetails-x-wid  font-108">
              <div v-if="invoiceData.typeId == 1 || invoiceData.typeId == 2 || invoiceData.typeId == 3">
                <div class=" font-ipt font-1 invoiceDetails-x-title">项目</div>
                <div class="invoiceDetails-x fl width">
                  <div class="fl invoiceDetails-list-x-first width ellipsis_name" ref="UnfoldShow">{{productNames|strSub}}</div>
                  <div class="font-F89" @click="Unfold" v-show="UnfoldS">展开</div>
                  <div class="font-F89" @click="Retract" v-show="RetractH">收起</div>
                </div>
              </div>
              <div class="invoiceDetails-x fl width" @click="viewPicture(invoiceData.picUrl)">
                <div class="fl invoiceDetails-list-x ellipsis_name">查看发票图片</div>
                <img class="fr invoiceDetails-x-img" src="../../assets/img/right.png"/>
              </div>
              <div class="invoiceDetails-x fl width" v-if="invoiceData.typeId != 4 && invoiceData.typeId != 5 && invoiceData.typeId != 6 && invoiceData.invoiceStatus!=10 && invoiceData.invoiceStatus!=11" @click="showChooseInvoiceType">
                <div class="fl invoiceDetails-list-x ellipsis_name" style="width:10%;">分类</div>
                <img class="fr invoiceDetails-x-img" src="../../assets/img/right.png"/>
                <input v-model="invoiceData.categoryName" readonly class="fr font-1" style="width:70%;text-align: right;padding-right: 1rem;"/>
              </div>
              <div v-if="invoiceData.state!=undefined && invoiceData.state==1">
                <div class="invoiceDetails-x fl width" @click="tosimpleRemiPage" v-if="invoiceData.invoiceStatus==3 ||invoiceData.invoiceStatus=='3'">
                  <div class="fl invoiceDetails-list-x ellipsis_name">发起报销</div>
                  <img class="fr invoiceDetails-x-img" src="../../assets/img/right.png"/>
                </div>
              </div>
              <div class="invoiceDetails-x fl width" @click="toCauseDeatilPage" v-if="invoiceData.invoiceStatus==10 ||invoiceData.invoiceStatus=='10' || invoiceData.invoiceStatus==11 ||invoiceData.invoiceStatus=='11'">
                <div class="fl invoiceDetails-list-x ellipsis_name">查看报销单</div>
                <img class="fr invoiceDetails-x-img" src="../../assets/img/right.png"/>
              </div>
            </div>
          </div>
          <div class="invoiceDetails-rei pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==1">待识别</div><!--这几个暂时用v-show 之后改-->
          <div class="invoiceDetails-rei pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==2">识别中</div>
          <div class="invoiceDetails-rei invoiceD-gre-color pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==3">可报销</div>
          <div class="invoiceDetails-rei pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==10">报销审批中</div>
          <div class="invoiceDetails-rei invoiceD-gre-color pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==11">已报销</div>
          <div class="invoiceDetails-rei invoiceD-rei-color pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==4">识别失败</div>
          <!--<div class="invoiceDetails-yu invoiceDetails-yu-l"></div>
          <div class="invoiceDetails-yu invoiceDetails-yu-r"></div>-->
        </div>
      </div>
      <div class="pst-abs btm-0 width cont bg-ff font-167 font-F89" style="line-height: 3.75rem;">
        <div class="fl width bg-ff invoice_btm_div1" v-if="invoiceData.invoiceStatus==3"  @click="alertDelKuang">删除</div>
        <div class="fl" style="width: 50%;" v-if="invoiceData.invoiceStatus==4"  @click="alertDelKuang">删除</div>
        <img src="../../assets/img/Q_Modular/line@2x.png" v-if="invoiceData.invoiceStatus==4" class="pst-abs" style="width: 1px;bottom: 1rem;left: 50%;"/>
        <div class="fr" v-if="invoiceData.invoiceStatus==4" style="width: 50%;" @click="toInvoiceTypePage">重新上传</div>
      </div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
    <section class="zz InvoiceRise width" v-show="addMaskSuccess">
      <div class="addET-mask bg-000 cont">
        <img class="addET-mask-img" src="../../assets/img/account/icon_Identification_success@2x.png" />
        <p class="font-col-b addET-mask-img-font">删除成功</p>
      </div>
    </section>
    <!--确认删除弹框-->
    <section class="zz" v-show="requireDelInvoice">
      <div class="wrapcenter">
        <div class="InvoiceDel_tips1 bg-ff">
          <div class="section_top1">确定删除该发票吗？</div>
          <div class="section_bottom">
            <div class="qx_set bd-rt-ddd" @click="delReimburseFun(invoiceData.id)">确定</div>
            <div class="qx_set font-fa" @click="cancelDel">取消</div>
          </div>
        </div>
      </div>
    </section>
    <!--发票分类-->
    <section class="zz InvoiceRise width" style="position: absolute;height: 88.1%;" v-show="invoiceTypeAlert">
      <div class="InvoiceRise-margin-top bg-f6" style="margin-top: 30%;height: 85%;">
        <div class="InvoiceRise_title bg-ff font-s15 cont" style="height: 4.166667rem;line-height: 4.166667rem;">
          <p class="fl" @click="closeInvoiceType"><img class="back_img" src="../../assets/img/black_back.png"></p>
          <p class="dis_inb">选择发票类型</p>
          <span class="font-F89 fr" style="margin-right: 1rem;" @click="updateInvoiceType">确定</span>
        </div>
        <div class="invoiceRise_all font-125" style="margin-top: 0.666667rem;overflow-y: scroll;height: 100%;">
          <!-- 切换发票分类-->
          <div class="invoiceRise_item bg-ff pst-rlt height-375" @click="chooseInvoiceType(item.name,item.id)" v-for="(item,index) in typeScreen" v-if="item.state == 1" :class="index==0?'':'bd-top'" :key="index">
            <span :class="checkCategoryName==item.name?'font-3b9':''" class="mG-lft183 ">{{item.name}}</span>
            <p class="pst-abs pst-center" style="right: 2rem;" v-if="checkCategoryName == item.name"><img style="width: 1.16666rem;height: 0.833333rem;" src="../../assets/img/fill/icon_Selected.png"></p>
          </div>
          <div class="bg-f6" style="height: 4rem;"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {queryInvoiceDetail} from '@/api/user/news'//查看详情接口8月10
  import {delReimburse,findInvoiceCategoryAll,updateInvoice} from '@/api/user/loginReg'// 删除发票接口
  export default {
    data() {
      return {
        requireDelInvoice:false,//删除发票确认框
        invoiceId:"",/*发票id*/
        status:"",/*发票状态*/
        testState:true,
        UnfoldS:true,/*展开收起*/
        RetractH:false,/**/
        Inspection:false,/*查验错误信息*/
        invoiceTypeAlert:false,
        checkCategoryName:"",
        checkCategoryId:"",
        invoiceIds:[],
        accessToken:"",
        invoiceData:[],
        typeScreen:[],
        updateInvoiceTypeData:{},
        addMaskSuccess:false,
        productNames:"",
        error_prompt:"",
        content:"",
      }
    },
    methods: {
      timer(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      Unfold(){
        this.$refs.UnfoldShow.style.cssText="white-space: normal;";
        this.UnfoldS = false;
        this.RetractH = true;
      },
      Retract(){
        this.$refs.UnfoldShow.style.cssText="white-space: nowrap;"
        this.UnfoldS = true;
        this.RetractH = false;
      },
      getqueryInvoiceDetail(){
        this.accessToken = localStorage.getItem('userID');
        if(this.invoiceId!="" && this.accessToken!=""){
          queryInvoiceDetail(this.accessToken,this.invoiceId).then(res =>{
            if(res.data.code == 200) {
              this.invoiceData = res.data.data;
              this.checkCategoryName = this.invoiceData.categoryName;
              let dtlList = res.data.data.dtlList;
              if(dtlList.length>0){
                for(let i=0;i<dtlList.length;i++){
                  if(dtlList[i].productName!=null && dtlList[i].productName!=""){
                    this.productNames+=dtlList[i].productName;
                    if(i<dtlList.length-1){
                      this.productNames+='*';
                    }
                  }
                }
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
      //查看发票图片
      viewPicture(picUrl){
        let picUrls = [];
        picUrls[0] = picUrl;
        this.$router.push({name:'list',params:{picUrls:picUrls}});
      },
      //发起报销
      tosimpleRemiPage(){
        this.$router.push({name:'simpleReim'});
      },
      //查看报销单
      toCauseDeatilPage(){
        this.$router.push({name:'reimbDetail',params:{invoiceId:this.invoiceId}});
      },
      //弹出删除确认发票框
      alertDelKuang(){
        this.requireDelInvoice = true;
      },
      //取消删除发票
      cancelDel(){
        this.requireDelInvoice = false;
      },
      //删除发票
      delReimburseFun(id){
        this.invoiceIds.push(id);
        let accessToken = localStorage.getItem('userID');
        let self = this;
        self.requireDelInvoice = false;
        delReimburse(accessToken,self.invoiceIds).then(res =>{
          if(res.data.code == 200){
            self.addMaskSuccess = true;
            setTimeout(function () {
              self.addMaskSuccess = false;
              if(self.status!="" && self.status!=undefined){
                self.$router.push({name:"fill",params:{status:self.status}});
              }else{
                self.$router.push({name:"fill"});
              }
            },300);
          }else{
            self.error_prompt="tel-message";
            self.content = res.data.msg;
          }
        })
      },
      //重新上传
      toInvoiceTypePage(){
        this.$router.push({name:"invoiceType"});
      },
      //获取发票全部分类
      getfindInvoiceCategoryAll(){
        findInvoiceCategoryAll().then(res=>{   //查询发票类别接口
          if(res.data.code == 200){
            this.typeScreen = res.data.data.records;
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //显示全部发票分类
      showChooseInvoiceType(){
        this.invoiceTypeAlert = true;
      },
      closeInvoiceType(){
        this.invoiceTypeAlert = false;
      },
      chooseInvoiceType(name,id){
        this.checkCategoryName = name;
        this.checkCategoryId = id;
      },
      updateInvoiceType(){
        this.updateInvoiceTypeData.id = this.invoiceId;
        this.updateInvoiceTypeData.categoryId = this.checkCategoryId;
        this.updateInvoiceTypeData.categoryName = this.checkCategoryName;
        updateInvoice(localStorage.getItem('userID'),this.updateInvoiceTypeData).then(res=>{
          if(res.data.code == 0 || res.data.code == 200){
            this.invoiceData.categoryName = this.checkCategoryName;
            this.invoiceData.categoryId = this.checkCategoryId;
            this.invoiceTypeAlert = false;
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
    },
    created(){
      if(this.$route.params.invoiceId!=undefined && this.$route.params.invoiceId!="null" && this.$route.params.invoiceId!="" && this.$route.params.invoiceId!=null){
        this.invoiceId = this.$route.params.invoiceId;
        localStorage.setItem('invoiceId',this.invoiceId);
      }else{
        if(localStorage.getItem('invoiceId')!=undefined && localStorage.getItem('invoiceId')!=null && localStorage.getItem('invoiceId')!="null" && localStorage.getItem('invoiceId')!=""){
          this.invoiceId = localStorage.getItem('invoiceId');
        }
      }
      if(this.$route.params.status!=undefined && this.$route.params.status!="null" && this.$route.params.status!="" && this.$route.params.status!=null){
        this.status = this.$route.params.status;
        localStorage.setItem('status',this.status);
      }else{
        if(localStorage.getItem('status')!=undefined && localStorage.getItem('status')!=null && localStorage.getItem('status')!="null" && localStorage.getItem('status')!=""){
          this.status = localStorage.getItem('status');
        }
      }
      this.getqueryInvoiceDetail();
      this.getfindInvoiceCategoryAll();
    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    }
  }
</script>
<style>
  .invoice_btm_div1{
    position: absolute;
    bottom: -4.35rem;
  }
  .invoiceDetails-title-div1{
    padding: 0.5rem 1.5rem 0;
  }
  .invoiceDetails-title-div2{
    padding: 0 1.5rem 0.67rem;
  }
  .invoiceDetails{
    background: #3B71AB;
    height: 92%;
  }
  .invoiceDetails .invoiceDetails-div{
    padding: 1rem 0.6666667rem 0
  }
  .invoiceDetails-k{
    height: 1rem;
    background: #3EA4EB;
    border-radius: 1rem;
  }
  .invoiceDetails-title{
    margin: 0 0.8333333rem;
    width: 90%;
    position: absolute;
    top: 1.3rem;
    border-top: 2.5px solid #1378BB;
  }
  .invoiceDetails-cont{
    line-height: 4.166667rem;
    border-bottom: 1px dashed #f5f5f5;
  }
  .invoiceDetails-cont-top{
    color: #AA301F;
    box-shadow: 1px 7px 14px #ccc inset;
  }
  .invoiceDetails-rei{
    top: 1.2rem;
    padding: 0.05rem 0.4rem;
    margin-right: 1rem;
    color: #F89114;
    background: #f9e8d5a8;
  }
  .invoiceD-rei-color{
    color: #FF4D4F;
    background:rgb(255,237,237);
  }
  .invoiceD-gre-color {
    color: #7CB305;
    background:rgb(241,247,230);
  }
  .invoiceDetails-yu{
    width: 1rem;height: 1rem;border-radius: 1rem;position: absolute;background: #3B71AB;top: 3.7rem;
  }
  .invoiceDetails-yu-l{
    left: -0.6rem;
  }
  .invoiceDetails-yu-r{
    right: -0.6rem;
  }
  .invoiceDetails-list{
    text-align: left;
    padding-top: 0.5rem;
    background: none;
  }
  .invoiceDetails-list-mar{
    padding: 0 1.0833333rem;
    top: 19rem;
    border-radius: 0.4rem;
    line-height: 2.5rem;
  }
  .invoiceDetails-list-fl{
    width:30%;
  }
  .invoiceDetails-list-ell{
    width:70%;
  }
  .invoiceDetails-x{
    border-bottom: 1px solid #F5F5F5;
    padding:0.5rem 0;
  }
  .invoiceDetails-list-x{
    width:67%;
  }
  .invoiceDetails-list-x-first{
    width:100%;
  }
  .invoiceDetails-x-img {
    width: 0.5rem;
    padding-top: 0.75rem;
  }
  .invoiceDetails-x:first-child{
    padding:0 0 0.5rem;
  }
  .invoiceDetails-x:last-child{
    border-bottom:0;
  }
  .invoiceDetails-x-title{
    line-height: 1rem;
    padding-top: 1rem;
  }
  .invoiceDetails .addET-mask{
    width: 10rem;
    height: 7rem;
    opacity: 0.6;
    margin-left: 34%;
    position: absolute;
    top: 15rem;
    border-radius: 5px;
  }
  .invoiceDetails .addET-line-h .clearKong{
    margin-right: 1.75rem;
  }
  .invoiceDetails .addET-mask .addET-mask-img{
    width: 2rem;
    padding-left: 38%;
    padding-top: 1.3rem;
  }
  .invoiceDetails .addET-mask .addET-mask-img-font{
    padding-top: 0.8rem;
  }
  .back_img{
    margin-top: 1.5rem;
    margin-left: 1.0833333rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .InvoiceRise .addET-mask{
    width: 10rem;
    height: 7rem;
    opacity: 0.6;
    margin-left: 34%;
    position: absolute;
    top: 15rem;
    border-radius: 5px;
  }
  .InvoiceRise .addET-mask .addET-mask-img{
    width: 2rem;
    padding-left: 38%;
    padding-top: 1.3rem;
  }
  .InvoiceRise .addET-mask .addET-mask-img-font{
    padding-top: 0.8rem;
  }
  .wrapcenter .InvoiceDel_tips1{
    width: 24.5rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .wrapcenter .InvoiceDel_tips1 .section_top1 {
    width: 59%;
    padding: 20px 20.5%;
    height: 4.1rem;
    line-height: 4.1rem;
    font-weight: bold;
    text-align: center;
    font-size: 1.333rem;
    border-bottom: solid 0.083rem #DDDDDD;
  }
  @media screen and (max-width:321px){
    .invoiceDetails{
      height: 92%;
    }
    .invoiceDetails-title{
      width:89%;
    }
    .invoiceDetails-x-wid{
      width:99%;
    }
    .invoiceDetails-title-div1{
      padding: 0 1.5rem;
    }
    .invoice_btm_div1{
      position: absolute;
      bottom: -3.8rem;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .invoice_btm_div1{
      position: absolute;
      bottom: -3.35rem;
    }
  }
</style>

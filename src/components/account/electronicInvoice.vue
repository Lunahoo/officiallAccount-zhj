<template>
  <div class="electronicInvoice width bg-f6 pst-abs pos-top">
    <div class="electronicInvoice-conter width">
      <div class="paddET-c-p font-b7">
        <p class="addET-line-h font-108"><span class="mG-lft183 E7A7A">选择发票抬头</span></p>

        <div class="width four_wrap bg-ff" >
          <div class="four_father height " @click="InvoiceRiseShow('选择发票抬头')">
            <div class="four_left fl font-125" v-text="addInvoiceInfo.invoiceTitleName" :class="addInvoiceInfo.invoiceTitleName=='请选择'?'font-7b7':'font-2a2a'"></div>
            <img class="fr four_img_right " src="../../assets/img/right.png"/>
          </div>
        </div>
        <p class="addET-line-h font-108"><span class="mG-lft183 E7A7A">选择发票分类</span></p>
        <div class="width four_wrap bg-ff" >
          <div class="four_father height " @click="InvoiceRiseShow('选择发票分类')">
            <div class="four_left fl font-125" v-text="addInvoiceInfo.categoryName" :class="addInvoiceInfo.categoryName=='请选择'?'font-7b7':'font-2a2a'"></div>
            <img class="fr four_img_right " src="../../assets/img/right.png"/>
          </div>
        </div>
        <p class="addET-line-h font-108 width fl" ><span class="mG-lft183 E7A7A dis_block fl">电子发票链接</span><span class="dis_block fr clearKong font-F89 font-133" v-if="eleLink" @click="clearFpUrl">清空</span></p>
        <textarea maxlength="666" class="text-height font-166 textStyle" placeholder="链接地址"  name="suggestions-text"
                  cols="30" rows="10" v-model="eleLink" style="width: 93.5%;padding: 1rem;" @blur="addEleTransImg"></textarea>
      </div>
      <div class="addET-mask bg-000 cont" v-show="addMaskSuccess">
        <img class="addET-mask-img" src="../../assets/img/account/icon_Identification_success@2x.png" />
        <p class="font-col-b addET-mask-img-font">添加成功</p>
      </div>
      <!--错误提示框 :class="addETMColor"-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong">
          <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
        </div>
      </div>
    </div>
    <div class="addET-ipt width cont">
      <div class="addET-ipt-font bt-color height-383 font-col-b font-133" :class="Submission" @click="addETM">提交</div>
    </div>
    <section class="zz InvoiceRise width" style="position: absolute;height: 88.1%;" v-show="InvoiceRisession">
      <div class="InvoiceRise-margin-top bg-f6">
        <div class="InvoiceRise_title bg-ff font-s15 cont"><p class="fl" @click="backAddelec"><img src="../../assets/img/black_back.png"></p><p class="dis_inb">{{chooseTTorFL}}</p></div>
        <div class="invoiceRise_all font-125">
          <!-- 选择发票抬头-->
          <div class="invoiceRise_item bg-ff pst-rlt height-375" v-if="chooseTTorFL=='选择发票抬头'" @click="chooseinvoiceRise(item)" v-for="(item,index) in items" :class="index==0?'':'bd-top'" :key="index">
            <span :class="addInvoiceInfo.invoiceTitleName==item?'font-3b9':''" class="mG-lft183 ">{{item}}</span>
            <p class="pst-abs pst-center" v-if="addInvoiceInfo.invoiceTitleName == item"><img  src="../../assets/img/fill/icon_Selected.png"></p>
          </div>
          <!-- 选择发票分类-->
          <div class="invoiceRise_item bg-ff pst-rlt height-375" v-if="chooseTTorFL=='选择发票分类'&&item.state == 1" @click="chooseinvoiceRise(item.name,item.id)" v-for="(item,index) in invoiceClassAll" :class="index==0?'':'bd-top'" :key="index">
          <span :class="addInvoiceInfo.categoryName==item.name?'font-3b9':''" class="mG-lft183 ">{{item.name}}</span>  <!-- 这里不变-->
          <p class="pst-abs pst-center" v-if="addInvoiceInfo.categoryName == item.name"><img  src="../../assets/img/fill/icon_Selected.png"></p>
        </div>
          <div class="bg-f6" style="height: 4rem;"></div>
        </div>
      </div>
    </section>

    <!--发票已被添加提示-->
    <section class="zz" v-if="invoiceAlreadyAdd">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">这张发票已经被您或其他人添加</div>
          <div class="section_bottom">
            <div class="qx_set1" @click="invoiceAlreadyAdd=false">确定</div>
          </div>
        </div>
      </div>
    </section>

    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" class="font-col-b" id="user_format">{{addElecErrorTips}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {pdf2ImageUpload} from '@/api/user/SignOut'
  import {addInvoiceUrl,findAssetConterCompanyList,findInvoiceCategoryAll,checkAddressUrl} from "@/api/user/loginReg"
  export default{
    data(){
      return {
        invoiceTT:false,
        aa:"",
        invoiceAlreadyAdd:false,
        chooseTTorFL:"",
        InvoiceRisession:false,
        items:[],
        clearK:false,
        Submission:"op-1",
        addElecErrorTips:"",
        error_prompt:"",
        invoiceClassAll:{},   //全部发票类别
        invoiceSubordinate:{},    //发票抬头关联公司列表
        addInvoiceInfo:{   //添加电子发票参数
          companyName:localStorage.getItem("companyName"),            // 上传发票人的公司名称,也就是用户绑定的主公司
          categoryId:"",             //发票类别ID
          categoryName:"请选择",           //发票类别名称
          companyId:localStorage.getItem("companyId"),             //公司ID
          picUrl:"",               //发票url
          invoiceTitleName:"",      //发票抬头
        },
        eleLink:'',
        picUrlFlag:false,
      }
    },
    methods:{
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      addEleTransImg(){  //电子发票链接失焦
        if(this.eleLink.indexOf('.pdf') < 0 && this.eleLink.indexOf('.png?') < 0 && this.eleLink.indexOf('.jpg?') < 0 && this.eleLink.indexOf('.jpeg?') < 0) {
          this.error_prompt = "tel-message";
          this.addElecErrorTips = "不能识别的发票地址";
        }else{
            this.picUrlFlag = true;
        }
      },
      invoiceTtBlur(){

      },
      InvoiceRiseShow(name){
        this.chooseTTorFL = name;
        this.InvoiceRisession = true;
          if(name == "选择发票抬头"){
            findAssetConterCompanyList(localStorage.getItem("companyId")).then(res =>{   //发票抬头关联公司列表
              if(res.data.code == 200){
                this.items = res.data.data;
              }
            })
          }else{
            findInvoiceCategoryAll().then(res=>{   //查询发票类别接口
              if(res.data.code == 200){
                this.invoiceClassAll = res.data.data.records;
              }
            },res=>{
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            })
          }


      },
      clearFpUrl(){
        this.eleLink = "";
        this.clearK = false;
      },
      backAddelec(){
        this.InvoiceRisession = false;
      },
      chooseinvoiceRise(invoiceRiseName,id){
        if(this.chooseTTorFL == "选择发票抬头"){
          this.addInvoiceInfo.invoiceTitleName = invoiceRiseName;
        }else if(this.chooseTTorFL == "选择发票分类"){
          this.addInvoiceInfo.categoryName = invoiceRiseName;
          this.addInvoiceInfo.categoryId = id;     //发票类别ID
          }
      //    this.InvoiceRisession = !this.InvoiceRisession;
        this.InvoiceRisession = false;
      },
      //提交
      addETM(){
          localStorage.setItem("photoUrl",this.eleLink);
          if(this.Submission == 'op-1'){
            this.addInvoiceInfo.picUrl = this.eleLink
            if(this.addInvoiceInfo.invoiceTitleName==""){
              this.error_prompt="tel-message";
              this.addElecErrorTips = "请选择发票抬头";
            }else if(this.addInvoiceInfo.categoryName==""){
              this.error_prompt="tel-message";
              this.addElecErrorTips = "请选择发票类别";
            }else if(this.addInvoiceInfo.picUrl==""){   //如果发票地址为空
              this.error_prompt="tel-message";
              this.addElecErrorTips = "请填写电子发票链接";
              this.Submission = "op-3";
            }else if(this.addInvoiceInfo.picUrl!=""){    //判断电子发票链接地址是否为pdf或图片格式
              if(this.eleLink.indexOf('.pdf') >= 0){
                pdf2ImageUpload(localStorage.getItem("userID"),encodeURIComponent(this.eleLink)).then(res =>{
                  if(res.data.code == 200){
                    this.addInvoiceInfo.picUrl = res.data.data.imageUrl;
                    this.picUrlFlag = true;
                    checkAddressUrl(encodeURIComponent(this.eleLink)).then(res =>{   //查询发票链接接口
                      if(res.data.code == 200){
                        if (res.data.data == true){
                          addInvoiceUrl(localStorage.getItem("userID"),this.addInvoiceInfo).then(res =>{       //添加电子发票接口
                            if(res.data.code == 200){
                              //console.log(res);
                              this.$router.push({
                                name:"fill"
                              })
                            }else{
                              if(res.data.msg == "发票已经存在"){
                                this.invoiceAlreadyAdd = true;
                              }else{
                                this.error_prompt="tel-message";
                                this.addElecErrorTips = res.data.msg;
                              }
                            }
                          })
                        }else if(res.data.data == false){
                          //console.log(this.eleLink);
                          //console.log(res);
                          //alert('格式错误');
                          this.error_prompt="tel-message";
                          this.addElecErrorTips = "此链接为无效发票";
                        }
                      }else {
                        this.$message({
                          message: res.data.msg,
                          type: "error"
                        });
                      }
                    });
                  }else{
                    this.error_prompt="tel-message";
                    this.addElecErrorTips = res.data.msg;
                  }
                },res=>{
                  this.error_prompt="tel-message";
                  this.addElecErrorTips = res.data.msg;
                })
              }else{
                checkAddressUrl(encodeURIComponent(this.eleLink)).then(res =>{   //查询发票链接接口
                  if(res.data.code == 200){
                    if (res.data.data == true){
                      addInvoiceUrl(localStorage.getItem("userID"),this.addInvoiceInfo).then(res =>{       //添加电子发票接口
                        if(res.data.code == 200){
                          //console.log(res);
                          this.$router.push({
                            name:"fill"
                          })
                        }else{
                          if(res.data.msg == "发票已经存在"){
                            this.invoiceAlreadyAdd = true;
                          }else{
                            this.error_prompt="tel-message";
                            this.addElecErrorTips = res.data.msg;
                          }
                        }
                      })
                    }else if(res.data.data == false){
                      //console.log(this.eleLink);
                      //console.log(res);
                      //alert('格式错误');
                      this.error_prompt="tel-message";
                      this.addElecErrorTips = "此链接为无效发票";
                    }
                  }else {
                    this.$message({
                      message: res.data.msg,
                      type: "error"
                    });
                  }
                });
              }
            }
          }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      this.addInvoiceInfo.invoiceTitleName = this.addInvoiceInfo.companyName;
    },
    watch: {
      picUrl(newValue, oldValue){
          if(newValue!=""){
            this.Submission = "op-1";
            this.clearK = true;
          }else{
            this.Submission = "op-3";
          }
      },
      eleLink(newValue, oldValue){
        if(newValue!=""){
          this.Submission = "op-1";
        }
      }
    }
  }
</script>
<style>
  .electronicInvoice{
    /*height:93.4%;*/
    height:100%;
    transition:transform .1s;
  }
  .electronicInvoice .electronicInvoice-conter .paddET-c-p,.electronicInvoice .electronicInvoice-conter .paddET-c-Remarks{
   /* margin-bottom: 1rem;*/
    position: relative;
  }
  .electronicInvoice .electronicInvoice-conter .paddET-c-p .addET-line-h,.electronicInvoice .electronicInvoice-conter .paddET-c-Remarks .addET-line-h{
    line-height: 3rem;
  }
  .electronicInvoice .electronicInvoice-conter .paddET-c-p .invoice_rise{
    line-height: 3.75rem;
    height:3.75rem;
  }
  .electronicInvoice .electronicInvoice-conter .paddET-c-p .invoice_rise .OgPaddingr{
    width: 0.616rem;
    float: right;
    margin-top: 1.33rem;
    margin-right: 1.75rem;
  }
  .electronicInvoice .electronicInvoice-conter .paddET-c-p .invoice_rise .invoice_rise_input{
    width: 73%;
    /*text-indent: 4rem;*/
    margin-right: 0.83333rem;
  }
  .electronicInvoice .addET-ipt .addET-ipt-font{
    margin: 2.333333rem 1.083333rem 0;
    border-radius: 4px;
  }
  .paddET-c-p .aEmpty,.paddET-c-Remarks .numberWord{
    position: absolute;
    bottom: 0.5rem;
    right: 1rem;
    font-size: 1.1666666667rem;
  }
  .electronicInvoice-conter .addET-mask{
    width: 10rem;
    height: 7rem;
    opacity: 0.6;
    margin-left: 34%;
    position: absolute;
    top: 15rem;
    border-radius: 5px;
  }
  .electronicInvoice-conter .addET-mask .addET-mask-img{
    width: 2rem;
    padding-left: 38%;
    padding-top: 1.3rem;
  }
  .electronicInvoice-conter .addET-mask .addET-mask-img-font{
    padding-top: 0.8rem;
  }
  .electronicInvoice .InvoiceRise{
    /*top: 0;
    position: inherit;
    margin-top: 36.8%;
    height: 79%;*/
  }
  .InvoiceRise-margin-top{
    margin-top: 30%;
    height: 84%;
  }
  .electronicInvoice .InvoiceRise .InvoiceRise_title{
    height: 4.166667rem;
  }
  .electronicInvoice .InvoiceRise .InvoiceRise_title p:first-of-type{
    width:30%;
  }
  .electronicInvoice .InvoiceRise .InvoiceRise_title p:nth-of-type(2){
    float: left;
    width: 40%;
    line-height: 4.166667rem;
  }
  .electronicInvoice .InvoiceRise .InvoiceRise_title span{
    width:40%;
  }
  .electronicInvoice .InvoiceRise .InvoiceRise_title p img{
    margin-top: 16%;
    margin-left: 1.0833333rem;
    width:1.5rem;
    height:1.5rem;
  }
  .electronicInvoice .InvoiceRise .invoiceRise_all{
    margin-top: 0.666667rem;
    overflow-y: scroll;
    height: 100%;
  }
  .electronicInvoice .InvoiceRise .invoiceRise_item p{
    right:2rem;
  }
  .electronicInvoice .InvoiceRise .invoiceRise_item p img{
    width:1.16666rem;
    height:0.833333rem;
  }
  .electronicInvoice .zz .section_top{
    height:2rem;
    line-height:2rem;
  }
  .electronicInvoice .addET-line-h .clearKong{
    margin-right: 1.8rem;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px) {

  }
  /*ipad下面的样式*/
  @media screen and (max-width:768px)and (min-width: 450px) {

  }
</style>

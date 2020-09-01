<template>
  <div class="addInvoiceTT width height bg-f6" v-wechat-title="$route.meta.title=transActNameTitle">
    <div class="">
      <div class="width fourWrap bg-ff" >
        <div class="fourF fourWrap_hight bd-btm font-12">
          <div class="four_left fl" ><p class="fl">抬头类型</p><img class="fl" style="width: 1.41666667rem;padding:1.1rem 0 0 0.4rem;" src="../../assets/img/icon_details@2x.png" @click="ttExplain('抬头')"/></div>
          <div class="chooseTT_type fl" v-for="(item,index) in ttType" :class="index==0?'margin-left':'margin-left2'" :key="index">
            <div class="fl"><img :src="item.src" @click="chooseTTtype(index,item.typeName)"></div>
            <div class="fl">{{item.typeName}}</div>
          </div>
        </div>
      </div>
      <div class="invoiceTTName width fourWrap bg-ff" > <!--style="margin-right:0.1rem;"-->
        <div class="fourF fourWrap_hight font-12" :class="dutyParagraphSH==true?'bd-btm':''">
          <div class="four_left fl" >抬头名称</div>
          <textarea class="fr cont-r font-12" :class="addInvoiceTTName!=undefined&&addInvoiceTTName.length>18?'companyName2':'companyName1'" :placeholder="ttPlaceholder" v-model="addInvoiceTTName" @blur="TTysJY('抬头名称',addInvoiceTTName)"></textarea>
        </div>
      </div>
      <div class="width fourWrap bg-ff" v-if="dutyParagraphSH">
        <div class="fourF fourWrap_hight font-12">
          <div class="four_left fl" ><p class="fl">税号</p><img class="fl" style="width: 1.41666667rem;padding:1.1rem 0 0 0.4rem;" src="../../assets/img/icon_details@2x.png" @click="ttExplain('税号')"/></div>
          <input type="text" maxlength="20" class="four_input_R fr cont-r" placeholder="必填15-20位纳税编号" v-model="DutyParagraph" @blur="DutyParagraphJY">
        </div>
      </div>
    </div>
    <div class="special_invoice width bg-ff overflow-h" v-if="needExpertBtn">
      <div class="fourF font-12 fourWrap" :class="needExpert==true?'bd-btm':''">
        <div class="four_left fl" >需要增值税专用发票</div>
        <!--右边按钮点击区 v-model="specialInvoiceOff"-->
        <div class="right_btn btn-appear fr"  ref="btnAppear" @click="specialInvoiceOpen">
          <input type="checkbox" class="al-toggle-button" v-model="switch1">
        </div>
      </div>
      <div class="need_Expert" v-if="needExpert">
        <div class="width fourWrap bg-ff" >
          <div class="mG-lft183 fourWrap_hight bd-btm">
            <div class="four_left fl font-125" >企业地址</div>
            <input type="text"  class="fourContainer_input_right fr cont-r"  placeholder="必填项" v-model="enterpriseAddress" @blur="TTysJY('企业地址',enterpriseAddress)">
          </div>
        </div>
        <div class="width fourWrap bg-ff" >
          <div class="mG-lft183 fourWrap_hight bd-btm">
            <div class="four_left fl font-125" >企业电话</div>
            <!--type="text" onkeyup="value=value.replace(/[^\d\-\d]/g,'')" maxlength=22-->
            <input type="text"  class="fourContainer_input_right fr cont-r"  placeholder="必填项" v-model="enterprisePhone" @blur="TTysJY('企业电话',enterprisePhone)">
          </div>
        </div>
        <div class="width fourWrap bg-ff" >
          <div class="mG-lft183 fourWrap_hight bd-btm" @click="toChooseBank">
            <div class="four_left fl font-125">银行名称</div>
            <div class="fr">
              <img class="fr fourWrap_img_right " src="../../assets/img/right.png"/>
              <div style="width: auto;" class="four_div_right fr cont-r font-125" :class="bankName=='必填项'?'font-7b7':'font-2a2a'">{{bankName}}</div>
            </div>
          </div>
        </div>
        <div class="width fourWrap bg-ff" >
          <div class="mG-lft183 fourWrap_hight bd-btm">
            <div class="four_left fl font-125" >所属支行</div>
            <input type="text"  class="fourContainer_input_right fr cont-r fourContainer_mr"  placeholder="选填项" v-model="BelongingSubBranch"  style="transform:translateX(1.6rem);">
          </div>
        </div>
        <div class="width fourWrap bg-ff" >
          <div class="mG-lft183 fourWrap_hight">
            <div class="four_left fl font-125" >银行账号</div>
            <input type="number" pattern="\d*"  class="fourContainer_input_right fr cont-r"  placeholder="必填项" v-model="AccountNumber" @blur="TTysJY('银行账号',AccountNumber)">
          </div>
        </div>
      </div>
    </div>
    <div class="special_invoice width four_wrap bg-ff" v-if="ttListLengthDisplay">
      <div class="fourF height font-12">
        <div class="four_left fl" >设为默认抬头</div>
        <!--右边按钮点击区-->
        <div class="right_btn btn-appear fr" @click="defaultTT">
          <input type="checkbox" class="al-toggle-button" v-model="specialInvoiceOn">
        </div>
      </div>
    </div>
    <div class="width wrapcenter">
      <div class="font-col-b btn_style height width cont font-133" :class="btnColor" @click="saveInvoiceTT">保存</div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
    <!--抬头&税号名词解释-->
    <div class="zz" v-if="nounExplain" @click="nounExplain=false">
      <div v-if="isTT" class="ttExplain">
        <div class="bg-ff font-108">
          <p>如个人购买，抬头名称可填写个人姓名。</p>
          <p>如企业购买，用于报销，抬头名称填写企业全称,必须填写税号。</p>
        </div>
      </div>
      <div v-else="isTT" class="dutyPExplain">
        <div class="bg-ff font-108">
          <p class="mb font-b">税号（纳税人识别号）</p>
          <p class="mb">纳税人识别号是税务登记证上唯一识别企业的税号，通常由15-20位码组成。</p>
          <p>按照国税总局公告，自2017年7月1日起，企业索取的增值税普通发票需填写纳税人识别号，不符合规定的发票，不得作为合法税收凭证</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {addMemberInvoiceConfig,editMemberInvoiceConfig,queryMemberInvoiceConfigById} from "@/api/aloneC/cInterface"
  export default{
      data(){
          return{
            formSource:'',
            content:"",
            error_prompt:"",
            nounExplain:false,
            isTT:false,
            ttPlaceholder:"必填企业名称",
            dutyParagraphSH:true,   //税号
            addInvoiceTTName:"",
            DutyParagraph:"",    //税号
            needExpert:false,
            specialInvoiceOn:false,
            specialInvoiceOne:1,
            enterpriseAddress:"",
            enterprisePhone:"",
            switch1:false,
            needExpertBtn:true,
            transActNameTitle:"",
            BelongingSubBranch:"",
            AccountNumber:"",
            ttListLengthDisplay:false,
            bankName:"必填项",
            btnColor:"op-3",
            ttListLength:'',    //抬头长度
            specialInvoiceTwo:1,
            ttType:[
              {typeName:"企业",src:require("../../assets/img/btn_Unselected.png")},
              {typeName:"个人/非企业",src:require("../../assets/img/btn_Unselected.png")},
            ],
            ttList:{
              configType:"",    //1：企业；2：个人/非企业
              invoiceTopName:"",   //抬头名称
              orgTaxNo:"",   //税号
              isIncrement:"",   //是否需要增值税发票：1：是；0；否
              increaseAddress:"",   //公司地址
              increaseMobile:"",   //公司电话
              increaseBankCode:"",   //银行编码
              increaseBankName:"",   //银行名称
              increaseBankNo:"",   //银行账号
              id:"",   //编辑时必传
              isDefault:"",    //1：是；0：否
            }
          }
      },
    methods:{
      addInvoiceTTtimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      defaultTT(){  //是否设为默认抬头
          this.specialInvoiceTwo++;
          if(this.specialInvoiceTwo%2==1){
            this.ttList.isDefault = 0;
          }else{
            this.ttList.isDefault = 1;
          }

      },
      //抬头名词解释
      ttExplain(name){
        this.nounExplain = true;
        if(name=="抬头"){
          this.isTT = true;
        }else{
          this.isTT = false;
        }
      },
      //input框为空时校验
      publiceKong(name,key){
        if(key == ""){
          this.error_prompt="tel-message";
          this.content = "请填写"+name;
        }
      },
      TTysJY(name,key){
        this.publiceKong(name,key);
        this.publiceAll();
      },
      DutyParagraphJY(){
        if(this.DutyParagraph==""){
          this.error_prompt="tel-message";
          this.content = "请填写税号";
        }else if(this.DutyParagraph.length==16||this.DutyParagraph.length==19){
          this.error_prompt="tel-message";
          this.content = "请填写正确的税号";
        }
      },
      chooseTTtype(index,name){
          for(let i=0;i<this.ttType.length;i++){
              if(i==index){
                  this.ttType[index].src = require("../../assets/img/btn_selected.png");
                  if(name=="个人/非企业"){
                    this.dutyParagraphSH = false;
                    this.needExpertBtn = false;
                    this.ttPlaceholder = "必填个人/非企业名称";
                  }else{
                    this.needExpertBtn = true;
                    this.dutyParagraphSH = true;
                    this.ttPlaceholder = "必填企业名称";
                  }
              }else{
                this.ttType[i].src = require("../../assets/img/btn_Unselected.png");
              }
          }
        this.publiceAll();
      },
      //添加or编辑抬头公用方法
      addTTorEditTT(name){
        name(localStorage.getItem("userID"),this.ttList).then(res =>{
          if(res.data.code==200){
            this.$router.push({
              name:"invoiceTT",
              params:{
                formSource:this.formSource,
                aa:true
              }
            });
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //保存按钮事件
      saveInvoiceTT(){
        if(this.btnColor=="op-1"){
          this.ttList.invoiceTopName = this.addInvoiceTTName;
          if(this.dutyParagraphSH == true){
            this.ttList.configType = 1;
            this.ttList.orgTaxNo = this.DutyParagraph; //税号
          }else{
            this.ttList.configType = 2;
          }
          if(this.needExpert==true){ //是否需要增值税发票
            this.ttList.isIncrement = 1;
            this.ttList.increaseAddress = this.enterpriseAddress;   //公司地址
            this.ttList.increaseMobile = this.enterprisePhone;    //公司电话
            this.ttList.increaseBankName = this.bankName;  //银行名称
            this.ttList.increaseBankNo = this.AccountNumber;  //银行账号
            this.ttList.increaseBankSubbranch = this.BelongingSubBranch;  //所属支行
          }else{
            this.ttList.isIncrement = 0;
          }
          if(this.transActNameTitle=="修改发票抬头"){
            this.addTTorEditTT(editMemberInvoiceConfig);
          }else{
            this.addTTorEditTT(addMemberInvoiceConfig);
          }

        }
      },
      toChooseBank(){
        //保存页面数据
        this.ttList.addInvoiceTTName = this.addInvoiceTTName;     //抬头
        this.ttList.DutyParagraph = this.DutyParagraph;     //税号
        this.ttList.dutyParagraphSH = this.dutyParagraphSH;   //税号显示
        this.ttList.needExpert = this.needExpert;     //抬头
        this.ttList.specialInvoiceOne = this.specialInvoiceOne;     //
        this.ttList.enterpriseAddress = this.enterpriseAddress;     //企业地址
        this.ttList.enterprisePhone = this.enterprisePhone;     //企业电话
        this.ttList.BelongingSubBranch = this.BelongingSubBranch;     //所属支行
        this.ttList.AccountNumber = this.AccountNumber;     //银行账号
        this.ttList.specialInvoiceOn = this.specialInvoiceOn;     //默认按钮开关
        this.ttList.ttListLengthDisplay = this.ttListLengthDisplay;
        localStorage.setItem("ttInfo",JSON.stringify(this.ttList));
        this.$router.push({
          name:"choiceBank",
          params:{
            source:"addInvoiceTT",
            title:this.transActNameTitle
          }
        });
      },
      specialInvoiceOpen(){
          this.specialInvoiceOne++;
        if(this.specialInvoiceOne%2==1){  //奇数
          this.error_prompt="trans";  //防止关闭的时候失焦事件弹出的验证
          clearInterval(this.addInvoiceTTtimer);
          this.needExpert = false;
          this.publiceAll();
        }else{ //偶数
          this.needExpert = true;
          this.publiceAll();
        }
      },
      //按钮颜色高亮显示
      publiceAll(){
          if(this.dutyParagraphSH == false){  //个人，税号隐藏
            if(this.addInvoiceTTName.length>0){ //个人不开增值税专票
              this.btnColor = "op-1";
            }else{
              this.btnColor = "op-3";
            }
          }else{  //企业
            if(this.needExpert==true){//企业开增值税专票
              if(this.addInvoiceTTName.length>0&&this.DutyParagraph.length>0&&this.enterpriseAddress.length>0&&this.enterprisePhone.length>0&&this.bankName.length>0&&this.bankName!='必填项'&&this.AccountNumber.length>0){
                this.btnColor = "op-1";
              }else{
                this.btnColor = "op-3";
              }
            }else{
              if(this.addInvoiceTTName.length>0&&this.DutyParagraph.length>0){ //企业不开增值税专票
                this.btnColor = "op-1";
              }else{
                this.btnColor = "op-3";
              }
            }
          }
      },
      //修改发票抬头  获取抬头信息
      queryTTinfo(id){
        queryMemberInvoiceConfigById(localStorage.getItem("userID"),id).then(res=>{
            if(res.data.code == 200){
                this.ttList.id= id;
                this.addInvoiceTTName = res.data.data.invoiceTopName;
                if(res.data.data.isDefault==1){ //是否默认
                  this.specialInvoiceOn = true;
                  this.specialInvoiceTwo = 0;
                }
              if(res.data.data.configType==2){//个人
                this.ttType[1].src = require("../../assets/img/btn_selected.png");
                this.dutyParagraphSH = false;
                this.needExpertBtn = false;
                this.publiceAll();
              }else{ //企业
                this.ttType[0].src = require("../../assets/img/btn_selected.png");
                this.DutyParagraph = res.data.data.orgTaxNo;
                if(res.data.data.isIncrement==1){ //开增专的情况下
                  this.switch1 = true;
                  this.specialInvoiceOne=0;
                  this.needExpert = true;
                  this.ttList.increaseBankCode = res.data.data.increaseBankCode;  //银行编码
                  this.enterpriseAddress = res.data.data.increaseAddress;  //企业地址
                  this.enterprisePhone = res.data.data.increaseMobile; //企业电话
                  this.bankName = res.data.data.increaseBankName; //银行名称
                  this.BelongingSubBranch = res.data.data.increaseBankSubbranch; //所属支行 非必传
                  this.AccountNumber = res.data.data.increaseBankNo; //银行账号
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
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.addInvoiceTTtimer,2000);
      })
    },
    canActivate(){
      console.log(transition,"======上一个页面的url信息=======");
    //  transition.next();
    },
      activated() {
      if(this.$route.params.bankN!=""&&this.$route.params.bankN!=null&&this.$route.params.bankN!=undefined){
        this.bankName = this.$route.params.bankN;
        this.switch1 = true;
        this.ttList.increaseBankCode = this.$route.params.code;  //银行编码
        this.needExpert = true;
        this.transActNameTitle = this.$route.params.title;
      }
    },
    created(){
      if(this.$route.params.formSource != "" && this.$route.params.formSource != undefined){
        this.formSource = this.$route.params.formSource;  //预开票
        localStorage.setItem('formSource', this.formSource);
      }else if(localStorage.getItem('formSource') != undefined && localStorage.getItem('formSource') != "" && localStorage.getItem('formSource') != null&& localStorage.getItem('formSource') != 'undefined' && localStorage.getItem('formSource') != 'null'){
        this.formSource = localStorage.getItem('formSource')
      }
      if(this.$route.params.bankN!=""&&this.$route.params.bankN!=null&&this.$route.params.bankN!=undefined){
        this.bankName = this.$route.params.bankN;
        this.ttList = JSON.parse(localStorage.getItem("ttInfo"));
        if(this.$route.params.code!=""&&this.$route.params.code!=null&&this.$route.params.code!=undefined){  //防止客户点击选择银行不选择直接返回情况
          this.ttList.increaseBankCode = this.$route.params.code;  //银行编码
        }
        this.ttListLengthDisplay = this.ttList.ttListLengthDisplay;
        this.transActNameTitle = this.ttList.transActNameTitle;
        this.addInvoiceTTName = this.ttList.addInvoiceTTName; //抬头
        this.DutyParagraph = this.ttList.DutyParagraph; //税号
        //抬头类型、税号显示区
        if(this.ttList.dutyParagraphSH==true){ //上一次选择的企业
          this.ttType[0].src = require("../../assets/img/btn_selected.png");
        }else{
          if(this.ttList.dutyParagraphSH==false){
            this.ttType[1].src = require("../../assets/img/btn_selected.png");
            this.dutyParagraphSH = false;
          }
        }
        this.specialInvoiceOn = this.ttList.specialInvoiceOn;     //默认按钮开关
        //是否开启默认按钮了
        if(this.specialInvoiceOn ==true){
          this.specialInvoiceTwo = 0;
        }
        //需要增值税专用发票区
        this.switch1 = this.ttList.needExpert;
        if(this.switch1 = true){
          this.specialInvoiceOne = 0;
        }
        this.needExpert = this.ttList.needExpert;
        this.specialInvoiceOne = this.ttList.specialInvoiceOne;
        this.enterpriseAddress = this.ttList.enterpriseAddress; //企业地址
        this.enterprisePhone = this.ttList.enterprisePhone;  //企业电话
        this.BelongingSubBranch = this.ttList.BelongingSubBranch;  //所属支行
        this.AccountNumber = this.ttList.AccountNumber;  //银行账号
        //默认抬头设定区
        this.specialInvoiceOn = this.ttList.specialInvoiceOn;
      }else{
        if(this.$route.params.type=="modify"){
          this.transActNameTitle="修改发票抬头";
          this.queryTTinfo(this.$route.params.id);
          this.publiceAll();
        }else{
          this.transActNameTitle="新增发票抬头";
          this.ttType[0].src = require("../../assets/img/btn_selected.png");
        }
        this.ttList.transActNameTitle = this.transActNameTitle;
        //当只有一个抬头的时候默认按钮禁止点击
          this.ttListLength = this.$route.params.dataLength;
          if(this.ttListLength==0){
            this.ttListLengthDisplay = false;
          }else{
            this.ttListLengthDisplay = true;
          }
      }
    },
    beforeDestroy(){
      clearInterval(this.addInvoiceTTtimer);
    },
    watch:{
      DutyParagraph(newValue, oldValue){ //税号
          if(newValue.length>20){
            this.DutyParagraph = oldValue;
          }
          if(this.DutyParagraph.length>14&&this.DutyParagraph.length!=16&&this.DutyParagraph.length!=19){
            this.publiceAll();  //按钮高亮校验
          }else{
            this.btnColor = "op-3";
          }
      },
      addInvoiceTTName(newValue, oldValue){ //抬头名称
        if(newValue.length>36){
          this.addInvoiceTTName = oldValue;
        }
        if(this.addInvoiceTTName.length>0){
          this.publiceAll();  //按钮高亮校验
        }else{
          this.btnColor = "op-3";
        }
      },
      enterpriseAddress(){//企业地址
          if(this.enterpriseAddress.length>0){
            this.publiceAll();  //按钮高亮校验
          }else{
            this.btnColor = "op-3";
          }
      },
      enterprisePhone(newValue, oldValue){//企业电话
        if(newValue.length>0){
          this.publiceAll();  //按钮高亮校验
        }else{
          this.btnColor = "op-3";
        }
//        if(this.enterprisePhone.length>0&&this.enterprisePhone.length<12){
//          this.publiceAll();  //按钮高亮校验
//        }else{
//          this.btnColor = "op-3";
//        }
      },
      bankName(){  //银行名称
        if(this.bankName.length>0){
          this.publiceAll();  //按钮高亮校验
        }else{
          this.btnColor = "op-3";
        }
      },
      AccountNumber(newValue, oldValue){ //银行账号
          if(newValue.length>19){
            this.AccountNumber = oldValue;
          }
          if(this.AccountNumber.length>0&&this.AccountNumber.length<20){
            this.publiceAll();  //按钮高亮校验
          }else{
            this.btnColor = "op-3";
          }
      }
    }
  }
</script>
<style>
  .addInvoiceTT .fourContainer_mr{
    margin-right: 1.7rem;
  }
  .addInvoiceTT .fourF{
    margin-left:1.0833333rem;
  }
  .addInvoiceTT .four_input_R{
    width: 54%;
    padding: 0.84rem 1.583rem 0.84rem 0;
    font-size:1.2rem;
  }
  .addInvoiceTT .special_invoice{
    margin-top:1rem;
  }
  .addInvoiceTT .invoiceTTName textarea{
    width:75%;
    margin-right: 1.666666rem;
    font-family:'Microsoft YaHei';
  }
  .addInvoiceTT .invoiceTTName textarea::-webkit-input-placeholder{
    padding-right: 0.3rem;
  }
  .addInvoiceTT .invoiceTTName .companyName1{
    padding-top:1rem;
    height:2rem;
  }
  .addInvoiceTT .invoiceTTName .companyName2{
    margin-top: 0.3rem;
    line-height: 1.5rem;
    height:3rem;
  }
  .addInvoiceTT .invoiceTTName input{
    width:75%;
  }
  .addInvoiceTT .wrapcenter{
    margin-top:2.333333rem;
  }
  .addInvoiceTT .margin-left{
    margin-left:6rem;
  }
  .addInvoiceTT .margin-left2{
    margin-left:2rem;
  }
  .addInvoiceTT .chooseTT_type{
    line-height:3.7rem;
  }
  .addInvoiceTT .chooseTT_type img{
    width: 1.41666666rem;
    margin-top:1rem;
  }
  .addInvoiceTT .chooseTT_type div:last-of-type{
    margin-left:0.6rem;
  }
  /*苹果btn样式*/
  .addInvoiceTT .right_btn{
    float: right;
    margin-right:1.66rem;
  }
  .addInvoiceTT .btn-appear{
    margin-top:0.6rem;
  }
  /*抬头&&税号名词解释*/
  .addInvoiceTT .ttExplain div,.dutyPExplain div{
    width: 87%;
    margin:0 auto;
    border-radius:4px;
    margin-top:50%;
    padding:1.5rem 0;
  }
  .addInvoiceTT .ttExplain div p{
    padding:0 1rem;
    text-align: justify;
  }
  .addInvoiceTT .ttExplain div p:last-of-type{
    line-height:1.7rem;
    margin-top:1rem;
  }
  .addInvoiceTT .dutyPExplain div p{
    padding:0 1rem;
    text-align: justify;
  }
  .addInvoiceTT .dutyPExplain .mb{
    margin-bottom:1rem;
  }
  @media screen and (max-width:321px){
    .addInvoiceTT .margin-left{
      margin-left:6rem;
    }
    .addInvoiceTT .margin-left2{
      margin-left: 1rem;
    }
  }
</style>

<template>
  <div class="tiedCard width height bg-f6">
    <div class="width bg-f6 height-375 padTop-1">
      <div class="width fourWrap bg-ff" >
        <div class="mG-lft183 fourWrap_hight bd-btm">
          <div class="four_left fl font-125" >姓名</div>
          <input type="text" class="fourContainer_input_right fr cont-r font-125" placeholder="必填，请输入您的真实姓名" v-model="idName" @blur="jySys('姓名',idName)">
        </div>
      </div>
      <div class="width fourWrap bg-ff" >
        <div class="mG-lft183 fourWrap_hight bd-btm">
          <div class="four_left fl font-125" >身份证号</div>
          <input class="fourContainer_input_right fr cont-r font-125"  placeholder="必填，请输入您的身份证号码" v-model="idCard" @blur="jySys('身份证号',idCard)">
        </div>
      </div>
      <div class="width fourWrap bg-ff" >
        <div class="mG-lft183 fourWrap_hight bd-btm">
          <div class="four_left fl font-125" >银行卡号</div>
          <input type="text" pattern="\d*" class="fourContainer_input_right fr cont-r font-125"  placeholder="必填，请输入绑定银行卡号" v-model="bankC" @blur="jySys('银行卡号',bankC)">
        </div>
      </div>
      <div class="width fourWrap bg-ff" >
        <div class="mG-lft183 fourWrap_hight bd-btm" v-if="chooseBank" @click="toChoiceBank">
          <div class="four_left fl font-125">银行名称</div>
          <img class="fr fourWrap_img_right" src="../../../../assets/img/right.png"/>
          <div class="four_div_right fr cont-r font-125 font-7b7" v-if="bankInfo.bankName == ''">必填，如中国银行</div>
          <div class="four_div_right fr cont-r font-125" v-if="bankInfo.bankName != ''" v-text="bankInfo.bankName" ></div>
        </div>
        <div class="mG-lft183 fourWrap_hight bd-btm" v-if="!chooseBank">
          <div class="four_left fl font-125">银行名称</div>
          <img class="fr fourWrap_img_right" src="../../../../assets/img/right.png"/>
          <div class="four_div_right fr cont-r font-125">{{bankInfo.bankName}}</div>
        </div>
      </div>
      <div class="width fourWrap bg-ff fl">
        <div class="mG-lft183 fourWrap_hight bd-btm" @click="toBankCity">
          <div class="four_left fl font-125">开户省市</div>
          <img class="fr fourWrap_img_right " src="../../../../assets/img/right.png"/>
          <div class="four_div_right fr cont-r font-125 font-7b7" v-if="bankInfo.provinceName == '' && bankInfo.cityName == ''">必填，请选择开户省市</div>
          <div class="four_div_right fr cont-r font-125" v-if="bankInfo.provinceName != '' || bankInfo.cityName != ''">{{bankInfo.provinceName}} {{bankInfo.cityName}}</div>
        </div>
      </div>
      <div class="width fourWrap bg-ff fr">
        <div class="mG-lft183 fourWrap_hight" style="width:92%;">
          <div class="four_left fl font-125" >预留手机号</div>
          <input type="text" pattern="\d*"  class="fourContainer_input_right fr cont-r font-125"  placeholder="必填，请输入开卡预留手机号" v-model="idTel" @blur="jySys('预留手机号',idTel)" >
        </div>
      </div>
    </div>
    <div @click="saveBindBankCardNew" class="tiedCard-btn fl four_father bg-FA4 font-col-b font-133 height-383 bRadius-3 cont btn-width" :class="btnColor">
      保存
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
    <!--省市区联动-->
    <section class="showChose width height pst-abs pos-left pos-top" v-show="chooseBankCity" >
      <section class="address">
        <section class="title cont font-s15" style="padding-bottom: 5rem;">
          <div class="fl pd-lf padTop-1 font-96" @click="chooseBankCity = false">取消</div>
          <div class="padTop-1 font-b" style="margin: 0 3rem;">所在地区</div>
          <div class="fr font-F89" @click="chooseBankCity = false" style="margin: -2rem 1.3333rem;">完成</div>
        </section>
        <ul class="font-125 fl" style="height: 80%;width:50%;">
          <!-- 省市区列表 --><!--v.index, v.AREA_NAME, k,-->
          <li class="addList font-108" v-for="(v , k) in allProvinceList" @click="getProvinceId(v.id,k,v.areaName)" v-show="showProvince" >
            <span class="font-3b9" v-if="v.areaName == bankInfo.provinceName">{{v.areaName}}</span>
            <span v-if="v.areaName != bankInfo.provinceName">{{v.areaName}}</span>
          </li>
        </ul>
        <ul class="font-125 fr" style="height: 80%;width:50%;">
          <!-- 省市区列表 --><!--v.index, v.AREA_NAME, k,-->
          <li class="addList font-108" v-for="(v,k) in infoCity" @click="getCityId(v.areaName,v.id)"  v-show="showCity">
            <span class="font-3b9" v-if="v.areaName == bankInfo.cityName">{{v.areaName}}</span>
            <span v-if="v.areaName != bankInfo.cityName">{{v.areaName}}</span>
          </li>
          <li v-if="showZXS" class="addList font-108 font-3b9" @click="getCityId()">{{areaNames}}</li>
        </ul>
      </section>
    </section>
  </div>
</template>
<script>
  import {findAllCityOrProvince,findDetailByPId,bindBankCardNew,findBankByBankCode} from '@/api/aloneC/cInterface'
  import {queryMemberNew} from '@/api/user/userLogin'
  import cardDataList from '../../../../assets/js/cardList.js'
  export default {
    data() {
      return {
        idName:"",/*姓名*/
        idCard:"",/*身份证号*/
        bankC:"",/*银行卡号*/
        idTel:"",/*银行预留手机号*/
        chooseBank:true,
        kaType:true,
        chooseBankCity:false,
        showProvince:true,
        showCity:true,
        op:"",
        showZXS:false,
        saveZXSname:'',
        saveZXSid:'',
        areaNames:"",   //直辖市显示名称
        content:"",
        error_prompt:"",
        btnColor:"op-3",
        bankInfo:{
          name:'',/*姓名*/
          identityNo:'',/*身份证号*/
          bankNumber:'',/*银行卡号*/
          bankName:'',/*银行名称*/
          bankCode:'',/*银行编码*/
          bankMobile:'',/*银行预留手机号*/
          defaultBankNum:1,/*是否作为默认银行卡；1：是，0：否*/
          provinceName:'',/*省份名称*/
          cityName:'',/*城市名称*/
          provinceCode:'',/*省份code*/
          cityCode:'',/*市code*/
          bankLogo:'',  /*银行logo地址*/
        },
        allProvinceList:[],
        infoCity:{},
        cardDataList:cardDataList,
      }
    },
    created(){
      if(localStorage.getItem('saveCardData')=='true'){
        this.bankInfo = JSON.parse(localStorage.getItem("bankInfoList"));
        this.idName = this.bankInfo.name;
        this.idCard = this.bankInfo.identityNo;
        this.bankC = this.bankInfo.bankNumber;
        this.idTel = this.bankInfo.bankMobile;
      }else{
          this.idTel = localStorage.getItem('loginTell').replace(/[" "]/g, "");
          this.bankInfo.bankMobile = this.idTel;
          let identityNo = localStorage.getItem("identityNo");
          let realName = localStorage.getItem("companyRealName");
        if(identityNo!=undefined && identityNo!='undefined' && identityNo!=null && identityNo!="" && identityNo!="null"){
          if(realName!=undefined && realName!='undefined' && realName!=null && realName!="" && realName!="null"){
            this.idName = realName;
            this.idCard = identityNo;
          }else{
            let companyId = ""
            if(localStorage.getItem("companyId")!=undefined &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
              companyId = localStorage.getItem("companyId");
            }else{
              companyId = "";
            }
            queryMemberNew(localStorage.getItem("userID"),companyId).then(res => {
              if (res.data.code == 200) {
                this.idName = res.data.data.realName;
                this.idCard = res.data.data.identityNo;
                localStorage.setItem('companyRealName',this.idName);
                localStorage.setItem('identityNo',this.idCard);
              }
            }, res => {
            });
          }
        }else{
          let companyId = ""
          if(localStorage.getItem("companyId")!=undefined &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
            companyId = localStorage.getItem("companyId");
          }else{
            companyId = "";
          }
          queryMemberNew(localStorage.getItem("userID"),companyId).then(res => {
            if (res.data.code == 200) {
              this.idName = res.data.data.realName;
              this.idCard = res.data.data.identityNo;
              localStorage.setItem('companyRealName',this.idName);
              localStorage.setItem('companyIdentityNo',this.idCard);
            }
          }, res => {
          });
        }
      }
      if(this.$route.params.bankName!=""&&this.$route.params.bankName!=undefined && this.$route.params.bankName!='undefined'&&this.$route.params.bankName!=null){
        this.bankInfo.bankName = this.$route.params.bankName;
        this.bankInfo.bankCode = this.$route.params.bankCode;
        this.bankInfo.bankLogo = this.$route.params.bankLogo;
      }
    },
    methods:{
      tiedCardTTtimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      toChoiceBank(){
        let bankInfoList = JSON.stringify(this.bankInfo);
        localStorage.setItem("bankInfoList",bankInfoList);
        this.$router.push({
          name:"choiceBank",
          params:{
            source:"tiedCard"
          }
        })
      },
      saveBindBankCardNew(){
        this.bankInfo.bankMobile = this.bankInfo.bankMobile.replace(/[" "]/g, "");
        this.bankInfo.bankNumber = this.bankInfo.bankNumber.replace(/[" "]/g, "");
        this.bankInfo.name = this.idName;
        this.bankInfo.identityNo = this.idCard;
        let flag = localStorage.getItem('isOpenSale');
        if(flag == true || flag == 'true'){
          this.$root.$data.isOpenSale = true;
        }else{
          this.$root.$data.isOpenSale = false;
        }
        if(this.bankInfo.cityName==''){
          this.error_prompt="tel-message";
          this.content = "请选择开户省市";
        }else{
          if(this.btnColor == 'op-1'){
            bindBankCardNew(localStorage.getItem('userID'),this.bankInfo).then(res =>{
              if(res.data.code == 200){
                let saveCardSucFromPage = localStorage.getItem('saveCardSucFromPage');
                if(saveCardSucFromPage == 'carryOrder'){
                  if(this.$root.$data.isOpenSale){
                    this.$router.push({name:'carryOrder'});
                  }else{
                    this.$router.push({name:'quotaMana'});
                  }
                }else if(saveCardSucFromPage!=null &&saveCardSucFromPage!="" && saveCardSucFromPage!=undefined && saveCardSucFromPage!='undefined' && saveCardSucFromPage!='carryOrder'){
                  this.$router.push({name:saveCardSucFromPage});
                }
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            },res =>{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            })
          }else{
            this.error_prompt="tel-message";
            this.content = "请填入页面必填字段";
          }
        }
      },
      //按钮高亮校验
      pubBtn(){
        if(this.idName!=''&&this.idCard!=''&&this.bankC!=''&&this.bankInfo.bankName!=''&&this.idTel!=''){
          this.btnColor = "op-1";
        }else{
          this.btnColor = "op-3";
        }
      },
      //input框为空时校验
      publiceKong(name,key){
        if(key == ""){
          this.error_prompt="tel-message";
          this.content = "请输入"+name;
        }
      },
      jySys(name,key){
        this.publiceKong(name,key);
      },
      //弹出选择开户城市框
      toBankCity(){
        this.chooseBankCity = true;
        // 获取省数据
        findAllCityOrProvince().then(res =>{
          if(res.data.code == 200){
            if (res.data.data.length > 0) {
              this.allProvinceList = res.data.data;
            }
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //  点击省  显示市区列表
      getProvinceId (id,k,areaName) {
        this.bankInfo.provinceName =areaName;            //显示省名称
        this.bankInfo.provinceCode =id;            //显示省份code
        this.bankInfo.cityName = '';
        this.bankInfo.cityCode = '';
        findDetailByPId(id).then(res =>{
          if(res.data.code == 200){
            if(areaName=='北京市'||areaName=='天津市'||areaName=='上海市'||areaName=='重庆市'){ //直辖市下面直接显示市
              this.bankInfo.cityName = areaName;
              this.bankInfo.cityCode = res.data.data[0].areaList[0].id;
              this.areaNames = areaName;
              this.saveZXSname=areaName;
              this.saveZXSid=res.data.data[0].areaList[0].id;
              this.showZXS = true;
              this.showCity = false;
            }else{
              this.showZXS = false;
              this.showCity = true;
              this.infoCity = res.data.data[0].areaList;
            }
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //点击市名称   显示区列表
      getCityId (areaName,id){
        if(areaName=='北京市'||areaName=='天津市'||areaName=='上海市'||areaName=='重庆市'){
          this.bankInfo.cityName = this.saveZXSname;
          this.bankInfo.cityCode = this.saveZXSid;
        }else{
          this.bankInfo.cityName = areaName;  //显示市名称
          this.bankInfo.cityCode = id;  //显示市code
        }
      },
    },
    activated(){
      if(this.$route.params.bankN!=""&&this.$route.params.bankN!=undefined&&this.$route.params.bankN!=null){
        this.bankN = this.$route.params.bankN;
      }
    },
    beforeDestroy(){
      clearInterval(this.tiedCardTTtimer);
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.tiedCardTTtimer,2000);
      })
    },
    //监听事件
    watch:{
      idName(){ //姓名
        if(this.idName!='' && this.idName.length>0){
          this.pubBtn();
        }else{
          this.btnColor = "op-3";
        }
        this.bankInfo.name = this.idName;
      },
      idCard(newValue, oldValue){ //身份证号
        if(newValue!=null && newValue.length>18){
          this.idCard=oldValue;
        }
        if(this.idCard != null && this.idCard.length==18){
          this.pubBtn();
        }else{
          this.btnColor = "op-3";
        }
        this.bankInfo.identityNo = this.idCard;
      },
      bankC(newValue, oldValue){  //银行卡号
        if(newValue!=null && newValue.length>19){
          this.bankC=oldValue;
        }
        if(this.bankC!=''){
            if(this.bankC.length>=6){
              let value = this.bankC.replace(/[" "]/g, "").substr(0,6);
              for(let i=0;i<this.cardDataList.length;i++){
                if(value == this.cardDataList[i].bin){
                  this.bankInfo.bankName = this.cardDataList[i].bankName;
                  this.bankInfo.bankCode = this.cardDataList[i].bankCode;
                  this.chooseBank = false;
                  findBankByBankCode(localStorage.getItem('userID'),this.bankInfo.bankCode).then(res =>{
                    if(res.data.code == 200){
                      if(res.data.data != null){
                        this.bankInfo.bankLogo = res.data.data.bankLogo;
                      }
                    }else{
                      this.error_prompt="tel-message";
                      this.content = res.data.msg;
                    }
                  },res =>{
                    this.error_prompt="tel-message";
                    this.content = res.data.msg;
                  })
                }
              }
                if(this.bankC.length>11){
                  this.pubBtn();
                }
            }else{
              this.btnColor = "op-3";
            }
        }else{
          this.bankInfo.bankName = "";
          this.bankInfo.bankCode = "";
          this.bankInfo.bankLogo = "";
          this.chooseBank = true;
        }
        if(this.bankC.length > 11){
          this.pubBtn();
        }else{
          if(this.bankC.length == 6){
              let value = this.bankC.replace(/[" "]/g, "");
          }else if(this.bankC == ''){
            this.bankInfo.bankName = "";
            this.bankInfo.bankCode = "";
            this.bankInfo.bankLogo = "";
            this.chooseBank = true;
          }
          this.btnColor = "op-3";
        }
        this.cardColor = "font-2a2a";
        /*if(this.bankC!=null && this.bankC!= "" && this.bankC!=undefined){
         this.bankC = this.$spaceOther.bankcardSpace(newValue,oldValue,this.bankC);
         }*/
        this.bankInfo.bankNumber = this.bankC;
      },
      idTel(newValue, oldValue) { //手机号
        if(newValue!=null && newValue.length>11){
          this.idTel = oldValue;
        }
        if(this.idTel.length==11){
          this.pubBtn();
        }else{
          this.btnColor = "op-3";
        }
        /*自动添加空格*/
        /*if(this.idTel!=null && this.idTel!= "" && this.idTel!=undefined){
         this.idTel = this.$spaceOther.telSpace(newValue,oldValue,this.idTel);
         }*/
        this.bankInfo.bankMobile = this.idTel;
      },

    },
    //当页面跳转时清除定时器
    beforeRouteEnter(to,from,next){
      if(from.path == "/choiceBank"){
        localStorage.setItem('saveCardData','true');
        next();
      }else{
        if(from.path == "/carryOrder" || from.path == "/intelligentSale"){
          localStorage.setItem('saveCardSucFromPage','carryOrder');
        }else if(from.path == '/bankCard'){
          localStorage.setItem('saveCardSucFromPage','bankCard');
        }else if(from.path == '/cRecharge' || from.path == '/cardDetail'){
          localStorage.setItem('saveCardSucFromPage','cardDetail');
        }else{
          if(from.path == '/'){
            localStorage.setItem('saveCardSucFromPage',localStorage.getItem('saveCardSucFromPage'));
          }else{
            localStorage.setItem('saveCardSucFromPage','undefined');
          }
        }
        localStorage.setItem('saveCardData','false');
        next();
      }
    },
  }
</script>
<style>
  .tiedCard .tel_input{
    width: 60%;
    padding: 0.84rem 0 0.84rem 0;
    transform:translateX(0.6rem);
  }
  .btn-width{
    width: 93%;
    margin-top: 3rem;
  }
  .tiedCard-btn{
    margin-top: 2.3333333rem;
    background: #FFA436;
  }
  .myAddress {
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245, 245, 245, 1);
    color: #333;
  }
  .myAddress .cont {
    border-bottom: 1px solid rgba(245, 245, 245, 0.8);
  }
  .myAddress .cont span {
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
  }
  .myAddress .cont section {
    float: left;
  }
  .myAddress .cont img {
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
  }
  .showChose {
    z-index: 120;
    background: #666;
  }
  .address {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 121;
    background: #fff;
    width: 100%;
    height:60%;
  }
  .title h4 {
    display: inline-block;
    margin-left: 2rem;
    font-size: 0.32rem;
    line-height: 0.88rem;
    font-weight: normal;
    color: #999;
  }
  .title span {
    margin: 0.42rem 0 0 2.2rem;
    font-size: 0.45rem;
    line-height: 0.34rem;
    color: #D8D8D8;
  }
  .area {
    display: inline-block;
    font-size: 1.083rem;
    line-height: 0.88rem;
    margin-left: 0.8rem;
    color: #333;
  }
  .linkPadT2{
    padding-top: 1.8rem;
  }
  .addList {
    line-height: 3.88rem;
    padding-left: 20%;
  }
  /* 修改的格式 */
  .address ul {
    overflow: auto;
  }
  .address .title .active {
    color: #3B92EF;
    border-bottom: 0.2rem solid #3B92EF;
    padding: 0 0.6rem 0.5rem;
  }
  .address ul .active {
    color: #0071B8;
  }
</style>

<template>
  <div @click="CSbgLogin">
    <!--返回键************-->
    <!--<div class="captcha cont height-316 bd-btm">
      <img class="goCaptcha_img fl" @click="kaGoBack" src="../../../../assets/img/left.png">&lt;!&ndash;&ndash;&gt;
      <span class="captcha captcha_size font-125 pd-rt135" style="color: #2A2E2E;font-weight: bold;">{{article}}</span>
    </div>-->

    <!--银行列表************-->
    <div class="cardType height-942 width" v-if="kaType">
      <section class="title font-167">
        <div class="savingsCard font-ipt cont" :class="savingsCardColor"  @click="card($event)">储蓄卡</div>
        <!--暂时先隐藏,后期会加入信用卡业务,勿删-->
        <!--<div class="creditCard font-ipt cont" :class="creditCardColor" @click="card1($event)">信用卡</div>-->
      </section>
      <section class="cardType_content">
        <div class="view1" v-for="(item1,index1) in letter" :key="index1" v-if="isShow">
          <p class="width bg-f6 font-1 font-a39" :id="item1.sort" >{{item1.sort}}</p>
          <div class="sec_div font-2a2a" v-if="item1.sort == item2.sort" v-for="(item2,index2) in bankDetail" :key="index2"><div class="section_bor" @click="transferValue(item2.bankName,item2.bankCode)">{{item2.bankName}}</div></div>
        </div>
        <div class="view2" v-else>

        </div>
      </section>
      <div class="floorLocation ">
        <a :href="'#'+item.firstLetter" class="font-a39" v-for="(item,index) in AZ" @click="location(item.firstLetter)">{{item.firstLetter}}</a>
      </div>
    </div>
    <!--银行列表结束************-->

    <!--添加银行卡************-->
    <div class="aBank width height-942" v-else="!kaType">
      <div class="aBank-conter fl pst-rlt width">
        <div class="aBank-title fl width">
          <div class="aBank-title-margin">
            <div class="aBank-title-l fl">{{name}}</div>
            <div class="aBank-title-r fr">{{idCard}}</div>
          </div>
        </div>
        <div class="aBank-main fl width bg-ff font-125">
          <div class="aBank-main-f">
            <div class="aBank-main-float bd-btm">
              <div class="aBank-m-label fl">银行卡号</div>
              <div class="aBank-m-input fr"><input type="tel" :class="cardColor" ref="card_num" placeholder="请输入本人银行卡号" maxlength="23" v-model="bankC" @blur="bankCardNum"/>
                <div class="logindetele" @click="logindetele" v-show="bankC"><img src="../../../../assets/img/clean.png"/></div>
              </div>
            </div>
          </div>

          <div class="aBank-main-f" v-show="cardType">
            <div class="aBank-main-float bd-btm">
              <div class="aBank-m-label fl" >卡类型</div>
              <div class="aBank-m-input fr" @click="chooseCardType" >
                <input  placeholder="请选择卡类型" :type="aBankCtype" :disabled="allowClick" v-model="Ctype"/>
                <img src="../../../../assets/img/right.png" class="fr" style="padding-right: 0.8rem;width: 0.5rem;padding-top: 1.6rem;" />
              </div>
            </div>
          </div>
          <div class="aBank-main-f">
            <div class="aBank-main-float bd-btm">
              <div class="aBank-m-label fl">预留手机</div>
              <div class="aBank-m-input fr">
                <input type="tel" ref="card_tel" :class="telColor" placeholder="请输入银行预留手机号" maxlength="13" @blur="ReserveTel" v-model="tel"/>
                <div class="logindetele" @click="logindetele1" v-show="tel"><img src="../../../../assets/img/clean.png"/></div>
              </div>
            </div>
            <div >
              <div class="aBank-main-float bd-btm font-125">
                <div class="aBank-m-label fl">验证码</div>
                <div class="aBank-m-input fr">
                  <input class="aBipt" type="tel" v-model="yzm" maxlength="4"/><!--@blur="getYzm"-->
                  <div class="aBank-m-ipt fr cont font-7b7" @click="obtainYzm" :class="color" v-if="timerJH.canGet">获取验证码</div><!---->
                  <div class="aBank-time font-7b7" v-else="timerJH.canGet">{{timerJH.waitTime}}<span> 秒后重新获取</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="aBank-foot width fl">
            <div class="aBank-foot-btn width fl cont"><p class="aBank-foot-font bt-color font-125" :class="op" @click="addBCC">添加银行卡</p></div>
          </div>
        </div>
        <!--错误提示框-->
        <div class="tel-mess" ref="telmess">
          <div class="juzhong">
            <section :class="[error_tip]" id="setPwd_format" ref="setPwd_format">{{addBcontent}}</section>
          </div>
        </div>
        <div class="setPSW-more cont width font-125 pst-abs btm-3 font-96" ref="moreMes" @click="cardProblem" v-show="addProblem">添加遇到问题?</div>
      </div>
      <!--添加成功提示************-->
      <div class="addET-mask bg-000 cont" v-show="aBankMaskSuccess">
        <img class="addET-mask-img" src="../../../../assets/img/account/icon_Identification_success@2x.png"/>
        <p class="font-col-b addET-mask-img-font">添加成功</p>
      </div>
    </div>


    <!--添加银行卡结束************-->
    <section class="zz" v-show="isappear">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top height-383" style="line-height: 4.1rem;">确认退出吗？</div>
          <div class="section_bottom">
            <div class="qx_set" @click="cardCancel">取消</div>
            <div class="qx_right qx_set" @click="cardGoback">确认</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {sendSmsCodeBankCard,bindCard,checkRealName,queryBankByBin,queryBankList} from '@/api/user/loginReg';
  function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };
  export default{
    data(){
      return{
        kaType:false,//卡类型div
        allowClick:"",    //设置disabled属性
        aBankCtype:"text",   //input属性
        article:"",
        aBTimer:null,
        addProblem:true,    //添加遇到问题的显示隐藏
        Ctype:"",     //卡类型
        o:"",        //记录验证码的获取次数
        name:"",    //姓名
        idCard:"",   //
        bankC:'',       //新增的银行卡号
        tel:"",       //预留手机
        yzm:"",
        telColor:"",     //手机号输入错误之后的颜色值
        cardColor:"",      //银行卡号输入错误之后的颜色值
        color:"",       //获取验证码的高亮色
        op:"",           //添加银行卡高亮色
        click:false,
        cardType:false,
        error_tip:"",
        addBcontent:"",
        allow:false,
        aBankMaskSuccess:false,
        accessToken:"",
        frontSix:"",      //前6位
        idName:"",     //企业用户保存姓名
        id:"",      //企业用户保存的身份证
        bindCardData:{            //绑卡请求参数
          bankNumber:"",    //银行卡号
          bankName:"",
          bankMobile:"",      //银行预留手机号
          bankCode:"",    //银行编号
          smsCode:""
        },
        sendYzm:{   //绑卡发送验证码请求参数
          type:"1",
          retry:"N",
          mobile:"",
          bankNumber:""
        },
        isappear:false,
        /*银行卡类型*/
        isShow:true,
        savingsCardColor:"action",
        creditCardColor:"",
        byTime:{},
        bankDetail:[],               //银行明细
        letter:[],                     //所有首字母
        timerJH:{
          canGet:true,
          timer:null,
          waitTime:59
        },
        AZ:[
          {firstLetter:"A"},
          {firstLetter:"B"},
          {firstLetter:"C"},
          {firstLetter:"D"},
          {firstLetter:"E"},
          {firstLetter:"F"},
          {firstLetter:"G"},
          {firstLetter:"H"},
          {firstLetter:"I"},
          {firstLetter:"J"},
          {firstLetter:"K"},
          {firstLetter:"L"},
          {firstLetter:"M"},
          {firstLetter:"N"},
          {firstLetter:"O"},
          {firstLetter:"P"},
          {firstLetter:"Q"},
          {firstLetter:"R"},
          {firstLetter:"S"},
          {firstLetter:"T"},
          {firstLetter:"U"},
          {firstLetter:"V"},
          {firstLetter:"W"},
          {firstLetter:"X"},
          {firstLetter:"Y"},
          {firstLetter:"Z"}
        ]
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
          document.getElementsByClassName("bt-font1")[0].style.cssText="opacity:.3!important";  //改id名
        }
      }
    },
    methods:{
      /*点击空白处失焦*/
      CSbgLogin(){

      },
      //返回事件
      kaGoBack(){
        if(this.kaType == false){
          this.isappear = true;
        }else{
          this.kaType = false
        }
      },
      //取消返回操作
      cardCancel(){
        this.isappear = false;
      },
      //确认返回
      cardGoback(){
        this.isappear = false;
//        this.$router.go(-1);
        this.$router.push({
          name:"bankCard",
        })
      },
      //添加遇到的问题
      cardProblem(){
        this.$router.push({
          name:"problem",
        })
      },
      timer:function(){
        if(this.error_tip == "tel-message"){
          this.error_tip = "trans1";
        }
      },
      //初始化显示用户名和身份证号
      init(){
          //console.log(1111);
        this.kaType = false;
        this.article = "添加银行卡";
        this.accessToken = localStorage.getItem("userID");
        this.o = 0;  //刚进入页面的时候记录获取验证码次数
        /*          //判断是否是手动选择卡类型回来的页面
         if(this.$route.params.cardN != null && this.$route.params.cardN != undefined) {
         this.cardType = true;
         this.Ctype = this.$route.params.cardN;
         this.bankC = localStorage.getItem("BankNumber");
         this.name = localStorage.getItem("hiddenName");
         this.idCard = localStorage.getItem("hiddenCard");
         this.tel = localStorage.getItem("bankTel");
         }else{  */
        //从银行卡列表进入
        //左边姓名区
        if(this.$route.params.nameReal!=undefined && this.$route.params.nameReal!=""){
          let lastName = this.$route.params.nameReal.substr(-1);
          for(let i=1;i<this.$route.params.nameReal.length;i++){
            this.name += "*";
            if(i == (this.$route.params.nameReal.length - 1)){
              this.name = this.name + lastName ;
              localStorage.setItem("BankName",this.name);
              /*localStorage.setItem("hiddenName",this.name);*/
            }
          }
        }else{
          this.name =  localStorage.getItem("BankName");
        }
        //右边卡号区
        if(this.$route.params.cardReal!=undefined && this.$route.params.cardReal!=""){
          let lastNum = this.$route.params.cardReal.substr(-1);
          let firstNum = this.$route.params.cardReal.slice(0,1);
          this.idCard = firstNum;
          for(let i=1;i<(this.$route.params.cardReal.length-1);i++){
            this.idCard += "*";
            if(i == (this.$route.params.cardReal.length - 2)){
              this.idCard = this.idCard + lastNum ;
              localStorage.setItem("IDCard",this.idCard);
              /*localStorage.setItem("hiddenCard",this.idCard);*/
            }
          }
        }else{
          this.idCard =  localStorage.getItem("IDCard");
        }
//          document.getElementById("setPwd_format").style = "top:32.5rem!important";
      },
      //卡类型
      chooseCardType(){
        //防止卡号不正确的时候用户手动选择卡类型，所以添加延迟，让提示弹框出现之后再显示银行列表
     //     if(this.bankC.length > 7 && this.bankC.length < 9){
     //   window.routerTimer = setInterval(() => {
          this.kaType = true;
          this.article = "选择卡类型";
          queryBankList(this.accessToken).then(res =>{
            if(res.data.code == 200){
              this.letter = res.data.data.bankSortList;
              this.bankDetail = res.data.data.bankList;
            }else{
              this.error_tip = "tel-message";
              this.addBcontent = res.data.msg;
            }
          },res =>{
            this.error_tip = "tel-message";
            this.addBcontent = res.data.msg;
          })
     //   }, 2000);
       //   }
      },
      //确定卡类型
      transferValue(cardName,bankCode){
        this.kaType = false;
        this.article = "添加银行卡";
        this.bindCardData.bankName = cardName;
        this.Ctype = cardName + " 储蓄卡";
        this.bindCardData.bankCode = bankCode;
        //判断现在是信用卡还是储蓄卡是高亮色，便于后台接收卡类型，现在还没有信用卡所以action的样式隐藏
        if(this.savingsCardColor == "action"){
          this.bindCardData.type = 1;
        }else{
          this.bindCardData.type = 2;
        }
      },
      //楼层定位
      location(zm){
        this.$nextTick(() =>{
          let scroll_top = document.documentElement.scrollTop;
          document.documentElement.scrollTop = scroll_top - 100;
          document.body.scrollTop = scroll_top - 100;
        })
      },
      card(e){
        if(e.target.innerHTML == "储蓄卡"){
          this.isShow = true;
          this.savingsCardColor = "action";
          this.creditCardColor = "";
        }else{
          this.creditCardColor = "action";
          this.savingsCardColor = "";
          this.isShow = false;
        }
      },
      card1(e){
        this.card(e);
      },
      //小叉号事件
      logindetele:function () {
        this.bankC = '';
        this.cardType = false;
        this.aBankCtype = "text";
        this.allowClick = "";
        this.Ctype = "";
        this.color = "";
        this.$refs.card_num.focus();
        window.document.getElementsByClassName("tel-mess")[0].style.display = "none";
      },
      logindetele1:function () {
        this.tel = '';
        this.$refs.card_tel.focus();
        window.document.getElementsByClassName("tel-mess")[0].style.display = "none";
        this.color = "";
      },
      //公共验证区--手机号和银行卡号不为空
      publicYz(){
        if(this.bankC == null || this.bankC == "" || this.bankC == undefined){
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          this.error_tip = "tel-message";
          this.addBcontent = "银行卡号不能为空";
          this.allow = false;
        }else if(this.tel == null || this.tel == "" || this.tel == undefined){
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          this.error_tip = "tel-message";
          this.addBcontent = "请输入手机号";
          this.allow = false;
        }else{
          this.allow = true;
        }
      },
      //验证码失焦
      getYzm(){
        this.publicYz();
        if(this.allow == true && this.yzm !=  '' && this.yzm !=  null && this.yzm != undefined){
          this.op = "opacity";
        }else{
          this.op = "";
        }
      },
      //银行卡号输满6位就自动识别卡类型
      sixDistinguish(){
        //识别输入的卡类型
        /*localStorage.setItem("BankNumber",this.bankC);*/
        if(this.bankC!=undefined){
          this.frontSix = this.bankC.substr(0,7).replace(/[" "]/g, "");      //获取银行卡前6位
        }
        queryBankByBin(this.accessToken,this.frontSix).then(res =>{
          if(res.data.code == 200){
            this.cardType = true;
            if(res.data.data != null && res.data.data != "" && res.data.data != undefined){
              if(res.data.data.bankName!=null && res.data.data.bankName!=undefined && res.data.data.bankName!=""){  //后台传回的data数据为null，所以bankName报错
                this.bindCardData.bankCode = res.data.data.bankCode;
                this.bindCardData.bankName = res.data.data.bankName;
                this.bindCardData.type = res.data.data.type;
                this.Ctype = res.data.data.bankName +" 储蓄卡";
                this.aBankCtype = "button";
                this.allowClick = "disabled";
              }
            }else{
              this.aBankCtype = "text";
              this.allowClick = "";
              this.Ctype = "";
            }
          }else if(res.data.code == 9997){
            this.error_tip = "tel-message";
            this.addBcontent = res.data.msg;
          }else{
            window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
            this.error_tip = "tel-message";
            this.addBcontent = res.data.msg;
          }
        },res =>{
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          this.error_tip = "tel-message";
          this.addBcontent = res.data.msg;
        })
      },
      //银行卡号失焦验证
      bankCardNum(){
        //验证银行卡格式
        if(this.bankC == ""){ //当银行卡为空的情况
          this.cardType = false;
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          this.error_tip = "tel-message";
          this.addBcontent = '银行卡不能为空';
        }else{
            if(this.bankC.length < 9){
              this.cardColor = "font-22d";
              window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
              this.error_tip = "tel-message";
              this.addBcontent = '银行卡输入有误';
            }else{
              if(this.$format.bankFormat(this.bankC) == true){   //验证成功之后显示卡类型
                //    this.cardType = true;
                if(this.Ctype != "" && this.$format.PhoneFormat(this.tel) == true && this.yzm!=""){
                  this.op = "opacity";
                }else{
                  this.op = "";
                }

              }
          }

        }

      },
      //预留手机号失焦验证验证
      ReserveTel(){
        //此处的验证是加了空格之后的验证  手机号的空格之后加上去
        if(this.tel !=  '' && this.tel !=  null && this.tel != undefined){
          if(this.$format.PhoneFormat(this.tel) == false){
            this.telColor = "font-22d";
            window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
            this.error_tip = "tel-message";
            this.addBcontent = '手机号格式有误';
          }else{ //手机号校验通过获取验证码框高亮
            if(this.Ctype != "" && this.$format.bankFormat(this.bankC) == true && this.yzm!=""){
              this.op = "opacity";
            }else{
              this.op = "";
            }
            if(this.Ctype != "" && this.$format.bankFormat(this.bankC) == true){
              this.color = "changeColor";
            }
            /* localStorage.setItem("bankTel",this.tel);*/
          }
        }else{
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          this.error_tip = "tel-message";
          this.addBcontent = '请输入您的手机号';
        }
      },
      //点击获取验证码
      obtainYzm(){
        if(this.bankC == null || this.bankC == "" || this.bankC == undefined){
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          this.error_tip = "tel-message";
          this.addBcontent = "银行卡号不能为空";
        }else if(this.tel == null || this.tel == "" || this.tel == undefined){
          window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
          this.error_tip = "tel-message";
          this.addBcontent = "请输入手机号";
        }else if(this.color == "changeColor"){        //银行卡号和手机号正确的情况下获取验证码
          if(this.o >= 1){
            this.sendYzm.retry = 'Y';
          }
          if(this.tel!=undefined){
            this.sendYzm.mobile = this.tel.replace(/[" "]/g, "");
          }
          this.sendYzm.bankNumber = this.bankC;
          sendSmsCodeBankCard(this.accessToken,this.sendYzm).then(res =>{
            console.log(res);
            if(res.data.code == 200){
              this.timerJH.canGet = false;
              this.timerJH.timer = window.HHTimer;
              this.byTime = this.$spaceOther.timeCountdown(this.timerJH);  //调用公用验证码倒计时
              this.click = true;
              this.o ++;
            }else if(res.data.code == 9997) {
              this.error_tip = "tel-message";
              this.addBcontent = res.data.msg;
            }else{
              window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
              this.error_tip = "tel-message";
              this.addBcontent = res.data.msg;
            }
          },res =>{
            window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
            this.error_tip = "tel-message";
            this.addBcontent = res.data.msg;
          })
        }

      },
      //一个添加成功之后跳转回首页的定时器
      aBanktimers(){
        this.aBTimer = setInterval(() =>{
          if(this.aBankMaskSuccess == true){
            this.$router.push({name:"bankCard"});
          }
        },1000)
      },
      //添加银行卡按钮
      addBCC(){
        if(this.op == "opacity"){ //当绑卡发送验证码接口通过的时候允许点击此按钮
          //调用绑卡接口  绑卡验证四要素
          if(this.tel!=undefined){
            this.bindCardData.bankMobile = this.tel.replace(/[" "]/g, "");
          }
          this.bindCardData.smsCode = this.yzm;
          if(this.bankC!=undefined){
            this.bindCardData.bankNumber = this.bankC.replace(/[" "]/g, "");
          }

          bindCard(this.accessToken,this.bindCardData).then(res =>{
            if(res.data.code == 200){
              this.aBankMaskSuccess = true;
              this.aBanktimers();
              console.log(res);
            }else if(res.data.code == 9997) {
              this.error_tip = "tel-message";
              this.addBcontent = res.data.msg;
              return false
            }else{
              window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
              this.error_tip = "tel-message";
              this.addBcontent = res.data.msg;
              return false;
            }
          },res =>{
            window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
            this.error_tip = "tel-message";
            this.addBcontent = res.data.msg;
            return false;
          })
        }

      },
    },
    created(){
      this.$root.$data.vBack=false;
      /*this.$root.$data.article = '添加银行卡';*/
      this.kaType = false;
      this.article = "添加银行卡";
      this.init();
    },
    mounted:function(){
      clearInterval(this.timer);
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
      clearInterval(this.aBTimer);
      clearInterval(this.HHTimer);
    },
    destroyed(){
      clearInterval(this.HHTimer);
      clearInterval(this.timer);
      clearInterval(this.aBTimer);
      this.aBTimer = null;
    },
    beforeDestroy(){
      clearInterval(this.HHTimer);
      clearInterval(this.timer);
      clearInterval(this.aBTimer);
    },
    //监听事件
    watch:{
      //手机号的监听事件
      tel(newValue, oldValue){
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.tel = oldValue;
        }else{
          this.tel = newValue;
        }
        this.telColor = "font-2a2a";
        if( this.tel!=null && this.tel!= "" && this.tel!=undefined){
          this.tel = this.$spaceOther.telSpace(newValue,oldValue,this.tel); //手机号自动添加空格
          if(this.tel.length == 13) {
            this.ReserveTel();
          }else{
            this.op = "";
            this.color = "";
          }
        }

      },
      //银行卡的监听事件
      bankC(newValue, oldValue){
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.bankC = oldValue;
        }else{
          this.bankC = newValue;
        }
        this.cardColor = "font-2a2a";
        if(this.bankC!=null && this.bankC!= "" && this.bankC!=undefined){
          this.bankC = this.$spaceOther.bankcardSpace(newValue,oldValue,this.bankC);
        }

        if(this.bankC.length == 7){
          if(this.cardType == false){
            this.sixDistinguish();
          }
        }else if(this.bankC.length < 7){
          this.cardType = false;
          this.aBankCtype = "text";
          this.allowClick = "";

        }
      },
      //监听用户复删再输行为
      Ctype(){
        if(this.Ctype != null && this.Ctype != "" && this.bankC != null && this.bankC != ""&& this.tel != null && this.tel != ""){
          this.color = "changeColor";
        }
      },
      yzm(){
        let reg=/^\d{4}$/;
        if(this.yzm!=undefined){
          if(reg.test(this.yzm)){
            this.op = "opacity";
            if(this.Ctype != "" && this.$format.bankFormat(this.bankC) == true && this.$format.PhoneFormat(this.tel)){
              this.op = "opacity";
            }else{
              this.op = "";
            }
          }else if(this.yzm.length == 4 && !reg.test(this.yzm)){
            window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
            this.error_tip = "tel-message";
            this.addBcontent = '你输入的验证码格式错误';
            this.cardColor = "font-22d";
            this.op = "";
          }else{
            this.op = "";
          }
        }
      },
      //卡类型显示的时候小弹框的高度变化
      cardType(){
        if(this.cardType == true){
          this.$refs.setPwd_format.style = "top: 7.5rem!important";
        }else{
          this.$refs.setPwd_format.style = "top: 7.5rem!important";
        }
      }
    },
    destroyed(){

    },
  }
</script>
<style>
  .aBank img{
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  /*添加成功提示*/
  .aBank .addET-mask {
    width: 10rem;
    height: 7rem;
    opacity: 0.6;
    margin-left: 34%;
    position: absolute;
    top: 15rem;
    border-radius: 5px;
  }
  .aBank .addET-mask .addET-mask-img {
    width: 2rem;
    padding-left: 38%;
    padding-top: 1.3rem;
  }
  .aBank .addET-mask .addET-mask-img-font {
    padding-top: 0.8rem;
  }
  /*添加成功结束*/

  /*小叉號*/
  .aBank .logindetele{
    width: 1.08333333rem;
    position: absolute;
    right: 0.5rem;
    bottom: 1.4rem;
  }
  .aBank .opacity{
    opacity:1!important;
  }
  .aBank  .tel-message{
    width: 41%!important;
    left: 31%!important;
    top: 7.5rem!important;
  }
  .aBank  .trans1{
    width: 41%!important;
    left: 31%!important;
    top: 7.5rem!important;
    display: block!important;
    opacity: 0;
    transition: opacity 3s;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 0.4rem;
    text-align: center;
    position: absolute;
  }
  .aBank-conter .aBank-title{
    background: #1890FF;
    opacity: 0.7;
  }
  .aBank-conter .aBank-title .aBank-title-margin{
    margin: 0 1.083333rem;
    line-height: 3.9166667rem;
    color: #fff;
    font-size: 1.333333rem;
  }/*
  .aBank-conter .aBank-main{
    font-size: 1.25rem;
  }*/
  .aBank-main .aBank-main-f{
    margin:0 1.083333rem;
    line-height: 4.083333rem;
  }
  .aBank-main .aBank-main-f .aBank-m-input{
    width: 71%;
    position:relative;
  }
  .aBank-main .aBank-main-f .aBank-m-input input{
    width: 92%;
    text-align:left;
  }
  .aBank-main .aBank-main-f .aBank-main-float{
    width: 100%;
    float: left;
  }
  .aBank-m-ipt{
    width: 40%;
    line-height: 2.6rem;
    margin-top: 0.63rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  /*倒计时样式*/
  .aBank .aBank-time{
    padding-left:0.8rem;
    /*width:10.416rem;*/
    font-size:1.1666rem;
    height:2.5rem;
    line-height:2.5rem;
    display:inline-block;
    border-left:solid 1px #E5E5E5;
  }
  .aBank-foot{
    padding-top: 3.666667rem;
  }
  .aBank-foot .aBank-foot-btn{
    line-height: 3.83333rem;
    color: #fff;
    font-size: 1.5rem;
  }
  .aBank-foot-font{
    margin: 0 1.083333rem;
    border-radius: 4px;
    opacity: 0.3;
  }
  .aBank-main-float .aBank-m-input .aBipt{
    width:50% !important;
  }
  /*获取验证码格式高亮*/
  .aBank .changeColor{
    border: 1px solid #FA8C16!important;
    color:#FA8C16!important;
  }
  @media screen and (max-width:321px){
    .aBank{
      height: 93.5%;
    }
    .aBank-m-ipt {
      font-size: 1.1rem;
    }
    .aBank-main .aBank-main-f .aBank-m-input input{
      font-size: 1.15rem;
    }
    .aBank-main-float .aBank-m-input .aBipt{
      width: 41% !important;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .aBank{
      height:96.2%;
    }
  }
  .cardType .title{
    margin-top:0.75rem;
  }
  .cardType .title{
    position:fixed;
    width:100%;
    height:2.833333rem;
    left:0;
    top:2.5rem;
    background:#fff;
  }
  .cardType .cardType_content{
    margin-top:3.1rem;
  }
  .cardType .title div{
    /*width:50%;*/
    width:100%;
    float:left;
    line-height:2.833333rem;
    /*display:inline-block;*/
  }
  /*卡类型选中高亮色,后期添加,勿删*/
  /*.cardType .action{*/
  /*color:#EB7B03;*/
  /*border-bottom:solid 2px #EB7B03;*/
  /*}*/
  .cardType section p{
    line-height: 2.25rem;
    text-indent: 4.5%;
  }
  .cardType section p:first-of-type{
    padding-top: 0.2rem;
  }
  .cardType section .sec_div{
    width:97.5%;
    height:3.75rem;
    line-height:3.75rem;
  }
  .cardType section .section_bor{
    border-bottom:solid 1px #E5E5E5;
    padding-left: 0.4rem;
  }
  .cardType .floorLocation{
    position:fixed;
    width:0.666666rem;
    right:1rem;
    top:9.5rem;
    font-size:0.83333rem;
  }
  .cardType .floorLocation a{
    display:block;
    line-height:1.7rem;
  }
  .cardType .floorLocation a:visited {
    color: #A39C9C;
  }
 /* .aBank .aBank-conter .setPSW-more{
    bottom: 1.5rem;
    position: absolute;
    color: #969191;
  }*/
</style>

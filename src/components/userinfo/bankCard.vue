<template>
  <div class="bank-card-wrap pst-abs width bg-f6">
    <div class="bankCard-conter-show  font-ipt" v-if="backShow">
      <img src="../../assets/image/img_Blankpages_bankcard.png" />
      <p class="font-ipt pd-bt">还没有添加卡片，空空如也～</p>
    </div>
    <div class="bank-card width height" style="overflow-y: scroll" v-else="backShow">
      <div class="bankCard-conter" style="padding-bottom: 10rem" ref="bankCardConter">
        <div class="bankCard-f" v-for="(items,index) in bankContent" :key="items.id">
          <!--<img src="../../assets/img/Q_Modular/bankCard-B.png">-->
          <img src="../../assets/image/img_abc@2x.png">
          <div class="bankCard-c font-col-b width">
            <div class="fl cardStyle">
              <div class="fl">
                <img v-if="items.bankLogo!='' && items.bankLogo!=null" :src="items.bankLogo" style="width: 3rem;margin-left: -3.5rem;margin-top: -0.2rem;"/>
                <img v-if="items.bankLogo=='' || items.bankLogo==null" src="../../assets/img/icon_default@2x.png" style="width: 3rem;margin-left: -3.5rem;margin-top: -0.2rem;"/>
              </div>
              <div class="fl">
                <p class="font-108 fl"><span class="fl">{{items.bankName}}</span><img class="fl" style="width: 2.66667rem;margin-left: .416667rem;" v-if="index==0" src="../../assets/img/aloneC/icon_def@2x.png"/></p>
                <p class="font-108"><span style="margin-top: .2rem;">{{items.type == 1? "储蓄卡":"信用卡"}}</span></p>
              </div>
              <!--<p class="font-075 fl">{{items.cardType}}储蓄卡</p>-->
            </div>
            <div class="delete fr" @click="delete1(items.id)">删除该卡</div>
          </div>
          <div class="IDNumber fl font-col-b">****&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp****&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp****&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="sp">{{items.bankNumber.substr(items.bankNumber.length-4,items.bankNumber.length)}}</span></div>
        </div>
      </div>
    </div>
    <div class="bg-ff width pst-abs btm-0 cont" style="height: 3.833333rem;" @click="addBankCard">
      <img class="fl" src="../../assets/image/icon_add_to@2x.png" style="width: 2.5rem;margin-top: .7rem;margin-left: 37%;"/>
      <p class=" height-383 font-F89 font-133 pst-abs btm-0" style="right: 31%;">添加银行卡</p>
    </div>
    <section class="zz" v-if="delCardK">
      <div class="wrapcenter">
        <div class="wrapcenter_tips1 bg-ff">
          <div class="section_top1">确认删除该卡吗？</div>
          <div class="section_bottom">
            <div class="qx_set bd-rt-ddd" @click="requireDel">确定</div>
            <div class="qx_set font-fa" @click="delCardK = false">取消</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {queryBankCard,unbindCard,checkPayPassword,isRealName} from "@/api/user/loginReg";
  export default{
      name:'bank-card',
      data(){
        return{
            c:"",
          className:"font-ipt",
          tips:"",
          value: '',
          delCardK:false,
          bankName:"",      //银行卡名称
          cardType:"",      //银行卡类型
          backShow:false,
          accessToken:"",
          bankID:"",
          bankContent:{},
          companyId:"",
          checkPayPsw:{      //校验支付密码
                token:"",
                psw:""                //支付密码
          }
        }
      },
    //设置密码输入区样式
    props: {
      number: {
        type: Number,
        default: 6
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
          var List=document.getElementsByClassName('field-wrap');
          List[0].style.cssText="border-color:#FA8C16";
        }
      }
    },
      methods:{
        //初始化检查此账号用户有没有绑定的银行卡
        init(){
          this.bankContent = {};
            this.accessToken = localStorage.getItem('userID');
          queryBankCard(this.accessToken).then(res =>{    //查询用户是否有已经绑定的银行卡
            if(res.data.data!=null && res.data.data.length > 0){   //如果有就显示有卡页面
                if(res.data.code == 200){
                    this.backShow = false;
                    this.bankContent = res.data.data;
                }else{
                  this.$message({
                    message: res.data.msg,
                    type: "warning"
                  });
                }
            }else{   //没有银行卡就显示没有卡页面，引导添加
              this.backShow = true;
            }
          },res =>{   //请求不成功
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          })
        },
        //有卡的情况下继续添加银行卡添加银行卡操作
        goToAdd(){
         //ToDo 直接进入添加银行卡页面,如果实名,缓存姓名和身份证号 否则填入银行卡四要素,联合实名绑卡一块儿操作
          this.$router.push({name:'tiedCard'});
        },
        //空状态下添加银行卡
        addBankCard(){
          this.goToAdd();
        },
        handleSubmit() {
          var List = document.getElementsByClassName('field-wrap');
          this.$emit('input', this.value);
          if (this.value.length == 1) {
            List[1].style.cssText = "border-color:#FA8C16";
            List[0].style.cssText = "border-color:#E5E5E5";
            List[2].style.cssText = "border-color:#E5E5E5";
            List[3].style.cssText = "border-color:#E5E5E5";
            List[4].style.cssText = "border-color:#E5E5E5";
            List[5].style.cssText = "border-color:#E5E5E5";
          } else if (this.value.length == 2) {
            List[2].style.cssText = "border-color:#FA8C16";
            List[1].style.cssText = "border-color:#E5E5E5";
            List[0].style.cssText = "border-color:#E5E5E5";
            List[3].style.cssText = "border-color:#E5E5E5";
            List[4].style.cssText = "border-color:#E5E5E5";
            List[5].style.cssText = "border-color:#E5E5E5";
          } else if (this.value.length == 3) {
            List[3].style.cssText = "border-color:#FA8C16";
            List[2].style.cssText = "border-color:#E5E5E5";
            List[1].style.cssText = "border-color:#E5E5E5";
            List[0].style.cssText = "border-color:#E5E5E5";
            List[4].style.cssText = "border-color:#E5E5E5";
            List[5].style.cssText = "border-color:#E5E5E5";
          } else if (this.value.length == 4) {
            List[0].style.cssText = "border-color:#E5E5E5";
            List[1].style.cssText = "border-color:#E5E5E5";
            List[2].style.cssText = "border-color:#E5E5E5";
            List[3].style.cssText = "border-color:#E5E5E5";
            List[4].style.cssText = "border-color:#FA8C16";
            List[5].style.cssText = "border-color:#E5E5E5";
          } else if (this.value.length == 5) {
            List[3].style.cssText = "border-color:#E5E5E5";
            List[0].style.cssText = "border-color:#E5E5E5";
            List[1].style.cssText = "border-color:#E5E5E5";
            List[2].style.cssText = "border-color:#E5E5E5";
            List[4].style.cssText = "border-color:#E5E5E5";
            List[5].style.cssText = "border-color:#FA8C16";
          } else if (this.value.length == 0) {
            List[3].style.cssText = "border-color:#E5E5E5";
            List[0].style.cssText = "border-color:#FA8C16";
            List[1].style.cssText = "border-color:#E5E5E5";
            List[2].style.cssText = "border-color:#E5E5E5";
            List[4].style.cssText = "border-color:#E5E5E5";
            List[5].style.cssText = "border-color:#E5E5E5";
          }
        },
        handleInput(e) {
          this.$refs.input.value = this.value;
          if (this.value.length >= this.number) {
            this.hideKeyboard();
          }
          this.handleSubmit();
        },
        hideKeyboard() {
          // 输入完成隐藏键盘
          document.activeElement.blur(); // ios隐藏键盘
          this.$refs.input.blur() // android隐藏键盘
        },
        handleInput(e) {
          this.$refs.input.value = this.value;
          if (this.value.length >= this.number) {
            this.hideKeyboard();
          }
          this.handleSubmit();
        },
        //找回支付密码
        zhPsw(){
          //跳轉到找回支付密码
        },
        //用户输入内容分给li    失焦事件
        mesCaptcha:function(){


        },

        //删除银行卡按钮
        delete1(id){
          this.delCardK = true;
          this.bankID = id;
        },
        requireDel(){
          this.delCardK = false;
          unbindCard(localStorage.getItem('userID'),this.bankID).then(res =>{
            if(res.data.code == 200){
              this.init();
            }else{
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          },res =>{
            //解绑银行卡错误信息，这种场景基本不存在
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          });
        },
        //×事件
        mask(){
          this.delCardK = false;
          this.value = "";
        }
      },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = "银行卡";
      if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
        this.companyId = localStorage.getItem("companyId")
      }else{
        this.companyId = "";
      }
      this.init();
    },
    destroyed(){
      this.$root.$data.vBack = false;
    },
  }
</script>
<style>
  .bank-card-wrap{
    height: 100%;
    overflow-y: scroll;
  }
  .bank-card .cardStyle{
    margin-left:4rem;
    margin-top:1rem;
  }
  /*密码输入框样式*/
  .bank-card .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    /* display: none; */
  }
  .bank-card .mask_wrap {
    width: 100%;
    height: 21rem;
    position: fixed;
    bottom: 0;
    background: #fff;
  }
  .bank-card .payment_top {
    height: 4.5rem;
    line-height: 4.5rem;
    border-bottom: solid 1px #E5E5E5;
  }
  .bank-card .payment_top span {
    display: block;
    height: 2rem;
    margin-top: 1.2rem;
    line-height: 2rem;
    float: left;
    font-size: 2rem;
    margin-left: 0.91rem;
  }
  .bank-card .payment_top div {
    width: 11rem;
    font-size: 1.5rem;
    display: inline-block;
    margin-left: 50%;
    -webkit-transform: translateX(-85px);
    transform: translateX(-85px);
  }
  .bank-card .payment_bottom {
    margin-top: 1rem;
  }
  .bank-card .payment_bottom .tips {
    width: 100%;
    text-align: center;
    font-size: 1rem;
  }
  .bank-card .payment_bottom .find_password {
    margin-right: 1.5rem;
    color: #FA8C16;
  }
  .bank-card .input_box ul{
    display: flex;
    justify-content: center;
    margin: 2rem auto;
  }
  .bank-card .field-wrap{
    list-style: none;
    display: block;
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 16px;
    margin-right: 1rem;
    float: left;
    text-align: center;
    border: solid 1px #E5E5E5;
    border-radius: 0.4rem;
    color: #2E2A2A;
  }
  .bank-card .input-code{
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
  .bank-card .bankCard-f .sp{
    display:inline-block;
    transform:translateY(-0.3rem);
  }
  .bank-card .bankCard-conter{
    margin: 0 1.0583333333rem 0;
  }
  .bankCard-conter-show{/*空白页图形*/
    padding: 50% 0 0 30%;
  }
  .bankCard-conter-show img{
    width: 12.5rem;
  }
  .bankCard-conter-show .back_add{
    padding: 0.6rem 4rem;
    border-radius: 4rem;
    font-size: 1rem;
  }
  .bank-card .bankCard-conter .bankCard-f{
    padding-top: 0.66667rem;
    position: relative;
    height: 100%;
  }
  .bank-card .bankCard-conter .bankCard-f .bankCard-c{
    position: absolute;
    top: 1.25rem;
    left: 1rem;
  }
  .bank-card .bankCard-conter .bankCard-f .bankCard-c .delete{
    margin: 1.275rem 3rem 0 0;
    border: 1px solid #fff;
    border-radius: 3rem;
    padding: 0.2rem 0.6rem;transform:scale(0.9);
    font-size:1rem;
  }
  .IDNumber{
    position: absolute;
    bottom: 1.08333333rem;
    margin-left:3.3rem;
    font-size: 1.5rem;
  }
  .add_b_c{
    font-size: 1.333333rem;
    line-height: 3.75rem;
    /* opacity: 0.8; */
    background: rgba(255,255,255,.8);
    color: #EB7B03;
  }
  .bank-card .bankCard-mask .bankCard-Popup .bankCard-tttle span{
    display: block;
    height: 2rem;
    margin-top: 1.2rem;
    line-height: 2rem;
    float: left;
    font-size: 2rem;
    margin-left: 0.91rem;
  }
  .bank-card .bankCard-mask .bankCard-Popup .bankCard-tttle div{
    width: 120px;
    font-size: 1.5rem;
    display: inline-block;
    margin-left: 50%;
    transform: translateX(-85px);
  }
  .bank-card-wrap .wrapcenter .wrapcenter_tips1{
    width: 22.5rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .bank-card-wrap .zz .wrapcenter_tips1 .section_top1 {
    width: 59%;
    padding: 20px 20.5%;
    height: 1.9rem;
    font-weight: bold;
    text-align: center;
    font-size: 1.333rem;
    border-bottom: solid 0.083rem #DDDDDD;
  }/*
  .bank-card .bankCard-mask .bankCard-main{
    padding-top: 1.083333rem;
  }*/
  @media screen and (max-width:321px){
    .bank-card .bankCard-conter .bankCard-f .IDNumber{
      font-size: 1.4rem!important;
      margin-left: 3rem;
    }
    .bank-card .cardStyle {
      margin-left: 3.5rem!important;
      margin-top: 0.3rem!important;
    }
    .bank-card .bankCard-conter .bankCard-f .bankCard-c .delete{
      margin: 0.5rem 2rem 0 0;
    }
  }
  /*@media screen and (max-width:815px)and (min-width: 450px){

  }*/
</style>

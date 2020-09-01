<template>
    <div class="AuthorizedPsw width height">
      <!--页面一：找回登录密码-->
      <div class="width" v-if="yzmLogin">
        <div class="AubgImg pst-rlt width">
          <!--智慧嘉授权登录-->
          <div class="sqLogin pst-abs width">
            <div class="h3 font-col-b">找回登录密码</div>
            <div class="sqLoginSqLogin bg-ff">
              <div class="yzm sqLoginFirstDiv publiceStyle width pst-rlt">
                <div class="newPsw fl line-h">
                  <input type="text" ref="inputTel" :class="telColor" style="width: 90%;" v-model="newT" placeholder="请填写手机号码" maxlength="11" @blur="telBlur">
                </div>
                <p class="eyesSwitch clean1 pst-abs" @click="chaHao">
                  <img v-show="newT" src="../../assets/img/clean.png">
                </p>
              </div>
              <div class="pYzm publiceStyle width">
                <div class="fl line-h"><input type="text" v-model="photoYZM" style="width: 100%;"  placeholder="请填写图形验证码" @blur="photoYZMblur"></div>
                <p class="fr pYzmImg"><img :src="Yzmphoto" @click="pYzmEvent"></p>
              </div>
              <div class="yzm publiceStyle width">
                <div class="fl line-h"><input type="text" v-model="eddYZM" style="width: 100%;" :class="yzmColor" maxlength="4" placeholder="请填写验证码"></div>
                <p v-if="eazyMoreSJ.canGet" :class="eazyMoreSJ.getYZMC" class="pTop" @click="getYZM">{{eazyMoreSJ.tipsContent}}</p>
                <p v-else="eazyMoreSJ.canGet" class="pTop">已发送<span>({{eazyMoreSJ.waitTime}}s)</span></p>
              </div>
              <div class="nextStep cont font-col-b font-108" ref="nextStep" :class="nextStepBtnColor" @click="nextSp($event)">下一步</div>
            </div>
          </div>
        </div>
      </div>

      <!--页面二：设置新密码-->
      <div v-if="!yzmLogin">
        <div class="AubgImg pst-rlt width">
          <!--智慧嘉授权登录-->
          <div class="sqLogin pst-abs width">
            <div class="h3 font-col-b">设置新密码</div>
            <div class="sqLoginSqLogin bg-ff">
              <div class="tel font-7b7">请使用8~20位大写、小写字母及数字的组合</div>
              <div class="yzm publiceStyle width pst-rlt">
                <div class="newPsw fl line-h">
                  <input type="password" v-model="newP" placeholder="请填写新密码" v-if="closeEyes" maxlength="20" v-focus @blur="pswBlur">
                  <input type="text" v-model="newP" placeholder="请填写新密码" v-if="!closeEyes" maxlength="20" v-focus @blur="pswBlur">
                </div>
                <p class="eyesSwitch clean2 pst-abs" @click="newP=''">
                  <img v-show="newP" src="../../assets/img/clean.png">
                </p>
                <p class="eyesSwitch closeEyes2 pst-abs">
                  <img src="../../assets/img/closeEyes.png" class="closeE" @click="closeEyes=false;closeEyes=false" v-if="closeEyes">
                  <img src="../../assets/img/openEyes.png" class="openE" @click="closeEyes=true" v-if="!closeEyes">
                </p>
              </div>
              <div class="nextStep cont font-col-b font-108" :class="newP.length==0?'op-3':'op-1'" @click="finish">完成</div>
            </div>
          </div>
        </div>
      </div>
      <!--手机号超过上限提醒-->
      <section class="zz" v-if="upperLimitTips">
        <div class="wrapcenter">
          <div class="wrapcenter_tips">
            <div class="section_top">该手机号操作次数超过上限，请稍后再试</div>
            <div class="section_bottom">
              <div class="qx_set1 font-fa" @click="Ay">知道了</div>
            </div>
          </div>
        </div>
      </section>
      <!--错误提示框-->
      <div class="tel-mess" ref="Errors">
        <div class="juzhong">
          <section :class="[error_prompt]" id="error_sms">{{mesContent}}</section>
        </div>
      </div>
    </div>
</template>
<script>
  import {checkRealName,forgetPswSms,sendMess,forgetLoginPasswordSms} from '@/api/user/loginReg';
  export default{
      data(){
          return{
              /*页面一：找回登录密码*/
            yzmLogin:true,
            eddTel:"",
            eddYZM:"",
            photoYZM:"",
            yzmStatus:true,
            yzmStatus2:false,
            yzmStatus3:false,
            col:'font-EB',
            newT:"",
            closeEyes:true,
            upperLimitTips:false,
            mesContent:"",
            error_prompt:"",
            nextStepBtnColor:'op-3',
            telJY:false,
            telColor:'font-2a2a',
            yzmColor:"font-2a2a",
            Yzmphoto:'',
            getYZMC:"font-7b7",
            sendYZM:{
              mobile:'',//注册手机号
              type:'1',//验证码类型，1：短信，2：语音
              imgCode:'',//图形验证码
              randomStr:"",    //图形验证码随机数
              retry:'N',//是否重试
              smsSign:"reset_plat_login_password_sms", //(找回密码)
            },
            eazyMoreSJ:{
              canGet:true,
              tipsContent:"获取验证码",
              getYZMC:"font-7b7",
              timer:null,
              waitTime:59
            },
            /*页面二：设置新密码*/
            newP:"",
          }
      },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
        },
      }
    },
    mounted(){
      clearInterval(this.anthorizedTimer);
      this.$nextTick(function(){
        setInterval(this.AuthTimer,2000);
      })
    },
      methods:{
        /*页面一：找回登录密码*/
        telBlur(){
          if(this.newT!= '' && this.newT!= null && this.newT!=undefined) {
              let newTSpace = this.newT.substring(0,3)+' '+ this.newT.substring(3,7)+' '+this.newT.substring(7,11);
              if (this.$format.PhoneFormat(newTSpace) == false) {
                    this.$refs.Errors.style.display = "block";
                    this.error_prompt = "tel-message";
                    this.mesContent = "手机号码不正确";
                    this.telColor = 'font-22d';
                    this.telJY = false;
                 }else{
                  this.telJY = true;
                  this.sendYZM.mobile = this.newT;
              }
          }else{
            this.$refs.Errors.style.display = "block";
            this.error_prompt = "tel-message";
            this.mesContent = "请输入手机号";
          }
        },
        photoYZMblur(){
            if(this.telJY == true && this.photoYZM.length>0 ){
              this.eazyMoreSJ.getYZMC = "font-EB";
              this.sendYZM.imgCode = this.photoYZM;
            }else{
                return false;
            }
        },
        chaHao(){
          this.newT = "";
          this.$refs.inputTel.focus();
          this.$refs.Errors.style.display = "none";
        },
        /*发送验证码共用*/
        getMessageYzmPbulice(tips){
          sendMess(this.sendYZM).then(res => {
            if(res.data.code == 200) {//成功
              if(this.sendYZM.retry == "Y"){
                  this.eazyMoreSJ.canGet = false;
              }else{
                this.eazyMoreSJ.canGet = false;
                this.eazyMoreSJ.timer = window.anthorizedTimer;
                this.$spaceOther.timeCountdown(this.eazyMoreSJ);
              }
            }else{
              this.error_prompt = "tel-message";
              this.mesContent = res.data.msg;
            }
          },res => {
            this.error_prompt = "tel-message";
            this.mesContent = res.data.msg;
          })
        },
        /*获取验证码*/
        getYZM(){
            if(this.eazyMoreSJ.tipsContent == "获取验证码"){
              if(this.eazyMoreSJ.getYZMC == "font-EB"){
                this.getMessageYzmPbulice();
              }else{
                  return false;
              }
            }else{
              this.eazyMoreSJ.timer = window.anthorizedTimer;
              this.$spaceOther.timeCountdown(this.eazyMoreSJ);
              this.sendYZM.retry = "Y";
              this.getMessageYzmPbulice("");
            }
        },
        pYzmEvent(){
            this.photoYZM = "";
            //生成三位随机数
          this.sendYZM.randomStr= Math.floor(Math.random () * 900) + 100;
          this.Yzmphoto = axios.defaults.baseURL+'/admin/code/'+ this.sendYZM.randomStr;
        },
        Ay(){
          this.upperLimitTips = false;
        },
        finish(){
          let self = this;
          forgetLoginPasswordSms(this.sendYZM.mobile,this.eddYZM,this.newP).then(res => {
            if(res.data.code == 200) { //成功
              self.error_prompt = "tel-message";
              self.mesContent = "设置成功";
              setTimeout(function () {
                self.$router.push({
                  name:"AuthorizedLogin"
                })
              },1000);
            }else{
              self.error_prompt = "tel-message";
              self.mesContent = res.data.msg;
            }
          },res => {
            self.error_prompt = "tel-message";
            self.mesContent = res.data.msg;
          })
        },
        nextSp(event){
            if(this.nextStepBtnColor == "op-1"){
                if(this.telJY==true&&this.eddYZM.length!=0&&this.photoYZM.length!=0){
                  forgetPswSms(this.sendYZM.mobile,this.eddYZM,this.sendYZM.smsSign).then(res => {
                    if(res.data.code == 200) {//成功
                        this.yzmLogin = false;
                      clearInterval(this.anthorizedTimer);
                      this.anthorizedTimer = null;
                    }else{
                      this.error_prompt = "tel-message";
                      this.mesContent = res.data.msg;
                    }
                  },res => {
                    this.error_prompt = "tel-message";
                    this.mesContent = res.data.msg;
                  })
                }
            }
        },
        nextStepBtn(){
              if(this.telJY==true&&this.eddYZM.length!=0||this.photoYZM.length!=0){
                this.nextStepBtnColor = "op-1";
              }else{
                this.nextStepBtnColor = "op-3";
              }

        },
        /*页面二：设置新密码*/
        cleanThing(){
            this.newP = "";
        },
        pswBlur(){
//           if(this.newP.length>0){
//            this.$refs.Errors.style.display = "block";
//            this.error_prompt = "tel-message";
//            this.mesContent = "密码格式不正确";
//           }
        },
        AuthTimer:function(){
          if(this.error_prompt=="tel-message"){
            this.error_prompt="trans";
          }
        },
      },
    created(){
      this.sendYZM.randomStr= Math.floor(Math.random () * 900) + 100;
      this.Yzmphoto = axios.defaults.baseURL+'/admin/code/'+ this.sendYZM.randomStr;
    },
    destroyed(){
      clearInterval(this.anthorizedTimer);
      this.anthorizedTimer = null;
    },
    watch:{
      newT(newValue, oldValue) {
        this.telColor = 'font-2a2a';
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.newT = oldValue;
        }else{
          this.newT = newValue;
        }
        if(this.newT.length>11){
          this.newT = oldValue;
        }else{
          this.newT = newValue;
        }
        if(this.newT!=undefined && this.newT!=null && this.newT!=""){
            if(this.photoYZM!=undefined && this.photoYZM!=null && this.photoYZM!="" && this.eddYZM!=undefined && this.eddYZM!=null && this.eddYZM!=""){
                if(this.newT.length == 11 && this.photoYZM.length == 4 && this.eddYZM.length == 4){
                    this.nextStepBtnColor = 'op-1';
                }else{
                  this.nextStepBtnColor = 'op-3';
                }
            }else{
              this.nextStepBtnColor = 'op-3';
            }
          if(this.photoYZM.length==4){
            this.eazyMoreSJ.getYZMC = 'font-EB';
          }else{
            this.eazyMoreSJ.getYZMC = 'font-7b7';
          }
        }else{
          this.nextStepBtnColor = 'op-3';
          this.eazyMoreSJ.getYZMC = 'font-7b7';
        }
      },
      /*图形验证码*/
      photoYZM(newValue, oldValue) {
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.photoYZM = oldValue;
        }else{
          this.photoYZM = newValue;
        }
        if(this.photoYZM!=undefined && this.photoYZM!=null && this.photoYZM!=""){
          if(this.photoYZM.length>4){
            this.photoYZM = oldValue;
            this.eazyMoreSJ.getYZMC = 'font-EB';
          }else{
            this.photoYZM = newValue;
            if(this.photoYZM.length==4){
              this.eazyMoreSJ.getYZMC = 'font-EB';
            }else{
              this.eazyMoreSJ.getYZMC = 'font-7b7';
            }
          }
          if(this.newT!=undefined && this.newT!=null && this.newT!="" && this.eddYZM!=undefined && this.eddYZM!=null && this.eddYZM!=""){
            if(this.newT.length == 11 && this.photoYZM.length == 4 && this.eddYZM.length == 4){
              this.nextStepBtnColor = 'op-1';
            }else{
              this.nextStepBtnColor = 'op-3';
            }
          }else{
            this.nextStepBtnColor = 'op-3';
          }
          if(this.photoYZM.length==4){
            this.eazyMoreSJ.getYZMC = 'font-EB';
          }else{
            this.eazyMoreSJ.getYZMC = 'font-7b7';
          }
        }else{
          this.nextStepBtnColor = 'op-3';
          this.eazyMoreSJ.getYZMC = 'font-7b7';
        }
      },
      /*验证码监听*/
      eddYZM(newValue, oldValue) {
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.eddYZM = oldValue;
        }else{
          this.eddYZM = newValue;
        }
        if(this.eddYZM!=undefined && this.eddYZM!=null && this.eddYZM!=""){
          if(this.eddYZM.length>4){
            this.eddYZM = oldValue;
          }else{
            this.eddYZM = newValue;
          }
          if(this.newT!=undefined && this.newT!=null && this.newT!="" && this.photoYZM!=undefined && this.photoYZM!=null && this.photoYZM!=""){
            if(this.newT.length == 11 && this.photoYZM.length == 4 && this.eddYZM.length == 4){
              this.nextStepBtnColor = 'op-1';
            }else{
              this.nextStepBtnColor = 'op-3';
            }
          }else{
            this.nextStepBtnColor = 'op-3';
          }
        }
      }
    }
  }
</script>
<style>
  /*页面一：验证码登录*/
  /*底部红色背景区*/
  .AuthorizedPsw .AubgImg{
    height:12.916666rem;
    background:url('../../assets/image/Authorized/img_background_@2x.png') no-repeat center;
    background-size:100% 12.916666rem;
  }
  /*底部红色背景区*/
  .AuthorizedPsw .sqLogin{
    top:3.083rem;
    left:50%;
    transform:translateX(-50%);
    z-index:444;
  }
  .AuthorizedPsw .sqLogin .h3{
    width:90%;
    text-indent:1.08333333rem;
    font-size:2.083333rem;
    margin:0 auto 1rem;
  }
  .AuthorizedPsw .sqLogin .sqLoginSqLogin{
    width:93%;
    height:23.5rem;
    margin:0 auto;
    border-radius:10px;
    box-shadow:0 0 16px -2px rgba(196,104,116,0.54);
  }
  .AuthorizedPsw .sqLogin .sqLoginSqLogin .sqLoginFirstDiv{
    padding-top:0.5rem;
  }
  .AuthorizedPsw .sqLoginSqLogin .publiceStyle{
    width:93%;
    margin:0 auto;
    height:4.56rem;
    border-bottom:solid 1px #E5E5E5;
  }
  .AuthorizedPsw .sqLoginSqLogin .clean1{
    right:0;
  }
  .AuthorizedPsw .sqLoginSqLogin .publiceStyle .line-h{
    margin-top:2rem;
    width: 75%;
  }
  .AuthorizedPsw .sqLoginSqLogin .publiceStyle .pTop{
    margin-top:2.3rem;
  }
  .AuthorizedPsw .sqLoginSqLogin .pYzm input{
    width:76%;
  }
  .AuthorizedPsw .sqLoginSqLogin .pYzm img{
    width:5.1rem;
    height:2.25rem;
    margin-top:1.8rem;
  }
  .AuthorizedPsw .sqLoginSqLogin .yzm p{
    float:right;
  }
  .AuthorizedPsw .sqLoginSqLogin .nextStep{
    width:93%;
    height:3.833333rem;
    line-height:3.833333rem;
    margin:2rem auto 0;
    background:#E63950;
    border-radius:2rem;
  }
  /*页面二：找回密码*/
  .AuthorizedPsw .sqLoginSqLogin .tel{
    width:93%;
    margin:0 auto;
    height:3.75rem;
    line-height:6.25rem;
  }
  .AuthorizedPsw .sqLoginSqLogin .eyesSwitch{
    top: 70%;
    transform:translateY(-50%);
  }
  .AuthorizedPsw .sqLoginSqLogin .clean2{
    right: 2.3rem;
  }
  .AuthorizedPsw .sqLoginSqLogin .closeEyes2{
    right: 0;
  }
  .AuthorizedPsw .sqLoginSqLogin .closeEyes2 .closeE{
    width:1.5rem;
    height:0.5rem;
  }
  .AuthorizedPsw .sqLoginSqLogin .closeEyes2 .openE{
    width:1.5rem;
    height:1.083333rem;
  }
  .AuthorizedPsw .sqLoginSqLogin .clean1,.clean2 img{
    width:1.083333rem;
    height:1.083333rem;
  }
  .AuthorizedPsw .sqLoginSqLogin .yzm .newPsw{
    width:100%;
  }
  /*提示框*/
  .AuthorizedPsw .tel-mess .juzhong{
    display: flex;
    justify-content: center;
  }
  .AuthorizedPsw .tel-mess .juzhong #error_sms{
    display: block!important;
    z-index:666;
  }

</style>

<template>
    <div class="VerificationID bg-ff">
      <div class="validatetitle cont" @click="CSbgLogin">
        <p class="validate-content">{{title}}</p>
        <p class="validate-small tipS" v-show="initShowID" ref="tipS">验证身份证信息</p>
        <p class="validate-small errorSeen font-22d" v-show="formatErrorID"  ref="tipM">身份证号有误请重新输入</p><!--animated shake -->
        <p  class="validate-small errorSeen font-22d" v-show="nullErrorID" ref="tipL">身份证号不能为空</p><!--animated shake -->
      </div>
      <div class="IdMargin">
        <div class="identity">
          <label class="identity-label fl">身份证</label>
            <!--<div @click="shoWord">--><input type="text" ref="idCardInput" class="input" maxlength="18" v-model="idCard" v-focus placeholder="请输入身份证号" clearable/><!--</div>-->
         <!-- <div v-show="showKey"><Keyboard :option="option" @keyVal="getInputValue" v-show="option.show=true"></Keyboard></div>-->
          <div class="empty" @click="empty" v-show="idCard">
            <img src="../../../../assets/img/clean.png" />
          </div>
        </div>
        <button class="btn_login" ref="loginBtn" @click="setNewPwd(idCard)">下一步</button>
      </div>
      <div class="change_Fpsw cont font-108" @click="change">其他方式重置密码</div>
    </div>
</template>
<script>
  import {changeSfz} from '@/api/user/loginReg'
  import Keyboard from '../../../keyboard.vue'
  export default{
      name:"verificationID",
    components: {
      Keyboard
    },
      data(){
          return{
            option: {
              show:true,
              sourceDom: ''
            },
            title:"找回登录密码",
            initShowID:true,
            formatErrorID:false,
            nullErrorID:false,
            keyboard:true,
            show:false,
            idCard:"",
            showKey:true
          }
      },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
          /*document.activeElement.blur();*/
        }
      }
    },
    created(){
      if(this.$route.params.id!=undefined){
        if(this.$route.params.id=="sfz-reset"){
          this.title = "重置登录密码"
        }else if(this.$route.params.id=="sfz-find"){
          this.title = "找回登录密码"
        }
      }
      this.$root.$data.vBack=true;
      this.$root.$data.article = '';
      this.init();
    },
      methods:{
        /*点击空白处失焦*/
        CSbgLogin(){
          this.showKey = false
        },
        //新增键盘删除按钮
       /* getInputValue(val) {
          if(val === 'delete'){
            this.idCard = this.idCard.slice(0,this.idCard.length -1)
          }else{
            this.idCard += val
          }
        },*/
        //点击input显示键盘
       /* shoWord(){
          this.showKey = true
        },*/
          //初始化判断是找回密码页还是注册登录流程
          init(){
              if(this.$route.params.id == "sfz-find"){
                this.show = true;
              }else{
                this.show = false;
              }
          },
          //小叉号
          empty(){
            /*this.showKey = true;*/
            this.idCard = "";
            this.$refs.idCardInput.focus();
            document.activeElement.blur();
          },
        //二级标题报错信息动态提示
        errQ(tips){
            this.initShowID = true
            this.$refs.tipS.innerHTML = tips;
            this.$refs.tipS.style.cssText = "color:#F5222D!important"
            this.formatErrorID=false;
            this.nullErrorID=false;
        },
        //身份证格式验证
        setNewPwd(){
            if(this.$refs.loginBtn.style.opacity == 1){
              if(this.$format.idCardFormat(this.idCard) == false){
                this.initShowID = false
                this.formatErrorID=true;
                this.nullErrorID=false;
              }else if(this.$format.idCardFormat(this.idCard) == undefined){
                this.initShowID = false
                this.formatErrorID=false;
                this.nullErrorID=true;
              }else{
                localStorage.setItem("identityNo",this.idCard);
                let mobile = localStorage.getItem('loginTell').replace(/[" "]/g, "");
                if(mobile!=undefined && mobile!=null && mobile!=""){
                  this.$refs.loginBtn.style.opacity = 0.3;
                  changeSfz(mobile,this.idCard).then(res => {
                    //   console.log(res.data.code);
                    if(res.data.code == 200){
                      if(this.$route.params.id == 'sfz-find'){
                        this.$router.push({
                          name:"setPsw",
                          params:{id:'sfz-find'}
                        })
                      }else if(this.$route.params.id == 'sfz-reset'){
                        this.$router.push({
                          name:"setPsw",
                          params:{id:'sfz-reset'}
                        })
                      }

                    }else{
                      this.errQ(res.data.msg);
                      this.$refs.loginBtn.style.opacity == 1;
                      return false;
                    }
                  },res => {
                    this.errQ(res.data.msg);
                    this.$refs.loginBtn.style.opacity == 1;
                    return false;
                  });
                }
              }
            }else{
              this.$refs.idCardInput.focus();
              document.activeElement.blur();
            }
        },
        //换个方式找回密码
        change(){
          this.$router.go(-1);
        }
      },
    watch:{
      idCard(newValue,oldValue){
        if(this.idCard.length>0){
          let pattern_chin1 = /[\u4e00-\u9fa5]/g;
          if(newValue.match(pattern_chin1)!=null){
            this.idCard = oldValue;
          }
          if(this.idCard == ""){
            this.$refs.loginBtn.style.opacity = 0.3
          }else{
            this.$refs.loginBtn.style.opacity = 1
            if(this.idCard.length>=19){
              this.idCard = oldValue
            }
          }
        }else{
            this.formatErrorID = false;
          this.$refs.loginBtn.style.opacity = 0.3
        }
      }
    }
  }
</script>
<style>

  @import "../../../../assets/css/login.css";
  @import "../../../../assets/css/public.css";
  .VerificationID{
    height: 100%;
  }
  .VerificationID .validatetitle{
    padding-bottom: 3rem;
    padding-top: 5.8333333332rem;
  }
  .VerificationID .validatetitle .validate-content{
    font-size: 2.416666666rem;
  }
  .VerificationID .validatetitle .validate-small{
    font-size: 1.1666666666rem;
    color: #7E7A7A;
    /*display:none;*/
  }
  .VerificationID .tipS {
    display: block;
  }
  /*input*/
  .VerificationID .IdMargin{
    margin: 0 1.0833333333rem;
  }
  .VerificationID .IdMargin .identity{
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 0.426666667rem;
    position: relative;
  }
  .VerificationID .IdMargin .identity .identity-label{
    font-size: 1.3333333rem;
    padding-right: 2.41666666rem;
  }
  .VerificationID .IdMargin .Idbtn{
    line-height: 3.8333333rem;
    background: linear-gradient(to right,#FAAD14, #FA8C16);
    /*opacity: 0.3;*/
    border-radius: 4px;
    margin-top: 3.3333333rem;
    color: #fff;
    font-size: 1.3333333rem;
  }
  .VerificationID .IdMargin .identity .empty{
    width: 1rem;
    position: absolute;
    top: 0.5rem;
    right: 1.2rem;
  }
  .VerificationID .btn_login{
    margin-top: 2.3333333rem;
    opacity:0.3;
  }
  .VerificationID .change_Fpsw{
    /*position:absolute;*/
    width:100%;
    bottom:0;
    color:#EB7B03;
    height:3.416666rem;
    line-height:3.416666rem;
  }
</style>

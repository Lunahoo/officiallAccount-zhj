<template>
    <div class="findPsw">
        <div class="font cont">
          <p class="font-main">输入手机号</p>
          <p class="font-sub font-167 font-ipt" v-if="isShow">请输入需要找回密码的手机号</p>
          <p v-else class="font-22d">{{content}}</p><!--animated shake -->
        </div>
      <div class="text-center bd-bt findPsw-ipt pst-rlt">
        <label class="login-label">手机号</label>
        <!--<input maxlength="13" v-model="dataPhone" type="tel" pattern="[0-9]*" autofocus="autofocus" id="tel" class="login-tel"/>  -->
        <input maxlength="13" v-model="findPwdTel" id="findPwdTel" placeholder="请输入手机号" class="login-tel"  v-focus />
        <div class="empty pst-abs pos-right" @click="empty" v-show="findPwdTel"><img src="../../../assets/img/clean.png" ></div>
      </div>
      <div class="bt-color findPswNext width cont font-133 font-col-b" ref="findPswBtn" @click="sendfigCapt()">下一步</div>
      <!--<div class="tel-mess">
        <section :class="[error_prompt]" id="error_findtel">{{content}}</section>
      </div>-->
    </div>
</template>
<script>
  import filter from '../../../filters/filter.js';
  import Vue from "vue";
  import verify from "vue-verify-plugin";
  export default {
    data() {
      return {
        findPwdTel:'',
        error_prompt:"",
        content:"",
        isShow:true,
      }
    },
  directives: {//自定义指令
    focus: {//自动获焦
      inserted: function (el) {
        el.focus();
        document.getElementsByClassName("findPswNext")[0].style.cssText="opacity:.3!important";
      }
    }
  },
    methods:{
      empty:function(){
        this.findPwdTel="";
        document.getElementById('findPwdTel').focus()
      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      sendfigCapt:function () {
        if(this.$refs.findPswBtn.style.opacity = 1){
          if(this.$format.PhoneFormat(this.findPwdTel) == false){
            this.isShow = false;
            this.content = "手机号格式错误，请重新输入";
          }else if(this.$format.PhoneFormat(this.findPwdTel) == undefined){
            this.isShow = false;
            this.content = "请输入您的手机号";
          }else{
            this.$router.push({
              path: './captcha',
            });
          }
        }else{
          document.getElementById('findPwdTel').focus()
        }
      },

    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      this.$root.$data.vBack=true;
    },
    watch: {
      // 通过watch来设置空格
      findPwdTel(newValue, oldValue) {
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(newValue.match(pattern_chin1)!=null){
          this.findPwdTel = oldValue;
        }else{
          this.findPwdTel = newValue;
        }

        /*自动添加空格*/
        if(this.findPwdTel!=null && this.findPwdTel!= "" && this.findPwdTel!=undefined){
          this.findPwdTel = this.$spaceOther.telSpace(newValue,oldValue,this.findPwdTel);
        }
        if(this.findPwdTel.length>0){
          this.$refs.findPswBtn.style.opacity = 1;
        }else{
          this.$refs.findPswBtn.style.opacity = 0.3;
        }


//          if(this.findPwdTel.length>0){
//            this.$refs.findPswBtn.style.opacity = 1
//            this.findPwdTel=this.findPwdTel.replace(/([a-z]|[A-Z]|[`~·!！\-@#$￥%^&*……()（）——=.。；;":‘’_+|、\\<>{}\/'[\]])/g,'');
//            if(newValue!=null && newValue!= "" && newValue!=undefined){
//              //console.log(newValue)
//              if (newValue.length > oldValue.length) { // 文本框中输入
//                if(newValue.indexOf(' ')<0){
//                  for(let i=0;i<newValue.length;i++){
//                    if (i === 2 || i === 7) {
//                      if(i+1 <= newValue.length){
//                        newValue = newValue.substr(0,i+1)+' '+newValue.substr(i+1,newValue.length);
//                      }else{
//                        newValue = newValue.substr(0,i+1)+' '
//                      }
//                    }
//                  }
//                  if(newValue.length>=13){
//                    this.findPwdTel = newValue.substr(0,13)
//                  }else{
//                    this.findPwdTel = newValue
//                  }
//                }else {
//                if (newValue.length === 3 || newValue.length === 8) {
//                  this.findPwdTel += ' ';
//                } else if (newValue.length === 9 || newValue.length === 4) {
//                  if (newValue.indexOf(' ') < 0) {
//                    var tmp = newValue.substring(0, newValue.length - 1) + ' ' + newValue.substring(newValue.length - 1, newValue.length);
//                    this.findPwdTel = tmp;
//                  } else if (newValue.length === 9 && newValue.lastIndexOf(" ") === 3) {
//                    var tmp = newValue.substring(0, newValue.length - 1) + ' ' + newValue.substring(newValue.length - 1, newValue.length);
//                    this.findPwdTel = tmp;
//                  }
//                }
//              }
//              } else { // 文本框中删除
//                if(this.findPwdTel.length!=8 && this.findPwdTel.length!=3){
//                  let newStr = newValue.replace(/[" "]/g, "");
//                  let oldStr = oldValue.replace(/[" "]/g, "");
//                  if(newStr == oldStr){
//                    this.findPwdTel = oldValue
//                  }else{
//                    this.findPwdTel = newValue
//                  }
//                }if (newValue.length === 9 || newValue.length === 4) {
//                  this.findPwdTel = this.findPwdTel.trim()
//                }
//              }
//            }
//          }else{
//            this.$refs.findPswBtn.style.opacity = 0.3
//          }




      }
    }
  }
</script>
<style>
  @import "../../../assets/css/login.css";
  .findPsw{
    margin:0 1.3rem;
  }
  .findPsw .font{
    margin: 3.666667rem 0 5rem;
  }
  .findPsw .font .font-main{
    font-size: 2.41666rem;
    margin-bottom: 0.416rem;
  }
  .findPsw .findPsw-ipt{
    margin-bottom: 3.3333333rem;
    border-bottom: 0.0833333rem solid #E5E5E5;
  }
  .findPsw .findPsw-ipt .empty{
    width: 1.0833333rem;
    top: 0.6rem;
  }
  .findPsw .findPswNext{
    line-height: 3.833333rem;
    border-radius: 0.4rem;
    opacity: 0.3;
  }
  .findPsw #error_findtel{
    display: block!important;
    margin-top: 5rem;
  }
  @media screen and (max-width:321px){
    .findPsw .font{
      margin:3.5rem 0 5rem!important;
    }
    .findPsw #error_findtel{
      margin-top: 1.6rem;
    }
  }
</style>

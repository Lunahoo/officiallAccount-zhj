<template>
  <div class="modifySetpsw bg-ff">
    <div class="Modify-title cont text-center">
      <div class="log-img">
        <p class="modifySetpsw-center">设置登录密码</p>
        <div class="psw_rule1 wrapcenter font-167 font-ipt cont">
          <p class="modifySetpsw-small font-ipt font-167 tipS" ref="tipS">请使用8-20位大、小字母和数字的组合</p>
          <p class="modifySetpsw-small font-ipt font-167 errorSeen pst-abs font-22d" ref="tipM" >{{content}}</p><!--animated shake -->
        <!--<p class="modifySetpsw-small errorSeen animated shake font-22d" ref="tipL">密码不能为空</p>-->
        </div>
      </div>
    </div>
    <div class="Modify-conter pst-rlt bd-btm bd-bt">
      <label class="login-label font-133">密码</label>
      <input v-show="downIcon" class="input" ref="reSetPwd1" placeholder="请输入新密码" type="password" v-focus  v-model="pwdInput" clearable maxlength="20"/>
      <input v-show="!downIcon" class="input" ref="reSetPwd2" placeholder="请输入新密码" type="text" v-focus v-model="pwdInput" clearable maxlength="20"/>
      <div class="psweyes pos-right pst-abs"  @click="switc">
        <img v-show="downIcon" class="closea" src="../../../../assets/img/closeEyes.png"/>
        <img v-show="!downIcon" class="opena" src="../../../../assets/img/openEyes.png"/>
      </div>
      <div class="passdetele" @click="passdetele" v-show="pwdInput"><img src="../../../../assets/img/clean.png"/></div>
    </div>
    <div class="btn-next" >
      <button class="btn_login" ref="next" @click="next">下一步</button>
    </div>
    <div class="mask pst-fixed pos-top pos-left width height " v-if="isShow" @click="mask">
      <div class="Popup width pst-abs btm-0 pos-left bg-f6 cont">
        <div class="Retrieve">
          <router-link to="/" tag="li"><p class="btnline">身份证验证找回</p></router-link>
          <p class="bg-ff">手机验证找回</p>
        </div>
        <div class="cancel"><p>取消</p></div>
      </div>
    </div>
    <section class="zz" v-show="unLogin">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top" style="line-height: 4.1rem;">当前用户未登录，请先去登录</div>
          <div class="section_bottom">
            <div class="qx_set" @click="abolish">取消</div>
            <div class="qx_right qx_set" @click="goLogin">登录</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };
  import {changeNewPsw} from '@/api/user/loginReg'
  import filter from '../../../../filters/filter.js';
  export default {
    name: 'modifySetpsw',
    data() {
      return {
        isShow: false,
        downIcon: true,
        pwdInput: '',
        content:"",
        Opsw:"",
        Npsw:"",
        tk:"",
        unLogin:false
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
        }
      }
    },
    created(){
      this.$root.$data.vBack=true;
    },
    methods: {
      abolish:function(){
        this.unLogin = false;
      },
      hide: function () {
        this.isShow = true;
      },
      mask: function () {
        this.isShow = false;
      },
      switc(){
        this.downIcon = !this.downIcon;
        let arrs = document.getElementsByClassName('input');
        setTimeout(function(){
          for(let i=0;i<arrs.length;i++){
            arrs[i].focus()
          }
        },500)
      },
      passdetele: function () {
        this.pwdInput = '';
        this.$refs.next.style.cssText = "opacity:.3!important";
        this.disab = true;
        this.$refs.reSetPwd1.focus();
        this.$refs.reSetPwd2.focus();
      },
      next(){
          if(this.$refs.next.style.opacity == 1){
            if (this.$format.PwdFormat(this.pwdInput) == false) {
              this.$refs.tipS.style.cssText = "display:none!important";
              this.$refs.tipM.style.cssText = "display:block";
              this.content = "密码有误请重新输入";
            } else if (this.$format.PwdFormat(this.pwdInput) == undefined) {
              this.$refs.tipS.style.cssText = "display:none!important";
              this.$refs.tipM.style.cssText = "display:block";
              this.content = "密码不能为空";
            } else {
              this.Opsw = this.$route.params.tell;
              this.Npsw = this.pwdInput;
              this.tk = localStorage.getItem('userID');
              if (this.tk == '' || this.tk == null || this.tk == undefined) {
                this.unLogin = true;
              } else {
                this.$refs.next.style.opacity = 0.3;
                changeNewPsw(this.tk, this.Opsw, this.Npsw).then(res => {
                  if (res.data.code == 200) {//成功
                    this.$router.push({name: 'home'});
                  } else{
                    this.$refs.next.style.opacity = 1;
                    this.$message({
                      message: res.data.msg,
                      type: "warning"
                    });
                    return false
                  }
                }, res => {
                  this.$refs.next.style.opacity = 1
                  this.$message({
                    message: res.data.msg,
                    type: "warning"
                  });
                });
              }
            }
          }else{
            this.$refs.reSetPwd1.focus();
            this.$refs.reSetPwd2.focus();
          }

      },
      goLogin(){
        this.unLogin = false;
        this.$router.push({name:'login'});
      }
    },
    watch:{
      pwdInput:function (newValue, oldValue) {//错误提示呈现样式
        if(this.pwdInput.length>0){
          this.$refs.next.style.opacity = 1
          let pattern_chin1 = /[\u4e00-\u9fa5]/g;
          if(newValue.match(pattern_chin1)!=null){
            this.pwdInput = oldValue;
            if(this.pwdInput == ""){
              this.$refs.loginBtn.style.opacity = 0.3
            }else{
              this.$refs.loginBtn.style.opacity = 1
            }
          }else{
            if(newValue.length<=7){
              this.$refs.tipS.style.cssText = "display:none!important";
              this.$refs.tipM.style.cssText = "display:block";
              this.content = "请输入8-20位密码";
            }else if(newValue.length>7){
              if (!this.$format.PwdFormat(this.pwdInput)){
                this.$refs.tipS.style.cssText = "display:none!important";
                this.$refs.tipM.style.cssText = "display:block";
                this.content = "密码需要8-20位大小写字母及数字组合";
              }else {
                this.$refs.tipS.style.cssText = "display:none!important";
                this.$refs.tipM.style.cssText = "display:none";
                this.$refs.next.style.cssText = "opacity:1!important";
                this.content ='';
              }
          }
          }
        }else{
          this.$refs.next.style.opacity = 0.3;
          this.$refs.tipS.style.cssText = "display:block!important";
          this.$refs.tipM.style.cssText = "display:none";
        }
      }
    }

  }
</script>
<style>
  @import "../../../../assets/css/login.css";
  @import "../../../../assets/css/public.css";
  .modifySetpsw .psweyes{
    width: 1.2rem;
    bottom: 1.2rem;
  }
  .modifySetpsw .Modify-title {
    padding: 3.66666667rem 0 3.4rem;
  }
  .modifySetpsw .Modify-title .modifySetpsw-center{
    font-size: 2.41666667rem;
    margin-bottom: 0.416rem;
  }
  .input::-webkit-input-placeholder {
    color: #BBB7B7;
    font-size: 1.3333333rem;
  }
  .modifySetpsw .Modify-title .modifySetpsw-small{
    display:none;
  }
  .modifySetpsw .psw_rule1 .tipS{
    display:block!important;
    position: absolute;
  }
  .Modify-conter{
    margin: 3.3rem 1.08333333rem 3.33333333rem;
    padding-bottom: 0.66666667rem;
  }
  .modifySetpsw .btn-next{
    margin:0 1.08333333rem;
  }
  /*小叉號*/
  .modifySetpsw .passdetele{
    width: 1.0833333rem;
    position: absolute;
    right: 2rem;
    top: 0.5rem;
  }
  .modifySetpsw .retrieve{
    padding-top: 1.25rem;
    color: #FA8C16;
  }
  /*弹出框*/
  .modifySetpsw .mask{
    background: rgba(0,0,0,.4);
  }
  .modifySetpsw .Popup p{
    line-height: 4.1666667rem;
  }
  .modifySetpsw .Popup .btnline{
    border-bottom:1px solid #E5E5E5;
  }
  .modifySetpsw .Popup .cancel{
    margin-top: 0.583333333rem;
  }
  .modifySetpsw .btn_login{
    opacity:.3;
  }
  @media screen and (max-width:321px){
     .modifySetpsw .btn_login{
        width:24.08rem!important;
      }
  }
</style>


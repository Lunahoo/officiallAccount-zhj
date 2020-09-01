<template>
    <div class="nickname height bg-f6" @click="CSbgLogin">
      <div class="nicknameIpt width">
        <div class="nick-padding">
          <input class="nickname-lift width" ref="input" v-model="nickNames" placeholder="" autofocus="autofocus"/>
        </div>
        <div class="passdetele1 pst-abs fr" @click="passdetele1" v-show="nickNames"><img src="../../../../assets/img/clean.png"/></div>
      </div>
      <div class="Preservation pst-abs cont">
        <p class="font-125 font-col-b cont bt-color" ref="save_btn" @click="saveNickName">保存</p>
      </div>
      <div class="tel-mess" ref="nick">
        <div class="juzhong">
          <section :class="[error_prompt]" id="nick_error">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script>
 /* function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };*/
  import filter from '../../../../filters/filter.js';
 import verify from "vue-verify-plugin";
 import {modifyNickName} from '@/api/user/userLogin'
  export default {
    name:'modifypsd',
    data() {
      return {
        error_prompt:"",
        content:"",
        isShow1:false,
        nickNames:'',
        chnIpt: false,
      }
    },
    methods:{
      /*点击空白处失焦*/
      CSbgLogin(){

      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      passdetele1:function () {
        this.nickNames=''
        this.$refs.input.focus();
      },
      saveNickName(){
          if(this.$refs.save_btn.style.opacity == 1){
            if(this.nickNames!=''&& this.nickNames!=null && this.nickNames != undefined){
              this.$refs.save_btn.style.opacity = 0.3;
              modifyNickName(localStorage.getItem("userID"),this.nickNames).then(res => {
                if(res.data.code == 200){
                  localStorage.setItem("nickName", this.nickNames);
                  this.$router.go(-1);
                }else{
                  this.$refs.save_btn.style.opacity = 1;
                  this.showError(res.data.msg);
                }
              },res => {
                this.$refs.save_btn.style.opacity = 1;
                this.showError(res.data.msg);
              })
            }
          }else{
            this.$refs.input.focus();
          }
      },
      showError(conent){
        this.error_prompt="tel-message";
        this.content = conent;
        window.document.getElementsByClassName("tel-mess")[0].style.display = "block";
        /*document.getElementById('nick_error').style.color = 'red'*/
      }

    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      this.$root.$data.vBack=true;
      if(this.$route.params.nickName!=''){
          this.nickNames = this.$route.params.nickName;
        this.$root.$data.article = '昵称';
      }
    },
    watch:{
      nickNames(newValue,oldValue){
          if(this.nickNames!=undefined){
            if(this.nickNames.length>0){
              this.$refs.save_btn.style.opacity = 1;
              if(this.$format.isLongth(this.nickNames) == false){
                this.nickNames = oldValue;
              }else{
                this.nickNames = newValue;
              }
            }else{
              this.$refs.save_btn.style.opacity = 0.3;
            }
          }
      }
    }
  }
</script>
<style>
  .nickname .nicknameIpt .nickname-lift{
    height: 3.75rem;
    width: 85%;
  }
  .nickname .nicknameIpt .passdetele1 {
    top: 3rem;
    right: 1.6666666rem;
    width: 1.0833333rem;
  }
  /*保存*/
  .Preservation{
    margin: 2rem 0.83rem;
    width: 94%;
  }
  .Preservation p{
    line-height: 3.83333rem;
    border-radius: 0.4rem;
  }
  #nick_error{
    display: block!important;
    margin-top: 5rem;
  }
  .nickname .trans {
    width: 56%;
    background-color: #1890FF;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 11rem;
    text-align: center;
    position: absolute;
    top: -1.5rem;
    left: 25%;
    font-size: 1.283333rem;
  }
  .nickname .tel-mess .tel-message {
    width: 56%;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 11rem;
    text-align: center;
    position: absolute;
    top: -1.5rem;
    left: 25%;
    font-size: 1.283333rem;
    display: none;
    opacity: .7;
  }
  .nicknameIpt{
    padding-top: 1.5rem;
  }
  .nickname .nicknameIpt .nick-padding{
    padding-left: 1.5rem;
    background: #fff;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
  }
  /*下面的样式*/
  @media screen and (max-width:768px)and (min-width:410px){
  }
  .Preservation .bt-color{
    opacity: 0.3;
  }
</style>

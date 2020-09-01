<template>
  <div class="realName width height bg-f6">
    <div class="padTop-1" v-if="!realNameRequire">
      <div class="bg-ff" v-if="type=='PE'"><!--独立C-->
        <div class="realName-parm section_l bd-btm height-375">
          <label class="realName-parm-lable fl">姓名</label>
          <input class="realName-parm-input fr height-375 mG-lfr1 cont-r" placeholder="请输入真实姓名" v-model="name"/>
        </div>
        <div class="realName-parm section_l">
          <label class="realName-parm-lable fl">身份证号</label>
          <input class="realName-parm-input fr height-375 mG-lfr1 cont-r" placeholder="请输入真实身份证号" v-model="idNumber"/>
        </div>
      </div>
      <div v-if="type=='CP'">
        <p class="section_l font-ipt" style="height: 2.51667rem;">企业预留信息</p>
        <div class="bg-ff"><!--企业员工-->
          <div class="realName-parm section_l bd-btm height-375">
            <label class="realName-parm-lable fl">姓名</label>
            <div class="realName-parm-input fr height-375 mG-lfr1 cont-r" style="font-size: 1.3rem">{{companyRealName}}</div>
          </div>
          <div class="realName-parm section_l">
            <label class="realName-parm-lable fl">身份证号</label>
            <div class="realName-parm-input fr height-375 mG-lfr1 cont-r" style="font-size: 1.3rem">{{companyIdentityNo}}</div>
          </div>
        </div>
        <p class="section_l font-ipt" style="height: 3.51667rem;line-height: 3.51667rem;">输入本人真实姓名</p>
        <div class="bg-ff"><!--独立C-->
          <div class="realName-parm section_l bd-btm height-375">
            <label class="realName-parm-lable fl">姓名</label>
            <input class="realName-parm-input fr height-375 mG-lfr1 cont-r" placeholder="请输入真实姓名" v-model="name"/>
          </div>
          <div class="realName-parm section_l">
            <label class="realName-parm-lable fl">身份证号</label>
            <input class="realName-parm-input fr height-375 mG-lfr1 cont-r" placeholder="请输入真实身份证号" v-model="idNumber"/>
          </div>
        </div>
      </div>
      <div class="realName-foot height-383 cont bg-FA4" @click="realNameOp">
        <span class="realName-ipt font-133 font-col-b">确认</span>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="user_realId">{{content}}</section>
        </div>
      </div>
    </div>
    <div class="padTop-1" v-if="realNameRequire">
      <div class="realName-card four_father">
        <img class="width fl" src="../../../../assets/img/user/img_card.png"/>
      </div>
      <div class="width info-Real">
        <div class="width">
          <img class="img-div fl cont overflow-h" v-if="headUrl!=null && headUrl!='' && headUrl!='null'" :src="headUrl"/>
          <img class="img-div fl cont overflow-h" v-if="headUrl==null || headUrl == '' || headUrl=='null'" src="../../../../assets/image/man.png"/>
          <div class="realInfo-div mG-lft183 fl font-133 font-col-b">
            <p>{{name}}</p>
            <p>{{idNumber|encryptionId}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {isRealName} from "@/api/user/loginReg";
  import {realNameNew} from "@/api/aloneC/cInterface";
  export default{
    data: function () {
      return {
        EnterName:"",
        EnteridNumber:"",
        name:"",
        idNumber:"",
        companyId:"",
        realNameRequire:false,
        headUrl:"",
        error_prompt:"",
        content:"",
        type:'PE',
        companyRealName:"",
        companyIdentityNo:"",
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    methods:{
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      //实名接口
      realNameOp(){
       if(this.name=='' || this.idNumber == ''){
         if(this.name==''){
           this.error_prompt="tel-message";
           this.content = '请输入真实姓名';
         }
         if(this.idNumber == ''){
           this.error_prompt="tel-message";
           this.content = '请输入真实身份证号'
         }
       }else{
         if(this.type == 'CP'){
           if(this.name!=this.companyRealName || this.idNumber!=this.companyIdentityNo){
             this.error_prompt="tel-message";
             this.content = '请和企业预留信息一致'
           }else{
             realNameNew(localStorage.getItem('userID'),this.name,this.idNumber).then(res =>{
               if(res.data.code == 200){
                 this.realNameRequire = true;
               }else if(res.data.msg == '用户已实名'){
                 this.realNameRequire = true;
               }else{
                 this.realNameRequire = false;
                 this.error_prompt = "tel-message";
                 this.content = res.data.msg;
               }
             },res =>{
               this.realNameRequire = false;
               this.error_prompt = "tel-message";
               this.content = res.data.msg;
             })
           }
         }else{
           realNameNew(localStorage.getItem('userID'),this.name,this.idNumber).then(res =>{
             if(res.data.code == 200){
               this.realNameRequire = true;
             }else if(res.data.msg == '用户已实名'){
               this.realNameRequire = true;
             }else{
               this.realNameRequire = false;
               this.error_prompt = "tel-message";
               this.content = res.data.msg;
             }
           },res =>{
             this.realNameRequire = false;
             this.error_prompt = "tel-message";
             this.content = res.data.msg;
           })
         }
       }
      }
    },
    created(){
      this.type = localStorage.getItem('userType');
      if(this.$route.params.companyRealName!=null && this.$route.params.companyRealName!='null' && this.$route.params.companyRealName!='' && this.$route.params.companyRealName!=undefined && this.$route.params.companyRealName!='undefined'){
          this.companyRealName = this.$route.params.companyRealName;
          this.companyIdentityNo = this.$route.params.companyIdentityNo;
          localStorage.setItem('companyRealName',this.companyRealName);
          localStorage.setItem('companyIdentityNo',this.companyIdentityNo);
      }else{
          if(localStorage.getItem('companyRealName')!=null && localStorage.getItem('companyRealName')!='null' && localStorage.getItem('companyRealName')!=undefined && localStorage.getItem('companyRealName')!='undefined' && localStorage.getItem('companyRealName')!=''){
            this.companyRealName = localStorage.getItem('companyRealName');
            this.companyIdentityNo = localStorage.getItem('companyIdentityNo');
          }
      }
      if(localStorage.getItem('head_url')!=undefined && localStorage.getItem('head_url')!=null && localStorage.getItem('head_url')!="" && localStorage.getItem('head_url')!="null"){
        this.headUrl = localStorage.getItem('head_url');
      }else if(localStorage.getItem('headimgurl')!=null && localStorage.getItem('headimgurl')!="" && localStorage.getItem('headimgurl')!=undefined){
        this.headUrl = localStorage.getItem('headimgurl');
      }
      isRealName(localStorage.getItem('userID'),"").then(res =>{
        if(res.data.code == 200){
          this.type = res.data.data.type;
          if(res.data.data.isRealName == 1) { //表示已经实名，直接绑卡
            this.realNameRequire = true;
            this.name = res.data.data.realName;
            this.idNumber = res.data.data.identityNo;
            localStorage.setItem('companyRealName',this.name);
            localStorage.setItem('companyIdentityNo',this.idNumber);
          }else{
            this.realNameRequire = false;
            this.companyRealName = res.data.data.companyRealName;
            this.companyIdentityNo = res.data.data.companyIdentityNo;
            localStorage.setItem('companyRealName',this.companyRealName);
            localStorage.setItem('companyIdentityNo',this.companyIdentityNo);
          }
        }else{
          this.realNameRequire = false;
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        }
      },res =>{
        this.realNameRequire = false;
      })
    }
  }
</script>
<style>
.realName .realName-parm{
  height: 3.75rem ;
}
.realName .realName-card{
  display: flex;
  height: 10rem;
}
.realName .info-Real{
  position: absolute;
  top:1rem;
  height: 10rem;
}
.realName .img-div{
  width: 5rem;
  height: 5rem;
  border-radius: 4rem;
  margin-left: 2.833333rem;
  margin-top: 8.3%;
}
.realName .realInfo-div{
  margin-top: 10.3%;
  height: 5rem;
  width: 65%;
}
.realName .padTop-1 .realName-foot{
  margin: 2.75rem 1.083333333rem 0;
  display: flex;
}
.realName .padTop-1 .realName-foot .realName-ipt{
  margin: auto;
}
.realName .realName-parm .realName-parm-lable{
    width: 20%;
  line-height: 3.75rem;
  }
.realName .realName-parm .realName-parm-input{
  width:70%;
  height:3.75rem ;
  }
</style>

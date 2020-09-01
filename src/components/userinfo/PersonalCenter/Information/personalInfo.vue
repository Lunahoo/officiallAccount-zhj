<template>
    <div class="PersonalInfo font-125 bg-f6 height">
      <div class="PerMargin">
      <div class="PersonalInfo-conter bg-ff">
      <div class="Personal-first bd-btm width">
        <div class="Personal-lift fl">头像</div>
        <div class="Personal-right fr">
          <div class="portrait">
            <!-- 图片展示 -->
            <div class="cha fl" style="width: 5.1rem;height: 5.1rem;overflow: hidden;text-align: center;border-radius: 4rem;position: relative;"><!--v-show="(imgUrl)"-->
              <img class="PersonalInfo_top_img" v-if="imgUrlShow" :src="imgUrl">
              <img class="PersonalInfo_top_img" v-else="!imgUrlShow" src="../../../../assets/image/man.png"/>
            </div>
            <!-- 图片上传控件 -->
            <div class="load fl"><!--
              <img src="../../../../assets/image/man.png">-->
              <form>
                <input multiple="multiple" type="file" accept="image/*" name="file" id="form" @change="uploadIMG($event)">
               <!-- <input name="file" type="file" multiple="multiple" @change="update">--><!--accept="image/png,image/gif,image/jpeg"-->
              </form>
            </div>
          </div>
        </div>
      </div>
      <router-link :to="{name:'nickname',params:{nickName:userDataInfo.nickName}}" tag="li">
        <div class="Personal-last bd-btm width Nickname-modify">
        <div class="Nickname fl width">
          <div class="Nickname-lift fl" >昵称</div>
          <div class="Nickname-right fr">
            <div class="xq fr" style="width: 0.416666667rem;"><img src="../../../../assets/img/right.png"></div>
            <div class="Nickname-font fr font-ipt" style="margin-right: 0.6rem;">{{userDataInfo.nickName|strNickName}}</div>
          </div>
        </div>
      </div>
      </router-link>
      <div class="Personal-last bd-btm width">
        <div class="Nickname fl width">
          <div class="Nickname-lift fl" >姓名</div>
          <div class="Nickname-right fr">
            <div class="Nickname-font deviation font-ipt fr" >{{userDataInfo.realName}}</div>
          </div>
        </div>
      </div>
        <div class="Personal-last bd-btm width">
          <div class="Nickname fl width">
            <div class="Nickname-lift fl">手机</div>
            <div class="Nickname-right fr font-ipt">
              <!--<div class="xq fr" style="width: 0.416666667rem;"><img src="../../../../assets/img/right.png"></div>-->
              <div class="Nickname-font deviation fr">{{userDataInfo.mobile}}</div>
            </div>
          </div>
        </div>
      <!--<div class="Personal-last bd-btm width">
        <div class="Nickname fl width">
          <div class="Nickname-lift fl">所属企业</div>
          <div class="Nickname-right fr">
            <div class="Nickname-font Nickname-font-p fl font-ipt ellipsis">{{companyShowName}}</div>
          </div>
        </div>
      </div>-->
      <div class="Personal-last bd-btm width" v-if="userDataInfo.type=='CP'">
        <div class="Nickname fl width">
          <div class="Nickname-lift fl">邮箱</div>
          <div class="Nickname-right fr">
           <!-- <div class="xq fr" style="width: 0.416666667rem;"><img src="../../../../assets/img/right.png"></div>-->
            <div class="Nickname-font deviation font-ipt fr">{{userDataInfo.email}}</div>
          </div>
        </div>
      </div>
      <div class="Personal-last width" @click="toRealNamePage">
          <div class="Nickname fl width">
            <div class="Nickname-lift fl">实名认证</div>
            <div class="Nickname-right fr">
              <div class="xq fr" v-if="userDataInfo.identityNo==null || userDataInfo.identityNo=='' || userDataInfo.identityNo==undefined || userDataInfo.identityNo=='undefined'" style="width: 0.416666667rem;"><img src="../../../../assets/img/right.png"></div>
              <div class="Nickname-font deviation font-ipt fr" v-if="userDataInfo.identityNo!=null && userDataInfo.identityNo!='' && userDataInfo.identityNo!=undefined && userDataInfo.identityNo!='undefined'">
                <img style="width:4.1666667rem;margin-top: 25%;" src="../../../../assets/img/user/icon_Certified.png"/>
              </div>
              <div class="Nickname-font deviation font-ipt fr" v-if="userDataInfo.identityNo==null || userDataInfo.identityNo=='' || userDataInfo.identityNo==undefined || userDataInfo.identityNo=='undefined'">
                <img style="width:4.1666667rem;margin-top: 25%;" src="../../../../assets/img/user/icon_unverified@2x.png"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="user_format">{{content}}</section>
        </div>
      </div>
      <section class="zz" v-show="againLogin">
        <div class="wrapcenter">
          <div class="wrapcenter_tips">
            <div class="section_top" style="line-height: 4.1rem;">未获取员工信息，请重新登陆</div>
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
  import filter from '../../../../filters/filter.js';
 import {queryMemberNew} from '@/api/user/userLogin'
 import {upLlad,upHeader,selectCompanyShow} from '@/api/user/news'
 import Exif from '../../../../assets/js/small-exif.js'
 export default {
    name:'modifypsd',
    data() {
      return {
        value:'',
        toke:'',
        defaultImg:  require('../../../../assets/image/man.png'),
        againLogin:false,
        pwdInput:'',
        content:'',
        error_prompt:"",
        mobile:'',
        imgUrl: null,
        imgUrlShow:true,
        companyShowName:'',
        Orientation:''  ,    //图片的拍摄角度
        userDataInfo:{

        },
        fileData:{
         /* path:''*/
        },
        clearShow:true,
        companyId:"",
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    methods:{
      init(){
         this.mobile = localStorage.getItem("loginTell").replace(/[" "]/g, "");
         let accessToken = localStorage.getItem("userID");
        if(accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined'){
          queryMemberNew(localStorage.getItem("userID"),this.companyId).then(res => {
            if(res.data.code == 200){
              this.userDataInfo = res.data.data;
              localStorage.setItem('loginTell',res.data.data.mobile);
              localStorage.setItem('identityNo',res.data.data.identityNo);
             /* localStorage.setItem("loginTell",this.userDataInfo.mobile)*/
             if(this.userDataInfo.headUrl!=undefined && this.userDataInfo.headUrl!=null && this.userDataInfo.headUrl!=""){
               this.imgUrl = this.userDataInfo.headUrl;
               localStorage.setItem('head_url',this.imgUrl);
             }else{
                 if(localStorage.getItem('head_url')!=undefined && localStorage.getItem('head_url')!=null && localStorage.getItem('head_url')!=""){
                   this.imgUrl = localStorage.getItem('head_url');
                 }else if(localStorage.getItem('headimgurl')!=undefined && localStorage.getItem('headimgurl')!=null && localStorage.getItem('headimgurl')!=""){
                   this.imgUrl = localStorage.getItem('headimgurl');
                   localStorage.setItem('head_url',localStorage.getItem('headimgurl'));
                 }else{
                   this.imgUrl = "";
                 }
             }
             if(this.imgUrl!=undefined && this.imgUrl!=null && this.imgUrl!="" && this.imgUrl!="null"){
                this.imgUrlShow = true;
             }else{
                 this.imgUrlShow = false;
             }
             //ToDo 隐藏之前版本所属企业模块内容
       /*      if(this.userDataInfo.companyList!=undefined && this.userDataInfo.companyList!=null && this.userDataInfo.companyList!=''){
               if(this.userDataInfo.companyList.length==1){
                 this.companyShowName = this.userDataInfo.companyList[0].companyName
               }
             }else{   //如果是c端用户没有企业归属，就隐藏企业邮箱和姓名三栏
               if(localStorage.getItem("companyName")!="null"){
                 this.companyShowName = localStorage.getItem("companyName");
               }else{
                 this.companyShowName = "";
               }
             }*/
            }else if(res.data.code == 9997) {
              this.error_prompt="tel-message";
              this.content = res.data.msg;
              this.againLogin = true
            }else{
              this.againLogin = true
            }
          },res => {
            this.againLogin = true
          })
        }else {
          this.ShowIndexMallUrl = false;
          let url = window.location.href;
          if(this.isWeixn()){
            if (url.indexOf('openid') > 0) {
              this.byOpenIdgetInfo(this.getOpenId(url),'personalInfo');
            }else {
              if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
                this.byOpenIdgetInfo(localStorage.getItem('openId'),'personalInfo');
              }else{
                //静默授权
                this.byWechAtgetOpenId('one',"",this.$root.$data.redirect_uri,'personalInfo')
              }
            }
          }else{
            this.againLogin = true
          }
        }
      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      abolish:function(){
        this.againLogin = false;
      },
      goLogin(){
        this.againLogin = false;
        localStorage.setItem("loginToPage",'personalInfo');
        this.$router.push({name:'login'});
      },
      uploadIMG(event) {
        let self = this;
        let img = new Image();
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        if(event.target.files.length==1){
          let file = event.target.files[0];
          Exif.getData(file, function() {
            self.Orientation = Exif.getTag(this, 'Orientation');
          });
          let param = new FormData(); //创建form对象self.compress(img,self.Orientation)
          //console.info(param)
          /*param = self.compress(img,self.Orientation);*/
          param.append('file',file,file.name);//通过append向form对象添加数据
          param.append('chunk','0');//添加form表单中其他数据
          //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          this.picavalue = file;
         /* let data = self.compress(img,file);*/
          //console.log(this.picavalue.size / 1024);
          if (this.picavalue.size / 1024 > 50000) {
            this.error_prompt="tel-message";
            this.content = "图片过大不支持上传";
          } else {
            this.imgPreview(this.picavalue,param);
          }
        }else if(event.target.files.length>1){
          this.error_prompt="tel-message";
          this.content = "只能选择一张图片";
        }else {
            //在上传一张照片后随即又点击上传但并不选择图片会提示报错次信息所以写一个空
        }
      },
      //获取图片
      imgPreview(file,formData,callback) {
        let self = this;
        //判断支不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          //创建一个reader
          let reader = new FileReader();

          //将图片转成base64格式
          reader.readAsDataURL(file);
          //读取成功后的回调
          reader.onload = function() {
            let result = this.result;
            let img = new Image();
            img.src = result;
           /* self.fileData.path = result;*/
            img.onload = function() {
              self.imgUrl = result;
              /*formData = data;*/
              this.toke = localStorage.getItem("userID");
              upLlad(this.toke,formData).then(response=>{
                if(response.data.code == 200) {
                  localStorage.setItem('head_url',response.data.data);
                  this.imgUrl = response.data.data;
                  upHeader(this.toke, response.data.data).then(response => {
                    if (response.data.code == 200) {
                      this.error_prompt="tel-message";
                      this.content = "图片修改成功";
                      //alert("图片修改成功")
                    } else {
                      this.error_prompt="tel-message";
                      this.content = response.data.msg;
                    }
                  }, response => {
                    this.error_prompt="tel-message";
                    this.content = response.data.msg;
                  })
                }else{
                  this.error_prompt="tel-message";
                  this.content = response.data.msg;
                }
              },response=>{
                this.error_prompt="tel-message";
                this.content = response.data.msg;
              })
            };
          };
        }
      },
      // 压缩图片
      compress(img, Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          //console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          //console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题
        if (Orientation != "" && Orientation != 1) {
          switch (Orientation) {
            case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img, 'left', canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img, 'right', canvas);
              break;
            case 3://需要180度旋转
              this.rotateImg(img, 'right', canvas);//转两次
              this.rotateImg(img, 'right', canvas);
              break;
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
      // base64转成bolb对象
      dataURItoBlob(base64Data) {
        var byteString;
        if (base64Data.split(",")[0].indexOf("base64") >= 0)
          byteString = atob(base64Data.split(",")[1]);
        else byteString = unescape(base64Data.split(",")[1]);
        var mimeString = base64Data
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
      },
      //删除事件
      delImg() {
        this.imgUrl = null;
      },
      toRealNamePage(){
        if(this.userDataInfo.identityNo=='' || this.userDataInfo.identityNo==null || this.userDataInfo.identityNo==undefined && this.userDataInfo.identityNo=='undefined'){
          this.$router.push({name:'realName'});
        }
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '个人信息';
      if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
        this.companyId = localStorage.getItem("companyId");
      }else{
        this.companyId = "";
      }
      this.init();
      if(localStorage.getItem("companyName")!="null"){
        this.companyShowName = localStorage.getItem("companyName");
      }else{
        this.companyShowName = "";
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/login.css";
  @import "../../../../assets/css/public.css";
  @import "../../../../assets/css/uploader.css";
  .PersonalInfo-conter{
    padding: 0 1.5rem;
  }
  .PersonalInfo .Nickname-font-p{
    width: 15rem;
    padding-top:0;
    margin-right: 0.6rem;
    text-align:right;
  }
  .PersonalInfo .Personal-first{
    height: 6.25rem;
    line-height: 6.25rem;
  }
  .PersonalInfo .Personal-right{
    width: 5rem;
    background: #f6f6f6;
    height: 5rem;
    border-radius: 3rem;
    margin-top: 7px;
    margin-right: 1.416666rem;
  }
  .PersonalInfo .Personal-right .portrait img{
    width: 100%;
    display: inline-block;
    /*height: 5.1rem;
    border-radius: 4rem;*/
  }
  .PersonalInfo_top_img{
    width: 5rem;
    height: 5rem;
    border-radius: 4rem;
    position: absolute;
    left: 0;top: 50%;
    transform: translateY(-50%);
  }
  .PersonalInfo .Personal-last{
    height: 3.75rem;
    line-height: 3.75rem;
  }
  .Personal-last .Nickname .Nickname-right{
    width:60%;
  }
  .Personal-last .Nickname .Nickname-right .xq{
    width: 0.58333rem;
    padding-top: 1.5rem;
    padding-left: 0.5rem;
  }
  .PersonalInfo .deviation{/*向右偏移*/
    padding-right: .6rem;
  }
  /*弹出框*/
  .PersonalInfo .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    /*display: none;*/
  }
  .PersonalInfo .Popup{
    width:100%;
    position: absolute;
    bottom: 0.75rem;
    left: 0;
    text-align: center;
    font-size: 1.5rem;
  }
  .Retrieve{
    margin:0 0.75rem;
  }
  .PersonalInfo .Popup p{
    background: #fff;
    line-height: 4.1666667rem;
    font-size: 1.25rem;
    border-radius: 0.4rem;
  }
  .PersonalInfo .Popup .btnline{
    border-bottom:1px solid #E5E5E5;
    border-radius: 1rem 1rem 0 0;
  }
  .PersonalInfo .Popup .btnline-x{
    border-radius: 0 0 1rem 1rem;
  }
  .PersonalInfo .Popup .cancel{
    margin-top: 0.583333333rem;
  }
  .PersonalInfo .Popup .cancel p{
    margin: 0 0.75rem;
    border-radius: 0.4rem;
    color: #969191;
  }
  .PersonalInfo .PerMargin{
    padding:1.5rem 0 0;
  }
  {
    width: 4rem;
    padding: 0.5rem 0 0 0.5rem;
  }
/*点击头像*/
  .PerMargin .portrait .load #form{
    position: absolute;
    top: 1.2rem;
    width: 5rem;
    height: 5rem;
    opacity:0;
  }


  /*5下面的样式*/
  @media screen and (max-width:321px){

  }
  /*下面的样式*/
  @media screen and (max-width:768px)and (min-width:668px){

  }
</style>

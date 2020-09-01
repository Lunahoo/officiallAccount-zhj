<template>
    <div class="feedback fl width height bg-f6" :class="editMoveUp" @touchmove="someFunction">
      <div class="feedback-first">
        <div class="feedback-font fl">
          <div class="radio-box font-108" v-for="(item,index) in radios" :key="item.id" @click="check(index)">
            <!--<span class="radio" :class="{'on':item.isChecked}"></span>-->
            <!--<input v-model="payType" :value="item.value" class="input-radio" :checked='item.isChecked' type="radio">-->
            <img :src="item.src" class="input-radio" :id="'circle_'+index" :key="index" @click="dataCircleEvent(index)">{{item.label}}

          </div>
        </div>
        <div class="feedback-img fr"><img src="../../../../assets/image/feedback.png"></div>
      </div>
      <div class="describe">
        <div class="describe-font pst-rlt">
          <textarea class="text-height width font-166 textStyle" placeholder="请描述您的问题或建议，我们将及时跟进解决"  name="suggestions-text" id="textarea"
                    cols="30" rows="10" maxlength="240" @focus="addEtextInvoice" @blur="qxaddEtextInvoice"
                    v-model="desc"></textarea><!--（请输入不少于10个字的描述）-->
          <!--v-on:keyup="write()" v-on:compositionstart="importStart()"
                    v-on:compositionend="importEnd()" -->
          <div class="describe-font-numb numberWord counterNum pst-abs font-167" v-show="numberWord">{{conterNum}}/240</div>
          <!--<textarea v-bind:maxlength="140" @input="descArea" v-model="introduct" name="abstract" id="abstract" placeholder="Add a bio to your profile"></textarea>
          <span class="num-desc">{{Surplus}}/140</span>--><!--实时监听剩余字数-->
          <!--<textarea autofocus="autofocus" class="width" maxlength="240" @input="descInput" style="word-break:break-all;word-wrap: break-word;"
                    v-model="desc" :maxlength="240" ref="deipt" placeholder="请描述您的问题或建议，我们将及时跟进解决（建议添加相关问题的截图）"></textarea>-->
        </div>
      </div>

      <div class="upload">
        <div class="add_tuzhi_com mb">
          <input id="plus_sent_pic" type="file"  @change="handleFileChange($event)" ref="inputer"  class="trans_file" accept="image/*" multiple>
          <div class="add_img clearfix" style="position: relative">

            <div class="font-108" style="line-height:3rem;padding-left: 0.833333rem;">图片（选填，提供问题截图,建议添加相关问题的截图）</div>
            <div class="add_img_list" v-for="(data,index) in imgData" @click="delImg(index)">
              <img :src="data">
              <span class="tuzhi_sel"></span>
            </div>
            <template v-if="img_loading">
              <div class="add_img_list">
                <p class="map_loading">图片上传中</p>
              </div>
            </template>
            <template v-else>
              <label for="plus_sent_pic" class="add_img_list" v-if="num<4">
                <div class="tuzhi_add"><span class="img_add">+</span></div>
              </label>
            </template>

            <p class="add_tuzhi_com_p"><span>{{num}}</span>/4</p>
          </div>
        </div>
        <!--<div class="picturesN font-7b7">
          <span>0</span>/4
        </div>-->
      </div>
      <div ref="MobileSubmitOp" style="margin: 2.8rem 1.0833333rem 0;">
        <div @click="MobileSubmission" class="Mobile-submit MobileSubmit bt-color font-133 cont" ref="deipt">提交</div>
      </div>
      <div class="tel-mess" id="tel-mess" ref="telMess">
        <div class="telCon-mess" style="display: flex;justify-content: center;">
          <section :class="[error_prompt]" id="oldS_pwd">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript" src="../../../../static/util/index.js"></script>
<script>
  import filter from '../../../../filters/filter.js';
  import {addFeedback} from '@/api/user/news'
  import Exif from '../../../../assets/js/small-exif.js'
  import {upLlad} from '@/api/user/news'
  import ElRadioGroup from "../../../../../node_modules/element-ui/packages/radio/src/radio-group";
  export default {
    components: {ElRadioGroup},
    data() {
      return {
       /* Surplus:140,实时监听剩余字数
        introduct:'',*/
          //字数
        payType: '',
        radios:[
          {
            label: '功能异常：功能故障或不可用',
            value:'功能异常：功能故障或不可用',
        //    isChecked: false,
            src:require("../../../../assets/img/btn_Unselected.png")
          },
          {
            label: '产品建议：用的不爽，有想法',
            value:'产品建议：用的不爽，有想法',
        //    isChecked: false,
            src:require("../../../../assets/img/btn_Unselected.png")
          },
          {
            label: '安全问题：资金、隐私有问题',
            value:'安全问题：资金、隐私有问题',
        //    isChecked: false,
            src:require("../../../../assets/img/btn_Unselected.png")
          },
          {
            label: '其他问题',
            value:'其他问题',
       //     isChecked: false,
            src:require("../../../../assets/img/btn_Unselected.png")
          },
        ],
        chooseIndex:"reset",
        numberWord:true,
        conterNum:0,
        chnIpt: false,
        phoneType:"",//获焦上移
        editMoveUp:"",
        error_prompt:"",
        content:"",
        desc:'',
        /*添加图片*/
        num:0,  //上传图片数量
        base64:'' ,  //压缩后的图片
        imgData:[],   //图片
        data:{base64:''},
        imgType:2,     //图片上传的状态  0：图片已经成功上传  1表示图片在上传中 2表示图片还没上传,
        img_loading:false,
        Orientation:''  ,    //图片的拍摄角度
        picUrl:'',  //图片url
        picListFeed:{  //提交反馈信息
            type:1,
            content:'',
            ip:'',
            picList:[
              {
                picUrl:""
              }
            ]/**/
        }
      }
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          el.focus();
        }
      }
    },
    mounted:function(){
      this.$refs.MobileSubmitOp.style.cssText="opacity:.3!important";
      /* this.init();*/
      this.$nextTick(function(){
        setInterval(this.timer,800);
      })
    },
    methods:{
     /* descArea(){实时监听剩余字数
        var textVal = this.introduct.length;
        this.Surplus = 140 - textVal;
      },*/
     //小圆圈点击事件
      dataCircleEvent(circleIndex){
        for(let i=0;i<4;i++){
            if(circleIndex==i){
                  this.radios[circleIndex].src = require("../../../../assets/img/btn_selected.png");
              this.payType = this.radios[circleIndex].value;
            }else{
              this.radios[i].src = require("../../../../assets/img/btn_Unselected.png");
            }
        }
      },
      check(index) {
        // 先取消所有选中项
//        this.radios.forEach((item) => {
//          item.isChecked = false;
//        });
//        //再设置当前点击项选中
//        this.payType = this.radios[index].value;
//        // 设置值，以供传递
//        this.radios[index].isChecked = true;
//        console.log(this.payType);
      },
      loadData(){
        // 设置一进来是  在线支付  还是  线下支付
        _this.payType = data.FPayType
        if(data.FPayType === "在线支付"){
          _this.$set(_this.radios[0],'isChecked',true)
          _this.$set(_this.radios[1],'isChecked',false)
        }else{
          _this.$set(_this.radios[0],'isChecked',false)
          _this.$set(_this.radios[1],'isChecked',true)
        }
      },
      someFunction(){
        document.activeElement.blur(); // ios隐藏键盘
        //this.$refs.input.blur() // android隐藏键盘
      },
      iSApp(){
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
        let u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          this.phoneType = '安卓手机'; //安卓手机
        } else if (u.indexOf('iPhone') > -1) {
          this.phoneType = '苹果手机'; //苹果手机
        } else if (u.indexOf('Windows Phone') > -1) {
          this.phoneType = 'winphone手机'; //winphone手机
        }
      },
      //发票类别获焦事件
      addEtextInvoice(){
        if(this.phoneType != "苹果手机"){
          this.editMoveUp = "editTransf";
        }
      },
      qxaddEtextInvoice(){
        if(this.phoneType != "苹果手机") {
          this.editMoveUp = "";
        }
      },
        //字数
      write() {
        this.picListFeed.content = this.desc;
        let self = this;
        if (self.chnIpt == false) {
          self.conterNum = self.picListFeed.content.length;
         // console.log()
        }
      },
      //发票类别获焦事件
      addEtextInvoice(){
        this.editMoveUp = "editTrans";
      },
      qxaddEtextInvoice(){
        this.editMoveUp = "";
      },

      importStart() {
        this.chnIpt = true;
      },
      importEnd() {
        this.chnIpt = false;
        this.write();
      },
      showClicked(){
        this.showPwd = true;
      },
      aEmpty(){
        this.textV = '';
      },
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      MobileSubmission(){
        this.toke = localStorage.getItem("userID");
        //console.log(this.toke);
        this.picListFeed.type = 1;
        //console.log(this.picListFeed.type);
        this.picListFeed.content = this.desc;
        //console.log(this.picListFeed.content);
        this.picListFeed.ip = 355777071327724;
        //console.log(this.picListFeed.ip);
        //console.log(this.picListFeed.picList);
        if(this.$refs.MobileSubmitOp.style.opacity == "1"){
         /* if(this.picListFeed.content.length < 10){
            this.backErrorfun("内容不能少于10个字");
          }else{*/
            addFeedback(this.toke,this.picListFeed).then(res=>{
              if(res.data.code == 200){
                this.$router.push({
                  name:"Success",
                });
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            },res=>{
              //console.log(res)
            })
         /* }*/
        }
      },
      backErrorfun(msg){
        this.error_prompt="tel-message";
        this.content = msg;
        this.$refs.telMess.style.display="block";
        this.oldPwd = '';
      },
      delImg(id,index){   //删除图片
        this.imgData.splice(index, 1);
        if(this.num>=1){
          this.num-=1;
        }
      },
      handleFileChange (event) {  //获取图像
        let file = event.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('file',file,file.name);//通过append向form对象添加数据
        param.append('chunk','0');//添加form表单中其他数据
        //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        this.picavalue = file;
       // console.log(this.picavalue.size / 1024);
        /*以下是原来的*/
        let that=this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        for(let i in inputDOM.files){
          this.file= inputDOM.files[i];
          this.imgPreview(this.file,param);
          Exif.getData(this.file, function() {
            that.Orientation = Exif.getTag(this, 'Orientation');
          });
        }
      },
      imgPreview (file,formData,callback) {   //base64 格式
        this.imgType=1;
        this.img_loading=true;
        let self = this;
        let imgContent={};
        imgContent.name=file.name;
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          var reader = new FileReader();
          // 将图片将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let IMG = new Image();
            IMG.src = this.result;
            IMG.onload = function(){
              let w = this.naturalWidth,
                h = this.naturalHeight,
                resizeW = 0,
                resizeH = 0;
              //压缩设置
              let maxSize = {
                width:800,      //图片最大宽度
                height:800,     //图片最大高度
                level:0.6       //图片保存质量
              };
              //计算缩放比例
              if(w > maxSize.width || h > maxSize.height){
                let multiple = Math.max(w / maxSize.width , h / maxSize.height);
                resizeW = w / multiple;
                resizeH = h / multiple;
              }else{
                resizeW = w;
                resizeH = h;
              }
              let canvas = document.createElement("canvas"),
                cxt = canvas.getContext('2d');
              //根据拍摄的角度进行图片旋转调整
              if (self.Orientation == 3) {
                canvas.width = resizeW;
                canvas.height = resizeH;
                cxt.rotate(Math.PI);
                cxt.drawImage(IMG, 0, 0, -resizeW, -resizeH)
              } else if (self.Orientation == 8) {
                canvas.width = resizeH;
                canvas.height = resizeW;
                cxt.rotate(Math.PI * 3 / 2);
                cxt.drawImage(IMG, 0, 0, -resizeW, resizeH)
              } else if (self.Orientation == 6) {
                canvas.width = resizeH;
                canvas.height = resizeW;
                cxt.rotate(Math.PI / 2);
                cxt.drawImage(IMG, 0, 0, resizeW, -resizeH)
              } else {
                canvas.width = resizeW;
                canvas.height = resizeH;
                cxt.drawImage(IMG, 0, 0, resizeW, resizeH)
              }
              //base64,最终输出的压缩文件
              self.base64 = canvas.toDataURL('image/jpeg',maxSize.level);
              self.num+=1;
              self.imgType=0;
              self.img_loading=false;
              self.imgData.push(self.base64 )
            }
            this.toke = localStorage.getItem("userID");
            //console.log(this.toke)
            upLlad(this.toke,formData).then(res=>{
              if(res.data.code == 200) {
                  //console.log(res.data);
                self.picUrl=res.data.data;
                self.picListFeed.picList[self.picListFeed.picList.length-1].picUrl = self.picUrl;
              }else {
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            })
          };
        }
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '意见反馈';
    },
    watch:{
      desc:function (newValue, oldValue) {
        newValue = newValue.trim();
        this.conterNum = newValue.length
        if(newValue.length>=1){
          this.$refs.MobileSubmitOp.style.cssText="opacity:1!important";
        }else {
          this.$refs.MobileSubmitOp.style.cssText="opacity:0.3!important";
        }
      }

    }
  }
</script>
<style>
  @import "../../../../assets/css/public.css";
  .feedback .feedback-first{
    background: #fff;
    height: 13.8rem;
    margin-bottom: 0.8333333rem;
  }
 /* .editTrans{
    transform:translateY(-15.5rem);
  }*/
  .feedback-img{
    width: 9.125rem;
    padding-right: 1.083333rem;
    padding-top: 2.666666rem;
    position: absolute;
    right: 0;
  }
  .feedback{
    transition:transform 0.3s;
  }
  .feedback .feedback-font{
    padding: 1.33333rem 0 0 1.083333rem;
    font-size: 1rem;
  }
  .feedback .feedback-font .p{
    line-height: 2.84rem;
  }
  .feedback .describe{
    padding-top: 0.8333333rem;
    background: #fff;
  }
  .feedback .describe .describe-font{
    padding:0 1.0833333rem 2rem;
  }
  .feedback .describe .describe-font .describe-font-numb{
    top: 9.5rem;
    right: 1.083333rem;
    color: #ccc;
  }
  .feedback .describe .upload{
    padding-bottom: 0.8333333rem;
    background: #fff;
  }
  .feedback .describe .upload .upload-img{
    width: 4.166666rem;
    height: 4.166666rem;
    border: 1px solid #E5E5E5;
    border-radius: 0.4rem;
  }
  .feedback .Mobile{
    background: #fff;
    margin-top: 0.8333333rem;
    padding:0 1.0833333rem;
    line-height: 4.1666666rem;
  }
  .feedback .Mobile .Mobile-font::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 12px;
  }
  .feedback .Mobile-submit{
    margin: 2.8rem 1.0833333rem 0;
    color: #fff;
    line-height: 3.833333rem;
    border-radius: 0.4rem;
  }
  .feedback .feedback-font .p img{
    width: 1rem;
    float: left;
    padding: 0.9rem 0.6rem 0 0;
  }
  /*输入文字textarea*/
  textarea{
    height: 9rem;
    color: #2E2A2A;
    font-size: 1.083333rem;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color: #606266;
  }
  .el-radio+.el-radio{
    margin-left:0;
  }
  .el-radio{
    float: left;
    width:100%;
    padding-bottom: 1.666666667rem;
  }
  .el-radio:last-of-type{
     padding-bottom: 0;
   }
  /*添加图片样式*/
  .add_tuzhi{
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 2rem;
  }
  .upload .trans_file{
    display: none;
  }
  .upload .add_img{
    margin: 1rem 0 0;
    background: #fff;
  }
  .upload .add_img_list{
    float: left;
    width: 5.16666666666666rem;
    height: 5.16666666666666rem;
    position: relative;
    padding: 0.213333rem;
    box-sizing: border-box;
    margin: 0 0.213333rem 1rem;
  }
  .upload .add_img_list img{
    width: 100%;
    height: 100%;
    margin-left: 0.583333rem;
  }
  .upload .add_img_list .tuzhi_add{
    display: block;
    width:100%;
    height: 100%;
    border: 1px solid #f4f4f4;
    /*position: relative;*/
    /*background:url(../../../../assets/img/account/add.png);*/
    background-size: 100% 100%;
    margin-left:0.5833333rem;
  }
  .upload .add_img_list .tuzhi_add .img_add{
    font-size: 4rem;
    text-align: center;
    display: block;
    width: 100%;
    height: 100%;
    color: #ccc;
    margin-top: -15%;
  }
  .upload .add_tuzhi_com .add_tuzhi_com_p{
    color: #ccc;
    font-size: 1.166666666667rem;
    position: absolute;
    right: 1.08333333rem;
    bottom:0.32rem;
  }
  .add_img_list .map_loading{
    width:100%;
    text-align:center;
    height: 3.466666666666333rem;
    line-height: 3.466666666666333rem;
    color:#333;
    font-size: 0.554667rem;
    border:1px  #dedede dashed;
  }
.telCon-mess #oldS_pwd{
  display: block!important;
}
  .upload .add_img_list .tuzhi_sel{
    position: absolute;
    width: 1rem;
    height: 1rem;
    right: -0.5rem;
    top:0;
    background: url(../../../../assets/img/clean.png);
    background-size: 100% 100%;
  }
  .radio-box{
    width: 60%;
    /*display: inline-block;*/
    /*position: relative;*/
    float:left;
    line-height: 2.8rem;
  }
  .input-radio {
    margin-right:0.5rem;
    /*display: inline-block;*/
    /*position: absolute;*/
    line-height: 2.8rem;
    float:left;
    margin-top:0.7rem;
    /*opacity: 0;*/
    /*width: 25px;*/
    /*height: 25px;*/
    width: 1.33333rem;
    height: 1.33333rem;
    cursor: pointer;
    left: 0px;
    outline: none;
    -webkit-appearance: none;
  }
  .radio {
    border: 1px solid rgb(220, 223, 230);border-radius: 100%;width: 14px;height: 14px;background-color: rgb(255, 255, 255);cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    /*//background-position: 0 0;*/
    background-size: 100% 100%;
    /*//雪碧图*/
  }
  .on {

    background-size: 100% 100%;
    background-color: #409eff;
    /* background-position: -25px 0;  //雪碧图*/
  }
  @media screen and (max-width:321px){
    .el-radio__label {
      font-size: 12px;
      padding-left: 10px;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    textarea {
      font-size: 2.083333rem;
    }
    .el-radio__label {
      font-size: 17px;
    }
  }
</style>

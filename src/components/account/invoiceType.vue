<template>
    <div class="invoiceType">
      <div class="fillIn-conter">
        <div class="fillIn-mask height">
          <div class="fillIn-Popup fl">
            <!--添加发票-->
            <div class="fillIn-add width fl" >
              <div class="title-name font-a39 font-125">添加发票</div>
              <div class="fillIn-icon fl cont" v-for="(items,index) in invoiceType" v-if="items.id!='4' && items.id!='5' && items.id!=4 && items.id!=5">
                <!--v-if="items.name!='其他'"-->
                <form class="pst-rlt">
                  <input class="ptFillShow" multiple type="file" accept="image/*" @change="chooseImageTap($event,items.id,items.name)" v-if="items.name!='电子发票'">
                  <input class="ptFillShow" multiple type="text" name="file" v-if="items.name=='电子发票'" @click="showHideAddElectronicInvoice($event,items.id)"><!--accept="image/jpeg,image/jpg,image/png,image/svg"-->
                </form>
                <img :src="items.picUrl" />
                <p class="">{{items.name}}</p>
              </div>
            </div>
            <div class="fillIn-add width fl" >
              <div class="title-name font-a39 font-125">行程单</div>
              <div class="fillIn-icon fl cont" v-for="(items,index) in invoiceType" v-if="items.id=='4' || items.id=='5' || items.id==4 || items.id==5">
                <!--v-if="items.name!='其他'"-->
                <form class="pst-rlt">
                  <input class="ptFillShow" multiple type="file" accept="image/*" @change="chooseImageTap($event,items.id,items.name)">
                </form>
                <img :src="items.picUrl" />
                <p class="">{{items.name}}</p>
              </div>
            </div>
          </div>
          <div class="mask" v-if="showAdd" @click="showHideAddElectronicInvoice($event)">
            <div class="Popup">
              <div class="Retrieve">
                <p @click="outLogin" class="font-2a2a font-s15">从相册选择</p>
                <form class="pst-rlt">
                  <input class="ptImgShow" type="file" accept="image/*" id="capture" @change="chooseImageTap($event)">
                  <!--<input class="ptFillShow" multiple type="file" accept="image/*" @change="uploadIMG($event)">-->
                </form>
                <p @click="toelectronicInvoicePage" class="bd-top font-2a2a font-s15">输入发票地址</p>
              </div>
              <div class="bg-f6" style="height: 0.6666667rem;"></div>
              <div class="cancel font-96"><p class="font-s15" @click="showHideAddElectronicInvoice($event)">取消</p></div>
            </div>
          </div>
          <div class="tel-mess" ref="telmess">
            <div class="juzhong" style="z-index: 1000;">
              <section :class="[error_prompt]">{{content}}</section>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {queryInvoiceType} from "@/api/user/loginReg";
  import Exif from '../../assets/js/small-exif.js'
  import {uploadInvoice} from '@/api/user/news'/*上传文件*/
  import {addETMask1,EditElectronicInvoice} from '@/api/user/SignOut'/*添加电子发票*/
  export default {
    name: 'invoiceType',
    data() {
      return {
        error_prompt:"",
        content:"",
        picavalue: "",
        invoiceType:{},   //发票类别
        categoryId:"",
        showAdd:false,
      }
    },
    methods:{
      timer(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      showHideAddElectronicInvoice(event,categoryId){
          document.activeElement.blur();
        if(categoryId!=undefined){
          this.showAdd = true;
          this.categoryId = categoryId;
        }else{
          this.showAdd = false;
        }
      },
      chooseImageTap(event,categoryId,name){
        event.stopPropagation();
        this.endT();
        if(event.target.files.length==1){
          let file = event.target.files[0];
          //toLowerCase();//转小写
          let pic = {};
          pic.categoryId = categoryId;
          pic.companyId = localStorage.getItem("companyId");
          pic.companyName = localStorage.getItem("companyName");
          var fileHz = file.type.substr(file.type.indexOf('/')+1,file.type.length);
          var flieType = "exc.png";
          if (fileHz == "xls") {
            flieType = "exc.png";
          } else if (fileHz == "doc" || fileHz == "docx") {
            flieType = "word.png";
          } else if (fileHz == "png" || fileHz == "jpg" || fileHz == "jpeg") {
            flieType = "pic.png";
            //图片特殊处理
            if(categoryId==undefined){
              this.uploadFileToService(file,true,pic,this.categoryId,'电子发票');
            }else {
              this.uploadFileToService(file,true,pic,categoryId,name);
            }
            return;
          }
          if (file != undefined) {
            if(categoryId==undefined){
              this.uploadFileToService(file,true,pic,this.categoryId,'电子发票');
            }else {
              this.uploadFileToService(file,true,pic,categoryId,name);
            }
          }
        }else if(event.target.files.length>1){
          this.error_prompt="tel-message";
          this.content = "只能选择一张图片";
        }
      },
      uploadFileToService(file,isImg,pic,categoryId,categoryName){
        if(file.size>300*1024 && isImg){
          this.imageCheck(file,pic,categoryId,categoryName);
          return;
        }
        let self = this;
        var formdata_file = new FormData();
        formdata_file.append("file", file);
        let toke = localStorage.getItem("userID");
        uploadInvoice(toke, formdata_file).then(response => {
          if (response.data.code == 200) {
            pic.picUrl = response.data.data.imageUrl;
            localStorage.setItem("photoUrl",pic.picUrl);
            pic.minPicUrl = response.data.data.thumbnailImageUrl;
            if(categoryId == 5 || categoryId == 4 || categoryId == '5' || categoryId == '4'){
              self.$router.push({
                name:"itinerary",
                params:{
                  categName:categoryName,
                  categId:categoryId,
                  urls:pic.picUrl,
                  picData:pic,
                }
              })
            }else if(categoryId == 7 || categoryId == 6 ){
              self.$router.push({
                name:"addQuotaInvoice",
                params:{
                  categName:categoryName,
                  categId:categoryId,
                  urls:pic.picUrl,
                  picData:pic,
                }
              })
            }else{
              self.$router.push({
                name:"add",
                params:{
                  categName:categoryName,
                  categId:categoryId,
                  urls:pic.picUrl,
                  picData:pic,
                }
              })
            }
          }else{
            this.Loading = false;
            //如果是专票和普票图片上传失败关闭图片，返回发票列表页，关闭loading
            if(categoryName == "增值税专票" || categoryName == "增值税普票"){
              self.error_prompt="tel-message";
              self.content = "发票上传失败";
              self.$router.push({name:"fill"});
            }else{
              self.error_prompt="tel-message";
              self.content = response.data.msg;
              self.$router.push({name:"fill"});
            }
          }
        }, response => {
          self.error_prompt="tel-message";
          self.content = response.stack;
        });
      },
      imageCheck(file,pic,categoryId,categoryName){
        var img = file;
        var reader = new FileReader();
        let self = this;
        reader.readAsDataURL(img);
        reader.onload = function (e) {
          var base64Img = reader.result;
          //--执行resize。
          lrz( file).then(function(rst) {
            var formData = rst.formData;
            formData.append("files", rst.file);
            let toke = localStorage.getItem("userID");
            uploadInvoice(toke, formData).then(response => {
              if (response.data.code == 200) {
                if (response.data.code == 200) {
                  pic.picUrl = response.data.data.imageUrl;
                  pic.minPicUrl = response.data.data.thumbnailImageUrl;
                  localStorage.setItem("photoUrl",pic.picUrl);
                  if(categoryId == 5 || categoryId == 4 || categoryId == '5' || categoryId == '4'){
                    self.$router.push({
                      name:"itinerary",
                      params:{
                        categName:categoryName,
                        categId:categoryId,
                        urls:pic.picUrl,
                        picData:pic,
                      }
                    })
                  }else if(categoryId == 6 || categoryId == 7 ){
                    self.$router.push({
                      name:"addQuotaInvoice",
                      params:{
                        categName:categoryName,
                        categId:categoryId,
                        urls:pic.picUrl,
                        picData:pic,
                      }
                    })
                  }else{
                    self.$router.push({
                      name:"add",
                      params:{
                        categName:categoryName,
                        categId:categoryId,
                        urls:pic.picUrl,
                        picData:pic,
                      }
                    })
                  }
                }else{
                  this.Loading = false;
                  //如果是专票和普票图片上传失败关闭图片，返回发票列表页，关闭loading
                  if(categoryName == "增值税专票" || categoryName == "增值税普票"){
                    self.error_prompt="tel-message";
                    self.content = "发票上传失败";
                    self.$router.push({name:"fill"});
                  }else{
                    self.error_prompt="tel-message";
                    self.content = response.data.msg;
                    self.$router.push({name:"fill"});
                  }
                }
              }
            }, response => {
              self.error_prompt="tel-message";
              self.content = response.stack;
            });
          }).catch(function(error) {
            //失败时执行
          }).always(function() {
            //不管成功或失败，都会执行
          })
        };
      },
      toelectronicInvoicePage(){
        this.$router.push({name:"electronicInvoice",params:{categoryId:this.categoryId}})
      },
      endT(name){
        if(name!="电子发票"){
          clearInterval(this.fillIntimers);
        }
      },
    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      queryInvoiceType().then(res=>{   //查询发票类别接口
        if(res.data.code == 200){
          this.invoiceType = res.data.data;
        }
      },res=>{
        this.error_prompt="tel-message";
        this.content = res.data.msg;
      })
    }
  }
</script>
<style>
  .invoiceType .fillIn-conter .fillIn-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0.97;
    z-index: 1000;
  }
  .invoiceType .fillIn-conter .fillIn-mask .mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
  }
  .invoiceType .Popup p{
    background: #fff;
    line-height: 4.1666667rem;
  }
  .invoiceType .fillIn-conter .fillIn-mask .mask .Popup{
    width:100%;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    font-size: 1.5rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add{
    padding-bottom: 1.333333rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon img{
    width: 2.5083333rem;
    padding-left: 33%;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon{
    width:24.5%;
    padding-bottom: 1.33333rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon p{
    font-size: 1rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup{
    padding-top: 9.5833333rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .title-name{
    margin: 0 1.083333rem 1rem;
  }
  .Popup .Retrieve .ptImgShow{
    opacity: 0;
    position: absolute;
    top: -4.1666667rem;
    width: 100%;
    height: 4.166667rem;
    left: 0;
  }
</style>

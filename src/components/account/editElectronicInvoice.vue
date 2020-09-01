<template>
    <div class="addElectronic width height bg-f6" :class="editMoveUp" @touchmove="someFunction">
      <div class="addElectronic-conter width">
        <div class="paddET-c-p font-a39 bg-ff">
          <p class="addET-line-h bd-btm">电子发票地址</p>
          <div class="">
            <textarea ref="textVle" class="text-height width font-166 textStyle" v-model="picUrl" placeholder="请输入电子发票下载地址"></textarea>
          </div>
          <div class="aEmpty" @click ="aEmpty" v-show="picUrl">清空</div>
        </div>
        <div class="paddET-c-Remarks bg-ff font-a39">
          <p class="addET-line-h bd-btm">发票备注</p>
          <div class="">
            <textarea class="text-height width font-166 textStyle"
                      placeholder="请输入对此电子发票的备注,便于后续区分" name="suggestions-text" id="textarea"
                      cols="30" rows="10" maxlength="50" @focus="addEtextInvoice" @blur="qxaddEtextInvoice"
                      v-on:keyup="write()" v-on:compositionstart="importStart()"
                      v-on:compositionend="importEnd()" v-model="textContent"></textarea>
          </div>
          <div class="numberWord counterNum" v-show="numberWord">{{conterNum}}/50</div>
        </div>
        <div class="addET-mask bg-000 cont" v-show="addMask">
          <img class="addET-mask-img" src="../../assets/img/account/icon_Identification_success@2x.png" />
          <p class="font-col-b addET-mask-img-font">保存发票成功</p>
        </div>
      </div>
      <div class="addET-ipt width cont">
        <div class="addET-ipt-font bt-color height-383 font-col-b font-133" ref="editAdd" @click="addEdit">保存</div>
      </div>
    </div>
</template>
<script>
  import {EditElectronicInvoice} from '@/api/user/SignOut'
  export default {
    name: 'addElectronic',
    data () {
      return {
        id:"",
        categoryId:"",
        toke:'',
        picUrl:'',
        textContent: '',
        conterNum: 0,
        editMoveUp:"",      //控制页面移动样式
        chnIpt: false,
        textarea:'',
        textV:'',
        numberWord:true,
        addMask:false,
        pic:{

        }
      }
    },
    components: {
      /*pwd*/
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '电子发票';
        if(this.$route.params.picUrl!=undefined && this.$route.params.picUrl!=null){
          this.picUrl= this.$route.params.picUrl;
          localStorage.setItem('picUrl',this.picUrl);
        }else{
            if(localStorage.getItem('picUrl')!=undefined && localStorage.getItem('picUrl')!=null && localStorage.getItem('picUrl')!=""){
              this.picUrl = localStorage.getItem('picUrl')
            }
        }
      if(this.$route.params.remark!=undefined && this.$route.params.remark!=null){
        this.textContent= this.$route.params.remark;
        localStorage.setItem('textContent',this.textContent);
      }else{
        if(localStorage.getItem('textContent')!=undefined && localStorage.getItem('textContent')!=null && localStorage.getItem('textContent')!=""){
          this.textContent = localStorage.getItem('textContent')
        }
      }
      if(this.$route.params.id!=undefined && this.$route.params.id!=null){
        this.id= this.$route.params.id;
        localStorage.setItem('id',this.id);
      }else{
        if(localStorage.getItem('id')!=undefined && localStorage.getItem('id')!=null && localStorage.getItem('id')!=""){
          this.id = localStorage.getItem('id')
        }
      }
      if(this.$route.params.categoryId!=undefined && this.$route.params.categoryId!=null){
        this.categoryId= this.$route.params.categoryId;
        localStorage.setItem('categoryId',this.icategoryIdd);
      }else{
        if(localStorage.getItem('categoryId')!=undefined && localStorage.getItem('categoryId')!=null && localStorage.getItem('categoryId')!=""){
          this.categoryId = localStorage.getItem('categoryId')
        }
      }
    },
    methods: {
      someFunction(){
        document.activeElement.blur(); // ios隐藏键盘
        //this.$refs.input.blur() // android隐藏键盘
      },
      write() {
        let self = this;
        if (self.chnIpt == false) {
          self.conterNum = self.textContent.length;
        }
      },
      //发票类别获焦事件
      addEtextInvoice(){
        this.editMoveUp = "editTransf";
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
        this.picUrl = '';
      },
      addEdit(){
        //this.addETMask=true;
        this.toke = localStorage.getItem("userID");
        this.pic.picUrl = this.picUrl;
        this.pic.minPicUrl = this.picUrl;
        this.pic.remark = this.textContent;
        this.pic.id = this.id;
        this.pic.categoryId = this.categoryId;
        this.$router.push({
          name:"iptInforM",
          params:{
            categName:"电子发票",
            op:"edit",
            categoryId:this.categoryId,
            FpId:this.id,
            picData:this.pic,
          }
        })
    /*    EditElectronicInvoice(this.toke,this.pic).then(res => {
          if(res.data.code == 200){//成功
            this.addMask = true;
            this.$router.push({name:"fill"})
          }else{
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        },res => {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        })*/
      },
      //写一个定时器添加成功之后跳转页面
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    watch:{
      picUrl(newValue,oldValue){
          if(this.picUrl!=undefined){
              if(this.picUrl.length>0){
                this.$refs.editAdd.style.opacity = 1
                let pattern_chin1 = /[\u4e00-\u9fa5]/g;
                if(newValue.match(pattern_chin1)!=null){
                  this.picUrl = oldValue;
                }
                if(this.picUrl!=""){
                  this.$refs.editAdd.style.opacity = 1
                }else{
                  this.$refs.editAdd.style.opacity = 0.3
                }
              }else{
                  this.$refs.editAdd.style.opacity = 0.3
              }
          }else{
            this.$refs.editAdd.style.opacity = 0.3
          }
      }
    }
  }
</script>
<style>
  .addElectronic{
    transition:transform .1s;
  }
  .editTransf{
    transform:translateY(-6.5rem);
  }
  .addElectronic .addElectronic-conter{
    padding-top: 1rem;
  }
  .addElectronic .addElectronic-conter .paddET-c-p,.addElectronic .addElectronic-conter .paddET-c-Remarks{
    padding: 0 1.0833333rem;
    margin-bottom: 1rem;
    position: relative;
  }
  .addElectronic .addElectronic-conter .paddET-c-p  .addET-line-h,.addElectronic .addElectronic-conter .paddET-c-Remarks .addET-line-h{
    line-height: 2.833333rem;
    font-size: 1.25rem;
  }
  .addElectronic .addET-ipt .addET-ipt-font{
    margin:0 1.083333rem;
    border-radius: 4px;
    opacity: 0.3;
  }
  .paddET-c-p .aEmpty,.paddET-c-Remarks .numberWord{
    position: absolute;
    top: 0.6rem;
    right: 1rem;
  }
  .addElectronic-conter .addET-mask{
    width: 10rem;
    height: 7rem;
    opacity: 0.6;
    margin-left: 34%;
    position: absolute;
    top: 15rem;
    border-radius: 5px;
  }
  .addElectronic-conter .addET-mask .addET-mask-img{
    width: 2rem;
    padding-left: 38%;
    padding-top: 1.3rem;
  }
  .addElectronic-conter .addET-mask .addET-mask-img-font{
    padding-top: 0.8rem;
  }


  /*5下面的样式*/
  @media screen and (max-width:321px){
    .addElectronic-conter .addET-mask{
      width: 8.5rem;
      height: 6rem;
      opacity: 0.6;
      margin-left: 31.5%;
    }
    .addElectronic-conter .addET-mask .addET-mask-img {
      width: 1.8rem;
      padding-left: 38%;
      padding-top: 1rem;
    }
    .addElectronic-conter .addET-mask .addET-mask-img-font{
      padding-top: 0.5rem;
   }
  }
  /*ipad下面的样式*/
  @media screen and (max-width:768px)and (min-width: 450px){
    .addElectronic-conter .addET-mask{
      width: 11.5rem;
      height: 8rem;
      opacity: 0.6;
      margin-left: 41%;
    }
    .addElectronic-conter .addET-mask .addET-mask-img {
      width: 2rem;
      padding-left: 41%;
      padding-top: 2rem;
    }
    .addElectronic-conter .addET-mask .addET-mask-img-font{
      padding-top: 1rem;
    }
  }
</style>

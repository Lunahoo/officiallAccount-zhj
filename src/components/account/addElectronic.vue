<template>
  <div class="addElectronic width bg-f6 pst-abs pos-top" @click="CSbgLogin" :class="editMoveUp" @touchmove="someFunction">
    <div class="addElectronic-conter width">
      <div class="paddET-c-p font-a39 bg-ff">
        <p class="addET-line-h bd-btm">电子发票地址</p>
        <div class="">
          <textarea ref="textVle" class="text-height width font-166 textStyle" v-model="textV" placeholder="请输入电子发票下载地址"></textarea>
        </div>
        <div class="aEmpty font-EB" @click ="aEmpty" v-show="textV">清空</div>
      </div>
      <div class="paddET-c-Remarks bg-ff font-a39">
        <p class="addET-line-h bd-btm">发票备注</p>
        <div class="pst-rlt">
          <div class="numberWord counterNum" v-show="numberWord">{{conterNum}}/50</div>
            <textarea class="text-height width font-166 textStyle" placeholder="请输入对此电子发票的备注,便于后续区分"  name="suggestions-text" id="textarea"
                      cols="30" rows="10" maxlength="50"
                      v-on:keyup="write()" v-on:compositionstart="importStart()"
                      v-on:compositionend="importEnd()" v-model="textContent"></textarea>
        </div>

      </div>
      <div class="addET-mask bg-000 cont" v-show="addMaskSuccess">
        <img class="addET-mask-img" src="../../assets/img/account/icon_Identification_success@2x.png" />
        <p class="font-col-b addET-mask-img-font">添加成功</p>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong">
          <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
        </div>
      </div>
    </div>
    <div class="addET-ipt width cont">
      <div class="addET-ipt-font bt-color height-383 font-col-b font-133" :class="addETMColor" @click="addETM">添加</div>
    </div>
  </div>
</template>
<script>
  import {addETMask1} from '@/api/user/SignOut'
  export default {
    name: 'addElectronic',
    data () {
      return {
        toke:'',
        picUrl:'',
        editMoveUp:"",      //控制页面移动样式
        timers:null,
        remark:'',
        textContent: '',
        conterNum: 0,
        chnIpt: false,
        content:"",
        error_prompt:"",
        textarea:'',
        textV:'',
        addETMColor:"op-3",
        numberWord:true,
        addMaskSuccess:false,
        pic:{

        }
      }
    },
    components: {
      /*pwd*/
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '添加电子发票';
    },
    methods: {
      someFunction(){
        document.activeElement.blur(); // ios隐藏键盘
       /* this.$refs.input.blur() // android隐藏键盘*/
      },
      CSbgLogin(){
      },
      write() {
        let self = this;
        if (self.chnIpt == false) {
          self.conterNum = self.textContent.length;
        }
      },
      //发票类别获焦事件
     /* addEtextInvoice(){
        this.editMoveUp = "editTransf";
      },
      qxaddEtextInvoice(){
        this.editMoveUp = "";
      },*/
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
      addEletimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      addETM(){
          if(this.textV == null || this.textV == undefined || this.textV == ""){
           /* this.addETMColor = "op-3";*/
            this.error_prompt="tel-message";
            this.content = "请输入电子发票地址";
          }else{
        //this.addETMask=true;
           /* this.addETMColor = "op-1";*/
        this.toke = localStorage.getItem("userID");
        this.pic.picUrl = this.textV;
        this.pic.minPicUrl = this.textV;
        this.pic.remark = this.textContent;
        this.pic.categoryId = this.$route.params.id;
        if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
          this.pic.companyId = localStorage.getItem("companyId");
        }else{
          this.pic.companyId = "";
        }
        this.pic.companyName = localStorage.getItem("companyName");
            this.$router.push({
              name:"iptInforM",
              params:{
                categName:"电子发票",
                op:"add",
                picData:this.pic,
              }
            })
            /*添加电子发票的接口 原来的暂时隐藏*/
       /* addETMask1(this.toke,this.pic).then(res => {
          if(res.data.code == 200){//成功
            this.addMaskSuccess = true;
            this.setTimer();
          }else{
            this.error_prompt="tel-message";
            this.content = "res.data.msg";
          }
        },res => {
          this.error_prompt="tel-message";
          this.content = "res.data.msg";
        })*/
       }
      },
      //写一个定时器添加成功之后跳转页面
      setTimer(){
          this.timers = setInterval(() =>{
            if(this.addMaskSuccess == true){
              this.$router.push({
                name:"fill",
                params:{
                  key:"addPhoto",
                  value:"",
                }
              })
            }
        },1000)
      },
  },
    mounted:function(){
      clearInterval(this.timers);
      this.$nextTick(function(){
        setInterval(this.addEletimer,2000);
      })
    },
    destroyed(){
      clearInterval(this.timers);
      this.timers = null;
    },
    watch:{
      textV(newValue,oldValue){
          if(this.textV!=undefined){
              if(this.textV.length>0){
                let pattern_chin1 = /[\u4e00-\u9fa5]/g;
                if(newValue.match(pattern_chin1)!=null){
                  this.textV = oldValue;
                }
                if(this.textV!=""){
                  this.addETMColor = 'op-1'
                }else{
                  this.addETMColor = 'op-3'
                }
              }else{
                this.addETMColor = 'op-3'
            }
          }else{
              this.addETMColor = 'op-3'
          }
      }
    }
  }
</script>
<style>
  .addElectronic{
    /*height:93.4%;*/
    padding-top: 1rem;
    height:98.2%;
    transition:transform .1s;
  }
  /*.editTransf{
    transform:translateY(-6.5rem);
  }*/
  /*.editTransf{
    transform:translateY(0);
  }*/
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
    margin:3rem 1.083333rem 0;
    border-radius: 4px;
  }
  .paddET-c-p .aEmpty,.paddET-c-Remarks .numberWord{
    position: absolute;
    bottom: 0.5rem;
    right: 1rem;
    font-size: 1.1666666667rem;
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
  @media screen and (max-width:321px) {
    .addElectronic {
      height: 97.8%;
    }
  }
  /*ipad下面的样式*/
  @media screen and (max-width:768px)and (min-width: 450px) {
    .addElectronic {
      height: 97.5%;
    }
  }
</style>

<template>
  <div class="invoiceTT width height bg-f6">
    <div class="invoiceTT_add bg-f6 pos-left width" style="position: absolute;height: 6%;">
      <div class=" four_wrap bg-ff " @click="toAddInvoiceTT">
        <p class="fl font-F89 marginL">+</p>
        <div class="fl font-F89 font-133">新增发票抬头</div>
      </div>
    </div>
    <div class="invoiceTT_save width" style="height: 94%;position: relative;" v-if="listdata.length>0">
      <div class="container" >
        <ul>
            <!--listdata-->
          <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData" :class="scrollSet" style="height:95%;">
          <li class="list-item" v-for="(item,index) in listdata" :key="index" :class="listdata.length-index==1&&downdata.length<1?'':'bd-btm'"  data-type="0">
            <div class="list-box bg-ff" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip(index,item.isIncrement,'listdata')" >
              <div class="invoiceTT_save_wrap margin_l height" >

                <!--修改-->
                <section class="width overflow-h">
                <div class="div_2 fl titleW2 font-133" @click.stop="choiceRise(index)">{{item.invoiceTopName}}</div>
                <div class="cont pst-abs editIMG" @click.stop="toModify(item.id)"><img src="../../assets/img/aloneC/icon_edit@2x.png" class="dis_inb"></div>
                </section>
                <div class="font-ipt width overflow-h">
                <div class="fl default cont" v-if="item.isDefault==1 || item.isDefault=='1' || index== listdata.length">默认</div>
                <div class="fl general cont font-F89" >普</div>
                <div class="fl general cont font-F89" v-if="item.isIncrement==1">专</div>
                </div>
                <div class="duty_paragraph font-ipt font-12" v-if="item.configType==1">[企业]&nbsp;{{item.orgTaxNo}}</div>
                <div class="duty_paragraph font-ipt font-12" v-if="item.configType==2">[个人/非企业]</div>
                <!--修改完-->

              </div>
            </div>
            <div class="delete height" @click="deleteItem(item.id)" :data-index="index">删除</div>
          </li>
            <!--downdata-->
            <li class="list-item" v-for="(item,index) in downdata" :key="index" :class="downdata.length-index==1?'':'bd-btm'" data-type="0">

              <div class="list-box bg-ff" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip(index,item.isIncrement,'downdata')">
                <div class="invoiceTT_save_wrap margin_l height" >
                  <!--修改-->
                  <section class="width overflow-h">
                    <div class="div_2 fl titleW2 font-133" @click.stop="choiceRise(index)">{{item.invoiceTopName}}</div>
                    <div class="cont pst-abs editIMG" @click.stop="toModify(item.id)"><img src="../../assets/img/aloneC/icon_edit@2x.png" class="dis_inb"></div>
                  </section>
                  <div class="font-ipt width overflow-h">
                    <div class="fl default cont" v-if="item.isDefault==1 || item.isDefault=='1' || index== listdata.length">默认</div>
                    <div class="fl general cont font-F89" >普</div>
                    <div class="fl general cont font-F89" v-if="item.isIncrement==1">专</div>
                  </div>
                  <div class="duty_paragraph font-ipt font-12" v-if="item.configType==1">[企业]&nbsp;{{item.orgTaxNo}}</div>
                  <div class="duty_paragraph font-ipt font-12" v-if="item.configType==2">[个人/非企业]</div>
                  <!--修改完-->

                </div>
              </div>
              <div class="delete height" @click="deleteItem(item.id)" :data-index="index">删除</div>
            </li>
          </v-scroll>
        </ul>
      </div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import loadmore from "../index/nav/voucher/scroll.vue";/*上拉下拉*/
  import {queryMemberInvoiceConfigPage,delMemberInvoiceConfig} from "@/api/aloneC/cInterface"
  export default{
      data(){
        return{
          typeP:'',
          scrollYX:false,
          BillCont:'',//传递的数据
          content:"",
          error_prompt:"",
          allDataLength:'',
          scrollSet:"overX",
          listdata:[],   //初展示列表
          downdata:[],   //加载更多列表
          allData:{},   //全部列表
          formSource:"",
          num:6,    //一次显示多少条
          counter : 1,
          pageStart : 0, // 开始页数
          pageEnd : 0, // 结束页数
          ttList:[],
          startX : 0 ,
          endX : 0 ,
          ttListInfo:{},
          scrollData:{
            noFlag: false //暂无更多数据显示
          },
        }
      },
    components: {
      'v-scroll': loadmore
    },
      created(){
        //获取发票列表
        this.getinvoiceList();
        //判断缓存；
        let formSour = localStorage.getItem('formSouS');
        if(formSour!=''&&formSour!=null&&formSour!=undefined&&formSour!='undefined'){
          this.formSource = formSour;
        }
        //根据
        if(this.$route.params.type!=""&&this.$route.params.type!=null&&this.$route.params.type!=undefined){//从预开票页面过来的
          this.typeP = this.$route.params.type;
          localStorage.setItem('typeP', this.typeP);
        }else if(localStorage.getItem('typeP') != undefined && localStorage.getItem('typeP') != "" && localStorage.getItem('typeP') != null&& localStorage.getItem('typeP') != 'undefined' && localStorage.getItem('typeP') != 'null'){
          this.typeP = localStorage.getItem('typeP');
        }
        if(this.$route.params.aa == true){
          if(this.$route.params.formSource!=""&&this.$route.params.formSource!=null&&this.$route.params.formSource!=undefined &&this.$route.params.formSource!='null'&&this.$route.params.formSource!='undefined'){  //从后开票页面过来的
            this.formSource = this.$route.params.formSource;

          }else {
            if (localStorage.getItem('formSource') != undefined && localStorage.getItem('formSource') != "" && localStorage.getItem('formSource') != null
              && localStorage.getItem('formSource') != 'undefined' && localStorage.getItem('formSource') != 'null') {
              this.formSource = localStorage.getItem('formSource');
            }
          }
        }else {
          if(this.$route.params.drawABill!=""&&this.$route.params.drawABill!=null&&this.$route.params.drawABill!=undefined){//从预开票页面过来的
            this.formSource = this.$route.params.drawABill;
      //      localStorage.setItem('formSource', this.formSource);
          }else if(localStorage.getItem('formSource') != undefined && localStorage.getItem('formSource') != "" && localStorage.getItem('formSource') != null&& localStorage.getItem('formSource') != 'undefined' && localStorage.getItem('formSource') != 'null'){
            this.formSource = localStorage.getItem('formSource');
          }
        }

   //     localStorage.setItem('formSource', this.formSource);
      },
      methods:{
        //获取发票列表
        getinvoiceList(){
          this.ttListInfo.page = 1;
          this.ttListInfo.limit = 6;
          queryMemberInvoiceConfigPage(localStorage.getItem("userID"),this.ttListInfo).then(res=>{
            if(res.data.code==200){
              this.allData = res.data.data.records;
              this.listdata = this.allData.slice(0,this.num);
              this.allDataLength = res.data.data.records.length;
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        },
        //跳转
        skip(key,isIncrement,dataName){
//          if( this.checkSlide() ){
//         //   this.restSlide();
//          }else {
              //this.formSource = localStorage.getItem('formSource');
          if(dataName=='listdata'){ //listdata
            this.BillCont = JSON.stringify(this.listdata[key]);
          }else if(dataName=='downdata'){
            this.BillCont = JSON.stringify(this.downdata[key]);
          }
          //console.info(this.BillCont);
          if(this.typeP == '专票' && this.formSource !=''){//如果是专票，没有专票属性的抬头不可选
            if(isIncrement == 1 || isIncrement == '1'){
                if(this.formSource == "lastDrawABill"){
                  this.$router.push({
                    name: "lastDrawABill",
                    params: {
                      backKey:"invoiceTT",
                      ttList:this.BillCont
                    }
                  });
                }else if(this.formSource == "drawABill"){
                  //this.BillCont = JSON.stringify(this.BillCont);
                  this.$router.push({
                    name: "drawABill",
                    params: {
                      ttList: this.BillCont,
                      ttName: this.BillCont.invoiceTopName,//发票抬头公司名称
                      zInvoice: this.BillCont.isIncrement, //是否支持专票
                      configType: this.BillCont.configType,//个人还是企业
                      orgTaxNo: this.BillCont.orgTaxNo,//个人还是企业
                      ChoiceIpt: false
                    }
                  });
                }
            }else{
              this.error_prompt="tel-message";
              this.content = '该抬头不可用于专票，请完善抬头信息';
            }
          }else if(this.typeP == '普票' && this.formSource !=''){   //如果是普票
            if(this.formSource == "lastDrawABill"){
              this.$router.push({
                name: "lastDrawABill",
                params: {
                  backKey:"invoiceTT",
                  ttList:this.BillCont
                }
              });
            }else if(this.formSource == "drawABill"){
              //this.BillCont = JSON.parse(this.BillCont);
              this.$router.push({
                name: "drawABill",
                params: {
                  ttList: this.BillCont,
                  ttName: this.BillCont.invoiceTopName,//发票抬头公司名称
                  zInvoice: this.BillCont.isIncrement, //是否支持专票
                  configType: this.BillCont.configType,//个人还是企业
                  orgTaxNo: this.BillCont.orgTaxNo,//个人还是企业
                  ChoiceIpt: false
                }
              });
            }
          }

        //  }
        },
        //滑动开始
        touchStart(e){
          // 记录初始位置
          this.startX = e.touches[0].clientX;
        },
        //滑动结束
        touchEnd(e){
          // 当前滑动的父级元素
          let parentElement = e.currentTarget.parentElement;
          // 记录结束位置
          this.endX = e.changedTouches[0].clientX;
          // 左滑
          if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){ //
            this.scrollSet="overXH";
            this.restSlide();
            parentElement.dataset.type = 1;
          }
          // 右滑
          if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
            this.scrollSet="overXH";
            this.restSlide();
            parentElement.dataset.type = 0;
         //   this.scrollYX=true;
          }
          this.startX = 0;
          this.endX = 0;
        },
        //判断当前是否有滑块处于滑动状态
        checkSlide(){
          let listItems = document.querySelectorAll('.list-item');
          for( let i = 0 ; i < listItems.length ; i++){
            if( listItems[i].dataset.type == 1 ) {
              return true;
            }
          }
          return false;
        },
        //复位滑动状态
        restSlide(){
          let listItems = document.querySelectorAll('.list-item');
          // 复位
          for( let i = 0 ; i < listItems.length ; i++){
            listItems[i].dataset.type = 0;
          }
          this.scrollSet="overX";
        },
        //加载更多
        onLoadMore(done){
            this.scrollSet="overX";
            this.counter++;
            let end = this.pageEnd = this.num * this.counter;
            let i = this.pageStart = this.pageEnd - this.num;
            let allData = this.allData;   //.data
            setTimeout(() => {
              for(i; i < end; i++) {
                if(i >= allData.length) {
                  //走完数据调用方法
                  this.scrollData.noFlag = true;
                  break;
                } else {
                  this.downdata.push(allData[i]);
                  // more.style.display = 'none'; //隐藏加载条
                }
              }
              done();
            }, 500);
        },
        //删除
        deleteItem(id){
          delMemberInvoiceConfig(localStorage.getItem("userID"),id).then(res=>{
              if(res.data.code==200){
                window.location.reload();
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })

//          // 当前索引
//          let index = e.currentTarget.dataset.index;
//          // 复位
//          this.restSlide();
//          // 删除
//          this.list.splice(index,1);
        },
        invoiceTTtimer:function(){
          if(this.error_prompt=="tel-message"){
            this.error_prompt="trans";
          }
        },
        toAddInvoiceTT(){
          this.$router.push({
            name:"addInvoiceTT",
            params:{
              dataLength:this.allDataLength,
              formSource:this.formSource,
            }
          });
        },
        toModify(id){
          this.$router.push({
            name:"addInvoiceTT",
            params:{
              type:"modify",
              id:id,
              dataLength:this.allDataLength,
            }
          })
        },
        choiceRise(key){/*预开票设置进来点击选择某一个抬头再返回去*/
//          if(this.formSource!='undefined' && this.formSource!=undefined){
//            //this.formSource = localStorage.getItem('formSource');
//            if (this.formSource == "lastDrawABill") {
//              this.BillCont = JSON.stringify(this.listdata[key]);
//              this.$router.push({
//                name: "lastDrawABill",
//                params: {
//                  backKey:"invoiceTT",
//                  ttList:this.BillCont
//                }
//              });
//            }else if(this.formSource == "drawABill"){
//              this.BillCont = this.listdata[key]
//              if(this.typeP == '专票'){
//                if(this.BillCont.isIncrement == 1 || this.BillCont.isIncrement == '1'){
//                  this.$router.push({
//                    name: "drawABill",
//                    params: {
//                      ttName: this.BillCont.invoiceTopName,//发票抬头公司名称
//                      zInvoice: this.BillCont.isIncrement, //是否支持专票
//                      configType: this.BillCont.configType,//个人还是企业
//                      orgTaxNo: this.BillCont.orgTaxNo,//个人还是企业
//                      ChoiceIpt: false
//                    }
//                  });
//                }else {
//                  this.error_prompt="tel-message";
//                  this.content = '该抬头不可用于专票，请完善抬头信息';
//                }
//              }else {
//                this.$router.push({
//                  name: "drawABill",
//                  params: {
//                    ttName: this.BillCont.invoiceTopName,//发票抬头公司名称
//                    zInvoice: this.BillCont.isIncrement, //是否支持专票
//                    configType: this.BillCont.configType,//个人还是企业
//                    orgTaxNo: this.BillCont.orgTaxNo,//个人还是企业
//                    ChoiceIpt: false
//                  }
//                });
//              }
//
//            }
//          }
        },
      },
    updated: function () {
     // localStorage.setItem("scrollXvalue",this.scrollSet);
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.invoiceTTtimer,2000);
      })
    },
    beforeRouteEnter(to,from,next){
      if(from.path=='/drawABill' || from.path=='/lastDrawABill'){
        let formSource = from.path.substr(1,from.path.length);
        localStorage.setItem('formSource',formSource);
      }else{
        localStorage.setItem('formSource','undefined');
      }
      next();
    },
    beforeRouteLeave(to, from, next) {
      if(to.path == "/addInvoiceTT") {
        to.meta.keepAlive = false;
      }
      next();
    },
  }
</script>
<style>
  .invoiceTT{
    overflow-x:hidden;
  }
  .invoiceTT .overX{
    padding-top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: 0;
    top:5.9rem;
  }
  .invoiceTT .overXH{
    overflow-x: auto;
  }
  .invoiceTT .marginL{
    margin-left:1.083333rem;
  }
  .invoiceTT .invoiceTT_add{
    padding:1rem 0;
    top:0;
    z-index:666;
  }
  .invoiceTT .invoiceTT_add div{
    line-height:3.7rem;
  }
  .invoiceTT .invoiceTT_add p{
    font-size:1.7rem;
    line-height:3.5rem;
  }
  .invoiceTT .invoiceTT_save .invoiceTT_save_wrap{
    padding-top:0.4rem;
    padding-bottom:1.5rem;
  }
  .invoiceTT .invoiceTT_save .invoiceTT_save_wrap .default{ /*默认*/
    border:solid 1px #3B92EF;
    width:2.3333rem;
    height:1.16666rem;
    line-height:1.16666rem;
    color:#3B92EF;
    border-radius:4px;
    background:rgb(226,239,253);
    margin:0.3rem;
  }
  .invoiceTT .invoiceTT_save .general{ /*普、专*/
    border:solid 1px #F89114;
    width:1.5rem;
    height:1.16666rem;
    border-radius:4px;
    line-height:1.16666rem;
    background:rgb(255,240,222);
    margin:0.3rem;
  }
  .invoiceTT .invoiceTT_save .margin_l{
    margin-left:1.0833333rem;
  }
  .invoiceTT .invoiceTT_save section{
    /*padding-top:1rem;*/
    padding-bottom:0.5rem;
  }
  .invoiceTT .invoiceTT_save section img{
    width:1.3rem;
    vertical-align: middle;
  }
  .invoiceTT .invoiceTT_save .editIMG{
    width:4.5rem;
    height:4.5rem;
    top: -0.1rem;
    line-height:4.5rem;
    right:0rem;
    z-index:777;
  }
  .invoiceTT .invoiceTT_save section .titleW2{
    width: 88%;
    padding-top: 0.5rem;
  }
  .invoiceTT .invoiceTT_save section .div_3{
    margin-right:1.5rem;
    margin-top:0.3rem;
  }
  .invoiceTT .invoiceTT_save .duty_paragraph{
    margin-top:0.3rem;
  }
  /*删除按钮样式*/
  .invoiceTT .invoiceTT_save .list-item{
    position: relative;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .invoiceTT .invoiceTT_save .list-item[data-type="0"]{
    transform: translate3d(0,0,0);
  }
  .invoiceTT .invoiceTT_save .list-item[data-type="1"]{     /*********************************************/
    /*transform: translate3d(-4rem,0,0);*/
    transform: translateX(-4rem);
  }
  .invoiceTT .invoiceTT_save .list-item:after{
    content: " ";
    position: absolute;
    left: 0.2rem;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  .invoiceTT .invoiceTT_save .list-item .delete{
    width: 4rem;
    display:flex;
    justify-content:center;
    align-items:center;
    background: #ff4949;
    font-size: 17px;
    color: #fff;
    text-align: center;
    position: absolute;
    top:0;
    right: -4rem;
  }
  .invoiceTT .invoiceTT_save .list-item:after{
    border-bottom: none;
  }
  @media screen and (max-width:321px){
    #setPwd_format{
      width:68%;
    }
    .invoiceTT .overX{
      /*top: 5.5rem;*/
    }
  }

</style>

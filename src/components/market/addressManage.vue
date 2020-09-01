<template>
  <div class="addressManage width height bg-f6" >
    <div class="invoiceTT_add bg-f6 pos-left width" style="position: absolute;height: 6%;">
      <div class=" four_wrap bg-ff " @click="toAddAddress('新增')">
        <p class="fl font-F89 marginL">+</p>
        <div class="fl font-F89 font-133">新增邮寄地址</div>
      </div>
    </div>
    <!--<div class="invoiceTT_add width four_wrap bg-ff" @click="toAddAddress()">-->
      <!--<p class="fl font-F89 marginL">+</p>-->
      <!--<div class="fl font-F89 font-133">新增邮寄地址</div>-->
    <!--</div>-->
    <div class="invoiceTT_save width" style="height: 94%;position: relative;">
    <div class="container">
    <ul>
      <!--listdata-->
      <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData" :class="scrollSet" style="height:95%;">
      <li class="list-item" v-for="(item,index) in listdata" :key="index" :class="listdata.length-index==1&&downdata.length<1?'':'bd-btm'" data-type="0">
        <div class="list-box bg-ff" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip(index)" >

          <div class="addressDetails width bg-ff" >
            <div class="invoiceTT_save_wrap margin_l height " >
              <div class="name font-133">{{item.shippingName}}<span class="font-ipt dis_inb font-12">{{item.shippingMobile}}</span></div>
              <section class="width">
                <div class="div_1 fl cont" v-if="item.isDefault == 1 ||item.isDefault == '1'">默认</div>
                <div class="div_2 fl font-12 titleW1 ellipsis_name">{{item.provinceCode}} {{item.cityName}} {{item.areaName}} {{item.address}}</div>
                <div class="div_3 fr" @click.stop="toAddAddress('修改',item.id)"><img src="../../assets/image/c/icon_edit@2x.png"></div>
              </section>
            </div>
          </div>
        </div>
        <div class="delete height" @click="deleteItem(item.id)" :data-index="index">删除</div>
      </li>
        <!--downdata-->
        <li class="list-item" v-for="(item,index) in downdata" :key="index" :class="downdata.length-index==1?'':'bd-btm'" data-type="0">
          <div class="list-box bg-ff" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip(index)" >
            <div class="addressDetails width bg-ff" >
              <div class="invoiceTT_save_wrap margin_l height " >
                <div class="name font-ipt font-12">{{item.shippingName}}<span class="dis_inb">{{item.shippingMobile}}</span></div>
                <section class="width">
                  <div class="div_1 fl cont" v-if="item.isDefault == 1 ||item.isDefault == '1'">默认</div>
                  <div class="div_2 fl font-133 titleW1 ellipsis_name">{{item.provinceCode}} {{item.cityName}} {{item.areaName}} {{item.address}}</div>
                  <div class="div_3 fr" @click.stop="toAddAddress('修改',item.id)"><img src="../../assets/image/c/icon_edit@2x.png"></div>
                </section>
              </div>
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
  import {queryShippingAddressPage,delShippingAddress} from '@/api/aloneC/cInterface';/*通过id查询员工收获地址信息,删除地址*/
  export default{
      data(){
          return{
            startX : 0 ,
            endX : 0 ,
            content:"",
            error_prompt:"",
            scrollSet:"overX",
            addressList:[],
            drawCont:[],/*传的数据*/
            listdata:[],   //初展示列表
            downdata:[],   //加载更多列表
            allData:{},   //全部列表
            num:7,    //一次显示多少条
            counter : 1,
            pageStart : 0, // 开始页数
            pageEnd : 0, // 结束页数
            formSource:"",
            scrollData:{
              noFlag: false //暂无更多数据显示
            },

          }
      },
    components: {
      'v-scroll': loadmore
    },
    methods:{
      addressManageTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      init(){
        if(this.$route.params.aa == true){
          if(this.$route.params.formSource!=""&&this.$route.params.formSource!=null&&this.$route.params.formSource!=undefined &&this.$route.params.formSource!='null'&&this.$route.params.formSource!='undefined'){  //从后开票页面过来的
            this.formSource = this.$route.params.formSource;
            localStorage.setItem('formSource', this.formSource);
          }else {
            if (localStorage.getItem('formSource') != undefined && localStorage.getItem('formSource') != "" && localStorage.getItem('formSource') != null
              && localStorage.getItem('formSource') != 'undefined' && localStorage.getItem('formSource') != 'null') {
              this.formSource = localStorage.getItem('formSource');
            }
          }
        }else {
          if(this.$route.params.drawABill!=""&&this.$route.params.drawABill!=null&&this.$route.params.drawABill!=undefined){//从预开票页面过来的
            this.formSource = this.$route.params.drawABill;
            localStorage.setItem('formSource', this.formSource);
          }else if(localStorage.getItem('formSource') != undefined && localStorage.getItem('formSource') != "" && localStorage.getItem('formSource') != null&& localStorage.getItem('formSource') != 'undefined' && localStorage.getItem('formSource') != 'null'){
            this.formSource = localStorage.getItem('formSource');
          }
        }

        this.accessToken = localStorage.getItem("userID");
        queryShippingAddressPage(this.accessToken).then(res =>{
          if(res.data.code == 200){
            this.allData = res.data.data.records;
            this.listdata = this.allData.slice(0,this.num);
          }else{
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        })
      },
      //删除地址
      deleteItem(id){
        delShippingAddress(localStorage.getItem("userID"),id).then(res=>{
          if(res.data.code==200){
            this.restSlide();
            this.init();
          }else{
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        })
      },
      //跳转
      skip(key){
          //console.log(11111)
        if( this.checkSlide() ){
          this.restSlide();
        }else{
            //跳转到订单页面
          let formSource = localStorage.getItem('formSource');
          if(formSource!=''&&formSource!=null&&formSource!=undefined&&formSource!='undefined'&&formSource!='null'){
            this.formSource=formSource;
          }
          /*if(localStorage.getItem('formSource')!='undefined') {*/
            //this.formSource = localStorage.getItem('formSource');
            if(this.formSource=="lastDrawABill"){  //后开票设置页面跳转来的
              this.formSource= '';
              this.drawCont = JSON.stringify(this.allData[key]);
              this.$router.push({
                name:"lastDrawABill",
                params: {
                  backKey:"addressManage",
                  addressLists:this.drawCont
                }
              });
            }else if(this.formSource=="drawABill"){ //预开票设置页面跳转来的
              this.formSource= '';
              this.drawCont = this.allData[key];
              this.$router.push({
                name:"drawABill",
                params:{
                  drawCont:this.drawCont,//传递的数据
                  addressM:false,//地址来源
                  addName:this.drawCont.shippingName,/*姓名*/
                  addTel:this.drawCont.shippingMobile,/*手机号*/
                  addressDz:this.drawCont.provinceCode+ ' ' + this.drawCont.cityName+ ' ' + this.drawCont.areaName+ ' ' + this.drawCont.address,/*地址*/
                }
              });
            }
        }
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
        if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
          this.scrollSet="overXH";
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        // 右滑
        if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
          this.scrollSet="overXH";
          this.restSlide();
          parentElement.dataset.type = 0;
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
      toAddAddress(addressType,val){
          if(addressType=="修改"){
            this.$router.push({
              name:"addAddress",
              params:{
                type:"modify",
                key:val,
                formSource:this.formSource
              }
            })
          }else {
            this.$router.push({name:"addAddress"})
          }
          /*if(key=="新增"){
            this.$router.push({name:"addAddress"})
          }else{
            this.$router.push({
              name:"addAddress",
              params:{
                type:"modify",
              }
            })
          }*/
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
    },
    beforeRouteLeave(to, from, next) {
      if(to.path == "/addAddress") {
        to.meta.keepAlive = false;
//        this.reload();
      }
      next();
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.addressManageTimer,2000);
      })
    },
    created(){
      this.init();
     /* if(this.$route.params.formSource!=""&&this.$route.params.formSource!=null&&this.$route.params.formSource!=undefined){
        this.formSource = "lastDrawABill";
      }*/
    },
    beforeRouteEnter(to,from,next){
      if(from.path=='/drawABill' || from.path=='/lastDrawABill'){
        let formSource = from.path.substr(1,from.path.length);
        localStorage.setItem('formSource',formSource);
      }
      next();
    },
  }
</script>
<style>
  .addressManage{
    /*padding-top: 1px;*/
    overflow-x: hidden
  }
  .addressManage .overX{
    overflow-x: hidden;
    padding-top: 0;
    overflow-y: scroll;
    margin-top: 0;
    top:5.9rem;
  }
  .addressManage .overXH{
    overflow-x: auto;
  }
  .addressManage .marginL{
    margin-left:1.083333rem;
  }
  .addressManage .invoiceTT_add{
    padding:1rem 0;
    top:0;
    z-index:666;
  }
  .addressManage .invoiceTT_add div{
    line-height:3.7rem;
  }
  .addressManage .invoiceTT_add p{
    font-size:1.7rem;
    line-height:3.5rem;
  }
  .addressManage .addressDetails .invoiceTT_save_wrap{
    height:4.316666rem;
    padding:1.3rem 0;
  }
  .addressManage .addressDetails .invoiceTT_save_wrap .titleW1{
    width: 65%;
    margin-top: 0.4rem;
  }
  .addressManage .addressDetails .invoiceTT_save_wrap .titleW2{
    width: 88%;
  }
  .addressManage .addressDetails .invoiceTT_save_wrap .name span{
    margin-left:0.5rem;
  }
  .addressManage .addressDetails .margin_l{
    margin-left:1.0833333rem;
  }
  .addressManage .addressDetails section{
    height:2rem;
    margin-top:0.6rem;
  }
  .addressManage .addressDetails section img{
    width:1.3rem;
  }
  .addressManage .addressDetails section .div_1{
    border:solid 1px #3B92EF;
    width:2.3333rem;
    height:1.16666rem;
    line-height:1.16666rem;
    color:#3B92EF;
    margin-top: 0.5rem;
    border-radius:4px;
    background:rgb(226,239,253);
    margin-right:0.3rem;
  }
  .addressManage .addressDetails section .div_3{
    margin-right:1.5rem;
    margin-top:0.3rem;
  }
  /*删除按钮样式*/
  .addressManage .list-item{
    position: relative;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .addressManage  .list-item[data-type="0"]{
    transform: translate3d(0,0,0);
  }
  .addressManage  .list-item[data-type="1"]{     /*********************************************/
    /*transform: translate3d(-4rem,0,0);*/
    transform: translateX(-4rem);
  }
  .addressManage  .list-item:after{
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
  .addressManage  .list-item .delete{
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
  .addressManage .list-item:after{
    border-bottom: none;
  }
</style>

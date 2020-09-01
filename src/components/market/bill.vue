<template>
  <div class="bill width height bg-f6">
    <div class="bill_operation bg-ff font-12 width pst-abs pos-top" :class="dynamicHeight" v-if="allData.length>0">
      <div class="threeJ fl mG-lft183" @click="screenOut">筛选</div>
      <div class="threeJ fl mG-lft183" style="width:35%;">
        <div>
          <!--<input :type="sb" placeholder="月筛选" v-model="monthChoose" id="MonthC" ref="changeType" @focus="monthFocus" @blur="monthBlur" >-->
          <div class="block">
            <el-date-picker
              v-model="value4"  @blur="chooseMonth"
              type="month"  :picker-options="pickerBeginDateBefore"
              placeholder="月筛选">
            </el-date-picker>
          </div>

        </div>
      </div>
      <div class="fr font-3b9 mG-rit183 cont-r bd-left toOpenIn" @click="toOpenInvoice">我要开票</div>
    </div>
    <div v-if="listShow!=true" class="UCO_empty width height bg-ff fl">
      <div class="cont"><img src="../../assets/img/aloneC/img_empty_state_bill@2x.png" class="dis_inb"></div>
      <div class="font-ipt font-1 cont">没有一丝痕迹，空空如也～</div>
      <div class="UCO_go cont width"><div class="dis_inb cont font-F89 font-1" @click="allDataShow">显示全部列表</div></div>
    </div>
    <div v-if="bill_kong" class="UCO_empty width height bg-ff">
      <div class="cont"><img src="../../assets/img/aloneC/img_empty_state_bill@2x.png" class="dis_inb"></div>
      <div class="font-ipt font-1 cont">没有一丝痕迹，空空如也～</div>
      <div class="UCO_go cont width"><div class="dis_inb cont font-F89 font-1" @click="toCouponMarket">去券市场</div></div>
    </div>
    <div v-else="bill_kong">
    <div class="bill_container bg-f6">
    <div class="bill_list" v-if="listShow">
      <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData">
        <!--listdata mG-lft183-->
      <section class="bg-ff width " v-for="(item,index) in listdata" :key="index" @click="toBillDetails">
        <div class="list_left fl " >
          <!--<img :src="item.iconUrl">-->
          <img src="../../assets/img/aloneC/icon_purchase@2x.png" v-if="item.orderVo.subType==1">
          <img src="../../assets/img/aloneC/icon_consumption@2x.png" v-if="item.orderVo.subType==2">
          <img src="../../assets/img/aloneC/icon_cash withdrawal@2x.png" v-if="item.orderVo.subType==3">
          <img src="../../assets/img/aloneC/icon_transfer_the_possession_of@2x.png" v-if="item.orderVo.subType==4">
          <img src="../../assets/img/aloneC/icon_return ticket@2x.png" v-if="item.orderVo.subType==5">
          <img src="../../assets/img/aloneC/icon_bill_recharge@2x.png" v-if="item.orderVo.subType==6">
          <img src="../../assets/img/aloneC/icon_freight@2x.png" v-if="item.orderVo.subType==7">
          <img src="../../assets/img/aloneC/icon_return_to_cash@2x.png" v-if="item.orderVo.subType==8">
        </div>
        <div class="list_right fr bg-ff" :class="listdata.length-index==1&&downdata.length<1?'':'bd-btm'">
          <div class="list_name overflow-h">
            <p class="fl font-133" v-if="item.orderVo.subType==1">购买-{{item.paymentItemName}}</p>
            <p class="fl font-133" v-if="item.orderVo.subType==2">消费</p><!---{{item.paymentIndustryName}} -->
            <p class="fl font-133" v-if="item.orderVo.subType==3">提现</p>
            <p class="fl font-133" v-if="item.orderVo.subType==4">转让</p><!-- -{{item.paymentItemName}} -->
            <p class="fl font-133" v-if="item.orderVo.subType==5">返券</p>
            <p class="fl font-133" v-if="item.orderVo.subType==6">充值</p><!-- -{{item.paymentItemName}} -->
            <p class="fl font-133" v-if="item.orderVo.subType==7">发票快递费</p>
            <p class="fl font-133" v-if="item.orderVo.subType==8">返现</p>
            <p class="fr font-s15" :class="item.orderVo.subType==6||item.orderVo.subType==8?'font-F89':''"><span v-if="item.orderVo.subType==6||item.orderVo.subType==8">+</span><span v-if="item.orderVo.subType==2||item.orderVo.subType==3||item.orderVo.subType==7||(item.orderVo.subType==4&&item.status==1)">-</span>{{item.paymentAmount|moneyFormat}}</p>
          </div>
          <div class="fl list_time font-108 font-a39">{{item.orderVo.createTime}}</div><!--createTime -->
          <div class="fr list_time font-108 font-a39 " v-if="item.orderVo.subType==4&&item.status==1">转让成功</div>
          <div class="fr list_time font-108 font-a39 " v-if="item.orderVo.subType==4&&item.status==2">转让中</div>
          <div class="fr list_time font-108 font-a39 " v-if="item.orderVo.subType==4&&item.status==0">已撤销</div>
        </div>
      </section>
        <!--downdata mG-lft183-->
        <section class="bg-ff" v-for="(item,index) in downdata" :key="index" @click="toBillDetails">
          <div class="list_left fl ">
            <!--<img :src="item.iconUrl">-->
            <img src="../../assets/img/aloneC/icon_purchase@2x.png" v-if="item.orderVo.subType==1">
            <img src="../../assets/img/aloneC/icon_consumption@2x.png" v-if="item.orderVo.subType==2">
            <img src="../../assets/img/aloneC/icon_cash withdrawal@2x.png" v-if="item.orderVo.subType==3">
            <img src="../../assets/img/aloneC/icon_transfer_the_possession_of@2x.png" v-if="item.orderVo.subType==4">
            <img src="../../assets/img/aloneC/icon_return ticket@2x.png" v-if="item.orderVo.subType==5">
            <img src="../../assets/img/aloneC/icon_bill_recharge@2x.png" v-if="item.orderVo.subType==6">
            <img src="../../assets/img/aloneC/icon_freight@2x.png" v-if="item.orderVo.subType==7">
            <img src="../../assets/img/aloneC/icon_return_to_cash@2x.png" v-if="item.orderVo.subType==8">
          </div>
          <div class="list_right fr" :class="downdata.length-index==1?'':'bd-btm'">
            <div class="list_name overflow-h">
              <p class="fl font-133" v-if="item.orderVo.subType==1">购买-{{item.paymentItemName}}</p>
              <p class="fl font-133" v-if="item.orderVo.subType==2">消费</p><!---{{item.paymentIndustryName}} -->
              <p class="fl font-133" v-if="item.orderVo.subType==3">提现</p>
              <p class="fl font-133" v-if="item.orderVo.subType==4">转让</p><!-- -{{item.paymentItemName}} -->
              <p class="fl font-133" v-if="item.orderVo.subType==5">返券</p>
              <p class="fl font-133" v-if="item.orderVo.subType==6">充值</p><!-- -{{item.paymentItemName}} -->
              <p class="fl font-133" v-if="item.orderVo.subType==7">发票快递费</p>
              <p class="fl font-133" v-if="item.orderVo.subType==8">返现</p>
              <p class="fr font-s15" :class="item.orderVo.subType==6||item.orderVo.subType==8?'font-F89':''"><span v-if="item.orderVo.subType==6||item.orderVo.subType==8">+</span><span v-if="item.orderVo.subType==2||item.orderVo.subType==3||item.orderVo.subType==7||(item.orderVo.subType==4&&item.status==1)">-</span>{{item.paymentAmount|moneyFormat}}</p>
            </div>
            <div class="fl list_time font-108 font-a39">{{item.orderVo.createTime}}</div><!--createTime -->
            <div class="fr list_time font-108 font-a39 " v-if="item.orderVo.subType==4&&item.status==1">转让成功</div>
            <div class="fr list_time font-108 font-a39 " v-if="item.orderVo.subType==4&&item.status==2">转让中</div>
            <div class="fr list_time font-108 font-a39 " v-if="item.orderVo.subType==4&&item.status==0">已撤销</div>
          </div>
        </section>
      </v-scroll>
    </div>

    <!--头部状态点击连接-->
    <div class="zz fill-tiyle-mask" v-show="statuScreen">
      <div class="fl width bg-ff bd-topf6" style="overflow-y: scroll;height: 32rem;position: relative;">
        <div class="fl fill-mask-margin invoiceStatue_check" >
          <div class="classification font-12">分类筛选</div>
          <section v-for="(item,index) in billType" :key="index"  @click="chooseBillType(index,item.type)">
            <div v-if="item.selected" :class="statusChecked"> {{item.name}}</div>
            <div v-else="item.selected" :class="statusValue"> {{item.name}}</div>
          </section>
        </div>
        <div class="bill_limitMoney fl" style="margin-top:6.5rem">
          <p class="font-12 pd083">金额</p>
          <div class="bill_limitM_input pd083 mG-top">
            <div class="limitM_input_minM fl font-12">￥<input type="number" placeholder="最低金额" v-model="minOrderAmount" @blur="minOrderAmountBlur"></div>
            <div class="acrossLine fl">——</div>
            <div class="limitM_input_minM fl font-12">￥<input type="number" placeholder="最高金额" v-model="maxOrderAmount" @blur="maxOrderAmountBlur"></div>
          </div>
        </div>
        <div class="fl fill-mask-btm width cont bd-top font-133" style="position: absolute;bottom: 0;background: #fff;">
          <div class="fl fill-mask-btm-l" @click="billReset">重置</div>
          <div class="fr bd-left font-col-b fill-mask-btm-r" @click="billSure">确认</div>
        </div>
      </div>
    </div>

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
  import {findOrderInfoByMemberId} from "@/api/aloneC/cInterface"
  export default{
      data(){
          return{
            content:"",
            error_prompt:"",
            lastSubTypes:[],
            monthChoose:'',
            sb:'month',
            dynamicHeight:'titleHeight',
            statuScreen:false,
            bill_kong:false,
            listShow:true,
            statusChecked:"mask_Popup_type_check",
            statusValue:"mask_Popup_type",
            minOrderAmount:"",
            maxOrderAmount:"",
            num:10,    //一次显示多少条
            counter : 1,
            pageStart : 0, // 开始页数
            pageEnd : 0, // 结束页数
            listdata:[],   //初展示列表
            downdata:[],   //加载更多列表
            allData:{},   //全部列表
            value4: '',
            value5: '',
            scrollData:{
              noFlag: false //暂无更多数据显示
            },
            pickerBeginDateBefore: {
              disabledDate: time => {
                let _now = Date.now();
                return time.getTime() > _now;
              }
            },
            billType:[    //筛选类型
              {name:"充值",selected: false,type:'6'},
              {name:"买券",selected: false,type:'1'},{name:"消费",selected: false,type:'2'},{name:"提现",selected: false,type:'3'},{name:"返券",selected: false,type:'5'},{name:"转让",selected: false,type:'4'},{name:"返现",selected: false,type:'8'},{name:"发票快递费",selected: false,type:'7'}
            ],
            queryInfo:{
              minOrderAmount:"",   //筛选条件最小金额
              maxOrderAmount:"",  //筛选条件最大金额
              subTypes:[],  //筛选条件类别
              createTime:"",  //筛选条件创建时间
              states:["1","3","4","9","11","COMPLETED"],
              detailStates:["1","3"],
            }
          }
      },
    components: {
      'v-scroll': loadmore
    },
    directives: {//自定义指令
      focus: {//自动获焦
        inserted: function (el) {
          document.getElementById("MonthC").focus();
        }
      }
    },
    methods:{
      billTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      monthFocus(){
        //  alert(document.getElementById("MonthC").value)
        this.sb = 'month';
        this.autoFC = true;
        this.$nextTick(function () {
          document.getElementById("MonthC").focus();
        })
//        this.focus();
      //  document.getElementById("MonthC").focus();
         // this.$refs.changeType.focus();


//        if(document.getElementById("MonthC").value=='月筛选'){
//          document.getElementById("MonthC").value='';
//        }
      //  alert(document.getElementById("MonthC").value);

      },
      monthBlur(){
       // alert(document.getElementById("MonthC").value);
        alert(document.getElementById("MonthC").value.length);
        if(document.getElementById("MonthC").value.length<1||document.getElementById("MonthC").value==''||document.getElementById("MonthC").value==null){
          this.sb = 'text';
        //  document.getElementById("MonthC").value='月筛选';
        }else{
          this.sb = 'month';
        }
      },
      //显示全部列表
      allDataShow(){
       this.value4 = '';
        this.queryInfo.createTime = "";
        this.queryInfo.minOrderAmount = '';
        this.minOrderAmount = '';
        this.queryInfo.maxOrderAmount = '';
        this.maxOrderAmount = '';
        this.queryInfo.subTypes = [];
        for(let i=0;i<this.billType.length;i++){
          this.billType[i].selected = false;
        }
       this.getBillListPub();
      },
      toOpenInvoice(){
          this.$router.push({name:"openInvoice"});
      },
      toCouponMarket(){  //去券市场
        this.$router.push({name:"couponMarket"});
      },
      billSure(){ //确认
        this.queryInfo.createTime = "";
        this.queryInfo.minOrderAmount = this.minOrderAmount;
        this.queryInfo.maxOrderAmount = this.maxOrderAmount;
        this.statuScreen = false;
        let subtypeS = this.queryInfo.subTypes;
          for(let i=0;i<this.queryInfo.subTypes.length;i++){
            if(this.lastSubTypes.indexOf(this.queryInfo.subTypes[i]) < 0){ //this.billType[i].selected == true
              let lastSubTypes_Index = this.lastSubTypes.indexOf(this.queryInfo.subTypes[i]);   //获取不存在的下标
              for(let j=0;j<this.billType.length;j++){//判断上一步选择，但是没有清空的情况
                if(this.lastSubTypes[lastSubTypes_Index] == this.billType[j].type&&this.billType[j].selected == true){
                  this.queryInfo.subTypes.push(this.lastSubTypes[lastSubTypes_Index]);
                }else{
                  this.lastSubTypes = this.queryInfo.subTypes;
                }

              }
            }
          }
        console.log(this.lastSubTypes);
        this.downdata = [];
        this.getBillListPub('筛选');
      },
      billReset(){ //重置
        this.queryInfo.createTime = "";
        for(let i=0;i<this.billType.length;i++){
          this.billType[i].selected = false;
        }
        this.minOrderAmount="";
        this.maxOrderAmount="";
        this.queryInfo.minOrderAmount = '';
        this.queryInfo.maxOrderAmount = '';
        this.queryInfo.subTypes = [];
       /* this.statuScreen = false;
        this.getBillListPub();*/
      },
      //分类筛选
      chooseBillType(index,type){
        if(this.billType[index].selected == true){
          this.billType[index].selected = false;
          for(let i=0;i<this.queryInfo.subTypes.length;i++){
              if(this.queryInfo.subTypes[i]==type){  //
                this.queryInfo.subTypes.splice(i,1);
              }
          }
        }else{
          this.billType[index].selected = true;
          this.queryInfo.subTypes.push(type);
        }
        this.lastSubTypes = this.queryInfo.subTypes;//如再次修改，请注意此处逻辑
      },
      maxOrderAmountBlur(){
       if(this.maxOrderAmount!=""||this.minOrderAmount!=""){
         if(this.maxOrderAmount<this.minOrderAmount){
           let maxAmount = this.minOrderAmount;
           let minAmount = this.maxOrderAmount;
           this.maxOrderAmount = maxAmount;
           this.minOrderAmount = minAmount;
         }
       }
      },
      chooseMonth(){ //本月
        this.value4= new Date(this.value4);
        this.value5= this.value4.getFullYear()+ '-' + (this.value4.getMonth() + 1);
        this.queryInfo.createTime = this.value5+'-'+1;
        this.getBillListPub('月选择');
      },
      //筛选返回列表
//      filterList(){
//
//      },
      onLoadMore(done){
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
      screenOut(){
          if(this.statuScreen == true){
            this.statuScreen = false;
    //        this.billReset();
          }else{
            this.statuScreen = true;
          }
      },
      toBillDetails(){
//        this.$router.push({name:"BillDetails"});   //先隐藏，这一期不做账单详情
      },
      //获取账单列表公用方法
      getBillListPub(type){
        findOrderInfoByMemberId(localStorage.getItem("userID"),this.queryInfo).then(res=>{
          if(res.data.code==200){
            if(res.data.data.length>0){
              this.bill_kong = false;
              this.listShow = true;    //列表显示
              this.allData = res.data.data;
              this.listdata = this.allData.slice(0,this.num);
            }else{
              if(type=='筛选'||type=='月选择'){
                this.bill_kong = false;   //列表
                this.listShow = false;    //列表不显示
              }else{
                this.bill_kong = true;
                this.listShow = true;
              }
            }
       //     this.billReset();
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.billTimer,2500);
      })
    },
    created(){
      //  let MonthC = document.getElementById("MonthC").value;
//      if(document.getElementById("MonthC").value==null||document.getElementById("MonthC").value==''||document.getElementById("MonthC").value==undefined||document.getElementById("MonthC").value=='null'){
//        document.getElementById("MonthC").value='月筛选';
//      }
      //修改iPhoneX下面的样式
      if(document.body.clientHeight<1000&&document.body.clientHeight>=812){
        this.dynamicHeight = 'titleHeightX';
      }else{
        this.dynamicHeight = 'titleHeight';
      }
      //获取账单列表
      this.getBillListPub();
    },
  }
</script>
<style>
  .bill .el-input__suffix-inner{
    display:none;
  }
  .bill .yo-scroll{
    padding-top:0;
    top:4.5rem;
    height:auto;
  }
  .bill .list_left{
    /*height:4.5rem;*/
    padding: 1rem 0 1rem 1.083333rem;
  }
  .bill .UCO_empty img{
    width:12.5rem;
    margin-top: 46%;
  }
  .bill .UCO_go div{
    width:8.3333rem;
    height:2.083333rem;
    line-height:2.083333rem;
    border:solid 1px #F89114;
    margin-top:1.5rem;
    border-radius: 2rem;
  }
  .bill .titleHeight{
    /*height:3.33333rem;*/
    /*left:0;*/
    /*top:0;*/
    height:7%;
  }
  .bill .titleHeightX{
    height:5.5%;
  }
  .bill .bill_operation .threeJ{
    width:13%;     /*13% */
    background:url("../../assets/img/fill/icon_Level.png") no-repeat right center;
    background-size:1.5rem;
    line-height:3.33333rem;
  }
  .bill .bill_operation .threeJ input{
    height:auto;
  }
  /*.bill .bill_operation .threeJ input[type="month"]:before{*/
    /*!*color:#b2b2b2;*!*/
    /*content:attr(placeholder);*/
  /*}*/
  /*.bill .bill_operation .threeJ input:empty:before{*/
    /*content: '月筛选';*/
    /*color: #BBB7B7;*/
  /*}*/
  /*.bill .bill_operation .threeJ input:focus:before{*/
    /*content:none;*/
  /*}*/
  /*.bill .bill_operation .threeJ input[type="month"] .full:before{*/
    /*content:""!important;*/
  /*}*/
  .bill .bill_operation .toOpenIn{
    width:21%;
    margin-top:0.7em;
  }
  .bill .bill_container{
    /*padding-top:3.1rem;*/
  }
  .bill .bill_list section{
    width:100%;
    float:left;
  }
  .bill .bill_list section img{
    width:2.5rem;
    height:2.5rem;/*
    margin-top:1.5rem;*/
  }
  .bill .bill_list section .list_right{
    width:80%;
    padding:1rem 1.0833333rem 1rem 0;
  }
  /*筛选状态样式*/
  .bill .fill-tiyle-mask{
    top: 3rem;
  }
  .bill .fill-mask-margin{
    width:94.5%;
    padding:1.333333333rem 0.8333333rem 0;
    height: 13rem;
  }
  .bill .fill-mask-btm{
    line-height:3.5rem;
  }
  .bill .fill-mask-btm-l{
    width:29%;
  }
  .bill .fill-mask-btm-r{
    width:70%;
    background: #FFA436;
  }
  .bill .fill-tiyle-mask .bg-ff .fill-mask-margin .mask_Popup_type{
    font-size: 1.1rem;
    background: #F6F6F6;
    line-height: 3.666667rem;
    width: 31%;
    height: 3.666667rem;
    margin-left: 0.8333rem;
    margin-bottom: 0.83333rem;
    text-align: center;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0.4rem;
  }
  .bill .fill-tiyle-mask .bg-ff .fill-mask-margin .mask_Popup_type_check {
    background:url("../../assets/img/Coupon/icon_label@2x.png") no-repeat 72% 48%;
    background-size: 10rem;
    color: rgb(235, 123, 3);
    font-size: 1.1rem;
    line-height: 3.666667rem;
    width: 31%;
    height: 3.666667rem;
    margin-left: 0.8333rem;
    margin-bottom: 0.83333rem;
    text-align: center;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0.4rem;
  }
  .bill .fill-tiyle-mask .bg-ff .fill-mask-margin .mask_Popup_type{
    /*margin-left:0 0.5rem !important;*/
    margin: 0.8rem 0.3rem !important;
  }
  .bill .fill-tiyle-mask .bg-ff .fill-mask-margin .mask_Popup_type_check{
    margin: 0.8rem 0.3rem !important;
  }
  /*
  .bill .fill-tiyle-mask section:first-of-type div{
    margin-left:0!important;
  }*/
  .bill .fill-mask-margin .classification{
    margin-top:0.7rem;
    margin-bottom:0.6rem;
  }
  .bill .bill_limitM_input .limitM_input_minM{
    width:12.5rem;
    height:2.75rem;
    line-height:2.75rem;
    text-indent:0.4rem;
    border:solid 1px #E5E5E5;
  }
  .bill .bill_limitM_input .acrossLine{
    width: 1.4rem;
    overflow-x: hidden;
    color:#E5E5E5;
    margin:0 1rem;
    line-height:2.75rem;
  }
  .bill .bill_limitM_input .limitM_input_minM input{
    margin-left:0.2rem;
  }
  @media screen and (max-width:321px){
    .bill .yo-scroll{
      top:3.8rem;
    }
    .bill .fill-mask-margin{
      width:93%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 178px !important;
    }
    .bill .fill-tiyle-mask .bg-ff .fill-mask-margin .mask_Popup_type{
      /*margin-left:0 0.5rem !important;*/
      margin: 0.8rem 0.29rem !important;
    }
    .bill .fill-tiyle-mask .bg-ff .fill-mask-margin .mask_Popup_type_check{
      margin: 0.8rem 0.29rem !important;
    }
    .bill .bill_limitM_input .limitM_input_minM{
      width: 10.5rem !important;
    }
  }
</style>

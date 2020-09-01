<template><!--开票历史-->
  <div class="mHistory width height bg-f6" v-if="mHistoryShow">
    <div v-if="mHis_kong" class="mHis_empty width height bg-ff">
      <div class="cont"><img src="../../assets/img/aloneC/img_empty_state_ticket@2x.png" class="dis_inb"></div>
      <div class="font-ipt font-1 cont">亲，您还没有开过票哦，空空如也～</div>
    </div>
    <div class="" v-else="mHis_kong"><!--padTop-1-->
      <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData">
        <!--listdata-->
      <div class="mHistory-list fl width bg-ff" v-for="(item, index) in listdata" :key="index">
        <div class="mHistory-main four_father fl" @click="mDetail(item.id)">
          <div class="fl font-133">{{item.typeName}}</div>
          <div class="fr font-133">￥{{item.taxIncludedPrice|moneyFormat}}</div>
          <div class="width fl font-ipt font-108">{{item.couponName}}</div>
          <div class="width fl pd-tp085 font-108 font-ipt">
            <div class="fl mHistory-time font-7b7" v-if="item.typeId==1||item.typeId==2">{{item.createdTime}}</div>
            <div class="fl mHistory-time font-7b7" v-if="item.typeId==3">{{item.applyDate}}</div>
            <div class="fr mHistory-detail font-F89" v-if="item.invoiceStatus==1&&item.typeId==3">待开票</div>
            <div class="fr mHistory-detail" v-if="item.invoiceStatus==2&&item.typeId==3">已开票</div>
            <div class="fr mHistory-detail" style="color:#3FC800" v-if="(item.typeId==1||item.typeId==2)&&(item.invoiceStatus==2)">已申请</div>  <!--v-if="item.invoiceStatus==1&&(item.typeId==1||item.typeId==2)"-->
          </div>
        </div>
      </div>
        <!--downdata-->
        <div class="mHistory-list fl width bg-ff" v-for="(item, index) in downdata" :key="index">
          <div class="mHistory-main four_father fl" @click="mDetail(item.id)">
            <div class="fl font-133">{{item.typeName}}</div>
            <div class="fr font-133">￥{{item.taxIncludedPrice|moneyFormat}}</div>
            <div class="width fl font-ipt font-108">{{item.couponName}}</div>
            <div class="width fl pd-tp085 font-108 font-ipt">
              <div class="fl mHistory-time font-7b7" v-if="item.typeId==3">{{item.applyDate}}</div>
              <div class="fl mHistory-time font-7b7" v-if="item.typeId==1||item.typeId==2">{{item.createdTime}}</div>
              <div class="fr mHistory-detail font-F89" v-if="item.invoiceStatus==1&&item.typeId==3">待开票</div>
              <div class="fr mHistory-detail" v-if="item.invoiceStatus==2&&item.typeId==3">已开票</div>
              <div class="fr mHistory-detail" style="color:#3FC800" v-if="item.typeId==1||item.typeId==2">已申请</div>
            </div>
          </div>
        </div>
      </v-scroll>
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
  import {findOpenInvoiceHistory,editPaperInvoiceState} from "@/api/aloneC/cInterface"
  export default {
    data () {
      return {
        mHistoryShow:false,
        content:"",
        error_prompt:"",
        mHis_kong:true,
        num:8,    //一次显示多少条
        counter : 1,
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        listdata:[],   //初展示列表
        downdata:[],   //加载更多列表
        allData:{},   //列表
        orderList:[],
        callbackInfo:{},
        invoiceHistoryInfo:{
          couponId:"",
          applyId:"",   //1064863874186069225
          delFlag:0,
          invoiceStatus:'2'
        },
        scrollData:{
          noFlag: false //暂无更多数据显示
        },
      }
    },
    components: {
      'v-scroll': loadmore
    },
    methods: {
      mHistoryTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      mDetail(id){
        this.$router.push({
          name:"InDetails",
          params:{
              detailsId:id
          }
        })
      },
      //加载更多
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
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.mHistoryTimer,2000);
      })
    },
    created(){
      //获取回调
      let JFurl = window.location.href;
      let theRequest = new Object();
      if (JFurl.indexOf("?") != -1) {
        let str = JFurl.substr(1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        let state = theRequest.state;
        this.callbackInfo.id = theRequest.bizid;
        this.callbackInfo.fromCode = theRequest.tid;
        if(state=="success"){
          this.callbackInfo.invoiceStatus = "2";
        }else if(state=="fail"){
          this.callbackInfo.invoiceStatus = "3";
        }
        if(state!="cancel"){
          editPaperInvoiceState(localStorage.getItem("userID"),this.callbackInfo).then(res=>{
            if(res.data.code==200){
              //获取开票历史
              findOpenInvoiceHistory(localStorage.getItem("userID"),this.invoiceHistoryInfo).then(res =>{
                if(res.data.code==200){
                  this.mHistoryShow = true;
                  if(res.data.data.length>0){
                    this.mHis_kong = false;
                    this.allData = res.data.data;
                    this.listdata = this.allData.slice(0,this.num);
                  }else{
                    this.mHis_kong = true;
                  }
                }else{
                  this.error_prompt="tel-message";
                  this.content = res.data.msg;
                }
              },res =>{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              })
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else{
          this.$router.push({name:'openInvoice'});
        }
      }else{
      //   let isPush = this.$route.LASTDtype;
      //   if(isPush!=''&&isPush!='null'&&isPush!='undefined'&&isPush!=undefined&&isPush!=null){
           //获取开票历史
           findOpenInvoiceHistory(localStorage.getItem("userID"),this.invoiceHistoryInfo).then(res =>{
             if(res.data.code==200){
               this.mHistoryShow = true;
               if(res.data.data.length>0){
                 this.mHis_kong = false;
                 this.allData = res.data.data;
                 this.listdata = this.allData.slice(0,this.num);
               }else{
                 this.mHis_kong = true;
               }
             }else{
               this.error_prompt="tel-message";
               this.content = res.data.msg;
             }
           },res =>{
             this.error_prompt="tel-message";
             this.content = res.data.msg;
           })
     //    }

      }
    },
  }
</script>
<style>
  .mHistory .mHis_empty img{
    width:12.5rem;
    margin-top: 46%;
  }
  .mHistory .yo-scroll{
    height: 99%;
  }
.mHistory-time{
  background: url("../../assets/image/c/icon_time@2x.png") no-repeat 0 50%;
  background-size: 1.083rem;
  padding-left: 1.5rem;
}
  .mHistory-detail{
    background: url("../../assets/img/right.png") no-repeat 100% 50%;
    background-size: 0.583rem;
    padding-right: 1rem;
  }
  .mHistory-main{
    padding: 0.67777rem 0;
    width: 92.5%;
  }
  .mHistory-list{
    margin-bottom: 1rem;
  }
</style>

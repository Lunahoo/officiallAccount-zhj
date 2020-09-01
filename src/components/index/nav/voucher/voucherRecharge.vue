<template>
  <div class="voucherRecharge bg-f6 width height">
    <div class="width fl" >
      <div class="voucherRecharge-top-pad fl font-col-b">
        <div class="fl voucherRecharge-m">
          <span class="voucherRecharge-m-span fl font-1">待充值额度（元）</span>
          <img @click="voucherMaskClick" class="voucherRecharge-m-img fl" src="../../../../assets/img/Coupon/icon_details_white@2x.png"/>
          <div class="" style="font-size: 2.58rem;">{{rechargeED|money}}</div>
        </div>
        <!--<div v-show="Recharge" @click="vRecharge" class="fr voucherRecharge-Recharge font-1" >一键充值</div>-->
      </div>
    </div>
     <!--券为空的时候 listdata.length<=0-->
    <div class="voucherRecKong " v-if="listdata.length<=0||listdata.length==undefined||listdata.length==null">
      <div class="wrapcenter width"><img src="../../../../assets/image/news/img_blank_page@2x.png" class="kongIMG"></div>
      <div class="width cont E7A7A font-1">暂无待充值券～</div>
    </div>
    <!-- 有券的时候 listdata.length>0-->
    <div class="fl width voucherRecharge_content" v-if="listdata.length>0">
      <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData">
         <!--listdata -->
        <div class="voucherRecharge-main pst-rlt" v-for="(item,index) in listdata" :key="item.nums">
          <div class="voucherRecharge-main-top overflow-h">
            <div class="fl font-s15">{{item.couponName}}</div>
            <div class="fr font-s25 font-fa"><span style="font-size:1.7rem">￥</span>{{item.couponAmount|money}}</div>
          </div>
          <div class="voucherRecharge-main-btm pst-rlt">
            <div class="font-ipt font-167 pst-abs startTime" >{{item.startTime}}</div>
           <!-- <img class="voucherRecharge-m-icon fr" src="../../../../assets/img/right.png" />
            <div class="fr font-7b7 font-1" @click="seeDetail(item)" >查看详情</div>-->
          </div>
          <img class="voucherRecharge-main-bg pst-abs" :src="item.industry.imageUrl"/>
        </div>
        <!-- downdata -->
        <div class="voucherRecharge-main pst-rlt" v-for="(item,index) in downdata" :key="item.nums">
          <div class="voucherRecharge-main-top overflow-h">
            <div class="fl font-s15">{{item.couponName}}</div>
            <div class="fr font-s25 font-fa"><span style="font-size:1.7rem">￥</span>{{item.couponAmount|money}}</div>
          </div>
          <div class="voucherRecharge-main-btm pst-rlt">
            <div class="font-ipt font-167 pst-abs startTime">{{item.startTime}}</div>
            <!--<img class="voucherRecharge-m-icon fr" src="../../../../assets/img/right.png" />
            <div class="fr font-7b7 font-1" @click="seeDetail(item)" >查看详情</div>-->
          </div>
          <img class="voucherRecharge-main-bg pst-abs" :src="item.imageUrl"/>
        </div>
      </v-scroll>
    </div>
    <!--错误提示框-->
    <section class="zz" v-show="vSure" id="vSure">
      <div class="wrapcenter">
        <div class="font-col-b pst-abs" style="background: #333;padding: 0.5rem 3rem;border-radius: 0.4rem;top: 35%;">充值成功</div>
      </div>
    </section>
    <!--待充值额度-->
    <section class="zz" v-show="voucherMask">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">购买的券需要一键充值到消费券账户才可消费使用</div>
          <div class="section_one" @click="voucherMask=false">知道了</div>
        </div>
      </div>
    </section>

    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" class="font-col-b" id="user_format">{{addTips}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import loadmore from "../../../index/nav/voucher/scroll.vue";/*上拉下拉*/
  import {rechargePage,rechargeAmount,rechargeMemberIdList} from '@/api/user/userLogin'
  export default {
    name: 'voucherRecharge',
    data() {
      return {
        vSure:false,/*充值成功弹框*/
        Recharge:true,
        error_prompt:"",
        addTips:"",
        rechargeED:"",   //1,600.00
        voucherMask:false,/*需一键充值才能使用弹框*/
        num:5,    //一次显示多少条
        counter : 1,
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        couponLenght:"",    //券length
        listdata:[],   //定额券初展示列表
        downdata:[],   //定额券加载更多列表
        allData:{},   //全部定额券列表
        couponIds:[],   //定额券id集合
        scrollData:{
          noFlag: false //暂无更多数据显示
        },
      }
    },
    components: {
      'v-scroll': loadmore
    },
    methods:{
      timer(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      vRecharge(){   //一键充值
        if(this.couponIds.length>0){
          rechargeMemberIdList(localStorage.getItem("userID"),this.couponIds).then(res =>{   //批量充值
            if(res.data.code == 200){
              this.error_prompt = "tel-message";
              this.addTips = "充值成功";
              let self = this;
              setTimeout(function () {
                self.$router.push({
                  name:"vouchers"
                })
              },200);
            }else{
              this.error_prompt = "tel-message";
              this.addTips = res.data.msg;
            }
          },res =>{
            this.error_prompt = "tel-message";
            this.addTips = res.data.msg;
          })
        }else{
          this.error_prompt = "tel-message";
          this.addTips = "无法充值，目前无充值券";
        }
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
//      seeDetail(item){  //这一期现在先不展示详情，后台接收详情的数据还没做好，先隐藏
//        this.$router.push({
//          name:"rechargeDetails",
//          params:{
//            couponLenght:this.couponLenght,      //列表页券的张数
//            couponDetail:item,  //详情页券详情
//          }
//        })
//      },
      voucherMaskClick(){
        this.voucherMask = true
      },
      wholeClick(){
        this.voucherMask = false
      },
    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.timer,2500);
      })
    },
    created(){
      rechargePage(localStorage.getItem("userID")).then(res =>{   //定额券列表
        if(res.data.code == 200){
          if(res.data.data!=null&&res.data.data!=undefined&&res.data.data!=""&&res.data.data.couponH5VoList!=null&&res.data.data.couponH5VoList!=undefined&&res.data.data.couponH5VoList!=""){
            this.allData = res.data.data.couponH5VoList;
            this.couponLenght = this.allData.length;
            for(let i=0;i<this.allData.length;i++){
              this.allData[i].nums = i;
            }
            this.listdata = this.allData.slice(0,this.num);
            this.rechargeED = res.data.data.rechargeAmount;   //待充值总额度
            for(let i=0;i<res.data.data.couponH5VoList.length;i++){  //push所有的券id，以便一键充值
              this.couponIds.push(res.data.data.couponH5VoList[i].couponId);
            }
          }
        }else{
          this.error_prompt = "tel-message";
          this.addTips = res.data.msg;
        }
      },res =>{
        this.error_prompt = "tel-message";
        this.addTips = res.data.msg;
      });

    }
  }
</script>
<style>
  /*空页面提示img的宽高设置*/
  .voucherRecharge .kongIMG{
    width:17.5rem;
    height:17.5rem;
  }
  .voucherRecharge-m{
    padding:1.16666667rem 0;
  }
  .voucherRecharge-Recharge{
    background: rgb(137,191,248);
    margin: 2.5rem 0;
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
  }
  .voucherRecharge-top-pad{
    padding: 0 1.16666667rem;
    width: 92.4%;
    left: 0;
    top: 0;
    background: #3B92EF;
  }
  .voucherRecharge .voucherRecKong{
    padding-top:16rem;
  }
  .voucherRecharge-main{
    padding-top:1px;
    background: url("../../../../assets/img/Q_Modular/Q_bg.png") no-repeat left top;
    background-size:100%;
    height: 11rem;
    margin:0 auto;
    /*margin-left: 1.2rem;*/
    width: 96.5%;
  }
  .voucherRecharge-main-top{
    width: 87%;
    margin: 0.75rem 1.8rem 0;
  }
  .voucherRecharge-m-span{
    line-height: 2rem;
  }
  .voucherRecharge-main-bg{
    width: 8rem;
    bottom: 1rem;
    right: 11.5rem;
  }

  .voucherRecharge-m-img{
    width: 1rem;
    padding-top: 0.6rem;
  }
  .voucherRecharge-m-icon{
    width: 0.5rem;
    padding-top: 0.4rem;
    padding-left: 0.5rem;
  }
  .voucherRecharge-main-btm{
    width: 86%;
    margin-top: 3.1rem;
    margin-left: 2rem;
  }
  .voucherRecharge .voucherRecharge-main-btm .startTime{
    bottom:-21px;
    z-index:555;
  }
  .voucherRecharge .wrapcenter .kongIMG{
    width: 17rem;
    height: 17rem;
    margin-left: 5%;
  }
  .voucherRecharge #user_format{
    display: block!important;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .voucherRecharge-main{
      height: 10rem;
    }
    .voucherRecharge-main-btm{
      margin-top: 2.5rem;
      margin-left: 2rem;
    }
    .voucherRecharge-top-pad{
      width:91.4%;
    }
    .voucherRecharge-main-bg{
      width: 6rem;
      bottom: 1.2rem;
      right: 7.5rem;
    }
    .voucherRecharge_content{
      height: 81.5%;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .voucherRecharge-main{
      width: 96%;
      margin-left: 0;
    }
    .voucherRecharge-main-top{
      width: 83%;
      margin: 1.75rem 3.08333rem 0;
    }
    .voucherRecharge-main-btm{
      width: 83%;
      margin: 0.75rem 3.08333rem 0;
      padding-top: 2rem;
      padding-left:0;
    }
    .voucherRecharge-main-bg{
      width: 7rem;
      bottom: 0rem;
      right: 7.5rem;
    }
  }
</style>

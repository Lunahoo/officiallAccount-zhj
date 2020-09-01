<template>
  <div class="couponMarket realN-ID width height">
    <div class="realN-ID-img width overflow-s">
      <div class="Market-image pst-rlt width fl">
        <div class="width">
          <img src="../../../assets/img/aloneC/couponNew/couponHome/img_Securitiesmarket_title@2x.png" />
        </div>
        <div class="font-F89 font-125 fl couponMarket-pad-16">
          <div class="fl cont couponMarket-icon">
            <div class="fl">
              <img class="couponMarket-icon-img" src="../../../assets/img/aloneC/couponNew/couponHome/icon_Dailyconsumption@2x.png"/>
            </div>
            <div>日常消费</div>
          </div>
          <div class="fl cont couponMarket-icon">
            <div class="fl">
              <img class="couponMarket-icon-img" src="../../../assets/img/aloneC/couponNew/couponHome/icon_Companiesreimbursed@2x.png"/>
            </div>
            <div>企业报销</div>
          </div>
          <div class="fl cont couponMarket-icon">
            <div class="fl">
              <img class="couponMarket-icon-img" src="../../../assets/img/aloneC/couponNew/couponHome/icon_Employeebenefits@2x.png"/>
            </div>
            <div>员工福利</div>
          </div>
          <div class="fl cont couponMarket-icon">
            <div class="fl">
              <img class="couponMarket-icon-img" src="../../../assets/img/aloneC/couponNew/couponHome/icon_Businessgifts@2x.png"/>
            </div>
            <div>商务馈赠</div>
          </div>
        </div>
      </div><!--头部图片-->
      <div class="Market-Coupon-list width fl">
        <div class="Market-Coupon bg-ff width fl pst-rlt" v-for="(item, index) in newsT" :key="index">
          <div @click="purchase(item.id)">
            <div class="Market-Coupon-l fl"><!--
              <img class="Market-Coupon-img" v-if="item.name=='通信券'" src="../../../assets/image/c/img_Communicate216.png"/>
              <img class="Market-Coupon-img" v-if="item.name=='电商券'" src="../../../assets/image/c/img_electricity216.png"/>-->
              <img class="Market-Coupon-img" v-if="item.name=='通用券'" src="../../../assets/image/c/img_General216.png"/><!--
              <img class="Market-Coupon-img" v-if="item.name=='办公券'" src="../../../assets/image/c/img_office216.png"/>
              <img class="Market-Coupon-img" v-if="item.name=='服务券'" src="../../../assets/image/c/img_service216.png"/>-->
              <img class="Market-Coupon-img" v-if="item.name=='旅游券'" src="../../../assets/image/c/img_Trave216.png"/>
              <img class="Market-Coupon-img" v-if="item.name=='咨询券'" src="../../../assets/image/c/img_consultation_216_148@2x.png"/>
              <img class="Market-Coupon-img" v-if="item.name=='信息券'" src="../../../assets/image/c/img_information_216_148@2x.png"/>
              <img class="Market-Coupon-img" v-if="item.name=='培训券'" src="../../../assets/image/c/img_train216_148.png"/>
              <img class="Market-Coupon-img" v-if="item.name=='福利券'" src="../../../assets/image/c/img_welfare216_148.png"/>
            </div>
            <div class="Market-C-cont fl font-1" >
              <div class="font-133">{{item.name}}</div>
              <div class="font-ipt ellipsis_name_3" v-if="item.name=='通用券'" style="height:4.8rem;overflow: hidden;">适用于餐饮、购物、用车 、机票、火车票、酒店、 旅游、娱乐、生活缴费</div>
              <div class="font-ipt ellipsis_name_3" v-if="item.name=='旅游券'" style="height:4.8rem;overflow: hidden;">适用于餐饮、用车、 机票、火车票、酒店、 旅游、娱乐</div>
              <div class="font-ipt ellipsis_name_3" v-if="item.name=='培训券'" style="height:4.8rem;overflow: hidden;">适用于场地租借、 预定餐食、租车、 培训课程</div>
              <div class="font-ipt ellipsis_name_3" v-if="item.name=='福利券'" style="height:4.8rem;overflow: hidden;">适用于餐饮、购物、用车 、机票、火车票、酒店、 旅游、娱乐、生活缴费</div>
              <div class="font-ipt ellipsis_name_3" v-if="item.name=='信息券'" style="height:4.8rem;overflow: hidden;">适用于通信服务、智能测试、架构服务、应用服务</div>
              <div class="font-ipt ellipsis_name_3" v-if="item.name=='咨询券'" style="height:4.8rem;overflow: hidden;">适用于项目规划、咨询服务、战略分析、技术支持</div>
            </div>
            <div class="fr bt-color-M-btn">
              <img src="../../../assets/img/aloneC/couponNew/couponHome/img_buybotton@2x.png"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="userfooter" class="width btm-0 pst-abs" style="background: #fafafa;">
      <footbar></footbar>
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
  import footbar from '../../footbar.vue';
  import {queryMemberCouponListNew,queryCouponDetailNew} from '@/api/aloneC/cInterface';/*我的消费券列表*/
  export default {
    name:"image-html5-upload",
    components: {
      footbar
    },

    data() {
      return {
        error_prompt:'',
        content:'',
        newsT:{

        },
        Merchant:[],//商户
        option: {
          show: true,
          sourceDom: ''
        },
        KeyboardDiv:true,
        idCard:"",
        parameter:{
          couponStatus:1,//劵状态 1:上架（生效），2:下架（失效），0:保存'  商定给固定值
          deliveryPlatform:2,  //生效时间   商定给固定值
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.adTimer,2000);
      })
    },
    methods:{
      adTimer: function () {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
        init(){
          this.accessToken = localStorage.getItem("userID");
          if(this.accessToken != undefined && this.accessToken != null && this.accessToken != "" && this.accessToken!='null' && this.accessToken!='undefined'){
            queryMemberCouponListNew(this.accessToken,this.parameter).then(res =>{
              if(res.data.code == 200){
                //console.log(res.data.data);
                this.newsT = res.data.data;
                this.industryList = this.newsT.industryList
                //console.log(this.industryList)
              }else {
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            },res =>{
              this.$router.push({name:'login'})
            })
          }else {
            this.$router.push({name:'login'})
          }
        },
      //新增键盘删除按钮
      getInputValue(val) {
        if(val === 'delete'){
          this.idCard = this.value.slice(0,this.value.length -1)
        }else{
          this.idCard += val
        }
      },
      onFocus() {
        this.$set(this.option, 'show', true)
        this.$set(this.option, 'sourceDom', this.$refs['keyboard'])
        /*document.activeElement.blur();*/
      },
      logindetele1(){
        this.idCard = '';
        this.$refs.ref_idCard.focus();
        window.document.getElementsByClassName("tel-mess")[0].style.display = "none";
      },
      purchase(key){  //点击购买
        this.$router.push({
          name:"mDetails",
          params:{
            key:key,
          }
        });
      }
    },
    created(){
      this.init();
    }
  }
</script>

<style>
  .couponMarket .realN-ID-img{
    height: 93%;
  }
  .couponMarket .realN-ID-img .couponMarket-pad-16 .couponMarket-icon {
    padding: 0 1.208333rem;
  }
  .couponMarket .realN-ID-img .couponMarket-pad-16 .couponMarket-icon:first-child{
    padding-left:0;
  }
  .couponMarket .realN-ID-img .couponMarket-pad-16 .couponMarket-icon:last-child{
    padding-right:0;
  }
  .couponMarket .realN-ID-img .couponMarket-pad-16 .couponMarket-icon .couponMarket-icon-img{
    width: 5rem;
    padding: 1rem 0 0.4rem;
  }
  .couponMarket .realN-ID-img .Market-image .couponMarket-pad-16{
    padding:0 1.6rem;
  }
  .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon{
    background: url("../../../assets/img/aloneC/couponNew/couponHome/img_shadow@2x.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }
  .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon:last-child{
    margin-bottom: 2rem;
  }
  .couponMarket .realN-ID-img .Market-Coupon-list{
    padding-top: 1rem;
  }
  .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon .Market-Coupon-l {
    margin: 1.95rem 1rem 1.666666667rem 1.833333rem;
    width: 9rem;
    height: 6.16667rem;
    display: -webkit-box;
  }
  .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon .Market-Coupon-l .Market-Coupon-img{
    -webkit-border-radius: 0.3333333rem;
    -moz-border-radius: 0.3333333rem;
    border-radius: 0.3333333rem;
  }
  .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon .bt-color-M-btn {
    margin: 3rem 1.677777rem 3rem 0;
    border-radius: 3rem;
    line-height: 2.3rem;
    width: 5rem;
  }
  .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon .Market-C-cont{
    padding: 1.66666666rem 0;
    width:37%;
  }
  @media screen and (max-width:321px){
    .couponMarket .realN-ID-img .couponMarket-pad-16 .couponMarket-icon  .couponMarket-icon-img{
      width:4.6rem;
    }
    .couponMarket .realN-ID-img .couponMarket-pad-16 .couponMarket-icon{
      padding: 0 0.845rem;
    }
    .couponMarket  .realN-ID-img{
      height: 89.5%;
    }
    .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon  .Market-Coupon-l{
      width: 7rem;
      height: 5.16667rem;
      margin: 1.666666667rem 0.6rem 1.666666667rem 1.158rem;
    }
    .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon .Market-C-cont {
       padding: 1.066666666rem 0;
       width: 42%;
     }
    .couponMarket .realN-ID-img .Market-Coupon-list .Market-Coupon .bt-color-M-btn{
      margin: 3rem 1.267rem 3rem 0;
    }
  }
  @media screen and (min-width:760px)and (max-width: 1024px){
    .couponMarket .realN-ID-img  .couponMarket-pad-16 {
      padding: 0 1.4rem;
    }
    .couponMarket .realN-ID-img .couponMarket-pad-16  .couponMarket-icon {
      padding: 0 1.4rem;
    }
    .realN-ID #userfooter{
      height:12%;
      padding-bottom: 0;
    }
    .couponMarket .realN-ID-img{
      height: 90%;
    }
  }
</style>


<template>
  <div class="account_amount width height bg-f6">
    <div class="account_amount_main bd-btm-f2">
      <div class="fillIn-comter cont" v-if="isNull">
        <img src="../../assets/image/news/img_blank_page@2x.png" class="errorImg">
        <p class="font-ipt pd-bt">企业暂无为您设置报销额度，空空如也～</p>
      </div>
      <div class="fl width bg-ff" style="border-top: 1px solid #f5f5f5;">
        <div style="padding-left: 1.0833333333rem;">
          <div class="font-167 font-b" style="font-size: 1.5rem;font-weight: bold;line-height: 3.333333rem;color: #2A2E2E;"><img src="../../assets/img/account/icon_currency@2x.png" style="width: 1.68rem;float: left;margin-top: 0.9166667rem;padding-right: 0.5rem">通用报销</div>
          <div class="account_amount_main_bot font-108">
            <div class="width fl">
              <div class="fl font-ipt">可与各类报销额度叠加使用</div>
              <div class="fr font-F89 font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">5000</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="account_amount_main_div fl width bg-ff">
        <div style="padding-left: 1.0833333333rem;">
          <div>
            <div class="account_amount_div_top font-167 font-b bd-btm-f2">机票<img src="../../assets/img/account/icon_share@2x.png" class="shareImg" @click="showEnjoy"/></div>
          </div>
          <div class="account_amount_main_bot font-108">
            <div class="width fl">
              <div class="fl font-ipt">可报销额度</div>
              <div class="fr font-F89 font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">500</span></div>
            </div>
            <div class="width fl">
              <div class="fl font-ipt">审批中额度</div>
              <div class="fr font-ipt font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">300</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="account_amount_main_div fl width bg-ff">
        <div style="padding-left: 1.0833333333rem;">
          <div class="account_amount_div_top font-167 font-b bd-btm-f2">酒店<img src="../../assets/img/account/icon_share@2x.png" class="shareImg" @click="showEnjoy"/></div>
          <div class="account_amount_main_bot font-108">
            <div class="width fl">
              <div class="fl font-ipt">可报销额度</div>
              <div class="fr font-F89 font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">500</span></div>
            </div>
            <div class="width fl">
              <div class="fl font-ipt">审批中额度</div>
              <div class="fr font-ipt font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">300</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="account_amount_main_div fl width bg-ff">
        <div style="padding-left: 1.0833333333rem;">
          <div class="account_amount_div_top font-167 font-b bd-btm-f2">火车</div>
          <div class="account_amount_main_bot font-108">
            <div class="width fl">
              <div class="fl font-ipt">可报销额度</div>
              <div class="fr font-F89 font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">500</span></div>
            </div>
            <div class="width fl">
              <div class="fl font-ipt">审批中额度</div>
              <div class="fr font-ipt font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">300</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="account_amount_main_div fl width bg-ff">
        <div style="padding-left: 1.0833333333rem;">
          <div class="account_amount_div_top font-167 font-b bd-btm-f2">水电煤缴费</div>
          <div class="account_amount_main_bot font-108">
            <div class="width fl">
              <div class="fl font-ipt">可报销额度</div>
              <div class="fr font-F89 font-b">￥<span style="font-size: 1.2rem;font-weight: bold;"><span style="font-size: 1.2rem;font-weight: bold;">500</span></span></div>
            </div>
            <div class="width fl">
              <div class="fl font-ipt">审批中额度</div>
              <div class="fr font-ipt font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">300</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="account_amount_main_div fl width bg-ff">
        <div style="padding-left: 1.0833333333rem;">
          <div class="account_amount_div_top font-167 font-b bd-btm-f2">餐饮</div>
          <div class="account_amount_main_bot font-108">
            <div class="width fl">
              <div class="fl font-ipt">可报销额度</div>
              <div class="fr font-F89 font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">500</span></div>
            </div>
            <div class="width fl">
              <div class="fl font-ipt">审批中额度</div>
              <div class="fr font-ipt font-b"><span style="font-size: 1rem;">￥</span><span style="font-size: 1.2rem;font-weight: bold;">300</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="account_amount_main_foot width bg-ff font-F89 font-167 pst-rlt">
      <div class="account_amount_main_fl fl cont" @click="amounttoFill">添加发票</div>
      <img src="../../assets/img/Q_Modular/line@2x.png" class="pst-abs"/>
      <div class="account_amount_main_fr fr cont" @click="tolaunch">发起报销</div>
    </div>
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
    <section class="zz" v-show="Share">
      <div class="wrapcenter">
        <div class="wrapcenter_tips1 bg-ff">
          <div style="height:20rem;overflow-y: scroll">
            <div class="wrapcenter_child">
              <div class="amount_size">共享额度<span class="fr"><span style="font-size: 1rem;">￥</span><span class="amount_em">100</span></span></div>
              <div class="amount_detail">上海砾洲医学科技责任有限公司</div>
            </div>
            <div class="wrapcenter_child">
              <div class="amount_size">当前企业额度<span class="fr"><span style="font-size: 1rem;">￥</span><span class="amount_em">200</span></span></div>
              <div class="amount_detail">上海广略外包服务有限公司</div>
            </div>
            <div class="wrapcenter_child">
              <div class="amount_size">当前企业额度<span class="fr"><span style="font-size: 1rem;">￥</span><span class="amount_em">500</span></span></div>
              <div class="amount_detail">上海淘略数据处理有限公司</div>
            </div>
            <div class="wrapcenter_child">
              <div class="amount_size">当前企业额度<span class="fr"><span style="font-size: 1rem;">￥</span><span class="amount_em">800</span></span></div>
              <div class="amount_detail">上海淘略有限公司</div>
            </div>
            <div class="wrapcenter_child">
              <div class="amount_size" style="margin-bottom: 1.333333rem;">总额度<span class="fr font-fa"><span style="font-size: 1rem;">￥</span><span class="amount_em">1600</span></span></div>
            </div>
          </div>
          <div class="sure_amount font-fa" @click="hideShare">确定</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {queryReimburseList} from '@/api/user/userLogin'
  export default{
    data:function(){
      return {
        reimburseAmountVoList:[],
        isNull:false,
        error_prompt:"",
        content:"",
        Share:false,
      }
    },
    methods:{
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      showEnjoy(){
        this.Share = true;
      },
      hideShare(){
        this.Share = false;
      },
      init(){
       /* let token = localStorage.getItem("userID");
        if(token!=undefined && token!=null && token!="") {
          queryReimburseList(token,this.companyId).then(res => {
            if(res.data.code == 200){
              this.reimburseAmountVoList = res.data.data.reimburseAmountVoList;
              this.isNull = res.data.data.isNull;
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          })
        }*/
      },
      amounttoFill(){
        this.$router.push({
          name:"fill",
          params:{
            page:"amount"
          }
        })
      },
      tolaunch(){
        if(this.isNull){
          this.error_prompt="tel-message";
          this.content = "无可报销额度";
        }else{
          this.$router.push({
            name:"Reimbursement11",
            params:{
              art:"发起报销"
            }
          })
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      this.init();
    }
  }
</script>
<style>
  .account_amount .zz .wrapcenter .wrapcenter_tips1{
    width: 22.5rem;
    border-radius: 0.53rem;
    margin-top: 50%;
    height:24rem;
  }
  .account_amount .zz .wrapcenter .wrapcenter_tips1 .sure_amount{
    text-align: center;
    line-height: 3.8rem;
    font-size: 1.6333rem;
    border-top: 1px solid #e5e5e5;
  }
  .account_amount .zz .wrapcenter .wrapcenter_tips1 .wrapcenter_child .amount_size{
    padding-left: 1.33333333rem;
    margin-top: 1.33333333rem;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .account_amount .zz .wrapcenter .wrapcenter_tips1 .wrapcenter_child .amount_detail{
    padding-left: 1.33333333rem;
    margin-bottom: 0.6777777rem;
    color: #A39C9C;
  }
  .account_amount .zz .wrapcenter .wrapcenter_tips1 .wrapcenter_child .amount_size .amount_em{
    margin-right: 1.333333333rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .account_amount_main{
    height:91.5%;
    overflow-y: scroll;
  }
  .account_amount_main_div{
    margin-top: 0.6666667rem;
  }
  .account_amount_main_div .account_amount_div_top .shareImg{
    float: right;
    margin-right: 2rem;
    width: 3.33333rem;
    margin-top: 0.9167777rem;
    line-height: 3.33333rem;
  }
  .account_amount_div_top{
    line-height: 3.333333rem;
    color: #2A2E2E;
  }
  .account_amount_main_bot{
    line-height: 3rem;
    padding-right: 2rem;
  }
  .account_amount_main_foot{
    height:8%;
    line-height: 3.75rem;
  }
  .account_amount_main_fl,.account_amount_main_fr{
    width:50%;
  }
  .account_amount_main_foot img{
    top: 20%;
    left: 50%;
    width: 1px;
    height: 60%;
  }
</style>

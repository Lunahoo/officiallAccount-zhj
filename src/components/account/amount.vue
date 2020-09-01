<template>
    <div class="account_amount width height bg-f6">
      <div class="account_amount_main bd-btm-f2">
        <div class="fillIn-comter cont" v-if="isNull">
          <img src="../../assets/image/news/img_blank_page@2x.png" class="errorImg">
          <p class="font-ipt pd-bt">企业暂无为您设置报销额度，空空如也～</p>
        </div>
        <div class="account_amount_main_div fl width bg-ff" v-for="(reimburseAmountVo,index) in reimburseAmountVoList" :key="index">
          <div style="padding-left: 1.0833333333rem;">
          <div class="account_amount_div_top font-167 font-b bd-btm-f2">{{reimburseAmountVo.industryName}}</div>
          <div class="account_amount_main_bot font-108">
            <div class="width fl">
              <div class="fl font-ipt">可报销额度</div>
              <div class="fr font-189 font-b">￥{{reimburseAmountVo.chargeAmt|money}}</div>
            </div>
            <div class="width fl" v-if="reimburseAmountVo.inApprovalAmt!='' && reimburseAmountVo.inApprovalAmt!=undefined && reimburseAmountVo.inApprovalAmt!=0">
              <div class="fl font-ipt">审批中额度</div>
              <div class="fr font-ipt font-b">￥{{reimburseAmountVo.inApprovalAmt|money}}</div>
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
    </div>
</template>
<script>
  import {queryReimburseList} from '@/api/user/userLogin'
  export default{
    data:function(){
      return {
        reimburseAmountVoList:[],
        isNull:true,
        error_prompt:"",
        content:"",
        companyId:"",
      }
    },
    methods:{
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      init(){
        let token = localStorage.getItem("userID");
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
        }
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
      if(localStorage.getItem("companyId")!=undefined &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
        this.companyId = localStorage.getItem("companyId");
      }else{
        this.companyId = "";
      }
        this.init();
    }
      }
</script>
<style>
  .account_amount_main{
    height:91.5%;
    overflow-y: scroll;
  }
  .account_amount_main_div{
    margin-top: 0.6666667rem;
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

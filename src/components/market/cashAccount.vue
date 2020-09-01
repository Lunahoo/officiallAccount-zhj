<template>
  <div class="cashAccount width height bg-f6">
    <div class="cashAcount_totalMoney width font-col-b bg-color-3B9">
      <div class="margin_l font-167">总金额（元）</div>
      <div class="margin_l">{{totalAmount|moneyFormat}}</div>
    </div>
    <div class="cashAcount_detail">
      <!--独立c-->
      <!--<div class="singleUser width bg-ff" v-if="singleC">-->
        <!--<section>-->
          <!--<div class="margin_l fl"><img src="../../assets/img/aloneC/icon_recharge@2x.png"></div>-->
          <!--<div class="fr font-167 bor_bottom" @click="tocRecharge">充值</div>-->
        <!--</section>-->
        <!--<section>-->
          <!--<div class="margin_l fl"><img src="../../assets/img/aloneC/icon_cash@2x.png"></div>-->
          <!--<div class="fr font-167">提现</div>-->
        <!--</section>-->
      <!--</div>-->
      <!--多属性-->
      <div class="manyUser" v-if="aloneCHidden">
        <section class="width bg-ff">
          <div class="width manyUser_words">
            <div class="fl margin_l"><img src="../../assets/img/aloneC/icon_personal@2x.png"></div>
            <p class="fr font-108">个人现金账户（元）</p>
          </div>
          <div class="width manyUser_nums">
            <p class="fl font-ffa">{{pepAccount|moneyFormat}}</p>
            <div class="fr cash single_user font-ffa cont" @click="aloneCashWithdrawal">提现</div>
            <div class="fr recharge font-col-b cont" @click="tocRecharge(pepAccount)">充值</div>
          </div>
        </section>
        <section class="width bg-ff" v-for="(item,index) in enterpriseList" :key="index" v-if="enterpriseHidden" >
        <div class="width manyUser_words">
          <div class="fl margin_l"><img src="../../assets/img/aloneC/icon_company@2x.png"></div>
          <p class="fr font-108" >{{item.companyName}}</p>
        </div>
        <div class="width manyUser_nums">
          <p class="fl font-ffa">{{item.salaryAmount|moneyFormat}}</p>
          <div class="fr cash comapny_user font-ffa cont" @click="comPCashWithdrawal(item.salaryAmount)">提现</div>
        </div>
      </section>
      </div>
    </div>
    <!--<div class="common_Problem pst-abs width font-1 font-3b9 cont">常见问题？</div>-->
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryAllSalaryBalance,addWithDraw} from "@/api/aloneC/cInterface"
  import {generateWithdrawUrl} from '@/api/user/headService'
  export default{
      data(){
        return{
          enterpriseHidden:true,
          content:"",
          error_prompt:"",
          singleC:false,
          aloneCHidden:false,
          totalAmount:"",   //现金账户总额
          pepAccount:"",    //个人现金账户余额
          parameterList:{
            scene:"withdraw",   //提现
            amount:"",   //支付金额
            cost:"",        //支付单价
            asycType:"h5.cashAccount",
            bizid:"",      //业务编号
            desc:"提现订单",    //暂时没有，让前端自己定义
            otherinfo:"提现订单",    //暂时没有，让前端自己定义
            isVerify:"0",   //是否需要验证 短信验证 0 不验证 1 验证
            companyId:''
          },
          cashInfo:{
            type:"1",   //单据类型,1:普通提现,2:代卖提现(系统)
            source:'1',   //来源 1:智慧嘉,2:嘉福平台,3:企业自助,4:运营平台
            fromTerminal:"4",    //来源终端 1:PC,2:Android,3:IOS,4:H5
            amount:"",       //申请金额
            creatorName:"随便",     //用户姓名
            bankId:"454545",      //银行ID
            bankName:"cheng",      //银行名称
            bankCode:"45",      //银行编码
            bankNumber:"5454",      //银行卡号
          },
          enterpriseList:{},
        }
      },
    methods:{
      cashAccountTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      tocRecharge(money){
          this.$router.push({name:"cRecharge"});
      },
      //调总部提现接口
      toJFGetCash(money,userN){
        this.parameterList.amount = money/1000;
        this.parameterList.cost = money/1000;
        this.parameterList.asycType = "h5.cashAccount";
        if(userN=='c用户'){
          this.parameterList.companyId = '1107853461363306498';
        }else{
          this.parameterList.companyId = localStorage.getItem("companyId");
        }

        generateWithdrawUrl(localStorage.getItem("userID"),this.parameterList).then(res=>{
          if(res.data.code==200){
            window.location.href=res.data.data;
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //提现申请，获取提现id
      cashWithdrawal(money,userWhich){
          this.cashInfo.amount = money/1000;
        addWithDraw(localStorage.getItem("userID"),this.cashInfo).then(res=>{
          if(res.data.code==200){
            this.parameterList.bizid = res.data.data.id;
            if(userWhich=="c用户"){   //c用户提现
              this.toJFGetCash(this.pepAccount,'c用户');
            }else{ //企业用户提现
              this.toJFGetCash(this.amount);
            }
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //独立c提现
      aloneCashWithdrawal(){
         if(this.pepAccount==0){
           this.error_prompt="tel-message";
           this.content = "该账户没有提现额度";
         }else{
           this.cashWithdrawal(this.pepAccount,"c用户")   //this.pepAccount
         }
      },
      //企业账户提现
      comPCashWithdrawal(amount){
         if(amount==0){
           this.error_prompt="tel-message";
           this.content = "该账户没有提现额度";
         }else{
           this.cashWithdrawal(amount,"企业用户");
         }
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.cashAccountTimer,2000);
      })
    },
    created(){
      //查询现金账户额度
      queryAllSalaryBalance(localStorage.getItem("userID")).then(res=> {
        if(res.data.code==200){
          this.totalAmount = res.data.data.sumSalaryAmount;   //总金额
          if(res.data.data.cpAccountList.length!=0&&res.data.data.cpAccountList!=""&&res.data.data.cpAccountList!=null&&res.data.data.cpAccountList!=undefined){
              this.aloneCHidden = true;
              this.enterpriseHidden = true;
              this.enterpriseList = res.data.data.cpAccountList;
            }else{
            //    this.singleC = true;
              this.aloneCHidden = true;
              this.enterpriseHidden = false;
            }
          if(res.data.data.peAccount.salaryAmount!=""&&res.data.data.peAccount.salaryAmount!=null&&res.data.data.peAccount.salaryAmount!=undefined){
            this.pepAccount = res.data.data.peAccount.salaryAmount;
          }
        }else{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        }
      },res=>{
        this.error_prompt="tel-message";
        this.content = res.data.msg;
      })
    }
  }
</script>
<style>
  .cashAccount .margin_l{
    margin-left:1.6666rem;
  }
  .cashAccount .bor_bottom{
    border-bottom:solid 1px #F5F5F5;
  }
  .cashAccount .cashAcount_totalMoney{
    padding-top:1px;
    height:12.08333rem;
  }
  .cashAccount .cashAcount_totalMoney div:first-of-type{
    color:rgba(255,255,255,.8);
    margin-top:2.3333rem;
  }
  .cashAccount .cashAcount_totalMoney div:nth-of-type(2){
    font-size:3.3333rem;
    margin-top:1.2rem;
  }
  /*独立c*/
  .cashAccount .cashAcount_detail .singleUser section{
    height:3.6666rem;
  }
  .cashAccount .cashAcount_detail .singleUser section img{
    width:1.5rem;
    margin-top:1.208rem;
  }
  .cashAccount .cashAcount_detail .singleUser section div:nth-of-type(2){
    width:77%;
    height:3.6666rem;
    margin-right:1.75rem;
    line-height:3.6666rem;
    background:url("../../assets/img/right.png") no-repeat right center;
    background-size:0.5rem;
  }
  /*多属性*/
  .cashAccount .cashAcount_detail .manyUser section{
    margin-bottom:1rem;
    height:6.5rem;
    padding-top:1px;
  }
  .cashAccount .manyUser .manyUser_words{
    margin-top:0.7rem;
    height: 1.5rem;
  }
  .cashAccount .manyUser .manyUser_words img{
    width:1.2rem;
  }
  .cashAccount .manyUser .manyUser_words p{
    width:86%;
    color:#BFBBBB;
  }
  .cashAccount .manyUser .manyUser_nums{
    padding-top:0.5rem;
    height:3rem;
  }
  .cashAccount .manyUser .manyUser_nums p{
    font-size:1.83333rem;
    margin-left:4.5rem;
  }
  .cashAccount .manyUser .manyUser_nums div{
    margin-top:0.3rem;
  }
  .cashAccount .manyUser .manyUser_nums .recharge{
    width:3.83333rem;
    height:2.083333rem;
    line-height:2.083333rem;
    background:#FFA436;
    border-radius:2px;
    /*margin-left:12rem;*/
  }
  .cashAccount .manyUser .manyUser_nums .cash{
    width:3.6666rem;
    height:1.916666rem;
    line-height:1.916666rem;
    border:solid 1px #FFA436;
    border-radius:2px;
  }
  .cashAccount .manyUser .manyUser_nums .single_user{
    margin-left:1rem;
    margin-right: 1.5rem;
  }
  .cashAccount .manyUser .manyUser_nums .comapny_user{
    margin-right: 1.5rem;
  }
  .cashAccount .common_Problem{
    left:0;
    bottom:2rem;
  }
</style>

<template>
    <div class="budgetDetail width height bg-f6" v-wechat-title="$route.meta.title=transActNameTitle">
      <div style="padding-top: 0.583333333rem;">
        <div class="width fl bg-f6" style="line-height: 5.666666667rem;">
          <div class="fl bg-ff" style="padding: 0 1.0833333rem;width: 93%;margin-bottom: 1rem;" v-if="transActName!='转让'">
            <div class="bg-ff">
                <div class="width fl font-108" style="line-height: 3.16666667rem;">
                  <div class="fl">流水号</div><div class="fr">{{budgetId}}</div>
                </div>
                <div v-if="transActName=='报销'" class="width fl font-108" style="line-height: 3.16666667rem;">
                  <div class="fl">报销企业</div><div class="fr">{{companyName}}</div>
                </div>
                <div v-if="transActName=='发放'" class="width fl font-108" style="line-height: 3.16666667rem;">
                  <div class="fl">发放企业</div><div class="fr">{{companyName}}</div>
                </div>
            </div>
          </div>
        </div>
        <div class="bg-ff fl width font-108 bd-btm budget_list_btm" v-for="(item,index) in alldata" :key="index" style="padding: 1rem 0;">
          <div class="fl budgetDetail-main-pad">
            <div class="fl font-ipt">券名称</div>
            <div class="fr font-167 ellipsis_name">{{item.couponName}}</div>
          </div>
          <div class="fl budgetDetail-main-pad" v-if="item.noTransferAmount!=null && item.noTransferAmount!=0 && item.noTransferAmount!='null'">
            <div class="fl font-ipt" v-if="flag == 'AT00002'">收入（仅消费）</div>
            <div class="fl font-ipt" v-if="flag == 'AT00001'">支出（仅消费）</div>
            <div class="fr font-167 ellipsis_name">{{item.noTransferAmount|money}}</div>
          </div>
          <div class="fl budgetDetail-main-pad" v-if="item.canTransferAmount!=null && item.canTransferAmount!=0 && item.canTransferAmount!='null'">
            <div class="fl font-ipt" v-if="flag == 'AT00002'">收入（可转让）</div>
            <div class="fl font-ipt" v-if="flag == 'AT00001'">支出（可转让）</div>
            <div class="fr font-167 ellipsis_name">{{item.canTransferAmount|money}}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {budgetDetail} from '@/api/user/userLogin'/*收支明细详情*/
  export default{
    data(){
      return{
        budgetId:"",
        tradeCate:"",
        income:false,
        transActName:"",
        transActNameTitle:"",
        companyName:"",
        flag:"",
        alldata:[

        ]
      }
    },
    methods:{
      init(){
        this.accessToken = localStorage.getItem("userID");
        if(this.$route.params.tradeBusiCode!=undefined && this.$route.params.tradeBusiCode!="" && this.$route.params.tradeBusiCode!=null && this.$route.params.tradeBusiCode!='undefined' && this.$route.params.tradeBusiCode!='null'){
          this.budgetId = this.$route.params.tradeBusiCode;
          localStorage.setItem('budgetId',this.budgetId);
        }else{
          if(localStorage.getItem('budgetId')!=undefined && localStorage.getItem('budgetId')!="" && localStorage.getItem('budgetId')!=null && localStorage.getItem('budgetId')!='undefined' && localStorage.getItem('budgetId')!='null'){
            this.budgetId = localStorage.getItem('budgetId');
          }
        }
        if(this.$route.params.tradeCate!=undefined && this.$route.params.tradeCate!="" && this.$route.params.tradeCate!=null && this.$route.params.tradeCate!='undefined' && this.$route.params.tradeCate!='null'){
          this.tradeCate = this.$route.params.tradeCate;
          localStorage.setItem('tradeCate',this.tradeCate);
        }else{
          if(localStorage.getItem('tradeCate')!=undefined && localStorage.getItem('tradeCate')!="" && localStorage.getItem('tradeCate')!=null && localStorage.getItem('tradeCate')!='undefined' && localStorage.getItem('tradeCate')!='null'){
            this.tradeCate = localStorage.getItem('tradeCate');
          }
        }
        if(this.$route.params.flag!=undefined && this.$route.params.flag!="" && this.$route.params.flag!=null && this.$route.params.flag!='undefined' && this.$route.params.flag!='null'){
          this.flag = this.$route.params.flag;
          localStorage.setItem('flag',this.flag);
        }else{
          if(localStorage.getItem('flag')!=undefined && localStorage.getItem('flag')!="" && localStorage.getItem('flag')!=null && localStorage.getItem('flag')!='undefined' && localStorage.getItem('flag')!='null'){
            this.flag = localStorage.getItem('flag');
          }
        }
        if(this.$route.params.companyName!=undefined && this.$route.params.companyName!="" && this.$route.params.companyName!=null && this.$route.params.companyName!='undefined' && this.$route.params.companyName!='null'){
          this.companyName = this.$route.params.companyName;
          localStorage.setItem('budgetCompanyName',this.companyName);
        }else{
          if(localStorage.getItem('budgetCompanyName')!=undefined && localStorage.getItem('budgetCompanyName')!="" && localStorage.getItem('budgetCompanyName')!=null && localStorage.getItem('budgetCompanyName')!='undefined' && localStorage.getItem('budgetCompanyName')!='null'){
            this.companyName = localStorage.getItem('budgetCompanyName');
          }
        }
        budgetDetail(this.accessToken,this.budgetId,this.tradeCate).then(res =>{
          if(res.data.code == 200) {
              if(res.data.data==null || res.data.data=='null'){
                this.alldata = [];
              }else{
                this.alldata = res.data.data.tradeFlowList;
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
    },
    mounted:function(){

    },
    created(){
      this.init();
      if(this.$route.params.transActName!=undefined && this.$route.params.transActName!="" && this.$route.params.transActName!=null && this.$route.params.transActName!='undefined' && this.$route.params.transActName!='null'){
        this.transActName = this.$route.params.transActName;
        localStorage.setItem('transActName',this.transActName);
      }else{
        if(localStorage.getItem('transActName')!=undefined && localStorage.getItem('transActName')!="" && localStorage.getItem('transActName')!=null && localStorage.getItem('transActName')!='undefined' && localStorage.getItem('transActName')!='null'){
          this.transActName = localStorage.getItem('transActName');
        }
      }
      if(this.transActName!=undefined && this.transActName!=""){
          this.transActNameTitle = this.transActName+'明细';
      }
    }
  }
</script>
<style>
  .budgetDetail-main-pad{
    padding: 0 1.0833333rem;
    width: 92%;
    line-height: 3rem;
  }
  .budgetDetail .ellipsis_name{
    max-width: 18rem;
  }
  .budget_list_btm:last-child{
    border-bottom: 0;
  }
</style>

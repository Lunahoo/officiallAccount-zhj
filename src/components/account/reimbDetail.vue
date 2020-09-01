<template>
  <div class="reimbDetail bg-f6 height fl width">
    <div :class="topClass1">
      <!--信息展示-->
      <div class="bg-ff reimbDetail-div fl pst-rlt"><!--  v-for="(item,iTab) in ReimbursementDetail"-->
      <div class="reimbDetail-title width cont fl">
        <div class="font-ipt font-12">报销总金额</div>
        <div style="padding-bottom: 4rem" class="mG-top067">
          <span style="font-size: 1.75rem">￥</span>
          <span style="font-size: 2.666667rem;">{{ReimbursementDetail.totalAmt|money}}</span>
          <img class="img_seal_rem pst-abs" style="top: 6.5rem;right: 0.5rem;" src="../../assets/img/account/img_seal@2x.png"/>
          <div class="seal_div_rem font-125">
            <span class="font-F89" v-if="ReimbursementDetail.status==0 || ReimbursementDetail.status=='0' || ReimbursementDetail.status==2 || ReimbursementDetail.status=='2'">{{ReimbursementDetail.statusName}}</span>
            <span class="font-F89" v-if="ReimbursementDetail.status==3 || ReimbursementDetail.status=='3' || ReimbursementDetail.status==6 || ReimbursementDetail.status=='6' || ReimbursementDetail.status==7 || ReimbursementDetail.status=='7'">待打款</span>
            <span class="color-7cb" v-if="ReimbursementDetail.status==1 || ReimbursementDetail.status=='1' || ReimbursementDetail.status==8 || ReimbursementDetail.status=='8'  || ReimbursementDetail.status==10 || ReimbursementDetail.status=='10' || ReimbursementDetail.status==11 || ReimbursementDetail.status=='11'">{{ReimbursementDetail.statusName}}</span>
            <span class="font-22d" v-if="ReimbursementDetail.status==4 || ReimbursementDetail.status=='4'">{{ReimbursementDetail.statusName}}</span>
            <span class="font-7b7" v-if="ReimbursementDetail.status==5 || ReimbursementDetail.status=='5'">{{ReimbursementDetail.statusName}}</span>
          </div>
        </div><!--{{ReimbursementDetail.price|money}}-->
      </div>
      <div class="reimbDetail-Reason fl bg-ff width">
        <div class="fl reimbDetail-Reason-l ellipsis_name"><!-- style="width:100%;"-->
          <p class="font-167">{{ReimbursementDetail.statusName}}</p>
          <p class="font-ipt" style="font-size: 0.833333rem;">{{ReimbursementDetail.reimbDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
        </div>
        <div class="fl font-167 reimbDetail-Reason-r">{{ReimbursementDetail.approveMessage}}</div>
      </div>
      <div class="rei-info fl">
        <div class="fl width">
          <div class="fl reimbDetail-Reason-l ellipsis_name">报销单编号</div>
          <div class="fr reimbDetail-Reason-r">{{ReimbursementDetail.reimburseCode}}</div>
        </div>
        <div class="fl width">
          <div class="fl reimbDetail-Reason-l ellipsis_name">申请时间</div>
          <div class="fr reimbDetail-Reason-r">{{ReimbursementDetail.reimbDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
        </div>
        <div class="fl width">
          <div class="fl reimbDetail-Reason-l ellipsis_name">费用归属</div>
          <div class="fr reimbDetail-Reason-r ellipsis_name">{{ReimbursementDetail.assetCenterName}}</div>
        </div>
        <div class="fl width">
          <div class="fl reimbDetail-Reason-l ellipsis_name">报销科目</div>
          <div class="fr reimbDetail-Reason-r">{{ReimbursementDetail.categoryName}}</div>
        </div>
        <div class="fl width" style="padding-bottom: 1rem;">
          <div class="fl reimbDetail-Reason-l ellipsis_name">报销事由</div>
          <div class="fr reimbDetail-Reason-r ellipsis_name_2" v-show="eOpen" ref="ellipsis2">{{ReimbursementDetail.cause}}</div>
          <div class="fr reimbDetail-Reason-r" v-show="eOpen1" ref="ellipsis2">{{ReimbursementDetail.cause}}</div>
          <div class="fr font-F89 reimbDetail-Reason-r" @click="elOpen" v-show="eOpen">展开</div>
          <div class="fr font-F89 reimbDetail-Reason-r" @click="elOpen1" v-show="eOpen1">收起</div>
        </div>
      </div>
    </div>
      <div class="fl width rei-Detailed-line bd-top bg-ff font-167" @click="vList">
        <div class="fl reimbDetail-Reason-l ellipsis_name" style="padding-left: 1.083333rem; ">报销发票</div>
        <img class="fr reimbDetail-right" src="../../assets/img/right.png" style="padding-right: 1.083333rem;"/>
        <div class="fr">共{{invoiceNum}}张</div>
      </div>
      <!--报销明细-->
      <div class="fl rei-Detailed width" v-for="(dtItem,index) in ReimbursementDetail.dtlList">
        <div class="rei-Detailed-title font-ipt pd1083">报销明细{{index+1}}</div>
        <div class="fl width bg-ff  rei-Detailed-border bd-btm">
        <div class="rei-Detailed-title rei-Detailed-line pd1083">
          <div class="fl font-167">金额(元)</div>
          <div class="fr font-125">{{dtItem.price | money}}</div>
        </div>
      </div>
        <div class="fl width bg-ff  rei-Detailed-border bd-btm" v-if="dtItem.categoryName!=undefined && dtItem.categoryName!='undefined' && dtItem.categoryName!=null && dtItem.categoryName!='null'">
        <div class="rei-Detailed-title rei-Detailed-line pd1083">
          <div class="fl font-167">费用类型</div>
          <div class="fr font-125">{{dtItem.categoryName}}</div>
        </div>
      </div>
        <div class="fl width bg-ff  rei-Detailed-border bd-btm">
        <div class="rei-Detailed-title rei-Detailed-line fl pd1083" style="width: 92%;">
          <div class="fl font-167">备注</div>
          <div class="fr font-125" style="line-height: 2rem;margin: 1rem 0;">{{dtItem.remark}}</div>
        </div>
      </div>
      </div>
    </div>
      <!--底部按钮   审批通过，待打款、已打款两种状态时底部隐藏-->
    <div v-if="ReimbursementDetail.status == 2 || ReimbursementDetail.status == '2' || ReimbursementDetail.status == 1 || ReimbursementDetail.status == '1'" class="fl font-F89 font-167 reimbDetail-bot-line pst-abs btm-0 cont width bg-ff">
      <div @click="alertChe">撤回</div>
      <!--<img class="reimbDetail-bot-line-img fl" style="width: 1px;" src="../../assets/img/Q_Modular/line@2x.png" />-->
      <!--<div class="fl rei-btn-width_r" @click="Printing">打印</div>-->
    </div>
    <div v-if="ReimbursementDetail.status == 4 || ReimbursementDetail.status == '4'" class="fl font-F89 font-167 reimbDetail-bot-line pst-abs btm-0 cont width bg-ff">
      <div class="fr rei-btn-width_r" @click="againAddCause(ReimbursementDetail.id)">重新发起</div>
    </div>
    <div v-if="ReimbursementDetail.status == 5 || ReimbursementDetail.status == '5'" class="fl font-F89 font-167 reimbDetail-bot-line pst-abs btm-0 cont width bg-ff">
      <div class="fl rei-btn-width" @click="alertDel">删除</div>
      <img class="reimbDetail-bot-line-img fl" style="width: 1px;" src="../../assets/img/Q_Modular/line@2x.png" />
      <div class="fl rei-btn-width_r" @click="againAddCause(ReimbursementDetail.id)">重新发起</div>
    </div>
    <section class="zz" v-show="requireDelBx">
      <div class="wrapcenter">
        <div class="wrapcenter_tips1 bg-ff">
          <div class="section_top1">确认删除报销单</div>
          <div class="section_bottom">
            <div class="qx_set bd-rt-ddd" :disabled="isDisable" @click="cDelList(reimburseId)">确定</div>
            <div class="qx_set font-fa" @click="cancelDel">取消</div>
          </div>
        </div>
      </div>
    </section>
    <section class="zz" v-show="CheHBx">
      <div class="wrapcenter">
        <div class="wrapcenter_tips bg-ff">
          <div class="section_top">确认撤回报销，撤回后需重新发起</div>
          <div class="section_bottom">
            <div class="qx_set bd-rt-ddd" :disabled="revokeReiDis" @click="withdraw(reimburseId)">确定</div>
            <div class="qx_set font-fa" @click="cancelCheH">取消</div>
          </div>
        </div>
      </div>
    </section>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="reimDetailError">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryReimburseDetail,revokeReimburse,delList,findReimburseView} from '@/api/user/SignOut'/*查询发票报销单详情接口 发票报销单撤回 报销单删除*/
  export default{
    data:function(){
      return {
        eOpen:true,/*展开收起*/
        eOpen1:false,
        withdrawR:false,/*审批中显示撤回和打印为true*/
        requireDelBx:false,//删除弹出框
        CheHBx:false,//撤回弹出框
        isDisable:false,
        revokeReiDis:false,
        reimburseId:"",//报销单id
        invoiceId:"",//发票id
        ReimbursementDetail:[],
        content:"",
        error_prompt:"",
        invoiceNum:0,
        topClass1:"fl overflow-s width",
        invoiceList:[],
      }
    },
    methods:{
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      elOpen(){
        this.$refs.ellipsis2.style.cssText = "display: block;";
        this.eOpen1 = true;
        this.eOpen = false
      },
      elOpen1(){
        this.$refs.ellipsis2.style.cssText = "display: -webkit-box;";
        this.eOpen1 = false;
        this.eOpen = true
      },
      vList(){
        if(this.reimburseId!=undefined && this.reimburseId!='undefined' && this.reimburseId!=null && this.reimburseId!="null"){
          this.$router.push({name:'list',params:{picUrls:this.invoiceList,BxMxId:this.reimburseId}});
        }else if(this.invoiceId!=undefined && this.invoiceId!="undefined" && this.invoiceId!=null && this.invoiceId!="null"){
          this.$router.push({name:'list',params:{picUrls:this.invoiceList,invoiceId:this.invoiceId}});
        }

      },
      //打印信息
      Printing(){
        this.$router.push({name:'approvalForm'});
      },
      /*报销单删除*/
      cDelList(id){
        let that = this;
        that.isDisable = true;
        setTimeout(function () {
          that.isDisable = false;
          that.requireDelBx = false;
          delList(localStorage.getItem("userID"),id).then(res => {
            if(res.data.code == 200){
              that.$router.push({name:'addministration',param:{status:"invalid"}});
            }else{
              that.error_prompt = "tel-message";
              that.content = res.data.msg;
            }
          },res => {
            that.error_prompt = "tel-message";
            that.content = res.data.msg;
          })
        },150)
      },
      //弹出删除框
      alertDel(){
        this.requireDelBx = true;
      },
      //取消删除
      cancelDel(){
        this.requireDelBx = false;
      },
      /*报销单撤回*/
      withdraw(id){
        let that = this;
        that.revokeReiDis = true;
        setTimeout(function () {
          that.revokeReiDis = false;
          that.CheHBx = false;
          var userID = localStorage.getItem("userID");
          revokeReimburse(userID,id).then(res => {
            if(res.data.code == 200){
              that.$router.push({name:'addministration',param:{status:"unapproved"}});
            }else{
              that.error_prompt = "tel-message";
              that.content = res.data.msg;
            }
          },res => {
            that.error_prompt = "tel-message";
            that.content = res.data.msg;
          })
        },150);
      },
      //弹出撤回框
      alertChe(){
          this.CheHBx = true;
      },
      //取消撤回报销
      cancelCheH(){
        this.CheHBx = false;
      },
      //重新发起报销单
      againAddCause(id){
        this.$router.push({name:'cause',params:{reimburseId:id}});
      },
      init(){
        if(this.$route.params.BxMxId!=undefined && this.$route.params.BxMxId!='undefined' && this.$route.params.BxMxId!=null && this.$route.params.BxMxId!="null"){
          this.reimburseId = this.$route.params.BxMxId;
          localStorage.setItem('BxMxId',this.$route.params.BxMxId);
          localStorage.setItem('invoiceId',undefined);
        }else{
            if(localStorage.getItem('BxMxId')!=undefined && localStorage.getItem('BxMxId')!=null && localStorage.getItem('BxMxId')!='' && localStorage.getItem('BxMxId')!='undefined'){
              this.reimburseId = localStorage.getItem('BxMxId');
            }
        }
        if(this.$route.params.invoiceId!=undefined && this.$route.params.invoiceId!='undefined' && this.$route.params.invoiceId!=null && this.$route.params.invoiceId!="null"){
          this.invoiceId = this.$route.params.invoiceId;
          localStorage.setItem('invoiceId',this.$route.params.invoiceId);
          localStorage.setItem('BxMxId',undefined);
        }else{
          if(localStorage.getItem('invoiceId')!=undefined && localStorage.getItem('invoiceId')!=null && localStorage.getItem('invoiceId')!='' && localStorage.getItem('invoiceId')!='undefined'){
            this.invoiceId = localStorage.getItem('invoiceId');
          }
        }
        let self = this;
        if(self.reimburseId!=undefined && self.reimburseId!='undefined' && self.reimburseId!=null && self.reimburseId!="null" && self.reimburseId!=''){
          queryReimburseDetail(localStorage.getItem("userID"),self.reimburseId).then(res => {
            if(res.data.code == 200){
              self.ReimbursementDetail = res.data.data;
              if(self.ReimbursementDetail.status!=2 && self.ReimbursementDetail.status!='2' && self.ReimbursementDetail.status!=1 && self.ReimbursementDetail.status!='1' && self.ReimbursementDetail.status!=4 && self.ReimbursementDetail.status!='4' && self.ReimbursementDetail.status!=5 && self.ReimbursementDetail.status!='5'){
                self.topClass1='fl overflow-s2 width';
              }else{
                self.topClass1='fl overflow-s width';
              }
              if(self.ReimbursementDetail.dtlList!=null && self.ReimbursementDetail.dtlList!=null && self.ReimbursementDetail.dtlList.length>0){
                for(let i=0;i<self.ReimbursementDetail.dtlList.length;i++){
                  if(self.ReimbursementDetail.dtlList[i].invoiceList!=null && self.ReimbursementDetail.dtlList[i].invoiceList.length>0){
                    self.invoiceNum += self.ReimbursementDetail.dtlList[i].invoiceList.length;
                    for(let j=0;j<self.ReimbursementDetail.dtlList[i].invoiceList.length;j++){
                      self.invoiceList.push(self.ReimbursementDetail.dtlList[i].invoiceList[j].picUrl);
                    }
                  }
                }
              }
            }else{
              self.error_prompt = "tel-message";
              self.content = res.data.msg;
            }
          },res => {
            self.error_prompt = "tel-message";
            self.content = res.data.msg;
          })
          //localStorage.setItem('reimburseId',this.reimburseId);
        }else{
            if(self.invoiceId!=undefined && self.invoiceId!="undefined" && self.invoiceId!=null && self.invoiceId!="null" && self.invoiceId!=''){
              findReimburseView(localStorage.getItem("userID"),self.invoiceId).then(res => {
                if(res.data.code == 0){
                  self.ReimbursementDetail = res.data.data;
                  if(self.ReimbursementDetail.status!=2 && self.ReimbursementDetail.status!='2' && self.ReimbursementDetail.status!=1 && self.ReimbursementDetail.status!='1' && self.ReimbursementDetail.status!=4 && self.ReimbursementDetail.status!='4' && self.ReimbursementDetail.status!=5 && self.ReimbursementDetail.status!='5'){
                    self.topClass1='fl overflow-s2 width';
                  }else{
                    self.topClass1='fl overflow-s width';
                  }
                  if(self.ReimbursementDetail.dtlList!=null && self.ReimbursementDetail.dtlList!=null && self.ReimbursementDetail.dtlList.length>0){
                    for(let i=0;i<self.ReimbursementDetail.dtlList.length;i++){
                      if(self.ReimbursementDetail.dtlList[i].invoiceList!=null && self.ReimbursementDetail.dtlList[i].invoiceList.length>0){
                        self.invoiceNum += self.ReimbursementDetail.dtlList[i].invoiceList.length;
                        for(let j=0;j<self.ReimbursementDetail.dtlList[i].invoiceList.length;j++){
                          self.invoiceList.push(self.ReimbursementDetail.dtlList[i].invoiceList[j].picUrl);
                        }
                      }
                    }
                  }
                }else{
                  self.error_prompt = "tel-message";
                  self.content = res.data.msg;
                }
              },res => {
                self.error_prompt = "tel-message";
                self.content = res.data.msg;
              })
            }
        }

      }
    },
    created(){
        this.init();
    },
    mounted () {
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      });
    },
  }
</script>
<style scoped>
  .reimbDetail .overflow-s{
    height: 93%;
    overflow-y: scroll;
  }
  .reimbDetail .overflow-s2{
    height: 100%;
    overflow-y: scroll;
  }
  .reimbDetail-div{
    padding: 1.666666667rem 1.0833333rem 0;
  }
  .reimbDetail-Reason{
    /*padding-top: 1.333333333rem;*/
    padding-bottom: 0.6666666667rem;
    border-bottom:1px solid #E5E5E5;
  }
  .reimbDetail .rei-info{
    font-size: 1.1666666667rem;
    line-height: 2rem;
    padding: 0.5rem 0;
  }
  .reimbDetail-Reason-l{
    width: 30%;
  }
  .reimbDetail-Reason-r{
   width:60%;
    padding-left: 2.5rem;
  }
  .rei-Detailed-title{
    font-size: 0.8333333rem;
    line-height: 2.8333333rem;
  }
  .rei-Detailed-line{
    line-height: 3.75rem;
  }
  .rei-Detailed-border:last-child{
    border-bottom:0;
  }
  .reimbDetail-bot-line{
    line-height: 3.75rem;
    height: 3.75rem;
  }
  .reimbDetail-bot-line-img{
    width: 1px;
    padding-top: 1rem;
  }
  .reimbDetail-bg-icon{
    right: 1rem;
    top: 1rem;
    width: 3rem;
  }
  .reimbDetail-right{
    width: 0.35rem;
    padding: 1.55rem 0 0 1rem;
  }
  .rei-btn-width{
    width: 39.733333%;
  }
  .rei-btn-width_r{
    width: 59.8%;
    background: #FFA436;
    color: #fff;
  }
  .reimbDetail #reimDetailError{
    display: block!important;
    margin-top: 26rem;
  }
  .img_seal_rem{
    width: 6.25rem;
    margin-top: -6rem;
    z-index: 0;
    text-align: left;
    margin-left: 76%;
  }
  .seal_div_rem{
    transform: rotate(-25deg);
    margin-left: 22.5rem;
    margin-top: -5.5rem;
    width: 20%;
  }
  .reimbDetail .wrapcenter .wrapcenter_tips1{
    width: 24.5rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .reimbDetail .zz .wrapcenter_tips1 .section_top1 {
    width: 59%;
    padding: 20px 20.5%;
    height: 3.9rem;
    font-weight: bold;
    text-align: center;
    font-size: 1.333rem;
    border-bottom: solid 0.083rem #DDDDDD;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .reimbDetail-Reason-r{
      padding-left: 0;
    }
    .reimbDetail-Reason-l {
      width: 35%;
    }
    .seal_div_rem{
      margin-left: 19.25rem;
      margin-top: -4.7rem;
    }
  }
</style>

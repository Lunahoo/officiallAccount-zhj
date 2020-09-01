<template xmlns="http://www.w3.org/1999/html">
  <!--<div class="Cause bg-f6 width height-942 padTop-308">-->
  <div class="Cause bg-f6 width height">
    <div class="Cause-conter1 fl width bg-f6" v-if="status == 'valid'">
      <div class="Cause-c-top bg-ff fl width mG-top067">
        <div class="page-tab">
          <div class="Cause-conter-circle fl" v-if="ReimbursementDetail.invoiceList.length!=0" v-for="(item,iTab) in ReimbursementDetail.invoiceList" :key="iTab">
            <img  :onerror="errorUserPhoto"  :src="item.picUrl"/>
            <p class="bg-189 cont font-col-b">{{iTab+1}}</p>
          </div>
        </div>
      </div>

      <!--报销状态-->
      <div class="Cause-c-main fl width bg-ff mG-top067">
        <div class="Cause-c-main-font pd133 height-325" v-if="reimburseId!=''&&reimburseId!=undefined">
          <p class="Cause-c-main-p font-96 bd-btm font-133">报销单状态</p>
        </div>
        <div class="ReimbursementState width-95 fl" v-for="(apply,index) in ReimbursementDetail.reimBLogList" :key="index">
          <div class="fl width">
            <div class="ReimbursementState-div fl time mG-top font-96"><p class="font-7b7 font-1">{{apply.createdTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p ></div>
            <div class="icon_status" v-if="index==0"><!-- v-if="index==0"-->
              <img v-if="apply.status == '5' || apply.status == 5" class="fl" src="../../assets/img/news/icon_launch@2x.png" />
              <img v-if="apply.status == '1'||apply.status == '3'||apply.status == '6' || apply.status == 1||apply.status == 3||apply.status == 6" class="fl" src="../../assets/img/news/icon_blue@2x.png" />
              <img v-if="apply.status == '0' || apply.status == 0" class="fl" src="../../assets/img/news/icon_ash@2x.png" />
              <img v-if="apply.status == '4' || apply.status == 4" class="fl" src="../../assets/img/news/icon_red@2x.png" />
            </div>
            <div class="icon_status" v-else="index!=0">
              <img class="fl" src="../../assets/img/news/icon_ash@2x.png" />
            </div>
            <div class="fl" v-if="index==0">
              <p style="max-width: 20rem;margin-top: 1rem" v-if="apply.status == '1'||apply.status == '3'||apply.status == '6' || apply.status == 1||apply.status == 3||apply.status == 6" class="font-189 font-108">{{apply.statusName}}</p >
              <p style="max-width: 20rem;margin-top: 1rem" v-if="apply.status == '4' || apply.status == 4" class="fontColor font-108">{{apply.statusName}}</p >
              <p style="max-width: 20rem;margin-top: 1rem" v-if="apply.status == '0' || apply.status == 0 || apply.status == '5' || apply.status == 5" class="font-96 font-108">{{apply.statusName}}</p >
              <p class="font-96 font-108">{{apply.approveMessage}}</p>
            </div>
            <div class="fl" v-if="index!=0">
              <p style="max-width: 20rem;margin-top: 1rem" class="font-7b7 font-108">{{apply.statusName}}</p >
              <p class="font-96 font-108">{{apply.approveMessage}}</p>
            </div>
          </div>
          <div v-show="index!=ReimbursementDetail.reimBLogList.length-1" class="xian">
            <div class="stateLine"></div>
          </div>
        </div>
      </div>
      <!--事由-->
      <div class="Cause-c-main fl width bg-ff mG-top067">
        <div class="Cause-c-main-font height-325 pd133">
          <p class="Cause-c-main-p font-96 font-133 fl">报销事由</p>
          <div v-show="lengthToLang">
            <p v-show="subSy" class="Cause-c-main-p font-133 font-fa cont-r" @click="lookAll">查看全部</p>
            <p v-show="!subSy" class="Cause-c-main-p font-133 font-fa cont-r" @click="takeUp">收起</p>
          </div>
        </div>
        <div class="Cause-c-main-text pd133">
          <div class="bd-top text-height width font-166 textStyle" readonly v-show="subSy">{{ReimbursementDetail.cause|subStrSy}}</div>
          <div class="text-height bd-btm width font-166 textStyle" readonly v-show="!subSy">{{ReimbursementDetail.cause}}</div>
        </div>
      </div>
      <!--合计-->
      <div class="Cause-c-main fl width bg-ff mG-top067">
        <div class="Cause-c-main-font height-325">
          <div class="Cause-footB-l fl">
            <div style="font-weight:bold;" class="font-125 pd133">合计 ¥<span class="font-133">{{ReimbursementDetail.price|money}}元</span></div>
          </div>
        </div>
      </div>
      <!--明细-->
      <div class="Cause-c-main fl width bg-ff mG-top067" v-if="mingxis.length>0">
        <div class="Cause-c-main-font height-325 page-tab pd133">
          <div class=" bd-btm">
            <div class="Cause-c-main-font baoxiao_detail" v-for="(mingxi,iMx) in mingxis" @click="editCheckMx(iMx,'mingxi_'+iMx)">
              <span v-if="iMx==0" name="BxMx" :id="'mingxi_'+iMx" class="Cause-c-main-p font-133 font-fa fl checked">报销明细{{iMx+1}}</span>
              <span v-else="iMx!=0" name="BxMx" :id="'mingxi_'+iMx" class="Cause-c-main-p font-96 font-133 fl">报销明细{{iMx+1}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="Cause-c-main fl width bg-ff" v-if="checkMx!=undefined">
        <div class="Cause-c-main-font height-325 pd133">
          <div class="Cause-c-main-p font-96 bd-btm font-133">{{checkMx.categoryName}}</div>
        </div>
        <div class="Cause-c-main-font height-325 pd133">
          <div class="Cause-c-main-p font-96 bd-btm font-133">{{checkMx.price|money}}元</div>
        </div>
        <div class="Cause-c-main-font height-325 pd133">
          <div class="Cause-c-main-p font-96 font-133">{{checkMx.remark}}</div>
        </div>
      </div>
    </div>
    <div class="Cause-conter fl width bg-f6" v-else="status != 'valid'">
      <div class="Cause-c-top bg-ff fl width mG-top067">
        <div class="page-tab">
          <div class="Cause-conter-circle fl" v-if="ReimbursementDetail.invoiceList.length!=0" v-for="(item,iTab) in ReimbursementDetail.invoiceList" :key="iTab">
            <img  :onerror="errorUserPhoto"  :src="item.picUrl"/>
            <p class="bg-189 cont font-col-b">{{iTab+1}}</p>
          </div>
        </div>
      </div>

      <!--报销状态-->
      <div class="Cause-c-main fl width bg-ff mG-top067">
        <div class="Cause-c-main-font pd133 height-325" v-if="reimburseId!=''&&reimburseId!=undefined">
          <p class="Cause-c-main-p font-96 bd-btm font-133">报销单状态</p>
        </div>
        <div class="ReimbursementState width-95 fl" v-for="(apply,index) in ReimbursementDetail.reimBLogList" :key="index">
          <div class="fl width">
            <div class="ReimbursementState-div fl time mG-top font-96"><p class="font-7b7 font-1">{{apply.createdTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p ></div>
            <div class="icon_status" v-if="index==0"><!-- v-if="index==0"-->
              <img v-if="apply.status == '5' || apply.status == 5" class="fl" src="../../assets/img/news/icon_launch@2x.png" />
              <img v-if="apply.status == '1'||apply.status == '3'||apply.status == '6' || apply.status == 1||apply.status == 3||apply.status == 6" class="fl" src="../../assets/img/news/icon_blue@2x.png" />
              <img v-if="apply.status == '0' || apply.status == 0" class="fl" src="../../assets/img/news/icon_ash@2x.png" />
              <img v-if="apply.status == '4' || apply.status == 4" class="fl" src="../../assets/img/news/icon_red@2x.png" />
            </div>
            <div class="icon_status" v-else="index!=0">
              <img class="fl" src="../../assets/img/news/icon_ash@2x.png" />
            </div>
            <div class="fl" v-if="index==0">
              <p style="max-width: 20rem;margin-top: 1rem" v-if="apply.status == '1'||apply.status == '3'||apply.status == '6' || apply.status == 1||apply.status == 3||apply.status == 6" class="font-189 font-108">{{apply.statusName}}</p >
              <p style="max-width: 20rem;margin-top: 1rem" v-if="apply.status == '4' || apply.status == 4" class="fontColor font-108">{{apply.statusName}}</p >
              <p style="max-width: 20rem;margin-top: 1rem" v-if="apply.status == '0' || apply.status == 0 || apply.status == '5' || apply.status == 5" class="font-96 font-108">{{apply.statusName}}</p >
              <p class="font-96 font-108">{{apply.approveMessage}}</p>
            </div>
            <div class="fl" v-if="index!=0">
              <p style="max-width: 20rem;margin-top: 1rem" class="font-7b7 font-108">{{apply.statusName}}</p >
              <p class="font-96 font-108">{{apply.approveMessage}}</p>
            </div>
          </div>
          <div v-show="index!=ReimbursementDetail.reimBLogList.length-1" class="xian">
            <div class="stateLine"></div>
          </div>
        </div>
      </div>
      <!--事由-->
      <div class="Cause-c-main fl width bg-ff mG-top067">
        <div class="Cause-c-main-font height-325 pd133">
          <p class="Cause-c-main-p font-96 font-133 fl">报销事由</p>
          <div v-show="lengthToLang">
            <p v-show="subSy" class="Cause-c-main-p font-133 font-fa cont-r" @click="lookAll">查看全部</p>
            <p v-show="!subSy" class="Cause-c-main-p font-133 font-fa cont-r" @click="takeUp">收起</p>
          </div>
        </div>
        <div class="Cause-c-main-text pd133">
          <div class="bd-top text-height width font-166 textStyle" readonly v-show="subSy">{{ReimbursementDetail.cause|subStrSy}}</div>
          <div class="text-height bd-btm width font-166 textStyle" readonly v-show="!subSy">{{ReimbursementDetail.cause}}</div>
        </div>
      </div>
      <!--合计-->
      <div class="Cause-c-main fl width bg-ff mG-top067">
        <div class="Cause-c-main-font height-325">
          <div class="Cause-footB-l fl">
            <div style="font-weight:bold;" class="font-125 pd133">合计 ¥<span class="font-133">{{ReimbursementDetail.price|money}}元</span></div>
          </div>
        </div>
      </div>
      <!--明细-->
      <div class="Cause-c-main fl width bg-ff mG-top067" v-if="mingxis.length>0">
        <div class="Cause-c-main-font height-325 page-tab pd133">
          <div class=" bd-btm">
            <div class="Cause-c-main-font baoxiao_detail" v-for="(mingxi,iMx) in mingxis" @click="editCheckMx(iMx,'mingxi_'+iMx)">
              <span v-if="iMx==0" name="BxMx" :id="'mingxi_'+iMx" class="Cause-c-main-p font-133 font-fa fl checked">报销明细{{iMx+1}}</span>
              <span v-else="iMx!=0" name="BxMx" :id="'mingxi_'+iMx" class="Cause-c-main-p font-96 font-133 fl">报销明细{{iMx+1}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="Cause-c-main fl width bg-ff" v-if="checkMx!=undefined">
        <div class="Cause-c-main-font height-325 pd133">
          <div class="Cause-c-main-p font-96 bd-btm font-133">{{checkMx.categoryName}}</div>
        </div>
        <div class="Cause-c-main-font height-325 pd133">
          <div class="Cause-c-main-p font-96 bd-btm font-133">{{checkMx.price|money}}元</div>
        </div>
        <div class="Cause-c-main-font height-325 pd133">
          <div class="Cause-c-main-p font-96 font-133">{{checkMx.remark}}</div>
        </div>
      </div>
    </div>
    <div class="Cause-footer fl width bg-ff" v-if="status == 'unapproved' || status == 'invalid'">
      <div class="btm_del btm-0 pos-left" v-if="status == 'unapproved'" style="overflow-y: auto;"><!--||status == 'valid'-->
        <div class="Cause-c-main-font bg-ff height-325">
          <div v-show="status == 'unapproved'" class="font-133 font-fa" style="border: 1px solid #e9e9e9;" @click="CheHBxBtn">撤回报销</div><!--待审批-->
          <!-- <div v-show="status == 'valid'" class="font-133" @click="requireDelBtn()">删除</div>--><!--有效报销单-->
        </div>
      </div>
      <div class="width fl bg-ff btm-0 pos-left" v-show="status == 'invalid'" style="overflow-y: auto;padding-top: 1.2rem;">
        <div class="width fl pd05"><!--width fl bg-f6 pd05-->
          <div class="fl font-133 cont" @click="requireDelBtn()">删除</div>
          <span @click="toCause(reimburseId)" class="fr fontCF cont font-col-b" style="display: block;width: 58%;border: none;outline: none;background: linear-gradient(to right,#FAAD14, #FA8C16);margin-right: 0.83333rem;">重新发起报销</span>
        </div><!--无效报销单-->
      </div>
    </div>
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
    <section class="zz" v-show="CheHBx">
      <div class="wrapcenter">
        <div class="wrapcenter_tips bg-ff">
          <div class="section_top">确认撤回报销，撤回后需重新发起</div>
          <div class="section_bottom">
            <div class="qx_set bd-rt-ddd" :disabled="revokeReiDis" @click="revokeReimburseBx(reimburseId)">确定</div>
            <div class="qx_set font-fa" @click="cancelCheH">取消</div>
          </div>
        </div>
      </div>
    </section>
    <section class="zz" v-show="requireDelBx">
      <div class="wrapcenter">
        <div class="wrapcenter_tips1 bg-ff">
          <div class="section_top1">确认删除报销单</div>
          <div class="section_bottom">
            <div class="qx_set bd-rt-ddd" :disabled="isDisable" @click="delBxMx(reimburseId)">确定</div>
            <div class="qx_set font-fa" @click="cancelDel">取消</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {queryReimburseDetail,delList,revokeReimburse} from '@/api/user/SignOut'
  export default {
    name: 'cause',
    data () {
      return {
        isDisable:false,
        revokeReiDis:false,
        errorUserPhoto:'this.src="' + require('../../assets/img/allApp/img_photo@2x.png') + '"',
        CauseMask:false,
        imgUrl: null,
        isEnlargeImage: false,
        requireDelBx:false,//确认删除
        CheHBx:false,//撤回报销
        subSy:true,//默认截取事由信息
        reimburseId:"",//报销单ID
        status:"",//报销单状态
        invoices:[],//报销发票集合
        lengthToLang:false,//事由长度足够长 true
        error_prompt:"",
        content:"",
        ReimbursementDetail:{
        },
        mingxis:[],
        checkMx:{

        },//当前选中报销明细
        tabList:[],
      }
    },
    components: {

    },
    created(){
      this.init();
      this.$root.$data.vBack=true;
      this.$root.$data.article = '报销单详情'
    },
    methods: {
      timer:function() {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      //撤回报销按钮
      CheHBxBtn(){
        this.CheHBx = true;
      },
      //取消撤回报销
      cancelCheH(){
        this.CheHBx = false;
      },
      init(){
        if(this.$route.params.BxMxId!=undefined && this.$route.params.BxMxId!=null && this.$route.params.BxMxId!=""){
          this.reimburseId = this.$route.params.BxMxId
          localStorage.setItem('reimburseId',this.reimburseId);
        }else{
          this.reimburseId = localStorage.getItem('reimburseId')
        }
        if(this.$route.params.status!=undefined && this.$route.params.status!=null && this.$route.params.status!=""){
          this.status = this.$route.params.status
          localStorage.setItem('status',this.status);
        }else{
          this.status = localStorage.getItem('status')
        }
        if(this.reimburseId!=undefined && this.reimburseId!="" && this.reimburseId!=null){
          queryReimburseDetail(localStorage.getItem("userID"),this.reimburseId).then(res => {
            if(res.data.code == 200){
              this.ReimbursementDetail = res.data.data;
              this.mingxis = res.data.data.dtlList
              //console.info(this.ReimbursementDetail.reimBLogList)
              this.checkMx = this.mingxis[0];
              /*if(res.data.data.remark!=null && res.data.data.remark!=''){
               this.conterNum = res.data.data.remark.length
               }*/
              if(this.ReimbursementDetail.cause.length>50){
                this.lengthToLang = true;
              }else{
                this.lengthToLang = false;
              }
              for(let i=0;i<this.mingxis.length;i++){
                this.ReimbursementDetail.price+=this.mingxis[i].price
              }
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res => {
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }
      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
      editCheckMx(id,MxId){
        this.checkMx = this.mingxis[id];
        let arrs = document.getElementsByName("BxMx");
        for(let i=0;i<arrs.length;i++){
          arrs[i].setAttribute('class','Cause-c-main-p font-96 font-133 fl')
        }
        document.getElementById(MxId).setAttribute('class','Cause-c-main-p font-133 font-fa fl checked')
      },
      lookAll(){
        this.subSy = false;
      },
      takeUp(){
        this.subSy = true
      },
      //重新发起报销
      toCause(reimburseId){
        this.$router.push({name:'cause',params:{reimburseId:reimburseId}});
      },
      //删除报销单按钮
      requireDelBtn(){
        this.requireDelBx = true;
      },
      //取消删除报销单
      cancelDel(){
        this.requireDelBx = false;
      },
      //确认删除报销单
      delBxMx(reimburseId){
          let that = this;
          that.isDisable = true;
          setTimeout(function () {
            that.isDisable = false;
            that.requireDelBx = false;
            if(reimburseId!=null && reimburseId!=undefined && reimburseId!=""){
              if(localStorage.getItem("userID")!=undefined && localStorage.getItem("userID")!=null && localStorage.getItem("userID")!=""){
                delList(localStorage.getItem("userID"),reimburseId).then(res => {
                  if(res.data.code == 200){
                    that.$router.push({name:'addministration',params:{status:"invalid"}});
                  }else{
                    that.error_prompt="tel-message";
                    that.content = res.data.msg;
                  }
                },res => {
                  that.error_prompt="tel-message";
                  that.content = res.data.msg;
                })
              }
            }else{
              that.error_prompt="tel-message";
              that.content = "未知报销单无法操作";
            }
          },150);
      },
      //撤回报销单
      revokeReimburseBx(reimburseId){
          let that = this;
        that.revokeReiDis = true;
        setTimeout(function () {
          that.revokeReiDis = false;
          that.CheHBx = false;
          revokeReimburse(localStorage.getItem("userID"),reimburseId).then(res => {
            if(res.data.code == 200){
              that.$router.push({name:'addministration',params:{status:"unapproved"}});
            }else{
              that.error_prompt="tel-message";
              that.content = res.data.msg;
            }
          },res => {
            that.error_prompt="tel-message";
            that.content = res.data.msg;
          })
        },150);
      },
      CauseDetailed(){
        this.CauseMask=true
      },
      CauseMaskGb(){
        this.CauseMask=false
      },
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    watch:{
    }

  }
</script>
<style scoped>
  .ReimbursementState .ReimbursementState-div{
    padding-bottom: 2rem;
  }
  /*图片右下角圆圈数量*/
  .Cause .Cause-conter-circle{
    width:33%;
    position:relative;
  }
  .Cause .Cause-conter-circle p{
    position: absolute;
    bottom: 0.6666666rem;
    right: 0;
    width: 1.3333rem;
    height: 1.33333rem;
    line-height: 1.33333rem;
    border-radius: 50%;
  }
  .page-tab {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    justify-content: center;
    margin-top: 0.5rem;
  }
  .Cause .Cause-conter{
    height: 90%;
    overflow-y: scroll;
  }
  .Cause .Cause-conter1{
    height: 100%;
    overflow-y: scroll;
  }
  .Cause .Cause-footer{
    height: 10%;
  }
  .Cause .Cause-footer .width .pd05{
   /*padding: 1.2rem 0;*/
  }
  .Cause .Cause-conter .Cause-c-top .page-tab{
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    justify-content: center;
  }
  .Cause .Cause-conter1 .Cause-c-top .page-tab{
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    justify-content: center;
  }
  .Cause .Cause-conter .Cause-c-top .page-tab img{
    box-sizing: border-box;
    width:100%;
    height: 7rem;
    margin-left: .5rem;
    display: initial;
  }
  .Cause .Cause-conter1 .Cause-c-top .page-tab img{
    box-sizing: border-box;
    width:100%;
    height: 7rem;
    margin-left: .5rem;
    display: initial;
  }
  .Cause .btm_del{
    background: rgb(246, 246, 246);
    width: 100%;
    text-align: center;
    line-height: 3.5rem;
    padding-top: 1rem;
    float: left;
    padding-bottom: 1rem;
  }
  .Cause .btm_del .Cause-c-main-font{
    margin: 0 1.08333rem;
  }
  .Cause .bg-ff .ReimbursementState{
    padding: 0.5rem 1.083333333rem;
  }
  .Cause .bg-ff .width .cont{
    font-size: 1.2rem;
    margin-left: 1.08333333rem;
    line-height: 2.833333333rem;
    border:1px solid #E5E5E5;
    width: 30%;
    border-radius:0.4rem;
  }
  .Cause .Cause-conter .Cause-c-main .ReimbursementState{
    position: relative;
  }
  .Cause .Cause-conter1 .Cause-c-main .ReimbursementState{
    position: relative;
  }
  .Cause .Cause-conter .Cause-c-main .ReimbursementState .xian{
    position: absolute;
    top: 3.6rem;
    left: 8.7rem;
  }
  .Cause .Cause-conter1 .Cause-c-main .ReimbursementState .xian{
    position: absolute;
    top: 3.6rem;
    left: 8.7rem;
  }
  .Cause .Cause-conter .Cause-c-main .ReimbursementState .width .icon_status .fl{
    padding:0 1rem;
    width: 1.4166666667rem;
    margin-top: 1rem;
  }
  .Cause .Cause-conter1 .Cause-c-main .ReimbursementState .width .icon_status .fl{
    padding:0 1rem;
    width: 1.4166666667rem;
    margin-top: 1rem;
  }
  .Cause .Cause-conter .Cause-c-main .ReimbursementState .xian .stateLine{
    height: 3.833333333rem;border-left: 1px solid #E5E5E5;
  }
  .Cause .Cause-conter1 .Cause-c-main .ReimbursementState .xian .stateLine{
    height: 3.833333333rem;border-left: 1px solid #E5E5E5;
  }
  .Cause .Cause-conter .Cause-c-main .ReimbursementState .width .time{
    padding-bottom: 2rem;
    width: 6rem;
    text-align: center;
  }
  .Cause .Cause-conter1 .Cause-c-main .ReimbursementState .width .time{
    padding-bottom: 2rem;
    width: 6rem;
    text-align: center;
  }
  .Cause .Cause-conter .Cause-c-main .Cause-c-main-font .baoxiao_detail{
    box-sizing: border-box;
    width: 23%;
    margin-left: .5rem;
    display: inline-flex;
  }
  .Cause .Cause-conter1 .Cause-c-main .Cause-c-main-font .baoxiao_detail{
    box-sizing: border-box;
    width: 23%;
    margin-left: .5rem;
    display: inline-flex;
  }
  .Cause .Cause-conter .Cause-c-main .Cause-c-main-font .Cause-c-main-font .Cause-c-main-p{
    width: 7rem;
    text-align: center;
  }
  .Cause .Cause-conter1 .Cause-c-main .Cause-c-main-font .Cause-c-main-font .Cause-c-main-p{
    width: 7rem;
    text-align: center;
  }
  .checked{
    border-bottom: 2px solid;
  }
  .Cause .zz .wrapcenter_tips,.Cause .zz .wrapcenter_tips1 {
    width: 24.5rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .Cause .zz .wrapcenter_tips .section_top {
    width: 59%;
    padding: 20px 20.5%;
    height: 3.9rem;
    font-weight: bold;
    text-align: center;
    font-size: 1.333rem;
    border-bottom: solid 0.083rem #DDDDDD;
  }
  .Cause .zz .wrapcenter_tips1 .section_top1 {
    width: 59%;
    padding: 20px 20.5%;
    height: 4.1rem;
    line-height: 4.1rem;
    font-weight: bold;
    text-align: center;
    font-size: 1.333rem;
    border-bottom: solid 0.083rem #DDDDDD;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .Cause .Cause-conter{
      height: 87%;
    }
    .Cause .Cause-footer{
      height: 13%;
    }
    .Cause .Cause-footer .width .pd05{
      /*padding: 1.2rem 0;*/
    }
  }
  @media screen and (max-width:815px)and (min-width: 450px){
    .Cause .Cause-conter{
      height: 85.5%;
    }
    .Cause .Cause-footer{
      height: 14.5%;
    }
    .Cause .Cause-footer .width .pd05{
      padding: 1.5rem 0;
    }
  }
</style>

<template>
  <div class="aircraft width height" style="background: #3B71AB"><!--背景色暂定-->
    <div v-if="invoiceData.invoiceStatus==4" style="padding: 0.67rem 1.5rem;line-height: 1.8rem;background: #FFF4E8;" class=" font-F89 font-167">
      <div class="width">错误信息：</div>
      <div class="width">发票图片不清晰</div>
    </div>
    <div class="invoiceDetails-div">
      <div class="invoiceDetails-title bg-ff">
        <div class="invoiceDetails-cont fl width">
          <img v-if="trainIcon" class="invoiceDetails-cont-img fl" src="../../assets/img/fill/icon_train@2x.png"/>
          <img v-if="!trainIcon" class="invoiceDetails-cont-img fl" src="../../assets/img/fill/icon_plane@2x.png"/>
          <div class="invoiceDetails-cont-top fl font-s15 font-b" v-if="trainIcon">火车票</div>
          <div class="invoiceDetails-cont-top fl font-s15 font-b" v-if="!trainIcon">飞机票</div>
        </div>
        <div class="bg-ff invoiceDetails-list fl pst-rlt width">
          <div class="invoiceDetails-ticket">
            <!--地址-->
            <div class="fl">
              <div class="fl invoiceDetails-ticket-size cont ellipsis_name" v-if="invoiceData.invoiceScheduleVo!=null &&invoiceData.invoiceScheduleVo!=undefined">{{invoiceData.startCityName}}</div>
              <div v-if="trainIcon&&invoiceData.invoiceScheduleVo!=null &&invoiceData.invoiceScheduleVo!=undefined" class="fl">
                <div v-if="invoiceData.invoiceScheduleVo.startCityName!=undefined && invoiceData.invoiceScheduleVo.startCityName!=''" class="fl font-133 cont invoiceDetails-aircraft">
                  <div class="">{{invoiceData.invoiceScheduleVo.flightNumber}}</div>
                  <img style="width: 7.25rem;" src="../../assets/img/fill/img_arrow@2x.png"/>
                </div>
                <div v-if="invoiceData.invoiceScheduleVo.startCityName==undefined || invoiceData.invoiceScheduleVo.startCityName==''" class="fl font-133 cont invoiceDetails-aircraft_absoult">
                  <div class="">{{invoiceData.invoiceScheduleVo.flightNumber}}</div>
                  <img style="width: 7.25rem;" src="../../assets/img/fill/img_arrow@2x.png"/>
                </div>
              </div>
              <div v-if="!trainIcon&&invoiceData.invoiceScheduleVo!=null &&invoiceData.invoiceScheduleVo!=undefined" class="fl">
                <div v-if="invoiceData.invoiceScheduleVo.startCityName!=undefined && invoiceData.invoiceScheduleVo.startCityName!=''" class="fl font-133 cont invoiceDetails-aircraft" style="padding: 1rem 0 0;width: 9rem;">
                  <img style="width: 9rem;" src="../../assets/img/fill/img_fly@2x.png"/>
                  <div class="">{{invoiceData.invoiceScheduleVo.flightNumber}}</div>
                </div>
                <div v-if="invoiceData.invoiceScheduleVo.startCityName==undefined || invoiceData.invoiceScheduleVo.startCityName==''" class="fl font-133 cont invoiceDetails-aircraft_absoult" style="padding: 1rem 0 0;width: 9rem;">
                  <img style="width: 9rem;" src="../../assets/img/fill/img_fly@2x.png"/>
                  <div class="">{{invoiceData.invoiceScheduleVo.flightNumber}}</div>
                </div>
              </div>
              <div class="fr invoiceDetails-ticket-size cont ellipsis_name">{{invoiceData.endCityName}}</div>
            </div>
            <!--时间-->
            <div class="fl font-133 air-invoice-padding" style="font-weight: 700;">
              <div class="air-invoice-padding-top" v-if="invoiceData.invoiceScheduleVo!=undefined && invoiceData.invoiceScheduleVo!=null">{{invoiceData.invoiceScheduleVo.scheduleDate | parseTime('{y}-{m}-{d}')}}</div><!--invoiceDate-->
              <div class=""><span class="font-1">￥</span>
                <span class="font-133" v-if="invoiceData.invoiceStatus==3 || invoiceData.invoiceStatus==10 || invoiceData.invoiceStatus==11">{{invoiceData.taxIncludedPrice|money}}</span>
                <span class="font-133" v-if="invoiceData.invoiceStatus!=3 && invoiceData.invoiceStatus!=10 && invoiceData.invoiceStatus!=11">{{invoiceData.invoiceAmt|money}}</span>
              </div>
            </div>
          </div>

          <div class="bg-ff invoiceDetails-list-mar pst-abs invoiceDetails-x-wid  font-108">
            <div class="invoiceDetails-x fl width" @click="viewPicture(invoiceData.picUrl)">
              <div class="fl invoiceDetails-list-x ellipsis_name">票据图片</div>
              <img class="fr invoiceDetails-x-img" src="../../assets/img/right.png"/>
            </div>
            <div v-if="invoiceData.state!=undefined && invoiceData.state==1">
              <div class="invoiceDetails-x fl width" @click="tosimpleRemiPage" v-if="invoiceData.invoiceStatus==3 ||invoiceData.invoiceStatus=='3'">
                <div class="fl invoiceDetails-list-x ellipsis_name">发起报销</div>
                <img class="fr invoiceDetails-x-img" src="../../assets/img/right.png"/>
              </div>
            </div>
            <div class="invoiceDetails-x fl width" @click="toCauseDeatilPage" v-if="invoiceData.invoiceStatus==10 ||invoiceData.invoiceStatus=='10' || invoiceData.invoiceStatus==11 ||invoiceData.invoiceStatus=='11'">
              <div class="fl invoiceDetails-list-x ellipsis_name">查看报销单</div>
              <img class="fr invoiceDetails-x-img" src="../../assets/img/right.png"/>
            </div>
          </div>
        </div>
        <div class="fl width" style="height: 1.75rem;background: #A6DDF9;    border-bottom-right-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;"></div>
        <div class="invoiceDetails-rei pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==1">待查验</div>
        <div class="invoiceDetails-rei pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==2">查验中</div><!--这几个暂时用v-show 之后改-->
        <div class="invoiceDetails-rei invoiceD-gre-color pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==3">可报销</div>
        <div class="invoiceDetails-rei invoiceD-rei-color pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==4">查验错误</div>
        <div class="invoiceDetails-rei pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==10">报销审批中</div>
        <div class="invoiceDetails-rei invoiceD-gre-color pos-right fl pst-abs font-1" v-if="invoiceData.invoiceStatus==11">已报销</div>
        <!--<div class="invoiceDetails-yu invoiceDetails-yu-l"></div>
        <div class="invoiceDetails-yu invoiceDetails-yu-r"></div>-->
      </div>
    </div>
    <div class="pst-abs btm-0 width cont bg-ff font-167 font-F89" style="line-height: 3.75rem;">
      <div v-if="invoiceData.invoiceStatus==4">
        <div class="fl" style="width: 50%;" @click="alertDelKuang">删除</div>
        <img src="../../assets/img/Q_Modular/line@2x.png" class="pst-abs" style="width: 1px;bottom: 1rem;left: 50%;"/>
        <div class="fr" style="width: 50%;">重新添加</div>
      </div>
      <div v-if="invoiceData.invoiceStatus==3" @click="alertDelKuang">
        <div class="fl width">删除</div>
      </div>
    </div>
    <section class="zz InvoiceRise width" v-show="addMaskSuccess">
      <div class="addET-mask bg-000 cont">
        <img class="addET-mask-img" src="../../assets/img/account/icon_Identification_success@2x.png" />
        <p class="font-col-b addET-mask-img-font">删除成功</p>
      </div>
    </section>
    <section class="zz" v-show="requireDelInvoice">
      <div class="wrapcenter">
        <div class="InvoiceDel_tips1 bg-ff">
          <div class="section_top1">确定删除该发票吗？</div>
          <div class="section_bottom">
            <div class="qx_set bd-rt-ddd" @click="delReimburseFun(invoiceData.id)">确定</div>
            <div class="qx_set font-fa" @click="cancelDel">取消</div>
          </div>
        </div>
      </div>
    </section>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="aircraft_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryInvoiceDetail} from '@/api/user/news'//查看详情接口8月10
  import {delReimburse} from '@/api/user/loginReg'// 删除发票接口
  export default {
    data() {
      return {
        testState:true,
        UnfoldS:true,
        RetractH:false,
        trainIcon:true,/*显示火车票时为true*/
        requireDelInvoice:false,//删除发票确认框
        invoiceId:"",
        status:"",
        accessToken:"",
        invoiceData:[],
        invoiceIds:[],
        addMaskSuccess:false,
        error_prompt:"",
        content:"",
        startCityName:"",
        endCityName:"",
      }
    },
    methods: {
      timer(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      getInvoiceDetail(){
        this.accessToken = localStorage.getItem('userID');
        if(this.invoiceId!="" && this.accessToken!=""){
          queryInvoiceDetail(this.accessToken,this.invoiceId).then(res =>{
            if(res.data.code == 200) {
              this.invoiceData = res.data.data;
              if(this.invoiceData.typeId == '5' || this.invoiceData.typeId == 5){
                this.trainIcon = true;
              }else{
                this.trainIcon = false;
              }
              if(this.invoiceData.invoiceScheduleVo!=undefined && this.invoiceData.invoiceScheduleVo!=null){
                this.invoiceData.endCityName =this.invoiceData.invoiceScheduleVo.endCityName;
                this.invoiceData.startCityName =this.invoiceData.invoiceScheduleVo.startCityName;
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
      //查看发票图片
      viewPicture(picUrl){
        let picUrls = [];
        picUrls[0] = picUrl;
        this.$router.push({name:'list',params:{picUrls:picUrls}});
      },
      //发起报销
      tosimpleRemiPage(){
        this.$router.push({name:'simpleReim'});
      },
      //查看报销单
      toCauseDeatilPage(){
        this.$router.push({name:'reimbDetail',params:{invoiceId:this.invoiceId}});
      },
      //弹出删除确认发票框
      alertDelKuang(){
        this.requireDelInvoice = true;
      },
      //取消删除发票
      cancelDel(){
        this.requireDelInvoice = false;
      },
      //删除发票
      delReimburseFun(id){
        this.invoiceIds.push(id);
        let accessToken = localStorage.getItem('userID');
        let self = this;
        self.requireDelInvoice = false;
        delReimburse(accessToken,self.invoiceIds).then(res =>{
          if(res.data.code == 200){
            self.addMaskSuccess = true;
            setTimeout(function () {
              self.addMaskSuccess = false;
              self.$router.push({name:"fill"});
            },300);
          }else{
            self.error_prompt="tel-message";
            self.content = res.data.msg;
          }
        })
      },
    },
    created(){
      if(this.$route.params.invoiceId!=undefined && this.$route.params.invoiceId!="null" && this.$route.params.invoiceId!="" && this.$route.params.invoiceId!=null){
        this.invoiceId = this.$route.params.invoiceId;
        localStorage.setItem('invoiceId',this.invoiceId);
      }else{
        if(localStorage.getItem('invoiceId')!=undefined && localStorage.getItem('invoiceId')!=null && localStorage.getItem('invoiceId')!="null" && localStorage.getItem('invoiceId')!=""){
          this.invoiceId = localStorage.getItem('invoiceId');
        }
      }
      if(this.$route.params.status!=undefined && this.$route.params.status!="null" && this.$route.params.status!="" && this.$route.params.status!=null){
        this.status = this.$route.params.status;
        localStorage.setItem('status',this.status);
      }else{
        if(localStorage.getItem('status')!=undefined && localStorage.getItem('status')!=null && localStorage.getItem('status')!="null" && localStorage.getItem('status')!=""){
          this.status = localStorage.getItem('status');
        }
      }
      this.getInvoiceDetail();
    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    }

  }
</script>
<style>
  .invoiceDetails-div{
    padding: 1rem 0.6666667rem 0
  }
  .invoiceDetails-k{
    height: 1rem;
    background: #3EA4EB;
    border-radius: 1rem;
  }
  .invoiceDetails-title{
    margin: 0 0.8333333rem;
    width: 90%;
    position: absolute;
    border-bottom-right-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
  }
  .invoiceDetails-cont{
    line-height: 4.3333333rem;
    height: 4.3333333rem;
    border-bottom: 1px dashed #f5f5f5;
  }
  .invoiceDetails-rei{
    top: 1.2rem;
    padding: 0.05rem 0.4rem;
    color: #F89114;
    background: #f9e8d5a8;
    margin-right: 1rem;
  }
  .invoiceD-rei-color{
    color: #FF4D4F;
    background:rgb(255,237,237);
  }
  .invoiceD-gre-color {
    color: #7CB305;
    background:rgb(241,247,230);
  }
  .invoiceDetails-yu{
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    position: absolute;
    background: #3B71AB;
    top: 3.85rem;
  }
  .invoiceDetails-yu-l{
    left: -0.6rem;
  }
  .invoiceDetails-yu-r{
    right: -0.6rem;
  }
  .invoiceDetails-list{/*火车票显示这个样式*/
    padding-top: 0.5rem;
    color: #000;
    background: url("../../assets/img/fill/img_train@2x.png")no-repeat 100% 100%;
    background-size: 100%;
  }
  .invoiceDetails-list1{/*飞机票显示这个*/
    padding-top:0;
    color: #000;
    background: url("../../assets/img/fill/img_plane@2x.png")no-repeat 100% 100%;
    background-size: 100%;
  }
  .invoiceDetails-list-mar{
    padding: 0 1.0833333rem;
    top: 18rem;
    line-height: 2.5rem;
    width:92%;
  }
  .invoiceDetails-x{
    border-bottom: 1px solid #F5F5F5;
    padding:0.5rem 0;
  }
  .invoiceDetails-list-x{
    width:67%;
  }
  .invoiceDetails-x-img {
    width: 0.5rem;
    padding-top: 0.75rem;
  }
  .invoiceDetails-x:last-child{
    border-bottom:0;
  }
  .invoiceDetails-x-title{
    line-height: 1rem;
    padding-top: 1rem;
  }
  .invoiceDetails-cont-img{
    width: 2.5rem;
    padding: 1rem;
  }
  .invoiceDetails-ticket-size{
    font-size: 1.75rem;
    padding: 0 .9666667rem;
    line-height: 3.5rem;
    min-width: 6.8rem;
    max-width: 7rem;
  }
  .invoiceDetails-aircraft{
    padding: 0.5rem 1.2rem 0;
  }
  .invoiceDetails-aircraft_absoult{
    position: absolute;
    top:50%;
    left:50%;
    width: 100px;
    height: 100px;
    margin:-50px 0 0 -50px;

  }
  .air-invoice-padding{
    padding:0 1rem 1rem;
  }
  .air-invoice-padding-top{
    padding: 1.8033333rem 0 1.5rem;
  }
  .aircraft .addET-mask{
    width: 10rem;
    height: 7rem;
    opacity: 0.6;
    margin-left: 34%;
    position: absolute;
    top: 15rem;
    border-radius: 5px;
  }
  .aircraft .addET-line-h .clearKong{
    margin-right: 1.75rem;
  }
  .aircraft .addET-mask .addET-mask-img{
    width: 2rem;
    padding-left: 38%;
    padding-top: 1.3rem;
  }
  .aircraft .addET-mask .addET-mask-img-font{
    padding-top: 0.8rem;
  }
  .wrapcenter .InvoiceDel_tips1{
    width: 24.5rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .wrapcenter .InvoiceDel_tips1 .section_top1 {
    width: 59%;
    padding: 20px 20.5%;
    height: 4.1rem;
    line-height: 4.1rem;
    font-weight: bold;
    text-align: center;
    font-size: 1.333rem;
    border-bottom: solid 0.083rem #DDDDDD;
  }
.tel-mess .juzhong #aircraft_format{
    display: block!important;
    margin-top: 1.5rem;
  }
  .invoiceDetails-cont .invoiceDetails-cont-top {
    color: black;
    box-shadow: none;
  }
  @media screen and (max-width:321px){
    .invoiceDetails-title{
      width:89%;
    }
    .invoiceDetails-ticket-size{
      min-width: 5rem;
      padding: 0 .666667rem;
    }
    .invoiceDetails-list-mar{
      padding: 0 0.93333rem;
      top: 16rem;
    }
    .invoiceDetails-list{
      padding-top:0;
    }
    .invoiceDetails-aircraft{
      padding: 0.6rem 1.2rem 0;
    }
    .invoiceDetails-x-wid{
      width:90%;
    }
  }
</style>

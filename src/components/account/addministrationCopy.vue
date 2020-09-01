<template>
  <div class="Administration width bg-ff height " @click="returnClass">
   <!-- <div class="captcha cont bg-ff width height-316 pst-abs pos-top z_index">
      <img class="captcha_img fl goCaptcha_img" @click="BxGoBack" src="../../assets/img/left.png">&lt;!&ndash;&ndash;&gt;
      <span class="captcha captcha_size font-125 pd-rt135 font-2a2a" style="font-weight: bold;">{{article}}</span>
    </div>-->
    <div class="Admin-title width" v-show="tab">
      <div class="Admin-title-farst bg-ff fl width cont font-167 bd-top pst-abs">
        <div id="Admin-list-stay" @click="stays" class="Admin-list fl">
          <div ref="farst" v-if="listC.status=='' || listC.status=='unapproved'" class="bd-btm-fa font-fa">审批中</div>
          <div ref="farst" v-else="listC.status!='' && listC.status!='unapproved'" class="bd-btm-fff font-ipt">审批中</div>
        </div>
        <div id="Admin-list-effective" @click="effectives" class="Admin-list fl ">
          <div ref="sec" v-if="listC.status=='valid'" class="bd-btm-fa font-fa">有效报销单</div>
          <div ref="sec" v-else="listC.status!='valid'" class="bd-btm-fff font-ipt">有效报销单</div>
        </div>
        <div id="Admin-list-Invalid" @click="Invalids" class="Admin-list fl">
          <div ref="frt" v-if="listC.status=='invalid'" class="bd-btm-fa font-fa">失效报销单</div>
          <div ref="frt"  v-else="listC.status!='invalid'" class="bd-btm-fff font-ipt">失效报销单</div>
        </div>
      </div>
    </div>
    <div class="Admin-title-He bg-f6 overflow-s">
    <div class="fillIn-comter1 cont" v-show="kong">
      <img src="../../assets/image/news/img_blank_page@2x.png" class="img_Bx">
      <p class="font-ipt pd-bt font-1">{{adminContent}}</p>
      <!--<div class="wrapcenter cont" v-show="!tab"><div @click="add" class="font-EB cont font-1 vouchersMarket">发起报销</div></div>-->
    </div>
    <!--审批中对应的页面-->
    <div v-show="dSp" class="Admin-mai fl width">
      <div class="Admin-main Admin-main1 fl width bg-f6"><!--style="margin-top: 3rem;"-->
        <div class="Admin-main-stay">
          <ul class="width Admin-m-s-top">
            <li class="list-item bg-ff" v-for="(item,index) in listAdmin " data-type="0" :key="index" @click="BxMxDetail(item.id,'unapproved')" >
              <div class="list-box">
                <div class="Admin_costType">
                  <p class="fl">{{item.categoryName}}</p>
                  <!--<p class="fr font-7b7">2018-09-12 10:30</p>-->
                  <p class="time fr font-7b7">{{item.updatedTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
                </div>
                <div class="tips E7A7A">报销总金额（元）：<span class="#2E2A2A font-b font-133">{{item.totalAmt|money}}</span></div>
                <div>
                  <div class="Admin-main-img fl">
                    <img src="../../assets/img/account/effective.png" />
                  </div>
                  <div class=" list-content-title fr">
                    <p class="title fl font-ipt font-3b9 font-167">{{item.statusName}}</p>
                  </div>
                </div>
                <!--<div class="list-content">
                  <div class=" list-content-title fr">
                    <p class="title fl font-ipt font-3b9 font-167">{{item.statusName}}</p>
                    <p class="tips fr"><span class="font-1">¥</span><span class="list-content-p">{{item.totalAmt|money}}</span></p>
                  </div>
                  <div class="list-content-text font-108 fr">
                    &lt;!&ndash;<p class="width ellipsis font-ipt font-1 timept">{{item.cause}}</p>&ndash;&gt;
                    <p class="time width ellipsis font-7b7">{{item.updatedTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
                  </div>
                </div>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--有效报销单-->
    <div v-show="yXbx" class="Admin-yXbx width fl">
      <div class="news fl font-fa">
        <img class="news-img fl" src="../../assets/img/account/horn.png" />
        <div class="news-font width">报销单已打款状态的请留意工资额度入账</div>
      </div>
      <div class="Admin-main Admin-main1 fl width bg-f6">
        <div class="Admin-main-stay">
          <ul class="width Admin-m-s-top">
            <li class="list-item bg-ff" v-for="(item,index) in listAdmin " data-type="0" :key="index" @click="BxMxDetail(item.id,'valid')">
              <div class="list-box">
                <div class="Admin_costType">
                  <p class="fl">{{item.categoryName}}</p>
                  <!--<p class="fr font-7b7">2018-09-12 10:30</p>-->
                  <p class="time fr font-7b7">{{item.updatedTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
                </div>
                <div class="tips E7A7A">报销总金额（元）：<span class="#2E2A2A font-b font-133">{{item.totalAmt|money}}</span></div>
                <div>
                  <div class="Admin-main-img fl">
                    <img src="../../assets/img/account/effective.png" />
                  </div>
                  <div class=" list-content-title fr">
                    <p class="title fl font-167 makeMoneygreenColor" v-if="item.status!='3'&& item.status!=3 && item.status!='6' && item.status!=6 && item.status!='7' && item.status!=7">{{item.statusName}}</p>
                    <p class="title fl font-167 font-F89" v-if="item.status=='3'|| item.status==3 || item.status=='6' || item.status==6 || item.status=='7' || item.status==7">待打款</p>
                   <!-- <p class="title fl font-167 makeMoneyYellowColor" v-if="item.statusName=='待打款'">{{item.statusName}}</p>-->
                  </div>
                </div>

                <!--<div class="Admin-main-img fl">
                  <img src="../../assets/img/account/effective.png" />
                </div>
                <div class="list-content">
                  <div class="bd-btm list-content-title fr height-325">
                    <p class="title fl font-ipt font-125">{{item.statusName}}</p>
                    <p class="tips fr"><span class="font-1">¥</span><span class="list-content-p">{{item.totalAmt|money}}</span></p>
                  </div>
                  <div class="list-content-text font-108 fr">
                    <p class="time width ellipsis font-ipt">{{item.cause}}</p>
                    <p class="time width ellipsis font-7b7">{{item.updatedTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
                  </div>
                </div>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--失效报销单-->
    <div v-show="wXbx" class="Admin-wXbx height">
      <div class="Admin-main Admin-main1 fl width bg-f6">
        <div class="Admin-main-stay" style="height: 95%;">
          <ul class="width Admin-m-s-top">
            <li class="list-item bg-ff" v-for="(item,index) in listAdmin " data-type="0" :key="index" @click="BxMxDetail(item.id,'invalid')">
              <div :id="'invalid'+item.id" class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">

                <div class="Admin_costType">
                  <p class="fl">{{item.categoryName}}</p>
                  <!--<p class="fr font-7b7">2018-09-12 10:30</p>-->
                  <p class="time fr font-7b7">{{item.updatedTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
                </div>
                <div class="tips E7A7A">报销总金额（元）：<span class="#2E2A2A font-b font-133">{{item.totalAmt|money}}</span></div>
                <div>
                  <div class="Admin-main-img fl">
                    <img src="../../assets/img/account/effective.png" />
                  </div>
                  <div class=" list-content-title fr">
                    <p class="title fl font-167 E7A7A" v-if="item.statusName!='已撤回'">{{item.statusName}}</p>
                    <p class="title fl font-167 font-22d" v-if="item.statusName=='已撤回'">{{item.statusName}}</p>
                  </div>
                </div>

                <!-- <div class="Admin-main-img fl">
                   <img src="../../assets/img/account/Invalid.png" />
                 </div>
                 <div class="list-content">
                   <div class="bd-btm list-content-title fr height-325">
                     <p class="title fl font-ipt font-125">{{item.statusName}}</p>
                     <p class="tips fr"><span class="font-1">¥</span><span class="list-content-p">{{item.totalAmt|money}}</span></p>
                   </div>
                   <div class="list-content-text font-108 fr">
                     <p class="time width ellipsis font-ipt">{{item.cause}}</p>
                     <p class="time width ellipsis font-7b7">{{item.updatedTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
                   </div>
                 </div>-->
              </div>
              <div class="delete cont font-col-b" @click.stop="deleteItem(item.id,'invalid'+item.id)" :data-index="index">删除</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    <div class="tel-mess" ref="telmess">
      <div class="juzhong">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
    <!--底部footer-->
    <div class="simpleReim_footer pst-abs width bg-ff">
      <section class="width pst-rlt">
        <div class="foot_left fl" @click="toSimpleReim">
          <div class="cont"><img src="../../assets/img/icon_SimpleReimbursement.png"></div>
          <p class="Imp font-a39 cont">简易报销</p>
        </div>
        <div class="foot_center fl pst-abs" @click="toFill3">
          <div class="cont"><img src="../../assets/img/icon_invoice.png"></div>
          <p class="Imp font-a39 cont">发票</p>
        </div>
        <div class="foot_right fr">
          <div class="cont"><img src="../../assets/img/icon_ReimbursementForm_pressed.png"></div>
          <p class="Imp font-F89 cont">报销单</p>
        </div>
      </section>
    </div>
    <!--发票底部栏-->
    <!--<div class="bxFootbar1 width bg-fa">-->
      <!--<div class="bxFootbar width">-->
        <!--<div class="" @click="add"><img class="bxFootbar1-img" src="../../assets/img/account/add.png" /></div>-->
        <!--<div class="bxFootbar-conter cont">-->
          <!--<div class="bxFootbar-icon fp fl" @click="toFpGl"><img src="../../assets/img/account/fp_.png"/><p class="font-075 font-a39">发票管理</p></div>-->
          <!--<div class="bxFootbar-icon bx fr"><img src="../../assets/img/account/bx_check.png" /><p class="font-075 font-fa">报销管理</p></div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <section class="zz" v-show="checkLoginShowAdd">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">您还没有归属企业，暂时不能使用该功能</div>
          <div class="section_bottom">
            <div class="qx_set1 font-fa" @click="addGoBack">知道了</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {nvoicesIList} from '@/api/user/SignOut'
  import {delList} from '@/api/user/SignOut'
  import {queryMemberNew,queryReimburseList} from '@/api/user/userLogin'
  export default {
    name: 'Administration',
    data() {
      return {
        article:"报销管理",
        checkLoginShowAdd:false,
        status:1,//状态
        pageNum:1,//页数
        pageSize:50,//大小
        tab:false,//tabTitle
        stay:false,
        Invalid:true,
        adminContent:"",
        dSp:false,
        yXbx:false,
        wXbx:false,
        kong:false,
        content:"",
        error_prompt:"",
        listC:{//参数
          status:'',//状态
          pageNum:'',//页数
          pageSize:'',//每页大小
          companyId:''
        },
        list : [

        ],
        listAdmin:{

        },
        sj:{

        },
        reimburseId:'',
        startX : 0 ,
        endX : 0 ,
        companyId:"",
      }
    },
    directives: {
      focus: {
        inserted: function () {
          document.getElementsByClassName("bt-font1")[0].style.cssText=" border-bottom: 1px solid #FA8C16";
        }
      }
    },
    created(){
      this.$root.$data.vBack=false;
     /* this.$root.$data.article = '报销管理';*/
      localStorage.setItem('BxMxId',undefined);
      localStorage.setItem('invoiceId',undefined);
      if(localStorage.getItem("companyId")!=undefined && localStorage.getItem("companyId")!='undefined' &&localStorage.getItem("companyId")!=null && localStorage.getItem("companyId")!="" && localStorage.getItem("companyId")!="null"){
        this.companyId = localStorage.getItem("companyId");
      }else{
        this.companyId = "";
      }
      this.listC.companyId = this.companyId;
      let url = window.location.href;
      this.toke = localStorage.getItem("userID");
      if(this.isWeixn()){
        if (url.indexOf('openid') > 0) {
          this.byOpenIdgetInfo(this.getOpenId(url),'addministration','50002');
        }else {
          if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
            this.byOpenIdgetInfo(localStorage.getItem('openId'),'addministration','50002');
          }else{
            this.byWechAtgetOpenId('one','50002',this.$root.$data.redirect_uri,'addministration')
          }
        }
      }else{
        if (this.toke != undefined && this.toke != null && this.toke != "" && this.toke!='null' && this.toke!='undefined') {
          this.AdministrationInit(this.toke);
        }else{
          localStorage.setItem("loginToPage",'addministration');
          this.$router.push({name:'login'});
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.fillIntimer,2000);
      })
    },
    methods:{
      addGoBack(){
          this.checkLoginShowAdd = false;
        this.$router.push({name:"home"});
      },
      fillIntimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      toSimpleReim(){
        this.$router.push({name:"simpleReim"})
      },
      toFill3(){
        this.$router.push({name:"fill"})
      },
      //返回事件
      BxGoBack(){
        this.$router.push({name:"home"})
      },
      AdministrationInit:function (accessToken) {
        if (accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined') {
          queryMemberNew(accessToken,"").then(res =>{
            if(res.data.code == 200){
              if(res.data.data.companyList!=null&&res.data.data.companyList!=""&&res.data.data.companyList!=undefined){ //企业用户
                this.listC.pageNum =this.pageNum;
                this.listC.pageSize =this.pageSize;
                nvoicesIList(accessToken,this.listC,this.companyId).then(res => {
                  if(res.data.code == 200) { //
                    //console.log(res);
                    if(res.data.data.records.length == 0 || res.data.data.records == undefined){
                      this.kong = true;
                      this.tab = false;
                      this.adminContent = "还没有发起过报销哦，空空如也～";
                    }else{
                      this.tab = true;
                      /*this.adminContent = "暂无内容";*/
                      if(this.$route.params.status!=undefined && this.$route.params.status!=null && this.$route.params.status!=""){
                        this.listC.status = this.$route.params.status
                      }else{
                        if(this.listC.status == "" || this.listC.status == null || this.listC.status == undefined){
                          this.listC.status ="unapproved";
                        }
                      }
                      nvoicesIList(accessToken,this.listC,this.companyId).then(res => {
                        if(res.data.code==200){
                          if(res.data.data.records.length == 0 || res.data.data.records == undefined){
                            this.kong = true;
                            this.dSp = false;
                            this.adminContent = "暂无内容";
                          }else{
                            this.listAdmin=res.data.data.records;
                            this.kong = false;
                            if(this.listC.status == '' || this.listC.status == 'unapproved'){
                              this.dSp = true;
                              this.yXbx = false;
                              this.wXbx=false;
                            }else if(this.listC.status == 'valid'){
                              this.dSp = false;
                              this.yXbx = true;
                              this.wXbx=false;
                            }else if(this.listC.status == 'invalid'){
                              this.dSp = false;
                              this.yXbx = false;
                              this.wXbx=true;
                            }
                          }
                        }
                      })
                    }
                  }else{
                    this.$message({
                      message: res.data.msg,
                      type: "warning"
                    });
                    this.kong = true;
                    this.tab = false
                  }
                },res => {
                  this.$message({
                    message: res.data.msg,
                    type: "warning"
                  });
                })
                this.yXbx=false;
                this.wXbx=false;
              }else{ //c端用户给提示
                /*this.Loading = false;*/
                this.checkLoginShowAdd = true;
              }
            }else{
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          },res =>{
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          })
        }else{
          localStorage.setItem("loginToPage",'addministration');
          this.$router.push({name: 'login'});
        }
      },
      add(){
        let isNull = true;
        let token = localStorage.getItem("userID");
        if(token!=undefined && token!=null && token!="") {
          queryReimburseList(token,this.companyId).then(res => {
            if(res.data.code == 200){
              //this.reimburseAmountVoList = res.data.data.reimburseAmountVoList;
              isNull = res.data.data.isNull;
              if(isNull){
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
            }else{
              this.error_prompt="tel-message";
              this.content = "无可报销额度";
            }
          },res => {
            this.error_prompt="tel-message";
            this.content = "无可报销额度";
          })
        }
      },
      toFpGl(){
        this.$router.push({name:"fill"})
      },
      stays:function () {
        this.toke = localStorage.getItem("userID");
        this.listC.status = "unapproved";
        this.listC.pageNum =this.pageNum;
        this.listC.pageSize =this.pageSize;
        nvoicesIList(this.toke,this.listC,this.companyId).then(res => {
          if(res.data.code==200){
            if(res.data.data.records.length == 0 || res.data.data.records == undefined){
              this.kong = true;
              this.dSp = false;
              this.adminContent = "暂无内容";
            }else{
              this.listAdmin=res.data.data.records;
              this.kong = false;
              this.dSp = true;
            }
          }
        },res => {
          //console.log(res.data);
          //   return false
        })
        this.yXbx=false;
        this.wXbx=false;
        this.$refs.farst.style.cssText=" border-bottom: 2px solid #FA8C16;color:#FA8C16";
        this.$refs.sec.style.cssText=" border-bottom: 2px solid #fff;color:#7E7A7A";
        this.$refs.frt.style.cssText=" border-bottom: 2px solid #fff;color:#7E7A7A";
      },
      effectives:function () {
        this.toke = localStorage.getItem("userID");
        this.listC.status = "valid";
        this.listC.pageNum =this.pageNum;
        this.listC.pageSize =this.pageSize;
        nvoicesIList(this.toke,this.listC,this.companyId).then(res => {
          if(res.data.code==200){
            if(res.data.data.records.length == 0 || res.data.data.records == undefined){
              this.kong = true;
              this.yXbx = false;
              this.adminContent = "暂无内容";
            }else{
              this.listAdmin=res.data.data.records;
              this.kong = false;
              this.yXbx = true;
            }
          }
        },res => {
          //console.log(res.data);
          //   return false
        })
        this.dSp=false;
        this.wXbx=false;
        this.$refs.farst.style.cssText=" border-bottom: 2px solid #fff;color:#7E7A7A";
        this.$refs.sec.style.cssText=" border-bottom: 2px solid #FA8C16;color:#FA8C16";
        this.$refs.frt.style.cssText=" border-bottom: 2px solid #fff;color:#7E7A7A";
      },
      Invalids:function () {
        this.toke = localStorage.getItem("userID");
        this.listC.status = "invalid";
        this.listC.pageNum =this.pageNum;
        this.listC.pageSize =this.pageSize;
        nvoicesIList(this.toke,this.listC,this.companyId).then(res => {
          if(res.data.code==200){
            if(res.data.data.records.length == 0 || res.data.data.records == undefined){
              this.kong = true;
              this.wXbx = false;
              this.adminContent = "暂无内容";
            }else{
              this.listAdmin=res.data.data.records;
              this.kong = false;
              this.wXbx = true;
            }
          }
        },res => {
          //console.log(res.data);
          //   return false
        })
        this.dSp=false;
        this.yXbx=false;
        this.$refs.farst.style.cssText=" border-bottom: 2px solid #fff;color:#7E7A7A";
        this.$refs.sec.style.cssText=" border-bottom: 2px solid #fff;color:#7E7A7A";
        this.$refs.frt.style.cssText=" border-bottom: 2px solid #FA8C16;color:#FA8C16";
      },
      //查看报销明细
      BxMxDetail(id,status){
        this.$router.push({name:'reimbDetail',params:{BxMxId:id,status:status}});
      },
      //跳转
      /* skip(){
       if( this.checkSlide() ){
       this.restSlide();
       }else{
       alert('You click the slide!')
       }
       },*/
      //滑动开始
      touchStart(e){
        // 记录初始位置
        this.startX = e.touches[0].clientX;
      },
      //滑动结束
      touchEnd(e){
        let parentElement = "";
          // 当前滑动的父级元素
          parentElement = e.currentTarget.parentElement;
          // 记录结束位置
          this.endX = e.changedTouches[0].clientX;
        // 左滑
        if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        // 右滑
        if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
          this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide(){
        let listItems = document.querySelectorAll('.list-item');
        for( let i = 0 ; i < listItems.length ; i++){
          if( listItems[i].dataset.type == 1 ) {
            return true;
          }
        }
        return false;
      },
      //复位滑动状态
      restSlide(){
        let listItems = document.querySelectorAll('.list-item');
        // 复位
        for( let i = 0 ; i < listItems.length ; i++){
          listItems[i].dataset.type = 0;
        }
      },
      returnClass(){
        this.restSlide()
      },
      //删除
      deleteItem(id,parentId){
        this.toke = localStorage.getItem("userID");
        let parentElement = document.getElementById(parentId)
        this.restSlide();
        parentElement.dataset.type = 0;
        delList(localStorage.getItem("userID"),id).then(res => {
          if(res.data.code == 200){
            this.listC.status = "invalid";
            /*this.init();*/
            this.Invalids();
          }else{
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        },res => {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        })
      }
    }
  }
</script>
<style scoped>
  .Admin-title-He{
    height:93%;
  }
  .Administration .captcha{
    height: 7%;
  }
  .Administration .tel-mess .juzhong #setPwd_format{
    display: block!important;
    /*margin-top: 1.5rem;*/
  }
  .Administration .fillIn-comter1 .img_Bx{
    width: 50%;
    padding-top: 38%;
    padding-left: 27%;
  }
  .fillIn-comter1 .font-ipt{
    margin-left: 0;
  }
  .fillIn-comter1 .wrapcenter .vouchersMarket{
    width:8.3333rem;
    height:2.083333rem;
    line-height:2.083333rem;
    border:solid 1px #FA8C16;
    border-radius:2.166665rem;
  }
  /*.bxFootbar1{*/          /*bxFootbar1*/
    /*height:7.5%;*/
  /*}*/
  /*.bxFootbar1 .bxFootbar{*/
    /*background: #FaFaFa;*/
    /*padding-top:3px;*/
    /*position:relative;*/

  /*}*/
  .Administration .Admin-m-s-top{
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    position: relative;
  }
  .Administration .Admin-m-s-top .Admin_costType{
    height:2rem;
    margin-top:1rem;
  }
  .Administration .Admin-m-s-top .Admin_costType p:first-of-type{
    font-size:1.4166666rem;
  }
  .Administration .Admin-m-s-top .Admin_costType p:last-of-type{
    margin-right:1.0833333rem;
  }
  .Administration .list-item{
    position: relative;
    height: 9.0833333333rem;
    transition: all 0.2s;
    width: 115%;
    margin: 0.5rem 0;
  }
  .Administration .list-item[data-type="0"]{
    transform: translate3d(0,0,0);
  }
  .Administration .list-item[data-type="1"]{
    transform: translate3d(-15%,0,0);
  }
  .Administration .list-box{
    width: 84%;
    position: absolute;
    top: 0;
    /*right: 1rem;*/
    bottom: 0;
    left: 1rem;
  }
  .Administration .list-item .title{
    /*display: block;*/
    /*overflow: hidden;*/
    /*font-weight: bold;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
  }
  .Administration .list-item .tips{
    margin:0.6rem 0;
    /*display: block;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    /*padding: 0 1.0833333rem 0 0;*/
  }
  .Administration .list-item .delete{
    width: 16%;
    height: 9.0833333rem;
    background: #ff4949;
    line-height: 9.0833333rem;
    position: absolute;
    top: 0;
    right: -1.2rem;
  }
  .list-content .list-content-p{
    font-size: 1.2rem;
    font-weight: bold;
  }
  .Administration .list-content-title,.list-content-text{
    width:91.5%;
  }
  .Administration .list-content-text .time{
    padding-top: 0.65rem;
  }
  .Administration .list-content-text .timept{
    padding-top: 0.666666rem;
  }
  /*.bxFootbar-conter .fp img, .bxFootbar-conter .bx img {*/
    /*padding-left: 42%;*/
  /*}*/
  /*.Administration .bxFootbar-conter .fp p,.bxFootbar-conter .bx p{*/
    /*line-height: 0.9rem;*/
  /*}*/
  /*.Administration .bxFootbar-icon{*/
    /*width:44%;*/
    /*padding-top: 0.3rem;*/
  /*}*/
  /*.Administration .bxFootbar-conter .fp img,.bxFootbar-conter .bx img{*/
    /*width: 2.3rem;*/
  /*}*/
  /*.bxFootbar-conter .fp, .bxFootbar-conter .bx {*/
    /*padding-top: 0.1rem;*/
  /*}*/
  /*底部footer*/
  .Administration .simpleReim_footer{
    left:0;
    bottom:0;
    box-shadow:1px 0 9px #8888882e;
    z-index:999;
  }
  .Administration .simpleReim_footer section{
    height:3.75rem;
  }
  .Administration .simpleReim_footer .foot_left div,.Imp{
    width:4rem;
  }
  .Administration .simpleReim_footer .Imp{
    font-size:0.75rem;
  }
  .Administration .simpleReim_footer p{
    transform:translateY(-5px);
  }
  .Administration .simpleReim_footer img{
    width:2.2rem;
    height:2.2rem;
    display: inline-block;
  }
  .Administration .simpleReim_footer .foot_left{
    margin-left:4.75rem;
    height:100%;
  }
  .Administration .simpleReim_footer .foot_center{
    height:100%;
    left:50%;
    top:0;
    transform:translateX(-50%);
  }
  .Administration .simpleReim_footer .foot_right{
    height:100%;
    margin-right:4.75rem;
  }
  .Admin-list {
    width:33.333333333%;
  }
  .Admin-list div{
    margin: 0 0.416667rem;
  }
  .Admin-main-stay{
    padding-top: 3.7rem;
    height:95%;
  }
  .Administration .Admin-title{
    line-height: 3.4rem;
  }
  .Administration .Admin-title .Admin-title-farst{
/*    top: 3.2rem;*/
    top: 0;
    z-index: 1;
    /*font-weight: bold;*/
    font-size: 1.1666666rem;
  }
  .Admin-main{
    margin: 0 0 0.133333333rem;
  }
  .Admin-main .Admin-main-img{
    width: 1.5rem;
    margin-top:0.2rem;
    /*padding: .8rem 0.8333333rem 0 0;*/
  }
  /*有效报销单*/
  .Admin-yXbx .news{
    line-height: 2.916666rem;
    height: 2.916666rem;
    padding: 0 1.0833333rem;
    background: #FFEBD5;
    margin-bottom: 0.3333333rem;
    width: 93%;
    display: none;
  }
  .Admin-yXbx .news .news-img{
    width: 1.25rem;
    padding-right: 1.166667rem;
    padding-top: 0.9rem;
  }
  .Admin-yXbx-conter .Admin-m-s-top .Admin-main-img{
    width: 1.25rem;
  }
  .Administration .makeMoneygreenColor{
    color:#36C626;
  }
  .Administration .makeMoneyYellowColor{
    color:#FFA436;
  }
  @media screen and (max-width:321px){
    .Administration .simpleReim_footer .foot_left{
      margin-left:3.75rem;
    }
    .Administration .simpleReim_footer .foot_right{
      margin-right:3.75rem;
    }
    .Admin-title-He{
      height:92.5%;
    }
    .bxFootbar1{
      height:8.5%;
    }
    /*.bxFootbar1 .bxFootbar .bxFootbar1-img{*/     /*bxFootbar1*/
      /*bottom: 0.2rem;*/
    /*}*/
    .Admin-main .Admin-main-img{
      margin-top:0;
    }
    .list-content-title,.list-content-text{
      width:91%;
    }
    .Admin-yXbx .news{
      width: 92%;
    }
    /*.bxFootbar-conter .fp img, .bxFootbar-conter .bx img {*/
      /*padding-left: 42%;*/
    /*}*/
    .Administration .list-content-title,.list-content-text{
      width:91%;
    }
    .fillIn-comter1 .font-ipt{
      margin-left: 0;
    }
    .Administration .list-item{
      height:8.5rem;
    }
    .Administration .list-content-text .time{
      padding-top: 0.6rem;
    }
    .bxFootbar-conter .fp, .bxFootbar-conter .bx {
      padding-top: 0.05rem;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .Admin-title-He{
      height:90.5%;
    }
    .bxFootbar1{
      height:9.5%;
    }
    .bxFootbar1 .bxFootbar .bxFootbar1-img{
      bottom: 0;
    }
    .bxFootbar-conter .fp, .bxFootbar-conter .bx {
      /*padding-top: 0.1rem;*/
    }
    .Admin-yXbx .news{
      width: 96.6%;
    }
    .Administration .list-item{
      width: 117.1%;
    }
    .Administration .list-item .tips{
      padding: 0.7rem 2.0833333rem 0 0;
    }
    .Administration .list-content-text .time{
      padding-top: 0.3rem;
    }
    .Admin-main .Admin-main-img{
      margin-top: .9rem;
    }
    .bxFootbar1 .bxFootbar{
      padding-top:0;

    }
    .bxFootbar-conter .fp, .bxFootbar-conter .bx {
      padding-top: 0.3rem;
    }
  }
</style>


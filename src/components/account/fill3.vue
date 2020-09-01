<template>
  <!--<div @click="hideTSK">-->
  <div @click="hideTSK" class="width height fl bg-f6">
    <div class="fillIn width height bg-f6">
      <div class="fl width bg-ff pst-abs font-1" v-if="initShowSearch" style="top: 0;z-index: 100">
        <div class="fl invoiceAdmin-title cont wrapcenter">
          <div class="fl" @click="fillState">状态筛选</div>
          <img v-show="state" class="fl invoiceAdmin-title-icon" src="../../assets/img/fill/icon_DropDown.png"/>
          <img v-show="stateClick" class="fl invoiceAdmin-title-icon" src="../../assets/img/fill/icon_DropDown_pressed.png"/>
          <img v-show="stateSelection" class="fl invoiceAdmin-title-icon" src="../../assets/img/fill/icon_PullUp_pressed.png"/>
        </div>
        <img class="fl invoiceAdmin-title-line" style="width: 1px;" src="../../assets/img/Q_Modular/line@2x.png"/>
        <div class="fl invoiceAdmin-title cont wrapcenter">
          <div class="fl" @click="fillVtype">类型筛选</div>
          <img v-show="Vtype" class="fl invoiceAdmin-title-icon" src="../../assets/img/fill/icon_DropDown.png"/>
          <img v-show="VtypeClick" class="fl invoiceAdmin-title-icon" src="../../assets/img/fill/icon_DropDown_pressed.png"/>
          <img v-show="VtypeSelection" class="fl invoiceAdmin-title-icon" src="../../assets/img/fill/icon_PullUp_pressed.png"/>
        </div>
      </div>
      <!--没有发票状态 v-if="this.listdata.length>0"-->
      <div class="fill_bill_head bg-f6">
        <div class="fillIn-comter cont" v-if="kong">
          <img src="../../assets/image/news/img_blank_page@2x.png" class="errorImg">
          <p class="font-ipt pd-bt">一张发票都没有，空空如也～</p>
          <span class="back_add font-EB" @click="tofillTypePage">去添加</span>
        </div>

        <div class="fillIn-Adminis" ref="kong" v-else="!kong">
          <!--有票状态-->
          <div class="fillIn-invoice fillIn-invoice1">
            <!--<div class="Budget">-->
                    <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData">
                      <div class="mG-top bg-f6" id="backstage" ref="backstage">
                        <div v-for="(item1,index1) in listdata" @click="toqueryInvoiceDetailPage(item1.id,item1.typeId)">
                            <p v-show="index1==0">{{item1.categoryName}}</p>
                            <p v-show="index1!=0 && item1.categoryName!=listdata[index1-1].categoryName">{{item1.categoryName}}</p>
                            <p v-show="item1.categoryName==null || item1.categoryName==''" style="height:1.5rem;"></p>
                          <div class="invoiceAdmin-main-p bg-ff fl font-1" v-show="index1 == 0 || item1.categoryName!=listdata[index1-1].categoryName">
                            <div class="fl" style="width:75%;">
                              <div class="fl">
                                <div class="fl width">
                                  <div v-if="item1.invoiceStatus != 3 && item1.invoiceStatus != 10 && item1.invoiceStatus != 11 && item1.invoiceStatus != '3' && item1.invoiceStatus != '10' && item1.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.invoiceAmt|money}}</div>
                                  <div v-if="item1.invoiceStatus == 3 || item1.invoiceStatus == 10 || item1.invoiceStatus == 11 ||item1.invoiceStatus == '3' || item1.invoiceStatus == '10' || item1.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.taxIncludedPrice|money}}</div>
                                  <img v-if="item1.invoiceStatus != 3 && item1.invoiceStatus != 10 && item1.invoiceStatus != 11 && item1.invoiceStatus != '3' && item1.invoiceStatus != '10' && item1.invoiceStatus != '11'" class="taxFree" src="../../assets/img/account/icon_ExcludingTax.png"/>
                                </div>
                                <div class="font-7b7 width" v-if="item1.typeId==1||item1.typeId==2||item1.typeId==3||item1.typeId==6||item1.typeId==9||item1.typeId=='1'||item1.typeId=='2'||item1.typeId=='3'||item1.typeId=='6'||item1.typeId=='9'">开票日期：{{item1.invoiceDate| parseTime('{y}-{m}-{d}')}}</div>
                                <div class="font-7b7 width" v-if="item1.typeId==4||item1.typeId==5||item1.typeId=='4'||item1.typeId=='5'">行程日期：
                                  <span v-if="item1.invoiceScheduleVo!=undefined && item1.invoiceScheduleVo!=null">
                                    {{item1.invoiceScheduleVo.scheduleDate| parseTime('{y}-{m}-{d}')}}
                                  </span>
                                </div>
                              </div>
                              <div class="invoiceAdmin-main-name E7A7A">
                                <div style="margin-top: -1rem;" v-if="item1.typeId != 4 && item1.typeId != '4' && item1.typeId != 5 && item1.typeId != '5' && item1.typeId != 6 && item1.typeId != '6' && item1.typeId != '7'&& item1.typeId != 7">
                                  <span v-if="item1.invoiceStatus!=10 && item1.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.invoiceTitleName}}</span>
                                  <div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'">
                                  <!--<div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'|| item1.typeId ==9 ||item1.typeId == '9'">-->
                                    <span v-if="item1.invoiceStatus==3 || item1.invoiceStatus=='3' || item1.invoiceStatus==11 || item1.invoiceStatus=='11'" class="ellipsis_name">收款方: {{item1.salesName}}</span>
                                  </div>
                                </div>
                                <div style="margin-top: -1rem;"  v-if="item1.typeId == 4 || item1.typeId == '4' || item1.typeId == 5 || item1.typeId == '5'">
                                  <div v-if="item1.invoiceScheduleVo!=null &&item1.invoiceScheduleVo!=undefined" class="fl">
                                    <span class="fl min_width4">{{item1.invoiceScheduleVo.startCityName}}</span>
                                    <img class="fl" style="width: 17%;margin-top: 1rem" src="../../assets/img/fill/img_arrow@2x.png"/>
                                    <span class="min_width4" style="margin-left: 1rem">{{item1.invoiceScheduleVo.endCityName}}</span>
                                  </div>
                                  <div v-if="item1.invoiceScheduleVo==null ||item1.invoiceScheduleVo==undefined"><img style="width: 12%" src="../../assets/img/fill/img_arrow@2x.png"/></div>
                                </div>
                              </div>
                            </div>
                            <div class="fr" v-if="item1.invoiceStatus==1 || item1.invoiceStatus=='1'"><span class="color-7cb">待查验</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==2 || item1.invoiceStatus=='2'"><span class="color-7cb">查验中</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==3 || item1.invoiceStatus=='3'"><span class="color-7cb">可报销</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==4 || item1.invoiceStatus=='4'"><span class="font-22d">查验错误</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==10 || item1.invoiceStatus=='10'"><span class="font-F89">报销审批中</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==11 || item1.invoiceStatus=='11'"><span class="font-F89">已报销</span></div>
                            <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                            <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
                          </div>
                          <div class="invoiceAdmin-main-p bg-ff fl font-1" v-show="index1 != 0 && item1.categoryName==listdata[index1-1].categoryName" style="margin-top: 1rem;">
                            <div class="fl" style="width:75%;" >
                              <div class="fl">
                                <div class="fl width">
                                  <div v-if="item1.invoiceStatus != 3 && item1.invoiceStatus != 10 && item1.invoiceStatus != 11 && item1.invoiceStatus != '3' && item1.invoiceStatus != '10' && item1.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.invoiceAmt|money}}</div>
                                  <div v-if="item1.invoiceStatus == 3 || item1.invoiceStatus == 10 || item1.invoiceStatus == 11 ||item1.invoiceStatus == '3' || item1.invoiceStatus == '10' || item1.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.taxIncludedPrice|money}}</div>
                                  <img v-if="item1.invoiceStatus != 3 && item1.invoiceStatus != 10 && item1.invoiceStatus != 11 && item1.invoiceStatus != '3' && item1.invoiceStatus != '10' && item1.invoiceStatus != '11'" class="taxFree" src="../../assets/img/account/icon_ExcludingTax.png"/>
                                </div>
                                <div class="font-7b7 width" v-if="item1.typeId==1||item1.typeId==2||item1.typeId==3||item1.typeId==6||item1.typeId==9||item1.typeId=='1'||item1.typeId=='2'||item1.typeId=='3'||item1.typeId=='6'||item1.typeId=='9'">开票日期：{{item1.invoiceDate| parseTime('{y}-{m}-{d}')}}</div>
                                <div class="font-7b7 width" v-if="item1.typeId==4||item1.typeId==5||item1.typeId=='4'||item1.typeId=='5'">行程日期：
                                  <span v-if="item1.invoiceScheduleVo!=undefined && item1.invoiceScheduleVo!=null">
                                    {{item1.invoiceScheduleVo.scheduleDate| parseTime('{y}-{m}-{d}')}}
                                  </span>
                                </div>
                              </div>
                              <div class="invoiceAdmin-main-name E7A7A">
                                <div style="margin-top: -1rem;" v-if="item1.typeId != 4 && item1.typeId != '4' && item1.typeId != 5 && item1.typeId != '5' && item1.typeId != 6 && item1.typeId != '6' && item1.typeId != '7'&& item1.typeId != 7">
                                  <span v-if="item1.invoiceStatus!=10 && item1.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.invoiceTitleName}}</span>
                                  <div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'">
                                  <!--<div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'|| item1.typeId ==9 ||item1.typeId == '9'">-->
                                    <span v-if="item1.invoiceStatus==3 || item1.invoiceStatus=='3' || item1.invoiceStatus==11 || item1.invoiceStatus=='11'" class="ellipsis_name">收款方: {{item1.salesName}}</span>
                                  </div>
                                </div>
                                <div style="margin-top: -1rem;"  v-if="item1.typeId == 4 || item1.typeId == '4' || item1.typeId == 5 || item1.typeId == '5'">
                                  <div v-if="item1.invoiceScheduleVo!=null &&item1.invoiceScheduleVo!=undefined" class="fl">
                                    <span class="fl min_width4">{{item1.invoiceScheduleVo.startCityName}}</span>
                                    <img class="fl" style="width: 17%;margin-top: 1rem" src="../../assets/img/fill/img_arrow@2x.png"/>
                                    <span class="min_width4" style="margin-left: 1rem">{{item1.invoiceScheduleVo.endCityName}}</span>
                                  </div>
                                  <span v-if="item1.invoiceScheduleVo==null ||item1.invoiceScheduleVo==undefined"><img style="width: 12%" src="../../assets/img/fill/img_arrow@2x.png"/></span>
                                </div>
                              </div>
                            </div>
                            <div class="fr" v-if="item1.invoiceStatus==1 || item1.invoiceStatus=='1'"><span class="color-7cb">待查验</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==2 || item1.invoiceStatus=='2'"><span class="color-7cb">查验中</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==3 || item1.invoiceStatus=='3'"><span class="color-7cb">可报销</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==4 || item1.invoiceStatus=='4'"><span class="font-22d">查验错误</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==10 || item1.invoiceStatus=='10'"><span class="font-F89">报销审批中</span></div>
                            <div class="fr" v-if="item1.invoiceStatus==11 || item1.invoiceStatus=='11'"><span class="font-F89">已报销</span></div>
                            <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                            <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
                          </div>
                        </div>
                        <div v-for="(item1,index1) in downdata" :key="index1" @click="toqueryInvoiceDetailPage(item1.name.id,item1.name.typeId)">
                          <div v-if="index1 == 0">
                            <p v-show="item1.name.categoryName!=listdata[listdata.length-1].categoryName">{{item1.name.categoryName}}</p>
                            <p v-show="item1.name.categoryName==null || item1.name.categoryName==''" style="height:1.5rem;"></p>
                            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="item1.name.categoryName!=null && item1.name.categoryName!='' && item1.name.categoryName!=listdata[listdata.length-1].categoryName">
                              <div class="fl" style="width:75%;" >
                                <div class="fl">
                                  <div class="fl width">
                                    <div v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.invoiceAmt|money}}</div>
                                    <div v-if="item1.name.invoiceStatus == 3 || item1.name.invoiceStatus == 10 || item1.name.invoiceStatus == 11 || item1.name.invoiceStatus == '3' || item1.name.invoiceStatus == '10' || item1.name.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.taxIncludedPrice|money}}</div>
                                    <img v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="taxFree" src="../../assets/img/account/icon_ExcludingTax.png"/>
                                  </div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==1||item1.name.typeId==2||item1.name.typeId==3||item1.name.typeId==6||item1.name.typeId==9||item1.name.typeId=='1'||item1.name.typeId=='2'||item1.name.typeId=='3'||item1.name.typeId=='6'||item1.name.typeId=='9'">开票日期：{{item1.name.invoiceDate| parseTime('{y}-{m}-{d}')}}</div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==4||item1.name.typeId==5||item1.name.typeId=='4'||item1.name.typeId=='5'">行程日期：
                                    <span v-if="item1.name.invoiceScheduleVo!=undefined && item1.name.invoiceScheduleVo!=null">
                                    {{item1.name.invoiceScheduleVo.scheduleDate| parseTime('{y}-{m}-{d}')}}
                                    </span>
                                  </div>
                                </div>
                                <div class="invoiceAdmin-main-name E7A7A">
                                  <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                                    <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                                    <div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'">
                                    <!--<div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'|| item1.name.typeId ==9 ||item1.name.typeId == '9'">-->
                                      <span v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3' || item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'" class="ellipsis_name">收款方: {{item1.name.salesName}}</span>
                                    </div>
                                  </div>
                                  <div style="margin-top: -1rem;"  v-if="item1.name.typeId == 4 || item1.name.typeId == '4' || item1.name.typeId == 5 || item1.name.typeId == '5'">
                                    <div v-if="item1.name.invoiceScheduleVo!=null &&item1.name.invoiceScheduleVo!=undefined" class="fl">
                                      <span class="fl min_width4">{{item1.name.invoiceScheduleVo.startCityName}}</span>
                                      <img class="fl" style="width: 17%;margin-top: 1rem" src="../../assets/img/fill/img_arrow@2x.png"/>
                                      <span class="min_width4" style="margin-left: 1rem">{{item1.name.invoiceScheduleVo.endCityName}}</span>
                                    </div>
                                    <span v-if="item1.name.invoiceScheduleVo==null ||item1.name.invoiceScheduleVo==undefined"><img style="width: 12%" src="../../assets/img/fill/img_arrow@2x.png"/></span>
                                  </div>
                                </div>
                              </div>
                              <div class="fr" v-if="item1.name.invoiceStatus==1 || item1.name.invoiceStatus=='1'"><span class="color-7cb">待查验</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==2 || item1.name.invoiceStatus=='2'"><span class="color-7cb">查验中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3'"><span class="color-7cb">可报销</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==4 || item1.name.invoiceStatus=='4'"><span class="font-22d">查验错误</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==10 || item1.name.invoiceStatus=='10'"><span class="font-F89">报销审批中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'"><span class="font-F89">已报销</span></div>
                              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                              <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                            </div>
                            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="item1.name.categoryName==listdata[listdata.length-1].categoryName" style="margin-top: 1rem;">
                              <div class="fl" style="width:75%;" >
                                <div class="fl">
                                  <div class="fl width">
                                    <div v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.invoiceAmt|money}}</div>
                                    <div v-if="item1.name.invoiceStatus == 3 || item1.name.invoiceStatus == 10 || item1.name.invoiceStatus == 11 || item1.name.invoiceStatus == '3' || item1.name.invoiceStatus == '10' || item1.name.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.taxIncludedPrice|money}}</div>
                                    <img v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="taxFree" src="../../assets/img/account/icon_ExcludingTax.png"/>
                                  </div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==1||item1.name.typeId==2||item1.name.typeId==3||item1.name.typeId==6||item1.name.typeId==9||item1.name.typeId=='1'||item1.name.typeId=='2'||item1.name.typeId=='3'||item1.name.typeId=='6'||item1.name.typeId=='9'">开票日期：{{item1.name.invoiceDate| parseTime('{y}-{m}-{d}')}}</div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==4||item1.name.typeId==5||item1.name.typeId=='4'||item1.name.typeId=='5'">行程日期：
                                    <span v-if="item1.name.invoiceScheduleVo!=undefined && item1.name.invoiceScheduleVo!=null">
                                      {{item1.name.invoiceScheduleVo.scheduleDate| parseTime('{y}-{m}-{d}')}}
                                    </span>
                                  </div>
                                </div>
                                <div class="invoiceAdmin-main-name E7A7A">
                                  <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                                    <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                                    <div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'">
                                    <!--<div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'|| item1.name.typeId ==9 ||item1.name.typeId == '9'">-->
                                      <span v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3' || item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'" class="ellipsis_name">收款方: {{item1.name.salesName}}</span>
                                    </div>
                                  </div>
                                  <div style="margin-top: -1rem;"  v-if="item1.name.typeId == 4 || item1.name.typeId == '4' || item1.name.typeId == 5 || item1.name.typeId == '5'">
                                    <div v-if="item1.name.invoiceScheduleVo!=null &&item1.name.invoiceScheduleVo!=undefined" class="fl">
                                      <span class="fl min_width4">{{item1.name.invoiceScheduleVo.startCityName}}</span>
                                      <img class="fl" style="width: 17%;margin-top: 1rem" src="../../assets/img/fill/img_arrow@2x.png"/>
                                      <span class="min_width4" style="margin-left: 1rem">{{item1.name.invoiceScheduleVo.endCityName}}</span>
                                    </div>
                                    <span v-if="item1.name.invoiceScheduleVo==null ||item1.name.invoiceScheduleVo==undefined"><img style="width: 12%" src="../../assets/img/fill/img_arrow@2x.png"/></span>
                                  </div>
                                </div>
                              </div>
                              <div class="fr" v-if="item1.name.invoiceStatus==1 || item1.name.invoiceStatus=='1'"><span class="color-7cb">待查验</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==2 || item1.name.invoiceStatus=='2'"><span class="color-7cb">查验中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3'"><span class="color-7cb">可报销</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==4 || item1.name.invoiceStatus=='4'"><span class="font-22d">查验错误</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==10 || item1.name.invoiceStatus=='10'"><span class="font-F89">报销审批中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'"><span class="font-F89">已报销</span></div>
                              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                              <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                            </div>
                            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="item1.name.categoryName==null || item1.name.categoryName==''" style="margin-top: 1rem;">
                              <div class="fl" style="width:75%;" >
                                <div class="fl">
                                  <div class="fl width">
                                    <div v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.invoiceAmt|money}}</div>
                                    <div v-if="item1.name.invoiceStatus == 3 || item1.name.invoiceStatus == 10 || item1.name.invoiceStatus == 11 || item1.name.invoiceStatus == '3' || item1.name.invoiceStatus == '10' || item1.name.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.taxIncludedPrice|money}}</div>
                                    <img v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="taxFree" src="../../assets/img/account/icon_ExcludingTax.png"/>
                                  </div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==1||item1.name.typeId==2||item1.name.typeId==3||item1.name.typeId==6||item1.name.typeId==9||item1.name.typeId=='1'||item1.name.typeId=='2'||item1.name.typeId=='3'||item1.name.typeId=='6'||item1.name.typeId=='9'">开票日期：{{item1.name.invoiceDate| parseTime('{y}-{m}-{d}')}}</div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==4||item1.name.typeId==5||item1.name.typeId=='4'||item1.name.typeId=='5'">行程日期：
                                    <span v-if="item1.name.invoiceScheduleVo!=undefined && item1.name.invoiceScheduleVo!=null">
                                      {{item1.name.invoiceScheduleVo.scheduleDate| parseTime('{y}-{m}-{d}')}}
                                    </span>
                                  </div>
                                </div>
                                <div class="invoiceAdmin-main-name E7A7A">
                                  <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                                    <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                                    <div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'">
                                    <!--<div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'|| item1.name.typeId ==9 ||item1.name.typeId == '9'">-->
                                      <span v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3' || item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'" class="ellipsis_name">收款方: {{item1.name.salesName}}</span>
                                    </div>
                                  </div>
                                  <div style="margin-top: -1rem;"  v-if="item1.name.typeId == 4 || item1.name.typeId == '4' || item1.name.typeId == 5 || item1.name.typeId == '5'">
                                    <div v-if="item1.name.invoiceScheduleVo!=null &&item1.name.invoiceScheduleVo!=undefined" class="fl">
                                      <span class="fl min_width4">{{item1.name.invoiceScheduleVo.startCityName}}</span>
                                      <img class="fl" style="width: 17%;margin-top: 1rem" src="../../assets/img/fill/img_arrow@2x.png"/>
                                      <span class="min_width4" style="margin-left: 1rem">{{item1.name.invoiceScheduleVo.endCityName}}</span>
                                    </div>
                                    <span v-if="item1.name.invoiceScheduleVo==null ||item1.name.invoiceScheduleVo==undefined"><img style="width: 12%" src="../../assets/img/fill/img_arrow@2x.png"/></span>
                                  </div>
                                </div>
                              </div>
                              <div class="fr" v-if="item1.name.invoiceStatus==1 || item1.name.invoiceStatus=='1'"><span class="color-7cb">待查验</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==2 || item1.name.invoiceStatus=='2'"><span class="color-7cb">查验中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3'"><span class="color-7cb">可报销</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==4 || item1.name.invoiceStatus=='4'"><span class="font-22d">查验错误</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==10 || item1.name.invoiceStatus=='10'"><span class="font-F89">报销审批中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'"><span class="font-F89">已报销</span></div>
                              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                              <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                            </div>
                          </div>
                          <div v-if="index1 != 0">
                            <p v-show="item1.name.categoryName!=downdata[index1-1].name.categoryName">{{item1.name.categoryName}}</p>
                            <p v-show="item1.name.categoryName==null || item1.name.categoryName==''" style="height:1.5rem;"></p>
                            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="item1.name.categoryName!=null && item1.name.categoryName!='' && item1.name.categoryName!=downdata[index1-1].name.categoryName">
                              <div class="fl" style="width:75%;" >
                                <div class="fl">
                                  <div class="fl width">
                                    <div v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.invoiceAmt|money}}</div>
                                    <div v-if="item1.name.invoiceStatus == 3 || item1.name.invoiceStatus == 10 || item1.name.invoiceStatus == 11 || item1.name.invoiceStatus == '3' || item1.name.invoiceStatus == '10' || item1.name.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.taxIncludedPrice|money}}</div>
                                    <img v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="taxFree" src="../../assets/img/account/icon_ExcludingTax.png"/>
                                  </div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==1||item1.name.typeId==2||item1.name.typeId==3||item1.name.typeId==6||item1.name.typeId==9||item1.name.typeId=='1'||item1.name.typeId=='2'||item1.name.typeId=='3'||item1.name.typeId=='6'||item1.name.typeId=='9'">开票日期：{{item1.name.invoiceDate| parseTime('{y}-{m}-{d}')}}</div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==4||item1.name.typeId==5||item1.name.typeId=='4'||item1.name.typeId=='5'">行程日期：
                                    <span v-if="item1.name.invoiceScheduleVo!=undefined && item1.name.invoiceScheduleVo!=null">
                                      {{item1.name.invoiceScheduleVo.scheduleDate| parseTime('{y}-{m}-{d}')}}
                                    </span>
                                  </div>
                                </div>
                                <div class="invoiceAdmin-main-name E7A7A">
                                  <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                                    <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                                    <div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'">
                                    <!--<div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'|| item1.name.typeId ==9 ||item1.name.typeId == '9'">-->
                                      <span v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3' || item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'" class="ellipsis_name">收款方: {{item1.name.salesName}}</span>
                                    </div>
                                  </div>
                                  <div style="margin-top: -1rem;"  v-if="item1.name.typeId == 4 || item1.name.typeId == '4' || item1.name.typeId == 5 || item1.name.typeId == '5'">
                                    <div v-if="item1.name.invoiceScheduleVo!=null &&item1.name.invoiceScheduleVo!=undefined" class="fl">
                                      <span class="fl min_width4">{{item1.name.invoiceScheduleVo.startCityName}}</span>
                                      <img class="fl" style="width: 17%;margin-top: 1rem" src="../../assets/img/fill/img_arrow@2x.png"/>
                                      <span class="min_width4" style="margin-left: 1rem">{{item1.name.invoiceScheduleVo.endCityName}}</span>
                                    </div>
                                    <span v-if="item1.name.invoiceScheduleVo==null ||item1.name.invoiceScheduleVo==undefined"><img style="width: 12%" src="../../assets/img/fill/img_arrow@2x.png"/></span>
                                  </div>
                                </div>
                              </div>
                              <div class="fr" v-if="item1.name.invoiceStatus==1 || item1.name.invoiceStatus=='1'"><span class="color-7cb">待查验</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==2 || item1.name.invoiceStatus=='2'"><span class="color-7cb">查验中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3'"><span class="color-7cb">可报销</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==4 || item1.name.invoiceStatus=='4'"><span class="font-22d">查验错误</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==10 || item1.name.invoiceStatus=='10'"><span class="font-F89">报销审批中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'"><span class="font-F89">已报销</span></div>
                              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                              <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                            </div>
                            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="item1.name.categoryName==downdata[index1-1].name.categoryName" style="margin-top: 1rem;">
                              <div class="fl" style="width:75%;" >
                                <div class="fl">
                                  <div class="fl width">
                                    <div v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.invoiceAmt|money}}</div>
                                    <div v-if="item1.name.invoiceStatus == 3 || item1.name.invoiceStatus == 10 || item1.name.invoiceStatus == 11 || item1.name.invoiceStatus == '3' || item1.name.invoiceStatus == '10' || item1.name.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.taxIncludedPrice|money}}</div>
                                    <img v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="taxFree" src="../../assets/img/account/icon_ExcludingTax.png"/>
                                  </div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==1||item1.name.typeId==2||item1.name.typeId==3||item1.name.typeId==6||item1.name.typeId==9||item1.name.typeId=='1'||item1.name.typeId=='2'||item1.name.typeId=='3'||item1.name.typeId=='6'||item1.name.typeId=='9'">开票日期：{{item1.name.invoiceDate| parseTime('{y}-{m}-{d}')}}</div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==4||item1.name.typeId==5||item1.name.typeId=='4'||item1.name.typeId=='5'">行程日期：
                                    <span v-if="item1.name.invoiceScheduleVo!=undefined && item1.name.invoiceScheduleVo!=null">
                                      {{item1.name.invoiceScheduleVo.scheduleDate| parseTime('{y}-{m}-{d}')}}
                                    </span>
                                  </div>
                                </div>
                                <div class="invoiceAdmin-main-name E7A7A">
                                  <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                                    <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                                    <div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'">
                                    <!--<div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'|| item1.name.typeId ==9 ||item1.name.typeId == '9'">-->
                                      <span v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3' || item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'" class="ellipsis_name">收款方: {{item1.name.salesName}}</span>
                                    </div>
                                  </div>
                                  <div style="margin-top: -1rem;"  v-if="item1.name.typeId == 4 || item1.name.typeId == '4' || item1.name.typeId == 5 || item1.name.typeId == '5'">
                                    <div v-if="item1.name.invoiceScheduleVo!=null &&item1.name.invoiceScheduleVo!=undefined" class="fl">
                                      <span class="fl min_width4">{{item1.name.invoiceScheduleVo.startCityName}}</span>
                                      <img class="fl" style="width: 17%;margin-top: 1rem" src="../../assets/img/fill/img_arrow@2x.png"/>
                                      <span class="min_width4" style="margin-left: 1rem">{{item1.name.invoiceScheduleVo.endCityName}}</span>
                                    </div>
                                    <span v-if="item1.name.invoiceScheduleVo==null ||item1.name.invoiceScheduleVo==undefined"><img style="width: 12%" src="../../assets/img/fill/img_arrow@2x.png"/></span>
                                  </div>
                                </div>
                              </div>
                              <div class="fr" v-if="item1.name.invoiceStatus==1 || item1.name.invoiceStatus=='1'"><span class="color-7cb">待查验</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==2 || item1.name.invoiceStatus=='2'"><span class="color-7cb">查验中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3'"><span class="color-7cb">可报销</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==4 || item1.name.invoiceStatus=='4'"><span class="font-22d">查验错误</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==10 || item1.name.invoiceStatus=='10'"><span class="font-F89">报销审批中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'"><span class="font-F89">已报销</span></div>
                              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                              <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                            </div>
                            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="item1.name.categoryName==null || item1.name.categoryName==''" style="margin-top: 1rem;">
                              <div class="fl" style="width:75%;" >
                                <div class="fl">
                                  <div class="fl width">
                                    <div v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.invoiceAmt|money}}</div>
                                    <div v-if="item1.name.invoiceStatus == 3 || item1.name.invoiceStatus == 10 || item1.name.invoiceStatus == 11 || item1.name.invoiceStatus == '3' || item1.name.invoiceStatus == '10' || item1.name.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.name.taxIncludedPrice|money}}</div>
                                    <img v-if="item1.name.invoiceStatus != 3 && item1.name.invoiceStatus != 10 && item1.name.invoiceStatus != 11 && item1.name.invoiceStatus != '3' && item1.name.invoiceStatus != '10' && item1.name.invoiceStatus != '11'" class="taxFree" src="../../assets/img/account/icon_ExcludingTax.png"/>
                                  </div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==1||item1.name.typeId==2||item1.name.typeId==3||item1.name.typeId==6||item1.name.typeId==9||item1.name.typeId=='1'||item1.name.typeId=='2'||item1.name.typeId=='3'||item1.name.typeId=='6'||item1.name.typeId=='9'">开票日期：{{item1.name.invoiceDate| parseTime('{y}-{m}-{d}')}}</div>
                                  <div class="font-7b7 width" v-if="item1.name.typeId==4||item1.name.typeId==5||item1.name.typeId=='4'||item1.name.typeId=='5'">行程日期：
                                    <span v-if="item1.name.invoiceScheduleVo!=undefined && item1.name.invoiceScheduleVo!=null">
                                      {{item1.name.invoiceScheduleVo.scheduleDate| parseTime('{y}-{m}-{d}')}}
                                    </span>
                                  </div>
                                </div>
                                <div class="invoiceAdmin-main-name E7A7A">
                                  <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                                    <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                                    <div v-if="item1.typeId == 1 || item1.typeId == '1' || item1.typeId == 2 || item1.typeId =='2' || item1.typeId ==3 ||item1.typeId == '3'">
                                    <!--<div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'|| item1.name.typeId ==9 ||item1.name.typeId == '9'">-->
                                      <span v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3' || item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'" class="ellipsis_name">收款方: {{item1.name.salesName}}</span>
                                    </div>
                                  </div>
                                  <div style="margin-top: -1rem;"  v-if="item1.name.typeId == 4 || item1.name.typeId == '4' || item1.name.typeId == 5 || item1.name.typeId == '5'">
                                    <div v-if="item1.name.invoiceScheduleVo!=null &&item1.name.invoiceScheduleVo!=undefined" class="fl">
                                      <span class="fl min_width4">{{item1.name.invoiceScheduleVo.startCityName}}</span>
                                      <img class="fl" style="width: 17%;margin-top: 1rem" src="../../assets/img/fill/img_arrow@2x.png"/>
                                      <span class="min_width4" style="margin-left: 1rem">{{item1.name.invoiceScheduleVo.endCityName}}</span>
                                    </div>
                                    <span v-if="item1.name.invoiceScheduleVo==null ||item1.name.invoiceScheduleVo==undefined"><img style="width: 12%" src="../../assets/img/fill/img_arrow@2x.png"/></span>
                                  </div>
                                </div>
                              </div>
                              <div class="fr" v-if="item1.name.invoiceStatus==1 || item1.name.invoiceStatus=='1'"><span class="color-7cb">待查验</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==2 || item1.name.invoiceStatus=='2'"><span class="color-7cb">查验中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==3 || item1.name.invoiceStatus=='3'"><span class="color-7cb">可报销</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==4 || item1.name.invoiceStatus=='4'"><span class="font-22d">查验错误</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==10 || item1.name.invoiceStatus=='10'"><span class="font-F89">报销审批中</span></div>
                              <div class="fr" v-if="item1.name.invoiceStatus==11 || item1.name.invoiceStatus=='11'"><span class="font-F89">已报销</span></div>
                              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                              <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-scroll>
                 <!-- </div>-->
          </div>
        </div>
      </div>
      <!--发票底部栏-->
      <div class="simpleReim_footer pst-abs width">
        <section class="width pst-rlt bg-ff">
          <div class="foot_left fl"  @click="toSimpleReim">
            <div class="cont"><img src="../../assets/img/icon_SimpleReimbursement.png"></div>
            <p class="Imp font-a39 cont">简易报销</p>
          </div>
          <div class="foot_center fl pst-abs">
            <div class="cont" @click="tofillTypePage"><img class="bxFootbar1-img" src="../../assets/img/account/add.png" /></div>
            <p class="fill3-Imp Imp font-a39 cont pst-abs">添加发票</p>
          </div>
          <div class="foot_right fr" @click="toAddmini">
            <div class="cont"><img src="../../assets/img/icon_ReimbursementForm.png"></div>
            <p class="Imp font-a39 cont">报销单</p>
          </div>
        </section>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
        </div>
      </div>
      <!--头部状态点击连接-->
      <div class="zz fill-tiyle-mask" v-show="statuScreenTop">
        <div class="fl width bg-ff bd-topf6" style="overflow-y: scroll;height: 21rem;position: relative;">
          <div class="fl fill-mask-margin invoiceStatue_check overflow-s">
            <div :class="statusChecked" v-if="item.name!='' && item.name!=undefined && item.code!=11" v-for="(item,index) in statuScreen" :key="item.id" @click="showHideImg($event,item.code,'')">
              {{item.name}}
            </div>
            <div :class="statusValue" v-if="item.name!='' && item.name!=undefined && item.code==11" v-for="(item,index) in statuScreen" :key="item.id" @click="showHideImg($event,item.code,'')">
              {{item.name}}
            </div>
          </div>
          <div class="fl fill-mask-btm width cont bd-top font-133" style="position: absolute;bottom: 0;background: #fff;">
            <div class="fl fill-mask-btm-l" @click="resetStatueSearch('invoiceStatue_check')">重置</div>
            <div class="fr bd-left font-col-b fill-mask-btm-r" @click="hidestatuScreenTop">确认</div>
          </div>
        </div>
      </div>
      <div class="zz fill-tiyle-mask" v-show="typeScreenTop">
        <div class="fl width bg-ff bd-topf6" style="height: 21rem;overflow-y: scroll;position: relative;">
          <div class="fl fill-mask-margin invoiceType_check">
            <div :class="statusValue" v-if="item.name!='' && item.name!=undefined &&item.state == 1" v-for="(item,index) in typeScreen" :key="item.id" @click="showHideImg($event,'',item.id)">
              {{item.name}}
            </div>
          </div>
          <div class="fl fill-mask-btm width cont bd-top font-133" style="position: absolute;bottom: 0;background: #fff;">
            <div class="fl fill-mask-btm-l" @click="resetStatueSearch('invoiceType_check')">重置</div>
            <div class="fr bd-left font-col-b fill-mask-btm-r" @click="hidetypeScreenTop">确认</div>
          </div>
        </div>
      </div>
    </div>
    <section class="zz" v-show="checkLoginShowFill">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="section_top">您还没有归属企业，暂时不能使用该功能</div>
          <div class="section_bottom">
            <div class="qx_set1 font-fa" @click="fillGoBack">知道了</div>
          </div>
        </div>
      </div>
    </section>
    <div class="Loading" v-if="Loading"><img src="../../assets/img/Loading/loading.gif"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  /*import Scroll from './onRefresh';*/
  import longtap from './onRefresh';
  import {queryInvoiceType,findInvoicePage,findInvoiceCategoryAll,findInvoiceStatusList} from "@/api/user/loginReg";/*findInvoicePage新接口*/
  import {uploadInvoice} from '@/api/user/news'/*上传文件*/
  import {addETMask1,EditElectronicInvoice} from '@/api/user/SignOut'/*添加电子发票*/
  import {queryMemberNew,queryReimburseList} from '@/api/user/userLogin'
  import Exif from '../../assets/js/small-exif.js'
  import loadmore from "../index/nav/voucher/scroll.vue";/*上拉下拉*/
  function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };
  export default {
    name: 'Administration',
    data() {
      return {
        initShowSearch:true,
        statusChecked:"mask_Popup_type_check",
        statusValue:"mask_Popup_type",
        state:true,/*fill页头部状态箭头的显示*/
        stateClick:false,
        stateSelection:false,
        Vtype:true,/*fill页头部类型箭头的显示*/
        VtypeClick:false,
        VtypeSelection:false,
        statuScreenTop:false,/*头部状态框*/
        typeScreenTop:false,/*头部类型框*/
        statuScreen:[],//全部状态数据
        typeScreen:[],//全部类型数据
        ready:false,
        Loading:false,
        checkLoginShowFill:false,
        article:"发票管理",
        show:false,
        bindXqp:"xqpB",
        bindXqpA:"",
        kong:false,        //控制空状态或者有票状态
        isShow1:false,
        touch:false,
        count:1,              //下拉刷新的次数
        error_prompt:"",/*提示框*/
        content:"",
        error_prompt1:"",
        content1:"",/*至提示框*/
        touchEventStart:false,
        touchEv:false,
        addElectro:false,
        pic:{
          picUrl:'',//电子发票地址
          categoryId:"",//发票类别
          remark:'',//备注
        },
        reveal:"",         //控制类别行业的div的显示隐藏
        choose:"",     //选择状态icon
        status:"识别通过",

        /************************分页**************************/
        counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        num : 5,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: [],  // 上拉更多的数据存放数组
        scrollData:{
          noFlag: false //暂无更多数据显示
        },
        /**************************************************/
        alldata:[],     //存放所有数组
        //success:require("../../assets/img/success.png"),       //识别通过图标
        //Invalid:require("../../assets/img/account/Invalid.png"),   //长按重新上传\长按重新编辑图标
        //Identification:require("../../assets/img/account/icon_ldentification@2x.png"),  //识别中
        //iconAudit:require("../../assets/img/account/icon_audit@2x.png"),//报销审批中
        title:"",      //类别
        sj:{},       //查询发票列表请求数据
        sjParams:{   //查询发票列表请求数据=====更新最新接口数据
          invoiceStatusList:['1','2','3','4','10'],//选中状态数据
          invoiceKindList:[],//选中类型数据
          companyId:"",
        },
        files:[],
        foot:true,      //底部三个小图标区的显示
        typeId:"",
        accessToken:"",
        blank:false,
        delIcon:true,
        phoneImg:false,
        fillIntimers:null,
        picavalue: "",
        dataB:1,                     //长按拖动次数控制
        fillFlag:true,
        fillFlagB:true,
        imgUrl: null,
        isEnlargeImage: false,
        invoiceType:{},   //发票列别
        jsondata:[],
        companyId:"",
      }
    },
    methods:{
        /*状态筛选*/
      fillState(){
        if(this.statuScreenTop == false){
            this.typeScreenTop = false;
          findInvoiceStatusList().then(res=>{   //查询发票类别接口
            if(res.data.code == 200){
              this.statuScreen = res.data.data;
            }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
          this.statuScreenTop = true ,/*mask框*/
          this.stateSelection =true;
          this.state = false;
          this.stateClick = false;
          this.VtypeSelection =false;
          if(this.sjParams.invoiceKindList!=undefined && this.sjParams.invoiceKindList.length>0){
            this.VtypeClick =true;
            this.Vtype = false;
          }else{
            this.VtypeClick =false;
            this.Vtype = true;
          }
        }
      },
      fillVtype(){
          if(this.typeScreenTop == false){
            this.statuScreenTop = false;
            findInvoiceCategoryAll().then(res=>{   //查询发票类别接口
              if(res.data.code == 200){
                this.typeScreen = res.data.data.records;
                //console.log("发票类型接口" + res.data );
              }
            },res=>{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            })
            this.typeScreenTop = true ,/*mask框*/
            this.VtypeSelection =true;
            this.Vtype =false;
            this.VtypeClick =false;
            this.stateSelection =false;
            if(this.sjParams.invoiceStatusList!=undefined && this.sjParams.invoiceStatusList.length>0){
              this.stateClick =true;
              this.state = false;
            }else{
              this.stateClick =false;
              this.state = true;
            }
          }
      },
      showHideImg(event,statusId,typeId){
        if(event.currentTarget.className == "mask_Popup_type") {
          event.currentTarget.setAttribute('class', 'mask_Popup_type_check')
          event.currentTarget.style.color = '#EB7B03';
          if(typeId!=undefined && typeId!=""){
            this.sjParams.invoiceKindList[this.sjParams.invoiceKindList.length] = typeId;
          }else if(statusId!=undefined && statusId!=""){
            this.sjParams.invoiceStatusList[this.sjParams.invoiceStatusList.length] = statusId;
          }
        }else{
          event.currentTarget.setAttribute('class','mask_Popup_type');
          event.currentTarget.style.color = '#2E2A2A';
          if(typeId!=undefined && typeId!=""){
            if(this.sjParams.invoiceKindList.length>0) {
              for (let i = 0; i < this.sjParams.invoiceKindList.length; i++) {
                if (this.sjParams.invoiceKindList[i] == typeId) {
                  this.sjParams.invoiceKindList.splice(i, 1);
                }
              }
            }
          }else if(statusId!=undefined && statusId!=""){
            if(this.sjParams.invoiceStatusList.length>0) {
              for (let i = 0; i < this.sjParams.invoiceStatusList.length; i++) {
                if (this.sjParams.invoiceStatusList[i] == statusId) {
                  this.sjParams.invoiceStatusList.splice(i, 1);
                }
              }
            }
          }
        }
      },
      //重置发票状态
      resetStatueSearch(className){
          let Arrs = document.getElementsByClassName(className)[0].children;
            this.clearQueryData(Arrs,className);
      },
      clearQueryData(arrs,value){
        if(arrs.length>0) {
          for(let i=0;i<arrs.length;i++){
              if(arrs[i].className == 'mask_Popup_type_check'){
                arrs[i].className = 'mask_Popup_type';
                arrs[i].style.color = '#2E2A2A';
              }
          }
        }
        if(value == 'invoiceType_check'){
          this.sjParams.invoiceKindList = [];
        }else{
          this.sjParams.invoiceStatusList = [];
        }
      },
      //确认选中发票状态
      hidestatuScreenTop(){
        this.statuScreenTop = !this.statuScreenTop;/*mask框*/
        this.VtypeSelection =false;
        if(this.sjParams.invoiceStatusList!=undefined && this.sjParams.invoiceStatusList.length>0){
          this.stateClick =true;
          this.stateSelection = false;
          this.state = false;
        }else{
          this.stateClick =false;
          this.stateSelection = false;
          this.state = true;
        }
        this.alldata = [];
        this.listdata = [];
        this.downdata= [];
        this.getfindInvoiceList(); //等待联调
      },
      //确认选中发票类型
      hidetypeScreenTop(){
        this.typeScreenTop = !this.typeScreenTop ,/*mask框*/
        this.stateSelection =false;
        if(this.sjParams.invoiceKindList!=undefined && this.sjParams.invoiceKindList.length>0){
          this.VtypeClick =true;
          this.VtypeSelection =false;
          this.Vtype = false;
        }else{
          this.VtypeClick =false;
          this.VtypeSelection =false;
          this.Vtype = true;
        }
        this.alldata = [];
        this.listdata = [];
        this.downdata= [];
        this.getfindInvoiceList(); //等待联调
      },
      //获取全部发票列表信息==新接口（已知企业用户的情况下）
      getfindInvoiceList(){
        this.accessToken = localStorage.getItem("userID");
        this.Loading = true;
        this.sjParams.companyId = this.companyId;
        if(this.$route.params.status!=undefined && this.$route.params.status!='undefined'){
          this.sjParams.invoiceStatusList = [];
          this.sjParams.invoiceStatusList.push(this.$route.params.status);
        }
        findInvoicePage(this.accessToken,this.sjParams).then(res =>{
          if(res.data.code == 200) {
            this.Loading = false;
            if(res.data.data == null || res.data.data == ""){
              this.kong = true;
            }else{
              this.kong = false;
            }
            this.alldata = res.data.data;
            if(this.alldata!=undefined && this.alldata!=null && this.alldata!="" && this.alldata.length>0){
              for(let i=0;i<this.alldata.length;i++){
                this.alldata[i].nums = i;
              }
              this.listdata = this.alldata.slice(0,this.num);
              /*console.info(this.listdata)*/
              if(this.$route.params.status!=undefined && this.$route.params.status!='undefined'){
                document.getElementById('backstage').setAttribute('class','mGtop2 bg-f6');
                this.initShowSearch = false;
              }else{
                this.initShowSearch = true;
              }
            }
          }else{
            this.Loading = false;
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.Loading = false;
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //返回事件
      fillGoBack(){
        this.checkLoginShowFill = false;
        this.$router.push({name:"home"});
      },
      fillIntimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      timer(){
        if(this.error_prompt1=="tel-message"){
          this.error_prompt1="trans";
        }
      },
      //to发票详情页
      toqueryInvoiceDetailPage(invoiceId,typeId){
          if(typeId!='4' && typeId!=4 && typeId!='5' && typeId!=5){
            if(this.$route.params.status!=undefined && this.$route.params.status!='undefined'){
              this.$router.push({name:'invoiceDetails',params:{invoiceId:invoiceId,status:this.$route.params.status}});
            }else{
              this.$router.push({name:'invoiceDetails',params:{invoiceId:invoiceId}});
            }
          }else{
            if(this.$route.params.status!=undefined && this.$route.params.status!='undefined'){
              this.$router.push({name:'aircraft',params:{invoiceId:invoiceId,status:this.$route.params.status}});
            }else{
              this.$router.push({name:'aircraft',params:{invoiceId:invoiceId}});
            }
          }
      },
      fillgetList(accessToken){
        //初始化进入发票列表页
        this.Loading = true;
        if (accessToken != undefined && accessToken != null && accessToken != "" && accessToken!='null' && accessToken!='undefined') {
          queryMemberNew(accessToken,"").then(res =>{
            if(res.data.code == 200){
              this.Loading = false;
              if(res.data.data.companyList!=null&&res.data.data.companyList!=""&&res.data.data.companyList!=undefined){ //企业用户
                this.getfindInvoiceList(); //等待联调
              }else{ //c端用户给提示
                this.checkLoginShowFill = true;
              }
            }else{
              this.Loading = false;
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res =>{
            this.Loading = false;
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else{
          localStorage.setItem("loginToPage",'fill');
          this.$router.push({name: 'login'});
        }
      },
      onLoadMore(done) {
        this.counter++;
        let end = this.pageEnd = this.num * this.counter;
        let i = this.pageStart = this.pageEnd - this.num;
        let alldata = this.alldata;
        setTimeout(() => {
          for(i; i < end; i++) {
            if(i >= alldata.length) {
              //走完数据调用方法
              this.scrollData.noFlag = true;
              break;
            } else {
              this.downdata.push({
                name:alldata[i]
              });
              // more.style.display = 'none'; //隐藏加载条
            }
          }
          //console.info(this.downdata);
          done();
        }, 500);
      },
      toAddmini(){
        this.$router.push({name:"addministration"});
      },
      toSimpleReim(){
        this.$router.push({name:"simpleReim"});
      },
      setZhi(){
        localStorage.setItem("flag",this.fillFlag);
      },
      onRefresh(done) {
        //在这里定一个flag ，刷新就显示true。touchStart的时候控制A的加减
        this.fillFlag = false;
        this.setZhi();       //动态改变flag存储值，所以提出公用
        this.$set(this.listdata,this.listdata);
        done() // call done
      },
      //fill页面刷新加载
      onInfinite(done) {
        // console.log("两个数据："+localStorage.getItem("dataA")+","+this.dataB);
        this.fillFlag = true;
        this.setZhi();
        //       if(localStorage.getItem("dataA") == this.dataB){
        this.dataB++;
        this.sj.pageSize = this.num;
        let startPage = this.count*this.num;
        this.count++;
        for(let i=startPage;i<this.alldata.length;i++){
          if(i< (startPage + this.num) ){
            this.listdata.push(this.alldata[i]);
          }else{
            return false;
          }

        }
//          }else{
//              return false;
//          }

      },
      //＋事件
      tofillTypePage(){
        this.$router.push({name:'invoiceType'});
      },
      phone:function () {
        this.phoneImg=true;
      },
      //删除事件
      delImg() {
        this.imgUrl = null;
      }
    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.fillIntimer,2000);
      });
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
      this.setZhi();
      this.Loading = true;
      this.sj.companyId = this.companyId;
      this.$root.$data.vBack=false;
      /*this.$root.$data.article = '发票管理';*/
      this.accessToken = localStorage.getItem("userID");
      let url = window.location.href;
      if(this.isWeixn()){
        if (url.indexOf('openid') > 0) {
          this.byOpenIdgetInfo(this.getOpenId(url),'fill','50001');
        }else {
          if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
            this.byOpenIdgetInfo(localStorage.getItem('openId'),'fill','50001');
          }else{
            //静默授权
            this.byWechAtgetOpenId('one','50001',this.$root.$data.redirect_uri,'fill')
          }
        }
      }else{
        if (this.accessToken != undefined && this.accessToken != null && this.accessToken != "" && this.accessToken!='null' && this.accessToken!='undefined') {
            this.fillgetList(this.accessToken);
        }else{
          localStorage.setItem("loginToPage",'fill');
          this.$router.push({name:'login'});
        }
      }
    },
    components: {
      'v-scroll': loadmore
    },
  }
</script>
<style scoped>
  @import "../../assets/css/uploader.css";
  .Budget-margin-108{
    margin: 0.2rem 1.08333333rem;
  }
  .Budget_ul_li:last-child{
    border-bottom: 0;
  }
  .fill-tiyle-mask{
    top: 3rem;
  }
  .fill-mask-margin{
    padding:1.333333333rem 0.8333333rem 3.5rem;
    height: 16rem;
    overflow-y: scroll;
  }
  .fill-mask-bq{
    padding: 0.5rem 2.4rem;
    margin: 0.25rem 0.45rem;
    background: #F6F6F6;
    /*background: url("../../assets/img/Q_Modular/Q_Select.png") no-repeat 80% 67%;*/
    background-size: 10rem;
  }
  .fill-mask-btm{
    line-height:3.5rem;
  }
  .fill-mask-btm-l{
    width:29%;
  }
  .fill-mask-btm-r{
    width:70%;
    background: #FFA436;
  }
  /*v-scroll状态区*/
  .fillIn .fillIn-invoice1 #backstage{
    padding: 1rem 1.083333333rem 0;
    padding-bottom: 7rem;
  }
  .fillIn #backstage p{
    line-height: 2.5rem;
    font-size: 1rem;
    color: #A39C9C;
    margin-top: 1rem;
  }
  .fillIn .fillIn-conter .pos-left{
    height: 7.5%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .fillIn #backstage .backstage_wrap{
    position:relative;
    display:inline-block;
    width: 31%!important;
    height:7rem;
    margin:0 0.2rem;
  }
  .fillIn #backstage .backstage_zz{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    background: rgba(105,106,107,.7);
    z-index: 666;
    text-align: center;
    margin-right:5px;
    font-size: 1rem;
  }
  .fillIn #backstage .backstage_zz .backstage_icon{
    width: 2rem;
    height: 2rem;
    margin-left: 40%;
    margin-top: 23%;
    margin-bottom: 5px;
  }
  .fillIn #backstage .backstageImg{
    width:100%;
    height:100%;
    margin-right:5px;
  }
  /*v-scroll状态区结束*/
  /*小气泡*/
  .fillIn #backstage .xqp_wrap{
    position: absolute;
    left: 0;
    /*width:16.25rem;*/
    width:17rem;
    color: #fff;
    bottom: -3rem;
    z-index: 999;
    display:none;
  }
  .fillIn #backstage .backstage_wrap:nth-of-type(3n+0) .xqp_wrap{
    left:-6.5833333rem;
  }
  .fillIn #backstage .backstage_wrap:nth-of-type(3n+0) .xqpB{
    left:-2.3rem!important;
  }
  .fillIn #backstage .xqp_posi{
    position: relative;
    height: 2.416rem;
    line-height: 2.416rem;
    border-radius: 3px;
  }
  /**/
  .fillIn{
    background:#fff;
  }
  .fillIn .xqpB{
    width:11.25rem!important;
    left:0!important;
  }
  .fillIn #backstage .xqp {
    position: absolute;
    left: 47%;
    top: -18px;
    margin-left:-9px;
    border-left: solid 9px transparent;
    border-top: solid 9px transparent;
    border-right: solid 9px transparent;
    border-bottom: solid 9px rgba(62,65,66,.9);
  }
  .fillIn #backstage  .xqp_wrap .xqp_effect {
    /*display: inline-block;*/
    float:left;
    padding: 0 0.5rem;
    position:relative;
    border-right: solid 1px rgba(255,255,255,.4);
    /*新修改*/
    background: rgba(62,65,66,.9);
  }
  .fillIn #backstage  .xqp_wrap .xqp_content{
    line-height: 2.416rem;
  }
  .fillIn #backstage .xqp_wrap .xqp_effect:last-of-type{
    border:none;
    /*padding: 0 0.1rem;*/
  }
  /*小气泡结束*/
  .fillIn #ul li div{
    width:100%;
  }

  .fillIn #ul li .img_icon{
    width:2rem;
    height:2rem;
    position:absolute;
    left:50%;
    top:50%;
    z-index:555;
    margin-top:-2rem;

  }
  .fillIn #ul li span{
    position:absolute;
    left:50%;
    top:55%;
    color:#fff;
    margin-left:-2rem;
  }
  .fillIn .tel-mess .juzhong #setPwd_format{
    display: block!important;
    margin-top: 1.5rem;
  }
  .fillIn .bxFootbar1{
    position: absolute;
    left: 0;
    bottom: 0;
    height:3.75rem;
    z-index: 1;
  }
  .fillIn .bxFootbar-icon{
    width:44%;
    padding-top: 0.3rem;
  }
  .fillIn .bxFootbar-conter .fp,.bxFootbar-conter .bx{
    padding-top: 0.3rem;
  }
  .fillIn .bxFootbar-conter .fp p,.bxFootbar-conter .bx p{
    line-height: 0.9rem;
  }
  .fillIn .bxFootbar-conter .fp img,.bxFootbar-conter .bx img {
    padding-left: 42%;
  }
  .fillIn .bxFootbar-conter .fp img,.bxFootbar-conter .bx img{
    width: 2.3rem;
  }
  /* 底部三个图标区样式结束*/
  .fillIn .fillIn-conter .fillIn-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0.97;
    z-index: 1000;
  }
  .fillIn .back_add{
    display:inline-block;
    width: 8.3333rem;
    height: 2.083333rem;
    line-height: 2.083333rem;
    border: 1px solid #e4af76;
    border-radius: 4rem;
  }
  .fillIn-conter .phone-mask .phone-Pupop p{
    line-height: 4.166667rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-x{
    height:7.5%;
    left:0;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add{
    padding-bottom: 1.333333rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon img{
    width: 2.5083333rem;
    padding-left: 33%;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon{
    width:24.5%;
    padding-bottom: 1.33333rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon p{
    font-size: 1rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup{
    padding-top: 9.5833333rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .title-name{
    margin: 0 1.083333rem 1rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-x .fillIn-x-img{
    width: 3.25rem;
    padding-left: 44.9%;
    position: absolute;
    bottom: 1rem;
  }
  /*处理固定定位问题*/
  .fill_bill_head{
    height:93%;
  }
  .ptFillShow1{
    opacity: 0;
    position: absolute;
    top: 0;
    width: 9.3rem;
    height: 7rem;
    left: 0;
  }
  /*底部footer*/
  .fillIn .simpleReim_footer{
    left:0;
    bottom:0;
    height:3.75rem;
    box-shadow:1px 0 9px #8888882e;
  }
  .fillIn .simpleReim_footer section{
    height:3.75rem;
  }
  .fillIn .simpleReim_footer .foot_left div,.Imp{
    width:4rem;
  }
  .fillIn .simpleReim_footer .Imp{
    font-size:0.75rem;
  }
  .fill3-Imp{
    bottom: -0.15rem;
    z-index: 1;
    left: -1.95rem;
  }
  .fillIn .simpleReim_footer p{
    transform:translateY(-5px);
  }
  .fillIn .simpleReim_footer img{
    width:2.2rem;
    height:2.2rem;
    display: inline-block;
  }
  .fillIn .simpleReim_footer .bxFootbar1-img{
    width:3.3333333rem;
    height:3.3333333rem;
    display: inline-block;
    top: -1.75rem;
  }
  .fillIn .simpleReim_footer .foot_left{
    margin-left:4.75rem;
    height:100%;
  }
  .fillIn .simpleReim_footer .foot_center{
    height:100%;
    left:50%;
    top:0;
    transform:translateX(-50%);
  }
  .fillIn .simpleReim_footer .foot_right{
    height:100%;
    margin-right:4.75rem;
  }
  /*title*/
  .invoiceAdmin-title-icon{
    width: 0.7rem;
    height: 0.5rem;
    padding: 1.25rem 0 0 0.5rem;
  }
  .invoiceAdmin-title{
    line-height: 3rem;
    width:49%;
  }
  .invoiceAdmin-title-line{
    width: 1px;
    padding-top: 0.5rem;
  }
  .invoiceAdmin-main-p{
    border-radius: 0.4rem;
    padding: 0.666666667rem 1rem;
    width:93%;
  }
  .invoiceAdmin-main-title{
    line-height: 2.5rem;
  }
  .invoiceAdmin-main-mon{
    font-size: 2.16666667rem;
    line-height: 2.16666667rem;
  }
  .invoiceAdmin-main-name{
    padding-top: 6.5166667rem;
    height:1.5rem;
  }
  .fillIn .fill-tiyle-mask .bg-ff .fill-mask-margin .mask_Popup_type{
       font-size: 1.1rem;
       background: #F6F6F6;
       line-height: 3.666667rem;
       width: 29%;
       height: 3.666667rem;
       margin-left: 0.8333rem;
       margin-bottom: 0.83333rem;
       text-align: center;
       float: left;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       border-radius: 0.4rem;
     }

  .fillIn .fill-tiyle-mask .bg-ff .fill-mask-margin .mask_Popup_type_check {
    background:url("../../assets/img/Coupon/icon_label@2x.png") no-repeat 72% 48%;
    background-size: 10rem;
    color: rgb(235, 123, 3);
    font-size: 1.1rem;
    line-height: 3.666667rem;
    width: 29%;
    height: 3.666667rem;
    margin-left: 0.8333rem;
    margin-bottom: 0.83333rem;
    text-align: center;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0.4rem;
  }
  .taxFree{
    width:3.0833333rem;
    margin-top: 0.5rem;
  }
  .mGtop2{
    margin-top: -2rem;
  }
  @media screen and (max-width:321px){
    .fill-mask-margin{
      height: 15rem;
    }
    .fillIn-conter .fillIn-mask .fillIn-x .fillIn-x-img{
      bottom: 0.6rem;
    }
    /*.fillIn  .fill_bill_foot{
      height:8.5%;
    }*/
    .fillIn .simpleReim_footer .foot_left{
      margin-left:3.75rem;
    }
    .fillIn .simpleReim_footer .foot_right{
      margin-right:3.75rem;
    }
    .fillIn .bxFootbar1-img2{
      /*bottom: 0.2rem;*/
      top:-0.9rem;
    }
    .ptFillShow1{
      opacity: 0;
      position: absolute;
      top: 0;
      width: 7.8rem;
      height: 7rem;
      left: 0;
    }
    .fillIn #backstage .backstage_wrap{
      width: 31%!important;
    }
    .fillIn-conter .fillIn-mask .fillIn-Popup {
      padding-top: 7.583333rem;
    }
    .fillIn-conter .fillIn-mask .fillIn-x .fillIn-x-img {
      padding-top: 0rem;
    }
    .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon {
      width:24%;
      padding-bottom: 1rem;
    }
    .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add {
      padding-bottom: 1rem;
    }
    .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .title-name {
      margin: 0 1.083333rem 0.8rem;
    }
    .fill_bill_head{
      height:91.5%;
    }
  }
  @media screen and (max-width:815px)and (min-width: 450px){
    .fillIn  .fill_bill_foot{
      height:9.5%;
    }
    .fillIn-conter .fillIn-mask .fillIn-x .fillIn-x-img{
      bottom: 0.4rem;
    }
    .fillIn .bxFootbar1-img{
      bottom: 0;
    }
    .fillIn .bxFootbar-icon{
      padding-top: 0.2rem;
    }
    .fillIn .bxFootbar-conter .fp,.bxFootbar-conter .bx{
      padding-top: 0.3rem;
    }
    .ptFillShow1{
      opacity: 0;
      position: absolute;
      top: 0;
      width: 9.3rem;
      height: 7rem;
      left: 0;
    }
    .fillIn-comter img{
      padding-left: 34%;
      width: 20rem;
    }
    .fillIn-comter{
      font-size: 1.5rem;
    }
    .fill_bill_foot {
      height: 9.4%;
    }
    .fill_bill_head{
      height:90.5%;
    }
    .fill3-Imp{
      bottom: 0.25rem;
    }
    .fillIn .simpleReim_footer .bxFootbar1-img{
      top: -1.85rem;
    }
    .fillIn .simpleReim_footer .Imp{
      font-size: 0.85rem;
    }
  }
</style>

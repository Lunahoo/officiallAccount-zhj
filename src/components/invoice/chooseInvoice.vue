<template>
  <div class="chooseInvoice width height">
    <div style="padding: 0.67rem 1.5rem;line-height: 1.8rem;background: #FFF4E8;" v-if="listdata!=undefined && listdata.length>0" class=" font-F89 font-167">
      <div v-if="!initCheck">
        <div class="width">提示信息：</div>
        <div class="width">选择多张增值税发票报销时，抬头需相同。</div>
      </div>
    </div>
    <div class="fillIn-comter cont" v-if="listdata==undefined || listdata.length==0">
      <img src="../../assets/image/news/img_blank_page@2x.png" class="errorImg">
      <p class="font-ipt pd-bt">一张发票都没有，空空如也～</p>
    </div>
    <div class="fl width" v-if="initCheck && listdata!=undefined && listdata.length>0" style="height: 95%;">
      <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData" style="padding: 0;">
        <div class="bg-f6" id="backstage" ref="backstage" style="padding: 1rem 1.083333333rem 0;">
          <div v-for="(item1,index1) in listdata" :key="item1.id" v-if="item1.state!=undefined && item1.state==1" @click="addHide(item1.id,item1)">
              <p v-show="index1==0">{{item1.categoryName}}</p>
              <p v-show="index1!=0 && item1.categoryName!=listdata[index1-1].categoryName">{{item1.categoryName}}</p>
              <p v-show="item1.categoryName==null || item1.categoryName==''" style="height:1.5rem;"></p>

            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="index1 == 0 || item1.categoryName!=listdata[index1-1].categoryName">
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
                  <div style="margin-top: -1rem;" v-if="item1.typeId != 4 && item1.typeId != '4' && item1.typeId != 5 && item1.typeId != '5' && item1.typeId != 6 && item1.typeId != '7'&& item1.typeId != 7 && item1.typeId != '6'">
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
              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
              <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
              <div class="fr" v-if="index1 == 0" style="margin-top: -6.5rem">
                <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
              </div>
              <div class="fr magin_top15" v-if="index1!=0">
                <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
              </div>
            </div>
            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="index1 != 0 && item1.categoryName==listdata[index1-1].categoryName" style="margin-top: 1rem;">
              <div class="fl" style="width:75%;" >
                <div class="fl">
                  <div class="fl width">
                    <div v-if="item1.invoiceStatus != 3 && item1.invoiceStatus != 10 && item1.invoiceStatus != 11 && item1.invoiceStatus != '3' && item1.invoiceStatus != '10' && item1.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.invoiceAmt|money}}</div>
                    <div v-if="item1.invoiceStatus == 3 || item1.invoiceStatus == 10 || item1.invoiceStatus == 11 || item1.invoiceStatus == '3' || item1.invoiceStatus == '10' || item1.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.taxIncludedPrice|money}}</div>
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
              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
              <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
              <div class="fr magin_top15">
                <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
              </div>
            </div>
          </div>
          <div v-for="(item1,index1) in downdata" :key="item1.name.id" v-if="item1.state!=undefined && item1.state==1" @click="addHide(item1.name.id,item1.name)">
            <div v-if="index1 == 0">
              <p v-show="item1.name.categoryName!=listdata[listdata.length-1].categoryName">{{item1.name.categoryName}}</p>
              <p v-show="item1.name.categoryName==null || item1.name.categoryName==''" style="height:1.5rem;"></p>
              <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="item1.name.categoryName!=listdata[listdata.length-1].categoryName">
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
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
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
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
              </div>
            </div>
            <div v-if="index1 != 0">
              <p v-show="item1.name.categoryName!=downdata[index1-1].name.categoryName">{{item1.name.categoryName}}</p>
              <p v-show="item1.name.categoryName==null || item1.name.categoryName==''" style="height:1.5rem;"></p>
              <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="item1.name.categoryName!=downdata[index1-1].name.categoryName">
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
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
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
                  <div class="invoiceAdmin-main-name E7A7A"> <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6'">
                    <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                      <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </v-scroll>
    </div>
    <div class="fl width" v-if="!initCheck && listdata!=undefined && listdata.length>0" style="height: 95%;">
      <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData" style="padding: 0;top: 4.8rem;">
        <div class="bg-f6" id="backstage1" ref="backstage1" style="padding: 1rem 1.083333333rem 0;">
          <div v-for="(item1,index1) in listdata" class="bb" v-if="checkedInvoiceTitleName!='' && checkedInvoiceTitleName == item1.invoiceTitleName && item1.state!=undefined && item1.state==1" :key="item1.id" @click="addHide(item1.id,item1)">
              <p v-show="index1==0">{{item1.categoryName}}</p>
              <p v-show="index1!=0 && item1.categoryName!=listdata[index1-1].categoryName">{{item1.categoryName}}</p>
              <p v-show="item1.categoryName==null || item1.categoryName==''" style="height:1.5rem;"></p>
            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="index1 == 0 || item1.categoryName!=listdata[index1-1].categoryName">
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
              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
              <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
              <div class="fr" v-if="index1 == 0" style="margin-top: -5rem">
                <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
              </div>
              <div class="fr magin_top15" v-if="index1!=0">
                <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
              </div>
            </div>
            <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="index1 != 0 && item1.categoryName==listdata[index1-1].categoryName" style="margin-top: 1rem;">
              <div class="fl" style="width:75%;" >
                <div class="fl">
                  <div class="fl width">
                    <div v-if="item1.invoiceStatus != 3 && item1.invoiceStatus != 10 && item1.invoiceStatus != 11 && item1.invoiceStatus != '3' && item1.invoiceStatus != '10' && item1.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.invoiceAmt|money}}</div>
                    <div v-if="item1.invoiceStatus == 3 || item1.invoiceStatus == 10 || item1.invoiceStatus == 11 || item1.invoiceStatus == '3' || item1.invoiceStatus == '10' || item1.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.taxIncludedPrice|money}}</div>
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
              <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
              <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
              <div class="fr magin_top15">
                <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
              </div>
            </div>
          </div>
          <div v-for="(item1,index1) in listdata" class="aa" v-if="checkedInvoiceTitleName=='' || checkedInvoiceTitleName != item1.invoiceTitleName" :key="item1.id">
            <div v-if="item1.state!=undefined&&item1.state==1">
              <div v-if="item1.typeId!=1 &&item1.typeId!=2 && item1.typeId!=3 && item1.typeId!=9" @click="addHide(item1.id,item1)">
                <p v-show="index1==0">{{item1.categoryName}}</p>
                <p v-show="index1!=0 && item1.categoryName!=listdata[index1-1].categoryName">{{item1.categoryName}}</p>
                <p v-show="item1.categoryName==null || item1.categoryName==''" style="height:1.5rem;"></p>
                <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="index1 == 0 || item1.categoryName!=listdata[index1-1].categoryName">
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
                  <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                  <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
                  <div class="fr" v-if="index1 == 0" style="margin-top: -5rem">
                    <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                    <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                  </div>
                  <div class="fr magin_top15" v-if="index1!=0">
                    <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                    <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                  </div>
                </div>
                <div class="invoiceAdmin-main-p bg-ff fl font-1" v-if="index1 != 0 && item1.categoryName==listdata[index1-1].categoryName" style="margin-top: 1rem;">
                  <div class="fl" style="width:75%;" >
                    <div class="fl">
                      <div class="fl width">
                        <div v-if="item1.invoiceStatus != 3 && item1.invoiceStatus != 10 && item1.invoiceStatus != 11 && item1.invoiceStatus != '3' && item1.invoiceStatus != '10' && item1.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.invoiceAmt|money}}</div>
                        <div v-if="item1.invoiceStatus == 3 || item1.invoiceStatus == 10 || item1.invoiceStatus == 11 || item1.invoiceStatus == '3' || item1.invoiceStatus == '10' || item1.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.taxIncludedPrice|money}}</div>
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
                  <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                  <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
                  <div class="fr magin_top15">
                    <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                    <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                  </div>
                </div>
              </div>
              <div  v-if="item1.typeId==1 ||item1.typeId==2 || item1.typeId==3 || item1.typeId==9">
                <p v-show="index1==0">{{item1.categoryName}}</p>
                <p v-show="index1!=0 && item1.categoryName!=listdata[index1-1].categoryName">{{item1.categoryName}}</p>
                <p v-show="item1.categoryName==null || item1.categoryName==''" style="height:1.5rem;"></p>
                <div class="invoiceAdmin-main-p bg-ff fl font-1 opacity_6" v-if="index1 == 0 || item1.categoryName!=listdata[index1-1].categoryName">
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
                  <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                  <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
                  <div class="fr" v-if="index1 == 0" style="margin-top: -5rem">
                    <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                    <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                  </div>
                  <div class="fr magin_top15" v-if="index1!=0">
                    <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                    <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                  </div>
                </div>
                <div class="invoiceAdmin-main-p bg-ff fl font-1 opacity_6" v-if="index1 != 0 && item1.categoryName==listdata[index1-1].categoryName" style="margin-top: 1rem;">
                  <div class="fl" style="width:75%;" >
                    <div class="fl">
                      <div class="fl width">
                        <div v-if="item1.invoiceStatus != 3 && item1.invoiceStatus != 10 && item1.invoiceStatus != 11 && item1.invoiceStatus != '3' && item1.invoiceStatus != '10' && item1.invoiceStatus != '11'" class="fl invoiceAdmin-main-mon">￥{{item1.invoiceAmt|money}}</div>
                        <div v-if="item1.invoiceStatus == 3 || item1.invoiceStatus == 10 || item1.invoiceStatus == 11 || item1.invoiceStatus == '3' || item1.invoiceStatus == '10' || item1.invoiceStatus == '11'" class="fl invoiceAdmin-main-mon">￥{{item1.taxIncludedPrice|money}}</div>
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
                  <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                  <div class="seal_div font-7b7"><span>{{item1.typeName}}</span></div>
                  <div class="fr magin_top15">
                    <img class="nocheck_img"  :id="item1.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                    <img class="check_img" :id="item1.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item1,index1) in downdata" class="bb" v-if="checkedInvoiceTitleName!='' && checkedInvoiceTitleName == item1.name.invoiceTitleName && item1.name.state!=undefined && item1.name.state==1" :key="item1.name.id" @click="addHide(item1.name.id,item1.name)">
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
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
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
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
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
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
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
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
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
                  <div class="invoiceAdmin-main-name E7A7A"> <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6'">
                    <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                      <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
              </div>
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
                  <div class="invoiceAdmin-main-name E7A7A"> <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6'">
                    <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                      <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                      <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                <div class="fr magin_top15">
                  <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                  <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                </div>
              </div>
            </div>
          </div>
        </div>
         <div v-for="(item1,index1) in downdata" class="aa" v-if="checkedInvoiceTitleName=='' || checkedInvoiceTitleName != item1.name.invoiceTitleName" :key="item1.name.id">
           <div v-if="item1.name.state==1">
             <div v-if="item1.name.typeId!=1 &&item1.name.typeId!=2 && item1.name.typeId!=3 && item1.name.typeId!=9" @click="addHide(item1.name.id,item1.name)">
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
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                   <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                   <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                   <div class="fr magin_top15">
                     <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                     <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                   </div>
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
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                   <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                   <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                   <div class="fr magin_top15">
                     <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                     <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                   </div>
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
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                   <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                   <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                   <div class="fr magin_top15">
                     <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                     <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                   </div>
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
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                   <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                   <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                   <div class="fr magin_top15">
                     <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                     <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                   </div>
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
                     <div class="invoiceAdmin-main-name E7A7A"> <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6'">
                       <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                         <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                     <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                     <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                     <div class="fr magin_top15">
                       <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                       <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                     </div>
                   </div>
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
                     <div class="invoiceAdmin-main-name E7A7A"> <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6'">
                       <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                         <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                     <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                     <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                     <div class="fr magin_top15">
                       <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                       <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div v-if="item1.name.typeId==1 ||item1.name.typeId==2 || item1.name.typeId==3 || item1.name.typeId==9">
               <div v-if="index1 == 0">
                 <p v-show="item1.name.categoryName!=listdata[listdata.length-1].categoryName">{{item1.name.categoryName}}</p>
                 <p v-show="item1.name.categoryName==null || item1.name.categoryName==''" style="height:1.5rem;"></p>
                 <div class="invoiceAdmin-main-p bg-ff fl font-1 opacity_6" v-if="item1.name.categoryName!=null && item1.name.categoryName!='' && item1.name.categoryName!=listdata[listdata.length-1].categoryName">
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
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                   <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                   <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                   <div class="fr magin_top15">
                     <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                     <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                   </div>
                 </div>
                 <div class="invoiceAdmin-main-p bg-ff fl font-1 opacity_6" v-if="item1.name.categoryName==listdata[listdata.length-1].categoryName" style="margin-top: 1rem;">
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
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                   <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                   <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                   <div class="fr magin_top15">
                     <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                     <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                   </div>
                 </div>
                 <div class="invoiceAdmin-main-p bg-ff fl font-1 opacity_6" v-if="item1.name.categoryName==null || item1.name.categoryName==''" style="margin-top: 1rem;">
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
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                   <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                   <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                   <div class="fr magin_top15">
                     <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                     <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                   </div>
                 </div>
               </div>
               <div v-if="index1 != 0">
                 <p v-show="item1.name.categoryName!=downdata[index1-1].name.categoryName">{{item1.name.categoryName}}</p>
                 <p v-show="item1.name.categoryName==null || item1.name.categoryName==''" style="height:1.5rem;"></p>
                 <div class="invoiceAdmin-main-p bg-ff fl font-1 opacity_6" v-if="item1.name.categoryName!=null && item1.name.categoryName!='' && item1.name.categoryName!=downdata[index1-1].name.categoryName">
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
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                   <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                   <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                   <div class="fr magin_top15">
                     <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                     <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                   </div>
                 </div>
                 <div class="invoiceAdmin-main-p bg-ff fl font-1 opacity_6" v-if="item1.name.categoryName==downdata[index1-1].name.categoryName" style="margin-top: 1rem;">
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
                     <div class="invoiceAdmin-main-name E7A7A"> <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6'">
                       <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                         <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                     <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                     <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                     <div class="fr magin_top15">
                       <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                       <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                     </div>
                   </div>
                 </div>
                 <div class="invoiceAdmin-main-p bg-ff fl font-1 opacity_6" v-if="item1.name.categoryName==null || item1.name.categoryName==''" style="margin-top: 1rem;">
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
                     <div class="invoiceAdmin-main-name E7A7A"> <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6'">
                       <div style="margin-top: -1rem;" v-if="item1.name.typeId != 4 && item1.name.typeId != '4' && item1.name.typeId != 5 && item1.name.typeId != '5' && item1.name.typeId != 6 && item1.name.typeId != '6' && item1.name.typeId != '7'&& item1.name.typeId != 7">
                         <span v-if="item1.name.invoiceStatus!=10 && item1.name.invoiceStatus!='10'" class="ellipsis_name">付款方: {{item1.name.invoiceTitleName}}</span>
                         <div v-if="item1.name.typeId == 1 || item1.name.typeId == '1' || item1.name.typeId == 2 || item1.name.typeId =='2' || item1.name.typeId ==3 ||item1.name.typeId == '3'">
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
                     <img class="img_seal" src="../../assets/img/account/img_seal@2x.png"/>
                     <div class="seal_div font-7b7"><span>{{item1.name.typeName}}</span></div>
                     <div class="fr magin_top15">
                       <img class="nocheck_img"  :id="item1.name.id+'nocheck_img'" src="../../assets/img/account/icon_unselected@2x.png"/><!---->
                       <img class="check_img" :id="item1.name.id+'check_img'" src="../../assets/img/account/icon_check@2x.png"/><!-- -->
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
        </div>
      </v-scroll>
    </div>
    <div class="fl width pst-fixed btm-0 bg-ff" v-if="listdata!=undefined && listdata.length>0" style="height: 3.75rem;line-height: 3.75rem;">
      <div class="fl" style="width: 50%;">
        <div class="fl font-108" style="padding: 0 1.0833333rem;" id="FqBx2">已选发票：{{nums}}张</div>
        <div class="fr font-167" @click="cancleCheckInvoice">取消</div>
      </div>
      <div class="fr font-167 font-col-b" id="complete" @click="toInitiateReimbPage">填写报销单</div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
    <div class="Loading" v-if="Loading"><img src="../../assets/img/Loading/loading.gif"></div>
  </div>
</template>
<script>
  import loadmore from "../index/nav/voucher/scroll.vue";/*上拉下拉*/
  import {queryInvoiceItemList} from "@/api/user/loginReg";/*findInvoicePage新接口*/
  export default {
    components: {
      'v-scroll': loadmore
    },
    data() {
      return {
        checkedInvoiceTitleName:"",
        initCheck:true,
        checkNum:0,
        counter: 1, //当前页
        num: 10, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        allData:[],//全部发票数据
        allCheckData:[],//未停用发票
        listdata: [], // 下拉更新数据存放数组
        downdata: [], // 上拉更多的数据存放数组
        Loading:false,
        scrollData:{
          noFlag: false //暂无更多数据显示
        },
        content:"",
        error_prompt:"",
        nums:"0",/*选中张数*/
        idArr:[],/*选中*/
        searchData:{
          companyId:"",
          itemCode:"",
        },
        causeValue:"",
        price:"0.00",
        dtlList:[],
      }
    },
    mounted:function(){
      this.init();
      this.getList(this.pageBackInfo()); //初始化获取发票列表
      this.$nextTick(function(){
        setInterval(this.fillIntimer,2000);
      })
    },
    methods: {
      fillIntimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      //to填写报销单页
      toInitiateReimbPage(){
        for(let i=0;i<this.idArr.length;i++){
          this.idArr[i].sort = i+1;
        }
        if(document.getElementById('complete').style.opacity == 1){
          this.$router.push({name:'cause',params:{idArr:this.idArr,price:this.price,causeValue:this.causeValue,dtlList:this.dtlList}});
        }
      },
      getList(callback) {
        let accessToken = localStorage.getItem('userID');
        this.searchData.companyId = localStorage.getItem('companyId');
        this.searchData.itemCode = localStorage.getItem('mainSubjectCode');
        queryInvoiceItemList(accessToken,this.searchData).then(res =>{
          if(res.data.code == 200){
            this.allData = res.data.data;
            for(let i=0;i<this.allData.length;i++){
                if(this.allData[i].state==1){
                    this.allCheckData.push(this.allData[i]);
                }
            }
            this.listdata = this.allCheckData.slice(0,this.num);
            callback;
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
      onLoadMore(done) {
        this.counter++;
        let end = this.pageEnd = this.num * this.counter;
        let i = this.pageStart = this.pageEnd - this.num;
        let alldata = this.allData;
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
          done();
        }, 500);
      },
      //选中&不选中状态idArr值的变化
      addHide(id,data){
        let flag = false;
        let arrs =this.idArr;
        if(this.idArr!=undefined){
          if(this.idArr.length>0){
            for(let i=0;i<arrs.length;i++){
              if(arrs[i].invoiceId == id || arrs[i].id == id){
                if(arrs[i].typeId == 1 || arrs[i].typeId == 2 ||arrs[i].typeId == 3 || arrs[i].typeId == 9 ||arrs[i].typeId == '1' || arrs[i].typeId == '2' || arrs[i].typeId == '3' || arrs[i].typeId == '9'){
                  this.checkNum-=1;
                }
                arrs.splice(i,1);
                document.getElementById(id+'nocheck_img').style.display = 'block';
                document.getElementById(id+'check_img').style.display = 'none';
                flag = true;
                if(this.checkNum == 0){
                  this.checkedInvoiceTitleName = "";
                  this.initCheck = true;
                }
              }
            }
            if(!flag){
              if(data.typeId == 1 || data.typeId == 2 ||data.typeId == 3 || data.typeId == 9 ||data.typeId == '1' || data.typeId == '2' || data.typeId == '3' || data.typeId == '9'){
                this.checkNum+=1;
              }
              this.idArr.push(data);
              document.getElementById(id+'nocheck_img').style.display = 'none';
              document.getElementById(id+'check_img').style.display = 'block'
            }
          }else{
            if(!flag){
              this.idArr.push(data);
              if(data.typeId == 1 || data.typeId == 2 ||data.typeId == 3 || data.typeId == 9 ||data.typeId == '1' || data.typeId == '2' || data.typeId == '3' || data.typeId == '9'){
                this.checkNum+=1;
                this.checkedInvoiceTitleName = data.invoiceTitleName;
                this.initCheck = false;
              }
              document.getElementById(id+'nocheck_img').style.display = 'none';
              document.getElementById(id+'check_img').style.display = 'block'
            }
          }
        }else{
          if(!flag){
            this.idArr.push(data);
            if(data.typeId == 1 || data.typeId == 2 ||data.typeId == 3 || data.typeId == 9 ||data.typeId == '1' || data.typeId == '2' || data.typeId == '3' || data.typeId == '9'){
              this.checkNum+=1;
              this.checkedInvoiceTitleName = data.invoiceTitleName;
              this.initCheck = false;
            }
            document.getElementById(id+'nocheck_img').style.display = 'none';
            document.getElementById(id+'check_img').style.display = 'block'
          }
        }
        this.nums = "（"+ arrs.length + "）";
        this.initIdArr();
      },
      //取消全部选中的发票
      cancleCheckInvoice(){
        this.idArr = [];
        this.nums = 0;
        let checkImgArrs = document.getElementsByClassName('check_img');
        let noCheckImgArrs = document.getElementsByClassName('nocheck_img');
        for(let i=0;i<checkImgArrs.length;i++){
          checkImgArrs[i].style.display = 'none';
        }
        for(let i=0;i<noCheckImgArrs.length;i++){
          noCheckImgArrs[i].style.display = 'block';
        }
        this.initIdArr();
      },
      initIdArr(){
        let FqBx2 = document.getElementById('FqBx2');
        let complete = document.getElementById('complete');
        if(this.idArr!=undefined){
          if(this.idArr.length>0){
            if(FqBx2!=null){
              complete.style.opacity = 1
            }
          }else{
            if(FqBx2!=null){
              complete.style.opacity = 0.3
            }
          }
        }else{
          if(FqBx2!=null){
            complete.style.opacity = 0.3
          }
        }
      },
      init(){
        if(this.$route.params.tabList!=undefined && this.$route.params.tabList!="") {
          this.idArr = this.$route.params.tabList;
        }
        if(this.$route.params.price!=undefined && this.$route.params.price!=null && this.$route.params.price!='null' && this.$route.params.price!="undefined"){
          this.price = this.$route.params.price;
          localStorage.setItem('price',this.price);
        }else{
          if(localStorage.getItem('price')!=undefined && localStorage.getItem('price')!="undefined" && localStorage.getItem('price')!=null){
            this.price = localStorage.getItem('price');
          }
        }
        if(this.$route.params.causeValue!=undefined && this.$route.params.causeValue!=null && this.$route.params.causeValue!='null' && this.$route.params.causeValue!="undefined"){
          this.causeValue = this.$route.params.causeValue;
          localStorage.setItem('causeValue',this.causeValue);
        }else{
          if(localStorage.getItem('causeValue')!=undefined && localStorage.getItem('causeValue')!="undefined" && localStorage.getItem('causeValue')!=null){
            this.causeValue = localStorage.getItem('causeValue');
          }
        }
        if(this.$route.params.dtlList!=undefined && this.$route.params.dtlList!=null && this.$route.params.dtlList!='null' && this.$route.params.dtlList!="undefined"){
          this.dtlList = this.$route.params.dtlList;
          localStorage.setItem('dtlList',JSON.stringify(this.dtlList));
        }else{
          if(localStorage.getItem('dtlList')!=undefined && localStorage.getItem('dtlList')!="undefined" && localStorage.getItem('dtlList')!=null){
            this.dtlList=JSON.parse(localStorage.getItem('dtlList'));
          }
        }
      },
      //页面回显信息
      pageBackInfo(){
        let idArr = this.idArr;
        this.nums = " "+ idArr.length + " ";
        let self = this;
        setTimeout(function () {
          let FqBx2 = document.getElementById('FqBx2');
          if(idArr!=undefined){
            if(idArr.length>0){
              let arrs =idArr;
              for(let i=0;i<arrs.length;i++){
                  if(arrs[i].typeId == 1 || arrs[i].typeId == 2 ||arrs[i].typeId == 3 || arrs[i].typeId == 9 ||arrs[i].typeId == '1' || arrs[i].typeId == '2' || arrs[i].typeId == '3' || arrs[i].typeId == '9'){
                      this.checkNum+=1;
                      self.checkedInvoiceTitleName = arrs[i].invoiceTitleName;
                      self.initCheck = false;
                  }
                  document.getElementById(arrs[i].id+'nocheck_img').style.display = 'none';
                  document.getElementById(arrs[i].id+'check_img').style.display = 'block'
              }
              if(FqBx2!=null){
                complete.style.opacity = 1
              }
            }else{
              if(FqBx2!=null){
                complete.style.opacity = 0.3
              }
              self.checkedInvoiceTitleName = "";
              self.initCheck = true;
            }
          }else{
            if(FqBx2!=null){
              complete.style.opacity = 0.3;
            }
            self.checkedInvoiceTitleName = "";
            self.initCheck = true;
          }
        },300)
      },
    }
  }
</script>
<style lang="less">
  .yo-scroll{
    height:92%;
    padding-top: 0;
  }
  .chooseInvoice-margin-108{
    margin: 0.2rem 1.08333333rem;
  }
  .chooseInvoice_ul_li:last-child{
    border-bottom: 0;
  }
  .invoiceAdmin-main-mon{
    font-size: 2.16666667rem;
    line-height: 2.16666667rem;
  }
  .invoiceAdmin-main-p{
    border-radius: 0.4rem;
    padding: 0.666666667rem 1rem;
    width:93%;
  }
  .invoiceAdmin-main-name{
    padding-top: 6.5166667rem;
    height:1.5rem;
    width:100%;
  }
  .chooseInvoice  .check_img{
    width: 1.5rem;
    display: none;
  }
  .chooseInvoice  .nocheck_img{
    width: 1.5rem;
  }
  #complete{
    padding: 0 2.5rem;
    background: #FFA436;
    opacity:0.3;
  }
  .taxFree{
    width:3.0833333rem;
    margin-top: 0.5rem;
  }
  .chooseInvoice #backstage p,.chooseInvoice #backstage1 p{
    line-height: 2.5rem;
    font-size: 1rem;
    color: #A39C9C;
  }
</style>

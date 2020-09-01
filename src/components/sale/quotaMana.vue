<template>
    <div class="quotaMana height width bg-f6">
      <div class="quotaMana-Tips width" v-if="showTips">
        <div class="quotaMana-Tips_div font-1 font-F89">
          <p>绑定1张银行卡的每月最大代卖额度为100,000元</p>
          <p>绑定2张或以上银行卡，每月最大代卖额度为200,000元</p>
        </div>
      </div>
      <div class="quotaMana-Tips_error width" v-if="showTipsError">
        <div class="quotaMana-Tips_errorDiv font-22d font-167">
          <img class="pst-abs" style="width: 1.33333rem;" src="../../assets/img/sale/icon_notice@2x.png">
          <p style="margin-left: 2rem">您当前最高代卖额度不足10元，不能开启智能代卖</p>
        </div>
      </div>
      <div class="width">
        <!--<img class="quotaMana-change_img" @click="changeCardName" src="../../assets/img/sale/icon_exchange@2x.png">-->
        <div class="quotaMana-card bg-ff font-125 width" v-for="(item,index) in cardNameList" v-if="index==0">
          <span class="mG-lft183 font-2a2a">首选提现卡</span>
          <div class="fr" style="margin-right: 1.666667rem;" @click="toCarryOrderPage">
            <img class="quotaMana-card_img fr" src="../../assets/img/right.png"/>
            <div class="fr font-125 font-2a2a" v-if="item.bankName!=''"><span>{{item.bankName}}</span><span class="font-a39 fr cont" style="width:6.1666667rem;">({{item.bankNumber | bankNumberFormat}})</span></div>
            <span class="font-22d fr" v-if="item.bankName==''">必填，请选择提现银行卡</span>
          </div>
          <!--<div class="width fr" v-if="index==1" style="margin: -4.5rem 5rem;" @click="chooseCards(item.cardName,index)">
            <img class="quotaMana-card_img fr" src="../../assets/img/right.png"/>
            <div class="fr" style="margin-right: 0.5rem;width: 33.7%;" v-if="item.cardName!=''"><span>{{item.cardName}}</span><span class="font-a39 fr">({{item.cardNum}})</span></div>
            <span class="font-7b7 fr" v-if="item.cardName==''">请选择提现银行卡</span>
          </div>-->
        </div>
      </div>
      <div class="quotaMana-month mG-top bg-ff cont width">
        <p class="width mG-top font-167 padTop-1">每月代卖额度</p>
        <p class="width font-a39 font-108" style="margin-top: 0.33333rem">可设代卖额度{{queryQuotaManaData.maxSaleAmountMonth|moneyFormat}}元</p>
        <div class="quotaMana-month_mon width padTop-1 cont">
          <input type="number" pattern="\d*" step="0.01" v-on:keyup="onlyNumber(saleQuota)" class="quotaMana-month_money cont" v-if="disabledQuota" disabled v-model="saleQuota"/>
          <input type="number" pattern="\d*" step="0.01" v-on:keyup="onlyNumber(saleQuota)" class="quotaMana-month_money cont" v-if="!disabledQuota" v-model="saleQuota"/>
        </div>
        <p class="width font-a39 font-1 pd-bt">（最小额度为10元）</p>
      </div>
      <div class="quotaMana-Agreement width" v-if="!this.$root.$data.isOpenSale">
        <div class="width">
          <img class="Agreement_icon fl" v-if="ischeckAgree" @click="changeCheckAgree" src="../../assets/img/sale/icon_Radio_selected@2x.png"/>
          <img class="Agreement_icon fl" v-if="!ischeckAgree" @click="changeCheckAgree" src="../../assets/img/sale/icon_Radio_unselected@2x.png"/>
          <span class="font-3b9 font-108 fl" style="margin:1.0833333rem 0 0 .5rem;" @click="alertAgreeContent=true">智能代卖协议</span>
        </div>
        <div class="quotaMana-foot width fl" @click="openSale">
          <div class="quotaMana-foot-btn width fl cont"><p class="quotaMana-foot-font1 font-133 font-col-b bRadius-3" ref="openSale">开启</p></div>
        </div>
        <div  class="quotaMana-Explain fl width cont">
          <div class="pd1083"><span class="font-ipt font-167">智能代卖规则说明</span></div>
        </div>
        <div class="pd1083 fl font-ipt font-167 bg-f6">
          <p class="pd-tp0583">1、单一身份证每月最高代卖额度为200,000元。若同一身份证有多个账户，则多个账户
            每月共享200,000元的代卖额度。</p>
          <p class="pd-tp0583">2、单一账户每月最低智能代卖额度为10元。</p>
          <p class="pd-tp0583">3、开启智能代卖后，系统每隔1小时自动执行代卖交易，每天可手动发起1次代卖。</p>
          <p class="pd-tp0583">4、从易得多买入的消费券不会参与自动代卖交易。如您仍然需要转卖，可在易得多手动
            发起。</p>
          <p class="pd-tp0583">5、开启智能代卖后，如果单一账户中所有消费券（不包含易得多购买的消费券）的可转
            让总金额未足10元，系统将不会发起自动代卖交易。</p>
          <p class="pd-tp0583">6、代卖会根据消费券类型产生不同的代卖折损比例，预计收益为本次代卖额度*代卖折
            损比例。当前主要消费券代卖折损比例如下：</p>
          <p class="pd-tp0583">  个人消费券</p>
          <div>
            <table class="table_style width font-075" border="1" cellspacing="0">
              <tr class="bg-cc">
                <th>券名称</th>
                <th>代卖折损比例</th>
              </tr>
              <tr v-for="item in itemsPer">
                <td>{{item.name}}</td>
                <td>{{item.rate}}</td>
              </tr>
            </table>
          </div>
          <p class="pd-tp0583">  企业消费券</p>
          <div>
            <table class="table_style width font-075" border="1" cellspacing="0">
              <tr class="bg-cc">
                <th>券名称</th>
                <th>代卖折损比例</th>
              </tr>
              <tr v-for="item in itemsCompany">
                <td>{{item.name}}</td>
                <td>{{item.rate}}</td>
              </tr>
            </table>
          </div>
          <p class="pd-tp0583">7、代卖收益将在24小时内回款至指定银行卡，单笔到账最高49500元，如超单笔限额，
            将分拆多笔到账。</p>
          <p class="pd-tp0583">8、单张银行卡每日到账最高99,000元，如超额，将按照绑定提现卡顺序提现至其他银
            行卡。</p>
          <p class="pd-tp0583">9、单人每月到账最高198,000元，如超额，将保留至次月并按照最新绑定提现卡顺序提
            现。</p>
          <p class="pd-tp0583">10、智能代卖规则说明最终解释权归智惠嘉所有。</p>
        </div>
      </div>
      <div class="quotaMana-noAgre cont" v-if="this.$root.$data.isOpenSale">
        <div class="quotaMana-foot width fl">
          <div class="quotaMana-foot-btn width fl cont"><p class="quotaMana-foot-font2 font-133 font-col-b bRadius-3" ref="saveSale" @click="saveSale">保存</p></div>
        </div>
        <span class="font-3b9 font-167" @click="closeBox = true">关闭智能代卖</span>
      </div>
      <section class="zz" v-if="alertAgreeContent">
        <div class="wrapcenter height">
          <div class="quotaMana-wrapcenter_tips bg-ff">
            <div class="quotaMana-section_top font-133 cont bd-btm"><span style="line-height: 3.8333333rem;">智能代卖协议</span></div>
            <div class="quotaMana-section_middle bd-btm width">
              <div class="quotaMana-section_middleContent font-ipt font-1">
                <p>您在使用智能代卖服务前，应当仔细阅读《智惠嘉智能代卖协议》（以下简称“本协议”）中的全部内容及《智惠嘉智能代卖规则》（以下简称“代卖规则”）的内容，确认对本协议及各项代卖规则均已知晓、理解并接受，并已同意将其作为确定双方权利义务的依据。如您通过网络页面点击勾选或以其他方式选择同意接受本协议，即视为您已阅读并与本公司达成协议，自愿接受本协议及代卖规则的所有内容的约束。所有代卖规则视为本协议不可分割的一部分，与本协议具有同等法律效力。如果您不同意本协议的任意内容，或者无法准确理解本公司对条款的解释，请不要进行后续操作。</p>
                <p>本协议是砾洲(上海)企业服务有限公司 (以下简称“本公司”）与使用智能代卖服务的使用人（以下简称“用户”或“您”)就通过智惠嘉平台（关注微信公众号智惠嘉，提供员工消费券使用、简易报销、查看账户信息等功能）对个人消费券发起智能代卖并自动回款服务（以下简称“智能代卖”）相关事项所订立的服务条款，具有正式书面合同的效力。</p>
                <p class="font-b">第一条  您的权利与义务</p>
                <p>1、您知晓并同意，当您开通智能代卖服务后，本公司将通过智惠嘉平台接受您的委托，向您的消费券账户发起消费券自动转卖、收益回款的操作服务。</p>
                <p>2、请您确保使用本服务过程中提供的资料真实、准确、完整、有效。智惠嘉平台按照您提供的相关信息为您提供相应服务。如您提供不真实、不准确、不完整或已经失效的信息，您需要承担相应损失或责任；</p>
                <p>3、您基于本协议下进行智能代卖业务申请时,应预测并留存足够的消费券额度以保障您后续通过指定账户完成相关交易，否则可能导致您指定账户不足以支付您的其他支付霊求。若因此给您造成的损失（包括但不限于因其他支付需求无法完成而带来的损失等），由您自行承担。</p>
                <p>4、您同意签订本协议并提交后，可终止协议。智能代卖协议状态为正常时方可终止协议。 关于智能代卖业务的终止：若您是在当日发出消费券转卖指令前终止协议,当日不执行智能代卖指令，若您是在当日发出消费券转卖指令之后终止协议，自下一个自然日起不执行消费券智能代卖，智能代卖业务的终止即刻生效。</p>
                <p>5、您使用本服务过程中使用的绑定银行卡状态应为正常可用，如果因银行卡状态异常或其他您自身原因导致智能代卖的回款服务失败，本公司将不再自动发起回款操作。若因此给您造成的损失，由您自行承担。</p>
                <p class="font-b">第二条  本公司的权利与义务</p>
                <p>1、本公司有权根据自身业务的发展，增加、减少或撤销智能代卖的服务券类型、调整服务券代卖折损比例、调整智能代卖服务的内容，并且有权对本服务进行升级、改造。如因此导致您产生其他损失的，您需要承担相应的损失或责任。</p>
                <p>2、本公司应当在技术上确保整个智能代卖的安全、有效、正常运行，保证您能够顺利使用智能代卖服务，并向您提供交易记录、交易资金状态、账户状态等查询的服务。 但不承担因通讯、停电故障、黑客攻击、银行问题、相关机构单位出账问题、不可抗力等非本公司原因所引起交易中断、交易错误引起的责任。</p>
                <p>3、由于智能代卖服务将面对众多的用户，系统承载能力也有限，故我们无法每天持续不间断地为您发起智能代卖操作。具体自动代卖时点、次数将视系统条件决定。因此，可能出现我们当天发起智能代卖操作时您拥有的可代卖消费券金额不足，而自动代卖时点之后您才拥有足够的可代卖消费券金额的情形，此类情形会导致当天智能代卖失败。</p>
                <p>4、本公司承诺不会以任何形式挪用您消费券智能代卖的收益回款资金。</p>
                <p class="font-b">第三条  差错处理</p>
                  <p>由于您未按规定操作，或者您自身其他原因造成消费券自动代卖未执行或延迟执行的、自动回款部分失败或全部失败的，您应及时通过拨打客服电话：400 821 6990或通过在线客服通知本公司。本公司应积极调查并告知您调查结果。</p>  
                <p class="font-b">第四条  协议的变更和终止</p>  
                <p>1、为了进一步改善用户体验，本公司将会持续开发新服务，为用户提供版本升级、功能升级等服务和内容更新。这些更新将会持续同步在本协议条款或代卖规则当中，更新内容经公布后生效。若您不同意变更修改后的条款内容，您有权停止使用相关服务。如果更新内容涉及您的主要权利或责任，我们会以公告方式向您进行提示，您也可以随时在智惠嘉平台相关页面查阅最新版本的本协议及代卖规则内容。</p>
                <p>2、本公司不对因下述任一情况而发生的服务中断或终止承担任何赔偿责任：</p>
                <p>2.1 本公司基于客观证据，发现您违反本协议的规定，本公司可中断或终止向您提供部分或全部服务功能，并将您用户资料加以删除。</p>
                <p>2.2 发现您注册资料虚假、异常交易或有疑义或有违法嫌疑时，本公司不经通知有权先行中断或终止您使用全部或部分服务功能。</p>
                <p>3、如您在智惠嘉平台上存在违法行为或违反本协议的行为，或因您此前使用本服务的行为引发争议的，本公司仍可行使追究的权利。</p>
                <p>4、本协议有效期至您主动关闭终止智能代卖服务日止，但如本公司业务发生调整，不再提供本服务，我们有权主动终止与您的协议。届时会通过公告形式告知。</p>
                <p class="font-b"> 第五条  违约责任</p>
                <p>   本协议任何一方违反本协议规定的内容，给另一方造成损害的，应当承担违约责任，并就这直接损失进行赔偿</p>
                <p class="font-b"> 第六条  通知</p>
                <p>关于您使用智能代卖服务的通知，智惠嘉平台将以电子形式或纸张形式通知您，包括但不限于依据您提供的电子邮件地址发送电子邮件的方式、依据您提供的联系地址寄送挂号信的方式、于本公司公众号上公布、或发送手机短信和电话通知等方式。在服务期间，我们将您提交的上述电子邮件地址、联系地址、手机、电话等联系方式视为有效使用状态；若发生变化,请您第一时间按照智惠嘉平台规定的方式进行变更。上述通知一旦发送将视为有效送达。</p>
                <p class="font-b"> 第七条  法律适用</p>
                   <p>1、本协议适用中华人民共和国大陆地区法律。就本协议的确认、履行或解释发生争议，本公司与您应努力友好协商解决。如协商不成，双方同意由被告所在地法院管辖审理双方的纠纷或争议。</p>
                    <p>2、若本协议中的某一部分条款或描述被相关司法机关判定为无效，该判定无效并不影响其他部分的有效性，您仍需依照本协议中的其他部分条款履行相关义务同时行使相关权利。</p>
              </div>
              <div class="font-2a2a font-108 pd1083">在接受本协议之前,请您仔细阅读本协议的全部内容。</div>
            </div>
            <div class="section_bottom">
              <div class="qx_set1 font-133 font-F89" @click="alertAgreeContent=false">确定</div>
            </div>
          </div>
        </div>
      </section>
      <!--确认删除弹框-->
      <section class="zz" v-if="closeBox">
        <div class="wrapcenter">
          <div class="quotaManaDel_tips bg-ff">
            <div class="section_top1 cont font-133"><p style="line-height: 4.66667rem">您确认要关闭智能代卖吗？</p></div>
            <div class="section_bottom">
              <div class="qx_set bd-rt-ddd" @click="closeSale">关闭</div>
              <div class="qx_set font-fa" @click="closeBox = false">再考虑一下</div>
            </div>
          </div>
        </div>
      </section>
      <!--<div class="zz" v-show="cardsBox">
        <div class="width bg-f6 pst-abs btm-0 fl">
          <div class="bg-ff cont font-s15 padTop-1 pd-bt">选择银行卡</div>
          <div class="bg-ff mG-top fl width">
            <div class="fl bd-btm width CardD-pd-1" v-for="(item,index) in bankCardList" @click="addcheckCard(item.cardName,item.cardNum)">
              <div class="fl">
                <img class="CardD-maskIcon" :src="item.url"/>
              </div>
              <div class="fl">
                <p class="font-s15 padTop-1">{{item.cardName}}</p >
                <p class="font-108 font-a39">{{item.cardNum}}</p >
              </div>
              <div class="fr" v-if="nowCardName == item.cardName"><img style="width: 1.166667rem;margin: 2rem 1.5rem;" src="../../assets/img/sale/icon_tick@2x.png"/></div>
            </div>
          </div>
          <div class="fl width wrapcenter CardD-foot bg-ff" style="height: 5rem;" @click="addCard">
            <img class="CardD-maskIcon" style="margin: 1.5rem 0.33333rem 1.5rem 1.083333rem;" src="../../assets/img/sale/icon_add_to@2x.png">
            <p class="fl font-125" style="line-height: 5rem">使用新卡</p>
          </div>
        </div>
      </div>-->
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess" style="margin-top: 20%;">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="setQuota_format">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script>
  import {findSubstituteSaleConfigByMemberId,addSubstitute,updateSubstitute,findMaxSaleAmountMonth,openOrCloseSubstituteSale,findWithdrawBankCardList} from '@/api/saleApi/saleJs'
  export default{
    data: function () {
      return {
          cardNameList:[
            /*{bankName:"工商银行",bankNumber:"*8252"},*/
          ],
        //个人代卖折损比例列表
        itemsPer:[
          {name:"通用券",rate:"4.5%"},
          {name:"旅游券",rate:"4.5%"},
          {name:"培训券",rate:"10%"},
          {name:"咨询券",rate:"10%"},
          {name:"信息券",rate:"10%"},
          {name:"福利券",rate:"4.5%"}
        ],
        //企业代卖折损比例列表
        itemsCompany:[
          {name:"通用券",rate:"1%"},
          {name:"旅游券",rate:"2%"},
          {name:"办公券",rate:"2%"},
          {name:"电商券",rate:"2%"},
          {name:"服务券",rate:"2%"},
          {name:"信息券",rate:"2%"},
          {name:"通信券",rate:"2%"}
        ],
          saleQuota:"10.00",
          disabledQuota:false,
          content:"",
          error_prompt:"",
          ischeckAgree:false,
          alertAgreeContent:false,
          showTips:false,
          showTipsError:false,
          cardsBox:false,
          nowCardName:"",
          nowCardNum:"",
          closeBox:false,
          queryQuotaManaData:{
            maxSaleAmountMonth:"",
          },
          setorUpdateQuotaMana:{
              id:"",/*代卖配置id false*/
              saleAmountMonth:"",/*每月设置代卖额度*/
              bankCardIdList:[],/*提现银行卡id集合*/
          },
        closeSaleParms:{
          status:"0",
          id:""
        }
      }
    },
    methods:{
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      //切换银行卡号按钮
     /* changeCardName(){
        let itemCardName = "";
        let itemCardNum = "";
        itemCardName = this.cardNameList[0].cardName;
        this.cardNameList[0].cardName = this.cardNameList[1].cardName;
        this.cardNameList[1].cardName = itemCardName;
        itemCardNum = this.cardNameList[0].cardNum;
        this.cardNameList[0].cardNum = this.cardNameList[1].cardNum;
        this.cardNameList[1].cardNum = itemCardNum;
      },*/
      //弹出银行卡列表
     /* chooseCards(cardName,num){
        this.nowCardName = cardName;
        this.nowCardNum = num;
        this.cardsBox = true;
      },*/
     //ToDo to提现顺序页面
      toCarryOrderPage(){
        this.$router.push({name:'carryOrder',params:{cardNameList:this.cardNameList}});
      },
      //选择银行卡
    /*  addcheckCard(cardName,cardNum){
        this.cardNameList[this.nowCardNum].cardName = cardName;
        this.cardNameList[this.nowCardNum].cardNum = '*5689';
        this.cardsBox = false;
      },*/

      //只能输入两个小数
      onlyNumber(ele) {
        if (ele.toString().split(".").length > 1 && ele.toString().split(".")[1].length > 2) {
          //alert("最多只能有两位小数！");
          ele = ele.toString().split(".")[0]+"."+ele.toString().split(".")[1].substr(0,2);
        }
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(ele.match(pattern_chin1)!=null){
          ele = '';
        }else{
          let reg = /^\d+(\.\d{0,2})?$/;
          if(reg.test(ele)){
            //ele = parseFloat(ele);
            if(ele>this.queryQuotaManaData.maxSaleAmountMonth/1000){
              this.error_prompt="tel-message";
              this.content = "设置额度不能大于每月剩余额度";
              if(this.$root.$data.isOpenSale){
                this.$refs.saveSale.style.opacity = 0.3;
              }else{
                this.$refs.openSale.style.opacity = 0.3;
              }
            }else if(ele<10){
              if(this.$root.$data.isOpenSale){
                this.$refs.saveSale.style.opacity = 0.3;
              }else{
                this.$refs.openSale.style.opacity = 0.3;
              }
            }else{
              if(this.$root.$data.isOpenSale){
                this.$refs.saveSale.style.opacity = 1;
              }else{
                if(this.ischeckAgree){
                  this.$refs.openSale.style.opacity = 1;
                }else{
                  this.$refs.openSale.style.opacity = 0.3;
                }
              }
            }
          }else{
            ele = "";
            this.error_prompt="tel-message";
            this.content = "请输入数字格式,最多两位小数";
            if(this.$root.$data.isOpenSale){
              this.$refs.saveSale.style.opacity = 0.3;
            }else{
              this.$refs.openSale.style.opacity = 0.3;
            }
          }
        }
        this.saleQuota = ele;
      },
      handleInput2(e) {
        // 通过正则过滤小数点后两位
        /*e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null*/
      },
      //选中代卖协议
      changeCheckAgree(){
          this.ischeckAgree = !this.ischeckAgree;
          if(this.ischeckAgree){
            if(this.saleQuota>this.queryQuotaManaData.maxSaleAmountMonth/1000 || this.saleQuota<10){
              this.$refs.openSale.style.opacity = 0.3;
            }else{
              this.$refs.openSale.style.opacity = 1;
            }
          }else{
            this.$refs.openSale.style.opacity = 0.3;
          }
      },
      //开启开启智能代卖&添加额度设置
      openSale(){
        this.setorUpdateQuotaMana.saleAmountMonth = this.saleQuota;
        for(let i=0;i<this.cardNameList.length;i++){
          this.setorUpdateQuotaMana.bankCardIdList[i] = this.cardNameList[i].id;
        }
        if(this.setorUpdateQuotaMana.saleAmountMonth>this.queryQuotaManaData.maxSaleAmountMonth/1000 || this.setorUpdateQuotaMana.saleAmountMonth<10){
          this.$refs.openSale.style.opacity = 0.3;
        }else{
          if(this.ischeckAgree){
            this.$refs.openSale.style.opacity = 1;
          }else{
            this.$refs.openSale.style.opacity = 0.3;
            this.error_prompt="tel-message";
            this.content = '请勾选代卖协议';
          }
        }
        if(this.ischeckAgree && this.$refs.openSale.style.opacity == 1){
          addSubstitute(localStorage.getItem('userID'),this.setorUpdateQuotaMana).then(res =>{
            if(res.data.code == 200){
              this.$root.$data.isOpenSale = true;
              localStorage.setItem('isOpenSale',true);
              this.$router.push({name:'saleHome'});
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else if(!this.ischeckAgree){
          this.error_prompt="tel-message";
          this.content = '请勾选代卖协议';
        }
      },
      //保存额度管理设置
      saveSale(){
        this.setorUpdateQuotaMana.saleAmountMonth = this.saleQuota;
        for(let i=0;i<this.cardNameList.length;i++){
          this.setorUpdateQuotaMana.bankCardIdList[i] = this.cardNameList[i].id;
        }
        if(this.setorUpdateQuotaMana.saleAmountMonth>this.queryQuotaManaData.maxSaleAmountMonth/1000 || this.setorUpdateQuotaMana.saleAmountMonth<10){
          this.$refs.saveSale.style.opacity = 0.3;
        }else{
          this.$refs.saveSale.style.opacity = 1;
        }
        if(this.$refs.saveSale.style.opacity == 1){
          updateSubstitute(localStorage.getItem('userID'),this.setorUpdateQuotaMana).then(res =>{
            if(res.data.code == 200){
              this.$router.push({name:'saleHome'});
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }

      },
      //关闭智能代卖
      closeSale(){
        this.closeSaleParms.id = this.setorUpdateQuotaMana.id;
        openOrCloseSubstituteSale(localStorage.getItem('userID'),this.closeSaleParms.id,this.closeSaleParms.status).then(res =>{
          if(res.data.code == 200){
            this.$root.$data.isOpenSale = false;
            localStorage.setItem('isOpenSale',false);
            this.closeBox = false;
            this.$router.push({name:'intelligentSale'});
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
            this.closeBox = false;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
          this.closeBox = false;
        })
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      let flag = localStorage.getItem('isOpenSale');
      if(flag == true || flag == 'true'){
        this.$root.$data.isOpenSale = true;
      }else{
        this.$root.$data.isOpenSale = false;
      }
      if(this.$root.$data.isOpenSale){
          findSubstituteSaleConfigByMemberId(localStorage.getItem('userID')).then(res =>{
         if(res.data.code == 200){
         this.queryQuotaManaData = res.data.data;
         this.setorUpdateQuotaMana.id = res.data.data.id;
         this.cardNameList = res.data.data.bankCardList;
         this.saleQuota = (res.data.data.saleAmountMonth/1000).toFixed(2);
         //this.saleQuota = String.format("%.2f", this.saleQuota);
         if(this.queryQuotaManaData.maxSaleAmountMonth/1000<10){
             this.saleQuota = '0.00';
             this.disabledQuota = true;
             this.showTipsError = true;
             this.showTips = false;
         }else{
           this.showTipsError = false;
           this.showTips = true;
         }
         localStorage.setItem('cardNameList',JSON.stringify(this.cardNameList));
         }else{
           this.error_prompt="tel-message";
           this.content = res.data.msg;
           this.saleQuota = '0.00';
           this.disabledQuota = true;
           this.showTipsError = true;
           this.showTips = false;
         }
         },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
            this.saleQuota = '0.00';
            this.disabledQuota = true;
            this.showTipsError = true;
            this.showTips = false;
         })
      }else{
        if(this.cardNameList == null || this.cardNameList.length == 0){
          findWithdrawBankCardList(localStorage.getItem('userID')).then(res =>{
            if(res.data.code == 0){
              this.cardNameList = res.data.data;
            }
          },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }
       /* findSubstituteSaleConfigByMemberId(localStorage.getItem('userID')).then(res =>{});*/
        findMaxSaleAmountMonth(localStorage.getItem('userID')).then(res =>{
          if(res.data.code == 200){
            this.queryQuotaManaData.maxSaleAmountMonth = res.data.data;
            if(this.queryQuotaManaData.maxSaleAmountMonth/1000<10){
              this.saleQuota = '0.00';
              this.disabledQuota = true;
              this.showTipsError = true;
              this.showTips = false;
            }else{
              this.showTipsError = false;
              this.showTips = true;
            }
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
            this.saleQuota = '0.00';
            this.disabledQuota = true;
            this.showTipsError = true;
            this.showTips = false;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
          this.saleQuota = '0.00';
          this.disabledQuota = true;
          this.showTipsError = true;
          this.showTips = false;
        })
      }
    },
    watch:{
      saleQuota(newValue, oldValue){
        if(this.queryQuotaManaData.maxSaleAmountMonth=="" || this.queryQuotaManaData.maxSaleAmountMonth==0){
          if(this.$root.$data.isOpenSale){
            this.$refs.saveSale.style.opacity = 0.3;
          }else{
            this.$refs.openSale.style.opacity = 0.3;
          }
        }else{
          if(newValue<=200000){
            if(newValue>this.queryQuotaManaData.maxSaleAmountMonth/1000 || newValue<10){
              if(this.$root.$data.isOpenSale){
                this.$refs.saveSale.style.opacity = 0.3;
              }else{
                this.$refs.openSale.style.opacity = 0.3;
              }
            }else{
              if(this.$root.$data.isOpenSale){
                this.$refs.saveSale.style.opacity = 1;
              }else{
                if(this.ischeckAgree){
                  this.$refs.openSale.style.opacity = 1;
                }else{
                  this.$refs.openSale.style.opacity = 0.3;
                }
              }
            }
          }else{
            this.saleQuota = oldValue;
          }
        }
      }
    }
  }
</script>
<style>
  .quotaMana .quotaMana-Tips{
    height: 4.9166667rem;
    background: #FFF4E8;
  }
  .quotaMana .quotaMana-Tips_error{
    height: 3rem;
    background: #FFDCDD;
  }
  .quotaMana .quotaMana-Tips_div{
    padding: 0.666667rem 1rem 0.666667rem;
    line-height: 1.8rem;
  }
  .quotaMana .quotaMana-Tips_errorDiv{
    padding: 0.666667rem 0 0.666667rem 1rem;
    line-height: 1.8rem;
  }
/*  .quotaMana-change_img{
    width: 2.1666667rem;
    float: right;
    margin: 3.0833333rem 1.083333rem;
  }*/
 .quotaMana .quotaMana-card{
   line-height: 4.166667rem;
  }
 .quotaMana .quotaMana-card .quotaMana-card_img{
   margin: 1.5rem 0 1.5rem 0.8333333rem;
   width:0.5833333rem;
 }
 .quotaMana .quotaMana-month{
   height: 13.583333rem;
  }
 .quotaMana .quotaMana-month .quotaMana-month_mon{
    font-size:3.583333333rem ;
  }
 .quotaMana .quotaMana-month .quotaMana-month_mon .quotaMana-month_money{
   height: 4.666667rem;
   line-height: 4.666667rem;
   font-size: 3.583333333rem;
   font-family: inherit;
 }
  .quotaMana .quotaMana-Agreement .Agreement_icon{
    width: 1.41666667rem;
    margin: 1.0833333rem 0 0 1.5rem;
  }
  .quotaMana-foot .quotaMana-foot-btn{
    width: 93%;
    margin: 2rem 1.08333333rem;
    line-height: 3.83333rem;
  }
  .quotaMana-foot .quotaMana-foot-btn .quotaMana-foot-font1{
    background: #FFA436;
    opacity: 0.3;
  }
  .quotaMana-foot .quotaMana-foot-btn .quotaMana-foot-font2{
    background: #FFA436;
    margin-top: 0.33333rem;
  }
  .quotaMana .quotaMana-Agreement .quotaMana-Explain{
    background: url("../../assets/img/sale/line@2x.png") no-repeat 9% 49%,url("../../assets/img/sale/line@2x.png") no-repeat 91% 49%;
    background-size: 27%;
  }
  .wrapcenter .quotaMana-wrapcenter_tips{
    width:74.66667%;
    margin-top: 35%;
    height:27rem;
    border-radius: 7px;
  }
  .wrapcenter .quotaMana-wrapcenter_tips .quotaMana-section_middle{
    height: 18rem;
    overflow-y: auto;
    padding-bottom: 1rem;
  }
  .wrapcenter .quotaMana-wrapcenter_tips .quotaMana-section_middle .quotaMana-section_middleContent{
    padding: 1rem 1.083333rem 0.53333rem;
  }
  .wrapcenter .quotaMana-wrapcenter_tips .quotaMana-section_top{
    height: 3.8333333rem
  }
  .CardD-maskIcon{
    width: 2.083333rem;
    margin: 1.5rem 1rem 1.5rem 1.083333rem;
  }
  .quotaMana .wrapcenter .quotaManaDel_tips{
    width: 24.5rem;
    border-radius: 0.53rem;
    margin-top: 50%;
  }
  .quotaMana .wrapcenter .quotaManaDel_tips .section_top1{
    height: 4.66667rem;
    border-bottom: 1px solid #DDDDDD;
  }
  #setQuota_format{
    margin-top: 20%;
  }

  .qx_set1 {
    line-height: 4rem;
  }

  .quotaMana .quotaMana-Agreement .table_style{
    border: 1px solid #303133;
    text-align: center;
  }
  @media screen and (max-width:321px){
   /* .wrapcenter .quotaMana-wrapcenter_tips{
      height:51.5%;
    }*/
    .qx_set1 {
      line-height: 3.5rem;
    }
  }
  @media screen and (min-width:760px)and (max-width: 1024px){
    .wrapcenter .quotaMana-wrapcenter_tips {
      width: 74.66667%;
      margin-top: 24%;
      border-radius: 7px;
    }
  }
</style>

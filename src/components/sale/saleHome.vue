<template>
    <div class="saleHome width height bg-ff">
      <div class="saleHome-top">
        <img class="height" src="../../assets/img/sale/img_background@2x.png"/>
        <div class="saleHome-top_info width cont pst-abs pos-top">
          <p class="saleHome-top_infoTitle font-col-b font-167">可用额度(元)</p>
          <p class="saleHome-top_infoQuota font-col-b">{{userQuotaManaData.amountMonth|moneyFormat}}</p>
          <div class="divImg_sale width" v-if="saleOnce" @click="ejectSaleBtn = true">
            <img class="img_sale" src="../../assets/img/sale/button_agent@2x.png"/>
          </div>
          <div class="divImg_sale width" v-if="salenoOnce">
            <img class="img_sale" src="../../assets/img/sale/button_no_agent@2x.png"/>
          </div>
        </div>
      </div>
      <div class="saleHome-middle">
       <div class="saleHome-middle_float pst-abs bg-ff">
          <div class="saleHome-middle_fl height fl cont">
            <p class="font-108 font-96 width mG-top">本月已代卖(元)</p>
            <p class="saleHome-middle_num font-2a2a width mG-top067 font-b">{{userQuotaManaData.saledAmountMonth|moneyFormat}}</p>
          </div>
          <img class="saleHome-middle_img pst-abs" src="../../assets/img/Q_Modular/line@2x.png">
         <div class="saleHome-middle_fl height fl cont">
            <p class="font-108 font-96 width mG-top">每月代卖总额(元)</p>
            <p class="saleHome-middle_num font-2a2a width mG-top067 font-b">{{userQuotaManaData.saleAmountMonth|moneyFormat}}</p>
         </div>
       </div>
       <div class="saleHome-middle_menuAll width height font-167">
        <div class="saleHome-middle_menu">
          <img class="saleHome-middle_menuImg mG-top fl" src="../../assets/img/sale/icon_administration@2x.png">
          <div class="fr mG-lfr1 bd-btm" style="width: 77.3%;" @click="toquotaManaPage">
            <span class="fl height-375">额度管理</span>
            <img class="fr" src="../../assets/img/right.png" style="width: 0.416666667rem;padding-top:1.4rem;">
          </div>
        </div>
         <div class="saleHome-middle_menu">
           <img class="saleHome-middle_menuImg mG-top fl" src="../../assets/img/sale/icon_order@2x.png">
           <div class="fr mG-lfr1 bd-btm" @click="tosaleOrderPage" style="width: 77.3%;">
             <span class="fl height-375">代卖订单</span>
             <img class="fr" src="../../assets/img/right.png" style="width: 0.416666667rem;padding-top:1.4rem;">
           </div>
         </div>
         <div class="saleHome-middle_menu">
           <img class="saleHome-middle_menuImg mG-top fl" src="../../assets/img/sale/icon_cash@2x.png">
           <div class="fr mG-lfr1" @click="tocashRecordPage" style="width: 77.3%;">
             <span class="fl height-375">提现记录</span>
             <img class="fr" src="../../assets/img/right.png" style="width: 0.416666667rem;padding-top:1.4rem;">
           </div>
         </div>
       </div>
      </div>
      <div class="saleHome-footer_link width font-1">
        <span class="fl font-3b9" @click="alertAgreeContent=true" style="margin-left: 23.66667%;">智能代卖协议</span>
        <img class="saleHome-footer_line" src="../../assets/image/line.png">
        <span class="fr font-3b9" @click="alertRuleContent=true" style="margin-right: 23.66667%;">智能代卖规则</span>
      </div>
      <section class="zz" v-if="alertAgreeContent">
        <div class="wrapcenter height">
          <div class="quotaMana-wrapcenter_tips bg-ff">
            <div class="quotaMana-section_top font-133 cont bd-btm font-b"><span style="line-height: 3.8333333rem;">智能代卖协议</span></div>
            <div class="quotaMana-section_middle bd-btm width font-108">
              <div class="quotaMana-section_middleContent font-ipt">
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
      <section class="zz" v-if="alertRuleContent">
        <div class="wrapcenter height">
          <div class="quotaMana-wrapcenter_tips bg-ff">
            <div class="quotaMana-section_top font-133 cont bd-btm font-b"><span style="line-height: 3.8333333rem;">智能代卖规则</span></div>
            <div class="quotaMana-section_middle bd-btm width">
              <div class="pd1083 fl font-ipt font-108">
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
            <div class="section_bottom">
              <div class="qx_set1 font-133 font-F89" @click="alertRuleContent=false">确定</div>
            </div>
          </div>
        </div>
      </section>
      <!--弹出代卖弹框-->
      <section class="zz" v-show="ejectSaleBtn">
        <div class="wrapcenter">
          <div class="wrapcenter_tips bg-ff" style="width:80%;">
            <div class="section_top1 bd-btm" style="padding: 1.6667rem 1rem;height:5rem;">
              <p class="font-133 fl font-b">系统每整点会进行自动代卖，您确认现在要立即代卖吗？</p>
              <p class="font-167 fl font-ipt" style="padding-top: .5rem;">友情提示：每天仅能发起一次手动代卖</p>
            </div>
            <div class="section_bottom">
              <div class="qx_set bd-rt-ddd" @click="ejectSaleBtn = false">关闭</div>
              <div class="qx_set font-fa" @click="requireSale">立即代卖</div>
            </div>
          </div>
        </div>
      </section>
      <!--余额不足，弹出不能代卖框-->
      <section class="zz" v-show="canNotSale">
        <div class="wrapcenter">
          <div class="wrapcenter_tips bg-ff" style="width:80%">
            <div class="section_top1 bd-btm" style="padding: 1.6667rem 2.5rem;height:3rem;">
              <p class="font-133 fl font-b" v-if="balanceAmountNo">您当前可转让消费券余额不足，不能使用立即代卖哦</p>
              <p class="font-133 fl font-b" v-if="amountMonthNo">当前额度不足，不能发起代卖</p>
            </div>
            <div class="section_bottom cont">
              <p class="width font-fa font-133" style="line-height: 3.5rem" @click="canNotSale = false">确定</p>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
  import {updateIsManual,findSubstituteSaleAmount,checkedIsManual} from '@/api/saleApi/saleJs'
  export default{
    data: function () {
      return {
        saleOnce:false,
        salenoOnce:false,
        balanceAmountNo:false,
        amountMonthNo:false,
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
        alertAgreeContent:false,
        alertRuleContent:false,
        ejectSaleBtn:false,
        canNotSale:false,
        userQuotaManaData:{

        }
      }
    },
    methods:{
      //to额度管理页面
      toquotaManaPage(){
        this.$router.push({name:'quotaMana',params:{issetQuota:true}});
      },
      //to代卖订单列表页
      tosaleOrderPage(){
        this.$router.push({name:'saleOrder'});
      },
      //to提现记录列表页面
      tocashRecordPage(){
        this.$router.push({name:'cashRecord'});
      },
      //立即代卖
      requireSale(){
          if(this.userQuotaManaData.balanceAmount!=null && this.userQuotaManaData.balanceAmount/1000>=10 && this.userQuotaManaData.amountMonth!=null && this.userQuotaManaData.amountMonth/1000>=10){
            updateIsManual(localStorage.getItem('userID'),this.userQuotaManaData.id).then(res =>{
              if(res.data.code == 200){
                this.saleOnce = false;
                this.salenoOnce = true;
                this.ejectSaleBtn = false;
                this.$router.push({name:'saleSusess'});
              }else{
                this.ejectSaleBtn = false;
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            },res =>{
              this.ejectSaleBtn = false;
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            })
          }else{
              this.ejectSaleBtn = false;
              this.canNotSale = true;
              if(this.userQuotaManaData.balanceAmount/1000<10){
                  this.balanceAmountNo = true;
              }else{
                  this.amountMonthNo = true;
              }
          }
      }
    },
    created(){
      findSubstituteSaleAmount(localStorage.getItem('userID')).then(res =>{
        if(res.data.code == 200){
          this.userQuotaManaData = res.data.data;
          checkedIsManual(localStorage.getItem('userID'),this.userQuotaManaData.id).then(res =>{
            if(res.data.code == 200){
              this.saleOnce = true;
              this.salenoOnce = false;
            }else{
              this.saleOnce = false;
              this.salenoOnce = true;
            }
          },res =>{
            this.saleOnce = false;
            this.salenoOnce = true;
          })
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
    }
  }
</script>
<style>
  .saleHome .saleHome-top{
    height: 19rem;
  }
  .saleHome .saleHome-middle{
    /*height: 62%;*/
  }
  .saleHome .saleHome-middle .saleHome-middle_float{
    height: 6.83333333rem;
    top: 18rem;
    position: absolute;
    margin: 0 1.33333rem;
    width:92%;
    border-radius: 4px;
    box-shadow: 0 1px 4px #dff1ff;
  }
  .saleHome .saleHome-middle .saleHome-middle_float .saleHome-middle_fl{
    width:50%;
  }
  .saleHome .saleHome-middle .saleHome-middle_float .saleHome-middle_img{
    width: .1rem;
    height: 2.5rem;
    margin-top: 2rem;
    margin-left: 50%;
  }
  .saleHome .saleHome-middle .saleHome-middle_float .saleHome-middle_fl .saleHome-middle_num{
    font-size: 1.75rem;
  }
 .saleHome-middle_menuAll{
   margin-top: 6.6666667rem;
 }
  .saleHome-middle_menuAll .saleHome-middle_menu{
    width: 95.73333%;
    margin:0 .66666667rem;
    height:3.75rem;
  }
  .saleHome-middle_menuAll .saleHome-middle_menu .saleHome-middle_menuImg{
    margin-left: 0.6666667rem;
    width: 2.666667rem;
  }
  .saleHome .saleHome-top .saleHome-top_info .saleHome-top_infoQuota{
    font-size: 2.91666667rem;
  }
  .saleHome .saleHome-top .saleHome-top_info .saleHome-top_infoTitle{
    margin-top: 3.66666667rem;
  }
  .saleHome .saleHome-top .saleHome-top_info .divImg_sale{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    margin-top: 2.333333rem;
  }
  .saleHome .saleHome-top .saleHome-top_info .divImg_sale .img_sale{
    width: 9.16666667rem;
  }
  .saleHome .saleHome-footer_link{
    bottom: 0;
    position: absolute;
    margin-bottom: 1.3333rem;
  }
  .saleHome .saleHome-footer_link .saleHome-footer_line{
    width: 1px;
    position: absolute;
    left: 50%;
    height: 1rem;
    top: 0.36rem;
  }
  .saleHome .quotaMana-wrapcenter_tips{
    width:74.66667%;
    margin-top: 35%;
    height:27rem;
    border-radius: 7px;
  }
  .saleHome .quotaMana-wrapcenter_tips .quotaMana-section_middle{
    height: 18.6rem;
    overflow-y: auto;
    padding-bottom: 1rem;
  }
  .saleHome .quotaMana-wrapcenter_tips .quotaMana-section_middle .quotaMana-section_middleContent{
    padding: 1rem 1.083333rem 0.53333rem;
  }
  .saleHome .quotaMana-wrapcenter_tips .quotaMana-section_top{
    height: 3.8333333rem
  }
  .bg-cc{
    background: #ccc;
  }
  .saleHome .quotaMana-wrapcenter_tips .quotaMana-section_middle .table_style{
    border: 1px solid #303133;
    text-align: center;
  }
  @media screen and (max-width:321px){
    /*.saleHome .quotaMana-wrapcenter_tips{
       height:51.5%;
    }*/
  }
  @media screen and (min-width:760px)and (max-width: 1024px){
    /*.saleHome .quotaMana-wrapcenter_tips{
      height:61.5%;
    }*/
  }
</style>

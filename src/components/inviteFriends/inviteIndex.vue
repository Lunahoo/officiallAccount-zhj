<template>
  <div class="inviteIndex gd-color-yQ width height fl " v-wechat-title="$route.meta.title=title">
    <div class="width pst-abs" style="height: 91%">
      <div class="overflow-s height">
        <!--图片-->
        <div class="width pst-rlt">
          <img src="../../assets/img/inviteIndex/img_head.png" />
          <!-- <div>{{nowPageUrl}}</div>-->
          <div class="pst-abs mG-top pos-top section_l inviteIndex-banner" v-if="contentArr!=null && contentArr.length>0"></div>
          <div :style="{height:height + 'px'}" class="rollScreen_container pst-abs mG-top pos-top section_l font-col-b font-108 inviteIndex-banner-font" id ="rollScreen_container">
            <ul class="rollScreen_list" :style = {transform:transform} :class="{rollScreen_list_unanim:num===0}"><!--contentArr-->
              <li class="rollScreen_once" v-for="(item,index) in contentArr" :key=index :style="{height:height+'px'}">
                  <span>
                    <span v-if="item.nickName!=null && item.nickName!=''">{{item.nickName|encryptNickName}}</span>
                    <span v-if="item.nickName==null || item.nickName==''">{{item.mobile}}</span>
                     {{item.backDuration}}分钟前获得返现{{item.backAmount|moneyFormat}}元</span>
              </li>
            </ul>
          </div>
          <div class="pst-abs pos-top pos-right inviteIndex-banner-rule" @click="toInviteFriendRule">活动规则</div>
        </div>
        <!--叠加返现-->
        <div class="four_father inviteIndex-img-btm" style="margin-top: -1rem;position: relative;">
          <img src="../../assets/img/inviteIndex/img_overlay@2x.png" />
        </div>
        <!--返现攻略-->
        <div class="four_father inviteIndex-img-btm">
          <img src="../../assets/img/inviteIndex/img_strategy@2x.png" />
        </div>
        <!--邀请战绩-->
        <div v-if="register" id="Invitation1">
          <div class="four_father inviteIndex-img-btm pst-rlt">
            <img class="" src="../../assets/img/inviteIndex/img_record@2x.png" />
            <div class="pst-abs cont width font-7b7 font-167" v-if="inviteDetail!=null && inviteDetail.length>0" style="top: 4rem;">
              <div class="invite-color-h fl"><span>{{inviteDetail[0].peopleNumber}}</span></div>
              <div class="invite-color-h fl"><span v-if="inviteDetail[0].backAmount!=0">{{inviteDetail[0].backAmount|money}}</span>
                  <span v-if="inviteDetail[0].backAmount==0">{{inviteDetail[0].backAmount}}</span></div>
              <div class="invite-color-h fl"><span v-if="inviteDetail[0].backAmount==0 && inviteDetail[0].peopleNumber== 0">-</span>
                <span v-if="inviteDetail[0].peopleNumber!=0 || inviteDetail[0].backAmount!= 0">{{inviteDetail[0].ranking}}</span></div>
            </div>
            <div class="inviteIndex-main-b pst-abs fl width font-125" v-if="inviteDetail!=null && inviteDetail.length>0" >
              <div class="fl inviteIndex-main-btm" v-for="(item,index) in inviteDetail" :key=index v-if="index!=0 && index<=5">
                <div class="fl invite-portrait">
                  <img src="../../assets/img/inviteIndex/headportrait_1@2x.png" v-if="index == 1"/>
                  <img src="../../assets/img/inviteIndex/headportrait_2@2x.png" v-if="index == 2"/>
                  <img src="../../assets/img/inviteIndex/headportrait_3@2x.png" v-if="index == 3"/>
                  <img src="../../assets/img/inviteIndex/headportrait_4@2x.png" v-if="index == 4"/>
                  <img src="../../assets/img/inviteIndex/headportrait_5@2x.png" v-if="index == 5"/>
                  <!--<img src="../../assets/img/inviteIndex/moren_@2x.png" v-if="index > 5"/>-->
                </div>
                <div class="fl inviteIndex-main-b-icon">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numberone@2x.png" v-if="index == 1">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numbertwo@2x.png" v-if="index == 2">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numberthree@2x.png" v-if="index == 3">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numberfour@2x.png" v-if="index == 4">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numberfive@2x.png" v-if="index == 5">
                  <div class="fl cont" v-if="item.nickName!=null && item.nickName!=''">{{item.nickName|encryptNickName}}</div>
                  <div class="fl cont" v-if="item.nickName==null || item.nickName==''">{{item.mobile}}</div>
                </div>
                <div class="fl padTop-1 font-125">
                  <div class="fl inviteIndex-main-b-sec font-ipt ">邀请{{item.peopleNumber}}人</div>
                  <div class="fl inviteIndex-main-b-money font-F89 ellipsis_name">返现{{item.backAmount|money}}元</div>
                </div>
              </div>
              <!--<div class="fl inviteIndex-main-btm" v-for="(item,index) in inviteDetail" :key=index v-if="inviteDetail[0].ownFlag==null && index<=4">
                <div class="fl invite-portrait">
                  <img src="../../assets/img/inviteIndex/headportrait_1@2x.png" v-if="index == 0"/>
                  <img src="../../assets/img/inviteIndex/headportrait_2@2x.png" v-if="index == 1"/>
                  <img src="../../assets/img/inviteIndex/headportrait_3@2x.png" v-if="index == 2"/>
                  <img src="../../assets/img/inviteIndex/headportrait_4@2x.png" v-if="index == 3"/>
                  <img src="../../assets/img/inviteIndex/headportrait_5@2x.png" v-if="index == 4"/>
                  &lt;!&ndash;<img src="../../assets/img/inviteIndex/moren_@2x.png" v-if="index > 4"/>&ndash;&gt;
                </div>
                <div class="fl inviteIndex-main-b-icon">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numberone@2x.png" v-if="index == 0">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numbertwo@2x.png" v-if="index == 1">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numberthree@2x.png" v-if="index == 2">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numberfour@2x.png" v-if="index == 3">
                  <img class="Ranking-icon" src="../../assets/img/inviteIndex/icon_numberfive@2x.png" v-if="index == 4">
                  <div class="fl cont" v-if="item.nickName!=null && item.nickName!=''">{{item.nickName|encryptNickName}}</div>
                  <div class="fl cont" v-if="item.nickName==null || item.nickName==''">{{item.mobile}}</div>
                </div>
                <div class="fl padTop-1 font-125">
                  <div class="fl inviteIndex-main-b-sec font-ipt ">邀请{{item.peopleNumber}}人</div>
                  <div class="fl font-F89">返现{{item.backAmount|money}}元</div>
                </div>
              </div>-->
            </div>
          </div>
        </div>
        <!--领取返现-->
        <div  v-if="!register" id="Invitation">
          <div class="four_father inviteIndex-img-btm pst-rlt">
            <img class="" src="../../assets/img/inviteIndex/img_getcash@2x.png" />
            <div class="pst-abs Record-main font-125">
              <div class="Record-ipt width">
                <input type="tel" @focus='aa' @blur="ab" class="pd133" v-model="drawTel" maxlength="11" placeholder="输入手机号" />
              </div>
              <div class="width " style="height: 3.8333rem;margin-bottom: 1rem;">
                <div class="Record-ipt Record-ipt-width fl ">
                  <input @focus='aa' @blur="ab" maxlength="4" v-model="Graphical" class="pd133" placeholder="请输入图形验证码" />
                </div>
                <div class="fr Record-ipt-right" @click="changePhotoCode">
                  <img :src="invitePhotoCode" style="height: 3.5rem;"/>
                </div>
              </div>
              <div class="Record-ipt width">
                <div class="fl Record-ipt-width">
                  <input type="number" @focus='aa' @blur="ab" maxlength="4" v-model="Verification" class="pd133" placeholder="输入短信验证码" />
                </div>
                <div v-if="eazyMoreSJ.canGet" class="fr font-F89 cont Record-ipt-right" @click="getYZM">{{eazyMoreSJ.tipsContent}}</div>
                <div v-else="eazyMoreSJ.canGet" class="fr font-7b7 cont Record-ipt-right">{{eazyMoreSJ.waitTime}}s后重发</div>
                <!--<div v-show="Verification1" class="fr font-F89 cont Record-ipt-right">重发验证码</div>-->
              </div>
              <div :class="btnColor" class="font-col-b font-133 cont Receive-btn" @click="Receive">立即领取</div>
              <div class="font-167 font-ipt Agreement">
                <div class="fl Agreement-icon" @click="Agreement">
                  <img v-if="Agree" style="width: 1rem;" src="../../assets/img/inviteIndex/icon_unselected@2x.png"/>
                  <img v-if="!Agree" style="width: 1rem;" src="../../assets/img/inviteIndex/icon_selected@2x.png"/>
                </div>
                <div>同意<span @click="alertregAgreementContent" style="padding-left: 0.5rem;" class="font-3b9">智惠嘉注册协议</span></div>
              </div>
              <!-- <div>{{loginData.recommendCode}}</div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="width pst-abs btm-0" style="height: 9%" v-show="button">
      <a><!--href="#Invitation1"-->
        <div v-if="register" @click="showShareFrend" class="width cont font-col-b btm-0 inviteIndexBtn">立即邀请好友</div>
      </a>
      <a  href="#Invitation">
        <div v-if="!register" class="width cont font-col-b btm-0 inviteIndexBtn">立即领取返现</div>
      </a>
    </div>
    <section class="zz inviteMask" v-show="shareFrends" @click="hideShareFrend">
      <div class="wrapcenter2">
        <div class="pst-rlt wrapcenter_tips2">
          <img src="../../assets/img/inviteIndex/tips.png" />
        </div>
      </div>
    </section>
    <section class="zz inviteMask" v-show="success">
      <div class="wrapcenter">
        <div class="wrapcenter_tips pst-rlt wrapcenter_tips1">
          <img src="../../assets/img/inviteIndex/img_redpacket@2x.png" />
          <div class="pst-abs font-s15 inviteMask-font">恭喜您获取返现权益</div>
          <div class="pst-abs pst-rlt inviteMask-div" @click="couponMarket">
            <img src="../../assets/img/inviteIndex/botton_stampmarket@2x.png" />
            <div class="pst-abs font-133 inviteMask-div-font">去券市场</div>
          </div>
        </div>
      </div>
    </section>

    <section class="zz inviteMask" v-show="fail">
      <div class="wrapcenter">
        <div class="wrapcenter_tips">
          <div class="pst-abs bg-ff wrapcenter-div">
            <img class="wrapcenter-div-img" src="../../assets/img/inviteIndex/img_registered@2x.png"  />
            <div class="pst-abs font-133 wrapcenter-div-font">您的手机号已经注册过啦！</div>
            <div class="pst-abs font-133 wrapcenter-div-font1">您可以邀请好友<span class="font-F89">赢取返现</span>哦！</div>
            <div class="pst-abs cont four_father wrapcenter-div-btn font-col-b font-133" @click="goToSee">去看看</div>
          </div>
        </div>
      </div>
    </section>
    <!--注册协议-->
    <section class="zz" v-if="regAgreementContent">
      <div class="wrapcenter height">
        <div class="quotaMana-wrapcenter_tips bg-ff">
          <div class="quotaMana-section_top font-133 cont bd-btm font-b"><span style="line-height: 3.8333333rem;">智惠嘉用户注册及服务协议</span></div>
          <div class="quotaMana-section_middle bd-btm width">
            <div class="quotaMana-section_middleContent font-ipt">
              <p class="font-b">一、服务条款的确认</p>
              <p>智惠嘉由砾洲（上海）企业服务有限公司（以下简称“本公司”）所有和运作。用户同意所有注册协议条款并完成注册程序，才能成为智惠嘉的正式用户。用户确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。
                本协议是智惠嘉用户（包括个人、企业及其他组织，以下简称“用户”或“您”）与本公司之间（就使用智惠嘉服务）所订立的法律契约。用户访问、浏览和注册智惠嘉服务即代表接受本协议条款的约束，用户对智惠嘉的访问和智惠嘉产品使用应以接受并遵守本协议所载明的条款和条件为前提。请用户仔细阅读本协议，用户点击“已阅读并同意此协议”按钮后，本协议即构成对双方有约束力的法律文件。</p>
              <p>用户在使用智惠嘉提供的各项服务之前，应仔细阅读本协议。用户点击同意本协议，即视为用户确认自己具有享受智惠嘉服务相应的权利能力和行为能力，能够独立承担法律责任。如用户不同意本协议及/或随时对其的修改，用户可以主动取消智惠嘉提供的服务；用户一旦使用智惠嘉服务，即视为用户已了解并完全同意本协议各项内容，包括本公司对本协议随时所做的任何修改，并成为智惠嘉用户。</p>
              <p class="font-b">二、知识产权申明</p>
              <p>智惠嘉的包括但不限于应用程序、源代码、商标、标示图案（LOGO）、界面设计、应用程序编程接口（API）等所关联的所有知识产权均属本公司所有。用户不得复制、修改、传播或在非智惠嘉所属的服务器上做镜像或者以其它方式进行非法使用。
                用户应当确保其公开或存储于智惠嘉及相关服务器的内容不存在任何侵犯第三方知识产权及/或其他合法权益的情形。若存在本条所述情形，本公司有权根据具体情节针对上述内容，采取包括但不限于限制、屏蔽、删除、修改等手段，由此给用户造成的损失由用户自行承担；若本公司因用户存在本条所述行为而向其他第三方承担法律责任的，本公司有权向用户追偿全部损失。</p>
              <p class="font-b">三、产品使用规则</p>
              <p>用户在使用智惠嘉及相关服务过程中，必须遵循以下规则：</p>
              <p>不得对智惠嘉及相关服务进行任何形式的对其他第三方的再授权使用、销售或转让；</p>
              <p>不得为设计开发竞争产品对智惠嘉及/或相关平台进行任何形式的反向工程、反向编译、反汇编，或在竞争产品抄袭模仿智惠嘉及/或相关平台的设计；</p>
              <p>不得实施对智惠嘉的连续服务和商誉构成损害的其他行为，包括对服务器的攻击；</p>
              <p>如用户在使用智惠嘉服务时违反任何上述规定，本公司有权要求用户改正或直接采取一切必要的措施（包括但不限于暂停或终止用户使用智惠嘉服务的权利并追讨因此带来的损失）以减轻用户不当行为造成的影响。</p>
              <p>用户须对在智惠嘉的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册账户导致其他用户误认；否则本公司有权立即停止提供服务，收回其账号并由用户独自承担由此而产生的一切法律责任。
                用户直接或通过各类方式（如 RSS 源和站外 API 引用等）间接使用智惠嘉服务和数据的行为，都将被视作已无条件接受本协议全部内容；若用户对本协议的任何条款存在异议，请停止使用智惠嘉所提供的全部服务。</p>
              <p>用户承诺不得以任何方式利用智惠嘉服务直接或间接从事违反中国法律、以及社会公德的行为，否则本公司有权暂停用户智惠嘉服务的使用同时对违反上述承诺的内容予以删除。
                用户有责任维持注册的账号和密码的安全，用户应对所有用本人的密码及帐号的活动负完全的责任。用户同意∶(a) 本人的密码或帐号遭到未获授权的使用，或者发生其它任何安全问题时，将立即通知本公司；且(b)每次上网完毕都会把本人的帐号关掉。如未能依前述规定行事，对于任何人利用该密码及帐号所进行的任何行为，用户应负完全的责任。对于因此而产生的任何损失或损害，本公司不承担任何责任。</p>
              <p class="font-b">四、用户信息保护</p>
              <p>用户在注册账号或使用智惠嘉服务的过程中，可能需要填写一些必要的信息。若国家法律法规有特殊规定的，用户需要填写真实的身份信息。若用户填写的信息不完整，则无法使用智惠嘉服务或在使用过程中受到限制。对于用户选择提交的个人信息，用户应自行承担责任。
                智惠嘉将运用各种安全技术和程序建立完善的管理制度来保护用户的个人信息，以免遭受未经授权的访问、使用或披露。</p>
              <p>智惠嘉不会将用户的个人信息转移或披露给任何非关联的第三方，除非：</p>
              <p>相关法律法规或法院、政府机关要求；</p>
              <p>为保证社会公众、智惠嘉的客户及员工的合法权益所必要且适当；</p>
              <p>作为合并、收购、资产转让或类似交易的一部分而转移；或为智惠嘉提供用户要求的服务所必需；</p>
              <p>不得实施对智惠嘉的连续服务和商誉构成损害的其他行为，包括对服务器的攻击；</p>
              <p>本网站非常重视对未成年人个人信息的保护。若用户是18周岁以下的未成年人，在使用智惠嘉的服务前，应事先取得用户家长或法定监护人的书面同意。</p>
              <p class="font-b">五、免责申明</p>
              <p>用户理解并同意，在使用智惠嘉服务的过程中，可能会遇到不可抗力等风险因素，使智惠嘉服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，本公司将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户造成的损失本公司在法律允许的范围内免责。</p>
              <p>用户理解并同意，在使用智惠嘉服务的过程中，可能会遇到网络信息或其他用户行为带来的风险，本公司不对任何信息的真实性、适用性、合法性承担责任，也不对由于使用智惠嘉致使用户可能收到的任何骚扰性、威胁性、诽谤性、冒犯性、侵权或非法信息或传播承担任何责任。这些风险包括但不限于：</p>
              <p>来自他人匿名或冒名的含有威胁、诽谤、令人反感或非法内容的信息；</p>
              <p>因使用本协议项下的服务，遭受他人误导、欺骗或其他导致或可能导致的任何心理、生理上的伤害以及经济上的损失；</p>
              <p>其他因网络信息或用户行为引起的风险。</p>
              <p>本公司依据本协议约定获得处理违法违规内容的权利，该权利不构成本公司的义务或承诺，本公司不能保证及时发现违法行为或进行相应处理。</p>
              <p>用户同意本公司可以在提供服务的过程中自行向用户发送广告、推广或宣传信息（包括商业与非商业信息），其方式和范围可不经向用户特别通知而变更。</p>
              <p>用户同意，对智惠嘉服务中出现的广告信息，用户应审慎判断其真实性和可靠性，除法律明确规定外，用户应对依该广告信息进行的交易负责。</p>
              <p>用户明确同意其使用智惠嘉的风险将完全由其本人承担；因其使用智惠嘉服务而产生的一切后果也由其本人承担。本公司对用户及任何第三方不承担任何责任。</p>
              <p>本公司不担保或保证智惠嘉及相关服务一定能满足用户的要求，也不担保智惠嘉及相关服务不会暂停、中断或终止，对智惠嘉及相关服务的及时性、安全性、准确性也不作任何担保或保证。用户因智惠嘉及相关服务服务暂停、中断、终止或其他服务异常所导致的数据信息安全及其他风险及损失，本公司不承担任何责任。</p>
              <p class="font-b">六、合约变更</p>
              <p>本公司有权随时对本协议的条款进行修订，一旦本协议的内容发生变更，本协议将会在修订生效日前一个工作日更新。</p>
              <p>如用户继续使用智惠嘉服务，则视为用户接受本公司对合约相关条款所做的修订。</p>
              <p class="font-b">七、法律适用</p>
              <p>本协议的订立、执行和解释以及争议的解决均应适用中华人民共和国法律并受中国法院管辖。
                协议双方就本协议内容或其执行发生任何争议，应首先力争友好协商解决；协商不成时，任何一方均可向本公司注册地所在的人民法院提起诉讼。</p>
              <p class="font-b">八、其他</p>
              <p>用户成功注册智惠嘉即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。</p>
              <p>本协议所定的任何条款无论因何种原因部分或全部无效或不具有执行力，本协议的其余条款仍应有效并具备约束力。</p>
            </div>
            <div class="font-2a2a font-108 pd1083">在接受本协议之前,请您仔细阅读本协议的全部内容。</div>
          </div>
          <div class="section_bottom" style="border-top: 1px solid #ccc;">
            <div class="qx_set1 font-133 font-F89" @click="regAgreementContent=false">确定</div>
          </div>
        </div>
      </div>
    </section>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryRecommendSucceedInfo,queryRecommendCode,addReturnMoneyBill,queryBillList,queryRecommendFictitiousInfo} from '@/api/inviteFriends/inviteFs'
  import {findVueTokenVo} from '@/api/weixin/weixinApi'//微信前端验签接口
  import {sendMess} from '@/api/user/loginReg'
  import {login} from '@/api/user/loginReg'/*登录接口*/
  export default {
    components: {},
    props: {
      height: {
        default: 30,
        type: Number
      },
      lineNum: {
        default: 5,
        type: Number
      }
    },
    data () {
      return {
        nowPageUrl:"",
        regAgreementContent:false,
        shareFrends:false,
        title:"邀好友 抢返现!",
        description:"首单最高返现240元",
        imgUrls:require("../../assets/image/Wisdom.png"),
        content: "",
        error_prompt:"",
        register:false,//显示主页还是注册页
        invitePhotoCode:"",
        Agree:true,//同意图标
        headPhoto:require('../../assets/img/inviteIndex/icon_numberone@2x.png'),   //头像
        m:60,
        Verification1:true,//显示发送验证码还是倒计时
        success:false,//领取成功弹框
        fail:false,//已注册弹框
        button:true,
        returnToCash:0,    //返现金额
        inviteNums:0,   //邀请人数
        ranking:'-',  //排名
        btnColor: "op-3", /*按钮颜色*/
        drawTel:'',//手机号
        Graphical:'',//图形验证码
        Verification:'',//验证码
        inviteDetail:{},    //邀请情况
        contentArr: [], //滚动栏
        num: 0,
        eazyMoreSJ:{
          canGet:true,
          tipsContent:"发送验证码",
          getYZMC:"font-7b7",
          timer:null,
          waitTime:59
        },
        sendYZM:{
          mobile:'',//注册手机号
          type:'1',//验证码类型，1：短信，2：语音
          imgCode:'',//图形验证码
          randomStr:"",    //图形验证码随机数
          retry:'N',//是否重试
          smsSign:"login_plat_sms", //(注册)
        },
        registerInfo:{   //注册请求数据
          mobile:'',
          smsCode:'',   //短信验证码
        },
        loginData:{/*密码登录*/
          mobile:'',
          smsCode:'',
          deviceId:'',/*013025009298520*/
          loginType:2,//登录方式，1：密码；2：短信验证码
          openId:"",
          source:'',
          smsSign:'login_plat_sms',
          recommendCode:'m001',
          yideduoOpenId:'',
        },
      }
    },
    methods: {
      alertregAgreementContent:function () {
        this.regAgreementContent = true;
      },
      showShareFrend:function () {
        this.shareFrends = true;
      },
      hideShareFrend:function () {
        this.shareFrends = false;
      },
      adTimer: function () {
        if (this.error_prompt == "tel-message") {
          this.error_prompt = "trans";
        }
      },
      adTimer2: function () {
        if (this.error_prompt == "tel-message2") {
          this.error_prompt = "trans2";
        }
      },
      //活动规则
      toInviteFriendRule(){
        this.$router.push({name:'inviteFriendRule'});
      },
      inviteInit(id){
        if(id!=''&&id!=null&&id!=undefined){  //当前用户已登录
          localStorage.setItem('userID',id);
          this.register = true;
          if(localStorage.getItem('head_url')!=undefined && localStorage.getItem('head_url')!='undefined' && localStorage.getItem('head_url')!=null && localStorage.getItem('head_url')!='null'){
            this.headPhoto = localStorage.getItem('head_url');
          }
          this.getInviteInfo(id);  //获取邀请人数等等信息
          this.getInviteTimeInfo(id);  //获取邀请人数等等信息
        }else{   //用户未登陆
          this.register = false;
          //获取图形验证码
          this.sendYZM.randomStr= Math.floor(Math.random () * 900) + 100;
          this.invitePhotoCode = axios.defaults.baseURL+'/admin/code/'+ this.sendYZM.randomStr;
        }
      },
      getInviteCode(userID){
        if(userID!='' && userID!=null && userID!='null' && userID!=undefined && userID!='undeinfed') {
          queryRecommendCode(userID).then(res => {
            if (res.data.code == 200) {
              if (res.data.data != "" && res.data.data != null && res.data.data != undefined) {
                this.loginData.recommendCode = res.data.data;  //推荐码
                localStorage.setItem('myRecommendCode', res.data.data);
              } else {
                this.loginData.recommendCode = 'm001';
              }
            } else {
              this.loginData.recommendCode = 'm001';
              this.error_prompt = "tel-message";
              this.content = res.data.msg;
            }
          }, res => {
            this.loginData.recommendCode = 'm001';
            this.error_prompt = "tel-message";
            this.content = res.data.msg;
          })
        }
      },
      //获取邀请人数等等信息
      getInviteInfo(id){
        //用户邀请成功注册人数、返现金额、排名等
        if(id!='' && id!=null && id!='null' && id!=undefined && id!='undefined'){
          queryRecommendSucceedInfo(id).then(res=>{
            if(res.data.code==200){
              if(res.data.data!=null && res.data.data.length>0){
                this.inviteDetail = res.data.data;
            /*    for(let i=1;i<res.data.data.length;i++){
                  //取当前用户排名
                  if(res.data.data[0].ownFlag == 1 || res.data.data[0].ownFlag == '1'){
                    if(res.data.data[0].memberId == res.data.data[i].memberId){
                      this.inviteNums = res.data.data[0].peopleNumber;
                      if(res.data.data[0].backAmount==null){
                        this.returnToCash = 0;
                      }else{
                        this.returnToCash = res.data.data[0].backAmount/1000;
                      }
                      this.ranking = i;
                    }
                  }
                }*/
              }else{
                this.error_prompt="tel-message";
                this.content = '暂无邀请战绩';
              }
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          });
        }
      },
      //获取邀请人数时间 等等信息
      getInviteTimeInfo(id){
        if(id!='' && id!=null && id!='null' && id!=undefined && id!='undefined'){
          let code = Math.floor(Math.random()*10000);
          queryRecommendFictitiousInfo(id,code).then(res=>{
            if(res.data.code==200){
              if(res.data.data!=null){
                this.contentArr = res.data.data;
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
      //重新发送图形验证码
      changePhotoCode(){
        this.sendYZM.randomStr= Math.floor(Math.random () * 900) + 100;
        this.invitePhotoCode = axios.defaults.baseURL+'/admin/code/'+ this.sendYZM.randomStr;
      },
      //发送短信验证码
      getYZM(){
        if(this.drawTel.length==11&&this.Graphical.length>0){
          //发送验证码
          if(this.eazyMoreSJ.tipsContent=='重新获取'){
            this.sendYZM.retry = 'Y';
          }
          this.sendYZM.mobile = this.drawTel; //手机号
          this.sendYZM.imgCode = this.Graphical;  //图形验证码
          sendMess(this.sendYZM).then(res=>{
            if(res.data.code==200){
              if(res.data.msg=='图形验证码不正确'){
                this.error_prompt="tel-message2";
                this.content = res.data.msg;
              }else{
                this.eazyMoreSJ.canGet = false;
                this.eazyMoreSJ.timer = window.inviteIndexTimer;
                this.$spaceOther.timeCountdown(this.eazyMoreSJ);
              }

            }else{
              this.error_prompt="tel-message2";
              this.content = res.data.msg;
            }
          },res=>{
            this.error_prompt="tel-message2";
            this.content = res.data.msg;
          })
        }else{
          this.error_prompt="tel-message2";
          this.content = '请将信息填写完整';
        }
      },
      //获焦失焦
      aa(){this.button = false;},ab(){this.button = true;},
      Agreement(){
        this.Agree = !this.Agree;
        this.publiceBtn();
      },
      Invitation(){

      },
      couponMarket(){//去券市场
        this.$router.push({name:"couponMarket"});
      },
      goToSee(){//点击去看看
        this.register = true;
        this.fail = false;
        this.$router.push({
          path:"inviteIndex",
          query:{
            inviteID:localStorage.getItem('myRecommendCode'),
          }
        });
      },
      //立即领取
      Receive(){
        if(this.btnColor == "op-1"){
          this.loginData.mobile = this.drawTel;
          this.loginData.smsCode = this.Verification;
          this.getInviteID();
          let url = window.location.href;
          if(this.isWeixn()){
            if (url.indexOf('openid') > 0) {
              this.loginData.openId = this.getOpenId(url);
            }else {
              if (url.indexOf('openid') > 0) {
                this.loginData.openId = this.getOpenId(url);
              }else {
                if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
                  this.loginData.openId = localStorage.getItem('openId');
                }
              }
            }
          }
          login(this.loginData).then(res=>{   //注册按钮
            if(res.data.code==200){
              localStorage.setItem('myRecommendCode',res.data.data.recommendCode);//推荐码
              localStorage.setItem('userID',res.data.data.id); //邀请好友注册用户token    res.data.data.id
              localStorage.setItem('loginTell',res.data.data.mobile); //邀请好友注册用户token
              this.getInviteInfo(res.data.data.id);  //获取邀请人数等等信息
              if(res.data.data.loginFlag==1){  //如果已经注册过
                this.fail = true; //已经注册过弹框
              }else{   //loginFlag=2  注册
                this.success = true;
              }
              /*let nowUrl = window.location.origin+window.location.pathname;
               window.location.href = nowUrl+'?inviteID='+localStorage.getItem('myRecommendCode');*/
            }else{
              this.error_prompt="tel-message2";
              this.content = res.data.msg;
            }
          },res=>{
            this.error_prompt="tel-message2";
            this.content = res.data.msg;
          })
        }
      },
      //按钮高亮色校验
      publiceBtn(){   //如果发票抬头、收获地址有数据按钮为可点击状态
        if(this.drawTel.length == 11&&this.Graphical.length == 4&&this.Verification.length == 4&&this.Agree==false){
          this.btnColor = "op-1";
        }else{
          this.btnColor = "op-3";
        }
      },
      getInviteID(){
        if(localStorage.getItem('userID')!=null && localStorage.getItem('userID')!='null' && localStorage.getItem('userID')!='' && localStorage.getItem('userID')!=undefined && localStorage.getItem('userID')!='undefined'){
          this.getInviteCode(localStorage.getItem('userID'));
        }else{
          let url = window.location.href;
          this.loginData.recommendCode = 'M004';
          if(url.indexOf("&")>0){                                      /*判断是否是一个参数还是多个参数*/
            this.loginData.recommendCode = 'M003';
            let urlParamArry=url.split("&");                            /*分开每个参数，并放到数组里*/
            for(let i=0; i<urlParamArry.length; i++){
              let paramerName = urlParamArry[i].split("=");   /*把每个参数名和值分开，并放到数组里*/
              if(paramerName[0].indexOf('inviteID')>=0 || paramerName[0].indexOf('recommendCode')>=0) {                     /*匹配输入的参数和数组循环出来的参数是否一样*/
                this.loginData.recommendCode = paramerName[1];
                break;
              }
            }
            if(this.loginData.recommendCode.indexOf('#Invitation')>0){
              this.loginData.recommendCode = this.loginData.recommendCode.substr(0,this.loginData.recommendCode.indexOf('#Invitation'));
            }
            localStorage.setItem('myRecommendCode',this.loginData.recommendCode);
          }else{                                                              /*判断只有个参数*/
            this.loginData.recommendCode = 'M002';
            if(url.indexOf('inviteID')>0 || url.indexOf('recommendCode')>0){
              let inviteID = "";
              if(url.indexOf('inviteID')>0){
                inviteID = url.substr(url.indexOf('inviteID') + 9, url.length);
              }else{
                inviteID = url.substr(url.indexOf('recommendCode') + 14, url.length);
              }
              if(inviteID.indexOf('#Invitation')>0){
                inviteID = inviteID.substr(0,inviteID.indexOf('#Invitation'));
              }
              localStorage.setItem('myRecommendCode',inviteID);
              this.loginData.recommendCode = inviteID;
            }else{
              if(localStorage.getItem('myRecommendCode')!=null && localStorage.getItem('myRecommendCode')!='null' && localStorage.getItem('myRecommendCode')!='' && localStorage.getItem('myRecommendCode')!=undefined && localStorage.getItem('myRecommendCode')!='undefined' && localStorage.getItem('myRecommendCode')!='m001'){
                this.loginData.recommendCode = localStorage.getItem('myRecommendCode');
              }
            }
          }
        }
      },
    },
    created(){
      this.changePhotoCode();
      this.getInviteID();
      //let url = window.location.origin+window.location.search.substr(0,window.location.search.indexOf('&'));
      let self = this;
      setTimeout(function () {
        if(self.isWeixn()){
          let url = window.location.href;
          if(localStorage.getItem('userID')!='' && localStorage.getItem('userID')!=null && localStorage.getItem('userID')!='null' && localStorage.getItem('userID')!=undefined && localStorage.getItem('userID')!='undefined'){
            self.loginData.recommendCode = localStorage.getItem('myRecommendCode');
          }else{
            if(self.loginData.recommendCode=='null' || self.loginData.recommendCode=='' || self.loginData.recommendCode==null || self.loginData.recommendCode==undefined || self.loginData.recommendCode=='undefined'){
              if(localStorage.getItem('myRecommendCode')!=null && localStorage.getItem('myRecommendCode')!='null' && localStorage.getItem('myRecommendCode')!='' && localStorage.getItem('myRecommendCode')!=undefined && localStorage.getItem('myRecommendCode')!='undefined' && localStorage.getItem('myRecommendCode')!='m001'){
                self.loginData.recommendCode = localStorage.getItem('myRecommendCode');
              }
            }
          }
          let shareUrl = 'http://zhihuijia.imwork.net/inviteIndex?recommendCode='+self.loginData.recommendCode;
          self.nowPageUrl = window.location.href;
          self.wxShare(self.title,self.description,shareUrl,'http://zhihuijia.imwork.net/fastdfs/group1/M00/00/75/wKgBcFysig-AOhs-AAAillQNUpI804.png');
          if (url.indexOf('openid') > 0) {
            self.byOpenIdgetInfo(self.getOpenId(url),'inviteIndex','50008',self.loginData.recommendCode);
          }else {
            if(localStorage.getItem('openId')!=undefined && localStorage.getItem('openId')!=null && localStorage.getItem('openId')!='null' && localStorage.getItem('openId')!=""){
              self.byOpenIdgetInfo(localStorage.getItem('openId'),'inviteIndex','50008',self.loginData.recommendCode);
            }else{
              //静默授权
              self.byWechAtgetOpenId('one','50008',self.$root.$data.redirect_uri,'inviteIndex',self.loginData.recommendCode);
            }
          }
          self.getInviteTimeInfo(localStorage.getItem('userID'));
        }else{
          if(localStorage.getItem('userID')!=null && localStorage.getItem('userID')!='null' && localStorage.getItem('userID')!=undefined && localStorage.getItem('userID')!='undefined' && localStorage.getItem('userID')!=''){
            self.inviteInit(localStorage.getItem('userID'));
            self.getInviteTimeInfo(localStorage.getItem('userID'));
          }
        }
      },300);
      setTimeout(function () {
        setInterval(function () {
          if (self.num !== self.contentArr.length) {
            self.num++;
          } else {
            self.num = 0;
          }
        }, 3000)
      },100)
    },
    watch:{
      drawTel(){
        if(this.drawTel !=''){  //如果手机号有数据
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
      },
      Graphical(){
        if(this.Graphical !=''){  //如果手机号有数据
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
      },
      Verification(){
        if(this.Verification !=''){  //如果手机号有数据
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.adTimer,2000);
      })
      this.$nextTick(function(){
        setInterval(this.adTimer2,2000);
      })
    },
    computed: {
      transform: function () {
        return 'translateY(-' + this.num * this.height + 'px)'
      }
    },
    beforeRouteEnter(to,from,next){
      if(localStorage.getItem('contNum')==null || localStorage.getItem('contNum') == '' || localStorage.getItem('contNum') == 'undefined' || localStorage.getItem('contNum') == undefined){
        localStorage.setItem('contNum',1)
      }else{
        localStorage.setItem('contNum',0)
      }
      if(localStorage.getItem('contNum') == 1){
        //console.info(window.location.origin+to.fullPath);
        window.location.href = window.location.origin+to.fullPath;
      }
      next();
    },
    beforeRouteLeave(to,from,next){
      localStorage.setItem('contNum','undefined');
      next();
    }
  }
</script>
<style>
  .rollScreen_container{
    overflow: hidden;
  }
  .rollScreen_list{
    transition: 1s linear;
  }
  .rollScreen_list_unanim{
    transition: none
  }
  .inviteIndex-img-btm{
    padding-bottom: 1.166666667rem;
  }
  .invite-color-h{
    color: #F85704;
    font-size: 2rem;
    width: 33.3%
  }
  .inviteIndex-main-btm{
    padding: 0.5rem 1.8rem;
  }
  .invite-portrait{
    width: 3.333rem;
    height: 3.333rem;
    background: #FF5C00;
    border-radius: 3rem;
    margin-right: 0.75rem;
  }
  .Ranking-icon{
    width: 2.833333rem;
  }
  .RecordBg{
    /*padding-bottom: 5rem;*/
  }
  .Record-main{
    top: 4rem;
    margin: 0 1.416rem;
    width: 88%;
  }
  .Record-ipt{
    height: 3.8333rem;
    line-height: 3.8333rem;
    border: 1px solid #e5e5e5;
    border-radius: 3rem;
    margin-bottom: 1rem;
  }
  .Record-ipt-width{
    width:60%;
  }
  .Record-ipt-right{
    width:35%;
  }
  .Receive-btn{
    background: #F89114;
    border-radius: 3rem;
    line-height: 3.8rem;
  }
  .Agreement{
    padding: 1.3333rem 0 1.66666rem;
    line-height: 2rem;
  }
  .Agreement-icon{
    padding: 0.5rem 0.5rem 0 30%;
  }
  .inviteIndexBtn{
    line-height:4.916rem;
    background: #FFC640;
    font-size: 1.75rem;
  }
  .gd-color-yQ{/*背景色渐变*/
    background: linear-gradient(#FB6241, #F59047);
  }
  .inviteIndex-main-b{
    overflow-y: scroll;
    top: 7rem;
    height: 23rem;
    margin-top: 4rem;
  }
  .inviteIndex-main-b-icon{
    padding: 0.4rem 0.5rem 0 0;
    width:4rem;
  }
  .inviteIndex-main-b-sec{
    padding: 0 1rem 0 0.8rem;
  }
  .inviteIndex-banner{
    background: #000;
    opacity:0.2;
    width: 68%;
    height: 2.5rem;
    border-radius: 3rem;
  }
  .inviteIndex-banner-font{
    line-height: 2.5rem;
    padding-left: 1rem;
  }
  .inviteIndex-banner-rule{
    background: #fcad9b;
    color: #C23C16;
    padding: 0.4rem 0.8rem;
    border-radius: 3rem 0 0 3rem;
    margin-top: 1.147rem;
  }
  .inviteMask{
    background: rgba(0,0,0,.7);
  }
  .inviteMask-font{
    top: 9rem;
    left: 21%;
  }
  .inviteMask-div{
    top: 15rem;
    left: 9%;
    width: 81%;
  }
  .inviteMask-div-font{
    color:#C93833;
    top: 0.7rem;
    left: 36%;
  }
  .wrapcenter-div{
    height: 21rem;
    width: 73%;
    left:13%;
  }
  .wrapcenter-div-img{
    width: 12rem;
    padding-left: 22%;
    padding: 2rem 0 0 22%;
  }
  .wrapcenter-div-font{
    top: 46%;
    left: 16%;
  }
  .wrapcenter-div-font1{
    top: 57%;
    left: 13.5%;
  }
  .wrapcenter-div-btn{
    background: #FFA436;
    bottom: 2rem;
    width: 90%;
    line-height: 3.83rem;
    height: 3.83rem;
  }
  .wrapcenter_tips1{
    background: border-box;
    margin-top:35%;
  }
  .tel-message2{
    width: 60%;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 0.4rem;
    text-align: center;
    position: fixed;
    bottom: 77%;
    left: 20%;
    opacity: .7;
  }
  .trans2{
    width: 60%;
    background-color: #000000;
    height: 3.6rem;
    line-height: 3.6rem;
    border-radius: 0.4rem;
    text-align: center;
    position: fixed;
    bottom: 77%;
    left: 20%;
    opacity: 0;
  }
  .wrapcenter2{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /* -webkit-box-pack: center; */
    -ms-flex-pack: center;
    justify-content: flex-end;
  }
  .wrapcenter2 .wrapcenter_tips2{
    width: 17rem;
    margin: .5rem .6rem;
  }
  .inviteIndex .quotaMana-wrapcenter_tips{
    width:74.66667%;
    margin-top: 35%;
    height:48.5%;
    border-radius: 7px;
  }
  .inviteIndex .quotaMana-wrapcenter_tips .quotaMana-section_middle{
    height: 65.5%;
    overflow-y: auto;
    padding-bottom: 1rem;
  }
  .inviteIndex .quotaMana-wrapcenter_tips .quotaMana-section_middle .quotaMana-section_middleContent{
    padding: 1rem 1.083333rem 0.53333rem;
  }
  .inviteIndex .quotaMana-wrapcenter_tips .quotaMana-section_top{
    height: 3.8333333rem
  }
  .inviteIndex-main-b-money{
    max-width: 9rem;
  }
  @media screen and (max-width:321px){
    .inviteIndex-main-b{
      margin-top: 2rem;
    }
    .inviteIndex-main-b-sec {
      padding: 0 0.7rem;
    }
    .inviteIndex-main-btm{
      padding: 0.5rem 1.2rem;
    }
    .Record-ipt{
      height: 3rem;
      line-height: 3rem;
    }
    .Receive-btn{
      line-height: 3.18rem;
    }
    .Agreement{
      padding: 0.63333rem 0 1.066666rem;
    }
    .Agreement-icon{
      padding: 0.5rem 0.5rem 0 25%;
    }
  }
</style>

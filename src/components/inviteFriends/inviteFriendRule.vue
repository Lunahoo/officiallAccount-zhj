<template>
  <div class="inviteFriendRule bg-fa63" >
    <div class="invite_rule bg-ff pst-rlt">
      <img class="invite_rule_pic" src="../../assets/img/inviteIndex/pic.png"/>
      <div class="rule_posi_rule pst-abs font-133 cont font-b font-col-b">活动规则</div>   <!--font-col-b-->
      <div class="rule_title font-125 font-b">活动时间：</div>
      <p class="font-12">1、<span class="font-b">2019年4月10日-2019年7月10日</span>（本活动所有时间以北京时间为准）。</p>
      <div class="rule_title font-125 font-b">好友邀请流程：</div>
      <p class="font-12">1、您通过分享指定内容或专属链接邀请给好友，好友点击分享的指定内容或专属链接完成注册即为邀请成功。</p>
    </div>
    <div class="invite_rule bg-ff">
      <img class="invite_rule_pic" src="../../assets/img/inviteIndex/pic.png"/>
      <div class="rule_posi pst-abs font-133 cont font-b font-col-b">活动奖励</div>   <!--font-col-b-->
      <div class="rule_title font-125 font-b">邀请人奖励：</div>
      <p class="font-12">1、您邀请的新注册好友（以下统称为“直接好友”），在注册1年内每次使用购买的消费券交易（包含普通消费、消费券转让），您都可获得交易金额<span class="font-F89">0.5%的现金奖励</span>，现金奖励实时发放到您在智惠嘉的现金账户中；</p>
      <p class="font-12">2、您的直接好友也可以邀请其他好友（以下统称为“间接好友”）注册，间接好友在直接好友注册1年内每次使用购买的消费券交易（交易包含普通消费、消费券转让），您都可获得使用金额<span class="font-F89">0.2%的现金奖励</span>，现金奖励实时发放到您在智惠嘉的现金账户中；</p>
      <p class="font-12">3、如果您的直接好友或您的间接好友满足返现要求的订单发生取消、退款、退货时，您的现金奖励将同步被取消。</p>
      <div class="rule_title font-125 font-b">首单奖励：</div>
      <p class="font-12">1、每一位用户在智惠嘉首次使用购买的消费券交易（交易包括普通消费、消费券转让）当天内发生的所有交易，用户本人均可以获得交易金额<span class="font-F89">0.5%的现金奖励</span>，现金奖励实时发放到用户在智惠嘉的现金账户中；</p>
      <p class="font-12">2、如果用户满足返现要求的首单交易发生取消、退款、退货时，发放到用户现金账户中的现金奖励将同步被取消。</p>
    </div>
    <div class="invite_rule bg-ff">
      <img class="invite_rule_pic" src="../../assets/img/inviteIndex/pic.png"/>
      <div class="rule_posi pst-abs font-133 cont font-b font-col-b">其他说明</div>   <!--font-col-b-->
      <p class="font-12">1、请严格按照邀请规则进行好友邀请。如果您以不正当手段（包括但不限于侵犯第三人合法权益、作弊领取、扰乱系统，虚假交易、实施网络攻击，批量注册，用机器注册账户，用机器模拟客户端）获得现金奖励，智惠嘉平台有权撤销您的现金奖励以及相关交易订单，必要时有权追究您的法律责任。</p>
      <p class="font-12">2、如因黑客攻击、系统错误、数据异常等造成现金奖励发放错误的，对超出部分智惠嘉平台有权要求用户返还。</p>
      <p class="font-12">3、智惠嘉可能会根据实际业务安排对活动时间、活动内容等进行调整，该调整不会影响调整前已参与活动的用户的权益。相关变动或调整将公布在活动规则页面上。</p>
      <div class="cont font-133 font-b padTop-1">以上活动最终解释权归智惠嘉平台所有</div>
    </div>
  </div>
</template>
<script>
  export default{

  }
</script>
<style>
  .inviteFriendRule{
    padding: 2rem 1.08333333rem .2rem 1.083333rem;
  }
  .inviteFriendRule .invite_rule{
    padding:3.08333rem 1rem 1rem;
    margin-bottom:1.8rem;
    border-radius: 4px;
  }
  .inviteFriendRule .invite_rule .invite_rule_pic{
    width: 13.5rem;
    margin-left: 25%;
    position: relative;
    margin-top: -13%;
  }
  .inviteFriendRule .rule_posi{
    width:13.583333rem;
    left:50%;
    margin-top: -7%;
    transform: translateX(-50%);
  }
  .inviteFriendRule .rule_posi_rule{
    width:13.583333rem;
    left:50%;
    margin-top: -7%;
    transform: translateX(-50%);
  }
  .inviteFriendRule .rule_title{
    color:#D0500E;
    padding-bottom:0.3rem;
  }
  .inviteFriendRule p{
    padding-bottom:1rem;
  }
  .inviteFriendRule p:last-of-type{
    padding-bottom:0;
  }
  @media screen and (max-width:321px){
    .inviteFriendRule .invite_rule .invite_rule_pic{
      margin-top: -15%;
    }
    .inviteFriendRule .rule_posi{
      margin-top: -7%;
      left:55%;
    }
    .inviteFriendRule .rule_posi_rule{
      margin-top: -7.5%;
      left:55%;
    }
  }
</style>

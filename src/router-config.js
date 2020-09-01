
/*=======================nav链接=======================*/
/*import scan from './components/index/nav/scan.vue';
 import payment from './components/index/nav/payment.vue';
 import flj from './components/index/nav/flj.vue';
 import vouchers from './components/index/nav/voucher/voucherHome.vue';
 import navbar from './components/index/nav/navbar.vue';
 import newsCore from './components/index/nav/newsCore.vue';//消息中心
 import newsC from './components/index/nav/newsC.vue';//消息中心
 import newsSet from './components/index/nav/newsSet.vue';//消息设置
 import qDetails from './components/index/nav/QDetails/qDetails.vue';
 import aBank from './components/index/nav/MyBank/aBank.vue';//银行卡页面中添加银行卡
 import realName from './components/index/nav/MyBank/realName.vue';//c端用户实名认证
 import problem from './components/index/nav/MyBank/problem.vue';//问题

 import footbar from './components/footbar.vue';*/
/*=======================content链接=======================*/
/*import applica from './components/index/content/applica.vue';
 import allLication from './components/index/allLication.vue';
 import broadcast from './components/index/content/broadcast.vue';
 import recommend from './components/index/content/recommend.vue';*/
/*=======================foot链接=======================*/
import home from './components/index/foot/home.vue';
import found from './components/index/foot/found.vue';
import couponMarket from './components/index/foot/couponMarket.vue';
import shop from './components/index/foot/shop.vue';
import user from './components/index/foot/user.vue';
/*=======================userinfo链接=======================*/
/*import RealName from './components/userinfo/RealName.vue';//银行卡实名认证*//*
 import newCore from './components/userinfo/newCore.vue';*//*
 import setting from './components/userinfo/setting.vue';*//*
 import login from  './components/userinfo/loginreg/login.vue';//登录页
 import password from  './components/userinfo/loginreg/password.vue';//密码页
 import captcha from  './components/userinfo/loginreg/captcha.vue';//验证码
 import messageCaptcha from  './components/userinfo/loginreg/messageCaptcha.vue';//短信验证码
 import messageCap from  './components/userinfo/loginreg/messageCap.vue';//验证支付密码-短信验证码*/
import keyborad from  './components/keyboard.vue';//短信验证码
import KeyInput from  './components/KeyInput.vue';//短信验证码
import captchaText from  './components/userinfo/loginreg/captchaText.vue';//收不到验证码页
import setPsw from  './components/userinfo/loginreg/setPSW.vue';//设置密码
import goback from  './components/userinfo/loginreg/goback.vue';//goBack
import findPsw from './components/userinfo/loginreg/findPsw.vue';//找回密码页
/*=======================设置链接=======================*/
import set from './components/userinfo/PersonalCenter/set/set.vue';//设置
import paymentset from './components/userinfo/PersonalCenter/set/paymentset.vue';//
import pawManage from './components/userinfo/PersonalCenter/set/pawManage.vue';//
import modifypsd from './components/userinfo/PersonalCenter/set/modifypsd.vue';//设置登录密码
import verificationID from './components/userinfo/PersonalCenter/set/verificationID.vue';//设置登录密码之身份验证找回
import setPaymentPsw from './components/userinfo/PersonalCenter/set/setPaymentPsw.vue';//设置支付密码
import surePaymentPsw from './components/userinfo/PersonalCenter/set/surePaymentPsw.vue';//确认支付密码
import forgetPaymentPsw from './components/userinfo/PersonalCenter/set/forgetPaymentPsw.vue';//忘记支付密码
import bankCardFind from './components/userinfo/PersonalCenter/set/bankCardFind.vue';//银行卡找回
import cardType from './components/index/nav/MyBank/cardType.vue';//银行卡类型列表
import safeSet from './components/userinfo/PersonalCenter/safeSet/safeSet.vue';//安全设置
import hello from './components/hello.vue';//手势密码
import pwd from './components/pwd.vue';//手势密码
import sSmima from './components/sSmima.vue';//手势密码
import modifySetpsw from './components/userinfo/PersonalCenter/set/modifySetpsw.vue';//修改密码中的设置密码
import choiceReset from './components/userinfo/PersonalCenter/set/choiceReset.vue';//选择重置登录密码的方式
import paymentReset from './components/userinfo/PersonalCenter/set/paymentReset.vue';//选择重置支付密码的方式
import addBank from './components/userinfo/PersonalCenter/set/addBank.vue';//重置支付密码添加银行卡
import resetPaymentPsw from './components/userinfo/PersonalCenter/set/resetPaymentPsw.vue';//重置支付密码页面
import forgetPsw from './components/userinfo/PersonalCenter/set/forgetPsw.vue';//点击忘记密码跳转的页面
/*=======================个人信息=======================*/
import personalInfo from './components/userinfo/PersonalCenter/Information/personalInfo.vue';//个人信息
import nickname from './components/userinfo/PersonalCenter/Information/nickname.vue';//个人信息昵称
import gesturePsw from './components/userinfo/PersonalCenter/safeSet/gesturePsw.vue';//手势密码
import feedback from './components/userinfo/PersonalCenter/feedback/feedback.vue';//反馈页面
import Success from './components/userinfo/PersonalCenter/feedback/Success.vue';//反馈页面
/*=======================账户模块之审批页面=======================*/
import addministration from './components/account/addministrationCopy.vue';//报销管理
import bxFootbar from './components/account/bxFootbar.vue';//报销管理模块底部
import addElectronic from './components/account/addElectronic.vue';//报销管理模块添加电子发票
import clickDetails from './components/account/clickDetails.vue';//报销管理模块查看电子发票详情
import EditElectronicInvoice from './components/account/editElectronicInvoice.vue';//报销管理模块编辑电子发票页
import onRefresh from './components/account/onRefresh.vue';//刷新组件
import cause from './components/account/cause1.vue';//报销管理模块是由填写报销单
import causeDetail from './components/account/causeDetail.vue';//报销管理模块是由填写报销单
import fill from './components/account/fill3.vue';//发票列表页
/*=======================错误页面=======================*/
import error from './components/error.vue';//



const routes=[
  /*定额发票/添加*/
  {path:'/addQuotaInvoice',
    name:'addQuotaInvoice',
    component:(resolve) => require(['./components/account/addQuotaInvoice.vue'],resolve),
    meta: {
      title: '完善发票信息'
    } //定额发票/出租车添加
  },
  /*火车票、飞机票*/
  {path:'/aircraft',
    name:'aircraft',
    component:(resolve) => require(['./components/invoice/aircraft.vue'],resolve),
    meta: {
      title: '票据'
    }
  },
  /*报销审批单*/
  {path:'/approvalForm',
    name:'approvalForm',
    component:(resolve) => require(['./components/invoice/approvalForm.vue'],resolve),
    meta: {
      title: '报销单'
    }
  },
  /*发票详情*/
  {path:'/invoiceDetails',
    name:'invoiceDetails',
    component:(resolve) => require(['./components/invoice/invoiceDetails.vue'],resolve),
    meta: {
      title: '发票详情'
    }
  },
  /*收支明细的方法*/
  {path:'/scroll',
    name:'scroll',
    component:(resolve) => require(['./components/index/nav/voucher/scroll.vue'],resolve),
    meta: {
      title: '点击'
    }
  },
  /*收支明细*/
  {path:'/budget',
    name:'budget',
    component:(resolve) => require(['./components/index/nav/voucher/budget.vue'],resolve),
    meta: {
      title: '收支明细'
    }
  },
  /*易得多授权登录*/
  {path:'/AuthorizedLogin',
    name:'AuthorizedLogin',
    component:(resolve) => require(['./components/easyMore/AuthorizedLogin.vue'],resolve),
    meta: {
      title: '授权登录'
    }
  },
  {path:'/AuthorizedPsw',
    name:'AuthorizedPsw',
    component:(resolve) => require(['./components/easyMore/AuthorizedPsw.vue'],resolve),
    meta: {
      title: '设置密码'
    }
  },
  /*        */
  {path:'/amount',
    name:'amount',
    component:(resolve) => require(['./components/account/amount.vue'],resolve),
    meta: {
      title: '报销额度'
    }
  },
  {path:'/invoiceType',
    name:'invoiceType',
    component:(resolve) => require(['./components/account/invoiceType.vue'],resolve),
    meta: {
      title: '选择发票类型'
    }
  },
  {path:'/simpleReim',
    name:'simpleReim',
    component:(resolve) => require(['./components/account/simpleReim.vue'],resolve),
    meta: {
      title: '简易报销'
    }
  },
  {path:'/newAmount',
    name:'newAmount',
    component:(resolve) => require(['./components/account/newAmount.vue'],resolve),
    meta: {
      title: 'new报销额度'
    }
  },
  {path:'/switchEnterprise',
    name:'switchEnterprise',
    component:(resolve) => require(['./components/account/switchEnterprise.vue'],resolve),
    meta: {
      title: '切换企业'
    }
  },
  {path:'/scan',name:'scan',
    component:(resolve) => require(['./components/index/nav/scan.vue'],resolve),
    meta: {
      title: '扫一扫'
    }},
  {path:'/payment',name:'payment',
    component:(resolve) => require(['./components/index/nav/payment.vue'],resolve),
    meta: {
      title: '付款码'
    }},
  {path:'/flj',name:'flj',
    component:(resolve) => require(['./components/index/nav/flj.vue'],resolve),
    meta: {
      title: '福利集市'
    }},
  {path:'/footbar',name:'footbar',
    component:(resolve) => require(['./components/footbar.vue'],resolve),
  },//foot
  {path:'/navbar',name:'navbar',
    component:(resolve) => require(['./components/index/nav/navbar.vue'],resolve),
  },//nav
  {path:'/newsCore',name:'newsCore',
    component:(resolve) => require(['./components/index/nav/newsCore.vue'],resolve),
    meta: {
      title: '消息中心'
    }},//消息中心
  {path:'/newsC',name:'newsC',
    component:(resolve) => require(['./components/index/nav/newsC.vue'],resolve),
    meta: {
      title: '消息'
    }},//消息中心
  {path:'/newsSet',name:'newsSet',
    component:(resolve) => require(['./components/index/nav/newsSet.vue'],resolve),
    meta: {
      title: '消息设置'
    }},//消息设置
  {path:'/applica',name:'applica',
    component:(resolve) => require(['./components/index/content/applica.vue'],resolve),
  },
  {path:'/allLication',name:'allLication',
    component:(resolve) => require(['./components/index/allLication.vue'],resolve),
    meta: {
      title: '全部应用'
    }},
  {path:'/broadcast',name:'broadcast',
    component:(resolve) => require(['./components/index/content/broadcast.vue'],resolve),
    meta: {
      title: ''
    }},
  {path:'/recommend',name:'recommend',
    component:(resolve) => require(['./components/index/content/recommend.vue'],resolve),
    meta: {
      title: ''
    }},
  {path:'/inviteHome',name:'inviteHome',
    component:(resolve) => require(['./components/index/foot/inviteHome.vue'],resolve),
  },
  {path:'/inviteUser',name:'inviteUser',
    component:(resolve) => require(['./components/index/foot/inviteUser.vue'],resolve),
  },
  {path:'/qDetails',name:'qDetails',
  component:(resolve) => require(['./components/index/nav/QDetails/qDetails.vue'],resolve),
  meta: {
  title: '消费券详情'
}},//消费券详情
  {path:'/rechargeDetails',name:'rechargeDetails',
    component:(resolve) => require(['./components/index/nav/voucher/rechargeDetails.vue'],resolve),
    meta: {
      title: '消费券明细'
    }},//消费券详情
  {path:'/aBank',name:'aBank',
    component:(resolve) => require(['./components/index/nav/MyBank/aBank.vue'],resolve),
    meta: {
      title: '添加银行卡'
    }},
  {path:'/cardType',name:'cardType',
    component:(resolve) => require(['./components/index/nav/MyBank/cardType.vue'],resolve),
    meta: {
      title: '银行卡类型列表'
    }},//银行卡类型列表
  {path:'/realName',name:'realName',
    component:(resolve) => require(['./components/index/nav/MyBank/realName.vue'],resolve),
    meta: {
      title: '实名认证'
    }},//c端用户实名认证
  {path:'/problem',name:'problem',
    component:(resolve) => require(['./components/index/nav/MyBank/problem.vue'],resolve),
    meta: {
      title: '问题'
    }},//问题


  /*=======================foot链接=======================*/
  {path:'/home',name:'home',
    component:(resolve) => require(['./components/index/foot/home.vue'],resolve),
    meta: {
      title: '智惠嘉首页'}},
  {path:'/shop',name:'shop',
    component:(resolve) => require(['./components/index/foot/shop.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/found',name:'found',
    component:(resolve) => require(['./components/index/foot/found.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/couponMarket',name:'couponMarket',
    component:(resolve) => require(['./components/index/foot/couponMarket.vue'],resolve),
    meta: {
    title: '券市场'
  }},
  {path:'/user',name:'user',
    component:(resolve) => require(['./components/index/foot/user.vue'],resolve),
    meta: {
      title: '我的'
    }},
  {path:'/',redirect:'/home',
    meta: {
      title: '首页'}},//找不到的页面默认跳到home
  {path:'*',redirect:'/error',meta: {
    title: ''}},
  /*=======================userinfo链接=======================*/

  {path:'/bankCard',name:'bankCard',
    component:(resolve) => require(['./components/userinfo/bankCard.vue'],resolve),
    meta: {
      title: '银行卡'
    }},
  /*{path:'/RealName',name:'RealName',component:RealName},*//*
   {path:'/newCore',name:'newCore',component:newCore},*//*
   {path:'/setting',name:'setting',component:setting},*/
  {path:'/login',name:'login',
    component:(resolve) => require(['./components/userinfo/loginreg/login.vue'],resolve),
    meta: {
      title: ''
    }},//输入手机号
  {path:'/password',name:'password',
    component:(resolve) => require(['./components/userinfo/loginreg/password.vue'],resolve),
    meta: {
      title: ''
    }},//输入密码
  {path:'/captcha',
    name:'captcha',
    /*component:captcha,*/
    component:(resolve) => require(['./components/userinfo/loginreg/captcha.vue'],resolve),
    meta: {
      title: ''
    }},//图形验证码
  {path:'/messageCaptcha',
    name:'messageCaptcha',
    component:(resolve) => require(['./components/userinfo/loginreg/messageCaptcha.vue'],resolve),
    /*component:messageCaptcha,*/
    meta: {
      title: ''
    }},
  {path:'/messageCap',
    name:'messageCap',
    component:(resolve) => require(['./components/userinfo/loginreg/messageCap.vue'],resolve),
    /*component:messageCap,*/
    meta: {
      title: ''
    }},
  {path:'/captchaText',name:'captchaText',
    component:(resolve) => require(['./components/userinfo/loginreg/captchaText.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/KeyInput',name:'KeyInput',
    component:(resolve) => require(['./components/KeyInput.vue'],resolve),
  },
  {path:'/keyboard',name:'keyboard',
    component:(resolve) => require(['./components/keyboard.vue'],resolve),
  },

  {path:'/setPsw',name:'setPsw',
    component:(resolve) => require(['./components/userinfo/loginreg/setPSW.vue'],resolve),
    meta: {
    title: ''
  }},

  {path:'/goback',name:'goback',
    component:(resolve) => require(['./components/userinfo/loginreg/goback.vue'],resolve),
  },
  {path:'/findPsw',name:'findPsw',
    component:(resolve) => require(['./components/userinfo/loginreg/findPsw.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/feedback',
    name:'feedback',
   component:(resolve) => require(['./components/userinfo/PersonalCenter/feedback/feedback.vue'],resolve),
    meta: {
      title: '意见反馈'
    }},//反馈页面
  {path:'/Success',
    name:'Success',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/feedback/Success.vue'],resolve),
    meta: {
      title: '意见反馈'
    }},//反馈页面
  /*=======================设置链接=======================*/

  {path:'/set',name:'set',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/set.vue'],resolve),
    meta: {
    title: '设置'
  }},
  {path:'/paymentset',name:'paymentset',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/paymentset.vue'],resolve),
    meta: {
    title: '支付问题'
  }},
  {path:'/pawManage',name:'pawManage',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/pawManage.vue'],resolve),
    meta: {
    title: '密码管理'
  }},
  {path:'/modifypsd',name:'modifypsd',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/modifypsd.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/verificationID',name:'verificationID',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/verificationID.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/setPaymentPsw',name:'setPaymentPsw',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/resetPaymentPsw.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/surePaymentPsw',name:'surePaymentPsw',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/surePaymentPsw.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/forgetPaymentPsw',name:'forgetPaymentPsw',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/forgetPaymentPsw.vue'],resolve),
    meta: {
    title: '重置支付密码'
  }},
  {path:'/bankCardFind',name:'bankCardFind',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/bankCardFind.vue'],resolve),
    meta: {
    title: '重置支付密码'
  }},
  {path:'/safeSet',name:'safeSet',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/safeSet/safeSet.vue'],resolve),
    meta: {
    title: '安全设置'
  }},
  {path:'/hello',name:'hello',
    component:(resolve) => require(['./components/hello.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/pwd',name:'pwd',
    component:(resolve) => require(['./components/pwd.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/sSmima',name:'sSmima',
    component:(resolve) => require(['./components/sSmima.vue'],resolve),
    meta: {
    title: '设置手势密码'
  }},//手势密码
  /*{path:'/hello',component:hello},//手势密码*/
  {path:'/modifySetpsw',name:'modifySetpsw',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/modifySetpsw.vue'],resolve),
    meta: {
    title: ''
  }},
  {path:'/personalInfo',name:'personalInfo',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/Information/personalInfo.vue'],resolve),
    meta: {
    title: '个人信息'
  }},
  {path:'/nickname',name:'nickname',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/Information/nickname.vue'],resolve),
    meta: {
    title: '昵称'
  }},//昵称

  {path:'/gesturePsw',name:'gesturePsw',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/safeSet/gesturePsw.vue'],resolve),
    meta: {
    title: ''
  }},//手势密码
  {path:'/choiceReset',name:'choiceReset',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/choiceReset.vue'],resolve),
    meta: {
    title: '重置登录密码'
  }},//选择重置登录密码方式
  {path:'/paymentReset',name:'paymentReset',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/paymentReset.vue'],resolve),
    meta: {
    title: '重置支付密码'
  }},//选择重置支付密码方式
  {path:'/resetPaymentPsw',name:'resetPaymentPsw',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/resetPaymentPsw.vue'],resolve),
    meta: {
    title: '重置支付密码'
  }},//重置支付密码页面
  {path:'/addBank',name:'addBank',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/addBank.vue'],resolve),
    meta: {
    title: '添加银行卡'
  }},//重置支付密码添加银行卡
  {path:'/forgetPsw',name:'forgetPsw',
    component:(resolve) => require(['./components/userinfo/PersonalCenter/set/forgetPsw.vue'],resolve),
    meta: {
    title: '忘记密码'
  }},//点击忘记密码跳转的页面
  /*报销单明细中点击报销发票跳转到这里，展示此张报销单中的所有发票*/
  {path:'/list',
    name:'list',
    component:(resolve) => require(['./components/invoice/list.vue'],resolve),
    meta: {
      title: '发票列表'
    }
  },
  /*选择费用归属*/
  {path:'/costattribution',
    name:'costattribution',
    component:(resolve) => require(['./components/invoice/costattribution.vue'],resolve),
    meta: {
      title: '选择费用归属'
    }
  },
  /*飞机行程单*/
  {path:'/itinerary',
    name:'itinerary',
    component:(resolve) => require(['./components/invoice/itinerary.vue'],resolve),
    meta: {
      title: '完善行程单信息'
    }  //添加火车/飞机发票页面
  },
  /*{path:'/cardType',name:'cardType',
    component:(resolve) => require(['./components/index/nav/MyBank/cardType.vue'],resolve),
    meta: {
    title: '卡类型列表'
  }},//卡类型列表------------------------------重复了
*/
  /*=======================账户模块之审批页面=======================*/
  {path:'/addministration',name:'addministration',
    component:(resolve) => require(['./components/account/addministrationCopy.vue'],resolve),
    meta: {
    title: '报销管理'
  }},//报销管理
  {path:'/onRefresh',name:'onRefresh',
    component:(resolve) => require(['./components/account/onRefresh.vue'],resolve),
  },//刷新组件
  {path:'/bxFootbar',name:'bxFootbar',
    component:(resolve) => require(['./components/account/bxFootbar.vue'],resolve),
  },//报销管理模块底部
  {path:'/fill',name:'fill',
    component:(resolve) => require(['./components/account/fill3.vue'],resolve),
    meta: {
    title: '发票管理'
  }},
  /*选择发票报销页*/
  {path:'/chooseInvoice',
    name:'chooseInvoice',
    component:(resolve) => require(['./components/invoice/chooseInvoice.vue'],resolve),
    meta: {
      title: '选择发票'
    }
  },
  //报销管理模块上传照片
  {path:'/reimbDetail',name:'reimbDetail',
    component:(resolve) => require(['./components/account/reimbDetail.vue'],resolve),
    meta: {
      title: '报销单明细'
    }},//报销单明细页
  {path:'/electronicInvoice',name:'electronicInvoice',
    component:(resolve) => require(['./components/account/electronicInvoice.vue'],resolve),
    meta: {
      title: '添加电子发票'
    }},//添加电子发票
  {path:'/addElectronic',name:'addElectronic',
    component:(resolve) => require(['./components/account/addElectronic.vue'],resolve),
    meta: {
    title: '添加电子发票'
  }},//报销管理模块添加电子发票
  {path:'/clickDetails',name:'clickDetails',
    component:(resolve) => require(['./components/account/clickDetails.vue'],resolve),
    meta: {
    title: '查询电子发票'
  }},//报销管理模块查看电子发票详情
  {path:'/editElectronicInvoice',name:'editElectronicInvoice',
    component:(resolve) => require(['./components/account/editElectronicInvoice.vue'],resolve),
    meta: {
    title: '编辑电子发票'
  }},//报销管理模块编辑电子发票
  {path:'/cause',name:'cause',
    component:(resolve) => require(['./components/account/cause1.vue'],resolve),
    meta: {
    title: '填写报销单'
  }},//报销管理模块事由报销单
  {path:'/causeDetail',name:'causeDetail',
    component:(resolve) => require(['./components/account/causeDetail.vue'],resolve),
    meta: {
    title: '报销单详情'
  }},//报销管理模块事由报销单
  /*==================最新消费券需求页面====================*/
  {path:'/vouchers',name:'vouchers',
    component:(resolve) => require(['./components/index/nav/voucher/voucherHome.vue'],resolve),
    meta: {
      title: '我的消费券'
    }},
  {path:'/voucherRecharge',name:'voucherRecharge',
    component:(resolve) => require(['./components/index/nav/voucher/voucherRecharge.vue'],resolve),
    meta: {
      title: '我的消费券'
    }},
  {path:'/budgetDetail',name:'budgetDetail',
    component:(resolve) => require(['./components/index/nav/voucher/budgetDetail.vue'],resolve),
    meta: {
      title: ''
    }},
  {path:'/voucherEnterprise',name:'voucherEnterprise',
    component:(resolve) => require(['./components/index/nav/voucher/voucherEnterprise.vue'],resolve),
    meta: {
      title: '企业消费券'
    }},
  {path:'/voucherPers',name:'voucherPers',
    component:(resolve) => require(['./components/index/nav/voucher/voucherPers.vue'],resolve),
    meta: {
      title: '个人消费券'
    }},
  {path:'/voucherEasytoBuy',name:'voucherEasytoBuy',
    component:(resolve) => require(['./components/index/nav/voucher/voucherEasytoBuy.vue'],resolve),
    meta: {
      title: '易得多购买'
    }},
  /*===================易得多页面向导=====================*/
  {path:'/easyMoreGuide',name:'easyMoreGuide',
    component:(resolve) => require(['./components/index/nav/easyMoreGuide.vue'],resolve),
    meta: {
      title: '易得多向导'
    }},
  /*==================扫描二维码模块====================*/
  {path:'/Scan',
    name:'Scan',
    component:(resolve) => require(['./components/invoice/Scan.vue'],resolve),
    meta: {
      title: '识别失败'
    }
  },
  /*完善报销信息Scan.vue*/
  {path:'/add',
    name:'add',
    component:(resolve) => require(['./components/invoice/add.vue'],resolve),
    meta: {
      title: '完善报销信息'
    } // 增值税专/普/电/卷票信息完善页面
  },
  /*城市选择city父组件*/
  {path:'/city',
    name:'city',
    component:(resolve) => require(['./components/invoice/city.vue'],resolve),
    meta: {
    title: '城市选择'
   }
 },
  {path:'/linkage',
    name:'linkage',
    component:(resolve) => require(['./components/invoice/linkage.vue'],resolve),
    meta: {
      title: '三级联动'
    }
  },
  /*=======================错误页面=======================*/

  {path:'/error',name:'error',
    component:(resolve) => require(['./components/error.vue'],resolve),
    meta: {
    title: ''
  }},//404页面
  /*=======================微信授权页=======================*/

  {path:'/authorization',name:'authorization',
    component:(resolve) => require(['./components/authorization.vue'],resolve),
    meta: {
      title: '授权页'
    }},//微信授权页
  {path:'/unbind',name:'unbind',
    component:(resolve) => require(['./components/unbindFile/unbind.vue'],resolve),
    meta: {
      title: '解除绑定'
    }},//解除绑定失败
  {path:'/unbindFail',name:'unbindFail',
    component:(resolve) => require(['./components/unbindFile/unbindFail.vue'],resolve),
    meta: {
      title: '解除绑定'
    }},//解除绑定失败
  /*=======================   智能代卖   =======================*/
  {path:'/saleHome',name:'saleHome',
    component:(resolve) => require(['./components/sale/saleHome.vue'],resolve),
    meta:{
      title:'代卖首页'
    }
  },
  {path:'/intelligentSale',name:'intelligentSale',
    component:(resolve) => require(['./components/sale/intelligentSale.vue'],resolve),
    meta:{
      title:'智能代卖'
    }
  },
  {path:'/saleOrder',name:'saleOrder',
    component:(resolve) => require(['./components/sale/saleOrder.vue'],resolve),
    meta:{
      title:'代卖订单'
    }
  },
  {path:'/quotaMana',name:'quotaMana',
    component:(resolve) => require(['./components/sale/quotaMana.vue'],resolve),
    meta:{
      title:'额度管理'
    }
  },
  {path:'/deliveryOrderDetail',name:'deliveryOrderDetail',
    component:(resolve) => require(['./components/sale/deliveryOrderDetail.vue'],resolve),
    meta:{
      title:'代卖订单详情'
    }
  },
  {path:'/carryOrder',name:'carryOrder',
    component:(resolve) => require(['./components/sale/carryOrder.vue'],resolve),
    meta:{
      title:'提现顺序'
    }
  },
  {path:'/cashRecord',name:'cashRecord',
    component:(resolve) => require(['./components/sale/cashRecord.vue'],resolve),
    meta:{
      title:'提现记录'
    }
  },
  {path:'/cashRecordDetail',name:'cashRecordDetail',
    component:(resolve) => require(['./components/sale/cashRecordDetail.vue'],resolve),
    meta:{
      title:'提现详情'
    }
  },
  {path:'/saleSusess',name:'saleSusess',
    component:(resolve) => require(['./components/sale/saleSusess.vue'],resolve),
    meta:{
      title:'智能代卖'
    }
  },

  /*=======================添加银行卡模块=======================*/

  /*=======================   券市场   =======================*/

  {path:'/mDetails',name:'mDetails',
    component:(resolve) => require(['./components/market/mDetails.vue'],resolve),
    meta:{
      title:'券详情'
    }
  },
  {path:'/mPurchase',name:'mPurchase',
    component:(resolve) => require(['./components/market/mPurchase.vue'],resolve),
    meta:{
      title:'购买'
    }
  },
  {path:'/mOrder',name:'mOrder',
    component:(resolve) => require(['./components/market/mOrder.vue'],resolve),
    meta:{
      title:'确认订单'
    }
  },
  {path:'/beforehand',name:'beforehand',
    component:(resolve) => require(['./components/market/beforehand.vue'],resolve),
    meta:{
      title:'预开票设置'
    }
  },
  {path:'/cashAccount',name:'cashAccount',
    component:(resolve) => require(['./components/market/cashAccount.vue'],resolve),
    meta:{
      title:'现金账户'
    }
  },
  {path:'/openInvoiceSet',name:'openInvoiceSet',
    component:(resolve) => require(['./components/market/openInvoiceSet.vue'],resolve),
    meta:{
      title:'开票设置'
    }
  },
  {path:'/invoiceTT',name:'invoiceTT',
    component:(resolve) => require(['./components/market/invoiceTT.vue'],resolve),
    meta:{
      title:'发票抬头管理'
    }
  },
  {path:'/addressManage',name:'addressManage',
    component:(resolve) => require(['./components/market/addressManage.vue'],resolve),
    meta:{
      title:'邮寄地址管理'
    }
  },
  {path:'/addInvoiceTT',name:'addInvoiceTT',
    component:(resolve) => require(['./components/market/addInvoiceTT.vue'],resolve),
    meta:{
      title:'新增发票抬头',
      // keepAlive:true,
     // isBack: true,
    }
  },
  {path:'/addAddress',name:'addAddress',
    component:(resolve) => require(['./components/market/addAddress.vue'],resolve),
    meta:{
      title:'新增邮寄地址',
      keepAlive:true,
    }
  },
  {path:'/openInvoice',name:'openInvoice',
    component:(resolve) => require(['./components/market/openInvoice.vue'],resolve),
    meta:{
      title:'开票'
    }
  },
  {path:'/cRecharge',name:'cRecharge',
    component:(resolve) => require(['./components/market/cRecharge.vue'],resolve),
    meta:{
      title:'充值'
    }
  },
  {path:'/mHistory',name:'mHistory',
    component:(resolve) => require(['./components/market/mHistory.vue'],resolve),
    meta:{
      title:'开票历史'
    }
  },
  {path:'/InDetails',name:'InDetails',
    component:(resolve) => require(['./components/market/InDetails.vue'],resolve),
    meta:{
      title:'开票详情'
    }
  },
  {path:'/historyDetails',name:'historyDetails',
    component:(resolve) => require(['./components/market/historyDetails.vue'],resolve),
    meta:{
      title:'开票订单详情'
    }
  },
  {path:'/bill',name:'bill',
    component:(resolve) => require(['./components/market/bill.vue'],resolve),
    meta:{
      title:'账单'
    }
  },
  {path:'/billDetails',name:'billDetails',
    component:(resolve) => require(['./components/market/billDetails.vue'],resolve),
    meta:{
      title:'账单详情'
    }
  },
  {path:'/choiceBank',
    name:'choiceBank',
    component:(resolve) => require(['./components/index/nav/MyBank/choiceBank.vue'],resolve),
    meta: {
      title: '选择银行'
    }
  },
  {path:'/tiedCard',name:'tiedCard',
    component:(resolve) => require(['./components/index/nav/MyBank/tiedCard.vue'],resolve),
    meta:{
      title:'添加银行卡',
    }
  },
  {path:'/drawABill',name:'drawABill',
    component:(resolve) => require(['./components/market/drawABill.vue'],resolve),
    meta:{
      title:'预开票设置'
    }
  },
  {path:'/lastDrawABill',name:'lastDrawABill',
    component:(resolve) => require(['./components/market/lastDrawABill.vue'],resolve),
    meta:{
      title:'消费后开票设置'
    }
  },
  /*mPayment.vue*/
  {path:'/mPayment',name:'mPayment',
    component:(resolve) => require(['./components/market/mPayment.vue'],resolve),
    meta:{
      title:'支付成功'
    }
  },
  {path:'/rechargePayment',name:'rechargePayment',
    component:(resolve) => require(['./components/market/rechargePayment.vue'],resolve),
    meta:{
      title:'充值成功'
    }
  },
  {path:'/UniversalCouponOpenInv',name:'UniversalCouponOpenInv',
    component:(resolve) => require(['./components/market/UniversalCouponOpenInv.vue'],resolve),
    meta:{
      title:'通用券开票'
    }
  },
  {path:'/helpText',name:'helpText',
    component:(resolve) => require(['./components/market/helpText.vue'],resolve),
    meta:{
      title:'智惠嘉开票帮助'
    }
  },
  {path:'/ruleText',name:'ruleText',
    component:(resolve) => require(['./components/market/ruleText.vue'],resolve),
    meta:{
      title:'智惠嘉开票规则'
    }
  },
  {path:'/cardDetail',name:'cardDetail',
    component:(resolve) => require(['./components/index/nav/MyBank/cardDetail.vue'],resolve),
    meta:{
      title:'银行卡转账'
    }
  },
  /*inviteIndex.vue*/
  {path:'/inviteIndex',name:'inviteIndex',
    component:(resolve) => require(['./components/inviteFriends/inviteIndex.vue'],resolve),
    meta:{
      title:'',/*邀请好友*/
      description:"首单最高返现500元",
      imgUrl:require("./assets/image/Wisdom.png")
    }
  },
  {path:'/inviteFriendRule',name:'inviteFriendRule',
    component:(resolve) => require(['./components/inviteFriends/inviteFriendRule.vue'],resolve),
    meta:{
      title:'活动规则'
    }
  },
];

export default routes;

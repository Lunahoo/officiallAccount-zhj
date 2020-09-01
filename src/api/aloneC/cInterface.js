/**
 * Created by DELL on 2019/3/7.
 */
import request from '@/router/axios'

//通过id查询发票抬头==编辑发票抬头页面
export function queryMemberInvoiceConfigById(token,id) {
  return request({
    url:'/h5/member/queryMemberInvoiceConfigById?id='+id,
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}

//分页查询发票抬头 == 发票抬头列表页
export function queryMemberInvoiceConfigPage(token,ttListInfo) {
  return request({
    url:'/h5/member/queryMemberInvoiceConfigPage',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:ttListInfo
  })
}

//添加发票抬头
export function addMemberInvoiceConfig(token,ttList) {
  return request({
    url:'/h5/member/addMemberInvoiceConfig',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:ttList
  })
}
//编辑发票抬头
export function editMemberInvoiceConfig(token,ttList) {
  return request({
    url:'/h5/member/editMemberInvoiceConfig',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:ttList
  })
}


/*添加人员收获地址信息*/
export function addShippingAddress(token,parameter) {
  return request({
    url:'/h5/member/addShippingAddress',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}


/*通过id查询员工收获地址信息*/
export function queryShippingAddressById(token,id) {
  return request({
    url:'/h5/member/queryShippingAddressById?id='+id,
    method: 'get',
    headers:{
      accessToken:token
    }
  })
}


/*编辑人员收获地址信息*/
export function eidtShippingAddress(token,parameter) {
  return request({
    url:'/h5/member/eidtShippingAddress',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}

//删除员工收获地址信息
export function delShippingAddress(token,id) {
  return request({
    url:'/h5/member/delShippingAddress?id='+id,
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}

/*分页查询员工收获地址信息*/
export function queryShippingAddressPage(token,parameter) {
  return request({
    url:'/h5/member/queryShippingAddressPage',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}
/*省市区街道三级联动*/
/*省*/
export function findAllCityOrProvince() {
  return request({
    url:'/h5/province/findAllCityOrProvince',
    method: 'post',
  })
}
/*市、区*/
export function findDetailByPId(pId) {
  return request({
    url:'/h5/province/findDetailByPId?pId='+pId,
    method: 'post',
  })
}
//根据人员id,消费券id获取开票历史记录
export function findOpenInvoiceHistory(token,openInvoiceList) {
  return request({
    url:'/h5/bill/findOpenInvoiceHistory',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:openInvoiceList
  })
}
//根据开票申请获取详情
export function findInvoiceDetailById(token,invoiceDetailID) {
  return request({
    url:'/h5/bill/findInvoiceDetailById',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:invoiceDetailID
  })
}

//开票详情页面重新发送发票短信
export function sendInvoiceSms(token,idInfo) {
  return request({
    url:'/h5/bill/sendInvoiceSms',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:idInfo
  })
}


//根据订单号查询订单详情==开票订单详情
export function findOrderDetailByOrderNo(token,orderPayNos) {
  return request({
    url:'/h5/bill/findOrderDetailByOrderNo',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:orderPayNos
  })
}
//删除发票抬头
export function delMemberInvoiceConfig(token,id) {
  return request({
    url:'/h5/member/delMemberInvoiceConfig?id='+id,
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}

// 我的消费券列表
export function queryMemberCouponListNew(token,parameter) {
  return request({
    url:'/h5/coupon/queryMemberCouponListNew',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}
// 消费券详情
export function queryCouponDetailNew(token,id) {
  return request({
    url:'/h5/coupon/queryCouponDetailNew?couponId='+id,
    method: 'get',
    headers:{
      accessToken:token
    },
  })
}
//劵查询科目信息
export function getItemByCoupon(token,parameter) {
  return request({
    url:'/h5/coupon/getItemByCoupon',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}
//劵购买申请订单添加
export function addCouponBuyApply(token,parameter) {
  return request({
    url:'/h5/coupon/addCouponBuyApply',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}

//预开票addInvoiceApply
export function addInvoiceApply(token,parameter) {
  return request({
    url:'/h5/coupon/addInvoiceApply',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}

//劵购买申请详情
export function getCouponBuyApply(token,Id) {
  return request({
    url:'/h5/coupon/getCouponBuyApply?applyId='+Id,
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}
//回调劵申请购买
export function editCouponBuyApply(token,parameter) {
  return request({
    url:'/h5/coupon/editCouponBuyApply',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}

//根据登录账号查询使用中开票列表 == 开票页面
export function findCouponInfoByApplyor(token) {
  return request({
    url:'/h5/bill/findCouponInfoByApplyor',
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}

//根据登录账号查询使用中可开票科目 == 开票页面的开票类型弹窗
export function findSubjectByApplyIdAndCouponId(token,couponIdInfo) {
  return request({
    url:'/h5/bill/findSubjectByApplyIdAndCouponId',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:couponIdInfo
  })
}

//银行卡列表 == 选择银行卡
export function queryBankCard(token) {
  return request({
    url:'/h5/member/queryBankCard',
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}

//发送短信接口-收款账号信息
export function sendReceiveAccountJiaFu(token,mobile) {
  return request({
    url:'/h5/sms/sendReceiveAccountJiaFu?mobile='+mobile,
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}

//查询全部现金账户信息 == 现金账户页面
export function queryAllSalaryBalance(token) {
  return request({
    url:'/h5/account/queryAllSalaryBalance',
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}

//账单列表页面 == 账单
export function findOrderInfoByMemberId(token,queryInfo) {
  return request({
    url:'/h5/bill/findOrderInfoByMemberId',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:queryInfo
  })
}

//账户充值申请
export function addRecharge(token,rechargeInfo) {
  return request({
    url:'/h5/fundRechargeOrWithdraw/addRecharge',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:rechargeInfo
  })
}

//指定券开票页面  == 通用券开票
export function findCouponInvoiceRecords(token,currencyQopenQInfo) {
  return request({
    url:'/h5/bill/findCouponInvoiceRecords',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:currencyQopenQInfo
  })
}
//查询券账户总额
export function queryCouponBalanceSum(token,data) {
  return request({
    url:'/h5/coupon/queryCouponBalanceSum',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:data
  })
}
//查询券账户详情 券列表
export function queryCouponBalanceDetail(token,data) {
  return request({
    url:'/h5/coupon/queryCouponBalanceDetail',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:data
  })
}
//查询单张消费券账户详情
export function queryCouponDetail(token,data) {
  return request({
    url:'/h5/coupon/queryCouponDetail',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:data
  })
}
//查询券账户收支明细
export function budgetPage(token,data) {
  return request({
    url:'/h5/coupon/budgetPage',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:data
  })
}

//开票额度校验
export function validateOpenInvoiceQuota(token,quotaInfo) {
  return request({
    url:'/h5/bill/validateOpenInvoiceQuota',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:quotaInfo
  })
}

//开票接口
export function openInvoiceByApplyInvoice(token,quotaInfo) {
  return request({
    url:'/h5/bill/openInvoiceByApplyInvoice',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:quotaInfo
  })
}

//编辑开票申请 == 不开发票
export function editOrderDetailByIds(token,notOpenInvoiceInfo) {
  return request({
    url:'/h5/bill/editOrderDetailByIds',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:notOpenInvoiceInfo
  })
}
/*绑卡接口*/
export function bindBankCardNew(accessToken,data) {
  return request({
    url: '/h5/auth/bindBankCardNew',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
    data:data
  })
}
/* 查询银行卡基础信息-分组*/
export function findBankCardGroupName() {
  return request({
    url: '/h5/bank/findBankCardGroupName',
    method: 'post',
  })
}
/*查询银行卡信息*/
export function findBankByBankCode(accessToken,bankCode) {
  return request({
    url: '/h5/bank/findBankByBankCode?bankCode='+bankCode,
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
//账户提现申请
export function addWithDraw(accessToken,cashInfo) {
  return request({
    url: '/h5/fundRechargeOrWithdraw/addWithDraw',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
    data:cashInfo
  })
}

//预开票回调 editInvoiceApply
export function editInvoiceApply(token,parameter) {
  return request({
    url:'/h5/coupon/editInvoiceApply',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}

//账户充值回调接口
export function editRecharge(token,callbackInfo) {
  return request({
    url:'/h5/fundRechargeOrWithdraw/editRecharge',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:callbackInfo
  })
}

//编辑纸质发票的状态
export function editPaperInvoiceState(token,callbackInfo) {
  return request({
    url:'/h5/bill/editPaperInvoiceState',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:callbackInfo
  })
}
//实名认证接口
export function realNameNew(token,name,identityNo) {
  return request({
    url:'/h5/auth/realNameNew?name='+name+'&identityNo='+identityNo,
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}
//查询运费接口
export function queryFreightAmount(token) {
  return request({
    url:'/h5/coupon/queryFreightAmount',
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}

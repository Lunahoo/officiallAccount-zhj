/**
 * Created by DELL on 2018/7/20.
 */
import request from '@/router/axios'
//1、查询手机号是否已注册接口文档：是否注册接口
export function logintel(loginData) {
  return request({
    url:'/h5/member/queryMemberIsRegistered',
    method: 'post',
    params:loginData
  })
}
//2、发送图形验证码接口文档
//3、注册、登录发送短信验证码接口文档
export function sendMess(messageData) {
  return request({
    url:'/h5/sms/sendUnloginSmsCode',
    method: 'post',
    data:messageData
  })
}
//4、验证注册短信验证码接口文档
export function checkRegisterSms(mobile,smsMess,smsType) {
  return request({
    url:'/h5/sms/checkRegisterSms?mobile='+mobile+'&smsCode='+smsMess+'&smsSign='+smsType,
    method: 'post',
  })
}
//5、用户注册接口文档
export function register(regData) {
  return request({
    url:'/h5/member/register',
    method: 'post',
    data:regData
  })
}
/*登录：
 1、密码登录
 * 用户登录接口文档
 2、短信验证码登录
 * 发送图形验证码接口文档
 * 注册、登录发送短信验证码接口文档
 * 用户登录接口文档*/

//1、密码登录
export function login(loginData) {
  return request({
    url:'/h5/member/login',
    method: 'post',
    data:loginData
  })
}
//1、查询是否是新设备接口
export function queryIsNewDeviceLogin(mobile,deviceId) {
  return request({
    url:'/h5/member/queryIsNewDeviceLogin?mobile='+mobile+"&deviceId="+deviceId,
    method: 'post',
  })
}

/************忘记密码接口********************************/
//用户发送验证码验证是否正确（找回密码||新设备登录验证短信验证码）
export function forgetPswSms(mobile,smsCode,smsSign) {
  return request({
    url:'/h5/sms/checkSmsCode?mobile='+mobile+'&smsCode='+smsCode+'&smsSign='+smsSign,
    method: 'post',
  })
}
//已登录用户发送短信验证码
export function sendSmsCode(userId,sendMessData) {
  return request({
    url:'/h5/sms/sendSmsCode',
    method: 'post',
    headers: {
      'accessToken': userId
    },
    data:sendMessData
  })
}
//验证身份证修改密码接口--验证身份证
export function changeSfz(mobile,changeData) {
  return request({
    url:'/h5/member/queryByIdentityNo?mobile='+mobile+'&identityNo='+ changeData,
    method: 'post',
  })
}
//短信验证码找回登录密码
export function forgetLoginPasswordSms(mobile,smsCode,newPassword) {
  return request({
    url:'/h5/pw/forgetLoginPasswordSms?mobile=' + mobile + "&smsCode=" + smsCode+"&newPassword="+newPassword,
    method: 'post',
  })
}
//短信验证码重置登录密码
export function resetLoginPasswordSms(userId,smsCode,newPassword) {
  return request({
    url:'/h5/pw/resetLoginPasswordSms?smsCode=' + smsCode+"&newPassword="+newPassword,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//验证身份证找回密码接口--设置登录密码
export function forgetLoginPasswordIdCard(mobile,identityNo,LoginPswData) {
  return request({
    url:'/h5/pw/forgetLoginPasswordIdCard?mobile='+mobile+'&identityNo=' + identityNo + "&newPassword=" + LoginPswData,
    method: 'post',
  })
}
//验证身份证修改密码接口--设置登录密码
export function resetLoginPasswordIdCard(userId,identityNo,LoginPswData) {
  return request({
    url:'/h5/pw/resetLoginPasswordIdCard?identityNo=' + identityNo + "&newPassword=" + LoginPswData,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
/************忘记密码接口结束*************************************/
//验证登录密码接口(验证输入的原密码是否正确)
export function checkResetLoginPassword(userId,password) {
  return request({
    url:'/h5/pw/checkResetLoginPassword?password=' + password,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}

//通过输入原密码修改新密码--验证已经修改好的新密码接口
export function changeNewPsw(userId,Opsw,Npsw) {
  return request({
    url:'/h5/pw/modifyLoginPassword?oldPassword=' + Opsw + "&newPassword=" + Npsw,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
/*********我的银行卡接口***********/
//查询银行卡接口
export function queryBankCard(userId) {
  return request({
    url:'/h5/member/queryBankCard',
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}

//验证支付密码/确认支付密码接口
export function checkPayPassword(userId,psw) {
  return request({
    url:'/h5/pw/checkPayPassword?password=' + psw,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}

//查询是否已实名接口（userID）
export function isRealName(userId,companyId) {
  return request({
    url:'/h5/member/queryMemberNew?companyId='+companyId,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//查询是否已实名接口（mobile）
export function queryMemberByMobile(mobile) {
  return request({
    url:'/h5/member/queryMemberByMobile?mobile='+mobile,
    method: 'post',
  })
}
//绑卡发送验证码
export function sendSmsCodeBankCard(token,bkYzm) {
  return request({
    url:'/h5/sms/sendSmsCodeBankCard',
    method: 'post',
    headers:{
      accessToken: token
    },
    data:bkYzm
  })
}


//绑卡接口  bindingCard
export function bindCard(token,bk) {
  return request({
    url:'/h5/auth/bindBankCard',
    method: 'post',
    headers:{
      accessToken: token
    },
    data:bk
  })
}

//查询身份证是否已实名
export function checkRealName(token,name,idC) {
  return request({
    url:'/h5/auth/realName?name=' + name + "&identityNo=" + idC,
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}

//解绑银行卡
export function unbindCard(token,bankcardId) {
  return request({
    url:'/h5/auth/unbindBankCard?id=' + bankcardId,
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}

//根据卡bin查询银行卡接口
export function queryBankByBin(token,bin) {
  return request({
    url:'/h5/bank/queryBankByBin?bin='+bin,
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}

//查询银行列表信息
export function queryBankList(token) {
  return request({
    url:'/h5/bank/queryBankList',
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}

/*********我的银行卡接口结束***********/


/*********发票管理接口***********/
//添加手动输入发票接口
export function modifyTextInvoice(token,invoice) {
  return request({
    url:'/h5/invoice/modifyTextInvoice',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:invoice
  })
}
//添加发票（含四要素）接口文档
export function addInvoiceFourElements(token,invoice) {
  return request({
    url:'/h5/invoice/addInvoiceFourElements',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:invoice
  })
}
//修改发票（含四要素）接口文档
export function modifyInvoiceFourElements(token,invoice) {
  return request({
    url:'/h5/invoice/modifyInvoiceFourElements',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:invoice
  })
}
//查询发票列表接口文档========老接口
export function queryInvoice(token,invoice,companyId) {
  return request({
    url:'/h5/invoice/queryInvoice?companyId='+companyId,
    method: 'post',
    headers:{
      accessToken:token
    },
    data:invoice
  })
}
//查询发票列表分页接口=======新接口
export function findInvoicePage(token,invoice) {
  return request({
    url:'/h5/invoice/findInvoicePage',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:invoice
  })
}
//通过报销科目code查询发票列表=======新接口
export function queryInvoiceItemList(token,invoice) {
  return request({
    url:'/h5/invoice/queryInvoiceItemList',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:invoice
  })
}
//解析二维码信息接口=======新接口
export function indentifyInvoice(token,code) {
  return request({
    url:'/h5/invoice/indentifyInvoice?code='+code,
    method: 'get',
    headers:{
      accessToken:token
    },
  })
}
//发票OCR识别接口
export function distinguishImage(token,distingInfo) {
  return request({
    url:'/h5/invoice/distinguishImage',
    method: 'post',
    headers: {
      'accessToken': token
    },
    data:distingInfo
  })
}
//成本中心查询关联公司列表=======新接口
export function findAssetConterCompanyList(invoice) {
  return request({
    url:'/h5/assetConter/findAssetConterCompanyList?companyId='+invoice,
    method: 'post',
    data:invoice
  })
}

//成本中心查询关联公司树=======新接口
export function findAssetCenterDtoTree(invoice) {
  return request({
    url:'/h5/assetConter/findAssetCenterDtoTree?companyId='+invoice,
    method: 'post',
    data:invoice
  })
}

//查询所有的城市信息=======新接口
export function findAllCitys(level,areaName) {
  return request({
    url:'/h5/province/findAllCitys?level='+level+'&areaName'+areaName,
    method: 'post',
  })
}


//删除发票接口
export function delReimburse(token,id) {
  return request({
    url:'/h5/invoice/delInvoices',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:id
  })
}

//查询发票类型
export function queryInvoiceType() {
  return request({
    url:'/h5/invoice/queryInvoiceType',
    method: 'post',
  })
}
//查询全部发票类别=======新接口
export function findInvoiceCategoryAll() {
  return request({
    url:'/h5/invoice/findInvoiceCategoryAll',
    method: 'post',
  })
}
//查询全部发票状态=======新接口
export function findInvoiceStatusList() {
  return request({
    url:'/h5/invoice/findInvoiceStatusList',
    method: 'post',
  })
}
//修改发票类行接口=======新接口
export function updateInvoice(token,data) {
  return request({
    url:'/h5/invoice/updateInvoice',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:data
  })
}

/*********发票管理接口结束***********/


/*******************支付密码接口**************************/
//设置支付密码
export function setPayPassword(token,psw) {
  return request({
    url:'/h5/pw/setPayPassword?password='+psw,
    method: 'post',
    headers: {
      'accessToken': token
    },
  })
}



/*******************支付密码接口结束**************************/

/*******************个人中心/应用场景接口**************************/
export function queryMenu(center,token,companyId) {
  return request({
    url:'/h5/menu/queryMenu?companyId='+companyId,
    method: 'post',
    data:center,
    headers: {
      'accessToken': token
    },
  })
}


/*******************个人中心/应用场景接口结束**************************/
//添加电子发票链接(手动输入电子发票链接)
export function addInvoiceUrl(token,addInvoiceData) {
  return request({
    url:'/h5/invoice/addInvoiceUrl',
    method: 'post',
    headers: {
      'accessToken': token
    },
    data:addInvoiceData
  })
}

//添加电子发票
export function addEInvoice(token,addInvoiceInfo) {
  return request({
    url:'/h5/invoice/addEInvoice',
    method: 'post',
    headers: {
      'accessToken': token
    },
    data:addInvoiceInfo
  })
}

//验证url链接是否有效
export function checkAddressUrl(url) {
  return request({
    url:'/h5/invoice/checkAddressUrl?url='+url,
    method:'post',
    //data:url
  })
}


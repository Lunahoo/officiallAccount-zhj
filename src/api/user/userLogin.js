/**
 * Created by DELL on 2018/7/25.
 */
import request from '@/router/axios'
//1、获取个人信息接口
export function queryMemberNew(userId,companyId) {
  return request({
    url:'/h5/member/queryMemberNew?companyId='+companyId,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//2、修改昵称接口
export function modifyNickName(userId,nickname) {
  return request({
    url:'/h5/member/modifyNickName?nickName='+nickname,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//3、获取个人中心接口
export function queryMemberCenter(userId,companyId) {
  return request({
    url:'/h5/account/queryMemberCenter?companyId='+companyId,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//获取我的消费券接口
export function queryMemberCouponList(userId,voucherData) {
  return request({
    url:'/h5/coupon/queryMemberCouponList',
    method: 'post',
    headers: {
      'accessToken': userId
    },
    data:voucherData
  })
}
//查询消费券是否可转让券列表=============新接口
export function findTransferCouponList(userId,voucherData) {
  return request({
    url:'/h5/coupon/findTransferCouponList',
    method: 'post',
    headers: {
      'accessToken': userId
    },
    data:voucherData
  })
}
//定额券列表
export function rechargePage(userId) {
  return request({
    url:'/h5/coupon/rechargePage',
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//定额券详情
export function rechargeDetail(userId,rechargeId) {
  return request({
    url:'/h5/coupon/rechargeDetail?rechargeId='+rechargeId,
    method: 'get',
    headers: {
      'accessToken': userId
    },
  })
}
//批量/单个充值
export function rechargeMemberIdList(userId,couponIds) {
  return request({
    url:'/h5/coupon/rechargeMemberIdList',
    method: 'post',
    headers: {
      'accessToken': userId
    },
     data:couponIds
  })
}
/*//待充值总额度接口
export function rechargeAmount(userId) {
  return request({
    url:'/h5/coupon/rechargeAmount',
    method: 'get',
    headers: {
      'accessToken': userId
    },
  })
}*/
//获取我的消费券查询条件接口（行业信息&类别信息列表）
export function queryParams(userId,vendorId) {
  return request({
    url:'/h5/coupon/queryParams?vendorId='+vendorId,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//获取我的消费券查询行业类别接口（行业信息&类别信息列表）
export function queryCategoryOrIndustry(userId,level,industryId) {
  return request({
    url:'/h5/coupon/queryCategoryOrIndustry?level='+level+'&industryId='+industryId,
    method: 'get',
    headers: {
      'accessToken': userId
    },
  })
}
//获取我的消费券查询条件接口（商户信息列表）
export function queryVendors(userId,data) {
  return request({
    url:'/h5/coupon/queryVendors',
    method: 'post',
    headers: {
      'accessToken': userId
    },
    data:data
  })
}
//类别id集合查询商户接口（商户信息列表）
export function queryVendorsByCategory(userId,data) {
  return request({
    url:'/h5/coupon/queryVendorsByCategory',
    method: 'post',
    headers: {
      'accessToken': userId
    },
    data:data
  })
}
//获取券明细接口
export function queryCouponDetail(userId,couponId,canTransfer) {
  return request({
    url:'/h5/coupon/queryCouponDetail?couponId='+couponId+'&canTransfer='+canTransfer,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//通过商户信息查询所对应的行业列表&类别
export function queryIndustryClass(userId,vendorId) {
  return request({
    url:'/h5/member/queryIndustryClass?vendorId='+vendorId,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//查询报销额度
export function queryReimburseList(userId,companyId) {
  return request({
    url:'/h5/reimburse/queryReimburseList?companyId='+companyId,
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
// 收支明细列表分页接口
export function budgetPage(userId) {
  return request({
    url:'/h5/coupon/budgetPage',
    method: 'post',
    headers: {
      'accessToken': userId
    },
  })
}
//收支明细详情接口
export function budgetDetail(userId,budgetId,tradeCate) {
  return request({
    url:'/h5/coupon/budgetDetail?budgetId='+budgetId+'&tradeCate='+tradeCate,
    method: 'get',
    headers: {
      'accessToken': userId
    },
  })
}

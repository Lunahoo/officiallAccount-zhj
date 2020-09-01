/**
 * Created by DELL on 2019/3/12.
 */
import request from '@/router/axios'
//1、查询用户是否设置了代卖配置
export function isOpenSubstituteSale(accessToken) {
  return request({
    url: '/h5/substituteSale/isOpenSubstituteSale',
    method: 'post',
    headers:{
      accessToken:accessToken
    }
  })
}
//2、查询用户的代卖配置
export function findSubstituteSaleConfigByMemberId(accessToken) {
  return request({
    url: '/h5/substituteSale/findSubstituteSaleConfigByMemberId',
    method: 'post',
    headers:{
      accessToken:accessToken
    }
  })
}
//3、新增代卖配置
export function addSubstitute(accessToken,data) {
  return request({
    url: '/h5/substituteSale/addSubstitute',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
    data:data
  })
}
//4、修改设置月代卖额度
export function updateSubstitute(accessToken,data) {
  return request({
    url: '/h5/substituteSale/updateSubstitute',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
    data:data
  })
}
//5、查询最大可设置额度
export function findMaxSaleAmountMonth(accessToken) {
  return request({
    url: '/h5/substituteSale/findMaxSaleAmountMonth',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
//6、手动触发代卖
export function updateIsManual(accessToken,id) {
  return request({
    url: '/h5/substituteSale/updateIsManual?id='+id,
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
//查询代卖订单列表
export function findSubstituteSaleOrder(accessToken) {
  return request({
    url: '/h5/substituteSale/findSubstituteSaleOrder',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
//查询代卖订单详情
export function findSubstituteSaleOrderDetail(accessToken,orderId) {
  return request({
    url: '/h5/substituteSale/findSubstituteSaleOrderDetail?orderId='+orderId,
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
//查询提现记录列表
export function findWithdrawRerecord(accessToken) {
  return request({
    url: '/h5/substituteSale/findWithdrawRerecord',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
//查询提现记录详情
export function findWithdrawInfo(accessToken,orderId) {
  return request({
    url: '/h5/substituteSale/findWithdrawInfo?orderId='+orderId,
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
/*开启或关闭自动代卖*/
export function openOrCloseSubstituteSale(accessToken,id,status) {
  return request({
    url: '/h5/substituteSale/openOrCloseSubstituteSale?id='+id+'&status='+status,
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
/* 查询账号的提现银行卡数据*/
export function findWithdrawBankCardList(accessToken) {
  return request({
    url: '/h5/substituteSale/findWithdrawBankCardList',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
/*修改提现银行卡顺序*/
export function updateWithdrawBankCardOrder(accessToken,list) {
  return request({
    url: '/h5/substituteSale/updateWithdrawBankCardOrder',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
    data:list
  })
}
/*查询代卖中金额，已代卖金额，可代卖额度*/
export function findSubstituteSaleAmount(accessToken) {
  return request({
    url: '/h5/substituteSale/findSubstituteSaleAmount',
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}
//查询用户当日是否可手动发起代卖
export function checkedIsManual(accessToken,id) {
  return request({
    url: '/h5/substituteSale/checkedIsManual?id='+id,
    method: 'post',
    headers:{
      accessToken:accessToken
    },
  })
}

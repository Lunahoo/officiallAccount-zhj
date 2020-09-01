/**
 * Created by DELL on 2019/3/27.
 */
import request from '@/router/axios'

//查询用户邀请成功注册人数、返现金额、排名(占人员排名比率)
export function queryRecommendSucceedInfo(token) {
  return request({
    url:'/h5/member/queryRecommendSucceedInfo',
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}
//查询虚拟用户邀请成功人姓名、时间、返现金 ...
export function queryRecommendFictitiousInfo(token,code) {
  return request({
    url:'/h5/member/queryRecommendFictitiousInfo?code='+code,
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}
//获取推荐码接口
export function queryRecommendCode(token) {
  return request({
    url:'/h5/member/queryRecommendCode',
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}

//新增返现订单
export function addReturnMoneyBill(token,orderAmount) {
  return request({
    url:'/h5/bill/addReturnMoneyBill?orderAmount='+orderAmount,
    method: 'post',
    headers:{
      accessToken:token
    },
  })
}

//查询订单接口 == 查询账单列表接口 和王清的那个接口一样，加了返现
export function queryBillList(token,data) {
  return request({
    url:'/h5/bill/queryBillList',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:data
  })
}


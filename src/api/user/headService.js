/**
 * Created by DELL on 2018/8/30.
 */
import request from '@/router/axios'
//获取总部场景url
export function getJiaFuUrl(accessToken,service,companyId,returlUrl,data) {
  return request({
    url: '/h5/biz/getJiaFuUrl?service='+service+"&companyId="+companyId+"&returlUrl="+returlUrl+"&data="+data,
    method: 'get',
    headers: {
      'accessToken': accessToken
    },
  })
}
//首页嵌入的总部商城url
export function getIndexMall(accessToken) {
  return request({
    url: '/h5/mall/getIndexMall',
    method: 'post',
    headers: {
      'accessToken': accessToken
    },
  })
}
//查询微信绑定接口文档
export function queryWeChatBind(openId) {
  return request({
    url: '/h5/bind/queryWeChatBind?openId='+openId,
    method: 'post',
  })
}

//获取收银台地址
export function generateRequestUrl(token,parameter) {
  return request({
    url:'/h5/cash/generateRequestUrl',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}

//微信充值调总部接口
export function generateRechargeRequestUrl(token,parameter) {
  return request({
    url:'/h5/cash/generateRechargeRequestUrl',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}

//h5提现接口
export function generateWithdrawUrl(token,parameter) {
  return request({
    url:'/h5/cash/generateWithdrawUrl',
    method: 'post',
    headers:{
      accessToken:token
    },
    data:parameter
  })
}

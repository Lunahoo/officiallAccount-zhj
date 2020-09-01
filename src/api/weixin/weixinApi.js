/**
 * Created by DELL on 2018/9/29.
 */
import request from '@/router/axios'
//授权接口
export function wechAt(flag,page,redirect_uri) {
  return request({
    url:'/wx/rest/wx/v1/redirect?flag='+flag+'&page='+page+'&redirect_uri='+redirect_uri,
    method: 'get',
    contentType: 'text/html',
   /* dataType: 'jsonp',
    crossDomain: true,*/
  })
}
//微信前端验签接口
export function findVueTokenVo(Pageurl) {
  return request({
    url:'/wx/rest/wx/v1/findVueTokenVo?url='+Pageurl,
    method: 'get',
    contentType:"application/json"
  })
}
//查询微信用户详情信息接口
export function findWxUserInfo(openId) {
  return request({
    url:'/wx/rest/wx/v1/findWxUserInfo?openId='+openId,
    method: 'get',
    contentType:"application/json"
  })
}
//查询微信绑定接口文档
export function queryWeChatIsUnBind(accessToken,openId) {
  return request({
    url:'/h5/bind/queryWeChatIsUnBind?openId='+openId,
    method: 'post',
    headers: {
      'accessToken': accessToken
    },
  })
}
//微信解绑接口文档
export function unBindWeChat(accessToken,openId) {
  return request({
    url:'/h5/bind/unBindWeChat?openId='+openId,
    method: 'post',
    headers: {
      'accessToken': accessToken
    },
  })
}

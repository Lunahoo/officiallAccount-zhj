/**
 * Created by DELL on 2018/11/26.
 */
import request from '@/router/axios'
//1、查询首页短消息通知接口
export function geteasyUrl(url,userId,mobileNum,guid,geid,openid,sign) {
  return request({
    url:url+'/wisdomJ/login?userId='+userId+'&mobileNum='+mobileNum+'&guid='+guid+'&geid='+geid+'&openid='+openid+'&sign='+sign,
    method: 'post',
  })
}

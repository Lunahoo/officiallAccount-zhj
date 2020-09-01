/**
 * Created by DELL on 2018/7/26.
 */
import request from '@/router/axios'
//1、查询首页短消息通知接口
export function newsToken(accessToken,mId) {
  return request({
    url:'/h5/notice/queryFirstNotice?acct='+accessToken+'&mId='+mId,
    method: 'post'
  })
}
//2、查询消息中心列表接口
export function newsCore(accessCore,mId) {
  return request({
    url:'/h5/notice/queryMsgList?accessCore='+accessCore+'&mId='+mId,
    method: 'post'
  })
}
//3、查询删除短消息接口
export function newsDelete(accessDetele,messageId) {
  return request({
    url:'/h5/notice/deleteMessage?messageId='+messageId,
    headers: {
      'accessDetele': accessDetele,
    },
    method: 'post'
  })
}
//文件上传
export function upLlad(accessToken,fileData) {
  return request({
    url:'/h5/file/upload',
    processData: false,
    contentType: false,
    dataType: 'json',
    /*transformRequest:[function (fileData) {
      let ret='';
      for (let it in fileData){
        ret + encodeURIComponent(it) + '=' + encodeURIComponent(fileData[it]) + '&'
      }
      return ret;
    }],*/
    headers: {
      'accessToken': accessToken,
      'Content-Type':"multipart/form-data"
    },
    cache: false,
    method: 'post',
    data: fileData
    /* enctype:"multipart/form-data"*/
  })
}
//文件上传
export function uploadInvoice(accessToken,fileData) {
  return request({
    url:'/h5/file/uploadInvoice',
    processData: false,
    contentType: false,
    dataType: 'json',
    /*transformRequest:[function (fileData) {
     let ret='';
     for (let it in fileData){
     ret + encodeURIComponent(it) + '=' + encodeURIComponent(fileData[it]) + '&'
     }
     return ret;
     }],*/
    headers: {
      'accessToken': accessToken,
      'Content-Type':"multipart/form-data"
    },
    cache: false,
    method: 'post',
    data: fileData
    /* enctype:"multipart/form-data"*/
  })
}
//修改头像
export function upHeader(accessToken,headUrl) {
  return request({
    url:'/h5/member/modifyHeadUrl?headUrl='+headUrl,
    headers:{
      'accessToken':accessToken
    },
    method:'post'
  })
}
//修改企业信息
export function selectCompanyShow(accessToken,companyId) {
  return request({
    url:'/h5/member/selectCompanyShow?companyId='+companyId,
    headers:{
      'accessToken':accessToken
    },
    method:'post'
  })
}

//查询发票详情接口
export function queryInvoiceDetail(accessToken,invoiceId) {
  return request({
    url:'/h5/invoice/queryInvoiceDetail?invoiceId='+invoiceId,
    headers:{
      'accessToken':accessToken
    },
    method:'post'
  })
}
//添加意见反馈信息接口
export function addFeedback(token,picListFeed) {
  return request({
    url:'/h5/member/addFeedback',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:picListFeed
  })
}

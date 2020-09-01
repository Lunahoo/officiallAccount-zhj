/**
 * Created by DELL on 2018/8/2.
 */
import request from '@/router/axios'
//退出登录
export function signOut(token) {
  return request({
    url:'/h5/member/loginOut',
    method: 'post',
    headers:{
      accessToken:token
    }
  })
}
//查询删除短消息接口
export function deteleNew(token,messageId) {
  return request({
    url:'/h5/notice/deleteMessage?messageId='+messageId,
    method: 'post',
    headers:{
      accessToken:token,
    }
  })
}
//查询修改消息中心推送开关接口
export function swItch(token,messageId) {
  return request({
    url:'/h5/notice/updateMessage?messageId='+messageId,
    method: 'post',
    headers:{
      accessToken:token,
    }
  })
}

//PDF转图片上传
export function pdf2ImageUpload(token,url) {
  return request({
    url:'/h5/file/pdf2ImageUpload?url='+url,
    method: 'post',
    headers:{
      accessToken:token,
    },
  })
}

//添加电子发票接口
export function addETMask1(token,pic) {
  return request({
    url:'/h5/invoice/addEInvoice',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:pic
  })
}
//添加发票报销单接口
export function addReimbursement(token,listC) {
  return request({
    url:'/h5/reimburse/addReimburse',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:listC
  })
}
//重新发起发票报销单接口
export function reAddReimburse(token,listC) {
  return request({
    url:'/h5/reimburse/reAddReimburse',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:listC
  })
}
//查询发票报销单列表接口
export function nvoicesIList(token,listC,companyId) {
  return request({
    url:'/h5/reimburse/queryReimburse?companyId='+companyId,
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:listC
  })
}
//查询发票报销单详情接口====================新老接口共同的
export function queryReimburseDetail(token,reimburseId) {
  return request({
    url:'/h5/reimburse/queryReimburseDetail?reimburseId='+reimburseId,
    method: 'post',
    headers:{
      accessToken:token,
    }
  })
}
//发票id查询报销单信息=======新接口
export function findReimburseView(token,id) {
  return request({
    url:'/h5/reimburse/findReimburseView?id='+id,
    method: 'get',
    headers:{
      accessToken:token
    },
  })
}
//发票报销单删除接口====================新老接口共同的
export function delList(token,reimburseId) {
  return request({
    url:'/h5/reimburse/delReimburse?reimburseId='+reimburseId,
    method: 'post',
    headers:{
      accessToken:token,
    },
  })
}
//撤回报销单撤回接口====================新老接口共同的
export function revokeReimburse(token,reimburseId) {
  return request({
    url:'/h5/reimburse/revokeReimburse?reimburseId='+reimburseId,
    method: 'post',
    headers:{
      accessToken:token,
    },
  })
}


//修改电子发票接口
export function EditElectronicInvoice(token,listC) {
  return request({
    url:'/h5/invoice/modifyEInvoice',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:listC
  })
}
//查询报销科目分页列表（含主科目和子科目）
export function queryReimburseItemPage(token,information) {
  return request({
    url:'/h5/reimburse/queryReimburseItemPage',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:information
  })
}
//切换企业获取报销科目和报销金额
export function queryReimburseInfoAll(token,companyId) {
  return request({
    url:'/h5/reimburse/queryReimburseInfoAll?companyId='+companyId,
    method: 'post',
    headers:{
      accessToken:token,
    },
    //data:information
  })
}
//添加发票报销
export function addReimburse(token,ReimbursementDetail) {
  return request({
    url:'/h5/reimburse/addReimburse',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:ReimbursementDetail
  })
}
//添加发票接口(飞机票火车票专票普票等)
export function addEInvoice(token,addEInvoiceInfo) {
  return request({
    url:'/h5/invoice/addEInvoice',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:addEInvoiceInfo
  })
}


/*=========================简易报销新接口模块==================================*/
//填写报销单接口（通过所选发票列表&主课目获取报销明细列表）
export function initAddReimburse(token,data) {
  return request({
    url:'/h5/reimburse/initAddReimburse',
    method: 'post',
    headers:{
      accessToken:token,
    },
    data:data
  })
}

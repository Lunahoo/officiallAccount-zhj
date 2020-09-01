/**
 * Created by DELL on 2019/1/10.
 */

// function publiceJY(jyArr){   //name,verb,num,tipV,tipContent
//   if(jyArr.verb == ""){
//     jyArr.tipV="tel-message";
//     jyArr.tipContent = jyArr.name + "不能为空";
//   }else if(jyArr.verb.length != num){
//     jyArr.tipV="tel-message";
//     jyArr.tipContent = jyArr.name + "输入有误";
//   }
//   return{
//     name:jyArr.name,
//     verb:jyArr.verb,
//     num:jyArr.num,
//     tipV:jyArr.tipV,
//     tipContent:jyArr.tipContent
//   }
// }

//ocr金额去除￥、元
function moneyRemoveY(money,dataMoney){
  let saveDataMoney = dataMoney;
  let saveMoneyJY = RegExp(/[(\￥)]+/);
  let savePageMoney = dataMoney;
  if(saveDataMoney.indexOf('元')<0&&saveDataMoney.indexOf('￥')<0){
    money = saveDataMoney;
  }else{
    if(saveMoneyJY.test(saveDataMoney)){  //判断有没有￥符号
      savePageMoney = dataMoney.substr(1,saveDataMoney.length);
    }
    if(savePageMoney.indexOf('元')>0){
      money = savePageMoney.substr(0,savePageMoney.length-1);
    }
  }
  return money;
}

//开票日期校验：只能报销一年内的发票
function openDatasJY(openDataArr) {   //openDate开票日期 flag  tips提示框  tipsContent提示语句
  //开票日期只能是当前日期之前的发票
  let nowData = new Date();
  let year = nowData.getFullYear();
  let month = nowData.getMonth()+1;
  if(month<10){
    month = "0"+month.toString();
  }
  let dates = nowData.getDate();
  if(dates<10){
    dates = "0"+dates.toString();
  }
  let today = year +""+month + dates;
  let chooseInput = openDataArr.openDate.split("-");
  if(chooseInput[1]<10 && chooseInput[1].length==1){
    chooseInput[1] = "0"+chooseInput[1];
  }
  if(chooseInput[2]<10 && chooseInput[2].length==1){
    chooseInput[2] = "0"+chooseInput[2];
  }
  let chooseI = chooseInput[0] + chooseInput[1] + chooseInput[2];
  if(openDataArr.openDate!=""){
    if(Number(chooseI) >= Number(today)){
      openDataArr.tips = "tel-message";
      openDataArr.tipsContent = "不能查验当日及以后日期发票";
      openDataArr.flag = false;
    }else if(Number(today) - Number(chooseI) > 10001){    //只能报销一年内的发票
      openDataArr.tips = "tel-message";
      openDataArr.tipsContent = "只能报销一年内的发票";
      openDataArr.flag = false;
    }else{
      openDataArr.flag = true;
    }
  }else{
    openDataArr.tips="tel-message";
    openDataArr.tipsContent = "请输入开票日期";
  }
  return{
    openDate:openDataArr.openDate,    //开票日期
    flag:openDataArr.flag,     //flag
    tips:openDataArr.tips,     //提示框
    tipsContent:openDataArr.tipsContent,    //提示语句
  }
}

export default {moneyRemoveY,openDatasJY};

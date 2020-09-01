//密码格式验证
function PwdFormat(pwd) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  if (pwd != "" && pwd != null && pwd != undefined) {
    if (!regex.test(pwd)) {
      return false;
    } else {
      return true;
    }
  }
}
//身份证格式验证
function idCardFormat(idCard) {
  var regex = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
  if (idCard != "" && idCard != null && idCard != undefined) {
    if (!regex.test(idCard)) {
      return false;
    } else {
      return true;
    }
  }
}

//手机号格式验证
function PhoneFormat(tel) {
  var regex = /^0?(1[3-9])[0-9]{9}$/;
  if(tel!='' && tel!=null && tel!=undefined){
    if(tel.length == 13 || tel.length==11) {
      let telValue = tel.replace(/[" "]/g, "")
      if (!regex.test(telValue)) {
        return false;
      }else{
        return true
        document.getElementsByClassName("login-btn")[0].style.cssText="opacity:1!important";
      }
      return true;
    }else{
      return false;
    }
  }
}
//银行卡验证
function bankFormat(bank){
  var regex = /^([1-9]{1})(\d{7,18})$/;        ///^([1-9]{1})(\d{14}|\d{18})$/
  if(bank!='' && bank!=null &&bank!=undefined){
    let bankValue = bank.replace(/[" "]/g, "");
    if(!regex.test(bankValue)){
      return false
    }else {
      return true
    }
  }
}
//禁止输入特殊字符（包含小数点）
function character(value) {
  if(value!=undefined){
    value=value.replace(/([a-z]|[A-Z]|[`~·!！\-@#$￥%^&*……()（）——=.。；;":‘’_+|、\\<>{}\/'[\]])/g,'');
  }
  return value
}
/*-------------------判断字符串长度-------------------*/
function isLongth(str){
  let pattern_char1 = /[a-zA-Z]/g;
  let pattern_chin1 = /[\u4e00-\u9fa5]/g;
  let pattern_num1 = /[0-9]/g;
  let count_char1 = 0;
  let count_chin1 = 0;
  let count_num1 = 0;
  if(str.match(pattern_char1)!=null){
    count_char1 = str.match(pattern_char1).length;
  }if(str.match(pattern_chin1)!=null){
    count_chin1 = str.match(pattern_chin1).length;
  }if(str.match(pattern_num1)!=null){
    count_num1 = str.match(pattern_num1).length;
  }
  if((count_num1+count_char1 + 2 * (count_chin1)) > 32){
    return false;
  }
}
export default {PwdFormat,idCardFormat,PhoneFormat,bankFormat,isLongth,character};

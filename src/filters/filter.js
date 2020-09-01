import Vue from 'vue'
//保留两位小数用 money
Vue.filter('money', function(val) {
  if(val != null && val != "" && val != undefined && val!=0){
    val = val/1000
    val = val.toString().replace(/\$|\,/g,'');
    if(isNaN(val)) {
      val = "0";
    }
    let sign = (val == (val = Math.abs(val)));
    val = Number(val).toFixed(2);
    /*val = Math.floor(val*100);*/
    /* let cents = val%100;
     val = Math.floor(val/100).toString();
     if(cents<10) {
     cents = "0" + cents
     }
     for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
     val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
     }*/

    return (((sign)?'':'-') + val );
  }else if(val == 0){
    return '0.00';
  }else{
    return '0.00';
  }

});
Vue.filter('moneyFormat', function(val) {
  if(val != null && val != "" && val != undefined && val!=0){
    val = val/1000;
    val = val.toString().replace(/\$|\,/g,'');
    if(isNaN(val)) {
      val = "0";
    }
    let sign = (val == (val = Math.abs(val)));
    val = Number(val).toFixed(2);
    let cents = val%100;
     if(cents<10) {
       cents = "0" + cents;
     }
     let falg = true;
      let decimal = 0
     if(val.indexOf('.')>0){
       falg = false;
       decimal = val.substr(val.indexOf('.'),val.length);
       val = val.substr(0,val.indexOf('.'));
     }
     for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
     val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
     }
    if(!falg){
      if(decimal.length>=3){
        return (((sign)?'':'-') + val + decimal);
      }else if(decimal.length == 2){
        return (((sign)?'':'-') + val + decimal + '0');
      }
    }else{
      return (((sign)?'':'-') + val + '.00');
    }

  }else if(val == 0){
    return '0.00';
  }else{
    return '0.00';
  }

});
//手机号格式验证
Vue.filter('telVer', function(telver) {
  let regex = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
  if(telver!=null && telver!="" &&telver!=undefined){
    if (!regex.test(telver)){
      alert("手机号格式错误");
      return false;
    }else{
      for(let i=0;i<telver.length;i++){
        if (i === 3 || i === 8) {
          telver += ' ';
          return telver;
        }
      }
    }
  }else{
    alert("请输入手机号");
  }
});
//银行卡号format
Vue.filter('bankNumberFormat', function(bankNumber) {
  if(bankNumber!=null && bankNumber!=''){
    bankNumber = '*'+bankNumber.substr(bankNumber.length-4,bankNumber.length);
    return bankNumber;
  }else{
    return '';
  }
});
//title字数控制
Vue.filter('strTitleSub', function(title) {
  if(title!=undefined && title!=''){
    if(title.length>8){
      let str = title.substring(0,5);
      return (str+'...');
    }else{
      return title
    }
  }

});
//商户省份字数控制
Vue.filter('strSub', function(title) {
  if(title!=undefined && title!=''){
    if(title.length>14){
      let str = title.substring(0,11);
      return (str+'...');
    }else{
      return title
    }
  }
});
//加密显示手机号
Vue.filter('encrypt', function(tel) {
  if(tel!=undefined && tel!=''){
    let encryptTel = tel.substring(0,3)+'******'+tel.substring(tel.length-2,tel.length);
    return encryptTel
  }
});
//截取事由
Vue.filter('subStrSy', function(str,cFormat) {
  if(str!=undefined && str!=''){
    if(str.length>50){
    let strSy = str.substring(0,50);
    return (strSy+'...');
   }else{
      return str;
    }
  }
});
//格式化事件
Vue.filter('parseTime', function(time,cFormat) {
  if(time!=undefined && time!=null){
    /*time = new Date(new Date(time)+8*3600*1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');*/
    time = time.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
    if (time.indexOf(".")>0)time = time.slice(0, time.indexOf("."));
    time = Date.parse(new Date(time));
    if (arguments.length === 0) {
      return null
    }

    if ((time + '').length === 10) {
      time = +time * 1000
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date;
    if (typeof time === 'object') {
      date = time
    } else {
      date = new Date(parseInt(time))
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }
});
//截取昵称八位汉字加三个...
Vue.filter('strNickName', function(nickName) {
  if(nickName!=undefined && nickName!='' && nickName!=null){
    let pattern_char1 = /[a-zA-Z]/g;
    let pattern_chin1 = /[\u4e00-\u9fa5]/g;
    let pattern_num1 = /[0-9]/g;
    let count_char1 = 0;
    let count_chin1 = 0;
    let count_num1 = 0;
    let flag = true;
    let allHZ = true;
    if(nickName.match(pattern_char1)!=null){
      count_char1 = nickName.match(pattern_char1).length;
      allHZ = false
    }if(nickName.match(pattern_chin1)!=null){
      count_chin1 = nickName.match(pattern_chin1).length;
      flag = false;
    }if(nickName.match(pattern_num1)!=null){
      count_num1 = nickName.match(pattern_num1).length;
      allHZ = false
    }
    if(flag){
      if(nickName.length>16){
        nickName = nickName.substring(0,16)+'...';
        return nickName;
      }else{
        return nickName;
      }
    }else{
      if((count_char1+count_chin1*2+count_num1)<=16){
        return nickName
      }else{
        if(allHZ){
          nickName = nickName.substring(0,8)+'...';
          return nickName;
        }else{
          nickName = nickName.substring(0,10)+'...';
          return nickName;
        }
      }
    }
  }else{
    return
  }

});
//加密身份证号
Vue.filter('encryptionId', function(idNumber) {
  if(idNumber!=undefined && idNumber!='' && idNumber!=null){
    //5****************4
    let first = idNumber[0];
    let end = idNumber[idNumber.length-1];
    return first+'****************'+end
  }
});
//加密用户昵称
Vue.filter('encryptNickName', function(nickName) {
  if(nickName!='' && nickName!=null && nickName!=undefined){
    let first = nickName.substr(0,1);
    return first+'**';
  }else{
    return;
  }
});

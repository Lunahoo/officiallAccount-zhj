let telVer = function (telver) {
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
}

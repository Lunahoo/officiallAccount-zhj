/*function getStyle(obj,name){
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  }else{
    return getComputedStyle(obj,false)[name];
  }
}*/

  //发送图形验证码
  function sendfigCapt(value){
    //验证手机号是否已注册
    axios.post('/user', {
      tel: value,
    })
      .then(function (response) {//成功
        this.$router.push({path:"/captcha"});
      })
      .catch(function (response) {//失败
        return false;
      });
  };
  //登录操作
  function loginTel(value){
    axios.post('/user', {
      tel: value,
    })
      .then(function (response) {
        //验证手机号是否已注册
        if(true){
          if(true){
            //新设备登录
            this.$router.push({path:"/newPwd"});
          }else{
            this.$router.push({path:"/password"});
          }
        }else{
          //未注册账户到图形验证码页面进行注册操作
          this.$router.push({path:"/captcha"});
        }
      })
      .catch(function (response) {//失败
        return false;
      });

  };

  export {sendfigCapt,loginTel}

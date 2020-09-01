/**
 * Created by DELL on 2018/11/23.
 */


/*验证码倒计时定时器*/
function timeCountdown(obj){ //obj包括timer、waitTime、canGet
  obj.timer = setInterval(() => {
    if (obj.waitTime == 1) {
      if(obj.tipsContent!=""&&obj.tipsContent!=null&&obj.tipsContent!=undefined){
        obj.tipsContent = "重新获取";
        obj.getYZMC = "font-EB";
      }
      obj.canGet = true;
      obj.waitTime = 59;
      clearInterval(obj.timer);
      obj.timer = null;
    } else {
      obj.waitTime--;
    }
    return {
      canGet:obj.canGet,
      tipsContent:obj.tipsContent,
      getYZMC:obj.getYZMC,
      timer: obj.timer,
      waitTime: obj.waitTime
    }
  },1000)

}


/*手机号自动添加空格*/
function telSpace(newV,oldV,tel){
        if(tel.length>0){
          //     this.$refs.loginBtn.style.opacity = 1
          tel=tel.replace(/([a-z]|[A-Z]|[`~·!！\-@#$￥%^&*……()（）——=.。；;":‘’_+|、\\<>{}\/'[\]])/g,'');
          let regex = /^0?(1[3-9])[0-9]{9}$/;
          if(newV!=null && newV!= "" && newV!=undefined){
            //console.log(newV)
            if (newV.length > oldV.length) { // 文本框中输入
              if(newV.indexOf(' ')<0){
                for(let i=0;i<newV.length;i++){
                  if (i === 2 || i === 7) {
                    if(i+1 <= newV.length){
                      newV = newV.substr(0,i+1)+' '+newV.substr(i+1,newV.length);
                    }else{
                      newV = newV.substr(0,i+1)+' '
                    }

                  }
                }
                if(newV.length>=13){
                  tel = newV.substr(0,13)
                }else{
                  tel = newV
                }
              }else{
                // if(newV.length != 4 && newV.length != 9){ //禁止四、九位数之外的数字输入空格
                //   let reg = /\S+/g;
                //   if(!reg.test(newV)){
                //     tel = oldV;
                //   }
                // }else{
                  if (newV.length === 8) {/*newV.length === 3 || */
                    tel += ' ';
                  }else if (newV.length === 9 || newV.length === 4) {
                    if(newV.indexOf(' ')<0){
                      var tmp=newV.substring(0, newV.length-1)+' '+newV.substring(newV.length-1, newV.length);
                      tel=tmp;
                    }else if(newV.length === 9&&newV.lastIndexOf(" ")===3){
                      var tmp=newV.substring(0, newV.length-1)+' '+newV.substring(newV.length-1, newV.length);
                      tel=tmp;
                    }
                  }
               // }
              }
            } else { // 文本框中删除
              if(tel.length!=8 && tel.length!=3){
                let newStr = newV.replace(/[" "]/g, "");
                let oldStr = oldV.replace(/[" "]/g, "");
                if(newStr == oldStr){
                  tel = oldV
                }else{
                  tel = newV
                }
              }else if (newV.length === 9 || newV.length === 4) {
                tel = tel.trim()
                return false
              }
            }
            return tel;
          }

        }

}

/*银行卡号自动添加空格*/
function bankcardSpace(newV,oldV,bankC){
  //禁止银行卡输入字符标点符号类的,此处的length是包含空格的length
  bankC=bankC.replace(/([a-z]|[A-Z]|[`~·!！\-@#$￥%^&*……()（）——=.。；;":‘’_+|、\\<>{}\/'[\]])/g,'');
    if (newV.length > oldV.length) { // 文本框中输入
      if(newV.indexOf(' ')<0){
        for(let i=0;i<newV.length;i++){
          if (i === 3 || i === 8 || i === 13 || i === 18) {
            if(i+1 <= newV.length){
              newV = newV.substr(0,i+1)+' '+newV.substr(i+1,newV.length);
            }else{
              newV = newV.substr(0,i+1)+' '
            }
          }
        }
        if(newV.length>=23){
          bankC = newV.substr(0,23)
        }else{
          bankC = newV
        }
      }else{
        if (newV.length === 4 || newV.length === 9 || newV.length === 14 || newV.length === 19) {
          bankC += ' ';
        } else if (newV.length === 5 || newV.length === 10 || newV.length === 15 || newV.length === 20) {
          if (newV.indexOf(' ') < 0) {
            let tmp = newV.substring(0, newV.length - 1) + ' ' + newV.substring(newV.length - 1, newV.length);
            bankC = tmp;
          } else if (newV.length === 15 && newV.lastIndexOf(" ") === 9) {  //当输入到15位并补充了一个空格，空格从后往前数的下标是9的时候，回删一个空格，再次输入再补充一个空格
            let tmp = newV.substring(0, newV.length - 1) + ' ' + newV.substring(newV.length - 1, newV.length);
            bankC = tmp;
          } else if (newV.length === 20 && newV.lastIndexOf(" ") === 14) {
            let tmp = newV.substring(0, newV.length - 1) + ' ' + newV.substring(newV.length - 1, newV.length);
            bankC = tmp;
          }
        }
      }
    } else { // 文本框中删除
      if(bankC.length!=4 && bankC.length!=9 && bankC.length!=14 && bankC.length!=19){
        let newStr = newV.replace(/[" "]/g, "");
        let oldStr = oldV.replace(/[" "]/g, "");
        if(newStr == oldStr){
          bankC = oldV;
        }else{
          bankC = newV;
        }
      }if (newV.length === 5 || newV.length === 10 || newV.length === 15 || newV.length === 20) {
        bankC = bankC.trim();
      }
    }
    return bankC;
}



export default {telSpace,bankcardSpace,timeCountdown};

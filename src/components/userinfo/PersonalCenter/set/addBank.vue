<template>
    <div class="addBank width">
      <div class="addBank-conter">
        <div class="addBank-title cont">
          <p class="addBank-top">银行卡验证身份</p>
          <p v-if="errorCond" class="addBank-small font-167 font-ipt">请填写兴业银行信用卡 <span class="font-133"> 5613 </span> 的卡号信息</p>
          <p v-else class="adderror font-22d font-167">{{errorT}}</p><!--animated shake-->
        </div>
        <div class="addBank-main bd-btm">
          <label class="addBank-yh font-133">银行卡</label>
          <input v-focus class="addBankWidth" @blur="" type="text" autofocus="autofocus" placeholder="请输入19位银行卡号" v-model="bankCard" maxlength="23"/>
          <div class="srtdelete fr" v-show="bankCard" @click="Empty">
            <img src="../../../../assets/img/clean.png"/>
          </div>
        </div>
        <div class="addBank-btn font-col-b font-s15 cont bt-color" ref="addOpacity">
          <p class="" @click="addBankNext">下一步</p>
        </div>
      </div>
      <router-link to="/paymentReset"><div class="font-108 bd-btm font-fa cont"><div class="addBank-font"></div>其他方式重置密码</div></router-link>
    </div>
</template>
<script>
  import ElInput from "../../../../../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {ElInput},
    name: 'modifypsd',
    data() {
      return {
        bankCard:'',
        errorT:'',
        errorCond:true
      }
    },
    created(){
      this.$root.$data.vBack=true;
    },
  directives: {//自定义指令
    focus: {
      inserted: function (el) {
        el.focus();
        document.getElementsByClassName("addBank-btn")[0].style.cssText="opacity:.3!important";//进入页面颜色0.7
      }
    }
  },
    methods:{
      Empty(){
          this.bankCard='',
          this.errorCond=true;
      },
      addBankNext () {
          if(this.bankCard == "" || this.bankCard == null || this.bankCard ==undefined){
            this.errorCond=false;
            this.errorT = "请输入银行卡号";
          }else {
            if(this.$format.bankFormat(this.bankCard) == false){
              this.$refs.addOpacity.style.cssText="opacity:.3!important";
              this.errorCond=false;
              this.errorT = "银行卡号格式有误";
            }else{
                //调用验证银行卡号接口
              this.$router.push({
                name: 'home',
              });
            }
          }
      }
    },
    watch: {
      bankCard(newValue, oldValue){
        if(this.bankCard!=null && this.bankCard!= "" && this.bankCard!=undefined){
          this.bankCard = this.$spaceOther.bankcardSpace(newValue,oldValue,this.bankCard);
        }
        if(newValue.length>=16){
          this.$refs.addOpacity.style.cssText="opacity:1!important";//银行卡位数够16位颜色为 1
        }else {
          this.$refs.addOpacity.style.cssText="opacity:.3!important";
        }
      },

    }

  }
</script>
<style>
  .addBank .addBank-conter{
    margin: 0 1.083333rem;
    padding-top: 3.6666666rem;
  }
  .addBank .addBank-conter .addBank-title{
    padding-bottom: 5rem;
  }
  .addBank .addBank-conter .addBank-top{
    font-size: 2.41666666rem;
  }
  /*input*/
  .addBank .addBank-main{
    padding-bottom: 0.66666rem;
  }
  .addBank .addBank-main .addBank-yh{
    padding-right: 2.416666rem;
  }
  .addBank .addBank-btn{
    line-height: 3.83333rem;
    margin: 3.333333rem 0 7.416666667rem;
    border-radius: 0.4rem;
  }
  .addBank-font{
    padding-top: 0.91666666rem;
  }
  .addBankWidth{
    width: 65%;
  }
  /*错误提示*/
  .addBank-title .adderror{
    padding-top: 0.2rem;
  }
  .addBank .addBank-main .srtdelete{
    width: 1.083333rem;
    padding-top: 0.5rem;
  }
</style>

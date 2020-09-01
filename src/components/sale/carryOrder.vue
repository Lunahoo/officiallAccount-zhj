<template>
    <div class="carryOrder width height bg-f6">
      <div class="carryOrder_addBtn bg-ff cont width fl" @click="toTiedCardPage">
        <img class="carryOrder_addimg pst-abs" src="../../assets/img/sale/icon_zs_copy@2x.png"/>
        <p class="font-F89 font-133" style="line-height: 3.833333rem;margin-left: 11%;">添加银行卡</p>
      </div>
      <div class="bg-f6 width fl">
        <p class="carryOrder_tips mG-lft183 font-108 font-a39">系统将根据下面排列顺序体现，拖动进行调序</p>
      </div>
      <div class="width fl overflow-s" v-if="showBankList" style="height:81%;">
        <div class="color-list bg-ff">
          <div class="color-item carryOrder_card mG-lft183 font-125 bd-btm" v-if="index!=bankCardList.length-1" v-for="(item,index) in bankCardList" v-dragging="{ item: item, list: bankCardList, group: 'color' }" :key="index">
            <div class="carryOrder_card_info fl cont">
              <span>{{item.bankName}}</span>
              <span class="font-a39">({{item.bankNumber | bankNumberFormat}})</span>
            </div>
            <div class="carryOrder_card_img fr font-a39">
              <img src="../../assets/img/sale/icon_reordering@2x.png">
            </div>
          </div>
          <div class="color-item carryOrder_card mG-lft183 font-125" v-if="index==bankCardList.length-1" v-for="(item,index) in bankCardList" v-dragging="{ item: item, list: bankCardList, group: 'color' }" :key="index">
            <div class="carryOrder_card_info fl cont">
              <span>{{item.bankName}}</span>
              <span class="font-a39">({{item.bankNumber | bankNumberFormat}})</span>
            </div>
            <div class="carryOrder_card_img fr font-a39">
              <img src="../../assets/img/sale/icon_reordering@2x.png">
            </div>
          </div>
        </div>
      </div>
      <div class="carryOrder_addBtn btm-0 bg-ff cont pst-abs width" @click="goBackquotaManaPage">
        <p class="font-3b9 font-133" style="line-height: 3.833333rem;">返回额度设置</p>
      </div>
      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[error_prompt]" id="setQuota_format">{{content}}</section>
        </div>
      </div>
    </div>
</template>
<script>
  import {updateWithdrawBankCardOrder,findWithdrawBankCardList} from '@/api/saleApi/saleJs'
  export default{
    data: function () {
      return {
        content:"",
        error_prompt:"",
        bankCardList: [
          /*{id:"001",bankName: "工商银行", bankNumber: "（*8252）"},
          {id:"002",bankName: "招商银行", bankNumber: "（*8250）"},
          {id:"003",bankName: "浦发银行", bankNumber: "（*5851）"},*/
        ],
        srcdiv: {},
        temp: {},
        showBankList:false,
      }
    },
    methods: {
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      //添加银行卡
      toTiedCardPage(){
        this.$router.push({name: 'tiedCard'});
      },
      //返回额度设置页
      goBackquotaManaPage(){
        this.$router.push({name: 'quotaMana'});
      },
      // 修改提现银行卡顺序
     /* transformationCardList(bankCardList){
          let data = [];
          for(let i=0;i<bankCardList.length;i++){
              data.push({id:bankCardList[i].id});
          }
        updateWithdrawBankCardOrder(localStorage.getItem('userID'),data).then(res =>{
            if(res.data.code == 200){
            if(!res.data.data){
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      }*/
    },
    mounted () {
      //window.addEventListener('dragged',this.$dragging.$on('dragged'));
      this.$dragging.$on('dragged', ({value}) => {
          let data = [];
          for(let i=0;i<value.list.length;i++){
            data.push({id:value.list[i].id});
          }
          updateWithdrawBankCardOrder(localStorage.getItem('userID'),data).then(res =>{
            if(res.data.code == 200){
              if(!res.data.data){
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            }
          },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
      })
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    created(){
      findWithdrawBankCardList(localStorage.getItem('userID')).then(res =>{
        if(res.data.code == 0){
          this.bankCardList = res.data.data;
          if(this.bankCardList!=null && this.bankCardList.length>0){
              this.showBankList = true;
          }else{
            this.showBankList = false;
          }
        }else{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        }
      },res =>{
        this.error_prompt="tel-message";
        this.content = res.data.msg;
      })
    },
    beforeDestroy(){
      //window.removeEventListener('dragged',this.$dragging.$on('dragged'));
      this.$dragging.$off('dragged');
    }
  }
</script>
<style scoped>
  .carryOrder .carryOrder_tips{
    line-height: 2.9166667rem;
  }
  .carryOrder .carryOrder_addBtn{
    height:3.833333rem;
  }
  .carryOrder .carryOrder_addBtn .carryOrder_addimg{
    width:1.66667rem;
    padding: 1.083333rem 0 1.0833333rem 36.5%;
  }
  .carryOrder .carryOrder_card{
    height:4.166667rem;
  }
  .carryOrder .carryOrder_card .carryOrder_card_info{
    line-height:4.166667rem;
  }
  .carryOrder .carryOrder_card .carryOrder_card_img{
    width: 1.666667rem;
    padding: 1.5rem 1.083rem 0 0;
  }
  .container{
    left: 0;
    display:flex;
    flex-direction: column;
    padding: 0;
  }
  .item {
    margin-top: 10px;
    transition: all linear .3s
  }
</style>

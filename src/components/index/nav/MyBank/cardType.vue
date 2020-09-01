<template>
  <div class="cardType height width">
    <section class="title font-167">
      <div class="savingsCard font-ipt cont" :class="savingsCardColor"  @click="card($event)">储蓄卡</div>
      <!--<div class="creditCard font-ipt cont" :class="creditCardColor" @click="card1($event)">信用卡</div>-->
    </section>
    <section class="cardType_content">
      <div class="view1" v-for="(item1,index1) in letter" :key="index1" v-if="isShow">
        <p class="width bg-f6 font-1 font-a39" :id="item1.sort" >{{item1.sort}}</p>
        <div class="sec_div font-2a2a" v-if="item1.sort == item2.sort" v-for="(item2,index2) in bankDetail" :key="index2"><div class="section_bor" @click="transferValue(item2.bankName)">{{item2.bankName}}</div></div>
      </div>
      <div class="view2" v-else>


      </div>
    </section>
    <!--<p class="width bg-f6 font-1 font-a39"  id="B" style="margin-top:50rem">bbbbbb</p>-->
    <!--<p  style="margin-top:50rem" class="width bg-f6 font-1 font-a39" id="C">ccccc</p>-->
    <!--<p style="margin-top:50rem" class="width bg-f6 font-1 font-a39" id="D">dddd</p>-->
    <div class="floorLocation ">
      <a :href="'#'+item.firstLetter" class="font-a39" v-for="(item,index) in AZ" @click="location(item.firstLetter)">{{item.firstLetter}}</a>
    </div>
  </div>
</template>
<script>
  import {queryBankList} from '@/api/user/loginReg'
   export default{
      data(){
          return{
            accessToken:"",
            isShow:true,
            savingsCardColor:"action",
            creditCardColor:"",
            bankDetail:[],               //银行明细
            letter:[],                     //所有首字母
            AZ:[
              {firstLetter:"A"},
              {firstLetter:"B"},
              {firstLetter:"C"},
              {firstLetter:"D"},
              {firstLetter:"E"},
              {firstLetter:"F"},
              {firstLetter:"G"},
              {firstLetter:"H"},
              {firstLetter:"I"},
              {firstLetter:"J"},
              {firstLetter:"K"},
              {firstLetter:"L"},
              {firstLetter:"M"},
              {firstLetter:"N"},
              {firstLetter:"O"},
              {firstLetter:"P"},
              {firstLetter:"Q"},
              {firstLetter:"R"},
              {firstLetter:"S"},
              {firstLetter:"T"},
              {firstLetter:"U"},
              {firstLetter:"V"},
              {firstLetter:"W"},
              {firstLetter:"X"},
              {firstLetter:"Y"},
              {firstLetter:"Z"}
            ]
          }
      },
     methods:{
       init(){
         this.accessToken = localStorage.getItem("userID");
         queryBankList(this.accessToken).then(res =>{
             if(res.data.code == 200){
                 this.letter = res.data.data.bankSortList;
                 this.bankDetail = res.data.data.bankList;
               console.log(res.data);
               console.log(this.letter);
             }else{
               this.$message({
                 message: res.data.msg,
                 type: "warning"
               });
             }
         },res =>{
           this.$message({
             message: res.data.msg,
             type: "warning"
           });
         })
       },
       //确定卡类型
       transferValue(cardName){
          this.$router.push({
            name:"aBank",
            params:{
              cardN:cardName
            }
          })
       },
       //楼层定位
       location(zm){
           this.$nextTick(() =>{
             let scroll_top = document.documentElement.scrollTop;
             document.documentElement.scrollTop = scroll_top - 100;
              document.body.scrollTop = scroll_top - 100;
           })
       },
       card(e){
          if(e.target.innerHTML == "储蓄卡"){
            this.isShow = true;
            this.savingsCardColor = "action";
            this.creditCardColor = "";
          }else{
              this.creditCardColor = "action";
            this.savingsCardColor = "";
            this.isShow = false;
          }
       },
       card1(e){
           this.card(e);
       }
     },
     created(){
          this.init();
       this.$root.$data.vBack=true;
       this.$root.$data.article = "选择卡类型";
     }
   }

</script>
<style>
  .cardType .title{
    margin-top:0.75rem;
  }
  .cardType .title{
    position:fixed;
    width:100%;
    height:2.833333rem;
    left:0;
    top:2.5rem;
    background:#fff;
  }
  .cardType .cardType_content{
    margin-top:3.1rem;
  }
  .cardType .title div{
    width:50%;
    float:left;
    line-height:2.833333rem;
    display:inline-block;
  }
  .cardType .action{
    color:#EB7B03;
    border-bottom:solid 2px #EB7B03;
  }
  .cardType section p{
    line-height: 2.25rem;
    text-indent: 4.5%;
  }
  .cardType section p:first-of-type{
    padding-top: 0.2rem;
  }
  .cardType section .sec_div{
    width:97.5%;
    height:3.75rem;
    line-height:3.75rem;
    padding-left:4%;
  }
  .cardType section .section_bor{
    border-bottom:solid 1px #E5E5E5;
  }
  .cardType .floorLocation{
    position:fixed;
    width:0.666666rem;
    right:1rem;
    top:9.5rem;
    font-size:0.83333rem;
  }
  .cardType .floorLocation a{
    display:block;
    line-height:1.7rem;
  }
  .cardType .floorLocation a:visited {
    color: #A39C9C;
  }
</style>

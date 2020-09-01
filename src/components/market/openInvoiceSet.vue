<template>
  <div class="openInvoiceSet width height bg-f6">
    <div class="" style="padding-top:1px;">
      <section class="width margin_top four_wrap bg-ff">
        <div class="invoiceTT height bd-btm" @click="toInvoiceTT">
          <div class="four_left fl font-125">发票抬头管理</div>
          <img class="fr four_img_right " src="../../assets/img/right.png"/>
        </div>
      </section>
      <section class="width four_wrap bg-ff">
        <div class="invoiceTT height" @click="toAddressManage">
          <div class="four_left fl font-125">邮寄地址管理</div>
          <img class="fr four_img_right " src="../../assets/img/right.png"/>
        </div>
      </section>
      <section class="width margin_top four_wrap bg-ff">
        <div class="invoiceTT height" @click="tomHistory">
          <div class="four_left fl font-125" >开票历史</div>
          <img class="fr four_img_right " src="../../assets/img/right.png"/>
        </div>
      </section>
      <div class="openInvoice font-3b9 font-1 fr" @click="toOpenInvoice">我要开票</div>
    </div>
  </div>
</template>
<script>
  export default{
      methods:{
        toInvoiceTT(){
          localStorage.setItem('formSouS', '');
            this.$router.push({name:"invoiceTT"})
        },
        toAddressManage(){
          localStorage.setItem('formSource','');
          this.$router.push({name:"addressManage"});
        },
        tomHistory(){
          this.$router.push({name:"mHistory"});
        },
        toOpenInvoice(){
          this.$router.push({name:"openInvoice"});
        },
      }
  }
</script>
<style>
  .openInvoiceSet .four_wrap .invoiceTT{
    margin-left:1.083333rem;
  }
  .openInvoiceSet .four_wrap .invoiceTT img{
    margin-right:1.666666rem;
  }
  .openInvoiceSet .margin_top{
    margin-top:1.08333rem;
  }
  .openInvoiceSet .openInvoice{
    margin-top:0.5rem;
    margin-right:1.8rem;
  }
</style>

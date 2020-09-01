<template>
    <div class="saleSusess height width bg-f6">
      <div class="saleSusess_content width bg-ff cont">
        <img class="saleSusess_img" src="../../assets/img/sale/icon_success@2x.png"/>
        <div class="font-125 font-2a2a font-b" style="margin-top: 1.666667rem">您的代卖申请已发起</div>
        <div class="width">
          <p class="saleSusess_sale font-125 font-F89" @click="toSaleOrder">查看代卖订单</p>
        </div>
      </div>
      <p class="saleSusess_goHome font-3b9 btm-0 pst-abs" @click="goSaleHome">返回首页</p>
    </div>
</template>
<script>
  export default{
    data: function () {
      return {}
    },
    methods:{
      //查看代卖订单列表页
      toSaleOrder(){
        this.$router.push({name:'saleOrder'});
      },
      //返回代卖首页
      goSaleHome(){
        this.$router.push({name:'saleHome'});
      }
    }
  }
</script>
<style>
  .saleSusess .saleSusess_content{
    height:26rem;
  }
  .saleSusess .saleSusess_goHome{
    margin-left: 43.733333%;
    margin-bottom: 1.5rem;
  }
  .saleSusess .saleSusess_content .saleSusess_img{
    width:5.25rem;
    padding: 20% 42% 0 42%;
  }
  .saleSusess .saleSusess_content .saleSusess_sale{
    margin: 4.4166667rem 31.5%;
    width: 11.25rem;
    height: 2.5rem;
    border: 1px solid;
    border-radius: 2rem;
    line-height: 2.5rem;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    /*选择发票分类/类型分类样式*/
    .saleSusess .saleSusess_content .saleSusess_sale{
      margin: 4.4166667rem 28.5%;
    }
  }
</style>

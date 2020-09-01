<template>
  <div class="bxFootbar1 height width bg-f6 pst-abs btm-0">
    <router-link to="/fillIn"><img class="bxFootbar1-img pst-abs z_index" src="../../assets/img/account/add.png" /></router-link>
    <div class="bxFootbar width height pst-abs btm-0 pos-left">
      <div class="bxFootbar-conter cont">
        <div class="bxFootbar-icon fp fl"><img src="../../assets/img/account/fp_.png" /><p class="font-075 font-a39">发票管理</p></div>
        <div class="bxFootbar-icon bx fr"><img src="../../assets/img/account/bx.png" /><p class="font-075 font-fa">报销管理</p></div>
      </div>
    </div>
  </div>
</template>
<style>
  .bxFootbar1 .bxFootbar-icon{
    width:33.333333%;
  }
  .bxFootbar1 .bxFootbar-conter .fp,.bxFootbar-conter .bx{
    padding-top: 0.3rem;
  }
  .bxFootbar1 .bxFootbar-conter .fp p,.bxFootbar-conter .bx p{
    line-height: 0.9rem;
  }
  .bxFootbar1 .bxFootbar-conter .fp img,.bxFootbar-conter .bx img {
    padding-left: 4.25rem;
  }
  .bxFootbar1 .bxFootbar-conter .fp img,.bxFootbar-conter .bx img{
    width: 2rem;
  }
  /*.bxFootbar1 .bxFootbar1-img{*/
    /*width: 3.25rem;*/
    /*bottom: 5px;*/
    /*left: 43.5%;*/
    /*border: 0.4rem solid #fafafa;*/
    /*border-radius: 3rem;*/
  /*}*/
  .bxFootbar1 .bxFootbar-conter .fp img, .bxFootbar-conter .bx img {
    padding-left: 40%;
  }
  /*5下面的样式*/
  @media screen and (max-width:321px){
    .bxFootbar1 .bxFootbar-conter .fp img, .bxFootbar-conter .bx img {
      padding-left: 40%;
    }
  }
  /*ipad下面的樣式*/
  @media screen and (max-width:760px)and(max-width: 1024px){
    .bxFootbar1 .bxFootbar-conter .fp img, .bxFootbar-conter .bx img {
      padding-left: 45%;
    }
  }
</style>

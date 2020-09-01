<template>
    <div class="Success width cont">
      <div class="Success-conter">
        <div class="Success-img"><img src="../../../../assets/image/feedbackS.png"></div>
        <div class="Success-font">
          <p class="fontC">反馈已收到</p>
          <p class="fontSmall font-108">我们将跟进并尽快解决您的问题</p>
          <p class="font-108">完善相关功能</p>
        </div>
      </div>
      <router-link to="/set"><div class="SucReturn width"><p class="cont bt-color">返回</p></div></router-link>
    </div>
</template>
<script>
  export default{
    created(){
      this.$root.$data.vBack=true;
    }
  }
</script>
<style>
  .Success-conter .Success-img{
    justify-content: center;
    display: flex;
    padding: 6.5rem 4rem 0 0;
  }
  .Success-conter .Success-img img{
    width: 20.33333rem;
    height: 18.125rem;
  }
  .Success-conter .Success-font{
    padding-top: 2.5rem;
  }
  .Success-conter .Success-font .fontC{
    font-size: 2.25rem;
  }
  .Success-conter .Success-font .fontSmall{
    padding-top: 0.833333rem;
  }
  .Success .SucReturn{
    position: absolute;
    top: 38.91666667rem;
  }
  .Success .SucReturn p{
    line-height: 3.83333rem;
    color: #fff;
    font-size: 1.333333rem;
    margin: 0 1.083333rem;
  }
  @media screen and (max-width:321px){
  .Success-conter .Success-img {
    padding: 5rem 2rem 0 0;
  }
    .Success-conter .Success-font {
      padding-top: 1.5rem;
    }
  }
</style>

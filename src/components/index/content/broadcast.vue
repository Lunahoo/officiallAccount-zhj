<template>
  <div class="broadcast fl bg-f6">
    <div class="banner">
     <!-- <Carousel trigger="click">
        <CarouselItem v-for="(item,index) in imgList" :key="index">
          <h3><img :src="item" alt="" style="height: 7.916666rem;" @click="toInviteF"></h3>
        </CarouselItem>
      </Carousel>-->
      <inviteHome></inviteHome>
      </div>
  </div>

</template>
<!--<script type="text/javascript" src="../../../../static/util/index.js"></script>-->
<script>
  import index from '../../../../static/util/index'
  import inviteHome from '../foot/inviteHome.vue';
  import Carousel from "../../../../node_modules/element-ui/packages/carousel"
  import CarouselItem from "../../../../node_modules/element-ui/packages/carousel-item"
  import {queryRecommendCode} from '@/api/inviteFriends/inviteFs'   //邀请好友
  export default {
    data(){
      return {
        imgList: [
//          require('../../../assets/image/banner.png'),
          require('../../../assets/img/inviteIndex/img_homebanner@2x.png'),
        ]
      }
    },
    methods: {
    },
    components: {
      Carousel, CarouselItem,inviteHome
    },
  }
</script>
<style>
  .broadcast .el-carousel__arrow{
    display:none;
  }
  .broadcast .banner{
    margin-bottom: 0.66666666667rem;
  }
  .broadcast .el-carousel__item h3 {
    margin: 0.5rem 0 0;
  }
  .broadcast .el-carousel__container{
    height: 8.4rem;
  }
  .broadcast .el-carousel__indicators{
    display: none;
  }
  .broadcast .el-carousel__item.is-animating{
    transition: transform 1s ease-in-out,-webkit-transform 1s ease-in-out;
  }
  .broadcast .banner .inviteImgAll{
    height: 7.916666rem;
  }
</style>

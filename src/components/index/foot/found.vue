<template>
  <div class="found">
      我是发现页面
    <footbar></footbar>
  </div>
</template>
<script>
  //  import $ from 'jquery';
  //  import Swiper from 'swiper';
  import footbar from '../../footbar.vue';
  export default {
    components:{

    },
    created(){
      this.$root.$data.vBack=true;
    },
    components:{
     footbar
    }
  }
</script>
<style>
  .found{
    height:80%;
  }
</style>

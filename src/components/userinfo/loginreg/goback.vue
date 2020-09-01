<template>
  <div class="goback width bd-btm bg-ff pst-abs pos-top pos-left z_index">
    <div class="returnImg pos-left" style="height: 3.25rem;">
      <img class="returnImg_icn" @click="goBack" src="../../../assets/img/left.png">
    </div>
    <div style="justify-content: center;display: flex;">
      <span class="page_title pst-abs pos-top font-133" style="color:#2A2E2E;font-weight: bold;">{{this.$root.$data.article}}</span>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        article: ''
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
    },
    created(){
    }
  }
</script>
<style>
  .goback{
    line-height: 3.166667rem;
  }
  .goback .returnImg .returnImg_icn{
    padding: 0.9833rem 0 0 1.083rem;
    width: 0.833rem;
  }
  @media screen and (max-width:321px) {
    .goback{
      height: 7%;
    }
    .goback .page_title{
      font-size: 1.25rem;
    }
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
    .goback{
      height: 8%;
    }
  }
</style>

<template>
  <div class="yzmMask" ></div>
</template>
<script>
  export default{
    created(){
   //   this.$root.$data.vBack=true;
    }
  }
</script>
<style>
  .yzmMask{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
    position:absolute;
    left:0;
    top:0;
    display:none;
    z-index:666;
  }
</style>

<template>
    <div class="error cont height bg-f6">
        <div class="photo">
          <img class="er-photo" src="../assets/image/error.png">
        </div>
      <div class="error-font">
        <p class="error-conter font-133">网络竟然奔溃了</p>
        <p class="error-small font-108 font-ipt">别紧张，试试看刷新页面~</p>
        <div class="refresh"><div class="refresh-font">刷新</div></div>
      </div>
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
  .error .photo{
    padding-top: 14.16rem;
    justify-content: center;
    display: flex;
  }
  .error .photo .er-photo{
    width: 8.33333333rem;
    height: 8.33333333rem;
    background: #fff;
    border-radius: 4rem;
  }
  .error .refresh{
    margin-top: 1.25rem;
    justify-content: center;
    display: flex;
  }
  .error .error-conter{
    padding-top: 0.416rem;
  }
  .error .refresh-font{
    border: 1px solid #FA8C16;
    line-height: 2.0833333rem;
    width: 6.25rem;
    border-radius: 1.0833333rem;
    color: #FA8C16;
  }
</style>

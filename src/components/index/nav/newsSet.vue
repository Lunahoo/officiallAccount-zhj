<template>
    <div class="newsSet width bg-f6 height cont">
      <div class="newsSet-empty bg-ff font-133 font-22d">
        清空全部消息
      </div>
      <div class="newsSet-empty-padding font-7b7">点击清空全部消息将清除消息页全部内容（不包括未处理消息）</div>
    </div>
</template>
<script>

  import {newsToken} from '@/api/user/news'
  export default {
    name: 'applica',
    data () {
      return {
        toke:'',
        mld:'',
      }
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        this.toke = localStorage.getItem("userID");
        this.mld = localStorage.getItem("userID");
        newsCore(this.toke,this.mld).then(res => {
          if(res.data.code == 200) {//成功
            /*console.log(res.data);*/
          }else{
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        },res => {
         /* this.$message({
            message: res.data.msg,
            type: "warning"
          });*/
        })
      }
    }
  }

</script>
<style scoped>
  .newsSet{
    /*padding-top: 4rem;*/
    padding-top: 1.5833333rem;
  }
  .newsSet-empty{
    line-height: 4.1666667rem;
  }
  .newsSet-empty-padding{
    padding-top: 1rem;
    margin:0 1.0833333rem;
  }
</style>

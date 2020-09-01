<template>
      <div id="inviteImg" @click="inviteFriends" class="inviteFriends">
        <img class="inviteImgAll" src="../../../assets/img/inviteIndex/img_mebanner@2x.png" >
      </div>
</template>
<script>
  import {queryRecommendCode} from '@/api/inviteFriends/inviteFs'   //邀请好友
  export default{
    data: function () {
      return {}
    },
    methods:{
       //邀请好友
      inviteFriends(){
        localStorage.setItem('contNum','undefined');
        if(localStorage.getItem('userID')!=''&& localStorage.getItem('userID')!=null && localStorage.getItem('userID')!='null' && localStorage.getItem('userID')!=undefined && localStorage.getItem('userID')!='undeinfed'){
          queryRecommendCode(localStorage.getItem('userID')).then(res=>{
            if(res.data.code==200){
              localStorage.setItem('myRecommendCode',res.data.data);//推荐码
              this.$router.push({path:"/inviteIndex",query:{inviteID:localStorage.getItem('myRecommendCode')}});
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res=>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
        }else if(localStorage.getItem('myRecommendCode')!=''&&localStorage.getItem('myRecommendCode')!=null&&localStorage.getItem('myRecommendCode')!=undefined&&localStorage.getItem('myRecommendCode')!='undefined'){
          this.$router.push({path:"/inviteIndex",query:{inviteID:localStorage.getItem('myRecommendCode')}});
        }else{
          this.$router.push({
            path:"/inviteIndex"
          });
        }
       },
    },
    beforeDestroy() {
      clearInterval(this.inviteFriends);
      window.history.replaceState({}, '', this.currentPage);
      console.info(window.location);
      console.info(this.currentPage);
    },
  }

</script>
<style></style>

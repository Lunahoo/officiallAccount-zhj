<template>
    <div class="newsCore height width bg-f6" style="width:99%;">
        <div class="newsCore-conter">
          <ul class="newsCore-news fl width">
            <li class="newsCore-news-l bg-ff fl" v-for="(tab,index) in newsT" :key="tab.id">
              <div class="fl newsCore-news-l-width">
                <img class="newsCore-news-l-icon" src="../../../assets/img/news/img_Coupons.png" />
              </div>
              <div class="newsCore-news-r fl">
                <div class="fl width newsCore-news-r-pad">
                <div class=" ellipsis">
                  <div class="newsCore-news-r-width">
                    <span class="newsCore-news-name fl font-108 font-ipt ellipsis">{{tab.name}}</span><span class="newsCore-news-date font-7b7 ellipsis">{{tab.timeRemark}}</span>
                  </div>
                  <div v-if="wagesMoney" class="newsCore-news-r-cont font-133 width ellipsis">您有一笔滴滴出行订单尚未支付</div>

                  <div v-else>
                    <div v-show="Eyes" class="newsCore-news-r-cont news-many width ">{{tab.content|money}}</div>
                    <div v-show="!Eyes" class="newsCore-news-r-cont news-many width news-line-h">****</div>
                    <div class="newsCore-news-r-wages font-7b7 fl">{{tab.remark}}</div>
                    <div class="newsCore-news-r-wages-e fr" @click="EyesDJ" ref="aaa">
                      <img v-show="Eyes" class="wages-image" src="../../../assets/image/news/icon_View2X_pressed.png" />
                      <img v-show="!Eyes" class="wages-image" src="../../../assets/image/news/icon_View2X_default.png"/>
                    </div>
                  </div>
                </div>
                <div class="newsCore-news-b bd-top" v-if="payment">
                  <div class="newsCore-news-b-l fl font-108 font-EB">去支付</div>
                  <div class="newsCore-news-b-r fl"><img src="../../../assets/img/news/icon_OrangeChevron3X.png" /></div>
                </div>
                </div>
              </div>
            </li>
          </ul>
          <!--设置-->
          <router-link to="/newsSet">
            <div class="news-set">
              <img class="news-set-image" src="../../../assets/image/news/btn_Setting.png" />
            </div>
          </router-link>
        </div>
    </div>
</template>
<script>
  import {newsCore} from '@/api/user/news'
  export default {
    name: 'bg-login',
    data() {
      return {
          toke:'',
        mId:'',
        Eyes:true,/*小眼睛*/
        payment:true,/*去支付*/
        wagesMoney:false,/*工资或订单*/
        newsT:{

        }
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.init();
    },
    methods: {
      //找回密码

      EyesDJ(){
        this.Eyes=!this.Eyes;
      },
      init(){
        this.toke = localStorage.getItem("userID");
        this.mId = localStorage.getItem("userID");
        newsCore(this.toke,this.mld).then(res => {
          if(res.data.code == 200) {//成功
            /*console.log(res.data);*/
            this.newsT=res.data.data.newMsgList;
            console.log(this.newsT)
          }else{
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        },res => {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        })
      }
    }
  }
</script>
<style>
  .newsCore{
   /* height: 100%;*/
  }
  .newsCore .newsCore-conter .newsCore-news .newsCore-news-l .newsCore-news-l-icon{
    width: 2rem;
  }
  .newsCore .newsCore-conter{
    padding-top: 0.8rem;
  }
  .newsCore .newsCore-conter .newsCore-news{
    margin-bottom: 0.8rem;
  }
  .newsCore .newsCore-conter .newsCore-news .newsCore-news-l{
    margin-bottom: 0.8rem;
    padding-left: 1.083333rem;
    width: 96.6%;
  }
  .newsCore .newsCore-conter .newsCore-news .newsCore-news-l .newsCore-news-l-width{
    width: 10%;
    padding-top: 1rem;
  }
  .newsCore-news-r .news-line-h{
    line-height: 3.95rem;
  }
  .newsCore .newsCore-conter .newsCore-news .newsCore-news-l .newsCore-news-r{
    width: 90%;
  }
  .newsCore-news-r-pad{
    padding-top: 1rem;
  }
  .newsCore .newsCore-conter .newsCore-news .newsCore-news-r .newsCore-news-b img{
    width: 0.5rem;
  }
  .newsCore-news-l .newsCore-news-r .newsCore-news-r-width{
    line-height: 2rem;
    /*width: 95%;*/
  }
  .newsCore-news-l .newsCore-news-r .newsCore-news-r-width .newsCore-news-name{
    padding-right: 0.66666667rem;
    max-widows:80%;
  }
  .newsCore-news-l .newsCore-news-r .newsCore-news-r-cont,.newsCore-news-l .newsCore-news-r .newsCore-news-b{
    line-height: 3.6666667rem;
  }
  .newsCore-news-r .newsCore-news-b .newsCore-news-b-r{
    padding: 1.4rem 0 0 1rem;
  }
  /*22222222*/
  .news-many{
    font-size: 1.6666667rem;
  }
  .newsCore-news-r-wages{
    padding-bottom: 1.083333rem;
  }
  .newsCore-news-r-wages-e{
    width: 1.0416667rem;
    padding-right: 1.1666667rem;
    position: relative;
    right: 1.1666667rem;
  }
  .newsCore-news-r-wages-e .wages-image{
    position: absolute;
    top: 0;
    right: 0;
  }
  /*设置*/
  .newsCore .news-set{
    position: absolute;
    top: 27rem;
    right: 0.41666667rem;
  }
  .newsCore .news-set .news-set-image{
    width: 3.666667rem;
  }


  /*5样式*/
  @media screen and (max-width:321px){
    .newsCore .newsCore-conter .newsCore-news .newsCore-news-l {
      width: 96%;
    }
  }
  /*ipad下面的样式*/
  @media screen and (max-width:768px)and (min-width: 450px){
    .newsCore .newsCore-conter .newsCore-news .newsCore-news-l {
      width: 98%;
    }
  }
</style>

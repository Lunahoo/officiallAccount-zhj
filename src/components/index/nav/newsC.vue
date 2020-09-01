<template>
    <div class="newsC width bg-f6">
      <div class="tab_manage_wrap width height">
        <ul class="tab_manage clearfix">
          <li class="newsCore-news-l bg-ff fl" v-for="(todo, index) in newsT" :key="index">
            <div>
              <div :class="[{swipeleft: isSwipe[index]},'tab_manage_list fl']" @touchstart.stop="created()" ref="child" :key="index">
                <div class="fl newsCore-news-l-width">
                  <img class="newsCore-news-l-icon" src="../../../assets/img/news/img_Coupons.png" />
                </div>
                <div class="fl newsCore-news-r-pad">
                  <div class=" ellipsis ">
                    <p class="tab fl font-108 font-ipt">{{ todo.name }}(<span>{{todo.timeRemark}}</span>)</p>
                    <p class="tab_content text_hide font-7b7 pd-lf fl">{{ todo.text }}</p>
                  </div>
                  <div v-if="newsCFontMax" class="newsC-font-max height-375 font-133 newsC-eyes">{{todo.ac}}</div>
                  <div class="height-375 font-133 newsC-eyes" v-else>
                    <div class="newsC-main-max wages-image" :id="'money_'+todo.id">{{todo.content|money}}元</div>
                    <div class="newsC-main-max wages-image_close" :id="'money_close_'+todo.id">*****</div>
                    <div class="newsC-main-icon" ref="aaa">
                      <img class="wages-image" :id="'eye_'+todo.id" @click="EyesDJ('money_'+todo.id,'eye_'+todo.id,'money_close_'+todo.id,'eye_close_'+todo.id)" src="../../../assets/image/news/icon_View2X_pressed.png" />
                      <img class="wages-image_close" :id="'eye_close_'+todo.id" @click="EyesDJ('money_'+todo.id,'eye_'+todo.id,'money_close_'+todo.id,'eye_close_'+todo.id)" src="../../../assets/image/news/icon_View2X_default.png"/>
                    </div>
                  </div>
                  <div class="height-375 font-108 bd-topf6 font-EB"><div class="fl">去支付</div><div class="fl"><img class="newsCore-news-l-right" src="../../../assets/img/news/icon_OrangeChevron3X.png" /></div></div>
                </div>
              </div>
            </div>
            <p class="tab_delete fl cont font-125" @click.stop="removeTodo(todo.id)">删除</p>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import {newsCore} from '@/api/user/news'
  import {deteleNew} from '@/api/user/SignOut'
  import {swItch} from '@/api/user/SignOut'
  export default({
    data(){
      return {
        toke:'',
        mId:'',
        isSwipe: [false, false, false],
        todos: [
          /*{ 'text': '滴滴出行','num':'3','title':'5月份收房','aa':'****','wuY':'去支付','ab':'15645643','ac':'您有一笔滴滴出行订单尚未支付'},
          { 'text': '滴滴滴滴滴滴','num':'8','title':'6月份收房','aa':'您有一笔滴滴出行订单尚未支付','wuY':'去支付'}*/
          ],
        Eyes:true,
        newsCFontMax:false,
        newsT:{

        }
      }
    },
    created(){
      this.init();
      this.$root.$data.vBack=true;
      this.$root.$data.article = '消息';
    },
    methods: {
    init(){
      this.toke = localStorage.getItem("userID");
      this.mId = localStorage.getItem("userID");
      newsCore(this.toke,this.mld).then(res => {
        if(res.data.code == 200) { //成功
          console.log(res.data);
          //console.log(res.data.data.newMsgList);
          this.newsT=res.data.data.newMsgList;
        }else{
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      },res => {
        /*this.$message({
          message: res.data.msg,
          type: "warning"
        });*/
      })
    },
      EyesDJ: function (moneyID,eyeID,money_closeID,eye_closeID){//显示金额ID，显示眼睛ID，关闭金额ID，关闭眼睛ID
        let moneyData = document.getElementById(moneyID);
        if(moneyData.style.display == 'none'){
          moneyData.style.display = 'block'
          document.getElementById(eyeID).style.display = 'block'
          document.getElementById(money_closeID).style.display = 'none'
          document.getElementById(eye_closeID).style.display = 'none'
        }else{
          moneyData.style.display = 'none'
          document.getElementById(eyeID).style.display = 'none'
          document.getElementById(money_closeID).style.display = 'block'
          document.getElementById(eye_closeID).style.display = 'block'
        }
        this.toke = localStorage.getItem("userID");
      /*  swItch(this.toke,infoId).then(res => {/!*开关*!/
          if(res.data.code == 200) {//成功
            this.init();
            console.log(res.data);/!*开关 成功暂时写 在小眼睛上还没有入口*!/
          }
        },res => {
          console.log(res.data);
          //   return false
        })*/
      },
      removeTodo: function (infoId) {
        this.newsT.splice(infoId, 1);
        this.isSwipe = [false, false, false];
        this.toke = localStorage.getItem("userID");
        deteleNew(this.toke,infoId).then(res => {/*现在是假接口不会真的删除*/
          if(res.data.code == 200) {//成功
            this.init();
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
      },
      created:function() {
        setTimeout(() => {
          // 判断是否存在信息列表
          if (this.$refs.child) {
            this.$refs.child.forEach((element, index) => {
              let x, y, X, Y, swipeX, swipeY
              // 监听touchstart
              element.addEventListener('touchstart',function(e) {
                x = e.changedTouches[0].pageX
                y = e.changedTouches[0].pageY
                swipeX = true
                swipeY = true
                this.isSwipe = [false, false, false]
              })
              element.addEventListener('touchmove', e => {
                X = event.changedTouches[0].pageX
                Y = event.changedTouches[0].pageY
                if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
                  // 阻止默认事件
                  e.stopPropagation()
                  // 右滑
                  if (X - x > 10) {  //滑动间距
                    e.preventDefault()
                    this.isSwipe.splice(index, 1, false)
                  }
                  if (x - X > 10) {  //滑动间距
                    e.preventDefault()
                    this.isSwipe.splice(index, 1, true)
                  }
                  swipeY = false
                }
                if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
                  swipeX = false
                }
              })
            })
          }
        }, 500)
      }
    }
  })
</script>
<style>
  .newsC .tab_manage_wrap .tab_title i{
    position: absolute;
    width: 0.64rem;
    height: 0.64rem;
    left: 0.426667rem;
    top: 0.96rem;
    background-size: 100% 100%;
  }
  .newsC .tab_manage_wrap .tab_title span{
    display: block;
    padding-left: 1.493333rem;
    font-size: 0.597333rem;
    color: #fe4d57;
  }
  .newsC .tab_manage_wrap .tab_manage{
    width: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    position: relative;
  }
  .newsC .tab_manage_wrap .tab_manage li{
    margin-bottom: 0.8rem;
    padding-left: 1.083333rem;
    width: 113.6%;
  }
  .newsC .tab_manage_wrap .tab_manage_list{
    width: 85%;
  }
  .newsC .tab_manage_wrap .swipeleft.tab_manage_list{
    margin-left: -15%;
  }
  .newsC .tab_manage_wrap .tab_manage li .tab_delete{
    height: 10.3rem;
    width: 15%;
    line-height: 10.3rem;
    font-size: 1.25rem;
    color: #fff;
    background-color: #fe4d57;
  }
  /*样式*/
  .newsC .tab_manage_wrap .newsCore-news-l-width {
    width: 10%;
    padding-top: 1rem;
  }
  .newsC .tab_manage_wrap .newsCore-news-l-icon {
    width: 2rem;
  }
  .newsC .tab_manage_wrap .newsCore-news-r-pad{
    padding-top: 0.5rem;
    width:90%;
  }
  .newsC .tab_manage_wrap .newsCore-news-r-pad .newsC-main-max{
  max-width: 20rem;
  }
  .newsC .tab_manage_wrap .newsCore-news-r-pad .newsC-main-icon{
    width: 2rem;
    padding-right: 1.1666667rem;
    position: absolute;
    right: 0;
    top: 1rem;
  }
  .newsC .tab_manage_wrap .newsCore-news-l-right{
    width: 0.5rem;
    padding: 1.4rem 0 0 0.5rem;
  }
  .newsC .tab_manage_wrap .newsCore-news-r-pad .newsC-eyes{
    position: relative;
  }
  .newsC-eyes .wages-image{
    display: block;
  }
  .newsC-eyes .wages-image_close{
    display: none;
  }
  /*ipad下面的样式*/
  @media screen and (min-width:760px)and (max-width: 1024px){
  .newsC .tab_manage_wrap .tab_manage li {
    margin-bottom: 0.8rem;
    padding-left: 1.083333rem;
    width: 113.6%;
  }
  .newsC .tab_manage_wrap .tab_manage_list {
    width: 87%;
  }
  .newsC .tab_manage_wrap .tab_manage li .tab_delete {
    height: 10.3rem;
    width: 13%;
    line-height: 10.3rem;
    font-size: 1.25rem;
    color: #fff;
    background-color: #fe4d57;
  }
  }
</style>

<template lang="html">
    <div class="yo-scroll pst-abs pos-top btm-0 pos-left pos-right bg-f6" @touchstart="touchStart($event)"
         @touchmove="touchMove($event)" @touchend="touchEnd($event)">
        <section class="inner">
            <slot>
            </slot>
            <footer class="load-more">
                <slot name="load-more">
                    <span style="font-size: 1.2rem;">{{loadMoreText}}</span>
                </slot>
            </footer>
            <div class="nullData font-7b7 bg-f6" v-show="dataList.noFlag">—— 我是有底线的 ——</div><!-- v-show=" dataListNoFlag"-->
        </section>
    </div>
</template>
<script>
    export default {
        props: {
            offset: {
                type: Number,
                default: 100 //默认高度
            },
            enableLoadMore: {
                type: Boolean,
                default: true
            },
            dataList: {
                default: false,
                required: false,
                noFlag:true
            },
            onLoadMore: {
                type: Function,
                default: undefined,
                require: false
            },
        },
        data() {
            return {
                startX: 0,
                startY: 0,
                touching: false,
                isLoading: false,
                loadMoreText: "上拉加载更多",
                dataListNoFlag:false
            }
        },
        methods: {
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY;
                this.startX = e.targetTouches[0].pageX;
                this.startScroll = this.$el.scrollTop || 0;
                this.touching = true; //留着有用，不能删除
                this.dataList.noFlag = false;
            },
            //滑动中
            touchMove(e) {
                if(!this.enableLoadMore || this.dataList.noFlag || !this.touching) {
                    return
                }
                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
                if(diff > 0) {
                //    e.preventDefault();
                }
                this.loadMoreText = '上拉加载更多'
                this.$el.querySelector('.load-more').style.display = 'block';
            },
            touchEnd(e) {
              if (this.isLoading) {
                    return;
                }
                this.touching = false
                //用于判断滑动是否在原地 ----begin
                let endX = e.changedTouches[0].pageX,
                    endY = e.changedTouches[0].pageY,
                    dy = this.startY - endY,
                    dx = endX - this.startX;
                //如果滑动距离太短
                if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    // console.log("滑动距离太短")
                    let more = this.$el.querySelector('.load-more')
                    more.style.display = 'none'; //隐藏加载条
                    return;
                }
                if(!this.enableLoadMore || this.isLoading) {
                    let more = this.$el.querySelector('.load-more')
                    more.style.display = 'none'; //隐藏加载条
                    return
                }
                let outerHeight = this.$el.clientHeight,
                    innerHeight = this.$el.querySelector('.inner').clientHeight,
                    scrollTop = this.$el.scrollTop,
                    bottom = innerHeight - outerHeight - scrollTop;
                if(bottom <= this.offset) {
                    //内容太少
                    this.doLoadMore();
                } else {
                    let more = this.$el.querySelector('.load-more')
                    more.style.display = 'none'; //隐藏加载条
                }
            },
            doLoadMore() {
                this.isLoading = true
                this.loadMoreText = '正在加载'
                this.onLoadMore(this.loadDone);
            },
            loadDone() {
                this.isLoading = false
                let more = this.$el.querySelector('.load-more')
                more.style.display = 'none'; //隐藏加载条
            }

        }
    }
</script>
<style>
  .yo-scroll {
    padding-top: 0.58333333333rem;
    overflow: auto;
    /*z-index: 100;*/
    height: auto;
    -webkit-overflow-scrolling: touch;
    height:94%;
  }
  .voucherRecharge .yo-scroll {
    height:82%;
    padding-top: 1.3rem;
    margin-top:8rem;
  }
  .yo-scroll .inner {
    position: absolute;
    width: 100%;
    height: auto;
    transition-duration: 300ms;
    padding-bottom: 3.5rem;
  }

  .yo-scroll .inner .load-more {
    line-height: 3rem;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: none;
  }
  .yo-scroll .inner .nullData {
    line-height: 3rem;
    text-align: center;
    font-size: 1rem;
  }
  .down-tip,
  .refresh-tip,
  .up-tip {
    display: none;
  }
  .yo-scroll.touch .inner {
    transition-duration: 0;
  }
  .yo-scroll.down .down-tip {
    display: block;
  }
  .yo-scroll.up .up-tip {
    display: block;
  }
  .yo-scroll.refresh .refresh-tip {
    display: block;
  }
  @media screen and (max-width:321px){
    .yo-scroll {
      height:91%;
    }
  }
</style>

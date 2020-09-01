<!--
<template lang="html">
  <div class="yo-scroll"
       :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
       @touchstart="touchStart($event)"
       @touchmove="touchMove($event)"
       @touchend="touchEnd($event)"
       @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <section class="inner height-942" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }" >
      <header class="pull-refresh">
        <slot name="pull-refresh">
          <span class="down-tip">下拉更新</span>
          <span class="up-tip">松开更新</span>
          <span class="refresh-tip">更新中</span>
        </slot>
      </header>
      <slot></slot>
      <footer class="load-more" style="width:100%">
        <slot name="load-more">
          &lt;!&ndash;<span>加载中……</span>&ndash;&gt;
        </slot>
      </footer>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      offset: {
        type: Number,
        default: 40
      },
      enableInfinite: {
        type: Boolean,
        default: true
      },
      enableRefresh: {
        type: Boolean,
        default: true
      },
      onRefresh: {
        type: Function,
        default: undefined,
        required: false
      },
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      }
    },
    data() {
      return {
        top: 0,
        state: 0,
        dataA:0,
        startY: 0,
        touching: false,
        infiniteLoading: false
      }
    },
    methods: {
      touchStart(e) {
          if(localStorage.getItem("flag") == true || localStorage.getItem("flag") == "true"){
            this.dataA++;
          }
      //   alert("刷新页面:"+localStorage.getItem("flag"));
          localStorage.setItem("dataA",this.dataA);
        this.startY = e.targetTouches[0].pageY
        this.startScroll = this.$el.scrollTop || 0
        this.touching = true
      },
      touchMove(e) {
        if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
          return
        }
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
        if (diff > 0) {
          //  e.preventDefault()
        }
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

        if (this.state === 2) { // in refreshing
          return
        }
        if (this.top >= this.offset) {
          this.state = 1
        } else {
          this.state = 0
        }
      },
      touchEnd(e) {
        if (!this.enableRefresh) return
        this.touching = false
        if (this.state === 2) { // in refreshing
          this.state = 2
          this.top = this.offset
          return
        }
        if (this.top >= this.offset) { // do refresh
          this.refresh()
        } else { // cancel refresh
          this.state = 0
          this.top = 0
        }
      },
      refresh() {
        this.state = 2
        this.top = this.offset
        this.onRefresh(this.refreshDone)
      },
      refreshDone() {
        this.state = 0
        this.top = 0
      },

      infinite() {
        this.infiniteLoading = true
        this.onInfinite(this.infiniteDone)
      },

      infiniteDone() {
        this.infiniteLoading = false
      },

      onScroll(e) {
//        if (!this.enableInfinite || this.infiniteLoading) {   //先隐藏，此步骤禁止了下拉事件的重复执行
//          return
//        }
        let outerHeight = this.$el.clientHeight
        let innerHeight = this.$el.querySelector('.inner').clientHeight
        let scrollTop = this.$el.scrollTop
        let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
        let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
        let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
        if (bottom < infiniteHeight) this.infinite()
      }
    }
  }
</script>
<style>
  .yo-scroll {
    position: absolute;
    top: 3rem;
    height: 87.5%;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
     -webkit-overflow-scrolling: touch;
  }
  .yo-scroll ul{
    margin-left:1.1rem;
  }
  .yo-scroll ul li{
    position:relative;
  }
  .yo-scroll ul li .title{
    margin-top:1.2rem;
    margin-bottom:1rem;
  }
  .yo-scroll ul li .img{
    float:left;
    width:113px;
    height:100px;
    margin-top:0.416rem;
    margin-right:0.416rem;
  }
  .yo-scroll ul li::before{
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    color:#fff;
    background:rgba(105,106,107,.3);
  }
  .yo-scroll .inner {
    position: absolute;
    top: -3rem;
    width: 100%;
    transition-duration: 300ms;
  }
  .yo-scroll .pull-refresh {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yo-scroll.touch .inner {
    transition-duration: 0ms;
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
  .yo-scroll .down-tip,
  .yo-scroll .refresh-tip,
  .yo-scroll .up-tip {
    display: none;
  }
  .yo-scroll .load-more {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>





-->

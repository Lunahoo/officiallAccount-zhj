<template>
  <div id="app" class="font-167">
    <div class="city">
      <div class="city-wrapper city-wrapper-hook">
        <div class="scroller-hook">
          <div class="cities cities-hook">
            <div v-for="i in bankCardData">
              <div class="title">{{i.groupName}}</div>
              <ul>
                <!--<li v-for="item in i.bankList" class="item city-click" :style="{background: 'url('+ require('../../../../assets/img/icon_add_to@2x.png') +') no-repeat 4% 58%', backgroundSize:'2.5rem' }" :data-name="item.bankName" :data-id="item.bankCode">-->
                <li v-for="item in i.bankList" class="item city-click" v-if="item.bankLogo!='' && item.bankLogo!=null" :style="{background: 'url('+item.bankLogo+') no-repeat 4% 58%', backgroundSize:'2.5rem'}" :data-name="item.bankName" :data-id="item.bankCode">
                  <span class="border-1px name width" @touchend="touchUp(item)"  @touchstart="chooseCity()">
                    {{item.bankName}}
                  </span>
                </li>
                <li v-for="item in i.bankList" class="item city-click" v-if="item.bankLogo=='' || item.bankLogo==null" :style="{background: 'url('+require('../../../../assets/img/icon_default@2x.png')+') no-repeat 4% 58%', backgroundSize:'2.5rem'}" :data-name="item.bankName" :data-id="item.bankCode">
                  <span class="border-1px name width" @touchend="touchUp(item)"  @touchstart="chooseCity()">
                    {{item.bankName}}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="shortcut shortcut-hook" style="right: -13px;top:100px !important;" @touchstart="touchIndex">
          <ul style="width: 19px;text-align: left;padding: 20px 0">
            <li v-for="i in bankCardData" :data-anchor="i.groupName.substr(0, 1)" class="item pst-rlt cont font-1 font-a39" style="height: 1rem;padding: 0.15rem 0px 1rem!important;width: 1.5rem;">
              <span class="shortcut_checked" v-if="i.groupName.substr(0, 1) == ConName">{{i.groupName.substr(0, 1)}}</span>
              <span v-if="i.groupName.substr(0, 1) != ConName">{{i.groupName.substr(0, 1)}}</span>
              <img class="pst-abs" v-show="i.groupName.substr(0, 1) == ConName " style="top: -0.3rem;left: -4rem;width: 3rem;" src="../../../../assets/image/img_Pickon@2x.png" />
              <div v-show="i.groupName.substr(0, 1) == ConName" class="font-col-b font-s15 pst-abs" style="top: -0.25rem;left: -3.2rem;">{{i.groupName.substr(0, 1)}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="toast" v-show="toastShow">
      {{toastText}}
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>

<script>
  import cityData from '../../../../assets/js/city.js'
  import BScroll from "better-scroll";
  import getping from '../../../../assets/js/getping.js'
  import AMap from 'AMap'
  import {findBankCardGroupName} from '@/api/aloneC/cInterface'
  export default {
    data () {
      return {
        content:"",
        error_prompt:"",
        source:"",/*判断页面来源*/
        Submission:false,/*小气泡*/
        ConName:'热',
        direct:"",
        formTitle:"",
        countTime: 0,
        countTimer: null,
        time: 60,
        location: '上海市',
        submit: {
          sms_captcha: '',
          captcha: '',
          area_code: '',
          _token: '',
        },
        map:null,
        cityWrapper: document.querySelector('.city-wrapper-hook'),
        cityScroller: document.querySelector('.scroller-hook'),
        cities: document.querySelector('.cities-hook'),
        shortcut: document.querySelector('.shortcut-hook'),
        shortcutList: [],
        bankCardData: [

        ],// 数据源
        scroll: null,
        anchorMap: {},
        touch: {},
        toastShow: false,
        //isShowCitys: false,
        toastText: '',
        allbankCard:[],
      }
    },
    created(){
      if(this.$route.params.direction!=""&&this.$route.params.direction!=undefined&&this.$route.params.direction!=null){
        this.direct = this.$route.params.direction;
      }
      if(this.$route.params.source!=""&&this.$route.params.source!=undefined&&this.$route.params.source!=null && this.$route.params.source!='undefined'){
        this.source = this.$route.params.source;
        localStorage.setItem('source',this.source);
        this.formTitle = this.$route.params.title;
      }else{
        this.source = localStorage.getItem('source');
      }
      findBankCardGroupName().then(res => {
        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            this.bankCardData = res.data.data;
            this.initCities();
          }
        } else {
          this.error_prompt = "tel-message";
          this.content = res.data.msg;
        }
      },res => {
        this.error_prompt = "tel-message";
        this.content = res.data.msg;
      });
    },
    mounted() {
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    computed:{

    },
    methods: {
      timer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      toast (str) {
        let v = this
        v.toastText = str
        v.toastShow = true
        setTimeout(function(){
          v.toastShow = false
        }, 1500)
      },
      chooseCity (city) {
        let v = this
        v.countTime = 0
        v.countTimer = setInterval(function (e){v.countTime++},1);
      },
      touchUp (item) {
        let v = this
        clearInterval(v.countTimer)
        if (v.countTime < 30) {
          //this.isShowCitys = false
          this.submit.area_code = item.bankCode;
          if(this.source == "tiedCard"){
            this.$router.push({
              name:"tiedCard",
              params:{
                bankName:item.bankName,
                bankCode:item.bankCode,
                bankLogo:item.bankLogo
              }
            })
          }else if(this.source == "addInvoiceTT"){
            this.$router.push({
              name:"addInvoiceTT",
              params:{
                bankN:item.bankName,
                code:item.bankCode,
                bankLogo:item.bankLogo,
                title:this.formTitle
              }
            })
          }


        }

      },
      selectLocation () {
        let v = this
        //this.isShowCitys = true
        this.$nextTick(function() {
          this.initCities()
        })
      },
      geocoder_CallBack (data) {
        let v = this
        var adcode3     = data.regeocode.addressComponent.adcode;
        var address     = data.regeocode.formattedAddress; //返回地址描述
        var csqy        = data.regeocode.addressComponent.district; //地区
        var csadcode    = data.regeocode.addressComponent.adcode; //区域编码
        this.submit.area_code = csadcode
        var citycode2   = csadcode.substr(0, 4) + "00"; //省份编码
        var codes       = adcode3.substr(0, 4) + "00";
        var citys2      = data.regeocode.addressComponent.city;
        var poiArr      = data.regeocode.pois; //坐标
        var resultCount = poiArr.length;
        var dz          = data.regeocode.formattedAddress;
      },
      initCities () {
        let v = this;
        let y = 0;
        var titleHeight = 28
        var itemHeight = 44
        v.bankCardData.forEach(function(e){
          let name = e.groupName.substr(0, 1)
          let len = e.bankList.length
          v.anchorMap[name] = y
          y -= titleHeight + len * itemHeight
        });
        v.shortcut = document.querySelector('.shortcut-hook')
        v.cityWrapper = document.querySelector('.city-wrapper-hook')
        v.shortcut.style.top = (v.cityWrapper.clientHeight - v.shortcut.clientHeight) / 4 + 'px';
        v.scroll = new BScroll(v.cityWrapper, {
          probeType: 3
        })
        v.scroll.scrollTo(0, 0);
      },
      touchIndex: function (e) {
        this.ConName = e.changedTouches[0].target.innerText
        let v = this
        /*let anchor = e.target.getAttribute('data-anchor')
        let firstTouch = e.touches[0]
        v.touch.y1 = firstTouch.pageY
        v.touch.anchor = anchor;
        if(anchor == '热门银行'){
          anchor = anchor.substr(0,1);
        }*/
        v.scrollTo(this.ConName);
      },
      scrollTo: function (anchor) {
        let v = this
        v.cityScroller = document.querySelector('.scroller-hook')
        var maxScrollY = v.cityWrapper.clientHeight - v.cityScroller.clientHeight
        var y = Math.min(0, Math.max(maxScrollY, v.anchorMap[anchor]))
        if (typeof y !== 'undefined') {
          v.scroll.scrollTo(0,y);
        }
      },
    },
  }
</script>

<style>

  .list-item input {
    border:none;
    text-align: center;
    outline: none;
  }
  .toast {
    position: fixed;
    z-index: 2000;
    left: 50%;
    top:45%;
    transition:all .5s;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    -o-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    border-radius: 5px;
    color:#FFF;
    background: rgba(17, 17, 17, 0.7);
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    max-width: 150px;
  }
  .city-wrapper .cities-hook ul li{
   /* background: url("../../../../assets/img/icon_add_to@2x.png") no-repeat 4% 58%;
    background-size: 2.5rem;*/
  }
  .city {
    display: block;
  }
  .city .city-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
    background-color: #FFF;
    overflow-y: scroll;
  }
  .city .city-wrapper .scroller-hook .cities-hook .city-click{
    background-size: 2.5rem;
  }
  .city .city-wrapper .cities .title {
    height: 28px;
    padding-left: 16px;
    line-height: 28px;
    background-color: #f5f5f5;
    font-family: Helvetica;
    font-size: 1.2rem;
    color: #878787;
  }
  .city .city-wrapper .cities .item {
    height: 44px;
    padding: 0 16px;
    line-height: 44px;
    font-size: 1.25rem;
  }
  .city .city-wrapper .cities .item .name {
    display: block;
    position: relative;
    padding-left: 3rem;
  }
  .city .city-wrapper .cities .item .name:before,
  .city .city-wrapper .cities .item .name:after {
    display: block;
    position: absolute;
    border-top: 1px solid #e5e5e5;
    left: 0;
    width: 100%;
    content: ' ';
  }
  .city .city-wrapper .cities .item .name:before {
    display: none;
    top: 0;
  }
  .city .city-wrapper .cities .item .name:after {
    display: block;
    bottom: 0;
  }
  .city .city-wrapper .cities .item:active {
    background-color: #f0f0f0;
  }
  .city .city-wrapper .cities .item:last-child .name:after {
    display: none;
  }
  .city .city-wrapper .shortcut {
    position: absolute;
    z-index: 30;
    width: 40px;
    right: 0;
    font-family: Helvetica;
  }
/*  .city .city-wrapper .shortcut ul li:first-of-type{!*************************************************!
    background: #388ef1!important;
    color: #fff!important;
    padding: 0.15rem 0px 0.5rem!important;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
  }*/
  .city .city-wrapper .shortcut .shortcut_checked{
    border-radius: 1rem;
    color: #388ef1!important;
  }
  .city .city-wrapper .shortcut .item {
    height: 12px;
    padding-top: 6px;
    padding-left: 24px;
    text-align: center;
    font-size: 1.2rem;
    color: #A39C9C;
  }
  @media only screen and (max-height: 600px) {
    .city .city-wrapper .shortcut .item {
      padding-top: 3px;
    }
  }
  .cities .cities-hook> div {
    width: 70%;
  }
</style>

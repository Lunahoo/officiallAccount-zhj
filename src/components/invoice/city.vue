<template>
  <div id="city" class="city height overflow-s">
    <div id="app" class="font-1 overflow-s">
      <div class="city"><!-- v-show="isShowCitys"-->
        <div class="pst-abs bg-f6 city-search">
          <input class="pst-abs bg-ff city-search-ipt" ref="cityIpt" @focus="cityIpt" v-model="ipt" placeholder="请输入城市名称，搜索城市" />
          <img class="pst-abs pos-top city-search-icon" src="../../assets/img/fill/icon_search@2x.png" />
        </div>
        <div class="zz" style="z-index: 100000;" v-show="citySearch">
          <div class="pst-abs fl bg-ff width" style="top: 4rem;z-index: 10000;">
            <div style="width: 93.5%;padding: 0 1rem;">
              <ul><!-- v-if="index!=0"-->
                <li v-for="(item,index) in allCity"  class="item city-click city-Popular-list"
                    :data-name="item.name" :data-id="item.cityId">
                  <div style="line-height: 3.5rem;height: 3.5rem;padding: 0 1rem;" class="border-1px name font-1" @touchend="touchUp(item)"  @touchstart="chooseCity()">{{item.name}}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pst-abs bg-f6" style="top: 4rem;width:100%;">
          <div class="title font-1 bg-f6 font-108 font-7b7 height-341 height-h34" style="padding-left: 1.3333333rem;">所在城市</div>
          <div class="cont fl bg-ff ellipsis_name city-Location" id="qyxs" style="">{{location}}</div>
        </div>
        <div class="city-wrapper city-wrapper-hook">
          <div class="scroller-hook">
            <div class="cities cities-hook bg-f6">
              <div v-for="(i,index) in cityData" class="">
                <div class="title font-1 city-dw" :id="i.name.substr(0, 1)">{{i.name}}</div>
                <ul v-if="index==0" class="">
                  <li v-for="item in i.cities" class="item city-click city-Popular-list " :data-name="item.name" :data-id="item.code" style="height: 0;">
                    <span class="bg-ff border-1px name font-1 Popular-city-name cont fl" @touchend="touchUp(item)"
                          @touchstart="chooseCity()"  style="width: 31%;margin: 0.5rem 0.3rem;line-height: 2.9166666rem;border-radius: 0.4rem;">{{item.name}}</span>
                  </li>
                </ul>
                <ul v-if="index!=0" class="">
                  <li v-for="item in i.cities" class="item city-click city-Popular-list" :data-name="item.name" :data-id="item.code" style="">
                    <span class="border-1px name font-1"  @touchend="touchUp(item)"  @touchstart="chooseCity()">{{item.name}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="pst-abs shortcut_home" style="right: 0rem;">
          <div class="shortcut shortcut-hook" style="position: absolute;top: 1rem;right: 0;" @touchstart="touchIndex"><!--@touchstart="touchIndex"-->
            <ul class="cont shortcut_list">
              <li v-for="i in cityData" :data-anchor="i.name.substr(0, 1)" class="item pst-rlt cont font-1 font-a39 ">
                <a :href="'#'+i.name.substr(0, 1)" style="color: #A39C9C !important;"><span class="font-189" v-if="checkName == i.name.substr(0, 1)">{{i.name.substr(0, 1)}}</span></a>
                <a :href="'#'+i.name.substr(0, 1)" style="color: #A39C9C !important;"><span v-if="checkName!=i.name.substr(0, 1) ">{{i.name.substr(0, 1)}}</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="toast" v-show="toastShow">
        {{toastText}}
      </div>
    </div>
  </div>
</template>

<script>
  import cityData from '../../assets/js/city.js'
  import BScroll from "better-scroll";
  import getping from '../../assets/js/getping.js'
  import AMap from 'AMap'
  export default {
    data () {
      return {
        direct:"",
        ipt: '',   //input的v-modle
        citySearch:false,//搜索显示
        origin: 'http://192.168.99.205:800',
        captchaBoxShow: false,
        test: '测试',
        countTime: 0,
        formTitle:"",
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
        cityData: cityData,// 数据源
        scroll: null,
        anchorMap: {},
        touch: {},
        toastShow: false,
        //isShowCitys: false,
        toastText: '',
        allCity:[],
        checkName:'热'
      }
    },
    created(){
      if(this.$route.params.direction!=""&&this.$route.params.direction!=undefined&&this.$route.params.direction!=null){
        this.direct = this.$route.params.direction;
      }
    },
    mounted() {
        //console.log(getping('我'), '111')
      /* let v = this
      this.zddw();
      v.initCities();*/
      let v = this
      v.map = new AMap.Map("container", {
        resizeEnable: true,
        //city: citycode,
        zoom: 17, //地图显示的缩放级别
        keyboardEnable: false,
        citylimit: true,
        resizeEnable: true
      })
      this.zddw()
      v.initCities()
    },
    computed:{

    },
    methods: {
        //搜索功能数据展示
      cityIpt(){     //input获焦
          this.citySearch = true;
        this.allCity = [];
        var result = [];
        for(let i=1;i<this.cityData.length;i++){
          for(let j=0;j<this.cityData[i].cities.length;j++){
            this.allCity.push(this.cityData[i].cities[j]);
          }
        }
        //console.info(this.allCity);
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
        v.countTimer = setInterval(function (e){v.countTime++},1)
        this.citySearch = false;
      },
      touchUp (item) {
        let v = this
        clearInterval(v.countTimer)
        if (v.countTime < 30) {
          //this.isShowCitys = false
          this.location = item.name
          this.submit.area_code = item.code
          this.citySearch = false;
          if(this.direct=="修改邮寄地址"||this.direct=="新增邮寄地址"){
            this.$router.push({   //返回添加地址页
              name: 'addAddress',
              params: {
                cityId: item.cityId,
                cityName: item.name,
                title: this.direct
              }
            })
          }else{
            this.$router.push({   //返回机票、火车票页
              name: 'itinerary',
              params: {
                cityId: item.cityId,
                cityName: item.name,
                direction: this.direct
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
        v.location      = csqy
        var dz          = data.regeocode.formattedAddress;
        var lng         = data.regeocode.roads[0].location.lng;
        var lat         = data.regeocode.roads[0].location.lat;
      },
      zddw() {
        //初始定位
        let v = this
        v.map.plugin('AMap.Geolocation', function() {
//            alert(11111)
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            noIpLocate: 0, //IP定位，0-3，0都可以使用
            noGeoLocation: 0, //浏览器定位 0-3,
            showCircle: false, //去除定位蓝圈
            buttonPosition: 'RT',
            extensions: 'all'
          });
          v.map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
          AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息

        });
        //解析定位结果
        function onComplete(data) {
          var str = [];
          str.push(data.position.lng);
          str.push(data.position.lat);
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress(str, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              v.geocoder_CallBack(result);
            }
          });
        }
        // 解析定位错误信息
        function onError(data) {
          //alert('定位失败,请手动选择所在区域');
        }
      },
      initCities () {
        let v = this;
        let y = 0;
        var titleHeight = 28;
        var itemHeight = 44;
        v.cityData.forEach(function(e){
          let name = e.name.substr(0, 1);
          let len = "";
          if(name == '热'){
            len = 6;
          }else{
            len = e.cities.length;
          }
          v.anchorMap[name] = y;
          y -= titleHeight + len * itemHeight;
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
        this.checkName = e.changedTouches[0].target.innerText;
       /* let v = this
        v.scrollTo(this.checkName);*/
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
/*
      btn(){
        var search = this.search;
        if (search) {
          this.searchData =  this.cityData.filter(function(product) {
            console.log(product)
            return Object.keys(product).some(function(key) {
              console.log(key)
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
      }*/
    },
    beforeRouteLeave(to, from, next) {
      if(to.path == "/addAddress") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    },
    watch: {
      ipt(newValue,oldValue){
          //console.log(newValue);
          if(newValue == ''){
              this.cityIpt();
          }
        var result = [];
        this.allCity.forEach(function(i){
          if (i.name.indexOf(newValue) != -1){
            result.push(i);
          }
        }.bind(this));
        this.allCity = result;
        return result;
      }
    },
  }
</script>

<style>
  .cities-hook div:first-child{
    /*width:100%;*/
    height: 19rem;
    background: #f6f6f6;
  }
  .cities-hook div:first-child ul li{
    padding-left: 10px;
  }
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
  .city {
    display: block;
  }
  .city .city-wrapper {
    position: absolute;
    top: 10.3rem;
    bottom: 0;
    width: 100%;
    background-color: #F6F6F6;
    height: 89%;
    overflow-y: scroll;
  }
  .city .city-wrapper .cities .title , .city-dw{
    height: 3.58333333rem;
    padding-left: 16px;
    line-height: 3.58333333rem;
    background-color: #f5f5f5;
    font-size: 1.0833333rem;
    color: #BBB7B7;
    justify-content: right;
    display: initial;
  }
  .city .city-wrapper .cities .item {
    height: 3.75rem;
    padding: 0 1.33333333333rem;
    line-height: 3.75rem;
    font-size: 1.6rem;
    background: #fff;
  }
  .city .city-wrapper .cities .item .name {
    display: block;
    position: relative;
  }
  /*.city .city-wrapper .cities .item .name:before,*/
  .city .city-wrapper .cities .item .name:after {
    display: block;
    position: absolute;
    border-top: 1px solid #f5f5f5;
    left: 0;
    width: 100%;
    content: ' ';
  }
  .city .city-wrapper .cities .item .name:before {
    /*display: none;*/
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
    /*display: none;*/
  }
  .city .shortcut_home{
    top:5.4rem;
  }
  .city .shortcut {
    position: absolute;
    z-index: 1000;
    width: 2.5rem;
    right: 0;
    font-family: Helvetica;
  }
  .city .shortcut .shortcut_list{
    width: 19px;
    text-align: left;
    padding: 20px 0
  }
  .city .shortcut .item {
    height: 1rem;
    padding-top: 1rem;
    padding-left: 0;
    text-align: center;
    font-size: 1.5rem;
    color: #A39C9C;
  }
  input::-webkit-input-placeholder {
    font-size: 1rem;
  }
  .city-Location{
    width: 26%;
    margin: 0 1rem;
    height: 2.91666666rem;
    line-height: 2.91666666rem;
    padding: 0 0.5rem;
  }
  .city-search{
    padding:1rem;
    z-index: 1000000;
    height: 9.6rem;
    width: 93.5%;
    height: 2.5rem;
  }
  .city-search-ipt{
    width: 86%;
    padding-left: 2rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .city-search-icon{
    width: 1.2rem;
    padding: 1.8rem 0.5rem 0;
  }
  @media only screen and (max-height: 600px) {
    .city .shortcut .item {
      padding-top: 1.02rem;
    }
    .city .city-wrapper .cities .item{
      padding:0 6px;
    }
  }
  @media screen and (max-width:321px){
    .city .shortcut {
      top:-35px;
    }
  }
</style>

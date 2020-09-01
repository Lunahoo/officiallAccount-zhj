<template>
  <section class="myAddress">
    <section>
      <section class="cont" @click="choseAdd()">
        <section>
          <span>所在地区：{{Province?Province:''}} {{City && City!== '请选择'?City:''}} {{District && District !== '请选择'?District:''}}</span>
        </section>
        <div style="clear: both"></div>
      </section>
    </section>
    <!-- 省市区三级联动选项 -->
    <section class="showChose width height pst-abs pos-left pos-top" v-show="showChose">
      <section class="address">
        <section class="title">
          <div class="fl font-133 pd-lf padTop-1 font-b">所在地区</div>
          <div class="fl" @click="closeAdd()">×</div>
        </section>
        <section class="title width fl font-3b9 linkPadT2">
          <div class="area" @click="provinceSelected(0)" :class="tabIndex===0?'active':''">
            {{Province?Province:'请选择'}}
          </div>
          <div class="area" @click="citySelected(1)" :class="tabIndex===1?'active':''" v-show="Province">
            {{City?City:'请选择'}}
          </div>
          <div class="area" @click="districtSelected(2)" :class="tabIndex===2?'active':''" v-show="City && hasDistrict">
            {{District?District:'请选择'}}
          </div>
        </section>
        <ul class="width font-125 mG-lft183">
          <!-- 常用城市 -->
          <div v-show="showProvince" class="frequentCity">
            <p class="frequentCityTip" v-show="showFrequentCity">常用城市</p>
            <div class="frequentCityList">
              <span class="cityName" v-for="(frequentCity, index) in frequentCitys" :key="'frequentCity'+index" @click="selectFrequentCity(frequentCity)">广州</span>
            </div>
          </div>
          <!-- 省市区列表 --><!--v.index, v.AREA_NAME, k-->
          <li class="addList font-108" v-for="(v , k) in info" @click="getProvinceId(v.pid)" v-show="showProvince">{{v.areaName}}</li><!-- :class="v.selected ? 'active' : ''"-->
          <li class="addList font-108" v-for="(v,k) in showCityList" @click="getCityId()" v-show="showCity">{{v.AREA_NAME}}</li><!--v.index, v.AREA_NAME, k-->  <!-- :class="v.selected ? 'active' : ''"-->
          <li class="addList font-108" v-for="(v,k) in showDistrictList" @click="getDistrictId()" v-show="showDistrict">{{v.AREA_NAME}}</li><!--v.index, v.AREA_NAME, k-->   <!-- :class="v.selected ? 'active' : ''"-->
        </ul>
      </section>
    </section>
  </section>
</template>
<script>
  import {findAllCityOrProvince,findDetailByPId} from '@/api/aloneC/cInterface';/*省、市、区*/
  /*findAllCityOrProvince*/
  export default {
    name: 'address',
    data () {
      return {
        showChose: false,             // 是否显示省市区弹框
        showProvince: true,           // 显示省份列表
        showCity: false,              // 显示城市列表
        showDistrict: false,          // 显示区列表
        showCityList: false,          // 城市数据列表
        showDistrictList: false,      // 区数据列表
        province: 5,                  // 当前选择的省份index
        city: 3,                      // 当前选择的城市index
        district: 57,                 // 当前选择的区index
        District: false,              // 区名字
        Province: false,              // 省名字
        City: false,                  // 城市名字
        areaProvince: '',
        areaCity: '',
        areaDistrict: '',
        tabIndex: 0,                  // 当前选择的tab下标
        hasDistrict: true,            // 是否有区
        selected: false,              // 是否选中(active)
        info: [],                     // 后台交互的省市区接口数据
        frequentCitys: [],            // 常用城市数据
        saveCityData: [],             // 存储选择的省市区的缓存数据
        showFrequentCity: false,       // 是否显示常用城市
        allProvinceList:[],           // 所有省列表信息
      }
    },
    components: {
    },
    computed: {
    },
    created () {
      // 获取省市区数据
      this.getAreaData()
      // 从缓存读取常用城市数据
      this.frequentCitys = JSON.parse(localStorage.getItem('frequentList'))
      this.saveCityData = JSON.parse(localStorage.getItem('frequentList'))
      if (!this.frequentCitys) {
        this.showFrequentCity = false
      } else {
        this.showFrequentCity = true
      }
    },
    mounted () {
    },
    methods: {
      // 获取省市区数据
      getAreaData () {
        //console.log('获取省市区数据')
        /*this.$root._axios('post', 'url', {}).then(res => {
            console.log('res', res.data.nodes)
            if (res.data.nodes.length <= 0) {
              console.log('网络异常')
            } else {
              this.info = res.data.nodes
            }
          })*/
        findAllCityOrProvince().then(res =>{
          if(res.data.code == 200){
            this.allProvinceList = res.data.data;
            //console.log(res.data.data)
            /*if (res.data.data.length <= 0) {
              //console.log('网络异常')
            }*/
          }
        },res =>{

        })
      },
      // 选择常用城市
      selectFrequentCity: function (frequentCityData) {
        console.log('frequentCityData', frequentCityData)
      },
      // 点击选择省市区
      /*choseAdd: function () {
        this.showChose = true
      },*/
      // 关闭弹框
      closeAdd: function () {
        this.showChose = false
      },
      /* eslint-disable */
      // 对选择当前的数据,进行下一级的数据的筛选
      _filter (add, name, code) {
        let result = []
        for (let i = 0; i < add.length; i++) {
          if (code == add[i].index) {
            result = add[i][name]
          }
        }
        return result
      },
      /* eslint-enable */
      // 选择省份列表
      getProvinceId (pId) {
        findDetailByPId(pId).then(res =>{
            console.log(res)
          if(res.data.code == 200){
            //console.log(res.data.data)
          }
        },res =>{

        })
       /* this.tabIndex = 1
        this.province = code
        this.Province = input
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
        if (!this.City) {
        } else {
          this.City = '请选择'
        }
        if (!this.District) {
        } else {
          this.hasDistrict = false
          this.District = '请选择'
        }
        this.showCityList = this._filter(this.info, 'city', this.province)
        // 点击选择当前
         //eslint-disable
        this.info.map(a => a.selected = false)
         //eslint-enable
        this.info[index].selected = true
        this.areaProvince = input*/
      },
      // 点击省份tab
      provinceSelected: function (index) {
        this.tabIndex = index
        // 选项页面的切换
        this.showProvince = true
        this.showCity = false
        this.showDistrict = false
      },
      // 选择城市列表
      getCityId: function (code, input, index) {
        this.tabIndex = 2
        this.city = code
        this.City = input
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
        this.District = '请选择'
        this.showDistrictList = this._filter(this.showCityList, 'district', this.city)
        console.log('this.showDistrictList', this.showDistrictList)
        // 选择当前添加active
        /* eslint-disable */
        this.showCityList.map(a => a.selected = false)
        /* eslint-enable */
        this.showCityList[index].selected = true
        this.areaCity = input
        // 判断当前选的城市是否有地区
        if (this.showDistrictList.length === 0) {
          this.hasDistrict = false
          this.showDistrict = false
          this.District = false
          this.showChose = false
          // 把选择的省市放入缓存中
          let selectCity = {}
          selectCity.province = this.Province
          selectCity.city = this.City
          selectCity.district = ''
          this.saveCityData.push(selectCity)
          localStorage.setItem('frequentList', JSON.stringify(this.saveCityData))
        } else {
          this.hasDistrict = true
          this.showDistrict = true
        }
      },
      // 点击城市tab
      citySelected: function (index) {
        this.tabIndex = index
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
      },
      // 选择区列表
      getDistrictId: function (code, input, index) {
        this.district = code
        this.District = input
        // 选择当前添加active
        /* eslint-disable */
        this.showDistrictList.map(a => a.selected = false)
        /* eslint-enable */
        this.showDistrictList[index].selected = true
        // 选取市区选项之后关闭弹层
        this.showChose = false
        this.areaDistrict = input
        // 把选择的数据放入缓存中
        let selectCity = {}
        selectCity.province = this.Province
        selectCity.city = this.City
        selectCity.district = this.District
        this.saveCityData.push(selectCity)
        localStorage.setItem('frequentList', JSON.stringify(this.saveCityData))
      },
      // 点击区tab
      districtSelected: function (index) {
        this.tabIndex = index
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
      }
    }
  }
</script>
<style>
  .myAddress {
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245, 245, 245, 1);
    color: #333;
  }
  .myAddress .cont {
    border-bottom: 1px solid rgba(245, 245, 245, 0.8);
  }
  .myAddress .cont span {
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
  }
  .myAddress .cont section {
    float: left;
  }
  .myAddress .cont img {
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
  }
  .showChose {
    z-index: 120;
    background: #666;
  }
  .address {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 121;
    background: #fff;
    width: 100%;
    height:80%;
  }
  .title h4 {
    display: inline-block;
    margin-left: 2rem;
    font-size: 0.32rem;
    line-height: 0.88rem;
    font-weight: normal;
    color: #999;
  }
  .title span {
    margin: 0.42rem 0 0 2.2rem;
    font-size: 0.45rem;
    line-height: 0.34rem;
    color: #D8D8D8;
  }
  .area {
    display: inline-block;
    font-size: 1.083rem;
    line-height: 0.88rem;
    margin-left: 0.8rem;
    color: #333;
  }
  .linkPadT2{
    padding-top: 1.8rem;
  }
  .addList {
    line-height: 3.88rem;
    height:80%;
  }
  /* 修改的格式 */
  .address ul {
    overflow: auto;
  }
  .address .title .active {
    color: #3B92EF;
    border-bottom: 0.2rem solid #3B92EF;
    padding: 0 0.6rem 0.5rem;
  }
  .address ul .active {
    color: #0071B8;
  }
  .frequentCity{
    width: 100%;
  }
  .frequentCityTip{
    text-align: left;font-size: 0.3rem;margin: 0.3rem;font-weight: bold;
  }
  .frequentCityList{
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
    flex-wrap: wrap;margin-right: 5%;margin-left: 5%;
  }
  .cityName{
    letter-spacing: 0.06rem;margin: 0.1rem 0.1rem 0.3rem 0.6rem;font-size: 0.29rem;
  }
</style>

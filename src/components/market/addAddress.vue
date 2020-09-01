<template>
  <div class="addAddress width height bg-f6" v-wechat-title="$route.meta.title=transActNameTitle">
    <div class="addAddress_detail">
      <div class="width fourWrap bg-ff" >
        <div class="mG-lft183 fourWrap_hight bd-btm">
          <div class="four_left fl font-125" >姓名</div>
          <input type="text"  class="fourContainer_input_right fr cont-r" placeholder="必填项" v-model="name" @blur="jySYS('姓名',name)">
        </div>
      </div>
      <div class="width fourWrap bg-ff" >
        <div class="mG-lft183 fourWrap_hight bd-btm">
          <div class="four_left fl font-125" >联系电话</div>
          <input type="number" pattern="\d*"  class="fourContainer_input_right fr cont-r"  placeholder="必填项" v-model="tel" @blur="jySYS('联系电话',tel)">
        </div>
      </div>
      <div class="width fourWrap bg-ff" >
      <div class="mG-lft183 fourWrap_hight bd-btm" @click="toCity">
        <div class="four_left fl font-125">所在地区</div>
        <img class="fr fourWrap_img_right " src="../../assets/img/right.png"/>
        <div class="addA-city-r fr cont-r font-125 ellipsis_name" :class="area=='必填项'?'font-7b7':'font-2a2a'" v-text="area" @blur="jySYS('所在地区',area)"><!---->
          {{this.area}}
        </div>
      </div>
    </div>
      <div class="address_region width bg-ff" >
        <!--<div class="textarea font-12 cont-r"  @click="textareaFocus">详细地址</div>-->
        <div class="textarea font-12 cont-r"  id="address_textarea" contenteditable="true"  @blur="textareaJY('详细地址',particular)" @input="particular=$event.target.innerHTML"></div>
        <!--<textarea class="fr cont-r font-12" v-model="particular" placeholder="详细地址" @blur="jySYS('详细地址',particular)"></textarea>  @focus="textareaFocus"-->
      </div>
    </div>
    <div class="addAddress_default">
      <div class="width fourWrap bg-ff" >
        <div class="mG-lft183 fourWrap_hight">
          <div class="four_left fl font-125" >设为默认地址</div>
          <!--右边按钮点击区-->
          <div class="right_btn btn-appear fr"  ref="btnAppear" @click="defaultTT">
            <input type="checkbox" class="al-toggle-button" v-model="addressDefault">
          </div>
        </div>
      </div>
    </div>
    <div class="addAddress_save width wrapcenter">
      <div class="font-col-b btn_style height width cont font-133" :class="btnColor" @click="SaveAddress">保存</div>
    </div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="setPwd_format">{{content}}</section>
      </div>
    </div>
    <!--保存成功弹框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompts]">{{contents}}</section>
      </div>
    </div>
<!--省市区联动-->
    <section class="showChose width height pos-left pos-top pst-abs" v-show="showChose">
      <section class="address">
        <section class="title">
          <div class="fl font-133 pd-lf padTop-1 font-b">所在地区</div>
          <div class="fr font-189" style="padding: 0.5rem 1.083rem;" @click="closeAdd()">确定</div>
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
        <div class="pst-abs overflow-s width" style="height: 90%;top: 7rem;">
          <ul class="width font-125 mG-lft183" style="width: 90%;">
            <!-- 省市区列表 --><!--v.index, v.AREA_NAME, k,-->
            <li class="addList font-108" v-for="(v , k) in info" @click="getProvinceId(v.id,k)" v-show="showProvince" >{{v.areaName}}</li><!--:class="v.selected ? 'active' : ''"-->
            <li class="addList font-108" v-for="(v,k) in infoCity" @click="getCityId(v.id,k)" v-show="showCity">{{v.areaName}}</li><!-- :class="v.selected ? 'active' : ''"-->
            <li class="addList font-108" v-for="(v,k) in infoArea" @click="getDistrictId(v.id,k)" v-show="showDistrict">{{v.areaName}}</li><!-- :class="v.selected ? 'active' : ''"-->
          </ul>
        </div>
      </section>
    </section>

    <!--<div  contenteditable="true" style="width:100px;height:100px;background:red;"></div>-->
  </div>
</template>
<script>
  import {addShippingAddress,eidtShippingAddress,queryShippingAddressById} from '@/api/aloneC/cInterface';/*添加/编辑人员收获地址信息、通过id查询人员收获地址*/
  import {findAllCityOrProvince,findDetailByPId} from '@/api/aloneC/cInterface';/*省、市、区*/
  export default{
      data(){
          return{
            formSource:'',
            provinces:'', //省
            Cityss:'',    //市
            Districtss:'',//区
            specialInvoiceTwo:1,  //是否设为默认地址的初始化值
            //parameterId:'',
            StaffId:'',   //通过id查询人员收货地址的数据
            content:"",
            error_prompt:"",
            addressDefault:false,
            transActNameTitle:"",
            btnColor:"op-3",
            name:"",
            tel:"",
            area:"必填项",            /*最终拼接的城市名称*/
            particular:"",      /*详细地址*/
            addressList:{},
            accessToken:"",
            parameter:{
              id:"",          /*编辑时传id*/
              shippingName:"",/*收货人姓名*/
              shippingMobile:"",/*收货人手机号*/
              provinceCode:"",/*省份名称*/
              provinceName:"",/*省份名称code*/
              cityName:"",/*城市名称*/
              cityCode:"",/*城市名称code*/
              areaName:"",/*区/县名称*/
              areaCode:"",/*区/县名称code*/
              address:"",/*详细地址*/
              type:"",/*地址类型：1.家，2.公司，3.学校等*/
              isDefault:"",/*是否默认地址 1：是；0：否*/
            },
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
            info: [],                     // 后台交互的省接口数据
            infoCity:[],                  //市区接口数据
            infoArea:[],                  //区接口数据
            frequentCitys: [],            // 常用城市数据
            saveCityData: [],             // 存储选择的省市区的缓存数据
            showFrequentCity: false,       // 是否显示常用城市
            allProvinceList:[],           // 所有省列表信息

          }
      },
    methods:{
      init(){
        if(this.$route.params.formSource != "" && this.$route.params.formSource != undefined){
          this.formSource = this.$route.params.formSource;  //预开票
          localStorage.setItem('formSource', this.formSource);
        }else if(localStorage.getItem('formSource') != undefined && localStorage.getItem('formSource') != "" && localStorage.getItem('formSource') != null&& localStorage.getItem('formSource') != 'undefined' && localStorage.getItem('formSource') != 'null'){
          this.formSource = localStorage.getItem('formSource');
        }
        this.accessToken = localStorage.getItem("userID");
        if(this.$route.params.key!=undefined && this.$route.params.key!="" && this.$route.params.key!=null && this.$route.params.key!='undefined' && this.$route.params.key!='null'){
          this.parameter.id = this.$route.params.key;
          localStorage.setItem('parameterId',this.parameter.id);
          this.parameterId = localStorage.getItem('parameterId');
          if(this.parameterId != '' && this.parameterId != null && this.parameterId != undefined && this.parameterId != 'undefined' && this.parameterId != 'null'){
            //通过id查询人员收货地址
            queryShippingAddressById(this.accessToken,this.parameterId).then(res =>{
              if(res.data.code == 200){
                this.StaffId = res.data.data;
                this.name = this.StaffId.shippingName;/*名字*/
                this.tel = this.StaffId.shippingMobile;/*手机号*/
                this.area = this.StaffId.provinceCode + " " + this.StaffId.cityName + " "  + this.StaffId.areaName;
                this.parameter.provinceCode = this.StaffId.provinceCode;/*省*/
                this.parameter.provinceName = this.StaffId.provinceName;/*省code*/
                this.parameter.cityName = this.StaffId.cityName;/*市*/
                this.parameter.cityCode = this.StaffId.cityCode;/*市code*/
                this.parameter.areaName =  this.StaffId.areaName;/*区*/
                this.parameter.areaCode = this.StaffId.areaCode;/*区code*/
                this.parameter.address = this.StaffId.address;/*详细地址*/
                this.particular = this.StaffId.address;/*详细地址*/
                document.getElementById('address_textarea').innerHTML = this.StaffId.address;/*详细地址*/
            //    this.particular = document.getElementById('address_textarea').innerHTML;
                if(this.StaffId.isDefault==1){
                  this.addressDefault = true;
                  this.specialInvoiceTwo = 0;
                  this.parameter.isDefault = 1;
                }
              }else{
                this.error_prompt="tel-message";
                this.content = res.data.msg;
              }
            },res =>{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            })
          }
        }else{
          /*if(localStorage.getItem('parameterId')!=undefined && localStorage.getItem('parameterId')!="" && localStorage.getItem('parameterId')!=null && localStorage.getItem('parameterId')!='undefined' && localStorage.getItem('parameterId')!='null'){
            this.parameterId = localStorage.getItem('parameterId');
            console.log(this.parameterId);
          }*/
        }
      },

      defaultTT(){  //是否设为默认抬头
        this.specialInvoiceTwo++;
        if(this.specialInvoiceTwo%2==1){
          this.parameter.isDefault = 0;
        }else{
          this.parameter.isDefault = 1;
        }
      },
      closeAdd(){   //关闭弹框且获取最新城市名称
        let Provinces = localStorage.getItem("Provinces");
        let Citys = localStorage.getItem("Citys");
        let Districts = localStorage.getItem("Districts");
        if(Districts!=''&&Districts!=null&Districts!=undefined){
          this.provinces =  Provinces;
          this.Cityss =  Citys;
          this.Districtss =  Districts;
        }else{  //当没有选择值的时候点击了确定，防止所在地区显示null
          this.provinces =  '';
          this.Cityss =  '';
          this.Districtss =  '';
        }
        if(this.provinces!="" && this.Cityss!="" && this.Districtss!=""){
          this.showChose = false;  //弹框关闭
          //将城市名称拼接
          this.area = this.provinces + " " + this.Cityss + " "  + this.Districtss;
        }
      },
      SaveAddress(){   //点击保存调用添加收获地址接口
        this.parameter.shippingName = this.name;
        this.parameter.shippingMobile = this.tel;
        this.parameter.address = this.particular;
          if(this.btnColor == "op-1"){ //保存按钮为亮色可点击时
              if(this.parameterId != '' && this.parameterId != null && this.parameterId != undefined && this.parameterId != 'undefined' && this.parameterId != 'null'){
                this.parameter.id = this.parameterId;
                this.accessToken = localStorage.getItem("userID");
                eidtShippingAddress(this.accessToken,this.parameter).then(res =>{
                  if(res.data.code == 200){
                    this.$router.push({name:'addressManage',});
                  }else{
                    this.error_prompt="tel-message";
                    this.content = res.data.msg;
                  }
                },res =>{
                  this.error_prompt="tel-message";
                  this.content = res.data.msg;
                })
              }else {  /*没有id值就走保存*/
                addShippingAddress(this.accessToken,this.parameter).then(res =>{
                  if(res.data.code == 200){
                    this.error_prompt="tel-message";
                    this.content = "保存成功";
                    this.$router.push({
                      name:'addressManage',
                      params:{
                        formSource:this.formSource,
                        aa:true,
                      }
                    });
                  }else{
                    this.error_prompt="tel-message";
                    this.content = res.data.msg;
                  }
                },res =>{
                  this.error_prompt="tel-message";
                  this.content = res.data.msg;
                })
              }
          }else {
            this.error_prompt="tel-message";
            this.content = "请将页面信息填写完整";
          }
      },
      addAddressTimer:function(){
        if(this.error_prompt=="tel-message"){
          this.error_prompt="trans";
        }
      },
      //公共input校验
      publiceKong(name,key){
        if(key == ""){
          this.error_prompt="tel-message";
          this.content = "请填写"+name;
        }
      },
      //按钮高亮色校验
      publiceBtn(){
          if(this.name.length>0&&this.tel.length>0&&this.area.length>0&&this.area!='必填项'&&this.particular.length>0){
            this.btnColor = "op-1";
          }else{
            this.btnColor = "op-3";
          }
      },
      jySYS(name,key){//页面失焦校验
        this.publiceKong(name,key);
      },
      textareaJY(e){
      //  let address_textareaHtml = document.getElementById('address_textarea').innerHTML;
        if(this.particular==''){
          this.error_prompt="tel-message";
          this.content = "请填写详细地址";
      //    this.particular = '';
        }else{
      //    this.particular = document.getElementById('address_textarea').innerHTML;
        }
      },
      // 点击选择省市区
      choseAdd: function () {
        this.showChose = true
      },
      toCity(k){ /*点击input显示省市区*/
        this.showChose = true;  //弹框显示
        // 获取省数据
          findAllCityOrProvince().then(res =>{
            if(res.data.code == 200){
              this.allProvinceList = res.data.data;
              if (res.data.data.length <= 0) {
                console.log('网络异常')
              } else {
                this.info = res.data.data;
              }
            }else{
              this.error_prompt="tel-message";
              this.content = res.data.msg;
            }
          },res =>{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          })
      },
      //  点击省  显示市区列表
      getProvinceId (id,k) {
        findDetailByPId(id).then(res =>{
          if(res.data.code == 200){
            this.infoCity = res.data.data[0].areaList;
            this.showProvince = false;
            this.showDistrict = false;
            this.showCity = true;
            this.Province = this.info[k].areaName;            //显示省名称
            this.parameter.provinceCode = this.Province ;     //所点击的省名称赋值[]
            this.parameter.provinceName = this.info[k].id               //所选省的code值
            localStorage.setItem("Provinces",this.Province);
            localStorage.setItem("Citys",'');
            localStorage.setItem("Districts",'');
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //点击市名称   显示区列表
      getCityId (id,k){
        findDetailByPId(id).then(res =>{
          if(res.data.code == 200){
            this.infoArea = res.data.data[0].areaList;
              if(this.infoArea.length > 0){
                this.showDistrict = true   //镇、区
                this.showCity = false   //市
                this.showProvince = false  //省
                this.City = res.data.data[0].areaName;         //显示市名称
                this.parameter.cityName = this.City;           //所点击的市名称赋值[]
                this.parameter.cityCode = res.data.data[0].id;           //所点击的市的code
                localStorage.setItem("Citys",this.City);
                localStorage.setItem("Districts",'');
                this.Districtss = "";
              }else {
                this.showDistrict = false   //镇、区
                this.showCity =  true  //市
                this.showProvince = false  //省
                this.City = res.data.data[0].areaName;/*显示市名称*/
                this.Districtss = "";
              }
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //点击选择区名称
      getDistrictId(id,k){
        findDetailByPId(id).then(res =>{
          if(res.data.code == 200){
            this.District = this.infoArea[k].areaName;        //显示市名称
            this.parameter.areaName = this.District;          //所点击的区名称赋值[]
            this.parameter.areaCode = this.infoArea[k].id;
            localStorage.setItem("Districts",this.District);
          }else{
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res =>{
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      // 点击省份tab
      provinceSelected: function (index) {
        this.District = "请选择";
        this.City = "请选择";
        this.tabIndex = index
        this.showProvince = true
        this.showCity = false
        this.showDistrict = false
      },
      // 点击城市tab
      citySelected: function (index) {
        this.District = "请选择";
        this.tabIndex = index
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
      },
      // 点击区tab
      districtSelected: function (index) {
        this.tabIndex = index
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        setInterval(this.addAddressTimer,2000);
      })
  },
    activated(){
      if(this.$route.params.cityName!=""&&this.$route.params.cityName!=undefined&&this.$route.params.cityName!=null){
        this.area = this.$route.params.cityName;
        this.transActNameTitle = this.$route.params.title;
      }
    },
    created(){
      if(this.$route.params.type=="modify" || this.$route.params.title=="修改邮寄地址"){
        this.transActNameTitle = "修改邮寄地址";
        this.parameter.id = this.$route.params.key
      }else{
        this.transActNameTitle = "新增邮寄地址";
      }
      this.init();
    },
    beforeDestroy(){
      clearInterval(this.addAddressTimer);
    },
    beforeRouteLeave(to,form,next){
        if(to.path!="/city"){
            this.$destroy();
        }
        next();
    },
    watch:{
      name(){  //姓名
          if(this.name.length>0){
            this.publiceBtn();
          }else{
            this.btnColor = "op-3";
          }
//        this.addressList.name = this.name;
      },
      tel(newValue,oldValue){  //联系电话
        if(newValue.length>11){
          this.tel=oldValue;
        }
        if(this.tel.length==11){
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
//        this.addressList.tel = this.tel;
      },
      area(){  //所在地区
        if(this.area.length>0){
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
      },
      particular(){  //姓详细地址
        if(this.particular.length>0){
          this.publiceBtn();
        }else{
          this.btnColor = "op-3";
        }
//        this.addressList.particular = this.particular;
      },
    }
  }
</script>
<style>
  .addAddress .textarea{
    width: 93%;
    outline: 0;
    caret-color: rgb(242, 210, 180);
    min-height: 4rem;
    max-height: 8rem;
    padding: 0.7rem 2%;
    text-align: right; /*justify*/
    text-justify: inter-ideograph;
  }
  .addAddress .textarea:empty:before{
    content: '详细地址';
    color: #BBB7B7;
  }
  .addAddress .textarea:focus:before{
    content:none;
  }
  .addAddress .address_region{
    /*height:5.4166666rem;*/
    height: auto;
    overflow: hidden;
  }
  .addAddress .address_region textarea{
    width: 90%;
    height:4rem;
    line-height:2rem;
    padding: 0.7rem 0;
    font-size:1.2rem;
    font-family:'Microsoft YaHei';
  }
  .addAddress .address_region textarea::-webkit-input-placeholder{
    padding-right: 1rem;

  }
  .addAddress .addAddress_default{
    margin-top:1rem;
  }
  .addAddress .addAddress_save{
    margin-top:1.3rem;
  }
  /*苹果btn样式*/
  .addAddress .right_btn{
    float: right;
    margin-right:1.66rem;
  }
  .addAddress .btn-appear{
    margin-top:0.6rem;
  }
  .addA-city-r{
    width:65%;
    line-height: 3.7rem;
    margin-right: 0.8rem;
  }
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
  @media screen and (max-width:321px){
    .addAddress .address_region{
      /*height: 7.416667rem;*/
    }
    .addAddress .address_region textarea{
      height:6rem;
    }
  }


</style>

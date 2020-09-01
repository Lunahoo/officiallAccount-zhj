<template>
    <div class="itinerary width height bg-f6">
      <p class="addInvoice-main-p addMar font-ipt font-108 height-316" style="padding: 0 1.0833333333rem;">完善信息</p>
      <div class="addInvoice-main addInvoice-main-last">
          <div class="fl bg-ff width">
            <div class="addInvoice-main-last-wid fl addInvoice-main-p font-125 bd-btm" @touchstart="setOutCity">
              <div class="fl">出发城市</div>
              <img src="../../assets/img/right.png" class="fr pst-abs itinerary-icon"/>
              <input class="addInvoice-main-p addInvoice-main-ipt font-125 fr" v-model="startC" placeholder="请选择" @blur="jyMethods(cfCity,startC)" readonly/>
            </div>
            <div class="addInvoice-main-last-wid fl addInvoice-main-p font-125 bd-btm" @touchstart="arriveCity">
              <div class="fl">到达城市</div>
              <img src="../../assets/img/right.png" class="fr pst-abs itinerary-icon"/>
              <input class="addInvoice-main-p addInvoice-main-ipt font-125 fr" v-model="endC" placeholder="请选择" @blur="jyMethods(arriveC,endC)" readonly/>
            </div>
            <div class="addInvoice-main-last-wid fl addInvoice-main-p font-125 bd-btm">
              <div class="fl">{{typeData}}</div>
              <img src="../../assets/img/right.png" class="fr pst-abs itinerary-icon"/>
              <input class="addInvoice-main-p addInvoice-main-ipt font-125 fr" :class="tripDataColor" v-model="tripData" placeholder="请选择" @click="dataChoose" readonly/>
            </div>
            <div class="addInvoice-main-last-wid fl addInvoice-main-p font-125 bd-btm">
              <div class="fl">{{trainNumber}}</div>
              <input class="addInvoice-main-p addInvoice-main-ipt font-125 fr" v-model="trainNum" placeholder="请输入" @blur="jyMethods(trainNumber,trainNum)"/>
            </div>
            <div class="addInvoice-main-last-wid fl addInvoice-main-p font-125 bd-btm">
              <div class="fl">{{ticket}}（元）</div>
              <input class="addInvoice-main-p addInvoice-main-ipt font-125 fr" v-model="trainAmt" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" v-on:keyup="onlyNumber(trainAmt)"  step="0.01" @keydown="handleInput2" maxlength="10" placeholder="请输入" @blur="jyMethods(ticket,trainAmt)"/>
            </div>
          </div>
        </div>
      <div class="fl width cont font-col-b">
        <div class="itinerary-btn font-133" :class="itineraryTJColor" @click="itineraryTJ">提交</div>
      </div>
      <p class="font-125 font-7b7" style="padding: 0 1.0833333rem;">友情提示: </p>
      <p class="font-125 font-7b7" style="padding: 0 1.0833333rem 1rem;">请仔细核对以上发票信息,确保无误后提交</p>
      <section class="zz" v-show="itinerary">
        <div class="wrapcenter">
          <div class="wrapcenter_tips bg-ff">
            <div class="wrapcenter_tips-nam cont font-12 width cont font-133">图片识别失败，请填写信息</div>
            <div class="section_bottom">
              <div class="fl cont font-133 width" style="line-height: 3.8rem;color: #F89114;" @click="itineraryCommit">确定</div>
            </div>
          </div>
        </div>
      </section>

      <!--错误提示框-->
      <div class="tel-mess" ref="telmess">
        <div class="juzhong" style="z-index: 1000;">
          <section :class="[openDataSJ.tips]" id="user_format">{{openDataSJ.tipsContent}}</section>
        </div>
      </div>

      <!--发票已存在提示框-->
      <section class="zz" v-show="itiRepeat">
        <div class="wrapcenter">
          <div class="wrapcenter_tips">
            <div class="section_top" style="line-height: 4.1rem;">该发票已存在，不能重复添加</div>
            <div class="section_bottom">
              <div class="qx_set1 font-fa font-F89" @click="itiRepeat=false">知道了</div>
            </div>
          </div>
        </div>
      </section>

    </div>
</template>
<script>
  import {addEInvoice} from '@/api/user/SignOut'
  import {distinguishImage} from "@/api/user/loginReg";
  export default {
    data() {
      return {
        itinerary:false,
        typeData:"车票日期",            //日期
        trainNumber:"车次",             //航班/车次
        ticket:"车票金额",             //机票/车票
        tripData:"",      //日期
//        flightNum:"",      //车次
//        flightMoney:"",      //行程金额
        itineraryTJColor:"op-3",
        startC:"",   //出发城市
        endC:"",    //到达城市
        trainNum:"", //车次
        trainAmt:"",// 车票金额
        itiRepeat:false,    //发票重复提示
        tripDataColor:"",
        openDataSJ:{    //开票日期校验对象
          openDate:"",
          flag:false,
          tips:"",
          tipsContent:"",
        },
        OCRinfo:{      //OCR参数    目前ocr识别不了飞机票
          companyId:localStorage.getItem("companyId"),
          typeId:"",
          imageUrl:localStorage.getItem("photoUrl")
        },
        addEInvoiceInfo:{      //添加手动输入发票参数
          "picUrl":localStorage.getItem("photoUrl"),          //扫一扫过后的发票图片
          "companyId":localStorage.getItem("companyId"),
          "companyName":localStorage.getItem("companyName"),
          "typeId":5,            // 1增值税专票 2增值税普票 3电子发票 4飞机票 5火车票 6出租车发票 7定额发票 9卷式发票
          "typeName":"火车票",
         // "invoiceStatus":3,     //1待识别 2识别中 3识别成功 4:识别失败 10报销审批中 11已报销
          "invoiceScheduleDto":{    //火车票/飞机票行程单
             "scheduleType":"",   //  行程单对象1:飞机，2：火车,
          "startCityId":"",       //出发城市ID
          "startCityName":"",    //出发城市名称
          "endCityId":"",        //到达城市id
          "endCityName":"",    //到达城市名称
          "scheduleDate":"",      //行程日期
          "flightNumber":"",        //班次号
          "ticketAmount":""           //金额
      }
        }
      }
    },
    methods: {
      onlyNumber(ele) {
        //只能输入两个小数
        ele = ele.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        let pattern_chin1 = /[\u4e00-\u9fa5]/g;
        if(ele.match(pattern_chin1)!=null){
          ele = '';
        }else{
          let reg = /^\d+(\.\d{0,2})?$/;
          if(reg.test(ele)){
            ele = parseFloat(ele);
          }else{
            ele = "";
            this.openDataSJ.tips = "tel-message";//失焦不弹出弹框
            this.openDataSJ.tipsContent = "请输入数字格式,最多两位小数";
          }
        }
      },
      timer(){
        if(this.openDataSJ.tips=="tel-message"){
          this.openDataSJ.tips="trans";
        }
      },
      handleInput2(e) {
        // 通过正则过滤小数点后两位
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
      },
      setOutCity(){   //出发城市
        let addEInvoiceInfoArr = JSON.stringify(this.addEInvoiceInfo);
        localStorage.setItem("addInvoiceSJ",addEInvoiceInfoArr);
          this.$router.push({
            name:"city",
            params:{
              direction:'setOut'
            }
          })
      },
      arriveCity(){   //到达城市
        let addEInvoiceInfoArr = JSON.stringify(this.addEInvoiceInfo);
        localStorage.setItem("addInvoiceSJ",addEInvoiceInfoArr);
        this.$router.push({
          name:"city",
          params:{
            direction:'arrive'
          }
        })
      },
      //按钮公共校验
      itineraryLight(){
        if(this.startC != "" && this.endC != "" && this.trainNum!="" && this.openDataSJ.flag == true && this.trainAmt!="" ){
          this.itineraryTJColor = "op-1";
        }else{
          this.itineraryTJColor = "op-3";
        }
      },
      //提交
      itineraryTJ(){
        if(this.itineraryTJColor == "op-1"){
          this.addEInvoiceInfo.invoiceScheduleDto.startCityName = this.startC;
          this.addEInvoiceInfo.invoiceScheduleDto.endCityName = this.endC;
          this.addEInvoiceInfo.invoiceScheduleDto.flightNumber = this.trainNum;
          this.addEInvoiceInfo.invoiceScheduleDto.scheduleDate = this.tripData;
          this.addEInvoiceInfo.invoiceScheduleDto.ticketAmount = this.trainAmt;   //金额
            addEInvoice(localStorage.getItem("userID"),this.addEInvoiceInfo).then(res =>{
              if(res.data.code == 200){
                this.$router.push({
                  name:"fill"
                })
              }else{
                if(res.data.msg == "发票已经存在"){
                  this.itiRepeat = true;
                }else{
                  this.openDataSJ.tips="tel-message";
                  this.openDataSJ.tipsContent = res.data.msg;
                }
              }
            },res =>{
              this.openDataSJ.tips="tel-message";
              this.openDataSJ.tipsContent = res.data.msg;
            })

        }
      },
      dataChoose(){
        this.$picker.show({
          type:'datePicker',
          onOk: (date) =>{
            this.tripData = date;
            this.openDataSJ.openDate = this.tripData;
            this.$fourYsJy.openDatasJY(this.openDataSJ);
            if(this.tripData == ""){
              this.openDataSJ.tips="tel-message";
              this.openDataSJ.tipsContent = "请输入行程日期";
            }
          },

        })

      },
      jyMethods(keyWords,verb){
        this.publiceJY(verb,keyWords);
      },
      //为空时的提示
      publiceJY(container,content){
        if(container == ""){
          this.openDataSJ.tips="tel-message";
          this.openDataSJ.tipsContent = "请输入"+content;
        }
      },
      //公共代码--飞机
      aircraftInfor(){
        this.typeData = "行程日期";
        this.trainNumber = "航班号";
        this.ticket = "机票金额";
      },
      //公共代码--火车
      trainInfor(){
        this.typeData = "车票日期";
        this.trainNumber = "车次";
        this.ticket = "车票金额";
      },
    },
    created(){
        if(this.$route.params.cityName!=""&&this.$route.params.cityName!=null&&this.$route.params.cityName!=undefined){   //判断是否是出发城市/达到城市返回的页面
          this.addEInvoiceInfo = JSON.parse(localStorage.getItem("addInvoiceSJ"));
          if(this.$route.params.direction == "setOut"){  //出发城市
            this.endC = this.addEInvoiceInfo.invoiceScheduleDto.endCityName;
            if(this.$route.params.cityName == this.endC){  //控制出发城市和到达城市是相同地点
              this.openDataSJ.tips="tel-message";
              this.openDataSJ.tipsContent = "出发城市和到达城市重复";
            }else{
              this.startC = this.$route.params.cityName;
            }
            this.addEInvoiceInfo.invoiceScheduleDto.startCityId = this.$route.params.cityId;
          }else{   //到达城市
            this.startC = this.addEInvoiceInfo.invoiceScheduleDto.startCityName;
            if(this.$route.params.cityName == this.startC){   //控制出发城市和到达城市是相同地点
              this.openDataSJ.tips="tel-message";
              this.openDataSJ.tipsContent = "出发城市和到达城市重复";
            }else{
              this.endC = this.$route.params.cityName;
            }
            this.addEInvoiceInfo.invoiceScheduleDto.endCityId = this.$route.params.cityId;
          }
          if(this.addEInvoiceInfo.invoiceScheduleDto.scheduleType == 1){
            this.aircraftInfor();
          }else{
            this.trainInfor();
          }
          this.tripData = this.addEInvoiceInfo.invoiceScheduleDto.scheduleDate;
          this.trainNum = this.addEInvoiceInfo.invoiceScheduleDto.flightNumber;
          this.trainAmt = this.addEInvoiceInfo.invoiceScheduleDto.ticketAmount;
        }else{
           // 页面显示飞机票还是火车票还没写
            if(this.$route.params.categId!=""&&this.$route.params.categId!=null&&this.$route.params.categId!=undefined){
              this.addEInvoiceInfo.typeId = this.$route.params.categId;
              this.OCRinfo.typeId = this.$route.params.categId;
              if(this.$route.params.categId == 4){   //飞机票
                this.aircraftInfor();
                this.addEInvoiceInfo.invoiceScheduleDto.scheduleType = 1;
                this.addEInvoiceInfo.categoryId = '201901111216';
                this.addEInvoiceInfo.categoryName = '飞机票';
              }else{   //火车票
                this.trainInfor();
                this.addEInvoiceInfo.invoiceScheduleDto.scheduleType = 2;
                this.addEInvoiceInfo.categoryId = '201901111215';
                this.addEInvoiceInfo.categoryName = '火车票';
              }
            }
            if(this.$route.params.categName!=""&&this.$route.params.categName!=null&&this.$route.params.categName!=undefined){
              this.addInvoiceType = this.$route.params.categName;
              this.addEInvoiceInfo.typeName = this.$route.params.categName;
              this.addEInvoiceInfo.typeName = this.$route.params.categName;
            }
                  distinguishImage(localStorage.getItem("userID"),this.OCRinfo).then(res =>{ //ocr识别接口
                      if(res.data.code == 200){
      //                  this.startC = res.data.data.words_result.starting_station;      //出发城市和ocr识别车站可能不一样，现在先不自动填值  后期产品对此功能进行优化
      //                  this.endC = res.data.data.words_result.destination_station;
                       /* let D = res.data.data.words_result.date.substr(8,2);
                        let M = res.data.data.words_result.date.substr(5,2);
                        let N = res.data.data.words_result.date.substr(0,4);
                        this.tripData = N +"-"+ M +"-"+ D;    */      //现在火车票日期识别还有问题，先让手动输入吧
                        this.trainNum = res.data.data.words_result.train_num;
                        this.trainAmt = this.$fourYsJy.moneyRemoveY(this.trainAmt,res.data.data.words_result.ticket_rates);

                      }
                  })
        }

    },
    updated: function () {
        if(this.tripData == "请选择"){
          this.tripDataColor = "font-7b7"; //灰色
        }else if(this.openDataSJ.flag == false){
          this.tripDataColor = "font-22d"; //红色
        }else{
          this.tripDataColor = "font-2a2a"; //黑色
        }
      this.addEInvoiceInfo.invoiceScheduleDto.startCityName = this.startC;
      this.addEInvoiceInfo.invoiceScheduleDto.endCityName = this.endC;
      this.addEInvoiceInfo.invoiceScheduleDto.flightNumber = this.trainNum;
      this.addEInvoiceInfo.invoiceScheduleDto.scheduleDate = this.tripData;
      this.addEInvoiceInfo.invoiceScheduleDto.ticketAmount = this.trainAmt;   //金额
    },
    mounted : function(){
      this.$nextTick(function(){
        setInterval(this.timer,2000);
      })
    },
    watch:{
      startC(){
        this.addEInvoiceInfo.invoiceScheduleDto.startCityName = this.startC;
        this.itineraryLight();
      },
      endC(){
        this.addEInvoiceInfo.invoiceScheduleDto.endCityName = this.endC;
        this.itineraryLight();
      },
      tripData(newValue, oldValue){    //开票日期
          if(this.tripData!=""){
            this.openDataSJ.openDate = this.tripData;
            this.$fourYsJy.openDatasJY(this.openDataSJ);
            this.itineraryLight();
          }
      },
      trainNum(newValue, oldValue){    //车次
        if(this.trainNum!=""){
          this.itineraryLight();
        }
      },
      trainAmt(){  //金额
        if(this.trainAmt!=""){
          this.itineraryLight();
        }
      }
    }
  }
</script>
<style>
  .addInvoice-main-last-wid{
    width:93%;
    margin:0 1.0833333rem;
    line-height: 3.55rem;
  }
  .addInvoice-main-ipt{
    padding: 0.8rem 1.083333333rem;
    text-align: right;
    width:50%;
  }
  .addInvoice-main-last-wid:last-child{
    border-bottom: 0;
  }
  .itinerary-icon{
    right:1.083333333rem;
    width:0.6rem;
    padding: 1.4rem 0 0 1rem
  }
  .itinerary-btn{
    margin: 2.33333333rem 1.083333333rem 1rem;
    line-height: 3.833333333rem;
    border-radius: 0.4rem;
    background: #FFA436;
  }
  .wrapcenter_tips-nam{
    height: 6.5rem;
    line-height: 6.5rem;
    border-bottom: solid 0.083rem #DDDDDD;
  }
</style>

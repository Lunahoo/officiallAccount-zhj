<template>
  <div @click="hideTSK" class="width height fl bg-f6">
    <div class="fillIn width height bg-f6">
      <div class="fill_bill_head bg-f6 height">
        <div class="fillIn-comter cont" v-if="kong">
          <img src="../../../../assets/image/news/img_blank_page@2x.png" class="errorImg">
          <p class="font-ipt pd-bt">没有收支明细～</p>
        </div>
        <div class="fillIn-Adminis" ref="kong" v-else="!kong">
          <!--有票状态-->
          <div class="fillIn-invoice fillIn-invoice1" >
            <v-scroll :onLoadMore="onLoadMore" :dataList="scrollData" style="height: 99%">
              <div class="bg-f6" id="backstage" ref="backstage">
                <div v-for="(item1,index1) in listdata" @click="toQueryBudgetDetail(item1.tradeBusiCode,item1.transActName,item1.companyName,item1.tradeCate,item1.flag)">
                  <div class="invoiceAdmin-main-p bg-ff fl font-1">
                    <div class="fl" style="width:75%;">
                      <div class="fl">
                        <div class="fl width invoiceAdmin-main-mon">
                          <div class="fl font-133 font-b">{{item1.transActName}}</div>
                          <div class="fl font-108" style="padding-left: 0.5rem;" v-if="item1.companyName!=undefined && item1.companyName!=''">-{{item1.companyName}}</div>
                        </div>
                        <div class="font-7b7 width" style="padding-top: 3rem;">{{item1.beginTime| parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div><!--invoiceDate-->
                      </div>
                    </div>
                    <div class="fr font-s15" style="line-height: 7.6666666667rem;">
                      <span class="font-F89" v-if="item1.flag=='AT00002'">+{{item1.tradeAmount|money}}</span>
                      <span v-if="item1.flag=='AT00001'">-{{item1.tradeAmount|money}}</span>
                    </div>
                  </div>
                </div>
                <div v-for="(item1,index1) in downdata" :key="index1" @click="toQueryBudgetDetail(item1.name.tradeBusiCode,item1.name.transActName,item1.name.tradeCate,item1.name.flag)">
                    <div class="invoiceAdmin-main-p bg-ff fl font-1">
                      <div class="fl" style="width:75%;" >
                          <div class="fl width invoiceAdmin-main-mon">
                            <div class="fl font-133 font-b">{{item1.name.transActName}}</div>
                            <div class="fl font-1" style="padding-left: 0.5rem;" v-if="item1.name.companyName!=undefined && item1.name.companyName!=''">-{{item1.name.companyName}}</div>
                          </div>
                          <div class="font-7b7 width" style="padding-top: 3rem;">{{item1.name.beginTime| parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
                      </div>
                    <div class="fr font-s15" style="line-height: 7.6666666667rem;">
                      <span class="font-F89" v-if="item1.name.flag=='AT00002'">+{{item1.name.tradeAmount|money}}</span>
                      <span v-if="item1.name.flag=='AT00001'">-{{item1.name.tradeAmount|money}}</span>
                    </div>
                    </div>
                </div>
              </div>
            </v-scroll>
          </div>
        </div>
      </div>
    </div>
    <div class="Loading" v-if="Loading"><img src="../../../../assets/img/Loading/loading.gif"></div>
    <!--错误提示框-->
    <div class="tel-mess" ref="telmess">
      <div class="juzhong" style="z-index: 1000;">
        <section :class="[error_prompt]" id="user_format">{{content}}</section>
      </div>
    </div>
  </div>
</template>
<script>
  import loadmore from "./scroll.vue";/*上拉下拉*/
  import {budgetPage} from '@/api/aloneC/cInterface'//明细
  import longtap from '../../../account/onRefresh.vue';
  function getStyle(obj, attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj, false)[attr];
    }
  };
  export default {
    name: 'Administration',
    data() {
      return {
        Loading:false,//
        article:"收支明细列表",
        show:false,
        kong:true,        //控制空状态或者有票状态
        count:1,              //下拉刷新的次数
        error_prompt:"",/*提示框*/
        content:"",
        /************************分页**************************/
        counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        num : 20,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: [],  // 上拉更多的数据存放数组
        scrollData:{
          noFlag: false //暂无更多数据显示
        },
        /**************************************************/
        alldata:[],
        typeId:"",
        accessToken:"",
        dataB:1,                     //长按拖动次数控制
        queryDataparms:{
          companyId:"",
          canTransfer:"",
          balanceType:""
        }
      }
    },
    methods:{
      //获取全部发票列表信息==新接口（已知企业用户的情况下）
      init(){
        this.accessToken = localStorage.getItem("userID");
        this.Loading = true;
        budgetPage(this.accessToken,this.queryDataparms).then(res =>{
          this.Loading = false;
          if(res.data.code == 200) {
              if(res.data.data==null || res.data.data=='null'){
                this.kong = true;
              }else{
                this.alldata = res.data.data.tradeFlowList;
                if(this.alldata == null || this.alldata == "" || this.alldata.length==0){
                  this.kong = true;
                }else{
                  this.kong = false;
                  this.listdata = this.alldata.slice(0,this.num);
                }
              }
          }else{
            this.kong = true;
            this.error_prompt="tel-message";
            this.content = res.data.msg;
          }
        },res=>{
          this.kong = true;
          this.error_prompt="tel-message";
          this.content = res.data.msg;
        })
      },
      //to收支明细详情页
      toQueryBudgetDetail(tradeBusiCode,transActName,companyName,tradeCate,flag){
         this.$router.push({name:'budgetDetail',params:{tradeBusiCode:tradeBusiCode,transActName:transActName,companyName:companyName,tradeCate:tradeCate,flag:flag}});
      },
      onLoadMore(done) {
        this.counter++;
        let end = this.pageEnd = this.num * this.counter;
        let i = this.pageStart = this.pageEnd - this.num;
        let alldata = this.alldata;
        setTimeout(() => {
          for(i; i < end; i++) {
            if(i >= alldata.length) {
              //走完数据调用方法
              this.scrollData.noFlag = true;
              break;
            } else {
              this.downdata.push({
                name:alldata[i]
              });
            }
          }
          done();
        }, 500);
      },
      onRefresh(done) {
        this.$set(this.listdata,this.listdata);
        done() // call done
      },
      //页面刷新加载
      onInfinite(done) {
        this.dataB++;
        this.sj.pageSize = this.num;
        let startPage = this.count*this.num;
        this.count++;
        for(let i=startPage;i<this.alldata.length;i++){
          if(i< (startPage + this.num) ){
            this.listdata.push(this.alldata[i]);
          }else{
            return false;
          }
        }
      },
    },
    components: {/*上拉下拉功能的方法*/
      'v-scroll': loadmore
    },
    created(){
        this.init();
      if(this.$route.params.companyId!=undefined && this.$route.params.companyId!='undefined' &&this.$route.params.companyId!=null && this.$route.params.companyId!="null"){
        this.queryDataparms.companyId =this.$route.params.companyId;
      }else{
        if(localStorage.getItem('QDetailCompanyId')!=undefined && localStorage.getItem('QDetailCompanyId')!='undefined' && localStorage.getItem('QDetailCompanyId')!=null && localStorage.getItem('QDetailCompanyId')!='null' && localStorage.getItem('QDetailCompanyId')!=''){
          this.queryDataparms.companyId = localStorage.getItem('QDetailCompanyId')
        }else{
          this.queryDataparms.companyId = "";
        }
      }
      if(this.$route.params.balanceType!='' && this.$route.params.balanceType!=null && this.$route.params.balanceType!='null' && this.$route.params.balanceType!=undefined && this.$route.params.balanceType!='undefined'){
        this.queryDataparms.balanceType = this.$route.params.balanceType;
        localStorage.setItem('balanceType',this.balanceType);
      }else{
        this.queryDataparms.balanceType = localStorage.getItem("balanceType");
      }
    },
    //当页面跳转时清除定时器
    beforeRouteEnter(to,from,next){
      let self = this;
      if(from.path == "/voucherEnterprise"){
        if(localStorage.getItem('getCompanyId')!=undefined && localStorage.getItem('getCompanyId')!='undefined' && localStorage.getItem('getCompanyId')!=null && localStorage.getItem('getCompanyId')!='null' && localStorage.getItem('getCompanyId')!=''){
          localStorage.setItem('QDetailCompanyId',localStorage.getItem('getCompanyId'));
        }
        next();
      }else{
        localStorage.setItem('QDetailCompanyId','undefined');
        next();
      }
    },
  }
</script>
<style scoped>
  /*v-scroll状态区*/
  .fillIn .fillIn-invoice1 #backstage{
    padding: 0;
    padding-bottom: 7rem;
  }
  .fillIn #backstage p{
    line-height: 2.5rem;
    font-size: 1rem;
    color: #A39C9C;
    margin-top: 1rem;
  }
  .fillIn{
    background:#fff;
  }
  .fillIn #ul li span{
    position:absolute;
    left:50%;
    top:55%;
    color:#fff;
    margin-left:-2rem;
  }
  .fillIn .bxFootbar-conter .fp p,.bxFootbar-conter .bx p{
    line-height: 0.9rem;
  }
  .fillIn .bxFootbar-conter .fp img,.bxFootbar-conter .bx img {
    padding-left: 42%;
  }
  .fillIn .bxFootbar-conter .fp img,.bxFootbar-conter .bx img{
    width: 2.3rem;
  }
  .fillIn-conter .phone-mask .phone-Pupop p{
    line-height: 4.166667rem;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon img{
    width: 2.5083333rem;
    padding-left: 33%;
  }
  .fillIn-conter .fillIn-mask .fillIn-Popup .fillIn-add .fillIn-icon p{
    font-size: 1rem;
  }

  .fillIn .simpleReim_footer section{
    height:3.75rem;
  }
  .fillIn .simpleReim_footer p{
    transform:translateY(-5px);
  }
  .fillIn .simpleReim_footer img{
    width:2.2rem;
    height:2.2rem;
    display: inline-block;
  }
  .invoiceAdmin-main-p{
    border-bottom: 1px solid #E5E5E5;
    padding: 0 1rem;
    width:93%;
    height: 5.6666666667rem;
  }
  .invoiceAdmin-main-mon{
    line-height: 2.16666667rem;
    padding-top: 1rem;
  }
  @media screen and (max-width:321px){
  }
  @media screen and (max-width:815px)and (min-width: 450px){
    .fillIn-comter img{
      padding-left: 34%;
      width: 20rem;
    }
    .fillIn-comter{
      font-size: 1.5rem;
    }
  }
</style>

<template>
    <div class="switchEnterprise width height bg-f6">
        <div class="switchEnterprise_main fl width">
            <div class="switchEnterprise_main_title font-ipt">所属企业</div>
            <div class="bg-ff fl width height-375">
                <div class="switchEnterprise_main_name bd-btm " >
                  <div class="fl width">
                    <div class="switchEnterprise_main_check fl font-125 width"  @click="checkD(item.id)" v-for="(item,index) in userDataInfo.companyList" :key="index">
                      <span v-if="index==0" class="switchEnterprise_child_name" :id="item.id+'nameCheck'">{{item.companyName}}</span>
                      <span v-if="index!=0" class="switchEnterprise_child_name_nocheck" :id="item.id+'nameCheck'">{{item.companyName}}</span>
                      <img class="fr switchEnterprise_main_img" v-if="index==0" :id="item.id+'main_img'" src="../../assets/img/account/icon_check@2x.png"/>
                      <img class="fr switchEnterprise_main_img" v-if="index!=0" style="display: none" :id="item.id+'main_img'" src="../../assets/img/account/icon_check@2x.png"/>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      <div class="fl width" style="height: 50%" @click="checkS"></div>
    </div>
</template>
<script>
  import {queryMemberNew} from '@/api/user/userLogin'
  export default {
    name: 'switchEnterprise',
    data() {
      return {
        toke:'',
        item:'',
        userDataInfo:{
          companyList:[
            {id:"1",companyName:"上海淘略数据处理有限公司"},
            {id:"2",companyName:"上海广略外包服务有限公司"},
            {id:"3",companyName:"上海砾洲医学科技责任有限公司"},
            {id:"4",companyName:"上海淘略信息科技有限公司"},
          ]
        },
      }
    },
    methods: {
      init(){
        queryMemberNew(localStorage.getItem("userID"),localStorage.getItem('companyId')).then(res => {
          if (res.data.code == 200) {
            //console.log(res.data.data);
            this.userDataInfo = res.data.data;
          }
        }, res => {
        });
      },
      checkD(id){
        let companyNames = document.getElementsByClassName('switchEnterprise_child_name');
        if(companyNames.length>0){
            for(let i=0;i<companyNames.length;i++){
              companyNames[i].setAttribute('class','switchEnterprise_child_name_nocheck');
            }
        }
        document.getElementById(id+'nameCheck').setAttribute('class','switchEnterprise_child_name');
        let checkImg = document.getElementsByClassName('switchEnterprise_main_img');
        if(checkImg.length>0){
          for(let i=0;i<checkImg.length;i++){
            checkImg[i].style.display = 'none';
          }
        }
        document.getElementById(id+'main_img').style.display = 'block';
      },
      checkS(){

      }
    },
    created(){
      /*this.init()*/
    }
  }
</script>
<style>
  .switchEnterprise_main_title{
    line-height: 3rem;
  }
  .switchEnterprise_main_title,.switchEnterprise_main_name{
    margin:0 1.083333rem;
  }
  .switchEnterprise_main_img{
    width: 1.333333rem;
    padding-top: 1.15rem;
  }
  .switchEnterprise_main_name a:hover .switchEnterprise_main_check{
    color: #3B92EF;
  }
  .switchEnterprise_main_check .switchEnterprise_child_name{
    color:#3B92EF
  }
</style>

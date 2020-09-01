<template><!--账单详情-->
    <div class="BillDetails">
      <div class="">
        <div class="cont fl width" style="padding-top: 1.6333rem;">
          <img class="BillDetails-title-img pst-abs" style="" src="../../assets/img/icon_SimpleReimbursement_pressed.png" />
          <div class="font-133 BillDetails-line-3">消费-购物</div>
          <div style="font-size: 2.08333rem;">-1940.00</div>
          <div class="font-ipt font-1">消费成功</div>
        </div>
        <div class="fl four_father">
          <div class="fl width font-108 bd-btm BillDetails-line-3">
            <div class="fl bg-ff width">
              <div class="fl font-ipt">付款方式</div>
              <div class="fr">消费券</div>
            </div>
            <div class="fl bg-ff width">
              <div class="fl font-ipt">税号</div>
              <div class="fr">91310101351089801H</div>
            </div>
            <div class="fl bg-ff width">
              <div class="fl font-ipt">发票内容</div>
              <div class="fr">*服务费*代理服务费</div>
            </div>
            <div class="fl bg-ff width">
              <div class="fl font-ipt">发票金额</div>
              <div class="fr">2039.02元</div>
            </div>
            <div class="fl bg-ff width">
              <div class="fl font-ipt">申请时间</div>
              <div class="fr">2018.12.19 星期一 09:25</div>
            </div>
          </div>
          <div class="fl font-108 bd-btm width">
            <div class="fl bg-ff width BillDetails-list BillDetails-line-3">
              <div class="fl font-ipt">商户信息</div>
              <div class="fr">京东</div>
            </div>
            <div class="fl" v-show="BInformation">
              <p class="font-ipt">商品信息</p>
              <div class="BInformation overflow-h" ref="open">
                <div class="fl bg-ff width BillDetails-list">
                  <div class="fl BillDetails-list-l">GUCCI 古驰 女裝 粗条纹针织短袜4528173G610</div>
                  <div class="fr">
                    <p>￥800.00</p>
                    <p class="BillDetails-l-p">×1</p>
                  </div>
                </div>
                <div class="fl bg-ff width BillDetails-list">
                  <div class="fl BillDetails-list-l">POLA 宝丽 AROMA ESS GOLD 沐浴乳 460毫升</div>
                  <div class="fr">
                    <p>￥800.00</p>
                    <p class="BillDetails-l-p">×1</p>
                  </div>
                </div>
                <div class="fl bg-ff width BillDetails-list">
                  <div class="fl BillDetails-list-l">sisley 希思黎 全能乳液125毫升</div>
                  <div class="fr">
                    <p>￥800.00</p>
                    <p class="BillDetails-l-p">×1</p>
                  </div>
                </div>
                <div class="fl bg-ff width BillDetails-list">
                  <div class="fl BillDetails-list-l">Sephora/丝芙兰染唇膏不易脱色口红染唇液唇膏唇彩釉</div>
                  <div class="fr">
                    <p>￥800.00</p>
                    <p class="BillDetails-l-p">×1</p>
                  </div>
                </div>
                <div class="fl bg-ff width BillDetails-list">
                  <div class="fl BillDetails-list-l">赠品-沐浴露</div>
                  <div class="fr">
                    <p>￥800.00</p>
                    <p class="BillDetails-l-p">×1</p>
                  </div>
                </div>
              </div>
              <div class="BillDetails-list-all BillDetails-line-3 cont font-3b9" @click="seeWhole">
                <div v-show="BillOpen" @click="alllopen">展开全部</div>
                <div v-show="!BillOpen" @click="Retract">收起全部</div>
              </div>
            </div>

          </div>
        </div>
        <div class="fl width  BillDetails-list">
          <p class="font-ipt four_father">消费券使用</p>
          <div class="BInformation overflow-h four_father">
            <div class="fl bg-ff width BillDetails-list">
              <div class="fl BillDetails-list-l">个人电商券</div>
              <div class="fr">-940.00</div>
            </div>
            <div class="fl bg-ff width BillDetails-list">
              <div class="fl BillDetails-list-l">个人通用券</div>
              <div class="fr">-1000.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        BillOpen:false,/*展开收起*/
        BInformation:false,/*商品信息*/
      }
    },
    methods: {
      seeWhole(){/*展开和收起*/
        this.BillOpen = !this.BillOpen;
      },
      alllopen(){
        this.$refs.open.style.cssText="height: ;"
      },
      Retract(){
        this.$refs.open.style.cssText="height:12rem;"
      }
    },
    created(){

    },
  }
</script>
<style>
  .BillDetails-title-img{
    top: 1.75rem;
    width: 2.5rem;
    left: 30%;
  }
  .BillDetails-list-l{
    width:70%;
  }
  .BillDetails-list{
    padding:0.5rem 0;
  }
  .BillDetails-l-p{
    text-align: right;
  }
  .BillDetails-line-3{
    line-height: 3rem;
  }
  .BInformation{
    /*height: 10rem;*/
  }
  @media screen and (max-width:321px){

  }
</style>

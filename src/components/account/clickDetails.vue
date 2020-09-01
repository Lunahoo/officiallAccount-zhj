<template>
    <div class="addElectronic width height bg-f6">
      <div class="addElectronic-conter width">
        <div class="paddET-c-p font-a39 bg-ff">
          <p class="addET-line-h bd-btm">电子发票地址</p>
          <div class="">
            <textarea readonly="readonly" class="text-height width font-166 textStyle" v-model="this.picUrl"></textarea>
          </div>
        </div>
        <div class="paddET-c-Remarks bg-ff font-a39">
          <p class="addET-line-h bd-btm">发票备注</p>
          <div class="">
            <textarea readonly="readonly" class="text-height width font-166 textStyle" name="suggestions-text" id="textarea"v-model="this.remark"></textarea>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'addElectronic',
    data () {
      return {
        picUrl:'',
        remark:'',
      }
    },
    created(){
      this.$root.$data.vBack=true;
      this.$root.$data.article = '电子发票';
      this.picUrl= this.$route.params.picUrl;
      this.remark = this.$route.params.remark;
    },
    methods: {

    },
  }
</script>
<style>
  .addElectronic{
    transition:transform .1s;
  }
  .addElectronic .addElectronic-conter{
    padding-top: 1rem;
  }
  .addElectronic .addElectronic-conter .paddET-c-p,.addElectronic .addElectronic-conter .paddET-c-Remarks{
    padding: 0 1.0833333rem;
    margin-bottom: 1rem;
    position: relative;
  }
  .addElectronic .addElectronic-conter .paddET-c-p  .addET-line-h,.addElectronic .addElectronic-conter .paddET-c-Remarks .addET-line-h{
    line-height: 2.833333rem;
    font-size: 1.25rem;
  }
</style>

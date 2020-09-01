import Vue from 'vue'
const focus = Vue.directive('focus',{
  inserted:function (el) {
    el.focus();
  }
})

export {focus}

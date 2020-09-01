/**
 * Created by DELL on 2018/7/30.
 */
export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update(el, binding, vnode) {},
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};

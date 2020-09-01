/**
 * Created by DELL on 2018/7/30.
 */
import jquery from './jquery-1.11.3'
$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      callback && callback.call(this);
      $(this).removeClass('animated ' + animationName);
    });
  }
});

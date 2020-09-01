
(function(t){
  var doc = t.documentElement;
  var curDeviceWidth = doc.clientWidth||window.innerWidth;
  doc.style.fontSize = curDeviceWidth * (12/375) + 'px';
})(document)

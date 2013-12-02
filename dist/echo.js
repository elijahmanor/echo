/*!
 *  Echo v1.3.0
 *  Lazy-loading images with data-* attributes
 *  Project: https://github.com/toddmotto/echo
 *  by Todd Motto: http://toddmotto.com
 *  Copyright. MIT licensed.
 */
window.Echo = (function (window, document, undefined) {

  'use strict';

  var store;

  var _inView = function (img) {
    var coords = img.getBoundingClientRect();
    return (coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight);
  };

  var _pollImages = function () {
    for (var i = 0; i < store.length; i++) {
      var self = store[i];
      if (_inView(self)) {
        self.src = self.getAttribute('data-echo');
        if (_hasItem(store, self)) {
          store.splice(i, 1);
          console.log('store.length: ' + store.length);
        }
      }
    }
  };

  var _hasItem = function(items, item) {
    var found = false;
    for (var i = 0, len = items.length; i < len && !found; i++) {
      if (items[i] === item) { found = true; }
    }
    return found;
  };

  var _toArray = function(nodes) {
    var array = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
      array.push(nodes[i]);
    }
    return array;
  };

  var init = function () {
    store = _toArray(document.querySelectorAll('[data-echo]'));
    _pollImages();
    window.onscroll = _pollImages;
  };

  return {
    init: init
  };

})(window, document);

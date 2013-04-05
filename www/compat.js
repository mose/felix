var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

var removeEvent = (function () {
  if (document.removeEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.removeEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          removeEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.detachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          removeEvent(el[i], type, fn);
        }
      }
    };
  }
})();

var extend = function(to, from, overwrite) {
  var prop, hasProp;
  for (prop in from) {
    hasProp = to[prop] !== undefined;
    if (hasProp && typeof from[prop] === 'object' && from[prop].nodeName === undefined) {
      if (isDate(from[prop])) {
        if (overwrite) {
          to[prop] = new Date(from[prop].getTime());
        }
      } else if (isArray(from[prop])) {
        if (overwrite) {
          to[prop] = from[prop].slice(0);
        }
      } else {
        to[prop] = extend({}, from[prop], overwrite);
      }
    } else if (overwrite || !hasProp) {
      to[prop] = from[prop];
    }
  }
  return to;
};

var fireEvent = function(el, eventName, data) {
  var ev;
  if (document.createEvent) {
    ev = document.createEvent('HTMLEvents');
    ev.initEvent(eventName, true, false);
    ev = extend(ev, data);
    el.dispatchEvent(ev);
  } else if (document.createEventObject) {
    ev = document.createEventObject();
    ev = extend(ev, data);
    el.fireEvent('on' + eventName, ev);
  }
};

var trim = function(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
};

var hasClass = function(el, cn) {
  return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
};

var addClass = function(el, cn) {
  if (!hasClass(el, cn)) {
      el.className = (el.className === '') ? cn : el.className + ' ' + cn;
  }
};

var removeClass = function(el, cn) {
  el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
};


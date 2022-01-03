//
// jrf_id_fix.js
//
// Fix jumpbytitle.html to id2url.cgi.
//
var VERSION_jrf_id_fix = "0.0.1"; // Time-stamp: <2022-01-02T18:32:34Z>

//
// License:
//
//   Public Domain.
//
// Author's Link:
//
//   http://jrf.cocolog-nifty.com/software/
//   (The page is written in Japanese.)
//

//'use utf8'; // Japanese

(function () {
  var add_event_listener = function (el, etype, func, prp) {
    if (prp == null) {
      prp = false;
    }
    if (el.addEventListener) {
      el.addEventListener(etype, func, prp);
    } else if (el.attachEvent) {
      el.attachEvent("on" + etype, func);
    } else {
      el["on" + etype] = func;
    }
  };

  var fix_id = function () {
    var i, a;
    var OLD_URL = "http://jrf.cocolog-nifty.com/statuses/jumpbytitle.html?q=";
    var NEW_URL = "http://jrockford.s1010.xrea.com/cocolog_helper/id2url.cgi?q=";

    var l = document.getElementsByTagName('a');
    for (i = 0; i < l.length; i++) {
      a = l[i];
      if (! a.href) {
	continue;
      }
      if (a.href.length >= OLD_URL.length
	  && a.href.substring(0, OLD_URL.length) == OLD_URL) {
	a.href = NEW_URL + a.href.substring(OLD_URL.length);
      }
    }
  };

  add_event_listener(window, "load", fix_id, false);
})();

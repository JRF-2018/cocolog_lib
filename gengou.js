//
// gengou.js
//
// Functions to rewrite dates in Japanese era.
//
var VERSION_gengou = "0.04"; // Time-stamp: <2019-04-28T01:47:20Z>

//
// License:
//
//   I in a provincial state made this program intended to be public-domain. 
//   But it might be better for you like me to treat this program as such 
//   under the (new) BSD-License or under the Artistic License.
//
//   Within three months after the release of this program, I
//   especially admit responsibility of effort for rational request of
//   correction to this program.
//
// Author's Link:
//
//   http://jrf.cocolog-nifty.com/software/
//   (The page is written in Japanese.)
//

//'use utf8'; // Japanese
//
//'require "http://svn.coderepos.org/share/lang/javascript/javascript-xpath/trunk/release/javascript-xpath-latest.js"
//'provide "http://jrf.cocolog-nifty.com/archive/lib/gengou.js"';

// 旧式のブラウザ用の xpath.js のロード元を指定。
var GENGOU_XPATH_JS = "http://jrf.cocolog-nifty.com/archive/lib/javascript-xpath-0.1.12.js";

// 日付のフォーマットは strftime 風。%G だけ違って、それが和暦の年にあたる。
var Gengou = [
  // 私が生きてて管理可能ならここを毎期書き改めるはず。
//  [null, "2019-05-02", null], 
  ["令和%(半)G年(%Y年) %_m月%_d日", "2019-05-01", null],
  ["平成%(半)G年(%Y年) %_m月%_d日", "1989-01-08", "2019-04-30"]
  // 漢数字にしたいときは直上の行の先頭に // を書いて↓の先頭の // を削る。
//  ["平成%(数)G年%(和)m%(数)d日", "1989-01-08", null]
];

var GENGOU_DEFAULT_FORMAT = "%Y年%_m月%_d日";
var GENGOU_IGNORE_REGEXP = /^(?:.+暦|A\.D\.|B\.C\.|BC|AD)$/;

// テスト用
// 日付のフォーマットの拡張として %(数)Y などとすると漢数字で表示できる。
// 半角数字で「元年」のみ漢字にしたいときは %(半)G とする。
// 旧月名での表示は %(和)m とする。
/*
var Gengou = [
  [null, "2013-01-01", null],
  ["もも%(数)G年(%(漢)Y年) %(和)m%(全)-d日", "2010-04-02", "2012-12-31"],
  ["くり%(半)G年(%(数)Y年) %02m月%2d日", "2008-04-02", "2010-04-01"],
  ["かき%G年(%Y年) %m月%d日", "2006-09-11", null]
];
*/

var GENGOU_LANG_MONTH = {
  'English': ("January February March April May June"
	      + "July August September October November December")
    .split(/\s+/),
  'en.': ("Jan. Feb. Mar. Apr. May Jun."
	  + "Jul. Aug. Sep. Oct. Nov. Dec.")
    .split(/\s+/),
  'en': ("Jan Feb Mar Apr May Jun"
	 + "Jul Aug Sep Oct Nov Dec")
    .split(/\s+/),
  'ja': "睦月 如月 弥生 卯月 皐月 水無月 文月 葉月 長月 神無月 霜月 師走"
    .split(/\s+/),
  '和': "睦月 如月 弥生 卯月 皐月 水無月 文月 葉月 長月 神無月 霜月 師走"
    .split(/\s+/)
};

if (! window["bind"]) {
  window["bind"] = function (f, o) {
    return function() {return f.apply(o, arguments)};
  };
}

if (! window["add_event_listener"]) {
  window["add_event_listener"] = function (el, etype, func, prp) {
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
}

if (! window["add_event_listener"]) {
  window["add_event_listener"] = function (el, etype, func, prp) {
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
}

if (! window["pad_left"]) {
  window["pad_left"] = function (s, num, pad) {
    s = s.toString();
    var r = s;
    for (var i = 0; i < num - s.length; i++) {
      r = pad + r;
    }
    return r.substr(r.length - num, num);
  };
}

if (! window["date_le"]) {
  window["date_le"] = function (a, b) {
    if (a.year < b.year
	|| (a.year == b.year
	    && (a.month < b.month
		|| (a.month == b.month
		    && a.day <= b.day)))) {
      return true;
    } else {
      return false;
    }
  };
}

function rewrite_gengou_to_kanji_number (num) {
  var r = "";
  var s = num.toString();
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (c.match(/^[01-9]$/)) {
      r += "〇一二三四五六七八九".charAt(parseInt(c, 10));
    } else {
      r += c;
    }
  }
  return r;
}

function rewrite_gengou_to_zenkaku_number (num) {
  var r = "";
  var s = num.toString();
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (c.match(/^[01-9]$/)) {
      r += "０１２３４５６７８９".charAt(parseInt(c, 10));
    } else {
      r += c;
    }
  }
  return r;
}
  
function rewrite_gengou_to_kansuuji (num) {
  var scale_10 = "十 百 千".split(/\s+/);
  var scale_10000 = "万 億 兆 京 垓 𥝱 穣 溝 澗 正 載 恒河沙 阿僧祇 那由他 不可思議".split(/\s+/);
  var char_zero = "零";
  var char_inf = "無量大数";
  var n10000 = num % 10000;
  var p10000 = Math.floor(Math.log(num) / Math.log(10000));
  if (num == 0) {
    return char_zero;
  }
  if (p10000 - 1 >= scale_10000.length) {
    return char_inf;
  }
  var r = "";
  for (var p = 0; p < scale_10000.length; p++) {
    var base = Math.pow(10000, p);
    var n = Math.floor(num / base) % 10000;
    if (p != 0 && n != 0) {
      r = scale_10000[p - 1] + r;
    }
    if (n == 0) {
      continue;
    }
    var n1 = n % 10;
    var n10 = Math.floor(n / 10) % 10;
    var n100 = Math.floor(n / 100) % 10;
    var n1000 = Math.floor(n / 1000) % 10;
    if (n1 != 0) {
      r = "一二三四五六七八九".charAt(n1 - 1) + r;
    }
    if (n10 != 0) {
      r = "十" + r;
      if (n10 != 1) {
	r = "一二三四五六七八九".charAt(n10 - 1) + r;
      }
    }
    if (n100 != 0) {
      r = "百" + r;
      if (n100 != 1) {
	r = "一二三四五六七八九".charAt(n100 - 1) + r;
      }
    }
    if (n1000 != 0) {
      r = "千" + r;
      if (n1000 != 1) {
	r = "一二三四五六七八九".charAt(n1000 - 1) + r;
      }
    }
  }
  return r;
}

function rewrite_gengou__sw_num(sel, zdef, paddef, opt, date) {
  var num = date[sel];
  if (opt.mod2 == '_' && opt.pad == null) {
    opt.pad = paddef;
    opt.zflag = false;
  } else if (opt.mod2 == '-' && opt.pad == null) {
    opt.pad = paddef;
    opt.zflag = true;
  }
  if (opt.zflag == null) {
    opt.zflag = zdef;
  }
  if (sel == 'month' && opt.mod1 && GENGOU_LANG_MONTH[opt.mod1]) {
    var c = GENGOU_LANG_MONTH[opt.mod1][num - 1];
    if (c) {
      return c;
    } else {
      return null;
    }
  }
  var c;
  var pad_char = (opt.zflag)? "0" : " ";
  var len;
  if (num == 1 && ! opt.zflag && sel == 'gyear'
      && (opt.mod1 == '数' || opt.mod1 == '漢' || opt.mod1 == '半')) {
    c = '元';
  } else if (opt.mod1 == '数') {
    c = rewrite_gengou_to_kansuuji(num);
  } else if (opt.mod1 == '漢') {
    c = rewrite_gengou_to_kanji_number(num);
    if (opt.zflag) {
      pad_char = "〇";
    }
  } else if (opt.mod1 == '全') {
    c = rewrite_gengou_to_zenkaku_number(num);
    if (opt.zflag) {
      pad_char = "０";
    }
  } else {
    c = num.toString();
  }
  if (c) {
    if (opt.pad != null) {
      if (c == '元' && opt.mod1 == '半' && opt.pad > 1) {
	opt.pad--;
      }
      return pad_left(c, opt.pad, pad_char);
    } else {
      return c;
    }
  }
  return null;
}

function rewrite_gengou_format_date_string (template, date) {
  var r = "";
  var s = template;
  while (s.match(/\%([01-9]*)(?:\(([^\)]+)\))?([\-_])?([A-Za-z\%])/)
	 || s.match(/\%\{([^\}\:]+):(^[\}]+)\}/)) {
    r = r + RegExp.leftContext;
    s = RegExp.rightContext;
    var orig = RegExp.lastMatch;
    var opt = {};

    if (orig.length > 2 && orig.substr(0, 2) == "%{") {
      opt.cmd = "{";
      opt.mod1 = RegRxp.$1;
      opt.mod2 = RegExp.$2;
      if (opt.mod1 == "n") {
	opt.cmd = 'N';
	opt.mod1 = opt.mod2;
      }
    } else {
      opt.pad = RegExp.$1,
      opt.mod1 = RegExp.$2;
      opt.mod2 = RegExp.$3;
      opt.cmd = RegExp.$4;
      opt.zflag = (opt.pad && opt.pad.length > 0 && opt.pad.substr(0, 1) == "0");
      opt.pad = (opt.pad)? parseInt(opt.pad, 10) : null;
    }

    var sw = {
      'n': function (opt, date) { return "\n"; },
      't': function (opt, date) { return "\t"; },
      'N': function (opt, date) { 
	if (opt.mod1) {
	  if (opt.mod1 == "PERCENT") {
	    return "%";
	  }
	}
	return null;
      },
      'G': function (opt, date) {
	return rewrite_gengou__sw_num('gyear', false, 2, opt, date)	;
      },
      'Y': function (opt, date) {
	return rewrite_gengou__sw_num('year', false, 2, opt, date)	;
      },
      'y': function (opt, date) {
	date.year100 = date.year % 100;
	return rewrite_gengou__sw_num('year100', true, 2, opt, date)	;
      },
      'b': function (opt, date) {
	opt.mod1 = "en";
	return rewrite_gengou__sw_num('month', false, 0, opt, date)	;
      },
      'B': function (opt, date) {
	opt.mod1 = "English";
	return rewrite_gengou__sw_num('month', false, 0, opt, date)	;
      },
      'd': function (opt, date) {
	return rewrite_gengou__sw_num('day', true, 2, opt, date)	;
      },
      'h': function (opt, date) {
	opt.mod1 = "en";
	return rewrite_gengou__sw_num('month', false, 0, opt, date)	;
      },
      'm': function (opt, date) {
	return rewrite_gengou__sw_num('month', true, 2, opt, date)	;
      },
      '': function () { return null; }
    };
    if (sw[opt.cmd]) {
      var c = (sw[opt.cmd])(opt, date);
      if (c != null) {
	r = r + c;
      } else {
	r = r + orig;
      }
    } else {
      r = r + orig;
    }
  }
  r = r + s;
  return r;
}

function rewrite_gengou (dom) {
  var s = dom.innerHTML;
  var r = "";

  while (s.match(/^([^01-9\s]*)\s*([01-9]+)\s*年\s*([01-9]+)\s*月\s*([01-9]+)\s*日/)) {
    r = r + RegExp.leftContext;
    s = RegExp.rightContext;
    var c = RegExp.lastMatch;
    var g = RegExp.$1;
    var date = {};
    date.year = parseInt(RegExp.$2, 10);
    date.month = parseInt(RegExp.$3, 10);
    date.day = parseInt(RegExp.$4, 10);

    if (r.match(/<[^>]*$/)) { // HTML タグ内でないことを確認。
      r = r + c;
      continue;
    }

    // すでに変換済かチェック。
    if (g != "") {
      if (g.match(GENGOU_IGNORE_REGEXP)) {
	r = r + c;
	continue;
      }
      var skip = false;
      for (var i = 0; i < Gengou.length; i++) {
	var q = Gengou[i][0];
	if (q != null && g.length >= q.length
	    && g.substr(g.length - q.length, q.length) == q) {
	  skip = true;
	  break;
	}
      }
      if (skip) {
	r = r + c;
	continue;
      }
    }

    // 変換メインルーチン。"%" まわりはすごい手抜き。
    // "%%" はなしで "%{n:PERCENT}" と書くと "%" になる。
    var done = false;
    for (var i = 0; i < Gengou.length; i++) {
      var g = Gengou[i][0];
      var from = Gengou[i][1];
      var to = Gengou[i][2];
      if (from != null) {
	from = from.split(/-/);
	from = {year: parseInt(from[0], 10),
		month: parseInt(from[1], 10),
		day: parseInt(from[2], 10)};
	if (! date_le(from, date)) {
	  continue;
	}
      }
      if (to != null) {
	to = to.split(/-/);
	to = {year: parseInt(to[0], 10),
	      month: parseInt(to[1], 10),
	      day: parseInt(to[2], 10)};
	if (! date_le(date, to)) {
	  continue;
	}
      }
      if (g == null) {
	g = GENGOU_DEFAULT_FORMAT;
      } else {
	date.gyear = date.year - from.year + 1;
      }
      g = rewrite_gengou_format_date_string(g, date);
      if (g) {
	r = r + g;
	done = true;
	break;
      }
    }
    if (! done) {
      r = r + c;
    }
  }
  r = r + s;
  dom.innerHTML = r;
}

// ロード時の addEventListener まわりの実装は迷う。今回はこうした。
function add_event_listener_rewrite_gengou (xpath) {
  if (! document['evaluate']) {
    var scr = document.createElement("script");
    scr.src = GENGOU_XPATH_JS;
    (document.body || document.getElementsByTagName('head')[0]).appendChild(scr);
  }

  add_event_listener(window, "load", 
		     bind(function (ev) {
		       var res = document.evaluate(this.xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		       for (var i = 0; i < res.snapshotLength; i++) {
			 rewrite_gengou(res.snapshotItem(i));
		       }
		     }, {xpath: xpath}), false);
}

//add_event_listener_rewrite_gengou("//div[@class='content']/h2");
//add_event_listener_rewrite_gengou("//div[@class='sticky-entry']/h2");

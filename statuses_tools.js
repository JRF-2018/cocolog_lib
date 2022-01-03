//
// statuses_tools.js 
//
// Time-stamp: <2022-01-02T14:42:24Z>
//
// Functions for http://jrf.cocolog-nifty.com/statuses/ .
//

//
// Author's Link:
//
//   http://jrf.cocolog-nifty.com/software/2011/04/post.html
//   (The page is written in Japanese.)
//

// BEGIN: For Decorating Comments.

var MY_SITE_QUERY = "(site:jrf.cocolog-nifty.com OR site:http://b.hatena.ne.jp/jrf/)";
var SEARCH_URL = "http://www.google.com/search?hl=en&safe=off&lr=lang_ja&pws=0&q=";
var MY_ABOUTME = "jrf.aboutme.jp";
//var ARTICLE_ID_SEARCHER = "http://jrf.cocolog-nifty.com/statuses/jumpbytitle.html?q=";
var ARTICLE_ID_SEARCHER = "http://jrockford.s1010.xrea.com/cocolog_helper/id2url.cgi?q=";
//var DATE_SEARCHER = "http://jrf.cocolog-nifty.com/statuses/jumpbydate.html?q=";
var DATE_SEARCHER = "http://jrockford.s1010.xrea.com/cocolog_helper/date2url.cgi?q=";
var OWNER_SEARCHER = "http://jrf.cocolog-nifty.com/statuses/jumpbyowner.html?q=";

var SITE_OWNERS = ["JRF"];
var TRUSTED_OWNERS_FOR_REWRITE = [].concat(SITE_OWNERS);
var UNTRUSTED_OWNERS_FOR_TYPO = [];

var USER_ALIAS = {};
var USER_URL = {};
var IN_CPS = false;
//var load_user_info;
var load_user_info_cps;

function decorate_comment(html, date, typos) {
//  alert("OK00 " + html);
  html = html.replace(/<br\s*\/?>\n?/ig, "\n");

  var s;

  if (typos) {
    var typosregex = "";
    for (var i in typos) {
      if (typosregex != "") {
	typosregex += "|";
      }
      typosregex += escapeRegExp(i);
    }
//    alert("OK0 " + typosregex);
    if (typosregex != "") {
      typosregex = new RegExp("(?:" + typosregex + ")");
      for (s = html, html = ""; s.match(typosregex);) {
	html += RegExp.leftContext;
	s = RegExp.rightContext;
	var c = RegExp.lastMatch;
	if (typos[c]) {
//	  html += "<span class=\"" + typos[c].type + "\" title=\"replaced from: "
//	    + escapeHTML(c) + "\">" + typos[c].replace + "</span>";
	  html += "<span class=\"" + typos[c].type + "\" title=\"訂正前："
	    + escapeHTML(c) + "\">" + typos[c].replace + "</span>";
	}
      }
      html += s;
    }
  }
//  alert("OK1 " + html);

  // URI strings.
  for (s = html, html = ""; s.match(/(?:https?|ftp)(?::\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/m);) {
    html += RegExp.leftContext;
    s = RegExp.rightContext;
    var href = RegExp.lastMatch;
    if (html.match(/<[^<>]*$/)) {
      html += href;
      continue;
    }

    if (href.match(/[\.\!\'\?\:\;\,]+$/)) {
      href = RegExp.leftContext;
      s = RegExp.lastMatch + s;
    }
    
    if (href.match(/\)$/)) {
      if (! href.match(/\(/)) {
	s = href.substring(href.length - 1) + s;
	href = href.substring(0, href.length - 1);
      }
    }

    var done = false;
    if (MY_ABOUTME) {
      var q = new RegExp("^http://" + MY_ABOUTME.replace(/\./g, "\\.")
			 + "/user_statuses/show/(.*)$");
      if (href.match(q)) {
	html += "http://" + MY_ABOUTME + "/user_statuses/show/"
	  + "<a class=\"decorated\" href=\"" + ARTICLE_ID_SEARCHER + "aboutme:" + RegExp.$1 + "\">"
	  + RegExp.$1 + "</a>";
	done = true;
      }
    }

    if (! done) {
      html += "<a class=\"decorated\" href=\"" + href + "\">" + href + "</a>";
    }
  }
  html += s;

  // Date strings.
  for (s = html, html = ""; 
       s.match(/(?:[01-9]+日前)|(?:(?:[01-9]+年)?\s*[01-9]+月(?:\s*[01-9]+日)?)|(?:(?:\s*[01-9]+月)?\s*[01-9]+日)|(?:(?:\s*[01-9]+[-\/])?\s*[01-9]+[-\/][01-9]+)/);) {
    html += RegExp.leftContext;
    s = RegExp.rightContext;
    var m = RegExp.lastMatch;
    if (m.match(/^\s*([01-9]+)[-\/]([01-9]+)$/)) {
      var year = parseInt(RegExp.$1, 10);
      var month = parseInt(RegExp.$2, 10);
      if (! (year > 1900 && month >= 1 && month <= 12)) {
	html += m;
	continue;
      }
    }
    var d = parseDate(m, date);
    if (html.match(/<[^<>]*$/)
	|| m.match(/^[01-9]+$/)
	|| s.match(/^[^<]*<\/a>/i)
	|| (! d || d.month > 12 || d.day > 31) ) {
      html += m;
      continue;
    }
    var date_str;
    if (d.day) {
      date_str = d.year + "-" + d.month + "-" + d.day;
    } else {
      date_str = d.year + "-" + d.month;
    }
    html += "<a class=\"decorated\" href=\"" + DATE_SEARCHER + date_str
      + "\">" + m + "</a>";
  }
  html += s;

//  alert("OK2 " + html);
  for (s = html, html = ""; s.match(/^keyword:\s*(.*\S)[ \t]*$/m);) {
    html += RegExp.leftContext;
    s = RegExp.rightContext;
    html += "keyword: <a class=\"decorated\" href=\""
      + SEARCH_URL + encodeURIComponent(RegExp.$1 + " " + MY_SITE_QUERY)
      + "\">" + RegExp.$1 + "</a>";
  }
  html += s;

//  alert("OK3 " + html);
  for (s = html, html = ""; s.match(/\[([^\[\]\<\>]*)\]/m); ) {
    var l = RegExp.leftContext;
    s = RegExp.rightContext;
    var c = RegExp.$1;
    if ((html + l).match(/<[^<>]*$/)) {
      html += l + "[" + c + "]";
      continue;
    }
    var done = false;
    if (! c.match(/^\w+\:/) && l.match(/(\S+)$/)) {
      l = RegExp.leftContext;
      var k = RegExp.$1;
      var i = k.length;
      while (i > 0 && isKanji(k.charAt(i - 1))) {
	i--;
      }
      l += k.substring(0, i);
      if (i < k.length) {
	k = k.substring(i, k.length);
	l += "<ruby><rb>" + k + "</rb><rp>[</rp>"
	  + "<rt>" + c + "</rt><rp>]</rp></ruby>";
	done = true;
      }
    }

    html += l;
    if (! done) {
      if (c.match(/^ruby\:(.*):(.*)$/)) {
	html += "<ruby><rp>[ruby:</rp><rb>" + RegExp.$1 + "</rb><rp>:</rp>"
	  + "<rt>" + RegExp.$2 + "</rt><rp>]</rp></ruby>";
      } else if (c.match(/^(?:cocolog|aboutme)\:(.*)$/)) {
	html += "[<a class=\"decorated\" href=\""
	  + ARTICLE_ID_SEARCHER + encodeURIComponent(c) + "\">" + c + "</a>]";
      } else if (c.match(/^google\:(.*)$/)) {
	html += "[google:<a class=\"decorated\" href=\""
	  + SEARCH_URL + encodeURIComponent(RegExp.$1)
	  + "\">" +  RegExp.$1 + "</a>]";
      } else if (c.match(/^keyword\:(.*)$/)) {
	html += "[keyword:<a class=\"decorated\" href=\""
	  + SEARCH_URL + encodeURIComponent(RegExp.$1 + " " + MY_SITE_QUERY)
	  + "\">" + RegExp.$1 + "</a>]";
      } else if (c.match(/^wikipedia\:(.*)$/)) {
	var x = RegExp.$1;
	var reg = "ja";
	var regs = "";
	if (x.match(/^([a-z01-9_\-]+)\:/)) {
	  reg = RegExp.$1;
	  regs = reg + ":";
	  x = RegExp.rightContext;
	}
	html += "[wikipedia:" + regs + "<a class=\"decorated\" href=\""
	  + "https://" + reg + ".wikipedia.org/wiki/?search="
	  + encodeURIComponent(x) + "\">" + x + "</a>]";
      } else if (l == "" || html.match(/<\/a>\]$/i)) {
	html += "[<a class=\"decorated\" href=\""
	  + SEARCH_URL + encodeURIComponent("\"[" + c + "]\" " + MY_SITE_QUERY)
	  + "\">" +  c + "</a>]";
      } else {
	html += "[" + c + "]";
      }
    }
  }
  html += s;

  for (s = html, html = ""; s.match(/(\&lt\;pre\&gt\;)(\n)?/i);) {
    html += RegExp.leftContext;
    s = RegExp.rightContext;
    var otag = RegExp.$1;
    var otag_br = RegExp.$2;
    if (html.match(/<[^<>]*$/)) {
      html += otag + otag_br;
      continue;
    }
    if (s.match(/\&lt\;\/pre\&gt\;/i)) {
      var block = RegExp.leftContext;
      s = RegExp.rightContext;
      var ctag = RegExp.lastMatch;
      html += "<span class=\"pre-tag\">" + otag + "</span>" + otag_br
        + "<pre class=\"decorated\">" + block + "</pre>"
	+ "<span class=\"pre-tag\">" + ctag + "</span>";
    } else {
      html += otag + otag_br;
    }
  }
  html += s;

//  alert("OK5 " + html);
  html = html.replace(/\n/g, "<br />");
//  alert("OK6 " + html);

 return html;
}

function decorate_div(div) {
  if (getElementsByTagAndClassName(div, "div", "access-restriction-warning")) {
    return;
  }
  var ab = getElementsByTagAndClassName(div, "div", "article-block");
  var cbs = getElementsByTagAndClassName(div, "div", "comment-block");
  if (ab) {
    ab = ab[0];
    var ainfo = getElementsByTagAndClassName(ab, "span", "auxiliary-info");
    if (ainfo && ainfo[0]) {
      ainfo = ainfo[0];
      var owner_o = getElementsByTagAndClassName(ainfo, "span", "owner")[0];
      var owner_h = owner_o.innerHTML;
      ainfo.parentNode.removeChild(ainfo);
      var owner_o2 = getElementsByTagAndClassName(ab, "span", "owner")[0];
      owner_o2.innerHTML = owner_h;
    }
  }

  // if (load_user_info) {
  //   var owners = [];
  //   var owner_a = getElementsByTagAndClassName(div, "span", "owner");
  //   var done = {};
  //   for (var i = 0; i < owner_a.length; i++) {
  //     var o = get_text(owner_a[i]);
  //     if (! done[o]) {
  // 	if (! USER_ALIAS[o] || USER_ALIAS[o] == "") {
  // 	  owners.push(o);
  // 	}
  // 	done[o] = true;
  //     }
  //   }
  //   if (owners.length > 0) {
  //     load_user_info(owners);
  //   }
  // }

  if (! IN_CPS && load_user_info_cps) {
    var owners = [];
    var owner_a = getElementsByTagAndClassName(div, "span", "owner");
    var done = {};
    for (var i = 0; i < owner_a.length; i++) {
      if (getElementsByTagAndClassName(owner_a[i], "span", "aliased")) {
	continue;
      }
      var o = get_text(owner_a[i]);
      if (! done[o]) {
	if (! USER_ALIAS[o] || USER_ALIAS[o] == "") {
	  owners.push(o);
	}
	done[o] = true;
      }
    }
    if (owners.length > 0) {
      load_user_info_cps(owners, function () {
	var prev = IN_CPS;
	IN_CPS = true;
	decorate_div(div);
	IN_CPS = prev;
      });
      return;
    }
  }

  var a = [];
  if (ab) {
    a = [ab];
  }
  a = a.concat(cbs || []);
  var d = []; 
  for (var i = 0; i < a.length; i++) {
    var b = {};
    d.push(b);
    b.block = a[i];
    var text_a = (getElementsByTagAndClassName(b.block, "p", "text")
		  || getElementsByTagAndClassName(b.block, "div", "text"));
    b.cont = text_a[0];
    if (b.cont.tagName.toUpperCase() == "P") {
      var tmp = document.createElement("div");
      tmp.className = "text";
      tmp.innerHTML = b.cont.innerHTML
      b.cont.parentNode.replaceChild(tmp, b.cont);
      b.cont = tmp;
    }

    var owner_o = getElementsByTagAndClassName(b.block, "span", "owner")[0];
    b.owner = get_text(owner_o);
    var url = USER_URL[b.owner] || OWNER_SEARCHER + encodeURIComponent(b.owner);
    var owner_h = escapeHTML(b.owner);
    if (USER_ALIAS[b.owner] && USER_ALIAS[b.owner] != "") {
      if (USER_ALIAS[b.owner] != b.owner) {
	owner_h = "<span class=\"aliased\" title=\"ID: "
	  + escapeHTML(b.owner) + "\">"
	  + escapeHTML(USER_ALIAS[b.owner]) + "</span>";
      }
    } else {
      USER_ALIAS[b.owner] = "";
    }
    owner_o.innerHTML = "<a class=\"decorated\" href=\""
      + url + "\">" + owner_h + "</a>";

    var date_o = getElementsByTagAndClassName(b.block, "span", "date")[0];
    b.date = parseDate(get_text(date_o));
    date_o.innerHTML = decorate_comment(date_o.innerHTML, new Date(), null);

    b.magic = null;
    var magic_a = getElementsByTagAndClassName(b.block, "span", "magic");
    if (magic_a && magic_a.length) {
      b.magic = get_text(magic_a[0]);
    }
  }

  var trusted = {};
  var untrusted = {};

  for (var i = 0; i < UNTRUSTED_OWNERS_FOR_TYPO.length; i++) {
    untrusted[UNTRUSTED_OWNERS_FOR_TYPO[i]] = true;
  }
  for (var i = 0; i < TRUSTED_OWNERS_FOR_REWRITE.length; i++) {
    trusted[TRUSTED_OWNERS_FOR_REWRITE[i]] = true;
  }

  for (var i = 0; i < d.length; i++) {
    var b = d[i];
    var html = b.cont.innerHTML.replace(/<br\s*\/?>\n?/ig, "\n");
    var text = html.replace(/\n/g, "<br />");

    var auth = null;
    for (s = html, html = ""; s.match(/^(trust|untrust):\s*(.*\S)[ \t]*$/m);) {
      html += RegExp.leftContext;
      s = RegExp.rightContext;
      var lm = RegExp.lastMatch;
      var u = RegExp.$2;
      var type = RegExp.$1.toLowerCase();
      if (auth == null) {
	auth = check_auth(b.owner, b.date, text, b.magic);
      }
      if (auth) {
	if (type == "trust") {
	  untrusted[u] = false;
	  trusted[u] = true;
	  html += "<span class=\"trust-notice\">" + lm +"</span>";
	} else {
	  untrusted[u] = true;
	  trusted[u] = false;
	  html += "<span class=\"untrust-notice\">" + lm +"</span>";
	}
      } else {
	html += lm;
      }
    }
    html += s;
    b.cont.innerHTML = html.replace(/\n/g, "<br />");
  }

  var typosfordiv = [];

  for (var i = 0; i < d.length; i++) {
    var b = d[i];

    typosfordiv[i] = {};
    var s;
    var html = b.cont.innerHTML.replace(/<br\s*\/?>\n?/ig, "\n");
//    for (s = html, html = ""; s.match(/^(typo|rewrite|srewrite)\s*\:?\s*(.*\S)\s*-?-\&gt\;\s*(.*\S)[ \t]*$/m);) {
    for (s = html, html = ""; s.match(/^(typo|rewrite|srewrite|修正|行修正)\s*[\:：]?\s*(.*\S)\s*(?:→|-?-\&gt\;)\s*(.*\S)[ \t]*$/im);) {
      html += RegExp.leftContext;
      s = RegExp.rightContext;
      var c = RegExp.lastMatch;
      var t1 = RegExp.$2;
      var t2 = RegExp.$3;
      var type = RegExp.$1.toLowerCase();
//      var _REWRITE_TYPE_TABLE = {}; //const
      var _REWRITE_TYPE_TABLE = {"修正" : "rewrite", "行修正" : "srewrite"};
      if (_REWRITE_TYPE_TABLE[type]) {
	type = _REWRITE_TYPE_TABLE[type];
      }
      var escape = (type == "srewrite");
      
      if ((type == "typo" && untrusted[b.owner])
	  || (type != "typo" && ! trusted[b.owner])) {
	html += c;
	continue;
      }

      if (t1.match(/^\"(.*)\"$/)
	  || t1.match(/^\'(.*)\'$/)
	  || t1.match(/^［(.*)］$/)
	  || t1.match(/^「(.*)」$/)) {
	t1 = RegExp.$1;
      }
      if (escape) {
	t1 = unescape_backslash(t1);
      }
//      t2 = t2.replace(/[\,\.]$/, "");
      t2 = t2.replace(/[\,\.。、．，]$/, "");
      if (t2.match(/^\"(.*)\"$/)
	  || t2.match(/^\'(.*)\'$/)
	  || t2.match(/^［(.*)］$/)
	  || t2.match(/^「(.*)」$/)) {
	t2 = RegExp.$1;
      }
      if (escape) {
	t2 = unescape_backslash(t2);
      }
      typosfordiv[i][t1] = {replace: t2, type: type};
      html += "<span class=\"rewrite-notice\">" + c +"</span>";
    }
    html += s;
    b.cont.innerHTML = html.replace(/\n/g, "<br />");
  }

  function current_typos(i) {
    var typos = {};
    for (var j = i + 1; j < d.length; j++) {
      if (typosfordiv[j]) {
	for (var k in typosfordiv[j]) {
	  typos[k] = typosfordiv[j][k];
	}
      }
    }
    return typos;
  }

  for (var i = 0; i < d.length; i++) {
    var b = d[i];
    b.cont.innerHTML = decorate_comment(b.cont.innerHTML, b.date,
					current_typos(i));
  }
}

function unescape_backslash (s, allow_unsafe) {
  var r = "";

  while (s.match(/\\/)) {
    r += RegExp.leftContext;
    s = RegExp.rightContext;
    if (s.length <= 0) {
      r += "\\";
      continue;
    }
    var c = s.substr(0, 1);
    s = s.substr(1);
    if (c.match(/\W/)) {
      r += c;
      continue;
    } else {
      var p = null;

      switch (c) {

      case "n":
	p = ["\n", s];
	break;

      case "t":
	p = ["\t", s];
	break;

      case "x":
	if (! allow_unsafe) {
	  break;
	}
	if (s.match(/^[01-9a-fA-F][01-9a-fA-F]?/)) {
    	  s = RegExp.rightContext;
    	  var c = String.fromCharCode(parseInt(RegExp.lastMatch, 16));
    	  p =  [escapeHTML(c), s];
	} else {
    	  p = null;
	}
	break;

      case "u":
	if (! allow_unsafe) {
	  break;
	}
	if (s.match(/^\{([01-9a-fA-F]+)\}/)) {
     	  s = RegExp.rightContext;
     	  var c = String.fromCharCode(parseInt(RegExp.$1, 16));
     	  p = [escapeHTML(c), s];
	} else {
     	  p = null;
	}
	break;

      case "0":
	p = ["", s];
	break;

      }

      if (p) {
	r += p[0];
	s = p[1];
      } else {
	r += "\\" + c;
      }
    }
  }
  r += s;

  return r;
}

function check_auth (name, date, text, magic) {
  for (var i = 0; i < SITE_OWNERS.length; i++) {
    if (SITE_OWNERS[i] == name) {
      return true;
    }
  }
  return false;
}

function getElementsByTagAndClassName(d, tag, className) {
  var r = new Array();
  var j = 0;
  var a = d.getElementsByTagName(tag);
  for (var i = 0; i < a.length; i++) {
    if (a[i].className == className) {
      r[j++] = a[i];
    }
  }
  return (j > 0)? r : null;
}

function parseDate(s, from) {
  s = s.replace(/^\s+/, "");
  if (! from) {
    from = new Date();
  }
  if (! ("getFullYear" in from)) {
    if ("hour" in from) {
      var d = from;
      from = new Date(d.year, d.month - 1, d.day, d.hour, d.minute, d.second);
    } else {
      var d = from;
      from = new Date(d.year, d.month - 1, d.day);
    }
  }

  if (s.match(/^([01-9]+)\s*(日|時間|分|秒)前/)) {
    var i = RegExp.$2;
    var n = parseInt(RegExp.$1, 10);
    var imap = {
      "日" : 24 * 60 * 60 * 1000,
      "時間" : 60 * 60 * 1000,
      "分" : 60 * 1000,
      "秒" : 1000
    };
    var d = new Date();
    d.setTime(from.getTime() - n * imap[i]);
    return {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate(),
	    hour: d.getHours(), minute: d.getMinutes(),
	    second: d.getSeconds()};
  } else if (s.match(/^([01-9]+)\s*年\s*([01-9]+)\s*月\s*([01-9]+)\s*日/)) {
    return {year: parseInt(RegExp.$1, 10), month: parseInt(RegExp.$2, 10), day: parseInt(RegExp.$3, 10)};
  } else if (s.match(/^([01-9]+)[-\/]\s*([01-9]+)[-\/]\s*([01-9]+)/)) {
    return {year: parseInt(RegExp.$1, 10), month: parseInt(RegExp.$2, 10), day: parseInt(RegExp.$3, 10)};
  } else if (s.match(/^([01-9]+)\s*年\s*([01-9]+)\s*月/)){
    return {year: parseInt(RegExp.$1, 10), month: parseInt(RegExp.$2, 10)};
  } else if (s.match(/^([01-9]+)\s*月\s*([01-9]+)\s*日/)){
    return {year: from.getFullYear(), month: parseInt(RegExp.$1, 10), day: parseInt(RegExp.$2, 10)};
  } else if (s.match(/^([01-9]+)\s*[-\/]\s*([01-9]+)/)){
    var d1 = parseInt(RegExp.$1, 10);
    var d2 = parseInt(RegExp.$2, 10);
    if (d1 > 1900) {
      return {year: d1, month: d2};
    } else {
      return {year: from.getFullYear(), month: d1, day: d2};
    }
  } else if (s.match(/^([01-9]+)\s*日/)){
    return {year: from.getFullYear(), month: from.getMonth() + 1, day: parseInt(RegExp.$1, 10)};
  } else {
    return null;
  }
}

function padLeft(s, num, pad) {
  s = s.toString();
  var r = s;
  for (var i = 0; i < num - s.length; i++) {
    r = pad + r;
  }
  return r.substr(r.length - num, num);
}

function leDate(a, b) {
  if (a.year < b.year
      || (a.year == b.year
	  && (a.month < b.month
	      || (a.month == b.month
		  && a.day <= b.day)))) {
    return true;
  } else {
    return false;
  }
}

function isKanji(c){ // c:判別したい文字
    var unicode = c.charCodeAt(0);
    if ( (unicode>=0x3005  && unicode<=0x3006)  || //「々」と「〆」
         (unicode>=0x4e00  && unicode<=0x9fcf)  || // CJK統合漢字
         (unicode>=0x3400  && unicode<=0x4dbf)  || // CJK統合漢字拡張A
         (unicode>=0x20000 && unicode<=0x2a6df) || // CJK統合漢字拡張B
         (unicode>=0xf900  && unicode<=0xfadf)  || // CJK互換漢字
         (unicode>=0x2f800 && unicode<=0x2fa1f) )  // CJK互換漢字補助
//	 (unicode>=0x3190 && unicode<=0x319f) ) // 漢文用の記号

        return true;
    return false;
}

function escapeRegExp(s) {
  return s.replace(/\W/g, "\\$&");
}

function escapeHTML(s) {
  return s.replace(/\&/g, "&amp;")
    .replace(/\"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stripHTML(s) {
  return s.replace(/<[^>]+>/g, "")
    .replace(/^\s+/, "")
    .replace(/\s+$/, "");
}

function strip_anchor(s) {
  return s.replace(/<\/?a(?:\s+[^>])?\s*>/ig, "")
    .replace(/^\s+/, "")
    .replace(/\s+$/, "");
}

function set_text(dom, text) {
  if ("undefined" != typeof dom.textContent) {
    dom.textContent = text;
  } else {
    dom.innerText = text;
  }
}

function get_text(dom) {
  return (dom.textContent || dom.innerText);
}

// END: For Decorating Comments.


// BEGIN: For Open Entry-More.

var statuses = {}

function parse_individual_xml(text) {
  var r = {};
  if (text.match(/<failure>/) || ! text.match(/<article>/)) {
    return null;
  }
  text.match(/<comments>\s*<\!\[CDATA\[((?:[\r\n]|.)*)\]\]>\s*<\/comments>/);
  r["comments"] = RegExp.$1;
  text.match(/<id>([^\n]*)<\/id>/);
  r["id"] = RegExp.$1;
  text.match(/<title>([^\n]*)<\/title>/);
  r["title"] = unescapeHTML(RegExp.$1);
  if (text.match(/<owner>([^\n]*)<\/owner>/)) {
    r["owner"] = unescapeHTML(RegExp.$1);
  }
  if (text.match(/<link>([^\n]*)<\/link>/)) {
    r["link"] = unescapeHTML(RegExp.$1);
  }
  text.match(/<date>([^\n]*)<\/date>/);
  r["date"] = unescapeHTML(RegExp.$1);
  text.match(/<text>([^\n]*)<\/text>/);
  r["text"] = unescapeHTML(RegExp.$1);
  return r;
}

var load_individual_xml = _load_individual_xml;
function _load_individual_xml(id) {
  var div = document.getElementById("entry-" + id);
  var url = div.getElementsByTagName("h3")[0]
    .getElementsByTagName("a")[0].href + "?mode=xml";

  var res = requestFile(null, "GET", url, false, null);
  var r = parse_individual_xml(res.responseText);
  if (! r) {
    return null;
  }
    
  if (statuses[id]) {
    for (var k in r) {
      statuses[id][k] = r[k];
    }
    r = statuses[id];
  }
  return r;
}

function update_entry(r) {
  var id = r["id"];
  var div = document.getElementById("entry-" + id);
  var textmore = document.createElement("div");
  textmore.className = "entry-more-text";
  textmore.innerHTML = r["comments"];
  var d = getElementsByTagAndClassName(div, "div", "entry-more")[0];
  var prev = getElementsByTagAndClassName(d, "p", "extended")
    || getElementsByTagAndClassName(d, "div", "entry-more-text");
  d.replaceChild(textmore, prev[0]);
  
  var a = getElementsByTagAndClassName(div, "div", "article-block")[0];
  var text_a = getElementsByTagAndClassName(a, "p", "text")
    || getElementsByTagAndClassName(a, "div", "text");
  var text_o = text_a[0];
  text_o.innerHTML = r["text"];
  var date_o = getElementsByTagAndClassName(a, "span", "date")[0];
//  date_o.innerHTML = r["date"];
  date_o.innerHTML = stripHTML(date_o.innerHTML);
  var owner_o = getElementsByTagAndClassName(a, "span", "owner")[0];
  owner_o.innerHTML = strip_anchor(owner_o.innerHTML);

  decorate_div(div);
  if (r["open_callback"]) {
    r["open_callback"](r);
  }
}

function open_article(id) {
  var r = load_individual_xml(id);

  if (! r) {
    var div = document.getElementById("entry-" + id);
    var d = getElementsByTagAndClassName(div, "div", "entry-more")[0];
    var stat = document.createElement("div");
    stat.className = "load-failure-warning";
//    stat.innerHTML = "(Failed to load the article.)";
    stat.innerHTML = "(記事の取得に失敗しました。)";
    d.appendChild(stat);
    return;
  }
  update_entry(r);
}

function createHttpRequest() {
  if (window["ActiveXObject"]) {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        return null;
      }
    }
  } else if (window["XMLHttpRequest"]) {
    return new XMLHttpRequest();
  } else {
    return null;
  }
}

function requestFile(data, method, fileName, async, on_loaded) {
  var httpoj = createHttpRequest();
  
  httpoj.open(method, fileName, async);
  httpoj.onreadystatechange = function() { 
    if (httpoj.readyState==4 && on_loaded) { 
      on_loaded(httpoj);
    }
  };
  httpoj.send(data);

  return httpoj;
}

// END: For Open Entry-More.

// BEGIN: For Copy Article to Clipboard.

var TAB = "      ";

var RET_CODE = "\n";
if (navigator.userAgent.indexOf("Win") >= 0) {
  RET_CODE = "\r\n";
}

function unescapeHTML (s) {
//  var div = document.createElement("div");
//  div.innerHTML = s;
//  var r = div.childNodes[0].nodeValue;
//  div.removeChild(div.firstChild);

  var r = s.replace(/\&lt;/ig, "<")
    .replace(/\&gt;/ig, ">")
    .replace(/\&quot;/ig, "\"")
    .replace(/\&apos;/ig, "'");

  return r.replace(/\&amp;/ig, "&");
}

function popup_copy_overlay (text) {
  var d = document.getElementById("copy-overlay");
  var f = document.getElementById("copy-overlay-form");
  if (! d) {
    d = document.createElement("div");
    d.id = "copy-overlay";
    document.body.appendChild(d);
  }
  d.style.display = "block";
  if (! f) {
    f = document.createElement("form");
    f.id = "copy-overlay-form";
    f.innerHTML =
      '<textarea id="copy-overlay-textarea"></textarea><br/>\n'
      + '<a href="javascript:close_copy_overlay();">元の表示</a>\n'
//      + '<a href="javascript:close_copy_overlay();">Back</a>\n'
    ;
    document.body.appendChild(f);
//    var w = window.innerWidth;
//    var h = window.innerHeight;
//    f.style.top = "" + Math.floor(h * 0.1) + "px";
//    f.style.left = "" + Math.floor(w * 0.1) + "px";
  }
  var t = document.getElementById("copy-overlay-textarea");
  t.value = text;
  f.style.display = "block";
}

function close_copy_overlay () {
  var f = document.getElementById("copy-overlay-form");
  if (f) {
    f.style.display = "none";
  }
  var d = document.getElementById("copy-overlay");
  if (d) {
    d.style.display = "none";
  }
}

function unescapeHTML_with_br (s) {
  var r = "";
  while (s.match(/<br\s*\/?>/)) {
    s = RegExp.rightContext;
    r += unescapeHTML(RegExp.leftContext) + "\n";
  }
  r += unescapeHTML(s);
  return r;
}

function clip_or_alert_article(id) {
  var r = load_individual_xml(id);
  
  var s = "";
  var a_owner = r.owner;
  var a_text = r.text;
  if (a_text.match(/<span\s+class=\"auxiliary-info\">/i)) {
    a_text = RegExp.leftContext;
    var c = RegExp.rightContext;
    if (c.match(/<span\s+class=\"owner\">([^<>]+)<\/span>/i)) {
      a_owner = unescapeHTML(RegExp.$1);
    }
  }
  a_text = unescapeHTML_with_br(a_text);
  s += "[" + r.title + "] " + r.date + " " + a_owner + "\n\n";
  s += a_text + "\n\n";
  var more = r.comments;
  var n = 0;
  var a = new Array();
  var inner = false;

  while (more.match(/<div\s+class=\"comment-block\"\s*>/)) {
    if (inner) {
      a[n++] = RegExp.leftContext;
    }
    more = RegExp.rightContext;
    inner = true;
  }
  if (inner) {
    a[n++] = more;
  }

  for (var i = 0; i < n; i++) {
    var c = a[i];
    var text = "";
    var date = "";
    var owner = "";
    if (c.match(/<p\s+class=\"text\">/)) {
      var d = RegExp.rightContext;
      if (d.match(/<\/p>/)) {
	text = unescapeHTML_with_br(RegExp.leftContext);
      }
    }
    if (c.match(/<span\s+class=\"date\">([^<]*)<\/span>/)) {
      date = unescapeHTML(RegExp.$1);
    }
    if (c.match(/<span\s+class=\"owner\">([^<]*)<\/span>/)) {
      owner = unescapeHTML(RegExp.$1);
    }
    s += TAB + text.replace(/\n([^\n])/ig, "\n" + TAB + "$1");
    if (! s.match(/\n$/)) {
      s += "\n";
    }
    s += TAB + owner + " " + date + "\n\n";
  }

  if (window['clipboardData']) {
    if (RET_CODE != "\n") {
      s = s.replace(/\n/g, RET_CODE);
    }
    clipboardData.setData("Text", s);
  } else {
//    alert(s);
    popup_copy_overlay(s);
  }
}

function add_clip_or_alert_button (id) {
  var div = document.getElementById("entry-" + id);
  if (getElementsByTagAndClassName(div, "div", "access-restriction-warning")) {
    return;
  }
  var article = getElementsByTagAndClassName(div, "div", "article-block");
  if (! article) {
    return;
  }
  article = article[0];
  var posted = getElementsByTagAndClassName(article, "p", "posted")[0];

  posted.appendChild(document.createTextNode(" "));

  var sep = document.createElement("span");
  sep.classname = "separator";
  sep.innerHTML = "|";
  posted.appendChild(sep);

  posted.appendChild(document.createTextNode(" "));

  var span = document.createElement("span");
//  var title = "Copy to clipboard.";
  var title = "クリップボードにひとことをコピーします。";
  if (! window['clipboardData']) {
//    title = "Display article on the textarea for convenience to copy, ";
    title = "クリップボードにコピーしやすいよう textarea でひとことを表示します。";
  }
  span.className = "clip-or-alert";
//  span.innerHTML = "<a href=\"javascript:clip_or_alert_article('" + id
//    + "')\" title=\"" + title + "\">Copy</a>";
  span.innerHTML = "<a href=\"javascript:clip_or_alert_article('" + id
    + "')\" title=\"" + title + "\">コピー</a>";
  posted.appendChild(span);
}

function change_anchor_more (id) {
  var div = document.getElementById("entry-" + id);
  var ex = getElementsByTagAndClassName(div, "p", "extended");
  if (ex && ex.length) {
    ex = ex[0];
    var a = ex.getElementsByTagName("a")[0];
    a.href = "javascript:open_article('" + id + "');";
  }
}

// END: For Copy Article to Clipboard.


// BEGIN: For Google Search API.
var NEWS_CONTROL_ID = "searchcontrol";
//var NEWS_QUERY = "(thing OR one)";
var NEWS_QUERY = "(災 OR 事件 OR 景気 OR 政府)";
var NEWS_DATE_FROM = "";
var NEWS_DATE_TO = "";

function transDateToJD(year,month,day,hour,minute,tztype)
{
  var t,jd;

  if(month<3)
  {
    year -=1;
    month+=12;
  }

  t  =Math.floor(year/100);
  jd =Math.floor(year*365.25)-t+Math.floor(t/4);
  jd+=Math.floor(30.6001*(month+1))+day+hour/24+minute/1440+1720996.5;
  if(tztype) jd-=9/24;

  return jd;
}

function google_news_on_load() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Add in a full set of searchers
  var localSearch = new google.search.LocalSearch();
//  searchControl.addSearcher(localSearch);
  searchControl.addSearcher(new google.search.NewsSearch());
  searchControl.addSearcher(new google.search.BlogSearch());
  searchControl.addSearcher(new google.search.WebSearch());
  searchControl.addSearcher(new google.search.VideoSearch());
//  searchControl.addSearcher(new google.search.ImageSearch());
//  searchControl.addSearcher(new google.search.BookSearch());
//  searchControl.addSearcher(new google.search.PatentSearch());

  // Set the Local Search center point
//  localSearch.setCenterPoint("US");
  localSearch.setCenterPoint("日本");

  // tell the searcher to draw itself and tell it where to attach
//  searchControl.draw(document.getElementById("searchcontrol"));

  searchControl.setResultSetSize(5);

  var drawOption = new google.search.DrawOptions();
//  drawOption.setDrawMode(google.search.SearchControl.DRAW_MODE_LINEAR);
  drawOption.setDrawMode(google.search.SearchControl.DRAW_MODE_TABBED);
  searchControl.draw(document.getElementById(NEWS_CONTROL_ID), drawOption);


  // execute an inital search
  var from = parseDate(NEWS_DATE_FROM);
  var to = parseDate(NEWS_DATE_TO);
  var jd_from = Math.floor(transDateToJD(from.year, from.month, from.day, 0, 0, 1) - 3);
  var jd_to = Math.ceil(transDateToJD(to.year, to.month, to.day, 0, 0, 1) + 3);

  searchControl.execute(NEWS_QUERY + " daterange:" + jd_from + "-" + jd_to);
}

function initialize_google_news () {
//  google.load('search', '1', {'language' : 'en-US'});
  google.load('search', '1', {'language' : 'ja-JP'});
  google.setOnLoadCallback(google_news_on_load);
}

// END: For Google Search API.



// BEGIN: For coordination of CSS boxes onload .
function footer_coordination () {
  var right = document.getElementById("right");
  var center = document.getElementById("center");
  if (right && center) {
    center.style.minHeight = right.scrollHeight.toString() + 'px';
  }
}

function prepare_footer_coordination () {
  if (window["addEventListener"]) { //for W3C DOM
    window.addEventListener("load", footer_coordination, false);
    window.addEventListener("resize", footer_coordination, false);
  } else if (window["attachEvent"]) { //for IE
    window.attachEvent("onload", footer_coordination);
    window.attachEvent("onresize", footer_coordination);
  } else  {
    window.onload = footer_coordination;
    window.onresize = footer_coordination;
  }
}
// END: For coordination of CSS boxes onload .

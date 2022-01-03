//
// jrf_pr_widget.js
//
// A blog widget of http://jrf.cocolog-nifty.com/pr/ .
//
var VERSION_jrf_pr_widget = "0.12" // Time-stamp: <2020-05-13T09:17:08Z>

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
//'provide "http://jrf.cocolog-nifty.com/mylib/jrf_pr_widget.js"';
//
//'require "http://crypto-js.googlecode.com/files/2.5.3-crypto-sha1-hmac-pbkdf2-blockmodes-aes.js"';
//'require "http://jrf.cocolog-nifty.com/mylib/jrf_crypt_comment.js"';

var JRF_PR_ENTRIES = [
  {
    "title" : "<span class=\"font-larger\">謎<\/span>の人、<br/><span class=\"font-larger\">JRF<\/span>。<br/>その<span class=\"font-larger\">正体<\/span>とは!?",
    "id" : "72490851"
  },
  {
    "title" : "電子<span class=\"font-larger\">辞書<\/span>!?形式の<br/><span class=\"font-larger\">JRF の私見<\/span></br>アーカイブ、Vector社にて<br/><span class=\"font-larger\">販売中<\/span>(予定)",
    "id" : "72490959"
  },
  {
    "title" : "<span class=\"font-larger\">恥をネットに知らせない<\/span>ローカル<br/><span class=\"font-larger\">電子辞書<\/span><br/> EBWin/DDwin",
    "id" : "72491055"
  },
  {
    "title" : "<span class=\"font-larger\">まさか!<\/span>の<br/><span class=\"font-larger\">単漢字入力<\/span>。<br/>IME<span class=\"font-larger\">『風』<\/span>",
    "id" : "72491103"
  },
  {
    "title" : "<span class=\"font-larger\">ブラウザからアプリを起動<\/span>とかイロイロ。<br/>Firefox の拡張<br/>JSActions",
    "id" : "72491187"
  },
  {
    "title" : "ネットウヨクでも極道でもない<span class=\"font-larger\">自由を愛する硬派<\/span>な論客<br/>《<span class=\"font-larger\">極東ブログ<\/span>》",
    "id" : "72643181"
  },
  {
    "title" : "<span class=\"font-larger\">創造論<\/span>に対する進化論の砦<br/>《<span class=\"font-larger\">忘却<\/span>からの<span class=\"font-larger\">帰還<\/span>》",
    "id" : "72643188"
  },
  {
    "title" : "誰かの願いは資産、過ぎ越した望みが負債、<br/><span class=\"font-larger\">感謝会計<\/span><br/> Amazon Wishlist",
    "id" : "72643200"
  },
  null
];
JRF_PR_ENTRIES.pop();


(function () {
function add_event_listener(el, etype, func, prp) {
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
}

function load_pr_json() {
  var scr = document.createElement('script');
  scr.type = "text/javascript";
  scr.src = "http://jrf.cocolog-nifty.com/pr/comments-json.html?callback=jrf_pr_widget_draw";
  document.body.appendChild(scr);
}

//var link = document.createElement('link');
//link.rel = "stylesheet";
//link.type = "text/css";
//link.href = CLIENT_CSS;
//document.getElementsByTagName('head')[0].appendChild(link);
var style = document.createElement('style');
style.type = "text/css";
style.innerHTML = ''
    + '#jrf_pr_widget {border: 1px dashed gray; padding: 5px; margin: 10px; }\n'
    + '#jrf_pr_widget h2 {border: 0; color: gray; font-size: x-small; font-weight: normal; padding: 0; padding-bottom: 0; margin: 2px; margin-bottom: 2px; letter-spacing: inherit; line-height: 100%;}\n'
    + '#jrf_pr_widget h2 a {color: gray; text-decoration: none;}\n'
    + '#jrf_pr_widget p {padding: 0; margin: 0;font-family: "MS PMincho", "Hiragino Mincho Pro W3", Osaka, serif}\n'
    + '#jrf_pr_widget p span.font-larger {font-size: larger;}\n'
    + '#jrf_pr_widget p span.font-smaller {font-size: smaller;}\n'
    + '#jrf_pr_widget p a {text-decoration: none; color: #333333;}\n'
    + '#jrf_pr_widget p a:visited {color: #333333;}\n'
    + '#jrf_pr_widget p a:active {color: #ffcc33;}\n'
    + '#jrf_pr_widget p a:hover {color: #ffcc33;}\n'
    + '#jrf_pr_widget p.jrf_pr_widget_title {margin-top:5px; font-size: large;line-height:120%;}\n'
    + '#jrf_pr_widget p.jrf_pr_widget_excerpt {margin-top:5px;font-size: x-small;line-height:100%;}\n'
;
document.getElementsByTagName('head')[0].appendChild(style);

add_event_listener(window, "load", load_pr_json, false);
})();

function jrf_pr_widget_check_omit(e) {
  for (var i = 0; i < e.categories.length; i++) {
    if (e.categories[i] == "休止中") {
      return true;
    }
  }
  if (e.comments.length <= 1) {
    return true;
  } else {
    var omit = {};
    for (var i = 1; i < e.comments.length; i++) {
      var s = e.comments[i];
      if (s == null) {
	continue;
      }
      if (s.match(/\[omit: ([01-9]+) ([01-9]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+)\]\s*/i)) {
	var num = parseInt(RegExp.$1, 10);
	var identifier = RegExp.$2;
	var base64_name = RegExp.$3;
	var delete_key_64 = RegExp.$4;
	var pre = RegExp.leftContext;
	if (base64_name != BASE64_NAME.toLowerCase()) {
	  continue;
	}

	var delete_key = base64_decode(delete_key_64);
	if (delete_key == null) {
	  continue;
	}

	if (! omit[identifier]) {
	  omit[identifier] = [];
	}
	omit[identifier].push([i, num, mac_hash_64(delete_key, identifier)]);
      }
    }

    var s = e.comments[0];

    if (! s.match(/\[omit-info: ([01-9]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+)\]\s*/i)) {
      return false;
    }
    var identifier = RegExp.$1;
    var mac_hash_name = RegExp.$2;
    var delete_hash = RegExp.$3;
    var crypt_name = RegExp.$4;
    var delete_key_cpt = RegExp.$5;

    if (mac_hash_name != MAC_HASH_NAME.toLowerCase()
	|| crypt_name != CRYPT_NAME.toLowerCase()) {
      return false;
    }
    if (omit[identifier]) {
      for (var j = 0, l = omit[identifier]; j < l.length; j++) {
	if (l[j][2] != delete_hash) {
	  continue;
	}
	return true;
      }
    }
    return false;
  }
}

function jrf_pr_widget_draw(json) {
  var entries = {};
  for (var i = 0; i < JRF_PR_ENTRIES.length; i++) {
    var e = JRF_PR_ENTRIES[i];
    entries[e["id"]] = e;
  }
  var jentries = {};

  for (var i = 0; i < json.length; i++) {
    var d = json[i];
    if (d != null) {
      jentries[d.id] = d;
      if (entries[d.id]) {
	var e = entries[d.id];
	for (var k in d) {
	  if (! e[k]) {
	    e[k] = d[k];
	  }
	}
      } else {
	entries[d.id] = d;
	JRF_PR_ENTRIES.push(d);
      }
    }
  }

  var allowed = [];
  for (var i = 0; i < JRF_PR_ENTRIES.length; i++) {
    var e = JRF_PR_ENTRIES[i];
    if (jentries[e.id] != null && ! jrf_pr_widget_check_omit(e)) {
      allowed.push(e)
    }
  }
  
  if (allowed.length > 0) {
    var sum = 0;
    for (var i = 0; i < allowed.length; i++) {
      sum++;
      for (var j = 0; j < allowed[i].categories.length; j++) {
	if (allowed[i].categories[j] 
	    && allowed[i].categories[j].match(/表示頻度([01-9]+)/)) {
	  sum += parseInt(RegExp.$1, 10) - 1;
	}
      }
    }
    var e;
    var num = sum * Math.random();
    sum = 0;
    for (var i = 0; i < allowed.length; i++) {
      sum++;
      for (var j = 0; j < allowed[i].categories.length; j++) {
	if (allowed[i].categories[j] 
	    && allowed[i].categories[j].match(/表示頻度([01-9]+)/)) {
	  sum += parseInt(RegExp.$1, 10) - 1;
	}
      }
      if (num < sum) {
	e = allowed[i];
	break;
      }
    }

    var banner = e.banner;
    
    if (! banner) {
      banner = ''
	+ '<p class="jrf_pr_widget_title"><a href="' + e.url + '">' + e.title + '</a></p>'
	+ '<p class="jrf_pr_widget_excerpt">' + e.excerpt + '</p>'
    }

    var div = document.getElementById('jrf_pr_widget');
    if (div) {
      div.innerHTML = '<h2>[<a href="http://jrf.cocolog-nifty.com/pr/">勝手PR</a>]</h2>'
	+ banner;
    }
  }
}

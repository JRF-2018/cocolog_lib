//
// jrf_crypt_comment.js
//
// Functions of encryption of comments for http://jrf.cocolog-nifty.com/ .
//
var VERSION_jrf_crypt_comment = "0.24" // Time-stamp: <2021-10-01T03:48:47Z>

//
// License:
//
//   The author is a Japanese.
//
//   I intended this program to be public-domain, but you can treat
//   this program under the (new) BSD-License or under the Artistic
//   License, if it is convenient for you.
//
//   Within three months after the release of this program, I
//   especially admit responsibility of efforts for rational requests
//   of correction to this program.
//
//   I often have bouts of schizophrenia, but I believe that my
//   intention is legitimately fulfilled.
//
// Author's Link:
//
//   http://jrf.cocolog-nifty.com/software/
//   (The page is written in Japanese.)
//

//'use utf8'; // Japanese
//
//'provide "http://jrf.cocolog-nifty.com/mylib/javascript/jrf_crypt_comment.js"';
//
//'require "http://crypto-js.googlecode.com/files/2.5.3-crypto-sha1-hmac-pbkdf2-blockmodes-aes.js"';
//'require "http://jrf.cocolog-nifty.com/mylib/summoner.js"';
//'require "http://jrf.cocolog-nifty.com/mylib/proverb.js"';
//'require CSS "http://jrf.cocolog-nifty.com/mylib/jrf_crypt_comment.css"';

var SEARCH_URL = "http://www.google.com/search?hl=en&safe=off&lr=lang_ja&pws=0&q=";
//en/ var SEARCH_URL = "http://www.google.com/search?hl=en&safe=off&lr=lang_en&pws=0&q=";
var IN_COMMENT_PREVIEW = location.href.match(/^https?:\/\/app\.cocolog-nifty\.com\/t\/comments/);

//
// Utilities
//

function bind(f, o) {
  return function() {return f.apply(o, arguments)};
}

function getElementsByTagAndClassName(d, tag, className) {
  var r = new Array();
  var j = 0;
  var a = d.getElementsByTagName(tag);
  for (var i = 0; i < a.length; i++) {
    if (a[i].className) {
      var l = a[i].className.split(/\s+/);
      for (var k = 0; k < l.length; k++) {
	if (l[k] == className) {
	  r[j++] = a[i];
	  break;
	}
      }
    }
  }
  return (j > 0)? r : null;
}

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

function strip_html(s) {
  return s.replace(/<[^>]+>/g, "")
    .replace(/^\s+/, "")
    .replace(/\s+$/, "");
}

function is_kanji(c){ // c:判別したい文字
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


//
// Implementation Absorber Code for Crypto-JS
//
// Ref: Crypto-JS -> http://code.google.com/p/crypto-js/
//

var string_to_bytes = Crypto.charenc.Binary.stringToBytes;
var bytes_to_string = Crypto.charenc.Binary.bytesToString;

function utf8_encode(s) {
  return bytes_to_string(Crypto.charenc.UTF8.stringToBytes(s));
}

function utf8_decode(s) {
  return Crypto.charenc.UTF8.bytesToString(string_to_bytes(s));
}

function base64_encode(s) {
  return Crypto.util.bytesToBase64(string_to_bytes(s)).replace(/=+$/, "");
}
function base64_decode(s) {
  return bytes_to_string(Crypto.util.base64ToBytes(s));
}

function allot_magic_16() {
  return bytes_to_string(Crypto.util.randomBytes(16));
}
var CRYPT_NAME = "AES_Base64";
var VERIFY_STRING = "AES";
function encrypt_64(key, data) {
  return Crypto.util.bytesToBase64(Crypto.AES.encrypt(string_to_bytes(VERIFY_STRING + data), utf8_decode(key), {asBytes: true}))
    .replace(/=+$/, "");
}
function decrypt_64(key, data) {
  var s = bytes_to_string(Crypto.AES.decrypt(Crypto.util.base64ToBytes(data), utf8_decode(key), {asBytes: true}));
  if (s.substring(0, VERIFY_STRING.length) == VERIFY_STRING) {
    return s.substring(VERIFY_STRING.length);
  } else {
    return false;
  }
}
var MAC_HASH_NAME = "HMAC_SHA1_Base64";
function mac_hash_64(key, data) {
  return Crypto.util.bytesToBase64(Crypto.HMAC(Crypto.SHA1,
					       string_to_bytes(data),
					       string_to_bytes(key),
					       { asBytes: true }))
    .replace(/=+$/, "");
}

var BASE64_NAME = "Base64";


//
// Main Codes
//

var PARSE_ERROR;

function check_comment_html(text) {
  var tag_stack = [];
//  var r = '';
  var allow_tag = {};
  for (var i = 0, l = ["a", "b", "i", /*"br",*/ "strong", "em",
		       "ul", "ol", "li", "p", "blockquote", "pre"];
       i < l.length; i++) {
    allow_tag[l[i]] = true;
  }
  while (text.match(/<\s*(\/)?\s*([a-zA-Z]+)(\s+[^>]+)?\s*>/)) {
//    r += RegExp.leftContext;
    var tag = RegExp.lastMatch;
    var flag1 = RegExp.$1;
    var tagname = RegExp.$2.toLowerCase();
    var attr = RegExp.$3;
    text = RegExp.rightContext;
    var flag2 = "";
    if (attr.match(/\/\s*$/)) {
      attr = RegExp.leftContext;
      flag2 = "/";
    }

    if (flag1 == "/" && flag2 == "/") {
      PARSE_ERROR = '"' + tagname + '" は異常な HTML タグ。タグでなく "<" を入力したいときは "&lt;" と記載する必要があります。';
//en/      PARSE_ERROR = '"' + tagname + '" is a malformed HTML tag.  When you will input "<", you must write "&lt;".';

      return false;
    } else if (flag1 == "/") {
      if (tag_stack.length > 0 && tag_stack[0] != tagname) {
	PARSE_ERROR = 'タグ "' + tag_stack[0] +'" を "' + tagname + '" で閉じています。';
//en/	PARSE_ERROR = 'You closed a tag "' + tag_stack[0] +'" by  "' + tagname + '".';
	return false;
      }
      if (tag_stack.length > 0) {
//	r += tag;
	tag_stack.shift();
      } else {
//	r += "";
      }
    } else if (flag2 == "/") {
      if (tagname != "br") {
	PARSE_ERROR = '"' + tagname + '" は使えない HTML タグ。タグでなく "<" を入力したいときは "&lt;" と記載する必要があります。';
//en/	PARSE_ERROR = '"' + tagname + '" is a unavailable HTML tag.  When you will input "<", you must write "&lt;".';
	return false;
      }
      if (! attr.match(/^\s*$/)) {
	PARSE_ERROR = 'HTML タグへの属性指定は基本的に制限されてます。';
//en/	PARSE_ERROR = 'Attributes for HTML tags are restricted.';
	return false;
      }
    } else {
      if (tagname == "br") {
	PARSE_ERROR = 'このサイトでは "br" タグは "<br>" ではなく "<br/>" と記述する必要があります。';
//en/	PARSE_ERROR = 'On this site, a "br" tag is not "<br>", but "<br/>".';
	return false;
      } else if (! allow_tag[tagname]) {
	PARSE_ERROR = '"' + tagname + '" は使えない HTML タグ。タグでなく "<" を入力したいときは "&lt;" と記載する必要があります。';
//en/	PARSE_ERROR = '"' + tagname + '" is a unavailable HTML tag.  When you will input "<", you must write "&lt;".';
	return false;
      }
      if (tagname == "a") {
	if (! attr.match(/^\s*href\s*=\s*([\"\'])(.*)\1\s*$/i)) {
	  PARSE_ERROR = 'HREF の指定が見つかりません。HTML タグへの属性指定は基本的に制限されてます。';
//en/	  PARSE_ERROR = 'No HREF for <a> tag. Attributes for HTML tags are restricted.';
	  return false;
	}
	var url = RegExp.$2;
//	if (! url.match(/(?:https?|ftp)(?::\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/)) {
	if (! url.match(/(?:https?|ftp)(?::\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/) && url != "about:blank") {
	  PARSE_ERROR = 'HREF の URL が不正です。: ' + url;
//en/	  PARSE_ERROR = 'An URL of HREF is invalid. : ' + url;
	  return false;
	}
      } else if (tagname == "ol" || tagname == "ul") {
	if (! attr.match(/^\s*(?:type\s*=\s*([\"\'])[a-zA-Z01-9_]+\1)?\s*$/i)) {
	  PARSE_ERROR = 'HTML タグへの属性指定は基本的に制限されてます。';
//en/	  PARSE_ERROR = 'Attributes for HTML tags are restricted.';
	  return false;
	}
      } else {
	if (! attr.match(/^\s*$/)) {
	  PARSE_ERROR = 'HTML タグへの属性指定は基本的に制限されてます。';
//en/	  PARSE_ERROR = 'Attributes for HTML tags are restricted.';
	  return false;
	}
      }
      tag_stack.unshift(tagname);
    }
  }
  if (tag_stack.length > 0) {
    PARSE_ERROR = 'タグ "' + tag_stack[0] +'" が閉じられてません。';
//en/	PARSE_ERROR = 'You didn't close a tag "' + tag_stack[0] +'".';
    return false;
  }

  return true;
}

//function format_emoji(s) {
//  return s.replace(/\[[eE]:([a-zA-Z01-9_]+)\]/, '<img class="emoticon $1" src="http://emojies.cocolog-nifty.com/emoticon/$1.gif" alt="$1" />');
//}

function format_url_string(html) {
  var s;

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
//    if (MY_ABOUTME) {
//      var q = new RegExp("^http://" + MY_ABOUTME.replace(/\./g, "\\.")
//			 + "/user_statuses/show/(.*)$");
//      if (href.match(q)) {
//	html += "http://" + MY_ABOUTME + "/user_statuses/show/"
//	  + "<a class=\"decorated\" href=\"" + ARTICLE_ID_SEARCHER + "aboutme:" + RegExp.$1 + "\">"
//	  + RegExp.$1 + "</a>";
//	done = true;
//      }
//    }
    if (! done) {
      html += "<a class=\"decorated\" href=\"" + href + "\">" + href + "</a>";
    }
  }
  html += s;

  return html;
}

function format_escape_bracket(s) {
  var html = "";
  while (s.match(/\[([^\[\]\<\>]*)\]/m)) {
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
      while (i > 0 && is_kanji(k.charAt(i - 1))) {
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
      if (c.match(/^[eE]:([a-zA-Z_01-9]+)$/)) {
	var e = RegExp.$1;
	html += '<img class="emoticon ' + e + '" src="http://emojies.cocolog-nifty.com/emoticon/' + e + '.gif" alt="' + e + '" />';
      } else if (c.match(/^ruby\:(.*):(.*)$/)) {
	html += "<ruby><rp>[ruby:</rp><rb>" + RegExp.$1 + "</rb><rp>:</rp>"
	  + "<rt>" + RegExp.$2 + "</rt><rp>]</rp></ruby>";
//      } else if (c.match(/^(?:cocolog|aboutme)\:(.*)$/)) {
//	html += "[<a class=\"decorated\" href=\""
//	  + ARTICLE_ID_SEARCHER + encodeURIComponent(c) + "\">" + c + "</a>]";
      } else if (c.match(/^google\:(.*)$/)) {
	html += "[google:<a class=\"decorated\" href=\""
	  + SEARCH_URL + encodeURIComponent(RegExp.$1)
	  + "\">" +  RegExp.$1 + "</a>]";
//      } else if (l == "" || html.match(/<\/a>\]$/i)) {
//	html += "[<a class=\"decorated\" href=\""
//	  + SEARCH_URL + encodeURIComponent("\"[" + c + "]\" " + MY_SITE_QUERY)
//	  + "\">" +  c + "</a>]";
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
	  + "http://" + reg + ".wikipedia.org/wiki/?search="
	  + encodeURIComponent(x) + "\">" + x + "</a>]";
      } else {
	html += "[" + c + "]";
      }
    }
  }
  html += s;

  return html;
}


function cpt_decorate_comment(s) {
  return format_escape_bracket(format_url_string(s));
}

function cpt_undecorate_comment(s) {
  return strip_html(s);
}

function _close_open_tag(text) {
  var tag_stack = [];
  var r = '';
  while (text.match(/<\s*(\/)?\s*([a-zA-Z]+)(\s+[^>]+)?\s*>/)) {
    r += RegExp.leftContext;
    var tag = RegExp.lastMatch;
    var flag1 = RegExp.$1;
    var tagname = RegExp.$2.toLowerCase();
    var attr = RegExp.$3;
    text = RegExp.rightContext;
    var flag2 = "";
    if (attr.match(/\/\s*$/)) {
      attr = RegExp.leftContext;
      flag2 = "/";
    }

    if (flag1 == "/" && flag2 == "/") {
      r += "";
    } else if (flag1 == "/") {
      while (tag_stack.length > 0 && tag_stack[0] != tagname) {
	var ctag = tag_stack.shift();
	r += '</' + ctag + '>';
      }
      if (tag_stack.length > 0) {
	r += tag;
	tag_stack.shift();
      } else {
	r += "";
      }
    } else if (flag2 == "/") {
      r += tag;
//    } else if (tagname == "pre") {
//      r += tag;
//      if (text.match(/<\s*\/\s*pre\s*>/i)) {
//	r += RegExp.leftContext + RegExp.lastMatch;
//	text = RegExp.rightContext;
//      } else {
//	r += text + "</pre>\n";
//	text = "";
//      }
    } else {
      tag_stack.unshift(tagname);
      r += tag;
    }
  }
  r += text;
  while (tag_stack.length > 0) {
    var ctag = tag_stack.shift();
    r += '</' + ctag + '>';
  }
  return r;
}

function format_comment(text) {
//  text = _close_open_tag(text);
  var r = '';
  var tag_stack = [];
  var segment = [];
  while (text.match(/\s*<\s*(\/)?\s*([a-zA-Z]+)(\s+[^>]+)?\s*>\s*/)) {
    var pre = RegExp.leftContext;
    var tag = RegExp.lastMatch;
    var flag1 = RegExp.$1;
    var tagname = RegExp.$2.toLowerCase();
    var attr = RegExp.$3;
    text = RegExp.rightContext;
    var flag2 = "";
    if (attr.match(/\/\s*$/)) {
      attr = RegExp.leftContext;
      flag2 = "/";
    }

    if (tag_stack.length == 0) {
      pre = pre.replace(/([^>\n])(\n\s*\n\s*)/g, "$1</p>\$2<p>");
    }
    if (tag_stack.length == 0 || tag_stack[0] != "pre") {
//      r += format_emoji(pre.replace(/([^>\n])(\n\s*)/g, '$1<br/>$2'));
      r += pre.replace(/([^>\n])(\n\s*\n\s*)/g, "$1</p>\$2<p>").replace(/([^>\n])(\n\s*)/g, '$1<br/>$2');
    }

    if (flag2 == "/") {
      r += tag;
    } else if (flag1 == "/") {
      r += tag;
      tag_stack.shift();
      if (tagname == "p" || tagname == "ul" || tagname == "ol"
	  || tagname == "blockquote" || tagname == "pre") {
	if (tag_stack.length == 0) {
	  segment.push(r);
	  r = '';
	}
      } else if (tagname != "li") {
	if (tag.match(/\n\s*$/)) {
	  r = r.replace(/(\n\s*)$/, '<br />$1');
	}
      }
    } else {
      tag_stack.unshift(tagname);
      if (tag_stack.length == 1) {
	if (tagname == "p" || tagname == "ul" || tagname == "ol"
	    || tagname == "blockquote" || tagname == "pre") {
	  segment.push(r);
	  r = '';
	}
      }
      r += tag;
    }
  }

  if (tag_stack.length == 0) {
    text = text.replace(/([^>\n])(\n\s*\n\s*)/g, "$1</p>\$2<p>");
  }
  if (tag_stack.length == 0 || tag_stack[0] != "pre") {
//    r += format_emoji(text.replace(/([^>\n])(\n\s*)/g, '$1<br/>$2'));
    r += text.replace(/([^>\n])(\n\s*)/g, '$1<br/>$2');
  }

  if (r != '') {
    segment.push(r);
  }

  r = '';

  for (var i = 0; i < segment.length; i++) {
    var text = segment[i];
    if (text.match(/^\s*<\s*([a-zA-Z]+)(\s+[^>]+)?\s*>\s+/)) {
      var tagname = RegExp.$1.toLowerCase();
      if (tagname == "p" || tagname == "ul" || tagname == "ol"
	  || tagname == "blockquote" || tagname == "pre") {
	r += text;
	continue;
      }
    }

    var pre = "";
    var post = "";
    if (text.match(/^\s+/)) {
      pre = RegExp.lastMatch;
      text = RegExp.rightContext;
    }
    if (text.match(/\s+$/)) {
      post = RegExp.lastMatch;
      text = RegExp.leftContext;
    }
    if (text == "") {
      r += pre + text + post;
    } else {
      text = "<p>" + text + "</p>";
      text = text.replace(/<p><\/p>/g, "");
      r += pre + text + post;
    }
  }

  return r;
}

function split_to_lines(text, num) {
  var r = '';
  while (text.length > num) {
    r += text.substring(0, num) + '\n';
    text = text.substring(num);
  }
  r += text + '\n';
  return r;
}

function encrypt_textarea() {
  var email = document.getElementById('email').value;
  var text = document.getElementById('comment-text').value;
  var hint = document.getElementById('email-hint').value;
  var salt_proverb = document.getElementById('salt-proverb').innerHTML;

  salt_proverb = cpt_undecorate_comment(salt_proverb);

  var salt = '\n'
      + 'ランダムことわざ: ' + salt_proverb + '\n';
//en/  var salt = '\n'
//en/      + 'Random proverb: ' + salt_proverb + '\n';

  if (! email || email.match(/^\s*$/)) {
    alert("パスワード(メールアドレス)が入力されてません。");
//en/    alert("No password (mail address).");
    return false;
  }
  if (email.match(/^\s+/) || email.match(/\s+$/)) {
    alert("パスワードの前後のスペースを除去してください。");
//en/    alert("Delete spaces before or after the password.");
    return false;
  }
  if (! check_comment_html(text + salt)) {
    alert("HTML エラー\n" + PARSE_ERROR);
//en/    alert("HTML Error.\n" + PARSE_ERROR);
    return false;
  }

  document.getElementById('encrypt-backup').value = text;

  var cpt = encrypt_64(utf8_encode(email), utf8_encode(text + salt));

  var cont = ''
    + 'Hint: ' + hint + '\n\n'
    + '--BEGIN:' + CRYPT_NAME.toUpperCase() + '--\n'
    + split_to_lines(cpt, 76)
    + '--END:' + CRYPT_NAME.toUpperCase() + '--\n';

  document.getElementById('comment-text').value = cont;
  document.getElementById('comment-text').readOnly = true;
//  document.getElementById('preview').disabled = true;
  document.getElementById('encrypt').disabled = true;
  document.getElementById('cancel-encrypt').disabled = false;

  return true;
}

function cancel_encrypt () {
  document.getElementById('comment-text').value = document.getElementById('encrypt-backup').value;
  document.getElementById('comment-text').readOnly = false;
  document.getElementById('preview').disabled = false;
  document.getElementById('encrypt').disabled = false;
  document.getElementById('cancel-encrypt').disabled = true;
}

function append_omit_info () {
  var email = document.getElementById('email').value;
  var text = document.getElementById('comment-text').value;
  if (! text.match(/\n$/)) {
    text += '\n';
  }
  
  if (! email || email.match(/^\s*$/)) {
    return true;
  }
  if (email.match(/^\s+/) || email.match(/\s+$/)) {
    alert("パスワードの前後のスペースを除去してください。");
//en/    alert("Delete spaces before or after the password.");
    return false;
  }
  var identifier = allot_magic(text);
  var delete_key = allot_magic_16();

  var omit_info = "\n[omit-info: "
    + identifier + " "
    + MAC_HASH_NAME.toLowerCase() + ":"
    + mac_hash_64(delete_key, identifier)+ " "
    + CRYPT_NAME.toLowerCase() + ":"
    + encrypt_64(utf8_encode(email), delete_key) + "]\n";

  document.getElementById('comment-text').value = text + omit_info;
  return true;
}

function omit_comment() {
  var num = this.num;
  var a = getElementsByTagAndClassName(document, "div", "comment-content");
  var div = a[num];
  var container = getElementsByTagAndClassName(div, "span", "omit-span")[0];
  var popup = document.createElement('div');
  popup.className = "popup-overlay";
  popup.id = "popup-overlay-" + num;
  var html = ''
    + '<h3>コメントを「削除」します。</h3>\n'
    + '<p class="omit-warning">ただし、データからは削除されず、JavaScript が有効なユーザーに対し非表示になるだけです。４ヶ月以内に管理者が本当の削除をすることでしょう。<br />\n'
    + '書き込み時の暗号化パスワード(メールアドレス形式)を入力してください。<br /></p>\n'
    + '<div class="omit-widget">\n'
    + 'パスワード: <input type="text" id="popup-password-{{num}}" /><br/>\n'
    + '削除理由: <input type="text" id="popup-reason-{{num}}" /><br/>\n'
    + '<input type="button" value="削除" id="popup-omit-{{num}}" />\n'
    + '<input type="button" value="確認" id="popup-omit-preview-{{num}}" />\n'
    + '<input type="button" value="キャンセル" id="popup-close-{{num}}" /><br />\n'
    + '</div>\n'
  ;
//en/  var html = ''
//en/    + '<h3>"Delete" the comment.</h3>\n'
//en/    + '<p class="omit-warning">"Delete" is not deleting a comment from the server, but omitting it for JavasSript-available users.  Within 4 months, the administrator may delete it truely.<br />\n'
//en/    + 'Input the password which the commentator wrote.<br /></p>\n'
//en/    + '<div class="omit-widget">\n'
//en/    + 'Password: <input type="text" id="popup-password-{{num}}" /><br/>\n'
//en/    + 'Reason for deletion: <input type="text" id="popup-reason-{{num}}" /><br/>\n'
//en/    + '<input type="button" value="Delete" id="popup-omit-{{num}}" />\n'
//en/    + '<input type="button" value="Preview" id="popup-omit-preview-{{num}}" />\n'
//en/    + '<input type="button" value="Cancel" id="popup-close-{{num}}" /><br />\n'
//en/    + '</div>\n'
  ;
  html = html.replace(/\{\{num\}\}/g, num);
  popup.innerHTML = html;
  container.appendChild(popup);
  add_event_listener(document.getElementById("popup-close-" + num),
		     "click", bind(function () {
		       var popup = document.getElementById(this.parent_id);
		       var parent = popup.parentNode;
		       parent.removeChild(popup);
		     }, {parent_id: "popup-overlay-" + num}), false);
  add_event_listener(document.getElementById("popup-omit-preview-" + num),
		     "click",
		     bind(submit_omit, {num: num, preview: true}),
		     false
		    );
  add_event_listener(document.getElementById("popup-omit-" + num),
		     "click",
		     bind(submit_omit, {num: num, preview: false}),
		     false
		    );
}

function submit_omit () {
  var num = this.num;
  var preview = this.preview;
  var email = document.getElementById("popup-password-" + num).value;
  var reason = document.getElementById("popup-reason-" + num).value;
  var a = getElementsByTagAndClassName(document, "div", "comment-content");
  if (! a[num]) {
    alert("何かおかしい");
//en/    alert("What's wrong!");
    return false;
  }
  var omit_info = getElementsByTagAndClassName(a[num], "p", "omit-info")[0];
  if (! omit_info.innerHTML.match(/\[omit-info: ([01-9]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+)\]/i)) {
    alert("何かおかしい");
//en/    alert("What's wrong!");
    return false;
  }
  var identifier = RegExp.$1;
  var mac_hash_name = RegExp.$2;
  var delete_hash = RegExp.$3;
  var crypt_name = RegExp.$4;
  var delete_key_cpt = RegExp.$5;
  if (mac_hash_name != MAC_HASH_NAME.toLowerCase()
      || crypt_name != CRYPT_NAME.toLowerCase()) {
    alert("何かおかしい");
//en/    alert("What's wrong!");
    return false;
  }

  var delete_key = decrypt_64(utf8_encode(email), delete_key_cpt);
  if (delete_key == false) {
    alert("パスワードが違います。");
//en/    alert("Wrong password!");
    return false;
  }
  var delete_key_64 = base64_encode(delete_key);
  var text = "[omit: " + num + " "+ identifier + " " 
    + BASE64_NAME.toLowerCase() + ":" + delete_key_64 
    + "]\n\n" + reason
  ;

  var form = document.getElementsByName("comments_form")[0];
//  document.getElementById('author').value = "";
  document.getElementById('email').value = email;
//  document.getElementById('url').value = "";
  document.getElementById('bakecookie').checked = false;
  document.getElementById('comment-text').value = text;

  if (preview) {
    document.getElementById('preview').click();
  } else {
//    form.submit();
    document.getElementById('post').click();
  }
    
//  return true;
  return false;
}

function decrypt_comment() {
  var num = this.num;
  var email = document.getElementById('crypted-email-' + num).value;
  var crypted = document.getElementById('crypted-text-' + num).value;
  
  var a = getElementsByTagAndClassName(document, "div", "comment-content");

  var text = decrypt_64(utf8_encode(email), crypted);
  if (text == false) {
    alert("パスワードが違います。")
//en/    alert("Wrong password!");
    return false;
  }
  text = utf8_decode(text);
  if (! check_comment_html(text)) {
    alert("複号化に失敗しました。不審な HTML コードがあります。\n" + PARSE_ERROR);
//en/    alert("Decryption was failed.  There is extraordinary HTML code.\n" + PARSE_ERROR);
    return false;
  }

  var tail = '';
  while (text.match(/\n([^\n]+:[^\n]+)\n$/)) {
    text = RegExp.leftContext + "\n";
    tail = RegExp.$1 + "<br/>\n" + tail;
  }
  if (tail != '') {
    tail = '<p class="decrypted-tail">' + tail + '</p>\n';
  }
  
  var div = document.createElement('div');
  div.className = 'decrypted';
  div.innerHTML = cpt_decorate_comment(format_comment(text) + tail);
  var prev = document.getElementById('crypted-' + num);
  var parent = prev.parentNode;
  parent.replaceChild(div, prev);
}

function cpt_decorate_comments() {
  var a = getElementsByTagAndClassName(document, "div", "comment-content");
  var omit = {};

  if (a && a.length > 0) {
    for (var i = a.length - 1; i >= 0; i--) {
      var html = a[i].innerHTML;
      if (html.match(/<p>\[omit: ([01-9]+) ([01-9]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+)\]\s*(?:<br\s*\/?>\s*)?<\/p>/i)) {
	var num = parseInt(RegExp.$1, 10);
	var identifier = RegExp.$2;
	var base64_name = RegExp.$3;
	var delete_key_64 = RegExp.$4;
	var pre = RegExp.leftContext;
	if (base64_name != BASE64_NAME.toLowerCase()) {
	  continue;
	}
	if (pre.match(/<p>/i)) {
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

    for (var i = 0; i < a.length; i++) {
      var html = a[i].innerHTML;
      if (html.match(/<p>\[omit-info: ([01-9]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+)\]\s*(?:<br\s*\/?>\s*)?<\/p>/i)) {
	var identifier = RegExp.$1;
	var mac_hash_name = RegExp.$2;
	var delete_hash = RegExp.$3;
	var crypt_name = RegExp.$4;
	var delete_key_cpt = RegExp.$5;
	var pre = RegExp.leftContext;
	var m = RegExp.lastMatch;
	html = RegExp.rightContext;
	while (html.match(/<p>\[omit-info: ([01-9]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+) ([a-z01-9_]+):([01-9A-Za-z\+\/]+)\]\s*(?:<br\s*\/?>\s*)?<\/p>/i)) {
	  identifier = RegExp.$1;
	  mac_hash_name = RegExp.$2;
	  delete_hash = RegExp.$3;
	  crypt_name = RegExp.$4;
	  delete_key_cpt = RegExp.$5;
	  pre += m + RegExp.leftContext;
	  m = RegExp.lastMatch;
	  html = rightContext;
	}

	if (mac_hash_name != MAC_HASH_NAME.toLowerCase()
	    || crypt_name != CRYPT_NAME.toLowerCase()) {
	  continue;
	}
	if (html.match(/<p>/i)) {
	  continue;
	}
      
	var deleted = false;
	if (omit[identifier]) {
	  for (var j = 0, l = omit[identifier]; j < l.length; j++) {
// Commented out below for the comment index page of the auther's site.
//	    if (! IN_COMMENT_PREVIEW && (l[j][0] <= i || l[j][1] < i)) {
//	      continue;
//	    }
	    if (l[j][2] != delete_hash) {
	      continue;
	    }
	    a[l[j][0]].style.display = "none";
	    a[i].innerHTML = '<p class="omitted">削除。</p>';
//en/	    a[i].innerHTML = '<p class="omitted">Deleted.</p>';
	    deleted = true;
	  }
	}
	if (deleted) {
	  continue;
	}

	html = pre + '<p class="omit-info">[omit-info: ' + identifier + ' '
	  + MAC_HASH_NAME.toLowerCase() + ":" + delete_hash + ' '
	  + CRYPT_NAME.toLowerCase() + ":" + delete_key_cpt
	  + ']<br/>\n</p>' + html
	;
	a[i].innerHTML = html;
      }

      if (html.match(/<p>--BEGIN:([A-Z01-9_]+)--\s*(?:<br\s*\/?>|<\/p>)/i)
	  && RegExp.$1 == CRYPT_NAME.toUpperCase()) {
	var pre = RegExp.leftContext;
	var html = RegExp.rightContext;
	if (! (html.match(/--END:([A-Z01-9_]+)--\s*(?:<br\s*\/?>\s*)?<\/p>/i)
	       && RegExp.$1 == CRYPT_NAME.toUpperCase()) ) {
	  continue;
	}
	html = RegExp.rightContext;
	var crypted = strip_html(RegExp.leftContext).replace(/\s/g, "");
	var hint = null;
	if (pre.match(/<p>Hint: ([^<>]*)<\/p>/i)) {
	  hint = RegExp.$1;
	  pre = RegExp.leftContext;
	}
      
	var s = ''
          + '<input type="hidden" id="crypted-text-{{num}}" value="" />'
          + '<em>秘匿コメント</em> パスワード: '
          + '<input type="text" class="crypted-key" id="crypted-email-{{num}}" />'
          + '<input type="button" class="crypted-decrypt" id="crypted-decrypt-{{num}}" value="暗号解除" /><br />\n'
	;
//en/      var s = ''
//en/          + '<input type="hidden" id="crypted-text-{{num}}" value="" />'
//en/          + '<em>Secret Comment</em> Password: '
//en/          + '<input type="text" class="crypted-key" id="crypted-email-{{num}}" />'
//en/          + '<input type="button" class="crypted-decrypt" id="crypted-decrypt-{{num}}" value="Decrypt" /><br />\n'
//en/	;
	if (hint && ! hint.match(/^\s*$/)) {
          s += '<span class="crypted-hint">(' + hint + ')</span><br />\n';
	}
	s = s.replace(/\{\{num\}\}/g, i);
      
	a[i].innerHTML = pre
	  + '<div class="crypted" id="crypted-' + i + '"></div>\n'
	  + html;
	document.getElementById('crypted-' + i).innerHTML = s;
	document.getElementById('crypted-text-' + i).value = crypted;
	html = a[i].innerHTML;
      }

      a[i].innerHTML = cpt_decorate_comment(html);
    }

    for (var i = 0; i < a.length; i++) {
      var omit_info = getElementsByTagAndClassName(a[i], "p", "omit-info");
      if (! IN_COMMENT_PREVIEW && omit_info && omit_info.length > 0) {
	var posted = getElementsByTagAndClassName(a[i], "p", "posted")[0];
	var span = document.createElement('span');
	span.className = 'omit-span popup-container';
	span.appendChild(document.createTextNode(' | '));
	var button = document.createElement('input');
	button.type = 'button';
	button.className = 'omit-button';
	button.id = 'omit-button-' + i;
	button.value = "削除";
//en/	button.value = "Delete";
	add_event_listener(button, "click",
			   bind(omit_comment, {num: i}), false);
	span.appendChild(button);
	posted.appendChild(span);
      }
      var crypted_div = getElementsByTagAndClassName(a[i], "div", "crypted");
      if (crypted_div && crypted_div.length > 0) {
	add_event_listener(document.getElementById('crypted-decrypt-' + i),
			   "click", bind(decrypt_comment, {num: i}), false);
      }
    }
  }

  if (document.getElementById('encrypt-form-data')) {
    document.getElementById('salt-proverb').innerHTML
      = cpt_decorate_comment(PROVERBS[Math.floor(PROVERBS.length * Math.random())]);

    document.getElementById('encrypt').disabled = false;
//    document.getElementById('cancel-encrypt').disabled = true;
    document.getElementById('cancel-encrypt').disabled = false;
  }
}

add_event_listener(window, "load", cpt_decorate_comments, false);


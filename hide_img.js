//
// hide_img.js
//
// Functions to hide imgs on load and to show them on click.
//
var VERSION_hide_img = "0.07"; // Time-stamp: <2020-05-13T09:15:50Z>

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
//'require CSS "http://jrf.cocolog-nifty.com/mylib/hide_img.css"'
//'provide "http://jrf.cocolog-nifty.com/mylib/hide_img.js"';

var HIDE_IMG_CLASS_ASSOC  = [
  ["violence", "暴力表現"],
  ["sexual", "性的表現"]
];
var HIDE_IMG_CONFIRM_MESSAGE = ''
  + 'このサイトに18歳未満の閲覧を禁止すべき画像はありませんが、'
  + '閲覧者が18歳以上であることが推奨される画像があり、'
  + 'このページにあるそれらへの覆いが全て外されます。\n\n'
  + 'よろしいですか？'
;
var HIDE_IMG_ONCLICK_MESSAGE = 'クリックで表示';

//en/ var HIDE_IMG_CLASS_ASSOC  = [
//en/   ["violence", "Violence"],
//en/   ["sexual", "Sexual"]
//en/ ];
//en/ var HIDE_IMG_CONFIRM_MESSAGE = ''
//en/   + 'This site has no image of X18, '
//en/   + 'but has veiled images of R18.  '
//en/   + '"OK" unveils all of them on this page.'
//en/ ;
//en/ var HIDE_IMG_ONCLICK_MESSAGE = 'Click to unveil';

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

function hide_img_show_all (ev) {
  var l = document.getElementsByTagName("span");
  var l1 = [];
  for (var i = 0; i < l.length; i++) {
    var cont = l[i];
    if (! cont.className.match(/(?:^|\s)hide-img-container(?:$|\s)/)) {
      continue;
    }
    l1.push(cont.id);
  }
  for (var i = 0; i < l1.length; i++) {
    var cont = document.getElementById(l1[i]);
    var img = cont.firstChild;
    var p = cont.parentNode;
    p.replaceChild(img, cont);
    img.style.display = "inline";
    if (img.tagName.toUpperCase() == "A") {
      var l2 = img.getElementsByTagName("img");
      for (var j = 0; j < l2.length; j++) {
	l2[j].style.opacity = "1.0";
      }
    } else {
      img.style.opacity = "1.0";
    }
  }
}

function hide_img_on_click (ev) {
  var r = window.confirm(HIDE_IMG_CONFIRM_MESSAGE);
  if (r) {
    hide_img_show_all(ev);
  }
}

function hide_img_hide_all (ev) {
  var l = document.getElementsByTagName("img");
  if (l.length == 0) {
    return;
  }

  var regexp = "";
  var assoc = {};
  for (var i = 0; i < HIDE_IMG_CLASS_ASSOC.length; i++) {
    var a = HIDE_IMG_CLASS_ASSOC[i];
    if (regexp != "") {
      regexp += "|";
    }
    regexp += a[0];
    assoc[a[0].toLowerCase()] = a[1];
  }
  regexp = new RegExp("(?:^|\\s)(" + regexp + ")(?:$|\\s)", "i");

  var cont_id = 0;
  for (var i = 0; i < l.length; i++) {
    var img = l[i];
    if ((img.parentNode.id
	 && img.parentNode.id.match(/^hide-img-container-/))
	|| (img.parentNode.parentNode && 
	    img.parentNode.parentNode.id && 
	    img.parentNode.parentNode.id.match(/^hide-img-container-/))) {
      continue;
    }
    if (! img.className.match(regexp)) {
      continue;
    }
    var cl = RegExp.$1.toLowerCase();
    var w = (img.width || img.offsetWidth) + "px";
    var h = (img.height || img.offsetHeight) + "px";

    var span = document.createElement("span");
    span.className = "hide-img-container";
    ++cont_id;
    span.id = "hide-img-container-" + cont_id;
    var p = img.parentNode;
    if (p.tagName.toUpperCase() == "A") {
      img = p;
      p = p.parentNode;
    }
    p.replaceChild(span, img);
    span.appendChild(img);
    img.style.display = "none";
    span.style.width = w;
    span.style.height = h;
    var mes = document.createElement("p");
    mes.className = "hide-img-message";
    var html = '<span class="hide-img-message-title">'
      + assoc[cl] + '</span><br/><input type="button" value="'
      + HIDE_IMG_ONCLICK_MESSAGE
      + '" id="hide-img-message-button-{{num}}" /><br />'
    ;
    html = html.replace(/\{\{num\}\}/g, cont_id);
    mes.innerHTML = html;
    span.appendChild(mes);
    var btn = document.getElementById("hide-img-message-button-" + cont_id);
    add_event_listener(btn, "click", 
		       bind(hide_img_on_click, {parent_id: cont_id}),
		       false);
  }
}

add_event_listener(window, "load", hide_img_hide_all, false);

//
// jrf_pr_widget_2.js
//
// A widget for JRF's self appeal.
//
var VERSION_jrf_pr_widget_2 = "0.03" // Time-stamp: <2022-03-10T15:40:09Z>

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
//'provide "http://jrf.cocolog-nifty.com/mylib/jrf_pr_widget.js"';
//
//'require "http://crypto-js.googlecode.com/files/2.5.3-crypto-sha1-hmac-pbkdf2-blockmodes-aes.js"';
//'require "http://jrf.cocolog-nifty.com/mylib/jrf_crypt_comment.js"';

var JRF_PR_ENTRIES_2 = [
  {
    "url" : "http://jrf.cocolog-nifty.com/archive/youscout/youscout.html?default_lang=ja",
    "title" : "易とタロットの融合？<br/>社会シミュレーションの雛型？<br/><span class=\"font-larger\">『易双六』</span>無料公開中！",
    "excerpt" : "JRF が設計したタロットカードを使ったソリティアの一種。ブラウザゲームとして登場。",
    "freq" : 1
  },
  {
    "url" : "http://www.vector.co.jp/soft/data/edu/se507504.html",
    "title" : "「<span class=\"font-larger\">JRF の私見</span>」をまとめて電子書籍化 (EPWING化)。<br/>シェアウェアとして<span class=\"font-larger\">販売中！</span>",
    "excerpt" : "2014年6月までの本サイトの記事をまとめてダウンロードできます。資料として保存していただけると著者である私が喜びます。",
    "freq" : 1
  },
  {
    "url" : "http://amazon.co.jp/dp/B01CERFZLA/",
    "title" : "道徳本<br/>『<span class=\"font-larger\">道を語り解く</span>』。<br/>Amazon Kindle で<span class=\"font-larger\">販売中！</span>",
    "excerpt" : "このブログで無料公開中の道徳に関する論考を Kindle 化。縦書きで読めます。例えば、『なぜ人を殺してはいけないのか』……「現代の人」が「昔の自然状態」から考えつくような解答として「分業」「信用」「保険」のそれぞれの面から「なぜ人を殺してはいけないのか」を説明します。 ",
    "freq" : 1
  },
  {
    "url" : "http://amazon.co.jp/dp/B01CEE9CW6/",
    "title" : "小説集<br/>『<span class=\"font-larger\">エアロダイバー</span>　他五篇』。<br/>Amazon Kindle で<span class=\"font-larger\">販売中！</span>",
    "excerpt" : "JRF によるＳＦとファンタジーの短編小説集。『水竜狩り』、『兎の結婚式』、『夏色の白昼夢』、『白い歌』、『ムーライト・レヴュウ』、『エアロダイバー』の六篇所収。",
    "freq" : 1
  },
  {
    "url" : "https://kakuyomu.jp/works/1177354054881174970",
    "title" : "小説<br/>『<span class=\"font-larger\">神々のための黙示録</span>』。<br/>無料で<span class=\"font-larger\">公開中！</span>",
    "excerpt" : "JRF が書いた宗教的中篇小説。「最後の審判」がやってきた後の世界を神からつかわされた『旅人』が巡る。『旅人』が出会うのは、自分が死んだことに気付いている者、いない者、様々である。「最後の審判」とはそのようなものではないと思う方も、この「神学」に触れて欲しい。",
    "freq" : 1
  },
  {
    "url" : "https://www.amazon.co.jp/dp/B09TPTYT6Q/",
    "title" : "技術系電子本<br/><span class=\"font-larger\">『「シミュレーション仏教」の試み』</span>(JRF 著)。<br/>Amazon Kindle で<span class=\"font-larger\">販売中！</span>",
    "excerpt" : "仏教とは、本目的三条件「来世がないほうがよい」「生きなければならない」「自己の探求がよい」を命令的前提として行う社会に対する最適化プログラムなのではないか？…Python による仏教社会シミュレーションの解説。",
    "freq" : 1
  },
  null
];
JRF_PR_ENTRIES_2.pop();


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

add_event_listener(window, "load", jrf_pr_widget_2_draw, false);
})();

function jrf_pr_widget_2_draw(ev) {
  var allowed = JRF_PR_ENTRIES_2;
  
  if (allowed.length > 0) {
    var sum = 0;
    for (var i = 0; i < allowed.length; i++) {
      sum += allowed[i].freq;
    }
    var e;
    var num = sum * Math.random();
    sum = 0;
    for (var i = 0; i < allowed.length; i++) {
      sum += allowed[i].freq;
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

    var div = document.getElementById('jrf_pr_widget_2');
    if (div) {
      div.innerHTML = '<h2>[自己PR]</h2>'
	+ banner;
    }
  }
}

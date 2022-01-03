//
// jrf_cocolog_tools.js 
//
// Time-stamp: <2012-02-14T14:18:34Z>
//
// Functions for http://jrf.cocolog-nifty.com/ .
//

//
// Author's Link:
//
//   http://jrf.cocolog-nifty.com/software/
//   (The page is written in Japanese.)
//

function change_aboutme_link(div) {
  var a = div.getElementsByTagName("a");
  for (var i = 0; i < a.length; i++) {
    if (a[i].href.match(/^http:\/\/jrf.aboutme.jp\//)) {
      var prev = a[i].href;

      if (a[i].href.match(/\/user_statuses\/show\/([01-9]+)/)) {
	a[i].href = "http://jrf.cocolog-nifty.com/statuses/jumpbytitle.html?q="
          + "aboutme:" + RegExp.$1;
      } else if (a[i].href.match(/\/user_statuses\/list/)
		 || a[i].href == "http://jrf.aboutme.jp/") {
	a[i].href = "http://jrf.cocolog-nifty.com/statuses/";
      }

      if (a[i].href != prev && ! a[i].title) {
	a[i].title = "リンク置換前: " + prev;
      }
    }
  }
}

function decorate_entry(entry) {
  change_aboutme_link(entry);
}

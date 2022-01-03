//
// http://jrf.cocolog-nifty.com/mylib/proverbs.js 
//
// Japanese Proverbs.
//
var VERSION_proverbs = "0.15" // Time-stamp: <2020-11-24T19:57:08Z>

//
// License: 
//
//   I hope this list of Japanese traditional proverbs to be
//   public-domain, but you need some attention to the fact that this
//   listing was cited mainly from the book and the web page below.
//
// Author's Link:
//
//   http://jrf.cocolog-nifty.com/software/
//   (The page is written in Japanese.)
//

//'use utf8'; // Japanese

// 入力の際に参考にしたもの。
//
// 森久保安美 監修『学研まんが事典シリーズ ことわざ大事典』(学研, 1986年)
//
// 「座右の銘」研究会『こども座右の銘』 (メトロポリタンプレス, 2012年)
//
// 小林昌平『その悩み、哲学者がすでに答えを出しています』 (文響社, 2018年)
//
// ラビ・M・トケイヤー『ユダヤ格言集』(実業之日本社, 1975年)
//
// ラビ・M・トケイヤー『ユダヤ五〇〇〇年の知恵』(講談社＋α文庫, 1993年)
//
//《Wiktionary:四字熟語の一覧 - ウィクショナリー日本語版》
// http://ja.wiktionary.org/wiki/Wiktionary:%E5%9B%9B%E5%AD%97%E7%86%9F%E8%AA%9E%E3%81%AE%E4%B8%80%E8%A6%A7
//
// 《最も古い「最近の若者は…」のソース: わたしが知らないスゴ本は、きっとあなたが読んでいる》
// http://dain.cocolog-nifty.com/myblog/2007/04/post_7265.html
//
// 《富士見台の館：過去の「今日の名言（＆迷言）」》
// http://www.geocities.jp/fuji3461/wise_saying.html
//
// 《関係ないAAに世界史の名言を言わせるスレ:哲学ニュースnwk》
// http://blog.livedoor.jp/nwknews/archives/4225008.html
//
// 《地獄への道は善意で舗装されているとは - はてなキーワード》
// http://d.hatena.ne.jp/keyword/%C3%CF%B9%F6%A4%D8%A4%CE%C6%BB%A4%CF%C1%B1%B0%D5%A4%C7%CA%DE%C1%F5%A4%B5%A4%EC%A4%C6%A4%A4%A4%EB
//

var PROVERBS =
  [
    '青菜に塩。',
    '青は藍[あい]より出でて藍より青し。',
    '秋の日は釣瓶[つるべ]落し。',
    '悪事千里を走る。',
    '悪銭身につかず。',
    '足下[あしもと]から鳥が立つ。',
    '頭隠して尻隠さず。',
    '当たって砕[くだ]けろ。',
    '買わないくじは当たらない。',
    '当たるも八卦、当たらぬも八卦。',
    '暑さ寒さも彼岸まで。',
    '虻蜂[あぶはち]取らず。',
    '雨垂れ石を穿[うが]つ。',
    '雨降って地固まる。',
    '案ずるより産むが易[やす]し。',
    '言うは易[やす]く、行うは難[かた]し。',
    '一念岩をも通す。',
    '一日千秋の思い。',
    '一難去ってまた一難。',
    '一年の計は元旦にあり。',
    '一を聞いて十を知る。',
    '一寸先は闇[やみ]。',
    '一寸の虫にも五分の魂[たましい]。',
    '一銭を笑う者は一銭に泣く。',
    '犬も歩けば棒に当たる。',
    '命あっての物種[ものだね]。',
    '井の中の蛙[かわず]大海を知らず。',
    '色気よりも食い気。',
    '鰯[いわし]の頭も信心から。',
    '言わぬが花。',
    '上には上がある。',
    '魚心あれば水心。',
    '魚[うお]の水を得たるがごとし。',
    '嘘から出たまこと。',
    '嘘吐[うそつ]きは泥棒の始まり。',
    '鵜の真似する鴉[からす]。',
    '馬の耳に念仏。',
    '生みの親より育ての親。',
    '裏には裏がある。',
    '売り言葉に買い言葉。',
    '噂[うわさ]をすれば影がさす。',
    '絵に描[か]いた餅。',
    '蛯[えび]で鯛[たい]を釣る。',
    '縁の下の力持ち。',
    '老いては子に従え。',
    '大風呂敷[おおぶろしき]を広げる。',
    '丘に上がった河童[かっぱ]。',
    '驕[おご]る平家は久しからず。',
    '鬼に金棒。',
    '鬼の居ぬ間に洗濯[せんたく]。',
    '帯に短し襷[たすき]に長し。',
    '溺[おぼ]れる者は藁[わら]をも掴[つか]む。',
    '親の心、子知らず。',
    '飼[か]い犬に手を咬[か]まれる。',
    '蛙[かえる]の子は蛙。',
    '蛙[かえる]の面[つら]に小便。',
    '顔で笑って心で泣いて、浪花節[なにわぶし]だよ人生は。',
    '火中の栗[くり]を拾[ひろ]う。',
    '勝って兜[かぶと]の緒[お]を締[し]めよ。',
    '壁に耳あり、障子[しょうじ]に目あり。',
    '果報は寝て待て。',
    '亀の甲より年の功。',
    '痒[かゆ]い所に手が届く。',
    '枯れ木も山の賑[にぎわ]い。',
    'かわいい子には旅させよ。',
    '看板に詐[いつわ]りなし。',
    '聞いて極楽、見て地獄[じごく]。',
    '聞くは一時[いっとき]の恥[はじ]、聞かぬは一生の恥。',
    '木に竹を接[つ]ぐ。',
    '昨日の友は今日の仇[あだ]。',
    '明日[あす]は我が身。',
    '窮鼠[きゅうそ]猫を噛[か]む。',
    '臭い物に蓋[ふた]をする。',
    '口は禍[わざわい]の門。',
    '栗よりうまい十三里。',
    '苦しい時の神頼み。',
    '君子の交わりは淡きこと水の如し。',
    '君子危うきに近寄らず。',
    '君子は周して比せず、小人は比して周せず。',
    '君子豹変す。',
    '芸は身をたすく。',
    '怪我[けが]の功名。',
    '喧嘩[けんか]両成敗[りょうせいばい]。',
    '光陰矢のごとし。',
    '後悔[こうかい]先に立たず。',
    '好事、魔多し。',
    '弘法[こうぼう]にも筆の誤[あやま]り。',
    '虎穴[こけつ]に入[い]らずんば虎子[こじ]を得ず。',
    '転ばぬ先の杖[つえ]。',
    '転んでもただでは起きぬ。',
    '歳月人を待たず。',
    '先んずれば人を制す。',
    '猿も木から落ちる。',
    '去る者は追わず、来る者は拒[こば]まず。',
    '去る者は日々に疎[うと]し。',
    '触[さわ]らぬ神に祟[たた]りなし。',
    '三人寄れば文殊[もんじゅ]の知恵。',
    '親しき仲にも礼儀あり。',
    '自分で播[ま]いた種は、自分で刈[か]らねばならぬ。',
    '重箱の隅[すみ]を楊枝でほじくる。',
    '朱[しゅ]に交われば赤くなる。',
    '正直は一生の宝。',
    '少年老い易[やす]く学成り難[がた]し。',
    '勝負は時の運。',
    '初心忘るべからず。',
    '知らぬが仏。',
    '人事を尽[つ]くして天命を待つ。',
    '好きこそ物の上手なれ。',
    '過ぎたるは猶[なお]及ばざるがごとし。',

    '捨てる神あれば、拾[ひろ]う神あり。',
    '住めば都[みやこ]。',
    '急[せ]いては事を仕損[しそん]ずる。',
    '背に腹はかえられぬ。',
    '船頭多くして船[ふね]山に登る。',
    '善は急げ。',
    '千里の道も一歩から。',
    '袖[そで]摺[す]り合うも他生の縁。',
    '備えあれば患[うれ]えなし。',
    '大は小を兼[か]ねる。',
    '宝の持ち腐[ぐさ]れ。',
    '立つ鳥、跡[あと]を濁[にご]さず。',
    '立て板に水。',
    '蓼[たで]食う虫も好[す]き好[ず]き。',
    '旅の恥は掻[か]き捨て。',
    '旅は道連[みちづ]れ、世は情け。',
    '玉に瑕[きず]。',
    '短気は損気。',
    '塵[ちり]も積もれば山となる。',
    '月とすっぽん。',
    '月夜に提灯[ちょうちん]。',

    '角を矯[た]めて、牛を殺す。',
    '爪に火をともす。',
    '釣り落とした魚[うお]は大きい。',
    '鶴の一声[ひとこえ]。',
    '鶴は千年、亀は萬[まん]年。',
    '鉄は熱いうちに打て。',
    '手に汗を握[にぎ]る。',
    '出る杭[くい]は打たれる。',
    '天災は忘れたころにやってくる。',
    '天に向かって唾[つば]を吐[は]く。',
    '天は人の上に人を造らず。',
    '灯台、下[もと]暗し。',
    '同病、相[あい]憐[あわれ]む。',
    '遠い親戚[しんせき]より近くの他人。',
    '読書百遍[どくしょひゃっぺん]、義、自[おのず]から見[あら]わる。',
    '毒にも薬にもならぬ。',
    '毒をもって毒を制する。',
    '所変われば品[しな]変わる。',
    '隣[となり]の花は赤い。',
    '鳶[とんび]に油揚[あぶらあ]げをかっさらわれる。',
    '飛ぶ鳥を落とす勢い。',
    '捕[と]らぬ狸[たぬき]の皮算用[かわざんよう]。',
    '虎の威[い]を借る狐。',
    '団栗[どんぐり]の背競[せいくら]べ。',

    '飛んで火に入[い]る夏の虫。',
    '無い袖[そで]は振れぬ。',
    '長い物には巻かれよ。',
    '長口上[ながこうじょう]はあくびの種。',
    '泣きっ面[つら]に蜂[はち]。',
    '無くて七くせ、有って四十八くせ。',
    '情けは人の為[ため]ならず。',
    '七転び八起き。',
    '七度[ななたび]尋[たず]ねて人を疑え。',
    '怠[なま]け者の節句働き。',
    '生兵法[なまびょうほう]は大怪我[おおけが]のもと。',
    '習うより慣れろ。',
    '成らぬ堪忍[かんにん]、するが堪忍。',
    '二階から目薬。',
    '苦虫を噛[か]みつぶしたよう。',
    '憎[にく]まれっ子、世にはばかる。',
    '西から日が出る。',
    '煮[に]ても焼いても食えない。',
    '二度あることは三度ある。',
    '二兎[にと]を追う者は一兎[いっと]をも得ず。',
    '盗人[ぬすびと]を見て縄[なわ]を綯[な]う。',
    '濡れ手に粟[あわ]。',
    '猫に小判。',
    '猫糞[ねこばば]をきめこむ。',
    '寝耳に水。',
    '寝る子は育つ。',

    '寝た子を起こす。',
    '能ある鷹[たか]は爪[つめ]隠す。',
    '残り物には福がある。',
    '喉元[のどもと]過ぎれば熱さ忘れる。',
    '暖簾[のれん]に腕[うで]押し。',
    '馬脚[ばきゃく]を露[あら]わす。',
    '箸[はし]にも棒にもかからぬ。',
    '話し上手[じょうず]は聞き上手。',
    '花より団子[だんご]。',
    '早起きは三文の徳。',
    '腹が減っては軍[いくさ]はできぬ。',
    '腹八分に医者いらず。',
    '贔屓[ひいき]の引き倒[たお]し。',
    '人の噂[うわさ]も七十五日。',
    '人のふり見て我がふり直せ。',
    '人の褌[ふんどし]で相撲[すもう]をとる。',
    '人は見かけによらぬもの。',
    '火に油を注[そそ]ぐ。',
    '火のない所に煙は立たぬ。',
    '百聞[ひゃくぶん]は一見[いっけん]にしかず。',
    '風前の灯[ともしび]。',

    '覆水[ふくすい]盆に返らず。',
    '武士は食わねど高楊枝[たかようじ]。',
    '下手[へた]な鉄砲[てっぽう]、数打ちゃ当たる。',
    '下手[へた]の考え休むに似たり。',
    '下手[へた]の横好き。',
    '蛇[へび]に見込まれた蛙[かえる]のよう。',
    '仏の顔も三度まで。',
    '骨折り損の草臥[くたびれ]儲[もう]け。',
    '蒔[ま]かぬ種は生[は]えぬ。',
    '負けるが勝ち。',
    '待てば海路[かいろ]の日和[ひより]あり。',
    'ミイラ取りがミイラになる。',
    '身から出た錆[さび]。',
    '三日ぼうず。',
    '三つ子の魂[たましい]、百まで。',
    '昔取った杵柄[きねづか]。',
    '虫の居所[いどころ]が悪い。',
    '無理が通れば道理が引っ籠[こ]む。',
    '目くそ、鼻くそを笑う。',
    '目の上のたんこぶ。',
    '餅[もち]は餅屋。',
    '桃栗三年、柿八年。',

    '門前の小僧[こぞう]、習わぬ経[きょう]を読む。',
    '焼け石に水。',
    '焼けぼっくいに火がつく。',
    '安物買いの銭[ぜに]失い。',
    '柳の下にいつも泥鰌[どじよう]は居[お]らぬ。',
    '薮[やぶ]をつついて蛇[へび]を出す。',
    '寄らば大樹[たいじゅ]の蔭[かげ]。',
    '来年のことを言えば鬼が笑う。',
    '楽あれば苦あり。',
    '李下[りか]に冠[かんむり]を正さず。',
    '良薬は口に苦し。',
    '類は友を呼ぶ。',
    '我が身をつねって人の痛さを知れ。',
    '禍[わざわい]転じて福となす。',
    '笑う門には福来たる。',

    '医は仁術。',
    '嘘も方便。',
    '小田原[おだわら]評定[ひょうじょう]。',
    '漁夫の利。',
    '疑心暗鬼を生ず。',
    '一日三秋。',
    '一病息災。',
    '無病息災。',
    '因果応報。',
    '呉越同舟。',
    '五里霧中。',
    '巧言令色、鮮[すくな]し仁。',
    '画竜点睛[がりょうてんせい]を欠く。',
    '器用貧乏。',
    '義を見てせざるは勇なきなり。',
    '鶏口[けいこう]となるも牛後[ぎゅうご]となるなかれ。',
    '孝行のしたい時分に親はなし。',
    '五十歩百歩。',
    'コロンブスの卵。',
    '人間[じんかん]万事、塞翁が馬。',
    '十人十色。',
    '将を射んと欲すれば先[ま]ず馬を射よ。',
    '頭寒足熱。',
    'その手は桑名[くわな]の焼きはまぐり。',
    '大器晩成。',
    '大山鳴動[たいざんめいどう]して鼠[ねずみ]一匹[いっぴき]。',
    '大食短命。',
    '朝令暮改。',
    '沈黙は金、雄弁は銀。',
    '天衣無縫[てんいむほう]。',
    '多岐亡羊。',
    '二束三文。',
    '汝[なんじ]の敵を愛せよ。',
    '豚に真珠。',
    '猫の首に鈴を付ける。',
    '馬耳東風。',
    '背水の陣。',
    '敗軍の将は兵を語らず。',
    '破竹の勢い。',
    '八面六臀[はちめんろっぴ]。',
    '始めよければ終りよし。',
    '不言実行。',
    '有言実行。',
    '竜頭蛇尾。',
    '羊頭狗肉。',
    '油断大敵。',
    '論語読みの論語知らず。',
    '矛盾。',
    '自家薬籠中の物。',
    '天上天下唯我独尊。',
    '心頭滅却[しんとうめっきゃく]すれば火もまた涼[すず]し。',
    '艱難辛苦[かんなんしんく]汝[なんじ]を玉にす。',
    '下戸[げこ]の薬知らず。上戸[じょうご]の毒知らず。',

    '夏は暑い、冬は寒い。',
    '伝・織田信長「鳴かぬなら 殺してしまえ ほととぎす」',
    '伝・豊臣秀吉「鳴かぬなら 鳴かしてみせよう ほととぎす」',
    '伝・徳川家康「鳴かぬなら 鳴くまで待とう ほととぎす」',
    '赤信号、みんなで渡れば怖くない。 (ビートたけし [コメディアン・映画監督])', 
    '赤信号、みんなで渡ればみんな死ぬ。 (『クイズダービー』 篠沢教授)',
//    '赤信号みんなで渡らず帰らせていただきます。一人道路を横切って。 (JRF [ブロガー])',
    'タフでなければ生きて行けない。優しくなれなければ生きている資格がない。 (フィリップ・マーロウ [探偵小説の主人公])',
    '撃[う]っていいのは撃たれる覚悟のある奴だけだ。 (フィリップ・マーロウ [探偵小説の主人公])',
    '長期的には我々は皆死んでいる。 (ジョン・メイナード・ケインズ [経済学者])',
    '「夕べどこに？」「そんな昔のことは覚えていない」「今夜会える？」「そんな先のことはわからない」 (映画『カサブランカ』)',
    '考えるな、感じろ。 (映画『燃えよドラゴン』)',
    'やり方は三つしかない。正しいやり方。間違ったやり方。俺のやり方だ。(映画『カジノ』)',
    '醜[みにく]いのは悪い魔女だけよ。 (映画『オズの魔法使』)',

    '勝ちに不思議の勝ちあり。負けに不思議の負けなし。 (松浦静山より野村克也 [野球監督])',
    '伝・古代エジプトの一書役「この頃の若い者は…古人の質実剛健なる流儀を、ないがしろにする」 (柳田国夫『木綿以前の事』)',
    '医者と坊主と弁護士、この三つの職業は人の苦しみで飯を食っている。だから聖職でなければならない。 (中坊公平 [弁護士])',
    '恋は人を盲目にするが、結婚は視力を戻してくれる。 (リヒテンベルク『箴言』)',
    '恋は盲目であり、恋人たちは自らの犯す見事なほどの愚さに気付きもしない。 (シェークスピア 『ヴェニスの商人』)',
    'むしろ鶏口[けいこう]となるも牛後[ぎゅうご]となるなかれ。 (『史記』蘇秦伝)',
    '相棒二人いていつも意見が一致するなら、そのうち一人はいなくてもいい人間だ。 (『片々録』の引用よりカーネギー『人を動かす』)',
    '盲目であることが悲惨なのではない。盲目状態に耐えられないことが悲惨なのだ。 (ミルトン)',

    '生きるとは呼吸することではない。行動することである。 (ルソー)',
    '君は本気で生きているのか？ (ゲーテ)',
    '我思う、ゆえに我あり。 (デカルト)',
    '万物は流転[るてん]する。 (ヘラクレイトス)',
    '人間は考える葦[あし]である。 (パスカル)',
    '私の絵は私の心だ。私は自分の心で描く。 (ゴッホ)',
    'まじめに生きれば生きるほど、敵は増える。 (トルストイ)',
    '神のみぞ知る。無知の知が自らの賢さ。 (ソクラテス)',
    '悪法も法なり。 (ソクラテス)',
    '学問の出発点。それは疑うことである。 (ガリレオ)',
    '人間は夢を持ち前へ歩き続ける限り、余生はいらない (伊能忠敬)',
    '私にはやり残したことがある。今から天文学の勉強をしようと思っている。 (伊能忠敬)',
    '必要は発明の母。(英ことわざ) 知識は実験の娘である。 (ダ・ヴィンチ)',
    '現実の世界には限界がある。イマジネーションの世界は無限である。 (ルソー)',
    '天才は１％のひらめきと99％の努力でつくられる。 (エジソン)',
    'その場にとどまるためには、全力で走り続けなければならない。 (『鏡の国のアリス』赤の女王)',
    '男は愛する女の最初の男となりたがり、女は愛する男の最後の女になりたがる。 (オスカー・ワイルド)',
    '書籍[しょせき]なき家は、主人なき家のごとし。 (キケロ)',
    '良い書物は、その人の人生を豊かにする。 (デカルト)',
    '愚者が賢者に学ぶより、賢者は愚者に多くを学ぶ。 (大カトー)',
    '簡潔[かんけつ]で要領[ようりょう]を得た行動。それが知力の基本である。 (シェイクスピア)',
    '知は愛なり。目的が善でなければ、知識も害となる。 (プラトン)',
    '無知を恐るるなかれ。偽[いつわ]りの知恵を恐れよ。 (パスカル)',
    '固く握りしめたコブシとは手をつなげない。 (ガンジー)',
    'その人に良くなってもらいたいなら、あなたから変わるきっかけをつくるべきだ。 (ガンジー)',
    '弱い者ほど相手を許すことができない。許すという気持ちは強さの証[あかし]なのだ。 (ガンジー)',
    '人は心がすさむと、他人の不幸を喜ぶこと以外に興味を持たなくなる。 (ゲーテ)',
    '人が耳をかたむけること。それは大多数の人間が理解できることだけである。 (ゲーテ)',
    'どれだけ孤独に生きても、結局いつのまにか人の世話になっているものだ。 (ゲーテ)',
    '相手に対して感じるいらだちや不快感は、自分の心を映していることがある。 (ユング)',
    '人間の価値とは、その人が得たものではなく、その人が与えられたもので測られるべきだ。 (アインシュタイン)',
    '人は、愚者をだまそうとして、その愚者にへつらう。 (ヴォーヴナルグ)',
    '誤解を本当に解消したかったら、直接会って話をしなさい。 (リンカーン)',
    '心の貧しい人は、人の欠点や失敗に対して喜びを感じる。 (ショーペンハウアー)',
    '人は欲することを為せるが、欲することを欲することはできない。 (ショーペンハウアー)',
    '自分が自分を思うほど、他人はあなたのことを考えてはくれないのだ。 (ラッセル)',
    'この争いに勝つ方法を考えるより、自分の行動を反省するほうが簡単だ。 (セネカ)',
    '人の言葉は善意にとれ。そのほうが五倍も賢く、気分もいい。 (シェークスピア)',
    '私の敵は、私をほめちぎる者である。 (タキトゥス)',
    'やって見せ、言って聞かせて、させてみて、ほめてやらねば人は動かじ。 (山本五十六)',
    '国が何をしてくれるかではなく、国のために自分が何をできるかを問うてください。 (ケネディ)',
    'いやなことをいつまでも覚えていて悲しむより、忘れて微笑[ほほえ]んでいるほうがよい。 (クリスティーナ・ロセッティ)',
    'もっとも良い説得方法は、相手に気に入られることである。 (カリエール)',
    '不愉快に感じることでも、自分の役に立てなければならない。 (ゲーテ)',
    '空気と光と友人の愛。これだけ残っていれば、なにかあっても大丈夫だ。 (ゲーテ)',
    '欠点がない人がいたら警戒せよ。 (ジュベール)',
    'とかく人は、自分が望んでいることを信じたがるものだ。 (カエサル)',
    'これは失敗したとは言わない。これは、うまくいかないということを確認した成功例なのだ。 (エジソン)',
    '我々が恐れなければならないものは「恐れ」そのものである。 (ルーズベルト)',
    'すべての残酷な行為は、気持ちの弱さから生じたものだ。 (セネカ)',
    '心配しても始まらないことは、心配しないほうがよい。 (武者小路実篤)',
    '人は自分を深刻に考えすぎる。 (オスカー・ワイルド)',
    '考えすぎる人は、願いがかなわない。 (シラー)',
    '「神は人間に絶望していない」というメッセージを両手に持ってすべての赤ん坊は生まれてくる。 (タゴール)',
    '天は自らを助くる者を助く。(サミュエル・スマイルズ)',
    '笑いは人類の謎[なぞ]を解く。 (カーライル)',
    '自分が方向を変えれば、新しい道はいくらでも開ける。 (松下幸之助 [経営者])',
    '産業人の使命も、水道の水の如く、物資を無尽蔵[むじんぞう]たらしめ、無代に等しい価格で提供する事にある。 (松下幸之助 [経営者])',
    'わが輩の辞書に不可能という文字はない。 (ナポレオン)',
    '邪悪[じゃあく]な人間の心を変えるよりも、金属の性質を変えるほうが簡単だ。 (アインシュタイン)',
    '恐れを知って、しかもそれを恐れない者こそ、真の勇者である。 (ウェルズリー)',
    '怒りは無謀をもって始まり、そして後悔をもって終わる。 (ピタゴラス)',
    '愛は惜[お]しみなく与う。 (トルストイ)',
    '愛は惜[お]しみなく奪う。 (有島武郎)',
    '流行を追う女性は、いつでも自分に恋をしている。 (ラ・ロシュフコー)',
    '嫉妬深い者の愛は、憎悪でできている。 (モリエール)',
    'ほどほどに愛しなさい。長続きする恋は、そういうものだよ。 (シェイクスピア『ロミオとジュリエット』)',
    '人が心から恋をするのは、ただ一度、初恋だけである。 (ラ・ブリュイエール)',
    '初恋とは、少しばかりの愚かさと、ありあまる好奇心の結果だ。 (バーナード・ショー)',
    '恋愛はつねに不意打ちのかたちをとる。 (立原正秋)',
    '愛されることは幸福ではない。愛することこそ幸福なのだ。 (ヘッセ)',
    '男は別れの言葉が見つからない。女は別れの言葉を告げるタイミングが見つからない。 (ローランド)',
    'あなたは失恋で傷心している。しかし、恋をしなかったほうが良かったとは思わない。 (テニスン)',
    '幻想は短く、後悔は長い。 (シラー)',
    '愛の光なき人生は無意味である。 (シラー)',
    '女性は一日中恋をしているが、男性はたまにしか恋人のことを考えない。 (サマセット・モーム)',
    '恋というのは、ひとつの芝居なんだから、筋を考えなきゃだめだよ。 (谷崎潤一郎)',
    '良い妻を持てば幸福になれる。悪い妻を持てば哲学者になれる。 (ソクラテス)',
    '嫉妬には、愛よりもうぬぼれが詰まっている。 (ラ・ロシュフコー)',
    '多くの友情は見せかけであり、多くの恋はただ愚かなだけ。 (シェイクスピア)',
    '恋は、はしかと同じでだれでも一度はかかる。 (ジェローム)',
    '天使は美しい花を咲かせるだけでなく、傷ついた者のために勇気をもって戦います。 (ナイチンゲール)',
    '私達は大きなことはできません。ただ小さなことを大きな愛で行うだけです。 (マザー・テレサ)',
    '心の田畑を耕せば、世間の荒地を耕せる。 (二宮尊徳)',
    '天は人の上に人をつくらず、人の下に人をつくらず。 (福沢諭吉)',
    '決断と忍耐は、もっとも高貴な精神である。 (ゲーテ)',
    '真面目[まじめ]とは、実行するということだ。 (夏目漱石)',
    'あちこち旅してまわっても、自分からは逃げられない。 (ヘミングウェイ『老人と海』)',
    '人はだれでもこの社会に属さねばならない。たとえ権力者でも例外は許されない。 (トルストイ)',
    'いつも自分を磨いておけ。あなたは世界を見るための窓なのだから。 (バーナード・ショー)',
    '人の一生は、重荷を背負うて遠き道を行くがごとし。急ぐべからず。 (徳川家康)',
    '青がないときは、赤を使えばいい。 (ピカソ)',
    '君には二つの生き方がある。奇跡など起こらないと信じて生きるか。すべてが奇跡だと信じて生きるかだ。 (アインシュタイン)',
    '私の財産？それは頭の中で鳴っているメロディだよ。 (モーツァルト)',
    '運命は、その人の性格の中にある。 (芥川龍之介)',
    '絶望とは、愚か者の結論である。 (ディズレーリ)',
    '革命は愛によって導かれる。 (チェ・ゲバラ)',
    '歴史とは合意のうえに成立する作り話である。 (ナポレオン)',
    'なにをしたいのか？それが明確になったとたん、君になにかが起こる。 (クリシュナムルティ)',
    '貸せばお金も友も失う。借りれば返すことがばからしくなる。 (シェイクスピア)',
    'どんなことでも先のばしにする人は、人生を失敗する。 (カーネギー [経営者])',
    '世に銭ほどおもしろきものはなし。 (井原西鶴)',
    '人間よりお金のほうがはるかに頼りになりますよ。頼りにならないのは人の心です。 (尾崎紅葉)',
    '欲しいと思う物は買うな。必要な物だけを買えばよい。 (大カトー)',
    '「あの頃は良かった」とすべての時代が言われる。 (バイロン)',
    'お金がないからなにもできないという人は、お金があってもなにもできない。 (小林一三 [経営者])',
    'お金は良い召使いであり、悪い主人である。 (ベンジャミン・フランクリン)',
    'お金だけが人生ではないが、お金のない人生も良い人生とは言えない。 (サマセット・モーム)',
    '自分の目で見る。自分の心で感じる。そんな人間のいかに少ないことか。 (アインシュタイン)',
    'なんのために生きているか？それがわかったとき、その人は死を考えなくなる。 (キング牧師)',

    '借金を返すということは、収入の問題ではない。性質の問題だ。 (ローガン・スミス)',
    'ディズニーランドは、永遠に未完成。 (ウォルト・ディズニー)',
    '想像力がなければ、怖いものはない。 (コナン・ドイル)',
    '誰かが覆[くつがえ]さない限り、世の中のものは覆らない。(ガーフィールド)',
    '財布が軽ければ、心は重い。 (ゲーテ)',
    '百里の道を行く者は、九十九里を以って全行程の半ばとす。 (佐藤一斎 [儒学者])',
    '結婚をしばしば宝くじにたとえられるが、それは誤りだ。宝くじなら当たることもあるのだから。 (バーナード・ショー)',
    '世の中で百歩先の見える者は、変人扱いされる。一歩先の見える者のみが成功者となる。 (小林一三 [経営者])',
    '模範[もはん]の奴隷[どれい]になるな。 (ゴッホ)',
    'ほんとうのことというものは、ほんとうすぎるから、私はきらいだ。 (坂口安吾)',
    '変化はゆっくり訪れる。 (ポール・マッカートニー [ミュージシャン])',
    '天使は自分を軽く考えているから飛べる。 (チェスターソン)',
    '人生には三つの坂がある。上り坂、下り坂、そして「まさか」だ。(『毛利元就』より小泉純一郎)',
    '(あなたにとって死とは何か？)死とは、モーツァルトが聴けなくなることである。 (アインシュタイン)',
    '時代を読むヒントは、日常生活のどこにでもある。 (安藤百福 [経営者])',
    '始まりはどんなものでも小さい。 (キケロ)',
    '悪に肩を叩かれた時には、どんな男も詩人になる。 (プラトン)',
    '私は、自分と同じ性格の人間と組まない。 (本田宗一郎 [経営者])',
    '一番大切なことは、目に見えない。 (サンテグジュペリ『星の王子さま』)',
    '政治は数であり、数は力、力は金だ。 (田中角栄)',
    '時間の守れん人間は、何をやってもダメだ。 (田中角栄)',
    'その背後に思想なくして真の音楽はない。 (ショパン)',
    'スランプなんて気の迷い。 (長嶋茂雄 [野球選手])',
    '人が決まってウソをつく時。それは狩りのあと、戦争中、そして選挙前。 (ビスマルク)',
    '一番だまし易い人間は、すなわち自分自身である。 (リットン)',
    '最良の官僚は、最悪の政治家である。 (マックス・ウェーバー)',
    '空腹は世界中で最上の調味料。 (セルバンテス)',
    '20歳の顔は自然の贈り物。50歳の顔はあなたの功績。(ココ・シャネル)',
    '軽い苦しみは言葉になるが、大いなる苦悩は沈黙[ちんもく]する。 (セネカ)',
    '黒い猫でも、白い猫でも、鼠[ねずみ]を捕るのがよい猫だ。 (鄧小平)',
    'そうだ、２足買ってバラバラに履[は]けば４通りに履ける。 (新庄剛志 [野球選手])',
    '地獄の沙汰[さた]も金次第。 (河竹黙阿弥)',
    '神は同棲[どうせい]を発明した、悪魔は結婚を発明した。 (ピカビア)',
    '行いはおれのもの。批判は他人のもの。おれの知ったことではない。 (勝海舟)',
    '美徳は二つの悪徳のちょうど中間である。 (アリストテレス)',
    '成功は、結果であって目的ではない。 (フローベル)',
    '見るために、私は目を閉じる。 (ゴーギャン)',
    '正論では革命を起こせない。革命を起こすものは僻論[へきろん]である。 (西郷隆盛)',
    '人間は地位が高くなるほど、足もとが滑りやすくなる。 (タキトゥス)',
    '病人には回復するという楽しみがある。 (寺田寅彦)',
    '晴れている時に傘を貸し、雨が降り出した瞬間[しゅんかん]に返せと言うのが銀行の連中だ。 (マーク・トウェイン)',
    '預言者は自分自身に嘘[うそ]をつくが、嘘つきは他人にだけ嘘をつく。 (ニーチェ)',
    '音楽について話す時、一番よい話し方は黙っていることだ。 (シューマン)',
    '伝えたいことのないユーモアには、意味がない。 (シュルツ [『スヌーピー』著者])',
    '酒と女と歌を愛さぬ者は、一生阿呆で過ごすのだ。 (ルター)',
    '冬来たりなば春遠からじ。 (シェリー)',
    'もし私が神なら、青春を人生の終わりにおいた。 (アナトール・フランス)',
    'お説教なんて、自己陶酔[じことうすい]だ。本当に偉い人は、ただ微笑してこちらの失敗を見ているものだ。 (太宰治)',
    '歴史には死人だけしか現れてこない。 (小林秀雄)',
    '失ったものを数えるな、残ったものを数えよ。 (ベニー・グッドマン [ミュージシャン])',
    '速く生き、若く死に、美しい死体になろう。 (ジェームス・ディーン [俳優])',
    '僕の前に道はない。僕のあとに道ができる。 (高村光太郎)',
    'アダムはリンゴが欲しかったのではなく、禁じられていたから食べたのだ。 (マーク・トウェイン)',
    'その身に染まりては、いかなる悪事も見えぬものなり。 (井原西鶴)',
    '何もしないさきから、僕は駄目だときめてしまうのは、それあ怠惰[たいだ]だ。 (太宰治)',
    '外交というものは、形を変えた戦争の継続状態である。 (周恩来)',
    '知って行わざるは、知らずに同じ。 (貝原益軒 [儒学者])',
    'よく練られた仕事は、半ば終わったようなものである。 (プラトン)',
    '志を立てるのに遅すぎるということはない。 (ボールドウィン)',
    '人間生まれてきた時は裸。死ぬ時にパンツ一つはいてたら勝ちやないか。 (明石家さんま [コメディアン] の祖父)',
    '',
    '悟りとは平気で死ぬことではない。平気で生きていくことだ。 (正岡子規)',
    '創業は易く守成は難し。 (『唐書』)',
    '目的を忘れることは、バカなことの中でも一番ありがちなことである。 (ニーチェ)',
    '自分が多数派の側にいるとわかった時、それは立ち止まって考え直す時だ。 (マーク・トウェイン)',
    '魂が眠っていて、立派な言葉が出てくるはずはない。 (魯迅)',
    '好転する前には、悪化するという段階もあり得ます。 (チャーチル)',
    '国が腐敗すればするほど法律が増える。 (タキトゥス)',
    '人は女に生まれない、女になるのだ。 (ボーヴォワール)',
    '顧客は好みの色の車を買うことができる。それが黒である限りは。 (フォード [経営者])',
    '変化こそ唯一の永遠である。 (岡倉天心)',

    '与えてください。あなたの心が痛むほどに。 (マザー・テレサ)',
    '戦争はしようと思ったときに始まる。しかし、終わって欲しいと思ったときには終わらない。 (マキャベリ)',
    '人は、自分の持ち物が奪われたときよりも、父親が死んだことのほうを、早く忘れるものである。(マキャベリ)',
    '相手を、どんなことにしろ、絶望に追い込むようなことは、思慮ある人のやることではない。 (マキャベリ)',
    '天国に行くのに最も有効な方法は、地獄へ行く道を熟知することである。 (マキャベリ)',
    '嘘つきは物覚えがよくないと務まらない。  (クインティリアヌス)',
    '怖[おそ]れるべきは死ではない。真に生きていないことをこそ怖れよ。 (マルクス・アウレリウス・アントニヌス)',
    '汝[なんじ]自身よりも、優れた忠告者はいない。 (キケロ)',
    '地獄への道は善意で舗装[ほそう]されている。 (英独のことわざより マルクス)',
    '「そのうちやる」という名の通りを歩いて行き、行き着くところは「なにもしない」という名札のかかった家である。 (セルバンテス)',
    'この世で成功するには２つの道しかない。１つは自分の勤勉によるもの。 もう１つは他人の愚かさによって儲[もう]けることだ。(ラ・ブリュイエール)',
    '20歳までに左翼に傾倒しない者は情熱が足りない。20歳を過ぎて左翼に傾倒している者は知能が足りない。 (ディズレーリ)',
    '忍耐……美徳に見せかけた小さな絶望。 (ビアス)',
    '断じて媚[こび]は売らないと標榜するのも一種の媚である。 (ラ・ロシュフコー )',
    '我々がある人間を憎む場合、我々は彼の姿を借りて我々の内部にある何物かを憎んでいるのである。 (ヘッセ)',
    '食べ物を選ぶように、言葉も選べ。 (アウグスティヌス)',
    '怪物と戦う者は、その過程で自分自身も怪物になることのないように気をつけなくてはならない。深淵[しんえん]をのぞく時、深淵もまたこちらをのぞいているのだ。 (ニーチェ)',
    '政治家は心にも無いことを口にするのが常なので、それを真に受ける人がいるとびっくりする。 (ド・ゴール)',
    '決して時計を見るな。 これは若い人に覚えてもらいたいことだ。 (エジソン)',
    '最大の悲劇は、悪人の暴力ではなく、善人の沈黙である。沈黙は、暴力の陰に隠れた同罪者である。 (キング牧師)',
    '彼らは黙っているが叫んでいるのだ。 (キケロ)',
    '目標はつねに、われわれから後ずさりする。 (ガンジー)',
    '共通の不幸が、我々の心を結び付ける。 (ルソー)',
    '教育とは、機械を造る事ではなく、人間を創る事である。  (ルソー)',
    'しばらく二人で黙っているといい。その沈黙に耐えられる関係かどうか。 (キルケゴール)',
    '人生で最も苦痛なことは、夢から覚めて行くべき道のないことです。 (魯迅)',
    '真理は醜[みにく]いもの。 (ニーチェ)',
    '真実の持つ難点は、それがたいてい不快でしばしば面白くないことである。 (H.L.メンケン)',
    '英雄は、英雄を知る。 (ゲーテ)',
    '偉大な指導者は、民主主義からは生まれない。 (ヒトラー)',
    '嵐は強い樹を作る。 (レーニン)',
    '視点を変えれば、不可能が可能になる。 (ハンニバル)',
    '青年に勧めたい事はただ三語に尽きる。すなわち働け、もっと働け、あくまで働け。 (ビスマルク)',
    '学べば学ぶほど、自分が何も知らなかった事に気づく。気づけば気づくほどまた学びたくなる。 (アインシュタイン)',
    '汝の敵から目を離さないようにせよ。汝の欠点を真っ先に見つけるのは奴等[やつら]だから。 (アンティステネス)',
    '経験とは、人々が自らの愚行と悲哀に与える名前である。 (ミュッセ)',
    '大きな夢を汚す人間には近づくな。たいしたことない人間ほど人の夢にケチをつけたがるものだ。真に偉大な人間は自分にも成功できる思わせてくれる。 (マーク・トウェイン)',
    '運命よそこをどけ、俺が通る。 (マイケル・ジョーダン [バスケ選手])',
    'お前が生きてる「今日」は、昨日死んだ奴が死ぬほど生きたかった「明日」だ。 (伝・趙昌仁『カシコギ』より藤原基央 [ミュージシャン])',
    '世界は苦難に満ちているが、それを乗り越えた事例にも満ちている。 (ヘレン・ケラー)',
    '満足した豚であるより、不満足な人間であるほうがよく、満足した馬鹿であるより、不満足なソクラテスであるほうがよい。 (J. S. ミル)',
    '神秘とは、世界がいかにあるかではなく、世界があるというそのことである。 (ウィトゲンシュタイン)',

    '誰がカモかわからなければ、そのゲームでは自分がカモだ。 (ウォーレン・バフェット [投資家])',
    '体は心に依存し、心は財布に依存している。 (『タルムード』)',
    'あなたがもっている物を、それを必要としている人に売るのはビジネスではない。あなたがもっていない物をそれを必要としない人に売るのがビジネスである。 (ユダヤ格言)',
    '金は、賢人には、美しい女にきれいな服を与えるほどの訳にしか立たない。 (ユダヤ格言)',
    '商人になったらこの言葉を覚えなさい。「私はあなたを完全に信頼しています。だから現金で払ってください。」 (『タルムード』)',
    '借金を返す者は、信用を倍にする。 (ユダヤ格言)',
    '幸福を追うと、満足から遠ざからねばならない。 (ユダヤ格言)',
    '天国の一隅には、祈れなかったが、泣けた人のために場所がとってある。 (ユダヤ格言)',
    '神は正しい者を試される。 (ユダヤ格言)',
    '謙遜すぎるのは、傲慢なのと同じである。 (ユダヤ格言)',
    '完全に愚かな者より、半分愚かな者のほうが愚かだ。完全に沈んでしまっている船は、他の船の航行の邪魔にならない。しかし、半分沈んでいる船は、他の船の妨げとなる。 (『タルムード』)',
    '人は誰しも大人にならない。子どもが年をとるだけである。 (ユダヤ格言)',
    '若いころから老人をほんとうに尊んできた者だけが、自分が年老いたときに、自尊心をもつことができる。 (ラビ・M・トケイヤー)',
    '子どもは自分が一番重要だと思っている。成長しない大人もまたそう思っている。 (『タルムード』)',
    '年寄りは自分が二度と若返らないことを知っているが、若者は自分が年をとることを忘れている。 (ユダヤ格言)',
    '結婚は初めの三週間互いを観察しあい、つぎの三か月愛しあい、そのつぎの三年間けんかして過ごし、またつぎの三〇年間を、赦しあって送る。 (トケイヤー『ユダヤ格言集』)',
    '人間は、しゃべることは生まれてすぐ覚えるが、黙ることはなかなか覚えられない。知恵のまわりの塀は沈黙である。 (ユダヤ格言)',
    '一つの嘘は嘘であり、二つの嘘も嘘であり、三つの嘘は政治である。 (ユダヤ格言)',
    '良い礼儀作法とは何だろうか。他人の悪い礼儀作法を許すことである。 (ユダヤ格言)',
    '正しいことを行っている者は、一人で歩むことをおそれない。しかし、悪いことをしている者は一人で歩むことをおそれる。 (『タルムード』)',
    '人は自分の町では評判によって判断され、よその町では衣服によって判断される。 (『タルムード』)',
    '要領のいい人間と賢い人間の差 -- 要領のいい男は、賢い人間だったら絶対におちいらないような困難な状況を、うまく切り抜ける人のことである。 (『タルムード』)',
    
    '一言居士。',
    '一知半解。',
    '以心伝心。',
    '慇懃無礼。',
    '温故知新。',
    '唯唯諾諾。',
    '異口同音。',
    '異体同心。',
    '韋編三絶。',
    '有為転変。',
    '会者定離。',
    '岡目八目。',
    '眼光紙背。',
    '臥薪嘗胆。',
    '花鳥風月。',
    '我田引水。',
    '合従連衡。',
    '金科玉条。',
    '気息奄奄。',
    '虚心坦懐。',
    '旗幟鮮明。',
    '閑話休題。',
    '緊褌一番。',
    '牽強付会。',
    '乾坤一擲。',
    '国士無双。',
    '鼓腹撃壌。',
    '自画自賛。',
    '自業自得。',
    '自縄自縛。',
    '四面楚歌。',
    '森羅万象。',
    '死屍累累。',
    '針小棒大。',
    '小懲大誡。',
    '酒池肉林。',
    '枝葉末節。',
    '粗衣粗食。',
    '漱石枕流。',
    '造反有理。',
    '率先垂範。',
    '大言壮語。',
    '大胆不敵。',
    '大同小異。',
    '泰山北斗。',
    '単刀直入。',
    '談論風発。',
    '直情径行。',
    '朝三暮四。',
    '猪突猛進。',
    '天真爛漫。',
    '同工異曲。',
    '同床異夢。',
    '当意即妙。',
    '東奔西走。',
    '独立不羈。',
    '徒手空拳。',
    '南船北馬。',
    '内憂外患。',
    '日進月歩。',
    '博覧強記。',
    '万古不易。',
    '八紘一宇。',
    '破邪顕正。',
    '波瀾万丈。',
    '罵詈雑言。',
    '反面教師。',
    '百家争鳴。',
    '比翼連理。',
    '品行方正。',
    '不撓不屈。',
    '風光明媚。',
    '不易流行。',
    '文武両道。',
    '富国強兵。',
    '内股膏薬。',
    '付和雷同。',
    '粉骨砕身。',
    '焚書坑儒。',
    '平平凡凡。',
    '弊衣破帽。',
    '変幻自在。',
    '片言隻句。',
    '暴虎馮河。',
    '暴飲暴食。',
    '本地垂迹。',
    '傍若無人。',
    '満身創痍。',
    '妙計奇策。',
    '無位無冠。',
    '無量大数。',
    '満漢全席。',
    '無為徒食。',
    '無我夢中。',
    '無法千万。',
    '名誉挽回。',
    '失地回復。',
    '明鏡止水。',
    '面従腹背。',
    '面目躍如。',
    '滅私奉公。',
    '孟母三遷。',
    '問答無用。',
    '夜露死苦。',
    '夜郎自大。',
    '勇気凛凛。',
    '勇猛果敢。',
    '有害無益。',
    '有名無実。',
    '用意周到。',
    '優柔不断。',
    '融通無碍。',
    '悠悠自適。',
    '陽動作戦。',
    '余裕綽綽。',
    '欲求不満。',
    '落花狼藉。',
    '豪放磊落。',
    '臨機応変。',
    '利害得失。',
    '流言飛語。',
    '良妻賢母。',
    '麟子鳳雛。',
    '輪廻転生。',
    '冷酷非道。',
    '怜悧狡猾。',
    '六根清浄。',
    '論功行賞。',
    '和気藹藹。',
    '和魂洋才。',
    '不倶戴天。',
    '不立文字。',
    '人身御供。',
    '貧者一灯。',
    '痛快無比。',
    '切歯扼腕。',
    '切磋琢磨。',
    '是是非非。',
    '正当防衛。',
    '清濁併呑。',
    '支離滅裂。',
    '四苦八苦。',
    '才色兼備。',
    '三百代言。',
    '剛毅木訥。',
    '虎視眈眈。',

    null
  ];

PROVERBS.pop();
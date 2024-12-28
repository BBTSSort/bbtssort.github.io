// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 35;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 3;
var ary_TitleData = [
  "Limited Edition Single (会場限定版シングル)",
  "SCREAMING RHAPSODY",
  "AN ALIEN'S PORTRAIT",
  "Noisy Night Fever",
  "Broken By The Scream 〜extended〜 (Limited Edition)",
  "RISE into CHAOS【初回盤】",
  "Whitewater Park【Type-A】",
  "Whitewater Park【Type-B】",
  "ReMake Them Joy"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
  [1, "Oh! My! ME・GA・MIに恋してる!",                      [1,0,0,0,0,0,0,0,0], "albums/limitedEditionSingle.png"],
  [1, "Breeder Breeder",                                  [1,0,0,0,0,0,0,0,0], "albums/limitedEditionSingle.png"],
    
  [1, "夢花火",                                            [0,1,0,0,0,0,0,0,0], "albums/screamingRhapsody.jpg"],
  [1, "恋ドラ!?",                                          [0,1,0,0,0,0,0,0,0], "albums/screamingRhapsody.jpg"],
  [1, "走れ!なでしこ!",                                     [0,1,0,0,0,0,0,0,0], "albums/screamingRhapsody.jpg"],
  [1, "わたしはわたしのままだよ",                             [0,1,0,0,0,0,0,0,0], "albums/screamingRhapsody.jpg"],
  [1, "ヒカリ",                                             [0,1,0,0,0,0,0,0,0], "albums/screamingRhapsody.jpg"],
  [1, "Breeder Breeder",                                   [0,1,0,0,0,0,0,0,0], "albums/screamingRhapsody.jpg"],
  [1, "オトコとオンナ",                                      [0,1,0,0,0,0,0,0,0], "albums/screamingRhapsody.jpg"],

  [1, "恋は乙女の泣きどころ",                                 [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "ジャッジメント!!",                                    [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "Looking for",                                       [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "繋いだ星座のラブレター",                               [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "裸の太陽",                                           [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "I wish...",                                         [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "Do・Do・N・Pa!!",                                    [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "oh!my!ME・GA・MIに恋してる!",                         [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "泣いて泣いて泣きまくれ",                               [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "Message",                                           [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "サヨナラバースデー",                                  [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],
  [1, "空駆ける風のように",                                  [0,0,1,0,0,0,0,0,0], "albums/anAliensPortrait.jpg"],

  [1, "アイハキミノモノ",                                    [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "七色スクランブル",                                    [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "∞ハートビート",                                       [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "Over The Sea",                                      [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "KI・RA・I !!",                                       [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "知らないキミと真夏の夜空",                             [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "フェニックス",                                        [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "Snowlight Fantasy",                                 [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "Last minute",                                       [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "GoodnightはKissのあと",                              [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "ハルウララ",                                         [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],
  [1, "宝物",                                              [0,0,0,1,0,0,0,0,0], "albums/noisyNightFever.jpg"],

  [1, "逆転の鐘は鳴る",                                      [0,0,0,0,1,0,0,0,0], "albums/bbtsExtended.png"],
  [1, "Breeder Breeder",                                   [0,0,0,0,1,0,0,0,0], "albums/bbtsExtended.png"],
  [1, "オトコとオンナ",                                      [0,0,0,0,1,0,0,0,0], "albums/bbtsExtended.png"],
  [1, "めんぶれ",                                           [0,0,0,0,1,0,0,0,0], "albums/obbtsExtended.png"],
  [1, "セツナフープ",                                       [0,0,0,0,1,0,0,0,0], "albums/bbtsExtended.png"],

  [1, "感情クロスカウンター (RiC mix)",                       [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "TOKYO RIDE",                                         [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "I tai no...",                                       [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "セツナフープ (RiC mix)",                              [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "ココロ、晴レ晴レ",                                     [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "パノラマ",                                            [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "メラメラセニョリータ",                                 [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "あの夏の蜃気楼",                                      [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "キラキラスプラッシュ!!",                               [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "Hang in there",                                      [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "逆転の鐘は鳴る (RiC mix)",                             [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],
  [1, "ボクらの未来",                                         [0,0,0,0,0,1,0,0,0], "albums/riseIntoChaos.jpg"],

  [1, "Rising sun feat.サンシャイン池崎",                      [0,0,0,0,0,0,1,0,0], "albums/whiteWaterParkA.jpg"],
  [1, "くちびるにロマンス",                                    [0,0,0,0,0,0,1,0,0], "albums/whiteWaterParkA.jpg"],
  [1, "陽炎 feat.Isam(from MAKE MY DAY)＆アイガーゴイル(from アイリフドーパ)", [0,0,0,0,0,0,1,0,0], "albums/whiteWaterParkA.jpg"],
  [1, "荒れた海路はキミ日和",                                   [0,0,0,0,0,0,1,0,0], "albums/whiteWaterParkA.jpg"],
  [1, "ライカ ライカ",                                         [0,0,0,0,0,0,1,0,0], "albums/whiteWaterParkA.jpg"],
  [1, "パノラマ (Live ver.)",                                  [0,0,0,0,0,0,1,0,0], "albums/whiteWaterParkA.jpg"],

  [1, "Rising sun feat.サンシャイン池崎",                       [0,0,0,0,0,0,0,1,0], "albums/whiteWaterParkB.jpg"],
  [1, "くちびるにロマンス",                                      [0,0,0,0,0,0,0,1,0], "albums/whiteWaterParkB.jpg"],
  [1, "陽炎 feat.Isam（from MAKE MY DAY）＆アイガーゴイル（from アイリフドー", [0,0,0,0,0,0,0,1,0], "albums/whiteWaterParkB.jpg"],
  [1, "荒れた海路はキミ日和",                                    [0,0,0,0,0,0,0,1,0], "albums/whiteWaterParkB.jpg"],
  [1, "ライカ ライカ(4:36)06.ボクらの未来 （Live ver.)",          [0,0,0,0,0,0,0,1,0], "albums/whiteWaterParkB.jpg"],
  [1, "ボクらの未来 （Live ver.)",                               [0,0,0,0,0,0,0,1,0], "albums/whiteWaterParkB.jpg"],

  [1, "夢花火",                                               [0,0,0,0,0,0,0,0,1], "albums/remakeThemJoy.jpg"],
  [1, "Do・Do・N・Pa!!",                                      [0,0,0,0,0,0,0,0,1], "albums/remakeThemJoy.jpg"],
  [1, "サヨナラバースデー",                                    [0,0,0,0,0,0,0,0,1], "albums/remakeThemJoy.jpg"],
  [1, "Message 5.",                                          [0,0,0,0,0,0,0,0,1], "albums/remakeThemJoy.jpg"],
  [1, "月光可憐ストライプ",                                    [0,0,0,0,0,0,0,0,1], "albums/remakeThemJoy.jpg"],
];

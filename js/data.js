// Album catalog. To add a new album, append a new object to ALBUMS with:
//   id     - unique kebab-case slug (used as DOM value, must be unique)
//   title  - human-readable album name (shown in UI)
//   year   - release year (used to sort albums chronologically)
//   cover  - path to cover image, relative to the page
//   songs  - array of song titles in track order (duplicates across albums are fine)
//
// Albums are listed alphabetically by title in this file for easier maintenance.
// At runtime they are sorted by year on export, so file order does not affect the UI.

const RAW_ALBUMS = [
  {
    id: "an-aliens-portrait",
    title: "AN ALIEN'S PORTRAIT",
    year: 2018,
    cover: "img/albums/anAliensPortrait.jpg",
    songs: [
      "恋は乙女の泣きどころ",
      "ジャッジメント!!",
      "Looking for",
      "繋いだ星座のラブレター",
      "裸の太陽",
      "I wish...",
      "Do・Do・N・Pa!!",
      "oh!my!ME・GA・MIに恋してる!",
      "泣いて泣いて泣きまくれ",
      "Message",
      "サヨナラバースデー",
      "空駆ける風のように",
    ],
  },
  {
    id: "bbts-extended",
    title: "Broken By The Scream 〜extended〜 (Limited Edition)",
    year: 2021,
    cover: "img/albums/bbtsExtended.png",
    songs: [
      "逆転の鐘は鳴る",
      "Breeder Breeder",
      "オトコとオンナ",
      "めんぶれ",
      "セツナフープ",
    ],
  },
  {
    id: "limited-edition-single",
    title: "Limited Edition Single (会場限定版シングル)",
    year: 2017, // venue-exclusive; exact date undocumented, predates SCREAMING RHAPSODY
    cover: "img/albums/limitedEditionSingle.png",
    songs: [
      "Oh! My! ME・GA・MIに恋してる!",
      "Breeder Breeder",
    ],
  },
  {
    id: "noisy-night-fever",
    title: "Noisy Night Fever",
    year: 2019,
    cover: "img/albums/noisyNightFever.jpg",
    songs: [
      "アイハキミノモノ",
      "七色スクランブル",
      "∞ハートビート",
      "Over The Sea",
      "KI・RA・I !!",
      "知らないキミと真夏の夜空",
      "フェニックス",
      "Snowlight Fantasy",
      "Last minute",
      "GoodnightはKissのあと",
      "ハルウララ",
      "宝物",
    ],
  },
  {
    id: "remake-them-joy",
    title: "ReMake Them Joy",
    year: 2024,
    cover: "img/albums/remakeThemJoy.jpg",
    songs: [
      "夢花火",
      "Do・Do・N・Pa!!",
      "サヨナラバースデー",
      "Message",
      "月光可憐ストライプ",
    ],
  },
  {
    id: "rise-into-chaos",
    title: "RISE into CHAOS【初回盤】",
    year: 2022,
    cover: "img/albums/riseIntoChaos.jpg",
    songs: [
      "感情クロスカウンター (RiC mix)",
      "TOKYO RIDE",
      "I tai no...",
      "セツナフープ (RiC mix)",
      "ココロ、晴レ晴レ",
      "パノラマ",
      "メラメラセニョリータ",
      "あの夏の蜃気楼",
      "キラキラスプラッシュ!!",
      "Hang in there",
      "逆転の鐘は鳴る (RiC mix)",
      "ボクらの未来",
    ],
  },
  {
    id: "screaming-rhapsody",
    title: "SCREAMING RHAPSODY",
    year: 2017,
    cover: "img/albums/screamingRhapsody.jpg",
    songs: [
      "夢花火",
      "恋ドラ!?",
      "走れ!なでしこ!",
      "わたしはわたしのままだよ",
      "ヒカリ",
      "Breeder Breeder",
      "オトコとオンナ",
    ],
  },
  {
    id: "solar-strain",
    title: "Solar Strain",
    year: 2025,
    cover: "img/albums/solarStrain.jpg",
    songs: [
      "アンドロメダ (Andromeda)",
      "こっち向いてアモーレ (Kochi Muite Amore)",
      "ショコラ・ジ・エンド (Chocolat the End)",
      "トラブルメーカー (Troublemaker)",
      "サンタクロースの恋人 (Santa Claus no Koibito)",
      "Wonderful World",
      "ダイイングメッセージ (Dying Message)",
      "Queen of the World",
      "月光可憐ストライプ (Gekko Karen Stripe)",
      "朧月 -Oborozuki-",
      "追憶のナスカ (Tsuioku no Nazca)",
    ],
  },
  {
    id: "whitewater-park-a",
    title: "Whitewater Park【Type-A】",
    year: 2023,
    cover: "img/albums/whiteWaterParkA.jpg",
    songs: [
      "Rising sun feat.サンシャイン池崎",
      "くちびるにロマンス",
      "陽炎 feat.Isam(from MAKE MY DAY)＆アイガーゴイル(from アイリフドーパ)",
      "荒れた海路はキミ日和",
      "ライカ ライカ",
      "パノラマ (Live ver.)",
    ],
  },
  {
    id: "whitewater-park-b",
    title: "Whitewater Park【Type-B】",
    year: 2023,
    cover: "img/albums/whiteWaterParkB.jpg",
    songs: [
      "Rising sun feat.サンシャイン池崎",
      "くちびるにロマンス",
      "陽炎 feat.Isam（from MAKE MY DAY）＆アイガーゴイル（from アイリフドーパ）",
      "荒れた海路はキミ日和",
      "ライカ ライカ",
      "ボクらの未来 （Live ver.)",
    ],
  },
];

// Array.sort is stable, so albums sharing a year preserve their RAW_ALBUMS order.
export const ALBUMS = [...RAW_ALBUMS].sort((a, b) => a.year - b.year);

export function buildSongList(selectedAlbumIds) {
  const songs = [];
  const seen = new Set();
  for (const album of ALBUMS) {
    if (!selectedAlbumIds.has(album.id)) continue;
    for (const title of album.songs) {
      const key = title.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      songs.push({ title, album });
    }
  }
  return songs;
}

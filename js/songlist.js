// Album catalog. To add a new album, append a new object to ALBUMS with:
//   id     - unique kebab-case slug (used as DOM value, must be unique)
//   title  - human-readable album name (shown in UI)
//   year   - release year (used to sort albums chronologically)
//   cover  - path to cover image, relative to the page
//   songs  - array of song objects in track order. Each song is { title, translation? }:
//              title       — the song's primary title (Japanese for most BBTS tracks)
//              translation — (optional) English / romaji rendering shown as subtext
//            Duplicate titles across albums are fine; each instance is treated separately.
//   isSingle - (optional) true if this is a standalone single — gets bundled into the
//            "Singles" tile on the album grid instead of getting its own tile.
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
      { title: "恋は乙女の泣きどころ", translation: "Koi wa Otome no Nakidokoro" },
      { title: "ジャッジメント!!", translation: "Judgment!!" },
      { title: "Looking for" },
      { title: "繋いだ星座のラブレター", translation: "Tsunaida Seiza no Love Letter" },
      { title: "裸の太陽", translation: "Hadaka no Taiyou" },
      { title: "I wish..." },
      { title: "Do・Do・N・Pa!!" },
      { title: "oh!my!ME・GA・MIに恋してる!", translation: "Oh! My! Megami ni Koishiteru!" },
      { title: "泣いて泣いて泣きまくれ", translation: "Naite Naite Nakimakure" },
      { title: "Message" },
      { title: "サヨナラバースデー", translation: "Sayonara Birthday" },
      { title: "空駆ける風のように", translation: "Sora Kakeru Kaze no You ni" },
    ],
  },
  {
    id: "bbts-extended",
    title: "Broken By The Scream 〜extended〜 (Limited Edition)",
    year: 2021,
    cover: "img/albums/bbtsExtended.png",
    songs: [
      { title: "逆転の鐘は鳴る", translation: "Gyakuten no Kane wa Naru" },
      { title: "Breeder Breeder" },
      { title: "オトコとオンナ", translation: "Otoko to Onna" },
      { title: "めんぶれ", translation: "Mental Break" },
      { title: "セツナフープ", translation: "Setsuna Hoop" },
    ],
  },
  {
    id: "limited-edition-single",
    title: "Limited Edition Single (会場限定版シングル)",
    year: 2017, // venue-exclusive; exact date undocumented, predates SCREAMING RHAPSODY
    cover: "img/albums/limitedEditionSingle.png",
    songs: [
      { title: "Oh! My! ME・GA・MIに恋してる!", translation: "Oh! My! Megami ni Koishiteru!" },
      { title: "Breeder Breeder" },
    ],
  },
  {
    id: "noisy-night-fever",
    title: "Noisy Night Fever",
    year: 2019,
    cover: "img/albums/noisyNightFever.jpg",
    songs: [
      { title: "アイハキミノモノ", translation: "Ai wa Kimi no Mono" },
      { title: "七色スクランブル", translation: "Nanairo Scramble" },
      { title: "∞ハートビート", translation: "Infinity Heartbeat" },
      { title: "Over The Sea" },
      { title: "KI・RA・I !!" },
      { title: "知らないキミと真夏の夜空", translation: "Shiranai Kimi to Manatsu no Yozora" },
      { title: "フェニックス", translation: "Phoenix" },
      { title: "Snowlight Fantasy" },
      { title: "Last minute" },
      { title: "GoodnightはKissのあと", translation: "Goodnight wa Kiss no Ato" },
      { title: "ハルウララ", translation: "Haru Urara" },
      { title: "宝物", translation: "Takaramono" },
    ],
  },
  {
    id: "remake-them-joy",
    title: "ReMake Them Joy",
    year: 2024,
    cover: "img/albums/remakeThemJoy.jpg",
    songs: [
      { title: "夢花火", translation: "Yumehanabi" },
      { title: "Do・Do・N・Pa!!" },
      { title: "サヨナラバースデー", translation: "Sayonara Birthday" },
      { title: "Message" },
      { title: "月光可憐ストライプ", translation: "Gekko Karen Stripe" },
    ],
  },
  {
    id: "rise-into-chaos",
    title: "RISE into CHAOS【初回盤】",
    year: 2022,
    cover: "img/albums/riseIntoChaos.jpg",
    songs: [
      { title: "感情クロスカウンター (RiC mix)", translation: "Kanjou Cross Counter (RiC mix)" },
      { title: "TOKYO RIDE" },
      { title: "I tai no..." },
      { title: "セツナフープ (RiC mix)", translation: "Setsuna Hoop (RiC mix)" },
      { title: "ココロ、晴レ晴レ", translation: "Kokoro, Hare Hare" },
      { title: "パノラマ", translation: "Panorama" },
      { title: "メラメラセニョリータ", translation: "Mera Mera Señorita" },
      { title: "あの夏の蜃気楼", translation: "Ano Natsu no Shinkirou" },
      { title: "キラキラスプラッシュ!!", translation: "Kira Kira Splash!!" },
      { title: "Hang in there" },
      { title: "逆転の鐘は鳴る (RiC mix)", translation: "Gyakuten no Kane wa Naru (RiC mix)" },
      { title: "ボクらの未来", translation: "Bokura no Mirai" },
    ],
  },
  {
    id: "screaming-rhapsody",
    title: "SCREAMING RHAPSODY",
    year: 2017,
    cover: "img/albums/screamingRhapsody.jpg",
    songs: [
      { title: "夢花火", translation: "Yumehanabi" },
      { title: "恋ドラ!?", translation: "Koi Dora!?" },
      { title: "走れ!なでしこ!", translation: "Hashire! Nadeshiko!" },
      { title: "わたしはわたしのままだよ", translation: "Watashi wa Watashi no Mama da yo" },
      { title: "ヒカリ", translation: "Hikari" },
      { title: "Breeder Breeder" },
      { title: "オトコとオンナ", translation: "Otoko to Onna" },
    ],
  },
  {
    id: "solar-strain",
    title: "Solar Strain",
    year: 2025,
    cover: "img/albums/solarStrain.jpg",
    songs: [
      { title: "アンドロメダ", translation: "Andromeda" },
      { title: "こっち向いてアモーレ", translation: "Kochi Muite Amore" },
      { title: "ショコラ・ジ・エンド", translation: "Chocolat the End" },
      { title: "トラブルメーカー", translation: "Troublemaker" },
      { title: "サンタクロースの恋人", translation: "Santa Claus no Koibito" },
      { title: "Wonderful World" },
      { title: "ダイイングメッセージ", translation: "Dying Message" },
      { title: "Queen of the World" },
      { title: "月光可憐ストライプ", translation: "Gekko Karen Stripe" },
      { title: "朧月", translation: "Oborozuki" },
      { title: "追憶のナスカ", translation: "Tsuioku no Nazca" },
    ],
  },
  {
    id: "whitewater-park-a",
    title: "Whitewater Park【Type-A】",
    year: 2023,
    cover: "img/albums/whiteWaterParkA.jpg",
    songs: [
      { title: "Rising sun feat.サンシャイン池崎", translation: "Rising sun feat. Sunshine Ikezaki" },
      { title: "くちびるにロマンス", translation: "Kuchibiru ni Romance" },
      {
        title: "陽炎 feat.Isam (from MAKE MY DAY) ＆アイガーゴイル(from アイリフドーパ)",
        translation: "Kagerou feat. Isam (from MAKE MY DAY) & Eigergoyle (from AILIFDOPA)",
      },
      { title: "荒れた海路はキミ日和", translation: "Areta Kairo wa Kimi Biyori" },
      { title: "ライカ ライカ", translation: "Laika Laika" },
      { title: "パノラマ (Live ver.)", translation: "Panorama (Live ver.)" },
    ],
  },
  {
    id: "whitewater-park-b",
    title: "Whitewater Park【Type-B】",
    year: 2023,
    cover: "img/albums/whiteWaterParkB.jpg",
    songs: [
      { title: "Rising sun feat.サンシャイン池崎", translation: "Rising sun feat. Sunshine Ikezaki" },
      { title: "くちびるにロマンス", translation: "Kuchibiru ni Romance" },
      {
        title: "陽炎 feat.Isam（from MAKE MY DAY）＆アイガーゴイル（from アイリフドーパ）",
        translation: "Kagerou feat. Isam (from MAKE MY DAY) & Eigergoyle (from AILIFDOPA)",
      },
      { title: "荒れた海路はキミ日和", translation: "Areta Kairo wa Kimi Biyori" },
      { title: "ライカ ライカ", translation: "Laika Laika" },
      { title: "ボクらの未来 (Live ver.)", translation: "Bokura no Mirai (Live ver.)" },
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
    for (const song of album.songs) {
      const key = song.title.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      songs.push({ title: song.title, translation: song.translation, album });
    }
  }
  return songs;
}

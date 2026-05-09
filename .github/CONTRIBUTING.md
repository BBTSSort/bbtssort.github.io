# Contributing

Thanks for helping keep the BBTS Song Sorter up to date. The most common contribution is adding a new release. This guide walks you through that, plus a few smaller edits.

## Adding a new album, mini-album, or single

All song data lives in [`js/data.js`](../js/data.js). One album is one object in the `RAW_ALBUMS` array.

### 1. Save the cover art

Drop the cover image into `img/albums/`. Square aspect ratio is best (the UI crops to 1:1). PNG or JPG both work. Use a short, descriptive filename in camelCase, e.g.
`solarStrain.jpg`.

### 2. Add the album entry

Open `js/data.js` and append a new object to `RAW_ALBUMS`. Order inside the array does not matter — the file sorts by `year` on export.

```js
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
```

### 4. Push your changes to GitHub

No code changes needed elsewhere. Push your changes to GitHub and you're done.

### 3. Field rules

| Field   | Required | Notes                                                                                                           |
|---------|----------|-----------------------------------------------------------------------------------------------------------------|
| `id`    | yes      | Unique across all albums. Lowercase, hyphen-separated, no spaces. Sluggified album names work well.             |
| `title` | yes      | Human-readable title. Japanese OK. Include track-edition suffixes like `【初回盤】` or `【Type-A】` verbatim.          |
| `year`  | yes      | Integer release year. Used for chronological sorting on the album-select page.                                  |
| `cover` | yes      | Path relative to the repo root. The UI prepends nothing — write the full `img/albums/...` path.                 |
| `songs` | yes      | Array of song objects in track order, shape `{ title, translation? }`. `title` is the primary title (Japanese for most BBTS tracks). Optional `translation` is shown as dim subtext (English/romaji). Duplicate titles across albums are fine; each instance is treated as its own entry. |
| `single` | no      | Set to `true` for standalone singles. They get bundled into one "Singles" tile on the album grid instead of getting their own tile. Omit for full albums, mini-albums, and EPs. |


## Adding songs to an existing album

Find the album in `RAW_ALBUMS` and add the song title to its `songs` array. The order you list them in is the order they appear if anyone inspects the data — it does not affect the
sort.

## Renaming or removing an album

- **Rename**: change `title` and/or `cover`. Don't change `id` unless you have a reason — `id` doesn't appear in the UI.
- **Remove**: delete the object. Nothing else references it.
- **Hide temporarily**: comment the object out with `/* ... */`. Easy to re-enable.

## Fixing a song title

Just edit the string in the appropriate `songs` array. Be careful with punctuation: full-width vs. half-width characters (`（` vs. `(`), Japanese vs. English transliteration, and
remix suffixes are all visible in the UI exactly as written.

## Testing locally

The site uses ES modules, which require an HTTP server (won't work via `file://`). Pick whichever is easiest:

```bash
# Python 3 (most systems have this)
python -m http.server 8000

# Node (if you have npx)
npx serve .

# PHP
php -S localhost:8000
```

Then open <http://localhost:8000>. After you change `js/data.js`, just refresh the page — there is no build step.

## Verifying your data

A quick sanity check from the command line:

```bash
node --input-type=module -e "
import { ALBUMS, buildSongList } from './js/data.js';
console.log(ALBUMS.length, 'albums');
console.log(ALBUMS.reduce((n, a) => n + a.songs.length, 0), 'songs total');
for (const a of ALBUMS) console.log(a.year, '-', a.title, '(' + a.songs.length + ' songs)');
"
```

The output should look similar to this:

```
10 albums
78 songs total
2017 - Limited Edition Single (会場限定版シングル) (2 songs)
2017 - SCREAMING RHAPSODY (7 songs)
2018 - AN ALIEN'S PORTRAIT (12 songs)
2019 - Noisy Night Fever (12 songs)
2021 - Broken By The Scream 〜extended〜 (Limited Edition) (5 songs)
2022 - RISE into CHAOS【初回盤】 (12 songs)
2023 - Whitewater Park【Type-A】 (6 songs)
2023 - Whitewater Park【Type-B】 (6 songs)
2024 - ReMake Them Joy (5 songs)
2025 - Solar Strain (11 songs)
```

If the script throws an error, you have a syntax issue in `data.js` — usually a missing comma or unclosed quote.

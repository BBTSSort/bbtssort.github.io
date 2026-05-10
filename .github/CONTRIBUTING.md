# Contributing

Thanks for helping keep the BBTS Song Sorter up to date. The most common contribution is adding a new release. This guide walks you through that, plus a few smaller edits.

## Testing locally

The site uses ES modules, which require an HTTP server (won't work via `file://`). 

### Before you begin

1. Install Node.js and NPM at https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Run `npm install`

### Running in a local browser

1. Run `npm start`
2. To stop the server later press `Ctrl + C`. If the server won't stop, run `npm run stop` and it will kill whatever is bound to port 8000.

### Running unit tests

1. Run `npm run build`

`npm test` will catch most data-shape regressions before you push: missing required fields on an album entry, non-unique album ids, malformed song objects, broken `buildSongList` dedup, sort-engine misbehavior, etc. If you change anything in `js/data.js` or `js/sort.js`, run it.

## Verifying your data

A quick sanity check from the command line:

```bash
node --input-type=module -e "
import { ALBUMS, buildSongList } from './js/data.js';
console.log(ALBUMS.length, 'albums');
console.log(ALBUMS.reduce((n, a) => n + a.songs.length, 0), 'songs total');
for (const a of ALBUMS) console.log(a.year ?? '----', '-', a.title, '(' + a.songs.length + ' songs)' + (a.single ? ' [single]' : ''));
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

If the script throws an error, you have a syntax issue in `data.js`, usually a missing comma or unclosed quote.

## Image sizes

When adding new cover art or photos, target these dimensions. The site already displays at much smaller sizes, so larger sources just waste bandwidth.

| Image                        | Recommended                                | Reason                                                                                                      |
|------------------------------|--------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| Album covers                 | 600×600                                    | Largest on-page display is the 240px battle card; 600px gives 2× retina headroom. ~70KB after mozjpeg q=85. |
| Band photo (`bandphoto.jpg`) | 1200×1200 or 1200×630                      | Used as the `og:image` for Discord / Twitter / Slack embeds. Only loaded when someone shares the URL.       |
| Logo (`bbtslogo.png`)        | ~500×500                                   | Displayed at 44px in the page header; retina-2x is 88px, so anything above ~200px is plenty.                |
| Favicon                      | 32×32 PNG + 144×144 `apple-touch-icon.png` | Standard browser tab and iOS home-screen sizes.                                                             |
